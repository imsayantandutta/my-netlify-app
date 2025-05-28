// 1. Get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  // 2. Read product details from DOM
  function getProductDetails() {
    const id = getProductIdFromURL();
    const name = document.querySelector(".product-content h1")?.textContent.trim();
    const priceText = document.querySelector(".price p")?.textContent.trim().replace("$", "");
    const price = parseFloat(priceText);
    const image = document.querySelector(".main-slide img")?.getAttribute("src") || "";

    return {
      id,
      name,
      price,
      image,
      quantity: 1,
    };
  }

  // 3. Get cart from localStorage
  function getCartProducts() {
    return JSON.parse(localStorage.getItem("cartProductsLS")) || [];
  }

  // 4. Save updated cart to localStorage
  function saveCartProducts(cart) {
    localStorage.setItem("cartProductsLS", JSON.stringify(cart));
  }

  // 5. Handle add to cart
  function handleAddToCart() {
    const productId = getProductIdFromURL();
    let cart = getCartProducts();

    const alreadyInCart = cart.some(product => product.id === productId);
    if (alreadyInCart) {
      alert("Product is already in the cart.");
      return;
    }

    const newProduct = getProductDetails();
    cart.push(newProduct);
    saveCartProducts(cart);
    alert("Product added to cart!");
  }

  // 6. Attach event listener
  document.querySelector(".addtocart").addEventListener("click", function (e) {
    e.preventDefault();
    handleAddToCart();
  });