import '../css/style.css';

import { showProductContainer } from './homeProductCards.js';
import { showShopProductContainer, clearShopProductContainer } from './shopProductCards.js';
import { showNewArrivalContainer } from './newArrivalProductCards.js';

document.addEventListener("DOMContentLoaded", () => {
  // Load the JSON dynamically with fetch
  fetch('/api/all-products.json')
    .then(response => response.json())
    .then(allProducts => {
      console.log('Loaded products:', allProducts); 
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
    .catch(err => {
      console.error('Failed to load products JSON:', err);
    });
});

// Filtering function for gender + category
function applyFilters(allProducts) {
  // Get selected gender
  const selectedGenderRadio = document.querySelector('input[name="gender"]:checked');
  const selectedGender = selectedGenderRadio ? selectedGenderRadio.value.toLowerCase() : "all";

  // Get selected categories
  const selectedCategories = Array.from(
    document.querySelectorAll('.brand-filter input[type="checkbox"]:checked')
  ).map(cb => cb.value.trim().toLowerCase());

  // Start with all products
  let filteredProducts = allProducts;

  // Filter by gender if not 'all'
  if (selectedGender !== "all") {
    filteredProducts = filteredProducts.filter(product =>
      product.gender.toLowerCase() === selectedGender
    );
  }

  // Filter by category if any selected
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      selectedCategories.includes(product.category.trim().toLowerCase())
    );
  }

  // Render filtered products
  clearShopProductContainer();
  showShopProductContainer(filteredProducts);
}
