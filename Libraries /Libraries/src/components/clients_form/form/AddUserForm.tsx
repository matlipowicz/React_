import { TextField, Box } from "@mui/material";
import { useFormik, FormikProps } from "formik";
import { object, InferType, string, number } from "yup";
import style from "./Form.module.css";
import { FormValuesYup, schema, addClient } from "../../../api/Clients";

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
        />
    );
};
export const AddUserForm = () => {
    const formik = useFormik<FormValuesYup>({
        initialValues: {
            name: "",
            surname: "",
            street: "",
            postalCode: "",
            town: "",
            subRegion: "",
            imgSrc: "",
            phoneNumber: "",
        },
        onSubmit: (values: FormValuesYup) => {
            addClient(values);
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
