document.addEventListener("DOMContentLoaded", function () {
  const clearForm = document.getElementById("clear-form");

  if (clearForm) {
    clearForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the immediate submit
      if (confirm("Er du sikker på, at du vil tømme listen?")) {
        clearForm.submit(); // Manually submit the form after confirmation
      }
    });
  }

  // Display success message after clearing the list
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("cleared") === "true") {
    alert("Listen blev tømt!");
  }
});
