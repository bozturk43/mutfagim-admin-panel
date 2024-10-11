import React from 'react';
import { TextField } from '@mui/material';

interface InputComponentProps {
  value?: string;  // value opsiyonel, çünkü defaultValue olabilir
  defaultValue?: string; // Başlangıç değeri
  onChange: (value: string) => void; // Değer değiştiğinde tetiklenecek fonksiyon
  label?: string;  // Input'a bir etiket ekleyebiliriz
  disabled:boolean;
}

const InputComponent: React.FC<InputComponentProps> = ({ value, defaultValue, onChange, label,disabled }) => {
  const [inputValue, setInputValue] = React.useState<string>(defaultValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue); // Input değerini güncelle
    onChange(newValue); // Değer değişikliğini dışarıya bildir
  };

  return (
    <TextField
      fullWidth
      label={label}  // İsteğe bağlı bir etiket göstermek için
      value={inputValue}  // Güncel input değerini veriyoruz
      onChange={handleChange}  // Değer değiştiğinde handleChange çağrılır
      variant="outlined"  // İsteğe bağlı bir stil, isterseniz "standard" veya "filled" de kullanabilirsiniz
      disabled={disabled}
    />
  );
};

export default InputComponent;
