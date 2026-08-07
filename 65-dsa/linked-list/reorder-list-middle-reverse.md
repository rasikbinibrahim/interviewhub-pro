# Q6634 · Reorder List (Find Middle, Reverse & Interleave)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Linked List
**Concepts:** linked-list, fast-slow-pointers, reversal

## Problem Statement

Write a function `reorderList(head)` that reorders a linked list
`L0 → L1 → ... → Ln-1 → Ln` in place into
`L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...`, without allocating new nodes
and without simply reordering the node *values* — only the pointers may
change. The function returns nothing; `head`'s list is mutated directly.

## Input

`head`: the head of a singly linked list.

## Output

None (`undefined`) — the list starting at `head` is reordered in place.

## Constraints

`1 <= number of nodes <= 5*10^4`

## Examples

```javascript
const list = buildList([1, 2, 3, 4]);
reorderList(list);
// list, walked node by node, now holds: [1, 4, 2, 3]

const list2 = buildList([1, 2, 3, 4, 5]);
reorderList(list2);
// list2, walked node by node, now holds: [1, 5, 2, 4, 3]
```

## Edge Cases

- Single node → unchanged (nothing to interleave)
- Two nodes → swapped order (`L0 → L1` becomes `L0 → L1`, which is
  already the correct reordering for `n = 2`)
- Odd number of nodes → the middle node ends up as the final node in the
  reordered list, with no partner to interleave against
- Already in the target reordered pattern → the algorithm still runs
  the same three steps and produces the same (already correct) result

## Hints

1. The target order interleaves the first half of the list with the
   *reversed* second half — what two classic techniques would let you
   find the middle of a list and then reverse a portion of it, both in
   O(1) extra space?
2. Use the fast/slow pointer technique to find the middle node in one
   pass, then reverse everything from the middle onward, then splice the
   list in half at that point.
3. With the first half in its original order and the second half
   reversed, weave them together one node at a time: take a node from
   the front, then a node from the (reversed) back, alternating until
   one side runs out.

## Algorithm

**Pattern:** find the middle (fast/slow pointers), reverse the second
half, then interleave.
**Core insight:** the target reordering is exactly "first half, followed
by the second half reversed, interleaved node by node" — so the problem
decomposes cleanly into three independently well-understood
subproblems: find the middle of a list (fast/slow pointers, one node
moving twice as fast as the other naturally lands the slow pointer at
the midpoint when the fast pointer reaches the end), reverse a linked
list (the standard iterative pointer-reversal pattern), and merge two
lists by alternating nodes from each. Solving each piece with its own
well-known O(n) technique and composing them keeps the whole algorithm
O(n) time and O(1) extra space.
**Invariant:** after the middle-finding step, `slow` points to the last
node of the first half; after reversal, `prev` points to the head of the
now-reversed second half; during interleaving, every node already
processed is correctly spliced into the final alternating order.

## Dry Run

**Input:** `head = [1,2,3,4]`

**Step 1 — Find middle:**

| Step | slow | fast | fast/fast.next exist? |
|---|---|---|---|
| start | 1 | 1 | yes |
| iter 1 | 2 | 3 | fast=3, fast.next=4 exists → continue |
| iter 2 | 3 | null (3.next.next = 4.next = null) | fast is null → stop |

`slow = 3`. First half: `1 → 2 → 3`. Second half starts at `slow.next = 4`.

**Step 2 — Reverse second half** (`[4]`, a single node): reversed is
still just `[4]`; `prev = 4`.

**Step 3 — Interleave** `first = 1`, `second = 4`:

| first | second | first.next = second | second.next = old first.next | new first | new second |
|---|---|---|---|---|---|
| 1 | 4 | `1.next = 4` | `4.next = 2` | `2` | `null` (4 had no next) |

Loop ends (`second` is `null`).

**Result:** `1 → 4 → 2 → 3` — matches expected output.

## JavaScript Solution

```js
function reorderList(head) {
  if (!head || !head.next) return;

  // 1. Find middle
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. Reverse second half
  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // 3. Interleave two halves
  let first = head, second = prev;
  while (second) {
    const tmp1 = first.next, tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
}
```

## TypeScript Solution

```ts
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return;

  let slow: ListNode = head;
  let fast: ListNode | null = head;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  let prev: ListNode | null = null;
  let curr: ListNode | null = slow.next;
  slow.next = null;
  while (curr) {
    const next: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  let first: ListNode | null = head;
  let second: ListNode | null = prev;
  while (second) {
    const tmp1 = first!.next;
    const tmp2 = second.next;
    first!.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
}
```

## Time Complexity

O(n) — each of the three steps (find middle, reverse, interleave) is a
single linear pass.

## Space Complexity

O(1) — every step reuses existing nodes by relinking pointers, no new
nodes or auxiliary arrays.

## Common Mistakes

- Copying every node's value into an array, reordering the array, and
  writing the values back — works and is simple to reason about, but
  uses O(n) extra space when O(1) is achievable, and the problem
  explicitly asks for pointer manipulation, not value shuffling.
- Forgetting to cut the list at the middle (`slow.next = null`) before
  reversing the second half — without the cut, the "second half"
  traversal during reversal never terminates cleanly relative to the
  first half, and the two halves stay entangled.
- Off-by-one in the fast/slow pointer middle-finding step — for
  even-length lists, `slow` must land on the *last node of the first
  half*, not the first node of the second half, for the subsequent cut
  and reversal to produce the correct split.

## Interview Follow-up Questions

1. How would you verify this in-place algorithm is correct without a
   full O(n) extra-space reference implementation to compare against?
2. How would this need to change for a *doubly* linked list, where
   reversal and traversal work differently?
3. How would you undo this reordering — given the reordered list, could
   you reconstruct the original order in place?

## Similar Questions

- Reverse a Linked List (see [reverse-a-linked-list.md](reverse-a-linked-list.md))
- Merge Two Sorted Lists (see [merge-two-sorted-lists.md](merge-two-sorted-lists.md))
