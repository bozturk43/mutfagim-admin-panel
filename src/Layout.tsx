// src/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBarComponent from './components/AppBar';

const Layout: React.FC = () => {
    

    return (
        <div style={{ display: 'flex' }}>
            <AppBarComponent/>
            <main style={{ flexGrow: 1, padding: '20px', marginTop: '64px' }}>
                {/* Outlet ile içerik değişecek */}
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
