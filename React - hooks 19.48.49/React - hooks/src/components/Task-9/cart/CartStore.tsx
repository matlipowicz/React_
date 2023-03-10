import style from "./Cart.module.css";
type CartProduct = {
    cart: {
        img_src: string;
        product_title: string;
        product_price: number;
        id: number;
        quantity: number;
    };
};

export const CartContent = ({ cart }: CartProduct) => {
    return (
        <>
            <div className={style["cart__content"]}>
                <section className={style["cart__right"]}>
                    <header className="cart__right--header"></header>
                    <div>
                        <picture className="cart__right--picture">
                            <img src={cart.img_src} alt="Product photo" className={style["cart__left--img"]}></img>
                        </picture>
                        <div className="cart__right--details">
                            <p className="cart__right--title">{cart.product_title}</p>
                            <p className="cart__right--price">{cart.product_price}</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
