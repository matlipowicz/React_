import { TextField, Select, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { ErrorMessageProps, FormikProps } from "formik";
import { SelectValues } from "src/api/orders";
import { ClientCard, getAllClients } from "src/api/clients";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const SelectInput = ({ formik, label, type }: { formik: FormikProps<SelectValues>; label: string; type: keyof SelectValues }) => {
    // const [user, setUser] = useState<ClientCard[]>([]);

    // useEffect(() => {
    //     getAllClients()
    //         .then((data) => setUser(data))
    //         .catch((error) => console.log(error));
    // }, []);

    const {
        isLoading,
        isError,
        data: user,
        error,
    } = useQuery({
        queryKey: ["add"],
        queryFn: getAllClients,
    });
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        if (error instanceof Error) return <p>Error: {error.message}</p>;
    }
    return (
        <Box width="250px">
            {/* //! Version with textfield (recommended by other users on stackoverflow) */}
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

                {user &&
                    user.map((user) => {
                        return <MenuItem value={user.phoneNumber} key={user.id}>{`${user.name} ${user.surname}`}</MenuItem>;
                    })}
            </TextField>
            {/* //! Version with select mui (recommended by other users on stackoverflow) */}
            {/* <Select id={type} name={type} value={formik.values[type]} label={label} onChange={formik.handleChange} fullWidth>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>

                {user.map((user) => {
                    return (
                        <MenuItem
                            value={user.phoneNumber}
                            key={user.id}
                            onChange={() => console.log(user.phoneNumber)}
                        >{`${user.name} ${user.surname}`}</MenuItem>
                    );
                })}
            </Select> */}
        </Box>
    );
};
