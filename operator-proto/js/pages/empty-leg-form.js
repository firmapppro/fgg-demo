// Screens 5.9 – 5.18: Empty leg create / edit form, photo and delete modals
import { icon } from "../icons.js";
import { esc, btn, field, selectField, dateTimeField, parseDT, fmtDT, setSelectValue, setError, confirmModal, toast, $ } from "../ui.js";
import { AIRPORTS, AIRPORT_OPTIONS, FLEET, MODEL_OPTIONS } from "../data.js";
import { getLeg, saveLeg, deleteLeg, PRIORITIES } from "../legs.js";

const PHOTO_LIST = ["g550-ext", "g550-cabin", "g550-2", "g550-5", "g550-plan"];
const ph = (p) => (p.startsWith("data:") ? p : `images/planes/${p}.${p === "g550-plan" ? "svg" : "jpg"}`);

let S = null; // form state

const planeLabel = (p) => { const a = AIRPORTS.find((x) => x.code === p.base); return `${p.model}, б/н ${p.tail}, ${p.base}${a ? ", " + a.city : ""}`; };
const planesOf = (model) => FLEET.filter((p) => p.model === model).slice(0, 8).map((p) => ({ value: p.id, label: planeLabel(p) }));
const modelOptions = () => (S.fixture ? ["Gulfstream G550", ...MODEL_OPTIONS] : MODEL_OPTIONS);
const planeOptions = () => (S.fixture ? [{ value: "12352", label: "Gulfstream G550, б/н RA-10222, LJU, Любляна" }] : planesOf(S.f.model));

function init({ params, query }) {
  const fixture = query.fixture === "figma";
  const edit = !!params.id;
  S = { fixture, edit, id: params.id || "", dirty: false, submitted: false, f: null, focusPax: false };
  if (edit) {
    if (fixture) {
      S.f = { from: "LJU", to: "LFMN", dt: "05/09/2026  23:05", range: query.range === "1", dt2: "05/09/2026  23:05", model: "Gulfstream G550", plane: "12352", pax: query.pax || "10", status: "Неактивен", until: "05/09/2026  23:05", priority: "Срочный", photos: ["g550-ext"] };
    } else {
      const l = getLeg(params.id);
      if (l) S.f = { from: l.from, to: l.to, dt: fmtDT(new Date(l.at)), range: !!l.atTo, dt2: l.atTo ? fmtDT(new Date(l.atTo)) : "", model: l.model, plane: l.planeId, pax: String(l.pax), status: l.status === "active" ? "Активен" : "Неактивен", until: fmtDT(new Date(l.until)), priority: l.priority, photos: [...l.photos] };
      else S.missing = true;
    }
  } else {
    const code = (c) => (AIRPORTS.some((a) => a.code === c) ? c : "");
    S.f = { from: code(query.from), to: code(query.to), dt: "", range: false, dt2: "", model: "", plane: "", pax: "", status: "Неактивен", until: "", priority: "", photos: fixture ? PHOTO_LIST.slice(0, Number(query.photos || 0)) : [] };
    const pl = FLEET.find((p) => p.id === query.plane);
    if (pl) { S.f.model = pl.model; S.f.plane = pl.id; S.f.pax = String(pl.pax); if (!S.f.from) S.f.from = pl.base; }
    if (fixture) S.f.status = "";
  }
  S.forceOv = fixture && query.ov === "1";
}

const toggleHtml = (on) => `<div class="toggle-row"><button type="button" class="toggle ${on ? "is-on" : ""}" id="range" role="switch" aria-checked="${on}"></button><span class="toggle-row__t">Указать диапазон вылета</span></div>`;

function photosHtml() {
  const f = S.f;
  const title = `<span class="pf-title">1. Добавление заставки для Empty Leg</span>`;
  if (!f.photos.length) {
    return `<section class="pf-card pf-card--photos-empty" id="sec-photos">${title}
      <div class="dropzone" data-add-photo>${btn({ text: "Добавить фотографию", kind: "link", icon: "plus", attrs: "tabindex=-1" })}</div></section>`;
  }
  const many = f.photos.length > 4;
  return `<section class="pf-card pf-card--elphotos" id="sec-photos">
    <div class="pf-photos-head">${title}${btn({ text: S.edit ? "Заменить фотографию" : "Добавить фотографию", kind: "link", icon: "repeat", attrs: "data-add-photo" })}</div>
    <div class="photos">
      <div class="photos__row" id="photos-row">
        ${f.photos.map((p, i) => `<div class="photo photo--el ${S.forceOv && i === 0 ? "is-ov" : ""}"><img src="${esc(ph(p))}" alt=""><i class="photo__shade"></i><button type="button" class="photo__trash" data-del-photo="${i}" aria-label="Удалить фото">${icon("trash-2", 20)}</button></div>`).join("")}
      </div>
      ${many ? `<div class="photos__fade"><button type="button" class="photos__next" id="photos-next" aria-label="Далее">${icon("chevron-right", 24)}</button></div>` : ""}
    </div></section>`;
}

function dateRowHtml() {
  const f = S.f;
  return `<div class="el-daterow" id="daterow">
    ${dateTimeField({ label: "Дата и время", id: "dt", value: f.dt })}
    <div class="el-toggle">${toggleHtml(f.range)}</div>
    ${f.range ? dateTimeField({ label: "Вылет до", id: "dt2", value: f.dt2 }) : ""}
  </div>`;
}

function planeFieldHtml() {
  const f = S.f;
  return selectField({ label: "Борт", id: "plane", options: planeOptions(), value: f.plane, placeholder: "Выберите борт", disabled: !S.fixture && !f.model });
}

function mainHtml() {
  const f = S.f;
  return `<section class="pf-card" id="sec-main">
    <div class="pf-title">2. Основная информация</div>
    <div class="el-grid2">
      ${selectField({ label: "Откуда", id: "from", options: AIRPORT_OPTIONS, value: f.from, placeholder: "Выберите локацию" })}
      ${selectField({ label: "Куда", id: "to", options: AIRPORT_OPTIONS, value: f.to, placeholder: "Выберите локацию" })}
    </div>
    ${dateRowHtml()}
    <div class="el-grid2">
      ${selectField({ label: "Самолет", id: "model", options: modelOptions(), value: f.model, placeholder: "Выберите самолет" })}
      <div id="plane-wrap" style="display:contents">${planeFieldHtml()}</div>
    </div>
    <div class="frow">${field({ label: "Количество пассажиров", id: "pax", placeholder: "Введите количество", value: f.pax, attrs: 'inputmode="numeric"' })}</div>
  </section>`;
}

function statusHtml() {
  const f = S.f;
  return `<section class="pf-card" id="sec-status">
    <div class="pf-title">Статус и приоритет</div>
    <div class="frow">
      ${selectField({ label: "Статус", id: "status", options: ["Неактивен", "Активен"], value: f.status, placeholder: "Выберите" })}
      ${dateTimeField({ label: "Активен до ", id: "until", value: f.until, noIcon: true })}
      ${selectField({ label: "Приоритет", id: "priority", options: PRIORITIES, value: f.priority, placeholder: "Выберите" })}
    </div>
  </section>`;
}

const actionsHtml = () => `<div class="el-actions">
  ${btn({ text: "Отменить", kind: "white", w200: true, id: "el-cancel" })}
  ${btn({ text: "Отправить на модерацию", kind: "primary", id: "el-submit", disabled: S.edit && !S.dirty })}
</div>`;

export default {
  title: ({ params }) => (params.id ? "Редактирование Empty leg" : "Создание Empty leg"),
  render(ctx) {
    init(ctx);
    if (S.missing) {
      return `<div class="page"><a class="pf-back" href="#/empty-legs">${icon("chevron-left", 24)}<span>Назад</span></a>
        <div class="empty-state"><div class="t-sub">Empty leg не найден</div><div class="c-grey">Возможно, он был удален</div></div></div>`;
    }
    const edit = S.edit;
    return `
    <div class="pf ${edit ? "pf--el" : ""}">
      <a class="pf-back" href="#/empty-legs">${icon("chevron-left", 24)}<span>Назад</span></a>
      <div class="pf-main">
        <div class="pf-head">
          <h1 class="page-head__title">${edit ? (ctx.query.fixture === "figma" && ctx.query.title === "view" ? "Просмотр и редактирование Empty leg" : "Редактирование Empty leg") : "Создание Empty leg"}</h1>
          ${edit ? btn({ text: "Удалить", kind: "link-red", icon: "trash-2", id: "el-delete" }) : ""}
        </div>
        <div class="pf-body" id="pf-body">
          ${photosHtml()}
          ${mainHtml()}
          ${statusHtml()}
          ${actionsHtml()}
        </div>
      </div>
    </div>`;
  },
  mount({ go }) {
    if (S.missing) return;
    const root = $("#main");
    const f = S.f;
    const markDirty = () => { if (!S.dirty) { S.dirty = true; const b = $("#el-submit"); if (b) b.disabled = false; } };
    const clearErr = (id) => setError(id, "");

    root.addEventListener("input", (e) => {
      const t = e.target;
      if (!t.id) return;
      if (["dt", "dt2", "until", "pax"].includes(t.id)) {
        if (t.id === "pax") t.value = t.value.replace(/\D/g, "").slice(0, 3);
        f[t.id] = t.value; clearErr(t.id); markDirty();
      }
    });

    root.addEventListener("select-change", (e) => {
      const { id, value } = e.detail;
      if (!["from", "to", "model", "plane", "status", "priority"].includes(id)) return;
      f[id] = value; clearErr(id); markDirty();
      if (id === "model") {
        f.plane = "";
        $("#plane-wrap").innerHTML = planeFieldHtml();
      }
      if (id === "plane") {
        const p = FLEET.find((x) => x.id === value);
        if (p && !f.pax) { f.pax = String(p.pax); $("#pax").value = f.pax; }
        if (p && !f.from) { f.from = p.base; setSelectValue("from", p.base); }
      }
    });

    function pickPhotos(replace) {
      const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*"; inp.multiple = !replace;
      inp.onchange = () => {
        const files = [...inp.files]; if (!files.length) return;
        if (replace) f.photos = [];
        let left = files.length;
        files.forEach((file) => {
          const r = new FileReader();
          r.onload = () => { f.photos.push(String(r.result)); if (--left === 0) { $("#sec-photos").outerHTML = photosHtml(); markDirty(); } };
          r.readAsDataURL(file);
        });
      };
      inp.click();
    }

    function validate() {
      let ok = true;
      const need = (id, msg) => { if (!f[id]) { setError(id, msg); ok = false; } };
      need("from", "Выберите локацию"); need("to", "Выберите локацию");
      if (f.from && f.to && f.from === f.to) { setError("to", "Пункты вылета и прилета совпадают"); ok = false; }
      if (!f.dt) { setError("dt", "Укажите дату и время"); ok = false; } else if (!parseDT(f.dt)) { setError("dt", "Формат: дд/мм/гггг чч:мм"); ok = false; }
      if (f.range) {
        const a = parseDT(f.dt), b = parseDT(f.dt2);
        if (!f.dt2) { setError("dt2", "Укажите дату и время"); ok = false; }
        else if (!b) { setError("dt2", "Формат: дд/мм/гггг чч:мм"); ok = false; }
        else if (a && b < a) { setError("dt2", "Должна быть позже даты вылета"); ok = false; }
      }
      need("model", "Выберите самолет"); need("plane", "Выберите борт");
      if (!f.pax || Number(f.pax) < 1) { setError("pax", "Укажите количество пассажиров"); ok = false; }
      if (!f.status) { setError("status", "Выберите статус"); ok = false; }
      if (!f.until) { setError("until", "Укажите дату и время"); ok = false; } else if (!parseDT(f.until)) { setError("until", "Формат: дд/мм/гггг чч:мм"); ok = false; }
      return ok;
    }

    function submit() {
      if (!validate()) { toast("Заполните обязательные поля", "negative"); const e = $(".field.is-error"); if (e) e.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
      const rec = {
        id: S.edit ? S.id : undefined,
        from: f.from, to: f.to, at: parseDT(f.dt).getTime(), atTo: f.range ? parseDT(f.dt2).getTime() : null, until: parseDT(f.until).getTime(),
        model: f.model, planeId: f.plane, pax: Number(f.pax), status: f.status === "Активен" ? "active" : "inactive", priority: f.priority || "", photos: [...f.photos],
        cost: (getLeg(S.id) || {}).cost || (4 + Math.floor(Math.random() * 30)) * 100000,
      };
      saveLeg(rec);
      toast(S.edit ? "Изменения отправлены на модерацию" : "Empty leg отправлен на модерацию");
      go("/empty-legs");
    }

    root.addEventListener("click", (e) => {
      const t = e.target;
      if (t.closest(".pf-back")) { e.preventDefault(); return go("/empty-legs"); }
      if (t.closest("[data-add-photo]")) return pickPhotos(S.edit);
      const dp = t.closest("[data-del-photo]");
      if (dp) {
        const i = Number(dp.dataset.delPhoto);
        return confirmModal({
          title: "Удаление фотографии", text: "Вы уверены, что хотите удалить эту фотографию?", textWidth: 220,
          confirmText: "Удалить", cancelText: "Отменить", cancelKind: "white", danger: true, closable: true, size: "modal--sm",
          onConfirm: () => { f.photos.splice(i, 1); $("#sec-photos").outerHTML = photosHtml(); markDirty(); toast("Фотография удалена"); },
        });
      }
      if (t.closest("#photos-next")) { $("#photos-row").scrollBy({ left: 232, behavior: "smooth" }); return; }
      if (t.closest("#range")) {
        f.range = !f.range; if (!f.range) f.dt2 = "";
        $("#daterow").outerHTML = dateRowHtml(); markDirty(); return;
      }
      if (t.closest("#el-cancel")) return go("/empty-legs");
      if (t.closest("#el-submit")) return submit();
      if (t.closest("#el-delete")) return confirmModal({
        title: "Удалить Empty leg", text: "Вы уверены, что хотите удалить Empty leg?", confirmText: "Удалить", danger: true,
        onConfirm: () => { deleteLeg(S.id); toast("Empty leg удален"); go("/empty-legs"); },
      });
    });
  },
};
