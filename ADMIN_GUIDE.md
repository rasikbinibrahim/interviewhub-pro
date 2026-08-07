# Admin Guide

> **Status: target admin panel, not yet built.** This document defines
> its scope and content-management workflow.

## Purpose

The admin panel exists so the question bank can keep growing without
touching code — writing a new question should mean filling a form or
pasting a markdown file, not opening a pull request. This is explicitly
a single-operator tool ("Admin Panel (For You)" in the original spec),
not a multi-tenant contributor marketplace — see the access-control
model below.

## Access control

- **MVP:** a single hardcoded admin role, granted to one account (yours)
  via a database flag, not a self-service signup path. No public "become
  an admin" flow exists or should exist.
- **If this ever becomes multi-contributor:** that's a real access-model
  redesign (roles, review/approval workflow before publish, audit log of
  who changed what) — not an incremental add-on to the single-admin
  model. Flag this explicitly if it comes up rather than bolting on
  partial multi-user support.

## Core capabilities

### Add / edit / delete questions

Two entry paths into the same validated pipeline:

1. **Form-based:** a structured form mirroring
   [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)'s field order exactly —
   same order as the template, so the form is never the first place an
   admin encounters a field they don't recognize from the docs.
2. **Markdown paste/upload:** paste a `.md` file authored against
   [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md); the system parses it
   into the same structured shape as the form. This is the path that
   lets markdown content already written in this repo's sections (e.g.
   [65-dsa](65-dsa)) become live platform content without manual
   re-entry.

Both paths converge on the same **validation pipeline** before publish:

- Every required field present (per [CHECKLIST.md](CHECKLIST.md)'s
  validation checklist) — missing fields block publish, they don't warn
  and allow through.
- At least 1 sample test case and 1 hidden test case provided (a
  question with zero test cases can't power Run/Submit at all).
- JS and TS solutions both present, and — where the execution
  environment supports it — actually run against the provided test
  cases at save time, so a broken reference solution is caught at
  authoring time, not discovered by a user's Submit failing against a
  wrong "expected" answer.
- Company tags checked against the approved list in
  [CLAUDE.md](CLAUDE.md#company-tags) (typo/new-company prevention —
  adding a genuinely new company is still possible, just explicit, not a
  free-text field that silently fragments into near-duplicate tags over
  time).

Deletion is soft-delete (see [API_GUIDE.md](API_GUIDE.md)'s note) — a
deleted question disappears from all user-facing views but its
referencing `progress`/`bookmarks`/`notes` rows in Postgres remain
intact rather than becoming orphaned or cascading a delete a user didn't
ask for.

### Bulk import / export

- **Import:** upload a JSON array or a folder of markdown files. Each
  item is validated independently — the import reports a per-item
  pass/fail list rather than succeeding or failing as a single
  all-or-nothing batch, since one malformed question in a batch of 50
  shouldn't block the other 49.
- **Export:** download the current question bank as JSON or as markdown
  files matching [QUESTION_TEMPLATE.md](QUESTION_TEMPLATE.md)'s format
  — this is also the backup/portability story: the platform's database
  is never the only copy of the content if export is exercised
  regularly.

### Manage companies & categories

- Companies: add/rename/merge (merging matters in practice — if
  "Meta" and "Facebook" both exist as separate tags from different
  import batches, an admin needs a way to consolidate them without
  manually re-tagging every affected question).
- Categories: must map onto [ROADMAP.md](ROADMAP.md)'s taxonomy — the
  admin panel should not allow creating a category that doesn't exist in
  that document, to prevent the content structure and the admin tool's
  category list from silently drifting apart.

### Platform analytics (admin-facing, distinct from user-facing Analytics)

- Content coverage: which [ROADMAP.md](ROADMAP.md) categories are
  thin (few questions) versus well-covered — this is the dashboard that
  tells you where to write next, directly informing
  [PROGRESS.md](PROGRESS.md)-style prioritization but computed from live
  usage/content data instead of maintained by hand.
- Question quality signals: questions with unusually low submit-pass
  rates (may indicate an unclear problem statement or a bug in the
  reference solution, not just "this is hard") and questions that are
  viewed often but rarely attempted (may indicate the problem statement
  isn't landing).
- User-facing analytics (streaks, accuracy, weak topics — the
  "📈 Analytics" screen from the product vision) is a *user*-facing
  feature, specced in [PRD.md](PRD.md), not part of this admin surface.

## What the admin panel is explicitly not

- Not a general-purpose CMS — it only understands the two content types
  (coding questions, technical questions) and their exact templates; it
  doesn't need a flexible page builder or arbitrary content types.
- Not a moderation queue — there's no submitted-by-others content to
  moderate at the single-admin scope defined above.

---
[← Back to root index](README.md)
