//import '../css/style.css';
import { showProductContainer } from './homeProductCards.js';
import { showShopProductContainer, clearShopProductContainer } from './shopProductCards.js';
import { showNewArrivalContainer } from './newArrivalProductCards.js';

console.log('Products Loaded:', 'Hello');

document.addEventListener("DOMContentLoaded", () => {
  console.log('Products Loaded:', allProducts);
  fetch('/api/all-products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(allProducts => {
      console.log('Products Loaded:', allProducts); // Confirm it's working

      if (document.getElementById("productTemplate")) {
        showProductContainer(allProducts);
      }

      if (document.getElementById("shopproductTemplate")) {
        showShopProductContainer(allProducts); // Initial render

        // Gender filter event listeners
        document.querySelectorAll('input[name="gender"]').forEach(radio => {
          radio.addEventListener("change", () => {
            applyFilters(allProducts);
          });
        });

        // Category filter event listeners
        const categoryCheckboxes = document.querySelectorAll('.brand-filter input[type="checkbox"]');
        categoryCheckboxes.forEach(checkbox => {
          checkbox.addEventListener("change", () => {
            applyFilters(allProducts);
          });
        });
      }

      if (document.getElementById("newArrivalTemplate")) {
        showNewArrivalContainer(allProducts);
      }
    })
    .catch(error => {
      console.error('Failed to load products JSON:', error);
    });
});

// Filtering function for gender + category
function applyFilters(allProducts) {
  const selectedGenderRadio = document.querySelector('input[name="gender"]:checked');
  const selectedGender = selectedGenderRadio ? selectedGenderRadio.value.toLowerCase() : "all";

  const selectedCategories = Array.from(
    document.querySelectorAll('.brand-filter input[type="checkbox"]:checked')
  ).map(cb => cb.value.trim().toLowerCase());

  let filteredProducts = allProducts;

  if (selectedGender !== "all") {
    filteredProducts = filteredProducts.filter(product =>
      product.gender.toLowerCase() === selectedGender
    );
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      selectedCategories.includes(product.category.trim().toLowerCase())
    );
  }

  clearShopProductContainer();
  showShopProductContainer(filteredProducts);
}
