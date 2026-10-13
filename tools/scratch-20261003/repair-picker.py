from pathlib import Path
p = Path(__file__).with_name('MochaCord.css')
s = p.read_text(encoding='utf-8')
s = s.replace('@version 3.1.5', '@version 3.1.6')
start = s.index('/* Full sized gif picker */')
end = s.index('/* Hide voice settings', start)
s = s[:start] + '''/* Keep Discord's measured popup position and size. The expression picker
   owns its glass, clipping and scrolling, not the full-screen portal. */
.contentWrapper__08434 {
    min-width: 0;
    max-width: 100%;
    max-height: 100%;
    grid-template-rows: auto minmax(0, 1fr);
    overflow: hidden;
}
.positionContainerOnlyEmoji__08434 .contentWrapper__08434 {
    grid-template-rows: minmax(0, 1fr);
}
.drawerSizingWrapper__08434 {
    min-width: 0;
    max-width: 100%;
    max-height: 100%;
}
.nav__08434 {
    min-width: 0;
}
.navList__08434 {
    min-width: 0;
    flex-wrap: wrap;
    gap: 4px;
}
.contentWrapper__08434 #gif-transfer-buttons {
    flex: 1 0 100%;
    flex-wrap: wrap;
    justify-content: flex-end;
    box-sizing: border-box;
    min-width: 0;
    max-width: 100%;
    margin-left: 0;
    padding-right: 0;
}
.contentWrapper__08434 > :not(.nav__08434) {
    min-width: 0;
    min-height: 0;
    max-width: 100%;
}
.contentWrapper__08434 :is(.container_fed6d3, .wrapper__14245, .emojiPicker_c0e32c) {
    min-width: 0;
    min-height: 0;
    max-width: 100%;
    width: 100%;
}
.contentWrapper__08434 .emojiPicker_c0e32c {
    grid-template-columns: 48px minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr) auto;
}

''' + s[end:]
s = s.replace('    [class*="layerContainer_"] [class*="contentWrapper_"],', '    .contentWrapper__08434,')
s = s.replace('    [class*="layerContainer_"] [role="listbox"],\n', '')
# Plugin container classes can name a full positioning area, not a surface.
# Only include the popup roots identified in the CSS audit.
s = s.replace('    [class$="-popover"], [class*="-popover "],', '    .vc-cal-picker-popover, .vc-cal-tool-popover, .gc-popover,')
s = s.replace('    [class$="-popout"], [class*="-popout "],', '    .fakedm-popout, .vc-clickableroles-popout,')
s = s.replace('    [class$="-tooltip"], [class*="-tooltip "],', '    .vc-class-highlight-tooltip,')
s = s.replace('    [class$="-modal-root"], [class*="-modal-root "],', '    .vc-cal-modal-root, .vc-deepsearch-modal-root,')
s = s.replace('    [class$="-dialog-card"], [class*="-dialog-card "],', '    .vc-cal-dialog-card,')
s = s.replace('    [class$="-dropdown-menu"], [class*="-dropdown-menu "],', '    .vc-presets-merge-dropdown-menu, .vc-cal-search-dropdown,')
s = s.replace('    [class$="-select-menu"], [class*="-select-menu "],', '    .vc-cal-custom-select-menu, .ps-custom-select-menu,')
s = s.replace('    [class$="-tools-menu"], [class*="-tools-menu "]', '    .vc-cal-tools-menu')
# Do not let an opacity animation's portal become a backdrop root for a popup.
# Keep native element opacity; eliminate persistent opacity promotion only.
s = s.replace(':is(.layer__59d0d, .layerContainer__59d0d) [class*="animator"]', '.animatorTop_faf9c0, .animatorBottom_faf9c0, .animatorLeft_faf9c0, .animatorRight_faf9c0')
p.write_text(s, encoding='utf-8')
