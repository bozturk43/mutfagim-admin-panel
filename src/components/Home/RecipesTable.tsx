import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import SharedTable from '../Shared/SharedTable';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // React Router'dan useNavigate'i içe aktar

// Props arayüzü
interface InfoRecipeProps {
    recipeData: { records: Array<Record<string, any>> }; // Verinin yapısı
}

// InfoCards bileşeni
const RecipesTable: React.FC<InfoRecipeProps> = ({ recipeData }) => {
    const { records } = recipeData; // productsData'dan records array'ini alıyoruz
    const navigate = useNavigate(); // navigate fonksiyonunu tanımlayın

    const columData: ColumnDef<any>[] = React.useMemo(() => [
        {
            accessorKey: 'id',
            header: "ID",
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: 'name',
            header: "NAME",
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: 'categoryId',
            header: "CATEGORY",
            cell: (info: any) => info.getValue(),
        },
        {
            header: "DETAILS",
            cell: ({ row }) => {
                const recipeId = row.original.id;
                return (
                    <Button
                    onClick={() => navigate(`/recipe/${recipeId}`)}  
                    style={{ backgroundColor: 'blue', color: 'white', padding: '8px', border: 'none' }}
                    >
                        Detay
                    </Button>
                )
            },
        },
          
    ], [records]); // records bağımlılığını eklemeyi unutmayın

    return (
        <div>
            <Typography variant='h3'>
                Sistemde Bulunan Tüm Reçeteler
            </Typography>
            <SharedTable data={records} columns={columData} />
        </div>
    );
};

export default RecipesTable;
