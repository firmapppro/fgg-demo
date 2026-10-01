// Shared UI helpers: escaping, form builders, select dropdown, toast, modal
import { icon } from "./icons.js";

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- Buttons ---------- */
export function btn({ text = "", kind = "primary", icon: ic, id = "", attrs = "", cls = "", w200 = false, block = false, disabled = false, iconAfter = false, type = "button" }) {
  const i = ic ? icon(ic, 20) : "";
  const c = `btn btn--${kind} ${w200 ? "btn--w200" : ""} ${block ? "btn--block" : ""} ${cls}`;
  return `<button type="${type}" class="${c}" ${id ? `id="${id}"` : ""} ${disabled ? "disabled" : ""} ${attrs}>${iconAfter ? "" : i}${text ? `<span>${esc(text)}</span>` : ""}${iconAfter ? i : ""}</button>`;
}

/* ---------- Inputs ---------- */
export function field({ label = "", id = "", placeholder = "", value = "", type = "text", error = "", hint = "", infoIcon = false, rightIcon = "", disabled = false, cls = "", attrs = "", name = "" }) {
  const lbl = label ? `<label class="field__label" for="${id}">${esc(label)}${infoIcon ? icon("info", 16) : ""}</label>` : "";
  const right = rightIcon === "eye"
    ? `<button type="button" class="control__btn" data-toggle-pass="${id}" aria-label="Показать пароль">${icon("eye-off", 20)}</button>`
    : rightIcon ? `<span class="control__icon control__icon--grey">${icon(rightIcon, 20)}</span>` : "";
  return `<div class="field ${error ? "is-error" : ""} ${cls}" data-field="${id}">
    ${lbl}
    <div class="control ${disabled ? "control--disabled" : ""}">
      <input class="control__input" id="${id}" name="${name || id}" type="${type}" value="${esc(value)}" placeholder="${esc(placeholder)}" ${disabled ? "disabled" : ""} autocomplete="off" ${attrs}>
      ${right}
    </div>
    <div class="field__error" data-error>${esc(error)}</div>
    ${hint ? `<div class="field__hint">${esc(hint)}</div>` : ""}
  </div>`;
}

export function selectField({ label = "", id = "", options = [], value = "", placeholder = "Выберите", error = "", infoIcon = false, cls = "", small = false, disabled = false }) {
  const cur = options.find((o) => (o.value ?? o) === value);
  const text = cur ? (cur.label ?? cur) : "";
  const lbl = label ? `<div class="field__label">${esc(label)}${infoIcon ? icon("info", 16) : ""}</div>` : "";
  return `<div class="field ${error ? "is-error" : ""} ${cls}" data-field="${id}">
    ${lbl}
    <div class="control control--select ${small ? "control--sm" : ""} ${disabled ? "control--disabled" : ""}" data-select="${id}" data-value="${esc(value)}" tabindex="0">
      <span class="control__value ${text ? "" : "is-placeholder"}">${esc(text || placeholder)}</span>
      ${icon("chevron-down", 20, "chev")}
      <div class="dropdown" hidden>
        ${options.map((o) => { const v = o.value ?? o; const l = o.label ?? o; return `<button type="button" class="dropdown__item ${v === value ? "is-selected" : ""}" data-option="${esc(v)}">${esc(l)}</button>`; }).join("")}
      </div>
    </div>
    <div class="field__error" data-error>${esc(error)}</div>
  </div>`;
}

export function setError(id, msg) {
  const f = document.querySelector(`[data-field="${id}"]`);
  if (!f) return;
  const e = f.querySelector("[data-error]");
  if (msg) { f.classList.add("is-error"); if (e) e.textContent = msg; } else { f.classList.remove("is-error"); }
}

export function getSelectValue(id) {
  const c = document.querySelector(`[data-select="${id}"]`);
  return c ? c.dataset.value : "";
}
export function setSelectValue(id, value, label) {
  const c = document.querySelector(`[data-select="${id}"]`);
  if (!c) return;
  c.dataset.value = value;
  const v = c.querySelector(".control__value");
  const opt = [...c.querySelectorAll("[data-option]")].find((o) => o.dataset.option === value);
  const text = label ?? (opt ? opt.textContent : "");
  v.textContent = text || v.dataset.ph || "Выберите";
  v.classList.toggle("is-placeholder", !text);
  c.querySelectorAll("[data-option]").forEach((o) => o.classList.toggle("is-selected", o.dataset.option === value));
}

/* ---------- Global delegation: select dropdowns, password toggle ---------- */
export function initGlobalUi() {
  document.addEventListener("click", (e) => {
    const opt = e.target.closest("[data-option]");
    if (opt) {
      const c = opt.closest("[data-select]");
      setSelectValue(c.dataset.select, opt.dataset.option);
      closeSelects();
      c.dispatchEvent(new CustomEvent("select-change", { bubbles: true, detail: { id: c.dataset.select, value: opt.dataset.option } }));
      setError(c.dataset.select, "");
      return;
    }
    const sel = e.target.closest("[data-select]");
    if (sel && !sel.classList.contains("control--disabled")) {
      const open = sel.classList.contains("is-open");
      closeSelects();
      if (!open) { sel.classList.add("is-open"); sel.querySelector(".dropdown").hidden = false; }
      return;
    }
    const tp = e.target.closest("[data-toggle-pass]");
    if (tp) {
      const inp = document.getElementById(tp.dataset.togglePass);
      const show = inp.type === "password";
      inp.type = show ? "text" : "password";
      tp.innerHTML = icon(show ? "eye" : "eye-off", 20);
      return;
    }
    closeSelects();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeSelects(); closeModal(); }
  });
}
export function closeSelects() {
  document.querySelectorAll("[data-select].is-open").forEach((c) => { c.classList.remove("is-open"); c.querySelector(".dropdown").hidden = true; });
}

/* ---------- Snackbar ---------- */
export function toast(text, type = "positive") {
  let box = document.getElementById("snackbars");
  if (!box) { box = document.createElement("div"); box.id = "snackbars"; box.className = "snackbars"; document.body.appendChild(box); }
  const el = document.createElement("div");
  el.className = `snackbar ${type === "negative" ? "snackbar--negative" : ""}`;
  el.innerHTML = `${icon(type === "negative" ? "alert-circle" : "check-circle", 20)}<span style="flex:1">${esc(text)}</span>`;
  box.appendChild(el);
  setTimeout(() => { el.style.transition = "opacity .25s"; el.style.opacity = "0"; setTimeout(() => el.remove(), 260); }, 3500);
}

/* ---------- Modal ---------- */
export function openModal(inner, { cls = "", onClose } = {}) {
  closeModal();
  const ov = document.createElement("div");
  ov.className = "modal-overlay";
  ov.id = "modal-root";
  ov.innerHTML = `<div class="modal ${cls}" role="dialog" aria-modal="true">${inner}</div>`;
  ov.addEventListener("mousedown", (e) => { if (e.target === ov) closeModal(); });
  ov._onClose = onClose;
  document.body.appendChild(ov);
  document.body.style.overflow = "hidden";
  return ov;
}
export function closeModal() {
  const ov = document.getElementById("modal-root");
  if (!ov) return;
  ov.remove();
  document.body.style.overflow = "";
  if (ov._onClose) ov._onClose();
}

export function confirmModal({ title, text, confirmText, cancelText = "Отмена", danger = false, onConfirm }) {
  const ov = openModal(`
    <div class="modal__head"><div class="modal__title">${esc(title)}</div><div class="modal__text">${esc(text)}</div></div>
    <div class="modal__actions">
      ${btn({ text: cancelText, kind: "secondary", attrs: 'data-modal-cancel' })}
      ${btn({ text: confirmText, kind: danger ? "red" : "primary", attrs: 'data-modal-ok' })}
    </div>`);
  ov.querySelector("[data-modal-cancel]").onclick = () => closeModal();
  ov.querySelector("[data-modal-ok]").onclick = () => { closeModal(); onConfirm && onConfirm(); };
}

/* ---------- Pagination ---------- */
export function pagerHtml({ page, pages, size }) {
  const nums = [];
  const push = (n) => nums.push(`<button type="button" class="pager__page ${n === page ? "is-active" : ""}" data-page="${n}">${n}</button>`);
  const dots = () => nums.push(`<span class="pager__dots">...</span>`);
  if (pages <= 5) for (let i = 1; i <= pages; i++) push(i);
  else if (page <= 2) { push(1); push(2); push(3); dots(); push(pages); }
  else if (page >= pages - 1) { push(1); dots(); push(pages - 2); push(pages - 1); push(pages); }
  else {
    push(1);
    if (page > 3) dots();
    for (let i = page - 1; i <= page + 1; i++) if (i > 1 && i < pages) push(i);
    if (page < pages - 2) dots();
    push(pages);
  }
  return `<div class="pager">
    <div class="pager__pages">
      <button type="button" class="pager__arrow" data-page="${page - 1}" ${page <= 1 ? "disabled" : ""} style="opacity:${page <= 1 ? .3 : 1}">${icon("chevron-left", 24)}</button>
      ${nums.join("")}
      <button type="button" class="pager__arrow" data-page="${page + 1}" ${page >= pages ? "disabled" : ""} style="opacity:${page >= pages ? .3 : 1}">${icon("chevron-right", 24)}</button>
    </div>
    <div class="pager__size"><span>Количество строк на странице:</span>
      ${selectField({ id: "pager-size", options: ["10", "25", "50"], value: String(size), small: true })}
    </div>
  </div>`;
}
