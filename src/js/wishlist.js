import { addToCart } from "./addToCart";

document.addEventListener("DOMContentLoaded", () => {
  const wishlistContainer = document.getElementById("wishlist-products");
  const template = document.getElementById("wishlistCardTemplate");

  if (!wishlistContainer || !template) {
    console.warn("wishlistContainer or wishlistCardTemplate not found in the DOM.");
    return;
  }

  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

  function renderWishlist() {
    wishlistContainer.innerHTML = ""; // Clear existing

    // ✅ Show message if wishlist is empty
    if (wishlistData.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "No product added, please add product.";
      emptyMessage.style.textAlign = "center";
      emptyMessage.style.fontSize = "1.2rem";
      emptyMessage.style.color = "#555";
      wishlistContainer.appendChild(emptyMessage);
      return; // Exit early
    }

    wishlistData.forEach(product => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".product-image").src = product.productImage;
      clone.querySelector(".product-name").textContent = product.productName;
      clone.querySelector(".product-mrp").innerHTML = `<del>$${parseFloat(product.mrp).toFixed(2)}</del>`;
      clone.querySelector(".product-price").textContent = `$${parseFloat(product.price).toFixed(2)}`;
      clone.querySelector(".addtocart").setAttribute("data-id", product.id);

      // 👇 Add unique card ID and structure for addToCart.js
      const card = clone.querySelector(".prodcard");
      card.setAttribute("id", `card${product.id}`);
      card.classList.add("product-card");

      clone.querySelector(".product-name").classList.add("productname");
      clone.querySelector(".product-image").classList.add("productimg");

      const quantitySpan = document.createElement("span");
      quantitySpan.className = "quantityvalue";
      quantitySpan.style.display = "none";
      quantitySpan.textContent = "1";
      card.appendChild(quantitySpan);

      const actualPriceSpan = document.createElement("span");
      actualPriceSpan.className = "actualprice";
      actualPriceSpan.style.display = "none";
      actualPriceSpan.textContent = `$${parseFloat(product.price).toFixed(2)}`;
      card.appendChild(actualPriceSpan);

      clone.querySelector(".viewbtn").href = `product-details.html?id=${product.id}`;

      clone.querySelector('.addtocart').addEventListener('click', (event) => {
        console.log("add to cart clicked");

        const id = product.id;
        const stock = product.stock || 10;
        addToCart(event, id, stock);

        setTimeout(() => {
          window.location.href = "cart.html";
        }, 100);
      });

      clone.querySelector(".wishlist-remove").setAttribute("data-id", product.id);
      wishlistContainer.appendChild(clone);
    });

    document.querySelectorAll(".wishlist-remove").forEach(button => {
      button.addEventListener("click", (e) => {
        const productId = button.getAttribute("data-id");
        wishlistData = wishlistData.filter(item => item.id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlistData));
        renderWishlist();
      });
    });
  }

  renderWishlist();
});
