import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

// Props arayüzü
interface InfoCardsProps {
  collectionName: string;
  collectionCount: number;
}

// InfoCards bileşeni
const InfoCards: React.FC<InfoCardsProps> = ({ collectionName, collectionCount }) => {
  
  const collectionNames = [
    {
      collectionName: "produtcs",
      displayName: "Kayıtlı Ürün Sayısı"
    },
    {
      collectionName: "recipes",
      displayName: "Kayıtlı Reçete Sayısı"
    },
    {
      collectionName: "users",
      displayName: "Kayıtlı Kullanıcı Sayısı"
    },
    {
      collectionName: "foodCategories",
      displayName: "Kategori Sayısı"
    },
    {
      collectionName: "conversationNames",
      displayName: "Çevrim Tipi Sayısı"
    },
  ];

  // Uygun displayName'i bulma
  const collectionDisplayName = collectionNames.find(item => item.collectionName === collectionName)?.displayName || collectionName;

  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {collectionDisplayName}
        </Typography>
        <Typography variant="h5" color="text.secondary">
            {collectionCount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCards;
