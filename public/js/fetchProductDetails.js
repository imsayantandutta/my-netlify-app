// Utility: Get query param by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const productId = getQueryParam("id");
  console.log(productId);

  if (productId) {
    fetch("../api/all-products.json") // ✅ Update path if needed based on file structure
      .then(res => res.json())
      .then(products => {
        const product = products.find(p => p.id === productId);
        if (product) {
          renderProductDetails(product);
        } else {
          document.querySelector(".prod-details .container").innerHTML = `<p>Product not found.</p>`;
        }
      })
      .catch(err => {
        console.error("Error fetching product:", err);
      });
  }

  function renderProductDetails(product) {
    // Update image
    const mainSlide = document.querySelector(".main-slide");
    const subSlide = document.querySelector(".sub-slide");
  

     // Loop through product.productImages and generate HTML
    // Build image HTML
    const mainImagesHTML = product.productImages.map(image => `
      <div class="image">
        <img src="${image}" alt="${product.productName}">
      </div>
    `).join("");

    const subImagesHTML = product.productImages.map(image => `
      <div class="image">
        <img src="${image}" alt="${product.productName}">
      </div>
    `).join("");

      // Insert HTML with inner wrapper
      mainSlide.innerHTML = `<div class="images">${mainImagesHTML}</div>`;
      subSlide.innerHTML = `<div class="images">${subImagesHTML}</div>`;

    // Update text content
    document.querySelector(".product-content h1").textContent = product.productName;
    document.querySelector(".price p").textContent = `$${product.price}`;
    document.querySelector(".price p + p").innerHTML = `<del>$${product.mrp}</del>`;
    
    // Optional: calculate and display offer percentage
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    const offer = document.querySelector(".offr-txt span");
    if (offer) {
      offer.textContent = `(${discount}% Off)`;
    }

    // Set ID to buttons if needed
    // document.querySelector(".addtocart").addEventListener("click", () => {
    //   // Implement add to cart logic here using product.id
    //   alert(`Add to cart clicked for product ID: ${product.id}`);
    // });

    // document.querySelector(".addtowishlist").addEventListener("click", () => {
    //   // Wishlist logic here
    //   alert(`Add to wishlist clicked for product ID: ${product.id}`);
    // });


      // Re-initialize slick (after adding HTML)
      setTimeout(() => {
        $('.main-slide .images').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          dots:false,
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