import { object, InferType, string } from "yup";

//! Client functionality

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

let baseUrl = "http://localhost:3000";
if (!baseUrl) {
    throw new Error("Provide correct url");
}

export const addClient = async (values: FormValuesYup) => {
    const response = await fetch(baseUrl + "/clients", {
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

export const editClient = async (values: FormValuesYup, id: string | number) => {
    const response = await fetch(`${baseUrl}/clients/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(values),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }

    throw new Error("Can't edit client");
};

export const deleteClient = async (id: string | number) => {
    const response = await fetch(`${baseUrl}/clients/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }

    throw new Error("Can't delete client");
};

export const getAllClients = async () => {
    const response = await fetch(`${baseUrl}/clients`);
    const data = await response.json();

    return data as ClientCard[];
};

export const getClient = async (id: string | number) => {
    const response = await fetch(`${baseUrl}/clients/${id}`);
    const data = await response.json();

    return data as ClientCard;
};
