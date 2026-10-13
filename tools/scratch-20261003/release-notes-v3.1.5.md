Adds consistent frosted glass across Discord's floating UI and fixes channel icon centering.

- Context menus and nested submenus now blur the page behind them correctly.
- Shared acrylic styling covers dropdowns, tooltips, pickers, search suggestions, inbox panels, standard profile popouts, dialogs, and native or TestCord notifications. Common plugin popup roots are included.
- Inner sections share the popup's glass instead of adding another blur. Portal wrappers no longer reserve opacity layers that block backdrop sampling.
- Channel icons scale as complete SVGs around their centers, preserving their size and handling multi-path icons correctly.
- Includes the earlier thread header border and clipped message toolbar fixes.

Verified 37 popup cases, raster blur on a striped background, four icon shapes, and the previous header and toolbar checks. The video stage keeps its existing window acrylic treatment.

Replace MochaCord.css in your themes folder, then reload the theme.
