# Q6512 · Reverse Linked List (Iterative & Recursive)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Linked List  
**Concepts:** linked-list, pointers, recursion, iterative  

## Problem Statement

Given the `head` of a singly linked list, reverse the list, and return the new `head` of the reversed list.

## Input

- `head`: `ListNode | null` — head node of a singly linked list

## Output

- `ListNode | null` — head node of the reversed singly linked list

## Constraints

- The number of nodes in the list is in the range `[0, 5000]`.
- `-5000 <= Node.val <= 5000`

## Examples

| Input | Output | Why |
|---|---|---|
| `head = [1,2,3,4,5]` | `[5,4,3,2,1]` | Reverses order of all node pointers |
| `head = [1,2]` | `[2,1]` | Reverses two nodes |
| `head = []` | `[]` | Empty list returns `null` |

## Edge Cases

- `head === null` (empty list)
- Single node list `[1]`

## Hints

1. **Iterative**: Maintain three pointers: `prev` (initialized to `null`), `curr` (initialized to `head`), and `nextTemp`.
2. In each iteration, save `nextTemp = curr.next`, reverse link `curr.next = prev`, move `prev = curr`, and advance `curr = nextTemp`.
3. **Recursive**: Base case: if `head === null` or `head.next === null`, return `head`. Recursively call `newHead = reverseList(head.next)`. Set `head.next.next = head` and `head.next = null`.

## Algorithm

**Pattern:** Two/Three Pointer Iteration or Recursive Stack Unwinding  
**Core Insight:** Reversing a singly linked list requires redirecting each node's `.next` pointer to point to its predecessor `prev` instead of its successor.

## Dry Run

`head = [1, 2, 3]`:
- `prev = null`, `curr = 1`
- Iteration 1: `nextTemp = 2`; `1.next = null`; `prev = 1`; `curr = 2`.
- Iteration 2: `nextTemp = 3`; `2.next = 1`; `prev = 2`; `curr = 3`.
- Iteration 3: `nextTemp = null`; `3.next = 2`; `prev = 3`; `curr = null`.
- Loop terminates (`curr === null`). Return `prev` (Node 3). Result: `3 -> 2 -> 1 -> null`.

## JavaScript Solution

```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Iterative O(1) space solution
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  return prev;
}

// Recursive O(N) space solution
function reverseListRecursive(head) {
  if (head === null || head.next === null) {
    return head;
  }

  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
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

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  while (curr !== null) {
    const nextTemp: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  return prev;
}
```

## Time Complexity

`O(N)` — single traversal through all `N` nodes.

## Space Complexity

- `Iterative`: `O(1)` constant space.
- `Recursive`: `O(N)` call stack space.

## Common Mistakes

- Overwriting `curr.next` before saving reference to original `curr.next`, breaking the pointer chain.
- Forgetting to set `head.next = null` in recursive base case, creating infinite reference cycles.

## Follow-Up Questions

1. How would you reverse a sub-segment of a linked list from position `left` to `right` in a single pass? (Reverse Linked List II).

## Similar Questions

- Reverse Linked List II
- Palindrome Linked List
