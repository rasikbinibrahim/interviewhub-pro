# Q6642 · Validate Binary Search Tree (Boundary Bounds Recursion)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Tree
**Concepts:** bst, recursion, binary-tree

## Problem Statement

Write a function `isValidBST(root)` that returns `true` if a binary tree
is a valid binary search tree — every node's value strictly greater than
every value in its left subtree and strictly less than every value in
its right subtree — and `false` otherwise.

## Input

`root`: the root of a binary tree (`null` for an empty tree).

## Output

A boolean: `true` if the tree satisfies the BST property everywhere,
`false` otherwise.

## Constraints

`0 <= number of nodes <= 10^4`, node values fit in a 32-bit integer

## Examples

| Input | Output | Why |
|---|---|---|
| `{"val":2,"left":{"val":1,"left":null,"right":null},"right":{"val":3,"left":null,"right":null}}` | `true` | `1 < 2 < 3`, and the property holds throughout |
| `{"val":5,"left":{"val":1,"left":null,"right":null},"right":{"val":4,"left":{"val":3,"left":null,"right":null},"right":{"val":6,"left":null,"right":null}}}` | `false` | `4` is the right child of `5`, but `4 < 5` — a right child must be *greater* than its ancestor |
| `null` | `true` | An empty tree is vacuously a valid BST |

## Edge Cases

- Empty tree → `true` (vacuously valid)
- Single node → `true`, regardless of its value
- A node that's locally fine relative to its *immediate* parent but
  violates the property relative to a further-up ancestor (the classic
  `[5,1,4,null,null,3,6]` trap) → `false`; local-only checks aren't
  sufficient
- Duplicate values anywhere in the tree → `false`, since the BST
  property requires *strict* inequality, not `<=`/`>=`

## Hints

1. Checking only that `node.left.val < node.val < node.right.val` for
   every node isn't enough — a node deep in a left subtree could still
   be larger than an ancestor several levels up, even if it's smaller
   than its immediate parent. What additional information does each
   recursive call need to catch that?
2. Pass down a valid *range* (`min`, `max`) that the current node's value
   must fall within — as you recurse into a left child, that child's
   valid range's upper bound tightens to the parent's value; recursing
   into a right child tightens the lower bound instead.
3. A node violates the BST property the moment its value falls outside
   the range accumulated from *every* ancestor above it, not just its
   immediate parent — checking against the passed-down `min`/`max` at
   every node catches this correctly.

## Algorithm

**Pattern:** recursive validation with propagated value bounds.
**Core insight:** the BST property isn't just a *local* constraint
between a node and its immediate children — it's a *global* constraint
relative to every ancestor. A node in a left subtree must be smaller
than every ancestor it's a left-descendant of, not just its direct
parent. Propagating a shrinking `(min, max)` range down through the
recursion captures this exactly: starting with no bounds at the root,
descending left tightens the upper bound to the parent's value (every
left descendant must stay below it), and descending right tightens the
lower bound the same way — so by the time any node is checked, its
`(min, max)` range already reflects every relevant ancestor constraint.
**Invariant:** whenever `validate(node, min, max)` is called, `node`'s
value is only valid if it falls strictly between `min` and `max` — and
those bounds are guaranteed to correctly reflect every BST constraint
imposed by every ancestor of `node`, not merely its immediate parent.

## Dry Run

**Input:** `5` (root) with left child `1`, right child `4` (which has
left child `3`, right child `6`)

| Call | min | max | node.val | valid range check | recurse |
|---|---|---|---|---|---|
| `validate(5, null, null)` | – | – | 5 | no bounds, passes | left: `validate(1, null, 5)`, right: `validate(4, 5, null)` |
| `validate(1, null, 5)` | null | 5 | 1 | `1 < 5` ✓ | both children null → `true` |
| `validate(4, 5, null)` | 5 | null | 4 | `4 <= min(5)` → **fails** | returns `false` immediately |

Since `validate(4, 5, null)` returns `false`, the overall `&&` short-
circuits. **Result:** `false` — matches expected output.

## JavaScript Solution

```js
function isValidBST(root) {
  function validate(node, min, max) {
    if (node === null) return true;
    if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) {
      return false;
    }
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }

  return validate(root, null, null);
}
```

## TypeScript Solution

```ts
interface TreeNodeLike {
  val: number;
  left: TreeNodeLike | null;
  right: TreeNodeLike | null;
}

function isValidBST(root: TreeNodeLike | null): boolean {
  function validate(node: TreeNodeLike | null, min: number | null, max: number | null): boolean {
    if (node === null) return true;
    if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) {
      return false;
    }
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }

  return validate(root, null, null);
}
```

## Time Complexity

O(n) — every node is visited exactly once (unless an invalid node is
found earlier, short-circuiting the remaining checks).

## Space Complexity

O(H) — recursion stack depth proportional to the tree's height H (O(log
n) for a balanced tree, O(n) for a fully skewed one).

## Common Mistakes

- Checking only `node.left.val < node.val < node.right.val` locally at
  every node — misses violations from further-up ancestors, like the
  classic `[5,1,4,null,null,3,6]` case where `4` (as `5`'s right child)
  is individually fine relative to its own children but invalid
  relative to `5`.
- Performing an in-order traversal and checking the resulting sequence
  is sorted — also a correct and common approach, but requires either
  extra space to store the full sequence or careful "compare against
  previous value" bookkeeping during the traversal.
- Using `<=`/`>=` instead of strict `<`/`>` when checking bounds — the
  BST property (as commonly defined, including in this problem)
  requires strictly distinct values; treating equal values as valid
  would incorrectly accept trees containing duplicates.

## Interview Follow-up Questions

1. How would you solve this using in-order traversal and a
   "previous value" comparison instead of propagated bounds?
2. How would you adapt this if the BST property allowed duplicate
   values in a specific position (e.g. duplicates only allowed in the
   left subtree)?
3. How would you find the two nodes that were incorrectly swapped, given
   a BST that's invalid due to exactly one swapped pair (a related,
   harder problem)?

## Similar Questions

- Kth Smallest Element in a BST (see [kth-smallest-element-in-a-bst.md](kth-smallest-element-in-a-bst.md))
- Serialize and Deserialize Binary Tree (see [serialize-and-deserialize-binary-tree.md](serialize-and-deserialize-binary-tree.md))
