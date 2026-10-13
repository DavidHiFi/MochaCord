const list = await (await fetch("http://127.0.0.1:9334/json/list")).json();
const page = list.find(t => t.type === "page" && /discord\.com/.test(t.url)) || list.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((ok, bad) => { ws.onopen = ok; ws.onerror = () => bad(new Error("ws")); });
let n = 0; const pending = new Map();
const call = (method, params = {}) => new Promise(r => { const id = ++n; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
ws.addEventListener("message", e => { const m = JSON.parse(typeof e.data === "string" ? e.data : e.data.toString()); if (m.id && pending.has(m.id)) { const r = pending.get(m.id); pending.delete(m.id); r(m.result ?? { error: m.error }); } });
const evalExpr = async expr => { const v = await call("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }); if (v.error) return { EXC: JSON.stringify(v.error).slice(0, 300) }; if (v.exceptionDetails) return { EXC: JSON.stringify(v.exceptionDetails).slice(0, 300) }; return v.result?.value; };
const result = await evalExpr(`(() => {
  const RX = /vc-notification-root|vc-toast-notifications-notification-root|vc-testcord-tab-editor-toast|customToast_|errorNotificationContainer_|vc-notification-icon|vc-toast-notifications-notification-icon|vc-notification-progressbar/;
  const out = [];
  const walk = rules => { for (const r of rules) { if (r.cssRules && !r.selectorText) { walk(r.cssRules); continue; } if (r.selectorText && RX.test(r.selectorText) && /border-radius|radius|background|box-shadow/.test(r.cssText)) out.push(r.cssText.replace(/color-scheme[^;]*;|forced-color[^;]*;|math-depth[^;]*;|position[^;]*;|text-size[^;]*;|appearance[^;]*;|font[^;]*;|text[^;]*;|inset[^;]*;|display[^;]*;/g, "").slice(0, 300)); } };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch (e) {} }
  return out.slice(0, 30);
})()`);
if (Array.isArray(result)) for (const r of result) console.log(r);
else console.log(JSON.stringify(result));
ws.close(); process.exit(0);
