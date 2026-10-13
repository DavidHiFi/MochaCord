import { writeFileSync } from "node:fs";
const DIR = "H:/Discord Configuration/work/mochacord-toast-audit-20261011";
const list = await (await fetch("http://127.0.0.1:9334/json/list")).json();
const page = list.find(t => t.type === "page" && /discord\.com/.test(t.url)) || list.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((ok, bad) => { ws.onopen = ok; ws.onerror = () => bad(new Error("ws")); });
let n = 0; const pending = new Map();
const call = (method, params = {}) => new Promise(r => { const id = ++n; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
ws.addEventListener("message", e => { const m = JSON.parse(typeof e.data === "string" ? e.data : e.data.toString()); if (m.id && pending.has(m.id)) { const r = pending.get(m.id); pending.delete(m.id); r(m.result ?? { error: m.error }); } });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const evalExpr = async expr => { const v = await call("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }); if (v.error) return { EXC: JSON.stringify(v.error).slice(0, 300) }; if (v.exceptionDetails) return { EXC: JSON.stringify(v.exceptionDetails).slice(0, 300) }; return v.result?.value; };
const mount = await evalExpr(`(() => {
  document.querySelectorAll("[data-mocha-audit-probe]").forEach(e => e.remove());
  const strip = document.querySelector('[class*="chatToasts_"]');
  if (!strip) return "no strip";
  const row = document.createElement("div");
  row.className = "toast_d3c698";
  row.setAttribute("data-mocha-audit-probe", "1");
  row.innerHTML = '<div class="avatar_d3c698" style="width:32px;height:32px;border-radius:50%;background:#89b4fa"></div><div class="messageContentWrapper_d3c698"><div style="color:#cdd6f4;font-size:14px;white-space:nowrap">audit probe message</div></div>';
  strip.appendChild(row);
  return "mounted in " + strip.className.slice(0, 40);
})()`);
console.log(mount);
await sleep(300);
const measure = await evalExpr(`(() => {
  const row = document.querySelector("[data-mocha-audit-probe]");
  if (!row) return { ERR: "no probe" };
  const info = e => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { cls: [...e.classList].join(" ").slice(0,60), rect: [r.x, r.y, r.width, r.height].map(v => +v.toFixed(1)), radius: cs.borderRadius, bg: cs.backgroundColor, bf: cs.backdropFilter === "none" ? "no" : "yes", border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow === "none" ? "none" : cs.boxShadow.slice(0, 70) }; };
  const w = row.querySelector('[class*="messageContentWrapper_"]');
  return { row: info(row), wrapper: info(w) };
})()`);
console.log(JSON.stringify(measure, null, 1));
const r = measure.row?.rect;
if (r) {
  const z = await call("Page.captureScreenshot", { format: "png", clip: { x: r[0] - 14, y: r[1] - 12, width: r[2] + 28, height: r[3] + 24, scale: 4 } });
  writeFileSync(DIR + "/chattoast-probe-before.png", Buffer.from(z.data, "base64"));
  console.log("saved chattoast-probe-before.png");
}
writeFileSync(DIR + "/chattoast-probe-measure.json", JSON.stringify(measure, null, 1));
await evalExpr(`document.querySelectorAll("[data-mocha-audit-probe]").forEach(e => e.remove()); "removed"`);
ws.close(); process.exit(0);
