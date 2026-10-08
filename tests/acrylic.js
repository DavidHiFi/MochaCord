window.addEventListener("load", () => {
    const result = (() => {
    /* 3.1.32: every tooltip-class family, compared against its EX class or
       semantic matcher. The caret/pointer cases live in their own block. */
    const TOOLTIP_IDS = new Set(['tooltip', 'mana-tooltip', 'semantic-tooltip', 'reaction', 'timeline', 'error-tooltip',
        'tooltip-legacy-primary', 'tooltip-legacy-grey', 'tooltip-legacy-red', 'reward-tooltip', 'plugin-activity-tooltip']);
    /* resolved static surface tokens, measured before any fixture surfaces mount */
    const probeBg = document.createElement('div');
    probeBg.style.cssText = 'visibility:hidden;position:absolute;';
    document.body.appendChild(probeBg);
    probeBg.style.backgroundColor = 'var(--bg-1)';
    const EX = { tooltip: getComputedStyle(probeBg).backgroundColor };
    probeBg.remove();
    const specs = [
        ['picker', 'contentWrapper__08434'], ['menu', 'menu_c1e9c4', 'menu'],
        ['tooltip', 'tooltip_fa450d'], ['profile', 'outer_c0bea0 user-profile-popout'],
        ['custom-profile', 'outer_c0bea0 user-profile-popout custom-user-profile-theme custom-theme-background'],
        ['autocomplete', 'autocomplete__6b0e0'], ['inbox', 'messagesPopoutWrap__432f4'], ['plugin', 'vc-cal-tool-popover'],
        ['mana-popover', '', 'popover'], ['mana-context', '', 'context-menu'], ['mana-select', '', 'select-content'],
        ['mana-tooltip', '', 'tooltip'], ['emoji', 'contentWrapper__08434'], ['gif', 'contentWrapper__08434'],
        ['sticker', 'contentWrapper__08434'], ['files-new-hash', 'contentWrapper_newhash'],
        ['reaction', 'reactionTooltip_bbcccb'], ['timeline', 'timelineTooltip__68788'], ['error-tooltip', 'errorTooltip__3b3ff'],
        ['list', 'popoutList__92efc'], ['shortcuts', 'keyboardShortcutsModal_f061f6'], ['dropdown', 'dropdown_edf232'],
        ['select-menu', 'selectDropdown__0edde'],
        ['modal', 'root__49fc1'], ['profile-modal', 'outer_c0bea0 user-profile-modal-v2'],
        ['toast', 'toast__3fde7'], ['notification', 'vc-notification-root'], ['plugin-toast', 'vc-toast-notifications-notification-root'],
        ['error-notif', 'errorNotificationContainer_e13eda'], ['capital-toast', 'successToast_a35754'],
        ['datepicker', 'react-datepicker'], ['color', 'customColorPicker__459fb'], ['status', 'statusPickerModal_ce8328'],
        ['recent-channels', 'recentChannelsMenu__711d3'], ['search', 'container__55c99'], ['mentions', 'recentMentionsPopout__95796'],
        ['region', 'quickSelectPopout_ebaca5'], ['roles', 'rolePopout__75297'], ['generic-popout', 'popout_newhash'],
        ['plugin-command', 'vc-cmdpal-root'], ['plugin-stickers', 'vc-more-stickers-picker-container'],
        ['plugin-gif-modal', 'vc-gif-collections-modal'], ['plugin-github', 'vc-github-repos-modal'], ['plugin-mds', 'vc-mds-modal'],
        ['plugin-editor-toast', 'vc-testcord-tab-editor-toast'], ['plugin-fakedm', 'fakedm-popout'], ['plugin-gc', 'gc-popover'],
        ['plugin-deepsearch', 'vc-deepsearch-modal-root'], ['plugin-calendar', 'vc-cal-picker-popover'],
        ['semantic-tooltip', '', 'tooltip'], ['semantic-listbox', '', 'listbox'],
        ['mana-modal', '', 'modal'], ['native-popout-root', 'popoutRoot_newhash'],
        ['plugin-activity-tooltip', 'vc-bactivities-controls-tooltip'], ['plugin-popover-overflow', 'vc-popover-overflow'],
        ['plugin-roles', 'vc-clickableroles-popout'], ['plugin-presets', 'vc-presets-merge-dropdown-menu'],
        ['plugin-bie-drawer', 'vc-bie-drawer'], ['plugin-message-popover', 'buttonsInner__5126c vc-message-popover-bar popover_f84418'],
        ['plugin-update-modal', 'vc-update-modal-root'], ['plugin-author-modal', 'vc-plugin-modal-author'],
        ['tooltip-legacy-primary', 'tooltipPrimary_c36707'], ['tooltip-legacy-grey', 'tooltipGrey_c36707'],
        ['tooltip-legacy-red', 'tooltipRed_c36707'], ['reward-tooltip', 'rewardTooltip_cc3943'],
        ['popout-loader', 'popoutLoader_newhash']
    ];
    const app = document.getElementById('app-mount');
    app.replaceChildren();
    app.style.cssText = 'display:grid;grid-template-columns:repeat(4,260px);grid-auto-rows:200px;align-content:start;gap:20px;padding:24px;min-height:2900px;background:repeating-linear-gradient(90deg,#d9d9ff 0 3px,#181825 3px 6px)!important';
    document.body.className = 'theme-dark';
    const fixture = document.createElement('style');
    fixture.textContent = '.fixture-portal{position:relative;width:260px;height:200px;will-change:opacity}.fixture-animator{will-change:opacity,transform}.fixture-surface{position:relative!important;width:260px!important;height:200px!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;border-radius:12px!important;box-sizing:border-box;z-index:1}.fixture-label{position:absolute;top:12px;left:12px;color:#fff;font:14px monospace}.fixture-guard{width:30px;height:20px}.fixture-plain{position:relative;width:260px;height:80px;z-index:1}';
    document.head.prepend(fixture);
    const results = [];
    const fail = [];
    const describe = e => {
        const s = getComputedStyle(e), p = getComputedStyle(e, '::before');
        return { background: s.backgroundColor, blur: s.backdropFilter, before: p.backdropFilter, beforeContent: p.content, beforeBackground: p.backgroundColor, opacity: s.opacity, boxShadow: s.boxShadow };
    };
    for (const [id, classes, semantic] of specs) {
        const portal = document.createElement('div');
        portal.className = 'fixture-portal layerContainer_newhash';
        const animator = document.createElement('div');
        animator.className = 'fixture-animator animatorBottom_newhash';
        const panel = document.createElement('div');
        panel.id = 'case-' + id;
        panel.className = classes + ' fixture-surface';
        if (semantic === 'menu' || id.startsWith('semantic-')) panel.role = semantic;
        else if (semantic) panel.dataset.manaComponent = semantic;
        panel.innerHTML = '<span class="fixture-label">' + id + '</span>';
        if (id === 'files-new-hash') {
            const files = document.createElement('div');
            files.id = 'files-picker-tab-panel';
            files.className = 'vc-favouriteAnything-container';
            files.role = 'tabpanel';
            panel.append(files);
        }
        animator.append(panel);
        portal.append(animator);
        app.append(portal);
        const result = { id, ...describe(panel), portal: getComputedStyle(portal).willChange, animator: getComputedStyle(animator).willChange };
        results.push(result);
        /* 3.1.32: tooltip-class pills take the static raised Mocha surface
           (--bg-2) instead of the 76% popup fill, so their facet of the
           contract is tone+ring with no frost. Every other popup family
           still frosts. */
        const tooltipFam = TOOLTIP_IDS.has(id);
        const frosted = result.blur.includes('data:image/svg+xml') || result.before.includes('data:image/svg+xml');
        if (tooltipFam) {
            if (result.blur !== 'none' || result.background !== EX.tooltip || result.boxShadow === 'none') fail.push(result);
        } else {
            if (!frosted || result.portal !== 'auto' || result.animator !== 'auto') fail.push(result);
        }
    }
    const add = (parent, classes, id) => {
        const e = document.createElement('div');
        e.className = classes;
        e.id = id;
        parent.append(e);
        return e;
    };
    const nested = add(document.getElementById('case-menu'), 'fixture-surface menu_c1e9c4', 'nested-menu');
    nested.role = 'menu';
    nested.style.cssText = 'position:absolute!important;left:210px;top:70px;width:120px!important;height:110px!important';
    const nestedStyle = describe(nested);
    if (nestedStyle.blur !== 'none' || !nestedStyle.before.includes('data:image/svg+xml')) fail.push({ id: 'nested-menu', ...nestedStyle });
    const nestedLegacyTip = add(document.getElementById('case-menu'), 'fixture-surface tooltipPrimary_c36707', 'nested-legacy-tooltip');
    nestedLegacyTip.style.cssText = 'position:absolute!important;left:10px;top:10px;width:120px!important;height:40px!important';
    const nestedLegacyStyle = describe(nestedLegacyTip);
    /* 3.1.25 then 3.1.32: tooltips keep their own surface even nested in a
       popup; after 3.1.32 the surface is the static Mocha pill tone, not a
       scoped frost. */
    if (nestedLegacyStyle.blur !== 'none' || nestedLegacyStyle.background !== EX.tooltip) fail.push({ id: 'nested-legacy-tooltip', ...nestedLegacyStyle });
    /* Regression for the two-tone Options tooltip: a tooltip inside a
       container that matches the nested strip's OUTER list (voice-tile
       wrappers match popoutContainer_) must still frost — the guard
       outranks the strip. */
    const tileWrap = document.createElement('div');
    tileWrap.className = 'fixture-portal layerContainer_newhash popoutContainer_newhash';
    tileWrap.style.cssText = 'position:relative;width:260px;height:120px';
    const tileTip = add(tileWrap, 'fixture-surface tooltipPrimary_c36707', 'tooltip-in-tile-container');
    const tileTipSemantic = add(tileWrap, 'fixture-surface', 'tooltip-in-tile-container-semantic');
    tileTipSemantic.role = 'tooltip';
    app.append(tileWrap);
    for (const el of [tileTip, tileTipSemantic]) {
        const s = describe(el);
        /* 3.1.32: static pill tone beats the nested strip everywhere, and
           the ring still reads over flat dark panels (3.1.27). */
        if (s.blur !== 'none' || s.background !== EX.tooltip) fail.push({ id: el.id, ...s });
        if (s.boxShadow === 'none') fail.push({ id: el.id + '-ring', ...s });
    }
    /* 3.1.32: the mana caret (inline SVG path under every pill) and the
       legacy triangle pointer take the same pill tone, so a fixed #181825
       notch can never hang under a #313244 pill again. The caret host is
       nested inside the tooltip case root so the scoped caret rule finds
       it. */
    const tipRoot = document.getElementById('case-tooltip');
    const caretHost = document.createElement('div');
    caretHost.className = 'caret__0b5f9 caret--bottom__0b5f9';
    caretHost.innerHTML = '<svg width="16" height="8"><path d="M0 0h16L8 8z"></path></svg>';
    tipRoot.append(caretHost);
    const caretFill = getComputedStyle(caretHost.querySelector('path')).fill;
    if (caretFill !== EX.tooltip) fail.push({ id: 'mana-caret-fill', fill: caretFill, expected: EX.tooltip });
    const ptr = document.createElement('div');
    ptr.className = 'tooltipPointer_c36707';
    ptr.style.cssText = 'width:16px;height:8px;border-top:8px solid transparent';
    app.append(ptr);
    const ptrColor = getComputedStyle(ptr).borderTopColor;
    if (ptrColor !== EX.tooltip) fail.push({ id: 'legacy-pointer-fill', fill: ptrColor, expected: EX.tooltip });
    /* 3.1.26: combo-box menus render inline inside the settings modal DOM
       (control__* under a mana modal root), which matches the nested strip's
       OUTER list via .modal_e44912 - the select guard must still frost them. */
    const modalWrap = document.createElement('div');
    modalWrap.className = 'fixture-portal layerContainer_newhash modal_e44912';
    modalWrap.style.cssText = 'position:relative;width:260px;height:120px';
    const modalSelect = add(modalWrap, 'fixture-surface selectDropdown__0edde', 'select-in-modal');
    app.append(modalWrap);
    const modalSelectStyle = describe(modalSelect);
    if (!modalSelectStyle.blur.includes('data:image/svg+xml')) fail.push({ id: modalSelect.id, ...modalSelectStyle });
    /* 3.1.27: the message hover bar keeps its glass over messages inside
       popups (pins, mentions); the nested strip would otherwise bleach it. */
    const pinsWrap = document.createElement('div');
    pinsWrap.className = 'fixture-portal layerContainer_newhash messagesPopoutWrap__432f4';
    pinsWrap.style.cssText = 'position:relative;width:260px;height:260px';
    const miniBar = add(pinsWrap, 'fixture-surface miniPopover_e21ed7', 'minipopover-in-pins');
    const fullBar = add(pinsWrap, 'fixture-surface buttonsInner__5126c', 'hoverbar-in-pins');
    app.append(pinsWrap);
    for (const el of [miniBar, fullBar]) {
        const s = describe(el);
        if (!s.blur.includes('data:image/svg+xml')) fail.push({ id: el.id, ...s });
    }
    /* 3.1.28: menu surfaces round to 8px like the context menus, and inner
       menu surfaces stay clear so the outer rounded corners read — the
       square corners of the Plugins "Show All" dropdown list. */
    const modalListbox = add(modalSelect, 'listBox_newhash', 'listbox-in-select-root');
    modalListbox.role = 'listbox';
    modalListbox.style.cssText = 'position:absolute;inset:0';
    const innerLb = describe(modalListbox);
    if (innerLb.blur !== 'none' || innerLb.background !== 'rgba(0, 0, 0, 0)') fail.push({ id: 'listbox-in-select-root', ...innerLb });
    const modalRadius = getComputedStyle(modalSelect).borderRadius;
    if (modalRadius !== '8px') fail.push({ id: 'select-root-radius', radius: modalRadius });
    const bareLb = document.createElement('div');
    bareLb.className = 'fixture-plain';
    bareLb.id = 'bare-inline-listbox';
    bareLb.role = 'listbox';
    app.append(bareLb);
    const bareLbS = describe(bareLb);
    if (!bareLbS.blur.includes('data:image/svg+xml')) fail.push({ id: 'bare-inline-listbox', ...bareLbS });
    const bareRadius = getComputedStyle(bareLb).borderRadius;
    if (bareRadius !== '8px') fail.push({ id: 'bare-inline-listbox-radius', radius: bareRadius });
    /* 3.1.29: notification cards take the static Mocha base paint plus the
       ring so they never read as see-through over any background. The fill
       is opaque on purpose: Chromium's down-sampled backdrop blur leaked an
       8% sharp ghost of the 92% fill's transparent share. The capital-toast
       case is the negative control for the case-insensitive matcher: drop
       the i flag and successToast_a35754 renders fully transparent. */
    const bgProbe = document.createElement('div');
    bgProbe.style.cssText = 'background-color: var(--bg-floating); visibility: hidden; position: absolute;';
    app.append(bgProbe);
    const expectedNotif = getComputedStyle(bgProbe).backgroundColor;
    bgProbe.remove();
    for (const id of ['toast', 'notification', 'plugin-toast', 'plugin-editor-toast', 'error-notif', 'capital-toast']) {
        const r = results.find(x => x.id === id);
        if (!r) { fail.push({ id: id + '-missing' }); continue; }
        const filled = r.background !== 'rgba(0, 0, 0, 0)' && !r.background.includes('/ 0.') && r.background === expectedNotif;
        if (!filled) fail.push({ id: id + '-fill', background: r.background, expected: expectedNotif });
        if (r.boxShadow === 'none') fail.push({ id: id + '-ring', ...r });
    }
    /* 3.1.28: entries in the notification log keep sharing their modal's
       glass instead of painting their own card. */
    const logWrap = document.createElement('div');
    logWrap.className = 'fixture-plain vc-notification-log-wrapper';
    logWrap.id = 'log-wrapper';
    const logRoot = document.createElement('div');
    logRoot.className = 'vc-notification-root';
    logRoot.id = 'notification-in-log';
    logRoot.style.cssText = 'position:relative;width:200px;height:60px';
    logWrap.append(logRoot);
    app.append(logWrap);
    const logS = describe(logRoot);
    if (logS.blur !== 'none' || logS.background !== 'rgba(0, 0, 0, 0)') fail.push({ id: 'notification-in-log', ...logS });
    /* 3.1.28: in-call message toasts (chatToasts strip): the root wrapper
       stays clear and the message pill carries the notification card fill. */
    const ctStrip = document.createElement('div');
    ctStrip.className = 'fixture-plain chatToasts_newhash';
    ctStrip.id = 'chattoast-strip';
    const ctWrap = document.createElement('div');
    ctWrap.className = 'toastWrapper_newhash toast_newhash';
    ctWrap.id = 'chattoast-wrapper';
    const ctPill = document.createElement('div');
    ctPill.className = 'messageContentWrapper_newhash';
    ctPill.id = 'chattoast-pill';
    ctWrap.append(ctPill);
    ctStrip.append(ctWrap);
    app.append(ctStrip);
    const ctWrapS = describe(ctWrap);
    if (ctWrapS.blur !== 'none' || ctWrapS.background !== 'rgba(0, 0, 0, 0)') fail.push({ id: 'chattoast-wrapper', ...ctWrapS });
    const ctPillS = describe(ctPill);
    /* 3.1.29: the pill takes the static opaque Mocha paint, so the
       translucency must be gone, not merely firmed. */
    if (!ctPillS.blur.includes('data:image/svg+xml') || !ctPillS.background || ctPillS.background.includes('/ 0.') || ctPillS.background === 'rgba(0, 0, 0, 0)') fail.push({ id: 'chattoast-pill', ...ctPillS });
    const inner = add(document.getElementById('case-picker'), 'emojiPicker_c0e32c', 'picker-inner');
    const section = add(document.getElementById('case-plugin-calendar'), 'vc-cal-tool-popover', 'nested-section');
    const structural = [inner, section].map(e => ({ id: e.id, ...describe(e) }));
    for (const s of structural) if (s.blur !== 'none' || s.background !== 'rgba(0, 0, 0, 0)') fail.push(s);
    const guards = [];
    for (const [id, classes, role] of [['dialog-wrapper', '', 'dialog'], ['video', 'videoGrid_new'], ['call', 'callContainer_new'], ['inline-tooltip', 'overflowTooltip_new'], ['no-tooltip-trigger', 'chipletContainerInner__10651 noTooltip__10651']]) {
        const e = add(app, 'fixture-guard ' + classes, id);
        if (role) e.role = role;
        const s = { id, ...describe(e) };
        guards.push(s);
        if (s.blur !== 'none') fail.push(s);
        if (id === 'dialog-wrapper' && s.background !== 'rgba(0, 0, 0, 0)') fail.push(s);
        e.remove();
    }
    // Keep the fixture dimensions last for the geometry checks.
    fixture.remove();
    document.head.append(fixture);
    const profile = add(app, 'outer_c0bea0 user-profile-sidebar fixture-surface', 'profile-sidebar');
    const profileInner = add(profile, 'inner_c0bea0', 'profile-inner');
    const profileStyle = getComputedStyle(profileInner);
    const geometry = [{ id: 'profile-inner', radius: profileStyle.borderRadius, overflow: profileStyle.overflow }];
    if (profileStyle.borderRadius !== '12px' || profileStyle.overflow !== 'hidden') fail.push(geometry[0]);
    for (const radius of [0, 12, 24]) {
        const tile = add(app, 'tile__2f4f7 tile__90dc5', 'voice-tile-' + radius);
        tile.dataset.seleniumVideoTile = 'true';
        tile.style.setProperty('--vc-pfp-radius', radius + 'px');
        const border = add(tile, 'border__2f4f7', 'voice-border-' + radius);
        const actual = getComputedStyle(border).borderRadius;
        geometry.push({ id: border.id, radius: actual });
        if (actual !== radius + 'px') fail.push(geometry.at(-1));
    }
    return { count: results.length, results, nested: nestedStyle, structural, guards, geometry, fail };
})();
    window.acrylicResults = result;
    document.title = result.fail.length ? "MochaCord acrylic tests failed" : "MochaCord acrylic tests passed";
    console.log(JSON.stringify(result, null, 2));
});
