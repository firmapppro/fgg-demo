// FGG Operator Cabinet - Interactive Application Logic

const appState = {
  selectedEmptyLegId: "197",
  selectedEmptyLegId: "el-1",
  selectedDrawerEmptyLegId: "el-1",
  isEditingEmptyLeg: false,
  emptyLegsTab: "all",
  emptyLegsSearch: "",
  emptyLegs: [
    {
      id: "el-1",
      origin: "LJU, Любляна, Словения",
      destination: "LFMN, Ницца, Франция",
      dateTime: "28.09.2026, 14:00",
      activeUntil: "28.09.2026, 10:00",
      price: 6500,
      currency: "Евро",
      status: "Доступен",
      planeModel: "Cessna Citation XLS+",
      tailNumber: "S5-BBM",
      pax: 8,
      priority: "Обычный",
      image: "images/citation-exterior.jpg"
    },
    {
      id: "el-2",
      origin: "UUWW, Внуково, Москва, Россия",
      destination: "OMDB, Дубай, ОАЭ",
      dateTime: "30.09.2026, 11:30",
      activeUntil: "29.09.2026, 18:00",
      price: 24000,
      currency: "Евро",
      status: "Доступен",
      planeModel: "Gulfstream G550",
      tailNumber: "RA-10222",
      pax: 14,
      priority: "Срочный",
      image: "images/g550-exterior.jpg"
    },
    {
      id: "el-3",
      origin: "EETN, Таллин, Эстония",
      destination: "EDDB, Берлин, Германия",
      dateTime: "02.10.2026, 09:15",
      activeUntil: "01.10.2026, 12:00",
      price: 4200,
      currency: "Евро",
      status: "Доступен",
      planeModel: "Embraer Phenom 300",
      tailNumber: "9H-VCA",
      pax: 6,
      priority: "Обычный",
      image: "images/fleet-small.jpg"
    },
    {
      id: "el-4",
      origin: "EGGW, Лутон, Лондон, Великобритания",
      destination: "LSZH, Цюрих, Швейцария",
      dateTime: "05.10.2026, 16:00",
      activeUntil: "04.10.2026, 20:00",
      price: 11800,
      currency: "Евро",
      status: "Доступен",
      planeModel: "Challenger 350",
      tailNumber: "OE-HOO",
      pax: 8,
      priority: "Обычный",
      image: "images/fleet-large.jpg"
    },
    {
      id: "el-5",
      origin: "UWKD, Казань, Россия",
      destination: "UUWW, Внуково, Москва, Россия",
      dateTime: "25.09.2026, 11:00",
      activeUntil: "24.09.2026, 18:00",
      price: 240000,
      currency: "Рубли",
      status: "Выполнен",
      planeModel: "Cessna Citation XLS+",
      tailNumber: "S5-BBM",
      pax: 8,
      priority: "Обычный",
      image: "images/citation-exterior.jpg"
    },
    {
      id: "el-6",
      origin: "UUWW, Внуково, Москва, Россия",
      destination: "UHWW, Владивосток, Россия",
      dateTime: "06.09.2026, 00:05",
      activeUntil: "05.09.2026, 12:00",
      price: 9450000,
      currency: "Рубли",
      status: "Просрочен",
      planeModel: "Gulfstream G550",
      tailNumber: "RA-10222",
      pax: 14,
      priority: "Обычный",
      image: "images/g550-cabin.jpg"
    },
    {
      id: "el-7",
      origin: "LTFM, Стамбул, Турция",
      destination: "OJAM, Амман, Иордания",
      dateTime: "12.09.2026, 12:00",
      activeUntil: "11.09.2026, 18:00",
      price: 14465,
      currency: "Евро",
      status: "Просрочен",
      planeModel: "Embraer Legacy 600",
      tailNumber: "RA-02857",
      pax: 13,
      priority: "Обычный",
      image: "images/citation-xls.jpg"
    },
    {
      id: "el-8",
      origin: "LCPH, Пафос, Кипр",
      destination: "EGBB, Бирмингем, Великобритания",
      dateTime: "21.09.2026, 12:00",
      activeUntil: "20.09.2026, 18:00",
      price: 28000,
      currency: "Евро",
      status: "Выполнен",
      planeModel: "Cessna Citation XLS+",
      tailNumber: "S5-BBM",
      pax: 8,
      priority: "Обычный",
      image: "images/citation-exterior.jpg"
    }
  ],
  currentScreen: "sandbox",
  activePlaneId: "xls-s5bbm",
  planeVersionTab: "draft",
  planeStatus: "active",
  sandboxSettingsVersion: "draft",
  sandboxLocationMode: "manual",
  sandboxAirport: "LJU, Ljubljana",
  sandboxTripType: "multi",
  sandboxPax: 6,
  selectedCountries: ["EE", "DE", "FR", "IT", "ES", "AT", "CH", "GB", "NL", "BE", "PT", "US", "CA"],
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
  scheduledFlights: [
    {
      id: "fl-1",
      plane: "S5-BBM",
      planeModel: "Cessna Citation XLS+",
      type: "Простой перелет",
      depUtc: "02.10.2026 09:30 UTC",
      origin: "LJU, Ljubljana",
      dest: "BER, Berlin",
      arrUtc: "02.10.2026 11:15 UTC",
      pax: 6
    },
    {
      id: "fl-2",
      plane: "S5-BBM",
      planeModel: "Cessna Citation XLS+",
      type: "Перегоночный рейс",
      depUtc: "04.10.2026 14:00 UTC",
      origin: "BER, Berlin",
      dest: "NCE, Nice",
      arrUtc: "04.10.2026 16:10 UTC",
      pax: 0
    },
    {
      id: "fl-3",
      plane: "S5-BBM",
      planeModel: "Cessna Citation XLS+",
      type: "Тех. обслуживание",
      depUtc: "07.10.2026 08:00 UTC",
      origin: "NCE, Nice (A-Check)",
      dest: "—",
      arrUtc: "07.10.2026 18:00 UTC",
      pax: 0
    },
    {
      id: "fl-4",
      plane: "RA-10222",
      planeModel: "Gulfstream G550",
      type: "Простой перелет",
      depUtc: "03.10.2026 12:00 UTC",
      origin: "VKO, Moscow",
      dest: "DXB, Dubai",
      arrUtc: "03.10.2026 17:20 UTC",
      pax: 8
    },
    {
      id: "fl-5",
      plane: "RA-10222",
      planeModel: "Gulfstream G550",
      type: "Перегоночный рейс",
      depUtc: "06.10.2026 10:00 UTC",
      origin: "DXB, Dubai",
      dest: "DOH, Doha",
      arrUtc: "06.10.2026 11:10 UTC",
      pax: 0
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
    targetView.style.display = screenId === "manager" ? "flex" : "block";
  }

  const titles = {
    "orders": "Заявки",
    "fleet": "Борты",
    "plane-card": appState.planeCardMode === "create" ? "Создание борта" : "Редактирование борта",
    "sandbox": "Песочница",
    "emptylegs": "Empty legs",
    "emptylegs-view": "Просмотр Empty leg",
    "emptylegs-create": "Создать Empty legs",
    "manager": "Связаться с менеджером",
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
    if (screenId === "fleet") {
      topbarAction.innerHTML = `<button class="btn-primary" onclick="openPlaneCreate()">+ Добавить борт</button>`;
      topbarAction.style.display = "block";
    } else {
      topbarAction.innerHTML = "";
      topbarAction.style.display = "none";
    }
  }

  if (screenId === "plane-card") {
    setTimeout(() => {
      initPlaneCardMap();
      initInfoPopovers();
    }, 100);
  } else if (screenId === "orders") {
    renderOrders();
  } else if (screenId === "sandbox") {
    setTimeout(() => {
      initInfoPopovers();
    }, 50);
  } else if (screenId === "emptylegs") {
    renderEmptyLegsTable();
  } else if (screenId === "manager") {
    renderChatMessages();
    setTimeout(() => {
      const c = document.getElementById("chatMessages");
      if (c) c.scrollTop = c.scrollHeight;
    }, 50);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// ACCORDIONS & FILTER CONTROLS (FIGMA DS)
// ==========================================

function toggleFilterAccordion(id) {
  const acc = document.getElementById(id);
  if (acc) {
    acc.classList.toggle("open");
  }
}

function applyFleetFilters() {
  const id = (document.getElementById("fleetFilterId")?.value || "").toLowerCase().trim();
  const model = (document.getElementById("fleetFilterModel")?.value || "").toLowerCase().trim();
  const status = (document.getElementById("fleetFilterStatus")?.value || "").toLowerCase().trim();
  const tail = (document.getElementById("fleetFilterTail")?.value || "").toLowerCase().trim();
  const airport = (document.getElementById("fleetFilterAirport")?.value || "").toLowerCase().trim();
  const range = (document.getElementById("fleetFilterRange")?.value || "").toLowerCase().trim();
  const toilet = (document.getElementById("fleetFilterToilet")?.value || "").toLowerCase().trim();
  const seats = (document.getElementById("fleetFilterSeats")?.value || "").toLowerCase().trim();
  const stewardess = (document.getElementById("fleetFilterStewardess")?.value || "").toLowerCase().trim();
  const cabinSize = (document.getElementById("fleetFilterCabinSize")?.value || "").toLowerCase().trim();
  const baggage = (document.getElementById("fleetFilterBaggage")?.value || "").toLowerCase().trim();
  const price = (document.getElementById("fleetFilterPrice")?.value || "").toLowerCase().trim();

  const rows = document.querySelectorAll("#fleetTableBody tr");
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    let show = true;
    if (id && !text.includes(id)) show = false;
    if (model && !text.includes(model)) show = false;
    if (status) {
      if (status === "active" && !text.includes("активен")) show = false;
      else if (status === "inactive" && !text.includes("неактивен")) show = false;
    }
    if (tail && !text.includes(tail)) show = false;
    if (airport && !text.includes(airport)) show = false;
    if (range && !text.includes(range)) show = false;
    if (seats && !text.includes(seats)) show = false;
    if (cabinSize && !text.includes(cabinSize)) show = false;
    if (baggage && !text.includes(baggage)) show = false;
    if (price && !text.includes(price)) show = false;
    row.style.display = show ? "" : "none";
  });
}

function resetFleetFilters() {
  const fieldIds = [
    "fleetFilterId", "fleetFilterModel", "fleetFilterStatus", "fleetFilterTail",
    "fleetFilterAirport", "fleetFilterRange", "fleetFilterToilet", "fleetFilterSeats",
    "fleetFilterStewardess", "fleetFilterCabinSize", "fleetFilterBaggage", "fleetFilterPrice"
  ];
  fieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  applyFleetFilters();
  showToast("Фильтры сброшены", "info");
}

function applyElAdvancedFilters() {
  const origin = (document.getElementById("elFilterOrigin")?.value || "").toLowerCase().trim();
  const dest = (document.getElementById("elFilterDest")?.value || "").toLowerCase().trim();
  const plane = (document.getElementById("elFilterPlane")?.value || "all").toLowerCase().trim();
  const status = (document.getElementById("elFilterStatus")?.value || "all").toLowerCase().trim();

  const rows = document.querySelectorAll("#emptyLegsTableBody tr");
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    let matchesOrigin = !origin || text.includes(origin);
    let matchesDest = !dest || text.includes(dest);
    let matchesPlane = (plane === "all") || text.includes(plane);
    let matchesStatus = (status === "all") || text.includes(status);

    if (matchesOrigin && matchesDest && matchesPlane && matchesStatus) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function resetElAdvancedFilters() {
  const o = document.getElementById("elFilterOrigin");
  const d = document.getElementById("elFilterDest");
  const p = document.getElementById("elFilterPlane");
  const s = document.getElementById("elFilterStatus");
  if (o) o.value = "";
  if (d) d.value = "";
  if (p) p.value = "all";
  if (s) s.value = "all";
  applyElAdvancedFilters();
  showToast("Фильтры Empty legs сброшены", "info");
}

function deletePlaneConfirm() {
  if (confirm("Вы уверены, что хотите удалить этот борт из флота авиакомпании? Это действие необратимо.")) {
    showToast("Борт успешно удален из системы", "warning");
    navigateTo("fleet");
  }
}

function savePlaneChanges() {
  showToast("Изменения характеристик и тарифов борта успешно сохранены", "success");
}

// ==========================================
// SANDBOX: TRIP TYPE & REALISTIC ENGINE (SCREENSHOT 3)
// ==========================================

function createFlightLegRowHtml(legNum, origin, dest, date, time, showDelete) {
  return `
    <div class="sandbox-leg-row" data-leg="${legNum}">
      <div class="leg-input-wrap">
        <svg class="leg-plane-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 19h19M4 14l15-7a2 2 0 0 1 2.6 1.1 2 2 0 0 1-1.1 2.6L12 14v4l-3-2-2 1v-3z"/></svg>
        <input type="text" class="form-control leg-input-field" value="${origin}">
        <button type="button" class="leg-clear-btn" onclick="clearLegInput(this)" title="Очистить">×</button>
      </div>
      <div class="leg-input-wrap">
        <svg class="leg-plane-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 19h19M4 10l15 7a2 2 0 0 0 2.6-1.1 2 2 0 0 0-1.1-2.6L12 10V6l-3 2-2-1v3z"/></svg>
        <input type="text" class="form-control leg-input-field" value="${dest}">
        <button type="button" class="leg-clear-btn" onclick="clearLegInput(this)" title="Очистить">×</button>
      </div>
      <input type="date" class="form-control" value="${date}">
      <input type="time" class="form-control" value="${time}">
      <div class="counter-input">
        <button type="button" class="counter-btn" onclick="changePax(this, -1)">-</button>
        <span class="counter-value">${appState.sandboxPax} PAX</span>
        <button type="button" class="counter-btn" onclick="changePax(this, 1)">+</button>
      </div>
      ${showDelete ? `<button type="button" class="btn-remove-leg" onclick="removeFlightLeg(this)" title="Удалить плечо">×</button>` : `<div style="width: 36px;"></div>`}
    </div>
  `;
}

function setSandboxTripType(tripType) {
  appState.sandboxTripType = tripType;

  // Toggle active radio button & label
  const radios = document.querySelectorAll("input[name='sandboxTripTypeRadio']");
  radios.forEach(r => {
    r.checked = (r.value === tripType);
    const label = r.closest(".sandbox-radio-label");
    if (label) {
      if (r.value === tripType) label.classList.add("active");
      else label.classList.remove("active");
    }
  });

  const legsContainer = document.getElementById("flightLegsList");
  if (!legsContainer) return;

  if (tripType === "oneway") {
    legsContainer.innerHTML = createFlightLegRowHtml(1, "Юлемисте, TLL, Таллин, Эстония", "Бранденбург, BER, Берлин, Германия", "2026-11-07", "16:30", false);
  } else if (tripType === "roundtrip") {
    legsContainer.innerHTML = 
      createFlightLegRowHtml(1, "Юлемисте, TLL, Таллин, Эстония", "Бранденбург, BER, Берлин, Германия", "2026-11-07", "16:30", false) +
      createFlightLegRowHtml(2, "Бранденбург, BER, Берлин, Германия", "Юлемисте, TLL, Таллин, Эстония", "2026-11-10", "12:15", false);
  } else {
    // multi
    legsContainer.innerHTML = 
      createFlightLegRowHtml(1, "Юлемисте, TLL, Таллин, Эстония", "Бранденбург, BER, Берлин, Германия", "2026-11-07", "16:30", false) +
      createFlightLegRowHtml(2, "Бранденбург, BER, Берлин, Германия", "Лазурный Берег, NCE, Ницца, Франция", "2026-11-10", "12:15", true) +
      createFlightLegRowHtml(3, "Лазурный Берег, NCE, Ницца, Франция", "Юлемисте, TLL, Таллин, Эстония", "2026-11-14", "18:40", true);
  }

  recalculateSandbox();
}

function addFlightLeg() {
  const container = document.getElementById("flightLegsList");
  if (!container) return;
  const count = container.querySelectorAll(".sandbox-leg-row").length + 1;
  const newRowHtml = createFlightLegRowHtml(count, "Лазурный Берег, NCE, Ницца, Франция", "Юлемисте, TLL, Таллин, Эстония", "2026-11-18", "14:00", true);
  container.insertAdjacentHTML("beforeend", newRowHtml);
  recalculateSandbox();
}

function removeFlightLeg(btn) {
  const row = btn.closest(".sandbox-leg-row");
  if (row) {
    row.remove();
    recalculateSandbox();
  }
}

function clearLegInput(btn) {
  const input = btn.parentElement.querySelector(".leg-input-field");
  if (input) {
    input.value = "";
    input.focus();
  }
}

function setSandboxSettingsVersion(ver) {
  appState.sandboxSettingsVersion = ver;
  const btnDraft = document.getElementById("btnVerDraft");
  const btnPub = document.getElementById("btnVerPublished");
  const hintText = document.getElementById("sandboxVersionHintText");

  if (ver === "draft") {
    if (btnDraft) btnDraft.classList.add("active");
    if (btnPub) btnPub.classList.remove("active");
    if (hintText) hintText.textContent = "Используются черновые настройки";
    showToast("В расчет подставлены параметры из Черновика (v13)", "info");
  } else {
    if (btnDraft) btnDraft.classList.remove("active");
    if (btnPub) btnPub.classList.add("active");
    if (hintText) hintText.textContent = "Используются опубликованные настройки";
    showToast("В расчет подставлены действующие опубликованные тарифы (v12)", "info");
  }

  recalculateSandbox();
}

function changePax(btn, delta) {
  appState.sandboxPax = Math.max(1, Math.min(12, appState.sandboxPax + delta));
  document.querySelectorAll(".counter-value").forEach(span => {
    span.textContent = `${appState.sandboxPax} PAX`;
  });
  recalculateSandbox();
}

function clearSandboxForm() {
  setSandboxTripType("multi");
  appState.sandboxPax = 6;
  document.querySelectorAll(".counter-value").forEach(span => {
    span.textContent = "6 пассажиров";
  });
  showToast("Форма расчета очищена к исходным значениям", "info");
}

function setSandboxLocationMode(mode) {
  appState.sandboxLocationMode = mode;
  const airportGroup = document.getElementById("sandboxAirportGroup");
  if (airportGroup) {
    airportGroup.style.display = mode === "manual" ? "block" : "none";
  }
  recalculateSandbox();
}

function toggleAccordionLeg(num) {
  const card = document.getElementById(`legAcc-${num}`);
  if (!card) return;
  card.classList.toggle("open");
}

let allLegsExpanded = true;
function toggleAllAccordionLegs() {
  allLegsExpanded = !allLegsExpanded;
  document.querySelectorAll(".leg-acc-card").forEach(card => {
    if (allLegsExpanded) card.classList.add("open");
    else card.classList.remove("open");
  });
}

function recalculateSandbox() {
  const isDraft = appState.sandboxSettingsVersion === "draft";
  const trip = appState.sandboxTripType;
  const airportSelect = document.getElementById("sandboxAirportSelect");
  const airportVal = airportSelect ? airportSelect.value : "LJU";
  
  const subtextEl = document.getElementById("resFerrySub");
  if (subtextEl) {
    subtextEl.textContent = `Включая подлет из ${airportVal}`;
  }

  let priceStr = "€69 000";
  let parkingStr = "€2 500,00";
  let crewStr = "€4 200,00";
  let totalExtraStr = "€6 700,00";
  let legs = [];

  if (trip === "oneway") {
    priceStr = isDraft ? "€32 200" : "€31 000";
    parkingStr = "€0,00";
    crewStr = "€1 200,00";
    totalExtraStr = "€1 200,00";
    legs = [
      {
        num: 1,
        title: `${airportVal} → EETN`,
        type: "Ferry",
        total: isDraft ? "€15 411,75" : "€14 800,00",
        isOpen: true,
        rows: [
          { desc: `Летный час (тариф): 1 ч 45 мин · ${isDraft ? "€7 500" : "€7 000"}/ч`, amount: isDraft ? "€13 125,00" : "€12 250,00" },
          { desc: `Сборы аэропорта вылета: ${airportVal}`, amount: "€950,00" },
          { desc: "Сборы аэропорта прилета: EETN (Таллин)", amount: "€1 336,75" }
        ],
        note: "Перегоночный рейс без пассажиров на борту для подлета к точке начала коммерческого маршрута"
      },
      {
        num: 2,
        title: "EETN → EDDB",
        type: "Коммерческий",
        total: isDraft ? "€15 621,84" : "€14 900,00",
        isOpen: true,
        rows: [
          { desc: `Летный час (тариф): 1 ч 35 мин · ${isDraft ? "€7 500" : "€7 000"}/ч`, amount: isDraft ? "€11 875,00" : "€11 083,33" },
          { desc: `VIP-обслуживание и пассажирские сборы (${appState.sandboxPax} PAX)`, amount: "€1 246,84" },
          { desc: "Аэропортовые сборы: EDDB (Берлин Бранденбург)", amount: "€2 500,00" }
        ]
      }
    ];
  } else if (trip === "roundtrip") {
    priceStr = isDraft ? "€50 500" : "€48 200";
    parkingStr = "€1 500,00";
    crewStr = "€2 400,00";
    totalExtraStr = "€3 900,00";
    legs = [
      {
        num: 1,
        title: `${airportVal} → EETN`,
        type: "Ferry",
        total: isDraft ? "€15 411,75" : "€14 800,00",
        isOpen: true,
        rows: [
          { desc: `Летный час (тариф): 1 ч 45 мин · ${isDraft ? "€7 500" : "€7 000"}/ч`, amount: isDraft ? "€13 125,00" : "€12 250,00" },
          { desc: `Сборы аэропорта вылета: ${airportVal}`, amount: "€950,00" },
          { desc: "Сборы аэропорта прилета: EETN (Таллин)", amount: "€1 336,75" }
        ],
        note: "Перегоночный рейс без пассажиров на борту для подлета к точке начала коммерческого маршрута"
      },
      {
        num: 2,
        title: "EETN → EDDB",
        type: "Коммерческий",
        total: isDraft ? "€15 621,84" : "€14 900,00",
        isOpen: true,
        rows: [
          { desc: `Летный час (тариф): 1 ч 35 мин · ${isDraft ? "€7 500" : "€7 000"}/ч`, amount: isDraft ? "€11 875,00" : "€11 083,33" },
          { desc: `VIP-обслуживание и пассажирские сборы (${appState.sandboxPax} PAX)`, amount: "€1 246,84" },
          { desc: "Аэропортовые сборы: EDDB (Берлин)", amount: "€2 500,00" }
        ]
      },
      {
        num: 3,
        title: "EDDB → EETN",
        type: "Коммерческий",
        total: isDraft ? "€15 621,84" : "€14 900,00",
        isOpen: true,
        rows: [
          { desc: `Летный час (тариф): 1 ч 35 мин · ${isDraft ? "€7 500" : "€7 000"}/ч`, amount: isDraft ? "€11 875,00" : "€11 083,33" },
          { desc: "Аэропортовые сборы и хэндлинг: EDDB", amount: "€2 146,84" },
          { desc: "Встреча и сервис: EETN", amount: "€1 600,00" }
        ]
      }
    ];
  } else {
    // Multi-leg (matches Screenshot 3 exactly)
    priceStr = isDraft ? "€69 000" : "€66 800";
    parkingStr = "€2 500,00";
    crewStr = "€4 200,00";
    totalExtraStr = "€6 700,00";
    legs = [
      {
        num: 1,
        title: `${airportVal} → EETN`,
        type: "Ferry",
        total: "€15 411,75",
        isOpen: true,
        rows: [
          { desc: `Летный час (тариф): 1 ч 45 мин · ${isDraft ? "€7 500" : "€7 000"}/ч`, amount: "€13 125,00" },
          { desc: `Сборы аэропорта вылета: ${airportVal}`, amount: "€950,00" },
          { desc: "Сборы аэропорта прилета: EETN", amount: "€1 336,75" }
        ],
        note: "Перегоночный рейс без пассажиров на борту для подлета к точке начала коммерческого маршрута"
      },
      {
        num: 2,
        title: "EETN → EDDB",
        type: "Коммерческий",
        total: "€15 621,84",
        isOpen: true,
        rows: [
          { desc: `Летный час (тариф): 1 ч 35 мин · ${isDraft ? "€7 500" : "€7 000"}/ч`, amount: "€11 875,00" },
          { desc: `VIP-обслуживание и пассажирские сборы (${appState.sandboxPax} PAX)`, amount: "€1 246,84" },
          { desc: "Аэропортовые сборы: EDDB (Берлин)", amount: "€2 500,00" }
        ]
      },
      {
        num: 3,
        title: "EDDB → LFMN",
        type: "Коммерческий",
        total: "€18 140,50",
        isOpen: true,
        rows: [
          { desc: `Летный час (тариф): 1 ч 55 мин · ${isDraft ? "€7 500" : "€7 000"}/ч`, amount: "€14 375,00" },
          { desc: "Аэропортовые сборы и наземное обслуживание: EDDB", amount: "€1 365,50" },
          { desc: "Специальный хэндлинг: NCE (Ницца, спецтариф)", amount: "€2 400,00" }
        ]
      },
      {
        num: 4,
        title: "LFMN → EETN",
        type: "Коммерческий",
        total: "€18 127,66",
        isOpen: true,
        rows: [
          { desc: `Летный час (тариф): 1 ч 55 мин · ${isDraft ? "€7 500" : "€7 000"}/ч`, amount: "€14 375,00" },
          { desc: "Аэропортовые сборы и оверфлайт-навигация: LFMN", amount: "€2 152,66" },
          { desc: "Наземный хэндлинг и встреча: EETN", amount: "€1 600,00" }
        ]
      }
    ];
  }

  const headerPriceEl = document.getElementById("resHeaderPrice");
  const bottomPriceEl = document.getElementById("resBottomTotalPrice");
  const parkingCostEl = document.getElementById("resParkingCost");
  const crewCostEl = document.getElementById("resCrewCost");
  const totalExtraEl = document.getElementById("resTotalExtraCost");
  const accordionListEl = document.getElementById("sandboxAccordionList");

  if (headerPriceEl) headerPriceEl.textContent = priceStr;
  if (bottomPriceEl) bottomPriceEl.textContent = priceStr;
  if (parkingCostEl) parkingCostEl.textContent = parkingStr;
  if (crewCostEl) crewCostEl.textContent = crewStr;
  if (totalExtraEl) totalExtraEl.textContent = totalExtraStr;

  if (accordionListEl) {
    accordionListEl.innerHTML = legs.map(leg => `
      <div class="leg-acc-card ${leg.isOpen ? 'open' : ''}" id="legAcc-${leg.num}">
        <div class="leg-acc-header" onclick="toggleAccordionLeg(${leg.num})">
          <div class="leg-acc-left">
            <span class="leg-badge-num">${leg.num}</span>
            <span class="leg-acc-title">${leg.title}</span>
            <span class="badge-strict-neutral" style="font-size: 11px;">${leg.type}</span>
          </div>
          <div class="leg-acc-right">
            <span class="leg-acc-total">${leg.total}</span>
            <svg class="leg-acc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="leg-acc-body">
          <div style="padding: 6px 0;">
            ${leg.rows.map(r => `
              <div class="breakdown-row">
                <span class="breakdown-label">${r.desc}</span>
                <span class="breakdown-dots"></span>
                <span class="breakdown-value">${r.amount}</span>
              </div>
            `).join("")}
          </div>
          ${leg.note ? `
            <div class="leg-acc-note" style="margin-top: 10px; display: flex; align-items: flex-start; gap: 8px;">
              <span class="fgg-info-tooltip" data-tooltip="${leg.note}" style="margin-left: 0; margin-top: 2px;">
                <svg class="fgg-info-icon" width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM.833 10a9.167 9.167 0 1 1 18.333 0A9.167 9.167 0 0 1 .833 10Z"/><path d="M10 9.167c.46 0 .834.373.834.833v3.333a.833.833 0 0 1-1.667 0V10c0-.46.373-.833.833-.833ZM9.167 6.667c0-.46.373-.834.833-.834h.009a.833.833 0 0 1 0 1.667H10a.833.833 0 0 1-.833-.833Z"/></svg>
              </span>
              <span>${leg.note}</span>
            </div>
          ` : ""}
        </div>
      </div>
    `).join("");
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

// ==========================================
// PLANE FLIGHT CALENDAR (КАЛЕНДАРЬ ПОЛЕТОВ БОРТА)
// ==========================================

const leonCalendarFlights = [
  {
    depUtc: "12.02.2026 10:45",
    origin: "DOH",
    arrUtc: "12.02.2026 12:05",
    dest: "DXB",
    pax: 5,
    type: "Простой перелет",
    hasEmptyLeg: false
  },
  {
    depUtc: "15.02.2026 14:30",
    origin: "DXB",
    arrUtc: "15.02.2026 18:10",
    dest: "MCT",
    pax: 0,
    type: "Перегоночный рейс",
    hasEmptyLeg: true
  },
  {
    depUtc: "17.02.2026 19:10",
    origin: "AUH",
    arrUtc: "17.02.2026 23:10",
    dest: "RUH",
    pax: 3,
    type: "Простой перелет",
    hasEmptyLeg: false
  },
  {
    depUtc: "19.02.2026 09:00",
    origin: "DOH",
    arrUtc: "19.02.2026 18:00",
    dest: "DOH",
    pax: 0,
    type: "Тех. обслуживание",
    hasEmptyLeg: true
  }
];

function renderPlaneCalendarTable() {
  const tbody = document.getElementById("planeCalendarTableBody");
  if (!tbody) return;
  tbody.innerHTML = leonCalendarFlights.map(f => `
    <tr>
      <td>${f.depUtc}</td>
      <td><strong style="color: #101828;">${f.origin}</strong></td>
      <td>${f.arrUtc}</td>
      <td><strong style="color: #101828;">${f.dest}</strong></td>
      <td>${f.pax}</td>
      <td>${f.type}</td>
      <td style="text-align: right;">
        ${f.hasEmptyLeg ? `
          <button type="button" class="btn-add-el-table" onclick="createEmptyLegFromPlane('${f.origin}', '${f.dest}', '${f.depUtc}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>Добавить Empty Leg</span>
            <span class="fgg-info-tooltip align-right" data-tooltip="Выставить этот перегоночный рейс как Empty Leg для поиска клиентов."><svg class="fgg-info-icon" width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM.833 10a9.167 9.167 0 1 1 18.333 0A9.167 9.167 0 0 1 .833 10Z"/><path d="M10 9.167c.46 0 .834.373.834.833v3.333a.833.833 0 0 1-1.667 0V10c0-.46.373-.833.833-.833ZM9.167 6.667c0-.46.373-.834.833-.834h.009a.833.833 0 0 1 0 1.667H10a.833.833 0 0 1-.833-.833Z"/></svg></span>
          </button>
        ` : '—'}
      </td>
    </tr>
  `).join("");
}

function renderPlaneManualCalendarTable() {
  const tbody = document.getElementById("planeCalendarManualTableBody");
  if (!tbody) return;
  const flights = appState.scheduledFlights;
  if (!flights || flights.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 20px;">Нет запланированных рейсов</td></tr>`;
    return;
  }
  tbody.innerHTML = flights.map(f => `
    <tr>
      <td>${f.depUtc}</td>
      <td><strong>${f.origin}</strong></td>
      <td>${f.arrUtc}</td>
      <td><strong>${f.dest}</strong></td>
      <td>${f.pax}</td>
      <td>${f.type}</td>
      <td style="text-align: right;">
        <button type="button" class="btn-link-red" onclick="deleteFlightRecord('${f.id}')">Удалить</button>
      </td>
    </tr>
  `).join("");
}

function handleFlightTypeChange() {
  const typeSelect = document.getElementById("modalFlightType");
  if (!typeSelect) return;
  const type = typeSelect.value;
  const maintBox = document.getElementById("modalMaintFields");
  const stdBox = document.getElementById("modalStandardFlightFields");
  const paxGroup = document.getElementById("modalFlightPaxGroup");

  if (type === "Тех. обслуживание") {
    if (maintBox) maintBox.style.setProperty("display", "flex", "important");
    if (stdBox) stdBox.style.setProperty("display", "none", "important");
  } else if (type === "Перегоночный рейс") {
    if (maintBox) maintBox.style.setProperty("display", "none", "important");
    if (stdBox) stdBox.style.setProperty("display", "flex", "important");
    if (paxGroup) paxGroup.style.setProperty("display", "none", "important");
  } else {
    // Простой перелет
    if (maintBox) maintBox.style.setProperty("display", "none", "important");
    if (stdBox) stdBox.style.setProperty("display", "flex", "important");
    if (paxGroup) paxGroup.style.setProperty("display", "block", "important");
  }
}

function openAddFlightModal() {
  const modal = document.getElementById("modalAddFlight");
  if (!modal) return;
  const typeSelect = document.getElementById("modalFlightType");
  if (typeSelect) {
    typeSelect.value = "Простой перелет";
  }
  handleFlightTypeChange();
  initInfoPopovers();
  modal.classList.add("active");
}

function submitAddFlightRecord() {
  const typeSelect = document.getElementById("modalFlightType");
  const type = typeSelect ? typeSelect.value : "Простой перелет";
  const plane = "S5-BBM";

  let origin = "";
  let dest = "—";
  let depUtc = "";
  let arrUtc = "";
  let pax = 0;

  if (type === "Тех. обслуживание") {
    const airportInput = document.getElementById("modalMaintAirport");
    const startInput = document.getElementById("modalMaintStart");
    const endInput = document.getElementById("modalMaintEnd");

    origin = airportInput ? airportInput.value.trim() : "";
    dest = "—";
    depUtc = startInput ? startInput.value.trim() : "";
    arrUtc = endInput ? endInput.value.trim() : "";
    pax = 0;

    if (!origin || !depUtc || !arrUtc) {
      showToast("Пожалуйста, заполните аэропорт и даты проведения ТО", "error");
      return;
    }
  } else if (type === "Перегоночный рейс") {
    const originInput = document.getElementById("modalFlightOrigin");
    const destInput = document.getElementById("modalFlightDest");
    const depInput = document.getElementById("modalFlightDep");
    const arrInput = document.getElementById("modalFlightArr");

    origin = originInput ? originInput.value.trim() : "";
    dest = destInput ? destInput.value.trim() : "";
    depUtc = depInput ? depInput.value.trim() : "";
    arrUtc = arrInput ? arrInput.value.trim() : "";
    pax = 0;

    if (!origin || !dest) {
      showToast("Пожалуйста, заполните пункты вылета и прилета", "error");
      return;
    }
  } else {
    // Простой перелет
    const originInput = document.getElementById("modalFlightOrigin");
    const destInput = document.getElementById("modalFlightDest");
    const depInput = document.getElementById("modalFlightDep");
    const arrInput = document.getElementById("modalFlightArr");
    const paxInput = document.getElementById("modalFlightPax");

    origin = originInput ? originInput.value.trim() : "";
    dest = destInput ? destInput.value.trim() : "";
    depUtc = depInput ? depInput.value.trim() : "";
    arrUtc = arrInput ? arrInput.value.trim() : "";
    pax = paxInput ? (parseInt(paxInput.value) || 0) : 0;

    if (!origin || !dest) {
      showToast("Пожалуйста, заполните пункты вылета и прилета", "error");
      return;
    }
  }

  const newFlight = {
    id: `fl-${Date.now()}`,
    plane: plane,
    planeModel: "Cessna Citation XLS+",
    type: type,
    depUtc: depUtc || "05.10.2026 10:00 UTC",
    origin: origin,
    dest: dest,
    arrUtc: arrUtc || "05.10.2026 12:15 UTC",
    pax: pax
  };

  appState.scheduledFlights.unshift(newFlight);

  closeModal("modalAddFlight");
  renderPlaneManualCalendarTable();
  showToast(`Рейс успешно добавлен в календарь полетов!`, "success");
}

function deleteFlightRecord(id) {
  const idx = appState.scheduledFlights.findIndex(f => f.id === id);
  if (idx !== -1) {
    appState.scheduledFlights.splice(idx, 1);
    renderPlaneManualCalendarTable();
    showToast(`Рейс удален из календаря полетов`, "info");
  }
}

function initInfoPopovers() {
  document.querySelectorAll(".fgg-info-tooltip").forEach(el => {
    if (el.dataset.tooltipBound) return;
    el.dataset.tooltipBound = "1";
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isActive = el.classList.contains("active");
      document.querySelectorAll(".fgg-info-tooltip.active").forEach(item => item.classList.remove("active"));
      if (!isActive) {
        el.classList.add("active");
      }
    });
  });

  if (!document.body.dataset.tooltipsDocBound) {
    document.body.dataset.tooltipsDocBound = "1";
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".fgg-info-tooltip")) {
        document.querySelectorAll(".fgg-info-tooltip.active").forEach(item => item.classList.remove("active"));
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".fgg-info-tooltip.active").forEach(item => item.classList.remove("active"));
      }
    });
  }
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
    showAuthView("login");
    authModal.style.display = "flex";
  }
  showToast("Вы вышли из кабинета оператора", "info");
}

function showAuthView(view) {
  const loginCard = document.getElementById("authCardLogin");
  const recoveryCard = document.getElementById("authCardRecovery");
  const successCard = document.getElementById("authCardSuccess");
  if (loginCard) loginCard.style.display = (view === "login") ? "block" : "none";
  if (recoveryCard) recoveryCard.style.display = (view === "recovery") ? "block" : "none";
  if (successCard) successCard.style.display = (view === "success") ? "block" : "none";
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const authModal = document.getElementById("authModalScreen");
  if (authModal) authModal.style.display = "none";
  showToast("Добро пожаловать в кабинет оператора!", "success");
}

function handleRecoverySubmit(event) {
  event.preventDefault();
  showAuthView("success");
  showToast("Ссылка для сброса пароля отправлена", "info");
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPw = input.type === "password";
  input.type = isPw ? "text" : "password";
  btn.innerHTML = isPw
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
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

function clearInputField(id) {
  const el = document.getElementById(id);
  if (el) {
    el.value = "";
    el.focus();
  }
}

function triggerPhotoUpload() {
  const fileInput = document.getElementById("planePhotoFileInput");
  if (fileInput) fileInput.click();
}

function handlePhotoUpload(event) {
  const files = event.target.files;
  if (files && files.length > 0) {
    showToast(`Загружено фотографий: ${files.length}`, "success");
    const galleryWrap = document.getElementById("planeGalleryEditWrap");
    if (galleryWrap) galleryWrap.style.display = "block";
  }
}

function openPlaneCreate() {
  appState.planeCardMode = "create";
  
  // Title
  const titleEl = document.getElementById("planeCardScreenTitle");
  if (titleEl) titleEl.textContent = "Создание борта";
  
  // Hide top delete button
  const delBtn = document.getElementById("btnDeletePlaneTop");
  if (delBtn) delBtn.style.display = "none";
  
  // Hide versions and publication card
  const versionsCard = document.getElementById("cardVersionsAndPublish");
  if (versionsCard) versionsCard.style.display = "none";
  
  // Gallery: hide prefilled gallery, show dashed uploader
  const galleryWrap = document.getElementById("planeGalleryEditWrap");
  if (galleryWrap) galleryWrap.style.display = "none";
  const dropzone = document.getElementById("planePhotoCreateDropzone");
  if (dropzone) dropzone.style.display = "flex";
  
  // Clear/Reset input fields
  const statusField = document.getElementById("planeFieldStatus");
  if (statusField) statusField.value = "inactive";
  const modelField = document.getElementById("planeFieldModel");
  if (modelField) modelField.value = "Gulfstream G-550";
  const tailField = document.getElementById("planeFieldTailNumber");
  if (tailField) tailField.value = "";
  const homeBaseField = document.getElementById("planeFieldHomeBase");
  if (homeBaseField) homeBaseField.value = "";
  const yearField = document.getElementById("planeFieldYear");
  if (yearField) yearField.value = "";
  const extYearField = document.getElementById("planeFieldExteriorYear");
  if (extYearField) extYearField.value = "";
  const intYearField = document.getElementById("planeFieldInteriorYear");
  if (intYearField) intYearField.value = "";
  const taxiField = document.getElementById("planeFieldTaxiTime");
  if (taxiField) taxiField.value = "10";
  const daysField = document.getElementById("planeFieldDaysOffBase");
  if (daysField) daysField.value = "3";
  const floatField = document.getElementById("planeFieldFloatingBase");
  if (floatField) floatField.checked = false;
  const noteRuField = document.getElementById("planeFieldNoteRu");
  if (noteRuField) noteRuField.value = "";
  const noteEnField = document.getElementById("planeFieldNoteEn");
  if (noteEnField) noteEnField.value = "";
  
  // Section 3: Characteristics
  const rangeField = document.getElementById("planeFieldRange");
  if (rangeField) rangeField.value = "";
  const paxField = document.getElementById("planeFieldPax");
  if (paxField) paxField.value = "";
  const cabinField = document.getElementById("planeFieldCabinSize");
  if (cabinField) cabinField.value = "";
  const bagVolField = document.getElementById("planeFieldBaggageVol");
  if (bagVolField) bagVolField.value = "";
  const bagCountField = document.getElementById("planeFieldBaggageCount");
  if (bagCountField) bagCountField.value = "";
  const speedField = document.getElementById("planeFieldSpeed");
  if (speedField) speedField.value = "";
  
  // Section 4: Geography (clear selected countries)
  selectedCodes.clear();
  renderTags();
  syncMap();
  
  // Section 6: Calendar - Choice cards (Leon vs Manual)
  const calendarHeader = document.getElementById("calendarSourceHeader");
  if (calendarHeader) calendarHeader.style.display = "none";
  const leonWrap = document.getElementById("calendarLeonWrap");
  if (leonWrap) leonWrap.style.display = "none";
  const choiceWrap = document.getElementById("calendarChoiceCardsWrap");
  if (choiceWrap) choiceWrap.style.display = "block";
  selectCalendarChoice("manual");
  
  // Section 7: Integrations - Empty box
  const intConnected = document.getElementById("integrationConnectedBox");
  if (intConnected) intConnected.style.display = "none";
  const intEmpty = document.getElementById("integrationEmptyBox");
  if (intEmpty) intEmpty.style.display = "block";
  
  navigateTo("plane-card");
}

function openPlaneEdit(planeId) {
  appState.planeCardMode = "edit";
  
  // Title
  const titleEl = document.getElementById("planeCardScreenTitle");
  if (titleEl) titleEl.textContent = "Редактирование борта";
  
  // Show top delete button
  const delBtn = document.getElementById("btnDeletePlaneTop");
  if (delBtn) delBtn.style.display = "inline-flex";
  
  // Show versions and publication card
  const versionsCard = document.getElementById("cardVersionsAndPublish");
  if (versionsCard) versionsCard.style.display = "block";
  
  // Photo gallery: show gallery, hide empty dropzone
  const galleryWrap = document.getElementById("planeGalleryEditWrap");
  if (galleryWrap) galleryWrap.style.display = "block";
  const dropzone = document.getElementById("planePhotoCreateDropzone");
  if (dropzone) dropzone.style.display = "none";
  
  // Prefill Gulfstream G-550 data
  const statusField = document.getElementById("planeFieldStatus");
  if (statusField) statusField.value = "active";
  const modelField = document.getElementById("planeFieldModel");
  if (modelField) modelField.value = "Gulfstream G-550";
  const tailField = document.getElementById("planeFieldTailNumber");
  if (tailField) tailField.value = "RA-78967";
  const geoScopeField = document.getElementById("planeFieldGeoScope");
  if (geoScopeField) geoScopeField.value = "international";
  const currencyField = document.getElementById("planeFieldCurrency");
  if (currencyField) currencyField.value = "EUR";
  const homeBaseField = document.getElementById("planeFieldHomeBase");
  if (homeBaseField) homeBaseField.value = "LTBA, Ataturk International Airport";
  const yearField = document.getElementById("planeFieldYear");
  if (yearField) yearField.value = "2004";
  const extYearField = document.getElementById("planeFieldExteriorYear");
  if (extYearField) extYearField.value = "2023";
  const intYearField = document.getElementById("planeFieldInteriorYear");
  if (intYearField) intYearField.value = "2024";
  const taxiField = document.getElementById("planeFieldTaxiTime");
  if (taxiField) taxiField.value = "10";
  const daysField = document.getElementById("planeFieldDaysOffBase");
  if (daysField) daysField.value = "3";
  const floatField = document.getElementById("planeFieldFloatingBase");
  if (floatField) floatField.checked = true;
  const noteRuField = document.getElementById("planeFieldNoteRu");
  if (noteRuField) noteRuField.value = "Примечание на русском языке";
  const noteEnField = document.getElementById("planeFieldNoteEn");
  if (noteEnField) noteEnField.value = "Description in English";
  
  // Section 3: Characteristics
  const rangeField = document.getElementById("planeFieldRange");
  if (rangeField) rangeField.value = "4350";
  const paxField = document.getElementById("planeFieldPax");
  if (paxField) paxField.value = "12";
  const cabinField = document.getElementById("planeFieldCabinSize");
  if (cabinField) cabinField.value = "1294x180x210";
  const bagVolField = document.getElementById("planeFieldBaggageVol");
  if (bagVolField) bagVolField.value = "5,56";
  const bagCountField = document.getElementById("planeFieldBaggageCount");
  if (bagCountField) bagCountField.value = "12";
  const speedField = document.getElementById("planeFieldSpeed");
  if (speedField) speedField.value = "828";
  
  // Section 4: Geography (restore European/international codes)
  selectedCodes = new Set(["EE", "DE", "FR", "IT", "ES", "AT", "CH", "GB", "NL", "BE", "PT", "US", "CA"]);
  renderTags();
  syncMap();
  
  // Section 6: Calendar - Leon Software
  appState.planeCalendarSource = "leon";
  const calendarHeader = document.getElementById("calendarSourceHeader");
  if (calendarHeader) calendarHeader.style.display = "flex";
  const sourceLabel = document.getElementById("calendarSourceLabel");
  if (sourceLabel) sourceLabel.textContent = "Leon Software";
  const toggleBtn = document.getElementById("btnToggleCalendarSource");
  if (toggleBtn) toggleBtn.textContent = "Перейти на ручной ввод";
  const leonWrap = document.getElementById("calendarLeonWrap");
  if (leonWrap) leonWrap.style.display = "block";
  const choiceWrap = document.getElementById("calendarChoiceCardsWrap");
  if (choiceWrap) choiceWrap.style.display = "none";
  
  // Section 7: Integrations - Connected card
  const intConnected = document.getElementById("integrationConnectedBox");
  if (intConnected) intConnected.style.display = "flex";
  const intEmpty = document.getElementById("integrationEmptyBox");
  if (intEmpty) intEmpty.style.display = "none";
  
  // Version publication: published v12 default
  setPlaneCardVersion("published");
  
  navigateTo("plane-card");
}

function setPlaneCardVersion(version) {
  appState.planeCardVersion = version;
  const radioPublished = document.getElementById("radioOptPublished");
  const radioDraft = document.getElementById("radioOptDraft");
  const notePublished = document.getElementById("versionPublishedNote");
  const warningDraft = document.getElementById("versionDraftWarningWrap");
  
  if (version === "draft") {
    if (radioDraft) radioDraft.classList.add("is-selected");
    if (radioPublished) radioPublished.classList.remove("is-selected");
    if (notePublished) notePublished.style.display = "none";
    if (warningDraft) warningDraft.style.display = "block";
    showToast("Выбран Черновик v13 (показаны изменения)", "info");
  } else {
    if (radioPublished) radioPublished.classList.add("is-selected");
    if (radioDraft) radioDraft.classList.remove("is-selected");
    if (notePublished) notePublished.style.display = "block";
    if (warningDraft) warningDraft.style.display = "none";
    showToast("Выбрана Опубликованная версия v12 (активная)", "info");
  }
}

function setPlaneVersion(version) {
  setPlaneCardVersion(version);
}

function toggleCalendarSource() {
  const current = appState.planeCalendarSource || "leon";
  const leonWrap = document.getElementById("calendarLeonWrap");
  const choiceWrap = document.getElementById("calendarChoiceCardsWrap");
  const sourceLabel = document.getElementById("calendarSourceLabel");
  const toggleBtn = document.getElementById("btnToggleCalendarSource");
  
  if (current === "leon") {
    appState.planeCalendarSource = "manual";
    if (leonWrap) leonWrap.style.display = "none";
    if (choiceWrap) choiceWrap.style.display = "block";
    if (sourceLabel) sourceLabel.textContent = "Ручной ввод";
    if (toggleBtn) toggleBtn.textContent = "Вернуться к Leon Software";
    selectCalendarChoice("manual");
    showToast("Переключено на ручной ввод календаря", "info");
  } else {
    appState.planeCalendarSource = "leon";
    if (leonWrap) leonWrap.style.display = "block";
    if (choiceWrap) choiceWrap.style.display = "none";
    if (sourceLabel) sourceLabel.textContent = "Leon Software";
    if (toggleBtn) toggleBtn.textContent = "Перейти на ручной ввод";
    showToast("Переключено на Leon Software", "info");
  }
}

function selectCalendarChoice(choice) {
  const cardLeon = document.getElementById("choiceCardLeon");
  const cardManual = document.getElementById("choiceCardManual");
  const manualTableWrap = document.getElementById("calendarManualTableWrap");
  
  if (choice === "leon") {
    if (cardLeon) cardLeon.classList.add("is-active");
    if (cardManual) cardManual.classList.remove("is-active");
    if (manualTableWrap) manualTableWrap.style.display = "none";
    showToast("Для подключения перейдите в блок 7 «Интеграции»", "info");
  } else {
    if (cardManual) cardManual.classList.add("is-active");
    if (cardLeon) cardLeon.classList.remove("is-active");
    if (manualTableWrap) manualTableWrap.style.display = "block";
  }
}

function syncLeonNow() {
  showToast("Синхронизация с Leon Software успешно выполнена", "success");
}

function disconnectLeon() {
  if (confirm("Отключить интеграцию с Leon Software для этого борта?")) {
    const intConnected = document.getElementById("integrationConnectedBox");
    const intEmpty = document.getElementById("integrationEmptyBox");
    if (intConnected) intConnected.style.display = "none";
    if (intEmpty) intEmpty.style.display = "block";
    showToast("Интеграция с Leon Software отключена", "warning");
  }
}

function openDeletePlaneModal() {
  const modal = document.getElementById("modalDeletePlane");
  if (modal) modal.classList.add("active");
}

function confirmDeletePlane() {
  closeModal("modalDeletePlane");
  showToast("Борт Gulfstream G-550 (RA-78967) удален", "error");
  navigateTo("fleet");
}

function createEmptyLegFromPlane(origin, dest, dateTime) {
  showToast(`Рейс ${origin} → ${dest} (${dateTime}) передан в Empty Legs`, "success");
  if (typeof openEmptyLegCreateModal === "function") {
    openEmptyLegCreateModal();
  } else {
    navigateTo("emptylegs");
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
  showToast("Пакет изменений отправлен координатору FGG на утверждение", "success");
}

let map = null;
let isCodeSyncing = false;
let selectedCodes = new Set([
  "EE", "DE", "FR", "IT", "ES", "AT", "CH", "GB", "NL", "BE", "PT", "US", "CA"
]);

function resetMapView() {
  if (!map) return;
  map.scale = map._baseScale;
  map.transX = map._baseTransX;
  map.transY = map._baseTransY;
  map._applyTransform();
}

function syncMap() {
  if (!map) return;
  isCodeSyncing = true;
  map.clearSelectedRegions();
  map.setSelectedRegions(Array.from(selectedCodes));
  isCodeSyncing = false;
}

function renderTags() {
  const tagsContainer = document.getElementById("tags-container");
  const tagsCountEl = document.getElementById("tags-count");
  if (tagsCountEl) tagsCountEl.textContent = selectedCodes.size;
  if (!tagsContainer) return;

  if (selectedCodes.size === 0) {
    tagsContainer.innerHTML = '<div style="font-size: 13px; color: var(--text-muted); padding: 8px 0;">Страны не выбраны. Выберите регион или кликните по карте.</div>';
    return;
  }

  const sorted = Array.from(selectedCodes).sort((a, b) => {
    const nameA = window.COUNTRIES_DATA?.[a]?.nameRu || a;
    const nameB = window.COUNTRIES_DATA?.[b]?.nameRu || b;
    return nameA.localeCompare(nameB, "ru");
  });

  tagsContainer.innerHTML = "";
  sorted.forEach(code => {
    const country = window.COUNTRIES_DATA?.[code] || { nameRu: code };
    const chip = document.createElement("div");
    chip.className = "tag-chip";
    chip.innerHTML = `
      <span>${country.nameRu}</span>
      <span class="tag-close" title="Удалить">&times;</span>
    `;

    chip.querySelector(".tag-close").addEventListener("click", (e) => {
      e.stopPropagation();
      removeCountry(code);
    });

    tagsContainer.appendChild(chip);
  });
}

function removeCountry(code) {
  if (selectedCodes.has(code)) {
    selectedCodes.delete(code);
    appState.selectedCountries = Array.from(selectedCodes);
    syncMap();
    renderTags();
  }
}

function addCountry(code) {
  if (!code || !window.COUNTRIES_DATA || !window.COUNTRIES_DATA[code]) return;
  if (!selectedCodes.has(code)) {
    selectedCodes.add(code);
    appState.selectedCountries = Array.from(selectedCodes);
    syncMap();
    renderTags();
  }
}

function renderPresets() {
  const presetsWrap = document.getElementById("presets-wrap");
  if (!presetsWrap) return;
  presetsWrap.innerHTML = "";
  const presets = [
    { id: "all", title: "Весь мир" },
    { id: "europe", title: "Европа" },
    { id: "eu", title: "Евросоюз" },
    { id: "middle_east", title: "Ближний Восток" },
    { id: "cis", title: "СНГ" },
    { id: "asia", title: "Азия" },
    { id: "north_america", title: "Северная Америка" },
    { id: "south_america", title: "Южная Америка" }
  ];

  presets.forEach(p => {
    const presetData = window.GEOGRAPHY_PRESETS ? window.GEOGRAPHY_PRESETS[p.id] : null;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "preset-btn";
    btn.textContent = p.title;
    if (presetData?.subtitle) btn.title = presetData.subtitle;

    btn.addEventListener("click", () => {
      if (p.id === "all") {
        const allCodes = Object.keys(window.COUNTRIES_DATA || {});
        allCodes.forEach(c => selectedCodes.add(c));
      } else if (presetData && presetData.countries) {
        presetData.countries.forEach(c => selectedCodes.add(c));
      }
      appState.selectedCountries = Array.from(selectedCodes);
      syncMap();
      renderTags();
      showToast(`Добавлен регион: ${p.title}`, "info");
    });

    presetsWrap.appendChild(btn);
  });
}

function initCountryAutocomplete() {
  const countryInput = document.getElementById("country-input");
  const autocompleteBox = document.getElementById("country-autocomplete");
  const btnAddCountry = document.getElementById("btn-add-country");
  const btnResetTags = document.getElementById("btn-reset-tags");

  if (btnResetTags && !btnResetTags.dataset.bound) {
    btnResetTags.dataset.bound = "1";
    btnResetTags.addEventListener("click", () => {
      selectedCodes.clear();
      appState.selectedCountries = [];
      syncMap();
      renderTags();
      resetMapView();
      showToast("Список разрешенных стран очищен", "info");
    });
  }

  if (countryInput && !countryInput.dataset.bound) {
    countryInput.dataset.bound = "1";
    countryInput.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
      if (!q || !autocompleteBox) {
        if (autocompleteBox) {
          autocompleteBox.classList.remove("active");
          autocompleteBox.innerHTML = "";
        }
        return;
      }

      if (!window.COUNTRIES_DATA) return;

      const matches = Object.values(window.COUNTRIES_DATA).filter(item => {
        return item.nameRu.toLowerCase().includes(q) ||
               item.nameEn.toLowerCase().includes(q) ||
               item.code.toLowerCase().includes(q);
      }).slice(0, 8);

      if (matches.length === 0) {
        autocompleteBox.innerHTML = `<div style="padding: 10px; font-size: 12px; color: #98A2B3; text-align: center;">Не найдено</div>`;
        autocompleteBox.classList.add("active");
        return;
      }

      autocompleteBox.innerHTML = matches.map(m => `
        <div class="geo-item" data-code="${m.code}">
          <span style="font-weight: 600;">${m.nameRu}</span>
          <span style="font-size: 11px; color: #94A3B8;">${m.code}</span>
        </div>
      `).join("");

      autocompleteBox.classList.add("active");

      autocompleteBox.querySelectorAll("[data-code]").forEach(el => {
        el.addEventListener("click", function () {
          addCountry(this.getAttribute("data-code"));
          countryInput.value = "";
          autocompleteBox.classList.remove("active");
        });
      });
    });

    if (btnAddCountry && !btnAddCountry.dataset.bound) {
      btnAddCountry.dataset.bound = "1";
      btnAddCountry.addEventListener("click", function () {
        const val = countryInput.value.trim().toLowerCase();
        if (!val || !window.COUNTRIES_DATA) return;

        const exact = Object.values(window.COUNTRIES_DATA).find(c => 
          c.code.toLowerCase() === val || 
          c.nameRu.toLowerCase() === val || 
          c.nameEn.toLowerCase() === val
        );

        if (exact) {
          addCountry(exact.code);
          countryInput.value = "";
          if (autocompleteBox) autocompleteBox.classList.remove("active");
        } else if (autocompleteBox) {
          const first = autocompleteBox.querySelector("[data-code]");
          if (first) first.click();
        }
      });
    }

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".country-input-wrap") && autocompleteBox) {
        autocompleteBox.classList.remove("active");
      }
    });
  }
}

function initPlaneCardMap() {
  renderPresets();
  renderTags();
  initCountryAutocomplete();

  const mapElement = document.getElementById("world-map");
  if (!mapElement || typeof jsVectorMap === "undefined") return;

  if (map) {
    try {
      if (typeof map.updateSize === "function") {
        map.updateSize();
      }
    } catch (e) {}
    syncMap();
    renderTags();
    return;
  }

  try {
    map = new jsVectorMap({
      selector: "#world-map",
      map: "world",
      backgroundColor: "#F8FAFC",
      draggable: true,
      zoomButtons: false,
      zoomOnScroll: false,
      zoomMax: 8,
      zoomMin: 1,
      zoomStep: 1.35,
      zoomAnimate: true,
      regionsSelectable: true,
      regionsSelectableOne: false,
      selectedRegions: Array.from(selectedCodes),

      regionStyle: {
        initial: {
          fill: "#CBD5E1",
          fillOpacity: 1,
          stroke: "#FFFFFF",
          strokeWidth: 0.5
        },
        hover: {
          fill: "#7DD3FC",
          cursor: "pointer",
          fillOpacity: 0.95
        },
        selected: {
          fill: "#1E599F",
          fillOpacity: 1
        },
        selectedHover: {
          fill: "#16467F"
        }
      },

      onRegionTooltipShow: function (event, tooltip, code) {
        const country = window.COUNTRIES_DATA ? window.COUNTRIES_DATA[code] : null;
        const isSelected = selectedCodes.has(code);
        const name = country ? country.nameRu : code;
        const status = isSelected ? "Разрешено для полетов" : "Кликните для добавления";
        tooltip.text(
          `<div style="font-family: inherit;"><b>${name}</b><br/><span style="font-size: 11px; color: #94A3B8;">${status}</span></div>`,
          true
        );
      },

      onRegionSelected: function (code, isSelected) {
        if (isCodeSyncing) return;
        if (isSelected) {
          selectedCodes.add(code);
        } else {
          selectedCodes.delete(code);
        }
        appState.selectedCountries = Array.from(selectedCodes);
        renderTags();
      }
    });

    const mapInBtn = document.getElementById("map-in");
    const mapOutBtn = document.getElementById("map-out");
    const mapResetBtn = document.getElementById("map-reset-view");

    if (mapInBtn && !mapInBtn.dataset.bound) {
      mapInBtn.dataset.bound = "1";
      mapInBtn.onclick = () => {
        if (!map) return;
        const maxScale = map.params.zoomMax * map._baseScale;
        const targetScale = Math.min(map.scale * 1.35, maxScale);
        map._setScale(targetScale, map._width / 2, map._height / 2, false, map.params.zoomAnimate);
      };
    }

    if (mapOutBtn && !mapOutBtn.dataset.bound) {
      mapOutBtn.dataset.bound = "1";
      mapOutBtn.onclick = () => {
        if (!map) return;
        const minScale = map._baseScale;
        const targetScale = map.scale / 1.35;
        if (targetScale <= minScale * 1.08) {
          resetMapView();
        } else {
          map._setScale(targetScale, map._width / 2, map._height / 2, false, map.params.zoomAnimate);
        }
      };
    }

    if (mapResetBtn && !mapResetBtn.dataset.bound) {
      mapResetBtn.dataset.bound = "1";
      mapResetBtn.onclick = () => {
        resetMapView();
        showToast("Исходный вид карты возвращен", "info");
      };
    }

    renderTags();
  } catch (err) {
    console.warn("Map init note:", err);
  }
}


// ==========================================
// MANAGER CHAT (СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ)
// ==========================================

const chatMessages = [
  { id: 1, dir: "in",  text: "Добрый день! Чем могу помочь?",                           time: "11:02", date: "04.08.2026", read: true },
  { id: 2, dir: "out", text: "Здравствуйте! Хотели уточнить по рейсу Москва — Дубай на 15 сентября.", time: "11:04", date: "04.08.2026", read: true },
  { id: 3, dir: "in",  text: "Да, конечно. Уточните, пожалуйста, количество пассажиров и предпочтения по времени вылета.", time: "11:07", date: "04.08.2026", read: true },
  { id: 4, dir: "out", img: "plan_msk_dxb.jpg", time: "11:09", date: "04.08.2026", read: true },
  { id: 5, dir: "in",  text: "Всё выглядит отлично. Мы подготовили предложение — 6 пассажиров, вылет 15 сентября в 10:00 UTC. Стоимость составит 22 400 €. Подтверждаете?", time: "09:31", date: "05.08.2026", read: true },
  { id: 6, dir: "out", text: "Да, подтверждаем!", time: "09:45", date: "05.08.2026", read: false }
];

function renderChatMessages() {
  const container = document.getElementById("chatMessages");
  if (!container) return;
  let lastDate = null;
  let html = "";

  const readSvgBlue = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#0970CD" d="M10.973 4.319a.5.5 0 0 1 .72.694L5.795 11.14a1.167 1.167 0 0 1-1.74-.066l-2.44-2.953a.5.5 0 1 1 .77-.637l2.441 2.953c.064.077.18.08.249.01zM14.315 4.311a.5.5 0 0 1 .705.71l-6.217 6.164A1.166 1.166 0 0 1 7.1 11.12l-.144-.166a.5.5 0 0 1 .756-.655l.144.167a.167.167 0 0 0 .244.01z"/></svg>`;
  const readSvgGrey = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#7B8897" d="M10.973 4.319a.5.5 0 0 1 .72.694L5.795 11.14a1.167 1.167 0 0 1-1.74-.066l-2.44-2.953a.5.5 0 1 1 .77-.637l2.441 2.953c.064.077.18.08.249.01zM14.315 4.311a.5.5 0 0 1 .705.71l-6.217 6.164A1.166 1.166 0 0 1 7.1 11.12l-.144-.166a.5.5 0 0 1 .756-.655l.144.167a.167.167 0 0 0 .244.01z"/></svg>`;

  chatMessages.forEach(msg => {
    if (msg.date !== lastDate) {
      lastDate = msg.date;
      html += `<div class="chat-date-sep"><span>${msg.date}</span></div>`;
    }
    const isOut = msg.dir === "out";
    const rowClass = isOut ? "chat-msg-row--out" : "chat-msg-row--in";
    const bubbleClass = isOut ? "chat-bubble--out" : "chat-bubble--in";
    let inner = "";
    if (msg.img) {
      inner += `<div class="chat-img-placeholder"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>${msg.img}</span></div>`;
    }
    if (msg.text) {
      inner += `<p>${msg.text}</p>`;
    }
    const readIcon = isOut ? `<span class="chat-read-icon" title="${msg.read ? "Прочитано" : "Не прочитано"}">${msg.read ? readSvgBlue : readSvgGrey}</span>` : "";
    inner += `<div class="chat-meta"><span class="chat-time">${msg.time}</span>${readIcon}</div>`;
    html += `<div class="chat-msg-row ${rowClass}"><div class="chat-bubble ${bubbleClass}">${inner}</div></div>`;
  });

  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  const dateStr = `${dd}.${mo}.${yyyy}`;

  chatMessages.push({ id: chatMessages.length + 1, dir: "out", text, time: `${hh}:${mm}`, date: dateStr, read: false });
  input.value = "";
  renderChatMessages();

  // Simulate manager reply after 1.5s
  setTimeout(() => {
    chatMessages.push({ id: chatMessages.length + 1, dir: "in", text: "Спасибо за сообщение! Наш менеджер ответит в ближайшее время.", time: `${hh}:${mm}`, date: dateStr, read: true });
    renderChatMessages();
  }, 1500);
}

function handleChatKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
}

function openChatUploadModal() {
  const modal = document.getElementById("chatUploadModal");
  if (modal) modal.style.display = "flex";
}

function closeChatUploadModal() {
  const modal = document.getElementById("chatUploadModal");
  if (modal) modal.style.display = "none";
}

function closeChatUploadModalOutside(e) {
  if (e.target === document.getElementById("chatUploadModal")) closeChatUploadModal();
}

function handleChatFileDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) attachChatFile(file);
}

function handleChatFileSelect(e) {
  const file = e.target.files[0];
  if (file) attachChatFile(file);
}

function attachChatFile(file) {
  closeChatUploadModal();
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  chatMessages.push({ id: chatMessages.length + 1, dir: "out", img: file.name, time: `${hh}:${mm}`, date: `${dd}.${mo}.${yyyy}`, read: false });
  renderChatMessages();
}


// ==========================================
// EMPTY LEGS - FGG OPERATOR DASHBOARD
// ==========================================

function filterEmptyLegsTab(tab) {
  appState.emptyLegsTab = tab;
  document.querySelectorAll(".el-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-el-tab") === tab);
  });
  renderEmptyLegsTable();
}

function handleEmptyLegSearch(query) {
  appState.emptyLegsSearch = (query || "").trim().toLowerCase();
  renderEmptyLegsTable();
}

function renderEmptyLegsTable() {
  const tbody = document.getElementById("emptyLegsTableBody");
  if (!tbody) return;

  const currentTab = appState.emptyLegsTab || "all";
  const search = appState.emptyLegsSearch || "";

  // Count tab items
  const allCount = appState.emptyLegs.length;
  const activeCount = appState.emptyLegs.filter(el => el.status === "Доступен").length;
  const pastCount = appState.emptyLegs.filter(el => el.status !== "Доступен").length;

  const countAllEl = document.getElementById("countTabAll");
  const countActiveEl = document.getElementById("countTabActive");
  const countPastEl = document.getElementById("countTabPast");
  if (countAllEl) countAllEl.textContent = `(${allCount})`;
  if (countActiveEl) countActiveEl.textContent = `(${activeCount})`;
  if (countPastEl) countPastEl.textContent = `(${pastCount})`;

  const filtered = appState.emptyLegs.filter(el => {
    if (currentTab === "active" && el.status !== "Доступен") return false;
    if (currentTab === "past" && el.status === "Доступен") return false;
    if (search) {
      const match = el.origin.toLowerCase().includes(search) ||
                    el.destination.toLowerCase().includes(search) ||
                    el.planeModel.toLowerCase().includes(search) ||
                    el.tailNumber.toLowerCase().includes(search);
      if (!match) return false;
    }
    return true;
  });

  const countInfoEl = document.getElementById("elTableCountInfo");
  if (countInfoEl) {
    countInfoEl.textContent = `Показано рейсов: ${filtered.length} из ${allCount}`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 36px 20px;">Рейсы не найдены</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(el => {
    let statusBadge = "";
    if (el.status === "Доступен") {
      statusBadge = `<span class="badge-el-available">Доступен</span><span style="display: block; font-size: 11px; color: var(--text-muted); margin-top: 3px;">до ${el.activeUntil}</span>`;
    } else if (el.status === "Выполнен") {
      statusBadge = `<span class="badge-el-completed">Выполнен</span>`;
    } else {
      statusBadge = `<span class="badge-el-expired">Просрочен</span>`;
    }

    const formattedPrice = el.price.toLocaleString("ru-RU") + (el.currency === "Рубли" ? " ₽" : " €");

    return `
      <tr style="cursor: pointer;" onclick="openEmptyLegView('${el.id}')">
        <td>
          <div style="font-weight: 700; color: var(--text-main); font-size: 13px;">${el.origin} → ${el.destination}</div>
        </td>
        <td>
          <strong style="color: var(--text-main); font-family: monospace, monospace; font-size: 13px;">${el.tailNumber}</strong>
        </td>
        <td>
          <span style="color: var(--text-secondary); font-size: 13px;">${el.planeModel}</span>
        </td>
        <td>
          <span style="font-size: 13px; color: var(--text-main); font-weight: 500;">${el.dateTime}</span>
        </td>
        <td>
          <span style="color: var(--text-secondary); font-size: 13px;">${el.pax} PAX</span>
        </td>
        <td>
          <span style="font-weight: 700; color: var(--primary); font-size: 13px;">${formattedPrice}</span>
        </td>
        <td>
          ${statusBadge}
        </td>
        <td style="text-align: right;">
          <div style="display: flex; gap: 8px; justify-content: flex-end;" onclick="event.stopPropagation()">
            <button class="btn-secondary btn-sm" onclick="openEmptyLegView('${el.id}')">Просмотр</button>
            <button class="btn-secondary btn-sm" onclick="openEmptyLegDrawer('${el.id}')">Детали</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// Drawer: Детали
function openEmptyLegDrawer(id) {
  const el = appState.emptyLegs.find(item => item.id === id);
  if (!el) return;

  appState.selectedDrawerEmptyLegId = el.id;

  const routeEl = document.getElementById("elDrawerRoute");
  const typeEl = document.getElementById("elDrawerPlaneType");
  const unitEl = document.getElementById("elDrawerPlaneUnit");
  const statusEl = document.getElementById("elDrawerStatus");
  const paxEl = document.getElementById("elDrawerPax");
  const priceEl = document.getElementById("elDrawerPrice");
  const dateEl = document.getElementById("elDrawerDate");

  if (routeEl) routeEl.textContent = `${el.origin} → ${el.destination}`;
  if (typeEl) typeEl.textContent = el.planeModel || "—";
  if (unitEl) unitEl.textContent = `${el.planeModel}, б/н ${el.tailNumber || "—"}`;
  if (statusEl) statusEl.textContent = `${el.status} ${el.activeUntil ? `(до ${el.activeUntil})` : ""}`;
  if (paxEl) paxEl.textContent = `${el.pax} мест`;
  if (priceEl) priceEl.textContent = `${el.price.toLocaleString("ru-RU")} ${el.currency === "Рубли" ? "₽" : "€"}`;
  if (dateEl) dateEl.textContent = el.dateTime;

  const drawer = document.getElementById("emptyLegsDrawer");
  if (drawer) drawer.style.display = "flex";
}

function openSelectedEmptyLegFromDrawer() {
  if (appState.selectedDrawerEmptyLegId) {
    closeEmptyLegDrawer();
    openEmptyLegView(appState.selectedDrawerEmptyLegId);
  }
}

function closeEmptyLegDrawer() {
  const drawer = document.getElementById("emptyLegsDrawer");
  if (drawer) drawer.style.display = "none";
}

function closeEmptyLegDrawerOutside(e) {
  if (e.target === document.getElementById("emptyLegsDrawer")) {
    closeEmptyLegDrawer();
  }
}

// Show: Просмотр
function openEmptyLegView(id) {
  const el = appState.emptyLegs.find(item => item.id === id) || appState.emptyLegs[0];
  appState.selectedEmptyLegId = el.id;
  appState.isEditingEmptyLeg = false;

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
  setField("elViewTail", el.tailNumber || "—");
  setField("elViewCurrency", el.currency || "Евро");
  setField("elViewPax", el.pax);
  setField("elViewPrice", el.price.toLocaleString("ru-RU") + (el.currency === "Рубли" ? " ₽" : " €"));
  setField("elViewStatus", el.status);
  setField("elViewActiveUntil", el.activeUntil);
  setField("elViewPriority", el.priority || "Обычный");

  const viewMode = document.getElementById("elViewModeContainer");
  const editMode = document.getElementById("elEditModeContainer");
  if (viewMode) viewMode.style.display = "block";
  if (editMode) editMode.style.display = "none";

  navigateTo("emptylegs-view");
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
  setVal("elEditTail", el.tailNumber || "");
  setVal("elEditCurrency", el.currency || "Евро");
  setVal("elEditPax", el.pax);
  setVal("elEditPrice", el.price);
  setVal("elEditStatus", el.status);
  setVal("elEditActiveUntil", el.activeUntil);
  setVal("elEditPriority", el.priority || "Обычный");

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
    el.pax = parseInt(document.getElementById("elEditPax").value, 10) || el.pax;
    el.price = parseInt(document.getElementById("elEditPrice").value, 10) || el.price;
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
  const origin = document.getElementById("elCreateOrigin")?.value;
  const destination = document.getElementById("elCreateDestination")?.value;
  const price = parseInt(document.getElementById("elCreatePrice")?.value, 10) || 5000;

  if (!origin || !destination) {
    showToast("Пожалуйста, заполните пункты вылета и прилета", "error");
    return;
  }

  const newId = "el-" + (appState.emptyLegs.length + 1);

  appState.emptyLegs.unshift({
    id: newId,
    dateTime: document.getElementById("elCreateDateTime")?.value || "28.09.2026, 14:00",
    origin: origin,
    destination: destination,
    planeModel: document.getElementById("elCreatePlane")?.value || "Cessna Citation XLS+",
    tailNumber: document.getElementById("elCreateTail")?.value || "S5-BBM",
    currency: "Евро",
    pax: parseInt(document.getElementById("elCreatePax")?.value, 10) || 8,
    price: price,
    activeUntil: "28.09.2026, 10:00",
    status: "Доступен",
    priority: "Обычный",
    image: "images/citation-exterior.jpg"
  });

  showToast("Empty leg успешно создан!", "success");
  openEmptyLegView(newId);
}

// Initial bootstrap
document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
  renderEmptyLegsTable();
  renderPlaneCalendarTable();
  initInfoPopovers();
  setSandboxTripType("multi");
  recalculateSandbox();

  const hash = window.location.hash.replace("#", "");
  if (hash && ["orders", "fleet", "plane-card", "sandbox", "emptylegs", "emptylegs-view", "emptylegs-create", "manager", "faq", "profile"].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo("fleet");
  }
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && ["orders", "fleet", "plane-card", "sandbox", "emptylegs", "emptylegs-view", "emptylegs-create", "manager", "faq", "profile"].includes(hash)) {
    navigateTo(hash);
  }
});
