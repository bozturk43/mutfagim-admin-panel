import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import SharedTable from '../Shared/SharedTable';
import { Button, CircularProgress, Typography } from '@mui/material';
import SelectComponent from '../Shared/Components/BasicSelect';
import { useAuth } from '../../context/AuthContext';
import { useAllLovs, useDeleteProduct, useUpdateProduct } from '../../services/queryService';
import InputComponent from '../Shared/Components/BasicInput';
import { useForm, Controller } from 'react-hook-form'; // React Hook Form ve Controller
import { AddCircleOutline } from '@mui/icons-material';
import BasicModal from '../Shared/Components/BasicModal';
import AddProductModal from './AddProductModal';
import AlertDialog from '../Shared/Components/AlertDialog';

// Props arayüzü
interface InfoProductsProps {
    productsData: { records: Array<Record<string, any>> }; // Verinin yapısı
}

const ProductsTable: React.FC<InfoProductsProps> = ({ productsData }) => {
    const { user } = useAuth();
    const { data: lovList, isLoading } = useAllLovs(user);
    const { records } = productsData;
    const updateMutation = useUpdateProduct(user);
    const deleteMutation = useDeleteProduct(user)
    const { control, handleSubmit, getValues } = useForm();
    const [editingRow, setEditingRow] = useState<string | null>(null);  // Düzenleme yapılan satırın ID'si
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
    const onSubmit = () => {
        const editedData = {
            id: editingRow,
            name: getValues(`name-${editingRow}`),
            categoryId: getValues(`category-${editingRow}`),
            unitId: getValues(`unit-${editingRow}`),
        };
        console.log(editedData);
        updateMutation.mutate(editedData); // Mutasyonu çalıştır
        // Burada API'ye editedData'yı gönderebilirsiniz
        setEditingRow(null); // Kaydedildikten sonra düzenleme modunu kapat
    };
    const handleEditClick = (rowId: string) => {
        setEditingRow(rowId);  // Hangi satırın düzenlendiğini kaydet
    };
    const columData: ColumnDef<any>[] = React.useMemo(() => [
        {
            accessorKey: 'id',
            header: "ID",
            cell: (info: any) => info.getValue(),
        },
        {
            accessorKey: 'name',
            header: "NAME",
            cell: ({ row }) => {
                return (
                    <Controller
                        name={`name-${row.original.id}`}  // React Hook Form ile kontrol edilen input
                        control={control}
                        defaultValue={row.original.name}
                        render={({ field }) => (
                            <InputComponent
                                {...field}
                                onChange={(e) => field.onChange(e)}
                                defaultValue={row.original.name}
                                value={field.value}
                                disabled={editingRow !== row.original.id}  // Sadece düzenlenen satır aktif olur
                            />
                        )}
                    />
                );
            },
        },
        {
            accessorKey: 'category',
            header: "CATEGORY",
            cell: ({ row }) => {
                return (
                    <Controller
                        name={`category-${row.original.id}`}  // React Hook Form ile kontrol edilen select
                        control={control}
                        defaultValue={row.original.categoryId}
                        render={({ field }) => (
                            // lovList yüklendiyse SelectComponent'i render et
                            lovList?.productCategories ? (
                                <SelectComponent
                                    options={lovList.productCategories}
                                    defaultValue={row.original.categoryId}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={editingRow !== row.original.id}  // Sadece düzenlenen satır aktif olur
                                />
                            ) : (
                                <CircularProgress size={24} />  // Yükleniyorsa bir yükleme simgesi göster
                            )
                        )}
                    />
                );
            },
        },
        {
            accessorKey: 'unit',
            header: "UNIT",
            cell: ({ row }) => {
                return (
                    <Controller
                        name={`unit-${row.original.id}`}
                        control={control}
                        defaultValue={row.original.unitId}
                        render={({ field }) => (
                            // lovList yüklendiyse SelectComponent'i render et
                            lovList?.unitTypes ? (
                                <SelectComponent
                                    options={lovList.unitTypes}
                                    defaultValue={row.original.unitId}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={editingRow !== row.original.id}  // Sadece düzenlenen satır aktif olur
                                />
                            ) : (
                                <CircularProgress size={24} />  // Yükleniyorsa bir yükleme simgesi göster
                            )
                        )}
                    />
                );
            },
        },
        {
            header: "ACTIONS",
            cell: ({ row }) => {
                const productId = row.original.id;
                const isEditing = editingRow === productId;  // O anki satır düzenleniyor mu kontrolü
                return (
                    <div className='flex space-x-4'>
                        <Button
                            onClick={() => handleEditClick(productId)}
                            style={{ backgroundColor: 'orange', color: 'white', padding: '8px', border: 'none' }}
                            disabled={!!editingRow && editingRow !== productId}  // Sadece bir satır düzenlenebilir
                        >
                            Düzenle
                        </Button>
                        <Button
                            onClick={handleSubmit(onSubmit)}  // Formu gönderir
                            style={{ backgroundColor: 'green', color: 'white', padding: '8px', border: 'none' }}
                            disabled={!isEditing}  // Düzenlenebilir değilse buton disabled
                        >
                            Kaydet
                        </Button>
                        <Button
                            onClick={() => setDeleteProductId(productId)}  // Formu gönderir
                            style={{ backgroundColor: 'red', color: 'white', padding: '8px', border: 'none' }}
                        >
                            Sil
                        </Button>

                    </div>
                );
            },
        },
    ], [records, editingRow, lovList]); // lovList bağımlılığı eklendi


    if (isLoading) {
        return (
            <CircularProgress></CircularProgress>
        )
    }

    return (
        <div>
            <div className='flex justify-between'>
                <Typography variant='h3'>
                    Sistemde Bulunan Tüm Ürünler
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutline />} onClick={() => setAddModalOpen(true)}>
                    Yeni Ürün Ekle
                </Button>
            </div>
            <SharedTable data={records} columns={columData} />
            <BasicModal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
                <AddProductModal
                    user={user}
                    productCategoryList={lovList.productCategories}
                    unitList={lovList.unitTypes}
                    conversationList={lovList.conversationTypes} />
            </BasicModal>
            <AlertDialog
                open={deleteProductId !== null}
                title='Dikkat !'
                description='Ürünü Silmek İstediğinize Emin misiniz ?'
                onClose={() => setDeleteProductId(null)}
                onConfirm={() => deleteProductId && deleteMutation.mutate(deleteProductId)} />
        </div>
    );
};

export default ProductsTable;
