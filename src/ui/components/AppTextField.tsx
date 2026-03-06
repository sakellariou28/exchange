import TextField, { type TextFieldProps } from '@mui/material/TextField';

export const AppTextField = (props: TextFieldProps) => {
  return <TextField size="small" fullWidth {...props} />;
};

