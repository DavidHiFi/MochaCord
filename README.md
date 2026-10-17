# MochaCord

A Catppuccin Mocha theme for Discord, built on [Midnight](https://github.com/refact0r/midnight-discord). It was made for TestCord and also works on Vencord and Equicord.

![MochaCord preview](preview.png)

## What it changes

- Catppuccin Mocha colors on Midnight's layout, with rounded panels and a separate chatbar.
- Frosted-glass menus, tooltips, dialogs, and popouts. Text and images stay sharp.
- The voice call stage uses the window's acrylic material in every view.
- The font is FiraCode Nerd Font from your Windows install. Nothing is downloaded.

## Install

1. Download `MochaCord.css` and `MochaCord-assets.zip` from the [latest release](https://github.com/DavidHiFi/MochaCord/releases/latest).
2. Copy `MochaCord.css` into your client's themes folder.
   - TestCord: `%APPDATA%\TestCord\themes`
   - Vencord or Equicord: Settings, then Themes, then "Open Themes Folder"
   - BetterDiscord: `%APPDATA%\BetterDiscord\themes`
3. Extract `MochaCord-assets.zip` into the same folder. The folder should then hold `MochaCord.css` and a `MochaCord-assets` folder with `midnight.css` and `LICENSE.midnight`.
4. Turn the theme on in Settings, then Themes.

If you already have the theme, replace the old file and turn it on again. A loaded theme stays cached until the client reloads it, so restart the client if the change does not show.

For the frosted window background on Windows, set TestCord's window material to `acrylic` in its settings.

## Notes

- The theme imports Midnight from the `MochaCord-assets` folder next to it. That folder is a vendored copy of refact0r's build with one local change. Keep the `@import` lines and the folder where they are.
- FiraCode Nerd Font has to be installed for the font to apply. Otherwise Discord falls back to Fira Code or monospace.

## Contributing

Bug reports, ideas, and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, checks, and what to include.

## Credits

- Base: [Midnight](https://github.com/refact0r/midnight-discord) by refact0r (Catppuccin Mocha flavor)
- Palette: [Catppuccin](https://github.com/catppuccin/catppuccin)
- Theme maintained by david_hifi

## License

MIT. See [LICENSE](LICENSE).
