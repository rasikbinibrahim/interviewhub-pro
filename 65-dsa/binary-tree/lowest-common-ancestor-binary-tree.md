# Q6521 · Lowest Common Ancestor of a Binary Tree

**Difficulty:** Medium  
**Companies Asked:** Meta, Amazon, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, recursion, dfs, tree-traversal  

## Problem Statement

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).”

## Input

- `root`: `TreeNode | null` — root of binary tree
- `p`: `TreeNode` — target node 1
- `q`: `TreeNode` — target node 2

## Output

- `TreeNode | null` — the Lowest Common Ancestor node

## Constraints

- The number of nodes in the tree is in the range `[2, 10^5]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are unique.
- `p != q`
- `p` and `q` will exist in the tree.

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1` | `3` | Node 3 is lowest node with descendants 5 and 1 |
| `root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4` | `5` | Node 5 is an ancestor of itself and node 4 |

## Edge Cases

- `p` is a direct child or descendant of `q` (or vice versa).

## Hints

1. **Recursive Post-Order Traversal**: Recurse down left and right subtrees.
2. Base case: If `root === null`, `root === p`, or `root === q`, return `root`.
3. Recurse `left = lowestCommonAncestor(root.left, p, q)` and `right = lowestCommonAncestor(root.right, p, q)`.
4. If both `left` and `right` return non-null values, `root` is the LCA!
5. If only one of them is non-null, return the non-null child (`left ?? right`).

## Algorithm

**Pattern:** Post-Order Bottom-Up Bubbling DFS  
**Core Insight:** If `p` is found in the left subtree and `q` is found in the right subtree of node `X`, node `X` MUST be their Lowest Common Ancestor.

## Dry Run

`root = 3, p = 5, q = 1`:
- At node 3:
  - Recurse left child 5 -> matches `p === 5` -> returns Node 5.
  - Recurse right child 1 -> matches `q === 1` -> returns Node 1.
- Node 3 receives `left = Node 5`, `right = Node 1`. Both non-null -> returns Node 3.
- Result: Node 3.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) {
    return root; // Found split node
  }

  return left !== null ? left : right;
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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) {
    return root;
  }

  return left !== null ? left : right;
}
```

## Time Complexity

`O(N)` — visits every node in the binary tree in worst case.

## Space Complexity

`O(H)` — where `H` is tree height (`O(log N)` for balanced tree, `O(N)` for skewed tree).

## Common Mistakes

- Over-complicating search by building explicit parent pointer maps when simple post-order recursion bubbles up the result directly.

## Follow-Up Questions

1. How would you solve this in a Binary Search Tree (BST)? (Compare `p.val` and `q.val` with `root.val` to decide left/right traversal).

## Similar Questions

- Lowest Common Ancestor of a Binary Search Tree
- Lowest Common Ancestor of Deepest Leaves
