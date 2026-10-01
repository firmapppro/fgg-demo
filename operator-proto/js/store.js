// Demo state in localStorage. "Reset demo" wipes everything and returns to login.
const KEY = "fgg-operator-demo-v2";
let mem = null;
function load() {
  if (mem) return mem;
  try { mem = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { mem = {}; }
  return mem;
}
export const store = {
  get(k, d) { const s = load(); return k in s ? s[k] : d; },
  set(k, v) { const s = load(); s[k] = v; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} },
  reset() { mem = {}; try { localStorage.removeItem(KEY); } catch {} },
};
