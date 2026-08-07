# Company Question Generator

**Purpose:** generate or tag a set of questions for a specific company
from the [Company Tags](../../CLAUDE.md#company-tags) list.

## Required inputs

- Company name (must be from the approved list in CLAUDE.md — if not on
  the list, ask whether to add it rather than tagging silently)
- Optional: role level (the same company asks different things at
  Senior vs. Staff)

## The no-fabrication rule

This is the most important rule in this file. **Never invent that a
company asks a specific question** unless there's a real, statable basis
for it — a pattern that's genuinely, verifiably common for that company's
interview style (their known focus areas: e.g. a company with a
famously deep system-design bar, a company known for heavy DSA screens,
a company known for take-home assignments over live coding).

When generating company-tagged content:

- **If the basis is a well-known, broadly-reported interview pattern**
  (e.g. "this company is widely known to emphasize whiteboard system
  design in onsite rounds"), state that as the reasoning, in general
  terms — don't fabricate a specific verbatim question and attribute it
  to the company as if it's a leaked question bank entry.
- **If there's no real basis**, don't tag the company at all. A shorter,
  honest list beats a padded, fabricated one — this directly serves the
  repo's actual goal (real interview prep), which fabricated company
  attribution actively undermines by teaching false confidence.
- **Distinguish "this pattern is common at this type of company"
  (defensible) from "this exact question was asked at this company on
  this date" (not defensible unless sourced)** — the former is fine to
  generate; the latter requires a real source, and belongs in
  [92-interview-experiences](../../92-interview-experiences) as a
  reported/sourced entry, not asserted as fact elsewhere.

## Process

1. Identify the company's genuinely known interview characteristics
   (round structure, emphasis areas — DSA depth, system design depth,
   take-home vs. live, behavioral bar) — state your basis.
2. Select or generate questions from the existing question bank
   ([61](../../61-javascript-coding)–[65](../../65-dsa),
   [60](../../60-frontend-system-design)) that match that company's known
   emphasis.
3. Tag them, and add the company to each question's Companies field per
   [coding-question-generator.md](coding-question-generator.md)'s
   template.
4. Update the relevant index in
   [85-company-wise-questions](../../85-company-wise-questions),
   [86-faang-questions](../../86-faang-questions),
   [87-product-company-questions](../../87-product-company-questions), or
   [88-mnc-questions](../../88-mnc-questions).

## Output skeleton

```markdown
## [Company] — Interview Pattern

**Known emphasis:** ... (with stated basis)
**Typical round structure:** ...

### Representative questions from this repo
- [Question title](link) — why this fits this company's pattern
- [Question title](link) — why this fits this company's pattern
```
