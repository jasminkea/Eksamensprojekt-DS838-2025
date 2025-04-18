// Fade in section for quote when it enters the viewport
document.addEventListener("DOMContentLoaded", function () {
  const quoteBox = document.querySelector(".quote-box");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // trigger when 30% of element is visible
    }
  );

  if (quoteBox) {
    observer.observe(quoteBox);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const quote = document.querySelector(".quote-box");
  if (quote) {
    setTimeout(() => {
      quote.classList.add("fade-in");
    }, 300); // slight delay for smoothness
  }
});
