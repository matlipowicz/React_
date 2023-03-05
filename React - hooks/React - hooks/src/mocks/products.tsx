export interface Product {
    img_src: string;
    product_title: string;
    product_price: number;
    id: number;
    quantity: number;
}

export const productsData: Product[] = [
    {
        img_src: "../../public/photos/trail-running-shoe-svg-icon-free-running-shoes-icon-11553411374cmdx4xovql.png",
        product_title: "Running shoes",
        product_price: 29.99,
        id: 1,
        quantity: 0,
    },

    {
        img_src: "../../public/photos/3531810.png",
        product_title: "Elegant shoes",
        product_price: 49.99,
        id: 2,
        quantity: 0,
    },
    {
        img_src: "../../public/photos/pngtree-hand-painted-sneakers-decorative-material-image_1108240.jpg",
        product_title: "Sneakers",
        product_price: 79.99,
        id: 3,
        quantity: 0,
    },
];

export default productsData;
