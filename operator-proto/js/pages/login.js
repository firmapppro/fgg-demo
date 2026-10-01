// Screens 1.01 – 1.08: login, password recovery
import { icon } from "../icons.js";
import { esc, btn, field, setError } from "../ui.js";
import { store } from "../store.js";

const SEAL = `<svg width="144" height="144" viewBox="0 0 144 144" fill="none" aria-hidden="true">
  <path d="M137.5 78.7C134 111 106.5 136 72 136 36.4 136 8 107.6 8 72S36.4 8 72 8c18.9 0 35.9 8.2 47.7 21.2" stroke="#16B96D" stroke-width="3" stroke-linecap="round"/>
  <circle cx="126.5" cy="38" r="8.5" fill="#16B96D"/>
  <path d="M46 74l17.5 17.5L99 53" stroke="#16B96D" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function shell(card) {
  return `<div class="auth">
    <div class="auth__photo"><img src="images/login-bg.jpg" alt=""></div>
    <div class="auth__side">
      <img class="auth__logo" src="images/logo.png" alt="Flight Generation Group">
      <div class="auth__card">${card}</div>
    </div>
  </div>`;
}

function loginView(state = {}) {
  const err = state.error;
  return `
    <form id="login-form" class="auth__form" novalidate>
      <div class="auth__fields">
        <h1 class="auth__title">Вход</h1>
        <div class="auth__fields-inner">
          ${err ? `<div class="alert alert--error">${icon("alert-circle", 20)}<span>E-mail или пароль неверные</span></div>` : ""}
          ${field({ label: "E-mail", id: "email", placeholder: "Введите ваш e-mail", type: "email", error: err ? " " : "", cls: err ? "is-error" : "", value: state.email || "" })}
          <div class="auth__pass">
            ${field({ label: "Пароль", id: "password", placeholder: "Введите ваш пароль", type: "password", rightIcon: "eye", error: err ? " " : "", cls: err ? "is-error" : "" })}
            <a class="auth__link" href="#/login/recovery">Забыли пароль?</a>
          </div>
        </div>
      </div>
      ${btn({ text: "Войти", kind: "primary", block: true, type: "submit", id: "login-submit" })}
    </form>`;
}

function recoveryView(state = {}) {
  return `
    <form id="recovery-form" class="auth__form" novalidate>
      <div class="auth__fields">
        <h1 class="auth__title">Восстановление пароля</h1>
        <div class="auth__fields-inner">
          <p>Введите e-mail для того, чтобы мы могли выслать вам новый пароль</p>
          ${field({ label: "E-mail", id: "rec-email", placeholder: "Введите ваш e-mail", type: "email", error: state.error || "", value: state.email || "" })}
        </div>
      </div>
      <div class="auth__actions">
        ${btn({ text: "Подтвердить", kind: "primary", block: true, attrs: 'id="rec-submit"' })}
        <a class="auth__link auth__link--center" href="#/login">Вернуться на страницу входа</a>
      </div>
    </form>`;
}

function sentView() {
  return `
    <div class="auth__form">
      <div class="auth__fields auth__fields--center">
        <h1 class="auth__title">Восстановление пароля</h1>
        <div class="auth__sent">${SEAL}<p>Новый пароль отправлен на почту</p></div>
      </div>
      <a class="btn btn--primary btn--block" href="#/login">Войти</a>
    </div>`;
}

function bindLogin(go, query) {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const pass = form.password.value;
    // Demo rule: empty fields or the password "wrong" -> credentials error (Figma 1.03)
    if (!email || !pass || pass.toLowerCase() === "wrong") {
      document.querySelector(".auth__card").innerHTML = loginView({ error: true, email });
      bindLogin(go, query);
      return;
    }
    store.set("auth", true);
    go(query.next || "/fleet");
  });
}

function bindRecovery(go) {
  const form = document.getElementById("recovery-form");
  const submit = () => {
    const email = document.getElementById("rec-email").value.trim();
    // Demo rule: addresses containing "unknown" (or invalid) are "not registered" (Figma 1.07)
    if (!email || !/^\S+@\S+\.\S+$/.test(email) || /unknown/i.test(email)) {
      setError("rec-email", "Такой e-mail не зарегистрирован у нас в базе");
      return;
    }
    go("/login/sent");
  };
  form.addEventListener("submit", (e) => { e.preventDefault(); submit(); });
  document.getElementById("rec-submit").onclick = submit;
  document.getElementById("rec-email").addEventListener("input", () => setError("rec-email", ""));
}

export default {
  public: true,
  title: () => "Вход",
  render({ params }) {
    const v = params.view;
    if (v === "recovery") return shell(recoveryView());
    if (v === "sent") return shell(sentView());
    return shell(loginView());
  },
  mount({ params, go, query }) {
    if (!params.view) bindLogin(go, query);
    if (params.view === "recovery") bindRecovery(go);
  },
};
