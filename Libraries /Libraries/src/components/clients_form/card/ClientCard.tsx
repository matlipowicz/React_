import style from "./Card.module.css";
import { useState, useEffect } from "react";
import { cards } from "../../../mocks/cards";
import { LeftCardSide } from "./LeftCardSide";
import { RightCardSide } from "./RightCardSide";
import { UserInfo, UserInfoProps } from "./LeftCardSide";
import { Link, useParams } from "react-router-dom";
import { ClientDetails } from "./ClientDetails";
import { ClientCard as ClientCardType } from "src/api/clients";

export default function ClientCard({ cards }: { cards: UserInfo }) {
    return (
        <>
            <div className={style.card} key={cards.id}>
                <LeftCardSide cards={cards} />
                <RightCardSide cards={cards} />
            </div>
        </>
    );
}
