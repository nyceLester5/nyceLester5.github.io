// scripts/generate_json.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const resultSection = document.getElementById("intro-result-section");
  const generateBtn = document.getElementById("generate-json-btn");

  if (!form || !generateBtn) return;

  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Collect all form data
    const data = new FormData(form);

    // Build JSON object structure
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

    // Handle courses (dynamic rows)
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

    // Handle links
    for (let i = 1; i <= 5; i++) {
      const linkVal = data.get(`link${i}`);
      if (linkVal) {
        jsonOutput.links.push({ name: `Link ${i}`, href: linkVal });
      }
    }

    // Format JSON for display
    const formatted = JSON.stringify(jsonOutput, null, 2);

    // Change H2 text
    const heading = document.querySelector("#intro-form-section h2");
    if (heading) heading.textContent = "Introduction JSON";

    // Display JSON output using Highlight.js
    resultSection.style.display = "block";
    resultSection.innerHTML = `
      <h2>Generated JSON Output</h2>
      <section aria-label="Formatted JSON Output">
        <pre><code class="language-json">${formatted}</code></pre>
      </section>
      <button id="reset-json-btn">Reset Form</button>
    `;

    // Highlight JSON syntax
    if (window.hljs) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    }

    // Hide the form
    form.style.display = "none";

    // Reset button functionality
    document.getElementById("reset-json-btn").addEventListener("click", () => {
      resultSection.style.display = "none";
      form.style.display = "block";
      heading.textContent = "Introduction Form";
    });
  });
});
