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
const overlay = document.querySelector('.overlay');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('active');
  overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active');
  searchOverlay.classList.remove('active');
});

// SEARCH BAR OVERLAY
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');

searchBtn.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  overlay.classList.add('active');
});

closeSearch.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  overlay.classList.remove('active');
});
