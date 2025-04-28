document.addEventListener("DOMContentLoaded", () => {
  const quoteBox = document.querySelector(".quote-box");
  const modal = document.getElementById("newsletter-modal");
  const closeBtn = document.querySelector(".modal-close");
  const form = document.getElementById("newsletter-form");
  const message = document.getElementById("newsletter-message");

  // Fade-in quote when entering viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (quoteBox) {
    observer.observe(quoteBox);
    setTimeout(() => {
      quoteBox.classList.add("fade-in");
    }, 300);
  }

  // Show newsletter modal after 5 seconds
  setTimeout(() => {
    modal.classList.add("show-modal");
  }, 5000);

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show-modal");
  });

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("newsletter-name").value.trim();
    const email = document.getElementById("newsletter-email").value.trim();

    message.className = ""; // Reset message styles

    if (name === "" && email === "") {
      message.textContent = "Udfyld venligst både navn og email.";
      message.classList.add("error");
      return;
    }

    if (name === "") {
      message.textContent = "Udfyld venligst dit navn.";
      message.classList.add("error");
      return;
    }

    if (!email.includes("@")) {
      message.textContent = "Indtast en gyldig emailadresse.";
      message.classList.add("error");
      return;
    }

    // Submit to backend
    fetch("/subscribe_newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        message.textContent =
          "Tak for din tilmelding! Du vil snart modtage en bekræftelsesmail.";
        message.classList.add("success");
        form.reset();
      })
      .catch(() => {
        message.textContent = "Noget gik galt. Prøv igen.";
        message.classList.add("error");
      });
  });
});
