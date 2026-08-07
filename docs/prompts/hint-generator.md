# Hint Generator

**Purpose:** produce progressive hints for a question — following the
[Solution Visibility](../../CLAUDE.md#solution-visibility) reveal order
(Hint → Algorithm → Dry Run → Code → Complexity → Follow-up), a hint must
never leak what the *next* reveal stage would show.

## Required inputs

- The question and its intended solution approach

## Process — exactly 3 hints, each strictly more revealing than the last

1. **Hint 1 — reframe the problem.** Point at the *shape* of the problem
   without naming the pattern. ("Think about what has to be true about
   two elements for them to be a valid pair here — does the order you
   check them in matter?") This should be usable by someone who hasn't
   made any progress yet, and should not name a specific algorithm or
   data structure.
2. **Hint 2 — name the pattern or data structure**, without describing
   the implementation. ("This is solvable with a single pass using a
   hash map to remember what you've already seen — think about what key
   and value you'd store.") This is the hint most candidates actually
   need.
3. **Hint 3 — name the key trick or invariant**, stopping short of code.
   ("Specifically: for each element, check whether `target - element` is
   already a key in your map *before* adding the current element as a
   key — why does the order of check-then-insert matter here?") This is
   the last stop before the full Algorithm section.

## Hard constraints

- **Hint 1 must never name the pattern.** If hint 1 says "use a hash
  map," it's actually hint 2 mislabeled — tighten it.
- **No hint may include code**, even partial — code belongs in the Code
  reveal stage, not before it.
- **Hint 3 must still require the reader to do real work** — it names
  the trick, but doesn't hand over the implementation or the dry run.
- Each hint should be genuinely usable in isolation — a reader stopping
  at hint 1 should get real, unambiguous value from it, not filler that
  just restates the problem.

## Output skeleton

```markdown
**Hint 1:** ...
**Hint 2:** ...
**Hint 3:** ...
```
