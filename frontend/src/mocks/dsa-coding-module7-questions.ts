// Hand-authored coding questions derived from the "Recurrsion" section of
// the DSA notes dump (Module 7 — Recursion & Backtracking). Unlike the
// auto-generated MockTechnicalQuestion files, these are real
// CodingQuestionDetail problems: every sampleTests entry has been checked
// against the reference solution below by actually running it in Node, and
// both the JavaScript and TypeScript solutions are genuine, working code
// (no placeholder "solve(input)" stubs). The dump's "Subset Sums" snippet
// had syntax errors (an unscoped `arr`/`result`, an unmatched paren) and
// was reimplemented from scratch rather than ported literally; N-Queens had
// no code in the dump at all and was implemented fresh.

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

const CATEGORY = 'Recursion & Backtracking';
const CONCEPTS = ['Recursion', 'Backtracking', 'Time Complexity', 'Space Complexity', 'Pruning'];

export const MOCK_DSA_CODING_MODULE7_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m7-1',
      questionNumber: 'DSACODE-M7-1',
      title: 'Letter Combinations of a Phone Number',
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
        'Given a string `digits` containing digits from 2-9 (as on a phone keypad), return all possible letter combinations the number could represent, in any order that matches the standard left-to-right digit/letter enumeration.',
      input: 'digits: string — a string of digits 2-9 (may be empty)',
      output: 'string[] — every possible letter combination',
      constraints: ['0 <= digits.length <= 4', 'digits[i] is one of "2".."9"'],
      examples: [
        { input: '"23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', explanation: '2 maps to "abc", 3 maps to "def"; combine every letter of 2 with every letter of 3.' },
        { input: '""', output: '[]', explanation: 'No digits means no combinations at all (not [""]).' },
        { input: '"2"', output: '["a","b","c"]', explanation: 'A single digit just returns its own letters.' },
      ],
      edgeCases: [
        { case: 'Empty string', expected: 'Returns [], not [""]' },
        { case: 'Single digit', expected: 'Returns that digit\'s letters, one combination per letter' },
        { case: 'Digit "7" or "9" (four letters each)', expected: 'Branches into 4 choices at that position instead of 3' },
      ],
      functionName: 'letterCombinations',
      isClassBased: false,
      sampleTests: [
        { input: ['23'], expectedOutput: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'], description: 'two digits, 3x3 combinations' },
        { input: [''], expectedOutput: [], description: 'empty input' },
        { input: ['2'], expectedOutput: ['a', 'b', 'c'], description: 'single digit' },
        { input: ['79'], expectedOutput: ['pw','px','py','pz','qw','qx','qy','qz','rw','rx','ry','rz','sw','sx','sy','sz'], description: 'two four-letter digits (7 and 9)' },
      ],
    },
    hints: {
      hints: [
        'Build a map from digit to its letters, then recurse one digit at a time, appending one letter to the growing combination at each level.',
        'The recursion depth equals `digits.length`; a base case fires once the built string reaches that length.',
        'Guard the empty-string input explicitly and return [] before recursing — an empty input has zero valid combinations, not one empty combination.',
      ],
    },
    solution: {
      algorithm:
        'Map each digit to its letters. Recurse with (index, currentCombination): if currentCombination.length equals digits.length, push it and return; otherwise, for every letter mapped to digits[index], recurse with index+1 and the letter appended. Explicitly return [] up front when digits is empty.',
      dryRun:
        'digits="23"\nhelper(0,"")\n  for c of "abc": helper(1,"a"|"b"|"c")\n    for d of "def": helper(2, "ad"/"ae"/"af"/...)\n      length===2 → push\nresult=["ad","ae","af","bd","be","bf","cd","ce","cf"]',
      javascriptSolution: `function letterCombinations(digits) {
  if (!digits || digits.length === 0) return [];

  const map = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz',
  };
  const result = [];

  function helper(index, current) {
    if (current.length === digits.length) {
      result.push(current);
      return;
    }
    for (const letter of map[digits[index]]) {
      helper(index + 1, current + letter);
    }
  }

  helper(0, '');
  return result;
}`,
      typescriptSolution: `function letterCombinations(digits: string): string[] {
  if (!digits || digits.length === 0) return [];

  const map: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz',
  };
  const result: string[] = [];

  function helper(index: number, current: string): void {
    if (current.length === digits.length) {
      result.push(current);
      return;
    }
    for (const letter of map[digits[index]!]!) {
      helper(index + 1, current + letter);
    }
  }

  helper(0, '');
  return result;
}`,
      timeComplexity: 'O(4^n · n) — up to 4 branches per digit (digits 7 and 9), n digits deep, and each combination costs O(n) to build/copy.',
      spaceComplexity: 'O(n) recursion depth plus O(4^n · n) for the output.',
      commonMistakes: [
        'Returning [""] instead of [] for an empty input string.',
        'Hard-coding only 3 letters per digit, which breaks for "7" and "9" (4 letters each).',
        'Mutating a shared array/string across recursive calls instead of passing the growing combination by value.',
      ],
      followUpQuestions: [
        'How would you generate combinations lazily (one at a time) instead of building the whole array up front, for a very long digit string?',
        'How would you solve this iteratively using a queue/BFS instead of recursion?',
        'How would the branching factor change if the keypad mapped digits to a variable number of letters, e.g. an internationalized keypad?',
      ],
      similarQuestions: ['Generate Parentheses', 'Combination Sum', 'Permutations'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-2',
      questionNumber: 'DSACODE-M7-2',
      title: 'Combinations',
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
        'Given two integers `n` and `k`, return all possible combinations of `k` distinct numbers chosen from the range `[1, n]`, in any order.',
      input: 'n: number, k: number',
      output: 'number[][] — every k-length combination of numbers from 1..n',
      constraints: ['1 <= n <= 12', '0 <= k <= n'],
      examples: [
        { input: 'n = 4, k = 2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]', explanation: 'Every 2-element subset of {1,2,3,4}, listed in increasing order within each combination.' },
        { input: 'n = 1, k = 1', output: '[[1]]', explanation: 'Only one number available, one combination.' },
        { input: 'n = 4, k = 0', output: '[[]]', explanation: 'Choosing 0 elements has exactly one (empty) combination.' },
      ],
      edgeCases: [
        { case: 'k equals n', expected: 'Returns exactly one combination containing every number' },
        { case: 'k is 0', expected: 'Returns [[]] — one empty combination, not []' },
        { case: 'k is 1', expected: 'Returns n single-element combinations' },
      ],
      functionName: 'combine',
      isClassBased: false,
      sampleTests: [
        { input: [4, 2], expectedOutput: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]], description: 'classic n=4, k=2' },
        { input: [1, 1], expectedOutput: [[1]], description: 'single number, single choice' },
        { input: [3, 3], expectedOutput: [[1, 2, 3]], description: 'k equals n' },
        { input: [3, 1], expectedOutput: [[1], [2], [3]], description: 'k is 1' },
      ],
    },
    hints: {
      hints: [
        'Backtrack with a `start` pointer so each recursive call only considers numbers from `start` up to `n` — this naturally avoids duplicate combinations like [1,2] and [2,1].',
        'The base case fires when the running combination reaches length k; push a copy of it.',
        'You can prune early: if the remaining numbers (n - i + 1) are fewer than what is still needed, stop trying further i in that loop.',
      ],
    },
    solution: {
      algorithm:
        'Backtrack with helper(start): if the running combination has length k, record a copy and return. Otherwise, for i from start to n, push i, recurse with start = i + 1 (so numbers are never reused or reordered), then pop i to backtrack.',
      dryRun:
        'n=4,k=2\nhelper(1): ds=[]\n  i=1: ds=[1], helper(2): i=2 ds=[1,2] → push [1,2]; i=3 ds=[1,3] → push [1,3]; i=4 ds=[1,4] → push [1,4]\n  i=2: ds=[2], helper(3): i=3 → push [2,3]; i=4 → push [2,4]\n  i=3: ds=[3], helper(4): i=4 → push [3,4]\n  i=4: ds=[4], helper(5): loop does not run (5>4)\nresult=[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]',
      javascriptSolution: `function combine(n, k) {
  const result = [];
  const ds = [];

  function helper(start) {
    if (ds.length === k) {
      result.push([...ds]);
      return;
    }
    for (let i = start; i <= n; i++) {
      ds.push(i);
      helper(i + 1);
      ds.pop();
    }
  }

  helper(1);
  return result;
}`,
      typescriptSolution: `function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const ds: number[] = [];

  function helper(start: number): void {
    if (ds.length === k) {
      result.push([...ds]);
      return;
    }
    for (let i = start; i <= n; i++) {
      ds.push(i);
      helper(i + 1);
      ds.pop();
    }
  }

  helper(1);
  return result;
}`,
      timeComplexity: 'O(k · C(n, k)) — one combination is produced per valid path, each costing O(k) to copy.',
      spaceComplexity: 'O(k) recursion depth/working array, plus O(k · C(n, k)) for the output.',
      commonMistakes: [
        'Starting the inner loop at 1 instead of `start`, which produces duplicate combinations in different orders (e.g. both [1,2] and [2,1]).',
        'Forgetting to copy `ds` with `[...ds]` before pushing it, so every entry in the result ends up pointing at the same mutated array.',
        'Not pruning when the remaining candidates can never fill out the combination, which is correct but wastes time on large n.',
      ],
      followUpQuestions: [
        'How would you add the pruning condition explicitly (skip i once n - i + 1 < k - ds.length)?',
        'How would this change to generate combinations of a general array instead of the range [1, n]?',
        'How would you generate the combinations iteratively instead of recursively?',
      ],
      similarQuestions: ['Subsets', 'Combination Sum', 'Permutations'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-3',
      questionNumber: 'DSACODE-M7-3',
      title: 'Subset Sums',
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
        'Given an array of integers, print/return the sum of every possible subset (including the empty subset, whose sum is 0, and including duplicate sums produced by different subsets), sorted in ascending order.',
      input: 'arr: number[]',
      output: 'number[] — the sums of all 2^n subsets, sorted ascending',
      constraints: ['0 <= arr.length <= 15', '0 <= arr[i] <= 10^4'],
      examples: [
        { input: '[1, 2, 3]', output: '[0, 1, 2, 3, 3, 4, 5, 6]', explanation: 'The 8 subsets of {1,2,3} sum to 0 (∅), 1, 2, 3(={3}), 3(={1,2}), 4, 5, 6.' },
        { input: '[5]', output: '[0, 5]', explanation: 'The empty subset (0) and {5}.' },
        { input: '[]', output: '[0]', explanation: 'Only the empty subset exists, summing to 0.' },
      ],
      edgeCases: [
        { case: 'Empty array', expected: 'Returns [0] — just the empty subset' },
        { case: 'Duplicate values in the array', expected: 'Different subsets can legitimately produce the same sum; both are kept' },
        { case: 'All zeros', expected: 'Every one of the 2^n sums is 0' },
      ],
      functionName: 'subsetSums',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3]], expectedOutput: [0, 1, 2, 3, 3, 4, 5, 6], description: 'classic three-element case' },
        { input: [[5]], expectedOutput: [0, 5], description: 'single element' },
        { input: [[]], expectedOutput: [0], description: 'empty array' },
        { input: [[0, 0]], expectedOutput: [0, 0, 0, 0], description: 'all zeros — every subset sums to 0' },
      ],
    },
    hints: {
      hints: [
        'At every index there are exactly two choices: include the element in the running sum, or skip it — that is the entire recursion.',
        'The base case is reaching the end of the array; that is when you record the accumulated sum, not before.',
        'There are always exactly 2^n results (2 choices per element); sort them at the very end rather than trying to build them in order.',
      ],
    },
    solution: {
      algorithm:
        'Recurse with (index, sum): once index reaches arr.length, record sum. Otherwise branch twice — once including arr[index] in the running sum, once skipping it — each advancing to index + 1. Sort the collected sums ascending before returning.',
      dryRun:
        'arr=[1,2,3]\nhelper(0,0)\n  include 1 → helper(1,1)\n    include 2 → helper(2,3)\n      include 3 → helper(3,6) → record 6\n      skip 3 → helper(3,3) → record 3\n    skip 2 → helper(2,1)\n      include 3 → helper(3,4) → record 4\n      skip 3 → helper(3,1) → record 1\n  skip 1 → helper(1,0)\n    include 2 → helper(2,2) → include3→record5, skip3→record2\n    skip 2 → helper(2,0) → include3→record3, skip3→record0\nsums=[6,3,4,1,5,2,3,0] → sorted=[0,1,2,3,3,4,5,6]',
      javascriptSolution: `function subsetSums(arr) {
  const sums = [];

  function helper(index, sum) {
    if (index === arr.length) {
      sums.push(sum);
      return;
    }
    helper(index + 1, sum + arr[index]);
    helper(index + 1, sum);
  }

  helper(0, 0);
  return sums.sort((a, b) => a - b);
}`,
      typescriptSolution: `function subsetSums(arr: number[]): number[] {
  const sums: number[] = [];

  function helper(index: number, sum: number): void {
    if (index === arr.length) {
      sums.push(sum);
      return;
    }
    helper(index + 1, sum + arr[index]!);
    helper(index + 1, sum);
  }

  helper(0, 0);
  return sums.sort((a, b) => a - b);
}`,
      timeComplexity: 'O(2^n) — two branches per element, n elements deep.',
      spaceComplexity: 'O(n) recursion depth, plus O(2^n) for the output array.',
      commonMistakes: [
        'Deduplicating the sums — the problem wants every subset\'s sum, including repeats from different subsets, not a distinct set of sums.',
        'Forgetting the empty subset (sum 0), e.g. by starting the base case check too late or too early.',
        'Passing a mutable running-sum variable by reference across both branches instead of threading it as a plain parameter, causing the two branches to interfere with each other.',
      ],
      followUpQuestions: [
        'How would you return the actual subsets themselves, not just their sums (see the "Subsets" problem)?',
        'How would you count, rather than list, how many subsets sum to a specific target?',
        'How would this scale if n were much larger, e.g. 40 — what technique avoids 2^40 work (meet in the middle)?',
      ],
      similarQuestions: ['Subsets', 'Subsets II', 'Partition Equal Subset Sum'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-4',
      questionNumber: 'DSACODE-M7-4',
      title: 'Subsets',
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
        'Given an integer array `nums` of unique elements, return all possible subsets (the power set).',
      input: 'nums: number[] — distinct integers',
      output: 'number[][] — every subset of nums, including [] and nums itself',
      constraints: ['0 <= nums.length <= 10', 'All elements of nums are unique'],
      examples: [
        { input: '[1, 2, 3]', output: '[[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3],[]]', explanation: 'All 8 subsets of a 3-element set, in include/exclude recursion order.' },
        { input: '[]', output: '[[]]', explanation: 'The only subset of an empty set is the empty set itself.' },
        { input: '[7]', output: '[[7],[]]', explanation: 'A single element has exactly two subsets.' },
      ],
      edgeCases: [
        { case: 'Empty input array', expected: 'Returns [[]] — one subset, the empty one' },
        { case: 'Single element', expected: 'Returns two subsets: the element and []' },
        { case: 'All elements distinct (guaranteed)', expected: 'No special deduplication is needed, unlike Subsets II' },
      ],
      functionName: 'subsets',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3]], expectedOutput: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], []], description: 'classic three-element power set' },
        { input: [[]], expectedOutput: [[]], description: 'empty input' },
        { input: [[7]], expectedOutput: [[7], []], description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'This is the same include/exclude recursion as Subset Sums, but instead of accumulating a running sum you accumulate a running array.',
        'The base case is reaching the end of the input; that is where you record a *copy* of the current running subset.',
        'There are always 2^n subsets — no filtering or deduplication is needed since every element is unique.',
      ],
    },
    solution: {
      algorithm:
        'Recurse with index: once index === nums.length, push a copy of the running subset `ds`. Otherwise branch twice — push nums[index] onto ds and recurse (include), then pop it and recurse again without it (exclude).',
      dryRun:
        'nums=[1,2,3]\nhelper(0), ds=[]\n  include 1: ds=[1], helper(1)\n    include 2: ds=[1,2], helper(2)\n      include 3: ds=[1,2,3] → push\n      exclude 3: ds=[1,2] → push\n    exclude 2: ds=[1], helper(2)\n      include 3: ds=[1,3] → push\n      exclude 3: ds=[1] → push\n  exclude 1: ds=[], helper(1) → similarly produces [2,3],[2],[3],[]\nresult=[[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3],[]]',
      javascriptSolution: `function subsets(nums) {
  const result = [];
  const ds = [];

  function helper(index) {
    if (index === nums.length) {
      result.push([...ds]);
      return;
    }
    ds.push(nums[index]);
    helper(index + 1);
    ds.pop();
    helper(index + 1);
  }

  helper(0);
  return result;
}`,
      typescriptSolution: `function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const ds: number[] = [];

  function helper(index: number): void {
    if (index === nums.length) {
      result.push([...ds]);
      return;
    }
    ds.push(nums[index]!);
    helper(index + 1);
    ds.pop();
    helper(index + 1);
  }

  helper(0);
  return result;
}`,
      timeComplexity: 'O(n · 2^n) — 2^n subsets, each up to O(n) to copy.',
      spaceComplexity: 'O(n) recursion depth, plus O(n · 2^n) for the output.',
      commonMistakes: [
        'Pushing the live `ds` reference instead of a copy, so every result entry ends up aliasing the same backtracked array.',
        'Recording the subset only at the include branch, missing the exclude-only paths.',
        'Trying to sort or dedupe the output — for distinct input elements this is unnecessary work.',
      ],
      followUpQuestions: [
        'How would this change if nums could contain duplicates (see Subsets II)?',
        'How would you generate subsets iteratively by doubling the result list at each step instead of recursing?',
        'How would you generate subsets using bitmasking, where each of the 2^n integers from 0 to 2^n-1 encodes one subset?',
      ],
      similarQuestions: ['Subsets II', 'Subset Sums', 'Combinations'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-5',
      questionNumber: 'DSACODE-M7-5',
      title: 'Subsets II',
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
        'Given an integer array `nums` that may contain duplicates, return all possible subsets without any duplicate subset appearing twice in the result.',
      input: 'nums: number[] — may contain duplicate values',
      output: 'number[][] — every distinct subset of nums',
      constraints: ['0 <= nums.length <= 10', '-10 <= nums[i] <= 10'],
      examples: [
        { input: '[1, 2, 2]', output: '[[],[1],[1,2],[1,2,2],[2],[2,2]]', explanation: 'Sorting first, then skipping consecutive duplicate values at the same recursion depth avoids emitting [1,2] twice.' },
        { input: '[0]', output: '[[],[0]]', explanation: 'Single element, two subsets.' },
        { input: '[]', output: '[[]]', explanation: 'Only the empty subset.' },
      ],
      edgeCases: [
        { case: 'All elements identical, e.g. [2,2,2]', expected: 'Only n+1 distinct subsets are produced ([], [2], [2,2], [2,2,2]), not 2^n' },
        { case: 'No duplicates at all', expected: 'Behaves identically to plain Subsets' },
        { case: 'Empty array', expected: 'Returns [[]]' },
      ],
      functionName: 'subsetsWithDup',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 2]], expectedOutput: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]], description: 'one duplicate pair' },
        { input: [[2, 2, 2]], expectedOutput: [[], [2], [2, 2], [2, 2, 2]], description: 'all elements identical' },
        { input: [[]], expectedOutput: [[]], description: 'empty array' },
        { input: [[4, 4, 4, 1, 4]], expectedOutput: [[], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4], [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]], description: 'unsorted input with repeats — sorted internally' },
      ],
    },
    hints: {
      hints: [
        'Sort the array first — this groups equal values together so duplicates can be detected by comparing adjacent elements.',
        'Record every prefix as a valid subset up front (push a copy of `ds` at the start of every call), then branch over which element to add next, starting from the current index.',
        'At each recursion level, skip a candidate if it equals the previous candidate tried *at that same level* (`i > index && sorted[i] === sorted[i-1]`) — this is what prevents duplicate subsets, without needing to dedupe the final result.',
      ],
    },
    solution: {
      algorithm:
        'Sort nums first. Recurse with (index): record a copy of the current subset ds immediately (every prefix, including the initial empty one, is a valid subset). Then for i from index to the end, skip if sorted[i] equals sorted[i-1] and i > index (avoids reusing the same value at the same decision point); otherwise push sorted[i], recurse with i + 1, and pop to backtrack.',
      dryRun:
        'sorted=[1,2,2]\nhelper(0): record []\n  i=0(val1): ds=[1], helper(1): record [1]\n    i=1(val2): ds=[1,2], helper(2): record [1,2]\n      i=2(val2): ds=[1,2,2], helper(3): record [1,2,2]\n    i=2(val2): skip, sorted[2]===sorted[1] and i>index\n  i=1(val2): ds=[2], helper(2): record [2]\n    i=2(val2): ds=[2,2], helper(3): record [2,2]\n  i=2(val2): skip, sorted[2]===sorted[1] and i>index\nresult=[[],[1],[1,2],[1,2,2],[2],[2,2]]',
      javascriptSolution: `function subsetsWithDup(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];
  const ds = [];

  function helper(index) {
    result.push([...ds]);
    for (let i = index; i < sorted.length; i++) {
      if (i > index && sorted[i] === sorted[i - 1]) continue;
      ds.push(sorted[i]);
      helper(i + 1);
      ds.pop();
    }
  }

  helper(0);
  return result;
}`,
      typescriptSolution: `function subsetsWithDup(nums: number[]): number[][] {
  const sorted = [...nums].sort((a, b) => a - b);
  const result: number[][] = [];
  const ds: number[] = [];

  function helper(index: number): void {
    result.push([...ds]);
    for (let i = index; i < sorted.length; i++) {
      if (i > index && sorted[i] === sorted[i - 1]) continue;
      ds.push(sorted[i]!);
      helper(i + 1);
      ds.pop();
    }
  }

  helper(0);
  return result;
}`,
      timeComplexity: 'O(n · 2^n) worst case (no duplicates) — bounded by the number of distinct subsets, each up to O(n) to copy.',
      spaceComplexity: 'O(n) recursion depth, plus space for the output.',
      commonMistakes: [
        'Forgetting to sort first — the adjacent-duplicate skip only works when equal values are next to each other.',
        'Using a Set of stringified subsets to dedupe after the fact, which works but is far less efficient than pruning during the recursion.',
        'Writing the duplicate-skip check as `sorted[i] === sorted[i-1]` without the `i > index` guard, which would incorrectly also skip picking the *first* occurrence of a repeated value.',
      ],
      followUpQuestions: [
        'Why does `i > index` matter in the duplicate-skip condition — what breaks if you drop it?',
        'How would you count just the number of distinct subsets without materializing all of them?',
        'How does this same "sort + skip adjacent duplicates at the same level" pattern generalize to Combination Sum II and Permutations II?',
      ],
      similarQuestions: ['Subsets', 'Combination Sum II', 'Permutations II'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-6',
      questionNumber: 'DSACODE-M7-6',
      title: 'Combination Sum',
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
        'Given an array of distinct positive integers `candidates` and a target integer, return all unique combinations of candidates that sum to target. The same number may be chosen an unlimited number of times.',
      input: 'candidates: number[] — distinct positive integers, target: number',
      output: 'number[][] — every combination (each in non-decreasing order) summing to target',
      constraints: ['1 <= candidates.length <= 30', '1 <= candidates[i] <= 200', 'All elements of candidates are distinct', '1 <= target <= 500'],
      examples: [
        { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]', explanation: '2+2+3=7 (2 reused) and 7 alone.' },
        { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]', explanation: 'Three ways to reach 8 by reusing values freely.' },
        { input: 'candidates = [2], target = 1', output: '[]', explanation: 'No combination of 2s can ever sum to 1.' },
      ],
      edgeCases: [
        { case: 'No combination sums to target', expected: 'Returns []' },
        { case: 'A single candidate equals target exactly', expected: 'That candidate alone forms a valid combination' },
        { case: 'target is smaller than every candidate', expected: 'Returns []' },
      ],
      functionName: 'combinationSum',
      isClassBased: false,
      sampleTests: [
        { input: [[2, 3, 6, 7], 7], expectedOutput: [[2, 2, 3], [7]], description: 'classic case, reuse allowed' },
        { input: [[2, 3, 5], 8], expectedOutput: [[2, 2, 2, 2], [2, 3, 3], [3, 5]], description: 'three distinct combinations' },
        { input: [[2], 1], expectedOutput: [], description: 'no valid combination exists' },
        { input: [[3], 3], expectedOutput: [[3]], description: 'single candidate equals target' },
      ],
    },
    hints: {
      hints: [
        'Sort the candidates first so you can break out of the loop early once a candidate exceeds the remaining target (pruning).',
        'Since a number can be reused, when you recurse after picking candidates[i], pass `i` again as the next start index, not `i + 1`.',
        'The base case is remaining === 0 (record the combination); if remaining goes negative, that branch is invalid and should simply not recurse further (sorting + the pruning break handles this for free).',
      ],
    },
    solution: {
      algorithm:
        'Sort candidates ascending. Recurse with (start, remaining): if remaining === 0, record a copy of ds. Otherwise, for i from start to the end, if candidates[i] > remaining, break (sorted, so nothing further can work either); otherwise push candidates[i], recurse with (i, remaining - candidates[i]) — reusing index i allows the same value again — then pop to backtrack.',
      dryRun:
        'sorted=[2,3,6,7], target=7\nhelper(0,7)\n  i=0(2): ds=[2], helper(0,5)\n    i=0(2): ds=[2,2], helper(0,3)\n      i=0(2): ds=[2,2,2], helper(0,1) → 2>1 break, no result\n      i=1(3): ds=[2,2,3], helper(1,0) → remaining=0 → record [2,2,3]\n      i=2(6): 6>3 break\n    i=1(3): ds=[2,3], helper(1,2) → i=1(3):3>2 break; i=2(6):break → nothing\n    i=2(6): 6>5 break\n  i=1(3): ds=[3], helper(1,4) → similar, no full match found\n  i=2(6): ds=[6], helper(2,1) → break\n  i=3(7): ds=[7], helper(3,0) → record [7]\nresult=[[2,2,3],[7]]',
      javascriptSolution: `function combinationSum(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const result = [];
  const ds = [];

  function helper(start, remaining) {
    if (remaining === 0) {
      result.push([...ds]);
      return;
    }
    for (let i = start; i < sorted.length; i++) {
      if (sorted[i] > remaining) break;
      ds.push(sorted[i]);
      helper(i, remaining - sorted[i]);
      ds.pop();
    }
  }

  helper(0, target);
  return result;
}`,
      typescriptSolution: `function combinationSum(candidates: number[], target: number): number[][] {
  const sorted = [...candidates].sort((a, b) => a - b);
  const result: number[][] = [];
  const ds: number[] = [];

  function helper(start: number, remaining: number): void {
    if (remaining === 0) {
      result.push([...ds]);
      return;
    }
    for (let i = start; i < sorted.length; i++) {
      if (sorted[i]! > remaining) break;
      ds.push(sorted[i]!);
      helper(i, remaining - sorted[i]!);
      ds.pop();
    }
  }

  helper(0, target);
  return result;
}`,
      timeComplexity: 'O(2^target) worst case — bounded by the number of valid combinations, pruned heavily by sorting and the early break.',
      spaceComplexity: 'O(target / min(candidates)) recursion depth, plus space for the output.',
      commonMistakes: [
        'Recursing with `i + 1` instead of `i`, which forgets that unlimited reuse of the same candidate is allowed.',
        'Not sorting first, which loses the early-break pruning and (without it) can miss the natural non-decreasing order of each result combination.',
        'Continuing the loop after `sorted[i] > remaining` instead of breaking — without sorting, `continue` would be needed instead, but with sorting, `break` is strictly correct and faster.',
      ],
      followUpQuestions: [
        'How would this change if each candidate could be used at most once (see Combination Sum II)?',
        'How would you count the number of combinations without materializing all of them (a DP coin-change-style count)?',
        'How would you find just the single combination using the fewest numbers, rather than all combinations?',
      ],
      similarQuestions: ['Combination Sum II', 'Combination Sum III', 'Coin Change'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-7',
      questionNumber: 'DSACODE-M7-7',
      title: 'Combination Sum II',
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
        'Given a collection of candidate numbers `candidates` (which may contain duplicates) and a target integer, return all unique combinations where the candidates sum to target. Each number in candidates may only be used once per combination.',
      input: 'candidates: number[] — may contain duplicates, target: number',
      output: 'number[][] — every distinct combination summing to target, each candidate used at most once',
      constraints: ['1 <= candidates.length <= 100', '1 <= candidates[i] <= 50', '1 <= target <= 30'],
      examples: [
        { input: 'candidates = [10,1,2,7,6,1,5], target = 8', output: '[[1,1,6],[1,2,5],[1,7],[2,6]]', explanation: 'Four distinct combinations; the duplicate 1s allow [1,1,6] but not a duplicate [1,7] pair.' },
        { input: 'candidates = [2,5,2,1,2], target = 5', output: '[[1,2,2],[5]]', explanation: 'Three 2s are available but only two are used together; 5 alone also works.' },
        { input: 'candidates = [2], target = 1', output: '[]', explanation: 'No combination reaches 1.' },
      ],
      edgeCases: [
        { case: 'Multiple duplicate values in candidates', expected: 'Each is usable, but the same combination is never emitted twice' },
        { case: 'No combination sums to target', expected: 'Returns []' },
        { case: 'A single candidate equals target', expected: 'Included as a one-element combination' },
      ],
      functionName: 'combinationSum2',
      isClassBased: false,
      sampleTests: [
        { input: [[10, 1, 2, 7, 6, 1, 5], 8], expectedOutput: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]], description: 'classic case with duplicate 1s' },
        { input: [[2, 5, 2, 1, 2], 5], expectedOutput: [[1, 2, 2], [5]], description: 'repeated candidate used at most twice per combination' },
        { input: [[2], 1], expectedOutput: [], description: 'no valid combination' },
      ],
    },
    hints: {
      hints: [
        'Sort candidates first, both to enable the early-break pruning and to line up equal values so duplicates can be detected.',
        'Unlike Combination Sum, each element can be used at most once — so recurse with `i + 1`, not `i`.',
        'To avoid duplicate combinations, skip a candidate if it equals the previous one *and* the previous one was considered at the same recursion level (`i > start`), not if the previous one is simply still in `ds`.',
      ],
    },
    solution: {
      algorithm:
        'Sort candidates ascending. Recurse with (start, remaining): if remaining === 0, record ds. For i from start to the end: skip if i > start and sorted[i] === sorted[i-1] (avoids duplicate combinations); if sorted[i] > remaining, break (sorted, so nothing further helps); otherwise push sorted[i], recurse with (i + 1, remaining - sorted[i]) since each element is used once, then pop.',
      dryRun:
        'sorted=[1,1,2,5,6,7,10], target=8\nhelper(0,8)\n  i=0(1): ds=[1], helper(1,7)\n    i=1(1): ds=[1,1], helper(2,6)\n      i=2(2): ds=[1,1,2], helper(3,4) → 5>4 break eventually, no full match\n      i=3(5): ds=[1,1,5], helper(4,1) → 6>1 break\n      i=4(6): ds=[1,1,6], helper(5,0) → record [1,1,6]\n    i=2(2): ds=[1,2], helper(3,5)\n      i=3(5): ds=[1,2,5], helper(4,0) → record [1,2,5]\n    i=3(5): ds=[1,5], helper(4,2) → nothing fits\n    i=4(6): ds=[1,6], helper(5,1) → nothing\n    i=5(7): ds=[1,7], helper(6,0) → record [1,7]\n  i=1(1): skip (duplicate at same level, i>start)\n  i=2(2): ds=[2], helper(3,6)\n    i=4(6): ds=[2,6], helper(5,0) → record [2,6]\n  ... (5,6,7 alone or with smaller elements do not reach exactly 8 further)\nresult=[[1,1,6],[1,2,5],[1,7],[2,6]]',
      javascriptSolution: `function combinationSum2(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const result = [];
  const ds = [];

  function helper(start, remaining) {
    if (remaining === 0) {
      result.push([...ds]);
      return;
    }
    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      if (sorted[i] > remaining) break;
      ds.push(sorted[i]);
      helper(i + 1, remaining - sorted[i]);
      ds.pop();
    }
  }

  helper(0, target);
  return result;
}`,
      typescriptSolution: `function combinationSum2(candidates: number[], target: number): number[][] {
  const sorted = [...candidates].sort((a, b) => a - b);
  const result: number[][] = [];
  const ds: number[] = [];

  function helper(start: number, remaining: number): void {
    if (remaining === 0) {
      result.push([...ds]);
      return;
    }
    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      if (sorted[i]! > remaining) break;
      ds.push(sorted[i]!);
      helper(i + 1, remaining - sorted[i]!);
      ds.pop();
    }
  }

  helper(0, target);
  return result;
}`,
      timeComplexity: 'O(2^n) worst case, pruned significantly by sorting, the early break, and the duplicate skip.',
      spaceComplexity: 'O(n) recursion depth, plus space for the output.',
      commonMistakes: [
        'Recursing with `i` instead of `i + 1` — that reintroduces unlimited reuse, turning this back into (unbounded) Combination Sum.',
        'Writing the duplicate guard as `sorted[i] === sorted[i-1]` without `i > start`, which would also (incorrectly) skip using the very first occurrence of a repeated value in a fresh branch.',
        'Deduplicating the final result with a Set of stringified arrays instead of pruning during the recursion — correct but much slower.',
      ],
      followUpQuestions: [
        'What is the precise difference in the duplicate-skip logic between this problem and Subsets II — why is it the same pattern?',
        'How would you solve this without recursion, using dynamic programming over (index, remaining) with memoized subset lists?',
        'How would the algorithm need to change if negative candidates were allowed?',
      ],
      similarQuestions: ['Combination Sum', 'Subsets II', 'Permutations II'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-8',
      questionNumber: 'DSACODE-M7-8',
      title: 'Palindrome Partitioning',
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
        'Given a string `s`, partition it such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of s.',
      input: 's: string',
      output: 'string[][] — every way to split s into consecutive palindromic substrings',
      constraints: ['1 <= s.length <= 16', 's consists only of lowercase English letters'],
      examples: [
        { input: '"aab"', output: '[["a","a","b"],["aa","b"]]', explanation: 'Two valid ways: split into three single-char palindromes, or "aa" + "b".' },
        { input: '"a"', output: '[["a"]]', explanation: 'A single character is trivially a palindrome and the only partition.' },
        { input: '"aa"', output: '[["a","a"],["aa"]]', explanation: 'Either split into two singles or keep the whole palindrome together.' },
      ],
      edgeCases: [
        { case: 'Entire string is already a palindrome', expected: 'Includes the whole string as one of the partitions, plus any finer splits that are also all-palindrome' },
        { case: 'No two adjacent characters match', expected: 'Only the all-single-character partition is valid' },
        { case: 'Single character string', expected: 'Returns exactly one partition: [[that character]]' },
      ],
      functionName: 'partitionPalindrome',
      isClassBased: false,
      sampleTests: [
        { input: ['aab'], expectedOutput: [['a', 'a', 'b'], ['aa', 'b']], description: 'classic case with two valid partitions' },
        { input: ['a'], expectedOutput: [['a']], description: 'single character' },
        { input: ['aa'], expectedOutput: [['a', 'a'], ['aa']], description: 'two-character palindrome' },
      ],
    },
    hints: {
      hints: [
        'Backtrack over "cut points": at each position `start`, try every possible next substring s[start..end] and only recurse into it if that substring is itself a palindrome.',
        'The base case is `start === s.length` — every character has been consumed by some palindromic piece, so the accumulated partition is valid.',
        'A simple O(n) two-pointer check is enough to test whether a given substring is a palindrome; you don\'t need to precompute anything for small inputs.',
      ],
    },
    solution: {
      algorithm:
        'Recurse with (start): if start === s.length, record a copy of the running partition ds. Otherwise, for end from start to s.length - 1, take substring s[start..end]; if it is a palindrome, push it onto ds, recurse with (end + 1), then pop to backtrack and try the next end.',
      dryRun:
        's="aab"\nhelper(0)\n  end=0: "a" is palindrome → ds=["a"], helper(1)\n    end=1: "a" is palindrome → ds=["a","a"], helper(2)\n      end=2: "b" is palindrome → ds=["a","a","b"], helper(3) → record ["a","a","b"]\n    end=2: "ab" not palindrome, skip\n  end=1: "aa" is palindrome → ds=["aa"], helper(2)\n    end=2: "b" is palindrome → ds=["aa","b"], helper(3) → record ["aa","b"]\n  end=2: "aab" not palindrome, skip\nresult=[["a","a","b"],["aa","b"]]',
      javascriptSolution: `function partitionPalindrome(s) {
  const result = [];
  const ds = [];

  function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function helper(start) {
    if (start === s.length) {
      result.push([...ds]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      const substring = s.slice(start, end + 1);
      if (isPalindrome(substring)) {
        ds.push(substring);
        helper(end + 1);
        ds.pop();
      }
    }
  }

  helper(0);
  return result;
}`,
      typescriptSolution: `function partitionPalindrome(s: string): string[][] {
  const result: string[][] = [];
  const ds: string[] = [];

  function isPalindrome(str: string): boolean {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function helper(start: number): void {
    if (start === s.length) {
      result.push([...ds]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      const substring = s.slice(start, end + 1);
      if (isPalindrome(substring)) {
        ds.push(substring);
        helper(end + 1);
        ds.pop();
      }
    }
  }

  helper(0);
  return result;
}`,
      timeComplexity: 'O(n · 2^n) worst case — up to 2^n partitions of an all-same-character string, each palindrome check up to O(n).',
      spaceComplexity: 'O(n) recursion depth, plus space for the output.',
      commonMistakes: [
        'Checking whether the *whole remaining suffix* is a palindrome instead of just the candidate substring s[start..end], which produces wrong or missing partitions.',
        'Off-by-one errors in `s.slice(start, end + 1)` (forgetting the `+1` since slice\'s end is exclusive).',
        'Not backtracking (forgetting `ds.pop()`), which leaks entries from one branch into siblings.',
      ],
      followUpQuestions: [
        'How would you precompute an isPalindrome[i][j] DP table to avoid repeating O(n) palindrome checks across branches?',
        'How would you return only the partition with the *minimum* number of cuts, rather than all partitions?',
        'How would this generalize to partitioning based on a different predicate, not just "is a palindrome"?',
      ],
      similarQuestions: ['Palindrome Partitioning II', 'Word Break', 'Restore IP Addresses'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-9',
      questionNumber: 'DSACODE-M7-9',
      title: 'Permutations',
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
        'Given an array `nums` of distinct integers, return all possible permutations, in any order.',
      input: 'nums: number[] — distinct integers',
      output: 'number[][] — every permutation of nums',
      constraints: ['1 <= nums.length <= 6', 'All elements of nums are unique'],
      examples: [
        { input: '[1, 2, 3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', explanation: 'All 3! = 6 orderings of {1,2,3}.' },
        { input: '[0, 1]', output: '[[0,1],[1,0]]', explanation: 'Both orderings of a 2-element array.' },
        { input: '[5]', output: '[[5]]', explanation: 'A single element has exactly one permutation.' },
      ],
      edgeCases: [
        { case: 'Single element', expected: 'Returns exactly one permutation' },
        { case: 'Negative numbers', expected: 'Permuted the same way as positive numbers' },
        { case: 'Larger arrays (n=6)', expected: '720 permutations — still expected to complete quickly' },
      ],
      functionName: 'permute',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3]], expectedOutput: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]], description: 'all 6 orderings of 3 elements' },
        { input: [[0, 1]], expectedOutput: [[0, 1], [1, 0]], description: 'both orderings of 2 elements' },
        { input: [[5]], expectedOutput: [[5]], description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'Track which indices are already "used" in the current permutation with a boolean array, so you never reuse the same position twice within one permutation.',
        'At each level, try every not-yet-used element as the next slot, mark it used, recurse, then unmark it (backtrack) before trying the next candidate.',
        'The base case is when the running permutation reaches nums.length — record a copy of it.',
      ],
    },
    solution: {
      algorithm:
        'Maintain a `used` boolean array and a running array ds. Recurse: if ds.length === nums.length, record a copy. Otherwise, for every index i not yet used, mark used[i] = true, push nums[i] onto ds, recurse, then pop and unmark to backtrack, trying the next unused index.',
      dryRun:
        'nums=[1,2,3]\nhelper(), ds=[]\n  i=0(1): used=[T,F,F], ds=[1], helper()\n    i=1(2): ds=[1,2], helper()\n      i=2(3): ds=[1,2,3] → record [1,2,3]\n    i=2(3): ds=[1,3], helper()\n      i=1(2): ds=[1,3,2] → record [1,3,2]\n  i=1(2): ds=[2], ... → produces [2,1,3],[2,3,1]\n  i=2(3): ds=[3], ... → produces [3,1,2],[3,2,1]\nresult=[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
      javascriptSolution: `function permute(nums) {
  const result = [];
  const ds = [];
  const used = new Array(nums.length).fill(false);

  function helper() {
    if (ds.length === nums.length) {
      result.push([...ds]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      ds.push(nums[i]);
      helper();
      ds.pop();
      used[i] = false;
    }
  }

  helper();
  return result;
}`,
      typescriptSolution: `function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const ds: number[] = [];
  const used: boolean[] = new Array(nums.length).fill(false);

  function helper(): void {
    if (ds.length === nums.length) {
      result.push([...ds]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      ds.push(nums[i]!);
      helper();
      ds.pop();
      used[i] = false;
    }
  }

  helper();
  return result;
}`,
      timeComplexity: 'O(n · n!) — n! permutations, each O(n) to build/copy.',
      spaceComplexity: 'O(n) recursion depth/used array, plus O(n · n!) for the output.',
      commonMistakes: [
        'Forgetting to unmark `used[i] = false` after backtracking, which permanently excludes that index from later branches.',
        'Using a `start` index like Combinations instead of a `used` array — permutations need every unused element to be tryable at every position, not just ones after a cursor.',
        'Pushing the live `ds` reference into `result` instead of a copy.',
      ],
      followUpQuestions: [
        'How would this change if nums could contain duplicates (see Permutations II)?',
        'How would you generate the next permutation in lexicographic order without generating all of them?',
        'How would you generate permutations of only length k (k < n) instead of the full array?',
      ],
      similarQuestions: ['Permutations II', 'Next Permutation', 'Permutation Sequence'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-10',
      questionNumber: 'DSACODE-M7-10',
      title: 'Permutations II',
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
        'Given a collection of numbers `nums` that might contain duplicates, return all possible unique permutations, in any order.',
      input: 'nums: number[] — may contain duplicate values',
      output: 'number[][] — every distinct permutation of nums',
      constraints: ['1 <= nums.length <= 8', '-10 <= nums[i] <= 10'],
      examples: [
        { input: '[1, 1, 2]', output: '[[1,1,2],[1,2,1],[2,1,1]]', explanation: 'Only 3 distinct permutations exist, not 3! = 6, because the two 1s are indistinguishable.' },
        { input: '[1, 2]', output: '[[1,2],[2,1]]', explanation: 'No duplicates, behaves like plain Permutations.' },
        { input: '[3, 3, 3]', output: '[[3,3,3]]', explanation: 'All identical values collapse to a single permutation.' },
      ],
      edgeCases: [
        { case: 'All elements identical', expected: 'Returns exactly one permutation, not n!' },
        { case: 'Exactly one duplicated pair among otherwise distinct values', expected: 'Duplicate permutations from swapping the two equal elements are suppressed' },
        { case: 'No duplicates at all', expected: 'Behaves identically to plain Permutations' },
      ],
      functionName: 'permuteUnique',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 1, 2]], expectedOutput: [[1, 1, 2], [1, 2, 1], [2, 1, 1]], description: 'one duplicate pair' },
        { input: [[1, 2]], expectedOutput: [[1, 2], [2, 1]], description: 'no duplicates' },
        { input: [[3, 3, 3]], expectedOutput: [[3, 3, 3]], description: 'all identical values' },
      ],
    },
    hints: {
      hints: [
        'Sort nums first so equal values are adjacent, then use the same used-array backtracking as Permutations.',
        'At each position, skip a candidate value if it equals the previous value AND the previous one is currently unused — that specific combination means you would be generating a permutation identical to one already produced.',
        'The `!used[i-1]` half of the skip condition is what distinguishes "same value used earlier in this same branch" (fine) from "same value skipped at this exact decision point" (a duplicate).',
      ],
    },
    solution: {
      algorithm:
        'Sort nums ascending. Use a `used` boolean array and running array ds, same shape as Permutations. At each position, for i from 0 to n-1: skip if used[i]; also skip if i > 0 and sorted[i] === sorted[i-1] and !used[i-1] (this specific ordering prevents duplicate permutations while still allowing legitimate repeats of the same value across different positions). Otherwise mark used[i], push, recurse, pop, unmark.',
      dryRun:
        'sorted=[1,1,2]\nhelper(), ds=[]\n  i=0(1): used[0]=T, ds=[1], helper()\n    i=1(1): used[1]=T, ds=[1,1], helper()\n      i=2(2): ds=[1,1,2] → record\n    i=2(2): ds=[1,2], helper()\n      i=1(1): ds=[1,2,1] → record\n  i=1(1): sorted[1]===sorted[0] and !used[0] → skip\n  i=2(2): used[2]=T, ds=[2], helper()\n    i=0(1): ds=[2,1], helper()\n      i=1(1): ds=[2,1,1] → record\n    i=1(1): sorted[1]===sorted[0], used[0]=T now → not skipped, but used[1] already... (handled by used check)\nresult=[[1,1,2],[1,2,1],[2,1,1]]',
      javascriptSolution: `function permuteUnique(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];
  const ds = [];
  const used = new Array(sorted.length).fill(false);

  function helper() {
    if (ds.length === sorted.length) {
      result.push([...ds]);
      return;
    }
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      ds.push(sorted[i]);
      helper();
      ds.pop();
      used[i] = false;
    }
  }

  helper();
  return result;
}`,
      typescriptSolution: `function permuteUnique(nums: number[]): number[][] {
  const sorted = [...nums].sort((a, b) => a - b);
  const result: number[][] = [];
  const ds: number[] = [];
  const used: boolean[] = new Array(sorted.length).fill(false);

  function helper(): void {
    if (ds.length === sorted.length) {
      result.push([...ds]);
      return;
    }
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      ds.push(sorted[i]!);
      helper();
      ds.pop();
      used[i] = false;
    }
  }

  helper();
  return result;
}`,
      timeComplexity: 'O(n · n!) worst case (no duplicates) — bounded by the number of distinct permutations, pruned by the duplicate-skip.',
      spaceComplexity: 'O(n) recursion depth/used array, plus space for the output.',
      commonMistakes: [
        'Forgetting to sort first, which breaks the adjacent-duplicate check entirely.',
        'Using `used[i-1]` instead of `!used[i-1]` in the skip condition (or omitting it), which either produces duplicates or wrongly suppresses valid permutations.',
        'Deduplicating the final result with a Set instead of pruning in the recursion — correct but wastes exponential work before the dedupe.',
      ],
      followUpQuestions: [
        'Walk through exactly why `!used[i-1]` (not `used[i-1]`) is the correct condition — what would go wrong with the other one?',
        'How would you count the number of distinct permutations without generating them, using factorials and a frequency map?',
        'How would you adapt this to generate the k-th permutation directly, without generating all of them?',
      ],
      similarQuestions: ['Permutations', 'Subsets II', 'Next Permutation'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-11',
      questionNumber: 'DSACODE-M7-11',
      title: 'Rat in a Maze Problem - I',
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
        'Given an n x n binary grid where 1 means an open cell and 0 means a blocked cell, find all paths a rat can take from the top-left cell (0,0) to the bottom-right cell (n-1,n-1), moving up/down/left/right one cell at a time, never revisiting a cell in the same path. Return the paths as direction strings ("U","D","L","R"), sorted alphabetically. If the start cell itself is blocked, there are no valid paths.',
      input: 'grid: number[][] — an n x n grid of 0s and 1s',
      output: 'string[] — every valid path as a direction string, sorted alphabetically',
      constraints: ['1 <= n <= 5', 'grid[i][j] is 0 or 1'],
      examples: [
        { input: '[[1,0,0],[1,1,0],[0,1,1]]', output: '["DRDR"]', explanation: 'Exactly one path: down, right, down, right.' },
        { input: '[[1,0],[0,1]]', output: '[]', explanation: 'The rat is boxed in — no path reaches the bottom-right.' },
        { input: '[[1]]', output: '[""]', explanation: 'A 1x1 grid: start and end are the same cell, reached with zero moves.' },
      ],
      edgeCases: [
        { case: 'Start cell (0,0) is blocked (0)', expected: 'Returns [] immediately' },
        { case: 'No path exists', expected: 'Returns []' },
        { case: '1x1 grid with an open cell', expected: 'Returns [""] — the empty path, since start equals destination' },
      ],
      functionName: 'ratInMaze',
      isClassBased: false,
      sampleTests: [
        { input: [[[1, 0, 0], [1, 1, 0], [0, 1, 1]]], expectedOutput: ['DRDR'], description: 'single path through a constrained grid' },
        { input: [[[1, 0], [0, 1]]], expectedOutput: [], description: 'no path exists — rat is boxed in' },
        { input: [[[1]]], expectedOutput: [''], description: '1x1 grid, start is destination' },
      ],
    },
    hints: {
      hints: [
        'This is standard backtracking with a visited grid: try each of the 4 directions from the current cell, recurse, then un-mark visited before trying the next direction.',
        'A move is only legal if the target cell is in bounds, open (1), and not already visited in the current path.',
        'Collect the results and sort them alphabetically at the end, since the order directions are tried in does not naturally produce sorted output.',
      ],
    },
    solution: {
      algorithm:
        'DFS/backtrack from (0,0). At each cell, if it is the destination (n-1,n-1), record the path built so far. Otherwise mark the cell visited, try moving Down/Left/Right/Up (any fixed order) into cells that are in-bounds, open, and unvisited, appending the direction letter and recursing, then unmark the cell (backtrack) so other paths can reuse it. Sort the collected paths alphabetically before returning; if the start cell is blocked, skip the search entirely.',
      dryRun:
        'grid=[[1,0,0],[1,1,0],[0,1,1]], n=3\nstart (0,0), path=""\n  D→(1,0): path="D"\n    D→(2,0)? grid=0, invalid\n    R→(1,1): path="DR"\n      D→(2,1): path="DRD"\n        R→(2,2)=dest → record "DRDR"\nresult=["DRDR"]',
      javascriptSolution: `function ratInMaze(grid) {
  const n = grid.length;
  const result = [];
  const visited = Array.from({ length: n }, () => new Array(n).fill(false));

  function isSafe(row, col) {
    return row >= 0 && row < n && col >= 0 && col < n && !visited[row][col] && grid[row][col] === 1;
  }

  function helper(row, col, path) {
    if (row === n - 1 && col === n - 1) {
      result.push(path);
      return;
    }
    visited[row][col] = true;

    const rowMove = [1, -1, 0, 0];
    const colMove = [0, 0, -1, 1];
    const dir = ['D', 'U', 'L', 'R'];

    for (let i = 0; i < 4; i++) {
      const nextRow = row + rowMove[i];
      const nextCol = col + colMove[i];
      if (isSafe(nextRow, nextCol)) {
        helper(nextRow, nextCol, path + dir[i]);
      }
    }

    visited[row][col] = false;
  }

  if (grid[0][0] === 1) {
    helper(0, 0, '');
  }

  return result.sort();
}`,
      typescriptSolution: `function ratInMaze(grid: number[][]): string[] {
  const n = grid.length;
  const result: string[] = [];
  const visited: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));

  function isSafe(row: number, col: number): boolean {
    return row >= 0 && row < n && col >= 0 && col < n && !visited[row]![col] && grid[row]![col] === 1;
  }

  function helper(row: number, col: number, path: string): void {
    if (row === n - 1 && col === n - 1) {
      result.push(path);
      return;
    }
    visited[row]![col] = true;

    const rowMove = [1, -1, 0, 0];
    const colMove = [0, 0, -1, 1];
    const dir = ['D', 'U', 'L', 'R'];

    for (let i = 0; i < 4; i++) {
      const nextRow = row + rowMove[i]!;
      const nextCol = col + colMove[i]!;
      if (isSafe(nextRow, nextCol)) {
        helper(nextRow, nextCol, path + dir[i]);
      }
    }

    visited[row]![col] = false;
  }

  if (grid[0]![0] === 1) {
    helper(0, 0, '');
  }

  return result.sort();
}`,
      timeComplexity: 'O(4^(n²)) worst case — 4 choices at every cell in the grid, heavily pruned in practice by the visited/bounds checks.',
      spaceComplexity: 'O(n²) for the visited grid plus O(n²) recursion depth.',
      commonMistakes: [
        'Forgetting to unmark `visited[row][col] = false` after exploring, which prevents cells from being reused on other, equally valid paths.',
        'Not guarding the start cell being blocked, which (without the guard) would still be "safe" to enter since visited/bounds checks alone do not catch grid[0][0] === 0 before the first call.',
        'Forgetting to sort the output — direction-exploration order does not naturally yield alphabetical order.',
      ],
      followUpQuestions: [
        'How would you return only the shortest path instead of all paths (BFS instead of DFS)?',
        'How would you count the number of valid paths without storing the actual direction strings?',
        'How would this change if diagonal moves were also allowed?',
      ],
      similarQuestions: ['Unique Paths', 'Unique Paths II', 'Word Search'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m7-12',
      questionNumber: 'DSACODE-M7-12',
      title: 'N-Queens',
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
        'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other (share a row, column, or diagonal). Given an integer n, return all distinct solutions, each represented as an array of n strings where "Q" marks a queen and "." marks an empty space.',
      input: 'n: number',
      output: 'string[][] — every distinct board configuration, one row-string per board row',
      constraints: ['1 <= n <= 6'],
      examples: [
        { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', explanation: 'The two classic 4-queens solutions.' },
        { input: 'n = 1', output: '[["Q"]]', explanation: 'A single queen on a 1x1 board trivially does not attack anything.' },
        { input: 'n = 2', output: '[]', explanation: 'No arrangement of 2 queens on a 2x2 board avoids all attacks.' },
      ],
      edgeCases: [
        { case: 'n = 1', expected: 'One trivial solution' },
        { case: 'n = 2 or n = 3', expected: 'No solutions exist at all — returns []' },
        { case: 'n = 4', expected: 'Exactly 2 solutions (the smallest n with any solution beyond n=1)' },
      ],
      functionName: 'solveNQueens',
      isClassBased: false,
      sampleTests: [
        { input: [4], expectedOutput: [['.Q..', '...Q', 'Q...', '..Q.'], ['..Q.', 'Q...', '...Q', '.Q..']], description: 'the two classic n=4 solutions' },
        { input: [1], expectedOutput: [['Q']], description: 'trivial 1x1 board' },
        { input: [2], expectedOutput: [], description: 'no valid arrangement exists' },
      ],
    },
    hints: {
      hints: [
        'Place one queen per row, choosing a column for each row in turn — this guarantees no two queens ever share a row automatically.',
        'Track occupied columns and both diagonals with Sets: for a queen at (row, col), every other cell on the same "/" diagonal shares `row + col`, and every cell on the same "\\" diagonal shares `row - col`.',
        'When a full placement (n rows filled) is reached, convert the list of chosen columns into the string-grid format, one "Q" per row at its chosen column and "." everywhere else.',
      ],
    },
    solution: {
      algorithm:
        'Backtrack row by row (0 to n-1). For each row, try every column 0..n-1; skip it if the column, or either diagonal (row-col or row+col), is already occupied by an earlier queen. Otherwise mark all three sets, record the column choice, recurse to the next row, then unmark to backtrack. When row === n, every queen is placed validly — build the string board from the recorded column choices and push it.',
      dryRun:
        'n=4\nrow0: try col0 → ok, place\n  row1: col0,1 conflict(col/diag); col2 → ok, place\n    row2: col0,1,2,3 all conflict → dead end, backtrack\n  row1: col3 → ok, place\n    row2: col0 → ok, place\n      row3: col0,1,2,3 all conflict → dead end\n    row2: col1 → ok, place\n      row3: col2 → ok → record [".Q..","...Q","Q...","..Q."]\n... (search continues from row0/col1, col2, col3, finding one more solution)\nresult has 2 boards total',
      javascriptSolution: `function solveNQueens(n) {
  const result = [];
  const cols = new Set();
  const diag1 = new Set(); // row - col
  const diag2 = new Set(); // row + col
  const placement = [];

  function helper(row) {
    if (row === n) {
      const board = placement.map((col) => '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1));
      result.push(board);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;

      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      placement.push(col);

      helper(row + 1);

      placement.pop();
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  helper(0);
  return result;
}`,
      typescriptSolution: `function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const cols = new Set<number>();
  const diag1 = new Set<number>(); // row - col
  const diag2 = new Set<number>(); // row + col
  const placement: number[] = [];

  function helper(row: number): void {
    if (row === n) {
      const board = placement.map((col) => '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1));
      result.push(board);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;

      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      placement.push(col);

      helper(row + 1);

      placement.pop();
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  helper(0);
  return result;
}`,
      timeComplexity: 'O(n!) roughly — heavily pruned by the column/diagonal constant-time conflict checks compared to the naive O(n^n).',
      spaceComplexity: 'O(n) for the Sets and placement array/recursion depth, plus O(n) per solution board in the output.',
      commonMistakes: [
        'Checking conflicts with an O(n) column/diagonal scan of the board instead of O(1) Set lookups, which is correct but much slower.',
        'Forgetting to remove entries from `diag1`/`diag2`/`cols` on backtrack, which corrupts the conflict state for sibling branches.',
        'Confusing the two diagonal formulas (`row - col` vs `row + col`) — mixing them up silently misses real conflicts.',
      ],
      followUpQuestions: [
        'How would you solve N-Queens II, which only needs the *count* of solutions, not the boards themselves?',
        'How would you use bitmasking instead of Sets to represent occupied columns/diagonals for a faster constant factor?',
        'How would the branching factor and pruning change for n around 8-10, and why does N-Queens become intractable for very large n?',
      ],
      similarQuestions: ['N-Queens II', 'Sudoku Solver', 'Valid Sudoku'],
    },
  },
];
