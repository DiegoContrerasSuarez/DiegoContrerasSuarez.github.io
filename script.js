document.getElementById("year").textContent = new Date().getFullYear();
window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".hero-name");
  if (!el) return;
  el.classList.remove("four");
  void el.offsetWidth; // force reflow
  el.classList.add("four");
});
