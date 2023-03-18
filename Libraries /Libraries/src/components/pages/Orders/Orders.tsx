import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import style from "./Orders.module.css";
import { cards } from "../../../mocks/cards";
const Orders = () => {
    const { orderId } = useParams();
    let id = Number(orderId);

    return (
        <div className={style["order__card"]}>
            {cards.map((user) => {
                return (
                    <div key={user.id} className={style["order__card--user"]}>
                        <p>User Name</p>
                        <p>Order Title</p>
                        <p>Quantity</p>
                        <Link to={`${user.id}`}>
                            <button>Details</button>
                        </Link>
                        <Outlet />
                    </div>
                );
            })}
        </div>
    );
};

export default Orders;
