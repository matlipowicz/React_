import { TextField, Box, OutlinedInput } from "@mui/material";
import { useFormik, FormikProps } from "formik";
import MenuItem from "@mui/material/MenuItem";
import { SelectValues } from "../OrdersForm";
import { cards } from "../../../../mocks/cards";

export const SelectInput = ({
    phone,
    formik,
    label,
    type,
}: {
    phone: string;
    formik: FormikProps<SelectValues>;
    label: string;
    type: keyof SelectValues;
}) => {
    return (
        <Box width="250px">
            <TextField
                id={type}
                name={type}
                value={formik.values[type]}
                label={label}
                onChange={formik.handleChange}
                select
                fullWidth
                error={Boolean(formik.touched[type]) && Boolean(formik.errors[type])}
                helperText={formik.touched[type] && formik.errors[type] ? formik.errors[type] : null}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>

                {cards.map((user) => {
                    return <MenuItem value={user.phoneNumber} key={user.id}>{`${user.name} ${user.surname}`}</MenuItem>;
                })}
            </TextField>
        </Box>
    );
};
