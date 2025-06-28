// === Sidebar Toggle & Navigation ===
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const allSections = document.querySelectorAll(".content-section");
  const navItems = document.querySelectorAll(".sidebar li[data-section]");
  const collapsible = document.querySelector(".sidebar .collapsible");
  const submenu = document.querySelector(".submenu");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  collapsible.addEventListener("click", () => {
    collapsible.classList.toggle("open");
  });

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-section");

      // Toggle active state in nav
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // Show the target section
      allSections.forEach(section => {
        section.classList.remove("active");
      });
      const target = document.getElementById(targetId);
      if (target) target.classList.add("active");
    });
  });

  // === Section 1: Save Overview & Setup Form ===
  const form = document.getElementById("overview-setup-form");
  if (form) {
    const fields = [
      "jv-name", "partner-a", "partner-b", "partner-c",
      "start-date", "capex", "working-capital", "location"
    ];

    // Pre-fill values from localStorage
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (input && localStorage.getItem(id)) {
        input.value = localStorage.getItem(id);
      }
    });

    // Save on submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fields.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          localStorage.setItem(id, input.value);
        }
      });
      alert("JV Setup Details Saved ✅");
    });
  }
    // === Section 3: B:C Slider Logic ===
    const bcSlider = document.getElementById("bc-split");
    const bDisplay = document.getElementById("split-b");
    const cDisplay = document.getElementById("split-c");

    if (bcSlider && bDisplay && cDisplay) {
    bcSlider.addEventListener("input", () => {
        const bPercent = parseInt(bcSlider.value);
        const cPercent = 100 - bPercent;
        bDisplay.textContent = `${bPercent}%`;
        cDisplay.textContent = `${cPercent}%`;
    });
    }
});
