# Q6536 · Binary Tree Level Order Traversal (BFS Queue)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, bfs, queue, level-order, tree-traversal  

## Problem Statement

Given the `root` of a binary tree, return the **level order traversal** of its nodes' values (i.e., from left to right, level by level).

## Input

- `root`: `TreeNode | null` — root of binary tree

## Output

- `number[][]` — 2D array of node values grouped by depth level

## Constraints

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [3,9,20,null,null,15,7]` | `[[3],[9,20],[15,7]]` | Nodes grouped level by level |
| `root = [1]` | `[[1]]` | Single level |
| `root = []` | `[]` | Empty tree |

## Edge Cases

- `root === null` -> returns `[]`

## Hints

1. **Breadth-First Search (BFS) with Queue**: Use a FIFO Queue `queue = [root]`.
2. While `queue` is not empty, capture the current level size `levelSize = queue.length`.
3. Create an array `currentLevel = []`.
4. Loop `i` from `0` to `levelSize - 1`:
   - Dequeue node `curr = queue.shift()`.
   - Push `curr.val` into `currentLevel`.
   - If `curr.left` exists, push `curr.left` to `queue`.
   - If `curr.right` exists, push `curr.right` to `queue`.
5. Push `currentLevel` into `results`.

## Algorithm

**Pattern:** Level-by-Level FIFO Queue BFS  
**Core Insight:** Freezing `queue.length` at the start of each level loop guarantees that exactly the nodes belonging to the current depth level are processed together.

## Dry Run

`root = [3, 9, 20, null, null, 15, 7]`:
- `queue = [Node 3]`.
- **Level 1**: `levelSize = 1`. Dequeue 3 -> `currentLevel = [3]`. Enqueue 9, 20. `res = [[3]]`. `queue = [9, 20]`.
- **Level 2**: `levelSize = 2`. Dequeue 9 -> `currentLevel = [9]`. Dequeue 20 -> `currentLevel = [9, 20]`. Enqueue 15, 7. `res = [[3], [9, 20]]`. `queue = [15, 7]`.
- **Level 3**: `levelSize = 2`. Dequeue 15, 7 -> `currentLevel = [15, 7]`. `res = [[3], [9, 20], [15, 7]]`.
- Queue empty -> return `res`.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
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

function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
```

## Time Complexity

`O(N)` — visits every node in the binary tree once.

## Space Complexity

`O(N)` — maximum width of binary tree stored in queue (up to $N/2$ leaf nodes).

## Common Mistakes

- Using `queue.length` dynamically in loop condition `for (let i = 0; i < queue.length; i++)` while pushing children, breaking level boundary grouping.

## Follow-Up Questions

1. How would you solve Binary Tree Zigzag Level Order Traversal? (Reverse array order on alternating levels).

## Similar Questions

- Binary Tree Zigzag Level Order Traversal
- Binary Tree Right Side View
