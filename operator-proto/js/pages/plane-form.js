// Screens 7.6 – 7.12: plane create / edit form (versions, photos, geography map, tariffs, calendar, integrations)
import { icon } from "../icons.js";
import { esc, btn, field, selectField, setSelectValue, getSelectValue, openModal, closeModal, confirmModal, toast, $, $$ } from "../ui.js";
import { FLEET, MODEL_OPTIONS, MODEL_SPECS, AIRPORT_FULL } from "../data.js";
import { store } from "../store.js";

const STATUSES = ["Активный", "Неактивный"];
const GEO = ["Международный", "Внутренний", "Региональный"];
const CURRENCIES = ["Евро", "Доллар США", "Рубль"];
const SOFT = "field--soft";

const CALENDAR = [
  { d1: "12.02.2026", t1: "10:45", from: "DOH", d2: "12.02.2026", t2: "12:05", to: "DXB", pax: "5", type: "Простой перелет", leg: false },
  { d1: "15.02.2026", t1: "14:30", from: "DXB", d2: "15.02.2026", t2: "18:10", to: "MCT", pax: "0", type: "Перегоночный рейс", leg: true },
  { d1: "17.02.2026", t1: "19:10", from: "AUH", d2: "17.02.2026", t2: "23:10", to: "RUH", pax: "3", type: "Простой перелет", leg: false },
  { d1: "19.02.2026", t1: "09:00", from: "DOH", d2: "19.02.2026", t2: "18:00", to: "DOH", pax: "0", type: "Тех. обслуживание", leg: true },
];

const PHOTOS = ["g550-ext", "g550-cabin", "g550-2", "g550-5", "g550-plan"];

const filledForm = () => ({
  status: "Активный", model: "Gulfstream G-550", tail: "RA-78967", geo: "Международный", cur: "Евро",
  base: AIRPORT_FULL[0], year: "2004", ext: "2023", int: "2024", taxi: "10", days: "3", floating: false,
  noteRu: "Примечание на русском языке", noteEn: "Description in English",
  range: "4350", maxpax: "12", cabin: "1294х180х210", baggage: "5,56", bags: "12", speed: "828",
  countries: [],
  comm: [["0", "135", "2200000"], ["136", "150", "1100000"], ["151", "10100", "800000"]],
  commMin: "", ferry: [["0", "135", "2200000"], ["136", "150", "1100000"], ["151", "10100", "800000"]], ferryMin: "", prev: false,
  park: [["180", "720", "2200000"], ["721", "1440", "1100000"], ["1441", "1000000", "800000"]],
  rest: [["1", "3", "1"], ["3", "5", "6"], ["5", "6", "14"], ["6", "100", "14"]],
  free: "1000", paxfee: "10", support: "10", app: "7", bank: "1000", vat: "10",
  photos: [...PHOTOS], leon: true, source: "Leon Software",
});
const emptyForm = () => ({
  status: "", model: "", tail: "", geo: "Международный", cur: "", base: "", year: "", ext: "", int: "", taxi: "", days: "", floating: false,
  noteRu: "", noteEn: "", range: "", maxpax: "", cabin: "", baggage: "", bags: "", speed: "",
  countries: [],
  comm: [["", "", ""], ["", "", ""], ["", "", ""]], commMin: "", ferry: [["", "", ""], ["", "", ""], ["", "", ""]], ferryMin: "", prev: false,
  park: [["", "", ""], ["", "", ""], ["", "", ""]],
  rest: [["1", "3", "1"], ["3", "5", "6"], ["5", "6", "14"], ["6", "100", "14"]],
  free: "", paxfee: "", support: "", app: "", bank: "", vat: "",
  photos: [], leon: false, source: "",
});

let S = null; // current page state

/* ---------------- small builders ---------------- */
const info = (t) => `<span class="info-i" title="${esc(t || "Подсказка по полю")}">${icon("info", 16)}</span>`;
function F({ id, label, ph = "", value = "", info: inf = true, type = "text" }) {
  return field({ label, id, placeholder: ph, value, infoIcon: inf, cls: SOFT, type });
}
function Sel({ id, label, options, value, ph = "Выберите", inf = true }) {
  return selectField({ label, id, options, value, placeholder: ph, infoIcon: inf, cls: SOFT });
}
const row = (...cells) => `<div class="frow">${cells.join("")}</div>`;
const sub = (title, { inf = false } = {}) => `<div class="sub"><div class="sub__t"><span>${esc(title)}</span>${inf ? info() : ""}</div><i class="sub__hr"></i></div>`;

function tiers(key, rows, labels, phs) {
  return rows.map((r, i) => row(...r.map((v, j) => F({ id: `${key}-${i}-${j}`, label: labels[j], value: v, ph: phs[j], inf: false })))).join("");
}
const MIN_PH = "Введите количество минут";

function toggle(id, on, label, { inf = false } = {}) {
  return `<div class="toggle-row"><button type="button" class="toggle ${on ? "is-on" : ""}" id="${id}" role="switch" aria-checked="${on}"></button><span class="toggle-row__t">${esc(label)}${inf ? info() : ""}</span></div>`;
}

/* ---------------- sections ---------------- */
function versionsHtml() {
  const draft = S.version === "draft";
  const publ = (sel) => `
    <button type="button" class="vcard ${sel ? "is-on" : ""}" data-version="published">
      <span class="radio ${sel ? "is-on" : ""}"></span>
      <span class="vcard__t"><span class="vcard__l1"><b>Опубликованная версия</b><span class="badge">Активна</span></span>
        <span class="vcard__l2"><span>Версия: v12</span><span>Изменен: 18.09.2026, 12:40</span></span></span>
    </button>`;
  const drf = (sel) => `
    <button type="button" class="vcard ${sel ? "is-on" : ""}" data-version="draft">
      <span class="radio ${sel ? "is-on" : ""}"></span>
      <span class="vcard__t"><span class="vcard__l1"><b>Черновик</b><span class="badge">Готов к отправке</span></span>
        <span class="vcard__l2"><span>Изменен: 18.09.2026, 12:40</span></span></span>
    </button>`;
  const warn = draft ? `
    <div class="vwarn">${icon("alert-circle", 24)}<span>Внимание: Вы редактируете Черновик v13. Эти изменения еще не проверены FGG. Клиенты видят расчеты по версии v12.</span></div>` : "";
  const note = !draft ? `<div class="vnote">Опубликованная версия v12 (Активна). Это действующие параметры борта в системе FGG.</div>` : "";
  const diff = draft ? `
    <div class="vdiff"><div class="vdiff__t">Основные изменения (Diff)</div>
      <div class="vdiff__body">Сбор за коммерческий рейс: €7 000 → €7 500\nСбор за перегоночный рейс: €5 500 → €5 800\nHandling Неаполь (RIX): +€200 (€2 200 → €2 400)\nПассажировместимость: 8 → 9 PAX\nДобавлен маршрут LFPB → EGLL\nОбновлено фото салона борта</div></div>` : "";
  return `
    <section class="pf-card pf-card--versions ${draft ? "is-draft" : ""}" id="sec-versions">
      <div class="pf-vhead"><span class="pf-title">Версии и публикация</span>
        <span class="pf-chip">${icon("alert-circle", 16)}<span>Есть неопубликованные изменения</span></span></div>
      <div class="vstack"><div class="vcards">${publ(!draft)}${drf(draft)}</div>${warn}${note}</div>
      ${diff}
    </section>`;
}

function photosHtml() {
  if (S.mode === "create" && !S.form.photos.length) {
    return `
    <section class="pf-card pf-card--photos-empty" id="sec-photos">
      <div class="pf-title">Добавление фотографий борта</div>
      <div class="dropzone" data-add-photo>${btn({ text: "Добавить фотографию", kind: "link", icon: "plus", attrs: "tabindex=-1" })}</div>
    </section>`;
  }
  return `
    <section class="pf-card pf-card--photos" id="sec-photos">
      <div class="pf-photos-head"><span class="pf-title">Добавление фотографий борта</span>
        ${btn({ text: "Добавить фотографию", kind: "link", icon: "plus", attrs: "data-add-photo" })}</div>
      <div class="photos">
        <div class="photos__row" id="photos-row">
          ${S.form.photos.map((p, i) => `<div class="photo" data-photo="${i}"><img src="${p.startsWith("data:") ? p : `images/planes/${p}.${p === "g550-plan" ? "svg" : "jpg"}`}" alt=""><button type="button" class="photo__x" data-del-photo="${i}" aria-label="Удалить фото">${icon("x", 16)}</button></div>`).join("")}
        </div>
        <div class="photos__fade"><button type="button" class="photos__next" id="photos-next" aria-label="Далее">${icon("chevron-right", 24)}</button></div>
      </div>
    </section>`;
}

function mainInfoHtml() {
  const f = S.form;
  return `
    <section class="pf-card" id="sec-main">
      <div class="pf-title">2. Основная информация о самолете </div>
      ${row(
        Sel({ id: "status", label: "Статус самолета", options: STATUSES, value: f.status, ph: "Выберите статус" }),
        Sel({ id: "model", label: "Модель самолета", options: MODEL_OPTIONS, value: f.model, ph: "Выберите модель" }),
        F({ id: "tail", label: "Бортовой номер", value: f.tail, ph: "Введите бортовой номер" }),
      )}
      ${row(
        Sel({ id: "geo", label: "География полетов", options: GEO, value: f.geo, ph: "Выберите географию" }),
        Sel({ id: "cur", label: "Валюта", options: CURRENCIES, value: f.cur, ph: "Выберите валюту" }),
        airportField(),
      )}
      ${row(
        F({ id: "year", label: "Год выпуска", value: f.year, ph: "Введите год выпуска самолета" }),
        F({ id: "ext", label: "Год обновления экстерьера", value: f.ext, ph: "Введите год обновления" }),
        F({ id: "int", label: "Год обновления интерьера", value: f.int, ph: "Введите год обновления" }),
      )}
      ${row(
        F({ id: "taxi", label: "Время на рулежку, мин", value: f.taxi, ph: MIN_PH }),
        F({ id: "days", label: "Суток вне базы", value: f.days, ph: "Введите количество суток" }),
        `<div class="toggle-cell">${toggle("floating", f.floating, "Floating base", { inf: true })}</div>`,
      )}
      <div class="pf-block">
        ${sub("Переводы", { inf: true })}
        <div class="frow frow--wide">
          ${areaField({ id: "noteRu", label: "Примечание (рус)", value: f.noteRu, ph: "Введите описание для самолета на русском языке" })}
          ${areaField({ id: "noteEn", label: "Примечание (англ)", value: f.noteEn, ph: "Введите описание для самолета на английском языке" })}
        </div>
      </div>
    </section>`;
}

function areaField({ id, label, value, ph }) {
  return `<div class="field ${SOFT}" data-field="${id}">
    <label class="field__label" for="${id}">${esc(label)}${icon("info", 16)}</label>
    <div class="control control--area"><textarea class="control__input" id="${id}" placeholder="${esc(ph)}" rows="3">${esc(value)}</textarea></div>
    <div class="field__error" data-error></div></div>`;
}

function airportField() {
  const v = S.form.base;
  return `<div class="field ${SOFT}" data-field="base">
    <label class="field__label" for="base">Аэропорт базирования${icon("info", 16)}</label>
    <div class="control control--select control--ac" id="base-ctl" data-ac="base">
      <input class="control__input" id="base" type="text" autocomplete="off" value="${esc(v)}" placeholder="Выберите аэропорт">
      <button type="button" class="control__btn" id="base-btn" aria-label="${v ? "Очистить" : "Открыть"}">${icon(v ? "x" : "chevron-down", 20)}</button>
      <div class="dropdown" hidden></div>
    </div>
    <div class="field__error" data-error></div></div>`;
}

function specsHtml() {
  const f = S.form;
  return `
    <section class="pf-card" id="sec-specs">
      <div class="pf-title">3. Характеристики самолета</div>
      ${row(
        F({ id: "range", label: "Фактическая дальность, км", value: f.range, ph: "Введите дальность" }),
        F({ id: "maxpax", label: "Max Pax", value: f.maxpax, ph: "Введите количество" }),
        F({ id: "cabin", label: "Размеры салона (ДхШхВ), см", value: f.cabin, ph: "Введите размеры" }),
      )}
      ${row(
        F({ id: "baggage", label: "Багаж, м3", value: f.baggage, ph: "Введите объем" }),
        F({ id: "bags", label: "Количество багажа", value: f.bags, ph: "Введите количество" }),
        F({ id: "speed", label: "Крейсерская скорость, км/ч ", value: f.speed, ph: "Введите скорость" }),
      )}
    </section>`;
}

const PRESETS = [["all", "Весь мир"], ["europe", "Европа"], ["eu", "ЕС"], ["middle_east", "Ближний Восток"], ["cis", "СНГ"], ["asia", "Азия"], ["north_america", "Северная Америка"], ["south_america", "Южная Америка"]];

function geoHtml() {
  const p = (k, t) => `<button type="button" class="preset" data-preset="${k}"><span>${t}</span></button>`;
  return `
    <section class="pf-card pf-card--geo" id="sec-geo">
      <div class="pf-title pf-title--i"><span>Разрешенные страны</span>${info()}</div>
      <div class="geo">
        <div class="geo__left">
          <div class="geo__presets">
            <div class="geo__lbl">Быстрый выбор:</div>
            <div class="presets">${PRESETS.map(([k, t]) => p(k, t)).join("")}</div>
          </div>
          <div class="field ${SOFT} geo__search" data-field="country">
            <label class="field__label" for="country">Страна</label>
            <div class="control"><input class="control__input" id="country" type="text" placeholder="Введите название страны" autocomplete="off"><div class="dropdown" id="country-dd" hidden></div></div>
          </div>
          <div class="geo__selected"><div class="geo__lbl geo__lbl--b" id="geo-count">Выбрано (0)</div>
            <div class="geo__box" id="geo-box"></div></div>
        </div>
        <div class="geo__map" id="geo-map">
          <div id="world-map" class="geo__world"></div>
          <div class="geo__ui">
            <div class="geo__legend"><span><i style="background:#0970cd"></i>Выбрано</span><span><i style="background:#cee2f5"></i>Не выбрано</span></div>
            <div class="geo__btns">
              <button type="button" class="btn btn--white btn--sm-sq" id="map-in" aria-label="Приблизить">${icon("plus", 18)}</button>
              <button type="button" class="btn btn--white btn--sm-sq" id="map-out" aria-label="Отдалить">${icon("minus", 18)}</button>
              <button type="button" class="btn btn--white btn--sm-sq" id="map-reset" aria-label="Сбросить вид">${icon("repeat", 18)}</button>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function pricingHtml() {
  const f = S.form;
  const create = S.mode === "create" && !S.form.leon;
  const L3 = ["От, мин", "До, мин", "Стоимость"];
  const P3 = [MIN_PH, MIN_PH, "Введите стоимость"];
  const minField = (id, v) => row(F({ id, label: "Минимальное время полета", value: v, ph: MIN_PH }));
  const blk = (inner) => `<div class="pf-block">${inner}</div>`;
  if (create) {
    return `
    <section class="pf-card" id="sec-pricing">
      <div class="pf-title">Цены и тарифы</div>
      ${blk(sub("Сбор за коммерческий рейс", { inf: true }) + minField("commMin", f.commMin) + tiers("comm", f.comm, L3, P3))}
      ${blk(sub("Сбор за коммерческий рейс (за рубеж)", { inf: true }) + `<div class="toggle-cell toggle-cell--row">${toggle("prev", f.prev, "Использовать предыдущие значения")}</div>` + minField("ferryMin", f.ferryMin) + tiers("ferry", f.ferry, L3, P3))}
      ${blk(sub("Стоимость парковки самолета", { inf: true }) + tiers("park", f.park, L3, P3))}
      ${blk(sub("Минимальный отдых экипажа", { inf: true }) + tiers("rest", f.rest, ["От, час", "До, час", "Отдых, часов"], ["Введите часы", "Введите часы", "Введите часы"]))}
      ${blk(sub("Дополнительно") + extraHtml())}
    </section>`;
  }
  return `
    <section class="pf-card" id="sec-pricing">
      <div class="pf-title">Цены и тарифы</div>
      ${blk(sub("Сбор за коммерческий рейс", { inf: true }) + tiers("comm", f.comm, L3, P3))}
      ${blk(sub("Сбор за перегоночный рейс", { inf: true }) + `<div class="toggle-cell toggle-cell--row">${toggle("prev", f.prev, "Использовать предыдущие значения ")}</div>` + tiers("ferry", f.ferry, L3, P3))}
      ${blk(sub("Стоимость парковки самолета", { inf: true }) + tiers("park", f.park, ["От, мин", "До, мин", "Стоимость полета за рубеж"], P3))}
      ${blk(sub("Минимальный отдых экипажа", { inf: true }) + tiers("rest", f.rest, ["От, час", "До, час", "Отдых, часов"], ["Введите часы", "Введите часы", "Введите часы"]))}
      ${blk(sub("Дополнительно") + extraHtml())}
    </section>`;
}
function extraHtml() {
  const f = S.form;
  return row(
    F({ id: "free", label: "Кол-во беспл. пассажиров", value: f.free, ph: "Введите кол-во пассажиров" }),
    F({ id: "paxfee", label: "Сбор за 1 пассажира", value: f.paxfee, ph: "Введите стоимость" }),
    F({ id: "support", label: "Supporting Fee", value: f.support, ph: "Введите сумму " }),
  ) + row(
    F({ id: "app", label: "App Fee, %", value: f.app, ph: "Введите процент" }),
    F({ id: "bank", label: "Комиссия банка", value: f.bank, ph: "Введите сумму " }),
    F({ id: "vat", label: "VAT, % ", value: f.vat, ph: "Введите процент" }),
  );
}

function calendarHtml() {
  const f = S.form;
  if (!f.leon && !f.manual) {
    return `
    <section class="pf-card" id="sec-calendar">
      <div class="pf-title">5. Календарь полетов</div>
      <div class="cal-choice">
        <button type="button" class="cal-tile" id="leon-connect"><img src="images/leon-icon.png" width="40" height="40" alt=""><span>Подключить Leon</span></button>
        <button type="button" class="cal-tile cal-tile--text" id="manual-input"><span>Ручной ввод</span></button>
      </div>
    </section>`;
  }
  const rows = CALENDAR.map((r) => `
    <div class="cal-row">
      <div class="cal-c cal-c--dt"><span>${r.d1}</span><span>${r.t1}</span></div>
      <div class="cal-c cal-c--ap"><span>${r.from}</span></div>
      <div class="cal-c cal-c--dt"><span>${r.d2}</span><span>${r.t2}</span></div>
      <div class="cal-c cal-c--ap"><span>${r.to}</span></div>
      <div class="cal-c cal-c--pax"><span>${r.pax}</span></div>
      <div class="cal-c cal-c--type"><span>${r.type}</span></div>
      ${r.leg ? `<div class="cal-c cal-c--act">${btn({ text: "Добавить Empty Leg", kind: "link", icon: "plus", attrs: `data-add-leg="${r.from}-${r.to}"` })}${info("Создать Empty Leg на основе этого рейса")}</div>` : ""}
    </div>`).join("");
  return `
    <section class="pf-card pf-card--cal" id="sec-calendar">
      <div class="cal-head"><div class="pf-title">Календарь полетов</div>
        <div class="cal-src"><span class="cal-src__l"><span class="c-grey t-span">Источник:</span> <b>${esc(f.source || "Ручной ввод")}</b></span>
          ${btn({ text: f.leon ? "Перейти на ручной ввод" : "Подключить Leon", kind: "link", id: "cal-switch" })}</div></div>
      <div class="cal-table">
        <div class="cal-row cal-row--head">
          <div class="cal-c cal-c--dt">Вылет (UTC+0)</div><div class="cal-c cal-c--ap">Откуда</div><div class="cal-c cal-c--dt">Прилет (UTC+0)</div>
          <div class="cal-c cal-c--ap">Куда</div><div class="cal-c cal-c--pax">PAX</div><div class="cal-c cal-c--type">Тип</div>
        </div>
        ${rows}
      </div>
    </section>`;
}

function integrationsHtml() {
  const f = S.form;
  if (!f.leon) {
    return `
    <section class="pf-card pf-card--int-empty" id="sec-int">
      <div class="pf-title">7. Интеграции</div>
      <div class="int-empty">Пока у вас нет интеграций</div>
    </section>`;
  }
  return `
    <section class="pf-card pf-card--int" id="sec-int">
      <div class="pf-title">7. Интеграции</div>
      <div class="int">
        <div class="int__r1">
          <div class="int__grp">
            <img class="int__logo" src="images/leon-logo.png" alt="Leon Software" width="212" height="48">
            <div class="int__c"><span class="c-grey t-span">Статус:</span><span class="pill-ok">Подключено </span></div>
            <div class="int__c int__c--w"><span class="c-grey t-span">Последняя синхронизация (UTC+0):</span><b class="t-body" id="int-sync">${esc(S.sync)}</b></div>
          </div>
          ${btn({ text: "Синхронизировать сейчас", kind: "secondary", id: "int-sync-btn", cls: "btn--w216" })}
        </div>
        <div class="int__r2">
          <div class="int__grp">
            <div class="int__c int__c--212"><span class="c-grey t-span">Аккаунт:</span><span class="t-body">ACME Airlines</span></div>
            <div class="int__c int__c--212"><span class="c-grey t-span">ID:</span><span class="t-body">548239</span></div>
            <div class="int__c"><span class="c-grey t-span">Борт:</span><span class="int__plane"><span class="t-body">Airbus A320-214 (VP-BDC) </span><button type="button" class="btn btn--link btn--inline" id="int-change">Сменить</button></span></div>
          </div>
          ${btn({ text: "Удалить интеграцию", kind: "red-soft", id: "int-del", cls: "btn--w216" })}
        </div>
      </div>
    </section>`;
}

const REQUIRED = ["status", "model", "tail", "geo", "cur", "base", "year", "range", "maxpax"];
const canSubmit = () => S.mode === "edit" || REQUIRED.every((k) => String(S.form[k] || "").trim());
const canDraft = () => S.mode === "edit" || !!(String(S.form.tail || "").trim() || String(S.form.base || "").trim());
function barHtml() {
  return `
  <div class="pf-bar" id="pf-bar">
    ${btn({ text: "Отменить", kind: "white", w200: true, id: "pf-cancel" })}
    <div class="pf-bar__r">
      ${btn({ text: "Сохранить черновик", kind: "white", w200: true, id: "pf-draft", disabled: !canDraft() })}
      ${btn({ text: "Отправить на модерацию", kind: "primary", id: "pf-submit", cls: "btn--w240", disabled: !canSubmit() })}
    </div>
  </div>`;
}

/* ---------------- page ---------------- */
function bodyHtml() {
  return [versionsHtml(), photosHtml(), mainInfoHtml(), specsHtml(), geoHtml(), pricingHtml(), calendarHtml(), integrationsHtml()].join("");
}

function initState({ params, query }) {
  const fixture = query.fixture === "figma";
  const mode = params.id ? "edit" : "create";
  let form;
  if (mode === "edit") {
    form = filledForm();
    const added = (store.get("newPlanes", []) || []).find((p) => p.id === params.id);
    const p = fixture ? null : (added || FLEET.find((x) => x.id === params.id));
    if (p) {
      form.model = p.model; form.tail = p.tail; form.status = p.status === "active" ? "Активный" : "Неактивный";
      form.year = String(p.year);
      form.base = AIRPORT_FULL.find((a) => a.startsWith(p.base) || (p.base === "LJU" && a.startsWith("LJLJ"))) || p.baseFull || form.base;
      const sp = MODEL_SPECS[p.model];
      if (sp) Object.assign(form, { range: sp.range, maxpax: String(Math.max(p.pax, Number(sp.maxpax) || 0)), cabin: sp.cabin, bags: sp.bags, speed: sp.speed });
    }
    if (added && added.form) form = { ...form, ...added.form };
  } else {
    form = emptyForm();
    if (query.model) { form.model = query.model; Object.assign(form, MODEL_SPECS[query.model] || {}); }
  }
  S = { mode, id: params.id, form, version: query.version === "draft" ? "draft" : "published", fixture, sync: "18.02.2026 12:00", countries: new Set() };
  if (fixture) S.fixtureNote = true;
}

export default {
  mainClass: "has-bar",
  title: ({ params }) => (params.id ? "Редактирование борта" : "Создание борта"),
  render(ctx) {
    initState(ctx);
    const edit = S.mode === "edit";
    return `
    <div class="pf">
      <a class="pf-back" href="#/fleet">${icon("chevron-left", 24)}<span>Назад</span></a>
      <div class="pf-main">
        <div class="pf-head">
          <h1 class="page-head__title">${edit ? "Редактирование борта" : "Создание борта"}</h1>
          ${edit ? btn({ text: "Удалить", kind: "link-red", icon: "trash-2", id: "pf-delete" }) : ""}
        </div>
        <div class="pf-body" id="pf-body">${bodyHtml()}</div>
      </div>
    </div>
    ${barHtml()}`;
  },
  mount(ctx) { mount(ctx); },
};

/* ---------------- behaviour ---------------- */
const loadScript = (src) => new Promise((res, rej) => {
  if (document.querySelector(`script[src="${src}"]`)) return res();
  const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
});
function loadCss(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; document.head.appendChild(l);
}

function mount({ go }) {
  const root = $("#main");
  const ac = new AbortController();
  const onDoc = (fn) => document.addEventListener("click", fn, { signal: ac.signal });
  const body = () => $("#pf-body");
  const val = (id) => { const el = document.getElementById(id); return el ? el.value : ""; };
  const f = S.form;

  /* --- generic inputs -> state --- */
  const textKeys = ["tail", "year", "ext", "int", "taxi", "days", "noteRu", "noteEn", "range", "maxpax", "cabin", "baggage", "bags", "speed", "free", "paxfee", "support", "app", "bank", "vat", "commMin", "ferryMin"];
  root.addEventListener("input", (e) => {
    const t = e.target;
    if (!t.id) return;
    if (textKeys.includes(t.id)) { f[t.id] = t.value; clearErr(t.id); return; }
    const m = t.id.match(/^(comm|ferry|park|rest)-(\d+)-(\d+)$/);
    if (m) f[m[1]][+m[2]][+m[3]] = t.value;
  });
  const updateBar = () => { const d = $("#pf-draft"), m = $("#pf-submit"); if (d) d.disabled = !canDraft(); if (m) m.disabled = !canSubmit(); };
  root.addEventListener("input", updateBar);
  root.addEventListener("select-change", updateBar);
  const clearErr = (id) => { const w = document.querySelector(`[data-field="${id}"]`); if (w) { w.classList.remove("is-error"); const er = w.querySelector("[data-error]"); if (er) er.textContent = ""; } };

  root.addEventListener("select-change", (e) => {
    const { id, value } = e.detail;
    if (["status", "geo", "cur", "model"].includes(id)) f[id] = value;
    clearErr(id);
    if (id === "model") {
      const sp = MODEL_SPECS[value];
      if (sp) {
        Object.assign(f, sp);
        ["range", "maxpax", "cabin", "baggage", "bags", "speed"].forEach((k) => { const el = document.getElementById(k); if (el) el.value = f[k]; });
        toast("Характеристики подставлены по модели борта");
      }
    }
  });

  /* --- clicks --- */
  root.addEventListener("click", (e) => {
    const t = e.target;
    const vc = t.closest("[data-version]");
    if (vc) { S.version = vc.dataset.version; $("#sec-versions").outerHTML = versionsHtml(); return; }
    if (t.closest("[data-add-photo]")) { return addPhoto(); }
    const dp = t.closest("[data-del-photo]");
    if (dp) { f.photos.splice(+dp.dataset.delPhoto, 1); $("#sec-photos").outerHTML = photosHtml(); return; }
    if (t.closest("#photos-next")) { const r = $("#photos-row"); r.scrollBy({ left: 232, behavior: "smooth" }); return; }
    const tg = t.closest(".toggle");
    if (tg) { tg.classList.toggle("is-on"); const on = tg.classList.contains("is-on"); tg.setAttribute("aria-checked", on); f[tg.id] = on; if (tg.id === "prev" && on) toast("Значения скопированы из предыдущей версии"); return; }
    if (t.closest("#pf-cancel")) return confirmLeave(go);
    if (t.closest(".pf-back")) { e.preventDefault(); return confirmLeave(go); }
    if (t.closest("#pf-draft")) return saveDraft();
    if (t.closest("#pf-submit")) return submit(go);
    if (t.closest("#pf-delete")) return confirmModal({
      title: "Удалить борт?", text: "Борт будет удален из списка. Это действие нельзя отменить.", confirmText: "Удалить", danger: true,
      onConfirm: () => { const del = store.get("deletedPlanes", []); del.push(S.id); store.set("deletedPlanes", del); toast("Борт удален"); go("/fleet"); },
    });
    if (t.closest("#leon-connect")) return connectLeon();
    if (t.closest("#manual-input")) { f.manual = true; f.source = "Ручной ввод"; rerender("sec-calendar", calendarHtml); toast("Включен ручной ввод календаря"); return; }
    if (t.closest("#cal-switch")) {
      if (f.leon) return confirmModal({ title: "Перейти на ручной ввод?", text: "Данные из Leon Software перестанут обновляться автоматически.", confirmText: "Перейти", onConfirm: () => { f.source = "Ручной ввод"; $("#sec-calendar").outerHTML = calendarHtml(); toast("Календарь переключен на ручной ввод"); } });
      return connectLeon();
    }
    const leg = t.closest("[data-add-leg]");
    if (leg) { const [a, b] = leg.dataset.addLeg.split("-"); return go(`/empty-legs/new?from=${a}&to=${b}&plane=${S.id || ""}`); }
    if (t.closest("#int-sync-btn")) { const el = $("#int-sync"); const d = new Date(); const p = (n) => String(n).padStart(2, "0"); S.sync = `${p(d.getUTCDate())}.${p(d.getUTCMonth() + 1)}.${d.getUTCFullYear()} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`; el.textContent = S.sync; toast("Синхронизация выполнена"); return; }
    if (t.closest("#int-change")) { toast("Выбор другого борта в Leon Software будет доступен в рабочей версии", "negative"); return; }
    if (t.closest("#int-del")) return confirmModal({
      title: "Удалить интеграцию?", text: "Календарь полетов перестанет синхронизироваться с Leon Software.", confirmText: "Удалить", danger: true,
      onConfirm: () => { f.leon = false; f.manual = false; $("#sec-calendar").outerHTML = calendarHtml(); $("#sec-int").outerHTML = integrationsHtml(); toast("Интеграция удалена"); },
    });
  });

  function rerender(id, fn) { const el = document.getElementById(id); if (el) el.outerHTML = fn(); }

  function connectLeon() {
    const ov = openModal(`
      <div class="modal__head"><div class="modal__title">Подключение Leon Software</div><div class="modal__text">Выполняем вход в аккаунт ACME Airlines и загружаем календарь полетов…</div></div>
      <div class="leon-load"><i></i></div>`);
    setTimeout(() => {
      closeModal();
      f.leon = true; f.manual = false; f.source = "Leon Software";
      // Leon import fills tariffs the operator already keeps there
      const src = filledForm();
      ["comm", "ferry", "park", "rest", "free", "paxfee", "support", "app", "bank", "vat"].forEach((k) => (f[k] = src[k]));
      $("#sec-pricing").outerHTML = pricingHtml();
      $("#sec-calendar").outerHTML = calendarHtml();
      $("#sec-int").outerHTML = integrationsHtml();
      toast("Leon Software подключен, календарь загружен");
    }, 1300);
  }

  function addPhoto() {
    const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*"; inp.multiple = true;
    inp.onchange = () => {
      [...inp.files].forEach((file) => {
        const r = new FileReader();
        r.onload = () => { f.photos.push(String(r.result)); $("#sec-photos").outerHTML = photosHtml(); };
        r.readAsDataURL(file);
      });
    };
    inp.click();
  }

  /* --- airport autocomplete --- */
  const ctl = $("#base-ctl"), inp = $("#base");
  const dd = ctl.querySelector(".dropdown");
  const drawDd = (q) => {
    const items = AIRPORT_FULL.filter((a) => !q || a.toLowerCase().includes(q.toLowerCase())).slice(0, 8);
    dd.innerHTML = items.length ? items.map((a) => `<button type="button" class="dropdown__item" data-ap="${esc(a)}">${esc(a)}</button>`).join("") : `<div class="dropdown__empty">Ничего не найдено</div>`;
    dd.hidden = false; ctl.classList.add("is-open");
  };
  const closeDd = () => { dd.hidden = true; ctl.classList.remove("is-open"); };
  const setBase = (v) => { f.base = v; setTimeout(updateBar); inp.value = v; $("#base-btn").innerHTML = icon(v ? "x" : "chevron-down", 20); clearErr("base"); };
  inp.addEventListener("focus", () => drawDd(""));
  inp.addEventListener("input", () => { drawDd(inp.value); if (f.base && inp.value !== f.base) { f.base = ""; $("#base-btn").innerHTML = icon("chevron-down", 20); updateBar(); } });
  ctl.addEventListener("click", (e) => {
    e.stopPropagation();
    const o = e.target.closest("[data-ap]"); if (o) { setBase(o.dataset.ap); closeDd(); return; }
    if (e.target.closest("#base-btn")) { if (f.base) { setBase(""); inp.focus(); } else dd.hidden ? (inp.focus(), drawDd("")) : closeDd(); }
  });
  onDoc((e) => { if (!e.target.closest("#base-ctl")) { if (document.getElementById("base-ctl")) closeDd(); } });

  /* --- countries + map --- */
  initGeo();
  return () => ac.abort();

  function validate() {
    const req = [["status", "Выберите статус"], ["model", "Выберите модель"], ["tail", "Введите бортовой номер"], ["geo", "Выберите географию"], ["cur", "Выберите валюту"], ["base", "Выберите аэропорт"], ["year", "Введите год выпуска"], ["range", "Введите дальность"], ["maxpax", "Введите количество"]];
    let first = null;
    req.forEach(([k, msg]) => {
      const w = document.querySelector(`[data-field="${k}"]`);
      if (!w) return;
      const empty = !String(f[k] || "").trim();
      w.classList.toggle("is-error", empty);
      const er = w.querySelector("[data-error]"); if (er) er.textContent = empty ? msg : "";
      if (empty && !first) first = w;
    });
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
    return !first;
  }
  function persist(status) {
    const list = store.get("newPlanes", []);
    const rec = { id: S.id || String(20000 + list.length * 3 + 11), model: f.model, cls: "Heavy", photo: "g550-ext", year: Number(f.year) || 2020, status: f.status === "Активный" ? "active" : "inactive", tail: f.tail, base: f.base.split(",")[0].replace(/^LJLJ$/, "LJU"), baseFull: f.base, pax: Number(f.maxpax) || 8, range: Number(f.range) || 4000, toilet: true, attendant: true, cabin: f.cabin, baggage: 3, hour: 5000, moderation: status === "moderation", draft: status === "draft", form: JSON.parse(JSON.stringify({ ...f, photos: f.photos.filter((p) => !p.startsWith("data:")) })) };
    const i = list.findIndex((p) => p.id === rec.id);
    if (i >= 0) list[i] = rec; else list.unshift(rec);
    store.set("newPlanes", list);
    S.id = rec.id;
  }
  function saveDraft() { persist("draft"); toast("Черновик сохранен"); }
  function submit(go) {
    if (!validate()) { toast("Заполните обязательные поля", "negative"); return; }
    persist("moderation");
    toast("Борт отправлен на модерацию");
    go("/fleet");
  }
  function confirmLeave(go) {
    go("/fleet");
  }

  async function initGeo() {
    const renderBox = () => {
      const codes = [...S.countries];
      $("#geo-count").textContent = `Выбрано (${codes.length})`;
      const box = $("#geo-box");
      if (!codes.length) {
        box.innerHTML = `<div class="geo__empty"><span>Страны не выбраны.</span><span>Выберите регион или кликните по карте.</span></div>`;
        box.classList.remove("has-items"); return;
      }
      const D = window.COUNTRIES_DATA || {};
      codes.sort((a, b) => (D[a]?.nameRu || a).localeCompare(D[b]?.nameRu || b, "ru"));
      box.classList.add("has-items");
      box.innerHTML = codes.map((c) => `<span class="cchip">${esc(D[c]?.nameRu || c)}<button type="button" data-rm="${c}" aria-label="Убрать">${icon("x", 16)}</button></span>`).join("");
    };
    renderBox();
    let map = null, syncing = false;
    const sync = () => { if (map) { syncing = true; map.setSelectedRegions([...S.countries]); syncing = false; } };
    try {
      loadCss("vendor/jsvectormap.min.css");
      await loadScript("vendor/jsvectormap.min.js");
      await loadScript("vendor/world.js");
      await loadScript("vendor/countries-data.js");
    } catch { return; }
    if (!document.getElementById("world-map")) return;
    renderBox();
    map = new window.jsVectorMap({
      selector: "#world-map", map: "world", backgroundColor: "transparent", draggable: true, zoomButtons: false, zoomOnScroll: false,
      zoomMax: 8, zoomMin: 1, zoomStep: 1.35, zoomAnimate: true, regionsSelectable: true, selectedRegions: [...S.countries],
      regionStyle: { initial: { fill: "#e7e8e9", stroke: "#f7f9fa", strokeWidth: 0.5 }, hover: { fill: "#cee2f5", cursor: "pointer" }, selected: { fill: "#0970cd" }, selectedHover: { fill: "#11498c" } },
      onRegionTooltipShow(ev, tip, code) { const c = window.COUNTRIES_DATA[code]; tip.text(`<b>${c ? c.nameRu : code}</b>`, true); },
      onRegionSelected(code, sel) { if (syncing) return; sel ? S.countries.add(code) : S.countries.delete(code); renderBox(); },
    });
    const reset = () => { map.scale = map._baseScale; map.transX = map._baseTransX; map.transY = map._baseTransY; map._applyTransform(); };
    $("#map-in").onclick = () => map._setScale(Math.min(map.scale * 1.35, map.params.zoomMax * map._baseScale), map._width / 2, map._height / 2, false, true);
    $("#map-out").onclick = () => { const t = map.scale / 1.35; t <= map._baseScale * 1.08 ? reset() : map._setScale(t, map._width / 2, map._height / 2, false, true); };
    $("#map-reset").onclick = reset;

    const presets = window.GEOGRAPHY_PRESETS || {};
    const allCodes = () => Object.keys(window.COUNTRIES_DATA || {});
    root.querySelectorAll("[data-preset]").forEach((b) => {
      b.onclick = () => {
        const k = b.dataset.preset;
        const list = k === "all" ? allCodes() : (presets[k] ? presets[k].countries : []);
        if (!list.length) { toast("Для региона нет данных в демо", "negative"); return; }
        const all = list.every((c) => S.countries.has(c));
        list.forEach((c) => (all ? S.countries.delete(c) : S.countries.add(c)));
        b.classList.toggle("is-on", !all);
        sync(); renderBox(); reset();
      };
    });
    $("#geo-box").addEventListener("click", (e) => { const r = e.target.closest("[data-rm]"); if (r) { S.countries.delete(r.dataset.rm); sync(); renderBox(); } });
    const ci = $("#country"), cdd = $("#country-dd");
    ci.addEventListener("input", () => {
      const q = ci.value.trim().toLowerCase();
      if (!q) { cdd.hidden = true; return; }
      const m = Object.values(window.COUNTRIES_DATA).filter((c) => c.nameRu.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q) || c.code.toLowerCase() === q).slice(0, 8);
      cdd.innerHTML = m.length ? m.map((c) => `<button type="button" class="dropdown__item" data-cc="${c.code}">${esc(c.nameRu)}<span class="c-grey">${c.code}</span></button>`).join("") : `<div class="dropdown__empty">Не найдено</div>`;
      cdd.hidden = false;
    });
    cdd.addEventListener("click", (e) => { const o = e.target.closest("[data-cc]"); if (!o) return; S.countries.add(o.dataset.cc); sync(); renderBox(); ci.value = ""; cdd.hidden = true; });
    onDoc((e) => { if (!e.target.closest("#country-dd") && e.target.id !== "country") { const d = document.getElementById("country-dd"); if (d) d.hidden = true; } });
  }
}
