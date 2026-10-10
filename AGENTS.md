# Development instructions

Start from the latest confirmed working commit and inspect the implementation. Keep existing public routes, project slugs, visual identity and content unless explicitly changing them. Never weaken types or disable authorization or tests to pass checks.

`src/app` owns routing, metadata, boundaries and layouts. Domain UI and data belong in `src/features/home` and `src/features/projects`; unrelated shared UI belongs in `src/components`. Prefer Server Components. Keep optional browser effects isolated, reduced-motion aware, fail-open and fully cleaned up.

Before delivery run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` and `npm run test:e2e` when Chromium is available. Report any unexecuted checks. Review the final diff for unrelated changes, duplication, dead code, boundary mistakes and accessibility regressions. Update documentation and changelog for significant changes. Use feature branches and reviewable commits; never rewrite the confirmed working baseline.

Do not fabricate project screenshots or results. Add genuine assets to their owning feature when available. Keep dependencies pinned and commit package-lock.json. Do not commit build output, dependencies, credentials or environment files.
