import { useReducer } from "react";
import { Product } from "../../../mocks/products";
import productsData from "../../../mocks/products";

// Stworz reducer, który pozwoli na następujące akcje:
// * dodawanie produktu do koszyka
// * usuwanie produktu z koszyka
// * zmienianie ilości produktu w koszyku
// W zadaniu chodzi o samą logikę, natomiast jeśli chcesz możesz przygotować też widok.

// !-------------------------------------------------------------------------------------------------------------------------

//TODO

/*
    - Dodanie do koszyka (wyświetlenie się po prawej stronie komponentu koszyk ze headerem koszyka, tytułem produktu, ceną oraz przyciskiem umożliwającyn usuniecie lub zmianę ilości produktów),
    - Z danych zawartych jako mock, trzeba wygenerować te produkty (po lewej stronie),
    - Na przyciśk dodaj do koszyka, powinien pojawić się produkt (po prawej stronie),
    - Na przycisk usuń trzeba skasować element z koszyka
    - Wykorzystać useReducer do zmiany stanu (dodaj, usuń, zwiększ/zmniejsz ilość)

*/

type ActionType = { type: string; payload: any };
interface InitialData {
    products: Product[];
    cart: Product[];
}

export const initialState: InitialData = {
    products: productsData,
    cart: [],
};

export const ACTIONS = {
    ADD_TO_CART: "add_to_cart",
    REMOVE_FROM_CART: "remove_from_cart",
    INCREMENT: "increment",
    DECREMENT: "decrement",
};
export default function cartReducer(state: typeof initialState, action: ActionType) {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART:
            return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
        case ACTIONS.REMOVE_FROM_CART:
            return { ...state, cart: state.cart.filter((item: Product) => item.id !== action.payload.id) };
        case ACTIONS.INCREMENT:
            return {
                ...state,
                cart: state.cart.filter((item) => {
                    return { ...item, quantity: item.quantity++ };
                }),
            };
        case ACTIONS.DECREMENT:
            return {
                ...state,
                cart: state.cart.filter((item) => {
                    return { ...item, quantity: item.quantity-- };
                }),
            };

        default:
            return state;
    }
}
