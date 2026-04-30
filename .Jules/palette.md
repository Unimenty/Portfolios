# Palette's UX Journal

## 2025-05-15 - [Dynamic Tabindex in Infinite Grids]
**Learning:** In infinite or virtualized grids, tabbing into off-screen "culled" elements creates a confusing experience for keyboard users as the focus disappears into the void.
**Action:** Dynamically toggle `tabIndex` (0 for visible, -1 for hidden) within the rendering loop to ensure the keyboard focus path always matches the visual state.
