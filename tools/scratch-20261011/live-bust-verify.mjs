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
console.log(await evalExpr(`(() => { document.getElementById("mocha-audit-toast")?.remove(); const s = document.getElementById("vencord-themes"); if (!s) return "no vencord-themes"; s.textContent = s.textContent.replace(/v=\d+/, "v=" + Date.now()); return "test style removed, re-busted: " + s.textContent.slice(-40); })()`));
await sleep(1200);
const info = `(e => { if (!e) return null; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { rect: [r.x, r.y, r.width, r.height].map(v => +v.toFixed(1)), radius: cs.borderRadius, bg: cs.backgroundColor, bf: cs.backdropFilter === "none" ? "no" : "yes", border: cs.borderTopWidth, shadow: cs.boxShadow === "none" ? "none" : "yes" }; })`;
await evalExpr(`Vencord.Webpack.Common.Toasts.show(Vencord.Webpack.Common.Toasts.create("final-top-check","message"))`);
await sleep(600);
const top = await evalExpr(`(() => { const root = [...document.querySelectorAll('[class*="toast_" i]')].find(e => /final-top-check/.test(e.textContent) || e.getBoundingClientRect().width > 0 && /top_/.test(e.parentElement?.className || "")); if (!root) return null; const w = root.querySelector('[class*="wrapper_"]'); return { root: (${info})(root), wrapper: (${info})(w) }; })()`);
console.log("TOP", JSON.stringify(top));
const tr = top?.root?.rect;
if (tr) { const z = await call("Page.captureScreenshot", { format: "png", clip: { x: tr[0] - 12, y: tr[1] - 8, width: tr[2] + 24, height: tr[3] + 16, scale: 3 } }); writeFileSync(DIR + "/final-top.png", Buffer.from(z.data, "base64")); }
await sleep(2600);
await evalExpr(`(() => { const strip = document.querySelector('[class*="chatToasts_"]'); const row = document.createElement("div"); row.className = "toast_d3c698"; row.setAttribute("data-mocha-audit-probe", "1"); row.innerHTML = '<div class="avatar_d3c698" style="width:32px;height:32px;border-radius:50%;background:#89b4fa"></div><div class="messageContentWrapper_d3c698"><div style="color:#cdd6f4;font-size:14px;white-space:nowrap">final chat check</div></div>'; strip.appendChild(row); return "row"; })()`);
await sleep(300);
const chat = await evalExpr(`(() => { const row = document.querySelector("[data-mocha-audit-probe]"); const w = row.querySelector('[class*="messageContentWrapper_"]'); return { row: (${info})(row), pill: (${info})(w) }; })()`);
console.log("CHAT", JSON.stringify(chat));
const cr = chat?.row?.rect;
if (cr) { const z = await call("Page.captureScreenshot", { format: "png", clip: { x: cr[0] - 14, y: cr[1] - 12, width: cr[2] + 28, height: cr[3] + 24, scale: 4 } }); writeFileSync(DIR + "/final-chat.png", Buffer.from(z.data, "base64")); }
await evalExpr(`document.querySelectorAll("[data-mocha-audit-probe]").forEach(e => e.remove()); "probe removed"`);
ws.close(); process.exit(0);
