# Q702 · Min Stack

**Difficulty:** Medium
**Companies Asked:** Amazon, Google, Meta, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Stack
**Concepts:** auxiliary stack, O(1) amortized minimum tracking

## Problem Statement

Design a stack that supports `push(value)`, `pop()`, `top()` (peek at
the top value), and `getMin()` (return the current minimum value in the
stack) — all in O(1) time.

## Input

A sequence of operations: `push(value)`, `pop()`, `top()`, `getMin()`,
called in any order.

## Output

- `push`: no return value
- `pop`: no return value (removes the top element)
- `top`: the current top value
- `getMin`: the current minimum value across all elements presently in
  the stack

## Constraints

- `-2^31 <= value <= 2^31 - 1`
- `pop`, `top`, and `getMin` are only ever called on a non-empty stack.
- At most `3 * 10^4` total operations.
- Every operation — including `getMin` — must run in O(1).

## Examples

| Operations | Return values | Why |
|---|---|---|
| `push(-2); push(0); push(-3); getMin()` | `-3` | `-3` is the smallest value currently on the stack |
| `...; pop(); top(); getMin()` | `top() = 0`, `getMin() = -2` | Popping `-3` reveals `0` on top and `-2` as the new minimum |

## Edge Cases

- All pushed values are equal → `getMin()` must still return that value
  correctly even after some (but not all) equal copies are popped
- The current minimum is popped → `getMin()` must correctly reveal the
  *next* smallest remaining value, not just the value that was pushed
  most recently
- A single element on the stack → it is simultaneously the top and the
  minimum

## Hints

1. Calling `Math.min(...stack)` on every `getMin()` call works but is
   O(n) per call, not O(1) — what if the minimum were tracked
   incrementally as values are pushed and popped, instead of recomputed
   from scratch each time?
2. A single "current minimum" variable breaks the moment that minimum
   value gets popped — you'd have no way to know what the *next*
   smallest value was without rescanning. What if you kept a full
   *history* of what the minimum was at every point in the stack's
   life?
3. A second, auxiliary stack that pushes the minimum-so-far alongside
   every push to the main stack (and pops in lockstep with it) gives you
   O(1) access to "the minimum at this exact stack depth," restored
   automatically as you pop back through history.

## Algorithm

**Pattern:** auxiliary stack tracking running minimum, pushed/popped in
lockstep with the main stack.
**Core insight:** maintaining a single "current minimum" variable fails
because popping the minimum value leaves no record of what the minimum
was *before* that value was pushed. Instead, a second stack records,
alongside every push, what the minimum was across the *entire* stack at
that exact moment (including the just-pushed value). Because both
stacks grow and shrink together, popping from the main stack and popping
from the minimum stack in lockstep always leaves the minimum stack's new
top equal to the correct minimum for the main stack's new state — no
rescanning required.
**Invariant:** at any point, `minStack`'s top equals
`Math.min(...mainStack)` for the mainStack's current contents — this
holds immediately after every push and every pop, by construction.

## Dry Run

**Operations:** `push(-2)`, `push(0)`, `push(-3)`, `getMin()`, `pop()`,
`top()`, `getMin()`

| Operation | mainStack | minStack | Return value |
|---|---|---|---|
| `push(-2)` | `[-2]` | `[-2]` | — |
| `push(0)` | `[-2, 0]` | `[-2, -2]` (min of `-2,0` is still `-2`) | — |
| `push(-3)` | `[-2, 0, -3]` | `[-2, -2, -3]` | — |
| `getMin()` | — | — | `-3` (minStack top) |
| `pop()` | `[-2, 0]` | `[-2, -2]` | — |
| `top()` | — | — | `0` (mainStack top) |
| `getMin()` | — | — | `-2` (minStack top, correctly restored) |

**Result:** matches the expected sequence of return values.

## JavaScript Solution

```js
class MinStack {
  constructor() {
    this.mainStack = [];
    this.minStack = [];
  }

  push(value) {
    this.mainStack.push(value);

    // Record the minimum across the WHOLE stack at this depth, not just
    // this one value — so popping later restores the correct minimum.
    const currentMin = this.minStack.length === 0
      ? value
      : Math.min(this.minStack[this.minStack.length - 1], value);
    this.minStack.push(currentMin);
  }

  pop() {
    this.mainStack.pop();
    this.minStack.pop();
  }

  top() {
    return this.mainStack[this.mainStack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

## TypeScript Solution

```ts
class MinStack {
  private mainStack: number[] = [];
  private minStack: number[] = [];

  push(value: number): void {
    this.mainStack.push(value);

    const previousMin = this.minStack[this.minStack.length - 1];
    const currentMin = previousMin === undefined ? value : Math.min(previousMin, value);
    this.minStack.push(currentMin);
  }

  pop(): void {
    this.mainStack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.mainStack[this.mainStack.length - 1]!;
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1]!;
  }
}
```

## Time Complexity

O(1) for every operation (`push`, `pop`, `top`, `getMin`) — each touches
only the top of one or both stacks.

## Space Complexity

O(n) — the auxiliary `minStack` stores one value per element in
`mainStack`, doubling the space used by a plain stack but staying
linear in the number of elements.

## Common Mistakes

- Recomputing the minimum from scratch (`Math.min(...mainStack)`) inside
  `getMin()` — correct but O(n) per call, violating the O(1) requirement.
- Storing only a single running-minimum variable instead of a full
  auxiliary stack — breaks the moment the current minimum is popped,
  since there's no record of the previous minimum to fall back to.
- Pushing to `minStack` only when a new value is smaller than the
  current minimum (instead of on every push) — desynchronizes the two
  stacks' lengths, breaking the lockstep pop behavior.

## Interview Follow-up Questions

1. How would you also support `getMax()` in O(1), alongside `getMin()`?
2. How would you reduce the auxiliary space, e.g. only recording a new
   minStack entry when the minimum actually changes (with a count of how
   many pushes shared that minimum)?
3. How would this design change for a `MinQueue` (minimum tracking over
   a FIFO structure instead of LIFO)?

## Similar Questions

- Implement Queue Using Two Stacks (see [queue/implement-queue-using-two-stacks.md](../queue/implement-queue-using-two-stacks.md))
- Max Stack
- Sliding Window Maximum

---
[← Back to Stack](README.md) · [← Back to 65-dsa](../README.md)
