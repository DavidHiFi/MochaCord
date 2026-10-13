Remove rectangular acrylic backgrounds from DM usernames.

The theme's broad `Tooltip_` class match also caught Discord's inline `overflowTooltip__972a0` name labels, server-tag chips, and tooltip triggers. Remove that match while retaining glass on actual tooltip panels.

Chromium verification reproduced the tinted rectangles before the change. All ten tested inline label classes are transparent afterward, and real tooltips retain blur24px.

Includes all v3.1.6 picker, Friends header, profile corner, and full-window transparency corrections.
