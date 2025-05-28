let allProducts = []; 


fetch('../api/all-products.json')
  .then(response => response.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts); 
  });


  const shopProductContainer = document.getElementById("shopproductcontainer");
  const template = document.getElementById("shopproductTemplate");
  
  function renderProducts(products) {
    shopProductContainer.innerHTML = ""; // Clear previous cards
  
    products.forEach(product => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".productimg").src = product.productImage;
      clone.querySelector(".productname").textContent = product.productName;
      clone.querySelector(".mrp").textContent = `$${product.mrp}`;
      clone.querySelector(".actualprice").textContent = `$${product.price}`;
      clone.querySelector(".productQuantity").textContent = product.stock;
      shopProductContainer.appendChild(clone);
    });
  }

  
  document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener("change", (event) => {
      const selectedGender = event.target.value;
  
      // Filter and render
      const filteredProducts = allProducts.filter(product => product.gender === selectedGender);
      renderProducts(filteredProducts);
    });
  });