// Hand-authored coding questions derived from the "Recurrsion" section of
// the DSA notes dump (Module 7 — Recursion & Backtracking). Unlike the
// auto-generated MockTechnicalQuestion files, these are real
// CodingQuestionDetail problems: every sampleTests entry has been checked
// against the reference solution below by actually running it in Node, and
// both the JavaScript and TypeScript solutions are genuine, working code
// (no placeholder solution stubs). The dump's "Subset Sums" snippet
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
        `Step 1: Map each digit to its letters.
Step 2: Choose one letter for the current digit.
Step 3: Recurse to the next digit until every digit has one chosen letter.
Step 4: Record the completed combination.

Core idea from source:
Map each digit to its letters. Recurse with (index, currentCombination): if currentCombination.length equals digits.length, push it and return; otherwise, for every letter mapped to digits[index], recurse with index+1 and the letter appended. Explicitly return [] up front when digits is empty.`,
      dryRun:
        `digits="23"
2 → "abc"
Choose a → then 3 gives ad, ae, af.
Choose b → bd, be, bf.
Choose c → cd, ce, cf.
Result has 9 combinations.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function letterCombinations(digits) {
    if (digits.length === 0)
        return [];
    const map = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz",
    };
    const result = [];
    function helper(index, current) {
        if (index === digits.length) {
            result.push(current);
            return;
        }
        const letters = map[digits[index]];
        for (let i = 0; i < letters.length; i++) {
            helper(index + 1, current + letters[i]);
        }
    }
    helper(0, "");
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function letterCombinationsUsingBuiltIns(digits) {
    if (digits.length === 0)
        return [];
    const map = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
    };
    let result = [""];
    for (const digit of digits) {
        const next = [];
        for (const prefix of result) {
            for (const letter of map[digit]) {
                next.push(prefix + letter);
            }
        }
        result = next;
    }
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];

  const map: Record<string, string> = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  };

  const result: string[] = [];

  function helper(index: number, current: string): void {
    if (index === digits.length) {
      result.push(current);
      return;
    }

    const letters = map[digits[index]!]!;

    for (let i = 0; i < letters.length; i++) {
      helper(index + 1, current + letters[i]);
    }
  }

  helper(0, "");
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function letterCombinationsUsingBuiltIns(digits: string): string[] {
  if (digits.length === 0) return [];

  const map: Record<string, string> = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
  };

  let result: string[] = [""];

  for (const digit of digits) {
    const next: string[] = [];

    for (const prefix of result) {
      for (const letter of map[digit]!) {
        next.push(prefix + letter);
      }
    }

    result = next;
  }

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
        `Step 1: Build the combination from left to right.
Step 2: Only consider values from the current \`start\`, preventing reused/reordered duplicates.
Step 3: Choose a value, recurse, then remove it before trying the next value.
Step 4: Record when the current combination reaches size \`k\`.

Core idea from source:
Backtrack with helper(start): if the running combination has length k, record a copy and return. Otherwise, for i from start to n, push i, recurse with start = i + 1 (so numbers are never reused or reordered), then pop i to backtrack.`,
      dryRun:
        `n=4,k=2
Start [].
Choose 1 → [1], then 2/3/4 → [1,2], [1,3], [1,4].
Backtrack and choose 2 → [2,3], [2,4].
Choose 3 → [3,4].
Total = 6 combinations.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function combine(n, k) {
    const result = [];
    const current = [];
    function helper(start) {
        if (current.length === k) {
            const copy = new Array(k);
            for (let i = 0; i < k; i++)
                copy[i] = current[i];
            result.push(copy);
            return;
        }
        const need = k - current.length;
        for (let value = start; value <= n - need + 1; value++) {
            current.push(value);
            helper(value + 1);
            current.pop();
        }
    }
    helper(1);
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function combineUsingBuiltIns(n, k) {
    const result = [];
    function helper(start, current) {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        for (let value = start; value <= n; value++) {
            helper(value + 1, [...current, value]);
        }
    }
    helper(1, []);
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function helper(start: number): void {
    if (current.length === k) {
      const copy: number[] = new Array(k);
      for (let i = 0; i < k; i++) copy[i] = current[i]!;
      result.push(copy);
      return;
    }

    const need = k - current.length;

    for (let value = start; value <= n - need + 1; value++) {
      current.push(value);
      helper(value + 1);
      current.pop();
    }
  }

  helper(1);
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function combineUsingBuiltIns(n: number, k: number): number[][] {
  const result: number[][] = [];

  function helper(start: number, current: number[]): void {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    for (let value = start; value <= n; value++) {
      helper(value + 1, [...current, value]);
    }
  }

  helper(1, []);
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
        `Step 1: At every element there are exactly two choices: include it or skip it.
Step 2: Carry the current sum as a recursion parameter.
Step 3: When all elements are processed, record the sum.
Step 4: Sort all recorded sums at the end.

Core idea from source:
Recurse with (index, sum): once index reaches arr.length, record sum. Otherwise branch twice — once including arr[index] in the running sum, once skipping it — each advancing to index + 1. Sort the collected sums ascending before returning.`,
      dryRun:
        `arr=[1,2,3]
Include all → 6.
Include 1,2 but skip 3 → 3.
Include 1, skip 2, include 3 → 4.
Skip 1, include 2, include 3 → 5.
Skip everything → 0.
All 8 subset sums are recorded, then sorted.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function subsetSums(arr) {
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
    // Manual insertion sort — no sort() helper.
    for (let i = 1; i < sums.length; i++) {
        const value = sums[i];
        let j = i - 1;
        while (j >= 0 && sums[j] > value) {
            sums[j + 1] = sums[j];
            j--;
        }
        sums[j + 1] = value;
    }
    return sums;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function subsetSumsUsingBuiltIns(arr) {
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
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function subsetSums(arr: number[]): number[] {
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

  // Manual insertion sort — no sort() helper.
  for (let i = 1; i < sums.length; i++) {
    const value = sums[i]!;
    let j = i - 1;

    while (j >= 0 && sums[j]! > value) {
      sums[j + 1] = sums[j]!;
      j--;
    }

    sums[j + 1] = value;
  }

  return sums;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function subsetSumsUsingBuiltIns(arr: number[]): number[] {
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
        `Step 1: At each index choose include or exclude.
Step 2: Add the current value and recurse into the include branch.
Step 3: Backtrack and run the exclude branch.
Step 4: Record a copy when every input element has been considered.

Core idea from source:
Recurse with index: once index === nums.length, push a copy of the running subset \`ds\`. Otherwise branch twice — push nums[index] onto ds and recurse (include), then pop it and recurse again without it (exclude).`,
      dryRun:
        `nums=[1,2,3]
At 1: include or exclude.
Include 1 → at 2 include/exclude → then 3 include/exclude.
This produces [1,2,3], [1,2], [1,3], [1].
Exclude 1 produces [2,3], [2], [3], [].
Total = 8.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function subsets(nums) {
    const result = [];
    const current = [];
    function helper(index) {
        if (index === nums.length) {
            const copy = new Array(current.length);
            for (let i = 0; i < current.length; i++) {
                copy[i] = current[i];
            }
            result.push(copy);
            return;
        }
        current.push(nums[index]);
        helper(index + 1);
        current.pop();
        helper(index + 1);
    }
    helper(0);
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function subsetsUsingBuiltIns(nums) {
    let result = [[]];
    for (const value of nums) {
        const additions = result.map((subset) => [...subset, value]);
        result = result.concat(additions);
    }
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function helper(index: number): void {
    if (index === nums.length) {
      const copy: number[] = new Array(current.length);

      for (let i = 0; i < current.length; i++) {
        copy[i] = current[i]!;
      }

      result.push(copy);
      return;
    }

    current.push(nums[index]!);
    helper(index + 1);
    current.pop();

    helper(index + 1);
  }

  helper(0);
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function subsetsUsingBuiltIns(nums: number[]): number[][] {
  let result: number[][] = [[]];

  for (const value of nums) {
    const additions = result.map((subset) => [...subset, value]);
    result = result.concat(additions);
  }

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
        `Step 1: Sort the input so equal values are adjacent.
Step 2: Record the current subset at every recursion level.
Step 3: Skip an equal value when it is a duplicate choice at the same recursion depth.
Step 4: Backtrack after every chosen value.

Core idea from source:
Sort nums first. Recurse with (index): record a copy of the current subset ds immediately (every prefix, including the initial empty one, is a valid subset). Then for i from index to the end, skip if sorted[i] equals sorted[i-1] and i > index (avoids reusing the same value at the same decision point); otherwise push sorted[i], recurse with i + 1, and pop to backtrack.`,
      dryRun:
        `sorted=[1,2,2]
Record [].
Choose 1 → [1], then [1,2], [1,2,2].
Back at root, first 2 → [2], then [2,2].
The second root-level 2 is skipped because it is equal to the previous value at the same depth.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function subsetsWithDup(nums) {
    const sorted = new Array(nums.length);
    // Manual insertion sort.
    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        let j = i - 1;
        while (j >= 0 && sorted[j] > value) {
            sorted[j + 1] = sorted[j];
            j--;
        }
        sorted[j + 1] = value;
    }
    const result = [];
    const current = [];
    function helper(start) {
        const copy = new Array(current.length);
        for (let i = 0; i < current.length; i++) {
            copy[i] = current[i];
        }
        result.push(copy);
        for (let i = start; i < sorted.length; i++) {
            if (i > start && sorted[i] === sorted[i - 1])
                continue;
            current.push(sorted[i]);
            helper(i + 1);
            current.pop();
        }
    }
    helper(0);
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function subsetsWithDupUsingBuiltIns(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    const result = [[]];
    let previousStart = 0;
    for (let i = 0; i < sorted.length; i++) {
        const value = sorted[i];
        const start = i > 0 && sorted[i] === sorted[i - 1]
            ? previousStart
            : 0;
        const currentLength = result.length;
        for (let j = start; j < currentLength; j++) {
            result.push([...result[j], value]);
        }
        previousStart = currentLength;
    }
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function subsetsWithDup(nums: number[]): number[][] {
  const sorted = new Array<number>(nums.length);

  // Manual insertion sort.
  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]!;
    let j = i - 1;

    while (j >= 0 && sorted[j]! > value) {
      sorted[j + 1] = sorted[j]!;
      j--;
    }

    sorted[j + 1] = value;
  }

  const result: number[][] = [];
  const current: number[] = [];

  function helper(start: number): void {
    const copy: number[] = new Array(current.length);

    for (let i = 0; i < current.length; i++) {
      copy[i] = current[i]!;
    }

    result.push(copy);

    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue;

      current.push(sorted[i]!);
      helper(i + 1);
      current.pop();
    }
  }

  helper(0);
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function subsetsWithDupUsingBuiltIns(nums: number[]): number[][] {
  const sorted = [...nums].sort((a, b) => a - b);
  const result: number[][] = [[]];
  let previousStart = 0;

  for (let i = 0; i < sorted.length; i++) {
    const value = sorted[i]!;
    const start = i > 0 && sorted[i] === sorted[i - 1]
      ? previousStart
      : 0;

    const currentLength = result.length;

    for (let j = start; j < currentLength; j++) {
      result.push([...result[j]!, value]);
    }

    previousStart = currentLength;
  }

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
        `Step 1: Sort candidates for pruning.
Step 2: Choose a candidate and reduce the remaining target.
Step 3: Recurse with the same index because a candidate can be reused.
Step 4: Record when the remaining target becomes zero; stop when a candidate exceeds it.

Core idea from source:
Sort candidates ascending. Recurse with (start, remaining): if remaining === 0, record a copy of ds. Otherwise, for i from start to the end, if candidates[i] > remaining, break (sorted, so nothing further can work either); otherwise push candidates[i], recurse with (i, remaining - candidates[i]) — reusing index i allows the same value again — then pop to backtrack.`,
      dryRun:
        `candidates=[2,3,6,7], target=7
Choose 2 → remaining 5.
Choose 2 again → remaining 3.
Choose 3 → remaining 0 → record [2,2,3].
Backtrack to root.
Choose 7 → remaining 0 → record [7].
Result = [[2,2,3],[7]].`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function combinationSum(candidates, target) {
    const sorted = new Array(candidates.length);
    // Manual insertion sort.
    for (let i = 0; i < candidates.length; i++) {
        const value = candidates[i];
        let j = i - 1;
        while (j >= 0 && sorted[j] > value) {
            sorted[j + 1] = sorted[j];
            j--;
        }
        sorted[j + 1] = value;
    }
    const result = [];
    const current = [];
    function helper(start, remaining) {
        if (remaining === 0) {
            const copy = new Array(current.length);
            for (let i = 0; i < current.length; i++) {
                copy[i] = current[i];
            }
            result.push(copy);
            return;
        }
        for (let i = start; i < sorted.length; i++) {
            if (sorted[i] > remaining)
                break;
            current.push(sorted[i]);
            // Same i => unlimited reuse of this candidate.
            helper(i, remaining - sorted[i]);
            current.pop();
        }
    }
    helper(0, target);
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function combinationSumUsingBuiltIns(candidates, target) {
    const sorted = [...candidates].sort((a, b) => a - b);
    const result = [];
    function helper(start, remaining, current) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < sorted.length; i++) {
            if (sorted[i] > remaining)
                break;
            helper(i, remaining - sorted[i], [...current, sorted[i]]);
        }
    }
    helper(0, target, []);
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function combinationSum(
  candidates: number[],
  target: number,
): number[][] {
  const sorted = new Array<number>(candidates.length);

  // Manual insertion sort.
  for (let i = 0; i < candidates.length; i++) {
    const value = candidates[i]!;
    let j = i - 1;

    while (j >= 0 && sorted[j]! > value) {
      sorted[j + 1] = sorted[j]!;
      j--;
    }

    sorted[j + 1] = value;
  }

  const result: number[][] = [];
  const current: number[] = [];

  function helper(start: number, remaining: number): void {
    if (remaining === 0) {
      const copy: number[] = new Array(current.length);

      for (let i = 0; i < current.length; i++) {
        copy[i] = current[i]!;
      }

      result.push(copy);
      return;
    }

    for (let i = start; i < sorted.length; i++) {
      if (sorted[i]! > remaining) break;

      current.push(sorted[i]!);
      // Same i => unlimited reuse of this candidate.
      helper(i, remaining - sorted[i]!);
      current.pop();
    }
  }

  helper(0, target);
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function combinationSumUsingBuiltIns(
  candidates: number[],
  target: number,
): number[][] {
  const sorted = [...candidates].sort((a, b) => a - b);
  const result: number[][] = [];

  function helper(start: number, remaining: number, current: number[]): void {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < sorted.length; i++) {
      if (sorted[i]! > remaining) break;

      helper(
        i,
        remaining - sorted[i]!,
        [...current, sorted[i]!],
      );
    }
  }

  helper(0, target, []);
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
        `Step 1: Sort candidates so duplicates are adjacent.
Step 2: Choose each array position at most once by recursing with \`i + 1\`.
Step 3: Skip equal candidates at the same recursion depth.
Step 4: Record when the remaining target is zero and prune values that are too large.

Core idea from source:
Sort candidates ascending. Recurse with (start, remaining): if remaining === 0, record ds. For i from start to the end: skip if i > start and sorted[i] === sorted[i-1] (avoids duplicate combinations); if sorted[i] > remaining, break (sorted, so nothing further helps); otherwise push sorted[i], recurse with (i + 1, remaining - sorted[i]) since each element is used once, then pop.`,
      dryRun:
        `sorted=[1,1,2,5,6,7,10], target=8
Choose 1,1,6 → 8.
Choose 1,2,5 → 8.
Choose 1,7 → 8.
Choose 2,6 → 8.
The duplicate second 1 at the same recursion depth is skipped.
Result has 4 combinations.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function combinationSum2(candidates, target) {
    const sorted = new Array(candidates.length);
    // Manual insertion sort.
    for (let i = 0; i < candidates.length; i++) {
        const value = candidates[i];
        let j = i - 1;
        while (j >= 0 && sorted[j] > value) {
            sorted[j + 1] = sorted[j];
            j--;
        }
        sorted[j + 1] = value;
    }
    const result = [];
    const current = [];
    function helper(start, remaining) {
        if (remaining === 0) {
            const copy = new Array(current.length);
            for (let i = 0; i < current.length; i++) {
                copy[i] = current[i];
            }
            result.push(copy);
            return;
        }
        for (let i = start; i < sorted.length; i++) {
            if (i > start && sorted[i] === sorted[i - 1])
                continue;
            if (sorted[i] > remaining)
                break;
            current.push(sorted[i]);
            helper(i + 1, remaining - sorted[i]);
            current.pop();
        }
    }
    helper(0, target);
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function combinationSum2UsingBuiltIns(candidates, target) {
    const sorted = [...candidates].sort((a, b) => a - b);
    const result = [];
    function helper(start, remaining, current) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < sorted.length; i++) {
            if (i > start && sorted[i] === sorted[i - 1])
                continue;
            if (sorted[i] > remaining)
                break;
            helper(i + 1, remaining - sorted[i], [...current, sorted[i]]);
        }
    }
    helper(0, target, []);
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function combinationSum2(
  candidates: number[],
  target: number,
): number[][] {
  const sorted = new Array<number>(candidates.length);

  // Manual insertion sort.
  for (let i = 0; i < candidates.length; i++) {
    const value = candidates[i]!;
    let j = i - 1;

    while (j >= 0 && sorted[j]! > value) {
      sorted[j + 1] = sorted[j]!;
      j--;
    }

    sorted[j + 1] = value;
  }

  const result: number[][] = [];
  const current: number[] = [];

  function helper(start: number, remaining: number): void {
    if (remaining === 0) {
      const copy: number[] = new Array(current.length);

      for (let i = 0; i < current.length; i++) {
        copy[i] = current[i]!;
      }

      result.push(copy);
      return;
    }

    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      if (sorted[i]! > remaining) break;

      current.push(sorted[i]!);
      helper(i + 1, remaining - sorted[i]!);
      current.pop();
    }
  }

  helper(0, target);
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function combinationSum2UsingBuiltIns(
  candidates: number[],
  target: number,
): number[][] {
  const sorted = [...candidates].sort((a, b) => a - b);
  const result: number[][] = [];

  function helper(start: number, remaining: number, current: number[]): void {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue;
      if (sorted[i]! > remaining) break;

      helper(
        i + 1,
        remaining - sorted[i]!,
        [...current, sorted[i]!],
      );
    }
  }

  helper(0, target, []);
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
        `Step 1: Choose the next cut position.
Step 2: Only continue with a substring when it is a palindrome.
Step 3: Recurse from the character immediately after that substring.
Step 4: Record the partition after consuming the whole string.

Core idea from source:
Recurse with (start): if start === s.length, record a copy of the running partition ds. Otherwise, for end from start to s.length - 1, take substring s[start..end]; if it is a palindrome, push it onto ds, recurse with (end + 1), then pop to backtrack and try the next end.`,
      dryRun:
        `s="aab"
Start at 0.
"a" is palindrome → continue from 1.
"a" then "b" → record ["a","a","b"].
Backtrack.
"aa" is palindrome → then "b" → record ["aa","b"].
"aab" is not a palindrome → skip.
Result has 2 partitions.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function partitionPalindrome(s) {
    const result = [];
    const current = [];
    function isPalindrome(left, right) {
        while (left < right) {
            if (s[left] !== s[right])
                return false;
            left++;
            right--;
        }
        return true;
    }
    function helper(start) {
        if (start === s.length) {
            const copy = new Array(current.length);
            for (let i = 0; i < current.length; i++) {
                copy[i] = current[i];
            }
            result.push(copy);
            return;
        }
        for (let end = start; end < s.length; end++) {
            if (!isPalindrome(start, end))
                continue;
            current.push(s.slice(start, end + 1));
            helper(end + 1);
            current.pop();
        }
    }
    helper(0);
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function partitionPalindromeUsingBuiltIns(s) {
    const result = [];
    const isPalindrome = (value) => value === value.split("").reverse().join("");
    function helper(start, current) {
        if (start === s.length) {
            result.push([...current]);
            return;
        }
        for (let end = start; end < s.length; end++) {
            const part = s.slice(start, end + 1);
            if (isPalindrome(part)) {
                helper(end + 1, [...current, part]);
            }
        }
    }
    helper(0, []);
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function partitionPalindrome(s: string): string[][] {
  const result: string[][] = [];
  const current: string[] = [];

  function isPalindrome(left: number, right: number): boolean {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }

    return true;
  }

  function helper(start: number): void {
    if (start === s.length) {
      const copy: string[] = new Array(current.length);

      for (let i = 0; i < current.length; i++) {
        copy[i] = current[i]!;
      }

      result.push(copy);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (!isPalindrome(start, end)) continue;

      current.push(s.slice(start, end + 1));
      helper(end + 1);
      current.pop();
    }
  }

  helper(0);
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function partitionPalindromeUsingBuiltIns(s: string): string[][] {
  const result: string[][] = [];

  const isPalindrome = (value: string): boolean =>
    value === value.split("").reverse().join("");

  function helper(start: number, current: string[]): void {
    if (start === s.length) {
      result.push([...current]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      const part = s.slice(start, end + 1);

      if (isPalindrome(part)) {
        helper(end + 1, [...current, part]);
      }
    }
  }

  helper(0, []);
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
        `Step 1: At every position, try every unused input element.
Step 2: Mark the chosen index as used and add its value.
Step 3: Recurse, then backtrack and unmark it.
Step 4: Record when the permutation length equals the input length.

Core idea from source:
Maintain a \`used\` boolean array and a running array ds. Recurse: if ds.length === nums.length, record a copy. Otherwise, for every index i not yet used, mark used[i] = true, push nums[i] onto ds, recurse, then pop and unmark to backtrack, trying the next unused index.`,
      dryRun:
        `nums=[1,2,3]
Pick 1 → pick 2 → pick 3 → [1,2,3].
Backtrack → [1,3,2].
Then start with 2 → [2,1,3], [2,3,1].
Then start with 3 → [3,1,2], [3,2,1].
Total = 3! = 6.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function permute(nums) {
    const result = [];
    const current = [];
    const used = new Array(nums.length).fill(false);
    function helper() {
        if (current.length === nums.length) {
            const copy = new Array(current.length);
            for (let i = 0; i < current.length; i++) {
                copy[i] = current[i];
            }
            result.push(copy);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i])
                continue;
            used[i] = true;
            current.push(nums[i]);
            helper();
            current.pop();
            used[i] = false;
        }
    }
    helper();
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function permuteUsingBuiltIns(nums) {
    if (nums.length === 0)
        return [[]];
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        const rest = nums.slice(0, i).concat(nums.slice(i + 1));
        for (const permutation of permuteUsingBuiltIns(rest)) {
            result.push([nums[i], ...permutation]);
        }
    }
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const current: number[] = [];
  const used = new Array<boolean>(nums.length).fill(false);

  function helper(): void {
    if (current.length === nums.length) {
      const copy: number[] = new Array(current.length);

      for (let i = 0; i < current.length; i++) {
        copy[i] = current[i]!;
      }

      result.push(copy);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      current.push(nums[i]!);

      helper();

      current.pop();
      used[i] = false;
    }
  }

  helper();
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function permuteUsingBuiltIns(nums: number[]): number[][] {
  if (nums.length === 0) return [[]];

  const result: number[][] = [];

  for (let i = 0; i < nums.length; i++) {
    const rest = nums.slice(0, i).concat(nums.slice(i + 1));

    for (const permutation of permuteUsingBuiltIns(rest)) {
      result.push([nums[i]!, ...permutation]);
    }
  }

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
        `Step 1: Sort so duplicate values are adjacent.
Step 2: Track which indices are already used.
Step 3: At the same depth, skip a duplicate if the previous equal index has not been used.
Step 4: Record each complete permutation exactly once.

Core idea from source:
Sort nums ascending. Use a \`used\` boolean array and running array ds, same shape as Permutations. At each position, for i from 0 to n-1: skip if used[i]; also skip if i > 0 and sorted[i] === sorted[i-1] and !used[i-1] (this specific ordering prevents duplicate permutations while still allowing legitimate repeats of the same value across different positions). Otherwise mark used[i], push, recurse, pop, unmark.`,
      dryRun:
        `nums=[1,1,2]
Sorted=[1,1,2].
At the first position choose the first 1.
At the same depth, the second 1 is skipped because the first 1 has not been used.
The unique results are [1,1,2], [1,2,1], [2,1,1].`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function permuteUnique(nums) {
    const sorted = new Array(nums.length);
    // Manual insertion sort.
    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        let j = i - 1;
        while (j >= 0 && sorted[j] > value) {
            sorted[j + 1] = sorted[j];
            j--;
        }
        sorted[j + 1] = value;
    }
    const result = [];
    const current = [];
    const used = new Array(sorted.length).fill(false);
    function helper() {
        if (current.length === sorted.length) {
            const copy = new Array(current.length);
            for (let i = 0; i < current.length; i++) {
                copy[i] = current[i];
            }
            result.push(copy);
            return;
        }
        for (let i = 0; i < sorted.length; i++) {
            if (used[i])
                continue;
            if (i > 0 &&
                sorted[i] === sorted[i - 1] &&
                !used[i - 1]) {
                continue;
            }
            used[i] = true;
            current.push(sorted[i]);
            helper();
            current.pop();
            used[i] = false;
        }
    }
    helper();
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function permuteUniqueUsingBuiltIns(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    const result = new Set();
    function helper(current, remaining) {
        if (remaining.length === 0) {
            result.add(current.join(","));
            return;
        }
        for (let i = 0; i < remaining.length; i++) {
            helper([...current, remaining[i]], remaining.slice(0, i).concat(remaining.slice(i + 1)));
        }
    }
    helper([], sorted);
    return Array.from(result).map((value) => value.split(",").map(Number));
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function permuteUnique(nums: number[]): number[][] {
  const sorted = new Array<number>(nums.length);

  // Manual insertion sort.
  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]!;
    let j = i - 1;

    while (j >= 0 && sorted[j]! > value) {
      sorted[j + 1] = sorted[j]!;
      j--;
    }

    sorted[j + 1] = value;
  }

  const result: number[][] = [];
  const current: number[] = [];
  const used = new Array<boolean>(sorted.length).fill(false);

  function helper(): void {
    if (current.length === sorted.length) {
      const copy: number[] = new Array(current.length);

      for (let i = 0; i < current.length; i++) {
        copy[i] = current[i]!;
      }

      result.push(copy);
      return;
    }

    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;

      if (
        i > 0 &&
        sorted[i] === sorted[i - 1] &&
        !used[i - 1]
      ) {
        continue;
      }

      used[i] = true;
      current.push(sorted[i]!);

      helper();

      current.pop();
      used[i] = false;
    }
  }

  helper();
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function permuteUniqueUsingBuiltIns(nums: number[]): number[][] {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = new Set<string>();

  function helper(current: number[], remaining: number[]): void {
    if (remaining.length === 0) {
      result.add(current.join(","));
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      helper(
        [...current, remaining[i]!],
        remaining.slice(0, i).concat(remaining.slice(i + 1)),
      );
    }
  }

  helper([], sorted);

  return Array.from(result).map((value) =>
    value.split(",").map(Number),
  );
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
        `Step 1: Start at the top-left cell and only move onto open, unvisited cells.
Step 2: Try directions in the required D-L-R-U order.
Step 3: Mark the current cell before exploring and unmark it when backtracking.
Step 4: Record the path when the bottom-right cell is reached.

Core idea from source:
DFS/backtrack from (0,0). At each cell, if it is the destination (n-1,n-1), record the path built so far. Otherwise mark the cell visited, try moving Down/Left/Right/Up (any fixed order) into cells that are in-bounds, open, and unvisited, appending the direction letter and recursing, then unmark the cell (backtrack) so other paths can reuse it. Sort the collected paths alphabetically before returning; if the start cell is blocked, skip the search entirely.`,
      dryRun:
        `For an open 4x4 maze, start at (0,0).
Try D, then L, R, U in order.
Mark a cell before recursion and unmark it when returning.
Whenever (n-1,n-1) is reached, record the built path.
This guarantees paths are simple and returned in traversal order.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function ratInMaze(grid) {
    const n = grid.length;
    const result = [];
    if (n === 0 || grid[0][0] !== 1 || grid[n - 1][n - 1] !== 1) {
        return result;
    }
    const visited = new Array(n);
    for (let row = 0; row < n; row++) {
        visited[row] = new Array(n).fill(false);
    }
    const rowMove = [1, 0, 0, -1];
    const colMove = [0, -1, 1, 0];
    const direction = ["D", "L", "R", "U"];
    function isSafe(row, col) {
        return (row >= 0 &&
            row < n &&
            col >= 0 &&
            col < n &&
            grid[row][col] === 1 &&
            !visited[row][col]);
    }
    function helper(row, col, path) {
        if (row === n - 1 && col === n - 1) {
            result.push(path);
            return;
        }
        visited[row][col] = true;
        for (let i = 0; i < 4; i++) {
            const nextRow = row + rowMove[i];
            const nextCol = col + colMove[i];
            if (isSafe(nextRow, nextCol)) {
                helper(nextRow, nextCol, path + direction[i]);
            }
        }
        visited[row][col] = false;
    }
    helper(0, 0, "");
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function ratInMazeUsingBuiltIns(grid) {
    const n = grid.length;
    const result = [];
    if (!n || grid[0][0] !== 1 || grid[n - 1][n - 1] !== 1) {
        return result;
    }
    const visited = Array.from({ length: n }, () => new Array(n).fill(false));
    const moves = [
        [1, 0, "D"],
        [0, -1, "L"],
        [0, 1, "R"],
        [-1, 0, "U"],
    ];
    function helper(row, col, path) {
        if (row === n - 1 && col === n - 1) {
            result.push(path);
            return;
        }
        visited[row][col] = true;
        for (const [dr, dc, dir] of moves) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 &&
                nr < n &&
                nc >= 0 &&
                nc < n &&
                grid[nr][nc] === 1 &&
                !visited[nr][nc]) {
                helper(nr, nc, path + dir);
            }
        }
        visited[row][col] = false;
    }
    helper(0, 0, "");
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function ratInMaze(grid: number[][]): string[] {
  const n = grid.length;
  const result: string[] = [];

  if (n === 0 || grid[0]![0] !== 1 || grid[n - 1]![n - 1] !== 1) {
    return result;
  }

  const visited: boolean[][] = new Array(n);

  for (let row = 0; row < n; row++) {
    visited[row] = new Array<boolean>(n).fill(false);
  }

  const rowMove = [1, 0, 0, -1];
  const colMove = [0, -1, 1, 0];
  const direction = ["D", "L", "R", "U"];

  function isSafe(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < n &&
      col >= 0 &&
      col < n &&
      grid[row]![col] === 1 &&
      !visited[row]![col]
    );
  }

  function helper(row: number, col: number, path: string): void {
    if (row === n - 1 && col === n - 1) {
      result.push(path);
      return;
    }

    visited[row]![col] = true;

    for (let i = 0; i < 4; i++) {
      const nextRow = row + rowMove[i]!;
      const nextCol = col + colMove[i]!;

      if (isSafe(nextRow, nextCol)) {
        helper(nextRow, nextCol, path + direction[i]);
      }
    }

    visited[row]![col] = false;
  }

  helper(0, 0, "");
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function ratInMazeUsingBuiltIns(grid: number[][]): string[] {
  const n = grid.length;
  const result: string[] = [];

  if (!n || grid[0]![0] !== 1 || grid[n - 1]![n - 1] !== 1) {
    return result;
  }

  const visited = Array.from(
    { length: n },
    () => new Array(n).fill(false),
  );

  const moves = [
    [1, 0, "D"],
    [0, -1, "L"],
    [0, 1, "R"],
    [-1, 0, "U"],
  ] as const;

  function helper(row: number, col: number, path: string): void {
    if (row === n - 1 && col === n - 1) {
      result.push(path);
      return;
    }

    visited[row]![col] = true;

    for (const [dr, dc, dir] of moves) {
      const nr = row + dr;
      const nc = col + dc;

      if (
        nr >= 0 &&
        nr < n &&
        nc >= 0 &&
        nc < n &&
        grid[nr]![nc] === 1 &&
        !visited[nr]![nc]
      ) {
        helper(nr, nc, path + dir);
      }
    }

    visited[row]![col] = false;
  }

  helper(0, 0, "");
  return result;
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
        `Step 1: Place exactly one queen in each row.
Step 2: A position is safe only when its column and both diagonals are unused.
Step 3: Place the queen, recurse to the next row, then remove it to try another column.
Step 4: When all rows are filled, convert the placement to board strings and record it.

Core idea from source:
Backtrack row by row (0 to n-1). For each row, try every column 0..n-1; skip it if the column, or either diagonal (row-col or row+col), is already occupied by an earlier queen. Otherwise mark all three sets, record the column choice, recurse to the next row, then unmark to backtrack. When row === n, every queen is placed validly — build the string board from the recorded column choices and push it.`,
      dryRun:
        `n=4
Row 0: place Q at column 0.
The next rows eventually hit a diagonal conflict, so backtrack.
Try column 1 at row 0.
A valid completion is:
.Q..
...Q
Q...
..Q.
Record it.
Other valid placements are explored by the same backtracking process.
There are 2 solutions for n=4.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function solveNQueens(n) {
    const result = [];
    const board = new Array(n);
    for (let row = 0; row < n; row++) {
        board[row] = new Array(n);
        for (let col = 0; col < n; col++) {
            board[row][col] = ".";
        }
    }
    const usedColumn = new Array(n).fill(false);
    const diagDown = new Array(2 * n - 1).fill(false);
    const diagUp = new Array(2 * n - 1).fill(false);
    function helper(row) {
        if (row === n) {
            const solution = new Array(n);
            for (let r = 0; r < n; r++) {
                let line = "";
                for (let c = 0; c < n; c++) {
                    line += board[r][c];
                }
                solution[r] = line;
            }
            result.push(solution);
            return;
        }
        for (let col = 0; col < n; col++) {
            const down = row - col + (n - 1);
            const up = row + col;
            if (usedColumn[col] || diagDown[down] || diagUp[up]) {
                continue;
            }
            usedColumn[col] = true;
            diagDown[down] = true;
            diagUp[up] = true;
            board[row][col] = "Q";
            helper(row + 1);
            board[row][col] = ".";
            usedColumn[col] = false;
            diagDown[down] = false;
            diagUp[up] = false;
        }
    }
    helper(0);
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function solveNQueensUsingBuiltIns(n) {
    const result = [];
    const cols = new Set();
    const diagDown = new Set();
    const diagUp = new Set();
    const placement = [];
    function helper(row) {
        if (row === n) {
            result.push(placement.map((col) => ".".repeat(col) + "Q" + ".".repeat(n - col - 1)));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) ||
                diagDown.has(row - col) ||
                diagUp.has(row + col)) {
                continue;
            }
            cols.add(col);
            diagDown.add(row - col);
            diagUp.add(row + col);
            placement.push(col);
            helper(row + 1);
            placement.pop();
            cols.delete(col);
            diagDown.delete(row - col);
            diagUp.delete(row + col);
        }
    }
    helper(0);
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board: string[][] = new Array(n);

  for (let row = 0; row < n; row++) {
    board[row] = new Array<string>(n);

    for (let col = 0; col < n; col++) {
      board[row][col] = ".";
    }
  }

  const usedColumn = new Array<boolean>(n).fill(false);
  const diagDown = new Array<boolean>(2 * n - 1).fill(false);
  const diagUp = new Array<boolean>(2 * n - 1).fill(false);

  function helper(row: number): void {
    if (row === n) {
      const solution: string[] = new Array(n);

      for (let r = 0; r < n; r++) {
        let line = "";

        for (let c = 0; c < n; c++) {
          line += board[r]![c];
        }

        solution[r] = line;
      }

      result.push(solution);
      return;
    }

    for (let col = 0; col < n; col++) {
      const down = row - col + (n - 1);
      const up = row + col;

      if (usedColumn[col] || diagDown[down] || diagUp[up]) {
        continue;
      }

      usedColumn[col] = true;
      diagDown[down] = true;
      diagUp[up] = true;
      board[row]![col] = "Q";

      helper(row + 1);

      board[row]![col] = ".";
      usedColumn[col] = false;
      diagDown[down] = false;
      diagUp[up] = false;
    }
  }

  helper(0);
  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function solveNQueensUsingBuiltIns(n: number): string[][] {
  const result: string[][] = [];
  const cols = new Set<number>();
  const diagDown = new Set<number>();
  const diagUp = new Set<number>();
  const placement: number[] = [];

  function helper(row: number): void {
    if (row === n) {
      result.push(
        placement.map((col) =>
          ".".repeat(col) + "Q" + ".".repeat(n - col - 1),
        ),
      );
      return;
    }

    for (let col = 0; col < n; col++) {
      if (
        cols.has(col) ||
        diagDown.has(row - col) ||
        diagUp.has(row + col)
      ) {
        continue;
      }

      cols.add(col);
      diagDown.add(row - col);
      diagUp.add(row + col);
      placement.push(col);

      helper(row + 1);

      placement.pop();
      cols.delete(col);
      diagDown.delete(row - col);
      diagUp.delete(row + col);
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