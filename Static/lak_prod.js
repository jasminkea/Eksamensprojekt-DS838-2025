document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const searchInput = document.getElementById("productSearchInput");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  let products = [];
  let startIndex = 0;
  const visibleCards = 3;

  // Load products
  fetch("/get-products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      showProducts();
    })
    .catch((error) => console.error("Fejl i indlæsning af produkter:", error));

  function showProducts() {
    productList.innerHTML = "";
    const visibleProducts = products.slice(
      startIndex,
      startIndex + visibleCards
    );

    visibleProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
                <img src="/static/Images/${product.image}" alt="${
        product.title
      }">
                <h3>${product.title}</h3>
                <p><em>${product.day}</em></p>
                <p>${product.description}</p>
                <p><strong>Pris:</strong> ${product.price.toFixed(2)} kr.</p>
                <a href="/add-to-wishlist/${
                  product.id
                }" class="add-to-wishlist-button">Tilføj til liste</a>
            `;
      productList.appendChild(card);
    });
  }

  nextBtn.addEventListener("click", () => {
    if (startIndex + visibleCards < products.length) {
      startIndex++;
      showProducts();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (startIndex > 0) {
      startIndex--;
      showProducts();
    }
  });

  // Search functionality
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    productList.innerHTML = "";
    filteredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
                <img src="/static/Images/${product.image}" alt="${
        product.title
      }">
                <h3>${product.title}</h3>
                <p><em>${product.day}</em></p>
                <p>${product.description}</p>
                <p><strong>Pris:</strong> ${product.price.toFixed(2)} kr.</p>
                <a href="/add-to-wishlist/${
                  product.id
                }" class="add-to-wishlist-button">Tilføj til liste</a>
            `;
      productList.appendChild(card);
    });
  });
});
