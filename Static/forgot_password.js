document
  .getElementById("forgot-password-form")
  .addEventListener("submit", function (event) {
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("error-message");

    // Basic email validation (check if email contains "@" and ".")
    if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
      errorMessage.style.display = "block";
      event.preventDefault(); // Prevent the form from submitting
    } else {
      errorMessage.style.display = "none";
    }
  });
