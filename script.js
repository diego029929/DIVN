// Ouvrir / fermer le menu
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".close-btn");

menuToggle.addEventListener("click", () => {
  sidebar.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
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

