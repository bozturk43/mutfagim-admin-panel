// src/MainNav.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useHomeInfoQuery } from '../services/queryService';
import RecipesTable from '../components/Home/RecipesTable';
import { CircularProgress } from '@mui/material';

const ReceteIslemleri: React.FC = () => {
  const { user } = useAuth();
  const { data: collections, isLoading } = useHomeInfoQuery(user,"recipes");
  if (isLoading) {
    return (
      <CircularProgress />
    )
  }
  return (
    <div>
      <RecipesTable recipeData={collections} />
    </div>
  );
};

export default ReceteIslemleri;
