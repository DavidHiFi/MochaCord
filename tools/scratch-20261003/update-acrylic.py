from pathlib import Path

path = Path(__file__).with_name('MochaCord.css')
source = path.read_text(encoding='utf-8')
Path(__file__).with_name('MochaCord.acrylic-before.css').write_text(source, encoding='utf-8')
source = source.replace('@version 3.1.4', '@version 3.1.5')
source = source.replace('''.iconContainer__2ea32 path {
    transform: translate(15%, 15%) scale(0.75) !important;
}''', '''/* Scale the complete glyph around its center, including multi-path icons. */
.iconContainer__2ea32 svg {
    display: block;
    flex-shrink: 0;
    transform: scale(0.75) !important;
    transform-origin: center;
}''')
surfaces = '''
    [role="menu"],
    [role="dialog"]:not(.custom-user-profile-theme),
    [data-mana-component="popover"],
    [data-mana-component="context-menu"],
    [data-mana-component="select-content"],
    [data-mana-component="tooltip"],
    [class*="tooltip_"],
    [class*="Tooltip_"],
    [class*="popover_"],
    [class*="Popover_"],
    [class*="popoverReactionHoverBar_"],
    [class*="autocomplete_"],
    [class*="messagesPopoutWrap_"],
    [class*="recentMentionsPopout_"],
    [class*="quickSelectPopout_"],
    [class*="user-profile-popout"]:not(.custom-theme-background),
    [class*="popout_"]:not(.popout__0bd4a),
    [class*="Popout_"],
    [class*="popoutContainer_"],
    [class*="popoutContentWrapper_"],
    [class*="layerContainer_"] [class*="contentWrapper_"],
    [class*="layerContainer_"] [role="listbox"],
    .container__55c99,
    .root__49fc1,
    .selectDropdown__0edde,
    .picker__09f65,
    .calendarPicker_d27f17 .react-datepicker,
    [class*="toast_"],
    [class*="customToast_"],
    [class*="errorNotificationContainer_"],
    .vc-notification-root,
    .vc-toast-notifications-notification-root,
    [class$="-popover"], [class*="-popover "],
    [class$="-popout"], [class*="-popout "],
    [class$="-dropdown-menu"], [class*="-dropdown-menu "],
    [class$="-select-menu"], [class*="-select-menu "],
    [class$="-tools-menu"], [class*="-tools-menu "]'''
skin = '''/* Shared acrylic for floating UI. Tint the background rather than fading text.
   Keep the blur on popup surfaces, never on portal containers or call video. */
body {
    --mochacord-acrylic-background: color-mix(in srgb, var(--bg-floating) 76%, transparent);
    --mochacord-acrylic-filter: blur(24px) saturate(140%) contrast(105%);
}

SURFACE {
    background: var(--mochacord-acrylic-background) !important;
    -webkit-backdrop-filter: var(--mochacord-acrylic-filter) !important;
    backdrop-filter: var(--mochacord-acrylic-filter) !important;
    /* Structural headers, footers and scrollers share the outer glass. */
    --background-base-low: transparent;
    --background-base-lower: transparent;
    --background-base-lowest: transparent;
    --background-surface-high: transparent;
    --background-surface-higher: transparent;
    --background-surface-highest: transparent;
    --background-primary: transparent;
    --background-secondary: transparent;
    --background-secondary-alt: transparent;
    --modal-background: transparent;
    --modal-footer-background: transparent;
}

/* A nested popup section uses the outer glass instead of another GPU blur.
   Context submenus are independent surfaces, handled by their own skin below. */
SURFACE SURFACE:not([role="menu"], .menu_c1e9c4) {
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
}

/* A filtered menu root blocks a submenu from sampling pixels outside it.
   Put the glass on a sibling ::before layer so every submenu can frost the
   page behind it. This replaces Midnight's second, unpositioned blur layer. */
.menu_c1e9c4 {
    position: relative;
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
}
.menu_c1e9c4::before,
.submenuPaddingContainer_c1e9c4 > .menu_c1e9c4::before,
.submenuPaddingContainer_ce8328 > .menu_c1e9c4::before {
    content: "";
    position: absolute;
    inset: 0;
    width: auto;
    height: auto;
    border-radius: inherit;
    background: var(--mochacord-acrylic-background) !important;
    -webkit-backdrop-filter: var(--mochacord-acrylic-filter) !important;
    backdrop-filter: var(--mochacord-acrylic-filter) !important;
    pointer-events: none;
    z-index: -1;
}

/* Opacity promotion makes a portal a backdrop root even after a fade ends.
   Preserve its transform animation without isolating the popup's backdrop. */
.layer__59d0d,
.layerContainer__59d0d,
:is(.layer__59d0d, .layerContainer__59d0d) [class*="animator"] {
    will-change: transform !important;
}
.tooltip_c36707 {
    will-change: transform !important;
}

/* The expression picker's opaque inner sheets otherwise cover the glass. */
.contentWrapper__08434 :is(.emojiPicker_c0e32c, .wrapper__14245, .container_fed6d3),
.messagesPopoutWrap__432f4 > .header__432f4 {
    background: transparent !important;
}

/* Keep semantic success/error colors on native toasts and tooltip arrows. */
:is([class*="toast_"], [class*="customToast_"], [class*="errorNotificationContainer_"]) {
    color: var(--text-1);
}
.tooltipPointer_c36707 {
    border-top-color: var(--mochacord-acrylic-background) !important;
}

:is(.vc-notification-root, .vc-toast-notifications-notification-root) {
    border: 1px solid rgba(255, 255, 255, 0.09) !important;
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.12),
        0 12px 32px rgba(0, 0, 0, 0.35) !important;
}

/* The persistent notification history shares its containing modal's glass. */
.vc-notification-log-wrapper .vc-notification-root {
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    border: none !important;
    box-shadow: none !important;
}

/* Browsers without backdrop filtering retain a readable Mocha background. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    SURFACE,
    .menu_c1e9c4::before {
        background: var(--bg-floating) !important;
    }
}

'''.replace('SURFACE', ':is(' + surfaces + '\n)')
start = source.index('/* Frosted acrylic for transient floating UI.')
end = source.index('/* ===== Voice call:', start)
source = source[:start] + skin + source[end:]
path.write_text(source, encoding='utf-8')
