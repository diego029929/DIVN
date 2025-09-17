// SLIDER (4 images par produit)
document.querySelectorAll('.product-slider').forEach(slider => {
  const slides = slider.querySelectorAll('img');
  const dots = slider.querySelectorAll('.slider-dots span');

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[idx].classList.add('active');
      dots[idx].classList.add('active');
    });
  });
});

// MENU BURGER
const menuBtn = document.querySelector('.menu-burger');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('active');
  overlay.classList.add('show');
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('show');
  document.body.style.overflow = "";
});

overlay.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('show');
  document.body.style.overflow = "";
});

// BARRE DE RECHERCHE
const searchInput = document.querySelector('.search-bar input');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.getElementById('searchBtn');
const productContainer = document.querySelector('.products');

[searchInput, searchBtn].forEach(el => {
  el.addEventListener('focus', () => searchBar.classList.add('active'));
  el.addEventListener('blur', () => searchBar.classList.remove('active'));
});

// FILTRAGE + TRI
function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function similarity(str, keyword) {
  const words = normalize(str).split(" ");
  const keys = normalize(keyword).split(" ");
  return keys.reduce((score, key) => score + (words.includes(key) ? 1 : 0), 0);
}

function filterProducts() {
  const query = searchInput.value.trim();
  const sort = document.getElementById('sort').value;
  let cards = Array.from(document.querySelectorAll('.product-card'));

  // Calcul pertinence
  cards.forEach(card => {
    card.dataset.score = similarity(card.dataset.title, query);
  });

  // Filtrer si recherche
  if(query !== "") {
    cards = cards.filter(card => card.dataset.score > 0);
  }

  // Tri
  if(sort === "pertinence") {
    cards.sort((a, b) => b.dataset.score - a.dataset.score);
  } else if(sort === "asc") {
    cards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
  } else if(sort === "desc") {
    cards.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
  }

  // Afficher
  productContainer.innerHTML = "";
  cards.forEach(c => productContainer.appendChild(c));
}

searchInput.addEventListener("input", filterProducts);
document.getElementById("sort").addEventListener("change", filterProducts);

// PRODUITS ANIMATION AU SCROLL
const productCards = document.querySelectorAll('.product-card');

function showProductsOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  productCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom) card.classList.add('show');
  });
}

window.addEventListener('load', () => productCards.forEach(card => card.classList.add('show')));
window.addEventListener('scroll', showProductsOnScroll);

// CLIQUE SUR PRODUITS -> produit.html
productCards.forEach(card => {
  card.addEventListener('click', () => {
    window.location.href = 'produit.html';
  });
});

// AJOUT DU BOUTON "AJOUTER AU PANIER"
productCards.forEach(card => {
  const priceDiv = card.querySelector('.product-price');
  const btn = document.createElement('button');
  btn.classList.add('add-to-cart-btn');
  btn.innerHTML = '<i class="fas fa-shopping-cart"></i> +';
  priceDiv.insertAdjacentElement('afterend', btn);

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const title = card.dataset.title;
    const price = card.dataset.price;
    const image = card.dataset.image;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ title, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
  });
});

// CLIQUE SUR MENU
document.querySelectorAll('.side-menu ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const text = link.textContent.trim();
    let page = 'index.html';
    if(text.includes('Tous nos produits')) page = 'produits.html';
    else if(text.includes("L'histoire")) page = 'histoire.html';
    else if(text.includes("Besoin d'aide")) page = 'aide.html';
    else if(text.includes('The FAM')) page = 'fam.html';
    else if(text.includes('L’équipage')) page = 'equipage.html';
    else if(text.includes('Créer un compte')) page = 'compte.html';
    window.location.href = page;
  });
});

// PANIER
const cartIcon = document.createElement('div');
cartIcon.classList.add('cart-icon');
cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
document.querySelector('header').appendChild(cartIcon);

cartIcon.addEventListener('click', () => {
  window.location.href = 'panier.html';
});
