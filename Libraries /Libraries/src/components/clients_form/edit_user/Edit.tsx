import { TextField, Box } from "@mui/material";
import { useFormik, FormikProps, ErrorMessage } from "formik";
import style from "./Edit.module.css";
import { FormValuesYup, schema, editClient, getClient, ClientCard } from "src/api/clients";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const FormInput = ({ inputType, formik, label }: { inputType: keyof FormValuesYup; formik: FormikProps<FormValuesYup>; label: string }) => {
    return (
        <TextField
            id={inputType as string}
            name={inputType as string}
            label={label}
            variant="filled"
            color="secondary"
            onChange={formik.handleChange}
            value={formik.values[inputType]}
            error={Boolean(formik.touched[inputType]) && Boolean(formik.errors[inputType])}
            helperText={formik.touched[inputType] && formik.errors[inputType] ? formik.errors[inputType] : null}
        >
            name
        </TextField>
    );
};

export const EditUser = () => {
    // const [initialValues, setInitialValues] = useState<FormValuesYup>({
    //     name: "",
    //     surname: "",
    //     street: "",
    //     postalCode: "",
    //     town: "",
    //     subRegion: "",
    //     imgSrc: "",
    //     phoneNumber: "",
    // });
    const { clientId } = useParams();
    //? Tutaj queryKey musi być takie samo jak dla strony z detalami klienta? Bo jak dawałem inny to musiałem refreshować stronę aby zaszły zmiany. Mógłbyś mi to wyjaśnić
    const { data, error, isLoading } = useQuery({
        queryKey: ["clients", clientId],
        queryFn: () => getClient(clientId as string | number),
        enabled: !!clientId,
    });

    // useEffect(() => {
    //     if (clientId) {
    //         getClient(clientId).then((data) => setInitialValues(data));
    //     }
    // }, []);

    //! Mutation

    const queryClient = useQueryClient();

    const { mutate } = useMutation((data: FormValuesYup): Promise<any> => editClient(data, clientId as string | number), {
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"], { exact: true });
        },
        onError: () => console.log("Mutation has not been conducted"),
    });

    const formik = useFormik<FormValuesYup>({
        initialValues: data || {
            name: "",
            surname: "",
            street: "",
            postalCode: "",
            town: "",
            subRegion: "",
            imgSrc: "",
            phoneNumber: "",
        },
        enableReinitialize: true,
        onSubmit: (values: FormValuesYup) => {
            return mutate(values);
            // editClient(values, clientId as string | number);
        },

        validationSchema: schema,
    });

    return (
        <form className={style.user__form} onSubmit={formik.handleSubmit}>
            <Box
                sx={{
                    width: "500px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "10px",
                    borderRadius: "2px",
                }}
            >
                <FormInput inputType="name" label="Name" formik={formik} />
                <FormInput inputType="surname" label="Surname" formik={formik} />
                <FormInput inputType="street" label="Street" formik={formik} />
                <FormInput inputType="postalCode" label="Postal Code" formik={formik} />
                <FormInput inputType="town" label="Town" formik={formik} />
                <FormInput inputType="subRegion" label="Sub Region" formik={formik} />
                <FormInput inputType="imgSrc" label="Photo Link" formik={formik} />
                <FormInput inputType="phoneNumber" label="Phone Number" formik={formik} />
            </Box>

            <div className={style["user__btn--container"]}>
                <button type="submit" className="user__btn--udpate">
                    Update
                </button>
                <button className="user__btn--cancel">Cancel</button>
            </div>
        </form>
    );
};
