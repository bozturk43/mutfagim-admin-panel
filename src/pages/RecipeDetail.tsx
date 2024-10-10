import React from 'react';
import { useParams } from 'react-router-dom';

// ProductDetails Bileşeni
const RecipeDetail: React.FC = () => {
    // URL'den productId'yi alıyoruz
    const { recipeId } = useParams<{ recipeId: string }>();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Recipe Details</h1>
            <p>Recipe ID: {recipeId}</p>
        </div>
    );
};

export default RecipeDetail;
