export const homeQuantityToggle = (event, id, stock) => {
const currentCardElement = document.querySelector(`#card${id}`);
// console.log(currentCardElement);
const productQuantity = currentCardElement.querySelector(".quantityvalue");
//  console.log(productQuantity);
let quantity = parseInt(productQuantity.getAttribute('data-quantity')) || 1;

if (event.target.classList.contains("qtyplus")) {
    if (quantity < stock) {
        quantity += 1;
    }
}

if (event.target.classList.contains("qtyminus")) {
    if (quantity > 1) {
        quantity -= 1;
    }
}

productQuantity.innerText = quantity;
productQuantity.setAttribute('data-quantity', quantity ); 
return quantity;
};