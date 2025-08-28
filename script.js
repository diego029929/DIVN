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
const searchInput = document.getElementById('searchInput');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.getElementById('searchBtn');
const productsContainer = document.querySelector('.products');

if (searchInput && searchBtn) {
  [searchInput, searchBtn].forEach(el => {
    el.addEventListener('click', () => searchBar.classList.add('active'));
  });
  searchInput.addEventListener('blur', () => searchBar.classList.remove('active'));
}

// Fonction de tri par pertinence
function relevanceScore(productTitle, query) {
  if (!query) return 0;
  const titleWords = productTitle.toLowerCase().split(/\s+/);
  const queryWords = query.toLowerCase().split(/\s+/);

  let score = 0;
  queryWords.forEach(q => {
    titleWords.forEach(t => {
      if (t.includes(q)) score += 2;   // mot trouvé
      if (t === q) score += 3;         // mot exact
    });
  });
  return score;
}

// Fonction de rendu produits
function renderProducts() {
  if (!productsContainer) return;

  const query = searchInput.value.trim();
  const sortValue = document.getElementById('sort').value;

  let products = Array.from(document.querySelectorAll('.product-card'));

  products = products.map(p => {
    return {
      element: p,
      title: p.dataset.title,
      price: parseFloat(p.dataset.price),
      score: relevanceScore(p.dataset.title, query)
    };
  });

  // Tri
  if (sortValue === "asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortValue === "desc") {
    products.sort((a, b) => b.price - a.price);
  } else { 
    products.sort((a, b) => b.score - a.score); // pertinence
  }

  // Réinjection dans le DOM
  productsContainer.innerHTML = "";
  let anyVisible = false;
  products.forEach(p => {
    if (p.score > 0 || query === "") {
      p.element.classList.add('show');
      productsContainer.appendChild(p.element);
      anyVisible = true;
    }
  });

  // Message "Aucun produit trouvé"
  let noResults = document.querySelector('.no-results');
  if (!anyVisible) {
    if (!noResults) {
      noResults = document.createElement('div');
      noResults.classList.add('no-results');
      noResults.style.textAlign = 'center';
      noResults.style.color = '#fff';
      noResults.style.fontSize = '1.2rem';
      noResults.style.marginTop = '20px';
      noResults.textContent = "Aucun produit trouvé";
      productsContainer.appendChild(noResults);
    }
  } else if (noResults) {
    noResults.remove();
  }
}

// Événements recherche & tri
if (searchInput) searchInput.addEventListener('input', renderProducts);
const sortSelect = document.getElementById('sort');
if (sortSelect) sortSelect.addEventListener('change', renderProducts);

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
  renderProducts();
});
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

// CLIQUE SUR MENU (navigation directe)
document.querySelectorAll('.side-menu ul li a').forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    overlay.classList.remove('show');
    document.body.style.overflow = "";
    // Le href des liens gère la navigation
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
