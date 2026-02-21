// ============================
// Site behavior + transitions
// ============================

function setActiveNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

function ensurePageGlow() {
  let glow = document.getElementById("pageGlow");
  if (!glow) {
    glow = document.createElement("div");
    glow.id = "pageGlow";
    document.body.appendChild(glow);
  }
  return glow;
}

function initPageTransition() {
  const glow = ensurePageGlow();

  // fade-in on load
  requestAnimationFrame(() => {
    document.body.classList.add("body-loaded");
    glow.classList.add("is-entering");
    setTimeout(() => glow.classList.remove("is-entering"), 500);
  });

  // intercept internal links only
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (a.hasAttribute("data-no-transition")) return;
    if (href.startsWith("#")) return;
    if (href.startsWith("mailto:")) return;
    if (href.startsWith("tel:")) return;

    const url = new URL(a.href, location.href);

    // external links: open normally
    if (url.origin !== location.origin) return;

    a.addEventListener("click", (e) => {
      // allow new-tab / modifier clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      glow.classList.add("is-leaving");
      document.body.classList.remove("body-loaded");

      setTimeout(() => {
        window.location.href = url.href;
      }, 220);
    });
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
      toast("COPIED", `Email copied: ${email}`);
    } catch {
      toast("COPY FAILED", "Clipboard access was blocked.");
    }
  });
}

function wireProjectFilters() {
  const search = document.getElementById("projectSearch");
  const type = document.getElementById("projectType");
  const cards = [...document.querySelectorAll("[data-project]")];

  if (!search || !type || !cards.length) return;

  function apply() {
    const q = search.value.trim().toLowerCase();
    const t = type.value;

    cards.forEach((card) => {
      const name = (card.getAttribute("data-name") || "").toLowerCase();
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const kind = card.getAttribute("data-type") || "all";

      const okQ = !q || name.includes(q) || tags.includes(q);
      const okT = t === "all" || kind === t;

      card.style.display = okQ && okT ? "" : "none";
    });
  }

  search.addEventListener("input", apply);
  type.addEventListener("change", apply);
  apply();
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initPageTransition();
  wireCopyEmail();
  wireProjectFilters();
});