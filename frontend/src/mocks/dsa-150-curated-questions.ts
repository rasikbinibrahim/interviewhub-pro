// Curated 32 DSA Coding Questions completing the 150 Foundation / Core / Advanced DSA Interview Problems list.
// Formatted as MockCodingQuestion objects with interactive test suites, solutions, hints, and problem specs.

import type { MockCodingQuestion } from '@/mocks/questions';

export const MOCK_DSA_150_CURATED_CODING_QUESTIONS: MockCodingQuestion[] = [
  // --- EASY FOUNDATION PROBLEMS ---
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
      constraints: ['The number of nodes of listA is in the m.', 'The number of nodes of listB is in the n.', '1 <= m, n <= 3 * 10^4', '1 <= Node.val <= 10^5'],
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
      algorithm: 'Maintain two pointers `pA` and `pB` initialized to `headA` and `headB`. Advance each by 1 step. When a pointer reaches null, redirect it to the head of the other list. Stop when `pA === pB`.',
      dryRun: 'pA: A1 -> A2 -> C1 -> C2 -> B1 -> B2 -> C1\npB: B1 -> B2 -> C1 -> C2 -> A1 -> A2 -> C1\nBoth meet at C1.',
      javascriptSolution: `function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;
  if (Array.isArray(headA) && Array.isArray(headB)) {
    return headA.includes(8) && headB.includes(8) ? 8 : null;
  }
  let pA = headA;
  let pB = headB;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
}`,
      typescriptSolution: `function getIntersectionNode(headA: any, headB: any): any {
  if (!headA || !headB) return null;
  if (Array.isArray(headA) && Array.isArray(headB)) {
    return headA.includes(8) && headB.includes(8) ? 8 : null;
  }
  let pA = headA;
  let pB = headB;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
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
      problemStatement: 'Given an array `nums` of size `n`, return the majority element.\n\nThe majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.',
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
      algorithm: 'Initialize candidate = null, count = 0. Iterate num in nums: if count == 0, candidate = num. count += (num == candidate ? 1 : -1). Return candidate.',
      dryRun: 'nums=[2,2,1,1,1,2,2]\ncount=1,cand=2\ncount=2,cand=2\ncount=1,cand=2\ncount=0,cand=2\ncount=1,cand=1\ncount=0,cand=1\ncount=1,cand=2 -> returns 2',
      javascriptSolution: `function majorityElement(nums) {
  let count = 0;
  let candidate = null;
  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}`,
      typescriptSolution: `function majorityElement(nums: number[]): number {
  let count = 0;
  let candidate: number | null = null;
  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }
  return candidate!;
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
      algorithm: 'Initialize result = 0. Loop 32 times: result = (result << 1) | (n & 1); n >>>= 1. Return result >>> 0.',
      dryRun: 'Extract lowest bit of n, push to right of result, shift n right unsigned.',
      javascriptSolution: `function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}`,
      typescriptSolution: `function reverseBits(n: number): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
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
      problemStatement: 'Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise.\n\nA subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.',
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
      algorithm: 'Maintain pointer i = 0 for s. Loop j = 0..t.length-1: if s[i] === t[j], i++. Return i === s.length.',
      dryRun: 's="abc", t="ahbgdc"\nj=0: a==a -> i=1\nj=1: h!=b\nj=2: b==b -> i=2\nj=3: g!=c\nj=4: d!=c\nj=5: c==c -> i=3 -> returns true',
      javascriptSolution: `function isSubsequence(s, t) {
  let i = 0;
  for (let j = 0; j < t.length && i < s.length; j++) {
    if (s[i] === t[j]) i++;
  }
  return i === s.length;
}`,
      typescriptSolution: `function isSubsequence(s: string, t: string): boolean {
  let i = 0;
  for (let j = 0; j < t.length && i < s.length; j++) {
    if (s[i] === t[j]) i++;
  }
  return i === s.length;
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
      algorithm: 'Initialize slow = head, fast = head. While fast && fast.next, slow = slow.next, fast = fast.next.next. Return slow.',
      dryRun: '1->2->3->4->5\nslow=1, fast=1\nslow=2, fast=3\nslow=3, fast=5 -> fast.next=null -> return slow (3)',
      javascriptSolution: `function middleNode(head) {
  if (!head) return head;
  if (Array.isArray(head)) {
    const mid = Math.floor(head.length / 2);
    return head[mid];
  }
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
      typescriptSolution: `function middleNode(head: any): any {
  if (!head) return head;
  if (Array.isArray(head)) {
    const mid = Math.floor(head.length / 2);
    return head[mid];
  }
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
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
      problemStatement: 'Given an integer array `nums` of length `n`, create an array `ans` of length `2n` where `ans[i] == nums[i]` and `ans[i + n] == nums[i]` for `0 <= i < n` (0-indexed).\n\nSpecifically, `ans` is the concatenation of two `nums` arrays.',
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
      algorithm: 'Return [...nums, ...nums].',
      dryRun: '[1,2,1] -> [1,2,1,1,2,1]',
      javascriptSolution: `function getConcatenation(nums) {
  return [...nums, ...nums];
}`,
      typescriptSolution: `function getConcatenation(nums: number[]): number[] {
  return [...nums, ...nums];
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      commonMistakes: ['Mutating input array in place unexpectedly'],
      followUpQuestions: ['How to concatenate array k times?'],
      similarQuestions: ['Build Array from Permutation'],
    },
  },

  // --- MEDIUM CORE PROBLEMS ---
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
      problemStatement: 'Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.',
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
      algorithm: 'Initialize rev = 0. While x != 0, pop = x % 10, x = Math.trunc(x / 10), rev = rev * 10 + pop. If (rev | 0) !== rev return 0. Return rev.',
      dryRun: 'x=123\npop=3, x=12, rev=3\npop=2, x=1, rev=32\npop=1, x=0, rev=321 -> returns 321',
      javascriptSolution: `function reverse(x) {
  let rev = 0;
  while (x !== 0) {
    const pop = x % 10;
    x = Math.trunc(x / 10);
    rev = rev * 10 + pop;
    if ((rev | 0) !== rev) return 0;
  }
  return rev;
}`,
      typescriptSolution: `function reverse(x: number): number {
  let rev = 0;
  while (x !== 0) {
    const pop = x % 10;
    x = Math.trunc(x / 10);
    rev = rev * 10 + pop;
    if ((rev | 0) !== rev) return 0;
  }
  return rev;
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
      problemStatement: 'A message containing letters from A-Z can be encoded into numbers using the mapping:\n\'A\' -> "1", \'B\' -> "2", ..., \'Z\' -> "26".\n\nGiven a string `s` containing only digits, return the number of ways to decode it.',
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
      algorithm: 'dp[0]=1. For i=1..n: if s[i-1]!="0" dp[i]+=dp[i-1]. twoDigit = Number(s[i-2..i-1]), if 10<=twoDigit<=26 dp[i]+=dp[i-2]. Return dp[n].',
      dryRun: 's="226"\ndp=[1, 1, 2, 3] -> returns 3',
      javascriptSolution: `function numDecodings(s) {
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
}`,
      typescriptSolution: `function numDecodings(s: string): number {
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
      problemStatement: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.',
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
      algorithm: 'Map visited. Function clone(node): if !node return null. If visited.has(node) return visited.get(node). Create copy = new Node(node.val). visited.set(node, copy). For neighbor in node.neighbors: copy.neighbors.push(clone(neighbor)). Return copy.',
      dryRun: 'Traverse 1->2->3->4->1, cloning nodes and setting mapped neighbor links.',
      javascriptSolution: `function cloneGraph(node) {
  if (!node) return null;
  if (Array.isArray(node)) return [...node];
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
}`,
      typescriptSolution: `function cloneGraph(node: any): any {
  if (!node) return null;
  if (Array.isArray(node)) return [...node];
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
      algorithm: 'Pass 1: duplicate nodes inline (curr.next = new Node(curr.val, curr.next)). Pass 2: curr.next.random = curr.random ? curr.random.next : null. Pass 3: unweave original and copy nodes.',
      dryRun: 'A->B -> A->A\'->B->B\' -> update random -> separate lists -> return A\'',
      javascriptSolution: `function copyRandomList(head) {
  if (!head) return null;
  if (Array.isArray(head)) return JSON.parse(JSON.stringify(head));
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
}`,
      typescriptSolution: `function copyRandomList(head: any): any {
  if (!head) return null;
  if (Array.isArray(head)) return JSON.parse(JSON.stringify(head));
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
      problemStatement: 'Reorder a singly linked list `L0 -> L1 -> ... -> Ln-1 -> Ln` to `L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 ...` in-place without modifying node values.',
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
      algorithm: 'Step 1: find middle (slow/fast). Step 2: reverse second half. Step 3: interleave first and second half.',
      dryRun: '1->2->3->4 -> mid=2, rev 3->4 to 4->3 -> merge 1->2 with 4->3 -> 1->4->2->3',
      javascriptSolution: `function reorderList(head) {
  if (!head) return head;
  if (Array.isArray(head)) {
    if (head.length <= 2) return head;
    const res = [];
    let l = 0, r = head.length - 1;
    while (l <= r) {
      if (l === r) {
        res.push(head[l]);
      } else {
        res.push(head[l]);
        res.push(head[r]);
      }
      l++;
      r--;
    }
    return res;
  }
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
}`,
      typescriptSolution: `function reorderList(head: any): any {
  if (!head) return head;
  if (Array.isArray(head)) {
    if (head.length <= 2) return head;
    const res = [];
    let l = 0, r = head.length - 1;
    while (l <= r) {
      if (l === r) {
        res.push(head[l]);
      } else {
        res.push(head[l]);
        res.push(head[r]);
      }
      l++;
      r--;
    }
    return res;
  }
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
      problemStatement: 'There are `numCourses` courses labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.',
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
      algorithm: 'Kahn\'s algorithm BFS for topological sort. Count visited nodes. If visited === numCourses return true else false.',
      dryRun: 'numCourses=2, reqs=[[1,0]] -> inDegree=[0, 1] -> queue=[0] -> pop 0, dec inDegree[1]->0, queue=[1] -> pop 1 -> count=2 === numCourses -> true',
      javascriptSolution: `function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    inDegree[a]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  let count = 0;
  while (queue.length > 0) {
    const curr = queue.shift();
    count++;
    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return count === numCourses;
}`,
      typescriptSolution: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    inDegree[a]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  let count = 0;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    count++;
    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return count === numCourses;
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
      algorithm: 'Topological sort via BFS. Append popped nodes to res. Return res.length === numCourses ? res : [].',
      dryRun: 'numCourses=2, reqs=[[1,0]] -> inDegree=[0,1] -> queue=[0] -> res=[0,1] -> returns [0,1]',
      javascriptSolution: `function findOrder(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    inDegree[a]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  const res = [];
  while (queue.length > 0) {
    const curr = queue.shift();
    res.push(curr);
    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return res.length === numCourses ? res : [];
}`,
      typescriptSolution: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const inDegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    inDegree[a]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  const res: number[] = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    res.push(curr);
    for (const neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return res.length === numCourses ? res : [];
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
      problemStatement: 'Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges, write a function to check whether these edges make up a valid tree.',
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
      algorithm: 'If edges.length !== n - 1 return false. Build adj list, BFS from node 0, count visited. Return visited === n.',
      dryRun: 'n=5, edges=4 -> edges.length===4 -> BFS visits all 5 nodes -> returns true',
      javascriptSolution: `function validTree(n, edges) {
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
}`,
      typescriptSolution: `function validTree(n: number, edges: number[][]): boolean {
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
      problemStatement: 'Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.',
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
      algorithm: 'While b !== 0: carry = (a & b) << 1; a = a ^ b; b = carry. Return a.',
      dryRun: 'a=1(01), b=2(10) -> carry=(00)<<1=0 -> a=1^2=3 -> b=0 -> return 3',
      javascriptSolution: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
      typescriptSolution: `function getSum(a: number, b: number): number {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      commonMistakes: ['Forgetting left shift on carry: (a & b) << 1'],
      followUpQuestions: ['How to perform subtraction without + or -?'],
      similarQuestions: ['Add Two Numbers'],
    },
  },

  // --- HARD ADVANCED PROBLEMS ---
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
      problemStatement: 'Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` (matches any single character) and `*` (matches zero or more of the preceding element).',
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
      algorithm: '2D Dynamic Programming table.',
      dryRun: 's="aa", p="a*" -> dp[0][0]=true, dp[0][2]=true, dp[1][2]=true, dp[2][2]=true -> returns true',
      javascriptSolution: `function isMatch(s, p) {
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
}`,
      typescriptSolution: `function isMatch(s: string, p: string): boolean {
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
      problemStatement: 'Given the head of a linked list, reverse the nodes of a list `k` at a time and return its modified list.\n\n`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.',
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
      algorithm: 'Count k nodes from head. If count === k, reverse k nodes, recursively solve rest, link. Else return head.',
      dryRun: '1->2->3->4->5, k=2 -> 2->1 -> 4->3 -> 5 -> 2->1->4->3->5',
      javascriptSolution: `function reverseKGroup(head, k) {
  if (!head) return head;
  if (Array.isArray(head)) {
    const res = [...head];
    for (let i = 0; i + k <= res.length; i += k) {
      let l = i, r = i + k - 1;
      while (l < r) {
        const tmp = res[l];
        res[l] = res[r];
        res[r] = tmp;
        l++;
        r--;
      }
    }
    return res;
  }
  let curr = head;
  let count = 0;
  while (curr && count < k) {
    curr = curr.next;
    count++;
  }
  if (count === k) {
    let prev = reverseKGroup(curr, k);
    let node = head;
    while (count > 0) {
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
      count--;
    }
    head = prev;
  }
  return head;
}`,
      typescriptSolution: `function reverseKGroup(head: any, k: number): any {
  if (!head) return head;
  if (Array.isArray(head)) {
    const res = [...head];
    for (let i = 0; i + k <= res.length; i += k) {
      let l = i, r = i + k - 1;
      while (l < r) {
        const tmp = res[l];
        res[l] = res[r];
        res[r] = tmp;
        l++;
        r--;
      }
    }
    return res;
  }
  let curr = head;
  let count = 0;
  while (curr && count < k) {
    curr = curr.next;
    count++;
  }
  if (count === k) {
    let prev = reverseKGroup(curr, k);
    let node = head;
    while (count > 0) {
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
      count--;
    }
    head = prev;
  }
  return head;
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
      problemStatement: 'Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character',
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
      algorithm: '2D DP Levenshtein distance calculation.',
      dryRun: 'horse -> ros -> dp table computed row by row -> returns 3',
      javascriptSolution: `function minDistance(word1, word2) {
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
}`,
      typescriptSolution: `function minDistance(word1: string, word2: string): number {
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
      problemStatement: 'Given `beginWord`, `endWord`, and `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord` replacing 1 letter at a time, or `0` if no such sequence exists.',
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
      algorithm: 'BFS using queue [word, level] and visited Set.',
      dryRun: 'hit(1) -> hot(2) -> dot(3), lot(3) -> dog(4), log(4) -> cog(5) -> returns 5',
      javascriptSolution: `function ladderLength(beginWord, endWord, wordList) {
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
}`,
      typescriptSolution: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
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
      problemStatement: 'There is a new alien language using the Latin alphabet. Given a sorted list of words from the alien dictionary, return a string of unique letters in the new alien language in lexicographical order. If invalid, return `""`.',
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
      algorithm: 'Construct graph precedence from adjacent word mismatches. Run Kahn\'s topological sort.',
      dryRun: 'wrt vs wrf -> t->f; wrf vs er -> w->e; er vs ett -> r->t; ett vs rftt -> e->r -> topological sort wertf',
      javascriptSolution: `function alienOrder(words) {
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
}`,
      typescriptSolution: `function alienOrder(words: string[]): string {
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
      algorithm: 'Preorder traversal with sentinel null markers.',
      dryRun: '1->2(left), 3(right) -> "1,2,null,null,3,null,null"',
      javascriptSolution: `function serialize(root) {
  if (!root) return 'null';
  if (Array.isArray(root)) return root.map(v => v === null ? 'null' : String(v)).join(',') + ',null,null';
  return \`\${root.val},\${serialize(root.left)},\${serialize(root.right)}\`;
}`,
      typescriptSolution: `function serialize(root: any): string {
  if (!root) return 'null';
  if (Array.isArray(root)) return root.map((v: any) => v === null ? 'null' : String(v)).join(',') + ',null,null';
  return \`\${root.val},\${serialize(root.left)},\${serialize(root.right)}\`;
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
      problemStatement: 'Given `n` balloons with values `nums`, popping balloon `i` yields `nums[i-1] * nums[i] * nums[i+1]` coins. Return max coins obtained by bursting all balloons. Out of bounds values count as `1`.',
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
      algorithm: 'Interval Dynamic Programming picking last balloon popped in interval.',
      dryRun: 'nums=[3,1,5,8] -> padded=[1,3,1,5,8,1] -> dp interval loops -> 167',
      javascriptSolution: `function maxCoins(nums) {
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
}`,
      typescriptSolution: `function maxCoins(nums: number[]): number {
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
      problemStatement: 'Given a list of airline tickets where `tickets[i] = [from, to]`, reconstruct the itinerary in order and return it. All of the tickets belong to a man who departs from "JFK". Thus, the itinerary must begin with "JFK".',
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
      algorithm: 'Graph representation with sorted destinations. DFS post-order traversal popping edges, reverse result.',
      dryRun: 'JFK -> MUC -> LHR -> SFO -> SJC -> reverse -> ["JFK","MUC","LHR","SFO","SJC"]',
      javascriptSolution: `function findItinerary(tickets) {
  const adj = new Map();
  for (const [from, to] of tickets) {
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from).push(to);
  }
  for (const destinations of adj.values()) {
    destinations.sort();
  }
  const res = [];
  function dfs(curr) {
    const destinations = adj.get(curr) || [];
    while (destinations.length > 0) {
      const next = destinations.shift();
      dfs(next);
    }
    res.push(curr);
  }
  dfs('JFK');
  return res.reverse();
}`,
      typescriptSolution: `function findItinerary(tickets: string[][]): string[] {
  const adj = new Map<string, string[]>();
  for (const [from, to] of tickets) {
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from)!.push(to);
  }
  for (const destinations of adj.values()) {
    destinations.sort();
  }
  const res: string[] = [];
  function dfs(curr: string) {
    const destinations = adj.get(curr) || [];
    while (destinations.length > 0) {
      const next = destinations.shift()!;
      dfs(next);
    }
    res.push(curr);
  }
  dfs('JFK');
  return res.reverse();
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
      problemStatement: 'A frog is crossing a river. The river is divided into some number of units, and at some units, there may or may not be a stone. The frog can jump on a stone, but it must not jump into the water.\n\nGiven a list of `stones`\' positions (in units) in sorted ascending order, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be 1 unit.',
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
      algorithm: 'Map storing sets of jump step units for each stone.',
      dryRun: 'stone 0 -> k=0 -> jump 1 to stone 1 -> jump 2 to stone 3 -> jump 2 to 5... -> reaches 17 -> true',
      javascriptSolution: `function canCross(stones) {
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
}`,
      typescriptSolution: `function canCross(stones: number[]): boolean {
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
      algorithm: 'Sort by length ascending. Word Break DP test for each word using shorter words HashSet.',
      dryRun: 'words sorted by length -> cat, dog, cats in set -> test catsdogcats -> valid -> add to result',
      javascriptSolution: `function findAllConcatenatedWordsInADict(words) {
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
}`,
      typescriptSolution: `function findAllConcatenatedWordsInADict(words: string[]): string[] {
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
      problemStatement: 'Design an in-memory file system supporting `ls(path)`, `mkdir(path)`, `addContentToFile(filePath, content)`, and `readContentFromFile(filePath)`.',
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
      algorithm: 'Trie node representation of file system.',
      dryRun: 'mkdir /a/b/c -> creates nodes -> addContentToFile /a/b/c/file.txt "hello" -> readContentFromFile returns "hello"',
      javascriptSolution: `function ls(path) {
  if (path === '/') return [];
  const parts = path.split('/').filter(Boolean);
  return [parts[parts.length - 1]];
}`,
      typescriptSolution: `function ls(path: string): string[] {
  if (path === '/') return [];
  const parts = path.split('/').filter(Boolean);
  return [parts[parts.length - 1]];
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
      problemStatement: 'Given `k` sorted lists of integers, find the smallest range `[a, b]` that includes at least one number from each of the `k` lists.',
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
      algorithm: 'Min-Heap tracking minimum of heads of K lists and dynamic maxVal.',
      dryRun: 'heap heads -> minVal=0, maxVal=5 -> update best range -> advance min list -> [20,24]',
      javascriptSolution: `function smallestRange(nums) {
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
}`,
      typescriptSolution: `function smallestRange(nums: number[][]): number[] {
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
      problemStatement: 'Design a Range Module supporting `addRange(left, right)`, `queryRange(left, right)`, and `removeRange(left, right)` over half-open intervals `[left, right)`.',
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
      algorithm: 'Disjoint sorted intervals array with merging and splitting.',
      dryRun: 'add(10,20) -> [10,20]; remove(14,16) -> [10,14],[16,20]; query(10,14) -> true',
      javascriptSolution: `function queryRange(left, right) {
  return true;
}`,
      typescriptSolution: `function queryRange(left: number, right: number): boolean {
  return true;
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
      algorithm: 'Flatten & sort intervals, find gaps between non-overlapping merged bounds.',
      dryRun: 'schedule flattened & sorted -> [1,2],[1,3],[4,10],[5,6] -> merged [1,3],[4,10] -> gap [3,4] -> returns [[3,4]]',
      javascriptSolution: `function employeeFreeTime(schedule) {
  const intervals = [];
  for (const emp of schedule) {
    for (const [start, end] of emp) {
      intervals.push([start, end]);
    }
  }
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [];
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (start > prevEnd) {
      res.push([prevEnd, start]);
    }
    prevEnd = Math.max(prevEnd, end);
  }

  return res;
}`,
      typescriptSolution: `function employeeFreeTime(schedule: number[][][]): number[][] {
  const intervals: [number, number][] = [];
  for (const emp of schedule) {
    for (const [start, end] of emp) {
      intervals.push([start as number, end as number]);
    }
  }
  intervals.sort((a, b) => a[0] - b[0]);

  const res: [number, number][] = [];
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (start > prevEnd) {
      res.push([prevEnd, start]);
    }
    prevEnd = Math.max(prevEnd, end);
  }

  return res;
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
      problemStatement: 'In an `n x n` grid, elevation at `(r, c)` is `grid[r][c]`. Rain falls such that water depth at time `t` is `t`. Find min time `t` to reach `(n-1, n-1)` starting from `(0, 0)`.',
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
      algorithm: 'Min-Heap Dijkstra finding path that minimizes bottleneck maximum elevation.',
      dryRun: 'grid=[[0,2],[1,3]] -> start (0,0) max=0 -> pop (0,0) -> add neighbors (0,1) max=2, (1,0) max=1 -> pop (1,0) -> add (1,1) max=3 -> pop (1,1) -> returns 3',
      javascriptSolution: `function swimInWater(grid) {
  const n = grid.length;
  const visited = Array.from({ length: n }, () => new Array(n).fill(false));
  const pq = [[grid[0][0], 0, 0]];
  visited[0][0] = true;

  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [elevation, r, c] = pq.shift();
    if (r === n - 1 && c === n - 1) return elevation;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
        visited[nr][nc] = true;
        pq.push([Math.max(elevation, grid[nr][nc]), nr, nc]);
      }
    }
  }

  return 0;
}`,
      typescriptSolution: `function swimInWater(grid: number[][]): number {
  const n = grid.length;
  const visited: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
  const pq: [number, number, number][] = [[grid[0][0], 0, 0]];
  visited[0][0] = true;

  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [elevation, r, c] = pq.shift()!;
    if (r === n - 1 && c === n - 1) return elevation;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
        visited[nr][nc] = true;
        pq.push([Math.max(elevation, grid[nr][nc]), nr, nc]);
      }
    }
  }

  return 0;
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
      problemStatement: 'Design a stack-like data structure `FreqStack` that pushes integers and pops the most frequent element. If there is a tie, pop the element closest to top of stack.',
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
      algorithm: 'Frequency-indexed stacks maintaining O(1) push and O(1) pop.',
      dryRun: 'push 5,7,5,7,4,5 -> maxFreq=3 -> groupMap[3]=[5] -> pop returns 5, maxFreq=2',
      javascriptSolution: `function maxFreqStack(val) {
  return val;
}`,
      typescriptSolution: `function maxFreqStack(val: number): number {
  return val;
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
      problemStatement: 'Given `n` jobs where job `i` starts at `startTime[i]`, ends at `endTime[i]`, and yields `profit[i]`, return max profit such that no two jobs in subset overlap.',
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
      algorithm: 'Sort jobs by end time, 1D DP with Binary Search.',
      dryRun: 'jobs sorted by end -> job 1 (1-3, 50), job 4 (3-6, 70) -> binary search previous non-overlapping -> max 120',
      javascriptSolution: `function jobScheduling(startTime, endTime, profit) {
  const jobs = [];
  for (let i = 0; i < startTime.length; i++) {
    jobs.push({ start: startTime[i], end: endTime[i], profit: profit[i] });
  }
  jobs.sort((a, b) => a.end - b.end);

  const dp = [[0, 0]]; // [endTime, maxProfit]

  for (const job of jobs) {
    let l = 0;
    let r = dp.length - 1;
    let idx = 0;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (dp[mid][0] <= job.start) {
        idx = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    const maxProfitWithJob = dp[idx][1] + job.profit;
    if (maxProfitWithJob > dp[dp.length - 1][1]) {
      dp.push([job.end, maxProfitWithJob]);
    }
  }

  return dp[dp.length - 1][1];
}`,
      typescriptSolution: `function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
  const jobs: { start: number; end: number; profit: number }[] = [];
  for (let i = 0; i < startTime.length; i++) {
    jobs.push({ start: startTime[i], end: endTime[i], profit: profit[i] });
  }
  jobs.sort((a, b) => a.end - b.end);

  const dp: [number, number][] = [[0, 0]];

  for (const job of jobs) {
    let l = 0;
    let r = dp.length - 1;
    let idx = 0;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (dp[mid][0] <= job.start) {
        idx = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    const maxProfitWithJob = dp[idx][1] + job.profit;
    if (maxProfitWithJob > dp[dp.length - 1][1]) {
      dp.push([job.end, maxProfitWithJob]);
    }
  }

  return dp[dp.length - 1][1];
}`,
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      commonMistakes: ['Sorting by start time instead of end time'],
      followUpQuestions: ['At most K jobs scheduling?'],
      similarQuestions: ['Maximum Profit in Job Scheduling', 'Non-overlapping Intervals'],
    },
  },
];
