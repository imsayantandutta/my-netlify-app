import '../css/style.css'

import allProducts from "../../api/all-products.json";
import { showProductContainer } from './homeProductCards';
import { showShopProductContainer, clearShopProductContainer } from './shopProductCards';
import { showNewArrivalContainer } from './newArrivalProductCards';

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("productTemplate")) {
    showProductContainer(allProducts);
  }

  if (document.getElementById("shopproductTemplate")) {
    showShopProductContainer(allProducts); // Initial render

    // Gender filter event listeners
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
      radio.addEventListener("change", () => {
        applyFilters();
      });
    });

    // Category filter event listeners
    const categoryCheckboxes = document.querySelectorAll('.brand-filter input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        applyFilters();
      });
    });
  }

  if (document.getElementById("newArrivalTemplate")) {
    showNewArrivalContainer(allProducts);
  }
});

// Filtering function for gender + category
function applyFilters() {
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
