// Hand-authored coding questions derived from the "Trees - BFS" section of
// the DSA notes handbook. Unlike the auto-generated MockTechnicalQuestion
// files, these are real CodingQuestionDetail problems: every sampleTests
// entry has been checked against the reference solution below by actually
// running it in Node, and both the JavaScript and TypeScript solutions are
// genuine, working code (no placeholder "solve(input)" stubs).
//
// Trees can't cross the test-runner's function-call boundary as objects
// (frontend/src/shared/services/codeRunner.ts calls `functionName(...args)`
// and deep-equals the JSON-serialized return value), so every tree is
// encoded as a LeetCode-style level-order array with `null` for missing
// children (e.g. [3,9,20,null,null,15,7]), and each solution's source
// string includes its own self-contained `buildTree` helper that
// reconstructs the tree before doing the real traversal.

import type { MockCodingQuestion } from '@/mocks/questions';

const COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Apple',
  'Netflix',
  'Uber',
  'Airbnb',
  'Atlassian',
  'Adobe',
  'Flipkart',
];

const CATEGORY = 'Trees (BFS)';
const CONCEPTS = ['Binary Trees', 'Breadth-First Search', 'Queues', 'Level Order Traversal'];

export const MOCK_DSA_CODING_MODULE10_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m10-1',
      questionNumber: 'DSACODE-M10-1',
      title: 'Minimum Depth of Binary Tree',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a binary tree, encoded as a level-order array with `null` for missing children (e.g. [3,9,20,null,null,15,7]), return its minimum depth — the number of nodes along the shortest path from the root down to the nearest leaf node. A leaf is a node with no children.',
      input: 'tree: (number | null)[] — level-order encoding of a binary tree, root first',
      output: 'number — the minimum depth (1 for a single-node tree, 0 for an empty tree)',
      constraints: ['0 <= number of nodes <= 10^4', '-1000 <= node value <= 1000'],
      examples: [
        { input: '[3,9,20,null,null,15,7]', output: '2', explanation: 'Node 9 is a leaf one level below the root, so the shortest root-to-leaf path has 2 nodes.' },
        { input: '[2,null,3,null,4,null,5,null,6]', output: '5', explanation: 'The tree is a right-only skewed chain 2→3→4→5→6, so the only leaf is 6, five nodes deep.' },
        { input: '[]', output: '0', explanation: 'An empty tree has depth 0.' },
      ],
      edgeCases: [
        { case: 'Empty tree', expected: 'Returns 0' },
        { case: 'Single node', expected: 'Returns 1' },
        { case: 'A node with only one child (not two)', expected: 'That side does NOT count as a leaf — depth must continue down the existing child, not stop at the childless side' },
      ],
      functionName: 'minDepthOfTree',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 9, 20, null, null, 15, 7]], expectedOutput: 2, description: 'balanced tree, shallow leaf on the left' },
        { input: [[2, null, 3, null, 4, null, 5, null, 6]], expectedOutput: 5, description: 'right-skewed chain, must not stop at the missing left child' },
        { input: [[1]], expectedOutput: 1, description: 'single node' },
        { input: [[]], expectedOutput: 0, description: 'empty tree' },
      ],
    },
    hints: {
      hints: [
        'BFS naturally finds the shallowest leaf first, since it explores level by level — the first leaf encountered is guaranteed to be at minimum depth.',
        'A node counts as a leaf only when it has *no* children at all — a node with just one child is not a leaf, even though one side is missing.',
        'Stop as soon as you dequeue a leaf; you never need to keep exploring deeper levels after that.',
      ],
    },
    solution: {
      algorithm:
        'Rebuild the tree from the level-order array with `buildTree`. If the tree is empty, return 0. Otherwise run a level-by-level BFS with a queue, tracking the current depth (starting at 1 for the root level). At each level, check every node in the queue: if any node has neither a left nor a right child, it is a leaf, so return the current depth immediately. Otherwise enqueue its existing children and move to the next depth.',
      dryRun:
        'tree=[3,9,20,null,null,15,7], depth=1\nlevel [3]: 3 has both children → enqueue 9,20\ndepth=2\nlevel [9,20]: 9 has no children → leaf found at depth 2 → return 2',
      javascriptSolution: `function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function minDepthOfTree(tree) {
  const root = buildTree(tree);
  if (!root) return 0;

  const queue = [root];
  let depth = 1;

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      if (!node.left && !node.right) return depth;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    depth++;
  }

  return depth;
}`,
      typescriptSolution: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildTree(arr: readonly (number | null)[]): TreeNode | null {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root: TreeNode = { val: arr[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift()!;

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function minDepthOfTree(tree: readonly (number | null)[]): number {
  const root = buildTree(tree);
  if (!root) return 0;

  const queue: TreeNode[] = [root];
  let depth = 1;

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;

      if (!node.left && !node.right) return depth;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    depth++;
  }

  return depth;
}`,
      timeComplexity: 'O(n) — each node is visited at most once in the worst case (a tree with no early leaf).',
      spaceComplexity: 'O(n) — the queue can hold up to the widest level of the tree.',
      commonMistakes: [
        'Using plain DFS and taking `min(leftDepth, rightDepth) + 1` without special-casing a missing child, which incorrectly treats a missing child as depth 0 and can return a too-small answer for nodes with only one child.',
        'Not stopping early on the first leaf found during BFS, wasting time exploring every node instead of the minimum benefit of level-order traversal.',
        'Forgetting the empty-tree case and returning 1 instead of 0 for `[]`.',
      ],
      followUpQuestions: [
        'How would you solve this recursively (DFS) instead, and what special case do you need for single-child nodes?',
        'How would you find the *maximum* depth instead — does the same early-exit trick still help?',
        'How would you adapt this to an n-ary tree instead of a binary tree?',
      ],
      similarQuestions: ['Maximum Depth of Binary Tree', 'Balanced Binary Tree', 'Binary Tree Level Order Traversal'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m10-2',
      questionNumber: 'DSACODE-M10-2',
      title: 'Binary Tree Zigzag Level Order Traversal',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a binary tree, encoded as a level-order array with `null` for missing children, return its zigzag level order traversal: level 0 (the root) left-to-right, level 1 right-to-left, level 2 left-to-right, and so on, alternating direction every level.',
      input: 'tree: (number | null)[] — level-order encoding of a binary tree, root first',
      output: 'number[][] — one array of values per level, direction alternating starting left-to-right',
      constraints: ['0 <= number of nodes <= 2000', '-100 <= node value <= 100'],
      examples: [
        { input: '[3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]', explanation: 'Level 0 is left-to-right ([3]), level 1 is reversed to right-to-left ([20,9]), level 2 is left-to-right again ([15,7]).' },
        { input: '[1]', output: '[[1]]', explanation: 'A single node has one level, direction does not matter.' },
        { input: '[]', output: '[]', explanation: 'An empty tree has no levels.' },
      ],
      edgeCases: [
        { case: 'Empty tree', expected: 'Returns []' },
        { case: 'Single node', expected: 'Returns [[value]]' },
        { case: 'Tree with only one child at every node (skewed)', expected: 'Each level still alternates direction, even with a single value per level' },
      ],
      functionName: 'zigzagLevelOrder',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 9, 20, null, null, 15, 7]], expectedOutput: [[3], [20, 9], [15, 7]], description: 'classic 3-level example' },
        { input: [[1]], expectedOutput: [[1]], description: 'single node' },
        { input: [[]], expectedOutput: [], description: 'empty tree' },
        { input: [[1, 2, 3, 4, 5, 6, 7]], expectedOutput: [[1], [3, 2], [4, 5, 6, 7]], description: 'perfect 3-level tree' },
      ],
    },
    hints: {
      hints: [
        'Do a standard BFS level-by-level traversal first, collecting each level into its own array in normal left-to-right order.',
        'Track the current level index (starting at 0) as you go — reverse the array you just collected whenever that index is odd.',
        'Reversing after collecting a level (rather than trying to push in reverse order while dequeuing) keeps the BFS logic itself simple and unchanged.',
      ],
    },
    solution: {
      algorithm:
        'Rebuild the tree, then run a standard BFS level-order traversal with a queue, processing one full level per outer loop iteration and tracking a `level` counter starting at 0. For each level, collect every node\'s value into `values` in the natural left-to-right dequeue order, enqueueing children as usual. After collecting a level, reverse `values` if `level` is odd, push it to the result, and increment `level`.',
      dryRun:
        'tree=[3,9,20,null,null,15,7], level=0\nlevel0: queue=[3] → values=[3], 0 is even → [3], level=1\nlevel1: queue=[9,20] → values=[9,20], 1 is odd → reverse → [20,9], level=2\nlevel2: queue=[15,7] → values=[15,7], 2 is even → [15,7]\nresult=[[3],[20,9],[15,7]]',
      javascriptSolution: `function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function zigzagLevelOrder(tree) {
  const root = buildTree(tree);
  if (!root) return [];

  const result = [];
  const queue = [root];
  let level = 0;

  while (queue.length > 0) {
    const size = queue.length;
    const values = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      values.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level % 2 === 1 ? values.reverse() : values);
    level++;
  }

  return result;
}`,
      typescriptSolution: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildTree(arr: readonly (number | null)[]): TreeNode | null {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root: TreeNode = { val: arr[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift()!;

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function zigzagLevelOrder(tree: readonly (number | null)[]): number[][] {
  const root = buildTree(tree);
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  let level = 0;

  while (queue.length > 0) {
    const size = queue.length;
    const values: number[] = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      values.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level % 2 === 1 ? values.reverse() : values);
    level++;
  }

  return result;
}`,
      timeComplexity: 'O(n) — every node is enqueued and dequeued exactly once.',
      spaceComplexity: 'O(n) — the queue and the result together hold every node value.',
      commonMistakes: [
        'Reversing the wrong levels (off-by-one on the parity check), which flips every level\'s direction instead of alternating.',
        'Trying to build the zigzag order by pushing to the front/back of a deque while dequeuing, which is more error-prone than the simpler "collect normally, then reverse odd levels" approach.',
        'Forgetting that reversing every *other* level does not change which children get enqueued — the BFS traversal order for descending into children must stay left-to-right regardless of the current level\'s display direction.',
      ],
      followUpQuestions: [
        'How would you produce the zigzag traversal without ever calling `.reverse()`, using a deque and alternating push direction while dequeuing instead?',
        'How would this change for an n-ary tree?',
        'How would you do this with O(1) extra space beyond the output, if that were required?',
      ],
      similarQuestions: ['Binary Tree Level Order Traversal', 'Binary Tree Level Order Traversal II', 'N-ary Tree Level Order Traversal'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m10-3',
      questionNumber: 'DSACODE-M10-3',
      title: 'Binary Tree Level Order Traversal II',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a binary tree, encoded as a level-order array with `null` for missing children, return its level order traversal from bottom to top: the leaf-most level first, and the root\'s level last.',
      input: 'tree: (number | null)[] — level-order encoding of a binary tree, root first',
      output: 'number[][] — one array of values per level, ordered from the deepest level to the root',
      constraints: ['0 <= number of nodes <= 2000', '-1000 <= node value <= 1000'],
      examples: [
        { input: '[3,9,20,null,null,15,7]', output: '[[15,7],[9,20],[3]]', explanation: 'Top-down level order is [[3],[9,20],[15,7]]; this reverses the order of the levels themselves (not the values within a level).' },
        { input: '[1]', output: '[[1]]', explanation: 'A single-level tree is unchanged.' },
        { input: '[]', output: '[]', explanation: 'An empty tree has no levels.' },
      ],
      edgeCases: [
        { case: 'Empty tree', expected: 'Returns []' },
        { case: 'Single node', expected: 'Returns [[value]]' },
        { case: 'Skewed tree (every node has only one child)', expected: 'Each level (one node each) is still reversed in order, deepest first' },
      ],
      functionName: 'levelOrderBottom',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 9, 20, null, null, 15, 7]], expectedOutput: [[15, 7], [9, 20], [3]], description: 'classic 3-level example' },
        { input: [[1]], expectedOutput: [[1]], description: 'single node' },
        { input: [[]], expectedOutput: [], description: 'empty tree' },
        { input: [[1, 2, null, 3]], expectedOutput: [[3], [2], [1]], description: 'left-skewed 3-level chain' },
      ],
    },
    hints: {
      hints: [
        'This is exactly a normal top-down level order traversal, plus one extra step.',
        'Collect the levels in the usual top-to-bottom order first — do not try to traverse bottom-up directly, since you cannot know how many levels exist until you have already walked down to them.',
        'Reverse the order of the collected levels (not the values inside each level) right before returning.',
      ],
    },
    solution: {
      algorithm:
        'Rebuild the tree and run a standard BFS level-order traversal, collecting each level\'s values into its own array in the usual top-to-bottom, left-to-right order. Once every level has been collected, reverse the outer array (the list of levels) so the deepest level comes first and the root\'s level comes last.',
      dryRun:
        'tree=[3,9,20,null,null,15,7]\ntop-down levels: [[3],[9,20],[15,7]]\nreverse the list of levels: [[15,7],[9,20],[3]]',
      javascriptSolution: `function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function levelOrderBottom(tree) {
  const root = buildTree(tree);
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const size = queue.length;
    const values = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      values.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(values);
  }

  return result.reverse();
}`,
      typescriptSolution: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildTree(arr: readonly (number | null)[]): TreeNode | null {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root: TreeNode = { val: arr[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift()!;

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function levelOrderBottom(tree: readonly (number | null)[]): number[][] {
  const root = buildTree(tree);
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const size = queue.length;
    const values: number[] = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      values.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(values);
  }

  return result.reverse();
}`,
      timeComplexity: 'O(n) — every node is enqueued and dequeued exactly once.',
      spaceComplexity: 'O(n) — the queue and the result together hold every node value.',
      commonMistakes: [
        'Reversing the values *within* each level instead of reversing the *order of the levels* — the values inside a level must stay left-to-right.',
        'Trying to unshift each new level onto the front of the result array during traversal (O(n) per unshift, O(n²) overall) instead of pushing normally and reversing once at the end.',
        'Forgetting to handle the empty-tree case, which should return [] rather than [[]].',
      ],
      followUpQuestions: [
        'How would you avoid the final `.reverse()` call and build the bottom-up order directly, e.g. using recursion with depth tracking?',
        'How would this compare to a DFS approach that records each node at `result[maxDepth - depth]`?',
        'How would you handle an extremely deep, mostly-empty tree efficiently?',
      ],
      similarQuestions: ['Binary Tree Level Order Traversal', 'Binary Tree Zigzag Level Order Traversal', 'Average of Levels in Binary Tree'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m10-4',
      questionNumber: 'DSACODE-M10-4',
      title: 'Average of Levels in Binary Tree',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a binary tree, encoded as a level-order array with `null` for missing children, return the average value of the nodes at each level, from top to bottom.',
      input: 'tree: (number | null)[] — level-order encoding of a binary tree, root first',
      output: 'number[] — one average per level, top to bottom',
      constraints: ['1 <= number of nodes <= 10^4', '-100 <= node value <= 100', 'The tree is never empty'],
      examples: [
        { input: '[3,9,20,null,null,15,7]', output: '[3, 14.5, 11]', explanation: 'Level 0 average = 3/1 = 3; level 1 = (9+20)/2 = 14.5; level 2 = (15+7)/2 = 11.' },
        { input: '[1]', output: '[1]', explanation: 'A single node is its own level average.' },
        { input: '[1,2,3]', output: '[1, 2.5]', explanation: 'Level 0 = 1; level 1 = (2+3)/2 = 2.5.' },
      ],
      edgeCases: [
        { case: 'All nodes have the same value', expected: 'Every level average equals that value' },
        { case: 'Negative values mixed with positive ones', expected: 'The average is computed with normal signed arithmetic' },
        { case: 'A level with a single node', expected: 'The average equals that node\'s value exactly' },
      ],
      functionName: 'averageOfLevels',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 9, 20, null, null, 15, 7]], expectedOutput: [3, 14.5, 11], description: 'classic 3-level example' },
        { input: [[1]], expectedOutput: [1], description: 'single node' },
        { input: [[1, 2, 3]], expectedOutput: [1, 2.5], description: 'two-level perfect tree' },
        { input: [[-5, -10, 15]], expectedOutput: [-5, 2.5], description: 'negative and positive values in the same level' },
      ],
    },
    hints: {
      hints: [
        'Do a standard BFS level-by-level traversal, summing the values at each level as you dequeue them.',
        'Divide the level\'s running sum by the number of nodes at that level (the queue\'s size at the start of that level) to get the average.',
        'JavaScript division of two numbers already produces a floating-point result, so no special integer-division handling is needed.',
      ],
    },
    solution: {
      algorithm:
        'Rebuild the tree, then run a BFS level-order traversal. For each level, sum every node\'s value while enqueueing its children, then divide the sum by the level\'s size (the number of nodes processed in that iteration) to get the average, and push it to the result.',
      dryRun:
        'tree=[3,9,20,null,null,15,7]\nlevel0: [3] → sum=3, size=1 → avg=3\nlevel1: [9,20] → sum=29, size=2 → avg=14.5\nlevel2: [15,7] → sum=22, size=2 → avg=11\nresult=[3, 14.5, 11]',
      javascriptSolution: `function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function averageOfLevels(tree) {
  const root = buildTree(tree);
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const size = queue.length;
    let sum = 0;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      sum += node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(sum / size);
  }

  return result;
}`,
      typescriptSolution: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildTree(arr: readonly (number | null)[]): TreeNode | null {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root: TreeNode = { val: arr[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift()!;

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function averageOfLevels(tree: readonly (number | null)[]): number[] {
  const root = buildTree(tree);
  if (!root) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const size = queue.length;
    let sum = 0;

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      sum += node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(sum / size);
  }

  return result;
}`,
      timeComplexity: 'O(n) — every node is visited exactly once.',
      spaceComplexity: 'O(n) — the queue can hold up to the widest level of the tree.',
      commonMistakes: [
        'Dividing by the total node count instead of the current level\'s size, which produces a running-average-of-everything instead of a per-level average.',
        'Reading `queue.length` inside the inner loop (after some children have already been pushed) instead of capturing `size` once before the loop starts, which mixes nodes from two different levels together.',
        'Accumulating sums as integers and losing the fractional part of the average (not a JS-specific issue, but a common mistake when porting from a statically-typed language).',
      ],
      followUpQuestions: [
        'How would you return the median of each level instead of the average?',
        'How would you compute a running average across the whole tree, not per level?',
        'How would you handle a tree so large that a single level does not fit in memory?',
      ],
      similarQuestions: ['Binary Tree Level Order Traversal', 'Find Bottom Left Tree Value', 'Maximum Level Sum of a Binary Tree'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m10-5',
      questionNumber: 'DSACODE-M10-5',
      title: 'Binary Tree Right Side View',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a binary tree, encoded as a level-order array with `null` for missing children, imagine standing on the right side of it. Return the values of the nodes you can see, ordered from top to bottom (the rightmost node at each level).',
      input: 'tree: (number | null)[] — level-order encoding of a binary tree, root first',
      output: 'number[] — the rightmost value at each level, top to bottom',
      constraints: ['0 <= number of nodes <= 100', '-100 <= node value <= 100'],
      examples: [
        { input: '[1,2,3,null,5,null,4]', output: '[1, 3, 4]', explanation: 'Level 0: 1. Level 1: 2 and 3 exist, rightmost is 3. Level 2: only 5 (under 2) and 4 (under 3) exist, rightmost is 4.' },
        { input: '[1,null,3]', output: '[1, 3]', explanation: 'A tree with only right children shows every node.' },
        { input: '[]', output: '[]', explanation: 'An empty tree has nothing to view.' },
      ],
      edgeCases: [
        { case: 'Empty tree', expected: 'Returns []' },
        { case: 'A level whose rightmost visible node is actually a left child (its parent has no right child)', expected: 'Still correctly identified as rightmost, since it is the last node processed at that level' },
        { case: 'Left-skewed tree (every node has only a left child)', expected: 'Every node is visible, since each level has exactly one node' },
      ],
      functionName: 'rightSideView',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, null, 5, null, 4]], expectedOutput: [1, 3, 4], description: 'classic case with a left-child-only rightmost node at the deepest level' },
        { input: [[1, null, 3]], expectedOutput: [1, 3], description: 'right-only chain' },
        { input: [[]], expectedOutput: [], description: 'empty tree' },
        { input: [[1, 2, 3, 4]], expectedOutput: [1, 3, 4], description: 'the deepest visible node is a left child under a node with no right sibling' },
      ],
    },
    hints: {
      hints: [
        'BFS level order traversal gives you every node at each level in left-to-right order for free.',
        'You do not need to compare positions — the last node dequeued at each level, by construction, is the rightmost one at that level.',
        'Push each level\'s last value to the result as you finish processing that level, then move to the next.',
      ],
    },
    solution: {
      algorithm:
        'Rebuild the tree, then run a standard BFS level-order traversal with a queue. For each level, dequeue every node left-to-right, enqueueing children as usual, and remember the value of the last node dequeued in that level (it is, by construction of level-order traversal, the rightmost node at that depth). Push it to the result after finishing the level.',
      dryRun:
        'tree=[1,2,3,null,5,null,4]\nlevel0: [1] → last=1\nlevel1: [2,3] → last=3\nlevel2: 2 has no left, right=5 → enqueue 5; 3 has no left, right=4 → enqueue 4 → queue=[5,4] → last=4\nresult=[1,3,4]',
      javascriptSolution: `function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function rightSideView(tree) {
  const root = buildTree(tree);
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const size = queue.length;
    let last = null;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      last = node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(last);
  }

  return result;
}`,
      typescriptSolution: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildTree(arr: readonly (number | null)[]): TreeNode | null {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;

  const root: TreeNode = { val: arr[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift()!;

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }

  return root;
}

function rightSideView(tree: readonly (number | null)[]): number[] {
  const root = buildTree(tree);
  if (!root) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const size = queue.length;
    let last = 0;

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      last = node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(last);
  }

  return result;
}`,
      timeComplexity: 'O(n) — every node is visited exactly once.',
      spaceComplexity: 'O(n) — the queue can hold up to the widest level of the tree.',
      commonMistakes: [
        'Assuming the rightmost visible node is always a `.right` child — it can be a `.left` child if its parent has no right sibling at that level (as in the `[1,2,3,4]` test case), which is exactly why tracking "last dequeued" is safer than tracking `.right` pointers.',
        'Using a DFS (right-first) approach without tracking depth correctly, which can miss a level or record the wrong node if the recursion visits nodes out of level order.',
        'Forgetting to handle the empty tree, returning `[null]` or throwing instead of `[]`.',
      ],
      followUpQuestions: [
        'How would you solve this with DFS instead of BFS (hint: visit right child before left, and record the first node seen at each new depth)?',
        'How would you return the *left* side view instead?',
        'How would you return both the left and right side views in a single traversal?',
      ],
      similarQuestions: ['Binary Tree Level Order Traversal', 'Populating Next Right Pointers in Each Node', 'Find Bottom Left Tree Value'],
    },
  },
];
