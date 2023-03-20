import { object, InferType, string, number } from "yup";
//! Orders functionality

export type SelectValues = {
    phoneNumber: string;
    orderContent: string;
    orderQuantity: string;
    orderTitle: string;
};

export type User = InferType<typeof orderValidationSchema>;

export type Order = User & { id: number; phone: string; surname: string };

export const orderValidationSchema = object({
    name: string().required(),
    orderContent: string()
        .required()
        .matches(/^[a-zA-Z]{5,}$/),
    orderTitle: string()
        .required()
        .matches(/^[a-zA-Z]{10,}$/),
    orderQuantity: number().integer().required().min(1).max(15),
});

export const getAllOrders = async () => {
    const response = await fetch("http://localhost:3000/orders");
    const data = await response.json();

    return data as Order[];
};

export const getOrder = async (id: number) => {
    const response = await fetch(`http://localhost:3000/orders/${id}`);
    const data = await response.json();

    return data as Order;
};

export const getOrderByUser = async (name: string) => {
    const response = await fetch(`http://localhost:3000/orders?q=${name}`);
    const data = await response.json();

    return data as Order[];
};

export const getOrderByFilter = async (name: string) => {
    const response = await fetch(`http://localhost:3000/orders?name=${name}`);
    const data = await response.json();

    return data as Order[];
};
