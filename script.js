// Menu déroulant
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
menuBtn.addEventListener("click", () => {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Tri des produits
const sortSelect = document.getElementById("sort");
const productsContainer = document.querySelector(".products");

sortSelect.addEventListener("change", () => {
  let products = Array.from(productsContainer.querySelectorAll(".product"));
  let sortValue = sortSelect.value;

  if (sortValue === "croissant") {
    products.sort((a, b) => a.dataset.price - b.dataset.price);
  } else if (sortValue === "decroissant") {
    products.sort((a, b) => b.dataset.price - a.dataset.price);
  }

  products.forEach(product => productsContainer.appendChild(product));
});
