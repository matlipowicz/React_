import { menuData } from "../mocks/menu";

export const AsideMenu = () => {
    return (
        <aside>
            <nav>
                <ul>
                    {menuData.map((item) => {
                        return (
                            <div key={item.linkName}>
                                <p>{item.linkName}</p>
                                <div>{item.icon}</div>
                            </div>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};
