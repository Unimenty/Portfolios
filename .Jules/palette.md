## 2025-05-15 - Enhancing Accessibility in Infinite Grids
**Learning:** In infinite or virtualized grids, elements that are culled or hidden from view should have their `tabIndex` set to `-1` to prevent the keyboard focus from "disappearing" into invisible elements. Additionally, for luxury sites with custom cursors, `:focus-visible` is essential to provide clear feedback for keyboard users without affecting the aesthetic for mouse users.
**Action:** Always synchronize `tabIndex` with visibility in dynamic rendering loops and use `:focus-visible` for all interactive elements.

## 2025-05-15 - Lightbox Focus Management
**Learning:** Static containers used as modals or lightboxes must include `tabindex="-1"` to allow programmatic focus via JavaScript (`.focus()`), ensuring keyboard interaction is successfully captured when the overlay opens.
**Action:** Add `tabindex="-1"` to all modal-like containers and manage focus transitions explicitly when opening and closing.
