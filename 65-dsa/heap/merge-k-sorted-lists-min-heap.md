# Q6632 · Merge k Sorted Lists (Divide & Conquer / Min-Heap)

**Difficulty:** Hard
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★☆
**Category:** Heap
**Concepts:** heap, min-heap, linked-list, divide-and-conquer

## Problem Statement

Write a function `mergeKLists(lists)` that merges `k` sorted linked
lists into a single sorted linked list and returns its head.

## Input

`lists`: an array of `k` linked-list heads, each list already sorted in
ascending order (any list may be `null`, representing an empty list).

## Output

The head of a single linked list containing every node from every input
list, merged in ascending sorted order.

## Constraints

`0 <= lists.length <= 10^4`, total nodes across all lists up to `5*10^4`

## Examples

```javascript
// Input lists (shown as arrays for readability, each is really a linked list):
// [1,4,5], [1,3,4], [2,6]
const merged = mergeKLists([
  buildList([1, 4, 5]),
  buildList([1, 3, 4]),
  buildList([2, 6]),
]);
// merged, walked node by node, holds: [1, 1, 2, 3, 4, 4, 5, 6]
```

## Edge Cases

- `lists` is empty (`[]`) → `null`, nothing to merge
- `lists` contains only `null` entries → `null`
- A single list in `lists` → that list is returned unchanged
- Lists of very different lengths → shorter lists are simply exhausted
  first, with remaining longer-list nodes appended directly (no need for
  special handling)

## Hints

1. Merging exactly *two* sorted lists is a well-known, simple pattern —
   how could merging `k` lists be built out of repeated two-list merges?
2. Pair up the lists and merge each pair, halving the number of lists
   remaining; repeat this process on the resulting merged lists until
   only one list is left.
3. Each round of pairwise merging processes every node exactly once
   across all pairs — think about how many rounds are needed to go from
   `k` lists down to `1`, and what that implies about total work.

## Algorithm

**Pattern:** divide and conquer — repeated pairwise merging (an
alternative to the equally valid "put every list's head in a min-heap,
repeatedly pop the smallest" approach the concepts tag references).
**Core insight:** merging two sorted lists into one sorted list is
straightforward and well understood; merging `k` lists can be built
entirely out of that primitive by repeatedly merging lists in pairs and
replacing them with their merged result, halving the list count each
round — after `⌈log₂ k⌉` rounds, exactly one fully-merged list remains.
This divide-and-conquer structure does the same total amount of node
comparison work as a min-heap approach, but avoids the overhead of
maintaining a heap data structure, trading it for the simpler two-list
merge primitive applied repeatedly.
**Invariant:** at the end of every round, `lists` holds half as many
lists as it did entering the round (rounded up), and each of those lists
is itself fully sorted — because it was built by correctly merging two
already-sorted lists.

## Dry Run

**Input:** `lists = [ [1,4,5], [1,3,4], [2,6] ]` (shown as arrays for
readability)

**Round 1** — pair up lists two at a time:

| Pair | mergeTwoLists result |
|---|---|
| `[1,4,5]` and `[1,3,4]` | `[1,1,3,4,4,5]` |
| `[2,6]` and (none, odd one out) | `[2,6]` |

`lists = [ [1,1,3,4,4,5], [2,6] ]`

**Round 2** — one pair remaining:

| Pair | mergeTwoLists result |
|---|---|
| `[1,1,3,4,4,5]` and `[2,6]` | `[1,1,2,3,4,4,5,6]` |

`lists = [ [1,1,2,3,4,4,5,6] ]` — loop ends (`lists.length === 1`).

**Result:** `[1,1,2,3,4,4,5,6]` — matches expected output.

## JavaScript Solution

```js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;

  function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    while (l1 && l2) {
      if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }
      else { curr.next = l2; l2 = l2.next; }
      curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
  }

  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    lists = merged;
  }

  return lists[0];
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

function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  if (!lists || lists.length === 0) return null;

  function mergeTwoLists(a: ListNode | null, b: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let curr = dummy;
    let l1 = a;
    let l2 = b;
    while (l1 && l2) {
      if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }
      else { curr.next = l2; l2 = l2.next; }
      curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
  }

  let current: (ListNode | null)[] = lists;
  while (current.length > 1) {
    const merged: (ListNode | null)[] = [];
    for (let i = 0; i < current.length; i += 2) {
      const l1 = current[i];
      const l2 = i + 1 < current.length ? current[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    current = merged;
  }

  return current[0];
}
```

## Time Complexity

O(N log k), where N is the total number of nodes across all lists and k
is the number of lists — there are `log₂ k` rounds, and each round does
O(N) total work merging pairs (every node is touched exactly once per
round).

## Space Complexity

O(log k) for the `lists` array bookkeeping across rounds (or O(k) if
counting the array of merged-list-head pointers at each round); O(1)
extra space per merge beyond the output list itself, which reuses the
existing nodes rather than allocating new ones.

## Common Mistakes

- Merging lists one at a time into a single accumulator (`merge(merge(
  merge(l1,l2),l3),l4)...`) instead of pairwise — this degrades to
  O(N × k) instead of O(N log k), since later lists get merged against
  an ever-growing accumulator rather than two similarly-sized lists at a
  time.
- Concatenating all node values into an array, sorting the array, and
  rebuilding a list — correct and O(N log N), but discards the fact that
  each input list is *already* sorted, doing more comparison work than
  necessary.
- Forgetting the dummy-head technique in `mergeTwoLists` — without a
  dummy node, the first real node of the merged list needs special-case
  handling instead of falling out naturally from the same loop.

## Interview Follow-up Questions

1. How would you implement this using an actual min-heap (keeping each
   list's current head in the heap, always popping the smallest), and
   how does its complexity compare to the divide-and-conquer approach?
2. How would you merge the lists if they needed to stay independently
   readable afterward (a non-destructive merge, not reusing existing
   nodes)?
3. How would this change if the lists could be extremely long and needed
   to be merged in a streaming fashion, without holding everything in
   memory at once?

## Similar Questions

- Merge Two Sorted Lists (see [../linked-list/merge-two-sorted-lists.md](../linked-list/merge-two-sorted-lists.md))
- Find Median from Data Stream (see [find-median-from-data-stream.md](find-median-from-data-stream.md))
