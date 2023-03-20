import style from "./Card.module.css";

export interface UserInfo {
    id?: number;
    name: string;
    surname: string;
    postalCode: string;
    street: string;
    town: string;
    subRegion?: string | undefined;
    imgSrc?: string | undefined;
    phoneNumber: string;
}

export interface UserInfoProps {
    cards: {
        id: number;
        imgSrc: string;
        name: string;
        surname: string;
        postalCode: string;
        street: string;
        town: string;
        subRegion: string;
        phoneNumber: string;
    };
}

export interface UserData {
    cards: UserInfo[];
}

export const LeftCardSide = ({ cards }: UserInfoProps) => {
    return (
        <>
            <div className={style.cardleft} key={cards.id}>
                <picture className={style.cardleft_avatar}>
                    <img src={cards.imgSrc} className={style.cardleft__img}></img>
                </picture>
            </div>
        </>
    );
};
