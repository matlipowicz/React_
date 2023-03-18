import { TextField, Box, OutlinedInput } from "@mui/material";
import { useFormik, FormikProps } from "formik";
import MenuItem from "@mui/material/MenuItem";
import { SelectValues } from "../OrdersForm";

export const QuantityInput = ({ type, formik, label }: { label: string; type: keyof SelectValues; formik: FormikProps<SelectValues> }) => {
    return (
        <Box width="250px">
            <TextField
                id={type}
                name={type}
                label={label}
                value={formik.values[type]}
                onChange={formik.handleChange}
                type="number"
                fullWidth
                error={Boolean(formik.touched[type]) && Boolean(formik.errors[type])}
                helperText={formik.touched[type] && formik.errors[type] ? formik.errors[type] : null}
            />
        </Box>
    );
};
