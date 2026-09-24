// FGG Operator Cabinet - Interactive Application Logic

const appState = {
  currentScreen: "sandbox",
  isLoggedIn: true,
  user: {
    company: "Avia Charter Partner Ltd.",
    aoc: "AOC #EU-884920",
    dispatcher: "Артем Чипулис (OPS Lead)",
    email: "ops@aviacharter.aero",
    phone: "+49 30 9283 4401"
  },
  activePlaneId: "xls-s5bbm",
  planeVersionTab: "draft", // "draft" vs "published"
  planeStatus: "active", // "active", "moderation", "draft"
  sandboxSettingsVersion: "draft", // "draft" vs "published"
  sandboxLocationMode: "manual", // "manual" vs "plane"
  sandboxAirport: "LJU, Ljubljana",
  sandboxTripType: "multi", // "one", "round", "multi"
  selectedCountries: ["EE", "DE", "FR", "IT", "ES", "AT", "CH", "GB", "NL", "BE", "PT", "US", "CA"],
  orders: [
    {
      id: "ORD-8492",
      flightNumber: "FGG-702",
      route: "LJU → BER → NCE",
      routeFull: "Любляна (LJU) → Берлин (BER) → Ницца (NCE)",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      date: "28.09.2026",
      time: "11:30 UTC",
      pax: 6,
      operatorPrice: 38500,
      status: "pending",
      statusLabel: "Требует подтверждения",
      slaMinutesLeft: 18,
      notes: "VIP-кейтеринг + 4 места негабаритного багажа"
    },
    {
      id: "ORD-8488",
      flightNumber: "FGG-690",
      route: "VKO → DXB",
      routeFull: "Москва (VKO) → Дубай (DXB, Al Maktoum)",
      plane: "Gulfstream G550 (RA-10222)",
      date: "02.10.2026",
      time: "14:00 UTC",
      pax: 8,
      operatorPrice: 118400,
      status: "confirmed",
      statusLabel: "Подтвержден",
      slaMinutesLeft: null,
      notes: "Разрешения на пролет получены"
    },
    {
      id: "ORD-8472",
      flightNumber: "FGG-654",
      route: "GVA → LTN",
      routeFull: "Женева (GVA) → Лондон (LTN, Luton)",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      date: "22.09.2026",
      time: "19:15 UTC",
      pax: 4,
      operatorPrice: 16200,
      status: "in_flight",
      statusLabel: "В полете",
      slaMinutesLeft: null,
      notes: "Борт в воздухе, эшелон FL410"
    },
    {
      id: "ORD-8460",
      flightNumber: "FGG-610",
      route: "FCO → IST",
      routeFull: "Рим (FCO) → Стамбул (IST)",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      date: "15.09.2026",
      time: "10:00 UTC",
      pax: 5,
      operatorPrice: 24000,
      status: "completed",
      statusLabel: "Завершен",
      slaMinutesLeft: null,
      notes: "Акт выполненных работ подписан"
    },
    {
      id: "ORD-8451",
      flightNumber: "FGG-590",
      route: "MUC → OLB",
      routeFull: "Мюнхен (MUC) → Ольбия (OLB)",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      date: "12.09.2026",
      time: "08:30 UTC",
      pax: 7,
      operatorPrice: 21500,
      status: "rejected",
      statusLabel: "Отклонен",
      slaMinutesLeft: null,
      notes: "Причина: Внеплановое ТО авионики"
    }
  ],
  emptyLegs: [
    {
      id: "EL-104",
      plane: "Cessna Citation XLS+ (S5-BBM)",
      from: "NCE, Ницца (Франция)",
      to: "LJU, Любляна (Словения)",
      date: "25.09.2026",
      time: "14:00 - 18:00 UTC",
      price: 5900,
      paxMax: 8,
      status: "active"
    },
    {
      id: "EL-103",
      plane: "Gulfstream G550 (RA-10222)",
      from: "DXB, Дубай (ОАЭ)",
      to: "IST, Стамбул (Турция)",
      date: "04.10.2026",
      time: "09:00 - 15:00 UTC",
      price: 24500,
      paxMax: 14,
      status: "active"
    }
  ]
};

// Toast notification helper
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
  }, 3500);
}

// Navigation between screens
function navigateTo(screenId) {
  appState.currentScreen = screenId;
  
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.getAttribute("data-screen") === screenId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  document.querySelectorAll(".screen-view").forEach(view => {
    view.style.display = "none";
  });
  
  const targetView = document.getElementById(`screen-${screenId}`);
  if (targetView) {
    targetView.style.display = "block";
  }

  const topbarTitle = document.getElementById("topbarPageTitle");
  if (topbarTitle) {
    const titles = {
      "orders": "Входящие заказы",
      "fleet": "Мой флот",
      "plane-card": "Карточка борта: Cessna Citation XLS+",
      "sandbox": "Песочница тарифов (Sandbox)",
      "emptylegs": "Управление Empty Legs",
      "schedule": "Календарь занятости флота",
      "faq": "База знаний и Регламенты FGG",
      "profile": "Профиль компании и Настройки"
    };
    topbarTitle.textContent = titles[screenId] || "Кабинет оператора";
  }

  if (screenId === "plane-card") {
    setTimeout(initPlaneCardMap, 100);
  } else if (screenId === "orders") {
    renderOrders();
  } else if (screenId === "emptylegs") {
    renderEmptyLegs();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Plane card version tab switch: "draft" vs "published"
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
    showToast("Отображаются параметры Черновика v13 (измененные поля выделены синим)", "info");
  } else {
    cardDraft.classList.remove("is-active-tab");
    cardPublished.classList.add("is-active-tab");
    if (diffCard) diffCard.style.display = "none";
    if (noteBanner) {
      noteBanner.innerHTML = `<svg class="informer-icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div><strong>Опубликованная версия v12 (Активна).</strong> Это действующие параметры борта в системе FGG. Для внесения изменений переключитесь на «Черновик».</div>`;
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
    showToast("Отображаются действующие опубликованные параметры v12", "info");
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
    statusPill.innerHTML = `<span class="sla-dot" style="background:#D97706;"></span> На модерации FGG`;
  }
  showToast("Пакет изменений отправлен координатору FGG. Ожидайте подтверждения (до 2 часов)", "warning");
}

// Vector map logic for Section 4 in Plane Card
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
          initial: {
            fill: "#CBD5E1",
            fillOpacity: 1,
            stroke: "#FFFFFF",
            strokeWidth: 0.5
          },
          hover: {
            fillOpacity: 0.85,
            cursor: "pointer"
          },
          selected: {
            fill: "#2563EB"
          },
          selectedHover: {
            fill: "#1D4ED8"
          }
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
  showToast(`Применен пресет: ${presetName.toUpperCase()}`, "info");
}

// Sandbox Calculator Logic
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

function setSandboxTripType(type) {
  appState.sandboxTripType = type;
  showToast(`Выбран режим: ${type === "one" ? "В одну сторону" : type === "round" ? "В обе стороны" : "Мульти-лег"}`, "info");
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
    <div>
      <input type="text" class="form-control" value="Лазурный Берег, NCE, Ницца, Франция" placeholder="Откуда">
    </div>
    <div>
      <input type="text" class="form-control" value="Юлемисте, TLL, Таллин, Эстония" placeholder="Куда">
    </div>
    <div>
      <input type="date" class="form-control" value="2026-11-18">
    </div>
    <div>
      <input type="time" class="form-control" value="14:00">
    </div>
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
  showToast("Форма маршрута сброшена к исходным значениям", "info");
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

// Orders management logic
let activeOrderId = null;
function renderOrders() {
  const container = document.getElementById("ordersTableBody");
  if (!container) return;

  container.innerHTML = appState.orders.map(order => {
    let statusClass = "draft";
    if (order.status === "confirmed") statusClass = "active";
    if (order.status === "pending") statusClass = "moderation";
    if (order.status === "in_flight") statusClass = "diff-alert";
    if (order.status === "rejected") statusClass = "draft";

    const isPending = order.status === "pending";

    return `
      <tr>
        <td>
          <div style="font-weight:800; color:var(--text-main); font-size:14px;">${order.id}</div>
          <div style="font-size:12px; color:var(--text-muted);">${order.flightNumber}</div>
        </td>
        <td>
          <div style="font-weight:700; color:var(--text-main); font-size:14px;">${order.route}</div>
          <div style="font-size:12px; color:var(--text-muted);">${order.routeFull}</div>
        </td>
        <td>
          <div style="font-weight:600; color:var(--text-secondary);">${order.plane}</div>
        </td>
        <td>
          <div style="font-weight:600; color:var(--text-main);">${order.date}</div>
          <div style="font-size:12px; color:var(--text-muted);">${order.time} · ${order.pax} PAX</div>
        </td>
        <td>
          <div style="font-size:15px; font-weight:800; color:var(--primary);">€${order.operatorPrice.toLocaleString("ru-RU")}</div>
        </td>
        <td>
          <span class="status-pill ${statusClass}">
            ${isPending ? `<span class="sla-dot"></span>` : ""}
            ${order.statusLabel}
          </span>
          ${order.slaMinutesLeft ? `<div style="font-size:11px; color:#DC2626; font-weight:700; margin-top:4px;">SLA: ${order.slaMinutesLeft} мин осталось</div>` : ""}
        </td>
        <td style="text-align:right;">
          ${isPending ? `
            <div style="display:inline-flex; gap:6px;">
              <button class="btn-primary btn-sm" onclick="openConfirmOrder('${order.id}')">Подтвердить</button>
              <button class="btn-secondary btn-sm" onclick="openModifyPriceOrder('${order.id}')">Изменить цену</button>
              <button class="btn-danger-outline btn-sm" onclick="openRejectOrder('${order.id}')">Отклонить</button>
            </div>
          ` : `
            <button class="btn-secondary btn-sm" onclick="showToast('Детализация рейса ${order.id} открыта', 'info')">Подробнее</button>
          `}
        </td>
      </tr>
    `;
  }).join("");
}

function openConfirmOrder(orderId) {
  activeOrderId = orderId;
  const order = appState.orders.find(o => o.id === orderId);
  if (!order) return;
  document.getElementById("confirmOrderDetails").innerHTML = `
    <div style="background:var(--bg-subtle); padding:16px; border-radius:10px; border:1px solid var(--border-light); font-size:13px; line-height:1.6;">
      <p><strong>Рейс:</strong> ${order.id} (${order.flightNumber})</p>
      <p><strong>Маршрут:</strong> ${order.routeFull}</p>
      <p><strong>Дата и время:</strong> ${order.date}, ${order.time}</p>
      <p><strong>Воздушное судно:</strong> ${order.plane}</p>
      <p><strong>Стоимость оператора:</strong> €${order.operatorPrice.toLocaleString("ru-RU")}</p>
    </div>
  `;
  document.getElementById("modalConfirmOrder").classList.add("active");
}

function confirmOrderAction() {
  const order = appState.orders.find(o => o.id === activeOrderId);
  if (order) {
    order.status = "confirmed";
    order.statusLabel = "Подтвержден";
    order.slaMinutesLeft = null;
  }
  closeModal("modalConfirmOrder");
  renderOrders();
  showToast(`Заказ ${activeOrderId} успешно подтвержден. Данные переданы координаторам FGG`, "success");
}

function openModifyPriceOrder(orderId) {
  activeOrderId = orderId;
  const order = appState.orders.find(o => o.id === orderId);
  if (!order) return;
  document.getElementById("modifyPriceInput").value = order.operatorPrice + 2000;
  document.getElementById("modalModifyPrice").classList.add("active");
}

function submitModifiedPrice() {
  const newPrice = parseInt(document.getElementById("modifyPriceInput").value);
  const comment = document.getElementById("modifyPriceComment").value;
  const order = appState.orders.find(o => o.id === activeOrderId);
  if (order && newPrice) {
    order.operatorPrice = newPrice;
    order.status = "pending";
    order.statusLabel = "Цена скорректирована";
    order.notes = `Запрос новой цены €${newPrice.toLocaleString("ru-RU")}: ${comment || "Без комментария"}`;
  }
  closeModal("modalModifyPrice");
  renderOrders();
  showToast(`Встречное предложение по заказу ${activeOrderId} отправлено координатору`, "info");
}

function openRejectOrder(orderId) {
  activeOrderId = orderId;
  document.getElementById("modalRejectOrder").classList.add("active");
}

function submitRejectOrder() {
  const reason = document.getElementById("rejectReasonSelect").value;
  const order = appState.orders.find(o => o.id === activeOrderId);
  if (order) {
    order.status = "rejected";
    order.statusLabel = "Отклонен";
    order.slaMinutesLeft = null;
    order.notes = `Отклонен оператором. Причина: ${reason}`;
  }
  closeModal("modalRejectOrder");
  renderOrders();
  showToast(`Заказ ${activeOrderId} отклонен`, "error");
}

// Empty legs management
function renderEmptyLegs() {
  const tbody = document.getElementById("emptyLegsTableBody");
  if (!tbody) return;
  tbody.innerHTML = appState.emptyLegs.map(el => `
    <tr>
      <td><span style="font-weight:800; color:var(--text-main);">${el.id}</span></td>
      <td><span style="font-weight:700;">${el.plane}</span></td>
      <td>
        <div><strong>${el.from}</strong> → <strong>${el.to}</strong></div>
        <div style="font-size:12px; color:var(--text-muted);">${el.date} (${el.time})</div>
      </td>
      <td><span style="font-size:16px; font-weight:800; color:var(--primary);">€${el.price.toLocaleString("ru-RU")}</span></td>
      <td><span>до ${el.paxMax} PAX</span></td>
      <td><span class="status-pill active">Опубликован</span></td>
      <td style="text-align:right;">
        <button class="btn-danger-outline btn-sm" onclick="deleteEmptyLeg('${el.id}')">Снять с публикации</button>
      </td>
    </tr>
  `).join("");
}

function openCreateEmptyLegModal() {
  document.getElementById("modalCreateEmptyLeg").classList.add("active");
}

function createEmptyLeg() {
  const from = document.getElementById("elOrigin").value;
  const to = document.getElementById("elDestination").value;
  const date = document.getElementById("elDate").value;
  const price = parseInt(document.getElementById("elPrice").value) || 6500;

  if (!from || !to) {
    showToast("Пожалуйста, заполните аэропорты вылета и прилета", "error");
    return;
  }

  const newId = `EL-${100 + appState.emptyLegs.length + 1}`;
  appState.emptyLegs.unshift({
    id: newId,
    plane: "Cessna Citation XLS+ (S5-BBM)",
    from: from,
    to: to,
    date: date || "2026-09-30",
    time: "12:00 - 16:00 UTC",
    price: price,
    paxMax: 8,
    status: "active"
  });

  closeModal("modalCreateEmptyLeg");
  renderEmptyLegs();
  showToast(`Спецпредложение ${newId} опубликовано в каталоге FGG!`, "success");
}

function deleteEmptyLeg(id) {
  appState.emptyLegs = appState.emptyLegs.filter(el => el.id !== id);
  renderEmptyLegs();
  showToast(`Рейс ${id} снят с публикации`, "info");
}

// 2FA login simulation
function handleLoginStep1(event) {
  event.preventDefault();
  document.getElementById("authStep1").style.display = "none";
  document.getElementById("authStep2").style.display = "block";
  startCodeTimer();
  showToast("SMS-код подтверждения отправлен на привязанный телефон", "info");
}

let codeTimerInterval = null;
function startCodeTimer() {
  let seconds = 60;
  const timerEl = document.getElementById("authTimerText");
  const resendBtn = document.getElementById("authResendBtn");
  if (resendBtn) resendBtn.style.display = "none";

  if (codeTimerInterval) clearInterval(codeTimerInterval);
  codeTimerInterval = setInterval(() => {
    seconds--;
    if (timerEl) timerEl.textContent = `Повторная отправка через ${seconds} сек`;
    if (seconds <= 0) {
      clearInterval(codeTimerInterval);
      if (timerEl) timerEl.textContent = "";
      if (resendBtn) resendBtn.style.display = "inline";
    }
  }, 1000);
}

function handleLoginStep2(event) {
  event.preventDefault();
  appState.isLoggedIn = true;
  document.getElementById("authModalScreen").style.display = "none";
  document.getElementById("appContainer").style.display = "flex";
  navigateTo("sandbox");
  showToast("Вход выполнен успешно. Добро пожаловать в Кабинет оператора!", "success");
}

function logout() {
  appState.isLoggedIn = false;
  document.getElementById("appContainer").style.display = "none";
  document.getElementById("authModalScreen").style.display = "flex";
  document.getElementById("authStep1").style.display = "block";
  document.getElementById("authStep2").style.display = "none";
  showToast("Вы успешно вышли из системы", "info");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
  renderEmptyLegs();
  const hash = window.location.hash.replace("#", "");
  if (hash && ["orders", "fleet", "plane-card", "sandbox", "emptylegs", "schedule", "faq", "profile"].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo("sandbox");
  }
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && ["orders", "fleet", "plane-card", "sandbox", "emptylegs", "schedule", "faq", "profile"].includes(hash)) {
    navigateTo(hash);
  }
});
