// Screens 2.1 – 2.14: Chat with manager
import { icon } from "../icons.js";
import { esc, $, toast } from "../ui.js";
import { store } from "../store.js";

const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const MAX_FILE = 10 * 1024 * 1024;
const REPLIES = [
  "Здравствуйте! Спасибо за обращение. Мы уже изучаем ваш вопрос и скоро вернёмся с ответом.",
  "Уточните, пожалуйста, регистрационный номер борта, по которому возник вопрос.",
  "Передали информацию профильному специалисту. Ответим в этом чате в ближайшее время.",
];
const LONG_TEXT =
  "К сожалению, в данный момент оператор сталкивается с проблемой, которая мешает ему добавить новый борт в личном кабинете. " +
  "Мы уже передали информацию в техническую поддержку и работаем над исправлением. Пока вопрос решается, вы можете отправить нам " +
  "данные по борту прямо в этом чате: модель, бортовой номер, год выпуска, базовый аэропорт, количество пассажирских мест и " +
  "несколько актуальных фотографий салона и экстерьера. Наш специалист добавит борт вручную и сообщит вам, когда он появится в списке. " +
  "Обычно это занимает не более одного рабочего дня. Если у вас остались вопросы или вам нужна помощь с заполнением информации, " +
  "пожалуйста, напишите нам, мы с радостью поможем.";

const FX_TS = new Date(2026, 2, 3, 0, 11).getTime();
const fx = (from, text, extra = {}) => ({ id: "fx" + Math.random().toString(36).slice(2), from, text, ts: FX_TS, status: "sent", ...extra });
const HELLO = "Здравствуйте! Я не могу добавить новый борт";

function fixtureMsgs(kind) {
  const base = [fx("me", HELLO)];
  if (kind === "2") return [...base, fx("mgr", HELLO)];
  if (kind === "3") return [...base, fx("me", "Не могу разобраться"), fx("mgr", HELLO)];
  if (kind === "7") return [...base, fx("me", "Не могу разобраться"), fx("mgr", HELLO), fx("me", LONG_TEXT, { status: "sending" })];
  if (kind === "14")
    return [
      fx("me", HELLO), fx("mgr", HELLO),
      fx("me", "Здравствуйте! Я столкнулся с проблемой и хотел бы обратиться за помощью в поддержку. Спасибо!", { status: "sending" }),
      fx("me", "Не могу разобраться с проблемой", { status: "failed" }),
    ];
  return [];
}

let S = null;
let timers = [];

const two = (n) => String(n).padStart(2, "0");
const timeOf = (ts) => { const d = new Date(ts); return `${two(d.getHours())}:${two(d.getMinutes())}`; };
const dayKey = (ts) => { const d = new Date(ts); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; };
const dayLabel = (ts) => { const d = new Date(ts); return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`; };

function persist() {
  if (S.fixture) return;
  store.set("chat", S.msgs.filter((m) => !m.img && m.status !== "sending").map(({ id, from, text, ts, status }) => ({ id, from, text, ts, status })));
}

/* ---------- Rendering ---------- */
function statusIcon(m) {
  if (m.from !== "me") return "";
  if (m.status === "sending") return `<span class="msg__st">${icon("clock", 16)}</span>`;
  return `<span class="msg__st msg__st--ok">${icon("check", 16)}</span>`;
}

function bubbleHtml(m, first) {
  const body = m.img ? `<img class="msg__img" src="${esc(m.img)}" alt="${esc(m.text || "Изображение")}">` : "";
  const text = m.text ? `<div class="msg__text">${esc(m.text)}</div>` : "";
  if (m.status === "failed") {
    return `<div class="msg-fail">
      <div class="msg-fail__note">${esc("Сообщение не отправлено")}${icon("alert-circle", 12)}</div>
      <div class="bubble bubble--me bubble--failed">${body}${text}
        <div class="bubble__foot bubble__foot--between">
          <button type="button" class="msg-retry" data-retry="${m.id}"><span>Повторить отправку</span>${icon("refresh-cw", 16)}</button>
          <span class="msg__time">${timeOf(m.ts)}</span>
        </div></div></div>`;
  }
  return `<div class="bubble bubble--${m.from} ${m.status === "sending" ? "bubble--sending" : ""} ${first && S.fixture ? "bubble--fx-first" : ""}" data-id="${m.id}">${body}${text}
    <div class="bubble__foot"><span class="msg__time">${timeOf(m.ts)}</span>${statusIcon(m)}</div></div>`;
}

function listHtml() {
  if (!S.msgs.length) {
    const card = (x, y) => `<i class="ill__card" style="left:${x}px;top:${y}px"><b></b><s></s><s></s></i>`;
    return `<div class="chat-empty">
      <div class="ill">${card(0, 0)}${card(109, 64)}${card(16, 128)}</div>
      <p>Напишите свой вопрос и мы ответим в ближайшее время</p></div>`;
  }
  let out = "";
  let lastDay = "", lastFrom = "";
  let group = null;
  const flush = () => { if (group) out += group + "</div></div>"; group = null; };
  S.msgs.forEach((m) => {
    const dk = dayKey(m.ts);
    if (dk !== lastDay) { flush(); out += `<div class="chat-date"><span>${dayLabel(m.ts)}</span></div>`; lastDay = dk; lastFrom = ""; }
    const first = m.from !== lastFrom;
    if (first) {
      flush();
      group = `<div class="mgroup mgroup--${m.from}"><div class="mgroup__label">${m.from === "me" ? "Вы" : "Менеджер"}</div><div class="mgroup__items">`;
      lastFrom = m.from;
    }
    group += bubbleHtml(m, first);
  });
  flush();
  return out;
}

function shell() {
  return `<div class="page page--chat">
    <div class="page-head page-head--top"><h1 class="page-head__title">Чат с менеджером</h1></div>
    <section class="chat-card" id="chat-card">
      <div class="chat-list" id="chat-list">${listHtml()}</div>
      <form class="chat-bar" id="chat-bar" autocomplete="off">
        <button type="button" class="chat-attach" id="chat-attach" aria-label="Прикрепить файл">${icon("paperclip", 20)}</button>
        <div class="chat-input"><textarea id="chat-text" rows="1" placeholder="Напишите сообщение..." aria-label="Сообщение"></textarea></div>
        <button type="submit" class="btn btn--primary chat-send" id="chat-send" disabled><span>Отправить</span>${icon("send", 20)}</button>
        <input type="file" id="chat-file" accept="image/*" hidden>
      </form>
    </section>
    <div class="chat-drop" id="chat-drop" hidden>
      <div class="chat-drop__panel"><div class="chat-drop__zone" id="chat-drop-zone">
        ${icon("image", 64)}
        <div class="chat-drop__txt"><b>Перенесите изображение в эту область или кликните, чтобы загрузить</b><span>Мы рекомендуем не использовать файлы размера больше чем 10Mb</span></div>
      </div></div>
    </div>
  </div>`;
}

export default {
  title: () => "Чат с менеджером",
  mainClass: "main--chat",
  render({ query }) {
    const fixture = query.fixture === "figma";
    S = { fixture, drop: fixture ? query.drop || "" : "", msgs: fixture ? fixtureMsgs(query.msgs || "") : store.get("chat", []), n: 0 };
    return shell();
  },

  mount() {
    const list = $("#chat-list"), ta = $("#chat-text"), send = $("#chat-send"), file = $("#chat-file");
    const drop = $("#chat-drop"), zone = $("#chat-drop-zone");

    const toBottom = () => { list.scrollTop = list.scrollHeight; };
    const redraw = () => { list.innerHTML = listHtml(); toBottom(); };
    const grow = () => {
      ta.style.height = "auto";
      const h = Math.min(Math.max(ta.scrollHeight + 4, 48), 200);
      ta.style.height = h + "px";
      ta.parentElement.classList.toggle("is-scroll", ta.scrollHeight + 4 > 200);
      send.disabled = !ta.value.trim();
      toBottom();
    };

    const reply = () => {
      const t = setTimeout(() => {
        S.msgs.push({ id: "m" + Date.now(), from: "mgr", text: REPLIES[S.n++ % REPLIES.length], ts: Date.now(), status: "sent" });
        persist(); redraw();
      }, 1600);
      timers.push(t);
    };
    const deliver = (m, offline) => {
      const t = setTimeout(() => {
        if (offline && !navigator.onLine) m.status = "failed";
        else { m.status = "sent"; reply(); }
        persist(); redraw();
      }, 700);
      timers.push(t);
    };
    const push = (data) => {
      const m = { id: "m" + Date.now() + Math.random().toString(36).slice(2, 5), from: "me", ts: Date.now(), status: "sending", ...data };
      S.msgs.push(m); redraw(); deliver(m, true);
    };

    const submit = () => {
      const text = ta.value.trim();
      if (!text) return;
      ta.value = ""; grow();
      push({ text });
      ta.focus();
    };
    $("#chat-bar").addEventListener("submit", (e) => { e.preventDefault(); submit(); });
    ta.addEventListener("input", grow);
    ta.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); submit(); } });

    const sendFile = (f) => {
      if (!f) return;
      if (!f.type.startsWith("image/")) return toast("Можно загружать только изображения", "negative");
      if (f.size > MAX_FILE) return toast("Файл больше 10 Mb", "negative");
      const r = new FileReader();
      r.onload = () => push({ img: r.result, text: "" });
      r.readAsDataURL(f);
    };
    $("#chat-attach").addEventListener("click", () => file.click());
    file.addEventListener("change", () => { sendFile(file.files[0]); file.value = ""; });

    list.addEventListener("click", (e) => {
      const b = e.target.closest("[data-retry]"); if (!b) return;
      const m = S.msgs.find((x) => x.id === b.dataset.retry); if (!m) return;
      m.status = "sending"; redraw(); deliver(m, false);
    });

    // Drag and drop overlay
    let depth = 0;
    const hasFiles = (e) => e.dataTransfer && [...(e.dataTransfer.types || [])].includes("Files");
    const hide = () => { depth = 0; drop.hidden = true; zone.classList.remove("is-over"); };
    const on = (t, ev, fn) => { t.addEventListener(ev, fn); offs.push(() => t.removeEventListener(ev, fn)); };
    const offs = [];
    on(window, "dragenter", (e) => { if (!hasFiles(e)) return; depth++; drop.hidden = false; });
    on(window, "dragleave", (e) => { if (!hasFiles(e)) return; depth = Math.max(0, depth - 1); if (!depth) hide(); });
    on(window, "dragover", (e) => { if (hasFiles(e)) e.preventDefault(); });
    on(window, "drop", (e) => { if (!hasFiles(e)) return; e.preventDefault(); const f = e.dataTransfer.files[0]; hide(); sendFile(f); });
    zone.addEventListener("dragover", () => zone.classList.add("is-over"));
    zone.addEventListener("dragleave", () => zone.classList.remove("is-over"));
    zone.addEventListener("click", () => { hide(); file.click(); });
    drop.addEventListener("click", (e) => { if (e.target === drop) hide(); });
    if (S.fixture) {
      if (S.drop) { drop.hidden = false; if (S.drop === "over") zone.classList.add("is-over"); }
    }

    toBottom();
    return () => {
      timers.forEach(clearTimeout); timers = [];
      offs.forEach((f) => f());
    };
  },
};
