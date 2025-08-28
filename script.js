// DONNÉES PRODUITS
const products = [
  {title:"Produit 1", price:49.99, images:["https://via.placeholder.com/300x300?text=1A","https://via.placeholder.com/300x300?text=1B","https://via.placeholder.com/300x300?text=1C","https://via.placeholder.com/300x300?text=1D"]},
  {title:"Produit 2", price:59.99, images:["https://via.placeholder.com/300x300?text=2A","https://via.placeholder.com/300x300?text=2B","https://via.placeholder.com/300x300?text=2C","https://via.placeholder.com/300x300?text=2D"]},
  {title:"Produit 3", price:39.99, images:["https://via.placeholder.com/300x300?text=3A","https://via.placeholder.com/300x300?text=3B","https://via.placeholder.com/300x300?text=3C","https://via.placeholder.com/300x300?text=3D"]},
  {title:"Produit 4", price:29.99, images:["https://via.placeholder.com/300x300?text=4A","https://via.placeholder.com/300x300?text=4B","https://via.placeholder.com/300x300?text=4C","https://via.placeholder.com/300x300?text=4D"]},
  {title:"Produit 5", price:19.99, images:["https://via.placeholder.com/300x300?text=5A","https://via.placeholder.com/300x300?text=5B","https://via.placeholder.com/300x300?text=5C","https://via.placeholder.com/300x300?text=5D"]},
  {title:"Produit 6", price:9.99, images:["https://via.placeholder.com/300x300?text=6A","https://via.placeholder.com/300x300?text=6B","https://via.placeholder.com/300x300?text=6C","https://via.placeholder.com/300x300?text=6D"]}
];

const container = document.getElementById("productsContainer");

// AFFICHER LES PRODUITS
function renderProducts(list){
  container.innerHTML = "";
  list.forEach(p=>{
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.dataset.title = p.title;
    card.dataset.price = p.price;
    card.dataset.image = p.images[0];

    card.innerHTML = `
      <div class="product-slider">
        ${p.images.map((img,i)=>`<img src="${img}" class="${i===0?'active':''}">`).join('')}
        <div class="slider-dots">
          ${p.images.map((_,i)=>`<span class="${i===0?'active':''}"></span>`).join('')}
        </div>
      </div>
      <div class="product-title">${p.title}</div>
      <div class="product-price">${p.price} €</div>
    `;

    container.appendChild(card);

    // Slider
    const slides = card.querySelectorAll("img");
    const dots = card.querySelectorAll(".slider-dots span");
    dots.forEach((dot,idx)=>{
      dot.addEventListener("click",()=>{
        slides.forEach(s=>s.classList.remove("active"));
        dots.forEach(d=>d.classList.remove("active"));
        slides[idx].classList.add("active");
        dots[idx].classList.add("active");
      });
    });

    // Ajouter au panier
    const btn = document.createElement("button");
    btn.classList.add("add-to-cart-btn");
    btn.innerHTML = '<i class="fas fa-shopping-cart"></i> +';
    card.querySelector(".product-price").insertAdjacentElement("afterend", btn);
    btn.addEventListener("click", e=>{
      e.stopPropagation();
      let cart = JSON.parse(localStorage.getItem("cart"))||[];
      cart.push({title:p.title, price:p.price, image:p.images[0]});
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    card.addEventListener("click", ()=> window.location.href="produit.html");
  });
}

renderProducts(products);

// TRIER PAR SELECT
const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("change",()=>{
  let sorted = [...products];
  if(sortSelect.value==="asc") sorted.sort((a,b)=>a.price-b.price);
  else if(sortSelect.value==="desc") sorted.sort((a,b)=>b.price-a.price);
  renderProducts(sorted);
});

// RECHERCHE
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", ()=>{
  const term = searchInput.value.toLowerCase();
  const filtered = products.map(p=>{
    let score = 0;
    p.title.toLowerCase().split(" ").forEach(word=>{
      if(term.includes(word)) score++;
    });
    return {...p, score};
  }).filter(p=>p.score>0).sort((a,b)=>b.score-a.score);
  renderProducts(filtered);
});

// MENU BURGER
const menuBtn = document.querySelector('.menu-burger');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click',()=>{
  sideMenu.classList.add('active');
  overlay.classList.add('show');
  document.body.style.overflow="hidden";
});
closeBtn.addEventListener('click',closeMenu);
overlay.addEventListener('click',closeMenu);
function closeMenu(){
  sideMenu.classList.remove('active');
  overlay.classList.remove('show');
  document.body.style.overflow="";
}
