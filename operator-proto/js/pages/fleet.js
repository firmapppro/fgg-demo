// Screens 7.1 – 7.5: fleet list with filters and pagination
import { icon } from "../icons.js";
import { esc, btn, field, selectField, pagerHtml, $ } from "../ui.js";
import { FLEET, MODEL_OPTIONS, AIRPORT_OPTIONS, figmaFixtureFleet } from "../data.js";

const state = { open: false, page: 1, size: 10, f: {}, loading: false };
let loadTimer = null;
const EMPTY_F = { id: "", model: "", status: "", tail: "", base: "", range: "", toilet: "", seats: "", attendant: "", cabin: "", baggage: "", hour: "" };
let fixture = false;
let fakePages = 0;

const thumb = (p) => `images/planes/${p.photo}-t.jpg`;

function data() { return fixture ? figmaFixtureFleet() : FLEET; }

function filtered() {
  if (fixture) return data().slice(0, Number(new URLSearchParams(location.hash.split('?')[1] || '').get('rows')) || (anyFilter() ? 6 : 99));
  const f = { ...EMPTY_F, ...state.f };
  const has = (v) => v !== "" && v != null;
  return data().filter((p) => {
    if (has(f.id) && !p.id.includes(f.id.trim())) return false;
    if (has(f.model) && p.model !== f.model) return false;
    if (has(f.status) && (f.status === "Активен" ? "active" : "inactive") !== p.status) return false;
    if (has(f.tail) && !p.tail.toLowerCase().includes(f.tail.trim().toLowerCase())) return false;
    if (has(f.base) && p.base !== f.base) return false;
    if (has(f.range) && p.range < Number(f.range)) return false;
    if (has(f.toilet) && (f.toilet === "Да") !== p.toilet) return false;
    if (has(f.seats) && p.pax < Number(f.seats)) return false;
    if (has(f.attendant) && (f.attendant === "Да") !== p.attendant) return false;
    if (has(f.cabin) && !p.cabin.includes(f.cabin.trim())) return false;
    if (has(f.baggage) && p.baggage < Number(String(f.baggage).replace(",", "."))) return false;
    if (has(f.hour) && p.hour > Number(f.hour)) return false;
    return true;
  });
}
const anyFilter = () => Object.values(state.f).some((v) => v !== "" && v != null);

function filtersHtml() {
  const f = { ...EMPTY_F, ...state.f };
  const yn = ["Да", "Нет"];
  const soft = "field--soft";
  const row1 = [
    field({ label: "ID борта", id: "f-id", placeholder: "Введите ID", value: f.id, cls: `${soft} f-fixed` }),
    selectField({ label: "Модель самолета", id: "f-model", options: MODEL_OPTIONS, value: f.model, placeholder: "Выберите модель", cls: soft }),
    selectField({ label: "Статус", id: "f-status", options: ["Активен", "Неактивен"], value: f.status, cls: `${soft} f-fixed` }),
    field({ label: "Бортовой номер", id: "f-tail", placeholder: "Введите номер", value: f.tail, cls: soft }),
    selectField({ label: "Аэропрорт базирования", id: "f-base", options: AIRPORT_OPTIONS, value: f.base, placeholder: "Выберите локацию", cls: soft }),
    field({ label: "Дальность", id: "f-range", placeholder: "Введите дальность", value: f.range, cls: soft }),
  ];
  const row2 = [
    selectField({ label: "Туалет", id: "f-toilet", options: yn, value: f.toilet, cls: `${soft} f-fixed` }),
    field({ label: "Количество сидений", id: "f-seats", placeholder: "Введите количество", value: f.seats, cls: soft }),
    selectField({ label: "Стюардесса", id: "f-attendant", options: yn, value: f.attendant, cls: `${soft} f-fixed` }),
    field({ label: "Размер салона", id: "f-cabin", placeholder: "Введите размер", value: f.cabin, cls: soft }),
    field({ label: "Багаж", id: "f-baggage", placeholder: "Введите размер", value: f.baggage, cls: soft }),
    field({ label: "Стоитмость часа полета", id: "f-hour", placeholder: "Введите стоимость", value: f.hour, cls: soft }),
  ];
  return `<div class="filters-grid">
    <div class="filters-row">${row1.join("")}</div>
    <div class="filters-row">${row2.join("")}</div>
    <div class="filters-actions">${btn({ text: "Очистить", kind: "white", w200: true, id: "f-clear", disabled: !anyFilter() })}</div>
  </div>`;
}

function skeletonHtml(pages) {
  const row = `<div class="skel-row"><div style="width:186px"><i style="width:177px;height:20px;border-radius:6px"></i></div><div style="width:80px"><i style="width:56px;height:20px;border-radius:6px"></i></div><div style="width:104px"><i style="width:48px;height:24px;border-radius:8px"></i></div><div style="width:136px"><i style="width:97px;height:20px;border-radius:6px"></i></div><div style="width:144px"><i style="width:119px;height:20px;border-radius:6px"></i></div><div style="width:104px"><i style="width:80px;height:20px;border-radius:6px"></i></div><div style="width:152px"><i style="width:100%;height:20px;border-radius:6px"></i></div><div style="width:70px"><i style="width:100%;height:20px;border-radius:6px"></i></div></div>`;
  return { html: `
    <div class="table-card fleet-table">
      ${headHtml()}
      <div class="skel">${row.repeat(4)}</div>
    </div>
    ${pagerHtml({ page: 1, pages, size: state.size })}`, count: 0 };
}

function headHtml() {
  return `<div class="trow trow--head">
        <div class="tcell tcell--grow fleet-c-model">Модель самолета</div>
        <div class="tcell fleet-c-id">ID борта</div>
        <div class="tcell fleet-c-status">Статус</div>
        <div class="tcell fleet-c-tail">Бортовой номер</div>
        <div class="tcell fleet-c-base">Аэропорт базирования</div>
        <div class="tcell fleet-c-pax">Количество пассажиров</div>
        <div class="tcell fleet-c-act"></div>
      </div>`;
}

function tableHtml() {
  if (state.loading) return skeletonHtml(fakePages || Math.max(2, Math.ceil(filtered().length / state.size)));
  const all = filtered();
  const pages = Math.max(1, Math.ceil(all.length / state.size));
  if (state.page > pages) state.page = pages;
  const rows = all.slice((state.page - 1) * state.size, state.page * state.size);
  const body = rows.length
    ? rows.map((p) => `
      <div class="trow trow--click" data-open="${esc(p.id)}">
        <div class="tcell tcell--grow fleet-c-model">
          <img class="plane-thumb" src="${thumb(p)}" alt="">
          <div class="plane-name"><div>${esc(p.model)}</div><div class="plane-sub t-span c-grey"><span>${p.year}г</span><i class="dot"></i><span>${esc(p.cls)}</span></div></div>
        </div>
        <div class="tcell fleet-c-id">${esc(p.id)}</div>
        <div class="tcell fleet-c-status"><span class="status status--${p.status}">${p.status === "active" ? "Активен" : "Неактивен"}</span></div>
        <div class="tcell fleet-c-tail">${esc(p.tail)}</div>
        <div class="tcell fleet-c-base">${esc(p.base)}</div>
        <div class="tcell fleet-c-pax">${p.pax}</div>
        <div class="tcell fleet-c-act"><span class="btn btn--link">Просмотр</span></div>
      </div>`).join("")
    : `<div class="empty-state"><div class="t-sub">По вашему запросу ничего не найдено</div><div class="c-grey">Измените параметры фильтров или очистите их</div></div>`;
  return { html: `
    <div class="table-card fleet-table">
      ${headHtml()}
      ${body}
    </div>
    ${rows.length ? pagerHtml({ page: state.page, pages, size: state.size }) : ""}`, count: all.length };
}

export default {
  title: () => "Борты",
  render({ query }) {
    fixture = query.fixture === "figma";
    fakePages = 0; clearTimeout(loadTimer); state.loading = false;
    if (fixture) { state.f = {}; state.page = 1; state.size = 10; if (query.state === "loading") { state.loading = true; fakePages = 20; } }
    return `
    <div class="page">
      <div class="page-head">
        <h1 class="page-head__title">Борты</h1>
        ${btn({ text: "Добавить борт", kind: "primary", icon: "plus", w200: true, attrs: 'data-go="/fleet/new"' })}
      </div>
      <div class="list-block">
        <div class="filters ${state.open ? "is-open" : ""}" id="filters">
          <button type="button" class="filters-toggle ${state.open ? "is-open" : ""}" id="filters-toggle">
            <span class="filters-toggle__main">${icon("filter", 20)}<span>Фильтры</span></span>${icon("chevron-down", 24, "chev")}
          </button>
          <div id="filters-body" ${state.open ? "" : "hidden"}>${filtersHtml()}</div>
        </div>
        <div id="fleet-list" class="list-stack">${tableHtml().html}</div>
      </div>
    </div>`;
  },
  mount({ go }) {
    const root = $("#main");
    const rerenderList = () => { $("#fleet-list").innerHTML = tableHtml().html; };
    const reload = () => {
      state.loading = true; rerenderList(); clearTimeout(loadTimer);
      loadTimer = setTimeout(() => { state.loading = false; if ($("#fleet-list")) rerenderList(); }, 650);
    };
    const refreshClear = () => { const b = $("#f-clear"); if (b) b.disabled = !anyFilter(); };

    root.addEventListener("click", (e) => {
      const g = e.target.closest("[data-go]"); if (g) return go(g.dataset.go);
      const row = e.target.closest("[data-open]"); if (row) return go(`/fleet/${row.dataset.open}`);
      const pg = e.target.closest("[data-page]"); if (pg && !pg.disabled) { state.page = Number(pg.dataset.page); rerenderList(); return; }
      if (e.target.closest("#filters-toggle")) {
        state.open = !state.open;
        $("#filters-toggle").classList.toggle("is-open", state.open);
        $("#filters").classList.toggle("is-open", state.open);
        $("#filters-body").hidden = !state.open;
        return;
      }
      if (e.target.closest("#f-clear")) {
        state.f = {}; state.page = 1;
        $("#filters-body").innerHTML = filtersHtml(); reload(); return;
      }
    });
    const map = { "f-id": "id", "f-tail": "tail", "f-range": "range", "f-seats": "seats", "f-cabin": "cabin", "f-baggage": "baggage", "f-hour": "hour" };
    root.addEventListener("input", (e) => {
      const k = map[e.target.id]; if (!k) return;
      state.f[k] = e.target.value; state.page = 1; refreshClear(); reload();
    });
    root.addEventListener("select-change", (e) => {
      const { id, value } = e.detail;
      if (id === "pager-size") { state.size = Number(value); state.page = 1; rerenderList(); return; }
      const sm = { "f-model": "model", "f-status": "status", "f-base": "base", "f-toilet": "toilet", "f-attendant": "attendant" };
      if (sm[id]) { state.f[sm[id]] = value; state.page = 1; refreshClear(); reload(); }
    });
  },
};
