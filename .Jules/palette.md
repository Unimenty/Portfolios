## 2026-05-14 - Keyboard Navigation & Focus Management for Gallery Lightbox

**Learning:** Static overlays used as modals (like the gallery lightbox) require `tabindex="-1"` to be programmatically focusable via `.focus()`. Without this, keyboard events like 'Escape' or Arrow keys might not be captured reliably if focus remains on the triggering element or body. Additionally, restoring focus to the triggering element upon closing the modal is critical for a seamless keyboard navigation experience, especially in a dense grid.

**Action:** Always include `tabindex="-1"` on modal containers and implement a `lastFocusedElement` pattern to capture and restore focus when toggling overlays.
