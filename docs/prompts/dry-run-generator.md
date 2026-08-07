# Dry Run Generator

**Purpose:** given an algorithm/solution and a specific example input,
trace execution step by step so a reader can verify their own mental
model against it line by line.

## Required inputs

- The solution code (or a precise description of the algorithm)
- One concrete example input to trace

## Process

1. **State the starting state** of every variable the algorithm tracks
   before the first iteration (pointers, accumulators, the input itself).
2. **Trace one iteration/step at a time**, as a table wherever the
   algorithm has loop variables that change predictably (two pointers,
   sliding window, DP table fill) — a table is far easier to verify than
   prose for this. Use prose only for algorithms that don't fit a table
   shape (recursion, graph traversal with branching).
3. **Show every variable's value after each step**, not just the ones
   that changed — a reader should be able to freeze the trace at any row
   and know the complete state.
4. **Call out the moment the key insight fires** — the specific step
   where the algorithm's core idea (from
   [algorithm-explainer.md](algorithm-explainer.md)) actually does its
   work, not just mechanical bookkeeping.
5. **End with the final return value**, and confirm it matches the
   example's expected output.

## Hard constraints

- The dry run must be traceable against the *actual* solution code, not
  a simplified restatement of it — if a reader stepped through the real
  code by hand, they should get the same table.
- Never skip a step because it's "similar to the previous one" — every
  iteration gets a row/step, even if repetitive. Repetition is the point;
  it's what proves the pattern.
- Use a real, non-trivial example (not the smallest possible input) so
  the trace actually exercises the algorithm's logic, not just its base
  case.

## Output skeleton (table form — preferred when applicable)

```markdown
**Input:** `nums = [2, 7, 11, 15]`, `target = 9`

| Step | i | nums[i] | seen (map) | Check: target - nums[i] in seen? | Action |
|---|---|---|---|---|---|
| 0 | 0 | 2 | {} | 7 in {}? No | seen.set(2, 0) |
| 1 | 1 | 7 | {2: 0} | 2 in {2:0}? Yes | return [0, 1] |

**Result:** `[0, 1]` — matches expected output.
```

## Output skeleton (prose form — for recursion/branching algorithms)

```markdown
**Input:** `root = [3,9,20,null,null,15,7]`

1. Call `traverse(3, depth=0)` — not a leaf, recurse left and right.
2. Call `traverse(9, depth=1)` — leaf, record depth 1, return.
3. Call `traverse(20, depth=1)` — not a leaf, recurse left and right.
4. Call `traverse(15, depth=2)` — leaf, record depth 2, return.
5. Call `traverse(7, depth=2)` — leaf, record depth 2, return.
6. Max depth recorded: 2. Result: 3 (depth is 0-indexed, so +1) — matches
   expected output.
```
