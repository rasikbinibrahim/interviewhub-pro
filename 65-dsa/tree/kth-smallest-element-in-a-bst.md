# Q6641 · Kth Smallest Element in a BST (In-Order Iterative Stack)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Tree
**Concepts:** bst, inorder-traversal, stack

## Problem Statement

Write a function `kthSmallest(root, k)` that returns the `k`-th smallest
value (1-indexed) in a binary search tree, using an iterative traversal
(no recursion).

## Input

`root`: the root of a binary search tree. `k`: a positive integer,
`1 <= k <= (number of nodes in the tree)`.

## Output

The `k`-th smallest value stored in the tree.

## Constraints

`1 <= number of nodes <= 10^4`, `0 <= Node.val <= 10^4`

## Examples

```javascript
//       5
//      / \
//     3   6
//    / \
//   2   4
//  /
// 1
const tree = buildBST([5, 3, 6, 2, 4, null, null, 1]);
kthSmallest(tree, 3); // 3   (in-order: 1, 2, 3, 4, 5, 6 — 3rd is 3)
kthSmallest(tree, 1); // 1   (the smallest value overall)
```

## Edge Cases

- `k = 1` → the smallest value in the tree (the leftmost node)
- `k = number of nodes` → the largest value in the tree (the rightmost
  node)
- Single-node tree → that node's value, regardless of `k` (guaranteed
  `k = 1` in that case)
- Left-skewed or right-skewed tree (effectively a linked list) → still
  handled correctly, just with a deeper stack

## Hints

1. An in-order traversal of a BST (left, then node, then right) visits
   every value in strictly ascending sorted order — how does that let
   you find the k-th smallest without sorting anything explicitly?
2. Rather than collecting the entire in-order sequence into an array
   first, you can stop the traversal the moment you've visited exactly
   `k` nodes — the node you're at when the count reaches `k` is the
   answer.
3. Simulate the recursive in-order traversal with an explicit stack:
   push every left child while descending, then pop, "visit," and move
   right — this reaches nodes in the exact same order recursion would,
   without needing the call stack.

## Algorithm

**Pattern:** iterative in-order traversal with an explicit stack, early
termination at the k-th visit.
**Core insight:** the defining property of a BST — every left subtree
holds smaller values, every right subtree holds larger values — means an
in-order traversal (left subtree, current node, right subtree) always
visits nodes in strictly increasing sorted order. Rather than
materializing the full sorted sequence (which would need O(n) space
regardless of `k`), the traversal can simply stop as soon as it has
visited exactly `k` nodes, at which point the current node holds the
answer — often long before the traversal would otherwise finish.
**Invariant:** every time a node is popped from the stack and "visited"
(its value considered), it is guaranteed to be the next value in
ascending sorted order relative to every node visited so far.

## Dry Run

**Input:** the BST shown in the Examples section, `k = 3`

| Step | curr | stack after push-left descent | pop → visit | k after | k===0? |
|---|---|---|---|---|---|
| 1 | 5 | push 5, 3, 2, 1 (descending left each time) | pop `1` | 2 | no |
| 2 | (curr=1.right=null) | (nothing new to push) | pop `2` | 1 | no |
| 3 | (curr=2.right=null) | (nothing new to push) | pop `3` | 0 | **yes → return 3** |

**Result:** `3` — matches expected output.

## JavaScript Solution

```js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function kthSmallest(root, k) {
  const stack = [];
  let curr = root;
  let remaining = k;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    remaining--;
    if (remaining === 0) return curr.val;
    curr = curr.right;
  }

  return -1;
}
```

## TypeScript Solution

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let curr: TreeNode | null = root;
  let remaining: number = k;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop()!;
    remaining--;
    if (remaining === 0) return curr.val;
    curr = curr.right;
  }

  return -1;
}
```

## Time Complexity

O(H + k), where H is the tree's height — descending to the leftmost node
costs O(H), and each of the next `k` "visits" costs amortized O(1) per
step of the traversal; in the worst case (k close to n) this is O(n).

## Space Complexity

O(H) — the stack holds at most one path's worth of ancestor nodes at any
time.

## Common Mistakes

- Performing a full in-order traversal into an array first, then
  indexing `array[k - 1]` — correct, but always does O(n) work and uses
  O(n) space, even when `k` is small and the answer could be found much
  earlier.
- Using recursion instead of an explicit stack when the problem
  specifically asks for an iterative solution — recursion is simpler to
  write but relies on the call stack, which the iterative version
  avoids (relevant for very deep/unbalanced trees).
- Off-by-one between "0-indexed count" and "1-indexed k" — decrementing
  `k` and checking for `0` (as shown) is one correct convention, but
  it's easy to introduce an off-by-one if the counting direction is
  changed without adjusting the termination check.

## Interview Follow-up Questions

1. How would this change if the BST were frequently modified (inserts
   and deletes) and `kthSmallest` needed to be called many times —
   would you augment the tree with subtree size counts?
2. How would you find the k-th *largest* value instead, with a minimal
   change to this approach?
3. Why does in-order traversal specifically (not pre-order or
   post-order) produce sorted output for a BST?

## Similar Questions

- Validate Binary Search Tree (see [validate-binary-search-tree.md](validate-binary-search-tree.md))
- Serialize and Deserialize Binary Tree (see [serialize-and-deserialize-binary-tree.md](serialize-and-deserialize-binary-tree.md))
