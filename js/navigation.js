const menuButton = document.querySelector(".nav-toggle");
const menu = document.querySelector("#primary-menu");

if (menuButton && menu) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("nav-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    document.body.classList.toggle("nav-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.matchMedia("(min-width: 64rem)").addEventListener("change", closeMenu);
}
