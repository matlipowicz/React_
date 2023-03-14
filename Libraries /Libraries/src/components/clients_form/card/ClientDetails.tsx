import style from "./Card.module.css";
import { useState, useEffect } from "react";
import { cards } from "../../../mocks/cards";
import { Link, useParams } from "react-router-dom";

export const ClientDetails = () => {
    //? How to retrieve id from the card component (passing destructured id value will be undefined)
    const [edit, setEdit] = useState(false);
    const { clientId } = useParams();
    const id = Number(clientId);

    const editUser = () => {
        setEdit(!edit);
    };

    return (
        <>
            {cards.map((user) => {
                return user.id === id ? (
                    <div className={style["card__user"]} key={user.id}>
                        <p className={style["card__user--name"]}>
                            <strong>Name: </strong>
                            {user.name}
                        </p>
                        <p className={style["card__user--surname"]}>
                            <strong>Surname:</strong> {user.surname}
                        </p>
                        <p className={style["card__user--street"]}>
                            <strong>Street:</strong> {user.street}
                        </p>
                        <p className={style["card__user--postalcode"]}>
                            <strong> Code:</strong> {user.postCode}
                        </p>
                        <p className={style["card__user--town"]}>
                            <strong>Town:</strong> {user.town}
                        </p>
                        <p className={style["card__user--region"]}>
                            <strong>Region:</strong> {user.subRegion}
                        </p>
                        <p className={style["card__user-strong>-imgSrc"]}>
                            <strong>Image link:</strong>
                            <a href={user.imgSrc}>{user.imgSrc}</a>
                        </p>
                        <p className={style["card__user--phoneNumber"]}>
                            <strong>Phone number:</strong> {user.phoneNumber}
                        </p>

                        <Link to="edit" onClick={editUser}>
                            <button className="card__user-edit-btn">Edit</button>
                        </Link>
                    </div>
                ) : null;
            })}
        </>
    );
};
