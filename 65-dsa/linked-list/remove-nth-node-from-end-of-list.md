# Q6540 · Remove Nth Node From End of List (Two Pointers Fast & Slow)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Linked List  
**Concepts:** linked-list, two-pointers, dummy-node, single-pass  

## Problem Statement

Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its `head`.

Could you do this in **one pass**?

## Input

- `head`: `ListNode | null` — head of singly linked list
- `n`: `number` — 1-based offset from the end of the list to remove

## Output

- `ListNode | null` — head of modified linked list

## Constraints

- The number of nodes in the list is `sz`.
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

## Examples

| Input | Output | Why |
|---|---|---|
| `head = [1,2,3,4,5], n = 2` | `[1,2,3,5]` | 2nd node from end (Node 4) removed |
| `head = [1], n = 1` | `[]` | Single node removed, leaving empty list |
| `head = [1,2], n = 1` | `[1]` | Last node removed |

## Edge Cases

- Removing the head node (`n === sz`) -> dummy node pattern handles this cleanly.

## Hints

1. **Dummy Head Node**: Create a dummy node `dummy = new ListNode(0, head)` to handle edge cases where the head node itself is removed.
2. **Two Pointers with N-step Gap**: Maintain `fast` and `slow` pointers initialized at `dummy`.
3. Move `fast` ahead by `n + 1` steps.
4. Move both `fast` and `slow` forward 1 step at a time until `fast === null`.
5. `slow` will now point to the node **IMMEDIATELY BEFORE** the target node to remove! Update `slow.next = slow.next.next`.
6. Return `dummy.next`.

## Algorithm

**Pattern:** Two Pointer Fixed Gap Traversal  
**Core Insight:** Maintaining a fixed distance of `n + 1` nodes between `fast` and `slow` guarantees `slow` stops right before the target node when `fast` hits `null`.

## Dry Run

`head = [1, 2, 3, 4, 5], n = 2`:
- `dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null`.
- `fast = dummy`, `slow = dummy`.
- Advance `fast` by `n + 1` (3 steps): `fast` points to Node 3.
- Move `fast` and `slow` together:
  - Step 1: `slow = 1`, `fast = 4`.
  - Step 2: `slow = 2`, `fast = 5`.
  - Step 3: `slow = 3`, `fast = null`. Loop ends.
- `slow` is Node 3. Update `3.next = 3.next.next` (points to Node 5, bypassing Node 4).
- Return `dummy.next` (`[1, 2, 3, 5]`).

## JavaScript Solution

```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy;
  let slow = dummy;

  // Advance fast by n + 1 steps
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Advance fast and slow together until fast is null
  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  // Unlink n-th node from end
  slow.next = slow.next.next;

  return dummy.next;
}
```

## TypeScript Solution

```ts
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let fast: ListNode | null = dummy;
  let slow: ListNode | null = dummy;

  for (let i = 0; i <= n; i++) {
    if (fast !== null) fast = fast.next;
  }

  while (fast !== null) {
    slow = slow!.next;
    fast = fast.next;
  }

  if (slow && slow.next) {
    slow.next = slow.next.next;
  }

  return dummy.next;
}
```

## Time Complexity

`O(N)` — single pass through linked list.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Forgetting to use a `dummy` node, causing `TypeError` when attempting to delete the first node (`n === sz`).

## Follow-Up Questions

1. How would you solve this using a two-pass approach vs a single-pass approach?

## Similar Questions

- Delete Node in a Linked List
- Swapping Nodes in a Linked List
