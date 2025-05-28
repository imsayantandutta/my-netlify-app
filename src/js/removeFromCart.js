import { getCartDataFromLS } from "./getCartDataFromLS";
import { renderCart } from "./renderCart";

export const removeFromCart = (productId) => {
  let cartItems = getCartDataFromLS();

  // Filter out the product to be removed
  const updatedCart = cartItems.filter(product => product.id !== productId);

  // Save the updated cart
  localStorage.setItem("cartProductsLS", JSON.stringify(updatedCart));

  // Re-render cart
  renderCart();
};
