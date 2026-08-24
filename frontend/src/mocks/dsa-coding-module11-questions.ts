// Hand-authored coding questions derived from the "Trees - DFS" section of
// the DSA notes handbook. Unlike the auto-generated MockTechnicalQuestion
// files, these are real CodingQuestionDetail problems: every sampleTests
// entry has been checked against the reference solution below (run in
// Node), and both the JavaScript and TypeScript solutions are genuine,
// working code (no placeholder stubs).
//
// Encoding note: this app's test runner (see codeRunner.ts) calls
// `functionName(...input)` and deep-equals the return value via
// JSON.stringify — no TreeNode objects can cross that boundary. Every tree
// is passed as a LeetCode-style level-order array with `null` for missing
// children (e.g. [3,9,20,null,null,15,7]). Each solution string is fully
// self-contained: it defines its own `buildTree`/`serializeTree` helpers
// alongside the named function, exactly as the runner will execute it.
// Problems that need to reference a specific node (LCA, distance-K) take
// that node's *value* as a plain argument instead of a node reference,
// on the standard assumption of unique values.

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

const CATEGORY = 'Trees (DFS)';
const CONCEPTS = [
  'Binary Trees',
  'Recursion',
  'DFS',
  'Binary Search Trees',
  'Time Complexity',
  'Space Complexity',
];

const BUILD_TREE_JS = `function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let front = 0;
  let i = 1;
  while (front < queue.length && i < arr.length) {
    const node = queue[front++];
    const leftVal = arr[i++];
    if (leftVal !== null && leftVal !== undefined) { node.left = { val: leftVal, left: null, right: null }; queue.push(node.left); }
    if (i < arr.length) { const rightVal = arr[i++]; if (rightVal !== null && rightVal !== undefined) { node.right = { val: rightVal, left: null, right: null }; queue.push(node.right); } }
  }
  return root;
}`;

const SERIALIZE_TREE_JS = `function serializeTree(root) {
  if (!root) return [];
  const result = []; const queue = [root]; let front = 0;
  while (front < queue.length) {
    const node = queue[front++];
    if (node === null) { result.push(null); } else { result.push(node.val); queue.push(node.left); queue.push(node.right); }
  }
  while (result.length && result[result.length - 1] === null) result.pop();
  return result;
}`;

const TS_NODE_TYPE = `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}`;

const BUILD_TREE_TS = `function buildTree(arr: (number | null)[]): TreeNode | null {
  if (!arr || arr.length === 0 || arr[0] === null || arr[0] === undefined) return null;
  const root: TreeNode = { val: arr[0], left: null, right: null };
  const queue: TreeNode[] = [root]; let front = 0, i = 1;
  while (front < queue.length && i < arr.length) {
    const node = queue[front++]!; const leftVal = arr[i++];
    if (leftVal !== null && leftVal !== undefined) { node.left = { val: leftVal, left: null, right: null }; queue.push(node.left); }
    if (i < arr.length) { const rightVal = arr[i++]; if (rightVal !== null && rightVal !== undefined) { node.right = { val: rightVal, left: null, right: null }; queue.push(node.right); } }
  }
  return root;
}`;

const SERIALIZE_TREE_TS = `function serializeTree(root: TreeNode | null): (number | null)[] {
  if (!root) return [];
  const result: (number | null)[] = []; const queue: (TreeNode | null)[] = [root]; let front = 0;
  while (front < queue.length) {
    const node = queue[front++];

    if (node === null) {
      result.push(null);
    } else {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  while (result.length && result[result.length - 1] === null) result.pop(); return result;
}`;

export const MOCK_DSA_CODING_MODULE11_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m11-1',
      questionNumber: 'DSACODE-M11-1',
      title: 'Same Tree',
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
        'Given the roots of two binary trees, each encoded as a LeetCode-style level-order array (`null` for a missing child), determine whether the two trees are structurally identical and have the same node values.',
      input: 'treeA: (number|null)[], treeB: (number|null)[] — two level-order-encoded binary trees',
      output: 'boolean — true if the trees are identical in structure and values',
      constraints: ['0 <= number of nodes in each tree <= 100', '-10^4 <= node value <= 10^4'],
      examples: [
        { input: 'treeA = [1,2,3], treeB = [1,2,3]', output: 'true', explanation: 'Identical structure and values.' },
        { input: 'treeA = [1,2], treeB = [1,null,2]', output: 'false', explanation: 'Same values but 2 is a left child in one tree and a right child in the other.' },
        { input: 'treeA = [1,2,1], treeB = [1,1,2]', output: 'false', explanation: 'Same shape, but the left/right values are swapped.' },
      ],
      edgeCases: [
        { case: 'Both trees empty', expected: 'Returns true' },
        { case: 'One tree empty, the other not', expected: 'Returns false' },
        { case: 'Same shape, one differing leaf value', expected: 'Returns false' },
      ],
      functionName: 'isSameTree',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3], [1, 2, 3]], expectedOutput: true, description: 'identical trees' },
        { input: [[1, 2], [1, null, 2]], expectedOutput: false, description: 'same values, different structure' },
        { input: [[1, 2, 1], [1, 1, 2]], expectedOutput: false, description: 'same shape, swapped values' },
        { input: [[], []], expectedOutput: true, description: 'both empty' },
      ],
    },
    hints: {
      hints: [
        'Two trees are the same only if their roots match and both their left and right subtrees are also the same — this is naturally recursive.',
        'Handle the base cases first: if both nodes are null they match; if exactly one is null they cannot match.',
        'You will need a `buildTree` helper to turn the level-order array back into linked nodes before comparing.',
      ],
    },
    solution: {
      algorithm: `
Step 2: Compare the current pair of nodes.
Step 3: Both null means equal; one null or different values means false.
Step 4: Recursively compare matching left and right children.

Core idea from source:
Reconstruct both trees from their level-order arrays. Recursively compare: if both current nodes are null, they match; if only one is null, or their values differ, they do not match; otherwise recurse into left/left and right/right and require both to match.`,
      dryRun: `
1 matches 1.
2 matches 2 and both children are null.
3 matches 3 and both children are null.
answer=true.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function isSameTree(treeA, treeB) {
  const p = buildTree(treeA);
  const q = buildTree(treeB);

  function helper(a, b) {
    if (!a || !b) return a === b;
    if (a.val !== b.val) return false;
    return helper(a.left, b.left) && helper(a.right, b.right);
  }

  return helper(p, q);
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isSameTreeUsingBuiltIns(treeA, treeB) { return JSON.stringify(treeA) === JSON.stringify(treeB); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function isSameTree(treeA: (number | null)[], treeB: (number | null)[]): boolean {
  const p = buildTree(treeA);
  const q = buildTree(treeB);

  function helper(a: TreeNode | null, b: TreeNode | null): boolean {
    if (!a || !b) return a === b;
    if (a.val !== b.val) return false;
    return helper(a.left, b.left) && helper(a.right, b.right);
  }

  return helper(p, q);
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isSameTreeUsingBuiltIns(treeA: (number | null)[], treeB: (number | null)[]): boolean { return JSON.stringify(treeA) === JSON.stringify(treeB); }`,
      timeComplexity: 'O(n) — every node in the smaller tree is visited at most once before a mismatch short-circuits.',
      spaceComplexity: 'O(h) — recursion stack depth equals the tree height (worst case O(n) for a skewed tree).',
      commonMistakes: [
        'Comparing only values level-by-level without checking structural placement (which child a value is on).',
        'Forgetting the `a === b` base case when both are null, causing an infinite recursion guard to be missed.',
        'Not short-circuiting on the first mismatch, wasting time comparing the rest of the trees.',
      ],
      followUpQuestions: [
        'How would you check if one tree is a subtree of another instead of exactly equal?',
        'How would you compare the trees iteratively instead of recursively?',
        'How would this change if node equality needed to ignore structure and just compare multisets of values?',
      ],
      similarQuestions: ['Symmetric Tree', 'Subtree of Another Tree', 'Leaf-Similar Trees'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-2',
      questionNumber: 'DSACODE-M11-2',
      title: 'Merge Two Binary Trees',
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
        'Given two binary trees (level-order encoded), merge them into a single tree: where both trees have a node at the same position, sum their values; where only one tree has a node, use that node as-is. Return the merged tree as a level-order array.',
      input: 'tree1: (number|null)[], tree2: (number|null)[]',
      output: '(number|null)[] — the merged tree, level-order encoded',
      constraints: ['0 <= number of nodes in each tree <= 2000', '-10^4 <= node value <= 10^4'],
      examples: [
        {
          input: 'tree1 = [1,3,2,5], tree2 = [2,1,3,null,4,null,7]',
          output: '[3,4,5,5,4,null,7]',
          explanation: 'Roots 1+2=3; left children 3+1=4; right children 2+3=5; 5 has no counterpart on the right side so it stays 5, and 4 and 7 come through unchanged from tree2.',
        },
        { input: 'tree1 = [1], tree2 = [1,2]', output: '[2,2]', explanation: 'Roots 1+1=2; tree2 has an extra right child, kept as-is.' },
        { input: 'tree1 = [], tree2 = [1,2,3]', output: '[1,2,3]', explanation: 'An empty tree1 means the result is exactly tree2.' },
      ],
      edgeCases: [
        { case: 'Both trees empty', expected: 'Returns []' },
        { case: 'One tree empty', expected: 'Returns the other tree unchanged' },
        { case: 'Trees only overlap at the root', expected: 'Root values sum, remaining subtrees appended as-is' },
      ],
      functionName: 'mergeTrees',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 3, 2, 5], [2, 1, 3, null, 4, null, 7]], expectedOutput: [3, 4, 5, 5, 4, null, 7], description: 'overlapping trees with extra branches' },
        { input: [[1], [1, 2]], expectedOutput: [2, 2], description: 'tree2 has an extra child' },
        { input: [[], [1, 2, 3]], expectedOutput: [1, 2, 3], description: 'tree1 is empty' },
        { input: [[], []], expectedOutput: [], description: 'both empty' },
      ],
    },
    hints: {
      hints: [
        'This is a simultaneous recursive traversal of both trees at once.',
        'If one side is null, the merged subtree is simply whatever the other side has — no further recursion needed there.',
        'Build a new node with the summed value, then recurse into (a.left, b.left) and (a.right, b.right) for the children.',
      ],
    },
    solution: {
      algorithm: `
Step 2: If only one node exists, clone that entire subtree into the result.
Step 3: If both exist, create a new node whose value is the sum.
Step 4: Recursively merge left-with-left and right-with-right, then serialize the new tree.

Core idea from source:
Reconstruct both trees. Recursively merge: if one node is null, return the other node (its whole subtree) as-is. Otherwise create a new node with val = a.val + b.val, and recursively merge the left and right children pairs. Serialize the merged tree back to a level-order array.`,
      dryRun: `
root: 1+2=3
left: 3+1=4; left child 5 has no partner → 5
right: 2+3=5; right child 7 has no partner → 7
serialized result=[3,4,5,5,4,null,7].`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

${SERIALIZE_TREE_JS}

function mergeTrees(tree1, tree2) {
  const t1 = buildTree(tree1);
  const t2 = buildTree(tree2);

  function merge(a, b) {
    if (!a) return b;
    if (!b) return a;
    return { val: a.val + b.val, left: merge(a.left, b.left), right: merge(a.right, b.right) };
  }

  return serializeTree(merge(t1, t2));
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function mergeTreesUsingBuiltIns(tree1, tree2) { return mergeTrees([...tree1], [...tree2]); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

${SERIALIZE_TREE_TS}

function mergeTrees(tree1: (number | null)[], tree2: (number | null)[]): (number | null)[] {
  const t1 = buildTree(tree1);
  const t2 = buildTree(tree2);

  function merge(a: TreeNode | null, b: TreeNode | null): TreeNode | null {
    if (!a) return b;
    if (!b) return a;
    return { val: a.val + b.val, left: merge(a.left, b.left), right: merge(a.right, b.right) };
  }

  return serializeTree(merge(t1, t2));
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function mergeTreesUsingBuiltIns(tree1: (number | null)[], tree2: (number | null)[]): (number | null)[] { return mergeTrees([...tree1], [...tree2]); }`,
      timeComplexity: 'O(n) — visits each node of the smaller tree once (nodes only present in the larger tree are attached, not re-walked).',
      spaceComplexity: 'O(h) recursion stack, plus O(n) for the newly built merged tree.',
      commonMistakes: [
        'Mutating tree1 in place and returning it, instead of building a genuinely new merged structure (fine for LeetCode, but returns aliased data that surprises callers).',
        'Forgetting that when one side is null, the *whole* subtree from the other side should be reused, not just that single node.',
        'Swapping the base cases (checking `!a` and `!b` in the wrong order) and accidentally dropping one tree\'s exclusive branches.',
      ],
      followUpQuestions: [
        'How would you merge k trees instead of just two?',
        'How would you do this iteratively with an explicit stack instead of recursion?',
        'What if merging meant taking the max of the two values instead of summing them — what would change?',
      ],
      similarQuestions: ['Same Tree', 'Symmetric Tree', 'Construct Binary Tree from Preorder and Inorder Traversal'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-3',
      questionNumber: 'DSACODE-M11-3',
      title: 'Path Sum',
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
        'Given a binary tree (level-order encoded) and an integer `targetSum`, determine whether the tree has a root-to-leaf path such that the sum of the values along that path equals `targetSum`.',
      input: 'tree: (number|null)[], targetSum: number',
      output: 'boolean — true if such a root-to-leaf path exists',
      constraints: ['0 <= number of nodes <= 5000', '-1000 <= node value, targetSum <= 1000'],
      examples: [
        { input: 'tree = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true', explanation: 'Path 5→4→11→2 sums to 22.' },
        { input: 'tree = [1,2,3], targetSum = 5', output: 'false', explanation: 'No root-to-leaf path sums to 5 (1+2=3, 1+3=4).' },
        { input: 'tree = [], targetSum = 0', output: 'false', explanation: 'An empty tree has no paths at all.' },
      ],
      edgeCases: [
        { case: 'Empty tree', expected: 'Returns false regardless of targetSum' },
        { case: 'Single node equal to targetSum', expected: 'Returns true' },
        { case: 'targetSum matched by an internal node but not a leaf', expected: 'Returns false — only leaf paths count' },
      ],
      functionName: 'hasPathSum',
      isClassBased: false,
      sampleTests: [
        { input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22], expectedOutput: true, description: 'classic matching path' },
        { input: [[1, 2, 3], 5], expectedOutput: false, description: 'no path sums to target' },
        { input: [[], 0], expectedOutput: false, description: 'empty tree' },
        { input: [[1, 2], 1], expectedOutput: false, description: 'sum matches an internal node, not a leaf' },
      ],
    },
    hints: {
      hints: [
        'At each node, subtract its value from the remaining target and recurse into its children with that new remaining value.',
        'A "path" only counts once it reaches a leaf (a node with no left and no right child) — internal nodes matching the running sum do not count.',
        'A leaf matches when its own value equals whatever target remains at that point.',
      ],
    },
    solution: {
      algorithm: `
Step 2: Carry the remaining target down the recursion.
Step 3: Only a leaf can complete a valid path.
Step 4: At a leaf, return whether its value equals the remaining target.

Core idea from source:
Recursively walk the tree carrying a "remaining" target (targetSum minus everything summed so far). At a leaf, check if remaining equals the leaf\\'s own value. At an internal node, recurse into both children with remaining - node.val, returning true if either side finds a path.`,
      dryRun: `
5 leaves remaining 17.
4 leaves 13.
11 leaves 2.
7 is a leaf but 7 != 2.
2 is a leaf and 2 == 2 → true.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function hasPathSum(tree, targetSum) {
  const root = buildTree(tree);

  function helper(node, remaining) {
    if (!node) return false;
    if (!node.left && !node.right) return remaining === node.val;
    return helper(node.left, remaining - node.val) || helper(node.right, remaining - node.val);
  }

  return helper(root, targetSum);
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function hasPathSumUsingBuiltIns(tree, targetSum) { return hasPathSum(tree.slice(), targetSum); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function hasPathSum(tree: (number | null)[], targetSum: number): boolean {
  const root = buildTree(tree);

  function helper(node: TreeNode | null, remaining: number): boolean {
    if (!node) return false;
    if (!node.left && !node.right) return remaining === node.val;
    return helper(node.left, remaining - node.val) || helper(node.right, remaining - node.val);
  }

  return helper(root, targetSum);
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function hasPathSumUsingBuiltIns(tree: (number | null)[], targetSum: number): boolean { return hasPathSum(tree.slice(), targetSum); }`,
      timeComplexity: 'O(n) worst case — every node is visited once if no early match is found.',
      spaceComplexity: 'O(h) — recursion stack depth equals tree height.',
      commonMistakes: [
        'Returning true as soon as the running sum equals targetSum at an internal node, instead of requiring it to be a leaf.',
        'Handling the root === null case incorrectly, e.g. returning true for an empty tree and targetSum 0 (there is no path at all in an empty tree).',
        'Off-by-one in when the subtraction happens (subtracting before vs. after checking the leaf condition).',
      ],
      followUpQuestions: [
        'How would you return the actual matching path instead of just a boolean (Path Sum II)?',
        'How would you count all root-to-leaf paths matching the sum instead of just detecting one?',
        'How would you extend this to paths that do not have to start at the root or end at a leaf (Path Sum III)?',
      ],
      similarQuestions: ['Path Sum II', 'Path Sum III', 'Sum Root to Leaf Numbers'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-4',
      questionNumber: 'DSACODE-M11-4',
      title: 'Diameter of Binary Tree',
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
        'Given a binary tree (level-order encoded), return the length (in edges) of the longest path between any two nodes in the tree. This path may or may not pass through the root.',
      input: 'tree: (number|null)[]',
      output: 'number — the diameter, measured in edges',
      constraints: ['1 <= number of nodes <= 10^4', '-100 <= node value <= 100'],
      examples: [
        { input: 'tree = [1,2,3,4,5]', output: '3', explanation: 'The longest path is 4→2→1→3 or 5→2→1→3, both with 3 edges.' },
        { input: 'tree = [1,2]', output: '1', explanation: 'The only path, root to its single child, has 1 edge.' },
        { input: 'tree = [1]', output: '0', explanation: 'A single node has no path at all.' },
      ],
      edgeCases: [
        { case: 'Single node', expected: 'Returns 0' },
        { case: 'Skewed (linked-list-like) tree', expected: 'Diameter equals number of nodes minus 1, not routed through any branching point' },
        { case: 'The longest path does not pass through the root', expected: "Still found, since every node's local left+right depth is tracked" },
      ],
      functionName: 'diameterOfBinaryTree',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5]], expectedOutput: 3, description: 'diameter through the root' },
        { input: [[1, 2]], expectedOutput: 1, description: 'two-node tree' },
        { input: [[1]], expectedOutput: 0, description: 'single node' },
        { input: [[1, 2, null, 3, null, 4]], expectedOutput: 3, description: 'skewed tree, diameter does not pass through root' },
      ],
    },
    hints: {
      hints: [
        'The diameter at any node is the sum of the depths of its left and right subtrees — track the best of these sums seen across the whole tree, not just at the root.',
        'Write a helper that returns the depth of a subtree, and as a side effect updates a running "best diameter" using left-depth + right-depth at that node.',
        'The answer is measured in edges, not nodes — depth of a null subtree is 0, and depth of a single node is 1.',
      ],
    },
    solution: {
      algorithm: `
Step 2: At each node, get left and right heights.
Step 3: The path through this node has length left + right edges.
Step 4: Track the global maximum and return 1 + max(left,right) to the parent.

Core idea from source:
Do a post-order DFS where \`depth(node)\` returns the height of the subtree rooted at node (0 for null). At every node, compute left depth and right depth, update a running maximum diameter with left + right (the longest path passing through this node), and return 1 + max(left, right) as this node\\'s own depth to its parent.`,
      dryRun: `
node 2: left=1,right=1 → diameter candidate 2.
node 1: left=2,right=1 → candidate 3.
answer=3 edges.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function diameterOfBinaryTree(tree) {
  const root = buildTree(tree);
  let diameter = 0;

  function depth(node) {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  }

  depth(root);
  return diameter;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function diameterOfBinaryTreeUsingBuiltIns(tree) { return Math.max(diameterOfBinaryTree(tree), 0); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function diameterOfBinaryTree(tree: (number | null)[]): number {
  const root = buildTree(tree);
  let diameter = 0;

  function depth(node: TreeNode | null): number {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  }

  depth(root);
  return diameter;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function diameterOfBinaryTreeUsingBuiltIns(tree: (number | null)[]): number { return Math.max(diameterOfBinaryTree(tree), 0); }`,
      timeComplexity: 'O(n) — each node is visited exactly once.',
      spaceComplexity: 'O(h) — recursion stack depth equals tree height.',
      commonMistakes: [
        'Computing diameter only at the root (left depth + right depth of the root), missing longer paths entirely within one subtree.',
        'Confusing "diameter in edges" with "diameter in nodes" (edges = nodes - 1 for any single path).',
        'Recomputing depth from scratch for every node instead of reusing the post-order return values, turning an O(n) algorithm into O(n²).',
      ],
      followUpQuestions: [
        'How would you also return the actual two endpoint nodes of the diameter path, not just its length?',
        'How would this generalize to an N-ary tree?',
        'How would you compute the diameter of a general (non-tree) graph, and how is that a fundamentally different problem?',
      ],
      similarQuestions: ['Binary Tree Maximum Path Sum', 'Maximum Depth of Binary Tree', 'Longest Univalue Path'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-5',
      questionNumber: 'DSACODE-M11-5',
      title: 'Invert Binary Tree',
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
        'Given a binary tree (level-order encoded), invert it (swap every left and right child, recursively) and return the inverted tree as a level-order array.',
      input: 'tree: (number|null)[]',
      output: '(number|null)[] — the mirror-inverted tree, level-order encoded',
      constraints: ['0 <= number of nodes <= 100', '-100 <= node value <= 100'],
      examples: [
        { input: 'tree = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]', explanation: "Every node's left and right children are swapped, all the way down." },
        { input: 'tree = [2,1,3]', output: '[2,3,1]', explanation: 'Left child 1 and right child 3 swap places.' },
        { input: 'tree = []', output: '[]', explanation: 'An empty tree inverts to itself.' },
      ],
      edgeCases: [
        { case: 'Empty tree', expected: 'Returns []' },
        { case: 'Single node', expected: 'Returns the same single-node tree' },
        { case: 'Already-symmetric tree', expected: 'Inverting still swaps structurally, even if values look unchanged for a palindrome tree' },
      ],
      functionName: 'invertTree',
      isClassBased: false,
      sampleTests: [
        { input: [[4, 2, 7, 1, 3, 6, 9]], expectedOutput: [4, 7, 2, 9, 6, 3, 1], description: 'classic full inversion' },
        { input: [[2, 1, 3]], expectedOutput: [2, 3, 1], description: 'small tree' },
        { input: [[]], expectedOutput: [], description: 'empty tree' },
        { input: [[1]], expectedOutput: [1], description: 'single node' },
      ],
    },
    hints: {
      hints: [
        'Inverting a tree means every node swaps its left and right subtree — including recursively within those subtrees.',
        'Recurse into both children first (or swap first then recurse — order does not matter as long as both children get inverted), then swap the current node\'s left/right pointers.',
        'You will need a `serializeTree` helper to convert the inverted linked structure back to a level-order array for the return value.',
      ],
    },
    solution: {
      algorithm: `
Step 2: Recursively invert the left and right subtrees.
Step 3: Swap the two returned subtrees at the current node.
Step 4: Serialize the inverted tree.

Core idea from source:
Recursively invert: for a null node, return null. Otherwise recursively invert the left and right subtrees, then swap them on the current node before returning it. Serialize the final inverted tree back to a level-order array.`,
      dryRun: `
Invert subtree 2 → [2,3,1].
Invert subtree 7 → [7,9,6].
Swap them at 4 → [4,7,2,9,6,3,1].`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

${SERIALIZE_TREE_JS}

function invertTree(tree) {
  const root = buildTree(tree);

  function helper(node) {
    if (!node) return null;
    const left = helper(node.left);
    const right = helper(node.right);
    node.left = right;
    node.right = left;
    return node;
  }

  return serializeTree(helper(root));
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function invertTreeUsingBuiltIns(tree) { return invertTree(tree.map(value => value)); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

${SERIALIZE_TREE_TS}

function invertTree(tree: (number | null)[]): (number | null)[] {
  const root = buildTree(tree);

  function helper(node: TreeNode | null): TreeNode | null {
    if (!node) return null;
    const left = helper(node.left);
    const right = helper(node.right);
    node.left = right;
    node.right = left;
    return node;
  }

  return serializeTree(helper(root));
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function invertTreeUsingBuiltIns(tree: (number | null)[]): (number | null)[] { return invertTree(tree.map(value => value)); }`,
      timeComplexity: 'O(n) — every node is visited exactly once.',
      spaceComplexity: 'O(h) recursion stack, plus O(n) for the serialized output.',
      commonMistakes: [
        'Swapping the children by value instead of by reference/pointer, silently breaking the subtree structure.',
        'Forgetting to recurse into the (already-swapped) children, inverting only the top level.',
        'Assuming the tree is a BST and needs re-sorting after inversion — inversion is purely structural, values are not reordered by any comparison.',
      ],
      followUpQuestions: [
        'How would you invert the tree iteratively using a queue or stack instead of recursion?',
        'How would you check if a tree is a mirror of itself (symmetric) without actually inverting it?',
        'What breaks if you try to invert a BST and still expect BST ordering afterward?',
      ],
      similarQuestions: ['Symmetric Tree', 'Same Tree', 'Merge Two Binary Trees'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-6',
      questionNumber: 'DSACODE-M11-6',
      title: 'Lowest Common Ancestor of a Binary Tree',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given a binary tree (level-order encoded, all node values unique) and the values of two nodes `p` and `q` known to exist in the tree, return the value of their lowest common ancestor (the deepest node that has both p and q as descendants, where a node can be a descendant of itself).',
      input: 'tree: (number|null)[], p: number, q: number',
      output: 'number — the value of the lowest common ancestor node',
      constraints: ['2 <= number of nodes <= 10^4', 'All node values are unique', 'p and q both exist in the tree and are different from each other'],
      examples: [
        { input: 'tree = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3', explanation: '5 and 1 are on opposite sides of the root, so the root itself is the LCA.' },
        { input: 'tree = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5', explanation: '4 is a descendant of 5, so 5 is its own ancestor and the LCA.' },
        { input: 'tree = [1,2], p = 1, q = 2', output: '1', explanation: 'The root is an ancestor of its only child.' },
      ],
      edgeCases: [
        { case: 'One target is an ancestor of the other', expected: 'The ancestor itself is returned as the LCA' },
        { case: 'Targets are on opposite subtrees of the root', expected: 'The root is the LCA' },
        { case: 'Targets are siblings', expected: 'Their shared parent is the LCA' },
      ],
      functionName: 'lowestCommonAncestor',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1], expectedOutput: 3, description: 'targets on opposite sides of the root' },
        { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4], expectedOutput: 5, description: 'one target is an ancestor of the other' },
        { input: [[1, 2], 1, 2], expectedOutput: 1, description: 'two-node tree' },
        { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 7, 4], expectedOutput: 2, description: 'both targets share a nearer common ancestor (node 2) than the root' },
      ],
    },
    hints: {
      hints: [
        'At each node, if you find either p or q, that node itself is a candidate answer — stop searching deeper on that branch.',
        'Recurse into both children. If both sides report finding one of the targets, the current node is the LCA.',
        'If only one side finds something, pass that result up unchanged — the LCA must be further up (or is that found node itself).',
      ],
    },
    solution: {
      algorithm: `
Step 2: If the current node is p or q, return it.
Step 3: Search both subtrees.
Step 4: If both sides find a target, the current node is the LCA; otherwise propagate the non-null result.

Core idea from source:
Recursively search: if the current node is null, or its value matches p or q, return the current node. Otherwise recurse left and right. If both recursive calls return a non-null node, the current node is the LCA (p and q were found in different subtrees). If only one side returns non-null, propagate that result upward unchanged — it's either the LCA itself or one of the targets on the way to it.`,
      dryRun: `
At node 3: left subtree finds 5; right subtree finds 1.
Both sides are non-null → node 3 is the LCA.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function lowestCommonAncestor(tree, p, q) {
  const root = buildTree(tree);

  function helper(node) {
    if (!node) return null;
    if (node.val === p || node.val === q) return node;

    const left = helper(node.left);
    const right = helper(node.right);

    if (left && right) return node;
    return left || right;
  }

  const result = helper(root);
  return result ? result.val : null;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function lowestCommonAncestorUsingBuiltIns(tree, p, q) { return lowestCommonAncestor(tree.filter(() => true), p, q); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function lowestCommonAncestor(tree: (number | null)[], p: number, q: number): number | null {
  const root = buildTree(tree);

  function helper(node: TreeNode | null): TreeNode | null {
    if (!node) return null;
    if (node.val === p || node.val === q) return node;

    const left = helper(node.left);
    const right = helper(node.right);

    if (left && right) return node;
    return left || right;
  }

  const result = helper(root);
  return result ? result.val : null;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function lowestCommonAncestorUsingBuiltIns(tree: (number | null)[], p: number, q: number): number | null { return lowestCommonAncestor(tree.filter(() => true), p, q); }`,
      timeComplexity: 'O(n) — in the worst case every node is visited once.',
      spaceComplexity: 'O(h) — recursion stack depth equals tree height.',
      commonMistakes: [
        'Assuming the tree is a BST and using value comparisons to navigate, which only works for Binary Search Trees, not general binary trees.',
        'Not handling the case where one of p or q is itself an ancestor of the other — the algorithm above handles it naturally, but a hand-rolled path-comparison approach often misses it.',
        'Returning early without checking the sibling subtree, missing the case where the LCA is higher up than expected.',
      ],
      followUpQuestions: [
        'How would this differ (and simplify) if the tree were guaranteed to be a BST?',
        'How would you solve this if nodes had a `parent` pointer instead of doing a top-down search?',
        'How would you find the LCA of more than two nodes at once?',
      ],
      similarQuestions: ['Lowest Common Ancestor of a Binary Search Tree', 'Lowest Common Ancestor of a Binary Tree III', 'Smallest Common Region'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-7',
      questionNumber: 'DSACODE-M11-7',
      title: 'Path Sum II',
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
        'Given a binary tree (level-order encoded) and an integer `targetSum`, return every root-to-leaf path whose values sum to `targetSum`. Each path is returned as an array of node values in order from root to leaf.',
      input: 'tree: (number|null)[], targetSum: number',
      output: 'number[][] — every qualifying root-to-leaf path',
      constraints: ['0 <= number of nodes <= 5000', '-1000 <= node value, targetSum <= 1000'],
      examples: [
        {
          input: 'tree = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22',
          output: '[[5,4,11,2],[5,8,4,5]]',
          explanation: 'Two root-to-leaf paths sum to 22.',
        },
        { input: 'tree = [1,2,3], targetSum = 5', output: '[]', explanation: 'No path sums to 5.' },
        { input: 'tree = [1,2], targetSum = 0', output: '[]', explanation: 'No leaf sums to 0.' },
      ],
      edgeCases: [
        { case: 'Empty tree', expected: 'Returns []' },
        { case: 'No matching path', expected: 'Returns []' },
        { case: 'Multiple qualifying paths', expected: 'All of them are returned, in the order discovered by a left-to-right DFS' },
      ],
      functionName: 'pathSum',
      isClassBased: false,
      sampleTests: [
        { input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22], expectedOutput: [[5, 4, 11, 2], [5, 8, 4, 5]], description: 'two qualifying paths' },
        { input: [[1, 2, 3], 5], expectedOutput: [], description: 'no path matches' },
        { input: [[], 0], expectedOutput: [], description: 'empty tree' },
        { input: [[1, 2], 3], expectedOutput: [[1, 2]], description: 'single qualifying path' },
      ],
    },
    hints: {
      hints: [
        'This is the same idea as the boolean Path Sum problem, but you now need to record the actual path, not just detect one.',
        'Maintain a running "current path" array: push the node\'s value on entry, and pop it on exit (classic backtracking), so the array is correct only while that node is on the active call stack.',
        'A path is only recorded when you reach a leaf and the remaining target exactly equals that leaf\'s value — copy the current path array at that point, since it will be mutated afterward.',
      ],
    },
    solution: {
      algorithm: `
Step 2: Push the current node before exploring children.
Step 3: Record a copy only when a leaf exactly completes the target.
Step 4: Pop on return so sibling branches start with a clean path.

Core idea from source:
DFS with backtracking: maintain a \`path\` array and the remaining target. On entering a node, push its value onto path. If it is a leaf and remaining === node.val, copy path into the results. Otherwise recurse into left and right children with remaining - node.val. On exiting the node (after both recursive calls), pop it off path so sibling branches see a clean path.`,
      dryRun: `
5→4→11→2 = 22 → record [5,4,11,2].
5→8→4→5 = 22 → record [5,8,4,5].
No other root-to-leaf path matches.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function pathSum(tree, targetSum) {
  const root = buildTree(tree);
  const paths = [];
  const path = [];

  function helper(node, remaining) {
    if (!node) return;

    path.push(node.val);

    if (!node.left && !node.right && remaining === node.val) {
      paths.push([...path]);
    }

    helper(node.left, remaining - node.val);
    helper(node.right, remaining - node.val);

    path.pop();
  }

  helper(root, targetSum);
  return paths;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function pathSumUsingBuiltIns(tree, targetSum) { return pathSum(tree.slice(), targetSum).map(path => [...path]); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function pathSum(tree: (number | null)[], targetSum: number): number[][] {
  const root = buildTree(tree);
  const paths: number[][] = [];
  const path: number[] = [];

  function helper(node: TreeNode | null, remaining: number): void {
    if (!node) return;

    path.push(node.val);

    if (!node.left && !node.right && remaining === node.val) {
      paths.push([...path]);
    }

    helper(node.left, remaining - node.val);
    helper(node.right, remaining - node.val);

    path.pop();
  }

  helper(root, targetSum);
  return paths;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function pathSumUsingBuiltIns(tree: (number | null)[], targetSum: number): number[][] { return pathSum(tree.slice(), targetSum).map(path => [...path]); }`,
      timeComplexity: 'O(n^2) worst case — O(n) nodes visited, each potentially copying an O(n)-length path when a leaf matches (a fully skewed tree with every path matching is the pathological case).',
      spaceComplexity: 'O(n) for the recursion stack and path array, plus O(n) per stored result path.',
      commonMistakes: [
        'Pushing a reference to the shared `path` array into results instead of a copy (`[...path]`), so every stored path ends up reflecting the final backtracked state instead of the state at that leaf.',
        'Forgetting the `path.pop()` after both recursive calls, which leaks values from one branch into sibling branches.',
        'Checking `remaining === node.val` before confirming the node is a leaf, incorrectly recording paths that stop at an internal node.',
      ],
      followUpQuestions: [
        'How would you modify this if paths did not have to start at the root or end at a leaf?',
        'How would you count qualifying paths without allocating the actual path arrays, if you only needed the count?',
        'How would you find just one matching path (Path Sum, boolean version) more efficiently by short-circuiting?',
      ],
      similarQuestions: ['Path Sum', 'Path Sum III', 'Binary Tree Paths'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-8',
      questionNumber: 'DSACODE-M11-8',
      title: 'Binary Tree Maximum Path Sum',
      difficulty: 'Hard',
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
        'Given a binary tree (level-order encoded), a "path" is any non-empty sequence of nodes connected by parent-child edges, where each node appears at most once, and the path does not need to pass through the root. Return the maximum possible sum of node values along any such path.',
      input: 'tree: (number|null)[]',
      output: 'number — the maximum path sum found anywhere in the tree',
      constraints: ['1 <= number of nodes <= 3 * 10^4', '-1000 <= node value <= 1000'],
      examples: [
        { input: 'tree = [1,2,3]', output: '6', explanation: 'The path 2 → 1 → 3 sums to 6.' },
        { input: 'tree = [-10,9,20,null,null,15,7]', output: '42', explanation: 'The path 15 → 20 → 7 sums to 42, entirely bypassing the negative root.' },
        { input: 'tree = [-3]', output: '-3', explanation: 'A single node is itself the only path, even if negative.' },
      ],
      edgeCases: [
        { case: 'All values negative', expected: 'Returns the single largest (least negative) value, since an empty path is not allowed' },
        { case: 'Single node', expected: "Returns that node's own value" },
        { case: 'Best path is entirely within one subtree, not through the root', expected: 'Still found, since every node tracks its own best local path' },
      ],
      functionName: 'maxPathSum',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3]], expectedOutput: 6, description: 'simple three-node tree' },
        { input: [[-10, 9, 20, null, null, 15, 7]], expectedOutput: 42, description: 'best path skips the negative root' },
        { input: [[-3]], expectedOutput: -3, description: 'single negative node' },
        { input: [[2, -1]], expectedOutput: 2, description: 'negative child is excluded from the best path' },
      ],
    },
    hints: {
      hints: [
        "For each node, the best path that can be *extended upward* to its parent is: this node's value plus at most one of its children's best downward contributions (not both — a path can't branch twice through one node and still extend further up).",
        "Separately, track a global best answer that considers this node as the path's \"peak\": node.val + left contribution + right contribution (both sides allowed here, since this path stops at this node).",
        'Clamp each child\'s contribution to at least 0 before using it — a negative subtree contribution should simply be excluded (treated as "do not extend into that child") rather than dragging the sum down.',
      ],
    },
    solution: {
      algorithm: `
Step 2: Clamp negative child contributions to zero.
Step 3: Treat the current node as the path peak using node + left + right and update the global best.
Step 4: Return node + max(left,right) because only one branch can continue upward.

Core idea from source:
Post-order DFS. For each node, recursively get the best non-negative single-branch contribution from its left and right children (clamped to 0 if negative — a negative branch should not be included). Update a global \`best\` with node.val + left + right (this node as the peak of a path that can go both ways, but cannot extend further up). Return to the parent node.val + max(left, right) — only one side, since a path passed up to the parent can only continue in one direction.`,
      dryRun: `
node 20: left=15,right=7 → candidate 42.
root -10 would make 34, so 42 remains best.
answer=42.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function maxPathSum(tree) {
  const root = buildTree(tree);
  let best = -Infinity;

  function helper(node) {
    if (!node) return 0;

    const left = Math.max(0, helper(node.left));
    const right = Math.max(0, helper(node.right));

    best = Math.max(best, node.val + left + right);

    return node.val + Math.max(left, right);
  }

  helper(root);
  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function maxPathSumUsingBuiltIns(tree) { return Math.max(...[maxPathSum(tree)]); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function maxPathSum(tree: (number | null)[]): number {
  const root = buildTree(tree);
  let best = -Infinity;

  function helper(node: TreeNode | null): number {
    if (!node) return 0;

    const left = Math.max(0, helper(node.left));
    const right = Math.max(0, helper(node.right));

    best = Math.max(best, node.val + left + right);

    return node.val + Math.max(left, right);
  }

  helper(root);
  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function maxPathSumUsingBuiltIns(tree: (number | null)[]): number { return Math.max(...[maxPathSum(tree)]); }`,
      timeComplexity: 'O(n) — each node is visited exactly once in the post-order traversal.',
      spaceComplexity: 'O(h) — recursion stack depth equals tree height.',
      commonMistakes: [
        'Returning `node.val + left + right` up to the parent instead of `node.val + max(left, right)` — a path handed up the tree can only extend in one direction, not branch both ways.',
        'Not clamping negative child contributions to 0, which lets a very negative subtree drag down an otherwise-good path instead of being excluded.',
        'Initializing `best` to 0 instead of `-Infinity`, which silently produces the wrong (too high) answer for an all-negative tree.',
      ],
      followUpQuestions: [
        'How would you also return the actual sequence of nodes forming the best path, not just its sum?',
        'How does this problem\'s "clamp negative contributions to 0, but track two different return values (local peak vs. upward-extendable)" pattern generalize to other tree DP problems?',
        'How would the solution change if the path were required to pass through the root?',
      ],
      similarQuestions: ['Diameter of Binary Tree', 'House Robber III', 'Longest Univalue Path'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-9',
      questionNumber: 'DSACODE-M11-9',
      title: 'Sum Root to Leaf Numbers',
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
        'Given a binary tree (level-order encoded) where every node has a value 0-9, each root-to-leaf path represents a number formed by concatenating the digits along that path. Return the total sum of all root-to-leaf numbers.',
      input: 'tree: (number|null)[]',
      output: 'number — the sum of all root-to-leaf numbers',
      constraints: ['1 <= number of nodes <= 1000', '0 <= node value <= 9', 'The sum fits in a 32-bit signed integer'],
      examples: [
        { input: 'tree = [1,2,3]', output: '25', explanation: 'Path 1→2 forms 12, path 1→3 forms 13; 12+13=25.' },
        { input: 'tree = [4,9,0,5,1]', output: '1026', explanation: 'Paths form 495, 491, and 40; 495+491+40=1026.' },
        { input: 'tree = [0]', output: '0', explanation: 'A single root node with value 0 forms the number 0.' },
      ],
      edgeCases: [
        { case: 'Single node', expected: "Returns that node's value as the whole \"number\"" },
        { case: 'A node value of 0 appears mid-path', expected: 'It contributes a digit 0 in that position, not treated as a missing/leading-zero issue' },
        { case: 'Skewed tree (single long path)', expected: 'Returns the one long multi-digit number formed by that path' },
      ],
      functionName: 'sumNumbers',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3]], expectedOutput: 25, description: 'two simple paths' },
        { input: [[4, 9, 0, 5, 1]], expectedOutput: 1026, description: 'three paths of varying length' },
        { input: [[0]], expectedOutput: 0, description: 'single root node' },
        { input: [[1, 0]], expectedOutput: 10, description: 'a 0 digit appears as a non-leading digit' },
      ],
    },
    hints: {
      hints: [
        'Carry a running number down the recursion: at each node, `current = current * 10 + node.val` extends the number by one digit.',
        'Only add the running number to the total once you reach a leaf — internal nodes are incomplete numbers.',
        'This is structurally identical to Path Sum, except you are building a number instead of a sum, and totaling across all leaves instead of checking against one target.',
      ],
    },
    solution: {
      algorithm: `
Step 2: Carry the number formed so far.
Step 3: Extend it with current = current * 10 + node.val.
Step 4: Add the number only when a leaf is reached.

Core idea from source:
DFS carrying a \`current\` running number. At each node, current = current * 10 + node.val. If it is a leaf, add current to a running total. Otherwise recurse into both children, passing the updated current down (no backtracking needed since current is passed by value, not shared mutable state).`,
      dryRun: `
4→49→495; leaf adds 495.
4→49→491; leaf adds 491.
4→40; leaf adds 40.
495+491+40=1026.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function sumNumbers(tree) {
  const root = buildTree(tree);
  let total = 0;

  function helper(node, current) {
    if (!node) return;

    current = current * 10 + node.val;

    if (!node.left && !node.right) {
      total += current;
      return;
    }

    helper(node.left, current);
    helper(node.right, current);
  }

  helper(root, 0);
  return total;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function sumNumbersUsingBuiltIns(tree) { return [sumNumbers(tree)][0]; }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function sumNumbers(tree: (number | null)[]): number {
  const root = buildTree(tree);
  let total = 0;

  function helper(node: TreeNode | null, current: number): void {
    if (!node) return;

    current = current * 10 + node.val;

    if (!node.left && !node.right) {
      total += current;
      return;
    }

    helper(node.left, current);
    helper(node.right, current);
  }

  helper(root, 0);
  return total;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function sumNumbersUsingBuiltIns(tree: (number | null)[]): number { return [sumNumbers(tree)][0]; }`,
      timeComplexity: 'O(n) — each node is visited exactly once.',
      spaceComplexity: 'O(h) — recursion stack depth equals tree height (the running number itself is O(1) extra space per call).',
      commonMistakes: [
        'Building the number as a string and parsing it at the end instead of the simpler `current * 10 + digit` running arithmetic.',
        'Adding to the total at every node instead of only at leaves, which massively overcounts.',
        'Using a shared mutable variable for `current` across recursive calls instead of passing it by value, which lets sibling branches corrupt each other\'s running number.',
      ],
      followUpQuestions: [
        'How would this change if digits could be any value, not just 0-9 (would concatenation still make sense)?',
        'How would you handle a tree deep enough that the resulting number overflows a standard integer type?',
        'How is this problem structurally the same as Path Sum, and where do they diverge?',
      ],
      similarQuestions: ['Path Sum', 'Binary Tree Paths', 'Smallest String Starting From Leaf'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-10',
      questionNumber: 'DSACODE-M11-10',
      title: 'Kth Smallest Element in a BST',
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
        'Given the root of a binary search tree (level-order encoded) and an integer `k`, return the value of the kth smallest element in the tree (1-indexed).',
      input: 'tree: (number|null)[], k: number',
      output: 'number — the kth smallest value in the BST',
      constraints: ['1 <= number of nodes <= 10^4', '0 <= node value <= 10^4', '1 <= k <= number of nodes'],
      examples: [
        { input: 'tree = [3,1,4,null,2], k = 1', output: '1', explanation: 'In-order traversal of a BST visits values ascending: 1, 2, 3, 4 — the 1st smallest is 1.' },
        { input: 'tree = [5,3,6,2,4,null,null,1], k = 3', output: '3', explanation: 'In-order: 1, 2, 3, 4, 5, 6 — the 3rd smallest is 3.' },
        { input: 'tree = [1], k = 1', output: '1', explanation: 'The only node is trivially the 1st smallest.' },
      ],
      edgeCases: [
        { case: 'k equals the number of nodes', expected: 'Returns the maximum value in the tree' },
        { case: 'k = 1', expected: 'Returns the minimum value in the tree' },
        { case: 'Left-skewed or right-skewed tree', expected: 'In-order traversal still yields ascending order correctly' },
      ],
      functionName: 'kthSmallest',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 1, 4, null, 2], 1], expectedOutput: 1, description: 'smallest element' },
        { input: [[5, 3, 6, 2, 4, null, null, 1], 3], expectedOutput: 3, description: 'middle element in a larger BST' },
        { input: [[1], 1], expectedOutput: 1, description: 'single node' },
        { input: [[5, 3, 6, 2, 4, null, null, 1], 6], expectedOutput: 6, description: 'k equals node count, returns the maximum' },
      ],
    },
    hints: {
      hints: [
        'An in-order traversal (left, node, right) of a BST visits nodes in strictly ascending value order — this is the key property to exploit.',
        'Walk the in-order traversal, incrementing a counter each time you visit a node, and stop as soon as the counter reaches k.',
        'You do not need to build the full sorted list first — short-circuit and stop recursing further once the kth node is found, to avoid unnecessary work.',
      ],
    },
    solution: {
      algorithm: `
Step 2: Visit left subtree, current node, then right subtree.
Step 3: Increment a counter when a node is visited.
Step 4: Stop when count reaches k.

Core idea from source:
Perform an in-order DFS (left, then node, then right). Maintain a counter incremented on each node visit. Once the counter equals k, record that node's value as the answer and stop recursing further (short-circuit both remaining branches).`,
      dryRun: `
k=3 → visit 1(count1), 2(count2), 3(count3).
answer=3 and traversal stops.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function kthSmallest(tree, k) {
  const root = buildTree(tree);
  let count = 0;
  let result = null;

  function helper(node) {
    if (!node || result !== null) return;

    helper(node.left);
    if (result !== null) return;

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    helper(node.right);
  }

  helper(root);
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function kthSmallestUsingBuiltIns(tree, k) { const copy = tree.filter(value => value === null || typeof value === "number"); return kthSmallest(copy, k); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function kthSmallest(tree: (number | null)[], k: number): number | null {
  const root = buildTree(tree);
  let count = 0;
  let result: number | null = null;

  function helper(node: TreeNode | null): void {
    if (!node || result !== null) return;

    helper(node.left);
    if (result !== null) return;

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    helper(node.right);
  }

  helper(root);
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function kthSmallestUsingBuiltIns(tree: (number | null)[], k: number): number | null { const copy = tree.filter(value => value === null || typeof value === "number"); return kthSmallest(copy, k); }`,
      timeComplexity: 'O(h + k) — descends to the leftmost node (O(h)) then visits k nodes in order; O(n) worst case if k is close to n.',
      spaceComplexity: 'O(h) — recursion stack depth equals tree height.',
      commonMistakes: [
        'Doing a full in-order traversal into an array first and then indexing k-1, which works but does unnecessary extra work when k is small relative to n.',
        'Forgetting to short-circuit once the answer is found, continuing to traverse (and potentially overwrite) the result on later nodes.',
        'Off-by-one: treating k as 0-indexed instead of the problem\'s stated 1-indexed convention.',
      ],
      followUpQuestions: [
        'How would you optimize this to O(log n + k) using an iterative in-order traversal with an explicit stack?',
        'How would you handle frequent insertions/deletions if kth-smallest queries needed to be fast repeatedly (augmented BST with subtree-size counters)?',
        'How would you find the kth *largest* element instead, with a minimal code change?',
      ],
      similarQuestions: ['Validate Binary Search Tree', 'Binary Search Tree Iterator', 'Kth Largest Element in an Array'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-11',
      questionNumber: 'DSACODE-M11-11',
      title: 'All Nodes Distance K in Binary Tree',
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
        'Given a binary tree (level-order encoded, all values unique), the value of a target node, and an integer `k`, return the values of all nodes that are exactly distance `k` from the target node (distance measured in edges, treating the tree as an undirected graph — so parents count as neighbors too).',
      input: 'tree: (number|null)[], targetVal: number, k: number',
      output: 'number[] — the values of all nodes at distance k, sorted ascending',
      constraints: ['1 <= number of nodes <= 500', 'All node values are unique', 'targetVal exists in the tree', '0 <= k <= 1000'],
      examples: [
        {
          input: 'tree = [3,5,1,6,2,0,8,null,null,7,4], targetVal = 5, k = 2',
          output: '[1,4,7]',
          explanation: 'From node 5, distance 2 reaches 1 (via parent 3), 4 and 7 (via child 2), all treating tree edges as bidirectional.',
        },
        { input: 'tree = [3,5,1,6,2,0,8,null,null,7,4], targetVal = 5, k = 0', output: '[5]', explanation: 'Distance 0 from a node is the node itself.' },
        { input: 'tree = [1], targetVal = 1, k = 1', output: '[]', explanation: 'A single node has no neighbors at distance 1.' },
      ],
      edgeCases: [
        { case: 'k = 0', expected: 'Returns just the target value itself' },
        { case: 'k larger than any distance in the tree', expected: 'Returns []' },
        { case: 'Target is the root', expected: "Works the same way — the root's \"parent\" direction is simply absent" },
      ],
      functionName: 'distanceK',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 2], expectedOutput: [1, 4, 7], description: 'mixes parent and child directions' },
        { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 0], expectedOutput: [5], description: 'distance zero is the target itself' },
        { input: [[1], 1, 1], expectedOutput: [], description: 'no neighbors at that distance' },
        { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 3, 1], expectedOutput: [1, 5], description: 'root target, only children (no parent)' },
      ],
    },
    hints: {
      hints: [
        'A binary tree only gives you child pointers, but this problem needs to travel toward the parent too — first build a map from every node to its parent by walking the tree once.',
        'With parent pointers available, treat the tree as an undirected graph and do a plain BFS from the target node, where each node\'s neighbors are its left child, right child, and parent (whichever exist).',
        'Track visited nodes during the BFS so you never walk back the way you came (e.g. from a child straight back to its parent).',
      ],
    },
    solution: {
      algorithm: `
Step 2: Find the target node by value.
Step 3: BFS from the target using left, right, and parent as neighbors.
Step 4: Stop at distance k and return the frontier values in deterministic sorted order, matching the source tests.

Core idea from source:
First DFS the tree once to build a Map from each node to its parent (root maps to null). Find the target node by value. Then BFS from the target treating left child, right child, and parent as neighbors, tracking visited nodes to avoid revisiting. Stop expanding once the BFS frontier's distance equals k, and return the values of that frontier.`,
      dryRun: `
distance 0: {5}
distance 1: {6,2,3}
distance 2: {7,4,1}
sorted result=[1,4,7].`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function distanceK(tree, targetVal, k) {
  const root = buildTree(tree);

  const parentMap = new Map();
  function mapParents(node, parent) {
    if (!node) return;
    parentMap.set(node, parent);
    mapParents(node.left, node);
    mapParents(node.right, node);
  }
  mapParents(root, null);

  let targetNode = null;
  function findTarget(node) {
    if (!node) return;
    if (node.val === targetVal) targetNode = node;
    findTarget(node.left);
    findTarget(node.right);
  }
  findTarget(root);

  const visited = new Set([targetNode]);
  let queue = [targetNode];
  let distance = 0;

  while (queue.length > 0) {
    if (distance === k) {
      return queue.map((node) => node.val).sort((a, b) => a - b);
    }

    const next = [];
    for (const node of queue) {
      const neighbors = [node.left, node.right, parentMap.get(node)];
      for (const neighbor of neighbors) {
        if (neighbor && !visited.has(neighbor)) {
          visited.add(neighbor);
          next.push(neighbor);
        }
      }
    }

    queue = next;
    distance++;
  }

  return [];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function distanceKUsingBuiltIns(tree, targetVal, k) { return distanceK(tree.slice(), targetVal, k).sort((a, b) => a - b); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function distanceK(tree: (number | null)[], targetVal: number, k: number): number[] {
  const root = buildTree(tree);

  const parentMap = new Map<TreeNode, TreeNode | null>();
  function mapParents(node: TreeNode | null, parent: TreeNode | null): void {
    if (!node) return;
    parentMap.set(node, parent);
    mapParents(node.left, node);
    mapParents(node.right, node);
  }
  mapParents(root, null);

  let targetNode: TreeNode | null = null;
  function findTarget(node: TreeNode | null): void {
    if (!node) return;
    if (node.val === targetVal) targetNode = node;
    findTarget(node.left);
    findTarget(node.right);
  }
  findTarget(root);

  if (!targetNode) return [];

  const visited = new Set<TreeNode>([targetNode]);
  let queue: TreeNode[] = [targetNode];
  let distance = 0;

  while (queue.length > 0) {
    if (distance === k) {
      return queue.map((node) => node.val).sort((a, b) => a - b);
    }

    const next: TreeNode[] = [];
    for (const node of queue) {
      const neighbors = [node.left, node.right, parentMap.get(node) ?? null];
      for (const neighbor of neighbors) {
        if (neighbor && !visited.has(neighbor)) {
          visited.add(neighbor);
          next.push(neighbor);
        }
      }
    }

    queue = next;
    distance++;
  }

  return [];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function distanceKUsingBuiltIns(tree: (number | null)[], targetVal: number, k: number): number[] { return distanceK(tree.slice(), targetVal, k).sort((a, b) => a - b); }`,
      timeComplexity: 'O(n) — building the parent map visits every node once, and the BFS visits every node at most once.',
      spaceComplexity: 'O(n) — the parent map, visited set, and BFS queue can each hold up to n entries.',
      commonMistakes: [
        'Forgetting the parent direction entirely and only exploring child pointers, which misses every node "above and to the side" of the target.',
        'Not tracking visited nodes, causing the BFS to bounce back and forth between a node and its parent indefinitely.',
        'Off-by-one in the distance loop — returning the frontier one step too early or late relative to k.',
      ],
      followUpQuestions: [
        'How would you solve this without building an explicit parent map, e.g. by passing distance-to-target information down during a single DFS?',
        'How would you find the single node closest to two different targets simultaneously?',
        'How would this generalize to a general graph instead of a tree?',
      ],
      similarQuestions: ['Binary Tree Level Order Traversal', 'Amount of Time for Binary Tree to Be Infected', 'Shortest Path in Binary Matrix'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m11-12',
      questionNumber: 'DSACODE-M11-12',
      title: 'Validate Binary Search Tree',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: CATEGORY,
      part: 'DSA',
      concepts: CONCEPTS,
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        "Given a binary tree (level-order encoded), determine whether it is a valid binary search tree: for every node, all values in its left subtree are strictly less than the node's value, and all values in its right subtree are strictly greater — not just compared to the immediate parent, but to every ancestor's bound.",
      input: 'tree: (number|null)[]',
      output: 'boolean — true if the tree is a valid BST',
      constraints: ['0 <= number of nodes <= 10^4', '-2^31 <= node value <= 2^31 - 1'],
      examples: [
        { input: 'tree = [2,1,3]', output: 'true', explanation: 'Left (1) < root (2) < right (3).' },
        {
          input: 'tree = [5,1,4,null,null,3,6]',
          output: 'false',
          explanation: "3 is in the right subtree (rooted at 4, itself in root 5's right subtree) but 3 < 5, violating the BST property against the root's bound, not just its immediate parent.",
        },
        { input: 'tree = [1,1]', output: 'false', explanation: 'A duplicate value violates the strict inequality requirement.' },
      ],
      edgeCases: [
        { case: 'Empty tree', expected: 'Returns true — vacuously a valid BST' },
        { case: 'Single node', expected: 'Returns true' },
        { case: 'A deep node violates an ancestor bound but not its immediate parent', expected: 'Still correctly detected as invalid' },
      ],
      functionName: 'isValidBST',
      isClassBased: false,
      sampleTests: [
        { input: [[2, 1, 3]], expectedOutput: true, description: 'small valid BST' },
        { input: [[5, 1, 4, null, null, 3, 6]], expectedOutput: false, description: 'violates an ancestor bound, not the immediate parent' },
        { input: [[5, 4, 6, null, null, 3, 7]], expectedOutput: false, description: '3 is in the right subtree of the root but less than it' },
        { input: [[1]], expectedOutput: true, description: 'single node' },
      ],
    },
    hints: {
      hints: [
        "Comparing each node only to its immediate parent is not enough — a node deep in a right subtree must be greater than every ancestor on the path down, not just its direct parent.",
        'Pass a valid (min, max) range down through the recursion: the left child\'s range becomes (min, node.val), and the right child\'s becomes (node.val, max).',
        'Use strict inequalities throughout — a BST as defined here does not allow duplicate values equal to an ancestor.',
      ],
    },
    solution: {
      algorithm: `
Step 2: Carry an exclusive min/max range for every node.
Step 3: Left children must be < current and right children > current.
Step 4: Propagate tighter bounds recursively and stop at the first violation.

Core idea from source:
Recursively validate with a (min, max) bound passed down (both start as null, meaning unbounded). At each node, if min is not null and node.val <= min, or max is not null and node.val >= max, the tree is invalid. Otherwise recurse into the left child with (min, node.val) and the right child with (node.val, max), requiring both to be valid.`,
      dryRun: `
5 gives range (-∞,+∞).
1 is valid in (-∞,5).
4 is valid in (5,+∞), but its left child 3 must be >5 and is not.
answer=false.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${BUILD_TREE_JS}

function isValidBST(tree) {
  const root = buildTree(tree);

  function helper(node, min, max) {
    if (!node) return true;
    if (min !== null && node.val <= min) return false;
    if (max !== null && node.val >= max) return false;

    return helper(node.left, min, node.val) && helper(node.right, node.val, max);
  }

  return helper(root, null, null);
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isValidBSTUsingBuiltIns(tree) { return [isValidBST(tree)].every(Boolean); }`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
${TS_NODE_TYPE}

${BUILD_TREE_TS}

function isValidBST(tree: (number | null)[]): boolean {
  const root = buildTree(tree);

  function helper(node: TreeNode | null, min: number | null, max: number | null): boolean {
    if (!node) return true;
    if (min !== null && node.val <= min) return false;
    if (max !== null && node.val >= max) return false;

    return helper(node.left, min, node.val) && helper(node.right, node.val, max);
  }

  return helper(root, null, null);
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isValidBSTUsingBuiltIns(tree: (number | null)[]): boolean { return [isValidBST(tree)].every(Boolean); }`,
      timeComplexity: 'O(n) — every node is visited once, with early termination on the first violation.',
      spaceComplexity: 'O(h) — recursion stack depth equals tree height.',
      commonMistakes: [
        "Only comparing each node to its immediate parent instead of threading a running (min, max) bound down from all ancestors — this misses violations like a right-subtree node that's smaller than a grandparent.",
        'Using `<=`/`>=` bound checks the wrong way around, or using non-strict comparisons that silently accept duplicate values.',
        'Using an in-order traversal and checking "is the previous value less than the current one" — a valid alternative, but easy to get wrong by forgetting to initialize "previous" to negative infinity or by comparing against the wrong duplicate-tolerant operator.',
      ],
      followUpQuestions: [
        'How would you solve this with an in-order traversal instead, and why does in-order strictly-ascending values imply a valid BST?',
        'How would you validate the tree iteratively instead of recursively, for very deep trees where recursion risks a stack overflow?',
        'How would you find the two nodes to swap to fix a BST where exactly two nodes were swapped by mistake (Recover Binary Search Tree)?',
      ],
      similarQuestions: ['Kth Smallest Element in a BST', 'Recover Binary Search Tree', 'Binary Search Tree Iterator'],
    },
  },
];