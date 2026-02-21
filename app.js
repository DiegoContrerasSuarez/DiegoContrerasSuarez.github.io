// ============================
// Global site behavior
// ============================

const PROJECTS = {
  allocator: {
    title: "Dynamic Memory Allocator",
    type: "SCHOOL",
    subtitle: "Explicit free list allocator tuned for utilization and throughput.",
    headline: "UMALLOC / FREE LIST",
    summary:
      "Implemented an allocator with block headers, alignment rules, coalescing, splitting, and free-list behavior. The project emphasized correctness, performance, and passing a strict test harness.",
    highlights: [
      "Block metadata and size/alignment handling",
      "Coalescing + split logic across free blocks",
      "Utilization vs throughput tuning and debugging"
    ],
    stack: ["C", "Systems", "Memory", "Debugging"],
    readout:
`> module loaded: allocator
> heap: simulated via csbrk
> coalesce: enabled
> status: complete`,
    links: [
      { label: "Projects Index", href: "projects.html", kind: "OPEN" },
      { label: "GitHub Profile", href: "https://github.com/DiegoContrerasSuarez", kind: "PROFILE", external: true },
      { label: "Email Diego", href: "mailto:diegocontreras040105@gmail.com?subject=Allocator%20Project%20Question", kind: "EMAIL" }
    ]
  },

  huffman: {
    title: "Huffman Coding Compressor",
    type: "SCHOOL",
    subtitle: "Bit-level compression using Huffman trees and code tables.",
    headline: "COMPRESS / DECOMPRESS",
    summary:
      "Implemented Huffman encoding and decoding with tree construction, code generation, and file processing. Focused on correctness and clean implementation of the data flow.",
    highlights: [
      "Tree construction from frequency counts",
      "Bitstream encoding/decoding and file IO",
      "Code table generation and decoder rebuild"
    ],
    stack: ["Java", "Compression", "Trees", "IO"],
    readout:
`> encoding: huffman
> bitstreams: enabled
> correctness: verified
> status: complete`,
    links: [
      { label: "Projects Index", href: "projects.html", kind: "OPEN" },
      { label: "GitHub Profile", href: "https://github.com/DiegoContrerasSuarez", kind: "PROFILE", external: true },
      { label: "Email Diego", href: "mailto:diegocontreras040105@gmail.com?subject=Huffman%20Project%20Question", kind: "EMAIL" }
    ]
  },

  portfolio: {
    title: "Cyber HUD Portfolio",
    type: "PERSONAL",
    subtitle: "Multi-page neon interface with filtering, transitions, and readouts.",
    headline: "OPEN_PREVIEW / UI",
    summary:
      "Built a custom portfolio experience inspired by futuristic game UI design. Includes multiple pages, internal transitions, project filtering, and reusable HUD-style components.",
    highlights: [
      "Responsive multi-page structure",
      "Page transition glow and polished hover states",
      "Project index with search + category filters"
    ],
    stack: ["HTML", "CSS", "JavaScript", "UI"],
    readout:
`> theme: neon HUD
> pages: home/projects/about/contact
> filters: active
> status: live`,
    links: [
      { label: "Live Site", href: "https://diegocontrerassuarez.github.io", kind: "LIVE", external: true },
      { label: "Portfolio Repo", href: "https://github.com/DiegoContrerasSuarez/DiegoContrerasSuarez.github.io", kind: "CODE", external: true },
      { label: "GitHub Profile", href: "https://github.com/DiegoContrerasSuarez", kind: "PROFILE", external: true }
    ]
  },

  voicebot: {
    title: "Voice-to-Text Assistant",
    type: "PERSONAL",
    subtitle: "Speech recognition + overlay UX for faster chat workflows.",
    headline: "VOICE / INPUT PIPELINE",
    summary:
      "Created a voice-to-text assistant with push-to-talk control and an overlay for user feedback. Designed around speed and low-friction interaction.",
    highlights: [
      "Push-to-talk transcription workflow",
      "Overlay state feedback for usability",
      "Automation-focused interaction design"
    ],
    stack: ["Python", "Speech", "Automation", "UX"],
    readout:
`> recognizer: hotkey gated
> overlay: enabled
> send pipeline: active
> status: iterating`,
    links: [
      { label: "GitHub Profile", href: "https://github.com/DiegoContrerasSuarez", kind: "PROFILE", external: true },
      { label: "Contact for Demo", href: "mailto:diegocontreras040105@gmail.com?subject=Voice-to-Text%20Project%20Demo", kind: "EMAIL" }
    ]
  },

  "internship-template": {
    title: "Internship Project (Template)",
    type: "INTERNSHIP",
    subtitle: "Public-safe way to describe internship work and impact.",
    headline: "INTERN / MODULE",
    summary:
      "Template module for internship projects when details are confidential. Focus on the problem, your role, tools used, and measurable outcomes without exposing internal information.",
    highlights: [
      "State the problem and your contribution",
      "Describe tools, systems, or workflows improved",
      "Share outcomes and impact where allowed"
    ],
    stack: ["Tooling", "Data", "Impact", "Docs"],
    readout:
`> confidentiality: respected
> outcomes: documented
> status: customize me`,
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/diego-contreras-s", kind: "OPEN", external: true },
      { label: "Email Diego", href: "mailto:diegocontreras040105@gmail.com?subject=Internship%20Project%20Question", kind: "EMAIL" }
    ]
  },

  "data-viz": {
    title: "Data Visualization Dashboard",
    type: "INTERNSHIP",
    subtitle: "Dashboard UI for reporting and operational metrics.",
    headline: "DATA / DASHBOARD",
    summary:
      "Dashboard-style project summary page for internship or team work focused on presenting metrics, trends, and operational data in a clear interface.",
    highlights: [
      "Organized metrics into a readable interface",
      "Focused on clarity and fast scanning",
      "Designed for stakeholder-friendly reporting"
    ],
    stack: ["Dashboard", "Data", "UI", "Analytics"],
    readout:
`> dashboards: loaded
> metrics: visualized
> status: template / customizable`,
    links: [
      { label: "Projects Index", href: "projects.html", kind: "OPEN" },
      { label: "GitHub Profile", href: "https://github.com/DiegoContrerasSuarez", kind: "PROFILE", external: true }
    ]
  }
};

function setActiveNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
}

function ensurePageGlow() {
  let el = document.getElementById("pageGlow");
  if (!el) {
    el = document.createElement("div");
    el.id = "pageGlow";
    document.body.appendChild(el);
  }
  return el;
}

function initPageTransitions() {
  const glow = ensurePageGlow();

  requestAnimationFrame(() => {
    document.body.classList.add("body-loaded");
    glow.classList.add("is-entering");
    setTimeout(() => glow.classList.remove("is-entering"), 420);
  });

  document.querySelectorAll("a[href]").forEach((a) => {
    const raw = a.getAttribute("href");
    if (!raw) return;
    if (a.hasAttribute("data-no-transition")) return;
    if (raw.startsWith("#")) return;
    if (raw.startsWith("mailto:")) return;
    if (raw.startsWith("tel:")) return;

    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin) return;

    a.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      glow.classList.add("is-leaving");
      document.body.classList.remove("body-loaded");
      setTimeout(() => {
        window.location.href = url.href;
      }, 210);
    });
  });
}

function toast(message, detail = "") {
  const el = document.getElementById("toast");
  if (!el) return;

  el.innerHTML = `<div><b>${message}</b></div><div class="small">${detail}</div>`;
  el.style.display = "block";

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.style.display = "none";
  }, 2800);
}

function wireCopyEmail() {
  document.querySelectorAll("[data-copy-email]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const email = btn.getAttribute("data-copy-email");
      try {
        await navigator.clipboard.writeText(email);
        toast("COPIED", email);
      } catch {
        toast("COPY FAILED", "Clipboard blocked");
      }
    });
  });
}

function wireProjectFilters() {
  const search = document.getElementById("projectSearch");
  const type = document.getElementById("projectType");
  const cards = [...document.querySelectorAll("[data-project]")];
  if (!search || !type || !cards.length) return;

  const apply = () => {
    const q = search.value.trim().toLowerCase();
    const t = type.value;

    cards.forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const tags = (card.dataset.tags || "").toLowerCase();
      const kind = card.dataset.type || "all";

      const okQ = !q || name.includes(q) || tags.includes(q);
      const okT = t === "all" || kind === t;

      card.style.display = okQ && okT ? "" : "none";
    });
  };

  search.addEventListener("input", apply);
  type.addEventListener("change", apply);
  apply();
}

function hydrateProjectPage() {
  const pidEl = document.getElementById("pid");
  if (!pidEl) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "portfolio";
  const p = PROJECTS[id] || PROJECTS.portfolio;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("pid", id);
  setText("title", p.title);
  setText("subtitle", p.subtitle);
  setText("type", p.type);
  setText("headline", p.headline);
  setText("summary", p.summary);
  setText("h1", p.highlights?.[0] || "—");
  setText("h2", p.highlights?.[1] || "—");
  setText("h3", p.highlights?.[2] || "—");
  setText("readout", p.readout || "> module loaded");

  const stack = document.getElementById("stack");
  if (stack) {
    stack.innerHTML = "";
    (p.stack || []).forEach((s) => {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.textContent = s;
      stack.appendChild(chip);
    });
  }

  const links = document.getElementById("links");
  if (links) {
    links.innerHTML = "";
    (p.links || []).forEach((item) => {
      const a = document.createElement("a");
      a.href = item.href;
      a.innerHTML = `<span>${item.label}</span><span>${item.kind || "OPEN"}</span>`;

      if (item.external) {
        a.target = "_blank";
        a.rel = "noreferrer";
        a.setAttribute("data-no-transition", "true");
      }

      if (String(item.href).startsWith("mailto:")) {
        a.setAttribute("data-no-transition", "true");
      }

      links.appendChild(a);
    });
  }
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initPageTransitions();
  wireCopyEmail();
  wireProjectFilters();
  hydrateProjectPage();
  setYear();
});