import { InferType, object, string } from 'yup';
//! Orders functionality

export type SelectValues = {
  orderContent: string;
  orderQuantity: string;
  orderTitle: string;
  phoneNumber: string;
};

export type User = InferType<typeof orderValidationSchema>;

export type Order = User & { id: number; name: string; surname: string };

export const orderValidationSchema = object({
  phoneNumber: string().required(),
  orderContent: string()
    .required()
    .matches(/^[a-zA-Z]{5,}$/),
  orderTitle: string()
    .required()
    .matches(/^[a-zA-Z]{10,}$/),
  orderQuantity: string().required().min(1).max(15),
});
const base_url = 'http://localhost:3000';
export const addOrder = async (values: User) => {
  const response = await fetch(`${base_url}/orders`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json;charset=UTF-8' },
    body: JSON.stringify(values),
  });

  if (response.ok) {
    const data = response.json();
    return data;
  }

  throw new Error("Can't add an order");
};

export const getAllOrders = async () => {
  const response = await fetch(`${base_url}/orders`);
  const data = await response.json();

  return data as Order[];
};

export const getOrder = async (id: number) => {
  const response = await fetch(`${base_url}/orders/${id}`);
  const data = await response.json();

  return data as Order;
};

export const getOrderByOrderName = async (name: string) => {
  const response = await fetch(`${base_url}/orders?q=${name}`);
  const data = await response.json();

  return data as Order[];
};

export const getOrdersByUserName = async (name: string) => {
  const response = await fetch(`${base_url}/orders?name=${name}`);
  const data = await response.json();

  return data as Order[];
};
