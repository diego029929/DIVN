// SLIDER
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

[searchInput, searchBtn].forEach(el => {
  el.addEventListener('click', () => searchBar.classList.add('active'));
});

searchInput.addEventListener('blur', () => searchBar.classList.remove('active'));

// PRODUITS ANIMATION AU SCROLL
const productCards = document.querySelectorAll('.product-card');

function showProductsOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  productCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom) card.classList.add('show');
  });
}

window.addEventListener('load', () => {
  productCards.forEach(card => card.classList.add('show'));
});

window.addEventListener('scroll', showProductsOnScroll);

// CLIQUE SUR PRODUITS -> page produit.html
productCards.forEach(card => {
  card.addEventListener('click', () => {
    window.location.href = 'produit.html';
  });
});

// CLIQUE SUR MENU
document.querySelectorAll('.side-menu ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const text = link.textContent.trim();
    let page = 'index.html';
    if(text.includes('Tous nos produits')) page = 'produits.html';
    else if(text.includes('L\'histoire')) page = 'histoire.html';
    else if(text.includes('Besoin d\'aide')) page = 'aide.html';
    else if(text.includes('The FAM')) page = 'fam.html';
    else if(text.includes('L’équipage')) page = 'equipage.html';
    else if(text.includes('Créer un compte')) page = 'compte.html';
    window.location.href = page;
  });
});

// CLIQUE SUR PANIER -> panier.html
const cartIcon = document.createElement('div');
cartIcon.classList.add('cart-icon');
cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
document.querySelector('header').appendChild(cartIcon);

cartIcon.addEventListener('click', () => window.location.href = 'panier.html');

// AJOUT DU BOUTON "PLUS AU PANIER"
productCards.forEach(card => {
  const priceDiv = card.querySelector('.product-price');
  const btn = document.createElement('button');
  btn.classList.add('add-to-cart-btn');
  btn.innerHTML = '<i class="fas fa-shopping-cart"></i> +';
  priceDiv.insertAdjacentElement('afterend', btn);

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const productName = card.querySelector('.product-title').textContent;
    const productPrice = card.querySelector('.product-price').textContent;
    console.log(`Ajout au panier: ${productName} (${productPrice})`);
    alert(`${productName} a été ajouté au panier !`);
  });
});
  
