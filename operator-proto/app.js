// FGG Operator Cabinet - Interactive Application Logic

const appState = {
  currentScreen: "sandbox",
  selectedEmptyLegId: "199",
  isEditingEmptyLeg: false,
  activePlaneId: "xls-s5bbm",
  planeVersionTab: "draft",
  planeStatus: "active",
  sandboxSettingsVersion: "draft",
  sandboxLocationMode: "manual",
  sandboxAirport: "LJU, Ljubljana",
  sandboxTripType: "multi",
  selectedCountries: ["EE", "DE", "FR", "IT", "ES", "AT", "CH", "GB", "NL", "BE", "PT", "US", "CA"],
  emptyLegs: [
    {
      id: "199",
      dateTime: "24.09.2026 09:25",
      origin: "UMGG, Gomel Airport, Gomel, Belarus",
      destination: "LIEE, Cagliari / Elmas Airport, Cagliari, Italy",
      planeModel: "Embraer Phenom 300",
      tailNumber: "—",
      currency: "Евро",
      pax: 6,
      price: 1000,
      activeUntil: "24.09.2026, 09:26:00",
      status: "Активный",
      priority: "Обычный",
      image: "images/g550-cabin.jpg"
    },
    {
      id: "198",
      dateTime: "25.09.2026 11:02",
      origin: "UWKD, Kazan Airport, Kazan, Russia",
      destination: "UUWW, Vnukovo Airport, Moscow, Russia",
      planeModel: "Cessna Citation XLS+",
      tailNumber: "S5-BBM",
      currency: "Рубли",
      pax: 8,
      price: 240000,
      activeUntil: "26.09.2026, 11:05:00",
      status: "Неактивно",
      priority: "Обычный",
      image: "images/citation-exterior.jpg"
    },
    {
      id: "197",
      dateTime: "06.09.2026 00:05",
      origin: "UUWW, Moscow, Russia",
      destination: "UHWW, Vladivostok, Russia",
      planeModel: "Gulfstream G550",
      tailNumber: "RA-10222",
      currency: "Рубли",
      pax: 14,
      price: 9450000,
      activeUntil: "06.09.2026, 12:00:00",
      status: "Неактивно",
      priority: "Обычный",
      image: "images/g550-exterior.jpg"
    },
    {
      id: "196",
      dateTime: "10.09.2026 11:00",
      origin: "OMDW, Jebel Ali, UAE",
      destination: "OTHH, Doha, Qatar",
      planeModel: "Challenger 350",
      tailNumber: "OE-HOO",
      currency: "Евро",
      pax: 8,
      price: 18400,
      activeUntil: "10.09.2026, 08:00:00",
      status: "Неактивно",
      priority: "Обычный",
      image: "images/fleet-large.jpg"
    },
    {
      id: "195",
      dateTime: "12.09.2026 11:00",
      origin: "OMDW, Jebel Ali, UAE",
      destination: "HEAL, El Alamein, Egypt",
      planeModel: "Cessna Citation XLS+",
      tailNumber: "S5-BBM",
      currency: "Евро",
      pax: 8,
      price: 43575,
      activeUntil: "12.09.2026, 08:00:00",
      status: "Неактивно",
      priority: "Обычный",
      image: "images/citation-xls.jpg"
    },
    {
      id: "194",
      dateTime: "12.09.2026 12:00",
      origin: "LTFM, Istanbul, Turkey",
      destination: "OJAM, Amman, Jordan",
      planeModel: "Embraer Legacy 600",
      tailNumber: "RA-02857",
      currency: "Евро",
      pax: 13,
      price: 14465,
      activeUntil: "12.09.2026, 08:00:00",
      status: "Неактивно",
      priority: "Обычный",
      image: "images/fleet-small.jpg"
    },
    {
      id: "193",
      dateTime: "21.09.2026 12:00",
      origin: "LCPH, Paphos, Cyprus",
      destination: "EGBB, Birmingham, UK",
      planeModel: "Cessna Citation XLS+",
      tailNumber: "S5-BBM",
      currency: "Евро",
      pax: 8,
      price: 28000,
      activeUntil: "21.09.2026, 08:00:00",
      status: "Неактивно",
      priority: "Обычный",
      image: "images/case-corporate.jpg"
    },
    {
      id: "192",
      dateTime: "23.09.2026 12:00",
      origin: "LLBG, Tel Aviv, Israel",
      destination: "LFMN, Nice, France",
      planeModel: "Gulfstream G550",
      tailNumber: "RA-10222",
      currency: "Евро",
      pax: 14,
      price: 55000,
      activeUntil: "23.09.2026, 08:00:00",
      status: "Неактивно",
      priority: "Обычный",
      image: "images/global-express-flight.jpg"
    }
  ],
  orders: [
    {
      id: "228",
      dateTime: "24.09.2026 09:25",
      route: "LJU → BER → NCE",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      pax: 6,
      price: 38500,
      status: "pending",
      statusLabel: "Требует подтверждения",
      slaMinutesLeft: 18
    },
    {
      id: "226",
      dateTime: "02.10.2026 14:00",
      route: "VKO → DXB",
      plane: "Gulfstream G550 (RA-10222)",
      pax: 8,
      price: 118400,
      status: "confirmed",
      statusLabel: "Подтвержден",
      slaMinutesLeft: null
    },
    {
      id: "224",
      dateTime: "22.09.2026 19:15",
      route: "GVA → LTN",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      pax: 4,
      price: 16200,
      status: "in_flight",
      statusLabel: "В полете",
      slaMinutesLeft: null
    },
    {
      id: "220",
      dateTime: "15.09.2026 10:00",
      route: "FCO → IST",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      pax: 5,
      price: 24000,
      status: "completed",
      statusLabel: "Завершен",
      slaMinutesLeft: null
    }
  ],
  faqArticles: {
    "1": {
      title: "Как правильно добавить фотографии борта",
      desc: "Как заполнять блок номер 1 карточки борта.",
      videoTitle: "Видеоурок: Фотографии борта и стандарты FGG",
      content: `
        <p>Качественные фотографии экстерьера и интерьера напрямую влияют на конверсию подтверждения рейсов клиентами и брокерами.</p>
        <h4 style="margin: 14px 0 6px;">Требования к фотографиям:</h4>
        <ul style="margin-left: 20px; line-height: 1.6;">
          <li>Формат: JPG, PNG или WebP (минимальное разрешение 1920x1080 px).</li>
          <li>Обязательные ракурсы: вид самолета сбоку на перроне, носовая часть, салон вперед (вид кресел), салон назад, спальные места (при наличии), туалетная комната и багажное отделение.</li>
          <li>Не допускается размещение фотографий с посторонними лицами, регистрационными номерами других судов или водяными знаками конкурирующих брокеров.</li>
        </ul>
        <h4 style="margin: 14px 0 6px;">Порядок загрузки:</h4>
        <p>1. Откройте карточку борта и перейдите к блоку «1. Добавление фотографий борта».<br>
        2. Перетащите файлы в пунктирную область или нажмите «+ Добавить фото».<br>
        3. Первое фото в списке автоматически становится главным в карточке борта и каталоге.</p>
      `
    },
    "2": {
      title: "Основная информация о самолёте",
      desc: "Как заполнять основные поля из блока номер 2 карточки борта.",
      videoTitle: "Видеоурок: Базовые параметры борта и статус активности",
      content: `
        <p>Блок содержит юридические и технические идентификаторы борта в системе FGG.</p>
        <h4 style="margin: 14px 0 6px;">Ключевые поля:</h4>
        <ul style="margin-left: 20px; line-height: 1.6;">
          <li><strong>Модель и Бортовой номер:</strong> Заполняются строго по сертификату летной годности (AOC). Изменение бортового номера требует перепроверки модератором FGG.</li>
          <li><strong>Аэропорт базирования (Home Base):</strong> Главный порт дислокации (код ICAO/IATA), от которого рассчитываются подлеты борта к заказчику.</li>
          <li><strong>Floating Base (плавающая база):</strong> Включите этот тумблер, если самолет не возвращается на базу после каждого рейса, а может базироваться в промежуточных аэропортах высадки.</li>
          <li><strong>Время на рулежку:</strong> Стандартное нормативное время (обычно 15 минут), учитываемое в расчете летного часа.</li>
        </ul>
      `
    },
    "3": {
      title: "Характеристики самолёта",
      desc: "Как заполнять основные поля из блока номер 3 карточки борта.",
      videoTitle: "Видеоурок: Летно-технические характеристики и Max Pax",
      content: `
        <p>Характеристики определяют доступность борта в фильтрах поиска клиентов.</p>
        <h4 style="margin: 14px 0 6px;">Рекомендации по заполнению:</h4>
        <ul style="margin-left: 20px; line-height: 1.6;">
          <li><strong>Max Pax (максимальное число пассажиров):</strong> Указывайте реальное сертифицированное число кресел в пассажирском салоне.</li>
          <li><strong>Фактическая дальность (км):</strong> Максимальная дальность беспосадочного перелета с типовой коммерческой загрузкой.</li>
          <li><strong>Объем багажного отсека (м³):</strong> Критически важен для горнолыжных и VIP-туров с негабаритным багажом.</li>
          <li><strong>Wi-Fi и оснащение:</strong> Указывайте тип бортового интернета (Ka-Band, SwiftBroadband, 4G).</li>
        </ul>
      `
    },
    "4": {
      title: "Цены и тарифы — часть 1",
      desc: "Как заполнять основные поля из блока номер 4 карточки борта.",
      videoTitle: "Видеоурок: Настройка часовых ставок летного часа",
      content: `
        <p>В этом блоке настраивается ступенчатая тарификация летного времени.</p>
        <h4 style="margin: 14px 0 6px;">Ступени коммерческого рейса:</h4>
        <ul style="margin-left: 20px; line-height: 1.6;">
          <li><strong>0 – 60 мин:</strong> Базовая ставка за первый час полета (компенсирует расходы на взлет-посадку и аэродромные циклы).</li>
          <li><strong>61 – 120 мин:</strong> Ставка за второй час полета.</li>
          <li><strong>от 121 мин:</strong> Ставка для длительных рейсов (крейсерский режим).</li>
        </ul>
        <p style="margin-top: 10px;">Все изменения тарифов сохраняются сначала в <strong>Черновик (Draft)</strong> и вступают в силу для клиентов только после подтверждения координатором FGG.</p>
      `
    },
    "5": {
      title: "Цены и тарифы — часть 2",
      desc: "Как заполнять основные поля из блока номер 4 карточки борта.",
      videoTitle: "Видеоурок: Сборы за подлеты, стоянки и наземное обслуживание",
      content: `
        <p>Вторая часть тарифной сетки отвечает за сопутствующие и переменные расходы маршрута.</p>
        <ul style="margin-left: 20px; line-height: 1.6;">
          <li><strong>Сбор за перегоночный рейс (Ferry Leg):</strong> Пониженная ставка на пустые плечи (без пассажиров на борту).</li>
          <li><strong>Стоимость парковки за 24 ч:</strong> Норматив оплаты суточной стоянки борта в промежуточных портах.</li>
          <li><strong>Специальные хэндлинги:</strong> Фиксированные надбавки для сложных/дорогих портов (напр. Ницца, Ибица, Неаполь, Санкт-Мориц).</li>
        </ul>
      `
    },
    "6": {
      title: "Расходы на экипаж",
      desc: "Как заполнять основные поля из блока номер 5 карточки борта.",
      videoTitle: "Видеоурок: Суточные пилотов и санитарные нормы смен",
      content: `
        <p>Корректный учет расходов на экипаж гарантирует соблюдение правил авиационной безопасности EASA / ФАВТ.</p>
        <ul style="margin-left: 20px; line-height: 1.6;">
          <li><strong>Суточная ставка экипажа (Per Diem):</strong> Включает питание, транспорт и командировочные расходы летного состава.</li>
          <li><strong>Максимальная смена:</strong> Стандартный санитарный лимит (12–14 часов в зависимости от состава экипажа). При превышении калькулятор автоматически добавляет второй экипаж или гостиницу.</li>
          <li><strong>Минимальный отдых:</strong> Обязательное межполетное окно (обычно 10–12 часов).</li>
        </ul>
      `
    },
    "7": {
      title: "Календарь полётов",
      desc: "Как заполнять основные поля из блока номер 6 карточки борта.",
      videoTitle: "Видеоурок: Управление слотами занятости борта",
      content: `
        <p>Календарь предотвращает конфликтные бронирования между рейсами FGG и сторонними заказами владельца.</p>
        <ul style="margin-left: 20px; line-height: 1.6;">
          <li>Вы можете блокировать даты на плановые технические регламенты (A-Check, C-Check, AOG).</li>
          <li>Слоты занятости, добавленные в кабинете, автоматически снимают борт из выдачи поисковой системы FGG на соответствующие часы.</li>
        </ul>
      `
    },
    "8": {
      title: "Интеграция с Leon",
      desc: "Как заполнять основные поля из блока номер 6 карточки борта.",
      videoTitle: "Видеоурок: Бесшовная синхронизация через Leon API",
      content: `
        <p>Интеграция с диспетчерской программой Leon Software позволяет синхронизировать статус и расписание борта в автоматическом режиме.</p>
        <h4 style="margin: 14px 0 6px;">Как подключить:</h4>
        <p>1. В настройках вашей учетной записи Leon сгенерируйте API Key.<br>
        2. В карточке борта FGG нажмите «Подключить Leon» и вставьте полученный ключ.<br>
        3. Выберите сопоставленный хвост (Aircraft Registration) из списка.<br>
        4. Расписание будет обновляться каждые 10 минут без ручного вмешательства.</p>
      `
    }
  }
};

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

function navigateTo(screenId) {
  appState.currentScreen = screenId;
  
  // Highlight sidebar item
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.getAttribute("data-screen") === screenId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Hide all screens, show target screen
  document.querySelectorAll(".screen-view").forEach(view => {
    view.style.display = "none";
  });
  
  const targetView = document.getElementById(`screen-${screenId}`);
  if (targetView) {
    targetView.style.display = "block";
  }

  const titles = {
    "orders": "Заявки",
    "fleet": "Борты",
    "plane-card": "Борт Cessna Citation XLS+",
    "sandbox": "Песочница",
    "emptylegs": "Empty legs",
    "emptylegs-view": "Просмотр Empty leg",
    "emptylegs-create": "Создать Empty legs",
    "schedule": "Календарь занятости",
    "faq": "FAQ и инструкции",
    "profile": "Профиль"
  };
  
  const topbarTitle = document.getElementById("topbarPageTitle");
  if (topbarTitle) {
    topbarTitle.textContent = titles[screenId] || "Кабинет оператора";
  }

  // Topbar actions
  const topbarAction = document.getElementById("topbarActionSlot");
  if (topbarAction) {
    if (screenId === "emptylegs") {
      topbarAction.innerHTML = `<button class="btn-primary" onclick="openCreateEmptyLegView()">Создать Empty legs</button>`;
      topbarAction.style.display = "block";
    } else if (screenId === "fleet") {
      topbarAction.innerHTML = `<button class="btn-primary" onclick="navigateTo('plane-card')">Добавить борт</button>`;
      topbarAction.style.display = "block";
    } else {
      topbarAction.innerHTML = "";
      topbarAction.style.display = "none";
    }
  }

  if (screenId === "plane-card") {
    setTimeout(initPlaneCardMap, 100);
  } else if (screenId === "orders") {
    renderOrders();
  } else if (screenId === "emptylegs") {
    renderEmptyLegsTable();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Empty legs management
function renderEmptyLegsTable() {
  const tbody = document.getElementById("emptyLegsTableBody");
  if (!tbody) return;

  tbody.innerHTML = appState.emptyLegs.map(el => {
    const isActive = el.status === "Активный";
    const statusColor = isActive ? "var(--success)" : "var(--danger)";
    return `
      <tr style="cursor: pointer;" onclick="openEmptyLegView('${el.id}')">
        <td style="font-weight: 700; color: var(--primary);">${el.id}</td>
        <td>${el.dateTime}</td>
        <td>${el.origin}</td>
        <td>${el.destination}</td>
        <td style="font-weight: 700; color: var(--text-main);">${el.price.toLocaleString("ru-RU")} ${el.currency === "Рубли" ? "₽" : "€"}</td>
        <td>${el.activeUntil}</td>
        <td>
          <span style="font-weight: 600; color: ${statusColor};">${el.status}</span>
        </td>
        <td>
          <a class="action-link" href="javascript:void(0)" onclick="event.stopPropagation(); openEmptyLegView('${el.id}')">Просмотр</a>
        </td>
        <td>
          <a class="action-link" href="javascript:void(0)" onclick="event.stopPropagation(); openEmptyLegEdit('${el.id}')">Детали</a>
        </td>
      </tr>
    `;
  }).join("");
}

function openEmptyLegView(id) {
  const el = appState.emptyLegs.find(item => item.id === id) || appState.emptyLegs[0];
  appState.selectedEmptyLegId = el.id;
  appState.isEditingEmptyLeg = false;

  document.getElementById("elViewHeroImg").src = el.image || "images/g550-cabin.jpg";
  document.getElementById("elViewOrigin").textContent = el.origin;
  document.getElementById("elViewDestination").textContent = el.destination;
  document.getElementById("elViewDateTime").textContent = el.dateTime;
  document.getElementById("elViewPlane").textContent = el.planeModel;
  document.getElementById("elViewTail").textContent = el.tailNumber;
  document.getElementById("elViewCurrency").textContent = el.currency;
  document.getElementById("elViewPax").textContent = el.pax;
  document.getElementById("elViewPrice").textContent = el.price.toLocaleString("ru-RU");
  document.getElementById("elViewStatus").textContent = el.status;
  document.getElementById("elViewActiveUntil").textContent = el.activeUntil;
  document.getElementById("elViewPriority").textContent = el.priority;

  document.getElementById("elViewModeContainer").style.display = "block";
  document.getElementById("elEditModeContainer").style.display = "none";

  navigateTo("emptylegs-view");
}

function openEmptyLegEdit(id) {
  openEmptyLegView(id);
  enableEmptyLegEdit();
}

function enableEmptyLegEdit() {
  appState.isEditingEmptyLeg = true;
  const el = appState.emptyLegs.find(item => item.id === appState.selectedEmptyLegId);
  if (!el) return;

  document.getElementById("elEditOrigin").value = el.origin;
  document.getElementById("elEditDestination").value = el.destination;
  document.getElementById("elEditDateTime").value = el.dateTime;
  document.getElementById("elEditPlane").value = el.planeModel;
  document.getElementById("elEditTail").value = el.tailNumber;
  document.getElementById("elEditCurrency").value = el.currency;
  document.getElementById("elEditPax").value = el.pax;
  document.getElementById("elEditPrice").value = el.price;
  document.getElementById("elEditStatus").value = el.status;
  document.getElementById("elEditActiveUntil").value = el.activeUntil;
  document.getElementById("elEditPriority").value = el.priority;

  document.getElementById("elViewModeContainer").style.display = "none";
  document.getElementById("elEditModeContainer").style.display = "block";
}

function cancelEmptyLegEdit() {
  openEmptyLegView(appState.selectedEmptyLegId);
}

function saveEmptyLegEdit() {
  const el = appState.emptyLegs.find(item => item.id === appState.selectedEmptyLegId);
  if (el) {
    el.origin = document.getElementById("elEditOrigin").value;
    el.destination = document.getElementById("elEditDestination").value;
    el.dateTime = document.getElementById("elEditDateTime").value;
    el.planeModel = document.getElementById("elEditPlane").value;
    el.tailNumber = document.getElementById("elEditTail").value;
    el.currency = document.getElementById("elEditCurrency").value;
    el.pax = parseInt(document.getElementById("elEditPax").value) || el.pax;
    el.price = parseInt(document.getElementById("elEditPrice").value) || el.price;
    el.status = document.getElementById("elEditStatus").value;
    el.activeUntil = document.getElementById("elEditActiveUntil").value;
    el.priority = document.getElementById("elEditPriority").value;
  }
  showToast("Empty leg успешно обновлен!", "success");
  openEmptyLegView(appState.selectedEmptyLegId);
}

function openCreateEmptyLegView() {
  navigateTo("emptylegs-create");
}

function submitNewEmptyLeg() {
  const origin = document.getElementById("elCreateOrigin").value;
  const destination = document.getElementById("elCreateDestination").value;
  const price = parseInt(document.getElementById("elCreatePrice").value) || 5000;

  if (!origin || !destination) {
    showToast("Пожалуйста, заполните пункты вылета и прилета", "error");
    return;
  }

  const newId = (parseInt(appState.emptyLegs[0]?.id || "200") + 1).toString();
  appState.emptyLegs.unshift({
    id: newId,
    dateTime: document.getElementById("elCreateDateTime").value || "25.09.2026, 12:00:00",
    origin: origin,
    destination: destination,
    planeModel: document.getElementById("elCreatePlane").value || "Cessna Citation XLS+",
    tailNumber: document.getElementById("elCreateTail").value || "S5-BBM",
    currency: "Евро",
    pax: parseInt(document.getElementById("elCreatePax").value) || 8,
    price: price,
    activeUntil: "26.09.2026, 12:00:00",
    status: "Активный",
    priority: "Обычный",
    image: "images/citation-exterior.jpg"
  });

  showToast(`Empty leg #${newId} успешно создан!`, "success");
  openEmptyLegView(newId);
}

// FAQ Modal & Reader Logic
function openFaqModal(articleId) {
  const article = appState.faqArticles[articleId] || appState.faqArticles["1"];
  document.getElementById("faqModalTitle").textContent = article.title;
  document.getElementById("faqModalDesc").textContent = article.desc;
  document.getElementById("faqModalContent").innerHTML = article.content;
  document.getElementById("faqModalVideoBox").style.display = "none";
  document.getElementById("modalFaqDetail").classList.add("active");
}

function openFaqVideoModal(articleId) {
  const article = appState.faqArticles[articleId] || appState.faqArticles["1"];
  document.getElementById("faqModalTitle").textContent = article.videoTitle || "Видеоинструкция";
  document.getElementById("faqModalDesc").textContent = `Обучающее видео к разделу «${article.title}»`;
  document.getElementById("faqModalContent").innerHTML = `
    <div style="background: #F8FAFC; border: 2px dashed #CBD5E1; border-radius: 8px; padding: 48px 24px; text-align: center; color: var(--text-main); margin: 16px 0;">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 16px; color: var(--primary); display: block;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      <div style="font-weight: 700; font-size: 18px; margin-bottom: 8px;">Видео скоро будет доступно</div>
      <div style="font-size: 14px; color: var(--text-muted); max-width: 420px; margin: 0 auto; line-height: 1.5;">Мы готовим наглядную видеоинструкцию по данному разделу. Ознакомьтесь с подробным текстом инструкции, нажав кнопку «Читать инструкцию».</div>
    </div>
  `;
  const videoBox = document.getElementById("faqModalVideoBox");
  if (videoBox) videoBox.style.display = "none";
  document.getElementById("modalFaqDetail").classList.add("active");
}

// Sandbox Calculator
function setSandboxSettingsVersion(ver) {
  appState.sandboxSettingsVersion = ver;
  const btnDraft = document.getElementById("btnSandboxDraft");
  const btnPub = document.getElementById("btnSandboxPublished");
  const hint = document.getElementById("sandboxVersionHint");
  const priceDisplay = document.getElementById("sandboxTotalPrice");
  const finalBottomPrice = document.getElementById("finalBottomPrice");

  if (ver === "draft") {
    btnDraft.classList.add("active");
    btnPub.classList.remove("active");
    hint.textContent = "Используются черновые настройки тарифов борта (v13)";
    if (priceDisplay) priceDisplay.textContent = "€71 450";
    if (finalBottomPrice) finalBottomPrice.textContent = "€71 450";
    showToast("В расчет подставлены параметры из Черновика (v13)", "info");
  } else {
    btnDraft.classList.remove("active");
    btnPub.classList.add("active");
    hint.textContent = "Используются опубликованные действующие настройки (v12)";
    if (priceDisplay) priceDisplay.textContent = "€69 000";
    if (finalBottomPrice) finalBottomPrice.textContent = "€69 000";
    showToast("В расчет подставлены действующие опубликованные тарифы (v12)", "info");
  }
}

function setSandboxLocationMode(mode) {
  appState.sandboxLocationMode = mode;
  const airportGroup = document.getElementById("sandboxAirportGroup");
  if (airportGroup) {
    airportGroup.style.display = mode === "manual" ? "block" : "none";
  }
}

function recalculateSandbox() {
  const calcBtn = document.getElementById("btnRecalculateSandbox");
  if (calcBtn) {
    calcBtn.disabled = true;
    calcBtn.textContent = "Выполняется расчет FGG Engine...";
  }
  setTimeout(() => {
    if (calcBtn) {
      calcBtn.disabled = false;
      calcBtn.textContent = "Обновить результаты";
    }
    const priceDisplay = document.getElementById("sandboxTotalPrice");
    const finalBottomPrice = document.getElementById("finalBottomPrice");
    const price = appState.sandboxSettingsVersion === "draft" ? "€71 450" : "€69 000";
    if (priceDisplay) priceDisplay.textContent = price;
    if (finalBottomPrice) finalBottomPrice.textContent = price;
    showToast("Расчет перелета успешно обновлен", "success");
  }, 400);
}

function addFlightLeg() {
  const container = document.getElementById("flightLegsList");
  if (!container) return;
  const row = document.createElement("div");
  row.className = "flight-leg-row";
  row.innerHTML = `
    <div><input type="text" class="form-control" value="Лазурный Берег, NCE, Ницца, Франция" placeholder="Откуда"></div>
    <div><input type="text" class="form-control" value="Юлемисте, TLL, Таллин, Эстония" placeholder="Куда"></div>
    <div><input type="date" class="form-control" value="2026-11-18"></div>
    <div><input type="time" class="form-control" value="14:00"></div>
    <div class="counter-control">
      <button class="btn-counter" onclick="changePax(this, -1)">-</button>
      <span class="counter-value">6 пассажиров</span>
      <button class="btn-counter" onclick="changePax(this, 1)">+</button>
    </div>
    <div>
      <button class="btn-remove-leg" onclick="this.closest('.flight-leg-row').remove()" title="Удалить плечо">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `;
  container.appendChild(row);
  showToast("Добавлено дополнительное плечо маршрута", "info");
}

function clearSandboxForm() {
  showToast("Форма маршрута сброшена", "info");
}

function changePax(btn, delta) {
  const span = btn.parentElement.querySelector(".counter-value");
  let current = parseInt(span.textContent) || 1;
  current = Math.max(1, Math.min(14, current + delta));
  span.textContent = `${current} ${current === 1 ? "пассажир" : "пассажиров"}`;
}

function toggleAccordion(header) {
  header.classList.toggle("open");
  const body = header.nextElementSibling;
  if (body) {
    body.classList.toggle("open");
  }
}

// Plane Card functions
function setPlaneVersion(version) {
  appState.planeVersionTab = version;
  const cardDraft = document.getElementById("cardVersionDraft");
  const cardPublished = document.getElementById("cardVersionPublished");
  const diffCard = document.getElementById("cardDiffSummary");
  const noteBanner = document.getElementById("planeVersionNote");
  const paxInput = document.getElementById("planePaxInput");
  const commRateInput = document.getElementById("planeCommRateInput");
  const ferryRateInput = document.getElementById("planeFerryRateInput");
  const handlingNaplesInput = document.getElementById("planeHandlingNaplesInput");

  if (version === "draft") {
    cardDraft.classList.add("is-active-tab");
    cardPublished.classList.remove("is-active-tab");
    if (diffCard) diffCard.style.display = "block";
    if (noteBanner) {
      noteBanner.innerHTML = `<svg class="informer-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div><strong>Черновик v13 сохранен 18.09.2026, 12:40.</strong> Опубликованная версия v12 продолжает использоваться в клиентских расчетах на сайте и в приложении до утверждения модератором.</div>`;
      noteBanner.className = "informer-box diff";
    }

    if (paxInput) {
      paxInput.value = "9";
      paxInput.classList.add("is-modified");
      const b = document.getElementById("paxModifiedBadge");
      if (b) b.style.display = "inline-block";
    }
    if (commRateInput) {
      commRateInput.value = "7500";
      commRateInput.classList.add("is-modified");
      const b = document.getElementById("commRateBadge");
      if (b) b.style.display = "inline-block";
    }
    if (ferryRateInput) {
      ferryRateInput.value = "5800";
      ferryRateInput.classList.add("is-modified");
      const b = document.getElementById("ferryRateBadge");
      if (b) b.style.display = "inline-block";
    }
    if (handlingNaplesInput) {
      handlingNaplesInput.value = "2400";
      handlingNaplesInput.classList.add("is-modified");
      const b = document.getElementById("handlingNaplesBadge");
      if (b) b.style.display = "inline-block";
    }
    showToast("Параметры Черновика v13 (измененные поля выделены синим)", "info");
  } else {
    cardDraft.classList.remove("is-active-tab");
    cardPublished.classList.add("is-active-tab");
    if (diffCard) diffCard.style.display = "none";
    if (noteBanner) {
      noteBanner.innerHTML = `<svg class="informer-icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div><strong>Опубликованная версия v12 (Активна).</strong> Это действующие параметры борта в системе FGG.</div>`;
      noteBanner.className = "informer-box info";
    }

    if (paxInput) {
      paxInput.value = "8";
      paxInput.classList.remove("is-modified");
      const b = document.getElementById("paxModifiedBadge");
      if (b) b.style.display = "none";
    }
    if (commRateInput) {
      commRateInput.value = "7000";
      commRateInput.classList.remove("is-modified");
      const b = document.getElementById("commRateBadge");
      if (b) b.style.display = "none";
    }
    if (ferryRateInput) {
      ferryRateInput.value = "5500";
      ferryRateInput.classList.remove("is-modified");
      const b = document.getElementById("ferryRateBadge");
      if (b) b.style.display = "none";
    }
    if (handlingNaplesInput) {
      handlingNaplesInput.value = "2200";
      handlingNaplesInput.classList.remove("is-modified");
      const b = document.getElementById("handlingNaplesBadge");
      if (b) b.style.display = "none";
    }
    showToast("Действующие опубликованные параметры v12", "info");
  }
}

function saveDraft() {
  showToast("Черновик борта успешно сохранен", "success");
}

function openModerationModal() {
  const modal = document.getElementById("modalModeration");
  if (modal) modal.classList.add("active");
}

function submitToModeration() {
  closeModal("modalModeration");
  appState.planeStatus = "moderation";
  const statusPill = document.getElementById("planeStatusPill");
  if (statusPill) {
    statusPill.className = "status-pill moderation";
    statusPill.innerHTML = `На модерации FGG`;
  }
  showToast("Пакет изменений отправлен координатору FGG", "warning");
}

// Vector map logic
let vectorMapInstance = null;
function initPlaneCardMap() {
  const mapElement = document.getElementById("mapContainer");
  if (!mapElement || vectorMapInstance) return;

  if (typeof jsVectorMap !== "undefined") {
    try {
      vectorMapInstance = new jsVectorMap({
        selector: "#mapContainer",
        map: "world",
        backgroundColor: "#F8FAFC",
        draggable: true,
        zoomButtons: true,
        zoomOnScroll: false,
        selectedRegions: appState.selectedCountries,
        regionStyle: {
          initial: { fill: "#CBD5E1", fillOpacity: 1, stroke: "#FFFFFF", strokeWidth: 0.5 },
          hover: { fillOpacity: 0.85, cursor: "pointer" },
          selected: { fill: "#1E599F" },
          selectedHover: { fill: "#16467F" }
        },
        onRegionSelected: function (index, isSelected, selectedRegions) {
          appState.selectedCountries = selectedRegions;
          updateSelectedCountriesUI();
        }
      });
      updateSelectedCountriesUI();
    } catch (e) {
      console.error("Map init error:", e);
    }
  }
}

function updateSelectedCountriesUI() {
  const countEl = document.getElementById("selectedCountriesCount");
  if (countEl) countEl.textContent = appState.selectedCountries.length;

  const chipsContainer = document.getElementById("selectedCountriesChips");
  if (!chipsContainer) return;

  const countryNames = {
    "EE": "Эстония", "DE": "Германия", "FR": "Франция", "IT": "Италия", "ES": "Испания",
    "AT": "Австрия", "CH": "Швейцария", "GB": "Великобритания", "NL": "Нидерланды",
    "BE": "Бельгия", "PT": "Португалия", "US": "США", "CA": "Канада", "AE": "ОАЭ",
    "TR": "Турция", "CY": "Кипр", "GR": "Греция"
  };

  chipsContainer.innerHTML = appState.selectedCountries.map(code => {
    const name = countryNames[code] || code;
    return `<div class="country-chip">
      <span>${name}</span>
      <span class="country-chip-remove" onclick="removeCountry('${code}')">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </span>
    </div>`;
  }).join("");
}

function removeCountry(code) {
  appState.selectedCountries = appState.selectedCountries.filter(c => c !== code);
  if (vectorMapInstance) {
    vectorMapInstance.clearSelectedRegions();
    vectorMapInstance.setSelectedRegions(appState.selectedCountries);
  }
  updateSelectedCountriesUI();
}

function applyCountryPreset(presetName) {
  let list = [];
  if (presetName === "world") {
    list = ["EE", "DE", "FR", "IT", "ES", "AT", "CH", "GB", "NL", "BE", "PT", "US", "CA", "AE", "TR", "GR", "CY"];
  } else if (presetName === "europe") {
    list = ["EE", "DE", "FR", "IT", "ES", "AT", "CH", "GB", "NL", "BE", "PT", "GR", "CY"];
  } else if (presetName === "eu") {
    list = ["EE", "DE", "FR", "IT", "ES", "AT", "NL", "BE", "PT", "GR", "CY"];
  } else if (presetName === "me") {
    list = ["AE", "SA", "QA", "OM", "KW", "BH"];
  } else if (presetName === "cis") {
    list = ["KZ", "UZ", "AM", "AZ", "BY", "KG", "TJ"];
  }
  appState.selectedCountries = list;
  if (vectorMapInstance) {
    vectorMapInstance.clearSelectedRegions();
    vectorMapInstance.setSelectedRegions(list);
  }
  updateSelectedCountriesUI();
}

// Orders render
function renderOrders() {
  const container = document.getElementById("ordersTableBody");
  if (!container) return;

  container.innerHTML = appState.orders.map(order => {
    let statusColor = "var(--text-muted)";
    if (order.status === "confirmed") statusColor = "var(--success)";
    if (order.status === "pending") statusColor = "var(--warning)";
    if (order.status === "in_flight") statusColor = "var(--primary)";

    const isPending = order.status === "pending";

    return `
      <tr>
        <td style="font-weight: 700;">${order.id}</td>
        <td>${order.dateTime}</td>
        <td style="font-weight: 600;">${order.route}</td>
        <td>${order.plane}</td>
        <td>${order.pax} PAX</td>
        <td style="font-weight: 700; color: var(--primary);">€${order.price.toLocaleString("ru-RU")}</td>
        <td>
          <span style="font-weight: 600; color: ${statusColor};">${order.statusLabel}</span>
          ${order.slaMinutesLeft ? `<div style="font-size: 11px; color: var(--danger); font-weight: 700;">SLA: ${order.slaMinutesLeft} мин</div>` : ""}
        </td>
        <td style="text-align: right;">
          ${isPending ? `
            <button class="btn-primary btn-sm" onclick="confirmOrderAction('${order.id}')">Подтвердить</button>
            <button class="btn-secondary btn-sm" onclick="showToast('Запрос цены отправлен', 'info')">Изменить цену</button>
          ` : `
            <a class="action-link" onclick="showToast('Детализация рейса #${order.id}', 'info')">Детали</a>
          `}
        </td>
      </tr>
    `;
  }).join("");
}

function confirmOrderAction(orderId) {
  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    order.status = "confirmed";
    order.statusLabel = "Подтвержден";
    order.slaMinutesLeft = null;
  }
  renderOrders();
  showToast(`Заказ #${orderId} подтвержден!`, "success");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
  renderEmptyLegsTable();
  const hash = window.location.hash.replace("#", "");
  if (hash && ["orders", "fleet", "plane-card", "sandbox", "emptylegs", "emptylegs-view", "emptylegs-create", "schedule", "faq", "profile"].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo("sandbox");
  }
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && ["orders", "fleet", "plane-card", "sandbox", "emptylegs", "emptylegs-view", "emptylegs-create", "schedule", "faq", "profile"].includes(hash)) {
    navigateTo(hash);
  }
});
