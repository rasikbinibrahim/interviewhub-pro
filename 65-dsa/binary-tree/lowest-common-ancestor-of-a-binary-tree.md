# Q1004 · Lowest Common Ancestor of a Binary Tree

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Microsoft, Google, LinkedIn
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Binary Tree
**Concepts:** post-order recursion, bottom-up ancestor propagation

## Problem Statement

Given the root of a binary tree and two nodes `p` and `q` known to exist
in the tree, return their lowest common ancestor (LCA) — the deepest
node that has both `p` and `q` as descendants (a node is allowed to be a
descendant of itself).

## Input

- `root`: the root node of a binary tree (`{ value, left, right }`
  nodes)
- `p`, `q`: two node references known to exist somewhere in the tree

## Output

The node reference that is the lowest common ancestor of `p` and `q`.

## Constraints

- The number of nodes is in `[2, 10^5]`.
- All node values are unique.
- `p` and `q` both exist in the tree and are distinct from each other.

## Examples

| Input | Output | Why |
|---|---|---|
| Tree rooted at `3`, `p = 5`, `q = 1` (both direct children of `3`) | `3` | `3` is the deepest node that has both as descendants |
| Tree rooted at `3`, `p = 5`, `q = 4` (`4` is a child of `5`) | `5` | `5` is itself an ancestor of `4`, and a node counts as its own descendant |

## Edge Cases

- One of `p`/`q` is an ancestor of the other → the answer is that
  ancestor node itself, not some node further up the tree
- `p` and `q` are both the root's direct children → the root is the
  answer
- A completely unbalanced (linked-list-shaped) tree → LCA logic must
  still work without assuming any particular tree shape or balance

## Hints

1. A brute-force approach finds the full root-to-`p` and root-to-`q`
   paths, then compares them — correct, but requires extra bookkeeping
   to build and compare two paths. Is there a way to find the LCA in a
   single traversal instead?
2. Think recursively: if you search the left and right subtrees of a
   node for `p` and `q` independently, what does it mean if *one* is
   found in the left subtree and the *other* in the right?
3. If a node's left subtree search finds one target and its right
   subtree search finds the other, that node itself is the LCA — it's
   the point where the two search paths diverge. If both targets are
   found on the same side, the LCA must be further down that side, not
   at the current node.

## Algorithm

**Pattern:** post-order recursion — search both subtrees, then combine
results at each node.
**Core insight:** recursively search each node's left and right
subtrees for `p` and `q`. A node is the LCA exactly when its two
subtree searches disagree (one side found something, the other side
found something different) — that disagreement marks the exact point
where paths to `p` and `q` diverge. If a node itself *is* `p` or `q`,
it's immediately returned upward as "found," since a node counts as its
own ancestor — this correctly handles the case where one target is an
ancestor of the other.
**Invariant:** the recursive call on any subtree returns either `null`
(neither target found in that subtree), one of `p`/`q` (exactly one
found), or the LCA itself (both found, already determined within that
subtree) — the caller only ever needs to inspect what came back from
each side, never re-search.

## Dry Run

**Input:** tree rooted at `3` (children `5, 1`); `5` has children `6,
2`; `2` has children `7, 4`. `p = 5`, `q = 4`.

| Node visited (post-order) | Left search result | Right search result | This node's return value |
|---|---|---|---|
| `6` (leaf) | — | — | `null` (not p or q) |
| `7` (leaf) | — | — | `null` |
| `4` (leaf) | — | — | `4` (this node IS q) |
| `2` | `null` (from 7) | `4` (from 4) | one side found `q` → return `4` upward (only one found so far) |
| `5` | `6` → `null` | `2` → `4` | `5` itself IS `p` → return `5` immediately (a node found is returned before even checking children further, per the base case) |
| `1` (other subtree, no targets) | — | — | `null` |
| `3` (root) | `5` (from left subtree) | `null` (from right subtree, `1`) | only one side found something (`5`) → propagate `5` upward |

**Result:** `5` — matches expected output (`5` is an ancestor of `4`,
and the deepest node that has both `5` and `4` as descendants — `5` is
its own descendant here).

## JavaScript Solution

```js
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) {
    // Base case: nothing here, or we've found one of the targets —
    // either way, propagate this node upward as the result.
    return root;
  }

  const leftResult = lowestCommonAncestor(root.left, p, q);
  const rightResult = lowestCommonAncestor(root.right, p, q);

  if (leftResult !== null && rightResult !== null) {
    // Found on both sides — this is exactly where the paths diverge.
    return root;
  }

  // Found on only one side (or neither) — propagate whichever side
  // actually found something (or null if neither did).
  return leftResult !== null ? leftResult : rightResult;
}
```

## TypeScript Solution

```ts
interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function lowestCommonAncestor<T>(
  root: TreeNode<T> | null,
  p: TreeNode<T>,
  q: TreeNode<T>,
): TreeNode<T> | null {
  if (root === null || root === p || root === q) {
    return root;
  }

  const leftResult = lowestCommonAncestor(root.left, p, q);
  const rightResult = lowestCommonAncestor(root.right, p, q);

  if (leftResult !== null && rightResult !== null) {
    return root;
  }

  return leftResult !== null ? leftResult : rightResult;
}
```

## Time Complexity

O(n) — in the worst case, every node is visited once.

## Space Complexity

O(h) — the recursion call stack depth equals the tree's height, `h`.

## Common Mistakes

- Comparing node *values* instead of node *references* — fails if
  values aren't guaranteed unique, or is simply the wrong equality check
  when node identity is what's meaningful.
- Building and comparing two full root-to-target paths — correct, but
  more bookkeeping than the single-pass recursive approach.
- Forgetting that a node counts as its own descendant — if `p` is an
  ancestor of `q`, the correct LCA is `p` itself, not some node further
  up the tree.

## Interview Follow-up Questions

1. How would this simplify if the tree were specifically a Binary
   *Search* Tree, using the BST ordering property? (See
   [Lowest Common Ancestor of a BST](../binary-search-tree/lowest-common-ancestor-of-a-bst.md).)
2. How would you find the LCA if nodes also had a `parent` pointer,
   without starting from the root at all?
3. How would you extend this to find the LCA of more than two nodes?

## Similar Questions

- Lowest Common Ancestor of a BST (see [../binary-search-tree/lowest-common-ancestor-of-a-bst.md](../binary-search-tree/lowest-common-ancestor-of-a-bst.md))
- Maximum Depth of Binary Tree (see [maximum-depth-of-binary-tree.md](maximum-depth-of-binary-tree.md))
- Binary Tree Level Order Traversal (see [binary-tree-level-order-traversal.md](binary-tree-level-order-traversal.md))

---
[← Back to Binary Tree](README.md) · [← Back to 65-dsa](../README.md)
