// src/MainNav.tsx
import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Layout from './Layout';
import UrunIslemleri from './pages/UrunIslemler';
import ReceteIslemleri from './pages/ReceteIslemleri';
import KullaniciIslemleri from './pages/KullaniciIslemleri';
import AdminProfili from './pages/AdminProfili';

const MainNavigation: React.FC = () => {
    const { user } = useAuth();

    return (
        <Routes>
            {!user ? (
                <>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    {/* Burada tüm sayfalar için login yönlendirmesi yapabilirsiniz */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </>
            ) : (
                <Route path="/" element={<Layout />}>
                    <Route path="*" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/urun-islemleri" element={<UrunIslemleri />} />
                    <Route path="/recete-islemleri" element={<ReceteIslemleri />} />
                    <Route path="/kullanici-islemleri" element={<KullaniciIslemleri />} />
                    <Route path="/admin-profili" element={<AdminProfili />} />
                    {/* Diğer rota öğeleri buraya eklenebilir */}
                </Route>
            )}
        </Routes>
    );
};

export default MainNavigation;
