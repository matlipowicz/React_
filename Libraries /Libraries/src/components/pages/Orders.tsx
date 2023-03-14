import { useParams } from "react-router-dom";
const Orders = () => {
    const { orderId } = useParams();
    return <div className="page">Orders {orderId}</div>;
};

export default Orders;
