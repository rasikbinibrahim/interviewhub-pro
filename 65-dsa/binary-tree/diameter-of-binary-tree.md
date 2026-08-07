# Q1003 · Diameter of Binary Tree

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Microsoft, Google
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Binary Tree
**Concepts:** post-order recursion, tracking a global max alongside a returned height

## Problem Statement

Given the root of a binary tree, return the length (in number of edges)
of the diameter — the longest path between any two nodes in the tree.
This path may or may not pass through the root.

## Input

`root`: the root node of a binary tree (`{ value, left, right }` nodes),
or `null` for an empty tree.

## Output

A single integer: the number of edges on the longest path between any
two nodes.

## Constraints

- `0 <= number of nodes <= 10^4`
- `-100 <= node.value <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| Tree with root `1`, children `2, 3`; `2` has children `4, 5` | `3` | Longest path is `4 - 2 - 1 - 3` (or `5 - 2 - 1 - 3`), 3 edges |
| `[1,2]` (root `1`, single left child `2`) | `1` | The only path is `1 - 2`, one edge |
| `[]` (empty tree) | `0` | No nodes, no path |

## Edge Cases

- Empty tree → `0`
- Single node → `0` (no path possible between only one node)
- The longest path doesn't pass through the root at all (entirely
  within one subtree) → must still be found, not just the path through
  the root

## Hints

1. The diameter *at* a given node is the sum of the heights of its left
   and right subtrees — but the overall answer might come from a node
   deep inside a subtree, not necessarily the root. What needs to be
   tracked *while* computing height, rather than only after?
2. A recursive height function naturally visits every node once — what
   if, as a side effect of computing each node's height, you also
   checked whether *that node's own* left-height + right-height beats
   the best diameter seen anywhere so far?
3. Keep a variable outside the recursive height function that tracks the
   global maximum diameter found at any node, updating it every time a
   node's local `leftHeight + rightHeight` exceeds the current best —
   the function's *return value* stays "height," while the *side
   effect* tracks "best diameter so far."

## Algorithm

**Pattern:** post-order recursion computing height, with a global
maximum diameter tracked as a side effect.
**Core insight:** the diameter passing *through* any specific node
equals the height of its left subtree plus the height of its right
subtree (each measured in edges to the deepest leaf). Because the
overall tree's diameter might be entirely contained within one subtree
(not passing through the root at all), every single node needs this
check, not just the root — a post-order traversal (children fully
processed before the parent) naturally provides both subtree heights
exactly when a node is visited, letting the diameter check happen
inline with the height computation, at every node, in one pass.
**Invariant:** after the recursive call on a subtree returns, `maxDiameter`
correctly reflects the largest diameter found among all nodes processed
so far (which, since it's post-order, is every node in that subtree).

## Dry Run

**Input:** tree with root `1` (children `2, 3`), `2` has children `4, 5`
(both leaves)

| Node visited (post-order) | leftHeight | rightHeight | Local diameter (sum) | maxDiameter after |
|---|---|---|---|---|
| `4` (leaf) | 0 | 0 | 0 | 0 |
| `5` (leaf) | 0 | 0 | 0 | 0 |
| `2` | height(4)=1 | height(5)=1 | `1 + 1 = 2` | 2 |
| `3` (leaf) | 0 | 0 | 0 | 2 |
| `1` (root) | height(2)=2 | height(3)=1 | `2 + 1 = 3` | 3 |

**Result:** `3` — matches expected output (path `4-2-1-3` or `5-2-1-3`).

## JavaScript Solution

```js
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  function height(node) {
    if (node === null) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // The diameter passing through THIS node — checked at every node,
    // not just the root, since the true diameter might live entirely
    // inside one subtree.
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);
  return maxDiameter;
}
```

## TypeScript Solution

```ts
interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function diameterOfBinaryTree<T>(root: TreeNode<T> | null): number {
  let maxDiameter = 0;

  function height(node: TreeNode<T> | null): number {
    if (node === null) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);
  return maxDiameter;
}
```

## Time Complexity

O(n) — every node is visited exactly once by the post-order recursion.

## Space Complexity

O(h) — the recursion call stack depth equals the tree's height, `h`
(worst case O(n) for a completely unbalanced tree, O(log n) for a
balanced one).

## Common Mistakes

- Computing height and diameter as two entirely separate traversals
  (calling a height function from within a diameter function at every
  node) — correct, but O(n²) in the worst case, since height gets
  recomputed for every subtree repeatedly.
- Only checking `leftHeight + rightHeight` at the root, not at every
  node — misses cases where the true longest path is entirely within
  one subtree.
- Confusing diameter (in *edges*) with a node-count-based measurement —
  the height function here already returns edge-based height by
  construction (`0` for `null`), so the sum directly gives edge count.

## Interview Follow-up Questions

1. How would you also return the actual path (the sequence of node
   values), not just its length?
2. How would this generalize to an N-ary tree instead of a binary tree?
3. How would you solve this iteratively instead of recursively, avoiding
   the O(h) call stack?

## Similar Questions

- Maximum Depth of Binary Tree (see [maximum-depth-of-binary-tree.md](maximum-depth-of-binary-tree.md))
- Balanced Binary Tree
- Binary Tree Maximum Path Sum

---
[← Back to Binary Tree](README.md) · [← Back to 65-dsa](../README.md)
