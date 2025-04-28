document.addEventListener("DOMContentLoaded", function () {
  // Grab the modal and form elements
  const modal = document.getElementById("register-modal");
  const modalClose = document.querySelector(".modal-close");
  const registerForm = document.getElementById("register-form");
  const registerButton = document.querySelector(".register-btn");

  // Open the modal when the register button is clicked
  registerButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    modal.classList.add("show-modal");
  });

  // Close the modal when the close button is clicked
  modalClose.addEventListener("click", function () {
    modal.classList.remove("show-modal");
  });

  // Close the modal if the user clicks outside of the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.remove("show-modal");
    }
  });

  // Handle form submission (to send data to the backend and register user)
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect the form data
    const formData = new FormData(registerForm);
    const formDataObj = Object.fromEntries(formData.entries());

    // Send the form data as a POST request to the /register route
    fetch("/register_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("User registered successfully!");
          window.location.href = "/login"; // Redirect to login page after successful registration
        } else {
          alert("Registration failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while registering the user.");
      });
  });
});
