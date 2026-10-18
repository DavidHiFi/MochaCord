<div align="center">

<img src="preview.png" alt="MochaCord on the Discord Friends page: Catppuccin Mocha colours, rounded panels and a frosted window" width="100%">

# MochaCord

**A Catppuccin Mocha theme for Discord, built on Midnight, for the TestCord client mod.**

Mocha colours, rounded panels and frosted popups in one CSS file.

<a href="https://github.com/DavidHiFi/MochaCord/releases/latest">
<img src="https://img.shields.io/badge/%E2%AC%87%EF%B8%8F%20DOWNLOAD%20LATEST%20RELEASE-2EA043?style=for-the-badge&labelColor=161B22" alt="Download the latest release" height="42">
</a>

<br><br>

<img src="https://img.shields.io/github/v/release/DavidHiFi/MochaCord?style=flat-square&label=version&color=8957E5&labelColor=161B22" alt="Latest version">
<img src="https://img.shields.io/github/downloads/DavidHiFi/MochaCord/total?style=flat-square&label=downloads&color=1F6FEB&labelColor=161B22" alt="Total downloads">
<img src="https://img.shields.io/badge/platform-Discord%20%28TestCord%29-DB6D28?style=flat-square&labelColor=161B22" alt="Platform: Discord with TestCord">

</div>

---

## Installation

1. Download `MochaCord.css` from the [latest release](https://github.com/DavidHiFi/MochaCord/releases/latest).
2. Copy it into `%APPDATA%\TestCord\themes`.
3. In TestCord, open **Settings**, then **Themes**, and turn MochaCord on.
4. Install [FiraCode Nerd Font](https://github.com/ryanoasis/nerd-fonts/releases/latest) on Windows if you don't have it. The theme reads it from your system.

To update, replace the old file and restart Discord. TestCord caches a loaded theme, so the change may not show until you do.

Coming from v3.1.68 or older? Delete the `MochaCord-assets` folder in the themes folder. Nothing uses it any more.

## Features

### Look

- **Catppuccin Mocha colours:** the whole client, on Midnight's layout.
- **Rounded panels:** every panel gets rounded corners and a gap between them.
- **Chat bar:** lines up with the user panel at the bottom.
- **Window buttons:** round close, minimise and maximise dots in the title bar.
- **FiraCode Nerd Font:** used for all text.

### Frosted glass

- **Popups:** menus, tooltips, popouts and toasts get a frosted background with sharp text on top.
- **Voice calls:** the call view drops Discord's solid black layers so the window frost shows through.

### Plugin styling

- **TestCord plugins:** Mocha colours and fixes for Questify quest bars, Plugin Health, StaffTag, RoundedVCPFP, VoiceButtons and others.
- **Compact search, page switcher and bubble usernames:** three small snippets from other authors, loaded at startup.

## Notes

> [!NOTE]
> **Made for TestCord.** Vencord and Equicord load CSS themes the same way, but I only build and test MochaCord in TestCord.

> [!TIP]
> **Frosted window.** Set TestCord's window material to `acrylic` in its settings to get the frosted window background on Windows.

> [!IMPORTANT]
> **Some parts load from the internet.** Midnight still fetches its [Figtree](https://fonts.google.com/specimen/Figtree) font from Google Fonts, and the three snippets load from their authors' repos each time Discord starts. If an author changes a snippet, the theme changes with it.

## Contributing

Screenshots of anything that looks wrong after a Discord update help the most, and CSS fixes are welcome.

<a href="CONTRIBUTING.md">
<img src="https://img.shields.io/badge/%F0%9F%A4%9D%20HOW%20TO%20CONTRIBUTE-8957E5?style=for-the-badge&labelColor=161B22" alt="How to contribute" height="36">
</a>

## Star history

Thanks for the stars, screenshots and fixes.

<a href="https://www.star-history.com/?repos=DavidHiFi%2FMochaCord&amp;type=date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=DavidHiFi/MochaCord&amp;type=date&amp;theme=dark&amp;legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=DavidHiFi/MochaCord&amp;type=date" />
    <img alt="DavidHiFi/MochaCord GitHub star history" src="https://api.star-history.com/chart?repos=DavidHiFi/MochaCord&amp;type=date" />
  </picture>
</a>

## Credits

- **Author:** Myself, [DavidHiFi](https://github.com/DavidHiFi)

| Who | What |
|---|---|
| **refact0r** ([Midnight](https://github.com/refact0r/midnight-discord), MIT) | The base theme, inlined in `MochaCord.css` with its MIT notice: layout, rounded panels, window buttons and the transparency options. |
| **Catppuccin** ([catppuccin](https://github.com/catppuccin/catppuccin)) | The Mocha colour palette. |
| **amozeo** ([discord-css-snippets](https://github.com/amozeo/discord-css-snippets)) | The compact search button snippet, loaded at startup. |
| **davart154** ([Themes](https://github.com/davart154/Themes)) | The Mana Page Switcher snippet for search results, loaded at startup. |
| **yiruzu** ([vencord-snippets](https://github.com/yiruzu/vencord-snippets)) | The Bubble Usernames snippet, loaded at startup. |
| **Nerd Fonts** ([ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts)) | FiraCode Nerd Font, the theme's font. You install it yourself. |

Built on [Discord](https://discord.com) and [TestCord](https://github.com/TestcordDev/TestCord), with [Midnight](https://github.com/refact0r/midnight-discord) and the [Catppuccin](https://catppuccin.com) palette.

> Missing or wrong credit? [Open an issue](https://github.com/DavidHiFi/MochaCord/issues/new) and I'll fix it.

## Disclaimers

Most of this project's code was developed with AI coding agents, including Claude Code, Codex and OpenCode. No single AI agent made the project.

Client mods such as TestCord, Vencord and Equicord are against Discord's Terms of Service. A theme needs one to load, so use them at your own risk.

<div align="center">
<br>
<sub>Not affiliated with Discord, TestCord or Catppuccin. Requires the Discord desktop app and <a href="https://github.com/TestcordDev/TestCord">TestCord</a>.</sub>
</div>
