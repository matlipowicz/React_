import { Box, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { SelectValues } from 'src/api/orders';

export const QuantityInput = ({
  type,
  formik,
  label,
}: {
  formik: FormikProps<SelectValues>;
  label: string;
  type: keyof SelectValues;
}) => (
  <Box width='250px'>
    <TextField
      id={type}
      name={type}
      label={label}
      value={formik.values[type]}
      onChange={formik.handleChange}
      type='number'
      fullWidth
      error={Boolean(formik.touched[type]) && Boolean(formik.errors[type])}
      helperText={formik.touched[type] && formik.errors[type] ? formik.errors[type] : null}
    />
  </Box>
);
