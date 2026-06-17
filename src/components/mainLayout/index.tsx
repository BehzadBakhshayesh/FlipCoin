import React, { type ReactNode } from 'react'
import Header from '@/components/header';
import "./style.css";

interface PropsType {
    children: ReactNode;
}
const MainLayout: React.FC<PropsType> = ({ children }) => {
    return (
        <div className='main-layout-wrapper'>
            <Header />
            <div className='app-content-wrapper'>
                {children}
            </div>
        </div>
    )
}

export default MainLayout
