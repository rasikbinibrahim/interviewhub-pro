# Q6587 · Binary Tree Left Side View (BFS First-Node Level Order Traversal)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, bfs, level-order, left-view  

## Problem Statement

Given the `root` of a binary tree, imagine yourself standing on the **left side** of it, return the values of the nodes you can see ordered from top to bottom.

## Input

- `root`: `TreeNode | null` — root of binary tree

## Output

- `number[]` — array of node values visible from left side

## Constraints

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [1,2,3,null,5,null,4]` | `[1,2,5]` | Visible left side nodes from top to bottom |
| `root = [1,null,3]` | `[1,3]` | Right-skewed tree (3 is visible from left once level 1 completes) |
| `root = []` | `[]` | Empty tree |

## Edge Cases

- `root === null` -> returns `[]`

## Hints

1. **BFS Level Order Traversal**:
   - Process tree level by level using a Queue.
   - For each level, the **FIRST element** (`i === 0`) processed in `levelSize` is the leftmost visible node!
2. Push `queue.shift().val` to `result` when `i === 0`.

## Algorithm

**Pattern:** Level-Order Traversal First Element Capture  
**Core Insight:** Capturing the first node dequeued at each level of a BFS queue guarantees accurate left-side visibility even when right subtrees extend deeper than left subtrees.

## Dry Run

`root = [1, 2, 3, null, 5, null, 4]`:
- Level 1: `queue = [1]`. First element = 1 -> `res = [1]`. Enqueue 2, 3.
- Level 2: `queue = [2, 3]`. First element = 2 -> `res = [1, 2]`. Enqueue 5, 4.
- Level 3: `queue = [5, 4]`. First element = 5 -> `res = [1, 2, 5]`.
- Return `[1, 2, 5]`.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function leftSideView(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // First node of the current level is visible from the left!
      if (i === 0) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
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

function leftSideView(root: TreeNode | null): number[] {
  if (root === null) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;

      if (i === 0) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}
```

## Time Complexity

`O(N)` — visits every binary tree node once.

## Space Complexity

`O(N)` — queue size storing max level width.

## Common Mistakes

- Only traversing `node.left` pointers, missing right-hand subtrees that extend deeper than left subtrees.

## Follow-Up Questions

1. How would you return the Binary Tree Right Side View? (Capture the LAST element `i === levelSize - 1` at each BFS level).

## Similar Questions

- Binary Tree Right Side View
- Binary Tree Level Order Traversal
