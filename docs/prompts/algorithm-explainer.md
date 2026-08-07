# Algorithm Explainer

**Purpose:** explain *why* an algorithm works — the invariant or insight
that makes it correct — not just narrate what the code does line by line.

## Required inputs

- The algorithm or solution code
- The problem it solves

## Process

1. **Name the pattern.** Two pointers, sliding window, DFS/BFS,
   divide-and-conquer, DP, greedy, binary search on the answer space,
   etc. If it's a hybrid or doesn't cleanly fit a named pattern, say so
   rather than forcing a label.
2. **State the core insight in one sentence** — the specific fact about
   the problem that makes this pattern applicable. ("Because the array is
   sorted, once `nums[mid] >= target` we can discard the entire right
   half — that's what makes binary search valid here, not just that
   'binary search is fast'.")
3. **State the invariant the algorithm maintains**, if it has one (e.g.
   "the window `[left, right]` always contains at most one duplicate
   character" for a sliding-window problem) — and explain why maintaining
   it guarantees a correct final answer.
4. **Walk why each major step exists**, tied back to the invariant/insight
   — not a restatement of the code in English. "We shrink the window from
   the left" is what; "because once a duplicate enters the window, no
   larger window starting further left can be valid either, so we can
   safely discard those positions" is why.
5. **Explain why a naive approach is worse**, concretely — the specific
   redundant work it does that the optimized approach avoids.

## Hard constraints

- Never write "this works because it's efficient" — that's a conclusion,
  not an explanation. Every explanation must trace to a concrete property
  of the problem or data.
- If the algorithm relies on a non-obvious mathematical or structural
  fact (e.g. XOR self-cancellation for the "single number" pattern,
  the pigeonhole principle for a duplicate-detection problem), state
  that fact explicitly and prove it holds for this problem's
  constraints.

## Output skeleton

```markdown
**Pattern:** ...

**Core insight:** ...

**Invariant maintained:** ...

**Why each step exists:**
- Step: ... → Why: ...
- Step: ... → Why: ...

**Why the naive approach is worse:** ...
```
