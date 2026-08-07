# Q6655 · Merge Two Sorted Lists (Dummy Head Pointer)

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Linked List
**Concepts:** linked-list, pointers, dummy-head

## Problem Statement

Write a function `mergeTwoLists(list1, list2)` that merges two sorted
linked lists into a single sorted list by splicing together the nodes
of the first two, and returns its head.

## Input

`list1`, `list2`: heads of two linked lists, each already sorted in
ascending order (either may be `null`).

## Output

The head of a single sorted linked list containing every node from both
input lists.

## Constraints

`0 <= number of nodes in each list <= 50`

## Examples

```javascript
// list1: 1 -> 2 -> 4
// list2: 1 -> 3 -> 4
const merged = mergeTwoLists(buildList([1, 2, 4]), buildList([1, 3, 4]));
// merged, walked node by node, holds: [1, 1, 2, 3, 4, 4]
```

## Edge Cases

- Both lists empty (`null`, `null`) → `null`
- One list empty, the other not → the non-empty list is returned as-is
- Lists of unequal length → the shorter list is exhausted first, and
  the remaining tail of the longer list is appended directly
- Duplicate values across both lists → preserved and correctly
  interleaved in sorted order (no deduplication)

## Hints

1. You're building a new list by repeatedly choosing "whichever of the
   two current nodes has the smaller value" — what pointer do you need
   to keep track of "where to attach the next chosen node"?
2. A dummy (placeholder) head node, whose `next` eventually becomes the
   real head of the merged list, sidesteps needing special-case logic
   for "what if the very first node hasn't been decided yet."
3. Once one list runs out, the *entire remaining tail* of the other list
   can just be attached directly — since it's already sorted, no
   further comparison is needed.

## Algorithm

**Pattern:** two-pointer merge with a dummy head node.
**Core insight:** merging two sorted lists only ever requires comparing
their current front nodes and attaching whichever is smaller — repeating
that single comparison until one list is exhausted produces the fully
sorted merge, since both inputs are already individually sorted. A dummy
head node eliminates the need to special-case "what's the first node of
the result," since the loop can always safely write to `curr.next`
without checking whether the result list has started yet.
**Invariant:** at every point during the loop, everything already
attached to `dummy` (following `dummy.next`) is the fully sorted merge of
every node consumed from `list1` and `list2` so far.

## Dry Run

**Input:** `list1 = [1,2,4]`, `list2 = [1,3,4]`

| Comparison | Chosen | curr.next after |
|---|---|---|
| `list1(1) <= list2(1)` | `list1` node `1` | `[1]`; list1 advances to `[2,4]` |
| `list1(2) <= list2(1)`? no | `list2` node `1` | `[1,1]`; list2 advances to `[3,4]` |
| `list1(2) <= list2(3)` | `list1` node `2` | `[1,1,2]`; list1 advances to `[4]` |
| `list1(4) <= list2(3)`? no | `list2` node `3` | `[1,1,2,3]`; list2 advances to `[4]` |
| `list1(4) <= list2(4)` | `list1` node `4` | `[1,1,2,3,4]`; list1 advances to `[]` |

`list1` now empty → loop ends. `curr.next = list1 || list2` attaches the
remaining `list2` tail (`[4]`) directly.

**Result:** `[1,1,2,3,4,4]` — matches expected output.

## JavaScript Solution

```js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let curr = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  curr.next = list1 || list2;
  return dummy.next;
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let curr = dummy;
  let a = list1;
  let b = list2;

  while (a && b) {
    if (a.val <= b.val) {
      curr.next = a;
      a = a.next;
    } else {
      curr.next = b;
      b = b.next;
    }
    curr = curr.next;
  }

  curr.next = a || b;
  return dummy.next;
}
```

## Time Complexity

O(n + m), where n and m are the lengths of the two lists — each node
from both lists is visited exactly once.

## Space Complexity

O(1) — the merge reuses existing nodes by relinking their `next`
pointers, allocating only the single dummy node.

## Common Mistakes

- Copying node values into a new array, sorting it, and building a brand
  new list — correct, but wasteful; both inputs are already sorted, so
  no sorting step is needed at all.
- Forgetting the final `curr.next = list1 || list2` — without it, the
  entire remaining tail of whichever list wasn't exhausted first is
  silently dropped from the result.
- Using `<` instead of `<=` when comparing equal values — functionally
  produces the same final sorted sequence either way for this problem,
  but affects *which* list's node with an equal value gets attached
  first; worth being deliberate about for problems where stability
  matters.

## Interview Follow-up Questions

1. How would you generalize this to merge `k` sorted lists, not just
   two?
2. How would you merge the lists without mutating either input,
   producing an entirely new list of new nodes instead?
3. How would you merge two sorted *doubly* linked lists, and what
   changes compared to singly linked lists?

## Similar Questions

- Merge k Sorted Lists (Min-Heap) (see [../heap/merge-k-sorted-lists-min-heap.md](../heap/merge-k-sorted-lists-min-heap.md))
- Reverse a Linked List (see [reverse-a-linked-list.md](reverse-a-linked-list.md))
