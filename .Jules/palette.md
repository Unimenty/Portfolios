# Palette's UX Journal

## 2024-05-14 - Accessibility in Dynamic Infinite Grids
**Learning:** Custom grid engines (like the "Platinum Grid Engine") that dynamically inject or recycle DOM elements often bypass standard browser accessibility flows. Interactive elements rendered as `div` or `span` are invisible to keyboard users and screen readers unless explicitly given roles and tab indices.
**Action:** When working with custom rendering engines, always inject `role="button"` (or appropriate role), `tabindex="0"`, and `aria-label` during the element creation phase. Additionally, ensure global keyboard listeners (Enter/Space) are attached to trigger the same actions as mouse clicks.
