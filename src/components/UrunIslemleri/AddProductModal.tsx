import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Lov, User } from '../../types/ObjectTypes';
import InputComponent from '../Shared/Components/BasicInput';
import SelectComponent from '../Shared/Components/BasicSelect';
import TransferListWithInput from '../Shared/Components/BasicTransferList';
import { Button } from '@mui/material';
import { useAddProduct } from '../../services/queryService';
import { useAuth } from '../../context/AuthContext';

// Props arayüzü
interface AddProductModalProps {
  user: User | null;
  productCategoryList: Lov[];
  unitList: Lov[];
  conversationList:Lov[];
}

// Form verilerinin tipi
interface AddProductFormData {
  name: string;
  categoryId: string;
  unitId: string;
  con_table:{con_id:string,con_value:string}[]
}

const AddProductModal: React.FC<AddProductModalProps> = ({ productCategoryList, unitList,conversationList }) => {
  const {user} = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<AddProductFormData>();
  const addMutation = useAddProduct(user);
  // Form submit fonksiyonu
  const onSubmit: SubmitHandler<AddProductFormData> = (data) => {
    addMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {/* Controller ile InputComponent yönetimi */}
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Product name is required' }}
        render={({ field }) => (
          <InputComponent
            {...field}
            label='Ürün Adı'
            onChange={(e) => field.onChange(e)}
            disabled={false}
            placeholder="Ürün Adı Girin"
          />
        )}
      />
      {errors.name && <p className='text-red-500'>{errors.name.message}</p>} {/* Hata mesajı */}

      {/* Controller ile SelectComponent -> Ürün kategorisi */}
      <Controller
        name="categoryId"
        control={control}
        rules={{ required: 'Category is required' }}
        render={({ field }) => (
          <SelectComponent
            {...field}
            options={productCategoryList}
            label='Kategori'
            onChange={(e) => field.onChange(e)}
            disabled={false}
          />
        )}
      />
      {errors.categoryId && <p className='text-red-500'>{errors.categoryId.message}</p>} {/* Hata mesajı */}

      {/* Controller ile SelectComponent -> Ürün birimi */}
      <Controller
        name="unitId"
        control={control}
        rules={{ required: 'Unit is required' }}
        render={({ field }) => (
          <SelectComponent
            {...field}
            options={unitList}
            label='Birim'
            onChange={(e) => field.onChange(e)}
            disabled={false}
          />
        )}
      />
      {errors.unitId && <p className='text-red-500'>{errors.unitId.message}</p>} {/* Hata mesajı */}
      <Controller
        name="con_table"
        control={control}
        rules={{ required: 'Unit is required' }}
        render={({ field }) => (
            <TransferListWithInput 
                options={conversationList}
                onChange={(e)=>field.onChange(e)}
            />
        )}
      />
      {errors.con_table && <p className='text-red-500'>{errors.con_table.message}</p>} {/* Hata mesajı */}

      {/* Form Submit butonu */}
      <Button type="submit" variant="contained">Add Product</Button>
    </form>
  );
};

export default AddProductModal;
