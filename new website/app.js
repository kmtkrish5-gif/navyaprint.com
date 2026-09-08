// app.js

const seedProducts = [

  [
    "Photo Frames",
    "Photo Frames",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85",
    "Classic and custom photo frames made around your memories."
  ],

  [
    "Collage Gifts",
    "Collage Gifts",
    "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=85",
    "Multi-photo layouts for birthdays, anniversaries and special moments."
  ],

  [
    "Devotional Art",
    "Devotional Art",
    "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=900&q=85",
    "Decorative devotional artwork for home, office and gifting."
  ],

  [
    "Acrylic Cutouts",
    "Acrylic Cutouts",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=85",
    "Personalized acrylic shapes, displays and creative gifts."
  ],

  [
    "Print & Events",
    "Print & Events",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
    "Posters, boards, banners and promotional print work."
  ],

  [
    "Custom Gifts",
    "Custom Gifts",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",
    "Personalized gifting ideas for every occasion."
  ],

  [
    "Wedding Frames",
    "Photo Frames",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
    "Elegant personalized wedding frames."
  ],

  [
    "Family Collage",
    "Collage Gifts",
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=85",
    "Beautiful multi-photo family collages."
  ],

  [
    "Portrait Print",
    "Art & Printing",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=85",
    "Premium artistic portrait printing."
  ],

  [
    "Event Poster",
    "Print & Events",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    "Creative promotional posters and event materials."
  ],

  [
    "Personalized Display",
    "Custom Gifts",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85",
    "Personalized display pieces for special occasions."
  ],

  [
    "Creative Artwork",
    "Art & Printing",
    "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85",
    "Creative artwork and premium print designs."
  ]

];


const seedReviews = [

  [
    "Amazing quality and very professional work. My family loved the frames.",
    "Customer, Sikar"
  ],

  [
    "Great designs, on-time service and cooperative staff.",
    "Customer, Sikar"
  ],

  [
    "Perfect place for custom gifts and photo collages.",
    "Customer, Sikar"
  ]

];


const STORAGE_KEY = "navya_products";

let products =
  JSON.parse(localStorage.getItem(STORAGE_KEY)) ||
  seedProducts;


const grid = document.getElementById("productGrid");
const catalog = document.getElementById("catalogGrid");
const filters = document.getElementById("filters");


function productCard(product, className){

  const title = product[0];
  const category = product[1];
  const image = product[2];
  const description = product[3];

  return `
    <article
      class="${className}"
      data-category="${category}"
      data-title="${title}"
      data-img="${image}"
      data-desc="${description}"
    >

      <img
        src="${image}"
        alt="${title}"
        loading="lazy"
      >

      <div class="pcopy">

        <h3>${title}</h3>

        <small>${category}</small>

        <span class="arrow">↗</span>

      </div>

    </article>
  `;
}


function renderPopular(){

  grid.innerHTML =
    products
      .slice(0,6)
      .map(product => productCard(product,"product-card"))
      .join("");

  grid
    .querySelectorAll(".product-card")
    .forEach(card => {

      card.addEventListener("click", () => {
        openModal(card);
      });

    });

}


function renderFilters(){

  const categories = [
    "All",
    ...new Set(products.map(product => product[1]))
  ];

  filters.innerHTML =
    categories
      .map(category => `
        <button
          class="${category === "All" ? "active" : ""}"
          data-cat="${category}"
        >
          ${category}
        </button>
      `)
      .join("");


  filters
    .querySelectorAll("button")
    .forEach(button => {

      button.addEventListener("click", () => {

        filters
          .querySelectorAll("button")
          .forEach(btn =>
            btn.classList.remove("active")
          );

        button.classList.add("active");

        renderCatalog(button.dataset.cat);

      });

    });

}


function renderCatalog(category = "All"){

  const list =
    category === "All"
      ? products
      : products.filter(
          product => product[1] === category
        );


  catalog.innerHTML =
    list
      .map(product => productCard(product,"catalog-card"))
      .join("");


  catalog
    .querySelectorAll(".catalog-card")
    .forEach(card => {

      card.addEventListener("click", () => {
        openModal(card);
      });

    });

}


function openModal(card){

  const modal =
    document.getElementById("modal");

  const image =
    document.getElementById("modalImage");

  const title =
    document.getElementById("modalTitle");

  const category =
    document.getElementById("modalCategory");

  const description =
    document.getElementById("modalDescription");

  const whatsapp =
    document.getElementById("modalWhatsapp");


  image.src = card.dataset.img;

  image.alt = card.dataset.title;

  title.textContent =
    card.dataset.title;

  category.textContent =
    card.dataset.category;

  description.textContent =
    card.dataset.desc ||
    "Tell us your idea and we’ll help you create something special.";


  whatsapp.href =
    "https://wa.me/916350635339?text=" +
    encodeURIComponent(
      "Hello Navya Design & Print, I am interested in: " +
      card.dataset.title
    );


  modal.classList.add("show");

}


document
  .getElementById("closeModal")
  .addEventListener("click", () => {

    document
      .getElementById("modal")
      .classList.remove("show");

  });


document
  .getElementById("modal")
  .addEventListener("click", event => {

    if(event.target.id === "modal"){

      event.target.classList.remove("show");

    }

  });


document
  .querySelectorAll(".category-strip button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const category =
        button.dataset.filter;

      renderCatalog(category);

      document
        .getElementById("gallery")
        .scrollIntoView({
          behavior:"smooth"
        });


      filters
        .querySelectorAll("button")
        .forEach(filterButton => {

          filterButton.classList.toggle(
            "active",
            filterButton.dataset.cat === category
          );

        });

    });

  });


document.getElementById("reviews").innerHTML =
  seedReviews
    .map(review => `

      <article class="review">

        <div class="stars">
          ★★★★★
        </div>

        <p>
          “${review[0]}”
        </p>

        <small>
          — ${review[1]}
        </small>

      </article>

    `)
    .join("");


document.getElementById("year").textContent =
  new Date().getFullYear();


document
  .getElementById("menuBtn")
  .addEventListener("click", () => {

    document
      .getElementById("mainNav")
      .classList.toggle("open");

  });


document
  .querySelectorAll("#mainNav a")
  .forEach(link => {

    link.addEventListener("click", () => {

      document
        .getElementById("mainNav")
        .classList.remove("open");

    });

  });


renderPopular();
renderFilters();
renderCatalog();