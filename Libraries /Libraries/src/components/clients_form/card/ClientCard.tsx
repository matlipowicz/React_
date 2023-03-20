import style from "./Card.module.css";

import { LeftCardSide } from "./LeftCardSide";
import { RightCardSide } from "./RightCardSide";
import { UserInfo } from "./LeftCardSide";

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
