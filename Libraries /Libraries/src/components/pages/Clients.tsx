import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import ClientCard from "../clients_form/card/ClientCard";
import { GridUserWrapper } from ".././clients_form/card/GridUser";
import { Link, Outlet } from "react-router-dom";
import { ClientDetails } from "../clients_form/card/ClientDetails";
import { FormValuesYup, getAllClients, ClientCard as ClientCardType } from "../../api/clients";
import { UserInfo } from "../clients_form/card/LeftCardSide";

const Clients = () => {
    //TODO: pobrać wszystkich klientów
    const [cards, setCards] = useState<ClientCardType[]>([]);

    useEffect(() => {
        getAllClients().then((data) => setCards(data));
    }, []);
    console.log(cards);

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
