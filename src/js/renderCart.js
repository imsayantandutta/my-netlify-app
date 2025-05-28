import { getCartDataFromLS } from "./getCartDataFromLS.js";

export const renderCart = () => {
  const cartTableBody = document.querySelector("tbody");
  const summarySubTotal = document.querySelector(".subtotal-price");
  const summaryTotal = document.querySelector(".total-price");

  let cartItems = getCartDataFromLS();
  cartTableBody.innerHTML = "";

  let grandTotal = 0;

  cartItems.forEach(product => {
    const { id, name, image, quantity, unitPrice } = product;
    const productTotal = quantity * unitPrice;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="d-flex justify-content-start align-items-center">
          <div class="prod-img">
            <img src="${image}" alt="${name}">
          </div>
          <div class="prod-content">
            <h6>${name}</h6>
            <p class="d-block d-md-none">$${unitPrice.toFixed(2)}</p>
          </div>
        </div>
      </td>
      <td class="d-none d-md-table-cell">$${unitPrice.toFixed(2)}</td>
      <td>
        <div class="quantitybx">
          <div class="quantity" data-id="${id}">
            <input type="button" value="-" class="qtyminus" data-id="${id}">
            <input type="text" value="${quantity}" class="qty" readonly>
            <input type="button" value="+" class="qtyplus" data-id="${id}">
          </div>
        </div>
      </td>
      <td>$${productTotal.toFixed(2)}</td>
      <td><img src="images/cross.png" class="remove" data-id="${id}" alt="remove"></td>
    `;

    cartTableBody.appendChild(row);
    grandTotal += productTotal;
  });

  summarySubTotal.textContent = `$${grandTotal.toFixed(2)}`;
  summaryTotal.textContent = `$${grandTotal.toFixed(2)}`;

  // ✅ Attach click listeners after rendering
  cartTableBody.querySelectorAll(".qtyplus, .qtyminus").forEach(button => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      const isPlus = e.target.classList.contains("qtyplus");
      const isMinus = e.target.classList.contains("qtyminus");

      const cart = getCartDataFromLS();
      const product = cart.find(item => item.id === productId);

      if (!product || typeof product.unitPrice !== "number") return;

      if (isPlus) {
        product.quantity += 1;
      } else if (isMinus && product.quantity > 1) {
        product.quantity -= 1;
      }

      product.price = product.unitPrice * product.quantity;

      localStorage.setItem("cartProductsLS", JSON.stringify(cart));
      renderCart(); // re-render
    });
  });

  // ✅ Remove button listener
  cartTableBody.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      const updatedCart = getCartDataFromLS().filter(item => item.id !== productId);
      localStorage.setItem("cartProductsLS", JSON.stringify(updatedCart));
      renderCart();
    });
  });
};
