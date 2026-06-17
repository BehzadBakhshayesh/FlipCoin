import React, { useState } from 'react'
import Share from '@/components/svg/share';
import Copy from '@/components/svg/copy';
import "./style.css";
import CopySuccess from '../svg/copySuccess';


const handleShare = async () => {
    const combinedText = `\n  link:\n https://behzadbakhshayesh.github.io/FlipCoin/ \n`;

    const shareData = {
        title: "شیرخط",
        text: combinedText,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.error('خطا:', error);
        }
    } else {
        await navigator.clipboard.writeText(combinedText);
    }
};



const Header: React.FC = () => {
    const [c, setC] = useState(false)
    const copy = async () => {
        try {
            await navigator.clipboard.writeText("https://behzadbakhshayesh.github.io/FlipCoin/");
            setC(true)
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => {
                setC(false)
            }, 3000);
        }
    };
    return (
        <div className='header-wrapper'>
            <div onClick={copy} className='icon-wrapper'>
                {c ? <CopySuccess /> : <Copy />}
            </div>
            <div onClick={handleShare} className='icon-wrapper'>
                <Share />
            </div>
        </div>
    )
}

export default Header
