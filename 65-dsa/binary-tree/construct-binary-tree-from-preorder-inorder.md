# Q6546 · Construct Binary Tree from Preorder and Inorder Traversal

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, recursion, divide-and-conquer, hash-map  

## Problem Statement

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

## Input

- `preorder`: `number[]` — root-left-right node sequence
- `inorder`: `number[]` — left-root-right node sequence

## Output

- `TreeNode | null` — root of reconstructed binary tree

## Constraints

- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder` and `inorder` consist of **unique** values.
- Each value of `inorder` also appears in `preorder`.

## Examples

| Input | Output | Why |
|---|---|---|
| `preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]` | `[3,9,20,null,null,15,7]` | Reconstructed original binary tree |
| `preorder = [-1], inorder = [-1]` | `[-1]` | Single node tree |

## Edge Cases

- Arrays of length 1 `[-1]`

## Hints

1. **Preorder Property**: `preorder[0]` is **ALWAYS the root node** of the current subtree.
2. **Inorder Property**: Locate `root.val` inside `inorder` at index `rootIndex`.
   - All elements to the left of `rootIndex` belong to the **left subtree**.
   - All elements to the right of `rootIndex` belong to the **right subtree**.
3. **Map Index Optimization**: Build a Hash Map `inorderMap` (`val -> index`) to perform $O(1)$ root index lookups inside `inorder`.

## Algorithm

**Pattern:** Preorder Root Identification Divide-and-Conquer  
**Core Insight:** Preorder provides root node identities sequentially while Inorder divides subtrees into left and right boundaries.

## Dry Run

`preorder = [3, 9, 20, 15, 7]`, `inorder = [9, 3, 15, 20, 7]`:
- `preorder[0]` = 3 -> Root = Node 3.
- Inorder index of 3 is 1:
  - Left subtree inorder: `[9]` (len 1). Left subtree preorder: `[9]`.
  - Right subtree inorder: `[15, 20, 7]` (len 3). Right subtree preorder: `[20, 15, 7]`.
- Recurse left: Root = 9 (children null).
- Recurse right: Root = 20, left = 15, right = 7.
- Result: Tree `[3, 9, 20, null, null, 15, 7]`.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(preorder, inorder) {
  const inorderMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  let preorderIndex = 0;

  function build(inStart, inEnd) {
    if (inStart > inEnd) {
      return null;
    }

    const rootVal = preorder[preorderIndex++];
    const root = new TreeNode(rootVal);
    const inIndex = inorderMap.get(rootVal);

    // Build left subtree first (matches preorder sequence)
    root.left = build(inStart, inIndex - 1);
    root.right = build(inIndex + 1, inEnd);

    return root;
  }

  return build(0, inorder.length - 1);
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const inorderMap = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  let preorderIndex = 0;

  function build(inStart: number, inEnd: number): TreeNode | null {
    if (inStart > inEnd) {
      return null;
    }

    const rootVal = preorder[preorderIndex++];
    const root = new TreeNode(rootVal);
    const inIndex = inorderMap.get(rootVal)!;

    root.left = build(inStart, inIndex - 1);
    root.right = build(inIndex + 1, inEnd);

    return root;
  }

  return build(0, inorder.length - 1);
}
```

## Time Complexity

`O(N)` — single pass constructing $N$ nodes using $O(1)$ Hash Map index lookups.

## Space Complexity

`O(N)` — for Hash Map and recursive call stack.

## Common Mistakes

- Using `inorder.indexOf(rootVal)` inside recursive calls ($O(N^2)$ time), causing performance bottlenecks for large trees. Use `inorderMap`.

## Follow-Up Questions

1. How would you construct a binary tree from Postorder and Inorder traversals? (Iterate `postorderIndex` backwards from `N - 1` and build `right` subtree first).

## Similar Questions

- Construct Binary Tree from Inorder and Postorder Traversal
- Serialize and Deserialize Binary Tree
