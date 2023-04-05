import { SelectInput } from "./order-form_inputs/SelectInput";
import { TextInput } from "./order-form_inputs/TextInput";
import { QuantityInput } from "./order-form_inputs/QuantityInput";
import { useFormik } from "formik";
import { SelectValues, orderValidationSchema, addOrder } from "src/api/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const OrdersForm = () => {
    //! Mutation

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data: SelectValues) => addOrder(data),
        onSuccess: () => queryClient.invalidateQueries(["add"], { exact: true }),
        onError: () => console.log("Something went wrong"),
    });

    const formik = useFormik<SelectValues>({
        initialValues: {
            phoneNumber: "",
            orderContent: "",
            orderQuantity: "",
            orderTitle: "",
        },
        onSubmit: (values: SelectValues) => {
            mutate(values);
        },
        validationSchema: orderValidationSchema,
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", border: "thin sold" }}>
                <SelectInput formik={formik} label="Name" type="phoneNumber"></SelectInput>
                <QuantityInput formik={formik} label="Order quantity" type="orderQuantity"></QuantityInput>
                <TextInput formik={formik} label="Order title" type="orderTitle"></TextInput>
                <TextInput formik={formik} label="Order content" type="orderContent"></TextInput>

                <button type="submit">Place an order</button>
            </form>
        </>
    );
};
