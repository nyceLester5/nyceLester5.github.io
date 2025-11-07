// scripts/introduction.js

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("intro-form");
  var clearBtn = document.getElementById("clear-btn");
  var addCourseBtn = document.getElementById("add-course-btn");
  var coursesContainer = document.getElementById("courses-container");
  var resultSection = document.getElementById("intro-result-section");
  var formSection = document.getElementById("intro-form-section");

  if (!form) {
    return; // safety
  }

  // ---------- Helpers ----------

  function getUploadedImageSrc() {
    var fileInput = document.getElementById("imageFile");
    if (fileInput && fileInput.files && fileInput.files[0]) {
      return URL.createObjectURL(fileInput.files[0]);
    }
    // fallback to your default intro image if none selected
    return "/tlester5/itis3135/images/introduction-photo.jpg";
  }

  function buildIntroductionPage() {
    var data = new FormData(form);

    var first = data.get("firstName") || "";
    var middle = data.get("middleName") || "";
    var nick = data.get("nickname") || "";
    var last = data.get("lastName") || "";

    var displayName = nick || [first, middle, last].filter(function (x) {
      return x;
    }).join(" ");

    var mascotAdj = data.get("mascotAdj") || "";
    var mascotAnimal = data.get("mascotAnimal") || "";
    var divider = data.get("divider") || "~";

    var imgSrc = getUploadedImageSrc();
    var imageCaption = data.get("imageCaption") || "";

    var personalStatement = data.get("personalStatement") || "";

    var bullets = [
      data.get("bullet1"),
      data.get("bullet2"),
      data.get("bullet3"),
      data.get("bullet4"),
      data.get("bullet5"),
      data.get("bullet6"),
      data.get("bullet7")
    ].filter(function (b) {
      return b;
    });

    var quote = data.get("quote") || "";
    var quoteAuthor = data.get("quoteAuthor") || "";

    var funnyThing = data.get("funnyThing") || "";
    var share = data.get("share") || "";

    // Courses
    var depts = data.getAll("courseDept[]");
    var nums = data.getAll("courseNum[]");
    var names = data.getAll("courseName[]");
    var reasons = data.getAll("courseReason[]");

    var courses = depts.map(function (dept, i) {
      return {
        dept: dept,
        num: nums[i],
        name: names[i],
        reason: reasons[i]
      };
    }).filter(function (c) {
      return c.dept || c.num || c.name || c.reason;
    });

    // Links
    var links = [
      data.get("link1"),
      data.get("link2"),
      data.get("link3"),
      data.get("link4"),
      data.get("link5")
    ].filter(function (l) {
      return l;
    });

    // ---------- Build HTML result ----------
    var html = "";

    html += '<h2>Introduction Form – ' + displayName + "</h2>";

    html += "<figure>";
    html += '<img src="' + imgSrc + '" alt="' + imageCaption + '">';
    html += "<figcaption>" + imageCaption + "</figcaption>";
    html += "</figure>";

    html += "<p><strong>" + mascotAdj + " " + mascotAnimal + "</strong> " +
            divider + " " + displayName + "</p>";

    if (personalStatement) {
      html += "<p>" + personalStatement + "</p>";
    }

    if (bullets.length > 0) {
      html += "<ul>";
      html += bullets.map(function (b) {
        return "<li>" + b + "</li>";
      }).join("");
      html += "</ul>";
    }

    if (courses.length > 0) {
      html += "<h3>Current Courses</h3>";
      html += "<ul>";
      html += courses.map(function (c) {
        return "<li>" +
          (c.dept || "") + " " +
          (c.num || "") +
          (c.name ? " — " + c.name : "") +
          (c.reason ? " (" + c.reason + ")" : "") +
          "</li>";
      }).join("");
      html += "</ul>";
    }

    if (quote || quoteAuthor) {
      html += "<h3>Favorite Quote</h3>";
      html += '<p>"' + quote + '" — ' + quoteAuthor + "</p>";
    }

    if (funnyThing) {
      html += "<p><strong>Funny thing:</strong> " + funnyThing + "</p>";
    }

    if (share) {
      html += "<p><strong>Something I'd like to share:</strong> " + share + "</p>";
    }

    if (links.length > 0) {
      html += "<h3>Links</h3>";
      html += "<ul>";
      html += links.map(function (l) {
        return '<li><a href="' + l + '" target="_blank" rel="noopener">' + l + "</a></li>";
      }).join("");
      html += "</ul>";
    }

    html += '<p><a href="#" id="reset-view-link">Start over</a></p>';

    resultSection.innerHTML = html;

    // swap visibility
    formSection.style.display = "none";
    resultSection.style.display = "block";

    var resetLink = document.getElementById("reset-view-link");
    if (resetLink) {
      resetLink.addEventListener("click", function (e) {
        e.preventDefault();
        resultSection.style.display = "none";
        formSection.style.display = "block";
      });
    }
  }

  // ---------- Event Listeners ----------

  // Prevent default submit; validate; then build page
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    buildIntroductionPage();
  });

  // Reset → back to defaults + hide result
  form.addEventListener("reset", function () {
    // allow browser to reset values first
    window.setTimeout(function () {
      resultSection.style.display = "none";
      formSection.style.display = "block";
    }, 0);
  });

  // Clear button → all fields empty (except buttons)
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      var elements = form.querySelectorAll("input, textarea");
      Array.prototype.forEach.call(elements, function (el) {
        if (el.type !== "button" &&
            el.type !== "submit" &&
            el.type !== "reset" &&
            el.name !== "imageFile") {
          el.value = "";
        }
      });
      // clear file input separately
      var fileInput = document.getElementById("imageFile");
      if (fileInput) {
        fileInput.value = "";
      }
    });
  }

  // Add new course row
  if (addCourseBtn && coursesContainer) {
    addCourseBtn.addEventListener("click", function () {
      var row = document.createElement("div");
      row.className = "course-row";
      row.innerHTML =
        '<input type="text" name="courseDept[]" placeholder="Dept" required />' +
        '<input type="text" name="courseNum[]" placeholder="Number" required />' +
        '<input type="text" name="courseName[]" placeholder="Course Name" required />' +
        '<input type="text" name="courseReason[]" placeholder="Reason for taking" required />' +
        '<button type="button" class="delete-course">✕</button>';
      coursesContainer.appendChild(row);
    });

    // Delete course row
    coursesContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-course")) {
        e.target.parentElement.remove();
      }
    });
  }
});
