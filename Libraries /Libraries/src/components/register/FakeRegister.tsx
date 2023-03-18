import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useFormik, FormikProps } from "formik";
import { object, string, InferType, ref } from "yup";

type RegisterValues = {
    name: string;
    surname: string;
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
};

const RegisterInput = ({
    label,
    formik,
    inputValue,
    type,
}: {
    label: string;
    formik: FormikProps<RegisterValues>;
    inputValue: keyof RegisterValues;
    type: string;
}) => {
    return (
        <>
            {type === "password" ? (
                <TextField
                    type="password"
                    id={inputValue}
                    name={inputValue}
                    label={label}
                    onChange={formik.handleChange}
                    value={formik.values[inputValue]}
                />
            ) : (
                <TextField
                    id={inputValue}
                    name={inputValue}
                    label={label}
                    onChange={formik.handleChange}
                    value={formik.values[inputValue]}
                    error={Boolean(formik.touched[inputValue]) && Boolean(formik.errors[inputValue])}
                    helperText={formik.touched[inputValue] && formik.errors[inputValue] ? formik.errors[inputValue] : null}
                />
            )}
        </>
    );
};

const RegisterSchema = object({
    name: string()
        .required("Name is required")
        .matches(/^[\w]{3,}$/),
    surname: string()
        .required("Surname is required")
        .matches(/^[\w]{3,}$/),
    login: string()
        .required("Login is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/),
    password: string()
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/),
    repeatPassword: string()
        .required("Passwords must match")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/)
        .oneOf([ref("password")]),
    email: string()
        .required("E-mail is required")
        .matches(/^[\w]+@[a-z]+\.[a-z]{2,3}$/),
});

export const FakeRegister = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            login: "",
            password: "",
            repeatPassword: "",
            email: "",
        },
        onSubmit: (values: RegisterValues) => {
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: RegisterSchema,
    });
    return (
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "500px" }}>
            <RegisterInput label="Name" formik={formik} inputValue="name" type="text" />
            <RegisterInput label="Surname" formik={formik} inputValue="surname" type="text" />
            <RegisterInput label="Login" formik={formik} inputValue="login" type="text" />
            <RegisterInput label="Password" formik={formik} inputValue="password" type="text" />
            <RegisterInput label="Repeat Password" formik={formik} inputValue="repeatPassword" type="text" />
            <RegisterInput label="E-mail" formik={formik} inputValue="email" type="text" />

            <button type="submit">Register</button>
        </form>
    );
};
