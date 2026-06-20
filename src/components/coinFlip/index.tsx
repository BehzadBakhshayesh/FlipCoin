import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import './style.css';

const CoinFlip: React.FC = () => {
    const play = useSound("/FlipCoin/sounds/flipCoin.mp3");
    const [isFlipping, setIsFlipping] = useState(false);
    const controls = useAnimation();

    const flipCoin = async () => {
        if (isFlipping) return;
        setIsFlipping(true);
        play()

        const isHeads = Math.random() > 0.5;

        const baseRotation = isHeads ? 1800 : 1980;

        const tiltX = (Math.random() * 30) - 15;
        const tiltZ = (Math.random() * 20) - 10;

        await controls.start({
            y: -300,
            rotateY: baseRotation * 0.6,
            rotateX: tiltX + 45,
            rotateZ: tiltZ,
            transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }
        });

        await controls.start({
            y: 0,
            rotateY: baseRotation,
            rotateX: tiltX,
            rotateZ: tiltZ / 3,
            transition: { duration: 0.55, ease: [0.33, 0, 0.66, 0.33] }
        });

        await controls.start({
            y: [0, -12, 0],
            rotateX: [tiltX, tiltX + 6, tiltX],
            transition: { duration: 0.25 }
        });

        setIsFlipping(false);
    };

    return (
        <div className="scene">
            <div className='coin-container'>
                <motion.div
                    animate={controls}
                    initial={{ y: 0, rotateY: 0 }}
                    className="coin"
                    onClick={flipCoin}
                >
                    <div className="edge">
                        {[...Array(40)].map((_, i) => (
                            <div
                                className="edge-strip"
                                key={i}
                                style={{
                                    transform: `rotateZ(${i * 9}deg) translateY(-60px) rotateX(90deg)`
                                }}
                            />
                        ))}
                    </div>
                    <div className="face front">شیر</div>
                    <div className="face back">خط</div>
                </motion.div>
            </div>
            <div className='btn-wrappper'>
                <button onClick={flipCoin} disabled={isFlipping} className="flip-button">
                    {isFlipping ? 'در حال پرتاب...' : 'انداختن سکه'}
                </button>
            </div>
        </div>
    );
};

export default CoinFlip;
