# Q6581 · Subtree of Another Tree (Binary Tree DFS Matching)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, dfs, recursion, tree-matching  

## Problem Statement

Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

A **subtree** of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

## Input

- `root`: `TreeNode | null` — primary binary tree root
- `subRoot`: `TreeNode | null` — candidate subtree root

## Output

- `boolean` — `true` if `subRoot` exists as a subtree in `root`, `false` otherwise

## Constraints

- The number of nodes in the `root` tree is in the range `[1, 2000]`.
- The number of nodes in the `subRoot` tree is in the range `[1, 1000]`.
- `-10^4 <= root.val, subRoot.val <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [3,4,5,1,2], subRoot = [4,1,2]` | `true` | Node 4 subtree matches `subRoot` structure and values |
| `root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]` | `false` | Extra node 0 at leaf invalidates exact subtree match |

## Edge Cases

- `subRoot === null` -> returns `true`
- `root === null` -> returns `false`

## Hints

1. **Helper Function `isSameTree(p, q)`**:
   - Compares if two binary trees are identical in structure and values.
2. Main recursion:
   - If `isSameTree(root, subRoot)` is true: return `true`.
   - Recurse left and right: `isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)`.

## Algorithm

**Pattern:** Recursive Structural Matching  
**Core Insight:** Testing `isSameTree` at every candidate node of the main tree verifies both exact values and descendant leaf termination boundaries.

## Dry Run

`root = [3,4,5,1,2], subRoot = [4,1,2]`:
- Test `isSameTree(Node 3, Node 4)` -> False (3 !== 4).
- Recurse Left `isSameTree(Node 4, Node 4)`:
  - `4 === 4` -> Check left: `1 === 1`. Check right: `2 === 2`. Leaves match! Returns `true`.
- Return `true`.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isSameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null || p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

function isSubtree(root, subRoot) {
  if (subRoot === null) return true;
  if (root === null) return false;

  if (isSameTree(root, subRoot)) return true;

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) return true;
  if (p === null || q === null || p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if (subRoot === null) return true;
  if (root === null) return false;

  if (isSameTree(root, subRoot)) return true;

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
```

## Time Complexity

`O(M * N)` — where $M$ is nodes in `root` and $N$ is nodes in `subRoot`.

## Space Complexity

`O(H)` — call stack depth for tree height $H$.

## Common Mistakes

- Returning true if `subRoot` values match but extra child descendant nodes exist on `root` leaf nodes (must enforce strict `isSameTree` equality).

## Follow-Up Questions

1. How can Tree Serialization + KMP String Search solve Subtree of Another Tree in linear $O(M + N)$ time?

## Similar Questions

- Same Tree
- Symmetric Tree
