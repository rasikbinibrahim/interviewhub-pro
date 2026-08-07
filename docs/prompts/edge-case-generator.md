# Edge Case Generator

**Purpose:** produce a thorough, problem-specific edge case list — the
list a solution's Common Mistakes and test suite should both be checked
against.

## Required inputs

- The problem statement, input type(s), and constraints

## Process — check every category that applies to this problem's input type(s)

**For any input:**
- Empty input (empty array/string, zero elements)
- Single-element input
- Input exactly at the stated size boundary (min and max from Constraints)

**For numeric input:**
- Zero
- Negative numbers (if not excluded by constraints)
- Very large numbers (near a language's safe-integer limit, if relevant)
- Duplicate values
- Already-sorted / reverse-sorted input (for anything involving order)

**For string input:**
- Empty string
- Single character
- All identical characters
- Unicode/multi-byte characters (if not explicitly excluded — surrogate
  pairs and grapheme clusters break naive `.length`/indexing)
- Leading/trailing whitespace, if relevant to the problem

**For array/collection input:**
- All elements identical
- Input with `null`/`undefined` elements, if the type allows it
- Nested/irregular structure (sparse arrays, deeply nested objects), if
  relevant

**For tree/graph input:**
- Empty tree/graph (root is `null`)
- Single node
- A tree that's actually a straight line (worst-case depth for recursive
  solutions — this is where stack-depth issues surface)
- Disconnected components (for graphs)
- Cycles (for graphs, if not explicitly excluded)

**For async/Promise-based problems:**
- All operations succeed
- All operations fail
- A mix of success and failure
- One operation that never resolves (timeout behavior, if relevant)

## Hard constraints

- Don't list a generic edge case that doesn't actually apply to this
  problem's constraints (e.g. listing "negative numbers" when the
  constraints explicitly guarantee non-negative input) — every listed
  edge case must be reachable given the stated constraints.
- For each edge case, state **what the correct behavior should be**, not
  just that it exists — "empty array" is not useful without "→ should
  return `[]`, not throw."

## Output skeleton

```markdown
**Edge Cases:**
- Empty input → expected: ...
- Single element → expected: ...
- Boundary size (n = [max from constraints]) → expected: ...
- [Problem-specific edge case] → expected: ...
```
