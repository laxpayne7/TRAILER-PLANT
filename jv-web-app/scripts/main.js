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
});
