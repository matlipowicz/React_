import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrder, Order } from "../../api/orders";
import style from "../pages/Orders/Orders.module.css";

export const OrderDetails = () => {
    const [singleOrder, setSingleOrder] = useState<Order | null>(null);
    const { orderId } = useParams();
    let id = Number(orderId);
    useEffect(() => {
        if (id) {
            getOrder(id).then((data) => setSingleOrder(data));
        }
    }, [id]);

    {
        if (singleOrder !== null) {
            return (
                <div className={style["order__card--details"]}>
                    <div key={singleOrder.id}>
                        <div style={{ display: "flex", gap: "5px" }}>
                            Imię i Nazwisko:
                            <p>{singleOrder.name}</p>
                            <p>{singleOrder.surname}</p>
                        </div>
                        <p>Zamówiono: {singleOrder.orderTitle}</p>
                        <p>Treść zamówienia: {singleOrder.orderContent}</p>
                        <p>Ilość: {singleOrder.orderQuantity}</p>
                    </div>
                </div>
            );
        }
    }
};
