import style from "./Card.module.css";
import { useState, useEffect } from "react";
import { cards } from "../../../mocks/cards";
import { LeftCardSide } from "./LeftCardSide";
import { RightCardSide } from "./RightCardSide";
import { UserData, UserInfoProps } from "./LeftCardSide";
import { Link, useParams } from "react-router-dom";
import { ClientDetails } from "./ClientDetails";
import { getSingleClient, Client } from "../../../api/clients";

export default function ClientCard() {
    const [details, setDetails] = useState(false);
    const { clientId } = useParams();
    const [cards, setCards] = useState<Client | undefined>(undefined);

    useEffect(() => {
        if (clientId) {
            getSingleClient(clientId).then((data) => {
                console.log("data", data);
                setCards(data);
            });
        }
    }, [clientId]);

    const showDetails = () => {
        setDetails(!details);
        // console.log("user", cards.id);
        console.log(clientId);
    };
    if (!cards) {
        return <>Loading...</>;
    }

    return (
        <>
            <div className={style.card} key={cards.id} onClick={showDetails}>
                <LeftCardSide cards={cards} />
                <RightCardSide cards={cards} />
            </div>
        </>
    );
}
