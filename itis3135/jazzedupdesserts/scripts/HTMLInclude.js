// HTMLInclude.js
// Allows <div data-include="components/header.html"></div> to work
// by fetching and inserting the specified HTML file.
window.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(async (include) => {
    const file = include.getAttribute("data-include");
    // Fetch and insert the HTML content
    try {
      const response = await fetch(file);
      if (!response.ok) {
        include.innerHTML = `Error loading ${file}`;
        return;
      }
      
      const content = await response.text();
      include.innerHTML = content;
    } catch (error) {
      include.innerHTML = `Error loading ${file}`;
    }
  });
});
