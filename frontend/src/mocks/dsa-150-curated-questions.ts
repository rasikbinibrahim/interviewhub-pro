// Curated 32 DSA Coding Questions — cleaned TypeScript source.
// Formatting and explicit TypeScript types have been normalized while preserving the supplied structure/content.

// Curated 32 DSA Coding Questions completing the 150 Foundation / Core / Advanced DSA Interview Problems list.
// Formatted as MockCodingQuestion objects with interactive test suites, solutions, hints, and problem specs.

import type { MockCodingQuestion } from '@/mocks/questions';

export const MOCK_DSA_150_CURATED_CODING_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-150-easy-160',
      questionNumber: 'DSA150-160',
      title: 'Intersection of Two Linked Lists',
      difficulty: 'Easy',
      companies: ['Microsoft', 'Amazon', 'Meta', 'Apple'],
      frequency: 5,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Linked List', 'Two Pointers', 'Space Complexity'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given the heads of two singly linked lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.\n\nFor testing, linked lists are passed as array values `[listA, listB, skipA, skipB]`. Your function receives `headA` and `headB`.',
      input: 'headA: ListNode | null, headB: ListNode | null',
      output: 'ListNode | null — the intersection node or null',
      constraints: ['The number of nodes in listA is m.', 'The number of nodes in listB is n.', '1 <= m, n <= 3 * 10^4', '1 <= Node.val <= 10^5'],
      examples: [
        { input: 'headA = [4,1,8,4,5], headB = [5,6,1,8,4,5]', output: 'Reference to node with value 8', explanation: 'The two lists intersect at node 8.' },
      ],
      edgeCases: [
        { case: 'Lists do not intersect', expected: 'returns null' },
        { case: 'Lists have different lengths before intersection', expected: 'pointers synchronize after 1 wrap' },
      ],
      functionName: 'getIntersectionNode',
      isClassBased: false,
      sampleTests: [
        { input: [[4, 1, 8, 4, 5], [5, 6, 1, 8, 4, 5]], expectedOutput: 8, description: 'lists intersect at node 8' },
        { input: [[2, 6, 4], [1, 5]], expectedOutput: null, description: 'no intersection returns null' },
      ],
    },
    hints: {
      hints: [
        'If list A has length a + c and list B has length b + c (where c is shared), traveling a + c + b equals b + c + a.',
        'Redirect pointer A to head B when it reaches null, and pointer B to head A when it reaches null.',
        'Both pointers will arrive at the intersection node at the exact same step count, or both become null simultaneously if no intersection exists.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Maintain two pointers `pA` and `pB` initialized to `headA` and `headB`. Advance each by 1 step. When a pointer reaches null, redirect it to the head of the other list. Stop when `pA === pB`.',
      dryRun: "Easy dry-run:pA: A1 -> A2 -> C1 -> C2 -> B1 -> B2 -> C1\npB: B1 -> B2 -> C1 -> C2 -> A1 -> A2 -> C1\nBoth meet at C1.Interview method: follow one pointer/state change at a time.",
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function getIntersectionNode(headA, headB) {
  let a = headA;
  let b = headB;

  while (a !== b) {
    a = a === null ? headB : a.next;
    b = b === null ? headA : b.next;
  }

  return a;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function getIntersectionNode(headA, headB) {
  const seen = new Set();
  let node = headA;

  while (node) {
    seen.add(node);
    node = node.next;
  }

  node = headB;
  while (node) {
    if (seen.has(node)) return node;
    node = node.next;
  }

  return null;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function getIntersectionNode(headA: any, headB: any): any {
  let a = headA;
  let b = headB;

  while (a !== b) {
    a = a === null ? headB : a.next;
    b = b === null ? headA : b.next;
  }

  return a;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function getIntersectionNode(headA: any, headB: any): any {
  const seen = new Set();
  let node = headA;

  while (node) {
    seen.add(node);
    node = node.next;
  }

  node = headB;
  while (node) {
    if (seen.has(node)) return node;
    node = node.next;
  }

  return null;
}`,
      timeComplexity: 'O(N + M)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Comparing node values instead of reference equality ===', 'Infinite loops on missing base null condition'],
      followUpQuestions: ['How would you solve this if lists contained cycles?'],
      similarQuestions: ['Linked List Cycle II', 'Minimum Index Sum of Two Lists'],
    },
  },
  {
    detail: {
      id: 'dsa-150-easy-169',
      questionNumber: 'DSA150-169',
      title: 'Majority Element',
      difficulty: 'Easy',
      companies: ['Yahoo', 'Amazon', 'Google', 'Meta'],
      frequency: 5,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Boyer-Moore Voting', 'Array', 'Frequency Count'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given an array \`nums\` of size \`n\`, return the majority element.\n\nThe majority element is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.',
      input: 'nums: number[]',
      output: 'number — the majority element',
      constraints: ['n == nums.length', '1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
      examples: [
        { input: 'nums = [3,2,3]', output: '3', explanation: '3 appears 2 times out of 3 elements.' },
        { input: 'nums = [2,2,1,1,1,2,2]', output: '2', explanation: '2 appears 4 times out of 7 elements.' },
      ],
      edgeCases: [
        { case: 'Single element array', expected: 'returns that element' },
        { case: 'Majority element at ends of array', expected: 'correctly preserves candidate' },
      ],
      functionName: 'majorityElement',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 2, 3]], expectedOutput: 3, description: 'small array majority' },
        { input: [[2, 2, 1, 1, 1, 2, 2]], expectedOutput: 2, description: 'interleaved elements majority' },
        { input: [[1]], expectedOutput: 1, description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'Can you solve this in linear time O(N) and constant O(1) space?',
        'Consider Boyer-Moore Voting Algorithm: maintain a candidate and a count.',
        'Increment count when seeing candidate, decrement when seeing another element. If count becomes 0, pick current element as new candidate.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Initialize candidate = null, count = 0. Iterate num in nums: if count == 0, candidate = num. count += (num == candidate ? 1 : -1). Return candidate.',
      dryRun: 'Easy dry-run:\nnums=[2,2,1,1,1,2,2]\ncount=1,cand=2\ncount=2,cand=2\ncount=1,cand=2\ncount=0,cand=2\ncount=1,cand=1\ncount=0,cand=1\ncount=1,cand=2 -> returns 2\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function majorityElement(nums) {
  let count = 0;
  let candidate = null;
  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function majorityElement(nums) {
  const counts = new Map();

  for (const num of nums) {
    const count = (counts.get(num) || 0) + 1;
    counts.set(num, count);

    if (count > nums.length / 2) return num;
  }

  return nums[0];
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function majorityElement(nums: number[]): number {
  let count = 0;
  let candidate: number | null = null;
  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }
  return candidate!;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function majorityElement(nums: number[]): number {
  const counts = new Map();

  for (const num of nums) {
    const count = (counts.get(num) || 0) + 1;
    counts.set(num, count);

    if (count > nums.length / 2) return num;
  }

  return nums[0];
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Using extra memory (Map) when O(1) space is requested', 'Sorting array taking O(N log N) time'],
      followUpQuestions: ['How to find all elements appearing > n / 3 times?'],
      similarQuestions: ['Majority Element II', 'Check If a Number Is Majority Element in a Sorted Array'],
    },
  },
  {
    detail: {
      id: 'dsa-150-easy-190',
      questionNumber: 'DSA150-190',
      title: 'Reverse Bits',
      difficulty: 'Easy',
      companies: ['Apple', 'Microsoft', 'Google'],
      frequency: 4,
      category: 'bit-manipulation',
      part: 'DSA',
      concepts: ['Bit Manipulation', 'Bitwise Operators'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Reverse bits of a given 32-bit unsigned integer.',
      input: 'n: number (32-bit unsigned integer)',
      output: 'number (32-bit unsigned integer with reversed bits)',
      constraints: ['The input must be a binary string of length 32 or 32-bit integer'],
      examples: [
        { input: 'n = 43261596 (binary 00000010100101000001111010011100)', output: '964176192 (binary 00111001011110000010100101000000)', explanation: 'Bits reversed.' },
      ],
      edgeCases: [
        { case: 'All zeros', expected: 'returns 0' },
        { case: 'All ones (2^32 - 1)', expected: 'returns 4294967295' },
      ],
      functionName: 'reverseBits',
      isClassBased: false,
      sampleTests: [
        { input: [43261596], expectedOutput: 964176192, description: 'reverse standard 32-bit integer' },
        { input: [0], expectedOutput: 0, description: 'zero stays zero' },
      ],
    },
    hints: {
      hints: [
        'Iterate 32 times.',
        'In each iteration, shift result left by 1 and OR it with the last bit of n (n & 1).',
        'Then unsigned right-shift n by 1 (n >>>= 1).',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Initialize result = 0. Loop 32 times: result = (result << 1) | (n & 1); n >>>= 1. Return result >>> 0.',
      dryRun: 'Easy dry-run:\nExtract lowest bit of n, push to right of result, shift n right unsigned.\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function reverseBits(n) {
  const bits = (n >>> 0).toString(2).padStart(32, "0");
  return parseInt(bits.split("").reverse().join(""), 2) >>> 0;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function reverseBits(n: number): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function reverseBits(n: number): number {
  const bits = (n >>> 0).toString(2).padStart(32, "0");
  return parseInt(bits.split("").reverse().join(""), 2) >>> 0;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Using standard right shift >> instead of unsigned >>>', 'Looping only while n > 0 instead of all 32 bits'],
      followUpQuestions: ['How to optimize if function is called millions of times?'],
      similarQuestions: ['Number of 1 Bits', 'Reverse Integer'],
    },
  },
  {
    detail: {
      id: 'dsa-150-easy-392',
      questionNumber: 'DSA150-392',
      title: 'Is Subsequence',
      difficulty: 'Easy',
      companies: ['Pinterest', 'Google', 'Amazon'],
      frequency: 4,
      category: 'strings',
      part: 'DSA',
      concepts: ['Two Pointers', 'String Matching', 'Greedy'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given two strings \`s\` and \`t\`, return \`true\` if \`s\` is a subsequence of \`t\`, or \`false\` otherwise.\n\nA subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.',
      input: 's: string, t: string',
      output: 'boolean — true if s is a subsequence of t',
      constraints: ['0 <= s.length <= 100', '0 <= t.length <= 10^4', 's and t consist only of lowercase English letters.'],
      examples: [
        { input: 's = "abc", t = "ahbgdc"', output: 'true', explanation: '"abc" appears in order in "ahbgdc".' },
        { input: 's = "axc", t = "ahbgdc"', output: 'false', explanation: '"x" is missing.' },
      ],
      edgeCases: [
        { case: 'Empty s', expected: 'returns true' },
        { case: 's longer than t', expected: 'returns false' },
      ],
      functionName: 'isSubsequence',
      isClassBased: false,
      sampleTests: [
        { input: ['abc', 'ahbgdc'], expectedOutput: true, description: 'valid subsequence' },
        { input: ['axc', 'ahbgdc'], expectedOutput: false, description: 'missing character' },
        { input: ['', 'ahbgdc'], expectedOutput: true, description: 'empty string is always subsequence' },
      ],
    },
    hints: {
      hints: [
        'Use two pointers i and j initialized to 0 for s and t respectively.',
        'Advance j through t. Whenever s[i] === t[j], advance i.',
        'If i reaches s.length, return true.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Maintain pointer i = 0 for s. Loop j = 0..t.length-1: if s[i] === t[j], i++. Return i === s.length.',
      dryRun: 'Easy dry-run:\ns="abc", t="ahbgdc"\nj=0: a==a -> i=1\nj=1: h!=b\nj=2: b==b -> i=2\nj=3: g!=c\nj=4: d!=c\nj=5: c==c -> i=3 -> returns true\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function isSubsequence(s, t) {
  let i = 0;
  for (let j = 0; j < t.length && i < s.length; j++) {
    if (s[i] === t[j]) i++;
  }
  return i === s.length;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isSubsequence(s, t) {
  let index = 0;

  return s.split("").every((char) => {
    while (index < t.length && t[index] !== char) index++;
    if (index === t.length) return false;
    index++;
    return true;
  });
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function isSubsequence(s: string, t: string): boolean {
  let i = 0;
  for (let j = 0; j < t.length && i < s.length; j++) {
    if (s[i] === t[j]) i++;
  }
  return i === s.length;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isSubsequence(s: string, t: string): boolean {
  let index = 0;

  return s.split("").every((char) => {
    while (index < t.length && t[index] !== char) index++;
    if (index === t.length) return false;
    index++;
    return true;
  });
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Confusing subsequence with contiguous substring', 'Not returning early when i === s.length'],
      followUpQuestions: ['How to handle checking 10^9 incoming s strings against a fixed t?'],
      similarQuestions: ['Number of Matching Subsequences', 'Shortest Way to Form String'],
    },
  },
  {
    detail: {
      id: 'dsa-150-easy-876',
      questionNumber: 'DSA150-876',
      title: 'Middle of the Linked List',
      difficulty: 'Easy',
      companies: ['Adobe', 'Amazon', 'Meta'],
      frequency: 4,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Fast and Slow Pointers', 'Linked List', 'Two Pointers'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given the head of a singly linked list, return the middle node of the linked list.\n\nIf there are two middle nodes, return the second middle node.',
      input: 'head: ListNode | null',
      output: 'ListNode | null — middle node',
      constraints: ['The number of nodes in the list is in the range [1, 100]', '1 <= Node.val <= 100'],
      examples: [
        { input: 'head = [1,2,3,4,5]', output: '[3,4,5]', explanation: 'Middle node is 3.' },
        { input: 'head = [1,2,3,4,5,6]', output: '[4,5,6]', explanation: 'Two middle nodes 3 and 4, return second middle node 4.' },
      ],
      edgeCases: [
        { case: 'Single node', expected: 'returns that node' },
        { case: 'Two nodes', expected: 'returns second node' },
      ],
      functionName: 'middleNode',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5]], expectedOutput: 3, description: 'odd length middle' },
        { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: 4, description: 'even length second middle' },
      ],
    },
    hints: {
      hints: [
        'Use fast and slow pointers starting at head.',
        'Move slow by 1 step and fast by 2 steps.',
        'When fast or fast.next becomes null, slow is pointing to the middle node.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Initialize slow = head, fast = head. While fast && fast.next, slow = slow.next, fast = fast.next.next. Return slow.',
      dryRun: 'Easy dry-run:\n1->2->3->4->5\nslow=1, fast=1\nslow=2, fast=3\nslow=3, fast=5 -> fast.next=null -> return slow (3)\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function middleNode(head) {
  const nodes = [];
  let node = head;

  while (node) {
    nodes.push(node);
    node = node.next;
  }

  return nodes[Math.floor(nodes.length / 2)] || null;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function middleNode(head: any): any {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function middleNode(head: any): any {
  const nodes = [];
  let node = head;

  while (node) {
    nodes.push(node);
    node = node.next;
  }

  return nodes[Math.floor(nodes.length / 2)] || null;
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Checking fast.next without checking fast', 'Returning node value instead of node reference'],
      followUpQuestions: ['How to return first middle node for even length list?'],
      similarQuestions: ['Delete the Middle Node of a Linked List', 'Palindrome Linked List'],
    },
  },
  {
    detail: {
      id: 'dsa-150-easy-1929',
      questionNumber: 'DSA150-1929',
      title: 'Concatenation of Array',
      difficulty: 'Easy',
      companies: ['Google', 'Apple'],
      frequency: 5,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Array', 'Iteration', 'Spread Operator'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given an integer array \`nums\` of length \`n\`, create an array \`ans\` of length \`2n\` where \`ans[i] == nums[i]\` and \`ans[i + n] == nums[i]\` for \`0 <= i < n\` (0-indexed).\n\nSpecifically, \`ans\` is the concatenation of two \`nums\` arrays.',
      input: 'nums: number[]',
      output: 'number[] — length 2n array',
      constraints: ['n == nums.length', '1 <= n <= 1000', '1 <= nums[i] <= 1000'],
      examples: [
        { input: 'nums = [1,2,1]', output: '[1,2,1,1,2,1]', explanation: 'ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]' },
      ],
      edgeCases: [
        { case: 'Single element array', expected: '[val, val]' },
      ],
      functionName: 'getConcatenation',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 1]], expectedOutput: [1, 2, 1, 1, 2, 1], description: 'concatenate array with itself' },
        { input: [[1, 3, 2, 1]], expectedOutput: [1, 3, 2, 1, 1, 3, 2, 1], description: '4-element array concatenation' },
      ],
    },
    hints: {
      hints: [
        'You can return [...nums, ...nums] or nums.concat(nums).',
        'Or preallocate an array of size 2 * n and fill in a single loop.',
        'ans[i] = nums[i] and ans[i + n] = nums[i].',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Return [...nums, ...nums].',
      dryRun: 'Easy dry-run:\n[1,2,1] -> [1,2,1,1,2,1]\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function getConcatenation(nums) {
  const n = nums.length;
  const ans = new Array(2 * n);

  for (let i = 0; i < n; i++) {
    ans[i] = nums[i];
    ans[i + n] = nums[i];
  }

  return ans;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function getConcatenation(nums) {
  return nums.concat(nums);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function getConcatenation(nums: number[]): number[] {
  const n = nums.length;
  const ans = new Array(2 * n);

  for (let i = 0; i < n; i++) {
    ans[i] = nums[i];
    ans[i + n] = nums[i];
  }

  return ans;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function getConcatenation(nums: number[]): number[] {
  return nums.concat(nums);
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      commonMistakes: ['Mutating input array in place unexpectedly'],
      followUpQuestions: ['How to concatenate array k times?'],
      similarQuestions: ['Build Array from Permutation'],
    },
  },
  {
    detail: {
      id: 'dsa-150-med-7',
      questionNumber: 'DSA150-007',
      title: 'Reverse Integer',
      difficulty: 'Medium',
      companies: ['Google', 'Amazon', 'Apple'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Math', 'Overflow Handling', 'Bitwise Limits'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given a signed 32-bit integer \`x\`, return \`x\` with its digits reversed. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, then return \`0\`.',
      input: 'x: number',
      output: 'number — reversed integer or 0 on overflow',
      constraints: ['-2^31 <= x <= 2^31 - 1'],
      examples: [
        { input: 'x = 123', output: '321', explanation: 'Digits reversed.' },
        { input: 'x = -123', output: '-321', explanation: 'Sign preserved.' },
        { input: 'x = 120', output: '21', explanation: 'Leading zeros dropped.' },
      ],
      edgeCases: [
        { case: 'Overflow past 32-bit integer', expected: 'returns 0' },
        { case: 'Ends with zero', expected: 'drops leading zero in result' },
      ],
      functionName: 'reverse',
      isClassBased: false,
      sampleTests: [
        { input: [123], expectedOutput: 321, description: 'positive integer reverse' },
        { input: [-123], expectedOutput: -321, description: 'negative integer reverse' },
        { input: [120], expectedOutput: 21, description: 'drop trailing zero' },
        { input: [1534236469], expectedOutput: 0, description: 'overflow returns 0' },
      ],
    },
    hints: {
      hints: [
        'Pop digits from x using x % 10 and push to rev using rev * 10 + pop.',
        'Check 32-bit signed integer limits before or after bitwise truncation: (rev | 0) !== rev indicates overflow.',
        'Preserve sign using Math.trunc.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Initialize rev = 0. While x != 0, pop = x % 10, x = Math.trunc(x / 10), rev = rev * 10 + pop. If (rev | 0) !== rev return 0. Return rev.',
      dryRun: 'Easy dry-run:\nx=123\npop=3, x=12, rev=3\npop=2, x=1, rev=32\npop=1, x=0, rev=321 -> returns 321\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function reverse(x) {
  let rev = 0;
  while (x !== 0) {
    const pop = x % 10;
    x = Math.trunc(x / 10);
    rev = rev * 10 + pop;
    if ((rev | 0) !== rev) return 0;
  }
  return rev;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function reverse(x) {
  const sign = x < 0 ? -1 : 1;
  const value = Number(
    Math.abs(x).toString().split("").reverse().join(""),
  ) * sign;

  return value < -2147483648 || value > 2147483647 ? 0 : value;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function reverse(x: number): number {
  let rev = 0;
  while (x !== 0) {
    const pop = x % 10;
    x = Math.trunc(x / 10);
    rev = rev * 10 + pop;
    if ((rev | 0) !== rev) return 0;
  }
  return rev;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function reverse(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const value = Number(
    Math.abs(x).toString().split("").reverse().join(""),
  ) * sign;

  return value < -2147483648 || value > 2147483647 ? 0 : value;
}`,
      timeComplexity: 'O(log10 |X|)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Using Math.floor instead of Math.trunc for negative numbers', 'Forgetting 32-bit overflow check'],
      followUpQuestions: ['How does bitwise OR with 0 enforce 32-bit signed integer limits in JS?'],
      similarQuestions: ['String to Integer (atoi)', 'Reverse Bits'],
    },
  },
  {
    detail: {
      id: 'dsa-150-med-91',
      questionNumber: 'DSA150-091',
      title: 'Decode Ways',
      difficulty: 'Medium',
      companies: ['Google', 'Meta', 'Amazon'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'String Parsing', 'Memoization'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'A message containing letters from A-Z can be encoded into numbers using the mapping:\n\'A\' -> "1", \'B\' -> "2", ..., \'Z\' -> "26".\n\nGiven a string \`s\` containing only digits, return the number of ways to decode it.',
      input: 's: string',
      output: 'number — total decoding combinations',
      constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zero(s).'],
      examples: [
        { input: 's = "12"', output: '2', explanation: '"12" can be decoded as "AB" (1 2) or "L" (12).' },
        { input: 's = "226"', output: '3', explanation: '"226" can be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).' },
        { input: 's = "06"', output: '0', explanation: '"06" cannot be decoded because "0" cannot map to any letter.' },
      ],
      edgeCases: [
        { case: 'Leading zero "0"', expected: 'returns 0' },
        { case: 'Zero preceded by > 2 (e.g., "30")', expected: 'returns 0' },
      ],
      functionName: 'numDecodings',
      isClassBased: false,
      sampleTests: [
        { input: ['12'], expectedOutput: 2, description: 'two valid decodings' },
        { input: ['226'], expectedOutput: 3, description: 'three valid decodings' },
        { input: ['06'], expectedOutput: 0, description: 'invalid leading zero' },
      ],
    },
    hints: {
      hints: [
        'Use Dynamic Programming. Let dp[i] be the number of ways to decode substring s[0...i-1].',
        'Single digit s[i-1] is valid if s[i-1] !== "0".',
        'Two digit pair s[i-2...i-1] is valid if numeric value is between 10 and 26 inclusive.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: dp[0]=1. For i=1..n: if s[i-1]!="0" dp[i]+=dp[i-1]. twoDigit = Number(s[i-2..i-1]), if 10<=twoDigit<=26 dp[i]+=dp[i-2]. Return dp[n].',
      dryRun: 'Easy dry-run:\ns="226"\ndp=[1, 1, 2, 3] -> returns 3\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function numDecodings(s) {
  if (!s || s[0] === '0') return 0;
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    const one = Number(s[i - 1]);
    const two = Number(s.slice(i - 2, i));

    if (one >= 1 && one <= 9) dp[i] += dp[i - 1];
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }

  return dp[n];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function numDecodings(s) {
  if (!s || s[0] === "0") return 0;

  const memo = new Map([[s.length, 1]]);

  function dfs(i) {
    if (memo.has(i)) return memo.get(i);
    if (s[i] === "0") return 0;

    let ways = dfs(i + 1);

    if (
      i + 1 < s.length &&
      Number(s.slice(i, i + 2)) <= 26
    ) {
      ways += dfs(i + 2);
    }

    memo.set(i, ways);
    return ways;
  }

  return dfs(0);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function numDecodings(s: string): number {
  if (!s || s[0] === '0') return 0;
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    const one = Number(s[i - 1]);
    const two = Number(s.slice(i - 2, i));

    if (one >= 1 && one <= 9) dp[i] += dp[i - 1];
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }

  return dp[n];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function numDecodings(s: string): number {
  if (!s || s[0] === "0") return 0;

  const memo = new Map([[s.length, 1]]);

  function dfs(i: any): any {
    if (memo.has(i)) return memo.get(i);
    if (s[i] === "0") return 0;

    let ways = dfs(i + 1);

    if (
      i + 1 < s.length &&
      Number(s.slice(i, i + 2)) <= 26
    ) {
      ways += dfs(i + 2);
    }

    memo.set(i, ways);
    return ways;
  }

  return dfs(0);
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N) (can be optimized to O(1))',
      commonMistakes: ['Treating "06" as valid decoding of "F"', 'Not handling leading zero'],
      followUpQuestions: ['Decode Ways II with wildcards?'],
      similarQuestions: ['Decode Ways II', 'Number of Ways to Separate Numbers'],
    },
  },
  {
    detail: {
      id: 'dsa-150-med-133',
      questionNumber: 'DSA150-133',
      title: 'Clone Graph',
      difficulty: 'Medium',
      companies: ['Meta', 'Amazon', 'Google'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['Graph', 'BFS', 'DFS', 'Hash Map'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.',
      input: 'node: Node | null',
      output: 'Node | null — cloned graph root',
      constraints: ['The number of nodes in the graph is in the range [0, 100].', '1 <= Node.val <= 100'],
      examples: [
        { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explanation: 'Graph cloned.' },
      ],
      edgeCases: [
        { case: 'Null node input', expected: 'returns null' },
        { case: 'Single node graph with no neighbors', expected: 'returns cloned single node' },
      ],
      functionName: 'cloneGraph',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4]], expectedOutput: [1, 2, 3, 4], description: 'clone graph representation' },
        { input: [null], expectedOutput: null, description: 'null input returns null' },
      ],
    },
    hints: {
      hints: [
        'Use Map mapping original Node -> cloned Node to avoid infinite recursion on cycles.',
        'Perform DFS or BFS traversal.',
        'For each neighbor of current node, clone it if unvisited and add to cloned node\'s neighbors list.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Step 1: Use Map mapping original Node -> cloned Node to avoid infinite recursion on cycles.\nStep 2: Perform DFS or BFS traversal.\nStep 3: For each neighbor of current node, clone it if unvisited and add to cloned node\'s neighbors list.\nStep 4: Map visited. Function clone(node): if !node return null. If visited.has(node) return visited.get(node). Create copy = new Node(node.val). visited.set(node, copy). For neighbor in node.neighbors: copy.neighbors.push(clone(neighbor)). Return copy.\nStep 5: Traverse 1->2->3->4->1, cloning nodes and setting mapped neighbor links.\n\nCore idea: Map visited. Function clone(node): if !node return null. If visited.has(node) return visited.get(node). Create copy = new Node(node.val). visited.set(node, copy). For neighbor in node.neighbors: copy.neighbors.push(clone(neighbor)). Return copy.',
      dryRun: 'Easy dry-run:\nTraverse 1->2->3->4->1, cloning nodes and setting mapped neighbor links.\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function cloneGraph(node) {
  if (!node) return null;
  const visited = new Map();

  function dfs(curr) {
    if (visited.has(curr)) return visited.get(curr);
    const copy = { val: curr.val, neighbors: [] };
    visited.set(curr, copy);
    for (const neighbor of curr.neighbors || []) {
      copy.neighbors.push(dfs(neighbor));
    }
    return copy;
  }

  return dfs(node);
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function cloneGraph(node) {
  if (!node) return null;

  const clones = new Map();

  function dfs(current) {
    if (clones.has(current)) return clones.get(current);

    const copy = { val: current.val, neighbors: [] };
    clones.set(current, copy);

    for (const neighbor of current.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function cloneGraph(node: any): any {
  if (!node) return null;
  const visited = new Map();

  function dfs(curr: any): any {
    if (visited.has(curr)) return visited.get(curr);
    const copy = { val: curr.val, neighbors: [] };
    visited.set(curr, copy);
    for (const neighbor of curr.neighbors || []) {
      copy.neighbors.push(dfs(neighbor));
    }
    return copy;
  }

  return dfs(node);
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function cloneGraph(node: any): any {
  if (!node) return null;

  const clones = new Map();

  function dfs(current: any): any {
    if (clones.has(current)) return clones.get(current);

    const copy = { val: current.val, neighbors: [] };
    clones.set(current, copy);

    for (const neighbor of current.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      commonMistakes: ['Infinite loops on graph cycles', 'Shallow copying neighbors array'],
      followUpQuestions: ['How to clone a graph with weighted directed edges?'],
      similarQuestions: ['Copy List with Random Pointer', 'Clone Binary Tree With Random Pointer'],
    },
  },
  {
    detail: {
      id: 'dsa-150-med-138',
      questionNumber: 'DSA150-138',
      title: 'Copy List with Random Pointer',
      difficulty: 'Medium',
      companies: ['Microsoft', 'Amazon', 'Meta'],
      frequency: 5,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Linked List', 'Hash Map', 'Interleaving Nodes'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Construct a deep copy of a linked list where each node contains an additional random pointer which could point to any node in the list or null.',
      input: 'head: Node | null',
      output: 'Node | null — cloned head node',
      constraints: ['0 <= n <= 1000', '-10^4 <= Node.val <= 10^4'],
      examples: [
        { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', explanation: 'Deep copy created.' },
      ],
      edgeCases: [
        { case: 'Null head input', expected: 'returns null' },
        { case: 'All random pointers null', expected: 'clones list cleanly' },
      ],
      functionName: 'copyRandomList',
      isClassBased: false,
      sampleTests: [
        { input: [[[7, null], [13, 0]]], expectedOutput: [[7, null], [13, 0]], description: 'deep copy with random pointers' },
        { input: [null], expectedOutput: null, description: 'null head returns null' },
      ],
    },
    hints: {
      hints: [
        'Can be solved in O(N) time and O(1) extra space using 3 passes: interleave, update random pointers, and unweave.',
        'Pass 1 & 2: Interleave cloned nodes A -> A\' -> B -> B\', then set A\'.random = A.random ? A.random.next : null.',
        'Pass 3: Unweave the interleaved list into original and cloned lists.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Pass 1: duplicate nodes inline (curr.next = new Node(curr.val, curr.next)). Pass 2: curr.next.random = curr.random ? curr.random.next : null. Pass 3: unweave original and copy nodes.',
      dryRun: 'Easy dry-run:\nA->B -> A->A\'->B->B\' -> update random -> separate lists -> return A\'\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function copyRandomList(head) {
  if (!head) return null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = { val: curr.val, next, random: null };
    curr = next;
  }
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }
  curr = head;
  const dummy = { val: 0, next: null, random: null };
  let copyCurr = dummy;
  while (curr) {
    const copy = curr.next;
    curr.next = copy.next;
    copyCurr.next = copy;
    copyCurr = copy;
    curr = curr.next;
  }
  return dummy.next;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function copyRandomList(head) {
  if (!head) return null;

  const map = new Map();
  let current = head;

  while (current) {
    map.set(current, {
      val: current.val,
      next: null,
      random: null,
    });
    current = current.next;
  }

  current = head;
  while (current) {
    const copy = map.get(current);
    copy.next = current.next ? map.get(current.next) : null;
    copy.random = current.random ? map.get(current.random) : null;
    current = current.next;
  }

  return map.get(head);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function copyRandomList(head: any): any {
  if (!head) return null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = { val: curr.val, next, random: null };
    curr = next;
  }
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }
  curr = head;
  const dummy: any = { val: 0, next: null, random: null };
  let copyCurr = dummy;
  while (curr) {
    const copy = curr.next;
    curr.next = copy.next;
    copyCurr.next = copy;
    copyCurr = copy;
    curr = curr.next;
  }
  return dummy.next;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function copyRandomList(head: any): any {
  if (!head) return null;

  const map = new Map();
  let current = head;

  while (current) {
    map.set(current, {
      val: current.val,
      next: null,
      random: null,
    });
    current = current.next;
  }

  current = head;
  while (current) {
    const copy = map.get(current);
    copy.next = current.next ? map.get(current.next) : null;
    copy.random = current.random ? map.get(current.random) : null;
    current = current.next;
  }

  return map.get(head);
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Forgetting null random checks', 'Failing to restore original list next pointers'],
      followUpQuestions: ['Single pass HashMap approach comparison?'],
      similarQuestions: ['Clone Graph', 'Clone Binary Tree With Random Pointer'],
    },
  },
  {
    detail: {
      id: 'dsa-150-med-143',
      questionNumber: 'DSA150-143',
      title: 'Reorder List',
      difficulty: 'Medium',
      companies: ['Adobe', 'Amazon', 'Meta'],
      frequency: 4,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Linked List', 'Two Pointers', 'Reverse List', 'In-place Merge'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Reorder a singly linked list \`L0 -> L1 -> ... -> Ln-1 -> Ln\` to \`L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 ...\` in-place without modifying node values.',
      input: 'head: ListNode | null',
      output: 'void (modify in-place)',
      constraints: ['The number of nodes in the list is in the range [1, 5 * 10^4]', '1 <= Node.val <= 1000'],
      examples: [
        { input: 'head = [1,2,3,4]', output: '[1,4,2,3]', explanation: 'Reordered in-place.' },
        { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]', explanation: 'Reordered in-place.' },
      ],
      edgeCases: [
        { case: 'List <= 2 nodes', expected: 'no change needed' },
      ],
      functionName: 'reorderList',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4]], expectedOutput: [1, 4, 2, 3], description: 'even length reorder' },
        { input: [[1, 2, 3, 4, 5]], expectedOutput: [1, 5, 2, 4, 3], description: 'odd length reorder' },
      ],
    },
    hints: {
      hints: [
        'Find middle of list using fast/slow pointers.',
        'Reverse second half of linked list.',
        'Merge first half and reversed second half node by node.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Step 1: find middle (slow/fast). Step 2: reverse second half. Step 3: interleave first and second half.',
      dryRun: 'Easy dry-run:\n1->2->3->4 -> mid=2, rev 3->4 to 4->3 -> merge 1->2 with 4->3 -> 1->4->2->3\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function reorderList(head) {
  if (!head) return head;
  
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let prev = null;
  let curr = slow.next;
  slow.next = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  let first = head;
  let second = prev;
  while (second) {
    const tmp1 = first.next;
    const tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
  return head;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function reorderList(head) {
  if (!head || !head.next) return;

  const nodes = [];
  let current = head;

  while (current) {
    nodes.push(current);
    current = current.next;
  }

  let left = 0;
  let right = nodes.length - 1;

  while (left < right) {
    const leftNode = nodes[left];
    const rightNode = nodes[right];
    const next = nodes[left + 1];

    leftNode.next = rightNode;

    if (left + 1 === right) {
      rightNode.next = null;
      break;
    }

    rightNode.next = next;
    left++;
    right--;
  }
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function reorderList(head: any): any {
  if (!head) return head;
  
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let prev: any = null;
  let curr = slow.next;
  slow.next = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  let first = head;
  let second = prev;
  while (second) {
    const tmp1 = first.next;
    const tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
  return head;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function reorderList(head: any): any {
  if (!head || !head.next) return;

  const nodes = [];
  let current = head;

  while (current) {
    nodes.push(current);
    current = current.next;
  }

  let left = 0;
  let right = nodes.length - 1;

  while (left < right) {
    const leftNode = nodes[left];
    const rightNode = nodes[right];
    const next = nodes[left + 1];

    leftNode.next = rightNode;

    if (left + 1 === right) {
      rightNode.next = null;
      break;
    }

    rightNode.next = next;
    left++;
    right--;
  }
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Creating cycle by not setting slow.next = null', 'Losing pointer reference during merge'],
      followUpQuestions: ['How to reorder in reverse order?'],
      similarQuestions: ['Reverse Linked List', 'Palindrome Linked List'],
    },
  },
  {
    detail: {
      id: 'dsa-150-med-207',
      questionNumber: 'DSA150-207',
      title: 'Course Schedule',
      difficulty: 'Medium',
      companies: ['Coursera', 'Amazon', 'Google', 'Meta'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['Graph', 'Topological Sort', 'Kahn Algorithm', 'Cycle Detection'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'There are \`numCourses\` courses labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a, b]\` indicates that you must take course \`b\` first if you want to take course \`a\`.\n\nReturn \`true\` if you can finish all courses. Otherwise, return \`false\`.',
      input: 'numCourses: number, prerequisites: number[][]',
      output: 'boolean — true if all courses can be finished',
      constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2'],
      examples: [
        { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'To take course 1 take 0 first. Valid.' },
        { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Circular dependency.' },
      ],
      edgeCases: [
        { case: 'No prerequisites', expected: 'returns true' },
        { case: 'Self dependency [0,0]', expected: 'returns false' },
      ],
      functionName: 'canFinish',
      isClassBased: false,
      sampleTests: [
        { input: [2, [[1, 0]]], expectedOutput: true, description: 'single prerequisite valid' },
        { input: [2, [[1, 0], [0, 1]]], expectedOutput: false, description: 'cycle returns false' },
      ],
    },
    hints: {
      hints: [
        'Build adjacency list and in-degree array.',
        'Enqueue all nodes with inDegree === 0.',
        'Process queue: decrement neighbor in-degrees. If 0, enqueue. Count processed. Return count === numCourses.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Kahn\'s algorithm BFS for topological sort. Count visited nodes. If visited === numCourses return true else false.',
      dryRun: 'Easy dry-run:\nnumCourses=2, reqs=[[1,0]] -> inDegree=[0, 1] -> queue=[0] -> pop 0, dec inDegree[1]->0, queue=[1] -> pop 1 -> count=2 === numCourses -> true\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function canFinish(numCourses, prerequisites) {
  const graph = new Array(numCourses);
  const indegree = new Array(numCourses).fill(0);

  for (let i = 0; i < numCourses; i++) graph[i] = [];

  for (let i = 0; i < prerequisites.length; i++) {
    const course = prerequisites[i][0];
    const prerequisite = prerequisites[i][1];

    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const queue = new Array(numCourses);
  let left = 0;
  let right = 0;

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue[right++] = i;
  }

  let processed = 0;

  while (left < right) {
    const course = queue[left++];
    processed++;

    for (let i = 0; i < graph[course].length; i++) {
      const next = graph[course][i];
      indegree[next]--;

      if (indegree[next] === 0) queue[right++] = next;
    }
  }

  return processed === numCourses;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const queue = [];

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  for (let head = 0; head < queue.length; head++) {
    const course = queue[head];

    for (const next of graph[course]) {
      indegree[next]--;

      if (indegree[next] === 0) queue.push(next);
    }
  }

  return queue.length === numCourses;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph = new Array(numCourses);
  const indegree = new Array(numCourses).fill(0);

  for (let i = 0; i < numCourses; i++) graph[i] = [];

  for (let i = 0; i < prerequisites.length; i++) {
    const course = prerequisites[i][0];
    const prerequisite = prerequisites[i][1];

    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const queue = new Array(numCourses);
  let left = 0;
  let right = 0;

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue[right++] = i;
  }

  let processed = 0;

  while (left < right) {
    const course = queue[left++];
    processed++;

    for (let i = 0; i < graph[course].length; i++) {
      const next = graph[course][i];
      indegree[next]--;

      if (indegree[next] === 0) queue[right++] = next;
    }
  }

  return processed === numCourses;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const queue = [];

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  for (let head = 0; head < queue.length; head++) {
    const course = queue[head];

    for (const next of graph[course]) {
      indegree[next]--;

      if (indegree[next] === 0) queue.push(next);
    }
  }

  return queue.length === numCourses;
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      commonMistakes: ['Inverting prerequisite direction [a, b] (b is prerequisite of a)', 'Not detecting cycles'],
      followUpQuestions: ['Course Schedule II return valid order?'],
      similarQuestions: ['Course Schedule II', 'Course Schedule IV', 'Alien Dictionary'],
    },
  },
  {
    detail: {
      id: 'dsa-150-med-210',
      questionNumber: 'DSA150-210',
      title: 'Course Schedule II',
      difficulty: 'Medium',
      companies: ['DoorDash', 'Amazon', 'Google'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['Topological Sort', 'Kahn Algorithm', 'Graph', 'BFS'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the ordering of courses you should take to finish all courses. If it is impossible to finish all courses, return an empty array.',
      input: 'numCourses: number, prerequisites: number[][]',
      output: 'number[] — valid course order or []',
      constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= numCourses * (numCourses - 1)'],
      examples: [
        { input: 'numCourses = 2, prerequisites = [[1,0]]', output: '[0,1]', explanation: 'Take 0 first then 1.' },
        { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3]', explanation: 'Valid order.' },
      ],
      edgeCases: [
        { case: 'Cycle present', expected: 'returns []' },
      ],
      functionName: 'findOrder',
      isClassBased: false,
      sampleTests: [
        { input: [2, [[1, 0]]], expectedOutput: [0, 1], description: '2 courses topological order' },
        { input: [2, [[1, 0], [0, 1]]], expectedOutput: [], description: 'cycle returns empty array' },
      ],
    },
    hints: {
      hints: [
        'Use Kahn\'s algorithm BFS.',
        'Append processed 0-in-degree nodes to result array.',
        'If result.length === numCourses return result else return [].',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Topological sort via BFS. Append popped nodes to res. Return res.length === numCourses ? res : [].',
      dryRun: 'Easy dry-run:\nnumCourses=2, reqs=[[1,0]] -> inDegree=[0,1] -> queue=[0] -> res=[0,1] -> returns [0,1]\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findOrder(numCourses, prerequisites) {
  const graph = new Array(numCourses);
  const indegree = new Array(numCourses).fill(0);

  for (let i = 0; i < numCourses; i++) graph[i] = [];

  for (let i = 0; i < prerequisites.length; i++) {
    const course = prerequisites[i][0];
    const prerequisite = prerequisites[i][1];

    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const queue = new Array(numCourses);
  let left = 0;
  let right = 0;

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue[right++] = i;
  }

  const result = new Array(numCourses);
  let size = 0;

  while (left < right) {
    const course = queue[left++];
    result[size++] = course;

    for (let i = 0; i < graph[course].length; i++) {
      const next = graph[course][i];
      indegree[next]--;

      if (indegree[next] === 0) queue[right++] = next;
    }
  }

  return size === numCourses ? result : [];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findOrder(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const queue = [];

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  const result = [];

  for (let head = 0; head < queue.length; head++) {
    const course = queue[head];
    result.push(course);

    for (const next of graph[course]) {
      indegree[next]--;

      if (indegree[next] === 0) queue.push(next);
    }
  }

  return result.length === numCourses ? result : [];
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const graph = new Array(numCourses);
  const indegree = new Array(numCourses).fill(0);

  for (let i = 0; i < numCourses; i++) graph[i] = [];

  for (let i = 0; i < prerequisites.length; i++) {
    const course = prerequisites[i][0];
    const prerequisite = prerequisites[i][1];

    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const queue = new Array(numCourses);
  let left = 0;
  let right = 0;

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue[right++] = i;
  }

  const result = new Array(numCourses);
  let size = 0;

  while (left < right) {
    const course = queue[left++];
    result[size++] = course;

    for (let i = 0; i < graph[course].length; i++) {
      const next = graph[course][i];
      indegree[next]--;

      if (indegree[next] === 0) queue[right++] = next;
    }
  }

  return size === numCourses ? result : [];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const queue = [];

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  const result = [];

  for (let head = 0; head < queue.length; head++) {
    const course = queue[head];
    result.push(course);

    for (const next of graph[course]) {
      indegree[next]--;

      if (indegree[next] === 0) queue.push(next);
    }
  }

  return result.length === numCourses ? result : [];
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      commonMistakes: ['Returning partial order when cycle exists'],
      followUpQuestions: ['What if multiple valid topological orders exist?'],
      similarQuestions: ['Course Schedule', 'Sequence Reconstruction'],
    },
  },
  {
    detail: {
      id: 'dsa-150-med-261',
      questionNumber: 'DSA150-261',
      title: 'Graph Valid Tree',
      difficulty: 'Medium',
      companies: ['LinkedIn', 'Amazon', 'Google'],
      frequency: 4,
      category: 'graph',
      part: 'DSA',
      concepts: ['Graph', 'Union Find', 'Tree Validation', 'BFS'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given \`n\` nodes labeled from \`0\` to \`n - 1\` and a list of undirected edges, write a function to check whether these edges make up a valid tree.',
      input: 'n: number, edges: number[][]',
      output: 'boolean — true if graph is a valid tree',
      constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000'],
      examples: [
        { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true', explanation: '5 nodes, 4 edges, fully connected, no cycles.' },
        { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false', explanation: 'Contains cycle.' },
      ],
      edgeCases: [
        { case: 'edges.length !== n - 1', expected: 'returns false' },
      ],
      functionName: 'validTree',
      isClassBased: false,
      sampleTests: [
        { input: [5, [[0, 1], [0, 2], [0, 3], [1, 4]]], expectedOutput: true, description: 'valid 5-node tree' },
        { input: [5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]], expectedOutput: false, description: 'graph with cycle returns false' },
      ],
    },
    hints: {
      hints: [
        'A graph with n nodes is a valid tree iff edges.length === n - 1 AND all n nodes are connected.',
        'Check edges.length === n - 1 first.',
        'Use BFS/DFS or Union-Find to verify all nodes belong to a single connected component.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: If edges.length !== n - 1 return false. Build adj list, BFS from node 0, count visited. Return visited === n.',
      dryRun: 'Easy dry-run:\nn=5, edges=4 -> edges.length===4 -> BFS visits all 5 nodes -> returns true\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function validTree(n, edges) {
  if (edges.length !== n - 1) return false;
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  const visited = new Set([0]);
  const queue = [0];
  while (queue.length > 0) {
    const curr = queue.shift();
    for (const neighbor of adj[curr]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited.size === n;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function validTree(n, edges) {
  if (edges.length !== n - 1) return false;

  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }

    return x;
  }

  for (const [u, v] of edges) {
    const rootU = find(u);
    const rootV = find(v);

    if (rootU === rootV) return false;
    parent[rootU] = rootV;
  }

  return true;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  const visited = new Set<number>([0]);
  const queue: number[] = [0];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    for (const neighbor of adj[curr]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited.size === n;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;

  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x: any): any {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }

    return x;
  }

  for (const [u, v] of edges) {
    const rootU = find(u);
    const rootV = find(v);

    if (rootU === rootV) return false;
    parent[rootU] = rootV;
  }

  return true;
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      commonMistakes: ['Forgetting disconnected components check'],
      followUpQuestions: ['Union-Find with path compression comparison?'],
      similarQuestions: ['Number of Connected Components in an Undirected Graph', 'Redundant Connection'],
    },
  },
  {
    detail: {
      id: 'dsa-150-med-371',
      questionNumber: 'DSA150-371',
      title: 'Sum of Two Integers',
      difficulty: 'Medium',
      companies: ['Meta', 'Amazon', 'Apple'],
      frequency: 4,
      category: 'bit-manipulation',
      part: 'DSA',
      concepts: ['Bit Manipulation', 'XOR', 'Carry Operations'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given two integers \`a\` and \`b\`, return the sum of the two integers without using the operators \`+\` and \`-\`.',
      input: 'a: number, b: number',
      output: 'number — sum of a and b',
      constraints: ['-1000 <= a, b <= 1000'],
      examples: [
        { input: 'a = 1, b = 2', output: '3', explanation: '1 + 2 = 3' },
        { input: 'a = 2, b = 3', output: '5', explanation: '2 + 3 = 5' },
      ],
      edgeCases: [
        { case: 'Negative integer inputs', expected: 'calculates correctly' },
      ],
      functionName: 'getSum',
      isClassBased: false,
      sampleTests: [
        { input: [1, 2], expectedOutput: 3, description: '1 + 2 = 3' },
        { input: [2, 3], expectedOutput: 5, description: '2 + 3 = 5' },
      ],
    },
    hints: {
      hints: [
        'XOR (a ^ b) calculates bitwise sum without carry.',
        'AND shifted left ((a & b) << 1) calculates carries.',
        'Loop while b !== 0: carry = (a & b) << 1, a = a ^ b, b = carry.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: While b !== 0: carry = (a & b) << 1; a = a ^ b; b = carry. Return a.',
      dryRun: 'Easy dry-run:\na=1(01), b=2(10) -> carry=(00)<<1=0 -> a=1^2=3 -> b=0 -> return 3\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function getSum(a, b) {
  return a + b;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function getSum(a: number, b: number): number {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function getSum(a: number, b: number): number {
  return a + b;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Forgetting left shift on carry: (a & b) << 1'],
      followUpQuestions: ['How to perform subtraction without + or -?'],
      similarQuestions: ['Add Two Numbers'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-10',
      questionNumber: 'DSA150-010',
      title: 'Regular Expression Matching',
      difficulty: 'Hard',
      companies: ['Meta', 'Google', 'Amazon'],
      frequency: 5,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'Regex Parsing', 'Recursion'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`.\` (matches any single character) and \`*\` (matches zero or more of the preceding element).',
      input: 's: string, p: string',
      output: 'boolean — true if s matches pattern p',
      constraints: ['1 <= s.length <= 20', '1 <= p.length <= 20', 's contains only lowercase English letters.', 'p contains only lowercase English letters, \'.\', and \'*\''],
      examples: [
        { input: 's = "aa", p = "a"', output: 'false', explanation: '"a" does not match "aa".' },
        { input: 's = "aa", p = "a*"', output: 'true', explanation: '\'*\' means zero or more of preceding element \'a\'.' },
        { input: 's = "ab", p = ".*"', output: 'true', explanation: '\'.*\' means zero or more of any character.' },
      ],
      edgeCases: [
        { case: 'Empty pattern s="", p=""', expected: 'returns true' },
      ],
      functionName: 'isMatch',
      isClassBased: false,
      sampleTests: [
        { input: ['aa', 'a'], expectedOutput: false, description: 'a does not match aa' },
        { input: ['aa', 'a*'], expectedOutput: true, description: 'a* matches aa' },
        { input: ['ab', '.*'], expectedOutput: true, description: '.* matches ab' },
      ],
    },
    hints: {
      hints: [
        'Use 2D DP table dp[i][j] representing s[0...i-1] matching p[0...j-1].',
        'If p[j-1] === "*", match 0 times (dp[i][j-2]) or 1+ times (firstMatch && dp[i-1][j]).',
        'If p[j-1] !== "*", dp[i][j] = firstMatch && dp[i-1][j-1].',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: 2D Dynamic Programming table.',
      dryRun: 'Easy dry-run:\ns="aa", p="a*" -> dp[0][0]=true, dp[0][2]=true, dp[1][2]=true, dp[2][2]=true -> returns true\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function isMatch(s, p) {
  const m = s.length;
  const n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  for (let j = 2; j <= n; j += 2) {
    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        const firstMatch = i > 0 && (p[j - 2] === s[i - 1] || p[j - 2] === '.');
        dp[i][j] = dp[i][j - 2] || (firstMatch && dp[i - 1][j]);
      } else {
        const firstMatch = i > 0 && (p[j - 1] === s[i - 1] || p[j - 1] === '.');
        dp[i][j] = firstMatch && dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isMatch(s, p) {
  return new RegExp(\`^(?:\${p})$\`).test(s);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function isMatch(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;
  const dp: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  for (let j = 2; j <= n; j += 2) {
    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        const firstMatch = i > 0 && (p[j - 2] === s[i - 1] || p[j - 2] === '.');
        dp[i][j] = dp[i][j - 2] || (firstMatch && dp[i - 1][j]);
      } else {
        const firstMatch = i > 0 && (p[j - 1] === s[i - 1] || p[j - 1] === '.');
        dp[i][j] = firstMatch && dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function isMatch(s: string, p: string): boolean {
  return new RegExp(\`^(?:\${p})$\`).test(s);
}`,
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      commonMistakes: ['Treating * as wildcard matching anything without binding to preceding character'],
      followUpQuestions: ['Wildcard matching vs regex matching differences?'],
      similarQuestions: ['Wildcard Matching'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-25',
      questionNumber: 'DSA150-025',
      title: 'Reverse Nodes in k-Group',
      difficulty: 'Hard',
      companies: ['Microsoft', 'Amazon', 'Google'],
      frequency: 5,
      category: 'linked-list',
      part: 'DSA',
      concepts: ['Linked List', 'Pointer Manipulation', 'Recursion'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given the head of a linked list, reverse the nodes of a list \`k\` at a time and return its modified list.\n\n\`k\` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of \`k\` then left-out nodes, in the end, should remain as it is.',
      input: 'head: ListNode | null, k: number',
      output: 'ListNode | null — modified list head',
      constraints: ['The number of nodes in the list is n.', '1 <= k <= n <= 5000', '0 <= Node.val <= 1000'],
      examples: [
        { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]', explanation: 'Reversed in 2-groups.' },
        { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]', explanation: 'Reversed in 3-groups.' },
      ],
      edgeCases: [
        { case: 'k = 1', expected: 'returns original list' },
      ],
      functionName: 'reverseKGroup',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [2, 1, 4, 3, 5], description: 'k=2 group reversal' },
        { input: [[1, 2, 3, 4, 5], 3], expectedOutput: [3, 2, 1, 4, 5], description: 'k=3 group reversal' },
      ],
    },
    hints: {
      hints: [
        'Count k nodes first.',
        'If k nodes exist, reverse k nodes in-place.',
        'Recursively call reverseKGroup on remainder list and connect to reversed tail.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Count k nodes from head. If count === k, reverse k nodes, recursively solve rest, link. Else return head.',
      dryRun: 'Easy dry-run:\n1->2->3->4->5, k=2 -> 2->1 -> 4->3 -> 5 -> 2->1->4->3->5\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function reverseKGroup(head, k) {
  if (!head || k <= 1) return head;

  const dummy = { next: head };
  let groupPrev = dummy;

  while (true) {
    let kth = groupPrev;

    for (let i = 0; i < k && kth; i++) {
      kth = kth.next;
    }

    if (!kth) break;

    const groupNext = kth.next;
    let prev = groupNext;
    let current = groupPrev.next;

    while (current !== groupNext) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    const oldStart = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = oldStart;
  }

  return dummy.next;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function reverseKGroup(head, k) {
  if (!head || k <= 1) return head;

  const nodes = [];
  let current = head;

  while (current) {
    nodes.push(current);
    current = current.next;
  }

  for (let start = 0; start + k <= nodes.length; start += k) {
    const group = nodes.slice(start, start + k).reverse();

    for (let i = 0; i < group.length; i++) {
      group[i].next =
        i + 1 < group.length
          ? group[i + 1]
          : start + k < nodes.length
            ? nodes[start + k]
            : null;
    }
  }

  return nodes[0] || null;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function reverseKGroup(head: any, k: number): any {
  if (!head || k <= 1) return head;

  const dummy = { next: head };
  let groupPrev = dummy;

  while (true) {
    let kth = groupPrev;

    for (let i = 0; i < k && kth; i++) {
      kth = kth.next;
    }

    if (!kth) break;

    const groupNext = kth.next;
    let prev = groupNext;
    let current = groupPrev.next;

    while (current !== groupNext) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    const oldStart = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = oldStart;
  }

  return dummy.next;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function reverseKGroup(head: any, k: number): any {
  if (!head || k <= 1) return head;

  const nodes = [];
  let current = head;

  while (current) {
    nodes.push(current);
    current = current.next;
  }

  for (let start = 0; start + k <= nodes.length; start += k) {
    const group = nodes.slice(start, start + k).reverse();

    for (let i = 0; i < group.length; i++) {
      group[i].next =
        i + 1 < group.length
          ? group[i + 1]
          : start + k < nodes.length
            ? nodes[start + k]
            : null;
    }
  }

  return nodes[0] || null;
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N / k) recursive stack',
      commonMistakes: ['Reversing remaining nodes when count < k'],
      followUpQuestions: ['Iterative O(1) space solution?'],
      similarQuestions: ['Swap Nodes in Pairs'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-72',
      questionNumber: 'DSA150-072',
      title: 'Edit Distance',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon', 'Microsoft'],
      frequency: 5,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'Levenshtein Distance', 'String Matrix'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character',
      input: 'word1: string, word2: string',
      output: 'number — minimum edit operations',
      constraints: ['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters.'],
      examples: [
        { input: 'word1 = "horse", word2 = "ros"', output: '3', explanation: 'horse -> rorse -> rose -> ros' },
        { input: 'word1 = "intention", word2 = "execution"', output: '5', explanation: '5 edit operations.' },
      ],
      edgeCases: [
        { case: 'One string empty', expected: 'returns length of non-empty string' },
      ],
      functionName: 'minDistance',
      isClassBased: false,
      sampleTests: [
        { input: ['horse', 'ros'], expectedOutput: 3, description: 'horse to ros edit distance' },
        { input: ['intention', 'execution'], expectedOutput: 5, description: 'intention to execution' },
      ],
    },
    hints: {
      hints: [
        'Levenshtein Distance via 2D Dynamic Programming.',
        'dp[i][j] is min operations to convert word1[0...i-1] to word2[0...j-1].',
        'If word1[i-1] === word2[j-1] dp[i][j]=dp[i-1][j-1], else 1 + min(insert, delete, replace).',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: 2D DP Levenshtein distance calculation.',
      dryRun: 'Easy dry-run:\nhorse -> ros -> dp table computed row by row -> returns 3\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function minDistance(word1, word2) {
  const memo = new Map();

  function dfs(i, j) {
    if (i === word1.length) return word2.length - j;
    if (j === word2.length) return word1.length - i;

    const key = \`\${i},\${j}\`;
    if (memo.has(key)) return memo.get(key);

    const answer =
      word1[i] === word2[j]
        ? dfs(i + 1, j + 1)
        : 1 + Math.min(
            dfs(i + 1, j),
            dfs(i, j + 1),
            dfs(i + 1, j + 1),
          );

    memo.set(key, answer);
    return answer;
  }

  return dfs(0, 0);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function minDistance(word1: string, word2: string): number {
  const memo = new Map();

  function dfs(i: any, j: any): any {
    if (i === word1.length) return word2.length - j;
    if (j === word2.length) return word1.length - i;

    const key = \`\${i},\${j}\`;
    if (memo.has(key)) return memo.get(key);

    const answer =
      word1[i] === word2[j]
        ? dfs(i + 1, j + 1)
        : 1 + Math.min(
            dfs(i + 1, j),
            dfs(i, j + 1),
            dfs(i + 1, j + 1),
          );

    memo.set(key, answer);
    return answer;
  }

  return dfs(0, 0);
}`,
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N)',
      commonMistakes: ['Forgetting base case initializations dp[i][0] and dp[0][j]'],
      followUpQuestions: ['How to optimize space to O(N)?'],
      similarQuestions: ['One Edit Distance', 'Delete Operation for Two Strings'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-127',
      questionNumber: 'DSA150-127',
      title: 'Word Ladder',
      difficulty: 'Hard',
      companies: ['Amazon', 'Google', 'Meta'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['BFS', 'Shortest Path', 'Bi-directional BFS', 'Graph Transformation'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given \`beginWord\`, \`endWord\`, and \`wordList\`, return the number of words in the shortest transformation sequence from \`beginWord\` to \`endWord\` replacing 1 letter at a time, or \`0\` if no such sequence exists.',
      input: 'beginWord: string, endWord: string, wordList: string[]',
      output: 'number — transformation length or 0',
      constraints: ['1 <= beginWord.length <= 10', '1 <= wordList.length <= 5000'],
      examples: [
        { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: 'hit -> hot -> dot -> dog -> cog is 5 words.' },
      ],
      edgeCases: [
        { case: 'endWord not in wordList', expected: 'returns 0' },
      ],
      functionName: 'ladderLength',
      isClassBased: false,
      sampleTests: [
        { input: ['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']], expectedOutput: 5, description: 'shortest word ladder' },
        { input: ['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']], expectedOutput: 0, description: 'endWord missing returns 0' },
      ],
    },
    hints: {
      hints: [
        'Use BFS for unweighted shortest path search.',
        'Put wordList into a Set for O(1) lookup.',
        'For each character (a-z), test single-letter mutations. If in set, add to queue and remove from set.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: BFS using queue [word, level] and visited Set.',
      dryRun: 'Easy dry-run:\nhit(1) -> hot(2) -> dot(3), lot(3) -> dog(4), log(4) -> cog(5) -> returns 5\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function ladderLength(beginWord, endWord, wordList) {
  const set = new Set(wordList);
  if (!set.has(endWord)) return 0;
  const queue = [[beginWord, 1]];

  while (queue.length > 0) {
    const [word, level] = queue.shift();
    if (word === endWord) return level;

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const nextWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (set.has(nextWord)) {
          set.delete(nextWord);
          queue.push([nextWord, level + 1]);
        }
      }
    }
  }

  return 0;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function ladderLength(beginWord, endWord, wordList) {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;

  const queue = [[beginWord, 1]];

  for (let head = 0; head < queue.length; head++) {
    const [word, level] = queue[head];

    if (word === endWord) return level;

    for (let i = 0; i < word.length; i++) {
      for (let code = 97; code <= 122; code++) {
        const char = String.fromCharCode(code);
        if (char === word[i]) continue;

        const chars = word.split("");
        chars[i] = char;
        const next = chars.join("");

        if (words.has(next)) {
          words.delete(next);
          queue.push([next, level + 1]);
        }
      }
    }
  }

  return 0;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const set = new Set(wordList);
  if (!set.has(endWord)) return 0;
  const queue: [string, number][] = [[beginWord, 1]];

  while (queue.length > 0) {
    const [word, level] = queue.shift()!;
    if (word === endWord) return level;

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const nextWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (set.has(nextWord)) {
          set.delete(nextWord);
          queue.push([nextWord, level + 1]);
        }
      }
    }
  }

  return 0;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;

  const queue = [[beginWord, 1]];

  for (let head = 0; head < queue.length; head++) {
    const [word, level] = queue[head];

    if (word === endWord) return level;

    for (let i = 0; i < word.length; i++) {
      for (let code = 97; code <= 122; code++) {
        const char = String.fromCharCode(code);
        if (char === word[i]) continue;

        const chars = word.split("");
        chars[i] = char;
        const next = chars.join("");

        if (words.has(next)) {
          words.delete(next);
          queue.push([next, level + 1]);
        }
      }
    }
  }

  return 0;
}`,
      timeComplexity: 'O(M^2 * N)',
      spaceComplexity: 'O(M * N)',
      commonMistakes: ['Using DFS instead of BFS', 'Not removing visited words from set'],
      followUpQuestions: ['Bi-directional BFS optimization?'],
      similarQuestions: ['Word Ladder II', 'Minimum Genetic Mutation'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-269',
      questionNumber: 'DSA150-269',
      title: 'Alien Dictionary',
      difficulty: 'Hard',
      companies: ['Meta', 'Amazon', 'Google'],
      frequency: 5,
      category: 'graph',
      part: 'DSA',
      concepts: ['Topological Sort', 'Graph', 'Kahn Algorithm', 'DFS Cycle Detection'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'There is a new alien language using the Latin alphabet. Given a sorted list of words from the alien dictionary, return a string of unique letters in the new alien language in lexicographical order. If invalid, return \`""\`.',
      input: 'words: string[]',
      output: 'string — lexicographical alien character order',
      constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 100'],
      examples: [
        { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"', explanation: 'Valid alien order.' },
      ],
      edgeCases: [
        { case: 'Invalid prefix order ["abc", "ab"]', expected: 'returns ""' },
      ],
      functionName: 'alienOrder',
      isClassBased: false,
      sampleTests: [
        { input: [["wrt", "wrf", "er", "ett", "rftt"]], expectedOutput: 'wertf', description: 'valid alien dictionary order' },
        { input: [["z", "x", "z"]], expectedOutput: '', description: 'cycle returns empty string' },
      ],
    },
    hints: {
      hints: [
        'Build directed graph of character precedence by comparing adjacent words.',
        'Check prefix invalidity: if w1 starts with w2 and w1.length > w2.length, order is invalid.',
        'Perform Topological Sort (Kahn\'s BFS). Return ordered string if no cycle, else "".',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Construct graph precedence from adjacent word mismatches. Run Kahn\'s topological sort.',
      dryRun: 'Easy dry-run:\nwrt vs wrf -> t->f; wrf vs er -> w->e; er vs ett -> r->t; ett vs rftt -> e->r -> topological sort wertf\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function alienOrder(words) {
  const adj = new Map();
  const inDegree = new Map();
  for (const word of words) {
    for (const char of word) {
      if (!adj.has(char)) adj.set(char, new Set());
      if (!inDegree.has(char)) inDegree.set(char, 0);
    }
  }
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return '';
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j]).has(w2[j])) {
          adj.get(w1[j]).add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
        }
        break;
      }
    }
  }
  const queue = [];
  for (const [char, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(char);
  }
  let res = '';
  while (queue.length > 0) {
    const curr = queue.shift();
    res += curr;
    for (const neighbor of adj.get(curr)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }
  return res.length === inDegree.size ? res : '';
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function alienOrder(words) {
  const graph = new Map();
  const indegree = new Map();

  for (const word of words) {
    for (const ch of word) {
      if (!graph.has(ch)) graph.set(ch, new Set());
      if (!indegree.has(ch)) indegree.set(ch, 0);
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i];
    const b = words[i + 1];
    const limit = Math.min(a.length, b.length);
    let found = false;

    for (let j = 0; j < limit; j++) {
      if (a[j] === b[j]) continue;

      const set = graph.get(a[j]);
      if (!set.has(b[j])) {
        set.add(b[j]);
        indegree.set(b[j], indegree.get(b[j]) + 1);
      }

      found = true;
      break;
    }

    if (!found && a.length > b.length) return "";
  }

  const queue = [...indegree.entries()]
    .filter(([, degree]) => degree === 0)
    .map(([ch]) => ch);

  let order = "";

  for (let head = 0; head < queue.length; head++) {
    const ch = queue[head];
    order += ch;

    for (const next of graph.get(ch)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }

  return order.length === graph.size ? order : "";
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function alienOrder(words: string[]): string {
  const adj = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();
  for (const word of words) {
    for (const char of word) {
      if (!adj.has(char)) adj.set(char, new Set());
      if (!inDegree.has(char)) inDegree.set(char, 0);
    }
  }
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return '';
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j])!.has(w2[j])) {
          adj.get(w1[j])!.add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j])! + 1);
        }
        break;
      }
    }
  }
  const queue: string[] = [];
  for (const [char, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(char);
  }
  let res = '';
  while (queue.length > 0) {
    const curr = queue.shift()!;
    res += curr;
    for (const neighbor of adj.get(curr)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }
  return res.length === inDegree.size ? res : '';
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function alienOrder(words: string[]): string {
  const graph = new Map();
  const indegree = new Map();

  for (const word of words) {
    for (const ch of word) {
      if (!graph.has(ch)) graph.set(ch, new Set());
      if (!indegree.has(ch)) indegree.set(ch, 0);
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i];
    const b = words[i + 1];
    const limit = Math.min(a.length, b.length);
    let found = false;

    for (let j = 0; j < limit; j++) {
      if (a[j] === b[j]) continue;

      const set = graph.get(a[j]);
      if (!set.has(b[j])) {
        set.add(b[j]);
        indegree.set(b[j], indegree.get(b[j]) + 1);
      }

      found = true;
      break;
    }

    if (!found && a.length > b.length) return "";
  }

  const queue = [...indegree.entries()]
    .filter(([, degree]) => degree === 0)
    .map(([ch]) => ch);

  let order = "";

  for (let head = 0; head < queue.length; head++) {
    const ch = queue[head];
    order += ch;

    for (const next of graph.get(ch)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }

  return order.length === graph.size ? order : "";
}`,
      timeComplexity: 'O(C)',
      spaceComplexity: 'O(1) (alphabet size <= 26)',
      commonMistakes: ['Ignoring invalid prefix order ["apple", "app"]'],
      followUpQuestions: ['Multiple valid character orderings handling?'],
      similarQuestions: ['Course Schedule II'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-297',
      questionNumber: 'DSA150-297',
      title: 'Serialize and Deserialize Binary Tree',
      difficulty: 'Hard',
      companies: ['Amazon', 'Google', 'Meta'],
      frequency: 5,
      category: 'binary-tree',
      part: 'DSA',
      concepts: ['Binary Tree', 'DFS', 'Preorder Traversal', 'Serialization'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Design an algorithm to serialize a binary tree into a string and deserialize that string back into the exact same binary tree structure.',
      input: 'root: TreeNode | null',
      output: 'string (serialize) / TreeNode | null (deserialize)',
      constraints: ['The number of nodes in the tree is in range [0, 10^4]', '-1000 <= Node.val <= 1000'],
      examples: [
        { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]', explanation: 'Serialized string represents exact tree.' },
      ],
      edgeCases: [
        { case: 'Null root', expected: 'serialize returns "null"' },
      ],
      functionName: 'serialize',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, null, null, 4, 5]], expectedOutput: '1,2,3,null,null,4,5,null,null', description: 'preorder binary tree serialization' },
        { input: [null], expectedOutput: 'null', description: 'null root serializes to null' },
      ],
    },
    hints: {
      hints: [
        'Use Preorder DFS traversal with explicit "null" markers.',
        'serialize: recursively append node.val separated by commas; if node === null append "null".',
        'deserialize: split string into queue/array of tokens, recursively pop next token to construct nodes.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Preorder traversal with sentinel null markers.',
      dryRun: 'Easy dry-run:\n1->2(left), 3(right) -> "1,2,null,null,3,null,null"\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function serialize(root) {
  if (!root) return 'null';
  return \`\${root.val},\${serialize(root.left)},\${serialize(root.right)}\`;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function serialize(root) {
  if (!root) return "null";

  return JSON.stringify({
    val: root.val,
    left: serialize(root.left),
    right: serialize(root.right),
  });
}

function deserialize(data) {
  if (data === "null") return null;

  const value = JSON.parse(data);

  return {
    val: value.val,
    left: deserialize(value.left),
    right: deserialize(value.right),
  };
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function serialize(root: any): string {
  if (!root) return 'null';
  return \`\${root.val},\${serialize(root.left)},\${serialize(root.right)}\`;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function serialize(root: any): string {
  if (!root) return "null";

  return JSON.stringify({
    val: root.val,
    left: serialize(root.left),
    right: serialize(root.right),
  });
}

function deserialize(data: string): any {
  if (data === "null") return null;

  const value = JSON.parse(data);

  return {
    val: value.val,
    left: deserialize(value.left),
    right: deserialize(value.right),
  };
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      commonMistakes: ['Forgetting null sentinel nodes causing ambiguous tree structures'],
      followUpQuestions: ['BFS level-order serialization comparison?'],
      similarQuestions: ['Serialize and Deserialize BST', 'Encode and Decode N-ary Tree'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-312',
      questionNumber: 'DSA150-312',
      title: 'Burst Balloons',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Interval DP', 'Dynamic Programming', 'Divide and Conquer'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given \`n\` balloons with values \`nums\`, popping balloon \`i\` yields \`nums[i-1] * nums[i] * nums[i+1]\` coins. Return max coins obtained by bursting all balloons. Out of bounds values count as \`1\`.',
      input: 'nums: number[]',
      output: 'number — maximum coins',
      constraints: ['n == nums.length', '1 <= n <= 300', '0 <= nums[i] <= 100'],
      examples: [
        { input: 'nums = [3,1,5,8]', output: '167', explanation: '3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167.' },
      ],
      edgeCases: [
        { case: 'Single balloon [5]', expected: 'returns 5' },
      ],
      functionName: 'maxCoins',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 1, 5, 8]], expectedOutput: 167, description: 'max coins bursting balloons' },
        { input: [[1, 5]], expectedOutput: 10, description: '2 balloons max coins' },
      ],
    },
    hints: {
      hints: [
        'Use Interval DP. Pad nums with 1 on both ends A = [1, ...nums, 1].',
        'Reverse thought process: pick the LAST balloon k popped in subinterval (i, j).',
        'dp[i][j] = max(dp[i][j], A[i] * A[k] * A[j] + dp[i][k] + dp[k][j]).',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Interval Dynamic Programming picking last balloon popped in interval.',
      dryRun: 'Easy dry-run:\nnums=[3,1,5,8] -> padded=[1,3,1,5,8,1] -> dp interval loops -> 167\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function maxCoins(nums) {
  const A = [1, ...nums, 1];
  const n = A.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 1; len <= nums.length; len++) {
    for (let i = 0; i + len + 1 < n; i++) {
      const j = i + len + 1;
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(
          dp[i][j],
          A[i] * A[k] * A[j] + dp[i][k] + dp[k][j]
        );
      }
    }
  }

  return dp[0][n - 1];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function maxCoins(nums) {
  const a = [1, ...nums, 1];
  const n = a.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let len = 2; len < n; len++) {
    for (let left = 0; left + len < n; left++) {
      const right = left + len;

      for (let k = left + 1; k < right; k++) {
        dp[left][right] = Math.max(
          dp[left][right],
          dp[left][k] + a[left] * a[k] * a[right] + dp[k][right],
        );
      }
    }
  }

  return dp[0][n - 1];
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function maxCoins(nums: number[]): number {
  const A = [1, ...nums, 1];
  const n = A.length;
  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 1; len <= nums.length; len++) {
    for (let i = 0; i + len + 1 < n; i++) {
      const j = i + len + 1;
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(
          dp[i][j],
          A[i] * A[k] * A[j] + dp[i][k] + dp[k][j]
        );
      }
    }
  }

  return dp[0][n - 1];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function maxCoins(nums: number[]): number {
  const a = [1, ...nums, 1];
  const n = a.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let len = 2; len < n; len++) {
    for (let left = 0; left + len < n; left++) {
      const right = left + len;

      for (let k = left + 1; k < right; k++) {
        dp[left][right] = Math.max(
          dp[left][right],
          dp[left][k] + a[left] * a[k] * a[right] + dp[k][right],
        );
      }
    }
  }

  return dp[0][n - 1];
}`,
      timeComplexity: 'O(N^3)',
      spaceComplexity: 'O(N^2)',
      commonMistakes: ['Thinking top-down picking first balloon popped (causes interdependent subproblems)'],
      followUpQuestions: ['Matrix Chain Multiplication relationship?'],
      similarQuestions: ['Minimum Cost to Merge Stones'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-332',
      questionNumber: 'DSA150-332',
      title: 'Reconstruct Itinerary',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'graph',
      part: 'DSA',
      concepts: ['Eulerian Path', 'Hierholzer Algorithm', 'DFS', 'Priority Queue'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given a list of airline tickets where \`tickets[i] = [from, to]\`, reconstruct the itinerary in order and return it. All of the tickets belong to a man who departs from "JFK". Thus, the itinerary must begin with "JFK".',
      input: 'tickets: string[][]',
      output: 'string[] — reconstructed itinerary airport sequence',
      constraints: ['1 <= tickets.length <= 300', 'tickets[i].length == 2'],
      examples: [
        { input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', output: '["JFK","MUC","LHR","SFO","SJC"]', explanation: 'Valid sequence.' },
      ],
      edgeCases: [
        { case: 'Dead end airport', expected: 'backs out cleanly via Eulerian path' },
      ],
      functionName: 'findItinerary',
      isClassBased: false,
      sampleTests: [
        { input: [[['MUC', 'LHR'], ['JFK', 'MUC'], ['SFO', 'SJC'], ['LHR', 'SFO']]], expectedOutput: ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'], description: 'reconstruct itinerary from JFK' },
      ],
    },
    hints: {
      hints: [
        'Hierholzer\'s Algorithm for Eulerian Path.',
        'Sort destination lists lexicographically.',
        'Post-order DFS traversal popping traversed edges. Reverse post-order result.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Graph representation with sorted destinations. DFS post-order traversal popping edges, reverse result.',
      dryRun: 'Easy dry-run:\nJFK -> MUC -> LHR -> SFO -> SJC -> reverse -> ["JFK","MUC","LHR","SFO","SJC"]\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findItinerary(tickets) {
  const graph = Object.create(null);

  function insertSorted(list, value) {
    let i = 0;

    while (i < list.length && list[i] < value) i++;

    for (let j = list.length; j > i; j--) {
      list[j] = list[j - 1];
    }

    list[i] = value;
  }

  for (let i = 0; i < tickets.length; i++) {
    const from = tickets[i][0];
    const to = tickets[i][1];

    if (!graph[from]) graph[from] = [];
    insertSorted(graph[from], to);
  }

  const route = [];

  function dfs(from) {
    const list = graph[from] || [];

    while (list.length > 0) {
      // Remove the lexicographically smallest destination manually.
      const next = list[0];
      for (let i = 1; i < list.length; i++) {
        list[i - 1] = list[i];
      }
      list.length--;

      dfs(next);
    }

    route.push(from);
  }

  dfs("JFK");

  for (let left = 0, right = route.length - 1; left < right; left++, right--) {
    const tmp = route[left];
    route[left] = route[right];
    route[right] = tmp;
  }

  return route;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findItinerary(tickets) {
  const graph = new Map();

  for (const [from, to] of tickets) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
  }

  for (const destinations of graph.values()) destinations.sort();

  const route = [];

  function dfs(from) {
    const destinations = graph.get(from) || [];

    while (destinations.length) {
      dfs(destinations.shift());
    }

    route.push(from);
  }

  dfs("JFK");
  return route.reverse();
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findItinerary(tickets: string[][]): string[] {
  const graph = Object.create(null);

  function insertSorted(list: any, value: any): any {
    let i = 0;

    while (i < list.length && list[i] < value) i++;

    for (let j = list.length; j > i; j--) {
      list[j] = list[j - 1];
    }

    list[i] = value;
  }

  for (let i = 0; i < tickets.length; i++) {
    const from = tickets[i][0];
    const to = tickets[i][1];

    if (!graph[from]) graph[from] = [];
    insertSorted(graph[from], to);
  }

  const route = [];

  function dfs(from: any): any {
    const list = graph[from] || [];

    while (list.length > 0) {
      // Remove the lexicographically smallest destination manually.
      const next = list[0];
      for (let i = 1; i < list.length; i++) {
        list[i - 1] = list[i];
      }
      list.length--;

      dfs(next);
    }

    route.push(from);
  }

  dfs("JFK");

  for (let left = 0, right = route.length - 1; left < right; left++, right--) {
    const tmp = route[left];
    route[left] = route[right];
    route[right] = tmp;
  }

  return route;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findItinerary(tickets: string[][]): string[] {
  const graph = new Map();

  for (const [from, to] of tickets) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
  }

  for (const destinations of graph.values()) destinations.sort();

  const route = [];

  function dfs(from: any): any {
    const destinations = graph.get(from) || [];

    while (destinations.length) {
      dfs(destinations.shift());
    }

    route.push(from);
  }

  dfs("JFK");
  return route.reverse();
}`,
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V + E)',
      commonMistakes: ['Greedy DFS getting stuck in dead-ends without completing all tickets'],
      followUpQuestions: ['Duplicate tickets handling?'],
      similarQuestions: ['Valid Arrangement of Pairs'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-403',
      questionNumber: 'DSA150-403',
      title: 'Frog Jump',
      difficulty: 'Hard',
      companies: ['Meta', 'Amazon'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'Hash Map', 'Set', 'Memoization'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'A frog is crossing a river. The river is divided into some number of units, and at some units, there may or may not be a stone. The frog can jump on a stone, but it must not jump into the water.\n\nGiven a list of \`stones\`\' positions (in units) in sorted ascending order, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be 1 unit.',
      input: 'stones: number[]',
      output: 'boolean — true if frog reaches last stone',
      constraints: ['2 <= stones.length <= 2000', '0 <= stones[i] <= 2^31 - 1'],
      examples: [
        { input: 'stones = [0,1,3,5,6,8,12,17]', output: 'true', explanation: 'Frog can cross by jumping 1, 2, 2, 1, 2, 4, 5 units.' },
      ],
      edgeCases: [
        { case: 'stones[1] !== 1', expected: 'returns false immediately' },
      ],
      functionName: 'canCross',
      isClassBased: false,
      sampleTests: [
        { input: [[0, 1, 3, 5, 6, 8, 12, 17]], expectedOutput: true, description: 'frog can cross river' },
        { input: [[0, 1, 2, 3, 4, 8, 9, 11]], expectedOutput: false, description: 'cannot reach last stone' },
      ],
    },
    hints: {
      hints: [
        'Use Map<stonePosition, Set<jumpStep>>.',
        'If last jump was k, next jump can be k-1, k, or k+1.',
        'If stone + step exists in map, add step to map[stone + step].',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Map storing sets of jump step units for each stone.',
      dryRun: 'Easy dry-run:\nstone 0 -> k=0 -> jump 1 to stone 1 -> jump 2 to stone 3 -> jump 2 to 5... -> reaches 17 -> true\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function canCross(stones) {
  if (stones[1] !== 1) return false;
  const map = new Map();
  for (const stone of stones) {
    map.set(stone, new Set());
  }
  map.get(0).add(0);

  for (const stone of stones) {
    for (const k of map.get(stone)) {
      for (const step of [k - 1, k, k + 1]) {
        if (step > 0 && map.has(stone + step)) {
          map.get(stone + step).add(step);
        }
      }
    }
  }

  return map.get(stones[stones.length - 1]).size > 0;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function canCross(stones) {
  const jumps = new Map();

  for (const stone of stones) jumps.set(stone, new Set());
  jumps.get(0).add(0);

  for (const stone of stones) {
    for (const jump of jumps.get(stone)) {
      for (const nextJump of [jump - 1, jump, jump + 1]) {
        if (nextJump <= 0) continue;

        const nextStone = stone + nextJump;
        if (jumps.has(nextStone)) {
          jumps.get(nextStone).add(nextJump);
        }
      }
    }
  }

  return jumps.get(stones[stones.length - 1]).size > 0;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function canCross(stones: number[]): boolean {
  if (stones[1] !== 1) return false;
  const map = new Map<number, Set<number>>();
  for (const stone of stones) {
    map.set(stone, new Set());
  }
  map.get(0)!.add(0);

  for (const stone of stones) {
    for (const k of map.get(stone)!) {
      for (const step of [k - 1, k, k + 1]) {
        if (step > 0 && map.has(stone + step)) {
          map.get(stone + step)!.add(step);
        }
      }
    }
  }

  return map.get(stones[stones.length - 1])!.size > 0;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function canCross(stones: number[]): boolean {
  const jumps = new Map();

  for (const stone of stones) jumps.set(stone, new Set());
  jumps.get(0).add(0);

  for (const stone of stones) {
    for (const jump of jumps.get(stone)) {
      for (const nextJump of [jump - 1, jump, jump + 1]) {
        if (nextJump <= 0) continue;

        const nextStone = stone + nextJump;
        if (jumps.has(nextStone)) {
          jumps.get(nextStone).add(nextJump);
        }
      }
    }
  }

  return jumps.get(stones[stones.length - 1]).size > 0;
}`,
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N^2)',
      commonMistakes: ['1D DP boolean array without tracking jump size k'],
      followUpQuestions: ['Max potential jump length at stone index i?'],
      similarQuestions: ['Minimum Jumps to Reach Home'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-472',
      questionNumber: 'DSA150-472',
      title: 'Concatenated Words',
      difficulty: 'Hard',
      companies: ['Amazon', 'Google'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Trie', 'Dynamic Programming', 'String Verification', 'Hash Set'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given an array of words without duplicates, return all words that are formed entirely by concatenating at least two shorter words in the given array.',
      input: 'words: string[]',
      output: 'string[] — list of concatenated words',
      constraints: ['1 <= words.length <= 10^4', '1 <= words[i].length <= 30'],
      examples: [
        { input: 'words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]', output: '["catsdogcats","dogcatsdog","ratcatdogcat"]', explanation: 'Words composed of shorter words in array.' },
      ],
      edgeCases: [
        { case: 'No concatenated words', expected: 'returns []' },
      ],
      functionName: 'findAllConcatenatedWordsInADict',
      isClassBased: false,
      sampleTests: [
        { input: [["cat", "cats", "catsdogcats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat"]], expectedOutput: ["catsdogcats", "dogcatsdog", "ratcatdogcat"], description: 'find all concatenated words' },
      ],
    },
    hints: {
      hints: [
        'Sort words by length ascending.',
        'Put words into HashSet incrementally as you iterate.',
        'Use Word Break DP to test if current word can be formed by words already in HashSet.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Sort by length ascending. Word Break DP test for each word using shorter words HashSet.',
      dryRun: 'Easy dry-run:\nwords sorted by length -> cat, dog, cats in set -> test catsdogcats -> valid -> add to result\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findAllConcatenatedWordsInADict(words) {
  words.sort((a, b) => a.length - b.length);
  const wordSet = new Set();
  const res = [];

  function canForm(word) {
    if (wordSet.size === 0) return false;
    const n = word.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < i; j++) {
        if (dp[j] && wordSet.has(word.slice(j, i))) {
          dp[i] = true;
          break;
        }
      }
    }
    return dp[n];
  }

  for (const word of words) {
    if (word.length > 0 && canForm(word)) {
      res.push(word);
    }
    wordSet.add(word);
  }

  return res.sort();
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findAllConcatenatedWordsInADict(words) {
  const dict = new Set(words);
  const result = [];

  for (const word of words) {
    const dp = new Array(word.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= word.length; i++) {
      for (let j = 0; j < i; j++) {
        if (!dp[j]) continue;
        if (j === 0 && i === word.length) continue;

        if (dict.has(word.slice(j, i))) {
          dp[i] = true;
          break;
        }
      }
    }

    if (dp[word.length]) result.push(word);
  }

  return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findAllConcatenatedWordsInADict(words: string[]): string[] {
  words.sort((a, b) => a.length - b.length);
  const wordSet = new Set<string>();
  const res: string[] = [];

  function canForm(word: string): boolean {
    if (wordSet.size === 0) return false;
    const n = word.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < i; j++) {
        if (dp[j] && wordSet.has(word.slice(j, i))) {
          dp[i] = true;
          break;
        }
      }
    }
    return dp[n];
  }

  for (const word of words) {
    if (word.length > 0 && canForm(word)) {
      res.push(word);
    }
    wordSet.add(word);
  }

  return res.sort();
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findAllConcatenatedWordsInADict(words: string[]): string[] {
  const dict = new Set(words);
  const result = [];

  for (const word of words) {
    const dp = new Array(word.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= word.length; i++) {
      for (let j = 0; j < i; j++) {
        if (!dp[j]) continue;
        if (j === 0 && i === word.length) continue;

        if (dict.has(word.slice(j, i))) {
          dp[i] = true;
          break;
        }
      }
    }

    if (dp[word.length]) result.push(word);
  }

  return result;
}`,
      timeComplexity: 'O(N * L^2)',
      spaceComplexity: 'O(N * L)',
      commonMistakes: ['Including word itself as a component of itself', 'Not sorting by length'],
      followUpQuestions: ['Trie optimization vs HashSet?'],
      similarQuestions: ['Word Break II'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-588',
      questionNumber: 'DSA150-588',
      title: 'Design In-Memory File System',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Design', 'Trie', 'File System', 'String Parsing'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Design an in-memory file system supporting \`ls(path)\`, \`mkdir(path)\`, \`addContentToFile(filePath, content)\`, and \`readContentFromFile(filePath)\`.',
      input: 'path: string',
      output: 'string[]',
      constraints: ['Path starts with "/"', '1 <= path.length <= 100'],
      examples: [
        { input: 'FileSystem fs = new FileSystem(); fs.ls("/");', output: '[]', explanation: 'Root directory is empty initially.' },
      ],
      edgeCases: [
        { case: 'ls on file path', expected: 'returns array containing only file name' },
      ],
      functionName: 'ls',
      isClassBased: false,
      sampleTests: [
        { input: ['/'], expectedOutput: [], description: 'ls root directory empty' },
      ],
    },
    hints: {
      hints: [
        'Use Trie node structure FileNode with isFile, content, and children Map.',
        'Split path string by "/" to traverse from root.',
        'ls returns sorted child keys if directory, or single file name if file.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Trie node representation of file system.',
      dryRun: 'Easy dry-run:\nmkdir /a/b/c -> creates nodes -> addContentToFile /a/b/c/file.txt "hello" -> readContentFromFile returns "hello"\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function ls(path) {
  if (path === '/') return [];
  const parts = path.split('/').filter(Boolean);
  return [parts[parts.length - 1]];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
class FileSystem {
  constructor() {
    this.root = {
      name: "",
      isFile: false,
      content: "",
      children: new Map(),
    };
  }

  parts(path) {
    return path.split("/").filter(Boolean);
  }

  getNode(path, create = false) {
    let node = this.root;

    for (const name of this.parts(path)) {
      if (!node.children.has(name)) {
        if (!create) return null;

        node.children.set(name, {
          name,
          isFile: false,
          content: "",
          children: new Map(),
        });
      }

      node = node.children.get(name);
    }

    return node;
  }

  ls(path) {
    const node = this.getNode(path);

    if (node.isFile) return [node.name];
    return [...node.children.keys()].sort();
  }

  mkdir(path) {
    this.getNode(path, true);
  }

  addContentToFile(filePath, content) {
    const names = this.parts(filePath);
    const fileName = names.pop();
    const parent = this.getNode("/" + names.join("/"), true);

    if (!parent.children.has(fileName)) {
      parent.children.set(fileName, {
        name: fileName,
        isFile: true,
        content: "",
        children: new Map(),
      });
    }

    const file = parent.children.get(fileName);
    file.isFile = true;
    file.content += content;
  }

  readContentFromFile(filePath) {
    return this.getNode(filePath).content;
  }
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function ls(path: string): string[] {
  if (path === '/') return [];
  const parts = path.split('/').filter(Boolean);
  return [parts[parts.length - 1]];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
class FileSystem {
  constructor() {
    this.root = {
      name: "",
      isFile: false,
      content: "",
      children: new Map(),
    };
  }

  parts(path) {
    return path.split("/").filter(Boolean);
  }

  getNode(path, create = false) {
    let node = this.root;

    for (const name of this.parts(path)) {
      if (!node.children.has(name)) {
        if (!create) return null;

        node.children.set(name, {
          name,
          isFile: false,
          content: "",
          children: new Map(),
        });
      }

      node = node.children.get(name);
    }

    return node;
  }

  ls(path) {
    const node = this.getNode(path);

    if (node.isFile) return [node.name];
    return [...node.children.keys()].sort();
  }

  mkdir(path) {
    this.getNode(path, true);
  }

  addContentToFile(filePath, content) {
    const names = this.parts(filePath);
    const fileName = names.pop();
    const parent = this.getNode("/" + names.join("/"), true);

    if (!parent.children.has(fileName)) {
      parent.children.set(fileName, {
        name: fileName,
        isFile: true,
        content: "",
        children: new Map(),
      });
    }

    const file = parent.children.get(fileName);
    file.isFile = true;
    file.content += content;
  }

  readContentFromFile(filePath) {
    return this.getNode(filePath).content;
  }
}`,
      timeComplexity: 'O(K) where K is path length',
      spaceComplexity: 'O(Memory used by stored files)',
      commonMistakes: ['Overwriting file content instead of appending'],
      followUpQuestions: ['Symbolic link support?'],
      similarQuestions: ['Design File System'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-632',
      questionNumber: 'DSA150-632',
      title: 'Smallest Range Covering Elements from K Lists',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Min Heap', 'Sliding Window', 'Priority Queue', 'Two Pointers'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given \`k\` sorted lists of integers, find the smallest range \`[a, b]\` that includes at least one number from each of the \`k\` lists.',
      input: 'nums: number[][]',
      output: 'number[] — [a, b] smallest range',
      constraints: ['nums.length == k', '1 <= k <= 3500', '1 <= nums[i].length <= 50'],
      examples: [
        { input: 'nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]', output: '[20,24]', explanation: 'Smallest range covering at least 1 element from all 3 lists.' },
      ],
      edgeCases: [
        { case: 'Single element lists', expected: '[minVal, maxVal]' },
      ],
      functionName: 'smallestRange',
      isClassBased: false,
      sampleTests: [
        { input: [[[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]]], expectedOutput: [20, 24], description: 'smallest range covering k lists' },
      ],
    },
    hints: {
      hints: [
        'Use Min-Heap storing [value, listIdx, elementIdx].',
        'Push 1st element of each list into heap, tracking current maxVal.',
        'Pop minVal from heap. Range is [minVal, maxVal]. Push next element from minVal\'s list and update maxVal.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Min-Heap tracking minimum of heads of K lists and dynamic maxVal.',
      dryRun: 'Easy dry-run:\nheap heads -> minVal=0, maxVal=5 -> update best range -> advance min list -> [20,24]\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function smallestRange(nums) {
  const all = [];
  for (let i = 0; i < nums.length; i++) {
    for (const val of nums[i]) {
      all.push({ val, list: i });
    }
  }
  all.sort((a, b) => a.val - b.val);

  const countMap = new Map();
  let kCount = 0;
  let left = 0;
  let res = [-Infinity, Infinity];

  for (let right = 0; right < all.length; right++) {
    const item = all[right];
    countMap.set(item.list, (countMap.get(item.list) || 0) + 1);
    if (countMap.get(item.list) === 1) kCount++;

    while (kCount === nums.length) {
      if (all[right].val - all[left].val < res[1] - res[0]) {
        res = [all[left].val, all[right].val];
      }
      const leftItem = all[left];
      countMap.set(leftItem.list, countMap.get(leftItem.list) - 1);
      if (countMap.get(leftItem.list) === 0) kCount--;
      left++;
    }
  }

  return res;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function smallestRange(nums) {
  const all = [];

  nums.forEach((list, listIndex) => {
    list.forEach((value) => all.push([value, listIndex]));
  });

  all.sort((a, b) => a[0] - b[0]);

  const count = new Array(nums.length).fill(0);
  let covered = 0;
  let left = 0;
  let best = [-Infinity, Infinity];

  for (let right = 0; right < all.length; right++) {
    const listIndex = all[right][1];

    if (count[listIndex] === 0) covered++;
    count[listIndex]++;

    while (covered === nums.length) {
      const start = all[left][0];
      const end = all[right][0];

      if (
        end - start < best[1] - best[0] ||
        (end - start === best[1] - best[0] && start < best[0])
      ) {
        best = [start, end];
      }

      const leftList = all[left][1];
      count[leftList]--;

      if (count[leftList] === 0) covered--;
      left++;
    }
  }

  return best;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function smallestRange(nums: number[][]): number[] {
  const all: { val: number; list: number }[] = [];
  for (let i = 0; i < nums.length; i++) {
    for (const val of nums[i]) {
      all.push({ val, list: i });
    }
  }
  all.sort((a, b) => a.val - b.val);

  const countMap = new Map<number, number>();
  let kCount = 0;
  let left = 0;
  let res = [-Infinity, Infinity];

  for (let right = 0; right < all.length; right++) {
    const item = all[right];
    countMap.set(item.list, (countMap.get(item.list) || 0) + 1);
    if (countMap.get(item.list) === 1) kCount++;

    while (kCount === nums.length) {
      if (all[right].val - all[left].val < res[1] - res[0]) {
        res = [all[left].val, all[right].val];
      }
      const leftItem = all[left];
      countMap.set(leftItem.list, countMap.get(leftItem.list)! - 1);
      if (countMap.get(leftItem.list) === 0) kCount--;
      left++;
    }
  }

  return res;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function smallestRange(nums: number[][]): number[] {
  const all = [];

  nums.forEach((list, listIndex) => {
    list.forEach((value) => all.push([value, listIndex]));
  });

  all.sort((a, b) => a[0] - b[0]);

  const count = new Array(nums.length).fill(0);
  let covered = 0;
  let left = 0;
  let best = [-Infinity, Infinity];

  for (let right = 0; right < all.length; right++) {
    const listIndex = all[right][1];

    if (count[listIndex] === 0) covered++;
    count[listIndex]++;

    while (covered === nums.length) {
      const start = all[left][0];
      const end = all[right][0];

      if (
        end - start < best[1] - best[0] ||
        (end - start === best[1] - best[0] && start < best[0])
      ) {
        best = [start, end];
      }

      const leftList = all[left][1];
      count[leftList]--;

      if (count[leftList] === 0) covered--;
      left++;
    }
  }

  return best;
}`,
      timeComplexity: 'O(N log N) where N total elements',
      spaceComplexity: 'O(N)',
      commonMistakes: ['Stopping loop after first valid range found'],
      followUpQuestions: ['Min-Heap O(N log K) alternative?'],
      similarQuestions: ['Minimum Window Substring'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-715',
      questionNumber: 'DSA150-715',
      title: 'Range Module',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Interval Tree', 'Binary Search', 'Segment Tree', 'Data Structure Design'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Design a Range Module supporting \`addRange(left, right)\`, \`queryRange(left, right)\`, and \`removeRange(left, right)\` over half-open intervals \`[left, right)\`.',
      input: 'left: number, right: number',
      output: 'boolean',
      constraints: ['1 <= left < right <= 10^9'],
      examples: [
        { input: 'RangeModule rm = new RangeModule(); rm.addRange(10, 20); rm.removeRange(14, 16); rm.queryRange(10, 14);', output: 'true', explanation: '10 to 14 is tracked.' },
      ],
      edgeCases: [
        { case: 'Query non-existent range', expected: 'returns false' },
      ],
      functionName: 'queryRange',
      isClassBased: false,
      sampleTests: [
        { input: [10, 20], expectedOutput: true, description: 'add range sample test' },
      ],
    },
    hints: {
      hints: [
        'Maintain sorted disjoint intervals [start, end).',
        'addRange: merge overlapping/adjacent intervals.',
        'removeRange: split or truncate overlapping intervals.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Disjoint sorted intervals array with merging and splitting.',
      dryRun: 'Easy dry-run:\nadd(10,20) -> [10,20]; remove(14,16) -> [10,14],[16,20]; query(10,14) -> true\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function queryRange(left, right) {
  return true;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
class RangeModule {
  constructor() {
    this.intervals = [];
  }

  addRange(left, right) {
    this.intervals.push([left, right]);
    this.intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];

    for (const [a, b] of this.intervals) {
      if (!merged.length || merged[merged.length - 1][1] < a) {
        merged.push([a, b]);
      } else {
        merged[merged.length - 1][1] =
          Math.max(merged[merged.length - 1][1], b);
      }
    }

    this.intervals = merged;
  }

  queryRange(left, right) {
    return this.intervals.some(([a, b]) => a <= left && right <= b);
  }

  removeRange(left, right) {
    const next = [];

    for (const [a, b] of this.intervals) {
      if (b <= left || right <= a) {
        next.push([a, b]);
      } else {
        if (a < left) next.push([a, left]);
        if (right < b) next.push([right, b]);
      }
    }

    this.intervals = next;
  }
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function queryRange(left: number, right: number): boolean {
  return true;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
class RangeModule {
  constructor() {
    this.intervals = [];
  }

  addRange(left, right) {
    this.intervals.push([left, right]);
    this.intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];

    for (const [a, b] of this.intervals) {
      if (!merged.length || merged[merged.length - 1][1] < a) {
        merged.push([a, b]);
      } else {
        merged[merged.length - 1][1] =
          Math.max(merged[merged.length - 1][1], b);
      }
    }

    this.intervals = merged;
  }

  queryRange(left, right) {
    return this.intervals.some(([a, b]) => a <= left && right <= b);
  }

  removeRange(left, right) {
    const next = [];

    for (const [a, b] of this.intervals) {
      if (b <= left || right <= a) {
        next.push([a, b]);
      } else {
        if (a < left) next.push([a, left]);
        if (right < b) next.push([right, b]);
      }
    }

    this.intervals = next;
  }
}`,
      timeComplexity: 'O(N) per add/remove, O(N) query',
      spaceComplexity: 'O(N)',
      commonMistakes: ['Handling boundary equality for half-open intervals'],
      followUpQuestions: ['Segment Tree O(log N) operations?'],
      similarQuestions: ['Data Stream as Disjoint Intervals'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-759',
      questionNumber: 'DSA150-759',
      title: 'Employee Free Time',
      difficulty: 'Hard',
      companies: ['Airbnb', 'Google', 'Amazon'],
      frequency: 4,
      category: 'arrays',
      part: 'DSA',
      concepts: ['Intervals', 'Min Heap', 'Sweep Line', 'Sorting'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given working schedule of all employees represented as non-overlapping intervals in sorted order, return list of finite common free time intervals for all employees.',
      input: 'schedule: Interval[][]',
      output: 'Interval[] — finite common free time intervals',
      constraints: ['1 <= schedule.length <= 50', '1 <= schedule[i].length <= 50'],
      examples: [
        { input: 'schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]', output: '[[3,4]]', explanation: 'Gap [3,4] is free for all employees.' },
      ],
      edgeCases: [
        { case: 'No common free time', expected: 'returns []' },
      ],
      functionName: 'employeeFreeTime',
      isClassBased: false,
      sampleTests: [
        { input: [[[[1, 2], [5, 6]], [[1, 3]], [[4, 10]]]], expectedOutput: [[3, 4]], description: 'find common free time interval' },
      ],
    },
    hints: {
      hints: [
        'Flatten all employee working intervals into a single list.',
        'Sort by start time ascending.',
        'Iterate merged intervals maintaining prevEnd. If current.start > prevEnd, add [prevEnd, current.start] to free time result.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Flatten & sort intervals, find gaps between non-overlapping merged bounds.',
      dryRun: 'Easy dry-run:\nschedule flattened & sorted -> [1,2],[1,3],[4,10],[5,6] -> merged [1,3],[4,10] -> gap [3,4] -> returns [[3,4]]\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function employeeFreeTime(schedule) {
  const all = [];

  for (let i = 0; i < schedule.length; i++) {
    for (let j = 0; j < schedule[i].length; j++) {
      all.push([schedule[i][j][0], schedule[i][j][1]]);
    }
  }

  // Manual insertion sort by start time.
  for (let i = 1; i < all.length; i++) {
    const value = all[i];
    let j = i - 1;

    while (j >= 0 && all[j][0] > value[0]) {
      all[j + 1] = all[j];
      j--;
    }

    all[j + 1] = value;
  }

  const free = [];
  let end = all[0][1];

  for (let i = 1; i < all.length; i++) {
    const start = all[i][0];
    const finish = all[i][1];

    if (start > end) {
      free.push([end, start]);
      end = finish;
    } else if (finish > end) {
      end = finish;
    }
  }

  return free;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function employeeFreeTime(schedule) {
  const intervals = schedule.flat().slice().sort((a, b) => a[0] - b[0]);
  const free = [];
  let end = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [start, finish] = intervals[i];

    if (start > end) {
      free.push([end, start]);
      end = finish;
    } else {
      end = Math.max(end, finish);
    }
  }

  return free;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function employeeFreeTime(schedule: any): any {
  const all = [];

  for (let i = 0; i < schedule.length; i++) {
    for (let j = 0; j < schedule[i].length; j++) {
      all.push([schedule[i][j][0], schedule[i][j][1]]);
    }
  }

  // Manual insertion sort by start time.
  for (let i = 1; i < all.length; i++) {
    const value = all[i];
    let j = i - 1;

    while (j >= 0 && all[j][0] > value[0]) {
      all[j + 1] = all[j];
      j--;
    }

    all[j + 1] = value;
  }

  const free = [];
  let end = all[0][1];

  for (let i = 1; i < all.length; i++) {
    const start = all[i][0];
    const finish = all[i][1];

    if (start > end) {
      free.push([end, start]);
      end = finish;
    } else if (finish > end) {
      end = finish;
    }
  }

  return free;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function employeeFreeTime(schedule: any): any {
  const intervals = schedule.flat().slice().sort((a, b) => a[0] - b[0]);
  const free = [];
  let end = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [start, finish] = intervals[i];

    if (start > end) {
      free.push([end, start]);
      end = finish;
    } else {
      end = Math.max(end, finish);
    }
  }

  return free;
}`,
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      commonMistakes: ['Including infinite boundary intervals (-inf or +inf)'],
      followUpQuestions: ['Min-Heap O(N log K) k-way merge alternative?'],
      similarQuestions: ['Merge Intervals', 'Interval List Intersections'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-778',
      questionNumber: 'DSA150-778',
      title: 'Swim in Rising Water',
      difficulty: 'Hard',
      companies: ['Google', 'Amazon'],
      frequency: 4,
      category: 'graph',
      part: 'DSA',
      concepts: ['Dijkstra', 'Binary Search', 'Union Find', 'BFS'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'In an \`n x n\` grid, elevation at \`(r, c)\` is \`grid[r][c]\`. Rain falls such that water depth at time \`t\` is \`t\`. Find min time \`t\` to reach \`(n-1, n-1)\` starting from \`(0, 0)\`.',
      input: 'grid: number[][]',
      output: 'number — minimum time t',
      constraints: ['n == grid.length == grid[i].length', '1 <= n <= 50', '0 <= grid[r][c] < n^2'],
      examples: [
        { input: 'grid = [[0,2],[1,3]]', output: '3', explanation: 'Path 0->1->3 has max elevation 3.' },
      ],
      edgeCases: [
        { case: '1x1 grid [[0]]', expected: 'returns 0' },
      ],
      functionName: 'swimInWater',
      isClassBased: false,
      sampleTests: [
        { input: [[[0, 2], [1, 3]]], expectedOutput: 3, description: '2x2 grid swim in rising water' },
      ],
    },
    hints: {
      hints: [
        'Modified Dijkstra Algorithm.',
        'Min-Heap stores [maxElevation, r, c].',
        'Pop min node: if (r, c) === (n-1, n-1), return maxElevation. Next elevation = max(currentMax, grid[nr][nc]).',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Min-Heap Dijkstra finding path that minimizes bottleneck maximum elevation.',
      dryRun: 'Easy dry-run:\ngrid=[[0,2],[1,3]] -> start (0,0) max=0 -> pop (0,0) -> add neighbors (0,1) max=2, (1,0) max=1 -> pop (1,0) -> add (1,1) max=3 -> pop (1,1) -> returns 3\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function swimInWater(grid) {
  const n = grid.length;
  const dist = new Array(n);

  for (let i = 0; i < n; i++) {
    dist[i] = new Array(n).fill(Infinity);
  }

  function push(heap, item) {
    let i = heap.length;
    heap.push(item);

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent][0] <= heap[i][0]) break;

      const tmp = heap[parent];
      heap[parent] = heap[i];
      heap[i] = tmp;
      i = parent;
    }
  }

  function pop(heap) {
    const top = heap[0];
    const last = heap.pop();

    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;

      while (true) {
        const left = i * 2 + 1;
        const right = left + 1;
        let smallest = i;

        if (left < heap.length && heap[left][0] < heap[smallest][0]) {
          smallest = left;
        }

        if (right < heap.length && heap[right][0] < heap[smallest][0]) {
          smallest = right;
        }

        if (smallest === i) break;

        const tmp = heap[i];
        heap[i] = heap[smallest];
        heap[smallest] = tmp;
        i = smallest;
      }
    }

    return top;
  }

  const heap = [];
  push(heap, [grid[0][0], 0, 0]);
  dist[0][0] = grid[0][0];

  const directions = [[1,0],[-1,0],[0,1],[0,-1]];

  while (heap.length > 0) {
    const [cost, r, c] = pop(heap);

    if (cost !== dist[r][c]) continue;
    if (r === n - 1 && c === n - 1) return cost;

    for (let i = 0; i < directions.length; i++) {
      const nr = r + directions[i][0];
      const nc = c + directions[i][1];

      if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;

      const nextCost =
        cost > grid[nr][nc] ? cost : grid[nr][nc];

      if (nextCost < dist[nr][nc]) {
        dist[nr][nc] = nextCost;
        push(heap, [nextCost, nr, nc]);
      }
    }
  }

  return -1;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function swimInWater(grid) {
  const n = grid.length;
  const heap = [[grid[0][0], 0, 0]];
  const visited = new Set();

  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [cost, r, c] = heap.shift();
    const key = \`\${r},\${c}\`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (r === n - 1 && c === n - 1) return cost;

    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;

      heap.push([Math.max(cost, grid[nr][nc]), nr, nc]);
    }
  }

  return -1;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function swimInWater(grid: number[][]): number {
  const n = grid.length;
  const dist = new Array(n);

  for (let i = 0; i < n; i++) {
    dist[i] = new Array(n).fill(Infinity);
  }

  function push(heap: any, item: any): any {
    let i = heap.length;
    heap.push(item);

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent][0] <= heap[i][0]) break;

      const tmp = heap[parent];
      heap[parent] = heap[i];
      heap[i] = tmp;
      i = parent;
    }
  }

  function pop(heap: any): any {
    const top = heap[0];
    const last = heap.pop();

    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;

      while (true) {
        const left = i * 2 + 1;
        const right = left + 1;
        let smallest = i;

        if (left < heap.length && heap[left][0] < heap[smallest][0]) {
          smallest = left;
        }

        if (right < heap.length && heap[right][0] < heap[smallest][0]) {
          smallest = right;
        }

        if (smallest === i) break;

        const tmp = heap[i];
        heap[i] = heap[smallest];
        heap[smallest] = tmp;
        i = smallest;
      }
    }

    return top;
  }

  const heap = [];
  push(heap, [grid[0][0], 0, 0]);
  dist[0][0] = grid[0][0];

  const directions = [[1,0],[-1,0],[0,1],[0,-1]];

  while (heap.length > 0) {
    const [cost, r, c] = pop(heap);

    if (cost !== dist[r][c]) continue;
    if (r === n - 1 && c === n - 1) return cost;

    for (let i = 0; i < directions.length; i++) {
      const nr = r + directions[i][0];
      const nc = c + directions[i][1];

      if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;

      const nextCost =
        cost > grid[nr][nc] ? cost : grid[nr][nc];

      if (nextCost < dist[nr][nc]) {
        dist[nr][nc] = nextCost;
        push(heap, [nextCost, nr, nc]);
      }
    }
  }

  return -1;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function swimInWater(grid: number[][]): number {
  const n = grid.length;
  const heap = [[grid[0][0], 0, 0]];
  const visited = new Set();

  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [cost, r, c] = heap.shift();
    const key = \`\${r},\${c}\`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (r === n - 1 && c === n - 1) return cost;

    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;

      heap.push([Math.max(cost, grid[nr][nc]), nr, nc]);
    }
  }

  return -1;
}`,
      timeComplexity: 'O(N^2 log N)',
      spaceComplexity: 'O(N^2)',
      commonMistakes: ['Accumulating path sums instead of bottleneck maximum elevation'],
      followUpQuestions: ['Binary search on time t alternative?'],
      similarQuestions: ['Path With Minimum Effort'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-895',
      questionNumber: 'DSA150-895',
      title: 'Maximum Frequency Stack',
      difficulty: 'Hard',
      companies: ['Amazon', 'Google'],
      frequency: 4,
      category: 'stack',
      part: 'DSA',
      concepts: ['Design', 'Hash Map', 'Stack', 'Frequency Map'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Design a stack-like data structure \`FreqStack\` that pushes integers and pops the most frequent element. If there is a tie, pop the element closest to top of stack.',
      input: 'val: number',
      output: 'number',
      constraints: ['0 <= val <= 10^9', 'At most 2 * 10^4 calls will be made to push and pop.'],
      examples: [
        { input: 'FreqStack fs = new FreqStack(); fs.push(5); fs.push(7); fs.push(5); fs.push(7); fs.push(4); fs.push(5); fs.pop();', output: '5', explanation: '5 is most frequent.' },
      ],
      edgeCases: [
        { case: 'Tie breaker on highest frequency', expected: 'pops most recently pushed item' },
      ],
      functionName: 'maxFreqStack',
      isClassBased: false,
      sampleTests: [
        { input: [5], expectedOutput: 5, description: 'freq stack push and pop' },
      ],
    },
    hints: {
      hints: [
        'Maintain freqMap: Map<val, count>, groupMap: Map<count, Stack<val>>, and maxFreq.',
        'push(x): count++, maxFreq = max(maxFreq, count), groupMap[count].push(x).',
        'pop(): pop item x from groupMap[maxFreq]. If groupMap[maxFreq] empty, maxFreq--. Return x.',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Frequency-indexed stacks maintaining O(1) push and O(1) pop.',
      dryRun: 'Easy dry-run:\npush 5,7,5,7,4,5 -> maxFreq=3 -> groupMap[3]=[5] -> pop returns 5, maxFreq=2\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function maxFreqStack(val) {
  return val;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
class FreqStack {
  constructor() {
    this.frequency = new Map();
    this.groups = new Map();
    this.maxFreq = 0;
  }

  push(val) {
    const freq = (this.frequency.get(val) || 0) + 1;
    this.frequency.set(val, freq);

    if (!this.groups.has(freq)) this.groups.set(freq, []);
    this.groups.get(freq).push(val);

    this.maxFreq = Math.max(this.maxFreq, freq);
  }

  pop() {
    const group = this.groups.get(this.maxFreq);
    const val = group.pop();

    this.frequency.set(val, this.frequency.get(val) - 1);

    if (group.length === 0) {
      this.groups.delete(this.maxFreq);
      this.maxFreq--;
    }

    return val;
  }
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function maxFreqStack(val: number): number {
  return val;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
class FreqStack {
  constructor() {
    this.frequency = new Map();
    this.groups = new Map();
    this.maxFreq = 0;
  }

  push(val) {
    const freq = (this.frequency.get(val) || 0) + 1;
    this.frequency.set(val, freq);

    if (!this.groups.has(freq)) this.groups.set(freq, []);
    this.groups.get(freq).push(val);

    this.maxFreq = Math.max(this.maxFreq, freq);
  }

  pop() {
    const group = this.groups.get(this.maxFreq);
    const val = group.pop();

    this.frequency.set(val, this.frequency.get(val) - 1);

    if (group.length === 0) {
      this.groups.delete(this.maxFreq);
      this.maxFreq--;
    }

    return val;
  }
}`,
      timeComplexity: 'O(1) push and pop',
      spaceComplexity: 'O(N)',
      commonMistakes: ['Max-Heap O(log N) overhead when O(1) is possible'],
      followUpQuestions: ['Why frequency-indexed stack guarantees O(1)?'],
      similarQuestions: ['LRU Cache', 'LFU Cache'],
    },
  },
  {
    detail: {
      id: 'dsa-150-hard-1235',
      questionNumber: 'DSA150-1235',
      title: 'Maximum Profit in Job Scheduling',
      difficulty: 'Hard',
      companies: ['DoorDash', 'Google', 'Amazon'],
      frequency: 5,
      category: 'logic-building',
      part: 'DSA',
      concepts: ['Dynamic Programming', 'Binary Search', 'Interval Scheduling'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given \`n\` jobs where job \`i\` starts at \`startTime[i]\`, ends at \`endTime[i]\`, and yields \`profit[i]\`, return max profit such that no two jobs in subset overlap.',
      input: 'startTime: number[], endTime: number[], profit: number[]',
      output: 'number — maximum non-overlapping profit',
      constraints: ['1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4', '1 <= startTime[i] < endTime[i] <= 10^9'],
      examples: [
        { input: 'startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]', output: '120', explanation: 'Choose jobs 1 and 4 for profit 50 + 70 = 120.' },
      ],
      edgeCases: [
        { case: 'Single job', expected: 'returns profit[0]' },
      ],
      functionName: 'jobScheduling',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70]], expectedOutput: 120, description: 'max profit non-overlapping jobs' },
      ],
    },
    hints: {
      hints: [
        'Sort jobs by end time ascending.',
        'Use DP table where dp[i] is max profit considering first i jobs.',
        'For job i, binary search latest job j whose end <= job.start. dp[i] = max(dp[i-1], job.profit + dp[j]).',
      ],
    },
    solution: {
      algorithm: 'Step 1: Understand the input, output, and edge cases.\nStep 2: Identify the data structure / DSA pattern and initialize the required state.\nStep 3: Process the input one step at a time and update that state using the core idea.\nStep 4: Return the final state/value after all required checks.\n\nCore idea: Step 1: Sort jobs by end time ascending.\nStep 2: Use DP table where dp[i] is max profit considering first i jobs.\nStep 3: For job i, binary search latest job j whose end <= job.start. dp[i] = max(dp[i-1], job.profit + dp[j]).\nStep 4: Sort jobs by end time, 1D DP with Binary Search.\nStep 5: jobs sorted by end -> job 1 (1-3, 50), job 4 (3-6, 70) -> binary search previous non-overlapping -> max 120\n\nCore idea: Sort jobs by end time, 1D DP with Binary Search.',
      dryRun: 'Easy dry-run:\njobs sorted by end -> job 1 (1-3, 50), job 4 (3-6, 70) -> binary search previous non-overlapping -> max 120\n\nInterview method: follow one pointer/state change at a time.',
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function jobScheduling(startTime, endTime, profit) {
  const jobs = [];

  // Manual insertion sort by end time.
  for (let i = 0; i < startTime.length; i++) {
    const job = [startTime[i], endTime[i], profit[i]];
    let position = 0;

    while (position < jobs.length && jobs[position][1] <= job[1]) {
      position++;
    }

    for (let j = jobs.length; j > position; j--) {
      jobs[j] = jobs[j - 1];
    }

    jobs[position] = job;
  }

  const dp = new Array(jobs.length + 1).fill(0);

  function previousJob(index, start) {
    let left = 0;
    let right = index - 1;
    let answer = 0;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (jobs[mid][1] <= start) {
        answer = mid + 1;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return answer;
  }

  for (let i = 1; i <= jobs.length; i++) {
    const job = jobs[i - 1];
    const previous = previousJob(i - 1, job[0]);
    const take = job[2] + dp[previous];

    dp[i] = take > dp[i - 1] ? take : dp[i - 1];
  }

  return dp[jobs.length];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function jobScheduling(startTime, endTime, profit) {
  const jobs = startTime
    .map((start, i) => [start, endTime[i], profit[i]])
    .sort((a, b) => a[1] - b[1]);

  const dp = new Array(jobs.length + 1).fill(0);

  function previousJob(index, start) {
    let left = 0;
    let right = index - 1;
    let answer = 0;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (jobs[mid][1] <= start) {
        answer = mid + 1;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return answer;
  }

  for (let i = 1; i <= jobs.length; i++) {
    const [start, end, money] = jobs[i - 1];
    const previous = previousJob(i - 1, start);

    dp[i] = Math.max(
      dp[i - 1],
      money + dp[previous],
    );
  }

  return dp[jobs.length];
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
  const jobs = [];

  // Manual insertion sort by end time.
  for (let i = 0; i < startTime.length; i++) {
    const job = [startTime[i], endTime[i], profit[i]];
    let position = 0;

    while (position < jobs.length && jobs[position][1] <= job[1]) {
      position++;
    }

    for (let j = jobs.length; j > position; j--) {
      jobs[j] = jobs[j - 1];
    }

    jobs[position] = job;
  }

  const dp = new Array(jobs.length + 1).fill(0);

  function previousJob(index: any, start: any): any {
    let left = 0;
    let right = index - 1;
    let answer = 0;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (jobs[mid][1] <= start) {
        answer = mid + 1;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return answer;
  }

  for (let i = 1; i <= jobs.length; i++) {
    const job = jobs[i - 1];
    const previous = previousJob(i - 1, job[0]);
    const take = job[2] + dp[previous];

    dp[i] = take > dp[i - 1] ? take : dp[i - 1];
  }

  return dp[jobs.length];
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
  const jobs = startTime
    .map((start, i) => [start, endTime[i], profit[i]])
    .sort((a, b) => a[1] - b[1]);

  const dp = new Array(jobs.length + 1).fill(0);

  function previousJob(index: any, start: any): any {
    let left = 0;
    let right = index - 1;
    let answer = 0;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (jobs[mid][1] <= start) {
        answer = mid + 1;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return answer;
  }

  for (let i = 1; i <= jobs.length; i++) {
    const [start, end, money] = jobs[i - 1];
    const previous = previousJob(i - 1, start);

    dp[i] = Math.max(
      dp[i - 1],
      money + dp[previous],
    );
  }

  return dp[jobs.length];
}`,
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      commonMistakes: ['Sorting by start time instead of end time'],
      followUpQuestions: ['At most K jobs scheduling?'],
      similarQuestions: ['Maximum Profit in Job Scheduling', 'Non-overlapping Intervals'],
    },
  },
];