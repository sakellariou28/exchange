import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectProps } from '@mui/material/Select';

export interface AppSelectOption {
  value: string;
  label: string;
}

interface AppSelectProps extends Omit<SelectProps<string>, 'label'> {
  label: string;
  options: AppSelectOption[];
}

export const AppSelect = ({ label, options, ...props }: AppSelectProps) => {
  return (
    <FormControl size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

