// Screens 3.0 – 3.14: Company profile and security settings
import { $, btn, field, setError, toast } from "../ui.js";
import { store } from "../store.js";

const DEFAULTS = { name: "Avia Charter Partner Ltd.", aoc: "AOC #EU-884920", person: "Артем Чипулис", phone: "+49 30 9283 4401" };
const REQ = "Обязательное поле";
const FX_NAME = "Avia Charter Partner Ltd.вв|";
const stars = (n) => "*".repeat(n);

const FIELDS = [
  { id: "name", key: "name", label: "Юридическое наименование", ph: "Введите наименование" },
  { id: "aoc", key: "aoc", label: "Номер сертификата эксплуатанта (AOC)", ph: "Введите номер сертификата" },
  { id: "person", key: "person", label: "Ответственное лицо от компании", ph: "Введите имя и фамилию" },
  { id: "phone", key: "phone", label: "Телефон ответственного лица", ph: "Введите номер телефона", type: "tel" },
];

/* Figma states 3.0 – 3.14 */
function fixtureState(n) {
  const s = { vals: { ...DEFAULTS }, pw: { cur: "", pn: "", pr: "" }, errors: {}, dirty: n >= 2, focus: "", toast: false, logout: false };
  if (n === 0) s.vals = { name: "", aoc: "", person: "", phone: "" };
  if (n >= 2) s.vals.name = FX_NAME;
  if (n === 2) s.focus = "name";
  if (n === 4) { s.dirty = false; s.vals.aoc = "Введите номер серитификата"; s.errors.aoc = REQ; }
  if (n === 5) { s.toast = true; s.dirty = false; }
  if (n === 13) s.toast = true;
  if (n === 6) { s.pw.cur = "*"; s.focus = "cur"; }
  if (n >= 7 && n !== 10) s.pw.cur = stars(17);
  if (n === 8) { s.errors.pn = REQ; s.errors.pr = REQ; }
  if (n === 9) { s.pw.pn = stars(12); s.pw.pr = stars(13); s.errors.pr = "Пароли не совпадают"; }
  if (n === 10) { s.pw.cur = stars(13); s.errors.cur = "Неверный пароль"; }
  if (n === 11) { s.pw.pn = stars(5); s.errors.pn = "Пароль должен быть минимум из 8ми символов"; }
  if (n === 12) { s.pw.pn = stars(12); s.pw.pr = stars(12); }
  if (n === 14) s.logout = true;
  return s;
}

let S = null;

const textField = (f) => field({ label: f.label, id: f.id, placeholder: f.ph, type: f.type || "text", value: S.vals[f.key], error: S.errors[f.id] || "" });
const passField = (id, label, ph) => field({ label, id, placeholder: ph, type: "password", rightIcon: "eye", value: S.pw[id], error: S.errors[id] || "" });

export default {
  title: () => "Профиль компании и настройки",
  render({ query }) {
    const fx = query.fixture === "figma";
    if (fx) S = fixtureState(Number(query.s || 1));
    else S = { vals: { ...DEFAULTS, ...store.get("profile", {}) }, pw: { cur: "", pn: "", pr: "" }, errors: {}, dirty: false, focus: "", toast: false, logout: false };
    S.fx = fx;
    return `<div class="page page--profile">
      <div class="page-head page-head--top pr-head"><div class="page-head__titles"><h1 class="page-head__title">Профиль компании и настройки</h1><div class="page-head__sub">Данные эксплуатанта и безопасность учетной записи</div></div></div>
      <form class="pr-wrap" id="pr-form" novalidate>
        <section class="pr-card">
          <div class="pr-card__title">Реквизиты оператора</div>
          <div class="pr-grid pr-grid--2">${FIELDS.map(textField).join("")}</div>
        </section>
        <section class="pr-card">
          <div class="pr-card__head"><div class="pr-card__title">Безопасность и смена пароля</div><div class="pr-card__sub">Для защиты учетной записи используйте надежный пароль не менее 8 символов.</div></div>
          <div class="pr-grid pr-grid--3">
            ${passField("cur", "Текущий пароль", "Введите текущий пароль ")}
            ${passField("pn", "Новый пароль", "Минимум 8 символов")}
            ${passField("pr", "Повторите новый пароль", "Повторите новый пароль")}
          </div>
        </section>
        ${btn({ text: "Сохранить изменения", kind: "primary", w200: true, type: "submit", id: "pr-save", disabled: !S.dirty })}
      </form>
    </div>`;
  },

  mount() {
    const form = $("#pr-form"), save = $("#pr-save");
    const valueOf = (id) => $(`#${id}`).value;
    const isDirty = () => FIELDS.some((f) => valueOf(f.id) !== S.vals0[f.key]) || ["cur", "pn", "pr"].some((id) => valueOf(id) !== "");
    S.vals0 = { ...S.vals };
    const refresh = () => { save.disabled = S.fx && S.dirty ? false : !isDirty(); };

    form.addEventListener("input", (e) => {
      setError(e.target.id, "");
      S.fx = false; // after the first real edit the form behaves normally
      refresh();
    });

    const showToast = () => toast("Ваши изменения сохранены");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      const err = (id, msg) => { setError(id, msg); if (msg) ok = false; };
      FIELDS.forEach((f) => err(f.id, valueOf(f.id).trim() ? "" : REQ));
      const cur = valueOf("cur"), pn = valueOf("pn"), pr = valueOf("pr");
      ["cur", "pn", "pr"].forEach((id) => setError(id, ""));
      if (cur || pn || pr) {
        if (!cur) err("cur", REQ);
        else if (cur === "wrong") err("cur", "Неверный пароль");
        if (!pn) err("pn", REQ);
        else if (pn.length < 8) err("pn", "Пароль должен быть минимум из 8ми символов");
        if (!pr) err("pr", REQ);
        else if (pn && pr !== pn) err("pr", "Пароли не совпадают");
      }
      if (!ok) {
        const first = form.querySelector(".field.is-error .control__input");
        first?.focus();
        return;
      }
      const vals = Object.fromEntries(FIELDS.map((f) => [f.key, valueOf(f.id).trim()]));
      store.set("profile", vals);
      S.vals0 = vals;
      ["cur", "pn", "pr"].forEach((id) => { $(`#${id}`).value = ""; });
      S.fx = false;
      refresh();
      showToast();
    });

    if (S.focus) {
      const el = $(`#${S.focus}`); el?.focus();
      if (el && S.focus === "name") el.setSelectionRange(el.value.length, el.value.length);
    }
    if (S.toast) showToast();
    if (S.logout) document.getElementById("logout")?.click();
  },
};
