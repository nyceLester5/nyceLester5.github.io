// scripts/generate_json.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("intro-form");
  const resultSection = document.getElementById("intro-result-section");
  const generateBtn = document.getElementById("generate-json-btn");

  if (!form || !resultSection || !generateBtn) return;

  // Helper: escape HTML safely
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  generateBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const data = new FormData(form);

    // Default image
    const imageFile = data.get("imageFile");
    const imagePath =
      imageFile && imageFile.name
        ? "uploads/" + imageFile.name
        : "images/profile.jpg";

    // === BUILD JSON OUTPUT ===
    const jsonOutput = {
      firstName: data.get("firstName") || "",
      preferredName: data.get("nickname") || "",
      middleInitial: data.get("middleName") || "",
      lastName: data.get("lastName") || "",
      divider: data.get("divider") || "",
      mascotAdjective: data.get("mascotAdj") || "",
      mascotAnimal: data.get("mascotAnimal") || "",
      image: imagePath,
      imageCaption: data.get("imageCaption") || "",
      personalStatement: data.get("personalStatement") || "",
      personalBackground: data.get("bullet1") || "",
      professionalBackground: data.get("bullet2") || "",
      academicBackground: data.get("bullet3") || "",
      subjectBackground: data.get("bullet4") || "",
      primaryComputer: data.get("bullet5") || "",
      courses: [
        {
          department: "ITCS",
          number: "3140",
          name: "User Experience Methods",
          reason: "I am interested in designing apps."
        },
        {
          department: "ITIS",
          number: "3135",
          name: "Web-Based Programming",
          reason:
            "I am also interested in web design and what goes into how a website works. I felt this class would help me better my understanding and skills."
        },
        {
          department: "ITIS",
          number: "4166",
          name: "Backend Web Development",
          reason: "A required course for my concentration."
        },
        {
          department: "ITIS",
          number: "5353",
          name: "Social Technology Design",
          reason:
            "I haven’t got a good grasp on what exactly this class is yet, but it was required."
        },
        {
          department: "ITSC",
          number: "5358",
          name: "Physical Computing",
          reason: "Focuses on 3D modeling and printing."
        },
        {
          department: "MATH",
          number: "2223",
          name: "Elements of Statistics II",
          reason: "I’m not a big fan of math, but it was required."
        }
      ],
      links: [
        { name: "ITIS3135", href: "https://webpages.charlotte.edu/tlester5/itis3135/" },
        { name: "Github.com", href: "https://github.com/nyceLester5/nyceLester5.github.io" },
        { name: "CLT Web", href: "https://webpages.charlotte.edu/tlester5/" },
        { name: "Github.io", href: "http://nyceLester5.github.io" },
        { name: "freeCodeCamp", href: "https://www.freecodecamp.org/NyceL" },
        { name: "Codecademy", href: "https://www.codecademy.com/profiles/NyceLester" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/tranycelester" }
      ]
    };

    // Pretty-print JSON
    const formatted = JSON.stringify(jsonOutput, null, 2);
    const safeJson = escapeHtml(formatted);

    // Change H2
    const heading = document.querySelector("#intro-form-section h2");
    if (heading) heading.textContent = "Introduction HTML";

    // Hide form
    form.style.display = "none";

    // Show JSON output
    resultSection.style.display = "block";
    resultSection.innerHTML = `
      <div class="json-card">
        <h2 class="json-heading">Generated Introduction JSON</h2>
        <section aria-label="Generated JSON Output">
          <pre><code class="language-json">${safeJson}</code></pre>
        </section>
        <div class="json-actions">
          <button id="reset-json-btn">Reset Form</button>
        </div>
      </div>
    `;

    // Highlight.js formatting
    if (window.hljs) {
      const codeBlock = resultSection.querySelector("pre code");
      if (codeBlock) hljs.highlightElement(codeBlock);
    }

    // Reset handler
    const resetBtn = document.getElementById("reset-json-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resultSection.innerHTML = "";
        resultSection.style.display = "none";
        form.reset();
        form.style.display = "block";
        if (heading) heading.textContent = "Introduction Form";
      });
    }
  });
});
