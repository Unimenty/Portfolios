## 2026-05-09 - [Keyboard Accessibility in Virtualized Grids]
**Learning:** In custom infinite or virtualized grids, managing `tabindex` dynamically (setting it to -1 for culled/hidden elements) is crucial to prevent "ghost" tab stops and ensure a logical navigation flow for keyboard users.
**Action:** Always check if elements are currently rendered or visible before allowing them to be in the tab order.

## 2026-05-09 - [Focus Restoration Pattern]
**Learning:** For modal-like overlays (lightboxes), saving the `document.activeElement` before opening and calling `.focus()` on it after closing is essential for maintaining the user's spatial context.
**Action:** Implement a `lastFocusedElement` variable to capture and restore focus when toggling UI overlays.
