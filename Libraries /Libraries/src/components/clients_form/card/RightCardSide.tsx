import style from "./Card.module.css";
import { UserData, UserInfoProps } from "./LeftCardSide";

export const RightCardSide = ({ cards }: UserInfoProps) => {
    return (
        <>
            <div className={style.cardright} key={cards.id}>
                <div className={style.cardright__fullname}>
                    <p className={style.cardright__name}>{cards.name}</p>
                    <p className={style.cardright__surname}>{cards.surname}</p>
                </div>
                <p className={style.cardright__town}>{cards.town}</p>
                <p className={style.cardright__phoneNumber}>{cards.phoneNumber}</p>
            </div>
        </>
    );
};
