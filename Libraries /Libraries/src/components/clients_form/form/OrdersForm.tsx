import { SelectInput } from "./order-form_inputs/SelectInput";
import { TextInput } from "./order-form_inputs/TextInput";
import { QuantityInput } from "./order-form_inputs/QuantityInput";
import { useFormik } from "formik";
import { SelectValues, orderValidationSchema } from "src/api/orders";

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
