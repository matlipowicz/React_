import style from "./Card.module.css";
import { useState, useEffect } from "react";
import { cards } from "../../../mocks/cards";
import { Link, useParams } from "react-router-dom";
import { FormValuesYup, getAllClients, ClientCard as ClientCardType, getClient } from "../../../api/Clients";

export const ClientDetails = () => {
    //? How to retrieve id from the card component (passing destructured id value will be undefined)
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState<ClientCardType | null>(null);
    const { clientId } = useParams();

    const editUser = () => {
        setEdit(!edit);
    };

    useEffect(() => {
        if (clientId) {
            getClient(clientId).then((data) => setUser(data));
        }
    }, [clientId]);

    if (!user) {
        return <p>Loading...</p>;
    }
    return (
        <>
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
                    <strong> Code:</strong> {user.postalCode}
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
        </>
    );
};
