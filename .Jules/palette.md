## 2025-05-15 - Initial UX & Accessibility Audit
**Learning:** High-fashion portfolio sites often prioritize aesthetics over accessibility. In this repository, the "Platinum Grid Engine" culls off-screen elements for performance, but they remain in the tab order if not managed, creating a "keyboard trap" or confusing navigation. Similarly, modals lack focus management and keyboard listeners (Escape/Arrows).

**Action:**
1. Dynamically manage `tabIndex` for culled grid items.
2. Implement focus restoration and programmatic focus for all overlays (Lightbox, Menu, Services).
3. Add global keyboard listeners for modal control and lightbox navigation.
4. Synchronize image metadata (alt text) in real-time during lightbox navigation.
