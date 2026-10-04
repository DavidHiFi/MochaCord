# MochaCord

A smooth, fluent and comfortable Catppuccin Mocha theme for Discord, built on
[Midnight](https://github.com/refact0r/midnight-discord). Made for TestCord;
works on Vencord and Equicord too.

## What it does

- Catppuccin Mocha palette over Midnight's layout: rounded panels, custom
  window controls, separated chatbar, compact search.
- Frosted glass on context menus and submenus, dropdowns, notifications,
  tooltips, pickers, profile popouts, dialogs, and the image viewer backdrop.
  Popup text and images stay sharp.
  The voice call stage uses the window's acrylic material in every view,
  including tile grids, focused cameras, and fullscreen streams.
- FiraCode Nerd Font loaded from your local Windows install, with no webfont
  download.
- Small fixes kept from the live setup: bounded GIF picker with wrapping
  Export, Import, and Verify controls, reordered
  expression picker (GIF | Sticker | Emoji), bubble usernames, centered
  notification bell, auto-height bio textarea.
- Search expands within narrow headers. Server banners stay inside rounded
  outlines, typing rows share the chat background, and server palettes do not
  override Mocha colors in chat or the composer.

## Install

1. Download `MochaCord.css` (or grab the latest release).
2. Drop it into your client's themes folder:
   - **TestCord**: `%APPDATA%\TestCord\themes`
   - **Vencord / Equicord**: Settings -> Themes -> "Open Themes Folder"
   - **BetterDiscord**: `%APPDATA%\BetterDiscord\themes`
3. Enable it in Settings -> Themes.

If the theme is already installed, replace the old file and re-enable it, or
restart the client - a loaded theme stays cached until it is reloaded.

For the frosted window transparency on Windows, set TestCord's window material
to `acrylic` (TestCord settings -> Windows material).

## Notes

- The theme imports Midnight's stylesheet from GitHub Pages, so keep the
  `@import` lines intact.
- FiraCode Nerd Font must be installed locally for the font section to apply;
  otherwise Discord falls back to Fira Code / monospace.

## Popup regression checks

Open `tests/acrylic.html` in Chromium after changing popup CSS. The page checks
48 popup types, changed portal class hashes, nested menus and transparent inner
sections. Its title reports the result; `window.acrylicResults` contains details.
The striped background also makes failed backdrop sampling visible. Background
stripes should blur while popup labels remain sharp. Keep opacity promotion off
the portal wrappers and keep nested menus on their own glass pseudo-elements.
These fixture checks do not establish coverage of every live plugin or a measured
frame-time improvement.

## Credits

- Base: [Midnight](https://github.com/refact0r/midnight-discord) by refact0r
  (Catppuccin Mocha flavor)
- Palette: [Catppuccin](https://github.com/catppuccin/catppuccin)
- Theme maintained by david_hifi

## License

MIT - see [LICENSE](LICENSE).
