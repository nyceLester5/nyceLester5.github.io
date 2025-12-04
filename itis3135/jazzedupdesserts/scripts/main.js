// ==============================
// Main JavaScript File
// Jazzed Up Desserts
// ==============================

// Basic form validation for Order Inquiry
function validateOrderForm(event) {
  event.preventDefault();

  const name = document.getElementById("cust-name").value.trim();
  const email = document.getElementById("cust-email").value.trim();

  if (name === "" || email === "") {
    alert("Please complete all required fields.");
    return;
  }

  alert("Thank you! Your inquiry has been received.");
  document.getElementById("order-form").reset();
}

// Initialize validation when form exists
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-form");
  if (form) {
    form.addEventListener("submit", validateOrderForm);
  }
});
