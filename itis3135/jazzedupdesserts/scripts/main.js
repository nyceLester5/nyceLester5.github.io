// ==============================
// Main JavaScript File
// Jazzed Up Desserts
// ==============================


// ==============================
// Order Form Validation
// ==============================

function validateOrderForm(event) {
  event.preventDefault();

  var nameInput = document.getElementById("cust-name");
  var emailInput = document.getElementById("cust-email");

  var name = nameInput ? nameInput.value.trim() : "";
  var email = emailInput ? emailInput.value.trim() : "";

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

document.addEventListener("DOMContentLoaded", function () {

  // ------------------------------
  // Order Form Validation
  // ------------------------------
  var form = document.getElementById("order-form");
  if (form) {
    form.addEventListener("submit", validateOrderForm);
  }


  // ==============================
  // Home Page Slideshow
  // ==============================

  var slides = document.querySelectorAll(".slide");
  var currentSlide = 0;

  if (slides.length > 0) {
    // first slide visible
    slides[currentSlide].classList.add("active-slide");

    setInterval(function () {
      slides[currentSlide].classList.remove("active-slide");

      currentSlide = (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add("active-slide");
    }, 3000);
  }


  // ==============================
  // Dynamic Menu Filter (Gallery Page)
  // ==============================

  var buttons = document.querySelectorAll(".filter-buttons button");
  var items = document.querySelectorAll(".gallery img");

  if (buttons.length > 0 && items.length > 0) {

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter");

        items.forEach(function (item) {
          var category = item.getAttribute("data-category");

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
