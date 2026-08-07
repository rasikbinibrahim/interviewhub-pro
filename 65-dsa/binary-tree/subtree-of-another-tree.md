# Q6541 · Subtree of Another Tree (Tree Comparison DFS)

**Difficulty:** Easy  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, recursion, dfs, tree-comparison  

## Problem Statement

Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

A **subtree** of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

## Input

- `root`: `TreeNode | null` — root of main binary tree
- `subRoot`: `TreeNode | null` — root of candidate subtree

## Output

- `boolean` — `true` if `subRoot` is a subtree of `root`, `false` otherwise

## Constraints

- The number of nodes in `root` is in the range `[1, 2000]`.
- The number of nodes in `subRoot` is in the range `[1, 1000]`.
- `-10^4 <= root.val, subRoot.val <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [3,4,5,1,2], subRoot = [4,1,2]` | `true` | Subtree starting at node 4 matches `subRoot` exactly |
| `root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]` | `false` | Node 2 in `root` has extra child 0, structure does not match |

## Edge Cases

- `subRoot === null` -> return `true` (empty tree is always a subtree)
- `root === null` -> return `false`

## Hints

1. **Helper Function `isSameTree(p, q)`**:
   - If `p === null` and `q === null`, return `true`.
   - If one is `null` or `p.val !== q.val`, return `false`.
   - Recurse `isSameTree(p.left, q.left) && isSameTree(p.right, q.right)`.
2. **Main Function `isSubtree(root, subRoot)`**:
   - If `root === null`, return `false`.
   - If `isSameTree(root, subRoot)` returns `true`, return `true`!
   - Otherwise, recurse `isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)`.

## Algorithm

**Pattern:** Tree Traversal with Sub-Tree Equality Validation  
**Core Insight:** At every node in `root`, check if the subtree rooted at `node` is identical to `subRoot` using a strict `isSameTree` DFS helper.

## Dry Run

`root = [3, 4, 5, 1, 2], subRoot = [4, 1, 2]`:
- At node 3: `isSameTree(3, 4)` returns `false` (val 3 != 4).
- Recurse left child Node 4: `isSameTree(4, 4)`:
  - `4.val === 4.val` -> check left children (`1 === 1`) and right children (`2 === 2`) -> returns `true`.
- Main function returns `true`.

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
  if (root === null) return false;

  if (isSameTree(root, subRoot)) {
    return true;
  }

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
  if (root === null) return false;

  if (isSameTree(root, subRoot)) {
    return true;
  }

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
```

## Time Complexity

`O(M * N)` — where `M` is `root` node count and `N` is `subRoot` node count.

## Space Complexity

`O(H_root + H_sub)` — call stack space for recursion.

## Common Mistakes

- Checking only node values without enforcing full tree structure match down to leaf nodes (`null`).

## Follow-Up Questions

1. How would you optimize this to $O(M + N)$ time complexity using KMP string matching on serialized tree strings?

## Similar Questions

- Same Tree
- Invert Binary Tree
