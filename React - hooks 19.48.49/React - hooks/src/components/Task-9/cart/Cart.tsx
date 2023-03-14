import style from "./Cart.module.css";
import { OneProduct } from "./OneProduct";
import { productsData } from "../../../mocks/products";
import { Action } from "@remix-run/router";
import { InitialData } from "../useReducer/Reducer";
import { Product } from "../../../mocks/products";

//TODO

/*
    - Dodanie do koszyka (wyświetlenie się po prawej stronie komponentu koszyk ze headerem koszyka, tytułem produktu, ceną oraz przyciskiem umożliwającyn usuniecie lub zmianę ilości produktów),
    - Z danych zawartych jako mock, trzeba wygenerować te produkty (po lewej stronie),
    - Na przyciśk dodaj do koszyka, powinien pojawić się produkt (po prawej stronie),
    - Na przycisk usuń trzeba skasować element z koszyka
    - Wykorzystać useReducer do zmiany stanu (dodaj, usuń, zwiększ/zmniejsz ilość)
    - Wyrenderuj przycisk add to cart lub delete w zależności od tego czy item 

*/

export const Cart = ({ state, dispatch }: { state: InitialData; dispatch: React.Dispatch<any> }) => {
    return (
        <div className={style["wrapper"]}>
            <div className={style["cart"]}>
                {productsData.map((product) => {
                    // @ts-ignore
                    return <OneProduct products={product} key={product.id} dispatch={dispatch} state={state} />;
                })}
            </div>
        </div>
    );
};
