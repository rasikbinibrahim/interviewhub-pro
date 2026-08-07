# API Guide

> **Status: target API spec, not yet built.** No backend is running.
> Endpoints below assume the schema in [DATABASE.md](DATABASE.md).

## Conventions

- REST over HTTPS, JSON request/response bodies.
- Base path: `/api/v1` — versioned from day one so a breaking change
  later doesn't require a flag day.
- Auth: `Authorization: Bearer <access-token>` (JWT), except explicitly
  public endpoints (question list/detail for unauthenticated browsing —
  see [PRD.md](PRD.md)'s open question on whether auth gates progress
  tracking only, or gates the whole app).
- Pagination: cursor-based (`?cursor=...&limit=...`), not offset-based —
  offset pagination degrades on a collection that's actively being
  added to via the admin panel while users are paging through it.
- Errors: a single envelope shape, always:
  ```json
  { "error": { "code": "VALIDATION_ERROR", "message": "...", "details": {} } }
  ```
- Rate limiting: standard `429` with `Retry-After` header; Submit
  specifically is rate-limited per-user (see
  [DATABASE.md](DATABASE.md)'s Redis section) to prevent brute-forcing
  hidden tests.

## Auth

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/register` | Email/password signup |
| POST | `/auth/login` | Email/password login → access + refresh token |
| POST | `/auth/refresh` | Exchange refresh token for a new access token |
| POST | `/auth/logout` | Invalidate the current session (Redis) |
| GET | `/auth/oauth/google` | Redirect to Google OAuth (Phase 2) |
| GET | `/auth/oauth/github` | Redirect to GitHub OAuth (Phase 2) |
| GET | `/auth/oauth/callback` | OAuth callback handler |

## Questions

| Method | Path | Purpose |
|---|---|---|
| GET | `/questions` | List with filters — `?difficulty=&topic=&company=&frequency=&status=&bookmarked=&cursor=&limit=` |
| GET | `/questions/:id` | Full question detail (fields per [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md), minus hidden test cases and solution — see reveal note below) |
| GET | `/questions/:id/hint?level=1` | Returns hint 1, 2, or 3 — separate endpoint, not bundled into the main payload, so hints are genuinely not present in the client's initial response and can't be revealed by inspecting network traffic before being requested |
| GET | `/questions/:id/solution` | Returns Algorithm/Dry Run/Solutions/Complexity/Mistakes/Follow-ups — same not-in-initial-payload principle |
| POST | `/questions/:id/run` | Body: `{ code, language }`. Executes against **sample** tests only. Returns per-test pass/fail + actual output. |
| POST | `/questions/:id/submit` | Body: `{ code, language }`. Executes against hidden + edge + performance tests. Returns pass count, runtime, memory, and updates `progress`. Rate-limited (see above). |

**Reveal-integrity note:** the Solution Visibility rule in
[CLAUDE.md](CLAUDE.md) ("hide by default, reveal progressively") is only
real if the server enforces it — hints/solution must never be present in
the initial `GET /questions/:id` response payload even if the UI hides
them client-side, since a client-side-only hide is trivially bypassed
via devtools. This is a genuine security/integrity requirement, not a
UI nicety.

## Technical questions

| Method | Path | Purpose |
|---|---|---|
| GET | `/technical-questions` | List with filters |
| GET | `/technical-questions/:id` | Question + Expected Answer only |
| GET | `/technical-questions/:id/full` | Full detail including Deep Explanation, Production Example, etc. — same reveal-integrity principle as coding questions |

## Progress, bookmarks, notes

| Method | Path | Purpose |
|---|---|---|
| GET | `/me/progress` | Current user's progress across all questions |
| GET | `/me/progress/summary` | Aggregated counts (per difficulty, per topic) for the dashboard |
| POST | `/me/bookmarks/:questionId` | Add bookmark |
| DELETE | `/me/bookmarks/:questionId` | Remove bookmark |
| GET | `/me/notes/:questionId` | Get note for a question |
| PUT | `/me/notes/:questionId` | Upsert note (autosave — client debounces, not the API) |
| GET | `/me/revision/due` | Questions due for revision today (per the Day 1/3/7/15/30 schedule) |

## Companies

| Method | Path | Purpose |
|---|---|---|
| GET | `/companies` | List of companies with question counts |
| GET | `/companies/:slug` | Company dashboard data — per-topic breakdown, recently-asked, completion stats for the current user |

## Mock interviews (Phase 3)

| Method | Path | Purpose |
|---|---|---|
| POST | `/mock-interviews` | Start a session — body: `{ company, durationMinutes, questionMix }` → returns session with question IDs, no answers |
| POST | `/mock-interviews/:id/submit` | One-shot final submission for the whole session |
| GET | `/mock-interviews/:id/result` | Score + per-question breakdown, only after submission |

## Admin

All endpoints below require admin auth — see
[ADMIN_GUIDE.md](ADMIN_GUIDE.md) for the access-control model.

| Method | Path | Purpose |
|---|---|---|
| POST | `/admin/questions` | Create a question (validated against [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)'s required fields) |
| PUT | `/admin/questions/:id` | Update a question |
| DELETE | `/admin/questions/:id` | Delete (soft-delete recommended — see note below) |
| POST | `/admin/questions/bulk-import` | Body: JSON array or markdown files matching the template; returns per-item validation results, not all-or-nothing |
| GET | `/admin/analytics` | Platform-level stats — active users, questions solved, content coverage gaps |

**Soft-delete note:** deleting a question that users have `progress`/
`bookmarks`/`notes` rows referencing (see [DATABASE.md](DATABASE.md)'s
cross-database reference note) would orphan those rows. A `deletedAt`
field on the MongoDB document, filtered out of all normal queries, is
the standard fix — a hard delete is a data-loss-shaped foot-gun here,
not a simplification.

## What's deliberately not in this version

- No GraphQL — nothing in this platform's data shape needs GraphQL's
  flexible-query benefits enough to justify its added complexity over a
  well-designed REST API with purpose-built list/filter endpoints.
- No WebSocket endpoints in MVP — nothing here is genuinely real-time
  (a mock interview timer runs client-side against a server-verified
  start time, not over a live socket connection).

---
[← Back to root index](README.md)
