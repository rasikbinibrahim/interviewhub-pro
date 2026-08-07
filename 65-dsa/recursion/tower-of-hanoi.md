# Q1403 · Tower of Hanoi

**Difficulty:** Medium
**Companies Asked:** Amazon, Microsoft, TCS, Infosys, Wipro
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Recursion
**Concepts:** recursive decomposition, auxiliary-peg reasoning

## Problem Statement

Given `n` disks stacked in decreasing size on a source peg, move the
entire stack to a destination peg, using a third auxiliary peg, following
these rules: only one disk may be moved at a time, a disk can only be
placed on an empty peg or on top of a larger disk, and only the topmost
disk of any peg may be moved. Return the sequence of moves as an array
of `[fromPeg, toPeg]` pairs.

## Input

- `n`: the number of disks
- `source`, `auxiliary`, `destination`: labels for the three pegs (e.g.
  `'A'`, `'B'`, `'C'`)

## Output

An array of `[fromPeg, toPeg]` pairs representing the sequence of moves,
in order.

## Constraints

`1 <= n <= 15` (to keep the move count, `2^n - 1`, manageable)

## Examples

| Input | Output | Why |
|---|---|---|
| `n=1, source='A', auxiliary='B', destination='C'` | `[['A','C']]` | A single disk moves directly |
| `n=2, source='A', auxiliary='B', destination='C'` | `[['A','B'],['A','C'],['B','C']]` | Move smaller disk out of the way, move larger disk, then move smaller disk on top |

## Edge Cases

- `n = 1` → a single direct move, the simplest base case
- Larger `n` → the total number of moves grows exponentially
  (`2^n - 1`), which is an inherent property of the problem, not a sign
  of an inefficient solution
- Peg labels must be tracked correctly through recursive calls — a
  common source of bugs is swapping which peg is "auxiliary" vs
  "destination" between recursive calls

## Hints

1. Moving all `n` disks directly seems to require thinking about `n`
   disks at once — can the problem be broken into moving a *smaller*
   stack, using the same rules recursively?
2. To move `n` disks from source to destination: first move the top
   `n - 1` disks out of the way (to the auxiliary peg), then move the
   single largest disk directly to the destination, then move the
   `n - 1` disks from auxiliary onto the destination — each of those
   three parts is itself a smaller instance of the same problem (or a
   single direct move).
3. Notice that in each recursive sub-call, the roles of "source,"
   "auxiliary," and "destination" *swap* relative to the outer call —
   moving `n-1` disks to the auxiliary peg uses the *destination* peg as
   its own auxiliary for that sub-step.

## Algorithm

**Pattern:** recursive decomposition — solve for `n-1` disks twice, plus
one direct move for the largest disk.
**Core insight:** moving `n` disks from source to destination reduces to
three steps, each simpler than the whole: recursively move the top
`n-1` disks from source to auxiliary (using destination as the
temporary "auxiliary" for that sub-problem), move the single remaining
largest disk directly from source to destination, then recursively move
the `n-1` disks from auxiliary to destination (using source as the
temporary "auxiliary" for that sub-problem). The peg roles rotate at
each recursive level, which is the trickiest part to track correctly.
**Invariant:** every recursive call for `k` disks correctly moves
exactly those `k` disks from its given source peg to its given
destination peg, using its given auxiliary peg, without ever violating
the size-ordering rule, given that the same holds for `k - 1`.

## Dry Run

**Input:** `n = 2`, `source='A'`, `auxiliary='B'`, `destination='C'`

| Step | Call | Action |
|---|---|---|
| 1 | `hanoi(2, A, B, C)` | `n != 1`, recurse: move `n-1=1` disk from A to B (using C as auxiliary) |
| 2 | `hanoi(1, A, C, B)` | base case: move directly `A -> B` |
| 3 | back in `hanoi(2, ...)` | move the largest disk directly `A -> C` |
| 4 | `hanoi(1, B, A, C)` | base case: move directly `B -> C` |

**Result:** `[['A','B'], ['A','C'], ['B','C']]` — matches expected
output.

## JavaScript Solution

```js
function hanoi(n, source, auxiliary, destination, moves = []) {
  if (n === 1) {
    moves.push([source, destination]);
    return moves;
  }

  // Move the top n-1 disks out of the way, using destination as the
  // temporary auxiliary for that sub-problem.
  hanoi(n - 1, source, destination, auxiliary, moves);

  // Move the single largest remaining disk directly.
  moves.push([source, destination]);

  // Move the n-1 disks from auxiliary onto destination, using source
  // as the temporary auxiliary for that sub-problem.
  hanoi(n - 1, auxiliary, source, destination, moves);

  return moves;
}
```

## TypeScript Solution

```ts
type Move = [string, string];

function hanoi(
  n: number,
  source: string,
  auxiliary: string,
  destination: string,
  moves: Move[] = [],
): Move[] {
  if (n === 1) {
    moves.push([source, destination]);
    return moves;
  }

  hanoi(n - 1, source, destination, auxiliary, moves);
  moves.push([source, destination]);
  hanoi(n - 1, auxiliary, source, destination, moves);

  return moves;
}
```

## Time Complexity

O(2^n) — the total number of moves is exactly `2^n - 1`, which is an
inherent lower bound for this problem, not an inefficiency.

## Space Complexity

O(n) recursion call stack depth (plus O(2^n) for the output array of
moves, which is unavoidable since that's the required output size).

## Common Mistakes

- Swapping the auxiliary and destination arguments between the two
  recursive calls — since the peg roles rotate at each level, using the
  wrong peg as "auxiliary" for a sub-call produces an invalid move
  sequence.
- Trying to solve this iteratively without first understanding the
  recursive structure — there is a known iterative pattern, but it's
  derived from (and much harder to discover independently of) the
  recursive decomposition.
- Underestimating that `2^n - 1` moves is optimal, not a sign the
  solution needs further optimization — this exponential growth is a
  proven lower bound for the problem itself.

## Interview Follow-up Questions

1. Can you prove that `2^n - 1` is the minimum number of moves required
   for `n` disks?
2. How would you solve this iteratively, without recursion?
3. How would the problem change with four pegs instead of three (the
   Frame–Stewart algorithm)?

## Similar Questions

- Fibonacci Number (see [fibonacci-number.md](fibonacci-number.md))
- Generate Parentheses (see [../backtracking/generate-parentheses.md](../backtracking/generate-parentheses.md))
- Subsets (Power Set) (see [../backtracking/subsets.md](../backtracking/subsets.md))

---
[← Back to 65-dsa](../README.md)
