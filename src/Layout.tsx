// src/Layout.tsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Drawer, List, ListItem, ListItemText, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // MenuIcon'u içe aktar
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
