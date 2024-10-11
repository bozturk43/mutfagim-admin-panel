import React from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';

interface Option {
  id: string;
  name: string;
}

interface SelectComponentProps {
  options: Option[];
  value?: string;  // `value` opsiyonel olabilir çünkü defaultValue olabilir
  defaultValue?: string; // Başlangıç değeri
  onChange: (value: string) => void;
  disabled:boolean;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ options, value, defaultValue, onChange,disabled }) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(defaultValue || '');

  const handleChange = (event: any) => {
    const newValue = event.target.value as string;
    setSelectedValue(newValue); // State'i güncelle
    onChange(newValue); // Parent'a bildir
  };

  return (
    <FormControl fullWidth>
      <Select
        value={selectedValue}  // Burada nesne değil, string değeri gönderiyoruz
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
