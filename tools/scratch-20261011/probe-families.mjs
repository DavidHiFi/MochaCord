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
const families = ["vc-notification-root", "vc-toast-notifications-notification-root", "customToast__35cac", "errorNotificationContainer_e13eda", "vc-testcord-tab-editor-toast"];
const varVal = await evalExpr(`getComputedStyle(document.body).getPropertyValue("--vc-toast-notifications-border-radius").trim() || "unset"`);
console.log("--vc-toast-notifications-border-radius:", varVal);
let y = 300;
for (const fam of families) {
  await evalExpr(`document.querySelectorAll("[data-mocha-audit-probe]").forEach(e => e.remove()); "ok"`);
  const mount = await evalExpr(`(() => {
    const root = document.createElement("div");
    root.className = ${JSON.stringify(fam)};
    root.setAttribute("data-mocha-audit-probe", "1");
    root.style.cssText = "position:fixed;left:900px;top:${y}px;width:300px;height:60px;z-index:99999;display:flex;align-items:center;padding:8px";
    root.innerHTML = '<div style="width:100%;height:44px;border-radius:12px;background:#1e1e2e;display:flex;align-items:center;padding:0 12px;color:#cdd6f4;font-size:13px">probe ' + ${JSON.stringify(fam.slice(0, 12))} + '</div>';
    document.body.appendChild(root);
    const cs = getComputedStyle(root); const r = root.getBoundingClientRect();
    return { fam: ${JSON.stringify(fam)}, rect: [r.x, r.y, r.width, r.height].map(v => +v.toFixed(1)), radius: cs.borderRadius, bg: cs.backgroundColor, bf: cs.backdropFilter === "none" ? "no" : "yes", border: cs.borderTopWidth + " " + cs.borderTopColor, shadow: cs.boxShadow === "none" ? "none" : "yes" };
  })()`);
  console.log(JSON.stringify(mount));
  await sleep(120);
  const z = await call("Page.captureScreenshot", { format: "png", clip: { x: 884, y: y - 10, width: 332, height: 80, scale: 2 } });
  writeFileSync(DIR + "/probe-" + fam.replace(/[^a-z0-9]/gi, "_").slice(0, 40) + ".png", Buffer.from(z.data, "base64"));
  y += 90;
}
await evalExpr(`document.querySelectorAll("[data-mocha-audit-probe]").forEach(e => e.remove()); "cleaned"`);
ws.close(); process.exit(0);
