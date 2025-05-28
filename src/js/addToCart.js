import { getCartDataFromLS } from "./getCartDataFromLS";

export const addToCart = (event, id, stock) => {
    let arrLocalStorageProduct = getCartDataFromLS();

    // 🔥 Use the clicked button's closest parent with class "prodcard"
    const currentProductElement = event.target.closest('.prodcard');
    if (!currentProductElement) {
        console.error("Product card not found for Add to Cart.");
        return;
    }

    let quantity = parseInt(currentProductElement.querySelector('.quantityvalue').innerText);
    let priceText = currentProductElement.querySelector('.actualprice').innerText.replace("$", "");
    let unitPrice = parseFloat(priceText); 

    let name = currentProductElement.querySelector('.productname').innerText;
    let image = currentProductElement.querySelector('.productimg').getAttribute('src');

    let existingProduct = arrLocalStorageProduct.find(product => product.id === id);

    if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + quantity;
        existingProduct.price = unitPrice * existingProduct.quantity;
    } else {
        arrLocalStorageProduct.push({
            id,
            name,
            image,
            quantity,
            unitPrice,
            price: unitPrice * quantity
        });
    }

    localStorage.setItem("cartProductsLS", JSON.stringify(arrLocalStorageProduct));
};
