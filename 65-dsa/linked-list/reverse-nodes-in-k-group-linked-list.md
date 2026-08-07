# Q6619 · Reverse Nodes in k-Group (Linked List Recursion / Iterative)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Linked List  
**Concepts:** linked-list, recursion, pointers, reversal  

## Problem Statement

Given the `head` of a linked list, reverse the nodes of a list `k` at a time, and return the modified list.

`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.

Solve it **in-place** with $O(1)$ extra memory space.

## Algorithm

**Pattern:** Iterative Sub-List K-Group Reversal  

```javascript
function reverseKGroup(head, k) {
  let count = 0;
  let ptr = head;
  while (ptr !== null && count < k) {
    ptr = ptr.next;
    count++;
  }

  if (count === k) {
    let reversedHead = reverseKGroup(ptr, k);
    let curr = head;

    while (count > 0) {
      const nextNode = curr.next;
      curr.next = reversedHead;
      reversedHead = curr;
      curr = nextNode;
      count--;
    }
    return reversedHead;
  }

  return head;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — single-pass traversal.
- **Space Complexity:** `O(N/k)` call stack depth space ($O(1)$ iterative).
