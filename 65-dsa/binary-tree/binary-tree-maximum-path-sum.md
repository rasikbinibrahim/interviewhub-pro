# Q6549 · Binary Tree Maximum Path Sum (Tree Post-Order DFS)

**Difficulty:** Hard  
**Companies Asked:** Meta, Amazon, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, dfs, recursion, path-sum, post-order  

## Problem Statement

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

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
| `root = [1,2,3]` | `6` | Optimal path is 2 -> 1 -> 3 (sum = 6) |
| `root = [-10,9,20,null,null,15,7]` | `42` | Optimal path is 15 -> 20 -> 7 (sum = 42) |

## Edge Cases

- All negative node values `[-3]` -> returns `-3`

## Hints

1. **Post-Order DFS Bottom-Up**:
   - For every node, compute the max single-branch gain from its left child (`leftGain`) and right child (`rightGain`).
   - If a branch sum is negative, clamp it to 0 (`Math.max(0, gain)`).
2. **Current Node Path Sum**:
   - Path passing through current node as root: `node.val + leftGain + rightGain`.
   - Update global `maxSum = Math.max(maxSum, currentPathSum)`.
3. **Return Value for Parent**:
   - Return `node.val + Math.max(leftGain, rightGain)` so the parent node can extend ONE valid single branch path.

## Algorithm

**Pattern:** Post-Order Bottom-Up Tree Recursion  
**Core Insight:** Distinguishing between a full path passing through `node` (which cannot be extended upward) vs a single branch gain (which can be extended to parent) resolves max path sums in $O(N)$ time.

## Dry Run

`root = [-10, 9, 20, null, null, 15, 7]`:
- `DFS(15)` -> `left = 0, right = 0`. Global max = 15. Return 15.
- `DFS(7)` -> `left = 0, right = 0`. Global max = 15. Return 7.
- `DFS(20)` -> `left = 15, right = 7`. Path passing through 20: `20 + 15 + 7 = 42`. Global max = 42. Return `20 + max(15, 7) = 35`.
- `DFS(9)` -> `left = 0, right = 0`. Return 9.
- `DFS(-10)` -> `left = 9, right = 35`. Path passing through -10: `-10 + 9 + 35 = 34`. Max remains 42.
- Return `42`.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxPathSum(root) {
  let maxSum = -Infinity;

  function maxGain(node) {
    if (node === null) return 0;

    // Clamp negative gains to 0
    const leftGain = Math.max(0, maxGain(node.left));
    const rightGain = Math.max(0, maxGain(node.right));

    // Path sum passing through this node as root
    const currentPathSum = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, currentPathSum);

    // Return max single branch gain to parent
    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}
```

## TypeScript Solution

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function maxPathSum(root: TreeNode | null): number {
  let maxSum = -Infinity;

  function maxGain(node: TreeNode | null): number {
    if (node === null) return 0;

    const leftGain = Math.max(0, maxGain(node.left));
    const rightGain = Math.max(0, maxGain(node.right));

    const currentPathSum = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, currentPathSum);

    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}
```

## Time Complexity

`O(N)` — visits every node in the binary tree once.

## Space Complexity

`O(H)` — recursion call stack depth ($O(\log N)$ balanced, $O(N)$ skewed).

## Common Mistakes

- Forgetting to clamp negative branch sums `Math.max(0, gain)`, adding negative subtree paths that decrease total path sum.

## Follow-Up Questions

1. How would you solve Path Sum III, which finds the number of paths summing to a target value?

## Similar Questions

- Path Sum II
- Diameter of Binary Tree
