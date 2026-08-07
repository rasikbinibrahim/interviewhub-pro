# Q6559 · Binary Tree Right Side View (BFS Level Order Traversal)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Binary Tree  
**Concepts:** binary-tree, bfs, level-order, right-view  

## Problem Statement

Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.

## Input

- `root`: `TreeNode | null` — root of binary tree

## Output

- `number[]` — array of node values visible from right side

## Constraints

- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

## Examples

| Input | Output | Why |
|---|---|---|
| `root = [1,2,3,null,5,null,4]` | `[1,3,4]` | Visible right side nodes from top to bottom |
| `root = [1,null,3]` | `[1,3]` | Right-skewed tree |
| `root = []` | `[]` | Empty tree |

## Edge Cases

- `root === null` -> returns `[]`
- Left child deeper than right child -> left descendant becomes visible!

## Hints

1. **BFS Level Order Approach**:
   - Process tree level by level using a Queue.
   - For each level, the **LAST element** processed in `levelSize` is the rightmost visible node!
2. **Alternative DFS Approach**:
   - Reverse Pre-order DFS: Visit `Root -> Right -> Left`.
   - Maintain `depth`. If `depth === result.length`, push `node.val` to `result`.

## Algorithm

**Pattern:** Level-Order Traversal Last Element Capture  
**Core Insight:** Capturing the final node dequeued at each level of a BFS queue guarantees accurate right-side visibility even when left subtrees extend deeper than right subtrees.

## Dry Run

`root = [1, 2, 3, null, 5, null, 4]`:
- Level 1: `queue = [1]`. `levelSize = 1`. Last element = 1 -> `res = [1]`. Enqueue 2, 3.
- Level 2: `queue = [2, 3]`. `levelSize = 2`. Last element = 3 -> `res = [1, 3]`. Enqueue 5, 4.
- Level 3: `queue = [5, 4]`. `levelSize = 2`. Last element = 4 -> `res = [1, 3, 4]`.
- Return `[1, 3, 4]`.

## JavaScript Solution

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function rightSideView(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // If it's the last node of the current level, add it to result
      if (i === levelSize - 1) {
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

function rightSideView(root: TreeNode | null): number[] {
  if (root === null) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;

      if (i === levelSize - 1) {
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

`O(N)` — visits every node in the binary tree once.

## Space Complexity

`O(N)` — maximum width of binary tree stored in BFS queue.

## Common Mistakes

- Simply traversing down `node.right` pointers, which misses deep left-side branches when right subtrees are shallower than left subtrees.

## Follow-Up Questions

1. How would you return the Binary Tree Left Side View? (Capture the FIRST element `i === 0` at each BFS level).

## Similar Questions

- Binary Tree Level Order Traversal
- Populating Next Right Pointers in Each Node
