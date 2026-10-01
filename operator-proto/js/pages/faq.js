// Screens 4.1 – 4.3.3: FAQ and instructions, reading modal, video modal and player
import { icon } from "../icons.js";
import { esc, $, btn, openModal, closeModal, toast } from "../ui.js";

const POSTER = "images/faq-video-poster.jpg";

const ITEMS = [
  {
    title: "Как правильно добавить фотографии борта",
    desc: "Требования к фотографиям экстерьера и интерьера, ракурсы, освещение и технические параметры для наилучшего отображения.",
    sub: "Как заполнять блок номер 1 карточки борта.",
    video: true,
    lead: "Качественные фотографии экстерьера и интерьера напрямую влияют на конверсию подтверждения рейсов клиентами и брокерами.",
    req: "Требования к фотографиям:\nФормат: JPG, PNG или WebP (минимальное разрешение 1920x1080 px).\nОбязательные ракурсы: вид самолета сбоку на перроне, носовая часть, салон вперед (вид кресел), салон назад, спальные места (при наличии), туалетная комната и багажное отделение.\nНе допускается размещение фотографий с посторонними лицами, регистрационными номерами других судов или водяными знаками конкурирующих брокеров.",
    stepsTitle: "Порядок загрузки:",
    steps: "1. Откройте карточку борта и перейдите к блоку «1. Добавление фотографий борта».\n2. Перетащите файлы в пунктирную область или нажмите «+ Добавить фото».\n3. Первое фото в списке автоматически становится главным в карточке борта и каталоге.",
  },
  {
    title: "Основная информация о самолёте",
    desc: "Заполнение базовых данных: модель, бортовой номер, год выпуска, конфигурация салона и базовый аэропорт.",
    sub: "Как заполнять блок номер 2 карточки борта.",
    video: true,
    lead: "Корректная основная информация о борте позволяет брокерам быстро находить его в поиске и сопоставлять с запросами клиентов.",
    req: "Обязательные поля:\nМодель и бортовой номер — в точности как в сертификате лётной годности.\nГод выпуска и год последнего рестайлинга салона.\nКонфигурация салона и максимальная пассажировместимость.\nБазовый аэропорт — код ICAO или IATA, из которого борт выполняет рейсы по умолчанию.",
    stepsTitle: "Порядок заполнения:",
    steps: "1. Откройте карточку борта и перейдите к блоку «2. Основная информация».\n2. Выберите модель из списка и укажите бортовой номер.\n3. Заполните год выпуска, вместимость и базовый аэропорт, затем сохраните изменения.",
  },
  {
    title: "Характеристики самолёта",
    desc: "Технические параметры: дальность, крейсерская скорость, вместимость багажного отсека и взлетно-посадочные характеристики.",
    sub: "Как заполнять блок номер 3 карточки борта.",
    video: true,
    lead: "Технические характеристики используются при расчёте маршрутов и проверке возможности посадки в выбранном аэропорту.",
    req: "Что нужно указать:\nМаксимальную дальность полёта с полной загрузкой.\nКрейсерскую скорость и потолок.\nОбъём и максимальный вес багажа.\nМинимальную длину взлётно-посадочной полосы для вашего борта.",
    stepsTitle: "Порядок заполнения:",
    steps: "1. Откройте карточку борта и перейдите к блоку «3. Характеристики».\n2. Укажите значения из руководства по лётной эксплуатации.\n3. Проверьте единицы измерения и сохраните карточку.",
  },
  {
    title: "Цены и тарифы — часть 1",
    desc: "Настройка базовых часовых ставок, стоимости ожидания, ночевки и расчет коэффициентов сезонности.",
    sub: "Как настроить стоимость часа налёта и базовые тарифы.",
    video: true,
    lead: "Базовые ставки определяют итоговую стоимость рейса в расчёте. Их можно изменять в любой момент — изменения применяются к новым запросам.",
    req: "Что настраивается:\nСтоимость лётного часа в евро.\nСтоимость часа ожидания и ночёвки экипажа.\nКоэффициенты сезонности для высокого и низкого сезона.\nМинимальная стоимость рейса.",
    stepsTitle: "Порядок настройки:",
    steps: "1. Откройте карточку борта и перейдите к блоку «Цены и тарифы».\n2. Укажите базовые ставки и коэффициенты.\n3. Проверьте результат в разделе «Песочница» на тестовом перелёте.",
  },
  {
    title: "Цены и тарифы — часть 2",
    desc: "Дополнительные сборы: аэропортовые расходы, кейтеринг, деайсинг, оверфлайт-пермиты и спецобслуживание.",
    sub: "Как настроить дополнительные сборы.",
    video: true,
    lead: "Дополнительные сборы добавляются к стоимости рейса отдельными строками, чтобы клиент видел из чего складывается цена.",
    req: "Доступные сборы:\nАэропортовые и навигационные сборы.\nКейтеринг и бортовое питание.\nДеайсинг и спецобслуживание.\nОверфлайт-пермиты и разрешения на посадку.",
    stepsTitle: "Порядок настройки:",
    steps: "1. Откройте блок «Дополнительные сборы» в карточке борта.\n2. Включите нужные позиции и укажите стоимость.\n3. Сохраните изменения — они сразу появятся в расчёте.",
  },
  {
    title: "Расходы на экипаж",
    desc: "Суточные, проживание, транспорт и надбавки за продление рабочего времени экипажа при задержках рейсов.",
    sub: "Как учитывать расходы на экипаж.",
    video: false,
    lead: "Расходы на экипаж учитываются в стоимости рейсов с ночёвкой и длительным ожиданием.",
    req: "Параметры:\nСуточные на каждого члена экипажа.\nСтоимость проживания и транспорта.\nНадбавка за продление рабочего времени.",
    stepsTitle: "Порядок настройки:",
    steps: "1. Откройте блок «Экипаж» в карточке борта.\n2. Укажите состав экипажа и ставки.\n3. Сохраните изменения.",
  },
  {
    title: "Календарь полётов",
    desc: "Управление занятостью бортов, блокировка дат под ТО (AOG/C-check), подтверждение броней и синхронизация.",
    sub: "Как пользоваться календарём полётов.",
    video: false,
    lead: "Календарь показывает, когда борт занят, и не даёт предлагать клиентам недоступные даты.",
    req: "Возможности календаря:\nБлокировка дат под техническое обслуживание.\nПодтверждение и отмена броней.\nАвтоматическое определение местонахождения борта.",
    stepsTitle: "Как заблокировать даты:",
    steps: "1. Откройте календарь в карточке борта.\n2. Выберите период и тип блокировки.\n3. Подтвердите действие.",
  },
  {
    title: "Интеграция с Leon",
    desc: "Подключение и настройка двухсторонней синхронизации расписания, статусов рейсов и доступности флота с Leon Software.",
    sub: "Как подключить интеграцию с Leon.",
    video: false,
    lead: "Интеграция с Leon Software позволяет автоматически синхронизировать расписание и доступность флота.",
    req: "Что синхронизируется:\nРасписание и статусы рейсов.\nДоступность бортов.\nБлокировки на обслуживание.",
    stepsTitle: "Порядок подключения:",
    steps: "1. Откройте карточку борта и перейдите к блоку интеграции.\n2. Введите данные доступа Leon и включите синхронизацию.\n3. Дождитесь первой синхронизации — статус появится в карточке.",
  },
];

const SPARKLES = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#0970cd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8l2.6 7.4L27 18l-7.4 2.6L17 28l-2.6-7.4L7 18l7.4-2.6L17 8z"/><path d="M30 6v6M27 9h6"/><path d="M30 28v6M27 31h6"/></svg>`;

const paras = (t) => esc(t).replace(/\n/g, "<br>");

function cardHtml(it, i) {
  return `<div class="faq-item">
    <div class="faq-item__main">
      <span class="faq-item__ico">${icon("help-circle", 24)}</span>
      <div class="faq-item__txt"><div class="faq-item__title">${esc(it.title)}</div><div class="faq-item__desc">${esc(it.desc)}</div></div>
    </div>
    <div class="faq-item__acts">
      ${btn({ text: "Читать", kind: "secondary", icon: "file-text", w200: false, cls: "faq-btn faq-btn--r", attrs: `data-read="${i}"` })}
      <i class="faq-item__sep"></i>
      ${btn({ text: "Смотреть видео", kind: "secondary", icon: "play", cls: "faq-btn faq-btn--v", attrs: `data-video="${i}"` })}
    </div></div>`;
}

const bannerHtml = `<div class="faq-note">${icon("info", 24)}<span>Если у Вас остались вопросы, <a href="#/chat" class="faq-note__a" data-ask>напишите нам</a> и обязательно поможем. </span></div>`;
const headHtml = (it, sub) => `<div class="faq-m__head"><div class="faq-m__title">${esc(it.title)}</div><div class="faq-m__sub">${esc(sub)}</div></div>
  <button type="button" class="faq-m__x" data-modal-cancel aria-label="Закрыть">${icon("x", 16)}</button>`;

function readHtml(it) {
  return `<div class="faq-m__headwrap">${headHtml(it, it.sub)}</div>
    <div class="faq-m__scroll" id="faq-scroll"><div class="faq-m__body">
      <div class="faq-m__sec"><p>${esc(it.lead)}</p><p>${paras(it.req)}</p></div>
      <div class="faq-m__sec"><b>${esc(it.stepsTitle)}</b><p>${paras(it.steps)}</p></div>
      ${bannerHtml}
      <div class="faq-m__foot">${btn({ text: "Закрыть", kind: "secondary", w200: true, attrs: "data-modal-cancel" })}</div>
    </div></div>`;
}

function videoHtml(it, i, soon) {
  const media = soon
    ? `<div class="faq-video faq-video--soon">${icon("play", 40)}<div><b>Видео скоро будет доступно</b><span>Мы готовим наглядную видеоинструкцию по данному разделу. Ознакомьтесь с подробным текстом инструкции, нажав кнопку «Читать инструкцию».</span></div></div>`
    : `<button type="button" class="faq-video" data-play="${i}" aria-label="Смотреть видео"><img src="${POSTER}" alt=""><i class="faq-play">${icon("play", 24)}</i></button>`;
  return `${headHtml(it, `Обучающее видео к разделу «${it.title}»`).replace('class="faq-m__head"', 'class="faq-m__head faq-m__head--v"')}
    ${media}${bannerHtml}
    <div class="faq-m__foot">${btn({ text: "Закрыть", kind: "secondary", w200: true, attrs: "data-modal-cancel" })}</div>`;
}

function playerHtml(it) {
  return `<div class="faq-player" id="faq-player">
    <div class="faq-player__v" id="faq-pv"><img src="${POSTER}" alt="${esc(it.title)}"><i class="faq-play" id="faq-pplay">${icon("play", 24)}</i><div class="faq-player__bar"><i></i></div></div>
    <button type="button" class="faq-player__x" data-modal-cancel aria-label="Закрыть">${icon("x", 16)}</button></div>`;
}

function download() {
  const txt = ITEMS.map((it, i) => `${i + 1}. ${it.title}\n${it.lead}\n\n${it.req}\n\n${it.stepsTitle}\n${it.steps}\n`).join("\n----------------------------------------\n\n");
  const url = URL.createObjectURL(new Blob([`FGG — инструкция по работе с кабинетом оператора\n\n${txt}`], { type: "text/plain;charset=utf-8" }));
  const a = document.createElement("a"); a.href = url; a.download = "fgg-operator-instruction.txt";
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Инструкция скачана");
}

export default {
  title: () => "FAQ и инструкции",
  mainClass: "main--faq",
  render() {
    return `<div class="page page--faq">
      <div class="faq-top">
        <div class="page-head">
          <div class="page-head__titles"><h1 class="page-head__title">FAQ и инструкции</h1><div class="page-head__sub">Ответы на все вопросы по работе с кабинетом оператора</div></div>
          <div class="page-head__actions">${btn({ text: "Задать вопрос", kind: "white", w200: true, attrs: 'data-go="/chat"' })}</div>
        </div>
        <div class="faq-ai">
          <div class="faq-ai__main"><span class="faq-ai__ico">${SPARKLES}</span>
            <div class="faq-ai__txt"><div class="faq-ai__title">Помощь через ИИ</div><div class="faq-ai__desc">Вы можете скачать инструкцию в формате PDF и загрузить её в ChatGPT или любой другой ИИ-помощник, чтобы быстро находить ответы на любые вопросы по работе с кабинетом.</div></div></div>
          ${btn({ text: "Скачать инструкцию", kind: "primary", icon: "download", w200: true, id: "faq-dl" })}
        </div>
      </div>
      <section class="faq-list"><h2 class="faq-list__h">Инструкции</h2><div class="faq-list__items">${ITEMS.map(cardHtml).join("")}</div></section>
    </div>`;
  },

  mount({ query, go }) {
    const root = document.querySelector(".main");
    const fixture = query.fixture === "figma";
    let playTimer = null;

    const ask = (e) => {
      const a = e.target.closest("[data-ask]"); if (!a) return;
      e.preventDefault(); closeModal(); go("/chat");
    };
    const bindModal = (ov, onClose) => {
      ov.addEventListener("click", ask);
      ov.querySelectorAll("[data-modal-cancel]").forEach((b) => (b.onclick = () => closeModal()));
      if (onClose) ov._onClose = onClose;
    };

    const openRead = (i) => {
      const ov = openModal(readHtml(ITEMS[i]), { cls: "modal--faq" });
      bindModal(ov);
      if (fixture && query.scroll) $("#faq-scroll").scrollTop = Number(query.scroll);
    };
    const openPlayer = (i) => {
      const ov = openModal(playerHtml(ITEMS[i]), { cls: "modal--player" });
      bindModal(ov, () => clearTimeout(playTimer));
      const v = $("#faq-pv");
      v.addEventListener("click", () => v.classList.toggle("is-playing"));
    };
    const openVideo = (i, soon) => {
      const ov = openModal(videoHtml(ITEMS[i], i, soon ?? !ITEMS[i].video), { cls: "modal--faq modal--faq-video" });
      bindModal(ov);
      ov.querySelector("[data-play]")?.addEventListener("click", () => { closeModal(); openPlayer(i); });
    };

    root.addEventListener("click", (e) => {
      const r = e.target.closest("[data-read]"); if (r) return openRead(Number(r.dataset.read));
      const v = e.target.closest("[data-video]"); if (v) return openVideo(Number(v.dataset.video));
      if (e.target.closest("#faq-dl")) return download();
      const g = e.target.closest("[data-go]"); if (g) go(g.dataset.go);
    });

    if (fixture) {
      const m = query.modal;
      if (m === "read") openRead(0);
      else if (m === "video") openVideo(0, false);
      else if (m === "soon") openVideo(0, true);
      else if (m === "player") openPlayer(0);
    }
    return () => { closeModal(); clearTimeout(playTimer); };
  },
};
