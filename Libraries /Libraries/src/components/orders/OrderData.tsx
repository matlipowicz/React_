import { Order } from "src/api/orders";
export const OrderData = ({ data }: { data: Order }) => {
    return (
        <div style={{ marginTop: "10px" }}>
            <p>Zamówiono: {data.orderTitle}</p>
            <p>Treść zamówienia: {data.orderContent}</p>
            <p>Ilość: {data.orderQuantity}</p>
        </div>
    );
};
