import { TextField, Box, OutlinedInput } from "@mui/material";
import { useFormik, FormikProps } from "formik";
import MenuItem from "@mui/material/MenuItem";
import { object, InferType, string, number } from "yup";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ReactEventHandler, useState } from "react";
import { SelectInput } from "./order-form_inputs/SelectInput";
import { TextInput } from "./order-form_inputs/TextInput";
import { QuantityInput } from "./order-form_inputs/QuantityInput";

export type SelectValues = {
    phoneNumber: string;
    orderContent: string;
    orderQuantity: string;
    orderTitle: string;
};

export type User = InferType<typeof orderValidationSchema>;

const orderValidationSchema = object({
    phoneNumber: string().required(),
    fullName: string().optional(),
    orderContent: string()
        .required()
        .matches(/^[a-zA-Z]{5,}$/),
    orderTitle: string()
        .required()
        .matches(/^[a-zA-Z]{10,}$/),
    orderQuantity: number().integer().required().min(1).max(15),
});
export const OrdersForm = () => {
    const formik = useFormik<SelectValues>({
        initialValues: {
            phoneNumber: "",
            orderContent: "",
            orderQuantity: "",
            orderTitle: "",
        },
        onSubmit: (values: SelectValues) => {
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: orderValidationSchema,
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", border: "thin sold" }}>
            <SelectInput phone={"+48 796437090"} formik={formik} label="Name" type="phoneNumber"></SelectInput>
            <QuantityInput formik={formik} label="Order quantity" type="orderQuantity"></QuantityInput>
            <TextInput label="Order title" formik={formik} type="orderTitle"></TextInput>
            <TextInput label="Order content" formik={formik} type="orderContent"></TextInput>
            <button type="submit">Place an order</button>
        </form>
    );
};
