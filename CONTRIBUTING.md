# Contributing to MochaCord

Thanks for helping. Bug reports, ideas and pull requests are all welcome.

## Reporting a bug

[Open an issue](https://github.com/DavidHiFi/MochaCord/issues/new) and include:

- what you did, what you expected and what happened instead
- your Discord build (Stable, PTB or Canary), your TestCord version and the MochaCord version from the top of `MochaCord.css`
- a screenshot of the broken part, and the plugin involved if it is a plugin's panel

Discord updates often rename the class names the theme targets. If something broke right after a Discord update, say so.

## Suggesting a feature

Open an issue that describes what you want to change and why. A screenshot or a mock-up helps.

## Sending a pull request

1. Fork the repo and create a branch from `main`.
2. There is no build step. Edit `MochaCord.css`, copy it into `%APPDATA%\TestCord\themes`, and restart Discord to see the change, since TestCord caches a loaded theme.
3. Run the popup regression checks. Open `tests/acrylic.html` in a Chromium browser, or run `node tests/fixture-local.mjs` (it expects Brave at the path near the top of the script, so change that line for your browser). The page title should read "MochaCord acrylic tests passed", and the script should report `"fails": 0`.
4. Keep each pull request to one change, and add before and after screenshots to the description.

Keep the Midnight section and its MIT notice intact, and put MochaCord's own rules below it. Each rule gets a short comment that says what it fixes.

## License

By contributing, you agree that your work is released under this repo's [MIT License](LICENSE).
