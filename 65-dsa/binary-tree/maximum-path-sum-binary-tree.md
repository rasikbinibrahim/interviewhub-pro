# Q6599 · Binary Tree Maximum Path Sum

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, dfs, recursion, dynamic-programming  

## Problem Statement

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the `root` of a binary tree, return the **maximum path sum** of any non-empty path.

## Input

- `root`: `TreeNode | null` — root of binary tree

## Output

- `number` — maximum path sum integer

## Constraints

- The number of nodes in the tree is in the range `[1, 3 * 10^4]`.
- `-1000 <= Node.val <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [1,2,3]` | `6` | Path 2 -> 1 -> 3 has sum 6 |
| `root = [-10,9,20,null,null,15,7]` | `42` | Path 15 -> 20 -> 7 has sum 42 |

## Algorithm

**Pattern:** Post-Order Recursive Path Contribution  
**Core Insight:** At each node, calculate max path passing *through* the node (`val + leftGain + rightGain`) to update global max, while returning single-branch gain (`val + max(leftGain, rightGain)`) to the parent.

```javascript
function maxPathSum(root) {
  let maxSum = -Infinity;

  function maxGain(node) {
    if (node === null) return 0;

    // Ignore negative gains by taking max with 0
    const leftGain = Math.max(0, maxGain(node.left));
    const rightGain = Math.max(0, maxGain(node.right));

    // Price of starting a new path at current node
    const priceNewPath = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, priceNewPath);

    // Return maximum single branch extension to caller
    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — visits every tree node once.
- **Space Complexity:** `O(H)` — call stack height.
