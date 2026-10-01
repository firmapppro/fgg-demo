// Empty legs: seeded demo records + edits made in the demo (kept in localStorage via store)
import { store } from "./store.js";
import { AIRPORTS, FLEET, airportLabel } from "./data.js";

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

export const PRIORITIES = ["Приоритетный", "Срочный"];
export const apLabel = (code) => { const a = AIRPORTS.find((x) => x.code === code); return a ? airportLabel(a) : code || ""; };

const PHOTO_BY_MODEL = { "Gulfstream G-550": "g550-ext", "Cessna Citation XLS+": "citation-xls", "Bombardier Global 6000": "large", "Embraer Phenom 300": "small", "Dassault Falcon 7X": "g550-2", "Cessna Citation Latitude": "citation-ext", "Bombardier Challenger 350": "g550-5" };

function seed() {
  const r = rng(2026);
  const list = [];
  const base = new Date(2026, 9, 3, 8, 0).getTime(); // 3 Oct 2026
  for (let i = 0; i < 46; i++) {
    const plane = FLEET[Math.floor(r() * 40)];
    let a = AIRPORTS[Math.floor(r() * AIRPORTS.length)], b = AIRPORTS[Math.floor(r() * AIRPORTS.length)];
    if (a === b) b = AIRPORTS[(AIRPORTS.indexOf(a) + 5) % AIRPORTS.length];
    if (i % 5 === 0) a = AIRPORTS.find((x) => x.code === plane.base) || a;
    const from = base + Math.floor(r() * 60) * 3600e3 * 6;
    const range = r() > 0.7 ? from + (24 + Math.floor(r() * 3) * 24) * 3600e3 : null;
    const until = from + (12 + Math.floor(r() * 5) * 12) * 3600e3;
    const pr = r();
    list.push({
      id: String(i + 1), from: a.code, to: b.code, at: from, atTo: range, until,
      cost: (4 + Math.floor(r() * 70)) * 100000 + Math.floor(r() * 5) * 50000,
      status: r() > 0.45 ? "active" : "inactive", priority: pr > 0.85 ? "Срочный" : pr > 0.6 ? "Приоритетный" : "",
      model: plane.model, planeId: plane.id, pax: Math.max(2, plane.pax - Math.floor(r() * 3)),
      photos: [PHOTO_BY_MODEL[plane.model] || "g550-ext"],
    });
  }
  // The leg the Figma designs show
  list[0] = { ...list[0], from: "LJU", to: "LFMN", at: new Date(2026, 8, 5, 23, 5).getTime(), atTo: null, until: new Date(2026, 8, 7, 23, 5).getTime(), cost: 9450000, status: "inactive", priority: "Срочный", model: "Gulfstream G-550", planeId: "12352", pax: 10, photos: ["g550-ext"] };
  return list;
}
const SEED = seed();

export function getLegs() {
  const del = new Set(store.get("legsDeleted", []));
  const edit = store.get("legsEdit", {});
  const created = store.get("legsNew", []);
  return [...SEED, ...created].filter((l) => !del.has(l.id)).map((l) => (edit[l.id] ? { ...l, ...edit[l.id] } : l));
}
export const getLeg = (id) => getLegs().find((l) => l.id === String(id));

export function saveLeg(rec) {
  if (rec.id) {
    const created = store.get("legsNew", []);
    const ci = created.findIndex((l) => l.id === rec.id);
    if (ci >= 0) { created[ci] = { ...created[ci], ...rec }; store.set("legsNew", created); }
    else { const edit = store.get("legsEdit", {}); edit[rec.id] = rec; store.set("legsEdit", edit); }
    return rec.id;
  }
  const all = [...SEED, ...store.get("legsNew", [])];
  const id = String(Math.max(0, ...all.map((l) => Number(l.id))) + 1);
  const created = store.get("legsNew", []);
  created.push({ ...rec, id });
  store.set("legsNew", created);
  return id;
}
export function deleteLeg(id) {
  const del = store.get("legsDeleted", []);
  if (!del.includes(id)) del.push(id);
  store.set("legsDeleted", del);
}

// Figma-identical list: 200 identical rows (20 pages); statuses repeat the pattern from the design
const FIG_STATUS = ["inactive", "inactive", "inactive", "active", "inactive", "active", "inactive", "active", "inactive", "inactive"];
export function figmaLegs() {
  const at = new Date(2026, 1, 19, 23, 5).getTime();
  return Array.from({ length: 200 }, (_, i) => ({
    id: String(i + 1), from: "LJU", to: "LFMN", at, atTo: null, until: at, cost: 9450000,
    status: FIG_STATUS[i % 10], priority: "Срочный", model: "Gulfstream G550", planeId: "12352", pax: 10, photos: ["g550-ext"],
  }));
}
