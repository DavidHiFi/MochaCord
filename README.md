# MochaCord

A smooth, fluent and comfortable Catppuccin Mocha theme for Discord, built on
[Midnight](https://github.com/refact0r/midnight-discord). Made for TestCord;
works on Vencord and Equicord too.

## What it does

- Catppuccin Mocha palette over Midnight's layout: rounded panels, custom
  window controls, separated chatbar, compact search.
- Frosted acrylic (real `backdrop-filter` blur) on notifications, menus,
  tooltips, popouts, and the voice call stage. The call matches the panels in
  every view: tile grid, focused/enlarged camera, and fullscreen stream.
- FiraCode Nerd Font loaded from your local Windows install, with no webfont
  download.
- Small fixes kept from the live setup: full-size GIF picker, reordered
  expression picker (GIF | Sticker | Emoji), bubble usernames, centered
  notification bell, auto-height bio textarea.

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

## Credits

- Base: [Midnight](https://github.com/refact0r/midnight-discord) by refact0r
  (Catppuccin Mocha flavor)
- Palette: [Catppuccin](https://github.com/catppuccin/catppuccin)
- Theme maintained by david_hifi

## License

MIT - see [LICENSE](LICENSE).
