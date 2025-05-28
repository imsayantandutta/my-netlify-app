document.querySelector(".addtowishlist").addEventListener("click", async function (e) {
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const alreadyInWishlist = wishlist.some(item => item.id === productId);
  if (alreadyInWishlist) {
    alert("Product is already in your wishlist.");
    return;
  }

  // Fetch product data
  const response = await fetch("../api/all-products.json");
  const products = await response.json();
  const product = products.find(p => p.id === productId);

  if (!product) {
    alert("Product not found.");
    return;
  }

  console.log("Fetched product:", product);
  
  // Normalize data with consistent keys
  const wishlistItem = {
    id: product.id,
    productName: product.productName,
    price: parseFloat(product.price),
    mrp: parseFloat(product.mrp),
    productImage: product.productImage,
  };

  wishlist.push(wishlistItem);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Product added to wishlist!");
});
