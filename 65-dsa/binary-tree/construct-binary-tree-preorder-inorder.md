# Q6598 · Construct Binary Tree from Preorder and Inorder Traversal

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, recursion, divide-and-conquer, hash-map  

## Problem Statement

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the **binary tree**.

## Input

- `preorder`: `number[]` — preorder traversal array
- `inorder`: `number[]` — inorder traversal array

## Output

- `TreeNode | null` — root of constructed binary tree

## Constraints

- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder` and `inorder` consist of **unique** values.

## Examples

| Input | Output | Why |
|---|---|---|
| `preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]` | `[3,9,20,null,null,15,7]` | Reconstructed binary tree |
| `preorder = [-1], inorder = [-1]` | `[-1]` | Single node tree |

## Algorithm

**Pattern:** Hash Map Lookup Divide and Conquer Recursion  
**Core Insight:** The first element of `preorder` is always the root. Locating the root's index in `inorder` divides the tree into left and right subtrees.

```javascript
function buildTree(preorder, inorder) {
  const inMap = new Map();
  inorder.forEach((val, idx) => inMap.set(val, idx));

  let preIdx = 0;

  function helper(left, right) {
    if (left > right) return null;

    const rootVal = preorder[preIdx++];
    const root = new TreeNode(rootVal);
    const inIdx = inMap.get(rootVal);

    root.left = helper(left, inIdx - 1);
    root.right = helper(inIdx + 1, right);

    return root;
  }

  return helper(0, inorder.length - 1);
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` with $O(1)$ Hash Map index lookup.
- **Space Complexity:** `O(N)` for Hash Map and recursion call stack.
