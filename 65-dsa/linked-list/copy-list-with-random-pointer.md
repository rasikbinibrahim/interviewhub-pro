# Q6633 · Copy List with Random Pointer (Interleaved Node Weaving)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Linked List
**Concepts:** linked-list, pointers, hash-map

## Problem Statement

Write a function `copyRandomList(head)` that returns a deep copy of a
linked list where each node has both a `next` pointer and a `random`
pointer (which may point to any node in the list, or be `null`), using
O(1) extra space (excluding the output list itself).

## Input

`head`: the head of a linked list where each node is shaped
`{ val: number, next: Node | null, random: Node | null }`.

## Output

The head of a fully independent deep copy — same `val`/`next`/`random`
structure, but sharing no node references with the original list.

## Constraints

`0 <= number of nodes <= 1000`, each `random` pointer targets some node
in the list or is `null`

## Examples

```javascript
// Original: A -> B -> C, where A.random = C, B.random = null, C.random = A
const original = buildRandomList([
  { val: 'A', random: 2 }, // random points to index 2 (C)
  { val: 'B', random: null },
  { val: 'C', random: 0 }, // random points to index 0 (A)
]);
const cloned = copyRandomList(original);
// cloned has identical val/next/random structure to `original`,
// but every node (including random targets) is a distinct object.
```

## Edge Cases

- `head === null` (empty list) → `null`
- Every `random` pointer is `null` → behaves like an ordinary list
  clone
- A node's `random` pointer points to *itself* → correctly preserved in
  the clone (the clone's `random` also points to itself)
- Multiple nodes' `random` pointers point to the *same* target node →
  the clone must have both cloned `random` pointers point to that
  *same* cloned target, not two separate clones of it

## Hints

1. Cloning `val` and `next` alone is easy, but `random` pointers can
   point *forward* to nodes not yet cloned — how do you look up "the
   clone of some arbitrary original node" without an O(n) search every
   time?
2. A hash map from original node → clone node would solve that lookup
   in O(1), but that costs O(n) extra space. Since O(1) space is
   required here, is there a way to store that same mapping *without* a
   separate map?
3. Interleave each clone directly into the original list, right after
   the node it was cloned from (`A -> A' -> B -> B' -> ...`). Now "the
   clone of node X" is always just `X.next` — no map needed — and once
   the random pointers are wired up using that trick, the interleaved
   list can be split back into the two separate original and cloned
   lists.

## Algorithm

**Pattern:** three-pass interleaved node weaving.
**Core insight:** the classic O(n) extra-space solution uses a hash map
from original nodes to their clones, so a `random` pointer to any
already-or-not-yet-cloned node can be looked up in O(1). To achieve O(1)
extra space instead, the same lookup is achieved structurally: by
splicing every clone directly after its original node, "the clone of
node X" becomes simply `X.next` — no map needed. This takes three
passes: first interleave every clone into the list; second, use the
interleaving itself to correctly wire up every clone's `random` pointer
(`curr.next.random = curr.random.next`, since `curr.random.next` is
exactly the clone of `curr.random`); third, unweave the two lists back
apart, restoring the original list's `next` pointers and extracting the
fully independent cloned list.
**Invariant:** after the interleaving pass, for every original node `X`,
`X.next` is always `X`'s clone — this single structural fact is what
makes both the random-pointer wiring pass and the final separation pass
correct without ever needing an explicit lookup table.

## Dry Run

**Input:** `A -> B -> C`, where `A.random = C`, `B.random = null`,
`C.random = A`

**Step 1 — Interleave:** `A -> A' -> B -> B' -> C -> C'`

**Step 2 — Wire random pointers** (`curr.next.random = curr.random.next`
when `curr.random` exists):

| curr | curr.random | curr.next.random = curr.random.next |
|---|---|---|
| A | C | `A'.random = C.next = C'` |
| B | null | (skipped) |
| C | A | `C'.random = A.next = A'` |

**Step 3 — Separate:** walk the interleaved list, splicing every other
node into a new list (`A' -> B' -> C'`) while restoring the original
list's `next` pointers (`A -> B -> C`).

**Result:** `A' -> B' -> C'`, with `A'.random = C'` and
`C'.random = A'` — a fully independent, structurally identical copy.

## JavaScript Solution

```js
class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

function copyRandomList(head) {
  if (!head) return null;

  // Step 1: Interleave cloned nodes
  let curr = head;
  while (curr) {
    const clone = new Node(curr.val, curr.next, null);
    curr.next = clone;
    curr = clone.next;
  }

  // Step 2: Assign random pointers
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }

  // Step 3: Separate lists
  curr = head;
  const dummy = new Node(0);
  let copyCurr = dummy;
  while (curr) {
    const nextOriginal = curr.next.next;
    copyCurr.next = curr.next;
    copyCurr = copyCurr.next;
    curr.next = nextOriginal;
    curr = nextOriginal;
  }

  return dummy.next;
}
```

## TypeScript Solution

```ts
class RandomListNode {
  val: number;
  next: RandomListNode | null;
  random: RandomListNode | null;
  constructor(val: number, next: RandomListNode | null = null, random: RandomListNode | null = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

function copyRandomList(head: RandomListNode | null): RandomListNode | null {
  if (!head) return null;

  let curr: RandomListNode | null = head;
  while (curr) {
    const clone = new RandomListNode(curr.val, curr.next, null);
    curr.next = clone;
    curr = clone.next;
  }

  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next!.random = curr.random.next;
    }
    curr = curr.next!.next;
  }

  curr = head;
  const dummy = new RandomListNode(0);
  let copyCurr = dummy;
  while (curr) {
    const nextOriginal: RandomListNode | null = curr.next!.next;
    copyCurr.next = curr.next;
    copyCurr = copyCurr.next;
    curr.next = nextOriginal;
    curr = nextOriginal;
  }

  return dummy.next;
}
```

## Time Complexity

O(n) — three linear passes over the list.

## Space Complexity

O(1) extra space (excluding the required output list) — the
interleaving trick avoids the O(n) hash map a more straightforward
solution would need.

## Common Mistakes

- Cloning nodes and wiring `random` pointers in a single pass — a
  forward-pointing `random` reference may target a node that hasn't been
  cloned yet, producing an incomplete or incorrect clone unless a
  separate pass (or a map) resolves it after every node exists.
- Forgetting Step 3 (separating the interleaved list back apart) —
  leaves the *original* list corrupted, with clone nodes still spliced
  into its `next` chain.
- Using a hash map from original node to clone (the simpler, very
  common correct solution) when the O(1) space constraint is explicitly
  required — a fine and correct approach in general, but doesn't satisfy
  this specific constraint.

## Interview Follow-up Questions

1. How would you solve this with a hash map instead, and what's the
   space trade-off versus the interleaving technique?
2. How would you verify, given the original and cloned lists, that the
   `random` pointers were copied correctly and not merely re-pointed at
   the originals?
3. How would this problem extend to a more general graph structure
   instead of a linked list (see Clone Graph)?

## Similar Questions

- Clone Graph (see [../graph/clone-graph-dfs-bfs.md](../graph/clone-graph-dfs-bfs.md))
- Reverse a Linked List (see [reverse-a-linked-list.md](reverse-a-linked-list.md))
