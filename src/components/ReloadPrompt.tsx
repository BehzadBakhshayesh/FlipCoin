import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const ReloadPrompt: React.FC = () => {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        // onRegistered(r) {
        //     console.log('SW Registered:', r);
        // },
        // onRegisterError(error) {
        //     console.log('SW Registration error:', error);
        // },
    });

    const close = () => {
        setNeedRefresh(false);
    };

    if (!needRefresh) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '20px',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}
        >
            <span style={{ color: '#333' }}>نسخه جدیدی در دسترس است!</span>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => updateServiceWorker(true)}
                    style={{ cursor: 'pointer', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    Update
                </button>
                <button
                    onClick={close}
                    style={{ cursor: 'pointer', padding: '5px 10px' }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ReloadPrompt;
