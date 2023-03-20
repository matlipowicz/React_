import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrder, Order } from "src/api/orders";
import { OrderData } from "./OrderData";
import style from "src/components/pages/Orders/Orders.module.css";

export const OrderDetails = () => {
    const [singleOrder, setSingleOrder] = useState<Order | null>(null);
    const [toggle, setToggle] = useState<boolean>(false);
    const { orderId } = useParams();
    let id = Number(orderId);

    const handleToggle = () => [setToggle(!toggle)];

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
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "300px" }}>
                            <p>Imię: {singleOrder.name}</p>
                            <p>Nazwisko: {singleOrder.surname}</p>
                            <button onClick={handleToggle}>Order Details</button>
                        </div>

                        {toggle && singleOrder.id === id && <OrderData data={singleOrder} />}
                    </div>
                </div>
            );
        }
    }
};
