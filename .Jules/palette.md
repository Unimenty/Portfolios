# Palette's Journal - Kojo Kwarteng Photography Portfolio

## 2025-05-14 - Initial Observations
**Learning:** The portfolio uses a sophisticated infinite grid engine but lacks basic keyboard accessibility for its interactive components, particularly the gallery items and the lightbox.
**Action:** Implement keyboard navigation and focus management for the lightbox, and ensure gallery items are focusable with dynamic tabIndex management.

## 2025-05-14 - Sliding Window tabIndex Pattern
**Learning:** In infinite or virtualized grids where DOM elements are reused or culled, keeping `tabIndex="0"` on all elements (even off-screen ones) causes "ghost tabbing" where the focus disappears into invisible elements.
**Action:** Dynamically manage `tabIndex` within the render loop—setting it to `0` only for elements currently in the viewport/active window and `-1` for culled elements—while performing a value check before updating to avoid redundant DOM writes.
