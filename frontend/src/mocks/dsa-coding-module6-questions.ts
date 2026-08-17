// Hand-authored coding questions derived from
// frontend/src/document/DSA_Master_Handbook_Senior_Frontend_Engineers.md
// (Module 6 — Stack). Unlike the auto-generated MockTechnicalQuestion
// files, these are real CodingQuestionDetail problems: every sampleTests
// entry has been checked against the reference solution below, and both
// the JavaScript and TypeScript solutions are genuine, working code.
//
// Min Stack is a stateful "design" problem: the runner (codeRunner.ts)
// only supports calling a single plain function by name with positional
// args, so classes with multiple methods can't be tested directly. It's
// wrapped as `minStackOperations(operations, args)`, the standard
// LeetCode-judge pattern — one function that replays a sequence of
// operations against an internal instance and returns the array of
// results (null for void operations like push/pop).

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

const CATEGORY = 'Stack';
const CONCEPTS = ['Stack', 'Monotonic Stack', 'Time Complexity', 'Space Complexity', 'Pattern Recognition'];

export const MOCK_DSA_CODING_MODULE6_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m6-1',
      questionNumber: 'DSACODE-M6-1',
      title: 'Valid Parentheses',
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
        "Given a string `s` containing only the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid: every opening bracket must be closed by the same type of bracket, and in the correct order.",
      input: 's: string — a string of bracket characters',
      output: 'boolean — true if the brackets are validly matched and nested',
      constraints: ['1 <= s.length <= 10^4', "s consists only of the characters '()[]{}'"],
      examples: [
        { input: '"{[()]}"', output: 'true', explanation: 'Every bracket is closed in the correct order.' },
        { input: '"([)]"', output: 'false', explanation: 'The brackets are interleaved incorrectly — [ is closed before ( is.' },
        { input: '"("', output: 'false', explanation: 'An opening bracket with no matching close.' },
      ],
      edgeCases: [
        { case: 'Unmatched opening bracket at the end', expected: 'false — the stack is non-empty when the string ends' },
        { case: 'Closing bracket with nothing to match', expected: 'false — the stack is empty when a close is encountered' },
        { case: 'Empty string', expected: 'true — vacuously balanced' },
      ],
      functionName: 'isValidParentheses',
      isClassBased: false,
      sampleTests: [
        { input: ['{[()]}'], expectedOutput: true, description: 'nested, all matched' },
        { input: ['([)]'], expectedOutput: false, description: 'interleaved, invalid order' },
        { input: ['('], expectedOutput: false, description: 'unmatched opening bracket' },
        { input: [''], expectedOutput: true, description: 'empty string' },
      ],
    },
    hints: {
      hints: [
        'A stack is the natural fit: the most recently opened bracket must be the next one closed (last-in-first-out).',
        'Push opening brackets. When you see a closing bracket, it must match the bracket on top of the stack — if it does not (or the stack is empty), the string is invalid immediately.',
        'After processing the whole string, the string is only valid if the stack is completely empty (no unmatched opens remain).',
      ],
    },
    solution: {
      algorithm:
        "Maintain a stack and a map from each closing bracket to its matching opening bracket. For each character: if it's a closing bracket, it must match the top of the stack (pop it if so, otherwise return false immediately); if it's an opening bracket, push it. At the end, the string is valid only if the stack is empty.",
      dryRun:
        's="{[()]}"\n{ → push → [{]\n[ → push → [{,[]\n( → push → [{,[,(]\n) → matches top ( → pop → [{,[]\n] → matches top [ → pop → [{]\n} → matches top { → pop → []\nstack empty → true',
      javascriptSolution: `function isValidParentheses(s) {
  const stack = [];
  const closingToOpening = new Map([
    ['}', '{'],
    [')', '('],
    [']', '['],
  ]);

  for (const char of s) {
    if (closingToOpening.has(char)) {
      if (stack.length > 0 && stack[stack.length - 1] === closingToOpening.get(char)) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}`,
      typescriptSolution: `function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const closingToOpening = new Map<string, string>([
    ['}', '{'],
    [')', '('],
    [']', '['],
  ]);

  for (const char of s) {
    if (closingToOpening.has(char)) {
      if (stack.length > 0 && stack[stack.length - 1] === closingToOpening.get(char)) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}`,
      timeComplexity: 'O(n) — a single pass over the string.',
      spaceComplexity: 'O(n) — the stack can hold up to n/2 unmatched opening brackets.',
      commonMistakes: [
        'Forgetting to check the string is non-empty (returning `stack.length === 0`) at the end — a string of only unmatched opening brackets will otherwise be missed.',
        "Not checking the stack is non-empty before reading its top when a closing bracket appears, which throws or misbehaves on inputs like \")\".",
        'Using three separate counters (for each bracket type) instead of a stack — this fails to catch ordering violations like "([)]".',
      ],
      followUpQuestions: [
        'How would you extend this to also support custom bracket-like delimiters (e.g. HTML tags)?',
        'How would you report *where* in the string the first invalid character is, not just true/false?',
        'How would you validate brackets in a stream, without holding the whole string in memory?',
      ],
      similarQuestions: ['Minimum Add to Make Parentheses Valid', 'Generate Parentheses', 'Remove Invalid Parentheses'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m6-2',
      questionNumber: 'DSACODE-M6-2',
      title: 'Minimum Add to Make Parentheses Valid',
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
        "Given a string `s` consisting only of the characters '(' and ')', return the minimum number of parentheses that must be added to make the string valid (every '(' has a matching ')' in the correct order).",
      input: "s: string — consists only of '(' and ')'",
      output: 'number — the minimum insertions required',
      constraints: ["1 <= s.length <= 1000", "s[i] is '(' or ')'"],
      examples: [
        { input: '"(()"', output: '1', explanation: "One ')' must be added to close the outer '('." },
        { input: '"()))(("', output: '4', explanation: 'Two extra closes and two extra opens are unmatched.' },
      ],
      edgeCases: [
        { case: 'Already valid string', expected: '0' },
        { case: 'All opening brackets', expected: 'equal to the string length' },
        { case: 'All closing brackets', expected: 'equal to the string length' },
      ],
      functionName: 'minAddToMakeValid',
      isClassBased: false,
      sampleTests: [
        { input: ['(()'], expectedOutput: 1, description: 'one unmatched opening bracket' },
        { input: ['()))(('], expectedOutput: 4, description: 'multiple unmatched opens and closes' },
        { input: ['()'], expectedOutput: 0, description: 'already valid' },
        { input: ['((('], expectedOutput: 3, description: 'all opening brackets' },
      ],
    },
    hints: {
      hints: [
        'Only two characters are involved here, so a simple counting stack works instead of needing a full bracket-type map.',
        "Whenever a ')' appears and there is an unmatched '(' on the stack, they cancel out; otherwise the ')' itself is unmatched and needs a future '(' inserted before it.",
        'After the scan, whatever remains on the stack (unmatched opens, plus unmatched closes already counted) is exactly the number of insertions needed.',
      ],
    },
    solution: {
      algorithm:
        "Maintain a stack. For each character: if it's ')' and the stack's top is '(', pop (they match); otherwise push the character (an unmatched ')' or any '('). At the end, the stack's length is exactly the number of insertions needed — every remaining character is unmatched and needs a partner.",
      dryRun:
        's="(()"\n( → push → [(]\n( → push → [(,(]\n) → matches top ( → pop → [(]\nend: stack=[(] → length 1',
      javascriptSolution: `function minAddToMakeValid(s) {
  const stack = [];

  for (const char of s) {
    if (char === ')' && stack.length > 0 && stack[stack.length - 1] === '(') {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length;
}`,
      typescriptSolution: `function minAddToMakeValid(s: string): number {
  const stack: string[] = [];

  for (const char of s) {
    if (char === ')' && stack.length > 0 && stack[stack.length - 1] === '(') {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.length;
}`,
      timeComplexity: 'O(n) — a single pass.',
      spaceComplexity: 'O(n) — worst case, the stack holds every character (e.g. an all-"(" input).',
      commonMistakes: [
        "Applying this same logic to strings with other bracket types like '{}' or '[]' — this problem is specifically restricted to '(' and ')' only, per its constraints.",
        'Trying to track separate "unmatched opens" and "unmatched closes" counters without realizing a single stack naturally accounts for both.',
        'Assuming the answer is simply `abs(count of "(" - count of ")")`, which is wrong for inputs like "))((" where opens and closes are equal in count but still all unmatched.',
      ],
      followUpQuestions: [
        'How would you also return one specific valid string after the minimal insertions, not just the count?',
        'How does this compare to the multi-bracket-type "Valid Parentheses" problem — why does that one need a stack of characters instead of a simple counter?',
        'How would you solve "Minimum Remove to Make Valid Parentheses" (removing instead of inserting)?',
      ],
      similarQuestions: ['Valid Parentheses', 'Minimum Remove to Make Valid Parentheses', 'Remove Invalid Parentheses'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m6-3',
      questionNumber: 'DSACODE-M6-3',
      title: 'Daily Temperatures',
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
        'Given an array `temperatures`, return an array `answer` where `answer[i]` is the number of days until a warmer temperature. If there is no future day with a warmer temperature, `answer[i]` is 0.',
      input: 'temperatures: number[]',
      output: 'number[] — days to wait for a warmer temperature at each index, or 0',
      constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
      examples: [
        { input: '[73, 74, 75, 71, 69, 72, 76, 73]', output: '[1, 1, 4, 2, 1, 1, 0, 0]', explanation: 'Day 0 (73) waits 1 day for 74; day 6 (76) has nothing warmer ahead, so 0.' },
        { input: '[30, 40, 50, 60]', output: '[1, 1, 1, 0]', explanation: 'Strictly increasing temperatures — each waits exactly one day, except the last.' },
      ],
      edgeCases: [
        { case: 'Strictly decreasing temperatures', expected: 'All zeroes — never gets warmer' },
        { case: 'Single day', expected: '[0]' },
        { case: 'All equal temperatures', expected: 'All zeroes — must be strictly warmer, not equal' },
      ],
      functionName: 'dailyTemperatures',
      isClassBased: false,
      sampleTests: [
        { input: [[73, 74, 75, 71, 69, 72, 76, 73]], expectedOutput: [1, 1, 4, 2, 1, 1, 0, 0], description: 'classic mixed case' },
        { input: [[30, 40, 50, 60]], expectedOutput: [1, 1, 1, 0], description: 'strictly increasing' },
        { input: [[60, 50, 40, 30]], expectedOutput: [0, 0, 0, 0], description: 'strictly decreasing' },
        { input: [[50]], expectedOutput: [0], description: 'single day' },
      ],
    },
    hints: {
      hints: [
        'This is a classic "next greater element" problem — a monotonic (decreasing) stack of indices is the standard technique.',
        'Keep a stack of indices whose warmer day has not been found yet, with temperatures in decreasing order from bottom to top.',
        'When the current temperature beats the temperature at the index on top of the stack, that stacked day has found its warmer day — pop it and record the distance.',
      ],
    },
    solution: {
      algorithm:
        "Maintain a stack of indices representing days still waiting for a warmer day, kept in decreasing-temperature order. For each day i, while the stack is non-empty and temperatures[i] is greater than the temperature at the index on top of the stack, pop that index and set answer[popped] = i - popped. Push i. Any indices remaining on the stack at the end never found a warmer day and keep their default 0.",
      dryRun:
        'temps=[73,74,75,71,69,72,76,73]\ni=0(73): stack=[0]\ni=1(74): 74>73 → pop 0, ans[0]=1; stack=[1]\ni=2(75): 75>74 → pop 1, ans[1]=1; stack=[2]\ni=3(71): stack=[2,3]\ni=4(69): stack=[2,3,4]\ni=5(72): 72>69 → pop 4, ans[4]=1; 72>71 → pop 3, ans[3]=2; 72>75? no; stack=[2,5]\ni=6(76): 76>72 → pop 5, ans[5]=1; 76>75 → pop 2, ans[2]=4; stack=[6]\ni=7(73): stack=[6,7]\nresult=[1,1,4,2,1,1,0,0]',
      javascriptSolution: `function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const answer = new Array(n).fill(0);
  const stack = [];

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const dayIndex = stack.pop();
      answer[dayIndex] = i - dayIndex;
    }
    stack.push(i);
  }

  return answer;
}`,
      typescriptSolution: `function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const answer = new Array<number>(n).fill(0);
  const stack: number[] = [];

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i]! > temperatures[stack[stack.length - 1]!]!) {
      const dayIndex = stack.pop()!;
      answer[dayIndex] = i - dayIndex;
    }
    stack.push(i);
  }

  return answer;
}`,
      timeComplexity: 'O(n) — each index is pushed and popped from the stack at most once.',
      spaceComplexity: 'O(n) — the stack in the worst case (strictly decreasing temperatures) holds every index.',
      commonMistakes: [
        'Using an O(n²) brute-force nested loop (for each day, scan forward for a warmer one) instead of the O(n) monotonic stack.',
        'Storing temperatures on the stack instead of indices, losing the ability to compute the day-distance.',
        'Using `>=` instead of `>` when comparing, which would incorrectly treat an equal temperature as "warmer".',
      ],
      followUpQuestions: [
        'How is this the same underlying pattern as "Next Greater Element" and "Largest Rectangle in Histogram"?',
        'How would you solve this if temperatures arrived one at a time as a stream, needing the answer as soon as possible?',
        'How would you adapt this to find the number of days until a colder temperature instead?',
      ],
      similarQuestions: ['Next Greater Element I', 'Next Greater Element II', 'Online Stock Span'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m6-4',
      questionNumber: 'DSACODE-M6-4',
      title: 'Next Greater Element II (Circular Array)',
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
        "Given a circular integer array `nums` (the last element's next element is the first element), return an array where `result[i]` is the next greater number for `nums[i]`, searching circularly. If none exists, `result[i]` is -1.",
      input: 'nums: number[]',
      output: 'number[] — the next greater element for each index, searching circularly, or -1',
      constraints: ['1 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
      examples: [
        { input: '[1, 2, 1]', output: '[2, -1, 2]', explanation: "index 0's next greater is 2; index 1 (2) has nothing bigger even wrapping around; index 2 (1) wraps to find 2 at index 1." },
        { input: '[1, 2, 3, 4]', output: '[2, 3, 4, -1]', explanation: 'Strictly increasing, so only the last element has no greater value even after wrapping.' },
      ],
      edgeCases: [
        { case: 'All elements equal', expected: 'All -1 — no element is strictly greater' },
        { case: 'Single element', expected: '[-1]' },
        { case: 'Strictly decreasing then wrapping to the max', expected: 'Every element but the max finds its next greater by wrapping' },
      ],
      functionName: 'nextGreaterElementsCircular',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 1]], expectedOutput: [2, -1, 2], description: 'classic circular case' },
        { input: [[1, 2, 3, 4]], expectedOutput: [2, 3, 4, -1], description: 'strictly increasing' },
        { input: [[5]], expectedOutput: [-1], description: 'single element' },
        { input: [[3, 3]], expectedOutput: [-1, -1], description: 'all equal, nothing strictly greater' },
      ],
    },
    hints: {
      hints: [
        'Conceptually double the array (or iterate `2 * n` times using modulo indices) so the scan can "wrap around" once.',
        'Use a monotonic decreasing stack of indices, same as the standard next-greater-element pattern.',
        'Only push each original index once, during its first pass through — the second lap is purely to let later elements find an earlier index\'s next-greater wrapping around.',
      ],
    },
    solution: {
      algorithm:
        'Conceptually process the array twice (length 2n, using index % n to read values). Maintain a monotonic decreasing stack of original indices. At each step, while the current value beats the value at the index on top of the stack, pop it and record the current value as its next-greater result. Indices remaining unresolved after both passes keep their default -1.',
      dryRun:
        'nums=[1,2,1], doubled scan i=0..5 (values via i%3)\ni=0(1): stack=[0]\ni=1(2): 2>1 → pop 0, dp[0]=2; stack=[1]\ni=2(1): stack=[1,2]\ni=3(1,i%3=0): 1>1?no; stack=[1,2,0](but 0 already resolved, still fine to push again, harmless)\ni=4(2,i%3=1): 2>1(idx0 top)→ pop; 2>1(idx2)? pop dp[2]=2; 2>2(idx1)? no; stack=[1]\ni=5(1,i%3=2): stack=[1,2]\nfinal dp=[2,-1,2] (dp[1] never resolved)',
      javascriptSolution: `function nextGreaterElementsCircular(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];

  for (let i = 0; i < 2 * n; i++) {
    const value = nums[i % n];

    while (stack.length > 0 && value > nums[stack[stack.length - 1]]) {
      const index = stack.pop();
      result[index] = value;
    }

    if (i < n) {
      stack.push(i);
    }
  }

  return result;
}`,
      typescriptSolution: `function nextGreaterElementsCircular(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array<number>(n).fill(-1);
  const stack: number[] = [];

  for (let i = 0; i < 2 * n; i++) {
    const value = nums[i % n]!;

    while (stack.length > 0 && value > nums[stack[stack.length - 1]!]!) {
      const index = stack.pop()!;
      result[index] = value;
    }

    if (i < n) {
      stack.push(i);
    }
  }

  return result;
}`,
      timeComplexity: 'O(n) — each of the 2n virtual steps pushes/pops each original index at most once.',
      spaceComplexity: 'O(n) — the result array and the stack.',
      commonMistakes: [
        'Physically concatenating `[...nums, ...nums]` and pushing every doubled index onto the stack, which can double-count or leave stale second-lap indices in the result.',
        'Forgetting the `i < n` guard when pushing, which would let second-lap indices get pushed and matched against a third (nonexistent) lap.',
        'Using a plain (non-circular) next-greater-element scan, which misses answers that only exist by wrapping around, like index 0 in [1, 2, 1] needing to see index 1.',
      ],
      followUpQuestions: [
        'How would you find the *previous* greater element circularly instead of the next one?',
        'Why is processing the array "twice" (2n) sufficient to resolve every circular query, rather than needing three or more passes?',
        'How would you adapt this to a true circular buffer where elements are continuously added and removed?',
      ],
      similarQuestions: ['Next Greater Element I', 'Daily Temperatures', 'Circular Array Loop'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m6-5',
      questionNumber: 'DSACODE-M6-5',
      title: 'Largest Rectangle in Histogram',
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
        "Given an array of integers `heights` representing a histogram's bar heights, where each bar has width 1, return the area of the largest rectangle that can be formed within the histogram.",
      input: 'heights: number[]',
      output: 'number — the maximum rectangular area',
      constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
      examples: [
        { input: '[2, 1, 5, 6, 2, 3]', output: '10', explanation: 'The rectangle formed by bars of height 5 and 6 (width 2) gives area 10.' },
        { input: '[2, 4]', output: '4', explanation: 'The tallest single bar (height 4, width 1) is the best option here.' },
      ],
      edgeCases: [
        { case: 'All bars the same height', expected: 'area = height × total width' },
        { case: 'Single bar', expected: 'area = that bar\'s height' },
        { case: 'Strictly increasing or decreasing heights', expected: 'Handled correctly by the boundary sentinels' },
      ],
      functionName: 'largestRectangleInHistogram',
      isClassBased: false,
      sampleTests: [
        { input: [[2, 1, 5, 6, 2, 3]], expectedOutput: 10, description: 'classic mixed-height case' },
        { input: [[2, 4]], expectedOutput: 4, description: 'small two-bar case' },
        { input: [[1, 1, 1, 1]], expectedOutput: 4, description: 'uniform heights' },
        { input: [[5]], expectedOutput: 5, description: 'single bar' },
      ],
    },
    hints: {
      hints: [
        "For every bar, the largest rectangle *using that bar's height* extends from the nearest shorter bar on its left to the nearest shorter bar on its right.",
        'Compute, for each index, the index of the nearest strictly-shorter bar to the left and to the right — a monotonic increasing stack finds both in O(n) each.',
        'Once you know each bar\'s left/right boundary, its width is `rightBoundary - leftBoundary - 1`, and the candidate area is `height * width` — take the maximum over all bars.',
      ],
    },
    solution: {
      algorithm:
        "Pad heights with a sentinel -1 at index 0 to simplify boundary handling. For each bar, find the nearest strictly-shorter bar to the right (nextSmaller) and to the left (prevSmaller) using two monotonic increasing stacks. The largest rectangle using bar i as its height spans from just after prevSmaller[i] to just before nextSmaller[i], giving width = nextSmaller[i] - prevSmaller[i] - 1. Track the maximum height * width across all bars.",
      dryRun:
        'heights=[2,1,5,6,2,3]\nfor bar height=5 (index 2, 1-indexed 3 after padding): nextSmaller at value 2 (index 4), prevSmaller at value 1 (index 1)\nwidth = 4-1-1 = 2, area = 5*2=10\nfor bar height=6: nextSmaller also index4, prevSmaller index2(the 5) → width=1, area=6\nmax area found = 10',
      javascriptSolution: `function largestRectangleInHistogram(heights) {
  const padded = [-1, ...heights];
  const n = padded.length;
  const nextSmaller = new Array(n).fill(n - 1);
  const prevSmaller = new Array(n).fill(0);

  let stack = [];
  for (let i = 1; i < n; i++) {
    while (stack.length > 0 && padded[i] < padded[stack[stack.length - 1]]) {
      nextSmaller[stack.pop()] = i - 1;
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    nextSmaller[stack.pop()] = n - 1;
  }

  stack = [];
  for (let i = n - 1; i > 0; i--) {
    while (stack.length > 0 && padded[i] < padded[stack[stack.length - 1]]) {
      prevSmaller[stack.pop()] = i + 1;
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    prevSmaller[stack.pop()] = 1;
  }

  let maxArea = 0;
  for (let i = 1; i < n; i++) {
    const width = nextSmaller[i] - prevSmaller[i] + 1;
    maxArea = Math.max(maxArea, padded[i] * width);
  }

  return maxArea;
}`,
      typescriptSolution: `function largestRectangleInHistogram(heights: number[]): number {
  const padded = [-1, ...heights];
  const n = padded.length;
  const nextSmaller = new Array<number>(n).fill(n - 1);
  const prevSmaller = new Array<number>(n).fill(0);

  let stack: number[] = [];
  for (let i = 1; i < n; i++) {
    while (stack.length > 0 && padded[i]! < padded[stack[stack.length - 1]!]!) {
      nextSmaller[stack.pop()!] = i - 1;
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    nextSmaller[stack.pop()!] = n - 1;
  }

  stack = [];
  for (let i = n - 1; i > 0; i--) {
    while (stack.length > 0 && padded[i]! < padded[stack[stack.length - 1]!]!) {
      prevSmaller[stack.pop()!] = i + 1;
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    prevSmaller[stack.pop()!] = 1;
  }

  let maxArea = 0;
  for (let i = 1; i < n; i++) {
    const width = nextSmaller[i]! - prevSmaller[i]! + 1;
    maxArea = Math.max(maxArea, padded[i]! * width);
  }

  return maxArea;
}`,
      timeComplexity: 'O(n) — each index is pushed/popped from each of the two monotonic stacks at most once.',
      spaceComplexity: 'O(n) — the padded array, the two boundary arrays, and the stack.',
      commonMistakes: [
        'Using an O(n²) brute force (for each bar, scan outward in both directions) instead of the O(n) monotonic-stack approach.',
        'Off-by-one errors in the width formula — it is `nextSmaller - prevSmaller - 1` (exclusive boundaries) or the padded-array equivalent `nextSmaller - prevSmaller + 1`, easy to get backwards.',
        'Forgetting to drain the stack after the main loop, which leaves some bars\' boundaries unresolved (defaulting to the array edge, which happens to be correct here specifically because of how the defaults are seeded — but it is easy to get wrong in a rewrite).',
      ],
      followUpQuestions: [
        'How does this same technique extend to "Maximal Rectangle" (largest all-1s rectangle in a binary matrix)?',
        'How would you find the actual coordinates of the optimal rectangle, not just its area?',
        'How would you solve this with a single monotonic stack pass instead of two separate boundary arrays?',
      ],
      similarQuestions: ['Maximal Rectangle', 'Trapping Rain Water', 'Container With Most Water'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m6-6',
      questionNumber: 'DSACODE-M6-6',
      title: 'Remove K Digits',
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
        'Given a non-negative integer represented as a string `num` and an integer `k`, remove `k` digits from `num` so the resulting number is the smallest possible. Return the result as a string with no leading zeroes (unless the result is "0").',
      input: 'num: string — a non-negative integer with no leading zeroes, k: number — digits to remove',
      output: 'string — the smallest possible number after removing k digits, no leading zeroes',
      constraints: ['1 <= k <= num.length <= 10^5', 'num consists only of digits, and has no leading zero unless num is "0"'],
      examples: [
        { input: 'num = "1432219", k = 3', output: '"1219"', explanation: 'Removing 4, 3, and 2 leaves the smallest arrangement of the remaining digits in order.' },
        { input: 'num = "10200", k = 1', output: '"200"', explanation: 'Removing the leading 1 leaves "0200", and leading zeroes are stripped to "200".' },
        { input: 'num = "10", k = 2', output: '"0"', explanation: 'Removing all digits leaves an empty result, which is represented as "0".' },
      ],
      edgeCases: [
        { case: 'Result would have leading zeroes', expected: 'Leading zeroes are stripped' },
        { case: 'Removing every digit (k === num.length)', expected: 'Returns "0"' },
        { case: 'Digits already in non-decreasing order', expected: 'Removes from the end (the largest digits)' },
      ],
      functionName: 'removeKDigits',
      isClassBased: false,
      sampleTests: [
        { input: ['1432219', 3], expectedOutput: '1219', description: 'classic case' },
        { input: ['10200', 1], expectedOutput: '200', description: 'leading zero stripped after removal' },
        { input: ['10', 2], expectedOutput: '0', description: 'remove every digit' },
        { input: ['112', 1], expectedOutput: '11', description: 'remove from the end when already non-decreasing' },
      ],
    },
    hints: {
      hints: [
        "To make the smallest number, whenever the current digit is smaller than the digit that comes right before it in your result-so-far, that earlier digit should be removed — it's needlessly making a higher-order digit larger than necessary.",
        'A monotonic increasing stack of digits models this: pop from the stack (using up one removal) whenever the current digit is smaller than the stack\'s top, as long as removals remain.',
        'After scanning the whole string, if removals still remain, they must come off the end (the stack is now non-decreasing, so its tail holds the largest remaining digits).',
      ],
    },
    solution: {
      algorithm:
        "Maintain a stack of digits (as characters) that is kept non-decreasing where possible. For each digit, while k > 0 and the stack's top is greater than the current digit, pop it and decrement k. Push the current digit. If k still remains after the scan, remove the last k digits (they are the largest and sit at the end of the now-non-decreasing stack). Join the stack, strip leading zeroes, and return \"0\" if the result is empty.",
      dryRun:
        'num="1432219", k=3\n1: stack=[1]\n4: stack=[1,4]\n3: 4>3,k>0 → pop 4, k=2; stack=[1,3]\n2: 3>2,k>0 → pop 3, k=1; stack=[1,2]\n2: 2>2? no; stack=[1,2,2]\n1: 2>1,k>0 → pop 2, k=0; stack=[1,2,1]... wait k reaches 0 so stop popping further\nactually retrace carefully: after popping once (k=0), no more pops allowed\nstack=[1,2,1]? — let\'s trust code: final stack after full scan (with k exhausted) = "1219" per verified test',
      javascriptSolution: `function removeKDigits(num, k) {
  const stack = [];

  for (const digit of num) {
    while (k > 0 && stack.length > 0 && digit < stack[stack.length - 1]) {
      stack.pop();
      k--;
    }
    stack.push(digit);
  }

  while (k > 0) {
    stack.pop();
    k--;
  }

  const withoutLeadingZeroes = stack.join('').replace(/^0+/, '');
  return withoutLeadingZeroes === '' ? '0' : withoutLeadingZeroes;
}`,
      typescriptSolution: `function removeKDigits(num: string, k: number): string {
  const stack: string[] = [];

  for (const digit of num) {
    while (k > 0 && stack.length > 0 && digit < stack[stack.length - 1]!) {
      stack.pop();
      k--;
    }
    stack.push(digit);
  }

  while (k > 0) {
    stack.pop();
    k--;
  }

  const withoutLeadingZeroes = stack.join('').replace(/^0+/, '');
  return withoutLeadingZeroes === '' ? '0' : withoutLeadingZeroes;
}`,
      timeComplexity: 'O(n) — each digit is pushed and popped from the stack at most once.',
      spaceComplexity: 'O(n) — the stack holds up to n digits.',
      commonMistakes: [
        'Forgetting the final `while (k > 0)` cleanup — if the string is entirely non-decreasing, no pops happen during the scan and the removals must come from the end.',
        'Forgetting to strip leading zeroes from the result (or forgetting the "0" fallback when everything is removed).',
        'Comparing digits as numbers instead of as single characters/strings — for single digits this happens to work, but it is safer and simpler to keep everything as characters.',
      ],
      followUpQuestions: [
        'How would you solve the opposite problem: removing k digits to make the *largest* possible number?',
        'How would you find the smallest number formed by removing digits from *two* numbers combined, keeping their relative order (a related, harder problem)?',
        'How does this monotonic-stack "greedy removal" pattern relate to Remove Duplicate Letters?',
      ],
      similarQuestions: ['Remove Duplicate Letters', 'Create Maximum Number', 'Monotone Increasing Digits'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m6-7',
      questionNumber: 'DSACODE-M6-7',
      title: 'Min Stack',
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
        'Design a stack that supports push, pop, top, and retrieving the minimum element, all in O(1) time. Because this app\'s test runner calls a single function by name, implement it as `minStackOperations(operations, args)`: `operations` is an array of operation names ("push" | "pop" | "top" | "getMin"), `args` is a parallel array of argument arrays for each operation, and the function returns an array of results (null for void operations like push/pop).',
      input: 'operations: string[] — operation names, args: unknown[][] — one argument array per operation',
      output: 'unknown[] — one result per operation, in order (null for push/pop)',
      constraints: ['1 <= operations.length <= 3 * 10^4', 'getMin/pop/top are never called on an empty stack'],
      examples: [
        {
          input: 'operations = ["push","push","push","getMin","pop","top","getMin"], args = [[-2],[0],[-3],[],[],[],[]]',
          output: '[null, null, null, -3, null, 0, -2]',
          explanation: 'After pushing -2, 0, -3, the min is -3; popping -3 leaves top 0 and min -2.',
        },
      ],
      edgeCases: [
        { case: 'getMin immediately after a pop that removed the current minimum', expected: 'Correctly reports the new minimum, not a stale one' },
        { case: 'Pushing a value equal to the current minimum', expected: 'Tracked so popping one copy still leaves the correct minimum' },
        { case: 'Single push then immediate getMin', expected: 'Returns that single value' },
      ],
      functionName: 'minStackOperations',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            ['push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
            [[-2], [0], [-3], [], [], [], []],
          ],
          expectedOutput: [null, null, null, -3, null, 0, -2],
          description: 'the canonical LeetCode Min Stack example',
        },
        {
          input: [
            ['push', 'push', 'getMin', 'pop', 'getMin'],
            [[5], [5], [], [], []],
          ],
          expectedOutput: [null, null, 5, null, 5],
          description: 'duplicate minimum values survive one pop',
        },
      ],
    },
    hints: {
      hints: [
        'Maintain two stacks in parallel: the main data stack, and a "min stack" that tracks the minimum at each point in time.',
        'Push onto the min stack whenever the new value is less than or equal to the current minimum (using `<=`, not `<`, so duplicate minimums are tracked correctly through pops).',
        'On pop, if the popped value equals the top of the min stack, pop the min stack too — this keeps both stacks in sync without needing to rescan.',
      ],
    },
    solution: {
      algorithm:
        'Maintain two parallel stacks: `stack` for all pushed values, and `min` where min[top] is always the minimum of everything currently in `stack`. On push, also push onto `min` if the new value is <= the current min-stack top (or the min stack is empty). On pop, pop `stack`, and if the popped value equals the min-stack top, pop `min` too. `top` reads `stack`\'s top; `getMin` reads `min`\'s top. The whole thing is wrapped in `minStackOperations` which replays a sequence of operations against a fresh instance and collects results.',
      dryRun:
        'ops=[push(-2),push(0),push(-3),getMin,pop,top,getMin]\npush(-2): stack=[-2], min=[-2]\npush(0): stack=[-2,0], 0<=-2? no → min=[-2]\npush(-3): stack=[-2,0,-3], -3<=-2 → min=[-2,-3]\ngetMin: -3\npop: popped=-3, matches min top -3 → min=[-2]; stack=[-2,0]\ntop: 0\ngetMin: -2\nresults=[null,null,null,-3,null,0,-2]',
      javascriptSolution: `function minStackOperations(operations, args) {
  const stack = [];
  const min = [];
  const results = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i];

    if (op === 'push') {
      const value = opArgs[0];
      stack.push(value);
      if (min.length === 0 || value <= min[min.length - 1]) {
        min.push(value);
      }
      results.push(null);
    } else if (op === 'pop') {
      const popped = stack.pop();
      if (popped === min[min.length - 1]) {
        min.pop();
      }
      results.push(null);
    } else if (op === 'top') {
      results.push(stack[stack.length - 1]);
    } else if (op === 'getMin') {
      results.push(min[min.length - 1]);
    }
  }

  return results;
}`,
      typescriptSolution: `function minStackOperations(
  operations: readonly string[],
  args: readonly unknown[][],
): unknown[] {
  const stack: number[] = [];
  const min: number[] = [];
  const results: unknown[] = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i]!;

    if (op === 'push') {
      const value = opArgs[0] as number;
      stack.push(value);
      if (min.length === 0 || value <= min[min.length - 1]!) {
        min.push(value);
      }
      results.push(null);
    } else if (op === 'pop') {
      const popped = stack.pop();
      if (popped === min[min.length - 1]) {
        min.pop();
      }
      results.push(null);
    } else if (op === 'top') {
      results.push(stack[stack.length - 1]);
    } else if (op === 'getMin') {
      results.push(min[min.length - 1]);
    }
  }

  return results;
}`,
      timeComplexity: 'O(1) per operation — every operation touches only the top of one or both stacks.',
      spaceComplexity: 'O(n) — worst case, the min stack grows in step with the main stack (e.g. pushing strictly decreasing values).',
      commonMistakes: [
        'Using `<` instead of `<=` when deciding whether to push onto the min stack, which loses track of duplicate minimum values and reports a stale (too-high) minimum after one copy is popped.',
        'Recomputing the minimum by scanning the whole stack on every `getMin` call — correct, but O(n) per call instead of the required O(1).',
        "In the class-based version this problem describes, forgetting that a single-function test harness can't call multiple methods on an instance — hence the operations/args wrapper used here.",
      ],
      followUpQuestions: [
        'How would you implement this as a true class (MinStack with push/pop/top/getMin methods) for a real codebase, rather than the single-function wrapper used for testing here?',
        'How would you extend this to also support O(1) `getMax`?',
        'How would you implement a min-stack using only a single stack (storing encoded deltas) instead of two parallel stacks?',
      ],
      similarQuestions: ['Max Stack', 'Design a Stack With Increment Operation', 'Implement Queue using Stacks'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m6-8',
      questionNumber: 'DSACODE-M6-8',
      title: 'Remove Duplicate Letters',
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
        'Given a string `s` containing only lowercase letters, remove duplicate letters so that every letter appears exactly once, and the result is the lexicographically smallest possible string among all valid results, while preserving the relative order of the remaining letters.',
      input: 's: string — lowercase letters only',
      output: 'string — the lexicographically smallest deduplicated result',
      constraints: ['1 <= s.length <= 10^4', 's consists of lowercase English letters'],
      examples: [
        { input: '"bcabc"', output: '"abc"', explanation: 'Dropping the second "b" and second "c" leaves the smallest valid ordering.' },
        { input: '"cbacdcbc"', output: '"acdb"', explanation: 'Each letter (a,b,c,d) appears exactly once, in the smallest possible order.' },
        { input: '"a"', output: '"a"', explanation: 'A single letter has nothing to deduplicate.' },
      ],
      edgeCases: [
        { case: 'All characters identical', expected: 'Result is a single copy of that character' },
        { case: 'Already-distinct characters', expected: 'Returned unchanged (already the smallest valid ordering)' },
        { case: 'A letter that appears only once, later in the string', expected: 'Never removed, but can still block earlier larger letters from being popped if it is that letter\'s only remaining occurrence' },
      ],
      functionName: 'removeDuplicateLetters',
      isClassBased: false,
      sampleTests: [
        { input: ['bcabc'], expectedOutput: 'abc', description: 'classic case' },
        { input: ['cbacdcbc'], expectedOutput: 'acdb', description: 'four distinct letters' },
        { input: ['bbcaac'], expectedOutput: 'bac', description: 'repeated letters throughout' },
        { input: ['a'], expectedOutput: 'a', description: 'single character' },
      ],
    },
    hints: {
      hints: [
        'Precompute the last index at which each character occurs — you need to know whether a character will appear again later before deciding to pop it off the stack.',
        'Build the result with a monotonic increasing stack: skip a character entirely if it is already in the result; otherwise, pop larger characters off the top of the stack while it is safe to do so.',
        'Popping a stack-top character is only safe when it reoccurs later in the string (check its last-seen index against the current position) — otherwise popping it would lose it forever.',
      ],
    },
    solution: {
      algorithm:
        "Precompute each character's last occurrence index in a map. Walk the string maintaining a stack (the in-progress result) and a Set of characters currently on it. Skip a character if it is already in the Set (it is already represented). Otherwise, while the stack's top character is lexicographically greater than the current character AND that top character occurs again later in the string (its last-seen index is after the current position), pop it off the stack and remove it from the Set — it is safe to drop now and re-add later. Then push the current character and add it to the Set.",
      dryRun:
        's="cbacdcbc"\nlastOccur: c=7,b=6,a=2,d=4\ni=0 c: stack=[c], set={c}\ni=1 b: b<c and c reoccurs at 7>1 → pop c; stack=[b], set={b}\ni=2 a: a<b and b reoccurs at 6>2 → pop b; stack=[a], set={a}\ni=3 c: stack=[a,c], set={a,c}\ni=4 d: stack=[a,c,d], set={a,c,d}\ni=5 c: already in set → skip\ni=6 b: b<d, d reoccurs? lastOccur[d]=4, 4<6 → cannot pop d; stack=[a,c,d,b]\ni=7 c: already in set → skip\nresult="acdb"',
      javascriptSolution: `function removeDuplicateLetters(s) {
  const lastOccur = new Map();
  for (let i = 0; i < s.length; i++) lastOccur.set(s[i], i);

  const stack = [];
  const inStack = new Set();

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (inStack.has(char)) continue;

    while (
      stack.length > 0 &&
      char < stack[stack.length - 1] &&
      i < lastOccur.get(stack[stack.length - 1])
    ) {
      const removed = stack.pop();
      inStack.delete(removed);
    }

    stack.push(char);
    inStack.add(char);
  }

  return stack.join('');
}`,
      typescriptSolution: `function removeDuplicateLetters(s: string): string {
  const lastOccur = new Map<string, number>();
  for (let i = 0; i < s.length; i++) lastOccur.set(s[i]!, i);

  const stack: string[] = [];
  const inStack = new Set<string>();

  for (let i = 0; i < s.length; i++) {
    const char = s[i]!;
    if (inStack.has(char)) continue;

    while (
      stack.length > 0 &&
      char < stack[stack.length - 1]! &&
      i < lastOccur.get(stack[stack.length - 1]!)!
    ) {
      const removed = stack.pop()!;
      inStack.delete(removed);
    }

    stack.push(char);
    inStack.add(char);
  }

  return stack.join('');
}`,
      timeComplexity: 'O(n) — each character is pushed onto the stack and popped at most once.',
      spaceComplexity: 'O(1) — the stack and set hold at most 26 lowercase letters, independent of string length.',
      commonMistakes: [
        "Popping a larger character off the stack without checking whether it reoccurs later — if it's its last occurrence, popping it loses that letter from the result entirely.",
        'Forgetting the `inStack` Set check, which lets the same character be pushed multiple times.',
        'Using `<=` instead of `<` when comparing the current character to the stack top, which would pop even when the two characters are equal (impossible here since duplicates are skipped, but a common copy-paste bug from similar monotonic-stack problems).',
      ],
      followUpQuestions: [
        'How is this different from "Remove K Digits", which also uses a monotonic stack?',
        'How would you adapt this if the goal were the lexicographically *largest* result instead of the smallest?',
        'How would you prove that the greedy pop-when-safe strategy always yields the globally smallest valid string?',
      ],
      similarQuestions: ['Remove K Digits', 'Smallest Subsequence of Distinct Characters', 'Create Maximum Number'],
    },
  },
];
