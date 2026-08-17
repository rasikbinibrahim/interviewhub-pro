// Hand-authored coding questions derived from
// frontend/src/document/DSA_Master_Handbook_Senior_Frontend_Engineers.md
// (Module 2 — Arrays). Unlike the auto-generated MockTechnicalQuestion
// files, these are real CodingQuestionDetail problems: every sampleTests
// entry has been checked against the reference solution below, and both
// the JavaScript and TypeScript solutions are genuine, working code (no
// placeholder "solve(input)" stubs).

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

const CATEGORY = 'Arrays';
const CONCEPTS = ['Arrays', 'Time Complexity', 'Space Complexity', 'Pattern Recognition'];

export const MOCK_DSA_CODING_MODULE2_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m2-1',
      questionNumber: 'DSACODE-M2-1',
      title: 'Array Traversal and Mutation — Double Non-Negatives',
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
        'Given an array of integers, return a new array where every non-negative number is doubled and every negative number is left unchanged. Do not mutate the input array.',
      input: 'nums: number[] — an array of integers (may be empty)',
      output: 'number[] — a new array the same length as nums, with non-negative values doubled',
      constraints: ['0 <= nums.length <= 10^4', '-10^5 <= nums[i] <= 10^5', 'The input array must not be mutated'],
      examples: [
        { input: '[1, -2, 3, 4]', output: '[2, -2, 6, 8]', explanation: '1→2, -2 is negative so it stays -2, 3→6, 4→8.' },
        { input: '[]', output: '[]', explanation: 'An empty array produces an empty array.' },
        { input: '[0, -5]', output: '[0, -5]', explanation: '0 is non-negative, so it doubles to 0; -5 stays -5.' },
      ],
      edgeCases: [
        { case: 'Empty array', expected: 'Returns []' },
        { case: 'All values negative', expected: 'Array is returned unchanged (new array, same values)' },
        { case: 'Array contains 0', expected: '0 counts as non-negative and doubles to 0' },
      ],
      functionName: 'doubleNonNegative',
      isClassBased: false,
      sampleTests: [
        { input: [[1, -2, 3, 4]], expectedOutput: [2, -2, 6, 8], description: 'mixed positive and negative values' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
        { input: [[0, -5]], expectedOutput: [0, -5], description: 'zero and a negative value' },
        { input: [[-1, -2, -3]], expectedOutput: [-1, -2, -3], description: 'all negative values are untouched' },
      ],
    },
    hints: {
      hints: [
        'A single pass with `.map()` is enough — you never need to look at more than one element at a time.',
        'Doubling only applies when the value is `>= 0`; everything else passes through unchanged.',
        '`.map()` already returns a new array, so you get the "do not mutate the input" requirement for free.',
      ],
    },
    solution: {
      algorithm:
        'Traverse the array once. For each element, if it is greater than or equal to 0, double it; otherwise keep it as-is. Collect the results into a new array so the original is never mutated.',
      dryRun:
        'nums = [1, -2, 3, 4]\ni=0: 1 >= 0 → 2\ni=1: -2 < 0 → -2\ni=2: 3 >= 0 → 6\ni=3: 4 >= 0 → 8\nresult = [2, -2, 6, 8]',
      javascriptSolution: `function doubleNonNegative(nums) {
  return nums.map((value) => (value >= 0 ? value * 2 : value));
}`,
      typescriptSolution: `function doubleNonNegative(nums: number[]): number[] {
  return nums.map((value) => (value >= 0 ? value * 2 : value));
}`,
      timeComplexity: 'O(n) — one pass over the array.',
      spaceComplexity: 'O(n) — a new output array of the same length is allocated.',
      commonMistakes: [
        'Mutating `nums` in place with a `for` loop and index assignment, which violates the "do not mutate" requirement.',
        'Treating 0 as "negative" and skipping it — 0 is non-negative and should be doubled.',
        'Using `forEach` and trying to build the result via `push` inside a closure instead of the simpler `map`.',
      ],
      followUpQuestions: [
        'How would you do this without allocating a new array, if mutation were allowed?',
        'How would the solution change if "double" needed to happen only for even non-negative numbers?',
        'How would you process this lazily for a very large array (e.g. a generator)?',
      ],
      similarQuestions: ['Move Zeroes', 'Replace Elements with Greatest Element on Right Side', 'Squares of a Sorted Array'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-2',
      questionNumber: 'DSACODE-M2-2',
      title: 'Two Sum',
      difficulty: 'Easy',
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
        'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution, and you may not use the same element twice.',
      input: 'nums: number[], target: number',
      output: 'number[] — a two-element array [i, j] with i < j such that nums[i] + nums[j] === target',
      constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i], target <= 10^9', 'Exactly one valid answer exists'],
      examples: [
        { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
        { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
        { input: 'nums = [3, 3], target = 6', output: '[0, 1]', explanation: 'Duplicate values are allowed as long as they are different indices.' },
      ],
      edgeCases: [
        { case: 'Duplicate values that sum to the target', expected: 'Returns their two distinct indices' },
        { case: 'The answer is the first two elements', expected: 'Returns [0, 1] without scanning further than necessary' },
        { case: 'Negative numbers and negative target', expected: 'Works the same as positive numbers' },
      ],
      functionName: 'twoSum',
      isClassBased: false,
      sampleTests: [
        { input: [[2, 7, 11, 15], 9], expectedOutput: [0, 1], description: 'answer at the start of the array' },
        { input: [[3, 2, 4], 6], expectedOutput: [1, 2], description: 'answer in the middle of the array' },
        { input: [[3, 3], 6], expectedOutput: [0, 1], description: 'duplicate values' },
        { input: [[-3, 4, 3, 90], 0], expectedOutput: [0, 2], description: 'negative and positive values summing to zero' },
      ],
    },
    hints: {
      hints: [
        'A brute-force nested loop works but is O(n²) — think about what you would need to remember from earlier elements to avoid rescanning.',
        'A hash map from "value seen so far" → "its index" lets you check `target - nums[i]` in O(1) at each step.',
        'Insert into the map *after* checking, so you never use the same element as both halves of the pair.',
      ],
    },
    solution: {
      algorithm:
        'Walk the array once while maintaining a hash map of value → index for everything seen so far. At each index i, compute complement = target - nums[i]. If complement is already in the map, the pair is found: [map.get(complement), i]. Otherwise store nums[i] → i and continue.',
      dryRun:
        'nums = [2, 7, 11, 15], target = 9\ni=0: complement = 9-2=7, map={} → not found, map={2:0}\ni=1: complement = 9-7=2, map={2:0} → found! return [0, 1]',
      javascriptSolution: `function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(nums[i], i);
  }

  throw new Error("No two sum solution exists for the given input");
}`,
      typescriptSolution: `function twoSum(nums: number[], target: number): [number, number] {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]!;

    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }

    seen.set(nums[i]!, i);
  }

  throw new Error("No two sum solution exists for the given input");
}`,
      timeComplexity: 'O(n) — one pass, with O(1) average-case hash map lookups.',
      spaceComplexity: 'O(n) — the hash map can hold up to n-1 entries.',
      commonMistakes: [
        'Using the brute-force O(n²) nested loop when a single hash-map pass solves it in O(n).',
        'Inserting the current value into the map before checking for its complement, which can incorrectly pair an element with itself.',
        'Returning the values instead of the indices (the problem asks for indices).',
      ],
      followUpQuestions: [
        'How would you solve this if the array were already sorted (two-pointer approach)?',
        'What would you return if there were zero or multiple valid pairs instead of exactly one?',
        'How would you extend this to "three sum" or "k sum"?',
      ],
      similarQuestions: ['3Sum', '4Sum', 'Two Sum II — Input Array Is Sorted'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-3',
      questionNumber: 'DSACODE-M2-3',
      title: 'Maximum Subarray',
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
        'Given an integer array `nums`, find the contiguous subarray (containing at least one number) that has the largest sum, and return that sum.',
      input: 'nums: number[] — a non-empty array of integers',
      output: 'number — the largest possible sum of a contiguous subarray',
      constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
      examples: [
        { input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explanation: 'The subarray [4, -1, 2, 1] has the largest sum, 6.' },
        { input: '[1]', output: '1', explanation: 'A single-element array returns that element.' },
        { input: '[5, 4, -1, 7, 8]', output: '23', explanation: 'The entire array is the best subarray.' },
      ],
      edgeCases: [
        { case: 'Single element', expected: 'Returns that element' },
        { case: 'All elements negative', expected: 'Returns the largest (least negative) single element' },
        { case: 'All elements positive', expected: 'Returns the sum of the whole array' },
      ],
      functionName: 'maxSubArray',
      isClassBased: false,
      sampleTests: [
        { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expectedOutput: 6, description: 'classic mixed-sign case' },
        { input: [[1]], expectedOutput: 1, description: 'single element' },
        { input: [[5, 4, -1, 7, 8]], expectedOutput: 23, description: 'whole array is optimal' },
        { input: [[-3, -1, -8, -2]], expectedOutput: -1, description: 'all negative values' },
      ],
    },
    hints: {
      hints: [
        "This is Kadane's algorithm: at every position, decide whether extending the previous subarray is better than starting fresh.",
        'Track two running values: the best sum ending exactly at the current index, and the best sum seen anywhere so far.',
        'If the running sum ever drops below the current element alone, it is never worth carrying forward — reset to the current element.',
      ],
    },
    solution: {
      algorithm:
        "Kadane's algorithm. Maintain `currentSum` (best sum of a subarray ending at the current index) and `bestSum` (best sum seen so far). At each element, `currentSum = max(nums[i], currentSum + nums[i])` — either extend the running subarray or start a new one at this element. Update `bestSum` after each step.",
      dryRun:
        'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\ncurrent=-2, best=-2\ni=1: current=max(1,-2+1)=1, best=1\ni=2: current=max(-3,1-3)=-2, best=1\ni=3: current=max(4,-2+4)=4, best=4\ni=4: current=max(-1,4-1)=3, best=4\ni=5: current=max(2,3+2)=5, best=5\ni=6: current=max(1,5+1)=6, best=6\ni=7: current=max(-5,6-5)=1, best=6\ni=8: current=max(4,1+4)=5, best=6\nresult = 6',
      javascriptSolution: `function maxSubArray(nums) {
  let currentSum = nums[0];
  let bestSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    bestSum = Math.max(bestSum, currentSum);
  }

  return bestSum;
}`,
      typescriptSolution: `function maxSubArray(nums: number[]): number {
  let currentSum = nums[0]!;
  let bestSum = nums[0]!;

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i]!, currentSum + nums[i]!);
    bestSum = Math.max(bestSum, currentSum);
  }

  return bestSum;
}`,
      timeComplexity: 'O(n) — a single pass through the array.',
      spaceComplexity: 'O(1) — only two running values are tracked.',
      commonMistakes: [
        'Initializing `bestSum` to 0 instead of `nums[0]`, which breaks all-negative inputs.',
        'Forgetting that the subarray must be contiguous and non-empty (an empty subarray with sum 0 is not a valid answer when all numbers are negative).',
        'Using an O(n²) or O(n³) brute-force sum-of-all-subarrays approach when Kadane\'s algorithm solves it in O(n).',
      ],
      followUpQuestions: [
        'How would you also return the start/end indices of the optimal subarray, not just its sum?',
        'How would you solve the circular version of this problem (subarray can wrap around the end)?',
        'How would you solve this with a divide-and-conquer approach instead, and what would its complexity be?',
      ],
      similarQuestions: ['Maximum Product Subarray', 'Best Time to Buy and Sell Stock', 'Maximum Sum Circular Subarray'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-4',
      questionNumber: 'DSACODE-M2-4',
      title: 'Build Prefix Sums',
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
        'Given an integer array `nums`, return an array `prefix` of the same length where `prefix[i]` is the sum of `nums[0..i]` (inclusive).',
      input: 'nums: number[]',
      output: 'number[] — the running (cumulative) sum at each index',
      constraints: ['0 <= nums.length <= 10^5', '-10^5 <= nums[i] <= 10^5'],
      examples: [
        { input: '[1, 2, 3, 4]', output: '[1, 3, 6, 10]', explanation: '1, 1+2=3, 1+2+3=6, 1+2+3+4=10.' },
        { input: '[]', output: '[]', explanation: 'Empty input produces an empty output.' },
        { input: '[5]', output: '[5]', explanation: 'A single element is its own prefix sum.' },
      ],
      edgeCases: [
        { case: 'Empty array', expected: 'Returns []' },
        { case: 'Contains negative numbers', expected: 'Running sum can decrease between indices' },
        { case: 'Single element', expected: 'Returns [nums[0]]' },
      ],
      functionName: 'buildPrefixSums',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4]], expectedOutput: [1, 3, 6, 10], description: 'ascending positive values' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
        { input: [[5]], expectedOutput: [5], description: 'single element' },
        { input: [[3, -1, 4, -2]], expectedOutput: [3, 2, 6, 4], description: 'mixed positive and negative values' },
      ],
    },
    hints: {
      hints: [
        'Keep a running total as you iterate once from left to right.',
        'The output at index i only depends on the output at index i-1 plus nums[i] — no need to re-sum from the start each time.',
        'This precomputed array is the standard trick behind O(1) range-sum queries.',
      ],
    },
    solution: {
      algorithm:
        'Iterate through the array once, maintaining a running total. At each index, add the current element to the running total and append it to the result array.',
      dryRun:
        'nums = [1, 2, 3, 4]\nrunning=0\ni=0: running=0+1=1 → [1]\ni=1: running=1+2=3 → [1,3]\ni=2: running=3+3=6 → [1,3,6]\ni=3: running=6+4=10 → [1,3,6,10]',
      javascriptSolution: `function buildPrefixSums(nums) {
  const prefix = [];
  let running = 0;

  for (const value of nums) {
    running += value;
    prefix.push(running);
  }

  return prefix;
}`,
      typescriptSolution: `function buildPrefixSums(nums: number[]): number[] {
  const prefix: number[] = [];
  let running = 0;

  for (const value of nums) {
    running += value;
    prefix.push(running);
  }

  return prefix;
}`,
      timeComplexity: 'O(n) — one pass to build the array.',
      spaceComplexity: 'O(n) — the output array is the same length as the input.',
      commonMistakes: [
        'Re-summing from index 0 for every position (O(n²)) instead of carrying a running total (O(n)).',
        'Off-by-one errors when later using the prefix array to answer range-sum queries (rangeSum(l, r) = prefix[r] - prefix[l-1], with a guard for l === 0).',
        'Not handling the empty-array input explicitly, though the loop-based version handles it naturally.',
      ],
      followUpQuestions: [
        'How would you use this array to answer "sum of nums[l..r]" queries in O(1) each?',
        'How would you support updates to individual elements efficiently (Fenwick tree / Binary Indexed Tree)?',
        'How would you extend this to a 2D prefix sum for range queries over a matrix?',
      ],
      similarQuestions: ['Range Sum Query - Immutable', 'Subarray Sum Equals K', 'Product of Array Except Self'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-5',
      questionNumber: 'DSACODE-M2-5',
      title: 'Merge Sorted Arrays',
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
        'Given two arrays `a` and `b`, each already sorted in ascending order, merge them into a single sorted array and return it. Do not mutate either input array.',
      input: 'a: number[], b: number[] — two sorted arrays',
      output: 'number[] — a single sorted array containing every element of a and b',
      constraints: ['0 <= a.length, b.length <= 10^5', 'Both a and b are sorted in ascending order'],
      examples: [
        { input: 'a = [1, 3, 5], b = [2, 4, 6]', output: '[1, 2, 3, 4, 5, 6]', explanation: 'Interleave the two sorted arrays.' },
        { input: 'a = [], b = [1, 2]', output: '[1, 2]', explanation: 'One array being empty just returns the other, still sorted.' },
        { input: 'a = [1, 1], b = [1]', output: '[1, 1, 1]', explanation: 'Duplicate values are preserved.' },
      ],
      edgeCases: [
        { case: 'One array is empty', expected: 'Returns a copy of the other array' },
        { case: 'Both arrays empty', expected: 'Returns []' },
        { case: 'Duplicate values across both arrays', expected: 'All duplicates are kept in the merged result' },
      ],
      functionName: 'mergeSortedArrays',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 3, 5], [2, 4, 6]], expectedOutput: [1, 2, 3, 4, 5, 6], description: 'interleaved values' },
        { input: [[], [1, 2]], expectedOutput: [1, 2], description: 'first array empty' },
        { input: [[1, 1], [1]], expectedOutput: [1, 1, 1], description: 'duplicate values' },
        { input: [[], []], expectedOutput: [], description: 'both arrays empty' },
      ],
    },
    hints: {
      hints: [
        'This is the "merge" step of merge sort — you never need to look back once a pointer has advanced.',
        'Keep one pointer into each array and always take the smaller of the two current elements.',
        'Once one array is exhausted, the rest of the other array can be appended directly since it is already sorted.',
      ],
    },
    solution: {
      algorithm:
        'Use two pointers, one for each array, both starting at 0. Repeatedly compare the elements at the two pointers, append the smaller one to the result, and advance that pointer. When one array is exhausted, append the remaining elements of the other array.',
      dryRun:
        'a=[1,3,5], b=[2,4,6], i=0, j=0\n1<2 → take 1, i=1\n3>2 → take 2, j=1\n3<4 → take 3, i=2\n5>4 → take 4, j=2\n5<6 → take 5, i=3 (a exhausted)\nappend remaining b: 6\nresult=[1,2,3,4,5,6]',
      javascriptSolution: `function mergeSortedArrays(a, b) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }

  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);

  return result;
}`,
      typescriptSolution: `function mergeSortedArrays(a: number[], b: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i]! <= b[j]!) {
      result.push(a[i]!);
      i++;
    } else {
      result.push(b[j]!);
      j++;
    }
  }

  while (i < a.length) result.push(a[i++]!);
  while (j < b.length) result.push(b[j++]!);

  return result;
}`,
      timeComplexity: 'O(n + m) — each pointer advances at most once per element.',
      spaceComplexity: 'O(n + m) — the merged result holds every element from both inputs.',
      commonMistakes: [
        'Concatenating the two arrays and re-sorting (O((n+m) log(n+m))) instead of merging in linear time.',
        'Forgetting the two "drain the rest" loops after one pointer reaches the end of its array.',
        'Using `<` instead of `<=` when comparing, which can silently reorder equal elements across arrays (usually harmless here, but worth being deliberate about for stability).',
      ],
      followUpQuestions: [
        'How would you merge k sorted arrays instead of just two (hint: min-heap)?',
        'How would you do this in place if `a` had enough trailing empty space to hold the merged result (LeetCode "Merge Sorted Array")?',
        'How would you merge two sorted linked lists instead of arrays?',
      ],
      similarQuestions: ['Merge Sorted Array (in-place)', 'Merge k Sorted Lists', 'Merge Two Sorted Lists'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-6',
      questionNumber: 'DSACODE-M2-6',
      title: 'Rotate Array',
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
        'Given an array `nums` and a non-negative integer `k`, rotate the array to the right by `k` steps and return the rotated array. `k` may be larger than the array length.',
      input: 'nums: number[], k: number',
      output: 'number[] — nums rotated right by k steps',
      constraints: ['0 <= nums.length <= 10^5', '0 <= k <= 10^9'],
      examples: [
        { input: 'nums = [1, 2, 3, 4, 5, 6, 7], k = 3', output: '[5, 6, 7, 1, 2, 3, 4]', explanation: 'The last 3 elements move to the front.' },
        { input: 'nums = [1, 2, 3], k = 4', output: '[3, 1, 2]', explanation: 'k=4 on a length-3 array is equivalent to k=1 (4 % 3 = 1).' },
        { input: 'nums = [], k = 5', output: '[]', explanation: 'Rotating an empty array is still empty.' },
      ],
      edgeCases: [
        { case: 'k larger than array length', expected: 'k is effectively reduced modulo nums.length' },
        { case: 'k is 0', expected: 'Returns the array unchanged' },
        { case: 'Empty array', expected: 'Returns [] regardless of k (avoid divide-by-zero on the modulo)' },
      ],
      functionName: 'rotateArray',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5, 6, 7], 3], expectedOutput: [5, 6, 7, 1, 2, 3, 4], description: 'standard rotation' },
        { input: [[1, 2, 3], 4], expectedOutput: [3, 1, 2], description: 'k larger than length' },
        { input: [[], 5], expectedOutput: [], description: 'empty array' },
        { input: [[1, 2, 3], 0], expectedOutput: [1, 2, 3], description: 'k is zero' },
      ],
    },
    hints: {
      hints: [
        'First reduce k with `k % nums.length` — rotating by the full length is a no-op, so anything beyond that just repeats.',
        'The last k elements end up at the front, and the first (length - k) elements follow after them.',
        'Guard against dividing by zero: an empty array has no valid modulo, so return it immediately.',
      ],
    },
    solution: {
      algorithm:
        'If the array is empty, return it immediately. Otherwise normalize k with `k % nums.length` since rotating by the full length is a no-op. The rotated result is the last `k` elements followed by the first `nums.length - k` elements, built with two slices.',
      dryRun:
        'nums=[1,2,3,4,5,6,7], k=3\nnormalizedK = 3 % 7 = 3\nlast 3: [5,6,7]\nfirst 4: [1,2,3,4]\nresult = [5,6,7,1,2,3,4]',
      javascriptSolution: `function rotateArray(nums, k) {
  if (nums.length === 0) return [];

  const normalizedK = k % nums.length;
  return [...nums.slice(nums.length - normalizedK), ...nums.slice(0, nums.length - normalizedK)];
}`,
      typescriptSolution: `function rotateArray(nums: number[], k: number): number[] {
  if (nums.length === 0) return [];

  const normalizedK = k % nums.length;
  return [...nums.slice(nums.length - normalizedK), ...nums.slice(0, nums.length - normalizedK)];
}`,
      timeComplexity: 'O(n) — slicing and spreading touch each element a constant number of times.',
      spaceComplexity: 'O(n) — a new array of the same length is built.',
      commonMistakes: [
        'Not reducing k modulo the array length first, which wastes work (or, in a naive rotate-one-step-k-times loop, becomes O(n·k)).',
        'Dividing/moduloing by `nums.length` without checking for an empty array first, which throws or produces NaN.',
        'Off-by-one errors in the slice boundaries, e.g. slicing `nums.length - normalizedK - 1` instead of `nums.length - normalizedK`.',
      ],
      followUpQuestions: [
        'How would you rotate the array in place using O(1) extra space (hint: the reversal algorithm)?',
        'How would you rotate left instead of right?',
        'How would this generalize to rotating a 2D matrix?',
      ],
      similarQuestions: ['Rotate List', 'Rotate Image', 'Reverse Words in a String'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-7',
      questionNumber: 'DSACODE-M2-7',
      title: 'Move Zeroes',
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
        'Given an array `nums`, move all `0`s to the end of the array while maintaining the relative order of the non-zero elements. Return the resulting array (the input must not be mutated).',
      input: 'nums: number[]',
      output: 'number[] — nums with all zeroes moved to the end, non-zero order preserved',
      constraints: ['0 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
      examples: [
        { input: '[0, 1, 0, 3, 12]', output: '[1, 3, 12, 0, 0]', explanation: 'Non-zero values keep their relative order; both zeroes move to the end.' },
        { input: '[0]', output: '[0]', explanation: 'A single zero stays a single zero.' },
        { input: '[1, 2, 3]', output: '[1, 2, 3]', explanation: 'No zeroes means nothing changes.' },
      ],
      edgeCases: [
        { case: 'Array is all zeroes', expected: 'Returned unchanged (all zeroes, already "at the end")' },
        { case: 'Array has no zeroes', expected: 'Returned unchanged' },
        { case: 'Empty array', expected: 'Returns []' },
      ],
      functionName: 'moveZeroes',
      isClassBased: false,
      sampleTests: [
        { input: [[0, 1, 0, 3, 12]], expectedOutput: [1, 3, 12, 0, 0], description: 'zeroes interspersed with values' },
        { input: [[0]], expectedOutput: [0], description: 'single zero' },
        { input: [[1, 2, 3]], expectedOutput: [1, 2, 3], description: 'no zeroes present' },
        { input: [[0, 0, 0]], expectedOutput: [0, 0, 0], description: 'all zeroes' },
      ],
    },
    hints: {
      hints: [
        'Collect the non-zero values first, in order — that gives you the front of the result for free.',
        'Count how many zeroes were skipped, and that tells you exactly how many zeroes to append at the end.',
        'You do not need to track positions manually if you build the result as two concatenated passes.',
      ],
    },
    solution: {
      algorithm:
        'Filter the array into non-zero values (preserving order), then append one zero for every element that was filtered out. This keeps relative order of non-zero elements and pushes all zeroes to the end without any manual index bookkeeping.',
      dryRun:
        'nums=[0,1,0,3,12]\nnonZero=[1,3,12]\nzeroCount = 5 - 3 = 2\nresult = [1,3,12, 0, 0]',
      javascriptSolution: `function moveZeroes(nums) {
  const nonZero = nums.filter((value) => value !== 0);
  const zeroCount = nums.length - nonZero.length;

  return [...nonZero, ...Array(zeroCount).fill(0)];
}`,
      typescriptSolution: `function moveZeroes(nums: number[]): number[] {
  const nonZero = nums.filter((value) => value !== 0);
  const zeroCount = nums.length - nonZero.length;

  return [...nonZero, ...Array(zeroCount).fill(0)];
}`,
      timeComplexity: 'O(n) — one filter pass plus building the zero-padded tail.',
      spaceComplexity: 'O(n) — a new array is produced.',
      commonMistakes: [
        'Swapping elements in place with the wrong pointer logic, which can silently reorder non-zero values.',
        'Using `.sort()` (treating 0 as "biggest") — this happens to work only because 0 sorts predictably here, but it is not the intended technique and breaks the general "stable partition" pattern.',
        'Forgetting that this must preserve relative order, not just move zeroes anywhere to the end.',
      ],
      followUpQuestions: [
        'How would you do this in place with O(1) extra space, using a two-pointer swap?',
        'How would you generalize this to "move all instances of X to the end" for an arbitrary value X?',
        'How would you minimize the total number of writes/swaps in an in-place version?',
      ],
      similarQuestions: ['Remove Element', 'Sort Colors', 'Remove Duplicates from Sorted Array'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-8',
      questionNumber: 'DSACODE-M2-8',
      title: 'Merge Overlapping Intervals',
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
        'Given an array of intervals where `intervals[i] = [start, end]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the input intervals, sorted by start.',
      input: 'intervals: number[][] — an array of [start, end] pairs',
      output: 'number[][] — the merged, non-overlapping intervals, sorted by start',
      constraints: ['0 <= intervals.length <= 10^4', 'Each interval has start <= end'],
      examples: [
        { input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: '[1,3] and [2,6] overlap and merge into [1,6].' },
        { input: '[[1,4],[4,5]]', output: '[[1,5]]', explanation: 'Intervals that touch at a boundary (4 == 4) count as overlapping and merge.' },
        { input: '[]', output: '[]', explanation: 'No intervals to merge.' },
      ],
      edgeCases: [
        { case: 'Empty input', expected: 'Returns []' },
        { case: 'No intervals overlap', expected: 'Returns the intervals sorted by start, unchanged otherwise' },
        { case: 'All intervals overlap into one', expected: 'Returns a single merged interval' },
      ],
      functionName: 'mergeIntervals',
      isClassBased: false,
      sampleTests: [
        { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expectedOutput: [[1, 6], [8, 10], [15, 18]], description: 'classic overlapping case' },
        { input: [[[1, 4], [4, 5]]], expectedOutput: [[1, 5]], description: 'touching boundaries merge' },
        { input: [[]], expectedOutput: [], description: 'empty input' },
        { input: [[[1, 2], [3, 4]]], expectedOutput: [[1, 2], [3, 4]], description: 'non-overlapping intervals stay separate' },
      ],
    },
    hints: {
      hints: [
        'Sort the intervals by start first — once sorted, only adjacent intervals can possibly overlap.',
        'Walk through the sorted intervals, keeping a "current merged interval". If the next interval starts before (or at) the current one\'s end, extend the current end; otherwise close it out and start a new one.',
        'Two intervals [a,b] and [c,d] (sorted, so a <= c) overlap or touch exactly when c <= b.',
      ],
    },
    solution: {
      algorithm:
        'Sort intervals by start. Initialize the result with the first interval. For each subsequent interval, compare its start to the end of the last interval in the result: if it starts at or before that end, merge by extending the end to the max of the two ends; otherwise push it as a new, separate interval.',
      dryRun:
        'sorted=[[1,3],[2,6],[8,10],[15,18]]\nresult=[[1,3]]\n[2,6]: 2<=3 → merge → result=[[1,6]]\n[8,10]: 8>6 → new → result=[[1,6],[8,10]]\n[15,18]: 15>10 → new → result=[[1,6],[8,10],[15,18]]',
      javascriptSolution: `function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = merged[merged.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}`,
      typescriptSolution: `function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a[0]! - b[0]!);
  const merged: number[][] = [sorted[0]!];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i]!;
    const last = merged[merged.length - 1]!;

    if (start! <= last[1]!) {
      last[1] = Math.max(last[1]!, end!);
    } else {
      merged.push([start!, end!]);
    }
  }

  return merged;
}`,
      timeComplexity: 'O(n log n) — dominated by the initial sort; the merge pass itself is O(n).',
      spaceComplexity: 'O(n) — for the sorted copy and the merged result.',
      commonMistakes: [
        'Forgetting to sort first — merging only works correctly on intervals ordered by start.',
        'Using `<` instead of `<=` when comparing `start` to the last merged end, which fails to merge touching intervals like [1,4] and [4,5].',
        'Mutating the input `intervals` array directly instead of sorting a copy.',
      ],
      followUpQuestions: [
        'How would you insert a new interval into an already-merged, sorted list efficiently?',
        'How would you find the minimum number of intervals to remove to make the rest non-overlapping?',
        'How would you handle streaming intervals that arrive one at a time rather than all at once?',
      ],
      similarQuestions: ['Insert Interval', 'Non-overlapping Intervals', 'Meeting Rooms II'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-9',
      questionNumber: 'DSACODE-M2-9',
      title: 'Spiral Matrix Traversal',
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
        'Given an `m x n` matrix, return all elements of the matrix in spiral order (right across the top, down the right side, left across the bottom, up the left side, repeating inward).',
      input: 'matrix: number[][] — an m x n matrix (may be empty)',
      output: 'number[] — the elements of matrix in spiral order',
      constraints: ['0 <= m, n <= 10', '-100 <= matrix[i][j] <= 100'],
      examples: [
        { input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]', explanation: 'Right across the top, down the right column, left across the bottom, up the left column, then the center.' },
        { input: '[[1,2],[3,4]]', output: '[1,2,4,3]', explanation: 'A 2x2 matrix spirals around its single ring.' },
        { input: '[]', output: '[]', explanation: 'An empty matrix has no elements to traverse.' },
      ],
      edgeCases: [
        { case: 'Empty matrix', expected: 'Returns []' },
        { case: 'Single row', expected: 'Returns the row left-to-right' },
        { case: 'Single column', expected: 'Returns the column top-to-bottom' },
      ],
      functionName: 'spiralOrder',
      isClassBased: false,
      sampleTests: [
        { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expectedOutput: [1, 2, 3, 6, 9, 8, 7, 4, 5], description: '3x3 matrix' },
        { input: [[[1, 2], [3, 4]]], expectedOutput: [1, 2, 4, 3], description: '2x2 matrix' },
        { input: [[]], expectedOutput: [], description: 'empty matrix' },
        { input: [[[1, 2, 3, 4]]], expectedOutput: [1, 2, 3, 4], description: 'single row' },
      ],
    },
    hints: {
      hints: [
        'Track four boundaries: top, bottom, left, right rows/columns still unvisited.',
        'Traverse the top row left→right, the right column top→bottom, the bottom row right→left, and the left column bottom→top, then shrink all four boundaries inward by one.',
        'After finishing each of the four sides, re-check that the boundaries have not crossed before continuing — this correctly handles non-square and odd-sized matrices.',
      ],
    },
    solution: {
      algorithm:
        'Maintain four boundary pointers: top, bottom, left, right. Repeatedly traverse the top row (left to right), then the right column (top to bottom), then, if top <= bottom, the bottom row (right to left), then, if left <= right, the left column (bottom to top). After each side, move the corresponding boundary inward. Stop once top > bottom or left > right.',
      dryRun:
        'matrix=[[1,2,3],[4,5,6],[7,8,9]], top=0,bottom=2,left=0,right=2\ntop row: 1,2,3 → top=1\nright col: 6,9 → right=1\nbottom row (top<=bottom): 8,7 → bottom=1\nleft col (left<=right): 4 → left=1\ntop row (top<=bottom, left<=right): 5 → top=2, loop ends (top>bottom)\nresult=[1,2,3,6,9,8,7,4,5]',
      javascriptSolution: `function spiralOrder(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) return [];

  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col++) result.push(matrix[top][col]);
    top++;

    for (let row = top; row <= bottom; row++) result.push(matrix[row][right]);
    right--;

    if (top <= bottom) {
      for (let col = right; col >= left; col--) result.push(matrix[bottom][col]);
      bottom--;
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row--) result.push(matrix[row][left]);
      left++;
    }
  }

  return result;
}`,
      typescriptSolution: `function spiralOrder(matrix: number[][]): number[] {
  if (matrix.length === 0 || matrix[0]!.length === 0) return [];

  const result: number[] = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0]!.length - 1;

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col++) result.push(matrix[top]![col]!);
    top++;

    for (let row = top; row <= bottom; row++) result.push(matrix[row]![right]!);
    right--;

    if (top <= bottom) {
      for (let col = right; col >= left; col--) result.push(matrix[bottom]![col]!);
      bottom--;
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row--) result.push(matrix[row]![left]!);
      left++;
    }
  }

  return result;
}`,
      timeComplexity: 'O(m × n) — every element is visited exactly once.',
      spaceComplexity: 'O(m × n) for the output array (O(1) extra space beyond it).',
      commonMistakes: [
        'Omitting the `top <= bottom` / `left <= right` re-checks before the third and fourth sides, which double-counts elements on single-row or single-column matrices.',
        'Not handling an empty matrix or an empty first row, which throws when reading `matrix[0].length`.',
        'Off-by-one errors in the boundary increments/decrements, causing skipped or repeated elements.',
      ],
      followUpQuestions: [
        'How would you generate a spiral matrix (the inverse problem) given n?',
        'How would you traverse in spiral order starting from the center outward instead?',
        'How would this change for a non-rectangular (jagged) 2D array?',
      ],
      similarQuestions: ['Spiral Matrix II', 'Rotate Image', 'Diagonal Traverse'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-10',
      questionNumber: 'DSACODE-M2-10',
      title: 'Array Performance — Remove First Without shift()',
      difficulty: 'Easy',
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
        'Implement a function that returns a new array equal to `nums` with its first element removed, without using `Array.prototype.shift()`. This illustrates that removing the first element of a JS array is inherently O(n) — every remaining element must move down one index — regardless of which API is used to do it.',
      input: 'nums: number[]',
      output: 'number[] — a new array containing every element of nums except the first',
      constraints: ['0 <= nums.length <= 10^5', 'The input array must not be mutated'],
      examples: [
        { input: '[1, 2, 3, 4]', output: '[2, 3, 4]', explanation: 'The first element (1) is dropped.' },
        { input: '[]', output: '[]', explanation: 'An empty array has no first element to remove; returns [].' },
        { input: '[42]', output: '[]', explanation: 'Removing the only element leaves an empty array.' },
      ],
      edgeCases: [
        { case: 'Empty array', expected: 'Returns [] rather than throwing' },
        { case: 'Single-element array', expected: 'Returns []' },
        { case: 'Large array', expected: 'Still O(n): the point is that there is no faster way to drop the first element of an array' },
      ],
      functionName: 'removeFirstWithoutShift',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4]], expectedOutput: [2, 3, 4], description: 'typical case' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
        { input: [[42]], expectedOutput: [], description: 'single element' },
      ],
    },
    hints: {
      hints: [
        '`Array.prototype.slice(1)` returns everything from index 1 onward without mutating the original.',
        'Guard the empty-array case explicitly so `slice(1)` on `[]` (which already safely returns `[]`) is not relied on silently — make the intent visible.',
        'The point of this exercise is complexity, not cleverness: `slice()` is also O(n) — there is no O(1) way to drop the first element of a plain array, because every remaining element\'s index must shift down by one.',
      ],
    },
    solution: {
      algorithm:
        'Return `nums.slice(1)`, which creates a new array containing all elements from index 1 to the end. This avoids `shift()` (which mutates in place) while making the same O(n) cost explicit and visible in the code, rather than hidden inside a mutating call.',
      dryRun: 'nums=[1,2,3,4]\nnums.slice(1) copies indices 1..3 into a new array\nresult=[2,3,4]',
      javascriptSolution: `function removeFirstWithoutShift(nums) {
  return nums.slice(1);
}`,
      typescriptSolution: `function removeFirstWithoutShift(nums: number[]): number[] {
  return nums.slice(1);
}`,
      timeComplexity: 'O(n) — every remaining element must be copied to its new index; there is no faster way to drop the first element of an array.',
      spaceComplexity: 'O(n) — a new array is allocated for the result.',
      commonMistakes: [
        'Assuming `shift()` is "slow" and `slice(1)` is "fast" — both are O(n); the real lesson is that removing from the front of an array is always O(n), regardless of API.',
        'Calling `shift()` repeatedly inside a loop to drain a large array one element at a time, turning an O(n) task into O(n²).',
        'Reaching for a linked list or deque only when it is actually needed — for most UI-sized arrays, O(n) removal is fine, and premature optimization adds complexity for no measurable benefit.',
      ],
      followUpQuestions: [
        'When would switching to a different data structure (e.g. a deque, or reversing the array and popping) actually matter for performance?',
        'How does `Array.prototype.shift()` differ from `.slice(1)` in terms of mutation, and when does that distinction matter in React state updates?',
        'How would you benchmark and confirm that both approaches are O(n) in a real JS engine?',
      ],
      similarQuestions: ['Design a Circular Queue', 'Implement Queue using Stacks', 'Design Front Middle Back Queue'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-11',
      questionNumber: 'DSACODE-M2-11',
      title: 'Set Matrix Zeroes',
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
        'Given an `m x n` matrix, if an element is 0, set its entire row and column to 0. Do this in place, without using extra space for another full matrix.',
      input: 'matrix: number[][] — an m x n matrix, modified in place',
      output: 'number[][] — the same matrix reference, with the zero-rows/columns applied',
      constraints: ['1 <= m, n <= 200', '-2^31 <= matrix[i][j] <= 2^31 - 1'],
      examples: [
        { input: '[[1,2,3],[4,0,6],[7,8,9]]', output: '[[1,0,3],[0,0,0],[7,0,9]]', explanation: 'The 0 at (1,1) zeroes out row 1 and column 1.' },
        { input: '[[1]]', output: '[[1]]', explanation: 'No zero present, matrix is unchanged.' },
      ],
      edgeCases: [
        { case: 'Zero in the first row or first column', expected: 'Handled via the col0 flag / matrix[0][0] check rather than being lost' },
        { case: 'Entire matrix is zero', expected: 'Stays all zero' },
        { case: 'Single-cell matrix', expected: 'Returned unchanged unless that cell is 0' },
      ],
      functionName: 'setMatrixZeroes',
      isClassBased: false,
      sampleTests: [
        { input: [[[1, 2, 3], [4, 0, 6], [7, 8, 9]]], expectedOutput: [[1, 0, 3], [0, 0, 0], [7, 0, 9]], description: 'single zero in the interior' },
        { input: [[[1]]], expectedOutput: [[1]], description: 'no zero present' },
        { input: [[[0, 1], [1, 1]]], expectedOutput: [[0, 0], [0, 1]], description: 'zero in the top-left corner' },
      ],
    },
    hints: {
      hints: [
        "Marking a full extra m×n \"seen\" matrix works but uses O(m·n) space — can the first row and first column of the matrix itself store that information?",
        'Use `matrix[row][0]` and `matrix[0][col]` as markers for "this row/column must become zero", but track whether the first column itself needs zeroing separately, since `matrix[0][0]` is shared between the first row and first column markers.',
        'Process the marker phase first (scanning the whole matrix), then a second pass applies the zeroes using those markers — do the first row/column last so you don\'t destroy the markers before reading them.',
      ],
    },
    solution: {
      algorithm:
        "Use row 0 and column 0 of the matrix itself as marker space. First pass: for every zero at (row, col), set matrix[row][0] = 0 and matrix[0][col] = 0 (using a separate col0 flag when col === 0, since matrix[0][0] is shared). Second pass (from row 1, col 1): zero out any cell whose row-marker or column-marker is 0. Finally, zero row 0 if matrix[0][0] is 0, and zero column 0 if the col0 flag is set.",
      dryRun:
        'matrix=[[1,2,3],[4,0,6],[7,8,9]]\nmark phase: cell (1,1)=0 → matrix[1][0]=0, matrix[0][1]=0\nmatrix is now [[1,0,3],[0,0,6],[7,8,9]]\napply phase (row>=1,col>=1): (1,2): row-marker matrix[1][0]=0 → zero it; (2,1): col-marker matrix[0][1]=0 → zero it\nresult=[[1,0,3],[0,0,0],[7,0,9]]',
      javascriptSolution: `function setMatrixZeroes(matrix) {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  let col0 = 1;

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = 0;
        if (col === 0) col0 = 0;
        else matrix[0][col] = 0;
      }
    }
  }

  for (let row = 1; row < rowLen; row++) {
    for (let col = 1; col < colLen; col++) {
      if (matrix[row][col] !== 0) {
        if (matrix[0][col] === 0 || matrix[row][0] === 0) matrix[row][col] = 0;
      }
    }
  }

  if (matrix[0][0] === 0) {
    for (let col = 0; col < colLen; col++) matrix[0][col] = 0;
  }
  if (col0 === 0) {
    for (let row = 0; row < rowLen; row++) matrix[row][0] = 0;
  }

  return matrix;
}`,
      typescriptSolution: `function setMatrixZeroes(matrix: number[][]): number[][] {
  const rowLen = matrix.length;
  const colLen = matrix[0]!.length;
  let col0 = 1;

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (matrix[row]![col] === 0) {
        matrix[row]![0] = 0;
        if (col === 0) col0 = 0;
        else matrix[0]![col] = 0;
      }
    }
  }

  for (let row = 1; row < rowLen; row++) {
    for (let col = 1; col < colLen; col++) {
      if (matrix[row]![col] !== 0) {
        if (matrix[0]![col] === 0 || matrix[row]![0] === 0) matrix[row]![col] = 0;
      }
    }
  }

  if (matrix[0]![0] === 0) {
    for (let col = 0; col < colLen; col++) matrix[0]![col] = 0;
  }
  if (col0 === 0) {
    for (let row = 0; row < rowLen; row++) matrix[row]![0] = 0;
  }

  return matrix;
}`,
      timeComplexity: 'O(m × n) — two passes over the matrix.',
      spaceComplexity: 'O(1) extra space — the matrix itself stores the markers, aside from the single col0 flag.',
      commonMistakes: [
        'Zeroing cells during the first pass instead of only marking, which corrupts the data needed to decide later rows/columns.',
        "Forgetting the separate col0 flag and letting matrix[0][0] ambiguously represent both \"zero column 0\" and \"zero row 0\".",
        'Applying the first row/column zeroing before the interior second pass, which destroys the markers before they are read.',
      ],
      followUpQuestions: [
        'How would you solve this using O(m + n) space instead, with two boolean arrays, before optimizing to O(1)?',
        'How would this change if the matrix were extremely large and stored on disk (streaming, unable to fit in memory)?',
        'How would you detect and short-circuit if the matrix is already all zero?',
      ],
      similarQuestions: ['Game of Life', 'Rotate Image', 'Spiral Matrix'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-12',
      questionNumber: 'DSACODE-M2-12',
      title: "Pascal's Triangle",
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
        "Given an integer `numRows`, return the first `numRows` rows of Pascal's triangle, where each number is the sum of the two numbers directly above it.",
      input: 'numRows: number — a positive integer',
      output: "number[][] — numRows rows of Pascal's triangle",
      constraints: ['1 <= numRows <= 30'],
      examples: [
        { input: '5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]', explanation: 'Each interior value is the sum of the two values above it in the previous row.' },
        { input: '1', output: '[[1]]', explanation: 'A single row containing just 1.' },
      ],
      edgeCases: [
        { case: 'numRows = 1', expected: 'Returns [[1]]' },
        { case: 'numRows = 2', expected: 'Returns [[1],[1,1]]' },
      ],
      functionName: 'generatePascalTriangle',
      isClassBased: false,
      sampleTests: [
        { input: [5], expectedOutput: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]], description: 'five rows' },
        { input: [1], expectedOutput: [[1]], description: 'single row' },
        { input: [3], expectedOutput: [[1], [1, 1], [1, 2, 1]], description: 'three rows' },
      ],
    },
    hints: {
      hints: [
        'Row `n` (0-indexed) has `n + 1` binomial coefficients: C(n, 0), C(n, 1), ..., C(n, n).',
        'Each coefficient can be derived from the previous one without recomputing a full factorial: C(n, r+1) = C(n, r) * (n - r) / (r + 1).',
        'Build each row independently using that running-product formula, rather than deriving it from the previous row\'s array.',
      ],
    },
    solution: {
      algorithm:
        'For each row index n from 0 to numRows - 1, generate the row directly using the running binomial-coefficient formula: starting from 1, repeatedly multiply by (n - r) and divide by (r + 1) for r = 0..n-1, appending each result.',
      dryRun:
        'n=4 (5th row): ans=1, row=[1]\nr=0: ans=1*4/1=4 → [1,4]\nr=1: ans=4*3/2=6 → [1,4,6]\nr=2: ans=6*2/3=4 → [1,4,6,4]\nr=3: ans=4*1/4=1 → [1,4,6,4,1]',
      javascriptSolution: `function generateRow(n) {
  let ans = 1;
  const row = [1];

  for (let r = 0; r < n; r++) {
    ans = (ans * (n - r)) / (r + 1);
    row.push(ans);
  }

  return row;
}

function generatePascalTriangle(numRows) {
  const result = [];

  for (let i = 0; i < numRows; i++) {
    result.push(generateRow(i));
  }

  return result;
}`,
      typescriptSolution: `function generateRow(n: number): number[] {
  let ans = 1;
  const row: number[] = [1];

  for (let r = 0; r < n; r++) {
    ans = (ans * (n - r)) / (r + 1);
    row.push(ans);
  }

  return row;
}

function generatePascalTriangle(numRows: number): number[][] {
  const result: number[][] = [];

  for (let i = 0; i < numRows; i++) {
    result.push(generateRow(i));
  }

  return result;
}`,
      timeComplexity: 'O(numRows²) — each of numRows rows takes time proportional to its own length.',
      spaceComplexity: 'O(numRows²) for the output (unavoidable, since that is the size of the result).',
      commonMistakes: [
        'Recomputing full factorials for each coefficient instead of the cheaper running-product recurrence.',
        'Off-by-one errors in the loop bound, producing a row with the wrong number of elements.',
        'Assuming floating-point division introduces rounding errors here — for the small numRows in this problem, the running product stays exact in practice, but a hardened implementation would use `Math.round` defensively.',
      ],
      followUpQuestions: [
        "How would you return only a single row of Pascal's triangle (LeetCode's Pascal's Triangle II) using O(numRows) space?",
        'How would you compute a single coefficient C(n, k) directly without generating the whole row?',
        'How would large numRows cause precision issues, and how would you guard against them?',
      ],
      similarQuestions: ["Pascal's Triangle II", 'Unique Paths', 'Combinations'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-13',
      questionNumber: 'DSACODE-M2-13',
      title: 'Next Permutation',
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
        'Given an array of integers `nums`, rearrange it in place into the lexicographically next greater permutation. If no such permutation exists (the array is in descending order), rearrange it into the lowest possible order (ascending). Return the mutated array.',
      input: 'nums: number[]',
      output: 'number[] — the same array reference, rearranged into the next permutation',
      constraints: ['1 <= nums.length <= 100'],
      examples: [
        { input: '[1, 2, 3]', output: '[1, 3, 2]', explanation: 'The next lexicographic permutation after [1,2,3].' },
        { input: '[3, 2, 1]', output: '[1, 2, 3]', explanation: 'Already the largest permutation, so it wraps to the smallest.' },
        { input: '[1, 1, 5]', output: '[1, 5, 1]', explanation: 'Duplicate values are handled the same way as distinct ones.' },
      ],
      edgeCases: [
        { case: 'Fully descending array', expected: 'Wraps around to the fully ascending array' },
        { case: 'Single-element array', expected: 'Returned unchanged (no next permutation possible)' },
        { case: 'Array with duplicate values', expected: 'Still produces the correct next permutation' },
      ],
      functionName: 'nextPermutation',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3]], expectedOutput: [1, 3, 2], description: 'simple ascending input' },
        { input: [[3, 2, 1]], expectedOutput: [1, 2, 3], description: 'fully descending, wraps around' },
        { input: [[1, 1, 5]], expectedOutput: [1, 5, 1], description: 'duplicate values' },
        { input: [[1]], expectedOutput: [1], description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'Scan from the right to find the first index where `nums[i] < nums[i + 1]` — this is the last position that can still be increased ("the dip").',
        'If no such index exists, the array is fully descending; reverse it to get the smallest permutation.',
        'Otherwise, scan from the right again for the smallest value greater than `nums[dip]`, swap them, then reverse everything after the dip (the suffix is descending, so reversing makes it the smallest possible arrangement).',
      ],
    },
    solution: {
      algorithm:
        "Find the rightmost index `dip` where nums[dip] < nums[dip + 1] (the first place, scanning from the end, that can be increased). If none exists, the whole array is descending — reverse it and return. Otherwise, scan from the end again for the first value greater than nums[dip], swap it with nums[dip], then reverse the suffix after `dip` (which is guaranteed descending) to make it ascending — the smallest possible arrangement for that suffix.",
      dryRun:
        'nums=[1,2,3]\ndip search: right=1: nums[1]=2<nums[2]=3 → dip=1\nswap search: right=2: nums[2]=3>nums[1]=2 → swap → [1,3,2]\nreverse suffix after dip (just index 2, nothing to reverse)\nresult=[1,3,2]',
      javascriptSolution: `function nextPermutation(nums) {
  const n = nums.length - 1;
  let dipIndex = -1;

  for (let right = n - 1; right >= 0; right--) {
    if (nums[right] < nums[right + 1]) {
      dipIndex = right;
      break;
    }
  }

  if (dipIndex === -1) {
    nums.reverse();
    return nums;
  }

  for (let right = n; right >= 0; right--) {
    if (nums[right] > nums[dipIndex]) {
      [nums[right], nums[dipIndex]] = [nums[dipIndex], nums[right]];
      break;
    }
  }

  let left = dipIndex + 1;
  let right = n;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }

  return nums;
}`,
      typescriptSolution: `function nextPermutation(nums: number[]): number[] {
  const n = nums.length - 1;
  let dipIndex = -1;

  for (let right = n - 1; right >= 0; right--) {
    if (nums[right]! < nums[right + 1]!) {
      dipIndex = right;
      break;
    }
  }

  if (dipIndex === -1) {
    nums.reverse();
    return nums;
  }

  for (let right = n; right >= 0; right--) {
    if (nums[right]! > nums[dipIndex]!) {
      [nums[right], nums[dipIndex]] = [nums[dipIndex]!, nums[right]!];
      break;
    }
  }

  let left = dipIndex + 1;
  let right = n;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right]!, nums[left]!];
    left++;
    right--;
  }

  return nums;
}`,
      timeComplexity: 'O(n) — each of the three scans (find dip, find swap target, reverse suffix) is linear.',
      spaceComplexity: 'O(1) — rearranged in place.',
      commonMistakes: [
        'Forgetting that the suffix after the swap is always descending, and trying to sort it instead of just reversing it (reversing is O(n), sorting is unnecessarily O(n log n)).',
        'Using strict `<` vs `<=` incorrectly when scanning for the swap target, which can pick the wrong element when duplicates are present.',
        'Not handling the fully-descending case (no dip found) as a special "wrap to smallest" case.',
      ],
      followUpQuestions: [
        'How would you implement the "previous permutation" (lexicographically smaller) using the mirrored technique?',
        'How would you find the permutation k steps ahead without repeatedly calling nextPermutation k times?',
        'What is the total number of distinct permutations, and how does that bound the algorithm\'s usefulness for very large k?',
      ],
      similarQuestions: ['Permutations', 'Permutations II', 'Permutation Sequence'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-14',
      questionNumber: 'DSACODE-M2-14',
      title: 'Sort Colors (Dutch National Flag)',
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
        'Given an array `nums` containing only the values 0, 1, and 2, sort it in place in a single pass, without using a library sort function. Return the mutated array.',
      input: 'nums: number[] — values are only 0, 1, or 2',
      output: 'number[] — the same array, sorted in place',
      constraints: ['1 <= nums.length <= 300', 'nums[i] is 0, 1, or 2'],
      examples: [
        { input: '[2, 0, 2, 1, 1, 0]', output: '[0, 0, 1, 1, 2, 2]', explanation: 'All 0s first, then 1s, then 2s.' },
        { input: '[2, 0, 1]', output: '[0, 1, 2]', explanation: 'One of each value.' },
      ],
      edgeCases: [
        { case: 'Already sorted', expected: 'Unchanged' },
        { case: 'All same value', expected: 'Unchanged' },
        { case: 'Single element', expected: 'Unchanged' },
      ],
      functionName: 'sortColors',
      isClassBased: false,
      sampleTests: [
        { input: [[2, 0, 2, 1, 1, 0]], expectedOutput: [0, 0, 1, 1, 2, 2], description: 'mixed values' },
        { input: [[2, 0, 1]], expectedOutput: [0, 1, 2], description: 'one of each' },
        { input: [[0, 0, 0]], expectedOutput: [0, 0, 0], description: 'all same value' },
        { input: [[1]], expectedOutput: [1], description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'This is the Dutch National Flag problem — three-way partitioning in one pass.',
        'Maintain three pointers: `start` (boundary for the next 0), `mid` (current element being examined), and `end` (boundary for the next 2).',
        'When `nums[mid]` is 0, swap it to `start` and advance both; when it is 2, swap it to `end` and only shrink `end` (re-examine the swapped-in value); when it is 1, just advance `mid`.',
      ],
    },
    solution: {
      algorithm:
        "Three pointers: start and mid both begin at 0, end begins at the last index. While mid <= end: if nums[mid] is 0, swap with nums[start], advance start and mid. If nums[mid] is 2, swap with nums[end] and decrement end (don't advance mid, since the swapped-in value from the end still needs to be classified). If nums[mid] is 1, just advance mid.",
      dryRun:
        'nums=[2,0,2,1,1,0], start=0,mid=0,end=5\nmid=0 (val 2): swap(0,5)→[0,0,2,1,1,2], end=4\nmid=0 (val 0): swap(0,0), start=1, mid=1\nmid=1 (val 0): swap(1,1), start=2, mid=2\nmid=2 (val 2): swap(2,4)→[0,0,1,1,2,2], end=3\nmid=2 (val 1): mid=3\nmid=3 (val 1): mid=4 > end=3, loop ends\nresult=[0,0,1,1,2,2]',
      javascriptSolution: `function sortColors(nums) {
  let start = 0;
  let mid = 0;
  let end = nums.length - 1;

  while (mid <= end) {
    if (nums[mid] === 0) {
      [nums[mid], nums[start]] = [nums[start], nums[mid]];
      start++;
      mid++;
    } else if (nums[mid] === 2) {
      [nums[mid], nums[end]] = [nums[end], nums[mid]];
      end--;
    } else {
      mid++;
    }
  }

  return nums;
}`,
      typescriptSolution: `function sortColors(nums: number[]): number[] {
  let start = 0;
  let mid = 0;
  let end = nums.length - 1;

  while (mid <= end) {
    if (nums[mid] === 0) {
      [nums[mid], nums[start]] = [nums[start]!, nums[mid]!];
      start++;
      mid++;
    } else if (nums[mid] === 2) {
      [nums[mid], nums[end]] = [nums[end]!, nums[mid]!];
      end--;
    } else {
      mid++;
    }
  }

  return nums;
}`,
      timeComplexity: 'O(n) — a single pass; each element is examined and moved at most a constant number of times.',
      spaceComplexity: 'O(1) — sorted in place.',
      commonMistakes: [
        'Advancing `mid` after swapping with `end`, which skips examining the newly swapped-in value.',
        'Using a generic sort (`nums.sort()`), which works but defeats the point of the single-pass, counting-free technique being tested.',
        'Confusing the three-pointer roles and swapping start/end incorrectly, producing a wrong or partially-sorted result.',
      ],
      followUpQuestions: [
        'How would you generalize this to k distinct values instead of exactly 3 (counting sort)?',
        'How is this related to the quicksort three-way (Dutch flag) partitioning scheme?',
        'How would you sort colors given as strings ("red"/"white"/"blue") instead of 0/1/2?',
      ],
      similarQuestions: ['Move Zeroes', 'Wiggle Sort', 'Kth Largest Element in an Array'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-15',
      questionNumber: 'DSACODE-M2-15',
      title: 'Second Largest Element in an Array',
      difficulty: 'Easy',
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
        'Given an array of numbers, return the second-largest distinct value in the array in a single pass, without sorting.',
      input: 'arr: number[] — an array with at least two distinct values',
      output: 'number — the second-largest distinct value',
      constraints: ['2 <= arr.length <= 10^5', 'The array contains at least two distinct values'],
      examples: [
        { input: '[12, 34, 34, 23, 232, -10, -38, 45, 230]', output: '230', explanation: '232 is the largest, 230 is the second-largest.' },
        { input: '[5, 1]', output: '1', explanation: 'Only two elements; 1 is the second-largest.' },
      ],
      edgeCases: [
        { case: 'Duplicate largest value with no distinct second value', expected: 'Returns -Infinity — documented limitation of the single-pass distinct-value approach' },
        { case: 'Negative numbers', expected: 'Works the same as positive numbers' },
        { case: 'Second-largest at the very start or end', expected: 'Still found correctly, order does not matter' },
      ],
      functionName: 'getSecondLargest',
      isClassBased: false,
      sampleTests: [
        { input: [[12, 34, 34, 23, 232, -10, -38, 45, 230]], expectedOutput: 230, description: 'classic mixed case with a duplicate largest' },
        { input: [[5, 1]], expectedOutput: 1, description: 'two elements' },
        { input: [[-5, -1, -10]], expectedOutput: -5, description: 'all negative values' },
      ],
    },
    hints: {
      hints: [
        'Track two running values, `firstLargest` and `secondLargest`, both starting at negative infinity.',
        'When the current element beats `firstLargest`, the *old* `firstLargest` becomes the new `secondLargest` before updating `firstLargest`.',
        'When the current element is between the two (greater than `secondLargest` but not equal to `firstLargest`), update only `secondLargest` — this "not equal" check is what makes it track the second *distinct* value rather than just the second position.',
      ],
    },
    solution: {
      algorithm:
        'Single pass tracking firstLargest and secondLargest (both starting at -Infinity). For each element: if it exceeds firstLargest, shift the old firstLargest down into secondLargest, then update firstLargest. Otherwise, if it exceeds secondLargest and is not equal to firstLargest, update secondLargest directly.',
      dryRun:
        'arr=[12,34,34,23,232,-10,-38,45,230]\n12: first=12\n34: 34>12 → second=12, first=34\n34: 34>34? no; 34>second(12) but 34==first → skip\n23: 23>34? no; 23>12 && 23!=34 → second=23\n232: 232>34 → second=34, first=232\n45: 45>232? no; 45>34 && 45!=232 → second=45\n230: 230>232? no; 230>45 && 230!=232 → second=230\nresult=230',
      javascriptSolution: `function getSecondLargest(arr) {
  let firstLargest = -Infinity;
  let secondLargest = -Infinity;

  for (const value of arr) {
    if (value > firstLargest) {
      secondLargest = firstLargest;
      firstLargest = value;
    } else if (value > secondLargest && value !== firstLargest) {
      secondLargest = value;
    }
  }

  return secondLargest;
}`,
      typescriptSolution: `function getSecondLargest(arr: number[]): number {
  let firstLargest = -Infinity;
  let secondLargest = -Infinity;

  for (const value of arr) {
    if (value > firstLargest) {
      secondLargest = firstLargest;
      firstLargest = value;
    } else if (value > secondLargest && value !== firstLargest) {
      secondLargest = value;
    }
  }

  return secondLargest;
}`,
      timeComplexity: 'O(n) — a single pass.',
      spaceComplexity: 'O(1) — two running values.',
      commonMistakes: [
        'Sorting the array first — correct, but unnecessarily O(n log n) when a single O(n) pass suffices.',
        'Forgetting the `value !== firstLargest` check, which would let a duplicate of the largest value incorrectly become the "second largest".',
        'Not handling the case where no second distinct value exists (this implementation returns -Infinity; a production version might throw or return null instead).',
      ],
      followUpQuestions: [
        'How would you find the Kth largest distinct value using a similar single-pass idea (or a heap)?',
        'How should the function signal "no second-largest exists" more explicitly than returning -Infinity?',
        'How would you handle streaming input where you cannot store the whole array?',
      ],
      similarQuestions: ['Kth Largest Element in an Array', 'Third Maximum Number', 'Two Sum'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-16',
      questionNumber: 'DSACODE-M2-16',
      title: 'Sort an Array of 0s and 1s',
      difficulty: 'Easy',
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
        'Given an array containing only 0s and 1s, sort it in place in a single pass so all 0s come before all 1s. Return the mutated array.',
      input: 'arr: number[] — values are only 0 or 1',
      output: 'number[] — the same array, sorted with all 0s first',
      constraints: ['0 <= arr.length <= 10^5', 'arr[i] is 0 or 1'],
      examples: [
        { input: '[0, 1, 1, 0, 0, 1, 1, 0]', output: '[0, 0, 0, 0, 1, 1, 1, 1]', explanation: 'All four 0s move to the front.' },
        { input: '[]', output: '[]', explanation: 'Empty array stays empty.' },
      ],
      edgeCases: [
        { case: 'Empty array', expected: 'Returns []' },
        { case: 'All zeroes or all ones', expected: 'Returned unchanged' },
        { case: 'Already sorted', expected: 'Unchanged' },
      ],
      functionName: 'sortZerosAndOnes',
      isClassBased: false,
      sampleTests: [
        { input: [[0, 1, 1, 0, 0, 1, 1, 0]], expectedOutput: [0, 0, 0, 0, 1, 1, 1, 1], description: 'mixed 0s and 1s' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
        { input: [[1, 1, 1]], expectedOutput: [1, 1, 1], description: 'all ones' },
        { input: [[0, 0]], expectedOutput: [0, 0], description: 'all zeroes' },
      ],
    },
    hints: {
      hints: [
        'This is a simplified, two-value version of the Dutch National Flag partitioning used in Sort Colors.',
        'Track a single `left` boundary marking where the next 0 should go.',
        'Walk through the array once: whenever a 0 is found, swap it into position `left` and advance `left`.',
      ],
    },
    solution: {
      algorithm:
        'Single pass with one pointer, `left`, marking the boundary for the next 0. For each index i, if arr[i] is 0, swap it with arr[left] and advance left. By the end, every 0 has been moved before index left, with the relative simplicity possible because there are only two distinct values.',
      dryRun:
        'arr=[0,1,1,0,0,1,1,0], left=0\ni=0 (0): swap(0,0), left=1\ni=1 (1): skip\ni=2 (1): skip\ni=3 (0): swap(3,1)→[0,0,1,1,0,1,1,0], left=2\ni=4 (0): swap(4,2)→[0,0,0,1,1,1,1,0], left=3\ni=5 (1): skip\ni=6 (1): skip\ni=7 (0): swap(7,3)→[0,0,0,0,1,1,1,1], left=4\nresult=[0,0,0,0,1,1,1,1]',
      javascriptSolution: `function sortZerosAndOnes(arr) {
  let left = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      [arr[i], arr[left]] = [arr[left], arr[i]];
      left++;
    }
  }

  return arr;
}`,
      typescriptSolution: `function sortZerosAndOnes(arr: number[]): number[] {
  let left = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      [arr[i], arr[left]] = [arr[left]!, arr[i]!];
      left++;
    }
  }

  return arr;
}`,
      timeComplexity: 'O(n) — single pass.',
      spaceComplexity: 'O(1) — sorted in place.',
      commonMistakes: [
        'Using a full sort (`arr.sort()`) when the two-value structure allows a much simpler O(n) partition.',
        'Reaching for the three-way Dutch flag algorithm when only two distinct values are involved — unnecessary complexity here.',
        'Forgetting to swap (just overwriting arr[i] = 0 without preserving the value that was at `left`), which loses data.',
      ],
      followUpQuestions: [
        'How would you extend this to three values (see Sort Colors) or k distinct values (counting sort)?',
        'How would you count the 0s and 1s first and rebuild the array, and how would that compare in cost?',
        'How would you sort while preserving the original relative order of the 1s (stable partition)?',
      ],
      similarQuestions: ['Sort Colors', 'Move Zeroes', 'Segregate Even and Odd Numbers'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-17',
      questionNumber: 'DSACODE-M2-17',
      title: 'Best Time to Buy and Sell Stock',
      difficulty: 'Easy',
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
        'Given an array `prices` where `prices[i]` is the price of a stock on day i, find the maximum profit achievable from buying on one day and selling on a later day. Return 0 if no profit is possible.',
      input: 'prices: number[]',
      output: 'number — the maximum achievable profit, or 0',
      constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
      examples: [
        { input: '[7, 1, 5, 3, 6, 4]', output: '5', explanation: 'Buy at 1 (day 1), sell at 6 (day 4): profit = 5.' },
        { input: '[7, 6, 4, 3, 1]', output: '0', explanation: 'Prices only decrease, so no profitable trade exists.' },
      ],
      edgeCases: [
        { case: 'Strictly decreasing prices', expected: 'Returns 0' },
        { case: 'Single price', expected: 'Returns 0 (no day to sell on)' },
        { case: 'Best trade uses the very first and very last day', expected: 'Still found correctly' },
      ],
      functionName: 'maxProfit',
      isClassBased: false,
      sampleTests: [
        { input: [[7, 1, 5, 3, 6, 4]], expectedOutput: 5, description: 'classic profitable case' },
        { input: [[7, 6, 4, 3, 1]], expectedOutput: 0, description: 'strictly decreasing, no profit possible' },
        { input: [[1, 2, 3, 4, 5]], expectedOutput: 4, description: 'strictly increasing, buy first sell last' },
        { input: [[5]], expectedOutput: 0, description: 'single price' },
      ],
    },
    hints: {
      hints: [
        'You only ever need to remember the lowest price seen so far, not every previous price.',
        "At each day, the best possible profit if you sold today is today's price minus the lowest price seen before (or on) today.",
        'Track a running minimum and a running maximum profit in a single left-to-right pass.',
      ],
    },
    solution: {
      algorithm:
        "Track minPrice (lowest price seen so far, including today) and maxProfit (best profit found so far). For each price, update minPrice to the smaller of itself and the current price, then update maxProfit to the larger of itself and (current price - minPrice).",
      dryRun:
        'prices=[7,1,5,3,6,4]\nmin=7,max=0\n1: min=1, max=max(0,1-1)=0\n5: min=1, max=max(0,5-1)=4\n3: min=1, max=max(4,3-1)=4\n6: min=1, max=max(4,6-1)=5\n4: min=1, max=max(5,4-1)=5\nresult=5',
      javascriptSolution: `function maxProfit(prices) {
  let minPrice = prices[0];
  let best = 0;

  for (let i = 0; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    best = Math.max(best, prices[i] - minPrice);
  }

  return best;
}`,
      typescriptSolution: `function maxProfit(prices: number[]): number {
  let minPrice = prices[0]!;
  let best = 0;

  for (let i = 0; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i]!);
    best = Math.max(best, prices[i]! - minPrice);
  }

  return best;
}`,
      timeComplexity: 'O(n) — a single pass.',
      spaceComplexity: 'O(1) — two running values.',
      commonMistakes: [
        'Using a brute-force O(n²) nested loop checking every buy/sell pair when a single pass suffices.',
        "Allowing the \"sell\" day to occur before the \"buy\" day by not tracking the running minimum correctly.",
        'Confusing this single-transaction version with the multi-transaction variant (Best Time to Buy and Sell Stock II), which allows unlimited buys/sells.',
      ],
      followUpQuestions: [
        'How does this change if you can complete at most 2 transactions (Best Time to Buy and Sell Stock III)?',
        'How does this change if you can complete unlimited transactions but each has a transaction fee?',
        'How would you also return which two days achieve the maximum profit, not just the profit value?',
      ],
      similarQuestions: ['Best Time to Buy and Sell Stock II', 'Best Time to Buy and Sell Stock III', 'Maximum Subarray'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-18',
      questionNumber: 'DSACODE-M2-18',
      title: 'Merge Sorted Array (In-Place)',
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
        'Given two sorted arrays `nums1` and `nums2`, where `nums1` has length `m + n` (the first `m` elements are valid, the last `n` are placeholder space) and `nums2` has length `n`, merge `nums2` into `nums1` in place so `nums1` becomes one sorted array of length `m + n`. Return the mutated `nums1`.',
      input: 'nums1: number[], m: number, nums2: number[], n: number',
      output: 'number[] — nums1, merged in place and sorted',
      constraints: ['nums1.length === m + n', 'nums2.length === n', '0 <= m, n <= 200'],
      examples: [
        { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]', explanation: 'The trailing zeroes in nums1 are placeholder space overwritten by the merge.' },
        { input: 'nums1 = [1], m = 1, nums2 = [], n = 0', output: '[1]', explanation: 'nums2 is empty, so nums1 is unchanged.' },
      ],
      edgeCases: [
        { case: 'nums1 has no real elements (m = 0)', expected: 'Result is just nums2, copied in' },
        { case: 'nums2 is empty (n = 0)', expected: 'nums1 is unchanged' },
        { case: 'All of nums2 is smaller than all of nums1', expected: 'nums2 values end up at the front' },
      ],
      functionName: 'mergeSortedArrayInPlace',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], expectedOutput: [1, 2, 2, 3, 5, 6], description: 'standard interleaved merge' },
        { input: [[1], 1, [], 0], expectedOutput: [1], description: 'nums2 empty' },
        { input: [[0], 0, [1], 1], expectedOutput: [1], description: 'nums1 has no real elements' },
      ],
    },
    hints: {
      hints: [
        'Merging from the front would overwrite values in nums1 you still need to compare — merge from the back instead.',
        'Track three pointers: the last real index of nums1 (m-1), the last index of nums2 (n-1), and the last index of the combined array (m+n-1).',
        'At each step, place the larger of the two "current" candidates at the back pointer and move that source pointer inward.',
      ],
    },
    solution: {
      algorithm:
        'Use three pointers from the back: `l` at the last combined index (m+n-1), `m` (decremented) at the last real nums1 index, `n` (decremented) at the last nums2 index. While l >= 0, place the larger of nums1[m] and nums2[n] at nums1[l] and decrement the pointer it came from. If nums2 is exhausted first, the remaining nums1 values are already in place; if nums1 is exhausted first, copy the rest of nums2 in.',
      dryRun:
        'nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3\nl=5,m=2,n=2: nums1[2]=3 vs nums2[2]=6 → 6 bigger → nums1[5]=6, n=1, l=4\nl=4,m=2,n=1: nums1[2]=3 vs nums2[1]=5 → 5 bigger → nums1[4]=5, n=0, l=3\nl=3,m=2,n=0: nums1[2]=3 vs nums2[0]=2 → 3 bigger → nums1[3]=3, m=1, l=2\nl=2,m=1,n=0: nums1[1]=2 vs nums2[0]=2 → not(nums1>nums2) → nums1[2]=2, n=-1, l=1\nl=1,m=1,n=-1: n<0 → nums1[1]=nums1[1]=2, m=0, l=0\nl=0,m=0,n=-1: n<0 → nums1[0]=nums1[0]=1, m=-1, l=-1\nresult=[1,2,2,3,5,6]',
      javascriptSolution: `function mergeSortedArrayInPlace(nums1, m, nums2, n) {
  let l = m + n - 1;
  let i = m - 1;
  let j = n - 1;

  while (l >= 0) {
    if (j < 0 || (i >= 0 && nums1[i] > nums2[j])) {
      nums1[l] = nums1[i];
      i--;
    } else {
      nums1[l] = nums2[j];
      j--;
    }
    l--;
  }

  return nums1;
}`,
      typescriptSolution: `function mergeSortedArrayInPlace(nums1: number[], m: number, nums2: number[], n: number): number[] {
  let l = m + n - 1;
  let i = m - 1;
  let j = n - 1;

  while (l >= 0) {
    if (j < 0 || (i >= 0 && nums1[i]! > nums2[j]!)) {
      nums1[l] = nums1[i]!;
      i--;
    } else {
      nums1[l] = nums2[j]!;
      j--;
    }
    l--;
  }

  return nums1;
}`,
      timeComplexity: 'O(m + n) — each element from both arrays is placed exactly once.',
      spaceComplexity: 'O(1) — merged in place, no auxiliary array.',
      commonMistakes: [
        'Merging from the front, which overwrites unprocessed nums1 values before they are compared.',
        'Forgetting the `j < 0` guard, causing an out-of-bounds read on nums2 once it is exhausted.',
        'Assuming you also need an explicit "copy remaining nums1" loop — once nums2 is exhausted, the remaining nums1 values are already sitting in their correct final positions.',
      ],
      followUpQuestions: [
        'Why does merging from the back avoid the overwrite problem that merging from the front has?',
        'How would this differ if nums1 did not have extra trailing space and you had to return a new array instead?',
        'How would you merge k sorted arrays of varying sizes into one, in place or otherwise?',
      ],
      similarQuestions: ['Merge Sorted Arrays', 'Merge k Sorted Lists', 'Squares of a Sorted Array'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-19',
      questionNumber: 'DSACODE-M2-19',
      title: 'Find the Duplicate Number',
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
        'Given an array `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive, and exactly one value is repeated (possibly more than once), find that repeated value.',
      input: 'nums: number[] — n + 1 integers in [1, n], with exactly one value duplicated',
      output: 'number — the duplicated value',
      constraints: ['2 <= nums.length <= 10^5', '1 <= nums[i] <= nums.length - 1', 'Exactly one value is duplicated'],
      examples: [
        { input: '[1, 3, 4, 2, 2]', output: '2', explanation: '2 appears twice.' },
        { input: '[3, 1, 3, 4, 2]', output: '3', explanation: '3 appears twice.' },
      ],
      edgeCases: [
        { case: 'Duplicate value is at the very start', expected: 'Still found correctly' },
        { case: 'Duplicate value appears more than twice', expected: 'Still returns that value' },
      ],
      functionName: 'findDuplicateNumber',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 3, 4, 2, 2]], expectedOutput: 2, description: 'duplicate near the end' },
        { input: [[3, 1, 3, 4, 2]], expectedOutput: 3, description: 'duplicate near the start' },
        { input: [[1, 1]], expectedOutput: 1, description: 'smallest possible input' },
      ],
    },
    hints: {
      hints: [
        'A hash set (or plain object) tracking "seen" values finds the duplicate in O(n) time and O(n) space — a fine first correct solution.',
        'For O(1) extra space, treat the array as a linked list where `nums[i]` points to index `nums[i]` — the duplicate creates a cycle (Floyd\'s cycle detection).',
        'The seen-value approach is simpler to reason about and is what a candidate should demonstrate first; only bring up cycle detection when the interviewer explicitly asks for O(1) space.',
      ],
    },
    solution: {
      algorithm:
        'Walk the array once, tracking which values have already been seen in a hash set (or object used as one). The first value encountered a second time is the duplicate, since the problem guarantees exactly one repeated value.',
      dryRun: 'nums=[1,3,4,2,2]\ni=0: 1 new → seen={1}\ni=1: 3 new → seen={1,3}\ni=2: 4 new → seen={1,3,4}\ni=3: 2 new → seen={1,3,4,2}\ni=4: 2 already seen → return 2',
      javascriptSolution: `function findDuplicateNumber(nums) {
  const seen = new Set();

  for (const value of nums) {
    if (seen.has(value)) return value;
    seen.add(value);
  }

  throw new Error("No duplicate found");
}`,
      typescriptSolution: `function findDuplicateNumber(nums: number[]): number {
  const seen = new Set<number>();

  for (const value of nums) {
    if (seen.has(value)) return value;
    seen.add(value);
  }

  throw new Error("No duplicate found");
}`,
      timeComplexity: 'O(n) — a single pass with O(1) average-case set lookups.',
      spaceComplexity: 'O(n) — the seen-values set. (Floyd\'s cycle detection achieves O(1) extra space at the cost of trickier code.)',
      commonMistakes: [
        "Sorting first (O(n log n)) and scanning for adjacent duplicates when a hash set solves it in O(n).",
        'Mutating the input array to mark seen values (e.g. negating them) without confirming the interviewer is fine with mutating the input.',
        'Assuming the array is already sorted — it is not, per the problem statement.',
      ],
      followUpQuestions: [
        "How would you solve this in O(1) extra space using Floyd's cycle detection (treating the array as a linked list)?",
        'What if more than one value could be duplicated — how would the approach change?',
        'How would you find the duplicate if the array could not be modified and extra space were forbidden?',
      ],
      similarQuestions: ['Linked List Cycle', 'Missing Number', 'Set Mismatch'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-20',
      questionNumber: 'DSACODE-M2-20',
      title: 'Rotate Image (90 Degrees In-Place)',
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
        'Given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees clockwise, in place, without allocating another `n x n` matrix. Return the mutated matrix.',
      input: 'matrix: number[][] — a square (n x n) matrix',
      output: 'number[][] — the same matrix, rotated 90 degrees clockwise',
      constraints: ['1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
      examples: [
        { input: '[[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]', explanation: 'Each column, read bottom-to-top, becomes a row.' },
        { input: '[[1]]', output: '[[1]]', explanation: 'A 1x1 matrix is unchanged by rotation.' },
      ],
      edgeCases: [
        { case: '1x1 matrix', expected: 'Unchanged' },
        { case: '2x2 matrix', expected: 'Rotated correctly with minimal swaps' },
      ],
      functionName: 'rotateImage90',
      isClassBased: false,
      sampleTests: [
        { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expectedOutput: [[7, 4, 1], [8, 5, 2], [9, 6, 3]], description: '3x3 matrix' },
        { input: [[[1]]], expectedOutput: [[1]], description: '1x1 matrix' },
        { input: [[[1, 2], [3, 4]]], expectedOutput: [[3, 1], [4, 2]], description: '2x2 matrix' },
      ],
    },
    hints: {
      hints: [
        'A 90-degree clockwise rotation can be built from two simpler, well-known in-place operations.',
        'First, transpose the matrix (swap matrix[i][j] with matrix[j][i] for i > j) — this flips it across the main diagonal.',
        'Then reverse each row — combined with the transpose, this produces exactly a 90-degree clockwise rotation.',
      ],
    },
    solution: {
      algorithm:
        'Transpose the matrix in place (for every i > j, swap matrix[i][j] and matrix[j][i]), then reverse each row in place. Transpose-then-reverse-rows is mathematically equivalent to a 90-degree clockwise rotation.',
      dryRun:
        'matrix=[[1,2,3],[4,5,6],[7,8,9]]\ntranspose: swap (1,0)&(0,1), (2,0)&(0,2), (2,1)&(1,2)\n→ [[1,4,7],[2,5,8],[3,6,9]]\nreverse each row: [7,4,1],[8,5,2],[9,6,3]\nresult=[[7,4,1],[8,5,2],[9,6,3]]',
      javascriptSolution: `function rotateImage90(matrix) {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i > j) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }
  }

  for (let row = 0; row < n; row++) {
    let left = 0;
    let right = n - 1;
    while (left < right) {
      [matrix[row][left], matrix[row][right]] = [matrix[row][right], matrix[row][left]];
      left++;
      right--;
    }
  }

  return matrix;
}`,
      typescriptSolution: `function rotateImage90(matrix: number[][]): number[][] {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i > j) {
        [matrix[i]![j], matrix[j]![i]] = [matrix[j]![i]!, matrix[i]![j]!];
      }
    }
  }

  for (let row = 0; row < n; row++) {
    let left = 0;
    let right = n - 1;
    while (left < right) {
      [matrix[row]![left], matrix[row]![right]] = [matrix[row]![right]!, matrix[row]![left]!];
      left++;
      right--;
    }
  }

  return matrix;
}`,
      timeComplexity: 'O(n²) — every cell is touched a constant number of times.',
      spaceComplexity: 'O(1) — rotated in place, no auxiliary matrix.',
      commonMistakes: [
        'Allocating a new n x n matrix to hold the rotated result when the problem explicitly asks for in-place rotation.',
        'Transposing with `i >= j` instead of `i > j`, which double-swaps the diagonal back to itself but wastes work (harmless here, but signals imprecise reasoning).',
        'Reversing columns instead of rows (or reversing before transposing), which produces a councounter-clockwise or otherwise incorrect rotation.',
      ],
      followUpQuestions: [
        'How would you rotate 90 degrees counter-clockwise instead (reverse columns first, or transpose the other diagonal)?',
        'How would you rotate a non-square (m x n) matrix, where in-place rotation is not possible without extra space?',
        'How would you rotate by 180 degrees, and can you express it as two 90-degree rotations?',
      ],
      similarQuestions: ['Spiral Matrix', 'Set Matrix Zeroes', 'Transpose Matrix'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-21',
      questionNumber: 'DSACODE-M2-21',
      title: 'Max Consecutive Ones',
      difficulty: 'Easy',
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
        'Given a binary array `nums` (containing only 0 and 1), return the maximum number of consecutive 1s in the array.',
      input: 'nums: number[] — values are only 0 or 1',
      output: 'number — the length of the longest run of consecutive 1s',
      constraints: ['1 <= nums.length <= 10^5', 'nums[i] is 0 or 1'],
      examples: [
        { input: '[1, 1, 0, 1, 1, 1]', output: '3', explanation: 'The longest run of 1s is the last three elements.' },
        { input: '[1, 0, 1, 1, 0, 1]', output: '2', explanation: 'The longest run is [1, 1] in the middle.' },
      ],
      edgeCases: [
        { case: 'All zeroes', expected: 'Returns 0' },
        { case: 'All ones', expected: 'Returns nums.length' },
        { case: 'Single element', expected: 'Returns 0 or 1 depending on the value' },
      ],
      functionName: 'findMaxConsecutiveOnes',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 1, 0, 1, 1, 1]], expectedOutput: 3, description: 'longest run at the end' },
        { input: [[1, 0, 1, 1, 0, 1]], expectedOutput: 2, description: 'longest run in the middle' },
        { input: [[0, 0, 0]], expectedOutput: 0, description: 'all zeroes' },
        { input: [[1, 1, 1]], expectedOutput: 3, description: 'all ones' },
      ],
    },
    hints: {
      hints: [
        'Track a running count of the current streak of 1s, resetting to 0 whenever a 0 is seen.',
        'Keep a separate "best seen so far" value, updated after every element.',
        'This is a single left-to-right pass — no extra data structure needed.',
      ],
    },
    solution: {
      algorithm:
        'Maintain a running `count` of consecutive 1s, incrementing on a 1 and resetting to 0 on a 0. Track `max` as the largest `count` seen so far, updated after every element.',
      dryRun: 'nums=[1,1,0,1,1,1]\ncount=0,max=0\n1: count=1,max=1\n1: count=2,max=2\n0: count=0,max=2\n1: count=1,max=2\n1: count=2,max=2\n1: count=3,max=3\nresult=3',
      javascriptSolution: `function findMaxConsecutiveOnes(nums) {
  let count = 0;
  let max = 0;

  for (const value of nums) {
    count = value === 1 ? count + 1 : 0;
    max = Math.max(max, count);
  }

  return max;
}`,
      typescriptSolution: `function findMaxConsecutiveOnes(nums: number[]): number {
  let count = 0;
  let max = 0;

  for (const value of nums) {
    count = value === 1 ? count + 1 : 0;
    max = Math.max(max, count);
  }

  return max;
}`,
      timeComplexity: 'O(n) — a single pass.',
      spaceComplexity: 'O(1) — two running values.',
      commonMistakes: [
        'Forgetting to update `max` on every iteration (only updating it when the streak breaks), which misses a streak that runs to the end of the array.',
        'Off-by-one errors when translating this into a sliding-window formulation for the "flip at most k zeroes" variant.',
        'Using an unnecessary nested loop to recount each streak instead of an O(n) running count.',
      ],
      followUpQuestions: [
        'How would you solve "Max Consecutive Ones III" — the longest run of 1s allowing up to k zeroes to be flipped?',
        'How would you also return the start/end indices of the longest run, not just its length?',
        'How would you handle a streaming array where you cannot look ahead or store the whole input?',
      ],
      similarQuestions: ['Max Consecutive Ones II', 'Max Consecutive Ones III', 'Longest Repeating Character Replacement'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-22',
      questionNumber: 'DSACODE-M2-22',
      title: 'Trapping Rain Water',
      difficulty: 'Hard',
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
        'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
      input: 'heights: number[] — elevation at each position',
      output: 'number — total units of trapped water',
      constraints: ['1 <= heights.length <= 2 * 10^4', '0 <= heights[i] <= 10^5'],
      examples: [
        { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'Six units of water are trapped between the bars.' },
        { input: '[4,2,0,3,2,5]', output: '9', explanation: 'Nine units of water are trapped across the profile.' },
      ],
      edgeCases: [
        { case: 'Strictly increasing or strictly decreasing heights', expected: 'Traps 0 water (nothing to hold water in)' },
        { case: 'All bars the same height', expected: 'Traps 0 water' },
        { case: 'Single bar', expected: 'Traps 0 water' },
      ],
      functionName: 'trapRainWater',
      isClassBased: false,
      sampleTests: [
        { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expectedOutput: 6, description: 'classic elevation profile' },
        { input: [[4, 2, 0, 3, 2, 5]], expectedOutput: 9, description: 'another common test case' },
        { input: [[1, 2, 3, 4]], expectedOutput: 0, description: 'strictly increasing, no water trapped' },
        { input: [[5]], expectedOutput: 0, description: 'single bar' },
      ],
    },
    hints: {
      hints: [
        'The water trapped above any single position is bounded by the shorter of the tallest bar to its left and the tallest bar to its right.',
        'Precompute two arrays: the maximum height so far from the left, and the maximum height so far from the right, for every position.',
        'The water above position i is `min(leftMax[i], rightMax[i]) - heights[i]` (clamped to non-negative), summed across all positions.',
      ],
    },
    solution: {
      algorithm:
        'Precompute leftMax[i] = the tallest bar in heights[0..i], and rightMax[i] = the tallest bar in heights[i..n-1]. For each position, the water trapped is min(leftMax[i], rightMax[i]) - heights[i] (this is always >= 0 by construction, since heights[i] <= both leftMax[i] and rightMax[i]). Sum this across all positions.',
      dryRun:
        'heights=[0,1,0,2,1,0,1,3,2,1,2,1]\nleftMax=[0,1,1,2,2,2,2,3,3,3,3,3]\nrightMax=[3,3,3,3,3,3,3,3,2,2,2,1]\nwater at each i = min(leftMax,rightMax)-heights\n=[0,0,1,0,1,2,1,0,0,1,0,0]\nsum=6',
      javascriptSolution: `function trapRainWater(heights) {
  const n = heights.length;
  if (n === 0) return 0;

  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);

  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  let total = 0;
  for (let i = 0; i < n; i++) {
    total += Math.min(leftMax[i], rightMax[i]) - heights[i];
  }

  return total;
}`,
      typescriptSolution: `function trapRainWater(heights: number[]): number {
  const n = heights.length;
  if (n === 0) return 0;

  const leftMax = new Array<number>(n).fill(0);
  const rightMax = new Array<number>(n).fill(0);

  leftMax[0] = heights[0]!;
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1]!, heights[i]!);
  }

  rightMax[n - 1] = heights[n - 1]!;
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1]!, heights[i]!);
  }

  let total = 0;
  for (let i = 0; i < n; i++) {
    total += Math.min(leftMax[i]!, rightMax[i]!) - heights[i]!;
  }

  return total;
}`,
      timeComplexity: 'O(n) — three linear passes (left-max, right-max, sum).',
      spaceComplexity: 'O(n) for the two auxiliary arrays (can be reduced to O(1) with a two-pointer approach).',
      commonMistakes: [
        'Trying to compute this with a single pass and a single running max, which cannot capture "the max on the *other* side" without the two-pointer technique.',
        'Forgetting that a position\'s trapped water depends on the *shorter* of its two bounding maxes, not the taller one.',
        'Off-by-one errors in the right-max backward pass, e.g. starting from n-1 instead of n-2 for the loop after seeding rightMax[n-1].',
      ],
      followUpQuestions: [
        'How would you solve this with O(1) extra space using a two-pointer approach instead of two auxiliary arrays?',
        'How would this generalize to 2D "trapping rain water" over a height map (a grid, not just a line)?',
        'How would you compute the answer incrementally as bars are added one at a time?',
      ],
      similarQuestions: ['Container With Most Water', 'Trapping Rain Water II', 'Largest Rectangle in Histogram'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-23',
      questionNumber: 'DSACODE-M2-23',
      title: 'Valid Triangle Number',
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
        'Given an array of non-negative integers, return the number of triplets that can form the three side lengths of a triangle (i.e. for chosen a <= b <= c, a + b > c).',
      input: 'nums: number[]',
      output: 'number — the count of valid triangle-forming triplets',
      constraints: ['1 <= nums.length <= 1000', '0 <= nums[i] <= 1000'],
      examples: [
        { input: '[2, 2, 3, 4]', output: '3', explanation: 'The triplets (2,2,3), (2,3,4), (2,3,4) [using the other 2] all satisfy the triangle inequality.' },
        { input: '[4, 2, 3, 4]', output: '4', explanation: 'Four valid triplets exist once sorted to [2,3,4,4].' },
      ],
      edgeCases: [
        { case: 'Fewer than 3 elements', expected: 'Returns 0 (no triplet possible)' },
        { case: 'All zeroes', expected: 'Returns 0 (0 + 0 is never > 0)' },
        { case: 'All elements equal and positive', expected: 'Every triplet is valid' },
      ],
      functionName: 'triangleNumber',
      isClassBased: false,
      sampleTests: [
        { input: [[2, 2, 3, 4]], expectedOutput: 3, description: 'classic case' },
        { input: [[4, 2, 3, 4]], expectedOutput: 4, description: 'with a duplicate value' },
        { input: [[0, 1, 1]], expectedOutput: 0, description: 'includes a zero, which cannot form a triangle' },
        { input: [[1]], expectedOutput: 0, description: 'too few elements' },
      ],
    },
    hints: {
      hints: [
        'Sort the array first — once sorted, fixing the *largest* side of a candidate triplet lets you use two pointers on everything before it.',
        'For a fixed largest side at index i, find pairs (left, right) with left < right < i such that nums[left] + nums[right] > nums[i].',
        "If nums[left] + nums[right] > nums[i], then *every* pair (left', right) with left < left' < right also works, since the array is sorted — count them all at once instead of checking one by one.",
      ],
    },
    solution: {
      algorithm:
        'Sort the array ascending. For each index i from the end down to 2 (treating nums[i] as the largest side), use two pointers left=0, right=i-1: if nums[left] + nums[right] > nums[i], every index between left and right also works with right, so add (right - left) to the count and decrement right; otherwise increment left.',
      dryRun:
        'nums=[2,2,3,4] sorted\ni=3 (val 4): left=0,right=2 → nums[0]+nums[2]=2+3=5>4 → count+=2, right=1\n  left=0,right=1 → 2+2=4>4? no → left=1\n  left=1,right=1 → loop ends (left<right false)\ni=2 (val 3): left=0,right=1 → 2+2=4>3 → count+=1, right=0\n  loop ends\ntotal count=3',
      javascriptSolution: `function triangleNumber(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  let count = 0;

  for (let i = sorted.length - 1; i >= 2; i--) {
    let left = 0;
    let right = i - 1;

    while (left < right) {
      if (sorted[left] + sorted[right] > sorted[i]) {
        count += right - left;
        right--;
      } else {
        left++;
      }
    }
  }

  return count;
}`,
      typescriptSolution: `function triangleNumber(nums: number[]): number {
  const sorted = [...nums].sort((a, b) => a - b);
  let count = 0;

  for (let i = sorted.length - 1; i >= 2; i--) {
    let left = 0;
    let right = i - 1;

    while (left < right) {
      if (sorted[left]! + sorted[right]! > sorted[i]!) {
        count += right - left;
        right--;
      } else {
        left++;
      }
    }
  }

  return count;
}`,
      timeComplexity: 'O(n²) — sorting is O(n log n), and the outer loop with an inner two-pointer scan is O(n²) overall.',
      spaceComplexity: 'O(n) for the sorted copy (O(log n) to O(n) additional for the sort itself, depending on engine).',
      commonMistakes: [
        'Checking all O(n³) triplets directly with three nested loops instead of the O(n²) two-pointer technique.',
        "Fixing the *smallest* side instead of the *largest* — the two-pointer trick specifically relies on fixing the largest side so the triangle inequality reduces to one comparison.",
        'Forgetting that once nums[left] + nums[right] > nums[i] holds, *all* intermediate lefts also work with that right — failing to add `right - left` all at once and instead re-checking each pair individually.',
      ],
      followUpQuestions: [
        'Why does fixing the largest side (rather than the smallest) make the two-pointer technique work here?',
        'How would you find just one valid triangle triplet instead of counting all of them, and how would the complexity change?',
        'How would you extend this to count valid quadrilaterals or other polygon side combinations?',
      ],
      similarQuestions: ['3Sum Smaller', '3Sum', 'Boats to Save People'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m2-24',
      questionNumber: 'DSACODE-M2-24',
      title: 'Count Inversions',
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
        'Given an array `nums`, count the number of inversions: pairs of indices (i, j) such that i < j and nums[i] > nums[j].',
      input: 'nums: number[]',
      output: 'number — the total count of inversions in nums',
      constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
      examples: [
        { input: '[2, 4, 1, 3, 5]', output: '3', explanation: 'Inversions: (2,1), (4,1), (4,3) — 3 pairs.' },
        { input: '[5, 4, 3, 2, 1]', output: '10', explanation: 'Every pair is inverted: C(5,2) = 10.' },
        { input: '[1, 2, 3, 4, 5]', output: '0', explanation: 'Already sorted — no inversions.' },
      ],
      edgeCases: [
        { case: 'Already sorted array', expected: '0 inversions' },
        { case: 'Reverse-sorted array', expected: 'Maximum possible inversions, n(n-1)/2' },
        { case: 'Empty or single-element array', expected: '0 inversions' },
      ],
      functionName: 'countInversions',
      isClassBased: false,
      sampleTests: [
        { input: [[2, 4, 1, 3, 5]], expectedOutput: 3, description: 'a few scattered inversions' },
        { input: [[5, 4, 3, 2, 1]], expectedOutput: 10, description: 'fully reverse-sorted — maximum inversions' },
        { input: [[1, 2, 3, 4, 5]], expectedOutput: 0, description: 'already sorted' },
        { input: [[]], expectedOutput: 0, description: 'empty array' },
      ],
    },
    hints: {
      hints: [
        'A brute-force O(n²) pairwise comparison works but is too slow for large inputs — think about counting inversions as a byproduct of sorting.',
        'During the merge step of merge sort, whenever an element from the right half is placed before remaining elements of the left half, every one of those remaining left-half elements forms an inversion with it.',
        'Accumulate that count across every merge step of a standard merge sort — the final total is the inversion count.',
      ],
    },
    solution: {
      algorithm:
        'Run merge sort on the array, and during each merge step, whenever an element is taken from the right half before the left half is exhausted, add (remaining elements in the left half) to a running inversion count — each of those left-half elements is out of order relative to the right-half element just placed. The final accumulated count is the total number of inversions.',
      dryRun:
        'nums=[2,4,1,3,5]\nsplit into [2,4] and [1,3,5]\nmerge [2,4]: no inversions (already sorted)\nmerge [1,3,5]: no inversions (already sorted)\nmerge [2,4] with [1,3,5]: take 1 (right, before 2,4 both remain) → count+=2; take 2 (left); take 3 (right, before 4 remains) → count+=1; take 4 (left); take 5 (right)\ntotal count = 2+1 = 3',
      javascriptSolution: `function countInversions(nums) {
  let count = 0;

  function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    const merged = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        count += left.length - i;
        merged.push(right[j]);
        j++;
      }
    }

    while (i < left.length) merged.push(left[i++]);
    while (j < right.length) merged.push(right[j++]);

    return merged;
  }

  mergeSort(nums);
  return count;
}`,
      typescriptSolution: `function countInversions(nums: number[]): number {
  let count = 0;

  function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    const merged: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i]! <= right[j]!) {
        merged.push(left[i]!);
        i++;
      } else {
        count += left.length - i;
        merged.push(right[j]!);
        j++;
      }
    }

    while (i < left.length) merged.push(left[i++]!);
    while (j < right.length) merged.push(right[j++]!);

    return merged;
  }

  mergeSort(nums);
  return count;
}`,
      timeComplexity: 'O(n log n) — one merge sort pass, with O(1) extra work per merge step to accumulate the count.',
      spaceComplexity: 'O(n) — merge sort\'s auxiliary arrays.',
      commonMistakes: [
        'Using a brute-force O(n²) nested loop, which is correct but too slow for large arrays.',
        'Adding 1 per inverted element instead of the full remaining-left-half count (left.length - i), which undercounts since every remaining left element is inverted with the current right element, not just one.',
        'Forgetting to mutate/return `count` from outside the recursive mergeSort closure, or resetting it accidentally between recursive calls.',
      ],
      followUpQuestions: [
        'How would you count inversions using a Binary Indexed Tree (Fenwick Tree) instead of merge sort?',
        'How would you find the actual inverted pairs, not just their count?',
        'How does this relate to computing the minimum number of adjacent swaps to sort an array?',
      ],
      similarQuestions: ['Reverse Pairs', 'Global and Local Inversions', 'Count of Smaller Numbers After Self'],
    },
  },
];
