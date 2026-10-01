import { route, resolve, go, parse } from "./router.js";
import { store } from "./store.js";
import { icon } from "./icons.js";
import { initGlobalUi, confirmModal, closeModal, toast } from "./ui.js";

const root = document.getElementById("root");

const MENU = [
  { id: "fleet", label: "Борты", href: "#/fleet", match: /^\/fleet/ },
  { id: "sandbox", label: "Песочница", href: "#/sandbox", match: /^\/sandbox/ },
  { id: "empty-legs", label: "Empty legs", href: "#/empty-legs", match: /^\/empty-legs/ },
  { id: "chat", label: "Связаться с менеджером", href: "#/chat", match: /^\/chat/ },
  { id: "faq", label: "FAQ", href: "#/faq", match: /^\/faq/ },
  { id: "profile", label: "Профиль", href: "#/profile", match: /^\/profile/ },
];

// ---------- Routes ----------
const lazy = (file) => () => import(file);
route("/", () => ({ redirect: "/fleet" }));
route("/login", lazy("./pages/login.js"));
route("/login/:view", lazy("./pages/login.js"));
route("/fleet", lazy("./pages/fleet.js"));
route("/fleet/new", lazy("./pages/plane-form.js"));
route("/fleet/:id", lazy("./pages/plane-form.js"));
route("/sandbox", lazy("./pages/sandbox.js"));
route("/empty-legs", lazy("./pages/empty-legs.js"));
route("/empty-legs/new", lazy("./pages/empty-leg-form.js"));
route("/empty-legs/:id", lazy("./pages/empty-leg-form.js"));
route("/chat", lazy("./pages/chat.js"));
route("/faq", lazy("./pages/faq.js"));
route("/profile", lazy("./pages/profile.js"));

// ---------- Shell ----------
let shellMounted = false;
function mountShell() {
  root.innerHTML = `
    <div class="app" id="app">
      <header class="topbar">
        <button class="topbar__burger" id="burger" aria-label="Меню">${icon("menu", 24)}</button>
        <img src="images/logo.png" alt="FGG">
      </header>
      <aside class="sidebar" id="sidebar">
        <a class="sidebar__logo" href="#/fleet"><img src="images/logo.png" alt="Flight Generation Group"></a>
        <nav class="sidebar__nav">
          ${MENU.map((m) => `<a class="menu-item" data-menu="${m.id}" href="${m.href}">${m.label}</a>`).join("")}
        </nav>
        <button class="sidebar__logout" id="logout">${icon("log-out", 24)}<span>Выйти</span></button>
      </aside>
      <div class="scrim" id="scrim"></div>
      <main class="main" id="main"></main>
    </div>`;
  document.getElementById("burger").onclick = () => document.getElementById("app").classList.toggle("nav-open");
  document.getElementById("scrim").onclick = () => document.getElementById("app").classList.remove("nav-open");
  document.getElementById("logout").onclick = () =>
    confirmModal({
      title: "Выйти из кабинета",
      text: "Вы уверены, что хотите завершить текущую сессию и выйти из кабинета оператора?",
      confirmText: "Выйти",
      danger: true,
      onConfirm: () => { store.set("auth", false); go("/login"); },
    });
  shellMounted = true;
}

let seq = 0;
let cleanup = null;
async function render() {
  const mySeq = ++seq;
  const r = resolve();
  if (!r) { go("/fleet"); return; }
  let mod = await r.handler();
  if (mod.redirect) { go(mod.redirect); return; }
  const page = mod.default;
  if (mySeq !== seq) return;

  const authed = store.get("auth", false);
  if (!page.public && !authed) { go("/login"); return; }
  if (page.public && authed && r.path === "/login") { go("/fleet"); return; }

  closeModal();
  const ctx = { params: r.params, query: r.query, path: r.path, go, toast };
  if (page.public) {
    shellMounted = false;
    root.innerHTML = page.render(ctx);
    document.body.style.background = "";
  } else {
    if (!shellMounted) mountShell();
    document.getElementById("app").classList.remove("nav-open");
    document.querySelectorAll(".menu-item").forEach((a) => {
      const m = MENU.find((x) => x.id === a.dataset.menu);
      a.classList.toggle("is-active", m.match.test(r.path));
    });
    // Fresh <main> each time: drops listeners from the previous page
    const old = document.getElementById("main");
    const main = old.cloneNode(false);
    main.className = "main" + (page.mainClass ? " " + page.mainClass : "");
    old.replaceWith(main);
    main.innerHTML = page.render(ctx);
  }
  document.title = (page.title ? page.title(ctx) + " — " : "") + "Кабинет оператора FGG";
  if (cleanup) { try { cleanup(); } catch {} cleanup = null; }
  if (page.mount) cleanup = page.mount(ctx) || null;
  window.scrollTo(0, 0);
}

initGlobalUi();
window.addEventListener("hashchange", render);
if (!location.hash) location.hash = store.get("auth", false) ? "/fleet" : "/login";
else render();

// Demo helpers (?demo=1 shows a reset chip)
if (parse().query.demo || sessionStorage.getItem("fgg-demo")) {
  sessionStorage.setItem("fgg-demo", "1");
  const chip = document.createElement("button");
  chip.textContent = "Сбросить демо";
  chip.style.cssText = "position:fixed;left:8px;bottom:8px;z-index:200;font:600 11px Mulish,sans-serif;color:#828689;background:#fff;border:1px solid #e9eef5;border-radius:8px;padding:4px 8px;opacity:.7";
  chip.onclick = () => { store.reset(); location.hash = "/login"; location.reload(); };
  document.body.appendChild(chip);
}
