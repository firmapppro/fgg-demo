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
  sandboxPax: 6,
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
      image: "images/citation-exterior.jpg"
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
      id: "ORD-8492",
      flightNum: "FGG-702",
      dateTime: "28.09.2026 11:30 UTC",
      route: "LJU → BER → NCE",
      routeCities: "Любляна (LJU) → Берлин (BER) → Ницца (NCE)",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      pax: 6,
      price: 38500,
      status: "pending",
      statusLabel: "Требует подтверждения",
      slaMinutesLeft: 18,
      client: "FlightAero VIP Corporate",
      flightHours: "3 ч 40 мин",
      breakdown: [
        { label: "Коммерческий летный час (3.7 ч)", amount: "€27 500" },
        { label: "Наземное обслуживание в BER", amount: "€2 200" },
        { label: "Наземное обслуживание в NCE", amount: "€2 400" },
        { label: "Кейтеринг VIP (6 PAX)", amount: "€1 200" },
        { label: "Сборы аэронавигации (Eurocontrol)", amount: "€5 200" }
      ]
    },
    {
      id: "ORD-8488",
      flightNum: "FGG-690",
      dateTime: "02.10.2026 14:00 UTC",
      route: "VKO → DXB",
      routeCities: "Москва (VKO) → Дубай (DXB, Al Maktoum)",
      plane: "Gulfstream G550 (RA-10222)",
      pax: 8,
      price: 118400,
      status: "confirmed",
      statusLabel: "Подтвержден",
      slaMinutesLeft: null,
      client: "Emirates Private Charter Ltd.",
      flightHours: "5 ч 20 мин",
      breakdown: [
        { label: "Коммерческий летный час (5.3 ч)", amount: "€95 400" },
        { label: "Handling Al Maktoum (DWC)", amount: "€6 500" },
        { label: "Overnight & Crew Per Diem", amount: "€3 800" },
        { label: "VIP Catering & Champagne", amount: "€2 700" },
        { label: "Eurocontrol & Overflight permits", amount: "€10 000" }
      ]
    },
    {
      id: "ORD-8472",
      flightNum: "FGG-654",
      dateTime: "22.09.2026 19:15 UTC",
      route: "GVA → LTN",
      routeCities: "Женева (GVA) → Лондон (LTN, Luton)",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      pax: 4,
      price: 16200,
      status: "in_flight",
      statusLabel: "В полете",
      slaMinutesLeft: null,
      client: "Geneva Finance Advisory",
      flightHours: "1 ч 35 мин",
      breakdown: [
        { label: "Коммерческий летный час (1.6 ч)", amount: "€11 500" },
        { label: "Handling London Luton", amount: "€2 100" },
        { label: "Passenger Service Fee (4 PAX)", amount: "€600" },
        { label: "Eurocontrol navigation", amount: "€2 000" }
      ]
    },
    {
      id: "ORD-8460",
      flightNum: "FGG-610",
      dateTime: "15.09.2026 10:00 UTC",
      route: "FCO → IST",
      routeCities: "Рим (FCO) → Стамбул (IST)",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      pax: 5,
      price: 24000,
      status: "completed",
      statusLabel: "Завершен",
      slaMinutesLeft: null,
      client: "Mediterranean Holding Group",
      flightHours: "2 ч 25 мин",
      breakdown: [
        { label: "Коммерческий летный час (2.4 ч)", amount: "€18 000" },
        { label: "Handling Istanbul Airport", amount: "€2 500" },
        { label: "De-icing reservation", amount: "€1 500" },
        { label: "Eurocontrol", amount: "€2 000" }
      ]
    },
    {
      id: "ORD-8451",
      flightNum: "FGG-590",
      dateTime: "12.09.2026 08:30 UTC",
      route: "MUC → OLB",
      routeCities: "Мюнхен (MUC) → Ольбия (OLB)",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      pax: 7,
      price: 21500,
      status: "rejected",
      statusLabel: "Отклонен",
      slaMinutesLeft: null,
      client: "Bavaria Auto VIP",
      flightHours: "1 ч 45 мин",
      breakdown: [
        { label: "Причина отклонения", amount: "Внеплановое ТО борта (AOG)" }
      ]
    }
  ],
  scheduleSlots: [
    {
      id: "slot-1",
      dateRange: "22.09.2026",
      time: "19:15 UTC",
      title: "22.09.2026 · GVA → LTN (FGG-654)",
      subtitle: "Cessna Citation XLS+ · 4 пассажира · Рейс FGG",
      type: "fgg",
      statusText: "В полете"
    },
    {
      id: "slot-2",
      dateRange: "24.09.2026",
      time: "08:00 - 18:00 UTC",
      title: "24.09.2026 · Плановый осмотр двигателей (A-Check)",
      subtitle: "Базовый ангар Любляна (LJU) · Техническое обслуживание",
      type: "maintenance",
      statusText: "Тех. обслуживание"
    },
    {
      id: "slot-3",
      dateRange: "28.09.2026",
      time: "11:30 UTC",
      title: "28.09.2026 · LJU → BER → NCE (FGG-702)",
      subtitle: "Cessna Citation XLS+ · 6 пассажиров · Рейс FGG",
      type: "fgg",
      statusText: "Ожидает подтверждения"
    },
    {
      id: "slot-4",
      dateRange: "02.10.2026",
      time: "14:00 UTC",
      title: "02.10.2026 · VKO → DXB (Чартер владельца)",
      subtitle: "Gulfstream G550 · 8 пассажиров · Собственный рейс",
      type: "owner",
      statusText: "Забронирован"
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
      topbarAction.innerHTML = `<button class="btn-primary" onclick="openCreateEmptyLegView()">+ Добавить Empty leg</button>`;
      topbarAction.style.display = "block";
    } else if (screenId === "fleet") {
      topbarAction.innerHTML = `<button class="btn-primary" onclick="navigateTo('plane-card')">+ Добавить борт</button>`;
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
  } else if (screenId === "schedule") {
    renderScheduleList();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// SANDBOX: TRIP TYPE & REALISTIC ENGINE
// ==========================================

function setSandboxTripType(tripType) {
  appState.sandboxTripType = tripType;

  // Toggle active tab buttons
  const tabs = document.querySelectorAll("#sandboxTripTypeTabs .tab-btn");
  tabs.forEach(btn => {
    if (btn.getAttribute("data-trip") === tripType) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const legsContainer = document.getElementById("flightLegsList");
  const addLegWrap = document.getElementById("addLegButtonWrap");

  if (tripType === "oneway") {
    if (addLegWrap) addLegWrap.style.display = "none";
    legsContainer.innerHTML = `
      <div class="flight-leg-row" data-leg="1">
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Юлемисте, TLL, Таллин, Эстония" placeholder="Вылет">
        </div>
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Бранденбург, BER, Берлин, Германия" placeholder="Прилет">
        </div>
        <div class="form-group" style="width: 140px;">
          <input type="date" class="form-control" value="2026-11-07">
        </div>
        <div class="form-group" style="width: 100px;">
          <input type="time" class="form-control" value="16:30">
        </div>
        <div class="counter-input">
          <button type="button" class="counter-btn" onclick="changePax(this, -1)">-</button>
          <span class="counter-value">${appState.sandboxPax} пассажиров</span>
          <button type="button" class="counter-btn" onclick="changePax(this, 1)">+</button>
        </div>
      </div>
    `;
  } else if (tripType === "roundtrip") {
    if (addLegWrap) addLegWrap.style.display = "none";
    legsContainer.innerHTML = `
      <div class="flight-leg-row" data-leg="1">
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Юлемисте, TLL, Таллин, Эстония" placeholder="Вылет">
        </div>
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Бранденбург, BER, Берлин, Германия" placeholder="Прилет">
        </div>
        <div class="form-group" style="width: 140px;">
          <input type="date" class="form-control" value="2026-11-07">
        </div>
        <div class="form-group" style="width: 100px;">
          <input type="time" class="form-control" value="16:30">
        </div>
        <div class="counter-input">
          <button type="button" class="counter-btn" onclick="changePax(this, -1)">-</button>
          <span class="counter-value">${appState.sandboxPax} пассажиров</span>
          <button type="button" class="counter-btn" onclick="changePax(this, 1)">+</button>
        </div>
      </div>
      <div class="flight-leg-row" data-leg="2">
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Бранденбург, BER, Берлин, Германия" placeholder="Вылет">
        </div>
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Юлемисте, TLL, Таллин, Эстония" placeholder="Прилет">
        </div>
        <div class="form-group" style="width: 140px;">
          <input type="date" class="form-control" value="2026-11-10">
        </div>
        <div class="form-group" style="width: 100px;">
          <input type="time" class="form-control" value="12:15">
        </div>
        <div class="counter-input">
          <button type="button" class="counter-btn" onclick="changePax(this, -1)">-</button>
          <span class="counter-value">${appState.sandboxPax} пассажиров</span>
          <button type="button" class="counter-btn" onclick="changePax(this, 1)">+</button>
        </div>
      </div>
    `;
  } else {
    // Multi-leg
    if (addLegWrap) addLegWrap.style.display = "block";
    legsContainer.innerHTML = `
      <div class="flight-leg-row" data-leg="1">
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Юлемисте, TLL, Таллин, Эстония" placeholder="Вылет">
        </div>
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Бранденбург, BER, Берлин, Германия" placeholder="Прилет">
        </div>
        <div class="form-group" style="width: 140px;">
          <input type="date" class="form-control" value="2026-11-07">
        </div>
        <div class="form-group" style="width: 100px;">
          <input type="time" class="form-control" value="16:30">
        </div>
        <div class="counter-input">
          <button type="button" class="counter-btn" onclick="changePax(this, -1)">-</button>
          <span class="counter-value">${appState.sandboxPax} пассажиров</span>
          <button type="button" class="counter-btn" onclick="changePax(this, 1)">+</button>
        </div>
      </div>
      <div class="flight-leg-row" data-leg="2">
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Бранденбург, BER, Берлин, Германия" placeholder="Вылет">
        </div>
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Лазурный Берег, NCE, Ницца, Франция" placeholder="Прилет">
        </div>
        <div class="form-group" style="width: 140px;">
          <input type="date" class="form-control" value="2026-11-10">
        </div>
        <div class="form-group" style="width: 100px;">
          <input type="time" class="form-control" value="12:15">
        </div>
        <div class="counter-input">
          <button type="button" class="counter-btn" onclick="changePax(this, -1)">-</button>
          <span class="counter-value">${appState.sandboxPax} пассажиров</span>
          <button type="button" class="counter-btn" onclick="changePax(this, 1)">+</button>
        </div>
        <button type="button" class="btn-remove-leg" onclick="this.closest('.flight-leg-row').remove(); recalculateSandbox();">×</button>
      </div>
      <div class="flight-leg-row" data-leg="3">
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Лазурный Берег, NCE, Ницца, Франция" placeholder="Вылет">
        </div>
        <div class="form-group" style="flex: 2;">
          <input type="text" class="form-control" value="Юлемисте, TLL, Таллин, Эстония" placeholder="Прилет">
        </div>
        <div class="form-group" style="width: 140px;">
          <input type="date" class="form-control" value="2026-11-14">
        </div>
        <div class="form-group" style="width: 100px;">
          <input type="time" class="form-control" value="18:40">
        </div>
        <div class="counter-input">
          <button type="button" class="counter-btn" onclick="changePax(this, -1)">-</button>
          <span class="counter-value">${appState.sandboxPax} пассажиров</span>
          <button type="button" class="counter-btn" onclick="changePax(this, 1)">+</button>
        </div>
        <button type="button" class="btn-remove-leg" onclick="this.closest('.flight-leg-row').remove(); recalculateSandbox();">×</button>
      </div>
    `;
  }

  recalculateSandbox();
}

function recalculateSandbox() {
  const isDraft = appState.sandboxSettingsVersion === "draft";
  const trip = appState.sandboxTripType;
  
  let priceStr = "€71 450";
  let flightHoursStr = "6 ч 15 мин";
  let distanceStr = "3 850 км";
  let routeDesc = "TLL → BER → NCE → TLL (3 плеча)";
  let breakdown = [];

  if (trip === "oneway") {
    priceStr = isDraft ? "€18 400" : "€17 800";
    flightHoursStr = "1 ч 45 мин";
    distanceStr = "1 040 км";
    routeDesc = "TLL → BER (1 плечо)";
    breakdown = [
      { label: `Ferry-подлет: LJU → TLL (базирование)`, val: isDraft ? "€5 800" : "€5 500" },
      { label: `Коммерческий летный час TLL → BER (1.75 ч)`, val: isDraft ? "€7 500" : "€7 000" },
      { label: `Аэропортовые сборы BER (Бранденбург)`, val: "€2 200" },
      { label: `VIP-кейтеринг (${appState.sandboxPax} PAX)`, val: "€1 200" },
      { label: `Аэронавигация (Eurocontrol)`, val: "€1 700" }
    ];
  } else if (trip === "roundtrip") {
    priceStr = isDraft ? "€35 200" : "€33 900";
    flightHoursStr = "3 ч 30 мин";
    distanceStr = "2 080 км";
    routeDesc = "TLL ⇄ BER (туда и обратно)";
    breakdown = [
      { label: `Ferry-подлет: LJU → TLL (базирование)`, val: isDraft ? "€5 800" : "€5 500" },
      { label: `Коммерческие летные часы (3.5 ч)`, val: isDraft ? "€26 250" : "€24 500" },
      { label: `Стоянка в BER (3 суток) и хэндлинг`, val: "€2 950" },
      { label: `VIP-кейтеринг (${appState.sandboxPax} PAX, 2 рейса)`, val: "€2 400" },
      { label: `Аэронавигация (Eurocontrol)`, val: "€3 400" }
    ];
  } else {
    // Multi-leg
    priceStr = isDraft ? "€71 450" : "€69 000";
    flightHoursStr = "6 ч 15 мин";
    distanceStr = "3 850 км";
    routeDesc = "TLL → BER → NCE → TLL (3 плеча)";
    breakdown = [
      { label: `Ferry-подлет: LJU → TLL`, val: isDraft ? "€5 800" : "€5 500" },
      { label: `Коммерческие летные часы (6.25 ч)`, val: isDraft ? "€46 875" : "€43 750" },
      { label: `Handling в Ницце (NCE, спецсбор)`, val: isDraft ? "€2 400" : "€2 200" },
      { label: `Стоянки и суточные экипажа (4 дня)`, val: "€4 800" },
      { label: `VIP-кейтеринг (${appState.sandboxPax} PAX)`, val: "€3 600" },
      { label: `Аэронавигация (Eurocontrol)`, val: "€7 975" }
    ];
  }

  const priceDisplay = document.getElementById("sandboxTotalPrice");
  const finalBottomPrice = document.getElementById("finalBottomPrice");
  const flightHoursEl = document.getElementById("sandboxFlightHours");
  const distanceEl = document.getElementById("sandboxDistance");
  const routeDescEl = document.getElementById("sandboxRouteDesc");
  const breakdownListEl = document.getElementById("sandboxBreakdownList");

  if (priceDisplay) priceDisplay.textContent = priceStr;
  if (finalBottomPrice) finalBottomPrice.textContent = priceStr;
  if (flightHoursEl) flightHoursEl.textContent = flightHoursStr;
  if (distanceEl) distanceEl.textContent = distanceStr;
  if (routeDescEl) routeDescEl.textContent = routeDesc;

  if (breakdownListEl) {
    breakdownListEl.innerHTML = breakdown.map(item => `
      <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">
        <span>${item.label}</span>
        <span style="font-weight: 700; color: var(--text-main);">${item.val}</span>
      </div>
    `).join("");
  }
}

function setSandboxSettingsVersion(ver) {
  appState.sandboxSettingsVersion = ver;
  const btnDraft = document.getElementById("btnSandboxDraft");
  const btnPub = document.getElementById("btnSandboxPublished");
  const hint = document.getElementById("sandboxVersionHint");

  if (ver === "draft") {
    if (btnDraft) btnDraft.classList.add("active");
    if (btnPub) btnPub.classList.remove("active");
    if (hint) hint.textContent = "Используются черновые настройки тарифов борта (v13)";
    showToast("В расчет подставлены параметры из Черновика (v13)", "info");
  } else {
    if (btnDraft) btnDraft.classList.remove("active");
    if (btnPub) btnPub.classList.add("active");
    if (hint) hint.textContent = "Используются опубликованные действующие настройки (v12)";
    showToast("В расчет подставлены действующие опубликованные тарифы (v12)", "info");
  }

  recalculateSandbox();
}

function changePax(btn, delta) {
  appState.sandboxPax = Math.max(1, Math.min(12, appState.sandboxPax + delta));
  document.querySelectorAll(".counter-value").forEach(span => {
    span.textContent = `${appState.sandboxPax} пассажиров`;
  });
  recalculateSandbox();
}

function addFlightLeg() {
  const container = document.getElementById("flightLegsList");
  if (!container) return;
  const legNum = container.children.length + 1;
  const row = document.createElement("div");
  row.className = "flight-leg-row";
  row.dataset.leg = legNum;
  row.innerHTML = `
    <div class="form-group" style="flex: 2;">
      <input type="text" class="form-control" value="Юлемисте, TLL, Таллин, Эстония" placeholder="Вылет">
    </div>
    <div class="form-group" style="flex: 2;">
      <input type="text" class="form-control" value="Лазурный Берег, NCE, Ницца, Франция" placeholder="Прилет">
    </div>
    <div class="form-group" style="width: 140px;">
      <input type="date" class="form-control" value="2026-11-18">
    </div>
    <div class="form-group" style="width: 100px;">
      <input type="time" class="form-control" value="14:00">
    </div>
    <div class="counter-input">
      <button type="button" class="counter-btn" onclick="changePax(this, -1)">-</button>
      <span class="counter-value">${appState.sandboxPax} пассажиров</span>
      <button type="button" class="counter-btn" onclick="changePax(this, 1)">+</button>
    </div>
    <button type="button" class="btn-remove-leg" onclick="this.closest('.flight-leg-row').remove(); recalculateSandbox();">×</button>
  `;
  container.appendChild(row);
  recalculateSandbox();
}

function clearSandboxForm() {
  setSandboxTripType("multi");
  showToast("Форма расчета очищена к исходным значениям", "info");
}

function setSandboxLocationMode(mode) {
  appState.sandboxLocationMode = mode;
  const airportGroup = document.getElementById("sandboxAirportGroup");
  if (airportGroup) {
    airportGroup.style.display = mode === "manual" ? "block" : "none";
  }
}

// ==========================================
// ORDERS (ЗАЯВКИ): STRICT CORPORATE & MODAL
// ==========================================

function renderOrders() {
  const container = document.getElementById("ordersTableBody");
  if (!container) return;

  container.innerHTML = appState.orders.map(order => {
    const isPending = order.status === "pending";
    
    // Strict corporate status pill (no rainbow neon traffic lights)
    let badgeClass = "badge-strict-neutral";
    if (order.status === "pending") badgeClass = "badge-strict-primary";
    if (order.status === "in_flight") badgeClass = "badge-strict-active";

    return `
      <tr style="cursor: pointer;" onclick="openOrderDetailModal('${order.id}')">
        <td>
          <div style="font-weight: 700; color: var(--text-main); font-size: 14px;">${order.id}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${order.flightNum}</div>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--text-main);">${order.route}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${order.routeCities}</div>
        </td>
        <td style="font-size: 13px; color: var(--text-secondary);">${order.plane}</td>
        <td style="font-size: 13px;">${order.dateTime} · ${order.pax} PAX</td>
        <td style="font-weight: 700; color: var(--primary); font-size: 14px;">€${order.price.toLocaleString("ru-RU")}</td>
        <td>
          <span class="${badgeClass}">${order.statusLabel}</span>
          ${order.slaMinutesLeft ? `<div style="font-size: 11px; color: var(--primary); font-weight: 700; margin-top: 4px;">SLA: ${order.slaMinutesLeft} мин осталось</div>` : ""}
        </td>
        <td style="text-align: right;" onclick="event.stopPropagation();">
          ${isPending ? `
            <div style="display: flex; gap: 6px; justify-content: flex-end;">
              <button class="btn-primary btn-sm" onclick="confirmOrderAction('${order.id}')">Подтвердить</button>
              <button class="btn-secondary btn-sm" onclick="openOrderDetailModal('${order.id}')">Изменить цену</button>
              <button class="btn-secondary btn-sm" onclick="rejectOrderAction('${order.id}')" style="color: var(--danger);">Отклонить</button>
            </div>
          ` : `
            <button class="btn-secondary btn-sm" onclick="openOrderDetailModal('${order.id}')">Подробнее</button>
          `}
        </td>
      </tr>
    `;
  }).join("");
}

function openOrderDetailModal(orderId) {
  const order = appState.orders.find(o => o.id === orderId) || appState.orders[0];
  
  document.getElementById("modalOrderTitle").textContent = `Заявка на рейс ${order.id} (${order.flightNum})`;
  document.getElementById("modalOrderRoute").textContent = order.routeCities;
  document.getElementById("modalOrderPlane").textContent = order.plane;
  document.getElementById("modalOrderDateTime").textContent = order.dateTime;
  document.getElementById("modalOrderPax").textContent = `${order.pax} пассажиров (VIP обслуживание)`;
  document.getElementById("modalOrderPrice").textContent = `€${order.price.toLocaleString("ru-RU")}`;
  document.getElementById("modalOrderClient").textContent = order.client || "FlightAero VIP Corporate";
  document.getElementById("modalOrderFlightHours").textContent = order.flightHours || "2 ч 40 мин";
  
  const statusEl = document.getElementById("modalOrderStatus");
  if (statusEl) {
    statusEl.textContent = order.statusLabel;
    statusEl.className = order.status === "pending" ? "badge-strict-primary" : "badge-strict-neutral";
  }

  const breakdownContainer = document.getElementById("modalOrderBreakdown");
  if (breakdownContainer) {
    breakdownContainer.innerHTML = (order.breakdown || []).map(b => `
      <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-secondary); padding: 6px 0; border-bottom: 1px solid var(--border-light);">
        <span>${b.label}</span>
        <span style="font-weight: 700; color: var(--text-main);">${b.amount}</span>
      </div>
    `).join("");
  }

  const actionsContainer = document.getElementById("modalOrderActions");
  if (actionsContainer) {
    if (order.status === "pending") {
      actionsContainer.innerHTML = `
        <button class="btn-secondary" onclick="rejectOrderAction('${order.id}')" style="color: var(--danger); border-color: var(--border-light);">Отклонить заявку</button>
        <button class="btn-secondary" onclick="openModifyPriceForm('${order.id}')">Предложить свою цену</button>
        <button class="btn-primary" onclick="confirmOrderAction('${order.id}')">Подтвердить рейс</button>
      `;
    } else {
      actionsContainer.innerHTML = `
        <button class="btn-secondary" onclick="closeModal('modalOrderDetail')">Закрыть</button>
      `;
    }
  }

  document.getElementById("modalOrderDetail").classList.add("active");
}

function confirmOrderAction(orderId) {
  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    order.status = "confirmed";
    order.statusLabel = "Подтвержден";
    order.slaMinutesLeft = null;
  }
  closeModal("modalOrderDetail");
  renderOrders();
  showToast(`Заказ ${orderId} успешно подтвержден! Слот вылета забронирован.`, "success");
}

function openModifyPriceForm(orderId) {
  const newPrice = prompt("Укажите новую расчетную стоимость для FGG, €:", "41200");
  if (newPrice) {
    const order = appState.orders.find(o => o.id === orderId);
    if (order) {
      order.price = parseInt(newPrice) || order.price;
      order.statusLabel = "На согласовании FGG";
    }
    closeModal("modalOrderDetail");
    renderOrders();
    showToast(`Встречное ценовое предложение €${newPrice} отправлено координаторам FGG`, "info");
  }
}

function rejectOrderAction(orderId) {
  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    order.status = "rejected";
    order.statusLabel = "Отклонен";
    order.slaMinutesLeft = null;
  }
  closeModal("modalOrderDetail");
  renderOrders();
  showToast(`Заявка ${orderId} отклонена с фиксацией в журнале координации`, "info");
}

// ==========================================
// EMPTY LEGS: CLEAN TABLE & DETAIL CARD
// ==========================================

function renderEmptyLegsTable() {
  const tbody = document.getElementById("emptyLegsTableBody");
  if (!tbody) return;

  tbody.innerHTML = appState.emptyLegs.map(el => {
    const isActive = el.status === "Активный";
    const statusColor = isActive ? "var(--primary)" : "var(--text-muted)";
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

  const titleId = document.getElementById("elViewTitleId");
  if (titleId) titleId.textContent = el.id;

  const heroImg = document.getElementById("elViewHeroImg");
  if (heroImg) heroImg.src = el.image || "images/g550-cabin.jpg";

  const setField = (id, val) => {
    const elDom = document.getElementById(id);
    if (elDom) elDom.textContent = val;
  };

  setField("elViewOrigin", el.origin);
  setField("elViewDestination", el.destination);
  setField("elViewDateTime", el.dateTime);
  setField("elViewPlane", el.planeModel);
  setField("elViewTail", el.tailNumber);
  setField("elViewCurrency", el.currency);
  setField("elViewPax", el.pax);
  setField("elViewPrice", el.price.toLocaleString("ru-RU"));
  setField("elViewActiveUntil", el.activeUntil);
  setField("elViewPriority", el.priority);

  const statusEl = document.getElementById("elViewStatus");
  if (statusEl) {
    statusEl.textContent = el.status;
    statusEl.style.color = el.status === "Активный" ? "var(--primary)" : "var(--text-muted)";
  }

  const viewMode = document.getElementById("elViewModeContainer");
  const editMode = document.getElementById("elEditModeContainer");
  if (viewMode) viewMode.style.display = "block";
  if (editMode) editMode.style.display = "none";

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

  const setVal = (id, val) => {
    const elDom = document.getElementById(id);
    if (elDom) elDom.value = val;
  };

  setVal("elEditOrigin", el.origin);
  setVal("elEditDestination", el.destination);
  setVal("elEditDateTime", el.dateTime);
  setVal("elEditPlane", el.planeModel);
  setVal("elEditTail", el.tailNumber);
  setVal("elEditCurrency", el.currency);
  setVal("elEditPax", el.pax);
  setVal("elEditPrice", el.price);
  setVal("elEditStatus", el.status);
  setVal("elEditActiveUntil", el.activeUntil);
  setVal("elEditPriority", el.priority);

  const viewMode = document.getElementById("elViewModeContainer");
  const editMode = document.getElementById("elEditModeContainer");
  if (viewMode) viewMode.style.display = "none";
  if (editMode) editMode.style.display = "block";
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

// ==========================================
// CALENDAR (КАЛЕНДАРЬ ЗАНЯТОСТИ): STRICT
// ==========================================

function renderScheduleList() {
  const container = document.getElementById("scheduleSlotsList");
  if (!container) return;

  container.innerHTML = appState.scheduleSlots.map(slot => {
    let borderColor = "var(--primary)";
    if (slot.type === "maintenance") borderColor = "#94A3B8";
    if (slot.type === "owner") borderColor = "#475569";

    return `
      <div style="background: #FFFFFF; padding: 14px 18px; border-radius: 8px; border-left: 4px solid ${borderColor}; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm); border: 1px solid var(--border-light); border-left-width: 4px;">
        <div>
          <div style="font-weight: 700; color: var(--text-main); font-size: 14px;">${slot.title}</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">${slot.subtitle}</div>
        </div>
        <span class="badge-strict-neutral">${slot.statusText}</span>
      </div>
    `;
  }).join("");
}

function handleBlockSchedule(event) {
  event.preventDefault();
  const plane = document.getElementById("schedPlaneSelect").value;
  const type = document.getElementById("schedTypeSelect").value;
  const location = document.getElementById("schedLocationInput").value || "LJU, Базовый ангар";
  const startDate = document.getElementById("schedStartDate").value;
  const startTime = document.getElementById("schedStartTime").value;
  const endDate = document.getElementById("schedEndDate").value;
  const endTime = document.getElementById("schedEndTime").value;
  const note = document.getElementById("schedNoteInput").value || "Блокировка периода";

  if (!startDate || !endDate) {
    showToast("Укажите даты начала и окончания периода", "error");
    return;
  }

  let typeName = "Техническое обслуживание";
  let statusText = "Тех. обслуживание";
  if (type === "owner") {
    typeName = "Собственный рейс";
    statusText = "Забронирован";
  } else if (type === "crew_rest") {
    typeName = "Санитарный отдых экипажа";
    statusText = "Отдых экипажа";
  }

  const newSlot = {
    id: `slot-${Date.now()}`,
    dateRange: `${startDate} - ${endDate}`,
    time: `${startTime} - ${endTime} UTC`,
    title: `${startDate} · ${note}`,
    subtitle: `${plane} · ${location} · ${typeName}`,
    type: type,
    statusText: statusText
  };

  appState.scheduleSlots.unshift(newSlot);
  renderScheduleList();
  showToast("Период занятости успешно заблокирован!", "success");
  document.getElementById("blockScheduleForm").reset();
}

// ==========================================
// FAQ MODAL & READER
// ==========================================

function openFaqModal(articleId) {
  const article = appState.faqArticles[articleId] || appState.faqArticles["1"];
  document.getElementById("faqModalTitle").textContent = article.title;
  document.getElementById("faqModalDesc").textContent = article.desc;
  document.getElementById("faqModalContent").innerHTML = article.content;
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
  document.getElementById("modalFaqDetail").classList.add("active");
}

// ==========================================
// PROFILE: PASSWORD CHANGE & LOGOUT
// ==========================================

function handleChangePassword(event) {
  event.preventDefault();
  const curr = document.getElementById("currentPasswordInput").value;
  const p1 = document.getElementById("newPasswordInput").value;
  const p2 = document.getElementById("confirmPasswordInput").value;

  if (!curr) {
    showToast("Введите текущий пароль", "error");
    return;
  }
  if (!p1 || p1.length < 8) {
    showToast("Новый пароль должен содержать не менее 8 символов", "error");
    return;
  }
  if (p1 !== p2) {
    showToast("Новые пароли не совпадают", "error");
    return;
  }

  document.getElementById("changePasswordForm").reset();
  showToast("Пароль успешно изменен!", "success");
}

function logout() {
  const authModal = document.getElementById("authModalScreen");
  if (authModal) {
    authModal.style.display = "flex";
  }
  showToast("Вы вышли из кабинета оператора", "info");
}

function handleLoginStep1(event) {
  event.preventDefault();
  document.getElementById("authStep1").style.display = "none";
  document.getElementById("authStep2").style.display = "block";
}

function handleLoginStep2(event) {
  event.preventDefault();
  const authModal = document.getElementById("authModalScreen");
  if (authModal) authModal.style.display = "none";
  showToast("Добро пожаловать в кабинет оператора FGG!", "success");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

// ==========================================
// PLANE CARD & MAP LOGIC
// ==========================================

function toggleAccordion(header) {
  const body = header.nextElementSibling;
  header.classList.toggle("open");
  body.classList.toggle("open");
}

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
      noteBanner.innerHTML = `<svg class="informer-icon" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div><strong>Внимание: Вы редактируете Черновик v13.</strong> Эти изменения еще не проверены FGG. Клиенты видят расчеты по версии v12.</div>`;
      noteBanner.className = "informer-box warning";
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
  const statusPill = document.getElementById("planeStatusPill");
  if (statusPill) {
    statusPill.textContent = "На модерации FGG";
    statusPill.className = "status-pill warning";
  }
  showToast("Пакет изменений отправлен координатору FGG на утверждение", "success");
}

let jvmMapInstance = null;
function initPlaneCardMap() {
  const mapElement = document.getElementById("mapContainer");
  if (!mapElement || typeof jsVectorMap === "undefined") return;
  if (jvmMapInstance) return;

  try {
    jvmMapInstance = new jsVectorMap({
      selector: "#mapContainer",
      map: "world",
      zoomButtons: true,
      zoomOnScroll: false,
      regionsSelectable: true,
      regionsSelectableOne: false,
      selectedRegions: appState.selectedCountries,
      regionStyle: {
        initial: {
          fill: "#E2E8F0",
          fillOpacity: 1,
          stroke: "#FFFFFF",
          strokeWidth: 0.5,
          strokeOpacity: 1
        },
        hover: {
          fillOpacity: 0.8,
          cursor: "pointer"
        },
        selected: {
          fill: "#1E599F"
        },
        selectedHover: {
          fill: "#16467F"
        }
      },
      onRegionSelected: function (index, isSelected, selectedRegions) {
        appState.selectedCountries = selectedRegions;
        updateSelectedCountriesUI();
      }
    });
    updateSelectedCountriesUI();
  } catch (e) {
    console.warn("Map init note:", e);
  }
}

function updateSelectedCountriesUI() {
  const countEl = document.getElementById("selectedCountriesCount");
  const chipsContainer = document.getElementById("selectedCountriesChips");
  if (countEl) countEl.textContent = appState.selectedCountries.length;
  if (!chipsContainer) return;

  const countryNames = {
    "EE": "Эстония", "DE": "Германия", "FR": "Франция", "IT": "Италия",
    "ES": "Испания", "AT": "Австрия", "CH": "Швейцария", "GB": "Великобритания",
    "NL": "Нидерланды", "BE": "Бельгия", "PT": "Португалия", "US": "США", "CA": "Канада"
  };

  chipsContainer.innerHTML = appState.selectedCountries.slice(0, 16).map(code => {
    const name = countryNames[code] || code;
    return `
      <div class="country-chip">
        <span>${name}</span>
        <span class="remove-chip" onclick="removeCountry('${code}')">×</span>
      </div>
    `;
  }).join("") + (appState.selectedCountries.length > 16 ? `<div class="country-chip">+${appState.selectedCountries.length - 16} других</div>` : "");
}

function removeCountry(code) {
  appState.selectedCountries = appState.selectedCountries.filter(c => c !== code);
  if (jvmMapInstance) {
    jvmMapInstance.clearSelectedRegions();
    jvmMapInstance.setSelectedRegions(appState.selectedCountries);
  }
  updateSelectedCountriesUI();
}

function applyCountryPreset(presetName) {
  if (presetName === "schengen") {
    appState.selectedCountries = ["AT","BE","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IT","LV","LI","LT","LU","MT","NL","NO","PL","PT","SK","SI","ES","SE","CH"];
    showToast("Применен пресет: Страны Шенгенской зоны (26 стран)", "info");
  } else if (presetName === "cis") {
    appState.selectedCountries = ["RU", "BY", "KZ", "AM", "AZ", "KG", "TJ", "UZ"];
    showToast("Применен пресет: СНГ и ЕАЭС", "info");
  } else if (presetName === "middle_east") {
    appState.selectedCountries = ["AE", "SA", "QA", "OM", "KW", "BH", "TR", "EG"];
    showToast("Применен пресет: Ближний Восток", "info");
  } else if (presetName === "all") {
    appState.selectedCountries = Object.keys(jvmMapInstance ? jvmMapInstance._mapData.paths : {});
    showToast("Выбраны все страны мира", "info");
  } else if (presetName === "clear") {
    appState.selectedCountries = [];
    showToast("Список географии очищен", "info");
  }

  if (jvmMapInstance) {
    jvmMapInstance.clearSelectedRegions();
    jvmMapInstance.setSelectedRegions(appState.selectedCountries);
  }
  updateSelectedCountriesUI();
}

// Initial bootstrap
document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
  renderEmptyLegsTable();
  renderScheduleList();
  recalculateSandbox();

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
