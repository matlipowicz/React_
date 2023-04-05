import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import style from "./Orders.module.css";
import { getAllOrders, getOrderByOrderName, getOrdersByUserName, Order } from "src/api/orders";
const Orders = () => {
    const [userOrder, setUserOrder] = useState<Order[]>([]);
    const [searchOrder, setSearchedOrder] = useState("");
    const [filterOrder, setFilteredOrder] = useState("");

    useEffect(() => {
        getAllOrders().then((data) => setUserOrder(data));
    }, []);

    //* Search order
    const searchOrders = (e: React.FormEvent) => {
        e.preventDefault();
        getOrderByOrderName(searchOrder).then((data) => {
            setUserOrder(data);
            setSearchedOrder("");
        });
    };
    //* Filter order
    const filterOrders = (e: React.FormEvent) => {
        const target = e.target as HTMLSelectElement;

        getOrdersByUserName(target.value).then((data) => {
            setFilteredOrder(target.value);
            setUserOrder(data);
        });
    };

    //* Reset order
    const resetOrders = () => {
        getAllOrders();
        setFilteredOrder("");
    };

    return (
        <>
            <form className={style["form__filter"]} onSubmit={searchOrders}>
                <label htmlFor="search">Search orders</label>
                <input
                    name="search"
                    type="text"
                    className={style["input__filter"]}
                    value={searchOrder}
                    onChange={(e) => setSearchedOrder(e.target.value)}
                ></input>
                <label htmlFor="filter">Search orders</label>
                <select value={filterOrder} name="filter" className={style["input__filter"]} onChange={filterOrders}>
                    <option value="">Choose order by user name</option>
                    {userOrder.map((user) => {
                        return (
                            <option key={user.id} value={user.name}>
                                {user.name}
                            </option>
                        );
                    })}
                </select>

                <button type="submit">Search</button>
                <button onClick={resetOrders}>Reset</button>
                <Link to="add">
                    <button>Add order</button>
                </Link>
            </form>
            <div className={style["order__card"]}>
                {userOrder.map((user) => {
                    return (
                        <Link to={`${user.id}`} key={user.id}>
                            <div className={style["order__card--user"]}>
                                <p>{user.phoneNumber}</p>
                                <p>{user.orderTitle}</p>
                                <p>{user.orderQuantity}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Orders;
