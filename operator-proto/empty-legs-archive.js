// Empty Legs Archive - removed from main dashboard on 2026-09-24
// Preserved for potential future use
// To restore: add back appState.emptyLegs data and functions to app.js

// === appState.emptyLegs DATA ===
const emptyLegsArchiveData = {
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
};

// === EMPTY LEGS FUNCTIONS ===
function renderEmptyLegsTable() {
  const tbody = document.getElementById("emptyLegsTableBody");
  if (!tbody) return;

  tbody.innerHTML = appState.emptyLegs.map(el => {
    const isActive = el.status === "Активный";
    const statusColor = isActive ? "var(--primary)" : "var(--text-muted)";
    return `
      <tr style="cursor: pointer;" onclick="openEmptyLegView('${el.id}')">
        <td style="font-weight: 700; color: var(--primary);">${el.id}</td>
        <td><strong style="color: var(--text-main); font-family: monospace, monospace; font-size: 13px;">${el.tailNumber || "—"}</strong></td>
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

