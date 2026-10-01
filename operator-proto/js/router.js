// Tiny hash router: "#/fleet/12345?x=1"  ->  { path, parts, params, query }
const routes = [];
export function route(pattern, handler) {
  const keys = [];
  const re = new RegExp("^" + pattern.replace(/:([a-zA-Z]+)/g, (_, k) => { keys.push(k); return "([^/]+)"; }) + "/?$");
  routes.push({ re, keys, handler, pattern });
}
export function parse() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, qs] = raw.split("?");
  const query = Object.fromEntries(new URLSearchParams(qs || ""));
  return { path, query };
}
export function resolve() {
  const { path, query } = parse();
  for (const r of routes) {
    const m = path.match(r.re);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
      return { handler: r.handler, params, query, path, pattern: r.pattern };
    }
  }
  return null;
}
export function go(path) { if (location.hash === "#" + path) window.dispatchEvent(new HashChangeEvent("hashchange")); else location.hash = path; }
