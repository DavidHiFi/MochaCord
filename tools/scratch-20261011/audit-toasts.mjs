import { writeFileSync } from "node:fs";
const OUT = "H:/Discord Configuration/work/mochacord-toast-audit-20261011";
const list = await (await fetch("http://127.0.0.1:9334/json/list")).json();
const page = list.find(t => t.type === "page" && /discord\.com/.test(t.url)) || list.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((ok, bad) => { ws.onopen = ok; ws.onerror = () => bad(new Error("ws")); });
let n = 0; const pending = new Map();
const call = (method, params = {}) => new Promise(r => { const id = ++n; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
ws.addEventListener("message", e => { const m = JSON.parse(typeof e.data === "string" ? e.data : e.data.toString()); if (m.id && pending.has(m.id)) { const r = pending.get(m.id); pending.delete(m.id); r(m.result ?? { error: m.error }); } });
const evalExpr = async expr => { const v = await call("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }); if (v.error) return { EXC: JSON.stringify(v.error).slice(0, 300) }; if (v.exceptionDetails) return { EXC: JSON.stringify(v.exceptionDetails).slice(0, 300) }; return v.result?.value; };
const result = await evalExpr(`(() => {
  const RX = /toast|notif|chattoast|popup-?toast|dm-?opener|mention/i;
  const info = e => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { cls: [...e.classList].join(" ").slice(0, 120), rect: [r.x, r.y, r.width, r.height].map(v => +v.toFixed(1)), radius: cs.borderRadius, bg: cs.backgroundColor, bf: cs.backdropFilter === "none" ? "no" : "yes", border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow === "none" ? "none" : "yes" }; };
  const roots = [...document.querySelectorAll("body [class]")].filter(e => RX.test([...e.classList].join(" ")) && e.getBoundingClientRect().width > 20 && e.getBoundingClientRect().height > 14 && getComputedStyle(e).visibility !== "hidden");
  // keep only outermost matches
  const outer = roots.filter(e => !roots.some(o => o !== e && o.contains(e)));
  return outer.slice(0, 40).map(e => { const kids = []; const walk = (x, d) => { if (d > 2) return; for (const c of x.children) { if (c.getBoundingClientRect().width > 0) { kids.push({ d, ...info(c) }); walk(c, d + 1); } } }; walk(e, 1); return { root: info(e), ancestor: (e.parentElement && [...e.parentElement.classList].join(" ").slice(0, 80)) || "", kids: kids.slice(0, 8) }; });
})()`);
writeFileSync(OUT + "/audit-toasts.json", JSON.stringify(result, null, 1));
console.log("roots:", Array.isArray(result) ? result.length : result);
for (const x of result) { console.log("ROOT", JSON.stringify(x.root)); for (const k of x.kids) console.log("   ".repeat(k.d) + "└", JSON.stringify(k)); }
ws.close(); process.exit(0);
