# 001 — Feature boundaries and progressive enhancement

Accepted 2026-10-10.

Use server-rendered feature components and isolate motion in a small client component. Optional animation must never determine whether core content is accessible. Preserve the site's typography, black background, lime accents, fixed navigation and layered portrait/graphic treatment while removing accumulated CSS overrides.

Use Next.js 16.4.0 with React 19, strict TypeScript and a lockfile instead of retaining vulnerable Next.js 14.2.5. Async route params are explicitly awaited. Known catalogue routes are prerendered; unknown routes return 404.

Remove random third-party stock imagery instead of presenting it as project screenshots. Overview panels retain visual hierarchy and use existing project data. Genuine project assets remain an editorial follow-up because none were supplied.
