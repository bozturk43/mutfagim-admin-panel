// src/MainNav.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useHomeInfoQuery } from '../services/queryService';
import { useAuth } from '../context/AuthContext';
import ProductsTable from '../components/Home/ProductsTable';
import { CircularProgress } from '@mui/material';

const UrunIslemleri: React.FC = () => {
  const { user } = useAuth();
  const { data: collections, isLoading } = useHomeInfoQuery(user,"produtcs");
  console.log(collections);
  if (isLoading) {
    return (
      <CircularProgress />
    )
  }
  return (
    <div>
      <ProductsTable productsData={collections}/>
      </div>
  );
};

export default UrunIslemleri;
