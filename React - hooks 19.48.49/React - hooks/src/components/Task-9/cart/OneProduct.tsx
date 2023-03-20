import { useReducer } from "react";
import style from "./Cart.module.css";
import { Product } from "../../../mocks/products";
import cartReducer, { ACTIONS, initialState, InitialData } from "../useReducer/Reducer";

export const OneProduct = ({ products, state, dispatch }: { products: Product; state: InitialData; dispatch: React.Dispatch<any> }) => {
    return (
        <>
            <section className="cart__left" key={products.id}>
                <div className="cart__left--product">
                    <picture className="cart__left--picture">
                        <img className={style["cart__left--img"]} src={products.img_src} alt="photo"></img>
                    </picture>
                    <p className="cart__left--title">{products.product_title}</p>
                    <p className="cart__left--price">{products.product_price} $</p>
                    <div>
                        <button onClick={() => dispatch({ type: ACTIONS.ADD_TO_CART, payload: products })}>Add to cart</button>
                        <div className={style["cart__left--product-counter"]}>
                            <button onClick={() => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: products })}>Delete</button>
                            <button onClick={() => dispatch({ type: ACTIONS.INCREMENT, payload: state.cart })}>+</button>

                            {state.cart.map((item: any) => {
                                return item.id === products.id ? <p key={item.id}>{item.quantity}</p> : null;
                            })}

                            <button onClick={() => dispatch({ type: ACTIONS.DECREMENT, payload: state.cart })}>-</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
