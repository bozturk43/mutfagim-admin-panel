import React from 'react';
import { useParams } from 'react-router-dom';

// ProductDetails Bileşeni
const ProductDetails: React.FC = () => {
    // URL'den productId'yi alıyoruz
    const { productId } = useParams<{ productId: string }>();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Product Details</h1>
            <p>Product ID: {productId}</p>
        </div>
    );
};

export default ProductDetails;
