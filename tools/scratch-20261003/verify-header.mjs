import { readFileSync, writeFileSync } from 'node:fs';
const upstream = await (await fetch('https://refact0r.github.io/midnight-discord/build/midnight.css')).text();
writeFileSync(new URL('./midnight-verification.css', import.meta.url), upstream);
const theme = readFileSync(new URL('./MochaCord.css', import.meta.url), 'utf8');
const targets = await (await fetch('http://127.0.0.1:9334/json/list')).json();
const page = targets.find(t => t.type === 'page' && /discord\.com/.test(t.url));
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
let next = 0;
const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++next;
    const handler = event => {
        const reply = JSON.parse(event.data);
        if (reply.id !== id) return;
        ws.removeEventListener('message', handler);
        reply.error ? reject(new Error(JSON.stringify(reply.error))) : resolve(reply.result);
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
};
try {
    await call('DOM.enable');
    await call('CSS.enable');
    const html = '<body class="theme-dark"><style>:root{--radius-lg:16px;--border-subtle:var(--border);--background-base-lower:var(--bg-4)}</style><div id="app-mount"><div class="container__01ae2"><div id="thread" class="container__9293f">Thread</div></div><div class="container_fb64c9"><div id="new-thread" class="container__9293f">New thread</div></div><div class="container__133bf"><div id="friends" class="container__9293f">Friends</div></div><div class="container_f391e3"><div id="requests" class="container__9293f">Requests</div></div><div class="homeWrapper__0920e"><div id="nitro" class="container__9293f">Nitro</div></div><div class="subtitleContainer_f75fb0"><div id="normal" class="title_f75fb0 container__9293f">Channel</div></div></div></body>';
    const setup = `(() => { const f=document.createElement('iframe');f.id='mochacord-border-verification';f.style.cssText='position:fixed;left:-10000px;top:0;width:900px;height:400px;pointer-events:none';document.body.append(f);const d=f.contentDocument;d.open();d.write(${JSON.stringify(html)});d.close();const s=d.createElement('style');s.textContent=${JSON.stringify((upstream+'\n'+theme).replace(/@import\s+url\([^;]+;/g, ''))};d.head.append(s);return true; })()`;
    await evaluate(setup);
    const doc = await call('DOM.getDocument', { depth: -1, pierce: true });
    const find = node => node.attributes?.includes('mochacord-border-verification') ? node.contentDocument : (node.children || []).map(find).find(Boolean);
    const fixture = find(doc.root);
    if (!fixture) throw new Error('Fixture document absent');
    const results = [];
    for (const id of ['thread', 'new-thread', 'friends', 'requests', 'nitro', 'normal']) {
        const { nodeId } = await call('DOM.querySelector', { nodeId: fixture.nodeId, selector: '#'+id });
        for (const hover of [false, true]) {
            await call('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: hover ? ['hover'] : [] });
            await new Promise(resolve => setTimeout(resolve, 300));
            const state = await evaluate(`(() => {const e=document.getElementById('mochacord-border-verification').contentDocument.getElementById(${JSON.stringify(id)});const s=getComputedStyle(e);return {widths:[s.borderTopWidth,s.borderRightWidth,s.borderBottomWidth,s.borderLeftWidth],styles:[s.borderTopStyle,s.borderRightStyle,s.borderBottomStyle,s.borderLeftStyle],colors:[s.borderTopColor,s.borderRightColor,s.borderBottomColor,s.borderLeftColor],radius:s.borderRadius,margin:s.marginBottom};})()`);
            results.push({id,hover,...state});
            if (id !== 'normal' && (new Set(state.widths).size !== 1 || state.styles.some(x => x !== 'solid') || new Set(state.colors).size !== 1 || parseFloat(state.widths[0]) === 0)) throw new Error('Unequal border: '+JSON.stringify(results.at(-1)));
            if (id === 'normal' && state.widths.some(x => parseFloat(x) !== 0)) throw new Error('Normal channel gained a border');
        }
    }
    const nativeToolbarRules = await evaluate(`(() => {const out=[];for(const sheet of document.styleSheets){try{for(const r of sheet.cssRules)if(r.selectorText&&/buttonContainer_c19a55|wrapper_f7ecac/.test(r.selectorText))out.push(r.cssText)}catch{}}return out.join('\\n')})()`);
    const before = readFileSync(new URL('./MochaCord.toolbar-before.css', import.meta.url), 'utf8');
    const toolbar = await evaluate(`(() => {
        const d=document.getElementById('mochacord-border-verification').contentDocument;
        const base=d.createElement('style');base.textContent=${JSON.stringify(nativeToolbarRules)};d.head.append(base);
        const style=d.createElement('style');d.head.append(style);
        const scroller=d.createElement('div');scroller.style.cssText='position:relative;overflow:hidden;height:160px';d.body.append(scroller);
        const message=d.createElement('div');message.style.cssText='position:relative;height:100px';scroller.append(message);
        const container=d.createElement('div');container.className='buttonContainer_c19a55';message.append(container);
        const bar=d.createElement('div');bar.className='wrapper_f7ecac';container.append(bar);
        const popout=d.createElement('div');popout.className='layer__59d0d';popout.style.cssText='position:absolute;left:200px;top:100px;width:100px;height:30px';
        const animator=d.createElement('div');animator.className='animatorLeft_faf9c0 fade_faf9c0 didRender_faf9c0';popout.append(animator);scroller.append(popout);
        const results=[];
        for(const [label,css] of [['before',${JSON.stringify(before.replace(/@import\s+url\([^;]+;/g, ''))}],['after',${JSON.stringify(theme.replace(/@import\s+url\([^;]+;/g, ''))}]]) {
            style.textContent=css;
            for(const width of [420,640,1280])for(const count of [4,16]) {
                scroller.style.width=width+'px';bar.replaceChildren();
                for(let i=0;i<count;i++){const b=d.createElement('button');b.style.cssText='width:20px;height:24px;padding:0';b.textContent='x';bar.append(b);}
                const a=scroller.getBoundingClientRect(),b=bar.getBoundingClientRect();
                results.push({label,width,count,toolbarWidth:b.width,left:b.left-a.left,right:b.right-a.left,inside:b.left>=a.left&&b.right<=a.right,toolbarTransform:getComputedStyle(container).transform,popoutTransform:getComputedStyle(popout).transform});
            }
        }
        scroller.remove();base.remove();style.remove();return results;
    })()`);
    if (toolbar.filter(x => x.label === 'before').some(x => x.inside)) throw new Error('Toolbar clipping baseline did not reproduce');
    if (toolbar.filter(x => x.label === 'after').some(x => !x.inside || x.toolbarTransform !== 'none' || x.popoutTransform !== 'none')) throw new Error('Toolbar or popout still displaced');
    writeFileSync(new URL('./toolbar-verification.json', import.meta.url), JSON.stringify(toolbar,null,2));
    console.log('Toolbar geometry: all 6 before cases clipped; all 6 after cases fit, with no toolbar or popout transform.');
    writeFileSync(new URL('./verification.json', import.meta.url), JSON.stringify(results,null,2));
    console.log(JSON.stringify(results,null,2));
} finally {
    await evaluate("document.getElementById('mochacord-border-verification')?.remove()");
    ws.close();
}
