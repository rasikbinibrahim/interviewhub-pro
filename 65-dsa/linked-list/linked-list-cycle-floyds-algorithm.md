# Q6530 · Linked List Cycle (Floyd's Tortoise and Hare Algorithm)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Linked List  
**Concepts:** linked-list, two-pointers, floyds-algorithm, cycle-detection  

## Problem Statement

Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.

Return `true` if there is a cycle in the linked list. Otherwise, return `false`.

Can you solve it using `O(1)` (i.e. constant) memory?

## Input

- `head`: `ListNode | null` — head node of a singly linked list

## Output

- `boolean` — `true` if cycle exists, `false` otherwise

## Constraints

- The number of nodes in the list is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `head = [3,2,0,-4], pos = 1` | `true` | Tail node -4 connects to node 1 (val 2) forming a cycle |
| `head = [1,2], pos = 0` | `true` | Tail connects to node 0 forming a cycle |
| `head = [1], pos = -1` | `false` | Single node with no cycle |

## Edge Cases

- `head === null` or `head.next === null` -> return `false`

## Hints

1. **Floyd's Cycle Finding Algorithm (Tortoise and Hare)**:
2. Initialize two pointers at `head`: `slow` (moves 1 step at a time) and `fast` (moves 2 steps at a time).
3. If a cycle exists, `fast` will eventually overlap and catch up with `slow` (`slow === fast`).
4. If no cycle exists, `fast` or `fast.next` will reach `null` and terminate.

## Algorithm

**Pattern:** Slow and Fast Two Pointer Cycle Detection  
**Core Insight:** Moving `fast` at double speed relative to `slow` guarantees they will meet inside a cycle of length $C$ in at most $C$ steps after `slow` enters the cycle.

## Dry Run

List: `3 -> 2 -> 0 -> -4 -> (back to 2)`
- `slow = 3`, `fast = 3`
- Step 1: `slow = 2`, `fast = 0`
- Step 2: `slow = 0`, `fast = 2`
- Step 3: `slow = -4`, `fast = -4` -> `slow === fast` -> Return `true`!

## JavaScript Solution

```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(head) {
  if (head === null || head.next === null) {
    return false;
  }

  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // Cycle detected
    }
  }

  return false; // Reached end of list -> No cycle
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

function hasCycle(head: ListNode | null): boolean {
  if (head === null || head.next === null) {
    return false;
  }

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

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

`O(N)` — linear traversal time.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Forgetting to check `fast !== null && fast.next !== null` in while loop condition, causing `TypeError: Cannot read properties of null (reading 'next')`.

## Follow-Up Questions

1. How do you find the exact node where the cycle begins? (Linked List Cycle II: reset `slow = head` and move both `slow` and `fast` 1 step at a time until they meet).

## Similar Questions

- Linked List Cycle II
- Happy Number
