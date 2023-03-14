import { useParams } from "react-router-dom";
import ClientCard from "../clients_form/card/ClientCard";
import { cards } from "../../mocks/cards";
import { GridUserWrapper } from ".././clients_form/card/GridUser";
import { Link, Outlet } from "react-router-dom";
import { ClientDetails } from "../clients_form/card/ClientDetails";

const Clients = () => {
    return (
        <>
            <GridUserWrapper>
                {cards.map((item) => {
                    return (
                        <div key={item.id}>
                            <Link to={`${item.id}`} key={item.id}>
                                <ClientCard cards={item} />
                            </Link>
                            <Outlet />
                        </div>
                    );
                })}
            </GridUserWrapper>
        </>
    );
};

export default Clients;
