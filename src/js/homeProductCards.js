import { addToCart } from "./addToCart.js";
import { homeQuantityToggle } from "./homeQuantityToggle.js";

export const showProductContainer = (products) => {
    if (!products) return;
 
    const productContainer = document.getElementById("productContainer");
    const productTemplate = document.getElementById("productTemplate");

    // 🔍 Only include products with bestSeller === "true"
    const bestSellers = products.filter(product => product.bestSeller === "true");

    bestSellers.forEach((product) => {
        const {id, productName, mrp, price, productImage, stock } = product;
        const productClone = productTemplate.content.cloneNode(true);
        
        productClone.querySelector("#productCard").setAttribute("id", `card${id}`);
        productClone.querySelector(".productQuantity").textContent = stock;
        productClone.querySelector(".productname").textContent = productName;
        productClone.querySelector(".productimg").src = productImage;
        productClone.querySelector(".mrp").textContent = `$${mrp}`;
        productClone.querySelector(".actualprice").textContent = `$${price}`;

        productClone.querySelector(".viewbtn").href = `product-details.html?id=${product.id}`;
        
        productClone.querySelector(".quantitypanel").addEventListener("click", (event)=>{
            homeQuantityToggle(event, id, stock);
        });

        productClone.querySelector('.addtocart').addEventListener('click', (event) => {
            console.log("add to cart clicked");
            addToCart(event, id, stock);
        });

        // ✅ Wishlist Logic
        const isLoggedIn = localStorage.getItem("isloggedin") === "1" || sessionStorage.getItem("loggedIn") === "true";
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const wishIcon = productClone.querySelector(".wish-icon i");

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
                updatedWishlist.splice(index, 1);
                wishIcon.classList.remove("fa-heart");
                wishIcon.classList.add("fa-heart-o");
                wishIcon.style.color = "inherit";
            } else {
                updatedWishlist.push(product);
                wishIcon.classList.remove("fa-heart-o");
                wishIcon.classList.add("fa-heart");
                wishIcon.style.color = "red";
            }

            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        });

        productContainer.appendChild(productClone);
    });

    // ✅ Initialize slick
    $('.productslider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
};
