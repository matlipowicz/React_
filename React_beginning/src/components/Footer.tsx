import { footerData } from "../mocks/footer";

export const Footer = () => {
    return (
        <footer>
            {Object.entries(footerData).map((item) => {
                return (
                    <a key={item[0]} href={item[1]}>
                        {item.at(0)}
                    </a>
                );
            })}
        </footer>
    );
};
