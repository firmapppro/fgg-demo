// Screens 5.1 – 5.7: Empty legs list with filters, skeleton, pagination, empty state
import { icon } from "../icons.js";
import { esc, btn, field, selectField, dateTimeField, parseDT, fmtDT, pagerHtml, $ } from "../ui.js";
import { AIRPORT_OPTIONS } from "../data.js";
import { getLegs, figmaLegs, apLabel } from "../legs.js";

const EMPTY_F = { id: "", dt: "", dtFrom: "", dtTo: "", costFrom: "", costTo: "", from: "", to: "", status: "", priority: "" };
const state = { open: false, page: 1, size: 10, f: { ...EMPTY_F }, loading: false };
let loadTimer = null;
let fixture = false;
let fakePages = 0;
let fxEmpty = false;

const anyFilter = () => Object.values(state.f).some((v) => v !== "" && v != null);
const num = (v) => { const n = Number(String(v).replace(/\s/g, "").replace(",", ".")); return v === "" || isNaN(n) ? null : n; };

function data() { return fixture ? figmaLegs() : getLegs(); }

function filtered() {
  const f = state.f;
  if (fixture) return fxEmpty ? [] : anyFilter() ? data().slice(0, 10) : data();
  const dt = parseDT(f.dt), dFrom = parseDT(f.dtFrom), dTo = parseDT(f.dtTo);
  const cFrom = num(f.costFrom), cTo = num(f.costTo);
  return data().filter((l) => {
    if (f.id && !l.id.includes(f.id.trim())) return false;
    if (dt) { const d = new Date(l.at); if (d.toDateString() !== dt.toDateString()) return false; }
    if (dFrom && l.at < dFrom.getTime()) return false;
    if (dTo && l.at > dTo.getTime() + 59999) return false;
    if (cFrom != null && l.cost < cFrom) return false;
    if (cTo != null && l.cost > cTo) return false;
    if (f.from && l.from !== f.from) return false;
    if (f.to && l.to !== f.to) return false;
    if (f.status && (f.status === "Активный" ? "active" : "inactive") !== l.status) return false;
    if (f.priority && l.priority !== f.priority) return false;
    return true;
  });
}

function filtersHtml() {
  const f = state.f;
  const soft = "field--soft";
  const row1 = [
    field({ label: "ID", id: "f-id", placeholder: "Введите ID", value: f.id, cls: soft }),
    dateTimeField({ label: "Дата и время", id: "f-dt", value: f.dt, cls: soft }),
    dateTimeField({ label: "Вылет с", id: "f-dtFrom", value: f.dtFrom, cls: soft }),
    dateTimeField({ label: "Вылет до", id: "f-dtTo", value: f.dtTo, cls: soft }),
    field({ label: "Стоимость от", id: "f-costFrom", placeholder: "Введите сумму", value: f.costFrom, cls: soft }),
    field({ label: "Стоимость до", id: "f-costTo", placeholder: "Введите сумму", value: f.costTo, cls: soft }),
  ];
  const row2 = [
    selectField({ label: "Откуда", id: "f-from", options: AIRPORT_OPTIONS, value: f.from, placeholder: "Выберите локацию", cls: `${soft} f-wide` }),
    selectField({ label: "Куда", id: "f-to", options: AIRPORT_OPTIONS, value: f.to, placeholder: "Выберите локацию", cls: `${soft} f-wide` }),
    selectField({ label: "Состояние", id: "f-status", options: ["Активный", "Неактивный"], value: f.status, cls: soft }),
    selectField({ label: "Приоритет", id: "f-priority", options: ["Приоритетный", "Срочный"], value: f.priority, cls: soft }),
  ];
  return `<div class="filters-grid">
    <div class="filters-row">${row1.join("")}</div>
    <div class="filters-row">${row2.join("")}</div>
    <div class="filters-actions">${btn({ text: "Очистить", kind: "white", w200: true, id: "f-clear", disabled: !anyFilter() })}</div>
  </div>`;
}

function headHtml() {
  return `<div class="trow trow--head">
    <div class="tcell el-c-id">ID</div>
    <div class="tcell el-c-date">Действует от</div>
    <div class="tcell tcell--grow">Откуда</div>
    <div class="tcell tcell--grow">Куда</div>
    <div class="tcell el-c-cost">Стоимость</div>
    <div class="tcell el-c-date">Активен до</div>
    <div class="tcell el-c-state">Состояние</div>
    <div class="tcell el-c-act"></div>
  </div>`;
}

function skeletonHtml(pages) {
  const bar = (w, h = 20, r = 6) => `<i style="width:${w};height:${h}px;border-radius:${r}px"></i>`;
  const row = `<div class="skel-row el-skel">
    <div style="width:48px">${bar("29px")}</div><div style="width:136px">${bar("48px", 24, 8)}</div>
    <div style="flex:1 1 0">${bar("177px")}</div><div style="flex:1 1 0">${bar("97px")}</div>
    <div style="width:112px">${bar("80px")}</div><div style="width:136px">${bar("80px")}</div>
    <div style="width:88px">${bar("100%")}</div><div style="width:70px">${bar("100%")}</div></div>`;
  return `<div class="table-card el-table">${headHtml()}<div class="skel">${row.repeat(4)}</div></div>
    ${pagerHtml({ page: 1, pages, size: state.size })}`;
}

function tableHtml() {
  if (state.loading) return skeletonHtml(fakePages || Math.max(2, Math.ceil(filtered().length / state.size)));
  const all = filtered();
  const pages = Math.max(1, Math.ceil(all.length / state.size));
  if (state.page > pages) state.page = pages;
  const rows = all.slice((state.page - 1) * state.size, state.page * state.size);
  const body = rows.length
    ? rows.map((l) => `
      <div class="trow trow--click" data-open="${esc(l.id)}">
        <div class="tcell el-c-id">${esc(l.id)}</div>
        <div class="tcell el-c-date">${fmtDT(new Date(l.at))}</div>
        <div class="tcell tcell--grow">${esc(apLabel(l.from))}</div>
        <div class="tcell tcell--grow">${esc(apLabel(l.to))}</div>
        <div class="tcell el-c-cost">${l.cost}</div>
        <div class="tcell el-c-date">${fmtDT(new Date(l.until))}</div>
        <div class="tcell el-c-state"><span class="status status--${l.status}">${l.status === "active" ? "Активен" : "Неактивен"}</span></div>
        <div class="tcell el-c-act"><span class="btn btn--link">Просмотр</span></div>
      </div>`).join("")
    : `<div class="empty-state"><div class="t-sub">По вашему запросу ничего не найдено</div></div>`;
  return `<div class="table-card el-table">${headHtml()}${body}</div>${pagerHtml({ page: state.page, pages, size: state.size })}`;
}

export default {
  title: () => "Empty legs",
  render({ query }) {
    fixture = query.fixture === "figma"; fxEmpty = query.empty === "1";
    fakePages = 0; clearTimeout(loadTimer); state.loading = false;
    if (fixture) {
      state.f = { ...EMPTY_F }; state.page = 1; state.size = 10;
      if (query.pre === "1") { state.f.from = "LJU"; state.f.to = "LFMN"; }
      if (query.status) state.f.status = query.status;
      if (query.priority) state.f.priority = query.priority;
      if (query.open === "1") state.open = true;
      if (query.open === "0") state.open = false;
      if (query.state === "loading") { state.loading = true; fakePages = 20; }
    }
    return `
    <div class="page">
      <div class="page-head page-head--top">
        <h1 class="page-head__title">Empty legs</h1>
        ${btn({ text: "Создать Empty leg", kind: "primary", icon: "plus", w200: true, attrs: 'data-go="/empty-legs/new"' })}
      </div>
      <div class="list-block">
        <div class="filters ${state.open ? "is-open" : ""}" id="filters">
          <button type="button" class="filters-toggle ${state.open ? "is-open" : ""}" id="filters-toggle">
            <span class="filters-toggle__main">${icon("filter", 20)}<span>Фильтры</span></span>${icon("chevron-down", 24, "chev")}
          </button>
          <div id="filters-body" ${state.open ? "" : "hidden"}>${filtersHtml()}</div>
        </div>
        <div id="el-list" class="list-stack">${tableHtml()}</div>
      </div>
    </div>`;
  },
  mount({ go }) {
    const root = $("#main");
    const rerenderList = () => { $("#el-list").innerHTML = tableHtml(); };
    const reload = () => {
      state.loading = true; rerenderList(); clearTimeout(loadTimer);
      loadTimer = setTimeout(() => { state.loading = false; if ($("#el-list")) rerenderList(); }, 650);
    };
    const refreshClear = () => { const b = $("#f-clear"); if (b) b.disabled = !anyFilter(); };

    root.addEventListener("click", (e) => {
      const g = e.target.closest("[data-go]"); if (g) return go(g.dataset.go);
      const row = e.target.closest("[data-open]"); if (row) return go(`/empty-legs/${row.dataset.open}`);
      const pg = e.target.closest("[data-page]"); if (pg && !pg.disabled) { state.page = Number(pg.dataset.page); rerenderList(); return; }
      if (e.target.closest("#filters-toggle")) {
        state.open = !state.open;
        $("#filters-toggle").classList.toggle("is-open", state.open);
        $("#filters").classList.toggle("is-open", state.open);
        $("#filters-body").hidden = !state.open;
        return;
      }
      if (e.target.closest("#f-clear")) {
        state.f = { ...EMPTY_F }; state.page = 1;
        $("#filters-body").innerHTML = filtersHtml(); reload(); return;
      }
    });
    const map = { "f-id": "id", "f-dt": "dt", "f-dtFrom": "dtFrom", "f-dtTo": "dtTo", "f-costFrom": "costFrom", "f-costTo": "costTo" };
    root.addEventListener("input", (e) => {
      const k = map[e.target.id]; if (!k) return;
      state.f[k] = e.target.value; state.page = 1; refreshClear(); reload();
    });
    root.addEventListener("select-change", (e) => {
      const { id, value } = e.detail;
      if (id === "pager-size") { state.size = Number(value); state.page = 1; rerenderList(); return; }
      const sm = { "f-from": "from", "f-to": "to", "f-status": "status", "f-priority": "priority" };
      if (sm[id]) { state.f[sm[id]] = value; state.page = 1; refreshClear(); reload(); }
    });
  },
};
