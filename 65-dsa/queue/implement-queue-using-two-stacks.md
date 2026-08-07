# Q801 · Implement Queue Using Two Stacks

**Difficulty:** Medium
**Companies Asked:** Google, Amazon, Microsoft, Meta, Adobe
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Queue
**Concepts:** stack, amortized analysis, FIFO simulated from LIFO

## Problem Statement

Implement a FIFO (first-in, first-out) queue using only two stacks as
the underlying storage — no arrays, linked lists, or other queue-like
structures. Support `enqueue(value)` (add to the back), `dequeue()`
(remove and return the front), `peek()` (return the front without
removing it), and `isEmpty()`.

## Input

A sequence of operations: `enqueue(value)`, `dequeue()`, `peek()`,
`isEmpty()`, called in any order.

## Output

`dequeue()` and `peek()` return the current front value of the queue;
`isEmpty()` returns a boolean.

## Constraints

- Only two stacks (each supporting `push`, `pop`, `peek`, `isEmpty` in
  O(1)) may be used as underlying storage.
- `dequeue()`/`peek()` on an empty queue should throw or return a clear
  "empty" signal, not silently return `undefined` as if it were a valid
  value.
- Up to `10^4` total operations.

## Examples

| Operations | Returns | Why |
|---|---|---|
| `enqueue(1)`, `enqueue(2)`, `dequeue()` | `1` | First one in, first one out |
| `enqueue(1)`, `dequeue()`, `enqueue(2)`, `dequeue()` | `1`, then `2` | Order preserved across interleaved calls |
| `enqueue(1)`, `enqueue(2)`, `enqueue(3)`, `dequeue()`, `dequeue()`, `dequeue()` | `1`, `2`, `3` | FIFO order over three items |

## Edge Cases

- `dequeue()`/`peek()` called on an empty queue → must signal "empty"
  clearly (throwing is used here), not return `undefined` indistinguishably
  from a legitimately enqueued `undefined` value.
- Alternating `enqueue`/`dequeue` calls (never batching several of one
  before the other) → must not degrade to O(n) *per call* in this
  pattern; see the follow-up question on amortized cost.
- `enqueue` after the queue has been fully drained back to empty → must
  behave exactly like a fresh queue, not retain stale internal state.

## Hints

1. A single stack reverses order (LIFO); reversing a reversed order
   gives you the original order back — how could two stacks, used for
   opposite purposes, recreate FIFO behavior?
2. Use one stack (`inStack`) purely for incoming `enqueue` calls, and a
   second stack (`outStack`) purely for `dequeue`/`peek` calls.
3. When `outStack` is empty and a `dequeue`/`peek` is requested, pour
   the *entire* contents of `inStack` into `outStack` (popping each and
   pushing it onto the other) — this single reversal is what turns
   insertion order back into removal order, and only needs to happen
   when `outStack` has run dry, not on every call.

## Algorithm

**Pattern:** two stacks, one for input, one for output, transferred
lazily.
**Core insight:** pushing every element of `inStack` onto `outStack`
reverses their order once. Since `inStack` holds elements in the order
they were enqueued (oldest at the bottom), reversing them onto
`outStack` puts the oldest element on *top* of `outStack` — exactly
where `dequeue`/`peek` need it. The key optimization is doing this
transfer *lazily*: only when `outStack` is empty and something is
requested from the front, not on every single operation.
**Invariant:** `outStack`'s top is always the current front of the
queue whenever `outStack` is non-empty; when `outStack` is empty, the
true front is at the *bottom* of `inStack`, which is why a transfer is
needed before it can be accessed.

## Dry Run

**Input:** `enqueue(1)`, `enqueue(2)`, `enqueue(3)`, `dequeue()`,
`enqueue(4)`, `dequeue()`

| Step | Operation | inStack (top → right) | outStack (top → right) | Returned |
|---|---|---|---|---|
| 1 | `enqueue(1)` | `[1]` | `[]` | — |
| 2 | `enqueue(2)` | `[1, 2]` | `[]` | — |
| 3 | `enqueue(3)` | `[1, 2, 3]` | `[]` | — |
| 4 | `dequeue()` | `outStack` empty → transfer all of `inStack` → `[]`, `[3, 2, 1]`; then pop top | `[]` | `[2, 1]` | `1` |
| 5 | `enqueue(4)` | `[4]` | `[2, 1]` | — |
| 6 | `dequeue()` | `outStack` non-empty → pop directly, no transfer | `[4]` | `[1]` | `2` |

**Result:** dequeues return `1`, then `2` — correct FIFO order, and step
6 shows the lazy transfer correctly skipped when `outStack` already has
elements.

## JavaScript Solution

```js
class QueueFromStacks {
  #inStack = [];
  #outStack = [];

  enqueue(value) {
    this.#inStack.push(value);
  }

  dequeue() {
    this.#shiftIfNeeded();
    if (this.#outStack.length === 0) {
      throw new Error('dequeue() called on an empty queue');
    }
    return this.#outStack.pop();
  }

  peek() {
    this.#shiftIfNeeded();
    if (this.#outStack.length === 0) {
      throw new Error('peek() called on an empty queue');
    }
    return this.#outStack.at(-1);
  }

  isEmpty() {
    return this.#inStack.length === 0 && this.#outStack.length === 0;
  }

  // Only reverses inStack into outStack when outStack has run dry —
  // this is what keeps the amortized cost per operation at O(1).
  #shiftIfNeeded() {
    if (this.#outStack.length === 0) {
      while (this.#inStack.length > 0) {
        this.#outStack.push(this.#inStack.pop());
      }
    }
  }
}
```

## TypeScript Solution

```ts
class QueueFromStacks<T> {
  #inStack: T[] = [];
  #outStack: T[] = [];

  enqueue(value: T): void {
    this.#inStack.push(value);
  }

  dequeue(): T {
    this.#shiftIfNeeded();
    const value = this.#outStack.pop();
    if (value === undefined && this.#outStack.length === 0) {
      throw new Error('dequeue() called on an empty queue');
    }
    return value as T;
  }

  peek(): T {
    this.#shiftIfNeeded();
    const value = this.#outStack.at(-1);
    if (value === undefined) {
      throw new Error('peek() called on an empty queue');
    }
    return value;
  }

  isEmpty(): boolean {
    return this.#inStack.length === 0 && this.#outStack.length === 0;
  }

  #shiftIfNeeded(): void {
    if (this.#outStack.length === 0) {
      while (this.#inStack.length > 0) {
        const value = this.#inStack.pop();
        if (value !== undefined) this.#outStack.push(value);
      }
    }
  }
}
```

## Time Complexity

O(1) amortized per operation. A single `dequeue` can trigger an O(k)
transfer (where k is `inStack`'s current size), but each element is
moved from `inStack` to `outStack` at most once ever — across any
sequence of n operations, the total work spent transferring is O(n), so
the *average* cost per operation is O(1), even though any individual
call can occasionally be O(n).

## Space Complexity

O(n) — every currently-enqueued element is stored in exactly one of the
two stacks at any time.

## Common Mistakes

- Transferring elements from `inStack` to `outStack` on *every*
  `dequeue`/`peek` call instead of only when `outStack` is empty — this
  degrades every operation to O(n), losing the amortized O(1) guarantee
  entirely.
- Checking `inStack.length === 0` to decide emptiness instead of
  checking *both* stacks — the queue can have elements sitting in
  `outStack` with an empty `inStack`.
- Returning `undefined` from `dequeue()`/`peek()` on empty instead of a
  clear error — indistinguishable from a legitimately enqueued
  `undefined` value.

## Interview Follow-up Questions

1. Why is the amortized cost O(1) even though a single `dequeue` call
   can take O(n) time in the worst case? Walk through the accounting
   argument.
2. How would you implement a stack using two queues instead — is the
   same lazy-transfer trick available, or does it require eager work on
   every push?
3. How would you make this queue implementation generic/reusable in a
   way that doesn't leak the two-stack detail to callers?

## Similar Questions

- Implement a Stack Using Queues
- Design a Circular Queue
- Min Stack (O(1) minimum retrieval alongside standard stack operations)

---
[← Back to Queue](README.md) · [← Back to 65-dsa](../README.md)
