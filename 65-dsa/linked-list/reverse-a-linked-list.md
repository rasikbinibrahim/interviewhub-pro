# Q601 · Reverse a Linked List

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Adobe, Bloomberg, Flipkart
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Linked List
**Concepts:** pointer manipulation, iterative in-place reversal, three-pointer technique

## Problem Statement

Given the head of a singly linked list, reverse the list in place and
return the new head — so that every node's `next` pointer ends up
pointing at what used to be its predecessor, and the original head
becomes the new tail.

## Input

`head`: the head node of a singly linked list (`{ value, next }` nodes),
or `null` for an empty list.

## Output

The head node of the reversed list (or `null` if the input was empty).

## Constraints

- `0 <= number of nodes <= 5 * 10^4`
- Must reverse in place — O(1) extra space, no new nodes allocated and
  no array/stack used to hold all values.
- Node values may repeat; nodes are only ever compared/moved by
  reference, never by value.

## Examples

| Input | Output | Why |
|---|---|---|
| `1 -> 2 -> 3 -> 4 -> 5` | `5 -> 4 -> 3 -> 2 -> 1` | Every link is flipped |
| `1 -> 2` | `2 -> 1` | Minimal non-trivial case |
| `[]` (empty list, `head = null`) | `null` | Nothing to reverse |

## Edge Cases

- Empty list (`head = null`) → return `null` immediately, no traversal.
- Single-node list → the list is already "reversed" (a one-node list
  equals its own reverse); must return that same node with `next = null`.
- Already-linked cycle accidentally introduced by a buggy in-place
  reversal → a correct solution must never leave two nodes pointing at
  each other in a way that forms a cycle; this is the most common
  self-inflicted bug in this exact problem.

## Hints

1. You can't reverse a link in place without first saving where it used
   to point — what do you need to remember *before* you overwrite
   `current.next`?
2. Track three pointers as you walk the list: the node you're currently
   processing, the node that comes before it (which becomes its new
   `next`), and the node that comes after it (which you'd otherwise lose
   the moment you rewrite `current.next`).
3. At the end of each step, all three pointers shift forward by one
   node — the node you just reversed becomes the new "previous" for the
   next iteration.

## Algorithm

**Pattern:** iterative three-pointer in-place reversal.
**Core insight:** reversing a linked list means flipping every node's
`next` pointer to point backward instead of forward. Doing this in place
requires holding onto the *next* node before overwriting the current
node's pointer — otherwise that part of the list becomes unreachable the
instant `current.next` is reassigned.
**Invariant:** at the start of each iteration, everything from the
original head up to (and not including) `current` has already been
correctly reversed and is reachable from `previous`; everything from
`current` onward is still in its original, unreversed order.

## Dry Run

**Input:** `1 -> 2 -> 3 -> null`

| Step | previous | current | next (saved before rewiring) | current.next set to | State after step |
|---|---|---|---|---|---|
| 1 | `null` | `1` | `2` | `previous` (`null`) | `1 -> null`, `2 -> 3 -> null` still separate |
| 2 | `1` | `2` | `3` | `previous` (`1`) | `2 -> 1 -> null` |
| 3 | `2` | `3` | `null` | `previous` (`2`) | `3 -> 2 -> 1 -> null` |
| 4 | `3` | `null` | — | loop ends (`current` is `null`) | — |

**Result:** `previous` now points at `3`, the new head — `3 -> 2 -> 1 ->
null`, matching the expected reversal of `1 -> 2 -> 3`.

## JavaScript Solution

```js
function reverseLinkedList(head) {
  let previous = null; // will become the new head once the loop ends
  let current = head;

  while (current !== null) {
    const next = current.next; // save BEFORE overwriting current.next
    current.next = previous;   // flip the pointer to point backward
    previous = current;        // advance previous to where current is now
    current = next;            // advance current to the node saved earlier
  }

  return previous; // when current becomes null, previous is the new head
}
```

## TypeScript Solution

```ts
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let previous: ListNode<T> | null = null;
  let current: ListNode<T> | null = head;

  while (current !== null) {
    const next: ListNode<T> | null = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }

  return previous;
}
```

## Time Complexity

O(n) — each node is visited and rewired exactly once.

## Space Complexity

O(1) — three pointer variables, regardless of list length; no new nodes
or auxiliary data structures.

## Common Mistakes

- Overwriting `current.next` before saving it — this permanently
  disconnects the rest of the list, since nothing else still references
  those later nodes.
- Returning `head` instead of `previous` at the end — `head` still
  refers to the *original* first node, which is now the new *tail*, not
  the new head.
- Forgetting to set the final node's `next` to `null` — since `previous`
  starts at `null` and becomes the first node's new `next` on the first
  iteration, this happens automatically in the iterative solution, but
  is a common bug in hand-rolled recursive versions that forget this
  base case.

## Interview Follow-up Questions

1. How would you write this recursively instead — what's the base case,
   and what happens on the way back up the call stack?
2. How would you reverse only a sublist between positions `left` and
   `right` (Reverse Linked List II), leaving the rest of the list
   untouched?
3. How would you detect whether the input list already contains a cycle
   before attempting to reverse it (so you don't loop forever)?
4. What changes for a doubly linked list — is there even a `next`/`prev`
   distinction left after reversing?

## Similar Questions

- Reverse Linked List II (reverse a sub-range)
- Palindrome Linked List (uses reversal to compare halves)
- Swap Nodes in Pairs

---
[← Back to Linked List](README.md) · [← Back to 65-dsa](../README.md)
