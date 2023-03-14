export interface Client {
    id: number;
    imgSrc?: string;
    name: string;
    surname: string;
    street: string;
    postCode: string;
    town: string;
    subRegion?: string;
    phoneNumber: string;
}

export const getSingleClient = async (clientId: string) => {
    const response = await fetch(`http://localhost:3000/clients/${clientId}`);
    console.log("resp", response);
    if (!response.ok) {
        return undefined;
    }

    const data = await response.json();
    return data as Client;
};

export const addClient = async (values: Omit<Client, "id">) => {
    const response = await fetch(`http://localhost:3000/clients`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        return undefined;
    }

    const data = await response.json();
    return data;
};
