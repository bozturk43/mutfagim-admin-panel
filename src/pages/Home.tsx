// src/MainNav.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useHomeInfoQuery } from '../services/queryService';
import { useAuth } from '../context/AuthContext';
import { CircularProgress } from '@mui/material';
import InfoCards from '../components/Home/InfoCards';
import DynamicTable from '../components/Shared/DynamicTable';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { data: collections, isLoading } = useHomeInfoQuery(user);

  if (isLoading) {
    return (
      <CircularProgress />
    )
  }
  console.log(collections);

  return (
    <>
    <div className='flex' style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
      {collections && collections.map((item: any) => (
        <div key={item.collectionName} style={{ margin: '10px' }}>
          <InfoCards collectionName={item.collectionName} collectionCount={item.count} />
        </div>
      ))}
    </div>
    {collections && collections.map((item: any) => (
        <div key={item.collectionName} style={{ margin: '10px' }}>
          <DynamicTable records={item.records} />
        </div>
      ))}
    </>
  );
};

export default Home;
