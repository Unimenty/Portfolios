## 2023-11-20 - [Focus Restoration in 3D Galleries]
**Learning:** In infinite or virtualized 3D galleries, closing a modal can lead to "focus loss" if the original trigger element has been culled or transformed. Explicit focus restoration to the specific DOM element is critical for screen reader continuity.
**Action:** Always save `document.activeElement` before opening overlays and restore it on close, ensuring the element is still in the DOM and visible.
