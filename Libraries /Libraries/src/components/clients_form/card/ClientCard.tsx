import style from "./Card.module.css";
import { useState, useEffect } from "react";
import { cards } from "../../../mocks/cards";
import { LeftCardSide } from "./LeftCardSide";
import { RightCardSide } from "./RightCardSide";
import { UserData, UserInfoProps } from "./LeftCardSide";
import { Link, useParams } from "react-router-dom";
import { ClientDetails } from "./ClientDetails";
import { ClientCard as ClientCardType } from "src/api/Clients";

export default function ClientCard(cards: any) {
    return (
        <>
            <div className={style.card} key={cards.id}>
                <LeftCardSide cards={cards} />
                <RightCardSide cards={cards} />
            </div>
        </>
    );
}
