# Q6594 · Maximum Width of Binary Tree (BFS Positional Indexing)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, bfs, level-order, positional-indexing, BigInt  

## Problem Statement

Given the `root` of a binary tree, return the **maximum width** of the given tree.

The **maximum width** of a tree is the maximum width among all levels.

The **width** of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is guaranteed that the answer will in the range of a **32-bit signed integer**.

## Input

- `root`: `TreeNode | null` — root of binary tree

## Output

- `number` — maximum width integer

## Constraints

- The number of nodes in the tree is in the range `[1, 3000]`.
- `-100 <= Node.val <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [1,3,2,5,3,null,9]` | `4` | Level 3 nodes [5,3,null,9] span width 4 |
| `root = [1,3,2,5,null,null,9,6,null,7]` | `7` | Level 4 nodes span width 7 |
| `root = [1,3,2,5]` | `2` | Max width is 2 at level 2 |

## Edge Cases

- `root === null` -> returns `0`

## Hints

1. **Complete Binary Tree Positional Indexing**:
   - If parent node is at index `i`:
     - Left child index = `2 * i`.
     - Right child index = `2 * i + 1`.
2. **Width at Level**: `width = rightmostIndex - leftmostIndex + 1`.
3. **Prevent BigInt Integer Overflow**:
   - At each level, subtract `leftmostIndex` from node indices (`index = index - levelStart`) to prevent indices from exceeding 32-bit integer limits on deep trees.

## Algorithm

**Pattern:** BFS Level-Order Normalized Heap Indexing  
**Core Insight:** Normalizing child positional indices (`2 * index`) by subtracting the level start index keeps positional numbers small while capturing complete tree gap distances.

## Dry Run

`root = [1, 3, 2, 5, 3, null, 9]`:
- Level 1: `[root, index 0]`. Width = `0 - 0 + 1 = 1`.
- Level 2: `[(3, 0), (2, 1)]`. Width = `1 - 0 + 1 = 2`.
- Level 3: `[(5, 0), (3, 1), (9, 3)]`. Width = `3 - 0 + 1 = 4`.
- Max Width = `4`. Return `4`.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function widthOfBinaryTree(root) {
  if (root === null) return 0;

  let maxWidth = 0;
  // Queue stores pairs: [node, normalizedIndex]
  const queue = [[root, 0]];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelStart = queue[0][1]; // Leftmost index
    let firstIndex = 0;
    let lastIndex = 0;

    for (let i = 0; i < levelSize; i++) {
      const [node, index] = queue.shift();
      const normalizedIndex = index - levelStart; // Normalization prevents overflow!

      if (i === 0) firstIndex = normalizedIndex;
      if (i === levelSize - 1) lastIndex = normalizedIndex;

      if (node.left) {
        queue.push([node.left, 2 * normalizedIndex]);
      }
      if (node.right) {
        queue.push([node.right, 2 * normalizedIndex + 1]);
      }
    }

    maxWidth = Math.max(maxWidth, lastIndex - firstIndex + 1);
  }

  return maxWidth;
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

function widthOfBinaryTree(root: TreeNode | null): number {
  if (root === null) return 0;

  let maxWidth = 0;
  const queue: Array<[TreeNode, number]> = [[root, 0]];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelStart = queue[0][1];
    let firstIndex = 0;
    let lastIndex = 0;

    for (let i = 0; i < levelSize; i++) {
      const [node, index] = queue.shift()!;
      const normalizedIndex = index - levelStart;

      if (i === 0) firstIndex = normalizedIndex;
      if (i === levelSize - 1) lastIndex = normalizedIndex;

      if (node.left) {
        queue.push([node.left, 2 * normalizedIndex]);
      }
      if (node.right) {
        queue.push([node.right, 2 * normalizedIndex + 1]);
      }
    }

    maxWidth = Math.max(maxWidth, lastIndex - firstIndex + 1);
  }

  return maxWidth;
}
```

## Time Complexity

`O(N)` — visits every binary tree node once.

## Space Complexity

`O(N)` — queue space storing max level width.

## Common Mistakes

- Failing to subtract `levelStart` from indices, causing integer overflow on skewed trees of depth $>53$ (exceeding `Number.MAX_SAFE_INTEGER`).

## Follow-Up Questions

1. How would you solve this problem using BigInt numbers instead of index normalization?

## Similar Questions

- Binary Tree Level Order Traversal
- Populating Next Right Pointers in Each Node
