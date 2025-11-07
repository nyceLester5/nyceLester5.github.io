// scripts/introduction.js

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("intro-form");
  var clearBtn = document.getElementById("clear-btn");
  var addCourseBtn = document.getElementById("add-course-btn");
  var coursesContainer = document.getElementById("courses-container");
  var resultSection = document.getElementById("intro-result-section");
  var formSection = document.getElementById("intro-form-section");

  if (!form) {
    return;
  }

  // -------- Helpers --------

  function getUploadedImageSrc() {
    var fileInput = document.getElementById("imageFile");
    if (fileInput && fileInput.files && fileInput.files[0]) {
      return URL.createObjectURL(fileInput.files[0]);
    }
    // Default intro image (matches your introduction.html)
    return "images/profile.jpg";
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

    var mascotAdj = data.get("mascotAdj") || "Nova";
    var mascotAnimal = data.get("mascotAnimal") || "Lion";
    var divider = data.get("divider") || "·";

    var imgSrc = getUploadedImageSrc();
    var imageCaption = data.get("imageCaption") || displayName || "Profile Photo";

    var personalStatement = data.get("personalStatement") || "";

    // bullets mapped w/ labels
    var bulletItems = [
      { label: "Personal Background", value: data.get("bullet1") },
      { label: "Professional Background", value: data.get("bullet2") },
      { label: "Academic Background", value: data.get("bullet3") },
      { label: "Background in This Subject", value: data.get("bullet4") },
      { label: "Primary Computer Platform", value: data.get("bullet5") },
      { label: "Courses I’m Taking & Why", value: data.get("bullet6") },
      { label: "Anything Else", value: data.get("bullet7") }
    ].filter(function (item) {
      return item.value;
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

    // -------- Build HTML to match introduction.html layout --------

    var html = "";

    // Only difference: H2 text
    html += "<h2>Introduction Form</h2>";
    html += "<h3>" + displayName + " · " + mascotAdj + " " + mascotAnimal + "</h3>";

    html += "<figure>";
    html += '<img src="' + imgSrc + '" alt="' + imageCaption + '">';
    html += "<figcaption>" + imageCaption + "</figcaption>";
    html += "</figure>";

    html += '<ul class="bio-list">';

    if (personalStatement) {
      html += "<li><strong>Personal Statement:</strong> " + personalStatement + "</li>";
    }

    html += bulletItems.map(function (item) {
      return "<li><strong>" + item.label + ":</strong> " + item.value + "</li>";
    }).join("");

    if (courses.length > 0) {
      html += "<li><strong>Courses I’m Taking &amp; Why:</strong><br>";
      html += courses.map(function (c) {
        var text = "";
        if (c.dept) {
          text += c.dept + " ";
        }
        if (c.num) {
          text += c.num + " ";
        }
        if (c.name) {
          text += "– " + c.name + " ";
        }
        if (c.reason) {
          text += "(" + c.reason + ")";
        }
        return text.trim();
      }).join("<br>");
      html += "</li>";
    }

    if (quote || quoteAuthor) {
      html += '<li><strong>Favorite Quote:</strong> "' + quote + '" — ' + quoteAuthor + "</li>";
    }

    if (funnyThing) {
      html += "<li><strong>Funny thing:</strong> " + funnyThing + "</li>";
    }

    if (share) {
      html += "<li><strong>Something I'd like to share:</strong> " + share + "</li>";
    }

    if (links.length > 0) {
      html += "<li><strong>Links:</strong><br>";
      html += links.map(function (l) {
        return '<a href="' + l + '" target="_blank" rel="noopener">' + l + "</a>";
      }).join("<br>");
      html += "</li>";
    }

    html += "</ul>";

    html += '<p><a href="#" id="reset-view-link">Start over</a></p>';

    resultSection.innerHTML = html;

    // swap views
    formSection.style.display = "none";
    resultSection.style.display = "block";

    // reset handler
    var resetLink = document.getElementById("reset-view-link");
    if (resetLink) {
      resetLink.addEventListener("click", function (e) {
        e.preventDefault();
        resultSection.style.display = "none";
        formSection.style.display = "block";
      });
    }
  }

  // -------- Events --------

  // Submit → validate + build intro
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    buildIntroductionPage();
  });

  // Reset → back to form view
  form.addEventListener("reset", function () {
    window.setTimeout(function () {
      resultSection.style.display = "none";
      formSection.style.display = "block";
    }, 0);
  });

  // Clear → blank all fields (except buttons)
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      var elements = form.querySelectorAll("input, textarea");
      Array.prototype.forEach.call(elements, function (el) {
        if (
          el.type !== "button" &&
          el.type !== "submit" &&
          el.type !== "reset"
        ) {
          el.value = "";
        }
      });
      var fileInput = document.getElementById("imageFile");
      if (fileInput) {
        fileInput.value = "";
      }
    });
  }

  // Add course row
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
