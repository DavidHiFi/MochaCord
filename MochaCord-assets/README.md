# Bundled Midnight base

Source: https://refact0r.github.io/midnight-discord/build/midnight.css

Saved from the running client's loaded stylesheet on 2026-10-04. Original SHA-256: `928fe2279f44c1c3d44baf7e940a67c28731dbc6088c778a77a935a49036b2e2`.

The local copy removes the block labeled `Hide trailing in VC wrapper`. That ancestor-wide relational selector caused repeated style recalculation during calls. MochaCord keeps titlebar buttons in their native location, so this block is unused by its configuration. All other base rules are retained.

Copyright (c) 2025 refact0r. MIT license, reproduced in the stylesheet header and `LICENSE.midnight`.

Keep this folder beside `MochaCord.css` when installing or updating. Reprofile call and chat views before changing the bundled base.
