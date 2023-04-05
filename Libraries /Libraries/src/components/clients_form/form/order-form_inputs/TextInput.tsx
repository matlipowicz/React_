import { TextField, Box } from "@mui/material";
import { FormikProps } from "formik";
import { SelectValues } from "src/api/orders";
export const TextInput = ({ type, formik, label }: { label: string; type: keyof SelectValues; formik: FormikProps<SelectValues> }) => {
    return (
        <Box width="250px">
            <TextField
                id={type}
                name={type}
                label={label}
                value={formik.values[type] || ""}
                onChange={formik.handleChange}
                fullWidth
                error={Boolean(formik.touched[type]) && Boolean(formik.errors[type])}
                helperText={formik.touched[type] && formik.errors[type] ? formik.errors[type] : null}
            ></TextField>
        </Box>
    );
};
