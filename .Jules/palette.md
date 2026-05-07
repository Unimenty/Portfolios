# Palette's Journal - High-Fashion Portfolio UX

## 2025-05-14 - Infinite Grid Accessibility Pattern
**Learning:** In high-performance, coordinate-wrapping infinite grids, standard keyboard navigation is easily broken by off-screen elements. Managing `tabIndex` dynamically within the same culling logic used for `visibility` is essential to prevent "focus traps" where the keyboard focus disappears into culled elements.
**Action:** Always synchronize `tabIndex` updates with visibility/culling logic in animation loops. Use a value-check before DOM writes to avoid performance degradation.

## 2025-05-14 - Overlay Focus Restoration
**Learning:** In highly interactive single-page portfolios, closing a lightbox or menu without focus restoration forces keyboard users to restart their navigation from the top of the page.
**Action:** Capture `document.activeElement` before opening overlays and explicitly `.focus()` it back upon closing.
