# Architecture

- `src/app`: layout, pages, project slug validation, static route generation, metadata and not-found boundary.
- `src/features/home/components`: server-rendered content and one client-only motion enhancement.
- `src/features/projects`: a typed project catalogue and server-rendered archive/row/case-study UI.
- `src/components`: navigation and scroll-reveal enhancement shared across unrelated routes.
- `src/config`: canonical site identity and URL.
- `src/styles`: consolidated shared styles with explicit responsive and reduced-motion rules.

HomeEffects, ScrollReveal and the small shared MenuLink interaction are Client Components. MenuLink handles repeated same-route/hash navigation explicitly, preserving Next.js navigation for other routes and normal modified clicks. Navigation is at layer 1000, graffiti at 900, and page content at 4. Each effect owns its timers, observers, event listeners and animation frames, and cleans them up on unmount or preference changes. It never mutates the document root. Content is visible by default, and the splash exists only as an optional non-interactive decoration after hydration. ScrollReveal handles independent offscreen content across every route, reveals each target once, and fails open if initial observer delivery never arrives. See [scroll-reveal research](scroll-reveal.md).

The catalogue is the single exported source for list content, case studies, route generation, metadata and previous/next links. Unknown slugs are 404s. Known project pages are prerendered. There are no backend endpoints, databases, migrations, sessions or authorization logic. Vercel protection is external to this codebase.

No empty database/schema/shared-type layers are added. Add these only when real requirements arise. Asset loading uses Next Image with dimensions, responsive sizes, preload for the hero and lazy loading for the portrait.
