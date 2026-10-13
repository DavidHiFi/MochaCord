import { readFileSync, writeFileSync } from "node:fs";
const DIR = "H:/Discord Configuration/work/mochacord-toast-audit-20261011";
const file = readFileSync(DIR + "/MochaCord.css", "utf8").replace(/\r/g, "");
const start = file.indexOf("/* Discord's native toasts");
const end = file.indexOf("/* The persistent notification history");
const block = file.slice(start, end);
if (start < 0 || end < 0) throw new Error("markers not found");
const list = await (await fetch("http://127.0.0.1:9334/json/list")).json();
const page = list.find(t => t.type === "page" && /discord\.com/.test(t.url)) || list.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((ok, bad) => { ws.onopen = ok; ws.onerror = () => bad(new Error("ws")); });
let n = 0; const pending = new Map();
const call = (method, params = {}) => new Promise(r => { const id = ++n; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
ws.addEventListener("message", e => { const m = JSON.parse(typeof e.data === "string" ? e.data : e.data.toString()); if (m.id && pending.has(m.id)) { const r = pending.get(m.id); pending.delete(m.id); r(m.result ?? { error: m.error }); } });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const evalExpr = async expr => { const v = await call("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }); if (v.error) return { EXC: JSON.stringify(v.error).slice(0, 300) }; if (v.exceptionDetails) return { EXC: JSON.stringify(v.exceptionDetails).slice(0, 300) }; return v.result?.value; };
const measure = `(() => {
  const info = e => { if (!e) return null; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { cls: [...e.classList].join(" ").slice(0, 50), rect: [r.x, r.y, r.width, r.height].map(v => +v.toFixed(1)), radius: cs.borderRadius, bg: cs.backgroundColor, bf: cs.backdropFilter === "none" ? "no" : "yes", border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow === "none" ? "none" : "yes" }; };
  const roots = [...document.querySelectorAll('[class*="toast_" i]')].filter(e => !/customToast/i.test(e.className) && e.getBoundingClientRect().width > 0);
  return roots.map(root => ({ root: info(root), wrapper: info(root.querySelector('[class*="wrapper_"], [class*="messageContentWrapper_"]')), text: root.textContent.trim().slice(0, 30) }));
})()`;
// 1. inject the new block
const injected = await evalExpr(`(() => { document.getElementById("mocha-audit-toast")?.remove(); const s = document.createElement("style"); s.id = "mocha-audit-toast"; s.textContent = ${JSON.stringify(block)}; document.head.appendChild(s); return "injected " + s.textContent.length + " chars"; })()`);
console.log(injected);
// 2. top toast (plugin path) and success variant
await evalExpr(`Vencord.Webpack.Common.Toasts.show(Vencord.Webpack.Common.Toasts.create("audit-top-message","message"))`);
await sleep(600);
const topMeasure = await evalExpr(measure);
console.log("TOP:", JSON.stringify(topMeasure));
const topRect = topMeasure?.[0]?.root?.rect;
if (topRect) { const z = await call("Page.captureScreenshot", { format: "png", clip: { x: topRect[0] - 12, y: topRect[1] - 8, width: topRect[2] + 24, height: topRect[3] + 16, scale: 3 } }); writeFileSync(DIR + "/live-top-after.png", Buffer.from(z.data, "base64")); }
await sleep(2600);
// 3. chat row probe
await evalExpr(`(() => { document.querySelectorAll("[data-mocha-audit-probe]").forEach(e => e.remove()); const strip = document.querySelector('[class*="chatToasts_"]'); const row = document.createElement("div"); row.className = "toast_d3c698"; row.setAttribute("data-mocha-audit-probe", "1"); row.innerHTML = '<div class="avatar_d3c698" style="width:32px;height:32px;border-radius:50%;background:#89b4fa"></div><div class="messageContentWrapper_d3c698"><div style="color:#cdd6f4;font-size:14px;white-space:nowrap">audit probe message</div></div>'; strip.appendChild(row); return "row"; })()`);
await sleep(300);
const chatMeasure = await evalExpr(`(() => { const row = document.querySelector("[data-mocha-audit-probe]"); const info = e => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { rect: [r.x, r.y, r.width, r.height].map(v => +v.toFixed(1)), radius: cs.borderRadius, bg: cs.backgroundColor, bf: cs.backdropFilter === "none" ? "no" : "yes", border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow === "none" ? "none" : "yes" }; }; const w = row.querySelector('[class*="messageContentWrapper_"]'); return { row: info(row), pill: info(w) }; })()`);
console.log("CHAT:", JSON.stringify(chatMeasure));
const cr = chatMeasure?.row?.rect;
if (cr) { const z = await call("Page.captureScreenshot", { format: "png", clip: { x: cr[0] - 14, y: cr[1] - 12, width: cr[2] + 28, height: cr[3] + 24, scale: 4 } }); writeFileSync(DIR + "/live-chat-after.png", Buffer.from(z.data, "base64")); }
await evalExpr(`document.querySelectorAll("[data-mocha-audit-probe]").forEach(e => e.remove()); "removed probe"`);
ws.close(); process.exit(0);
