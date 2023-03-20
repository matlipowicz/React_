import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { getAllClients, ClientCard as ClientCardType } from "src/api/clients";
import { GridUserWrapper } from "src/components/clients_form/card/GridUser";
import ClientCard from "src/components/clients_form/card/ClientCard";

const Clients = () => {
    const [cards, setCards] = useState<ClientCardType[]>([]);

    useEffect(() => {
        getAllClients().then((data) => setCards(data));
    }, []);

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
                <Link to="add">Add client</Link>
            </GridUserWrapper>
        </>
    );
};

export default Clients;
