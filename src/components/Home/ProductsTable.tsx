import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import SharedTable from '../Shared/SharedTable';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // React Router'dan useNavigate'i içe aktar

// Props arayüzü
interface InfoProductsProps {
    productsData: { records: Array<Record<string, any>> }; // Verinin yapısı
}

// InfoCards bileşeni
const ProductsTable: React.FC<InfoProductsProps> = ({ productsData }) => {
    const { records } = productsData; // productsData'dan records array'ini alıyoruz
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
            accessorKey: 'category',
            header: "CATEGORY",
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: 'unit',
            header: "UNIT",
            cell: (info: any) => info.getValue(),
        },
        {
            header: "DETAILS",
            cell: ({ row }) => {
                const productId = row.original.id;
                return (
                    <Button
                    onClick={() => navigate(`/product/${productId}`)}  
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
                Sistemde Bulunan Tüm Ürünler
            </Typography>
            <SharedTable data={records} columns={columData} />
        </div>
    );
};

export default ProductsTable;
