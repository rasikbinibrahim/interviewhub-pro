# Q1102 · Kth Smallest Element in a BST

**Difficulty:** Medium
**Companies Asked:** Amazon, Google, Microsoft, Meta
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Binary Search Tree
**Concepts:** in-order traversal, BST ordering property, early termination

## Problem Statement

Given the root of a binary search tree and an integer `k`, return the
`k`-th smallest value stored in the tree (`k` is 1-indexed — `k = 1`
means the smallest value overall).

## Input

- `root`: the root node of a BST (`{ value, left, right }` nodes)
- `k`: a positive integer, `1 <= k <= number of nodes in the tree`

## Output

A single number: the `k`-th smallest value in the BST.

## Constraints

- The number of nodes is in `[1, 10^4]`.
- `0 <= node.value <= 10^4`
- `1 <= k <= number of nodes`

## Examples

| Input | Output | Why |
|---|---|---|
| Tree `[3,1,4,null,2]` (root 3, left 1, right 4; 1 has right child 2), `k = 1` | `1` | Smallest value in the tree |
| Same tree, `k = 3` | `3` | In sorted order `1,2,3,4`, the 3rd value is `3` |

## Edge Cases

- `k` equals the total number of nodes → the maximum value in the tree
- `k = 1` → the minimum value in the tree
- Single-node tree → the only value, regardless of `k` (which must be
  `1`)

## Hints

1. A BST's structure already encodes sorted order — what traversal
   order visits BST nodes in ascending value order, without needing to
   collect and sort them separately?
2. An in-order traversal (left subtree, then node, then right subtree)
   visits every BST's nodes in strictly ascending order — the `k`-th
   node visited by this traversal is exactly the `k`-th smallest value.
3. You don't need to traverse the *entire* tree if `k` is small relative
   to the tree size — stop the traversal the moment you've visited the
   `k`-th node, rather than always visiting every node and then indexing
   into a collected list.

## Algorithm

**Pattern:** in-order traversal with early termination.
**Core insight:** an in-order traversal of a BST (left, node, right)
visits every node in strictly increasing value order — this is the BST
property's most direct consequence. Counting nodes as they're visited
and stopping the instant the count reaches `k` avoids the need to
collect every value into an array first, especially valuable when `k`
is much smaller than the total node count.
**Invariant:** by the time the traversal has visited `count` nodes,
those `count` nodes are exactly the `count` smallest values in the
entire tree, visited in ascending order.

## Dry Run

**Input:** tree `root=3` (left child `1`, right child `4`; `1` has right
child `2`), `k = 3`

In-order traversal order: `1, 2, 3, 4` (left subtree of 3 fully first,
then 3 itself, then right subtree)

| Node visited (in-order) | count after visiting | k reached? |
|---|---|---|
| `1` | 1 | no (need 3) |
| `2` | 2 | no |
| `3` | 3 | yes — return `3` |

**Result:** `3` — matches expected output.

## JavaScript Solution

```js
function kthSmallest(root, k) {
  let count = 0;
  let result = null;

  function inOrder(node) {
    if (node === null || result !== null) return;

    inOrder(node.left);

    if (result !== null) return; // short-circuit once found

    count++;
    if (count === k) {
      result = node.value;
      return;
    }

    inOrder(node.right);
  }

  inOrder(root);
  return result;
}
```

## TypeScript Solution

```ts
interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function kthSmallest<T>(root: TreeNode<T> | null, k: number): T | null {
  let count = 0;
  let result: T | null = null;

  function inOrder(node: TreeNode<T> | null): void {
    if (node === null || result !== null) return;

    inOrder(node.left);

    if (result !== null) return;

    count++;
    if (count === k) {
      result = node.value;
      return;
    }

    inOrder(node.right);
  }

  inOrder(root);
  return result;
}
```

## Time Complexity

O(h + k) — where `h` is the tree's height; in the worst case (large `k`)
this is O(n), but early termination means small `k` on a large tree
avoids visiting every node.

## Space Complexity

O(h) — the recursion call stack depth equals the tree's height.

## Common Mistakes

- Collecting all values via a full in-order traversal into an array,
  then indexing `array[k - 1]` — correct, but always does O(n) work even
  when `k` is small and stopping early would suffice.
- Off-by-one on `k` — since `k` is 1-indexed, the count check should be
  `count === k`, not `count === k - 1` or similar variants that shift
  the target.
- Forgetting to short-circuit the recursive calls once `result` is
  found — without the early-return checks, the traversal keeps
  descending into subtrees even after the answer is already known.

## Interview Follow-up Questions

1. How would you solve this with an iterative in-order traversal (an
   explicit stack) instead of recursion?
2. How would the approach change if the BST were frequently modified
   (insertions/deletions) and `kthSmallest` were called repeatedly — is
   there a way to avoid re-traversing from scratch each time?
3. How would you find the `k`-th *largest* value instead, with a minimal
   change to this approach?

## Similar Questions

- Validate Binary Search Tree (see [validate-binary-search-tree.md](validate-binary-search-tree.md))
- Lowest Common Ancestor of a BST (see [lowest-common-ancestor-of-a-bst.md](lowest-common-ancestor-of-a-bst.md))
- Binary Tree Level Order Traversal (see [../binary-tree/binary-tree-level-order-traversal.md](../binary-tree/binary-tree-level-order-traversal.md))

---
[← Back to Binary Search Tree](README.md) · [← Back to 65-dsa](../README.md)
