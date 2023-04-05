import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllOrders, getOrder, Order } from "src/api/orders";
import { getAllClients } from "src/api/clients";
import { OrderData } from "./OrderData";
import { useQuery } from "@tanstack/react-query";
import style from "src/components/pages/Orders/Orders.module.css";

export const OrderDetails = () => {
    // const [singleOrder, setSingleOrder] = useState<Order | null>(null);
    // const [client, setClient] = useState<any>(null);
    const [toggle, setToggle] = useState<boolean>(false);
    const { orderId } = useParams();
    let id = Number(orderId);

    const handleToggle = () => [setToggle(!toggle)];

    //? Można robić podwójne query, nie lepiej użyć useQueries?

    const { data: singleOrder } = useQuery({
        queryKey: ["orders", id],
        queryFn: () => getOrder(id),
    });

    const { data: client } = useQuery({
        queryKey: ["orders"],
        queryFn: () => getAllClients(),
    });

    // useEffect(() => {
    //     if (id) {
    //         getOrder(id)
    //             .then((data) => setSingleOrder(data))
    //             .catch((error) => console.log(error));
    //     }
    // }, [id]);

    // useEffect(() => {
    //     getAllClients().then((data) => setClient(data));
    // }, []);
    console.log("single-order", singleOrder);
    console.log("all-orders");
    {
        if (singleOrder !== null) {
            return (
                <div className={style["order__card--details"]}>
                    <div key={singleOrder?.id}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "300px" }}>
                            {client &&
                                client.map((item: any) => {
                                    if (item.phoneNumber === singleOrder?.phoneNumber) {
                                        return (
                                            <div key={item.id}>
                                                <p>Imię: {item.name}</p>
                                                <p>Nazwisko: {item.surname}</p>
                                            </div>
                                        );
                                    }
                                })}

                            <button onClick={handleToggle}>Order Details</button>
                        </div>

                        {toggle && singleOrder?.id === id && <OrderData data={singleOrder} />}
                    </div>
                </div>
            );
        }
    }
};
