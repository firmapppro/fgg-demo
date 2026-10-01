// Screens 6.1 – 6.5: Sandbox — test price calculation for an aircraft (FGG Pricing Engine)
import { icon } from "../icons.js";
import { esc, btn, selectField, dateTimeField, parseDT, fmtDT, toast, $, $$ } from "../ui.js";
import { FLEET, AIRPORT_OPTIONS, AIRPORT_FULL, AIRPORTS } from "../data.js";

/* ---------------- data ---------------- */
const AP = [
  { code: "AWW", name: "Abbottabad National ...", sub: "Abbottabad, Abbottabad, Pakistan" },
  { code: "AKW", name: "Aghajari Airport", sub: "Fort Worth, USA" },
  ...AIRPORT_FULL.map((s) => { const [code, name, ...rest] = s.split(", "); return { code, name, sub: rest.join(", ") }; }),
];
const apByCode = (c) => AP.find((a) => a.code === c);
const planeLabel = (p) => { const a = AIRPORTS.find((x) => x.code === p.base); return `${p.model}, б/н ${p.tail}, ${p.base}${a ? ", " + a.city : ""}`; };
const PLANES = [FLEET[1], FLEET[0], ...FLEET.slice(2, 12)];
const FIG_PLANE = { value: "12352", label: "Gulfstream G550, б/н RA-10222, LJU, Любляна" };

const MODES = [["oneway", "В одну сторону"], ["round", "Туда и назад"], ["custom", "Произвольно"]];
const LOCS = ["Задать вручную", "Согласно календаря полетов"];
const MAX_ROWS = 6;

let S = null;
let fixture = false;

function defaults() {
  return {
    plane: "12352", version: "draft", loc: LOCS[0], airport: "LJU", mode: "oneway",
    rows: [{ from: "LFMN", to: "EDDB", date: "15/10/2026", time: "11:00", pax: 6 }],
    result: null, loading: false, open: new Set(),
  };
}
function fixtureState(query) {
  const row = { from: "AWW", to: "AKW", date: "19/07/2024", time: "11:00", pax: 10 };
  const mode = query.mode || "oneway";
  const rows = mode === "round" ? [row, { ...row, from: "AKW", to: "AWW" }] : mode === "custom" ? [row, { ...row }, { ...row }, { ...row }] : [row];
  const st = { ...defaults(), plane: FIG_PLANE.value, version: "draft", loc: query.loc === "calendar" ? LOCS[1] : LOCS[0], airport: "LJU", mode, rows };
  if (query.result === "1") st.result = figmaResult(query.open === "1");
  if (query.open === "1") st.open = new Set(["leg-1", "leg-2", "leg-3", "leg-4", "extra"]);
  return st;
}

/* ---------------- calculation (demo pricing engine) ---------------- */
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const roundTo = (n, k) => Math.round(n / k) * k;
const money = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const dur = (min) => `${Math.floor(min / 60)} ч ${String(min % 60).padStart(2, "0")}`;
const plural = (n) => { const a = n % 100, b = n % 10; return a >= 11 && a <= 14 ? "пассажиров" : b === 1 ? "пассажир" : b >= 2 && b <= 4 ? "пассажира" : "пассажиров"; };

function figmaResult(expanded) {
  const ferry = (n, from, to, total, l) => ({ n, from, to, type: "Перегоночный", dur: "1 ч 45", total, lines: l });
  const com = (n, from, to, total, l) => ({ n, from, to, type: "Коммерческий", dur: "1 ч 45", total, lines: l });
  return {
    model: expanded ? "Embraer Legacy 650" : "Legasy 650", cls: "Light", pax: 12, years: expanded ? "2015 г." : "2010 - 2015 г.", updated: "2023/2024 г.", total: 69000, rub: "≈1 000 000 RUB", photo: "g550-ext",
    legs: [
      ferry(1, "LJU", "EETN", 15411, [["Летный час (тариф)", 13125], ["Сборы аэропорта вылета", 950], ["Сборы аэропорта прилета", 1336]]),
      com(2, "EETN", "EDDB", 15621, [["Летный час (тариф)", 11875], ["VIP-обслуживание и пассажирские сборы", 1246], ["Аэропортовые сборы", 2500]]),
      com(3, "EDDB", "LFMN", 15411, [["Летный час (тариф)", 14375], ["Аэропортовые сборы и наземное обслуживание", 1365], ["Специальный хэндлинг", 2400]]),
      com(4, "EETN", "EDDB", 15621, [["Летный час (тариф)", 11875], ["Аэропортовые сборы и оверфлайт-навигация", 1246], ["Наземный хэндлинг и встреча", 2500]]),
    ],
    extra: { total: 6700, lines: [["Паркинг", 14375], ["Стоимость экипажа", 1365]] },
  };
}

function calculate() {
  const plane = FLEET.find((p) => p.id === S.plane) || FLEET[1];
  const rate = plane.hour || 5800;
  const code = (c) => c;
  const pts = []; // [from, to, commercial]
  let at = S.loc === LOCS[0] ? S.airport : plane.base;
  S.rows.forEach((r) => {
    if (code(at) !== code(r.from)) pts.push([at, r.from, false]);
    pts.push([r.from, r.to, true]);
    at = r.to;
  });
  const legs = pts.map(([a, b, commercial], i) => {
    const min = roundTo(55 + (hash([a, b].sort().join("-")) % 260), 5);
    const tariff = roundTo((rate * min) / 60 * (S.version === "draft" ? 0.97 : 1), 5);
    const feeA = 400 + (hash(a) % 1200), feeB = 450 + (hash(b) % 1400);
    const pax = S.rows[0].pax;
    const lines = commercial
      ? [["Летный час (тариф)", tariff], ["VIP-обслуживание и пассажирские сборы", roundTo(pax * (95 + (hash(b) % 40)), 1)], ["Аэропортовые сборы", feeA + feeB]]
      : [["Летный час (тариф)", tariff], ["Сборы аэропорта вылета", feeA], ["Сборы аэропорта прилета", feeB]];
    return { n: i + 1, from: a, to: b, type: commercial ? "Коммерческий" : "Перегоночный", dur: dur(min), total: lines.reduce((s, l) => s + l[1], 0), lines };
  });
  const park = 350 * legs.length + (hash(plane.id) % 400), crew = 900 + legs.length * 180;
  const extra = { total: park + crew, lines: [["Паркинг", park], ["Стоимость экипажа", crew]] };
  const total = roundTo(legs.reduce((s, l) => s + l.total, 0) + extra.total, 50);
  return {
    model: plane.model, cls: plane.cls, pax: plane.pax, years: `${plane.year} г.`, updated: "2023/2024 г.", total, rub: `≈${money(total * 95)} RUB`, photo: plane.photo, legs, extra,
  };
}

/* ---------------- html ---------------- */
const rcard = (id, label, on) => `<button type="button" class="rcard ${on ? "is-sel" : ""}" data-mode="${id}" role="radio" aria-checked="${on}"><i class="rcard__r"></i><span class="rcard__t">${esc(label)}</span></button>`;

function apControl(id, code, ic) {
  const a = apByCode(code);
  return `<div class="field sbx-ap" data-field="${id}">
    <div class="control control--select control--ap" data-select="${id}" data-value="${esc(code)}" tabindex="0">
      ${icon(ic, 20, "ap__ic")}
      <div class="ap__t">${a ? `<div class="ap__l1">${esc(a.code)}, ${esc(a.name)}</div><div class="ap__l2">${esc(a.sub)}</div>` : `<div class="ap__ph">Выберите аэропорт</div>`}</div>
      <div class="dropdown dropdown--ap" hidden>
        ${AP.map((o) => `<button type="button" class="dropdown__item ap__opt ${o.code === code ? "is-selected" : ""}" data-ap="${id}" data-code="${esc(o.code)}"><span>${esc(o.code)}, ${esc(o.name)}</span><small>${esc(o.sub)}</small></button>`).join("")}
      </div>
    </div>
    <div class="field__error" data-error></div>
  </div>`;
}

function rowHtml(r, i, custom) {
  const stepper = `<div class="stepper ${custom ? "stepper--fix" : ""}">
    <button type="button" class="stepper__b" data-step="-1" data-row="${i}" aria-label="Меньше">${icon("minus", 20)}</button>
    <span class="stepper__t">${r.pax} ${fixture ? "пассажир" : plural(r.pax)}</span>
    <button type="button" class="stepper__b" data-step="1" data-row="${i}" aria-label="Больше">${icon("plus", 20)}</button></div>`;
  const trash = custom ? `<button type="button" class="sbx-trash" data-del-row="${i}" aria-label="Удалить направление" ${S.rows.length < 2 ? "disabled" : ""}>${icon("trash-2", 20)}</button>` : "";
  return `<div class="sbx-rowwrap"><div class="sbx-row ${custom ? "is-custom" : ""}">
    ${apControl(`r${i}-from`, r.from, "plane-takeoff")}
    ${apControl(`r${i}-to`, r.to, "plane-landing")}
    ${dateTimeField({ id: `r${i}-date`, value: r.date, kind: "date", iconLeft: true, placeholder: "дд/мм/гггг", cls: "sbx-date" })}
    ${dateTimeField({ id: `r${i}-time`, value: r.time, kind: "time", iconLeft: true, placeholder: "чч:мм", cls: "sbx-time" })}
    ${stepper}${trash}
  </div></div>`;
}

function routesHtml() {
  const custom = S.mode === "custom";
  return `<div class="sbx-routes" id="sbx-routes">
    <div class="sbx-modes" role="radiogroup">${MODES.map(([id, l]) => rcard(id, l, S.mode === id)).join("")}</div>
    <div class="sbx-rows">${S.rows.map((r, i) => rowHtml(r, i, custom && i > 0)).join("")}
      ${custom ? btn({ text: "Добавить направление", kind: "white", icon: "plus", id: "sbx-add", block: true, disabled: S.rows.length >= MAX_ROWS }) : ""}
    </div>
  </div>`;
}

function formHtml() {
  const planes = fixture ? [FIG_PLANE] : PLANES.map((p) => ({ value: p.id, label: planeLabel(p) }));
  const draft = S.version === "draft";
  return `<section class="sbx-card" id="sbx-form">
    <div class="sbx-sec">
      <div class="sub"><span class="sub__t">1. Выбор борта</span><span class="sub__hr"></span></div>
      <div class="sbx-r1">
        ${selectField({ label: "Борт", id: "plane", options: planes, value: S.plane, infoIcon: true, cls: "sbx-plane" })}
        <div class="field sbx-ver">
          <div class="field__label">Версия настроек${icon("info", 16)}</div>
          <div class="sbx-ver__row">
            <div class="seg" role="radiogroup">
              <button type="button" class="seg__b ${draft ? "is-sel" : ""}" data-version="draft" role="radio" aria-checked="${draft}">Черновые</button>
              <button type="button" class="seg__b ${draft ? "" : "is-sel"}" data-version="published" role="radio" aria-checked="${!draft}">Опубликованные</button>
            </div>
            <span class="sbx-ver__hint" id="ver-hint">Используются ${draft ? "черновые" : "опубликованные"} настройки</span>
          </div>
        </div>
      </div>
      <div class="sbx-r2" id="sbx-loc">${locHtml()}</div>
      <div class="sbx-banner">${icon("info", 24)}<span>Этот тестовый расчет не влияет на цены, доступные клиентам.</span></div>
    </div>
    <div class="sbx-sec">
      <div class="sub"><span class="sub__t">Рассчитать тестовый перелет</span><span class="sub__hr"></span></div>
      ${routesHtml()}
      <div class="sbx-actions">
        ${btn({ text: "Очистить форму", kind: "secondary", w200: true, id: "sbx-clear" })}
        ${btn({ text: S.result ? "Обновить результаты" : "Рассчитать", kind: "primary", w200: true, id: "sbx-calc" })}
      </div>
    </div>
  </section>`;
}

function locHtml() {
  return `${selectField({ label: "Местонахождение самолета", id: "loc", options: LOCS, value: S.loc, infoIcon: true, cls: "sbx-half" })}
    ${S.loc === LOCS[0] ? selectField({ label: "Аэропорт", id: "airport", options: AIRPORT_OPTIONS, value: S.airport, infoIcon: true, cls: "sbx-half" }) : ""}`;
}

const legHeadHtml = (l, id, open) => `<div class="leg__head ${open ? "is-open" : ""}" data-leg="${id}" role="button" tabindex="0">
  <div class="leg__l"><span class="leg__n">${l.n}</span>
    <div class="leg__t"><div class="leg__route"><b>${esc(l.from)} → ${esc(l.to)}</b><span class="tag">${esc(l.type)}</span></div>
    <div class="leg__time">${icon("info", 16)}<span>Время в пути: ${esc(l.dur)}</span></div></div></div>
  <b class="leg__sum">${money(l.total)} EUR</b>${icon("chevron-down", 20, "leg__chev")}</div>`;
const linesHtml = (lines) => lines.map(([t, v]) => `<div class="leg__line"><span class="leg__lt">${esc(t)}</span><i class="leader"></i><span class="leg__lv">${money(v)} EUR</span></div>`).join("");

function legCard(l) {
  const id = `leg-${l.n}`, open = S.open.has(id);
  return `<div class="leg ${open ? "is-open" : ""}" id="${id}">${legHeadHtml(l, id, open)}${open ? `<div class="leg__body">${linesHtml(l.lines)}</div>` : ""}</div>`;
}

function resultHtml() {
  const r = S.result;
  if (!r) return "";
  const open = S.open.has("extra");
  return `<section class="sbx-card sbx-card--res" id="sbx-result">
    <div class="sbx-sec">
      <div class="sub"><span class="sub__t">Результат расчета</span><span class="sub__hr"></span></div>
      <div class="res">
        <div class="res__imgs"><img src="images/planes/${esc(r.photo)}.jpg" alt=""><img src="images/planes/g550-cabin.jpg" alt=""><div class="res__plan"><img src="images/planes/g550-plan.svg" alt=""></div></div>
        <div class="res__info">
          <div class="res__main">
            <div class="res__name"><b>${esc(r.model)}</b><span class="rchip">${esc(r.cls)}</span></div>
            <div class="res__sub"><div class="res__meta"><span>${icon("user", 16)}до ${r.pax}</span><i class="dot"></i><span>${icon("calendar", 16)}${esc(r.years)}</span></div>
            <div class="res__upd">${icon("refresh-cw", 16)}Обновлен: ${esc(r.updated)}</div></div>
          </div>
          <div class="res__price">
            <div class="price"><div class="price__v"><b>${money(r.total)}</b><span>EUR</span></div><div class="price__rub">${esc(r.rub)}</div></div>
            <button type="button" class="btn btn--link" id="res-more">Подробнее</button>
          </div>
        </div>
      </div>
    </div>
    <div class="sbx-sec" id="sbx-breakdown">
      <div class="sub"><span class="sub__t">Как сформировалась стоимость</span><span class="sub__hr"></span></div>
      <div class="legs">
        ${r.legs.map(legCard).join("")}
        <div class="leg leg--extra ${open ? "is-open" : ""}" id="extra">
          <div class="leg__head ${open ? "is-open" : ""}" data-leg="extra" role="button" tabindex="0"><div class="leg__l"><b>Дополнительные расходы по маршруту</b></div><b class="leg__sum">${money(r.extra.total)} EUR</b>${icon("chevron-down", 20, "leg__chev")}</div>
          ${open ? `<div class="leg__body">${linesHtml(r.extra.lines)}</div>` : ""}
          <div class="sbx-banner sbx-banner--sm">${icon("info", 24)}<span>Эти расходы рассчитываются на уровне всего маршрута, а не отдельных плеч.</span></div>
        </div>
        <div class="total"><div><b class="total__t">Итоговая расчетная цена:</b><div class="total__s">Коммерческие и системные корректировки уже учтены в итоговой цене.</div></div><b class="total__v">${money(r.total)} EUR</b></div>
      </div>
    </div>
  </section>`;
}

/* ---------------- page ---------------- */
export default {
  title: () => "Песочница",
  render({ query }) {
    fixture = query.fixture === "figma";
    if (fixture) S = fixtureState(query);
    else if (!S) S = defaults();
    S.loading = false;
    const custom = S.mode === "custom";
    return `
    <div class="page sbx">
      <div class="page-head page-head--top">
        <div class="page-head__titles sbx-titles">
          <h1 class="page-head__title">Песочница</h1>
          <div class="page-head__sub">Проверьте, как FGG Pricing Engine© рассчитывает ваш борт. Тестовые расчеты не отображаются</div>
        </div>
        <div id="sbx-top">${custom ? btn({ text: "Рассчитать", kind: "primary", w200: true, id: "sbx-calc-top" }) : ""}</div>
      </div>
      ${formHtml()}
      <div id="sbx-res">${resultHtml()}</div>
    </div>`;
  },
  mount() {
    const root = $("#main");
    const rerenderRoutes = () => { $("#sbx-routes").outerHTML = routesHtml(); $("#sbx-top").innerHTML = S.mode === "custom" ? btn({ text: "Рассчитать", kind: "primary", w200: true, id: "sbx-calc-top" }) : ""; };
    const rerenderRes = () => { $("#sbx-res").innerHTML = resultHtml(); };
    const clampPax = (n) => Math.max(1, Math.min(plane().pax || 14, n));
    const plane = () => FLEET.find((p) => p.id === S.plane) || FLEET[1];

    function setMode(mode) {
      const r0 = S.rows[0];
      S.mode = mode;
      if (mode === "oneway") S.rows = [r0];
      else if (mode === "round") S.rows = [r0, { ...r0, from: r0.to, to: r0.from }];
      else if (S.rows.length < 2) S.rows = [r0, { ...r0, from: r0.to, to: "", date: r0.date }];
      rerenderRoutes();
    }

    root.addEventListener("click", (e) => {
      const t = e.target;
      const m = t.closest("[data-mode]"); if (m) return setMode(m.dataset.mode);
      const v = t.closest("[data-version]");
      if (v) { S.version = v.dataset.version; $$(".seg__b").forEach((b) => { const on = b.dataset.version === S.version; b.classList.toggle("is-sel", on); b.setAttribute("aria-checked", on); }); $("#ver-hint").textContent = `Используются ${S.version === "draft" ? "черновые" : "опубликованные"} настройки`; return; }
      const ap = t.closest("[data-ap]");
      if (ap) {
        const [, i, which] = ap.dataset.ap.match(/^r(\d+)-(from|to)$/);
        S.rows[+i][which] = ap.dataset.code;
        if (S.mode === "round" && +i === 0) { const r = S.rows[1]; if (r) { r.from = S.rows[0].to; r.to = S.rows[0].from; } }
        return rerenderRoutes();
      }
      const st = t.closest("[data-step]");
      if (st) { const r = S.rows[+st.dataset.row]; r.pax = clampPax(r.pax + Number(st.dataset.step)); if (S.mode === "round") S.rows.forEach((x) => (x.pax = r.pax)); return rerenderRoutes(); }
      const dr = t.closest("[data-del-row]");
      if (dr && !dr.disabled) { S.rows.splice(+dr.dataset.delRow, 1); return rerenderRoutes(); }
      if (t.closest("#sbx-add")) { const l = S.rows[S.rows.length - 1]; S.rows.push({ from: l.to, to: "", date: l.date, time: l.time, pax: l.pax }); return rerenderRoutes(); }
      if (t.closest("#sbx-clear")) { S.rows = [{ from: "", to: "", date: "", time: "", pax: 1 }]; S.mode = S.mode === "custom" ? "custom" : S.mode; if (S.mode === "round") S.rows.push({ from: "", to: "", date: "", time: "", pax: 1 }); S.result = null; S.open = new Set(); rerenderRoutes(); rerenderRes(); $("#sbx-calc").textContent = "Рассчитать"; return; }
      if (t.closest("#sbx-calc") || t.closest("#sbx-calc-top")) return run();
      if (t.closest("#res-more")) { ["leg-1", "leg-2", "leg-3", "leg-4", "extra"].forEach((x) => S.open.add(x)); rerenderRes(); $("#sbx-breakdown").scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      const lh = t.closest("[data-leg]");
      if (lh) { const id = lh.dataset.leg; S.open.has(id) ? S.open.delete(id) : S.open.add(id); const y = window.scrollY; rerenderRes(); window.scrollTo(0, y); return; }
    });
    root.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-leg]")) { e.preventDefault(); e.target.click(); } });

    root.addEventListener("input", (e) => {
      const m = e.target.id && e.target.id.match(/^r(\d+)-(date|time)$/);
      if (!m) return;
      S.rows[+m[1]][m[2]] = e.target.value;
      const f = e.target.closest(".field"); if (f) f.classList.remove("is-error");
    });
    root.addEventListener("select-change", (e) => {
      const { id, value } = e.detail;
      if (id === "plane") { S.plane = value; const p = plane(); if (p) { S.airport = p.base; if (S.loc === LOCS[0]) $("#sbx-loc").innerHTML = locHtml(); } S.rows.forEach((r) => (r.pax = clampPax(r.pax))); rerenderRoutes(); }
      else if (id === "loc") { S.loc = value; $("#sbx-loc").innerHTML = locHtml(); }
      else if (id === "airport") S.airport = value;
    });

    function validate() {
      let ok = true;
      $$(".sbx-row .field").forEach((f) => f.classList.remove("is-error"));
      S.rows.forEach((r, i) => {
        const bad = (id) => { const f = document.querySelector(`[data-field="${id}"]`); if (f) f.classList.add("is-error"); ok = false; };
        if (!r.from) bad(`r${i}-from`);
        if (!r.to || r.to === r.from) bad(`r${i}-to`);
        if (!parseDT(r.date)) bad(`r${i}-date`);
        if (!/^\d{1,2}:\d{2}$/.test((r.time || "").trim())) bad(`r${i}-time`);
      });
      return ok;
    }

    function run() {
      if (S.loading) return;
      if (!validate()) return toast("Заполните аэропорты, дату и время для каждого направления", "negative");
      S.loading = true;
      const b = $("#sbx-calc"), bt = $("#sbx-calc-top");
      [b, bt].forEach((x) => { if (x) { x.disabled = true; x.textContent = "Считаем…"; } });
      setTimeout(() => {
        S.loading = false;
        S.result = calculate();
        S.open = new Set();
        const sec = $("#sbx-form"); if (!sec) return;
        $("#sbx-calc") && ($("#sbx-calc").disabled = false);
        rerenderRes();
        $("#sbx-calc").textContent = "Обновить результаты"; $("#sbx-calc").disabled = false;
        if ($("#sbx-calc-top")) { $("#sbx-calc-top").textContent = "Рассчитать"; $("#sbx-calc-top").disabled = false; }
        $("#sbx-result").scrollIntoView({ behavior: "smooth", block: "start" });
      }, 900);
    }
  },
};
