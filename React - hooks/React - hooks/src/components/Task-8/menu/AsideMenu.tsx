import { menuData } from "../../../mocks/menu";
import { useState } from "react";
// Wróć do zadania z menu z poprzedniego zestawu (komponenty) i dodaj przycisk umożliwiający jego zwijanie i rozwijanie, wykorzystaj useState

export const AsideMenu = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <button onClick={() => setToggle(!toggle)}>Menu</button>
            <aside>
                <nav>
                    {toggle && (
                        <ul>
                            {menuData.map((item) => {
                                return (
                                    <div key={item.linkName} style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                        <div>{item.icon}</div>
                                        <p>{item.linkName}</p>
                                    </div>
                                );
                            })}
                        </ul>
                    )}
                </nav>
            </aside>
        </>
    );
};
