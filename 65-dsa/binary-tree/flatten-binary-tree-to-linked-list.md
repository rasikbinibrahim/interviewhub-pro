# Q6614 · Flatten Binary Tree to Linked List (In-Place Reverse Pre-Order / Morris)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, in-place, recursion, morris-traversal  

## Problem Statement

Given the `root` of a binary tree, flatten the tree into a "linked list":
- The "linked list" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.
- The "linked list" should be in the same order as a **pre-order traversal** of the binary tree.

Solve it **in-place** with $O(1)$ extra space.

## Algorithm

**Pattern:** Reverse Post-Order Traversal (`Right -> Left -> Root`)  
Maintain `prev` pointer pointing to previously processed node. Attach `node.right = prev`, `node.left = null`, update `prev = node`.

```javascript
function flatten(root) {
  let prev = null;

  function postOrder(node) {
    if (node === null) return;

    postOrder(node.right);
    postOrder(node.left);

    node.right = prev;
    node.left = null;
    prev = node;
  }

  postOrder(root);
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — visits every tree node once.
- **Space Complexity:** `O(H)` — call stack height ($O(1)$ with Morris Traversal).
