# Site-wide scroll reveals

## Research and choice

Reviewed primary documentation on 2026-10-10:

- [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API): asynchronous viewport intersection, widely available since March 2019. One observer can watch multiple elements. Threshold zero works with content taller than a viewport; unobserve each completed target. Avoid trackVisibility because opacity-hidden content would be considered invisible.
- [web.dev animation performance](https://web.dev/articles/animations-guide): animate opacity and transform to avoid changing layout. Do not promote every block with permanent will-change.
- [web.dev reduced motion](https://web.dev/articles/prefers-reduced-motion): honor the OS preference in CSS and JavaScript and respond to changes while a page is open.
- [React useEffect](https://react.dev/reference/react/useEffect): effects must undo observers, timers and event subscriptions on cleanup, including development setup/cleanup cycles.
- [MDN animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline): currently marked limited availability. Scroll-driven timelines tie progress to scroll position; this design calls for a time-based entrance that finishes once triggered.

| Approach | Fit for this site |
| --- | --- |
| Intersection Observer + CSS transitions | Selected: native browser trigger, one shared controller, no added dependency, explicit reveal-once behavior. |
| CSS view/scroll timelines | Useful for scroll-linked progress; uneven support and different replay semantics make this a poorer fit today. |
| Animation library | Useful for coordinated timelines/gestures; unnecessary bundle and lifecycle complexity for simple fades. |
| Per-frame scroll handlers | Repeated measurements on the main thread; unnecessary for viewport entry events. |

## Implementation

Server components explicitly mark independent content groups with data-reveal. The shared ScrollReveal client enhancer runs after route commits. First-paint and already-passed content stays visible; only content below the viewport is armed. Entry uses a 650ms eased fade and 24px upward movement, with project row delay capped at 160ms. The observer triggers at first intersection inside a viewport shortened by 32px at the bottom, then stops watching the target. No nested reveal groups. Persistent menus and decorative imagery retain their existing behavior and layer order.

Visible HTML is the default: no JavaScript, unavailable observers, setup exceptions, or an observer that never delivers its initial callback leave content readable. The initial-delivery watchdog is canceled by a healthy observer, so distant content does not automatically reveal after a page-wide timeout. Keyboard focus reveals its content immediately. Print styles force all content visible. Reduced motion disables entrances and clears pending content; CSS also guarantees immediate visibility before the preference-change handler runs. Route and effect cleanup removes all hidden states, subscriptions, timers and observers.

## Verification and limits

Automated Chromium tests cover mobile and desktop viewports, all three page types, tall content, reveal-once behavior, direct anchors, client navigation, keyboard focus, dynamic motion preferences and missing/stalled observers. Existing no-JavaScript, menu, overlay and layout regressions also run. Native Safari and Firefox have not been exercised in this environment; device testing remains useful for visual timing.
