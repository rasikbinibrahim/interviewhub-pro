# Q6620 · Swap Nodes in Pairs (Linked List Pointer Manipulation)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Linked List  
**Concepts:** linked-list, recursion, pointers  

## Problem Statement

Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

## Algorithm

**Pattern:** Dummy Head Pointer Swap  

```javascript
function swapPairs(head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;

  while (prev.next !== null && prev.next.next !== null) {
    const first = prev.next;
    const second = prev.next.next;

    first.next = second.next;
    second.next = first;
    prev.next = second;

    prev = first;
  }

  return dummy.next;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — single linear pass.
- **Space Complexity:** `O(1)` — constant extra space.
