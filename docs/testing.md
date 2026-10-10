# Testing

`npm run lint` checks Next.js, React hooks and TypeScript conventions. `npm run typecheck` checks strict source/test types. `npm run test` checks unique catalogue routes, required fields, unknown-slug handling and circular adjacent-project navigation. `npm run build` generates the production bundle and known routes.

`npm run test:e2e` launches the production build at port 3100. Chromium coverage runs on mobile and desktop: archive visibility and every case-study link, About navigation, actual invalid-route HTTP status, no-JavaScript content, reduced motion and zoom, leaving during intro, and showcase/project-navigation bounds at 320/390/768/1440px.

Install a browser with `npx playwright install chromium`. CI installs Chromium and OS dependencies. In restricted environments, `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can select an existing compatible Chromium executable; this is a local test option and not an application dependency.

Before release visually inspect homepage, archive and all case studies, keyboard focus, 200% zoom, motion preferences and mobile portrait/landscape. Chromium tests do not establish iOS Safari compatibility or every blend-mode contrast scenario. Add real project screenshots when available; do not pass stock photos off as product evidence.

## Version 1.1.0 validation

Lint, strict type checking, three catalogue regression tests, a clean production build, and 18 Chromium browser checks passed locally on 2026-10-10. Mobile/desktop screenshots were inspected. The default browser download was unavailable in this environment; tests used an extracted compatible Chromium executable via the documented override.

`npm audit --omit=dev` reported zero known vulnerabilities. Full `npm audit` reports the development-only GHSA-vfj7-8cjw-p6xm advisory in braces 3.0.3, pulled through micromatch/fast-glob by the current Next.js ESLint plugin. Registry latest braces remains 3.0.3; the automated suggestion is to downgrade the Next lint configuration to 14.x, which is not appropriate for this upgrade. These packages are not production dependencies, and no user-supplied patterns enter lint configuration. Recheck upstream patch availability before future dependency updates. Do not describe the full development dependency tree as vulnerability-free.

## Version 1.1.1 validation

Lint, strict type checking, three unit tests, a clean production build and all 22 Chromium checks passed. New tests reproduce repeated mobile taps on About, the home logo and Projects while retaining the same URL/hash, and check graffiti/content/menu layer order. The landing screenshot was inspected to confirm the graffiti paints over typography while menus remain clear. iOS Safari was not directly available for device testing.
