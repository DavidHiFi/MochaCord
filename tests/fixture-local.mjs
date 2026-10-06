// Runs the MochaCord acrylic fixture in a LOCAL headless Chromium (Brave),
// no live client needed. Usage: node fixture-local.mjs
import { readFileSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

const repo = 'H:/Discord Configuration/repos/MochaCord';
const themePath = repo + '/MochaCord.css';
const fixturePath = repo + '/tests/acrylic.js';
const midnightPath = 'C:/Users/localuser/AppData/Roaming/TestCord/themes/MochaCord-assets/midnight.css';
const browser = 'C:/Users/localuser/AppData/Local/BraveSoftware/Brave-Browser/Application/brave.exe';
const port = '9555';
const profileDir = process.env.TEMP + '\\opencode\\mochacord-fixture-profile';
const htmlPath = process.env.TEMP + '\\opencode\\mochacord-fixture-page.html';

const stripImports = (s) => s.replace(/@import[^;]+;/g, '');
const midnight = readFileSync(midnightPath, 'utf8');
const theme = stripImports(readFileSync(themePath, 'utf8'));
const fixture = readFileSync(fixturePath, 'utf8');
const html = '<!doctype html><html><head><meta charset="utf-8"><style>' + midnight + '</style><style>' + theme + '</style></head><body class="theme-dark"><div id="app-mount"></div></body></html>';
mkdirSync(process.env.TEMP + '\\opencode', { recursive: true });
writeFileSync(htmlPath, html);

const proc = spawn(browser, [
  '--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + profileDir,
  '--no-first-run', '--disable-gpu', '--hide-scrollbars', '--window-size=1400,3400',
  'file:///' + htmlPath.replace(/\\/g, '/'),
], { stdio: 'ignore' });
const kill = () => { try { proc.kill(); } catch {} };
process.on('exit', kill);

// wait for CDP
let version = null;
for (let i = 0; i < 50 && !version; i++) {
  await new Promise(r => setTimeout(r, 200));
  try { version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch {}
}
if (!version) { console.error('headless browser did not open CDP'); process.exit(1); }

const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page = targets.find(t => t.type === 'page');
if (!page) { console.error('no page target'); process.exit(1); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let n = 0; const pending = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(m.error) : res(m.result); } });
const call = (method, params = {}) => new Promise((res, rej) => { const id = ++n; pending.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
await call('Runtime.enable');

// reload to a clean document state, then run the fixture
await call('Page.enable');
await call('Page.reload', { ignoreCache: true });
await new Promise(r => setTimeout(r, 1200));

const run = await call('Runtime.evaluate', {
  expression: fixture + '\nwindow.dispatchEvent(new Event("load")); true',
  returnByValue: true, awaitPromise: false,
});
if (run.exceptionDetails) { console.error('fixture eval failed:', JSON.stringify(run.exceptionDetails, null, 1)); process.exit(1); }
await new Promise(r => setTimeout(r, 900));
const res = await call('Runtime.evaluate', { expression: 'window.acrylicResults || null', returnByValue: true });
const value = res.result && res.result.value;
if (!value) { console.error('fixture produced no results'); process.exit(1); }
const newIds = ['tooltip-legacy-primary', 'tooltip-legacy-grey', 'tooltip-legacy-red', 'reward-tooltip', 'popout-loader'];
console.log(JSON.stringify({
  count: value.count, fails: value.fail.length, fail: value.fail,
  newCases: (value.results || []).filter(r => newIds.includes(r.id)),
  guards: value.guards.map(g => ({ id: g.id, blur: g.blur })),
}, null, 1));
ws.close();
kill();
rmSync(profileDir, { recursive: true, force: true });
