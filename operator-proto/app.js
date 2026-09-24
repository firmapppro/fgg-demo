// FGG Operator Cabinet - Interactive Application Logic

const appState = {
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
    "plane-card": "Борт Cessna Citation XLS+",
    "sandbox": "Песочница",
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
      topbarAction.innerHTML = `<button class="btn-primary" onclick="navigateTo('plane-card')">+ Добавить борт</button>`;
      topbarAction.style.display = "block";
    } else {
      topbarAction.innerHTML = "";
      topbarAction.style.display = "none";
    }
  }

  if (screenId === "plane-card") {
    setTimeout(() => {
      initPlaneCardMap();
      renderPlaneCalendarTable();
      initInfoPopovers();
    }, 100);
  } else if (screenId === "orders") {
    renderOrders();
  } else if (screenId === "sandbox") {
    setTimeout(() => {
      initInfoPopovers();
    }, 50);
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
        <span class="counter-value">${appState.sandboxPax} пассажиров</span>
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
    span.textContent = `${appState.sandboxPax} пассажиров`;
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
          <table class="leg-calc-table">
            <tbody>
              ${leg.rows.map(r => `
                <tr>
                  <td>${r.desc}</td>
                  <td style="text-align: right; font-weight: 700; color: var(--text-main);">${r.amount}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          ${leg.note ? `
            <div class="leg-acc-note">
              <span class="info-circle" style="width: 14px; height: 14px; font-size: 10px;">i</span>
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

function renderPlaneCalendarTable() {
  const tbody = document.getElementById("planeCalendarTableBody");
  if (!tbody) return;
  const flights = appState.scheduledFlights.filter(f => f.plane === "S5-BBM");
  if (flights.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 20px;">Нет запланированных рейсов для данного борта</td></tr>`;
    return;
  }
  tbody.innerHTML = flights.map(f => `
    <tr>
      <td style="font-weight: 600; color: var(--text-main); font-size: 13px;">${f.depUtc}</td>
      <td style="font-size: 13px;">${f.origin}</td>
      <td style="font-size: 13px;">${f.dest}</td>
      <td style="font-weight: 600; color: var(--text-main); font-size: 13px;">${f.arrUtc}</td>
      <td><span class="badge-strict-neutral">${f.type}</span></td>
      <td style="font-size: 13px;">${f.pax > 0 ? f.pax + " чел." : "—"}</td>
      <td>
        <button type="button" class="btn-secondary btn-sm" onclick="deleteFlightRecord('${f.id}')" style="color: var(--danger); border-color: var(--border-light);">Удалить</button>
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
  renderPlaneCalendarTable();
  showToast(`Рейс успешно добавлен в календарь полетов!`, "success");
}

function deleteFlightRecord(id) {
  const idx = appState.scheduledFlights.findIndex(f => f.id === id);
  if (idx !== -1) {
    appState.scheduledFlights.splice(idx, 1);
    renderPlaneCalendarTable();
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
    statusPill.className = "badge-strict-neutral";
  }
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

// Initial bootstrap
document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
  renderPlaneCalendarTable();
  initInfoPopovers();
  setSandboxTripType("multi");
  recalculateSandbox();

  const hash = window.location.hash.replace("#", "");
  if (hash && ["orders", "fleet", "plane-card", "sandbox", "manager", "faq", "profile"].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo("sandbox");
  }
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && ["orders", "fleet", "plane-card", "sandbox", "manager", "faq", "profile"].includes(hash)) {
    navigateTo(hash);
  }
});
