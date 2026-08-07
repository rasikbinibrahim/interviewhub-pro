# Q1101 · Validate Binary Search Tree

**Difficulty:** Medium
**Companies Asked:** Google, Amazon, Microsoft, Meta, Adobe, Bloomberg
**Interview Frequency:** ★★★★★
**Category:** Data Structures & Algorithms → Binary Search Tree
**Concepts:** BST invariant, recursion with range bounds, in-order traversal

## Problem Statement

Given the root of a binary tree, determine whether it is a valid binary
search tree (BST). A valid BST requires that for *every* node: all
values in its left subtree are strictly less than the node's value, all
values in its right subtree are strictly greater, and both subtrees are
themselves valid BSTs — not just that the node's *immediate* children
satisfy the ordering, since that's insufficient (see Edge Cases).

## Input

`root`: the root node of a binary tree (`{ value, left, right }` nodes),
or `null` for an empty tree.

## Output

A boolean: `true` if the tree is a valid BST, `false` otherwise.

## Constraints

- `0 <= number of nodes <= 10^4`
- `-2^31 <= node value <= 2^31 - 1`
- Node values are not guaranteed distinct across the whole tree in the
  input, but a valid BST requires strict (`<`, `>`) ordering — equal
  values anywhere in a left/right relationship make it invalid.

## Examples

| Input (tree) | Output | Why |
|---|---|---|
| `[2, [1], [3]]` (root 2, left 1, right 3) | `true` | Left `<` root `<` right, everywhere |
| `[5, [1], [4, [3], [6]]]` (root 5, left 1, right 4 with children 3/6) | `false` | Node `4`'s right child is `4`'s subtree, but `4 < 5` violates the ROOT's right-subtree requirement (everything under root's right must be `> 5`) even though `4`'s own immediate children look locally fine |
| `[]` (empty tree) | `true` | Vacuously true — no nodes violate anything |

## Edge Cases

- Empty tree → `true` (vacuous truth, nothing to violate).
- Single-node tree → always `true` (nothing to compare against).
- A tree where every node's *immediate* left/right children look
  correctly ordered, but a deeper descendant violates an ancestor's
  bound (see Example 2 above) — this is the case that a naive "just
  compare each node to its direct children" solution gets wrong; the
  correct check must involve the entire chain of ancestor bounds, not
  just the immediate parent.
- Duplicate values anywhere in a left/right relationship → invalid,
  since the BST property requires strict inequality.

## Hints

1. Checking only `node.left.value < node.value < node.right.value` for
   every node is *not* sufficient — construct a small example where this
   passes locally at every node but the tree is still invalid overall
   (see Example 2).
2. Every node in a BST doesn't just need to satisfy its immediate
   parent's ordering — it needs to fall within a valid *range* inherited
   from every ancestor above it, which narrows as you go deeper.
3. Pass down a `(min, max)` bound pair as you recurse: a node must fall
   strictly within `(min, max)`; when recursing left, the new upper
   bound tightens to the current node's value; when recursing right, the
   new lower bound tightens to it.

## Algorithm

**Pattern:** recursion with a propagated valid-range constraint.
**Core insight:** a node's validity depends on constraints from *every*
ancestor, not just its direct parent — so instead of comparing a node
only to its immediate children, each recursive call carries the
tightest `(min, max)` bound accumulated from the whole path down from
the root. Recursing into the left subtree tightens the upper bound to
the current node's value (everything there must be smaller); recursing
right tightens the lower bound (everything there must be larger).
**Invariant:** at the start of every recursive call, `(min, max)`
correctly represents the full range every value in that subtree is
*required* to fall within, given every BST constraint imposed by every
ancestor above it — not just its immediate parent.

## Dry Run

**Input:** root `5`, left child `1`, right child `4` (which has left
child `3` and right child `6`) — the invalid example from above.

```
        5
       / \
      1   4
         / \
        3   6
```

| Call | (min, max) | Node value | In range? | Recurse |
|---|---|---|---|---|
| `isValid(5, -Inf, +Inf)` | `(-Inf, +Inf)` | 5 | yes | left with `(-Inf, 5)`, right with `(5, +Inf)` |
| `isValid(1, -Inf, 5)` | `(-Inf, 5)` | 1 | yes | both children null → true |
| `isValid(4, 5, +Inf)` | `(5, +Inf)` | 4 | **4 is not > 5 → FALSE** | short-circuits, no need to check 3 or 6 |

**Result:** `false` — node `4` looks locally fine sitting under its own
parent (`4`'s value doesn't need to compare to `1`), but it violates the
constraint inherited from the ROOT: everything in the root's right
subtree must be greater than `5`, and `4` isn't.

## JavaScript Solution

```js
function isValidBST(root) {
  function validate(node, min, max) {
    if (node === null) {
      return true; // an empty subtree can never violate anything
    }

    // The node must fall strictly within the range inherited from
    // every ancestor above it — not just compare to its direct parent.
    if (node.value <= min || node.value >= max) {
      return false;
    }

    return (
      validate(node.left, min, node.value) &&   // left subtree's upper bound tightens
      validate(node.right, node.value, max)     // right subtree's lower bound tightens
    );
  }

  return validate(root, -Infinity, Infinity);
}
```

## TypeScript Solution

```ts
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, min: number, max: number): boolean {
    if (node === null) {
      return true;
    }

    if (node.value <= min || node.value >= max) {
      return false;
    }

    return (
      validate(node.left, min, node.value) &&
      validate(node.right, node.value, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}
```

## Time Complexity

O(n) — each node is visited once; the recursion short-circuits (`&&`)
as soon as any violation is found, but worst case (a valid tree, or an
invalid one where the violation is at the very last node checked) still
visits every node.

## Space Complexity

O(h) for the recursion call stack, where h is the tree's height — O(log
n) balanced, O(n) worst-case skewed.

## Common Mistakes

- Only comparing each node against its immediate children
  (`node.left.value < node.value < node.right.value`) — this misses
  violations against *non-adjacent* ancestors, exactly the bug shown in
  the dry run above.
- Not handling duplicate values correctly — using `<=`/`>=` instead of
  strict `<`/`>` for the BST property itself (a value equal to an
  ancestor's bound is invalid, which is why the range check uses `<=
  min || >= max` to reject it).
- Forgetting that an in-order traversal of a valid BST must produce
  strictly increasing values — an alternative, equally valid solution
  compares each visited value to the previous one during an in-order
  walk instead of tracking bounds, and forgetting the "strictly"
  increasing requirement there causes the same duplicate-value bug.

## Interview Follow-up Questions

1. How would you solve this using an iterative in-order traversal with
   an explicit stack instead of recursion with bounds?
2. What would you need to change to allow duplicate values on one side
   only (e.g. a variant BST where duplicates are always inserted to the
   right)?
3. How would you find the two nodes that were swapped if the tree is
   "almost" a valid BST except for exactly one accidental swap (Recover
   Binary Search Tree)?
4. Given a valid BST, how would you find the k-th smallest value
   efficiently, reusing the in-order-traversal insight from this
   problem?

## Similar Questions

- Recover Binary Search Tree
- Kth Smallest Element in a BST
- Convert Sorted Array to Binary Search Tree

---
[← Back to Binary Search Tree](README.md) · [← Back to 65-dsa](../README.md)
