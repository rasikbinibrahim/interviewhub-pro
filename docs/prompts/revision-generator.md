# Revision Generator

**Purpose:** compress an already-written topic or a set of solved
questions into dense, scannable revision material for
[83-cheat-sheets](../../83-cheat-sheets) or
[84-revision-notes](../../84-revision-notes) — content meant to be read
in minutes the night before an interview, not studied fresh.

## Required inputs

- The source topic page(s) or question set to compress
- Format target: cheat sheet (reference-style, terse) or revision notes
  (slightly fuller, still condensed)

## Process

1. **Extract, don't re-derive.** Pull directly from the source content's
   Theory, Best Practices, Common Mistakes, and Revision Checklist
   sections — a revision doc is a compression of verified content, not a
   fresh pass that might introduce new claims unchecked against the
   source.
2. **Cut everything that isn't recall-critical.** Full explanations,
   production scenarios, and detailed dry runs belong in the source
   page, not here — link back to it instead of repeating it. A revision
   doc that's as long as the source page has failed at its job.
3. **Prioritize the highest-frequency traps.** If the source's Common
   Mistakes section lists five mistakes, lead with the ones most likely
   to actually appear as a "gotcha" in an interview, not in source order.
4. **Format for scanning, not reading.** Tables, short bullet fragments,
   bolded key terms — a reader should be able to find the one fact they
   forgot in under 10 seconds.
5. **Always link back** to the full topic page for anyone who needs the
   full explanation, not just the compressed reminder.

## Hard constraints

- Never introduce a new claim that isn't already substantiated in the
  source page — this file compresses, it doesn't originate content.
- Don't compress away the *reason* for a rule entirely — "use `const` by
  default" with zero context is weaker than "use `const` by default (only
  the binding is protected, not the value)" even in compressed form; a
  one-clause reason is usually worth keeping.

## Output skeleton (cheat sheet style)

```markdown
## [Topic] — Cheat Sheet

| Concept | One-line fact |
|---|---|
| ... | ... |

**Top gotchas:**
- ...
- ...

**Full topic:** [link]
```

## Output skeleton (revision notes style)

```markdown
## [Topic] — Revision Notes

**Core idea:** ... (1-2 sentences)

**Must-remember:**
- ...

**Common trap:** ... → **Fix:** ...

**Full topic:** [link]
```
