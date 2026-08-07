# Q6514 · Invert Binary Tree (Tree Traversal)

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Meta, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, recursion, bfs, dfs, tree-traversal  

## Problem Statement

Given the `root` of a binary tree, invert the tree (mirror left and right children at every node), and return its `root`.

## Input

- `root`: `TreeNode | null` — root node of a binary tree

## Output

- `TreeNode | null` — root of the inverted binary tree

## Constraints

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [4,2,7,1,3,6,9]` | `[4,7,2,9,6,3,1]` | Left subtrees and right subtrees swapped at every depth |
| `root = [2,1,3]` | `[2,3,1]` | Left node 1 and right node 3 swapped |
| `root = []` | `[]` | Empty tree returns `null` |

## Edge Cases

- `root === null` (empty tree)
- Single node tree `[1]`

## Hints

1. **Recursive Depth-First Search**: For any node `root`, swap `root.left` and `root.right`.
2. Recursively call `invertTree(root.left)` and `invertTree(root.right)`.
3. Base case: if `root === null`, return `null`.

## Algorithm

**Pattern:** Tree Traversal DFS/BFS Swap  
**Core Insight:** Inverting a binary tree requires visiting every node and swapping its left pointer with its right pointer.

## Dry Run

`root = [2, 1, 3]`:
- Node `2`: swap `left` (Node 1) and `right` (Node 3) -> `2.left = 3`, `2.right = 1`.
- Recurse `invertTree(Node 3)`: children null -> return Node 3.
- Recurse `invertTree(Node 1)`: children null -> return Node 1.
- Return Node `2`. Result: `[2, 3, 1]`.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function invertTree(root) {
  if (root === null) {
    return null;
  }

  // Swap left and right pointers
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Recurse into children
  invertTree(root.left);
  invertTree(root.right);

  return root;
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

function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null;
  }

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
}
```

## Time Complexity

`O(N)` — visits every node in the binary tree exactly once.

## Space Complexity

`O(H)` — where `H` is tree height (`O(log N)` for balanced trees, `O(N)` worst-case for skewed trees).

## Common Mistakes

- Forgetting to save `root.left` in a temporary variable before assigning `root.left = root.right`, causing `root.right = root.left` to duplicate the right subtree.

## Follow-Up Questions

1. How would you implement this iteratively using a Queue (BFS Level Order Traversal)?

## Similar Questions

- Symmetric Tree
- Same Tree
