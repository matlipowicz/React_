import { TextField, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { FormikProps } from "formik";
import { SelectValues } from "src/api/orders";
import { ClientCard, getAllClients } from "src/api/clients";
import { useState, useEffect } from "react";

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
    const [user, setUser] = useState<ClientCard[]>([]);

    useEffect(() => {
        getAllClients().then((data) => setUser(data));
    }, []);

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

                {user.map((user) => {
                    return <MenuItem value={user.phoneNumber} key={user.id}>{`${user.name} ${user.surname}`}</MenuItem>;
                })}
            </TextField>
        </Box>
    );
};
