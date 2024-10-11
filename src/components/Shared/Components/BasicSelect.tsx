import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Lov } from '../../../types/ObjectTypes';

interface SelectComponentProps {
  options: Lov[];
  value?: string;  // `value` opsiyonel olabilir çünkü defaultValue olabilir
  defaultValue?: string; // Başlangıç değeri
  onChange: (value: string) => void;
  disabled:boolean;
  label?:string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ options, value, defaultValue, onChange,disabled,label }) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(defaultValue || '');

  const handleChange = (event: any) => {
    const newValue = event.target.value as string;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <FormControl fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        value={selectedValue}  
        onChange={handleChange}
        disabled={disabled}
        label={label}
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
