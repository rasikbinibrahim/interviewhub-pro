# Q6531 · Maximum Depth of Binary Tree (Recursive & Iterative)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, recursion, bfs, dfs, tree-traversal  

## Problem Statement

Given the `root` of a binary tree, return its maximum depth.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Input

- `root`: `TreeNode | null` — root of binary tree

## Output

- `number` — maximum depth integer count

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-100 <= Node.val <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [3,9,20,null,null,15,7]` | `3` | Longest path is 3 -> 20 -> 15 (depth 3) |
| `root = [1,null,2]` | `2` | Skewed path 1 -> 2 (depth 2) |
| `root = []` | `0` | Empty tree depth is 0 |

## Edge Cases

- `root === null` -> returns `0`
- Single node tree `[1]` -> returns `1`

## Hints

1. **Recursive Post-Order DFS**:
   - Base case: If `root === null`, return `0`.
   - Recurse: `leftDepth = maxDepth(root.left)` and `rightDepth = maxDepth(root.right)`.
   - Return `1 + Math.max(leftDepth, rightDepth)`.
2. **Iterative BFS (Level Order)**: Use a queue to traverse the tree level by level, incrementing `depth` after draining each level.

## Algorithm

**Pattern:** Bottom-Up Depth Traversal  
**Core Insight:** The maximum depth at node `X` is 1 plus the maximum depth of its left and right subtrees.

## Dry Run

`root = [3, 9, 20, null, null, 15, 7]`:
- `maxDepth(9)`: children null -> returns `1`.
- `maxDepth(15)`: children null -> returns `1`.
- `maxDepth(7)`: children null -> returns `1`.
- `maxDepth(20)`: `1 + max(1, 1) = 2`.
- `maxDepth(3)`: `1 + max(1, 2) = 3`.
- Result: `3`.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Recursive Solution
function maxDepth(root) {
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
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

function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}
```

## Time Complexity

`O(N)` — visits every node in the binary tree.

## Space Complexity

`O(H)` — where `H` is tree height (`O(log N)` for balanced, `O(N)` for skewed).

## Common Mistakes

- Forgetting base case `root === null`, leading to `TypeError: Cannot read properties of null (reading 'left')`.

## Follow-Up Questions

1. How would you find Minimum Depth of Binary Tree (farthest path to leaf vs nearest leaf)?

## Similar Questions

- Minimum Depth of Binary Tree
- Balanced Binary Tree
