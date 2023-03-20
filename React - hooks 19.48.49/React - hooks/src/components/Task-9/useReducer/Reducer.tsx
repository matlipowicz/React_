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

type ActionType = { type: string; payload: Product };
export interface InitialData {
    cart: Product[];
}

export const initialState: InitialData = {
    cart: [],
};

export const ACTIONS = {
    ADD_TO_CART: "add_to_cart",
    REMOVE_FROM_CART: "remove_from_cart",
    INCREMENT: "increment",
    DECREMENT: "decrement",
};

// Reducer logic
const addToCart = (state: InitialData, payload: Product) => {
    const modifiedCart = [...state.cart];
    const findProduct = modifiedCart.findIndex((item) => item.id === payload.id);

    if (findProduct < 0) {
        modifiedCart.push({ ...payload, quantity: 1 });
        console.log(modifiedCart);
    } else {
        let modifiedItem = {
            ...modifiedCart[findProduct],
        };
        modifiedItem.quantity++;
        modifiedCart[findProduct] = modifiedItem;
    }
    console.log({ cart: modifiedCart });
    return { cart: modifiedCart };
};

const removeFromCart = (state: InitialData, payload: Product) => {
    const modifiedCart = [...state.cart];
    const findProduct = modifiedCart.findIndex((item) => item.id === payload.id);

    modifiedCart.splice(findProduct, 1);

    return { cart: modifiedCart };
};

const increment = (state: InitialData) => {
    return {
        ...state,
        cart: state.cart.filter((item) => {
            return { ...item, quantity: item.quantity++ };
        }),
    };
};

const decrement = (state: InitialData) => {
    return {
        ...state,
        cart: state.cart.filter((item) => {
            return { ...item, quantity: item.quantity-- };
        }),
    };
};

export default function cartReducer(state: InitialData, action: ActionType): typeof initialState {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART:
            return addToCart(state, action.payload);

        case ACTIONS.REMOVE_FROM_CART:
            return removeFromCart(state, action.payload);

        case ACTIONS.INCREMENT:
            return increment(state);

        case ACTIONS.DECREMENT:
            return decrement(state);

        default:
            return state;
    }
}
