// Hand-authored coding questions derived from the "Array 2 pointers"
// section of the DSA interview notes. Like dsa-coding-module2-questions.ts,
// these are real CodingQuestionDetail problems: every sampleTests entry has
// been run against the reference solution in Node before being written
// here, and both the JavaScript and TypeScript solutions are genuine,
// working code (no placeholder stubs).
//
// The 132-pattern solution tracks `third` as a value, not as an array index.

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

const CATEGORY = 'Two Pointers';
const CONCEPTS = ['Two Pointers', 'Arrays', 'Strings', 'Monotonic Stack', 'Time Complexity', 'Space Complexity'];

export const MOCK_DSA_CODING_MODULE3_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m3-1',
      questionNumber: 'DSACODE-M3-1',
      title: 'Backspace String Compare',
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
        'Given two strings `s` and `t`, each representing a sequence of keystrokes where `#` means a backspace (deleting the previous character, or doing nothing if the text is already empty), return true if the two strings, once the backspaces are actually applied, are equal.',
      input: 's: string, t: string — strings of lowercase letters and \'#\' characters',
      output: 'boolean — true if applying every backspace produces two equal strings',
      constraints: ['1 <= s.length, t.length <= 200', 's and t only contain lowercase letters and the character #'],
      examples: [
        { input: 's = "ab#c", t = "ad#c"', output: 'true', explanation: 'Both become "ac" after applying the backspace.' },
        { input: 's = "ab##", t = "c#d#"', output: 'true', explanation: 'Both become "" — every character is backspaced away.' },
        { input: 's = "a#c", t = "b"', output: 'false', explanation: 's becomes "c", t stays "b" — they differ.' },
      ],
      edgeCases: [
        { case: 'Leading backspaces with nothing to delete', expected: 'They are simply no-ops, not errors' },
        { case: 'Both strings reduce to empty', expected: 'Considered equal (true)' },
        { case: 'A run of backspaces longer than the preceding text', expected: 'Deletes everything available and then stops (no negative length)' },
      ],
      functionName: 'backspaceCompare',
      isClassBased: false,
      sampleTests: [
        { input: ['ab#c', 'ad#c'], expectedOutput: true, description: 'single backspace on each side, same result' },
        { input: ['ab##', 'c#d#'], expectedOutput: true, description: 'both strings fully erase to empty' },
        { input: ['a#c', 'b'], expectedOutput: false, description: 'genuinely different results' },
        { input: ['xy#z', 'xzz#'], expectedOutput: true, description: 'both reduce to "xz"' },
        { input: ['bxj##tw', 'bxo#j##tw'], expectedOutput: true, description: 'multiple backspaces in the middle of the string' },
      ],
    },
    hints: {
      hints: [
        'Building the final string with an explicit stack (push normal characters, pop on `#`) works, but there is a way to avoid the extra array entirely.',
        'Walk both strings from the *end* — a backspace found while scanning backward tells you to skip the next real character you encounter, exactly like undoing a keystroke in reverse.',
        'Compare the two strings character-by-character from the back, using a helper that walks past backspaces to find "the next real character going backward" for each string independently.',
      ],
    },
    solution: {
      algorithm:
        `Step 1: Start from the end of both strings.
Step 2: A '#' increases the number of characters to skip; a normal character is skipped if the skip count is positive.
Step 3: Compare the next valid character from both strings.
Step 4: Move both pointers left and continue until both strings are exhausted.

Why this is easy: think of scanning the strings backwards to "undo" backspaces instead of building the final strings.

Core idea from the original solution:
Scan both strings from right to left in lockstep. For each string, a helper repeatedly walks left: whenever it sees \`#\` it increments a "skip" counter and keeps moving; whenever skip > 0 and it sees a normal character, it consumes one skip and keeps moving; otherwise it stops at a real, un-backspaced character. At each step, find the next real character index for both \`s\` and \`t\` this way, compare them (or detect that one ran out before the other), and continue moving both pointers left by one until both are exhausted.`,
      dryRun:
        `s = "ab#c", t = "ad#c"
From the end: c matches c.
Then # skips b/d, leaving a on both sides.
No characters remain → true.

Interview tip: trace the key pointer/state change rather than trying to simulate every line.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function backspaceCompare(s, t) {
  function nextValidIndex(str, index) {
    let skip = 0;

    while (index >= 0) {
      if (str[index] === "#") {
        skip++;
      } else if (skip > 0) {
        skip--;
      } else {
        return index;
      }

      index--;
    }

    return -1;
  }

  let i = s.length - 1;
  let j = t.length - 1;

  while (i >= 0 || j >= 0) {
    i = nextValidIndex(s, i);
    j = nextValidIndex(t, j);

    if (i < 0 || j < 0) return i === j;
    if (s[i] !== t[j]) return false;

    i--;
    j--;
  }

  return true;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function backspaceCompareUsingBuiltIns(s, t) {
  const resolve = (value) => {
    const stack = [];

    for (const char of value) {
      if (char === "#") stack.pop();
      else stack.push(char);
    }

    return stack.join("");
  };

  return resolve(s) === resolve(t);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function backspaceCompare(s: string, t: string): boolean {
  function nextValidIndex(str: string, index: number): number {
    let skip = 0;

    while (index >= 0) {
      if (str[index] === "#") {
        skip++;
      } else if (skip > 0) {
        skip--;
      } else {
        return index;
      }

      index--;
    }

    return -1;
  }

  let i = s.length - 1;
  let j = t.length - 1;

  while (i >= 0 || j >= 0) {
    i = nextValidIndex(s, i);
    j = nextValidIndex(t, j);

    if (i < 0 || j < 0) {
      return i === j;
    }

    if (s[i] !== t[j]) return false;

    i--;
    j--;
  }

  return true;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function backspaceCompareUsingBuiltIns(
  s: string,
  t: string,
): boolean {
  const resolve = (value: string): string => {
    const stack: string[] = [];

    for (const char of value) {
      if (char === "#") {
        stack.pop();
      } else {
        stack.push(char);
      }
    }

    return stack.join("");
  };

  return resolve(s) === resolve(t);
}`,
      timeComplexity: 'O(n + m) — each pointer walks its string at most twice (once for skips, once for real characters).',
      spaceComplexity: 'O(1) — only a handful of index/counter variables, no extra string is built.',
      commonMistakes: [
        'Building the resolved strings with an explicit array/stack and comparing those — correct, but uses O(n + m) extra space when a two-pointer scan needs none.',
        'Scanning forward instead of backward, which makes "skip the next real character" much harder to express correctly.',
        'Forgetting the case where one string is exhausted before the other (e.g. "a#" vs "") — the loop condition must be `||`, not `&&`, so a leftover real character on one side is still caught.',
      ],
      followUpQuestions: [
        'How would you solve this in O(n + m) time but genuinely O(1) space, exactly as done here — what breaks if you tried to do it left-to-right instead?',
        'How would you extend this to support other edit operations, like a "delete word" (`##` semantics differing per key)?',
        'How would you return the two fully-resolved strings instead of just a boolean?',
      ],
      similarQuestions: ['Build a String From Another', 'Valid Parentheses', 'Simplify Path'],
    },
  },

  {
    detail: {
      id: 'dsa-coding-m3-2',
      questionNumber: 'DSACODE-M3-2',
      title: 'Squares of a Sorted Array',
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
        'Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number, also sorted in non-decreasing order.',
      input: 'nums: number[] — sorted in non-decreasing order (may include negatives)',
      output: 'number[] — the squares of nums, sorted in non-decreasing order',
      constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in non-decreasing order'],
      examples: [
        { input: '[-4, -1, 0, 3, 10]', output: '[0, 1, 9, 16, 100]', explanation: 'Squaring can reorder values since negatives square positive.' },
        { input: '[-7, -3, 2, 3, 11]', output: '[4, 9, 9, 49, 121]', explanation: 'Two different inputs (-3 and 3) can square to different results that still need re-sorting.' },
        { input: '[0]', output: '[0]', explanation: 'Single element, trivially sorted.' },
      ],
      edgeCases: [
        { case: 'All values negative', expected: 'Largest-magnitude negative squares to the largest value, at the end of the result' },
        { case: 'All values non-negative', expected: 'Already sorted after squaring — order is preserved' },
        { case: 'Array contains 0', expected: '0 squares to 0 and sorts into its correct position' },
      ],
      functionName: 'sortedSquares',
      isClassBased: false,
      sampleTests: [
        { input: [[-4, -1, 0, 3, 10]], expectedOutput: [0, 1, 9, 16, 100], description: 'mixed negative and positive' },
        { input: [[-7, -3, 2, 3, 11]], expectedOutput: [4, 9, 9, 49, 121], description: 'squares collide from both sides' },
        { input: [[0]], expectedOutput: [0], description: 'single element' },
        { input: [[-5, -3, -2, -1]], expectedOutput: [1, 4, 9, 25], description: 'all negative values' },
      ],
    },
    hints: {
      hints: [
        'Squaring and sorting the naive way costs O(n log n) — the input is already sorted, so there should be a linear way to exploit that.',
        'The largest square in the result always comes from whichever end (leftmost negative or rightmost positive) currently has the greater absolute value.',
        'Fill the output array from the back: compare the absolute values at two pointers (one at each end of the input) and place the larger square at the current back slot, moving that pointer inward.',
      ],
    },
    solution: {
      algorithm:
        `Step 1: The input is already sorted, so the largest square must come from either end.
Step 2: Keep one pointer at the left end and one at the right end.
Step 3: Compare the two squares and write the larger one at the back of the result.
Step 4: Move the pointer that produced the larger square and continue.

Why this is easy: fill the answer from right to left because the largest square is found first.

Core idea from the original solution:
Use two pointers, \`left\` at the start and \`right\` at the end of \`nums\`, and fill the result array from its last index backward. At each step, compare \`nums[left]^2\` and \`nums[right]^2\`: whichever is larger is the next-largest square overall (since the input is sorted, the largest-magnitude value is always at one of the two ends), so place it at the current back slot of the result and move that pointer inward.`,
      dryRun:
        `nums = [-4,-1,0,3,10]
Compare 16 and 100 → put 100 at result[4].
Compare 16 and 9 → put 16 at result[3].
Compare 1 and 9 → put 9 at result[2].
Then 1 and 0 → put 1.
Finally 0 → result = [0,1,9,16,100].

Interview tip: trace the key pointer/state change rather than trying to simulate every line.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function sortedSquares(nums) {
  const result = new Array(nums.length);
  let left = 0;
  let right = nums.length - 1;

  for (let write = nums.length - 1; write >= 0; write--) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    if (leftSquare > rightSquare) {
      result[write] = leftSquare;
      left++;
    } else {
      result[write] = rightSquare;
      right--;
    }
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function sortedSquaresUsingBuiltIns(nums) {
  return nums
    .map((value) => value * value)
    .sort((a, b) => a - b);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function sortedSquares(nums: number[]): number[] {
  const result = new Array<number>(nums.length);

  let left = 0;
  let right = nums.length - 1;

  for (let write = nums.length - 1; write >= 0; write--) {
    const leftValue = nums[left]!;
    const rightValue = nums[right]!;

    const leftSquare = leftValue * leftValue;
    const rightSquare = rightValue * rightValue;

    if (leftSquare > rightSquare) {
      result[write] = leftSquare;
      left++;
    } else {
      result[write] = rightSquare;
      right--;
    }
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function sortedSquaresUsingBuiltIns(nums: number[]): number[] {
  return nums
    .map((value) => value * value)
    .sort((a, b) => a - b);
}`,
      timeComplexity: 'O(n) — each element is visited exactly once across both pointers.',
      spaceComplexity: 'O(n) for the output array (O(1) extra beyond it, not counting the required return value).',
      commonMistakes: [
        'Squaring every element and then calling `.sort()`, which is a correct but unnecessary O(n log n) solution when the sortedness of the input can be exploited for O(n).',
        'Using `>=` instead of `>` (or vice versa) at the comparison — harmless here since equal squares can come from either side, but worth being deliberate about.',
        'Filling the result array front-to-back rather than back-to-front, which does not correspond to how the two-pointer max comparison naturally produces values (largest-first).',
      ],
      followUpQuestions: [
        'How would this change if the input were not guaranteed sorted?',
        'How would you find just the k largest squares without computing and sorting all of them?',
        'What is the relationship between this technique and merging two sorted sequences?',
      ],
      similarQuestions: ['Merge Sorted Array', 'Sort Array By Parity', 'Squares of a Sorted Array II (streaming variant)'],
    },
  },

  {
    detail: {
      id: 'dsa-coding-m3-3',
      questionNumber: 'DSACODE-M3-3',
      title: 'Subarray Product Less Than K',
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
        'Given an array of positive integers `nums` and an integer `k`, return the number of contiguous subarrays whose product is strictly less than `k`.',
      input: 'nums: number[] — an array of positive integers, k: number',
      output: 'number — the count of contiguous subarrays with product strictly less than k',
      constraints: ['1 <= nums.length <= 3 * 10^4', '1 <= nums[i] <= 1000', '0 <= k <= 10^6'],
      examples: [
        { input: 'nums = [10, 5, 2, 6], k = 100', output: '8', explanation: 'The 8 subarrays with product < 100 are [10],[5],[2],[6],[10,5],[5,2],[2,6],[5,2,6].' },
        { input: 'nums = [1, 2, 3], k = 0', output: '0', explanation: 'No product can ever be strictly less than 0.' },
        { input: 'nums = [1, 1, 1], k = 2', output: '6', explanation: 'Every one of the 6 possible contiguous subarrays has product 1, which is < 2.' },
      ],
      edgeCases: [
        { case: 'k <= 1', expected: 'Answer is always 0, since every element is a positive integer (product >= 1)' },
        { case: 'A single element equal to or greater than k', expected: 'That element alone never counts, but it does not block a window forming around it once excluded' },
        { case: 'Whole array product still less than k', expected: 'Counts every possible contiguous subarray' },
      ],
      functionName: 'numSubarrayProductLessThanK',
      isClassBased: false,
      sampleTests: [
        { input: [[10, 5, 2, 6], 100], expectedOutput: 8, description: 'classic example' },
        { input: [[1, 2, 3], 0], expectedOutput: 0, description: 'k is 0, so no subarray qualifies' },
        { input: [[1, 1, 1], 2], expectedOutput: 6, description: 'every subarray has product 1' },
        { input: [[100], 100], expectedOutput: 0, description: 'a single value equal to k does not count' },
      ],
    },
    hints: {
      hints: [
        'Since every element is a positive integer, the running product only grows as the window expands and only shrinks as it contracts — that monotonic behavior is what makes a sliding window valid here.',
        'Maintain a window [left, right] whose product is always kept strictly less than k by shrinking from the left whenever it is not.',
        'For a valid window ending at `right`, every subarray ending at `right` and starting anywhere from `left` to `right` also has product < k — that count is exactly `right - left + 1`, added once per position of `right`.',
      ],
    },
    solution: {
      algorithm:
        `Step 1: If k <= 1, return 0 because every product is at least 1.
Step 2: Expand a sliding window with the right pointer and multiply the new value.
Step 3: While the product is too large, divide out values from the left.
Step 4: A valid window [left..right] contributes right - left + 1 new subarrays ending at right.

Why this is easy: maintain one window whose product is always < k.

Core idea from the original solution:
Handle k <= 1 immediately by returning 0 (positive integers always have product >= 1). Otherwise, use a sliding window: expand \`right\` one step at a time, multiplying the running product by \`nums[right]\`. While the product is >= k, divide out \`nums[left]\` and advance \`left\`. After each expansion, the window [left, right] is the widest valid (product < k) window ending at \`right\`, so it contributes \`right - left + 1\` new subarrays (every subarray ending at \`right\` and starting at any point from \`left\` to \`right\`).`,
      dryRun:
        `nums = [10,5,2,6], k = 100
right=0: product=10 → +1
right=1: product=50 → +2 (total 3)
right=2: product=100 → divide by 10 → product=10 → +2 (total 5)
right=3: product=60 → +3 (total 8)
answer = 8.

Interview tip: trace the key pointer/state change rather than trying to simulate every line.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) return 0;

  let left = 0;
  let product = 1;
  let count = 0;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];

    while (product >= k) {
      product /= nums[left];
      left++;
    }

    count += right - left + 1;
  }

  return count;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function numSubarrayProductLessThanKUsingBuiltIns(nums, k) {
  if (k <= 1) return 0;

  let left = 0;
  let product = 1;
  let count = 0;

  nums.forEach((value, right) => {
    product *= value;

    while (product >= k) {
      product /= nums[left];
      left++;
    }

    count += right - left + 1;
  });

  return count;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function numSubarrayProductLessThanK(
  nums: number[],
  k: number,
): number {
  if (k <= 1) return 0;

  let left = 0;
  let product = 1;
  let count = 0;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right]!;

    while (product >= k) {
      product /= nums[left]!;
      left++;
    }

    count += right - left + 1;
  }

  return count;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function numSubarrayProductLessThanKUsingBuiltIns(
  nums: number[],
  k: number,
): number {
  if (k <= 1) return 0;

  let left = 0;
  let product = 1;
  let count = 0;

  nums.forEach((value, right) => {
    product *= value;

    while (product >= k) {
      product /= nums[left]!;
      left++;
    }

    count += right - left + 1;
  });

  return count;
}`,
      timeComplexity: 'O(n) — `left` only ever moves forward, so it advances at most n times total across the whole run.',
      spaceComplexity: 'O(1) — a fixed number of running variables.',
      commonMistakes: [
        'Forgetting the `k <= 1` guard, which can lead to an infinite loop trying to shrink a window that can never satisfy product < k (or product < 0, which never happens with positive integers).',
        'Counting only the full window `right - left + 1` once at the very end instead of accumulating it after every expansion of `right` — this undercounts, since it misses all the shorter valid subarrays ending at earlier positions.',
        'Using `<=` instead of `<` in the shrink condition (`while (product > k)` instead of `>= k`), which incorrectly allows a window with product exactly equal to k.',
      ],
      followUpQuestions: [
        'How would this change if the array could contain zero or negative numbers?',
        'How would you count subarrays with product less than k if the array elements could be very large, risking overflow?',
        'How would you adapt this sliding window into one that counts subarrays with sum (not product) less than a target — what stays the same, what changes?',
      ],
      similarQuestions: ['Minimum Size Subarray Sum', 'Subarray Sum Equals K', 'Fruit Into Baskets'],
    },
  },

  {
    detail: {
      id: 'dsa-coding-m3-4',
      questionNumber: 'DSACODE-M3-4',
      title: '3Sum Closest',
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
        'Given an integer array `nums` of length at least 3 and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return that sum (assume exactly one closest answer exists among all valid triplets).',
      input: 'nums: number[] — length >= 3, target: number',
      output: 'number — the sum of the three integers closest to target',
      constraints: ['3 <= nums.length <= 500', '-1000 <= nums[i] <= 1000', '-10^4 <= target <= 10^4'],
      examples: [
        { input: 'nums = [-1, 2, 1, -4], target = 1', output: '2', explanation: '-1 + 2 + 1 = 2, which is the closest possible sum to the target 1.' },
        { input: 'nums = [0, 0, 0], target = 1', output: '0', explanation: 'The only possible sum is 0.' },
        { input: 'nums = [1, 1, 1, 0], target = -100', output: '2', explanation: 'The smallest achievable sum, 0+1+1=2, is closest to a very negative target.' },
      ],
      edgeCases: [
        { case: 'Exactly 3 elements', expected: 'Only one triplet is possible, its sum is the answer' },
        { case: 'Multiple triplets tie for closest', expected: 'Any one of the tied sums is a valid answer (they are numerically identical)' },
        { case: 'Target already achievable exactly', expected: 'Returns target itself and can short-circuit early' },
      ],
      functionName: 'threeSumClosest',
      isClassBased: false,
      sampleTests: [
        { input: [[-1, 2, 1, -4], 1], expectedOutput: 2, description: 'classic example' },
        { input: [[0, 0, 0], 1], expectedOutput: 0, description: 'only one possible triplet' },
        { input: [[1, 1, 1, 0], -100], expectedOutput: 2, description: 'target far below any achievable sum' },
      ],
    },
    hints: {
      hints: [
        'Sort the array first — once sorted, fixing one element and two-pointering the rest lets you search each remaining pair in linear time instead of quadratic.',
        'For each fixed first element `nums[i]`, use two pointers (just after i, and at the end of the array) that move toward each other, always tracking the best (closest to target) sum seen.',
        'If the current three-sum is less than target, moving the left pointer right increases the sum; if it is greater, moving the right pointer left decreases it — this mirrors classic 3Sum, just optimizing for "closest" instead of "exactly equal".',
      ],
    },
    solution: {
      algorithm:
        `Step 1: Sort the values.
Step 2: Fix one number at index i.
Step 3: Use left and right pointers for the remaining two numbers.
Step 4: Move left when the sum is too small, right when it is too large, while keeping the closest sum seen.

Why this is easy: after sorting, one pointer can increase the sum and the other can decrease it.

Core idea from the original solution:
Sort \`nums\`. Initialize \`closestSum\` to the sum of the first three elements. For each index \`i\` from 0 to length-3, use two pointers \`left = i+1\` and \`right = length-1\`: compute \`sum = nums[i] + nums[left] + nums[right]\`, update \`closestSum\` if this sum is nearer to \`target\`, and if \`sum === target\` return immediately (cannot do better). Otherwise move \`left\` right if \`sum < target\` (to increase it) or \`right\` left if \`sum > target\` (to decrease it). Return \`closestSum\` after all \`i\` are exhausted.`,
      dryRun:
        `nums = [-1,2,1,-4], target=1
Sorted = [-4,-1,1,2]
Fix -4: sums -3, -1 → -1 is closer.
Fix -1: sum 2 → distance 1, so answer becomes 2.
2 is the closest possible sum.

Interview tip: trace the key pointer/state change rather than trying to simulate every line.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function threeSumClosest(nums, target) {
  const values = new Array(nums.length);

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    let j = i - 1;

    while (j >= 0 && values[j] > value) {
      values[j + 1] = values[j];
      j--;
    }

    values[j + 1] = value;
  }

  let closest = values[0] + values[1] + values[2];

  for (let i = 0; i < values.length - 2; i++) {
    let left = i + 1;
    let right = values.length - 1;

    while (left < right) {
      const sum = values[i] + values[left] + values[right];

      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }

      if (sum === target) return sum;
      if (sum < target) left++;
      else right--;
    }
  }

  return closest;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function threeSumClosestUsingBuiltIns(nums, target) {
  const sorted = [...nums].sort((a, b) => a - b);
  let closest = sorted[0] + sorted[1] + sorted[2];

  for (let i = 0; i < sorted.length - 2; i++) {
    let left = i + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];

      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }

      if (sum === target) return sum;
      if (sum < target) left++;
      else right--;
    }
  }

  return closest;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function threeSumClosest(nums: number[], target: number): number {
  const values = new Array<number>(nums.length);

  // Manual insertion sort so the core solution does not depend on sort().
  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]!;
    let j = i - 1;

    while (j >= 0 && values[j]! > value) {
      values[j + 1] = values[j]!;
      j--;
    }

    values[j + 1] = value;
  }

  let closest = values[0]! + values[1]! + values[2]!;

  for (let i = 0; i < values.length - 2; i++) {
    let left = i + 1;
    let right = values.length - 1;

    while (left < right) {
      const sum = values[i]! + values[left]! + values[right]!;

      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }

      if (sum === target) return sum;

      if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return closest;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function threeSumClosestUsingBuiltIns(
  nums: number[],
  target: number,
): number {
  const sorted = [...nums].sort((a, b) => a - b);
  let closest = sorted[0]! + sorted[1]! + sorted[2]!;

  for (let i = 0; i < sorted.length - 2; i++) {
    let left = i + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const sum = sorted[i]! + sorted[left]! + sorted[right]!;

      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }

      if (sum === target) return sum;

      if (sum < target) left++;
      else right--;
    }
  }

  return closest;
}`,
      timeComplexity: 'O(n²) — O(n log n) to sort, then O(n) outer loop times O(n) two-pointer inner scan.',
      spaceComplexity: 'O(n) for the sorted copy (O(log n) to O(n) depending on the sort implementation\'s internal space), O(1) beyond that.',
      commonMistakes: [
        'Using an O(n³) brute-force triple-nested loop instead of sorting plus two pointers.',
        'Comparing `sum` to `closestSum` directly instead of comparing `Math.abs(sum - target)` to `Math.abs(closestSum - target)` — "closest" means smallest absolute distance, not smallest or largest sum.',
        'Not returning immediately when `sum === target`, which is safe (it cannot get any closer) but skipping it just wastes remaining iterations rather than causing incorrectness — a genuine mistake is forgetting the tie-break logic entirely and only checking `<` sums.',
      ],
      followUpQuestions: [
        'How would you return the actual triplet of values, not just their sum?',
        'How would you extend this to "4Sum Closest" or general "kSum Closest"?',
        'How would you handle the case where multiple *different* triplets achieve the exact closest sum — does the problem care which one you report?',
      ],
      similarQuestions: ['3Sum', '4Sum', 'Two Sum II — Input Array Is Sorted'],
    },
  },

  {
    detail: {
      id: 'dsa-coding-m3-5',
      questionNumber: 'DSACODE-M3-5',
      title: '132 Pattern',
      difficulty: 'Hard',
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
        'Given an array of integers `nums`, return true if there exists a "132 pattern": three indices `i < j < k` such that `nums[i] < nums[k] < nums[j]`.',
      input: 'nums: number[]',
      output: 'boolean — true if a 132 pattern exists anywhere in nums',
      constraints: ['1 <= nums.length <= 2 * 10^5', '-10^9 <= nums[i] <= 10^9'],
      examples: [
        { input: '[3, 1, 4, 2]', output: 'true', explanation: 'i=1 (1), j=2 (4), k=3 (2): 1 < 2 < 4.' },
        { input: '[1, 2, 3, 4]', output: 'false', explanation: 'A strictly increasing array can never contain a "dip then rise then partial fall" pattern.' },
        { input: '[-1, 3, 2, 0]', output: 'true', explanation: 'i=0 (-1), j=1 (3), k=2 (2): -1 < 2 < 3.' },
      ],
      edgeCases: [
        { case: 'Array shorter than 3 elements', expected: 'No triplet is possible — returns false' },
        { case: 'Strictly decreasing array', expected: 'No 132 pattern can form — returns false' },
        { case: 'Pattern only forms using the last three elements', expected: 'Still detected correctly, regardless of position' },
      ],
      functionName: 'find132pattern',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 1, 4, 2]], expectedOutput: true, description: 'classic 132 pattern present' },
        { input: [[1, 2, 3, 4]], expectedOutput: false, description: 'strictly increasing, no pattern' },
        { input: [[-1, 3, 2, 0]], expectedOutput: true, description: 'pattern at the start of the array' },
        { input: [[1, 0, 1, -4, -3]], expectedOutput: false, description: 'no valid triplet despite ups and downs' },
      ],
      // The 132-pattern solution tracks `third` as a value, not as an array index.
      // initializing `let third = -Infinity`, indexing the array with a
      // non-integer sentinel value instead of comparing against it. The
      // fix (below, in solution.javascriptSolution) tracks `third` as the
      // *value* of the best-so-far middle ("2") element and compares
      // `nums[i] < third` directly.
    },
    hints: {
      hints: [
        'Scan from right to left, since the pattern reads i < j < k but the "3" (largest, `nums[j]`) has to be discovered before you can validate an "1" to its left.',
        'Maintain a monotonically decreasing stack of candidate "3" values (from the right). Whenever the current element would be a valid "1" for the best "2" found so far, the pattern exists.',
        'Every time you pop a smaller value off the stack because the current element is bigger, that popped value becomes your new candidate "2" (the best possible middle value discovered so far, since it is the largest value known to have something even larger to its right).',
      ],
    },
    solution: {
      algorithm:
        `Step 1: Scan from right to left.
Step 2: Keep a decreasing stack of possible '3' values.
Step 3: When a larger current value pops smaller stack values, the popped value becomes the best '2' candidate.
Step 4: If the current value is smaller than that '2' candidate, a 132 pattern exists.

Why this is easy: remember the pattern as 1 < 2 < 3 in value order, while the indices are i < j < k.

Core idea from the original solution:
Walk the array right to left, maintaining a stack of "3" candidates and a running value \`third\` (initialized to -Infinity) representing the best "2" found so far. At each index i: if \`nums[i] < third\`, a valid i (the "1") exists for an already-confirmed j/k pair, so return true immediately. Otherwise, while the stack top is less than \`nums[i]\`, pop it and set \`third\` to that popped value (nums[i] is acting as a new, larger "3" that makes the popped, smaller value a legitimate "2" for everything further left). Finally push \`nums[i]\` as a new "3" candidate. If the scan finishes with no early return, no pattern exists.`,
      dryRun:
        `nums = [3,1,4,2]
Start at 2 → stack=[2], middle=-Infinity.
At 4 → pop 2, so middle=2; stack=[4].
At 1 → 1 < 2, so 1 < 2 < 4 with correct index order.
Return true.

Interview tip: trace the key pointer/state change rather than trying to simulate every line.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function find132pattern(nums) {
  const stack = [];
  let middle = -Infinity;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < middle) return true;

    while (
      stack.length > 0 &&
      stack[stack.length - 1] < nums[i]
    ) {
      middle = stack.pop();
    }

    stack.push(nums[i]);
  }

  return false;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function find132patternUsingBuiltIns(nums) {
  const stack = [];
  let middle = -Infinity;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < middle) return true;

    while (
      stack.length > 0 &&
      stack[stack.length - 1] < nums[i]
    ) {
      middle = stack.pop();
    }

    stack.push(nums[i]);
  }

  return false;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function find132pattern(nums: number[]): boolean {
  const stack: number[] = [];
  let middle = -Infinity;

  for (let i = nums.length - 1; i >= 0; i--) {
    const current = nums[i]!;

    // current is the "1"; middle is the best "2".
    if (current < middle) return true;

    // Every popped value becomes a valid "2" because current
    // is larger and lies to its left in the original array.
    while (
      stack.length > 0 &&
      stack[stack.length - 1]! < current
    ) {
      middle = stack.pop()!;
    }

    stack.push(current);
  }

  return false;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function find132patternUsingBuiltIns(nums: number[]): boolean {
  const stack: number[] = [];
  let middle = -Infinity;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i]! < middle) return true;

    while (
      stack.length > 0 &&
      stack[stack.length - 1]! < nums[i]!
    ) {
      middle = stack.pop()!;
    }

    stack.push(nums[i]!);
  }

  return false;
}`,
      timeComplexity: 'O(n) — each element is pushed onto the stack exactly once and popped at most once.',
      spaceComplexity: 'O(n) — worst case, the stack holds every element (e.g. a strictly decreasing array).',
      commonMistakes: [
        'Indexing the array with `third` (e.g. `the stored middle value`) instead of comparing values directly — `third` is a *value* (the best "2" seen so far), not an index; this is the exact bug present in the original hand-written notes for this problem.',
        'Using a brute-force O(n³) or O(n²) approach (checking every i,j,k triplet, or every i,j pair with a running max) instead of the O(n) monotonic-stack technique.',
        'Popping from the stack without updating `third` to the popped value — `third` must always reflect the largest value known to have a bigger element to its right, which is exactly what gets discarded from the stack.',
      ],
      followUpQuestions: [
        'How would you return the actual triplet of indices (i, j, k) instead of just true/false?',
        'How would this generalize to a "1-3-2-4" or longer alternating pattern?',
        'Why does scanning right-to-left with a monotonic stack work here, but scanning left-to-right with the same idea does not directly translate?',
      ],
      similarQuestions: ['Next Greater Element I', 'Next Greater Element II', 'Daily Temperatures'],
    },
  },
];