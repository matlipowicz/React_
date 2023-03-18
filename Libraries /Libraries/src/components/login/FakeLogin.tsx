import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import { object, string, InferType, ref } from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useTogglePassword } from "./TogglePassword";

type LoginValues = {
    login: string;
    password: string;
};

const LoginInput = ({
    label,
    formik,
    inputValue,
    type,
}: {
    label: string;
    formik: FormikProps<LoginValues>;
    inputValue: keyof LoginValues;
    type: any;
}) => {
    return (
        <>
            {type === "password" ? (
                <TextField
                    style={{ width: "100%" }}
                    type="password"
                    id={inputValue}
                    name={inputValue}
                    label={label}
                    onChange={formik.handleChange}
                    value={formik.values[inputValue]}
                />
            ) : (
                <TextField
                    style={{ width: "100%" }}
                    id={inputValue}
                    name={inputValue}
                    label={label}
                    onChange={formik.handleChange}
                    value={formik.values[inputValue]}
                    error={Boolean(formik.touched[inputValue]) && Boolean(formik.errors[inputValue])}
                    helperText={formik.touched[inputValue] && formik.errors[inputValue] ? formik.errors[inputValue] : null}
                ></TextField>
            )}
        </>
    );
};

const LoginSchema = object({
    login: string()
        .required("Login is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/),
    password: string()
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/),
});

export const FakeLogin = () => {
    const [InputType, ToggleEye] = useTogglePassword();
    const formik = useFormik({
        initialValues: {
            login: "",
            password: "",
        },
        onSubmit: (values: LoginValues) => {
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: LoginSchema,
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "500px" }}>
            <LoginInput label="Login" formik={formik} inputValue="login" type="text" />
            <div style={{ position: "relative" }}>
                <p>{ToggleEye}</p>
                <LoginInput label="Password" formik={formik} inputValue="password" type={InputType} />
            </div>

            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "15px" }}>
                <button type="submit" style={{ width: "100%" }}>
                    Sing in
                </button>
                <Link to="register" style={{ width: "100%", border: "thin solid #1a1a1a", borderRadius: "6px", padding: "5px" }}>
                    Sign up
                </Link>
            </div>
        </form>
    );
};
