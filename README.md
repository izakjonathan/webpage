# Izak Hyllested portfolio

A Next.js App Router portfolio with a homepage, project archive and five case studies. Next.js 16, React 19 and strict TypeScript; Node.js 22+ (CI and Vercel use Node.js 24).

## Run locally

```sh
npm ci
npm run dev
```

## Validate

```sh
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright install chromium
npm run test:e2e
```

See [architecture](docs/architecture.md), [testing](docs/testing.md) and [development workflow](docs/development-workflow.md).

Content lives in `src/features/projects/data/projects.ts`; all archive links, detail pages, metadata and adjacent-project navigation use this catalogue. Homepage content lives in `src/features/home/components/HomePage.tsx`. Shared styles live in `src/styles/globals.css`.

No database, API credentials, authentication or personal-data collection is implemented. Existing Vercel deployment protection is managed by the project and is unchanged. Vercel installs from the lockfile with `npm ci`. The public metadata base URL is configured in `src/config/site.ts`; update it if a custom domain is connected.

The former random stock photos have been removed. Case studies show project overview panels until genuine project screenshots are supplied. Existing project descriptions and outcomes are preserved from the baseline and should be verified editorially before public marketing use.
