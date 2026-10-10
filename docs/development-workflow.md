# Development workflow

1. Fetch the latest repository state and identify a confirmed working baseline/deployment.
2. Create a feature branch, inspect affected code and preserve project slugs, content and design invariants.
3. Make a complete focused change in the owning feature. Update regression coverage and documentation.
4. Install with `npm ci`; run lint, typecheck, tests, production build and browser checks.
5. Review the diff, dependency audit and screenshots. Record limitations honestly.
6. Commit and open a reviewable pull request. Merge only when requested; Vercel deploys from its linked Git branch.

Previous versions remain recoverable through Git. To undo a merged release, revert its commit rather than resetting shared history. No database changes exist in this release. Future database changes need data-preserving migrations, query/type updates and tests.
