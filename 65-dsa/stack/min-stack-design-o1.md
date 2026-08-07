# Q6656 · Min Stack Design (O(1) Auxiliary Min Stack)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Stack
**Concepts:** stack, class-design, min-stack

## Problem Statement

Implement a `MinStack` class that supports standard stack operations —
`push(val)`, `pop()`, `top()` — plus `getMin()`, which returns the
minimum element currently in the stack, all in O(1) time.

## Input

A sequence of `push`, `pop`, `top`, and `getMin` calls.

## Output

`top()` returns the most recently pushed (not yet popped) value.
`getMin()` returns the smallest value currently in the stack.

## Constraints

Up to `3*10^4` calls total; `pop`, `top`, and `getMin` are only called on
a non-empty stack

## Examples

```javascript
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // -3   (smallest of -2, 0, -3)
minStack.pop();     // removes -3
minStack.top();     // 0    (now the most recent remaining value)
minStack.getMin();  // -2   (smallest of -2, 0)
```

## Edge Cases

- Only one element ever pushed → `getMin()` and `top()` both return that
  single value
- Repeated equal minimum values pushed (e.g. `push(1)`, `push(1)`) →
  `getMin()` still correctly returns `1` even after one `pop()` removes
  one of the two
- Values pushed in already-increasing order → the minimum never changes
  after the first push
- Values pushed in already-decreasing order → the minimum updates on
  every single push

## Hints

1. Recomputing the minimum by scanning the whole stack on every
   `getMin()` call works but is O(n), not O(1) — what if you tracked the
   minimum incrementally, alongside every push?
2. Maintain a *second* stack, `minStack`, in lockstep with the main
   stack: every time you push a value, also push "the minimum so far,
   including this new value" onto `minStack`.
3. Because `minStack`'s top always reflects the correct minimum *for the
   current state of the main stack*, popping from both stacks together
   automatically keeps `minStack`'s top correct after removals too — no
   need to recompute anything on `pop()`.

## Algorithm

**Pattern:** auxiliary "running minimum" stack, maintained in lockstep.
**Core insight:** rather than searching for the minimum on demand, the
minimum *at the time of each push* can be precomputed and stored
alongside it — since a stack only ever grows or shrinks from one end,
the minimum "as of" any point in the stack's history is exactly what
`minStack`'s corresponding entry holds. Pushing onto `minStack` a value
that's the smaller of "the new value" and "the previous minimum" keeps
this correct on every push; popping from both stacks together
automatically restores `minStack`'s top to the correct minimum for
whatever remains, since that historical minimum was already computed and
stored when it was originally pushed.
**Invariant:** at any point, `minStack`'s top element equals the minimum
of every value currently present in `stack`.

## Dry Run

**Input:** `push(-2)`, `push(0)`, `push(-3)`, `getMin()`, `pop()`, `top()`, `getMin()`

| Call | stack after | minStack after | return value |
|---|---|---|---|
| `push(-2)` | `[-2]` | `[-2]` | – |
| `push(0)` | `[-2, 0]` | `[-2, -2]` (min(0, -2) = -2) | – |
| `push(-3)` | `[-2, 0, -3]` | `[-2, -2, -3]` (min(-3, -2) = -3) | – |
| `getMin()` | (unchanged) | (unchanged) | `-3` |
| `pop()` | `[-2, 0]` | `[-2, -2]` | – |
| `top()` | (unchanged) | (unchanged) | `0` |
| `getMin()` | (unchanged) | (unchanged) | `-2` |

**Result:** matches the expected sequence of return values.

## JavaScript Solution

```js
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

## TypeScript Solution

```ts
class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
```

## Time Complexity

O(1) for every operation (`push`, `pop`, `top`, `getMin`) — no scanning
or recomputation is ever needed.

## Space Complexity

O(n) — the auxiliary `minStack` grows in lockstep with the main stack,
doubling the space used compared to a plain stack.

## Common Mistakes

- Tracking only a single running minimum variable instead of a full
  auxiliary stack — breaks on `pop()`, since there's no way to recover
  what the minimum *was* before the popped value was pushed, without
  rescanning the remaining stack.
- Recomputing the minimum with `Math.min(...this.stack)` inside
  `getMin()` — correct, but O(n) instead of the required O(1).
- Forgetting to pop from `minStack` in lockstep with `stack` inside
  `pop()` — leaves the two stacks out of sync, so `minStack`'s top no
  longer corresponds to the current `stack`'s actual minimum.

## Interview Follow-up Questions

1. How would you reduce the auxiliary space, so `minStack` doesn't need
   an entry for every single push (only pushing when the minimum
   actually changes)?
2. How would you extend this design to also support `getMax()`
   efficiently?
3. How would you implement a `MinStack` where `pop()` could remove an
   arbitrary previously-pushed value, not just the most recent one?

## Similar Questions

- Online Stock Span (Monotonic Stack Class Design) (see [../stack/online-stock-span-monotonic-stack.md](../stack/online-stock-span-monotonic-stack.md))
- Evaluate Reverse Polish Notation (see [evaluate-reverse-polish-notation.md](evaluate-reverse-polish-notation.md))
