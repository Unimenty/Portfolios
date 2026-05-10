## 2025-05-14 - Focus Management in Infinite/Virtual Grids
**Learning:** In infinite or virtualized grids, dynamically managing `tabIndex` (0 for visible, -1 for hidden/culled) is essential for a sane keyboard navigation experience. Additionally, performing a value check before updating the DOM attribute avoids redundant writes and performance degradation in high-frequency render loops.
**Action:** Use the `if (el.tabIndex !== value) el.tabIndex = value;` pattern for dynamic focus management in high-performance UI components.

## 2025-05-14 - Lightbox Focus Restoration
**Learning:** Saving the `document.activeElement` before opening an overlay (like a lightbox) and restoring it upon closing ensures that keyboard users do not lose their place in the UI.
**Action:** Always implement `lastFocusedElement` tracking when creating modal or overlay components.
