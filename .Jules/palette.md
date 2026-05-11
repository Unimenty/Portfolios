## 2025-05-14 - Virtualized Grid Accessibility
**Learning:** In infinite or virtualized grids, dynamically managing tabIndex (0 for visible, -1 for hidden/culled) ensures that keyboard users don't get trapped navigating off-screen elements. Performing a value check before updating the DOM attribute prevents redundant writes and performance degradation in high-frequency render loops.
**Action:** Always implement dynamic tabIndex management and visibility-based attribute updates in grid-based UIs.

## 2025-05-14 - Focus Restoration Pattern
**Learning:** Saving 'document.activeElement' to a 'lastFocusedElement' variable before opening overlays (lightboxes, menus) and restoring focus to it upon closing is essential for maintaining keyboard navigation context and preventing focus loss.
**Action:** Use a consistent focus restoration pattern for all modal and overlay components.
