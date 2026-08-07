# Q6545 · Reorder List (Find Middle, Reverse Second Half & Alternating Merge)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Linked List  
**Concepts:** linked-list, fast-slow-pointers, reverse-linked-list, multi-step-algorithm  

## Problem Statement

You are given the head of a singly linked-list. The list can be represented as:
`L0 -> L1 -> ... -> Ln - 1 -> Ln`

Reorder the list to be on the following form:
`L0 -> Ln -> L1 -> Ln - 1 -> L2 -> Ln - 2 -> ...`

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

## Input

- `head`: `ListNode | null` — head node of singly linked list

## Output

- Modifies linked list in-place (void return)

## Constraints

- The number of nodes in the list is in the range `[1, 5 * 10^4]`.
- `1 <= Node.val <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `head = [1,2,3,4]` | `[1,4,2,3]` | Alternating front/back merge |
| `head = [1,2,3,4,5]` | `[1,5,2,4,3]` | Odd length alternating merge |

## Edge Cases

- `head === null` or `head.next === null` or `head.next.next === null` -> return immediately without modifying

## Hints

1. **3-Step In-Place Algorithm**:
2. **Step 1 (Find Middle)**: Use Fast & Slow pointers (`slow` moves 1 step, `fast` moves 2 steps) to find the middle node of the linked list. Split list into two halves.
3. **Step 2 (Reverse Second Half)**: Reverse the second half of the linked list in-place starting at `slow.next`.
4. **Step 3 (Merge Alternating Nodes)**: Interleave/merge the first half (`head`) and the reversed second half (`second`) node by node.

## Algorithm

**Pattern:** Multi-Phase Structural Linked List Reordering  
**Core Insight:** Combining Floyd's Fast & Slow middle detection, iterative linked list reversal, and 2-pointer alternating merge solves the problem in-place in $O(N)$ time and $O(1)$ space.

## Dry Run

`head = [1, 2, 3, 4, 5]`:
- Step 1 (Middle): `slow` stops at Node 3. Second half starts at Node 4 (`4 -> 5 -> null`).
- Step 2 (Reverse): Reverse `4 -> 5` to `5 -> 4 -> null`. Disconnect `3.next = null`.
- Step 3 (Merge): Interleave `first` (`1 -> 2 -> 3`) and `second` (`5 -> 4`):
  - `1 -> 5`
  - `5 -> 2`
  - `2 -> 4`
  - `4 -> 3`
- Result: `1 -> 5 -> 2 -> 4 -> 3 -> null`.

## JavaScript Solution

```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reorderList(head) {
  if (head === null || head.next === null || head.next.next === null) {
    return;
  }

  // Step 1: Find Middle Node
  let slow = head;
  let fast = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse Second Half
  let second = slow.next;
  slow.next = null; // Disconnect first half from second half

  let prev = null;
  while (second !== null) {
    const nextTemp = second.next;
    second.next = prev;
    prev = second;
    second = nextTemp;
  }
  second = prev; // Head of reversed second half

  // Step 3: Alternating Merge
  let first = head;
  while (second !== null) {
    const tmp1 = first.next;
    const tmp2 = second.next;

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
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reorderList(head: ListNode | null): void {
  if (head === null || head.next === null || head.next.next === null) {
    return;
  }

  let slow: ListNode = head;
  let fast: ListNode = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  let second: ListNode | null = slow.next;
  slow.next = null;

  let prev: ListNode | null = null;
  while (second !== null) {
    const nextTemp: ListNode | null = second.next;
    second.next = prev;
    prev = second;
    second = nextTemp;
  }
  second = prev;

  let first: ListNode | null = head;
  while (second !== null) {
    const tmp1: ListNode | null = first!.next;
    const tmp2: ListNode | null = second.next;

    first!.next = second;
    second.next = tmp1;

    first = tmp1;
    second = tmp2;
  }
}
```

## Time Complexity

`O(N)` — linear time across all 3 steps.

## Space Complexity

`O(1)` — in-place pointer modifications using constant space.

## Common Mistakes

- Forgetting to disconnect `slow.next = null` after finding the middle, creating infinite reference loops.

## Follow-Up Questions

1. How would you verify if a singly linked list is a Palindrome using a similar 3-step approach?

## Similar Questions

- Palindrome Linked List
- Reverse Linked List
