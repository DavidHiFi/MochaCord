Fixes picker overflow and glass backgrounds applied outside popup bounds.

- Restore Discord's measured GIF, sticker, and emoji picker dimensions. Keep media inside the rounded panel and wrap GifTransfer's Export, Import, and Verify controls onto a second row.
- Remove acrylic from full-window dialog wrappers and unrelated content wrappers. Apply it to the visible popup panels so the window background remains transparent.
- Remove rectangular gradient-name backgrounds outside message headers, while preserving chat username bubbles and gradient text.
- Clip profile modal artwork to its rounded outline.
- Restore the complete Friends, Message Requests, and Nitro header border in both normal and hover states.

Includes the earlier thread header, message toolbar, nested menu blur, and channel icon fixes.

Verified 12 picker layout cases at three widths, native popup glass styles, username bubble scope, 12 header states, and six toolbar layouts. Applied through theme hot reload with no Discord restart or audio changes.
