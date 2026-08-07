# Complexity Analyzer

**Purpose:** produce a correct, step-by-step time and space complexity
analysis for a given solution — not just a final Big-O label pulled from
memory of "this kind of problem is usually O(n log n)."

## Required inputs

- The solution code
- The input size variable(s) it should be expressed in terms of (e.g.
  `n` = array length, `m`/`n` = two different input sizes, `k` = a
  distinct bounded parameter like alphabet size)

## Process — Time Complexity

1. **Identify every loop and recursive call**, and state its individual
   cost in terms of the input size.
2. **Determine whether loops are nested, sequential, or data-dependent**
   (a `while` loop bounded by a shrinking search space, e.g. binary
   search, is not the same as a simple linear scan — analyze it on its
   actual behavior, not its surface shape).
3. **For recursion**, write the recurrence relation (e.g.
   `T(n) = 2T(n/2) + O(n)`) and solve it (state whether via the Master
   Theorem, direct substitution, or recursion-tree reasoning) rather than
   asserting the final complexity without derivation.
4. **Account for the cost of operations inside loops** — e.g. an `indexOf`
   or array `.includes()` call inside a loop is itself O(n), which
   changes the outer loop's true complexity from what it looks like at a
   glance.
5. **State the final time complexity**, and explicitly separate
   best/average/worst case if they differ meaningfully (e.g. quickselect,
   hash-map operations with collision behavior).

## Process — Space Complexity

1. **Count auxiliary space only** (not input size, unless the solution
   copies the input) — state this distinction explicitly since it's a
   common source of disagreement/confusion.
2. **Include recursion call-stack depth** as space — a recursive solution
   with O(log n) extra variables but O(n) recursion depth is O(n) space,
   not O(log n); this is one of the most commonly missed details.
3. **State the final space complexity.**

## Hard constraints

- Never state a complexity without the derivation that produced it —
  "O(n log n)" alone is not an analysis, it's a conclusion.
- Explicitly flag any hidden costs from built-in methods used in the
  solution (sorting is O(n log n), not free; spreading an array is
  O(n), not O(1); object/array destructuring of a large structure has a
  real cost).

## Output skeleton

```markdown
**Time Complexity:** O(?)
- Loop/recursion 1: ... → O(?)
- Loop/recursion 2: ... → O(?)
- Hidden cost from [built-in]: ... → O(?)
- Combined: ...

**Space Complexity:** O(?)
- Auxiliary data structures: ...
- Recursion depth (if applicable): ...
- Combined: ...
```
