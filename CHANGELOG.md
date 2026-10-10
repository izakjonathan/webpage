# Changelog

## 1.1.0 — 2026-10-10

Baseline: dfd681a4cf0ab77ecb9921feb546e8596cc11117 (confirmed READY production deployment).

- Upgrade Next.js/React and add strict TypeScript, ESLint, locked installs and CI.
- Move homepage and project implementations into feature folders; centralize project content and navigation.
- Keep content readable without JavaScript, restore archive visibility, enable zoom and respect reduced motion.
- Bound and clean up intro/reveal timers, animation frames, observers and listeners; stop parallax while idle.
- Fix About links, invalid project 404s and narrow-screen case-study geometry/navigation.
- Consolidate CSS, remove obsolete styles and duplicate metadata; add keyboard navigation/focus treatment.
- Optimize homepage imagery, add per-project metadata and prerender known case studies.
- Remove unrelated random stock images; use honest overview panels pending genuine project screenshots.
- Add regression tests and architecture, workflow, decision and testing documentation.
