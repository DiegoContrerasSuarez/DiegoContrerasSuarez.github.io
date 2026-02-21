// ============================
// Small helpers for the theme
// ============================

function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    const target = a.getAttribute("href");
    if (target === path) a.classList.add("active");
  });
}

function toast(message, detail) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.innerHTML = `<div><b>${message}</b></div><div class="small">${detail || ""}</div>`;
  el.style.display = "block";
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => (el.style.display = "none"), 3200);
}

function wireCopyEmail() {
  const btn = document.querySelector("[data-copy-email]");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const email = btn.getAttribute("data-copy-email");
    try {
      await navigator.clipboard.writeText(email);
      toast("COPIED", `Email copied to clipboard: ${email}`);
    } catch {
      toast("COPY FAILED", "Your browser blocked clipboard access.");
    }
  });
}

// Projects page filtering (optional)
function wireProjectFilters() {
  const search = document.getElementById("projectSearch");
  const type = document.getElementById("projectType");
  const cards = [...document.querySelectorAll("[data-project]")];

  if (!search || !type || !cards.length) return;

  function apply() {
    const q = search.value.trim().toLowerCase();
    const t = type.value;

    cards.forEach(card => {
      const name = (card.getAttribute("data-name") || "").toLowerCase();
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const kind = card.getAttribute("data-type") || "all";

      const okQ = !q || name.includes(q) || tags.includes(q);
      const okT = (t === "all") || (kind === t);

      card.style.display = (okQ && okT) ? "" : "none";
    });
  }

  search.addEventListener("input", apply);
  type.addEventListener("change", apply);
  apply();
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  wireCopyEmail();
  wireProjectFilters();
});