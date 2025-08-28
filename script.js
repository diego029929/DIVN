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
  el.addEventListener('click', () => {
    searchBar.classList.add('active');
  });
});

searchInput.addEventListener('blur', () => {
  searchBar.classList.remove('active');
});

// PRODUITS ANIMATION AU SCROLL
const productCards = document.querySelectorAll('.product-card');

function showProductsOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  productCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom){
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', showProductsOnScroll);
showProductsOnScroll();
    
