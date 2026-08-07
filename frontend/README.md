# InterviewHub Pro — Frontend

Vite + React 19 + TypeScript (strict) + Tailwind + Redux Toolkit/RTK Query + Monaco.

Built against mocked data — no backend exists yet. See
[`../PROGRESS.md`](../PROGRESS.md#implementation-phases)
for exactly which phases are real, and
[`../ARCHITECTURE.md`](../ARCHITECTURE.md) for the full target structure
this app is being built toward.

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # production build (runs tsc -b first)
npm run lint       # oxlint
npm run test       # vitest, single run
npm run test:watch # vitest, watch mode
npx tsc -b          # typecheck only
```

## Where things live

- `src/routes/` — React Router route definitions (thin)
- `src/features/` — self-contained feature slices (`dashboard`, `questions`, `editor`)
- `src/components/` — shared, reusable UI (`ui/`) and layout (`layouts/`) components
- `src/store/` — Redux Toolkit store; `api/` holds RTK Query slices, `slices/` holds client UI state
- `src/shared/` — hooks, services, and types shared across features
- `src/mocks/` — mock question data (transcribed from [`/65-dsa`](../65-dsa)), standing in for a real backend
- `src/test/setup.ts` — Vitest/Testing Library setup, loaded before every test run
- `src/test/testStore.ts`, `src/test/renderWithProviders.tsx` — shared test helpers for tests that need a real Redux store/router context

Tests are colocated next to the code they cover (`foo.ts` + `foo.test.ts`),
not in a separate `tests/` tree — easier to keep in sync as the source changes.

**If `npm run test` reports fewer than 63 tests, or a worker-start error:**
that's a known issue in some sandboxed/slow-disk dev environments (WSL in
particular, especially with multiple concurrent dev sessions on the same
machine), not a real failure — Vitest's worker pool can occasionally time
out starting one file's worker and either drop that file from the run
silently or fail it outright. Re-run, or isolate the affected file with
`npx vitest run <path>`. See [`../PROGRESS.md`](../PROGRESS.md#implementation-phases)
(Phase 13) for the full explanation.

**A testing-library gotcha worth knowing if you add more tests:**
`getByText` normalizes whitespace and doesn't combine text split across a
nested inline element (e.g. `<p><span>1</span> items</p>`), and
`toHaveValue()` doesn't support asymmetric matchers like
`expect.stringContaining(...)`. Both caused real test failures while
writing this suite — see `RevealPanel.test.tsx` and `Dashboard.test.tsx`
for the working patterns (a custom text-matcher function comparing
`element.textContent` directly).

See [`../STYLE_GUIDE.md`](../STYLE_GUIDE.md) for naming/formatting conventions and
[`../CLAUDE.md`](../CLAUDE.md#application-codebase-standards) for the
architecture rules this codebase follows.
