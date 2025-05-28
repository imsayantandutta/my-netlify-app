import { addToCart } from "./addToCart";
import { shopQuantityToggle } from "./shopQuantityToggle";

export const clearShopProductContainer = () => {
    const container = document.getElementById("shopproductcontainer");
    if (container) container.innerHTML = ""; // Clear previous cards
  };


export const showShopProductContainer = (shopproducts) => {
    if (!shopproducts) return;

    const productContainer = document.getElementById("shopproductcontainer");
    const productTemplate = document.getElementById("shopproductTemplate");

    shopproducts.forEach((product) => {
        // console.log("Rendering product:", product);
        const {id, productName, mrp, price, productImage, stock } = product;
        const productClone = productTemplate.content.cloneNode(true);
        
        productClone.querySelector(".shopproductCard").setAttribute("id", `card${id}`);
        productClone.querySelector(".productQuantity").textContent = stock;
        productClone.querySelector(".productname").textContent = productName;
        productClone.querySelector(".productimg").src = productImage;
        productClone.querySelector(".mrp").textContent = `$${mrp}`;
        productClone.querySelector(".actualprice").textContent = `$${price}`;
        productClone.querySelector(".addtocart").setAttribute("data-id", product.id);

        productClone.querySelector(".viewbtn").href = `product-details.html?id=${product.id}`;
        
        productClone.querySelector(".quantitypanel").addEventListener("click", (event)=>{
            shopQuantityToggle(event, id, stock);
        });

        productClone.querySelector('.addtocart').addEventListener('click', (event) => {
            event.preventDefault();
            console.log("add to cart clicked");
            const productElement = productClone.querySelector(`#card${id}`);
            addToCart(event, id, stock, productElement);
        
            // Optional delay (e.g., show success message for 1s)
            setTimeout(() => {
                window.location.href = "cart.html";
            }, 500); // 1 second delay
        });

        // 👇 Wishlist Logic Start
        const isLoggedIn = localStorage.getItem("isloggedin") === "1" || sessionStorage.getItem("loggedIn") === "true";
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const wishIcon = productClone.querySelector(".wish-icon i");

        // If product already in wishlist, fill the heart
        if (wishlist.some(item => item.id === id)) {
            wishIcon.classList.remove("fa-heart-o");
            wishIcon.classList.add("fa-heart");
            wishIcon.style.color = "red";
        }

        wishIcon.addEventListener("click", () => {
            if (!isLoggedIn) {
                alert("Please log in to use the wishlist.");
                return;
            }
    
            const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            const index = updatedWishlist.findIndex(item => item.id === id);
    
            if (index > -1) {
                // Remove from wishlist
                updatedWishlist.splice(index, 1);
                wishIcon.classList.remove("fa-heart");
                wishIcon.classList.add("fa-heart-o");
                wishIcon.style.color = "inherit";
            } else {
                // Add to wishlist
                updatedWishlist.push(product);
                wishIcon.classList.remove("fa-heart-o");
                wishIcon.classList.add("fa-heart");
                wishIcon.style.color = "red";
            }
    
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        });

        productContainer.appendChild(productClone);
    });


};
