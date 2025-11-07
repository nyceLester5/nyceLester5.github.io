// scripts/introduction.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const clearBtn = document.getElementById("clear-btn");
  const addCourseBtn = document.getElementById("add-course-btn");
  const coursesContainer = document.getElementById("courses-container");
  const resultSection = document.getElementById("intro-result-section");
  const formSection = document.getElementById("intro-form-section");

  // prevent default submit (no page refresh)
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      // built-in HTML5 validation messages
      form.reportValidity();
      return;
    }
    buildIntroductionPage();
  });

  // Reset button → restore default values + show form again
  form.addEventListener("reset", () => {
    setTimeout(() => {
      resultSection.style.display = "none";
      formSection.style.display = "block";
    }, 0);
  });

  // Clear button → wipe all inputs & textareas
  clearBtn.addEventListener("click", () => {
    Array.from(form.querySelectorAll("input, textarea")).forEach(el => {
      // leave type="button"/"submit"/"reset" alone
      if (el.type !== "button" && el.type !== "submit" && el.type !== "reset") {
        el.value = "";
      }
    });
  });

  // Add course row
  addCourseBtn.addEventListener("click", () => {
    const row = document.createElement("div");
    row.className = "course-row";
    row.innerHTML = `
      <input type="text" name="courseDept[]" placeholder="Dept" required />
      <input type="text" name="courseNum[]" placeholder="Number" required />
      <input type="text" name="courseName[]" placeholder="Course Name" required />
      <input type="text" name="courseReason[]" placeholder="Reason" required />
      <button type="button" class="delete-course">✕</button>
    `;
    coursesContainer.appendChild(row);
  });

  // Delete course row when clicking ✕
  coursesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-course")) {
      e.target.parentElement.remove();
    }
  });

  // Build the intro page layout from the form values
  function buildIntroductionPage() {
    const data = new FormData(form);

    const first = data.get("firstName") || "";
    const middle = data.get("middleName") || "";
    const nick = data.get("nickname") || "";
    const last = data.get("lastName") || "";

    const displayName = nick || [first, middle, last].filter(Boolean).join(" ");

    const mascotAdj = data.get("mascotAdj") || "";
    const mascotAnimal = data.get("mascotAnimal") || "";
    const divider = data.get("divider") || "~";

    const imgFile = document.getElementById("imageFile").files[0];
    const imgCaption = data.get("imageCaption");
    let imgSrc = "";

    if (imgFile) {
        imgSrc = URL.createObjectURL(imgFile);
    } else {
  
        imgSrc = "/tlester5/itis3135/images/introduction-photo.jpg";
    }


    const bullets = [
      data.get("bullet1"),
      data.get("bullet2"),
      data.get("bullet3"),
      data.get("bullet4"),
      data.get("bullet5"),
      data.get("bullet6"),
      data.get("bullet7"),
    ].filter(Boolean);

    const quote = data.get("quote");
    const quoteAuthor = data.get("quoteAuthor");

    const funnyThing = data.get("funnyThing");
    const share = data.get("share");

    // courses
    const depts = data.getAll("courseDept[]");
    const nums = data.getAll("courseNum[]");
    const names = data.getAll("courseName[]");
    const reasons = data.getAll("courseReason[]");

    const courses = depts.map((_, i) => ({
      dept: depts[i],
      num: nums[i],
      name: names[i],
      reason: reasons[i],
    })).filter(c => c.dept || c.num || c.name || c.reason);

    // links
    const links = [
      data.get("link1"),
      data.get("link2"),
      data.get("link3"),
      data.get("link4"),
      data.get("link5"),
    ].filter(Boolean);

    // build HTML to mimic your introduction.html layout
    resultSection.innerHTML = `
      <h2>Introduction Form – ${displayName}</h2>
      <figure>
        <img src="${imgSrc}" alt="${imgCaption}">
        <figcaption>${imgCaption}</figcaption>
      </figure>


      <p><strong>${mascotAdj} ${mascotAnimal}</strong> ${divider} ${displayName}</p>

      <ul>
        ${bullets.map(b => `<li>${b}</li>`).join("")}
      </ul>

      ${courses.length ? `
        <h3>Current Courses</h3>
        <ul>
          ${courses.map(c => `
            <li>${c.dept} ${c.num} — ${c.name} (${c.reason})</li>
          `).join("")}
        </ul>
      ` : ""}

      <h3>Favorite Quote</h3>
      <p>"${quote}" — ${quoteAuthor}</p>

      ${funnyThing ? `<p><strong>Funny thing:</strong> ${funnyThing}</p>` : ""}
      ${share ? `<p><strong>Something I'd like to share:</strong> ${share}</p>` : ""}

      ${links.length ? `
        <h3>Links</h3>
        <ul>
          ${links.map(l => `<li><a href="${l}" target="_blank" rel="noopener">${l}</a></li>`).join("")}
        </ul>
      ` : ""}

      <p><a href="#" id="reset-view-link">Start over</a></p>
    `;

    // hide form, show result
    formSection.style.display = "none";
    resultSection.style.display = "block";

    // reset link to show the form again
    const resetLink = document.getElementById("reset-view-link");
    resetLink.addEventListener("click", (e) => {
      e.preventDefault();
      resultSection.style.display = "none";
      formSection.style.display = "block";
    });
  }
});
