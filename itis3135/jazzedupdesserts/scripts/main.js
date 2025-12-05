// ==============================
// Main JavaScript File
// Jazzed Up Desserts
// ==============================


// ==============================
// Order Form Validation
// ==============================

function validateOrderForm(event) {
  event.preventDefault();

  // Get input elements safely
  var nameInput = document.getElementById("cust-name");
  var emailInput = document.getElementById("cust-email");

  // Extract values safely
  var name = nameInput ? nameInput.value.trim() : "";
  var email = emailInput ? emailInput.value.trim() : "";

  // Validation
  if (name === "" || email === "") {
    alert("Please complete all required fields.");
    return;
  }

  alert("Thank you! Your inquiry has been received.");

  var form = document.getElementById("order-form");
  if (form) {
    form.reset();
  }
}




// ==============================
// Initialize All Page Scripts
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------
  // Order Form Validation
  // ------------------------------
  const form = document.getElementById("order-form");
  if (form) {
    form.addEventListener("submit", validateOrderForm);
  }


  // ==============================
  // Home Page Slideshow
  // ==============================

  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  if (slides.length > 0) {
    slides[currentSlide].classList.add("active");

    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 3000);
  }


  // ==============================
  // Dynamic Menu Filter (Gallery Page)
  // ==============================

  const buttons = document.querySelectorAll(".filter-buttons button");
  const items = document.querySelectorAll(".gallery img");

  if (buttons.length > 0 && items.length > 0) {
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        items.forEach(item => {
          const category = item.getAttribute("data-category");

          if (filter === "all" || filter === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

});
