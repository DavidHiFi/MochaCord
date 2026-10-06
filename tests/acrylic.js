window.addEventListener("load", () => {
    const result = (() => {
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
        ['modal', 'root__49fc1'], ['profile-modal', 'outer_c0bea0 user-profile-modal-v2'],
        ['toast', 'toast__3fde7'], ['notification', 'vc-notification-root'], ['plugin-toast', 'vc-toast-notifications-notification-root'],
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
    fixture.textContent = '.fixture-portal{position:relative;width:260px;height:200px;will-change:opacity}.fixture-animator{will-change:opacity,transform}.fixture-surface{position:relative!important;width:260px!important;height:200px!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;border-radius:12px!important;box-sizing:border-box;z-index:1}.fixture-label{position:absolute;top:12px;left:12px;color:#fff;font:14px monospace}.fixture-guard{width:30px;height:20px}';
    document.head.prepend(fixture);
    const results = [];
    const fail = [];
    const describe = e => {
        const s = getComputedStyle(e), p = getComputedStyle(e, '::before');
        return { background: s.backgroundColor, blur: s.backdropFilter, before: p.backdropFilter, beforeContent: p.content, beforeBackground: p.backgroundColor, opacity: s.opacity };
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
        const frosted = result.blur.includes('data:image/svg+xml') || result.before.includes('data:image/svg+xml');
        if (!frosted || result.portal !== 'auto' || result.animator !== 'auto') fail.push(result);
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
    if (nestedLegacyStyle.blur !== 'none' || nestedLegacyStyle.background !== 'rgba(0, 0, 0, 0)') fail.push({ id: 'nested-legacy-tooltip', ...nestedLegacyStyle });
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
