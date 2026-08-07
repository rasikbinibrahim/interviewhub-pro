# Difficulty Classifier

**Purpose:** classify a question as Easy, Medium, or Hard using a
consistent, defensible rubric — not gut feel, and not calibrated against
any single external source's labels (which are often inconsistent with
each other).

## Required inputs

- The full question (problem statement, constraints, expected solution
  approach)

## Rubric

Score each axis 0-2, then use the total to classify.

| Axis | 0 | 1 | 2 |
|---|---|---|---|
| **Pattern recognition** | Pattern is immediately obvious from the problem statement | Requires connecting 1-2 known patterns | Requires a non-obvious insight or combining 3+ techniques |
| **Implementation complexity** | A few lines, no tricky bookkeeping | Moderate state tracking (pointers, a small DP table) | Significant state, multiple edge-case branches, or a non-trivial data structure to build |
| **Edge case surface** | Few/no edge cases beyond the obvious | Several edge cases requiring care | Many subtle edge cases, easy to silently mishandle one |
| **Time pressure realism** | Solvable well within a typical interview slot with room to explain | Fills most of a typical slot | Tight even for a strong candidate; realistically needs hints |

**Total 0-2:** Easy · **3-5:** Medium · **6-8:** Hard

## Process

1. Score all four axes with a one-line justification each — don't just
   output a number with no reasoning; the reasoning is what makes the
   classification checkable/correctable later.
2. Sum the score and map to Easy/Medium/Hard using the table.
3. If the score sits exactly on a boundary (2/3 or 5/6), state which way
   you're rounding and why (e.g. "rounding up to Medium because the edge
   case surface is unusually easy to get wrong even though implementation
   is short").
4. Sanity-check against comparable, already-classified questions in this
   repo if any exist for the same pattern — flag if this classification
   would be inconsistent with an existing one, rather than silently
   diverging.

## Hard constraints

- Never classify based on category alone ("it's a DP problem, so it's
  Hard") — plenty of DP problems are Easy/Medium; the rubric, not the
  category, decides.
- Always show the per-axis scores, not just the final label — this is
  what makes the classification auditable and correctable.

## Output skeleton

```markdown
**Pattern recognition:** [0-2] — ...
**Implementation complexity:** [0-2] — ...
**Edge case surface:** [0-2] — ...
**Time pressure realism:** [0-2] — ...

**Total:** [n]/8 → **Difficulty: [Easy/Medium/Hard]**
```
