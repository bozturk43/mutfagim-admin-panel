import React from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox, TextField, FormControlLabel } from '@mui/material';
import { Lov } from '../../../types/ObjectTypes';

// Birim çevrimleri için con_table elemanlarının yapısı
interface ConTableItem {
  con_id: string;
  con_value: string;
  con_name: string;
}


interface TransferListWithInputProps {
  options: Lov[];  // con_id seçimi için seçenekler
  onChange: (values: ConTableItem[]) => void;
}

const TransferListWithInput: React.FC<TransferListWithInputProps> = ({ options, onChange }) => {
  const { register, handleSubmit, watch, setValue } = useForm<{ conTable: ConTableItem[] }>({
    defaultValues: {
      conTable: [],
    },
  });

  const conTable = watch('conTable'); // Formdan conTable'ı izler

  // Checkbox durumu değiştiğinde çağrılır
  const handleOnChange = (con_id: string, con_name: string) => {
    const currentConTable = [...conTable];

    // Eğer mevcutsa çıkar, yoksa ekle
    const existingItemIndex = currentConTable.findIndex(item => item.con_id === con_id);
    if (existingItemIndex >= 0) {
      currentConTable.splice(existingItemIndex, 1); // Mevcut öğeyi çıkar
      setValue(`conTable`, currentConTable); // Formu güncelle
    } else {
      currentConTable.push({ con_id, con_value: '', con_name }); // Yeni öğe ekle
      setValue(`conTable`, currentConTable); // Formu güncelle
    }

    onChange(currentConTable); // Dışarıya ver
  };

  // Formun son halini dışarı vermek için çağrılır
  const onSubmit = () => {
    onChange(conTable); // Formun son halini dışarı verir
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {options.map((item) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={conTable.some(conItem => conItem.con_id === item.id)}
                onChange={() => handleOnChange(item.id, item.name)}
              />
            }
            label={item.name}
          />
          {conTable.some(conItem => conItem.con_id === item.id) && (
            <TextField
              label="con_value"
              size="small"
              {...register(`conTable.${conTable.findIndex(conItem => conItem.con_id === item.id)}.con_value`, {
                onChange: (e) => {
                  const value = e.target.value; // Input değerini al
                  const updatedConTable = conTable.map(conItem =>
                    conItem.con_id === item.id ? { ...conItem, con_value: value } : conItem
                  );
                  setValue('conTable', updatedConTable); // Formu güncelle
                  onChange(updatedConTable); // Dışarıya ver
                }
              })}
              style={{ marginLeft: '10px' }}
            />
          )}
        </div>
      ))}
      {conTable.length > 0 && (
        <div>
          <p>Conversation Table:</p>
          <div className='space-x-4'>
            {conTable.map((item) => (
              <p key={item.con_id}>{item.con_name} - {item.con_value}</p>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default TransferListWithInput;
