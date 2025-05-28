function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function fetchProductFromSource(productId, src) {
  try {
    const response = await fetch(src);
    const products = await response.json();

    console.log(`Fetched from source: ${src}`, products);

    const product = products.find(p => String(p.id) === String(productId));
    return product || null;
  } catch (err) {
    console.error(`Failed to fetch or parse from ${src}:`, err);
    return null;
  }
}

async function loadProductDetails() {
  const productId = getQueryParam("id");
  console.log("Product ID:", productId);

  if (!productId) {
    document.querySelector(".prod-details .container").innerHTML = `<p>Invalid product ID.</p>`;
    return;
  }

  const source = "api/all-products.json";

  const product = await fetchProductFromSource(productId, source);

  if (product) {
    renderProductDetails(product);
  } else {
    document.querySelector(".prod-details .container").innerHTML =
      `<p>Something went wrong while fetching product details.</p>`;
  }
}

loadProductDetails();

function renderProductDetails(product) {
  const mainSlide = document.querySelector(".main-slide");
  const subSlide = document.querySelector(".sub-slide");

  // Fallback if productImages missing
  if (!Array.isArray(product.productImages) || product.productImages.length === 0) {
    product.productImages = [product.productImage || "images/default.png"];
  }

  const mainImagesHTML = product.productImages.map(image => `
    <div class="image"><img src="${image}" alt="${product.productName}"></div>
  `).join("");
  const subImagesHTML = product.productImages.map(image => `
    <div class="image"><img src="${image}" alt="${product.productName}"></div>
  `).join("");

  mainSlide.innerHTML = `<div class="images">${mainImagesHTML}</div>`;
  subSlide.innerHTML = `<div class="images">${subImagesHTML}</div>`;

  document.querySelector(".product-content h1").textContent = product.productName;
  document.querySelector(".price p").textContent = `$${product.price}`;
  document.querySelector(".price p + p").innerHTML = `<del>$${product.mrp}</del>`;

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const offer = document.querySelector(".offr-txt span");
  if (offer) offer.textContent = `(${discount}% Off)`;

  document.querySelector(".addtocart").addEventListener("click", () => {
    alert(`Add to cart clicked for product ID: ${product.id}`);
  });

  document.querySelector(".addtowishlist").addEventListener("click", () => {
    alert(`Add to wishlist clicked for product ID: ${product.id}`);
  });

  setTimeout(() => {
    $('.main-slide .images').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      dots: false,
      asNavFor: '.sub-slide .images',
      infinite: true
    });

    $('.sub-slide .images').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.main-slide .images',
      dots: false,
      centerMode: false,
      focusOnSelect: true,
      infinite: true
    });
  }, 100);
}
