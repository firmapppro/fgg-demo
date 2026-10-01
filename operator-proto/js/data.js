// Mock data for the demo. Deterministic (seeded) so the prototype looks the same on every open.

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

export const AIRPORTS = [
  { code: "LJU", city: "Любляна", icao: "LJLJ" }, { code: "LTFM", city: "Стамбул", icao: "LTFM" },
  { code: "LFPB", city: "Париж, Ле-Бурже", icao: "LFPB" }, { code: "EGLL", city: "Лондон, Хитроу", icao: "EGLL" },
  { code: "LFMN", city: "Ницца", icao: "LFMN" }, { code: "EDDB", city: "Берлин", icao: "EDDB" },
  { code: "LSGG", city: "Женева", icao: "LSGG" }, { code: "OMDB", city: "Дубай", icao: "OMDB" },
  { code: "LIML", city: "Милан", icao: "LIML" }, { code: "LEMD", city: "Мадрид", icao: "LEMD" },
  { code: "LOWW", city: "Вена", icao: "LOWW" }, { code: "EDDM", city: "Мюнхен", icao: "EDDM" },
  { code: "UUWW", city: "Москва, Внуково", icao: "UUWW" }, { code: "LGAV", city: "Афины", icao: "LGAV" },
  { code: "LPPT", city: "Лиссабон", icao: "LPPT" }, { code: "EKCH", city: "Копенгаген", icao: "EKCH" },
];
export const airportLabel = (a) => `${a.code}, ${a.city}`;
export const AIRPORT_OPTIONS = AIRPORTS.map((a) => ({ value: a.code, label: airportLabel(a) }));

const MODELS = [
  { name: "Gulfstream G-550", cls: "Heavy", photo: "g550-ext", pax: [8, 14], range: 12501, cabin: "13,4 × 2,2 × 1,9", baggage: 3.6, hour: 5800 },
  { name: "Cessna Citation XLS+", cls: "Midsize", photo: "citation-xls", pax: [6, 9], range: 3700, cabin: "5,6 × 1,7 × 1,7", baggage: 2.0, hour: 3200 },
  { name: "Bombardier Global 6000", cls: "Heavy", photo: "large", pax: [10, 14], range: 11100, cabin: "13,3 × 2,4 × 1,9", baggage: 4.0, hour: 6400 },
  { name: "Embraer Phenom 300", cls: "Light", photo: "small", pax: [6, 8], range: 3650, cabin: "5,0 × 1,6 × 1,5", baggage: 1.5, hour: 2400 },
  { name: "Dassault Falcon 7X", cls: "Heavy", photo: "g550-2", pax: [8, 12], range: 11000, cabin: "12,4 × 2,3 × 1,9", baggage: 3.1, hour: 5600 },
  { name: "Cessna Citation Latitude", cls: "Midsize", photo: "citation-ext", pax: [7, 9], range: 5100, cabin: "6,5 × 1,9 × 1,8", baggage: 2.6, hour: 3500 },
  { name: "Bombardier Challenger 350", cls: "Midsize", photo: "g550-5", pax: [8, 10], range: 5900, cabin: "7,6 × 2,2 × 1,8", baggage: 2.5, hour: 3900 },
];
export const MODEL_OPTIONS = MODELS.map((m) => m.name);

export const FLEET_FIXTURE_STATUSES = ["active", "inactive", "active", "inactive", "active", "active", "inactive", "active", "active"];

function makeFleet() {
  const r = rng(550);
  const list = [];
  const prefixes = ["RA-", "OE-", "D-", "9H-", "G-", "VP-", "T7-", "S5-", "LX-", "N"];
  for (let i = 0; i < 200; i++) {
    const m = MODELS[Math.floor(r() * MODELS.length)];
    const ap = AIRPORTS[Math.floor(r() * AIRPORTS.length)];
    const pax = m.pax[0] + Math.floor(r() * (m.pax[1] - m.pax[0] + 1));
    list.push({
      id: String(12345 + i * 7 + (i % 3)),
      model: m.name, cls: m.cls, photo: m.photo,
      year: 2012 + Math.floor(r() * 12),
      status: r() > 0.32 ? "active" : "inactive",
      tail: prefixes[Math.floor(r() * prefixes.length)] + (10000 + Math.floor(r() * 89999)),
      base: ap.code, pax,
      range: m.range, toilet: r() > 0.2, attendant: r() > 0.45, cabin: m.cabin, baggage: m.baggage, hour: m.hour + Math.floor(r() * 8) * 100,
    });
  }
  // The planes the rest of the demo refers to
  list[0] = { ...list[0], id: "12345", model: "Gulfstream G-550", cls: "Heavy", photo: "g550-ext", year: 2022, status: "active", tail: "RA-78967", base: "LJU", pax: 7, range: 12501, toilet: true, attendant: true, cabin: "13,4 × 2,2 × 1,9", baggage: 3.6, hour: 5800 };
  list[1] = { ...list[1], id: "12352", model: "Gulfstream G-550", cls: "Heavy", photo: "g550-2", year: 2019, status: "inactive", tail: "RA-10222", base: "LJU", pax: 8, range: 12501, toilet: true, attendant: false, cabin: "13,4 × 2,2 × 1,9", baggage: 3.6, hour: 5800 };
  return list;
}
export const FLEET = makeFleet();

export function figmaFixtureFleet() {
  return FLEET_FIXTURE_STATUSES.map((st, i) => ({
    id: "12345", model: "Gulfstream G-550", cls: "Midsize", photo: "g550-ext", year: 2022, status: st,
    tail: "2K-26 Test", base: "LTFM", pax: 7, range: 12501, toilet: true, attendant: true, cabin: "13,4 × 2,2 × 1,9", baggage: 3.6, hour: 5800, _fixture: i,
  }));
}

// Full airport labels used in forms: "ICAO, Name, City, Country"
export const AIRPORT_FULL = [
  "LTBA, Ataturk International Airport, Istanbul, Turkey",
  "LTFM, Istanbul Airport, Istanbul, Turkey",
  "LJLJ, Ljubljana Jože Pučnik Airport, Ljubljana, Slovenia",
  "LFPB, Paris–Le Bourget Airport, Paris, France",
  "EGLL, Heathrow Airport, London, United Kingdom",
  "EGGW, London Luton Airport, London, United Kingdom",
  "LFMN, Nice Côte d'Azur Airport, Nice, France",
  "EDDB, Berlin Brandenburg Airport, Berlin, Germany",
  "LSGG, Geneva Airport, Geneva, Switzerland",
  "OMDB, Dubai International Airport, Dubai, UAE",
  "OMDW, Al Maktoum International Airport, Dubai, UAE",
  "LIML, Milan Linate Airport, Milan, Italy",
  "LEMD, Adolfo Suárez Madrid–Barajas Airport, Madrid, Spain",
  "LOWW, Vienna International Airport, Vienna, Austria",
  "EDDM, Munich Airport, Munich, Germany",
  "UUWW, Vnukovo International Airport, Moscow, Russia",
  "LGAV, Athens International Airport, Athens, Greece",
  "LPPT, Lisbon Humberto Delgado Airport, Lisbon, Portugal",
  "EKCH, Copenhagen Airport, Copenhagen, Denmark",
  "OTHH, Hamad International Airport, Doha, Qatar",
];
export const MODEL_SPECS = {
  "Gulfstream G-550": { range: "4350", maxpax: "12", cabin: "1294х180х210", baggage: "5,52", bags: "12", speed: "828" },
  "Cessna Citation XLS+": { range: "3700", maxpax: "9", cabin: "560х170х170", baggage: "2,1", bags: "8", speed: "815" },
  "Bombardier Global 6000": { range: "11100", maxpax: "14", cabin: "1330х240х190", baggage: "4,0", bags: "14", speed: "902" },
  "Embraer Phenom 300": { range: "3650", maxpax: "8", cabin: "500х160х150", baggage: "1,5", bags: "6", speed: "839" },
  "Dassault Falcon 7X": { range: "11000", maxpax: "12", cabin: "1240х230х190", baggage: "3,1", bags: "10", speed: "900" },
  "Cessna Citation Latitude": { range: "5100", maxpax: "9", cabin: "650х190х180", baggage: "2,6", bags: "9", speed: "826" },
  "Bombardier Challenger 350": { range: "5900", maxpax: "10", cabin: "760х220х180", baggage: "2,5", bags: "10", speed: "870" },
};
