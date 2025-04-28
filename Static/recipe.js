document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const recipeCarousel = document.getElementById("recipeGrid");
  const leftBtn = document.querySelector(".carousel-btn.left");
  const rightBtn = document.querySelector(".carousel-btn.right");
  const bannerImg = document.getElementById("banner-img");

  // Slideshow
  const images = JSON.parse(bannerImg.getAttribute("data-images"));
  let currentImage = 0;

  function startSlideshow() {
    setInterval(() => {
      bannerImg.classList.add("fade-out");

      setTimeout(() => {
        currentImage = (currentImage + 1) % images.length;
        bannerImg.src = images[currentImage];
        bannerImg.classList.remove("fade-out");
      }, 500);
    }, 3000);
  }

  startSlideshow();

  // Recipe Carousel
  const scrollStep = 300; // Adjust scroll distance per click

  rightBtn.addEventListener("click", () => {
    recipeCarousel.scrollBy({ left: scrollStep, behavior: "smooth" });
  });

  leftBtn.addEventListener("click", () => {
    recipeCarousel.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  // Search functionality
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const recipeCards = document.querySelectorAll(".recipe-card");

    recipeCards.forEach((card) => {
      const title = card
        .querySelector(".recipe-title")
        .textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
