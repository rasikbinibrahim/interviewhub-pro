# Q603 · Linked List Cycle

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, Google, Bloomberg
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Linked List
**Concepts:** Floyd's cycle detection (tortoise and hare), O(1)-space traversal

## Problem Statement

Given the head of a singly linked list, determine whether the list
contains a cycle — that is, whether following `next` pointers from some
node eventually loops back to a node visited earlier, rather than
terminating at `null`.

## Input

`head`: the head node of a singly linked list (`{ value, next }`
nodes), or `null`.

## Output

Boolean — `true` if the list contains a cycle, `false` otherwise.

## Constraints

- `0 <= number of nodes <= 10^4`
- Must use O(1) extra space — no set/map of visited nodes.

## Examples

| Input | Output | Why |
|---|---|---|
| `1 -> 2 -> 3 -> 2` (node `3`'s next points back to node `2`) | `true` | Following `next` from `3` returns to a previously visited node instead of `null` |
| `1 -> 2 -> 3 -> null` | `false` | The list terminates normally |
| `null` (empty list) | `false` | No nodes, so no cycle is possible |

## Edge Cases

- Empty list (`head = null`) → `false`
- Single node with no cycle (`next = null`) → `false`
- Single node whose `next` points to itself → `true` (a cycle of length 1)
- Cycle begins partway through the list (not at the head) → must still
  be detected, not just a cycle that includes the head node

## Hints

1. A hash set of every visited node detects a cycle easily (return
   `true` the moment you see a node you've already recorded), but that's
   O(n) space — the constraint here is O(1).
2. Imagine two runners starting at the head, one moving one node at a
   time and the other moving two nodes at a time. If there's no cycle,
   the faster runner reaches `null` first. What happens instead if there
   *is* a cycle?
3. If a cycle exists, the faster pointer will eventually lap the slower
   one from behind, inside the cycle — the two pointers become equal at
   some point. If no cycle exists, the faster pointer (or its `next`)
   hits `null` before that can happen.

## Algorithm

**Pattern:** Floyd's Tortoise and Hare cycle detection.
**Core insight:** advance a slow pointer one node at a time and a fast
pointer two nodes at a time. If the list has no cycle, the fast pointer
(moving twice as fast) reaches the end (`null`) first, and the loop
terminates without the two pointers ever coinciding. If the list does
have a cycle, both pointers are eventually trapped inside it — and
because the fast pointer gains exactly one extra step on the slow
pointer's position every iteration, the gap between them (measured
around the cycle) shrinks by one each time, guaranteeing they land on
the exact same node within at most one full lap of the cycle.
**Invariant:** as long as no cycle exists, `fast` is always at least as
far along the list as `slow`, and strictly farther in node-visits,
meaning it reaches `null` no later than `slow` would.

## Dry Run

**Input:** `1 -> 2 -> 3 -> 2` (a cycle: node `3`'s `next` points back to
node `2`, not to `null`)

| Iteration | slow (1 step) | fast (2 steps) | slow === fast? |
|---|---|---|---|
| start | node `1` | node `1` | — |
| 1 | node `2` | node `3` | no |
| 2 | node `3` | node `3` (via `2 -> 3`, wrapping once) | yes — cycle detected |

**Result:** `true` — matches expected output.

**Contrast — no cycle**, `1 -> 2 -> 3 -> null`:

| Iteration | slow | fast | slow === fast? |
|---|---|---|---|
| start | `1` | `1` | — |
| 1 | `2` | `3` | no |
| 2 | `3` | `null` (fast.next was `null`, loop exits) | loop exits — no cycle |

**Result:** `false`.

## JavaScript Solution

```js
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}
```

## TypeScript Solution

```ts
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}
```

## Time Complexity

O(n) — in the worst case, the slow pointer traverses the whole list (and
part of the cycle again) before the two pointers meet or the fast
pointer reaches the end.

## Space Complexity

O(1) — only two pointer variables, regardless of list length.

## Common Mistakes

- Using a `Set` of visited nodes — correct and simpler to reason about,
  but O(n) space, violating the stated constraint.
- Comparing node *values* instead of node *references/identity* — two
  different nodes can legitimately share the same value without forming
  a cycle; only comparing the actual node objects is correct.
- Forgetting to check `fast.next !== null` in addition to `fast !==
  null` before advancing `fast` by two — accessing `.next` on a `null`
  fast pointer throws.
- Advancing `slow` and `fast` before checking equality on the very first
  iteration and never re-checking afterward — the check needs to happen
  every iteration, since the meeting point isn't known in advance.

## Interview Follow-up Questions

1. How would you find the *node where the cycle begins*, not just
   whether one exists? (See [Find the Duplicate Number](../arrays/find-the-duplicate-number.md), which uses the same
   two-phase technique on an array treated as an implicit list.)
2. How would you find the length of the cycle once detected?
3. Why does the fast pointer moving at exactly 2x speed (not 3x or some
   other multiple) matter for the correctness/efficiency of this
   approach?

## Similar Questions

- Find the Duplicate Number (see [arrays/find-the-duplicate-number.md](../arrays/find-the-duplicate-number.md) — identical cycle-detection technique)
- Linked List Cycle II (find the cycle's starting node)
- Happy Number (the same tortoise-and-hare idea applied to a numeric sequence)

---
[← Back to Linked List](README.md) · [← Back to 65-dsa](../README.md)
