# Q6576 · Construct Binary Tree from Inorder and Postorder Traversal

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, recursion, inorder-traversal, postorder-traversal, hash-map  

## Problem Statement

Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return the binary tree.

## Input

- `inorder`: `number[]` — inorder traversal array (`Left -> Root -> Right`)
- `postorder`: `number[]` — postorder traversal array (`Left -> Right -> Root`)

## Output

- `TreeNode | null` — root of reconstructed binary tree

## Constraints

- `1 <= inorder.length <= 3000`
- `postorder.length == inorder.length`
- `-3000 <= inorder[i], postorder[i] <= 3000`
- `inorder` and `postorder` consist of **unique** values.
- Each value of `postorder` appears in `inorder`.

## Examples

| Input | Output | Why |
|---|---|---|
| `inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]` | `[3,9,20,null,null,15,7]` | Root 3 at end of postorder array |
| `inorder = [-1], postorder = [-1]` | `[-1]` | Single node tree |

## Edge Cases

- Empty input arrays -> returns `null`

## Hints

1. **Root is at the END of Postorder**:
   - The last element of `postorder` array is ALWAYS the current subtree `root`!
2. Locate `root.val` inside `inorder` array at index `inIndex`.
   - Elements to the left `[inStart...inIndex - 1]` belong to the **Left Subtree**.
   - Elements to the right `[inIndex + 1...inEnd]` belong to the **Right Subtree**.
3. Use a Hash Map `inorderMap` to lookup `inIndex` in $O(1)$ time.
4. **CRITICAL RECURSION ORDER**: Build **Right Subtree BEFORE Left Subtree** because `postorder.pop()` processes right descendants first!

## Algorithm

**Pattern:** Postorder Pop Root Traversal Mapping  
**Core Insight:** Popping elements backwards from `postorder` yields root nodes sequentially, while Inorder hash maps split left and right subtree child boundaries.

## Dry Run

`inorder = [9, 3, 15, 20, 7], postorder = [9, 15, 7, 20, 3]`:
- Pop `postorder`: 3. `root = 3`. `inIndex = 1`.
- Recurse Right `[2...4]`: Pop `postorder`: 20. `3.right = 20`.
- Recurse Right `[4...4]`: Pop `postorder`: 7. `20.right = 7`.
- Recurse Left `[2...2]`: Pop `postorder`: 15. `20.left = 15`.
- Recurse Left `[0...0]`: Pop `postorder`: 9. `3.left = 9`.
- Return Root 3.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(inorder, postorder) {
  const inorderMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  function helper(inStart, inEnd) {
    if (inStart > inEnd) return null;

    const rootVal = postorder.pop();
    const root = new TreeNode(rootVal);
    const inIndex = inorderMap.get(rootVal);

    // Build RIGHT subtree before LEFT subtree!
    root.right = helper(inIndex + 1, inEnd);
    root.left = helper(inStart, inIndex - 1);

    return root;
  }

  return helper(0, inorder.length - 1);
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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  const inorderMap = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  function helper(inStart: number, inEnd: number): TreeNode | null {
    if (inStart > inEnd) return null;

    const rootVal = postorder.pop()!;
    const root = new TreeNode(rootVal);
    const inIndex = inorderMap.get(rootVal)!;

    root.right = helper(inIndex + 1, inEnd);
    root.left = helper(inStart, inIndex - 1);

    return root;
  }

  return helper(0, inorder.length - 1);
}
```

## Time Complexity

`O(N)` — constructing $N$ nodes using $O(1)$ Hash Map index lookups.

## Space Complexity

`O(N)` — to store `inorderMap` and recursive call stack.

## Common Mistakes

- Reversing recursion order (building Left before Right), which consumes postorder tokens out of alignment and distorts tree geometry.

## Follow-Up Questions

1. How does Construct Binary Tree from Preorder and Inorder Traversal differ in recursion order?

## Similar Questions

- Construct Binary Tree from Preorder and Inorder Traversal
- Binary Tree Inorder Traversal
