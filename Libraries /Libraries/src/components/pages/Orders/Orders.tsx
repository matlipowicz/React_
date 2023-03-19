import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import style from "./Orders.module.css";
import { getAllOrders, getOrderByUser, getOrderByFilter, Order } from "../../../api/orders";
const Orders = () => {
    const [userOrder, setUserOrder] = useState<Order[]>([]);
    const [searchOrder, setSearchedOrder] = useState("");
    const [filterOrder, setFilteredOrder] = useState("");

    useEffect(() => {
        getAllOrders().then((data) => setUserOrder(data));
    }, []);

    //* Search order
    const searchOrders = (e: any) => {
        e.preventDefault();
        getOrderByUser(searchOrder).then((data) => {
            setUserOrder(data);
            setSearchedOrder("");
        });
    };
    //* Filter order
    const filterOrders = (e: any) => {
        getOrderByFilter(e.target.value).then((data) => {
            setFilteredOrder(e.target.value);
            setUserOrder(data);
        });

        console.log(e.target.value);
    };

    //* Reset order
    const resetOrders = (e: any) => {
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
            </form>
            <div className={style["order__card"]}>
                {userOrder.map((user) => {
                    return (
                        <div key={user.id} className={style["order__card--user"]}>
                            <p>{user.phone}</p>
                            <p>{user.orderTitle}</p>
                            <p>{user.orderQuantity}</p>
                            <Link to={`${user.id}`}>
                                <button>Details</button>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Orders;
