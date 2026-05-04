## 2025-05-15 - Focus Restoration Pattern
**Learning:** In a photography portfolio with multiple overlays (lightbox, menu, services), maintaining the user's keyboard context is crucial. Saving `document.activeElement` before opening an overlay and restoring focus to it upon closing ensures a seamless navigation experience.
**Action:** Always implement a `lastFocusedElement` variable to track and restore focus when dealing with modal-like overlays.

## 2025-05-15 - Infinite Grid TabIndex Management
**Learning:** In virtualized or infinite grids where items are culled (set to `visibility: hidden`) for performance, these items still remain in the tab order if they have `tabindex="0"`. This creates "ghost" focus stops that confuse keyboard users.
**Action:** Dynamically manage `tabIndex` in the grid's render loop. Set `tabindex="0"` for visible items and `tabindex="-1"` for culled items to ensure the keyboard focus only lands on visible content.
