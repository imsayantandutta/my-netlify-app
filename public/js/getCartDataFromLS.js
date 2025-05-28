export const getCartDataFromLS = () => {
    let cartProducts = localStorage.getItem("cartProductsLS");
    if (!cartProducts) {
        return [];
    }

    cartProducts = JSON.parse(cartProducts);
    return cartProducts;
}
