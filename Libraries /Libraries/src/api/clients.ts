import { object, InferType, string, number } from "yup";

export type FormValuesYup = InferType<typeof schema>;

export type ClientCard = FormValuesYup & { id: number };

export const schema = object({
    name: string().required("Enter the name").min(3),
    surname: string().required("Enter the surname").min(3),
    street: string().required("Street is required").min(5),
    postalCode: string()
        .required("Enter zip code")
        .matches(/^[0-9]{2}-[0-9]{3}$/),
    town: string().required("Enter the City").min(3),
    subRegion: string().optional(),
    imgSrc: string().optional(),
    phoneNumber: string()
        .required("Enter phone number")
        .matches(/^\+[0-9]{2}?[\s]?[0-9]{3}?[\s]?[0-9]{3}?[\s]?[0-9]{3}$/),
});

export const addClient = async (values: FormValuesYup) => {
    const response = await fetch("http://localhost:3000/clients", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(values),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw new Error("Can't add client");
};

export const getAllClients = async () => {
    const response = await fetch("http://localhost:3000/clients");
    const data = await response.json();

    return data as ClientCard[];
};

export const getClient = async (id: string) => {
    const response = await fetch(`http://localhost:3000/clients/${id}`);
    const data = await response.json();

    return data as ClientCard;
};
