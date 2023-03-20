import style from "src/components/clients_form/card/Card.module.css";
import { menuData } from "src/mocks/menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import Home from "src/components/pages/Home";
// Wróć do zadania z menu z poprzedniego zestawu (komponenty) i dodaj przycisk umożliwiający jego zwijanie i rozwijanie, wykorzystaj useState

export const AsideMenu = () => {
    const [toggle, setToggle] = useState(false);
    const [client, setClient] = useState(false);

    const toggleSideBarActive = () => {
        setToggle(!toggle);
    };

    const toggleSideBarInactive = () => {
        setToggle(false);
    };

    const addClient = () => {
        setClient(!client);
    };

    return (
        <>
            <button className={style.menu__btn} onClick={toggleSideBarActive}>
                Menu
            </button>

            <aside>
                <nav>
                    <ul className={!toggle ? "toggle" : "toggle toggle--open"}>
                        <button className="closeBtn" onClick={toggleSideBarInactive}>
                            X
                        </button>
                        <Home />
                        {menuData.map((item) => {
                            return (
                                <div key={item.linkName} style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                    <div>{item.icon}</div>
                                    <div>
                                        <Link to={item.link} onClick={addClient}>
                                            {item.linkName}
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                        <Link to="/register" style={{ justifyContent: "left", display: "flex" }}>
                            Register
                        </Link>
                        ;
                    </ul>
                </nav>
            </aside>
        </>
    );
};
