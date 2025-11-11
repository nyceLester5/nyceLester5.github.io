// scripts/generate_html.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("intro-form");
  const resultSection = document.getElementById("intro-result-section");
  const generateHtmlBtn = document.getElementById("generate-html-btn");

  if (!form || !resultSection || !generateHtmlBtn) {
    return;
  }

  // Escape for displaying HTML literally inside <pre><code>
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  generateHtmlBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Use built-in validation so required fields must be filled
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    // ===== BASIC FIELDS =====
    const firstName = data.get("firstName") || "";
    const middleName = data.get("middleName") || "";
    const nickname = data.get("nickname") || "";
    const lastName = data.get("lastName") || "";
    const divider = data.get("divider") || "~";
    const mascotAdj = data.get("mascotAdj") || "";
    const mascotAnimal = data.get("mascotAnimal") || "";

    const imageCaption = data.get("imageCaption") || "Profile image";
    const personalStatement = data.get("personalStatement") || "";

    const personalBackground = data.get("bullet1") || "";
    const professionalBackground = data.get("bullet2") || "";
    const academicBackground = data.get("bullet3") || "";
    const subjectBackground = data.get("bullet4") || "";
    const primaryComputer = data.get("bullet5") || "";
    const coursesSummary = data.get("bullet6") || "";
    const anythingElse = data.get("bullet7") || "";

    const quote = data.get("quote") || "";
    const quoteAuthor = data.get("quoteAuthor") || "";
    const funnyThing = data.get("funnyThing") || "";
    const share = data.get("share") || "";

    // ===== IMAGE PATH =====
    const imageFile = data.get("imageFile");
    const imagePath =
      imageFile && imageFile.name
        ? "uploads/" + imageFile.name
        : "images/profile.jpg";

    // ===== NAME + MASCOT LINE =====
    // First [Middle] ["Nickname"] Last
    let nameLine = firstName;
    if (middleName) {
      nameLine += " " + middleName;
    }
    if (nickname) {
      nameLine += ` "${nickname}"`;
    }
    if (lastName) {
      nameLine += " " + lastName;
    }

    // Mascot part → e.g. "~ Nova Lion"
    let mascotBit = "";
    if (mascotAdj || mascotAnimal) {
      const symbol = divider || "~";
      mascotBit = ` ${symbol} ${mascotAdj} ${mascotAnimal}`.trimEnd();
    }

    // ===== COURSES (dynamic rows) =====
    const depts = data.getAll("courseDept[]");
    const nums = data.getAll("courseNum[]");
    const names = data.getAll("courseName[]");
    const reasons = data.getAll("courseReason[]");

    const courses = [];
    for (let i = 0; i < depts.length; i++) {
      const dept = depts[i] || "";
      const num = nums[i] || "";
      const cname = names[i] || "";
      const reason = reasons[i] || "";
      if (dept || num || cname || reason) {
        courses.push({ dept, num, cname, reason });
      }
    }

    // ===== LINKS (from 5 inputs) =====
    const links = [];
    for (let i = 1; i <= 5; i++) {
      const href = data.get("link" + i);
      if (href) {
        links.push(href);
      }
    }

    // ===== BUILD HTML SNIPPET (this is what we SHOW as code) =====
    let htmlOutput = "";

    htmlOutput += `<h2>Introduction HTML</h2>\n`;
    htmlOutput += `<h3>${nameLine}${mascotBit ? " " + mascotBit : ""}</h3>\n`;
    htmlOutput += `<figure>\n`;
    htmlOutput += `  <img src="${imagePath}" alt="Portrait of ${firstName} ${lastName}">\n`;
    htmlOutput += `  <figcaption>${imageCaption}</figcaption>\n`;
    htmlOutput += `</figure>\n`;
    htmlOutput += `<p>${personalStatement}</p>\n`;
    htmlOutput += `<ul>\n`;
    htmlOutput += `  <li><strong>Personal Background:</strong> ${personalBackground}</li>\n`;
    htmlOutput += `  <li><strong>Professional Background:</strong> ${professionalBackground}</li>\n`;
    htmlOutput += `  <li><strong>Academic Background:</strong> ${academicBackground}</li>\n`;
    htmlOutput += `  <li><strong>Background in This Subject:</strong> ${subjectBackground}</li>\n`;
    htmlOutput += `  <li><strong>Primary Computer Platform:</strong> ${primaryComputer}</li>\n`;
    htmlOutput += `  <li><strong>Courses I’m Taking &amp; Why:</strong> ${coursesSummary}</li>\n`;
    htmlOutput += `  <li><strong>Anything Else:</strong> ${anythingElse}</li>\n`;
    htmlOutput += `</ul>\n`;

    if (courses.length > 0) {
      htmlOutput += `<h4>Current Courses</h4>\n<ul>\n`;
      courses.forEach(function (c) {
        htmlOutput += `  <li>${c.dept} ${c.num} — ${c.cname} (${c.reason})</li>\n`;
      });
      htmlOutput += `</ul>\n`;
    }

    if (quote) {
      htmlOutput += `<p><strong>Favorite Quote:</strong> “${quote}” — ${quoteAuthor}</p>\n`;
    }

    if (funnyThing) {
      htmlOutput += `<p><strong>Funny Thing:</strong> ${funnyThing}</p>\n`;
    }

    if (share) {
      htmlOutput += `<p><strong>Something I’d Like to Share:</strong> ${share}</p>\n`;
    }

    if (links.length > 0) {
      htmlOutput += `<h4>Links</h4>\n<ul>\n`;
      links.forEach(function (l) {
        htmlOutput += `  <li><a href="${l}" target="_blank" rel="noopener">${l}</a></li>\n`;
      });
      htmlOutput += `</ul>\n`;
    }

    // Escape snippet so it shows as code, not rendered HTML
    const safeHtml = escapeHtml(htmlOutput);

    // Change H2 in the form section
    const heading = document.querySelector("#intro-form-section h2");
    if (heading) {
      heading.textContent = "Introduction HTML";
    }

    // Hide form
    form.style.display = "none";

    // Show formatted HTML snippet
    resultSection.style.display = "block";
    resultSection.innerHTML = `
      <div class="json-card">
        <h2 class="json-heading">Generated Introduction HTML</h2>
        <section aria-label="Generated HTML Output">
          <pre><code class="language-html">${safeHtml}</code></pre>
        </section>
        <div class="json-actions">
          <button id="reset-html-btn">Reset Form</button>
        </div>
      </div>
    `;

    // Highlight.js syntax highlighting
    if (window.hljs) {
      const codeBlock = resultSection.querySelector("pre code");
      if (codeBlock) {
        hljs.highlightElement(codeBlock);
      }
    }

    // Reset button: restore form + heading
    const resetHtmlBtn = document.getElementById("reset-html-btn");
    if (resetHtmlBtn) {
      resetHtmlBtn.addEventListener("click", function () {
        resultSection.innerHTML = "";
        resultSection.style.display = "none";
        form.reset();
        form.style.display = "block";
        if (heading) {
          heading.textContent = "Introduction Form";
        }
      });
    }
  });
});
