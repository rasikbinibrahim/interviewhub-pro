# Q1103 · Lowest Common Ancestor of a BST

**Difficulty:** Easy
**Companies Asked:** Amazon, Microsoft, Meta, Google
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Binary Search Tree
**Concepts:** BST ordering property, single-pass descent

## Problem Statement

Given the root of a binary search tree and two nodes `p` and `q` known
to exist in the tree, return their lowest common ancestor (LCA) — the
deepest node that has both `p` and `q` as descendants (a node counts as
a descendant of itself).

## Input

- `root`: the root node of a BST (`{ value, left, right }` nodes)
- `p`, `q`: two node references known to exist in the tree

## Output

The node reference that is the lowest common ancestor of `p` and `q`.

## Constraints

- The number of nodes is in `[2, 10^5]`.
- All node values are unique.
- `p` and `q` both exist in the tree and are distinct.

## Examples

| Input | Output | Why |
|---|---|---|
| BST rooted at `6`; `p = 2`, `q = 8` (on opposite sides of the root) | `6` | `2 < 6 < 8` — the root is exactly where the search paths diverge |
| BST rooted at `6`; `p = 2`, `q = 4` (`4` is a descendant of `2`) | `2` | Both values are `< 6`, so the search continues left; `2` is itself an ancestor of `4` |

## Edge Cases

- One of `p`/`q` is an ancestor of the other → the answer is that
  ancestor itself
- `p` and `q` are on opposite sides of the root → the root is
  immediately the LCA
- `p` or `q` equals the root → the root is trivially the LCA (every
  node is a descendant of the root)

## Hints

1. The general binary-tree LCA algorithm (search both subtrees, combine
   results) works here too, but doesn't use the BST's ordering property
   at all — what extra information does a BST give you that a plain
   binary tree doesn't?
2. At any node, compare its value to both `p.value` and `q.value`. If
   both targets are smaller, the LCA must be in the left subtree — the
   BST property guarantees the current node can't be an ancestor of
   anything smaller than itself on the correct path. Symmetric reasoning
   applies if both are larger.
3. The search only needs to go in *one* direction at a time (left, or
   right, never both) — the moment `p` and `q` fall on different sides
   of the current node's value (or one of them *is* the current node),
   that node is the answer; no backtracking or combining two subtree
   results is needed, unlike the general binary tree case.

## Algorithm

**Pattern:** single-pass descent using the BST ordering property.
**Core insight:** in a BST, comparing the current node's value against
both `p.value` and `q.value` immediately tells you which direction (if
any) both targets lie in. If both are strictly less than the current
node, both must be in the left subtree, so the LCA can't be here — move
left. If both are strictly greater, move right. The moment neither
condition holds (values are on opposite sides, or the current node
equals one of the targets), the current node is provably the LCA — no
combining of two subtree searches is required, unlike the general
binary tree version.
**Invariant:** at every step of the descent, both `p` and `q` are
guaranteed to still be descendants of the current node — the search
never moves toward a subtree that could exclude either target.

## Dry Run

**Input:** BST rooted at `6` (left subtree contains `2`, right subtree
contains `8`); `p = 2`, `q = 8`

| Current node | p.value vs node | q.value vs node | Action |
|---|---|---|---|
| `6` | `2 < 6` | `8 > 6` | Different sides → `6` is the LCA, return immediately |

**Result:** `6` — matches expected output.

**Second example:** `p = 2`, `q = 4` (both under the left subtree)

| Current node | p.value vs node | q.value vs node | Action |
|---|---|---|---|
| `6` | `2 < 6` | `4 < 6` | Both smaller → move left, `current = 2` |
| `2` | `2 === 2` (this IS p) | `4 > 2` | Not both same side anymore (current node is one of the targets) → `2` is the LCA |

**Result:** `2` — matches expected output.

## JavaScript Solution

```js
function lowestCommonAncestorBST(root, p, q) {
  let current = root;

  while (current !== null) {
    if (p.value < current.value && q.value < current.value) {
      current = current.left;
    } else if (p.value > current.value && q.value > current.value) {
      current = current.right;
    } else {
      // Either they're on opposite sides, or current IS p or q —
      // either way, this is the divergence point.
      return current;
    }
  }

  return null; // unreachable given the problem's guarantees
}
```

## TypeScript Solution

```ts
interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function lowestCommonAncestorBST<T>(
  root: TreeNode<T>,
  p: TreeNode<T>,
  q: TreeNode<T>,
): TreeNode<T> | null {
  let current: TreeNode<T> | null = root;

  while (current !== null) {
    if (p.value < current.value && q.value < current.value) {
      current = current.left;
    } else if (p.value > current.value && q.value > current.value) {
      current = current.right;
    } else {
      return current;
    }
  }

  return null;
}
```

## Time Complexity

O(h) — where `h` is the tree's height; the search only ever moves in one
direction, never branching into both subtrees.

## Space Complexity

O(1) — implemented iteratively with a single pointer variable (a
recursive version would use O(h) stack space instead).

## Common Mistakes

- Using the general binary-tree LCA algorithm — correct, but ignores the
  BST ordering property, doing unnecessary work searching both subtrees
  when a single comparison-based decision would suffice.
- Using `<=`/`>=` instead of strict `<`/`>` when deciding direction —
  since node values are unique, equality means the current node *is* one
  of the targets, which should immediately return the current node
  rather than continuing to descend.
- Forgetting that `p` or `q` might equal the current node partway
  through the descent — this needs to be treated the same as "opposite
  sides," triggering an immediate return.

## Interview Follow-up Questions

1. How does this differ from the general Lowest Common Ancestor of a
   Binary Tree solution, and why can't the general algorithm's O(n) be
   improved to O(h) without the BST property?
2. How would you solve this recursively instead of iteratively?
3. How would you find the LCA if node values were *not* guaranteed
   unique?

## Similar Questions

- Lowest Common Ancestor of a Binary Tree (see [../binary-tree/lowest-common-ancestor-of-a-binary-tree.md](../binary-tree/lowest-common-ancestor-of-a-binary-tree.md))
- Validate Binary Search Tree (see [validate-binary-search-tree.md](validate-binary-search-tree.md))
- Kth Smallest Element in a BST (see [kth-smallest-element-in-a-bst.md](kth-smallest-element-in-a-bst.md))

---
[← Back to Binary Search Tree](README.md) · [← Back to 65-dsa](../README.md)
