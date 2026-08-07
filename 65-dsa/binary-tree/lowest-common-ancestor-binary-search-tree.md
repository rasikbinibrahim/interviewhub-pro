# Q6565 · Lowest Common Ancestor of a Binary Search Tree (BST)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Search Tree  
**Concepts:** bst, binary-search-tree, recursion, lca, tree-traversal  

## Problem Statement

Given a Binary Search Tree (BST), find the **Lowest Common Ancestor (LCA)** node of two given nodes `p` and `q` in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**).”

## Input

- `root`: `TreeNode | null` — root of BST
- `p`: `TreeNode` — first target node
- `q`: `TreeNode` — second target node

## Output

- `TreeNode | null` — LCA node

## Constraints

- The number of nodes in the tree is in the range `[2, 10^5]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are **unique**.
- `p != q`
- `p` and `q` will exist in the BST.

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8` | `6` | Node 6 is LCA of 2 and 8 |
| `root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4` | `2` | Node 2 is LCA of 2 and 4 (a node can be descendant of itself) |

## Edge Cases

- `p` is an ancestor of `q` -> returns `p`

## Hints

1. **Leverage BST Property**:
   - For any BST node: all left descendants `< node.val` and all right descendants `> node.val`.
2. If both `p.val < root.val` AND `q.val < root.val`: LCA MUST lie in the **left subtree** (`lowestCommonAncestor(root.left, p, q)`).
3. If both `p.val > root.val` AND `q.val > root.val`: LCA MUST lie in the **right subtree** (`lowestCommonAncestor(root.right, p, q)`).
4. Otherwise (where `p` and `q` split on opposite sides, or `root === p` or `root === q`): `root` **IS the Lowest Common Ancestor!**

## Algorithm

**Pattern:** Binary Search Tree Split Traversal  
**Core Insight:** The LCA in a BST is the first node where `p` and `q` split into opposite subtrees (or match the current node value).

## Dry Run

`root = 6, p = 2, q = 8`:
- `p.val (2) < 6` and `q.val (8) > 6` -> Values split on left and right!
- `root` (Node 6) is the LCA. Return Node 6.

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
  let curr = root;

  while (curr !== null) {
    if (p.val < curr.val && q.val < curr.val) {
      curr = curr.left;
    } else if (p.val > curr.val && q.val > curr.val) {
      curr = curr.right;
    } else {
      // Split point found!
      return curr;
    }
  }

  return null;
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

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode | null {
  let curr = root;

  while (curr !== null) {
    if (p.val < curr.val && q.val < curr.val) {
      curr = curr.left;
    } else if (p.val > curr.val && q.val > curr.val) {
      curr = curr.right;
    } else {
      return curr;
    }
  }

  return null;
}
```

## Time Complexity

`O(H)` — where `H` is tree height ($O(\log N)$ balanced, $O(N)$ skewed).

## Space Complexity

`O(1)` — iterative constant space.

## Common Mistakes

- Using full binary tree LCA algorithm checking both branches unnecessarily without leveraging BST sorted invariants.

## Follow-Up Questions

1. How does LCA of a standard Binary Tree (non-BST) differ in implementation?

## Similar Questions

- Lowest Common Ancestor of a Binary Tree
- Search in a Binary Search Tree
