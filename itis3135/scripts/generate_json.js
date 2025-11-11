// scripts/generate_json.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const resultSection = document.getElementById("intro-result-section");

  // Create Generate JSON button if not already in HTML
  let generateBtn = document.getElementById("generate-json-btn");
  if (!generateBtn && form) {
    const btnGroup = form.querySelector(".form-buttons");
    generateBtn = document.createElement("button");
    generateBtn.type = "button";
    generateBtn.id = "generate-json-btn";
    generateBtn.textContent = "Generate JSON";
    btnGroup.appendChild(generateBtn);
  }

  if (!form || !generateBtn) return;

  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Collect form data
    const data = new FormData(form);

    // Build JSON structure
    const jsonOutput = {
      firstName: data.get("firstName") || "",
      preferredName: data.get("nickname") || "",
      middleInitial: data.get("middleName") || "",
      lastName: data.get("lastName") || "",
      divider: data.get("divider") || "",
      mascotAdjective: data.get("mascotAdj") || "",
      mascotAnimal: data.get("mascotAnimal") || "",
      image: "images/profile.jpg",
      imageCaption: data.get("imageCaption") || "",
      personalStatement: data.get("personalStatement") || "",
      personalBackground: data.get("bullet1") || "",
      professionalBackground: data.get("bullet2") || "",
      academicBackground: data.get("bullet3") || "",
      subjectBackground: data.get("bullet4") || "",
      primaryComputer: data.get("bullet5") || "",
      courses: [],
      links: []
    };

    // Collect dynamic courses
    const depts = data.getAll("courseDept[]");
    const nums = data.getAll("courseNum[]");
    const names = data.getAll("courseName[]");
    const reasons = data.getAll("courseReason[]");

    for (let i = 0; i < depts.length; i++) {
      jsonOutput.courses.push({
        department: depts[i],
        number: nums[i],
        name: names[i],
        reason: reasons[i]
      });
    }

    // Collect up to 5 links
    for (let i = 1; i <= 5; i++) {
      const linkVal = data.get(`link${i}`);
      if (linkVal) {
        jsonOutput.links.push({ name: `Link ${i}`, href: linkVal });
      }
    }

    // Format JSON text
    const formatted = JSON.stringify(jsonOutput, null, 2);

    // Change H2 title
    const heading = document.querySelector("#intro-form-section h2");
    if (heading) heading.textContent = "Introduction JSON";

    // Display formatted JSON in card layout
    resultSection.style.display = "block";
    resultSection.innerHTML = `
      <div class="json-card fade-in">
        <h2>Generated JSON Output</h2>
        <section aria-label="Formatted JSON Output">
          <pre><code class="language-json">${formatted}</code></pre>
        </section>
        <div style="text-align:center; margin-top:1rem;">
          <button id="reset-json-btn">Reset Form</button>
        </div>
      </div>
    `;

    // Highlight JSON syntax
    if (window.hljs) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    }

    // Hide the form
    form.style.display = "none";

    // Reset form and show again
    const resetBtn = document.getElementById("reset-json-btn");
    resetBtn.addEventListener("click", () => {
      resultSection.style.display = "none";
      form.style.display = "block";
      if (heading) heading.textContent = "Introduction Form";
    });
  });
});
