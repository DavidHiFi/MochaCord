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
  const vis = e => { const r = e.getBoundingClientRect(); return r.width > 20 && r.height > 14 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; };
  const out = [];
  for (const e of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(e);
    const bf = cs.backdropFilter !== "none" || cs.webkitBackdropFilter !== "none";
    const shadow = cs.boxShadow !== "none";
    const bgOn = cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent";
    if (!(bf || (shadow && bgOn))) continue;
    if (!vis(e)) continue;
    const r = e.getBoundingClientRect();
    if (r.width > innerWidth * 0.7 || r.height > innerHeight * 0.7) continue;
    const cls = [...e.classList].join(" ");
    out.push({ cls: cls.slice(0, 110), tag: e.tagName, rect: [r.x, r.y, r.width, r.height].map(v => +v.toFixed(1)), radius: cs.borderRadius, bg: cs.backgroundColor, bf: bf ? "yes" : "no", border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: shadow ? cs.boxShadow.slice(0, 40) : "none", parent: (e.parentElement?.className || "").toString().slice(0, 60) });
  }
  return out;
})()`);
writeFileSync(OUT + "/audit-surfaces.json", JSON.stringify(result, null, 1));
console.log("count", result.length);
for (const x of result) console.log(`${x.rect.join(",")} r=${x.radius} bf=${x.bf} bg=${x.bg} b=${x.border} | ${x.cls}`);
ws.close(); process.exit(0);
