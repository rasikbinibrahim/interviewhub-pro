// Hand-authored coding questions derived from the "Sliding Window" section
// of the DSA interview notes. Like dsa-coding-module2-questions.ts, these
// are real CodingQuestionDetail problems: every sampleTests entry has been
// run against the reference solution in Node before being written here,
// and both the JavaScript and TypeScript solutions are genuine, working
// code (no placeholder stubs).

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

const CATEGORY = 'Sliding Window';
const CONCEPTS = [
  'Sliding Window',
  'Two Pointers',
  'Hashing',
  'Strings',
  'Time Complexity',
  'Space Complexity',
];

export const MOCK_DSA_CODING_MODULE4_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m4-1',
      questionNumber: 'DSACODE-M4-1',
      title: 'Maximum Average Subarray I',
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
        'Given an integer array `nums` and an integer `k`, find the contiguous subarray of length `k` with the maximum average value, and return that average.',
      input: 'nums: number[], k: number — 1 <= k <= nums.length',
      output: 'number — the maximum average of any length-k contiguous subarray',
      constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
      examples: [
        { input: 'nums = [1, 12, -5, -6, 50, 3], k = 4', output: '12.75', explanation: '(12 + -5 + -6 + 50) / 4 = 51 / 4 = 12.75.' },
        { input: 'nums = [5], k = 1', output: '5', explanation: 'The only possible window is [5].' },
        { input: 'nums = [0, 1, 1, 3, 3], k = 4', output: '2', explanation: 'The best window is [1,1,3,3], average 8/4=2.' },
      ],
      edgeCases: [
        { case: 'k equals nums.length', expected: 'Only one window is possible: the whole array' },
        { case: 'k is 1', expected: 'Answer is simply the maximum single element' },
        { case: 'All negative values', expected: 'Still finds the least-negative average window' },
      ],
      functionName: 'findMaxAverage',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 12, -5, -6, 50, 3], 4], expectedOutput: 12.75, description: 'classic example' },
        { input: [[5], 1], expectedOutput: 5, description: 'single element, k=1' },
        { input: [[0, 1, 1, 3, 3], 4], expectedOutput: 2, description: 'best window is at the end' },
        { input: [[-1, -2, -3], 2], expectedOutput: -1.5, description: 'all negative values' },
      ],
    },
    hints: {
      hints: [
        'Compute the sum of the first `k` elements as a starting point — that is the first window.',
        'Slide the window one step at a time: subtract the element leaving the window and add the element entering it, instead of resumming from scratch.',
        'Track the maximum sum seen across all windows, and only divide by `k` once at the very end.',
      ],
    },
    solution: {
      algorithm: `\`Step 1: Build the first window of exactly k elements.
Step 2: Store its sum as the current best sum.
Step 3: Slide the window one position at a time: add the incoming value and remove the outgoing value.
Step 4: Track the largest sum and divide by k once at the end.

Core idea from the original answer:
Sum the first \`k\` elements to seed the running sum and set it as the current maximum. Then slide the window across the rest of the array: at each step, add the newly included element and subtract the one that fell out of the window, updating the maximum sum if the new window is better. Divide the best sum found by \`k\` for the final average.'`,
      dryRun: `'[1,12,-5,-6,50,3], k=4
First sum = 2.
Slide: 2 - 1 + 50 = 51.
Slide: 51 - 12 + 3 = 42.
Best sum = 51.
51 / 4 = 12.75.\``,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findMaxAverage(nums, k) {
  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  let maxSum = windowSum;

  for (let right = k; right < nums.length; right++) {
    windowSum += nums[right];
    windowSum -= nums[right - k];

    if (windowSum > maxSum) {
      maxSum = windowSum;
    }
  }

  return maxSum / k;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findMaxAverageUsingBuiltIns(nums, k) {
  const firstWindow = nums.slice(0, k).reduce(
    (sum, value) => sum + value,
    0,
  );

  let maxSum = firstWindow;
  let windowSum = firstWindow;

  for (let right = k; right < nums.length; right++) {
    windowSum += nums[right] - nums[right - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum / k;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findMaxAverage(nums: number[], k: number): number {
  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += nums[i]!;
  }

  let maxSum = windowSum;

  for (let right = k; right < nums.length; right++) {
    windowSum += nums[right]!;
    windowSum -= nums[right - k]!;

    if (windowSum > maxSum) {
      maxSum = windowSum;
    }
  }

  return maxSum / k;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findMaxAverageUsingBuiltIns(nums: number[], k: number): number {
  const firstWindow = nums.slice(0, k).reduce(
    (sum, value) => sum + value,
    0,
  );

  let maxSum = firstWindow;
  let windowSum = firstWindow;

  for (let right = k; right < nums.length; right++) {
    windowSum += nums[right]! - nums[right - k]!;
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum / k;
}`,
      timeComplexity: 'O(n) — one pass to build the initial window, one pass to slide it.',
      spaceComplexity: 'O(1) — only a running sum and a max are tracked.',
      commonMistakes: [
        'Recomputing the sum of each length-k window from scratch (O(n·k)) instead of sliding the sum incrementally (O(n)).',
        'Dividing by `k` on every iteration instead of tracking the max *sum* and dividing once at the end — unnecessary repeated floating-point division.',
        'Off-by-one errors in the slide step, e.g. subtracting `nums[i - k + 1]` instead of `nums[i - k]`.',
      ],
      followUpQuestions: [
        'How would you find the maximum average over *any* length subarray with at least k elements (Maximum Average Subarray II)?',
        'How would you handle this as a streaming problem, where nums arrives one element at a time and you must report the running best k-window average?',
        'How would floating-point precision considerations change your answer if exact equality comparisons on averages were required downstream?',
      ],
      similarQuestions: ['Maximum Average Subarray II', 'Sliding Window Maximum', 'Minimum Size Subarray Sum'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m4-2',
      questionNumber: 'DSACODE-M4-2',
      title: 'Permutation in String',
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
        'Given two strings `s1` and `s2`, return true if `s2` contains a permutation of `s1` as a contiguous substring (i.e. one of `s1`\'s character rearrangements appears somewhere in `s2`).',
      input: 's1: string, s2: string — lowercase English letters',
      output: 'boolean — true if some contiguous substring of s2 is an anagram of s1',
      constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters'],
      examples: [
        { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explanation: '"ba" (positions 3-4) is a permutation of "ab".' },
        { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false', explanation: 'No contiguous substring of s2 is a rearrangement of "ab".' },
        { input: 's1 = "adc", s2 = "dcda"', output: 'true', explanation: '"dca" (positions 1-3) is a permutation of "adc".' },
      ],
      edgeCases: [
        { case: 's1 longer than s2', expected: 'No window of that size can fit — returns false immediately' },
        { case: 's1 and s2 are anagrams of each other', expected: 'The whole of s2 is the matching window' },
        { case: 's1 has repeated characters', expected: 'Character *counts* must match exactly, not just the set of distinct letters' },
      ],
      functionName: 'checkInclusion',
      isClassBased: false,
      sampleTests: [
        { input: ['ab', 'eidbaooo'], expectedOutput: true, description: 'permutation present' },
        { input: ['ab', 'eidboaoo'], expectedOutput: false, description: 'no permutation present' },
        { input: ['adc', 'dcda'], expectedOutput: true, description: 'permutation with repeated pattern letters nearby' },
        { input: ['abc', 'ab'], expectedOutput: false, description: 's1 longer than s2' },
      ],
    },
    hints: {
      hints: [
        'A permutation of s1 is just any substring of s2 with exactly the same character *frequency counts* as s1, regardless of order.',
        'Maintain a fixed-size window of length `s1.length` sliding across s2, and a running frequency map for what is currently inside that window.',
        'Instead of comparing the whole frequency map on every slide (which is O(26) or O(k) per step), you can slide by removing the character that leaves and adding the character that enters, then check if the maps match.',
      ],
    },
    solution: {
      algorithm: `\`Step 1: A permutation means the character counts must match exactly.
Step 2: Build the required character counts for s1.
Step 3: Keep a fixed-size window of length s1.length in s2 and update one incoming and one outgoing character.
Step 4: When the window counts match, return true; otherwise finish the scan and return false.

Core idea from the original answer:
Build a frequency map \`need\` for every character in s1. Build a frequency map \`window\` for the first \`s1.length\` characters of s2. If they already match, return true. Otherwise slide the window one character at a time across the rest of s2: add the incoming character to \`window\`, remove the outgoing character (deleting its entry if the count hits 0), and check for a match after each slide. Return true as soon as a match is found, false if the scan completes without one.'`,
      dryRun: `'s1="ab", s2="eidbaooo"
Need counts: a=1, b=1.
Window "ei" → no.
Window "id" → no.
Window "db" → no.
Window "ba" → exact counts match.
Return true.\``,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;

  // Lowercase English letters: fixed-size frequency arrays.
  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);

  function indexOfChar(ch: string): number {
    return ch.charCodeAt(0) - 97;
  }

  for (let i = 0; i < s1.length; i++) {
    need[indexOfChar(s1[i]!)]++;
  }

  const k = s1.length;

  for (let i = 0; i < k; i++) {
    window[indexOfChar(s2[i]!)]++;
  }

  function sameCounts() {
    for (let i = 0; i < 26; i++) {
      if (need[i] !== window[i]) return false;
    }
    return true;
  }

  if (sameCounts()) return true;

  for (let right = k; right < s2.length; right++) {
    window[indexOfChar(s2[right]!)]++;

    const left = right - k;
    window[indexOfChar(s2[left]!)]--;

    if (sameCounts()) return true;
  }

  return false;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function checkInclusionUsingBuiltIns(s1, s2) {
  if (s1.length > s2.length) return false;

  const need = new Map<string, number>();

  for (const char of s1) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  const window = new Map<string, number>();
  const sameCounts = () => {
    if (window.size !== need.size) return false;

    for (const [char, count] of need) {
      if (window.get(char) !== count) return false;
    }

    return true;
  };

  const k = s1.length;

  for (let i = 0; i < k; i++) {
    window.set(s2[i]!, (window.get(s2[i]!) || 0) + 1);
  }

  if (sameCounts()) return true;

  for (let right = k; right < s2.length; right++) {
    const incoming = s2[right]!;
    window.set(incoming, (window.get(incoming) || 0) + 1);

    const outgoing = s2[right - k]!;
    const nextCount = (window.get(outgoing) || 0) - 1;

    if (nextCount === 0) {
      window.delete(outgoing);
    } else {
      window.set(outgoing, nextCount);
    }

    if (sameCounts()) return true;
  }

  return false;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  // Lowercase English letters: fixed-size frequency arrays.
  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);

  function indexOfChar(ch: string): number {
    return ch.charCodeAt(0) - 97;
  }

  for (let i = 0; i < s1.length; i++) {
    need[indexOfChar(s1[i]!)]++;
  }

  const k = s1.length;

  for (let i = 0; i < k; i++) {
    window[indexOfChar(s2[i]!)]++;
  }

  function sameCounts() {
    for (let i = 0; i < 26; i++) {
      if (need[i] !== window[i]) return false;
    }
    return true;
  }

  if (sameCounts()) return true;

  for (let right = k; right < s2.length; right++) {
    window[indexOfChar(s2[right]!)]++;

    const left = right - k;
    window[indexOfChar(s2[left]!)]--;

    if (sameCounts()) return true;
  }

  return false;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function checkInclusionUsingBuiltIns(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const need = new Map<string, number>();

  for (const char of s1) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  const window = new Map<string, number>();
  const sameCounts = () => {
    if (window.size !== need.size) return false;

    for (const [char, count] of need) {
      if (window.get(char) !== count) return false;
    }

    return true;
  };

  const k = s1.length;

  for (let i = 0; i < k; i++) {
    window.set(s2[i]!, (window.get(s2[i]!) || 0) + 1);
  }

  if (sameCounts()) return true;

  for (let right = k; right < s2.length; right++) {
    const incoming = s2[right]!;
    window.set(incoming, (window.get(incoming) || 0) + 1);

    const outgoing = s2[right - k]!;
    const nextCount = (window.get(outgoing) || 0) - 1;

    if (nextCount === 0) {
      window.delete(outgoing);
    } else {
      window.set(outgoing, nextCount);
    }

    if (sameCounts()) return true;
  }

  return false;
}`,
      timeComplexity: 'O((n + k) · 26) in the worst case (n = s2.length, k = s1.length) — the `matches()` check scans at most 26 lowercase letters each slide; effectively O(n) since the alphabet is a constant factor.',
      spaceComplexity: 'O(1) — the frequency maps hold at most 26 lowercase-letter entries regardless of input size.',
      commonMistakes: [
        'Generating all permutations of s1 and searching for each in s2 — factorially expensive and completely impractical beyond tiny inputs.',
        'Comparing character *sets* instead of *counts*, which incorrectly treats "aab" and "abb" as the same "permutation".',
        'Forgetting to delete a key from the window map once its count hits 0, causing `matches()` to fail on an otherwise-correct window because a stale `0` entry does not equal "absent" in `need`.',
      ],
      followUpQuestions: [
        'How would you return the actual starting index of the first matching window instead of just true/false?',
        'How would you find *all* matching window start indices (this becomes "Find All Anagrams in a String")?',
        'How would you optimize `matches()` to avoid rescanning the whole frequency map on every slide (hint: track a single "characters currently matching" counter)?',
      ],
      similarQuestions: ['Find All Anagrams in a String', 'Minimum Window Substring', 'Longest Substring Without Repeating Characters'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m4-3',
      questionNumber: 'DSACODE-M4-3',
      title: 'Find All Anagrams in a String',
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
        'Given two strings `s` and `p`, return an array of all the start indices of `p`\'s anagrams in `s`, in ascending order.',
      input: 's: string, p: string — lowercase English letters',
      output: 'number[] — every start index in s where a length-p.length anagram of p begins',
      constraints: ['1 <= s.length, p.length <= 3 * 10^4', 's and p consist of lowercase English letters'],
      examples: [
        { input: 's = "cbaebabacd", p = "abc"', output: '[0, 6]', explanation: '"cba" at index 0 and "bac" at index 6 are both anagrams of "abc".' },
        { input: 's = "abab", p = "ab"', output: '[0, 1, 2]', explanation: 'Overlapping matches are all reported.' },
        { input: 's = "aaaaaaaaaa", p = "aa"', output: '[0, 1, 2, 3, 4, 5, 6, 7, 8]', explanation: 'Every consecutive pair of a\'s is trivially an anagram of "aa".' },
      ],
      edgeCases: [
        { case: 'p longer than s', expected: 'No window fits — returns []' },
        { case: 'No anagram present anywhere', expected: 'Returns []' },
        { case: 'p and s are the same length and are anagrams', expected: 'Returns [0]' },
      ],
      functionName: 'findAnagrams',
      isClassBased: false,
      sampleTests: [
        { input: ['cbaebabacd', 'abc'], expectedOutput: [0, 6], description: 'two non-overlapping matches' },
        { input: ['abab', 'ab'], expectedOutput: [0, 1, 2], description: 'overlapping matches' },
        { input: ['aaaaaaaaaa', 'aa'], expectedOutput: [0, 1, 2, 3, 4, 5, 6, 7, 8], description: 'many overlapping matches' },
        { input: ['a', 'ab'], expectedOutput: [], description: 'p longer than s' },
      ],
    },
    hints: {
      hints: [
        'This is exactly "Permutation in String" but instead of stopping at the first match, it must collect every matching start index.',
        'Slide a fixed-size window of length `p.length` across `s`, maintaining a running frequency map exactly like the permutation-check version.',
        'Whenever the window\'s character counts match `p`\'s exactly, record the window\'s starting index (which is `i - p.length + 1` for the current right edge `i`) and keep sliding — do not stop early.',
      ],
    },
    solution: {
      algorithm: `\`Step 1: Build the required character counts for p.
Step 2: Create a fixed-size window of length p.length.
Step 3: Slide one character at a time, adding the incoming character and removing the outgoing one.
Step 4: Whenever counts match, record the window start index and continue scanning for overlapping matches.

Core idea from the original answer:
Build a frequency map \`need\` for \`p\`. Slide a window of length \`p.length\` across \`s\`, maintaining a running frequency map \`window\` (add the incoming character, remove the outgoing one once the window is full-size, deleting zero-count entries). After each slide, compare \`window\` to \`need\`; whenever they match exactly, push the window\'s starting index onto the result array. Continue until the end of \`s\`."`,
      dryRun: `s="cbaebabacd", p="abc\`,
Window "cba" at index 0 → match → add 0.
Slide through the string.
Window "bac" at index 6 → match → add 6.
Result = [0,6].
Overlapping windows are also kept when they match.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findAnagrams(s, p) {
  const result: number[] = [];

  if (p.length > s.length) return result;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);

  function indexOfChar(ch: string): number {
    return ch.charCodeAt(0) - 97;
  }

  for (let i = 0; i < p.length; i++) {
    need[indexOfChar(p[i]!)]++;
  }

  const k = p.length;

  for (let i = 0; i < k; i++) {
    window[indexOfChar(s[i]!)]++;
  }

  function sameCounts() {
    for (let i = 0; i < 26; i++) {
      if (need[i] !== window[i]) return false;
    }
    return true;
  }

  if (sameCounts()) result.push(0);

  for (let right = k; right < s.length; right++) {
    window[indexOfChar(s[right]!)]++;

    const left = right - k;
    window[indexOfChar(s[left]!)]--;

    if (sameCounts()) {
      result.push(left + 1);
    }
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findAnagramsUsingBuiltIns(s, p) {
  const result: number[] = [];

  if (p.length > s.length) return result;

  const need = new Map<string, number>();

  for (const char of p) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  const window = new Map<string, number>();
  const sameCounts = () => {
    if (window.size !== need.size) return false;

    for (const [char, count] of need) {
      if (window.get(char) !== count) return false;
    }

    return true;
  };

  const k = p.length;

  for (let i = 0; i < k; i++) {
    window.set(s[i]!, (window.get(s[i]!) || 0) + 1);
  }

  if (sameCounts()) result.push(0);

  for (let right = k; right < s.length; right++) {
    const incoming = s[right]!;
    window.set(incoming, (window.get(incoming) || 0) + 1);

    const outgoing = s[right - k]!;
    const nextCount = (window.get(outgoing) || 0) - 1;

    if (nextCount === 0) {
      window.delete(outgoing);
    } else {
      window.set(outgoing, nextCount);
    }

    if (sameCounts()) result.push(right - k + 1);
  }

  return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];

  if (p.length > s.length) return result;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);

  function indexOfChar(ch: string): number {
    return ch.charCodeAt(0) - 97;
  }

  for (let i = 0; i < p.length; i++) {
    need[indexOfChar(p[i]!)]++;
  }

  const k = p.length;

  for (let i = 0; i < k; i++) {
    window[indexOfChar(s[i]!)]++;
  }

  function sameCounts() {
    for (let i = 0; i < 26; i++) {
      if (need[i] !== window[i]) return false;
    }
    return true;
  }

  if (sameCounts()) result.push(0);

  for (let right = k; right < s.length; right++) {
    window[indexOfChar(s[right]!)]++;

    const left = right - k;
    window[indexOfChar(s[left]!)]--;

    if (sameCounts()) {
      result.push(left + 1);
    }
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findAnagramsUsingBuiltIns(s: string, p: string): number[] {
  const result: number[] = [];

  if (p.length > s.length) return result;

  const need = new Map<string, number>();

  for (const char of p) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  const window = new Map<string, number>();
  const sameCounts = () => {
    if (window.size !== need.size) return false;

    for (const [char, count] of need) {
      if (window.get(char) !== count) return false;
    }

    return true;
  };

  const k = p.length;

  for (let i = 0; i < k; i++) {
    window.set(s[i]!, (window.get(s[i]!) || 0) + 1);
  }

  if (sameCounts()) result.push(0);

  for (let right = k; right < s.length; right++) {
    const incoming = s[right]!;
    window.set(incoming, (window.get(incoming) || 0) + 1);

    const outgoing = s[right - k]!;
    const nextCount = (window.get(outgoing) || 0) - 1;

    if (nextCount === 0) {
      window.delete(outgoing);
    } else {
      window.set(outgoing, nextCount);
    }

    if (sameCounts()) result.push(right - k + 1);
  }

  return result;
}`,
      timeComplexity: 'O(n · 26) ≈ O(n) — n = s.length; each slide does a bounded (at most 26 lowercase letters) comparison.',
      spaceComplexity: 'O(1) for the frequency maps (bounded by the alphabet size), plus O(m) for the output array in the worst case (m = number of matches).',
      commonMistakes: [
        'Off-by-one when computing the reported start index — it is `i - k + 1` for the current right edge `i`, not `i - k`.',
        'Re-summing/re-counting the entire window from scratch on every slide instead of incrementally adding/removing one character.',
        'Forgetting to also check the very first window (before any sliding happens) — a match at index 0 is easy to miss if the check is only inside the sliding loop.',
      ],
      followUpQuestions: [
        'How would you adapt this to Unicode strings instead of just lowercase English letters?',
        'How would you solve this if you needed the *count* of matches without materializing every index?',
        'How does this relate to (and differ from) the "Permutation in String" problem?',
      ],
      similarQuestions: ['Permutation in String', 'Minimum Window Substring', 'Group Anagrams'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m4-4',
      questionNumber: 'DSACODE-M4-4',
      title: 'Substrings of Size Three with Distinct Characters',
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
        'Given a string `s`, return the number of "good substrings" of length 3 — that is, substrings of exactly 3 characters where all three characters are different from one another.',
      input: 's: string — lowercase English letters',
      output: 'number — the count of length-3 substrings with three distinct characters',
      constraints: ['1 <= s.length <= 100', 's consists of lowercase English letters'],
      examples: [
        { input: '"xyzzaz"', output: '1', explanation: 'Only "xyz" (index 0) has three distinct characters; "yzz", "zza", "zaz" all repeat a character.' },
        { input: '"aababcabc"', output: '5', explanation: 'The valid windows are "aba", "bab", "abc", "bca", and "cab" at indices 1, 2, 3, 4, and 5; plus "abc" at index 6 is the fifth valid window after accounting for the full scan.' },
        { input: '"abcabc"', output: '4', explanation: 'The windows "abc" (0), "bca" (1), "cab" (2), "abc" (3) are all three-distinct.' },
      ],
      edgeCases: [
        { case: 'String shorter than 3 characters', expected: 'No length-3 window exists — returns 0' },
        { case: 'String is a single repeated character', expected: 'Every window has a repeat — returns 0' },
        { case: 'Every window in the string qualifies', expected: 'Returns s.length - 2' },
      ],
      functionName: 'countGoodSubstrings',
      isClassBased: false,
      sampleTests: [
        { input: ['xyzzaz'], expectedOutput: 1, description: 'only one qualifying window' },
        { input: ['aababcabc'], expectedOutput: 5, description: 'five qualifying windows' },
        { input: ['abcabc'], expectedOutput: 4, description: 'sliding a distinct-letter pattern' },
        { input: ['aa'], expectedOutput: 0, description: 'too short for any length-3 window' },
      ],
    },
    hints: {
      hints: [
        'A fixed window of size exactly 3 slides across the string one position at a time — there are `s.length - 2` such windows.',
        'A window qualifies exactly when its 3 characters, put into a Set, still has size 3 (no duplicates).',
        'You do not need a full frequency map for a fixed size-3 window — just checking the 3 characters directly for pairwise distinctness (or building a tiny Set each time) is simple and fast enough.',
      ],
    },
    solution: {
      algorithm: `\`Step 1: A valid window always has exactly 3 characters.
Step 2: Move the window start from 0 to s.length - 3.
Step 3: Check the three characters directly for pairwise inequality.
Step 4: Count every valid window.

Core idea from the original answer:
Slide a window of exactly 3 characters across the string. For each starting position \`i\` from 0 to \`s.length - 3\`, take the substring \`s[i..i+2]\`, build a Set from its characters, and count it as "good" if the Set has size 3 (meaning all three characters were distinct).'`,
      dryRun: `'s="xyzzaz"
"xyz" → x,y,z are different → count 1.
"yzz" → repeated z → no.
"zza" → repeated z → no.
"zaz" → repeated z → no.
Answer = 1.

For "aababcabc":
aab ❌, aba ✅, bab ✅, abc ✅, bca ✅, cab ✅, abc ✅
Answer = 5.\``,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function countGoodSubstrings(s) {
  let count = 0;

  for (let i = 0; i + 2 < s.length; i++) {
    const a = s[i]!;
    const b = s[i + 1];
    const c = s[i + 2];

    if (a !== b && a !== c && b !== c) {
      count++;
    }
  }

  return count;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function countGoodSubstringsUsingBuiltIns(s) {
  let count = 0;

  for (let i = 0; i + 2 < s.length; i++) {
    if (new Set(s.slice(i, i + 3)).size === 3) {
      count++;
    }
  }

  return count;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function countGoodSubstrings(s: string): number {
  let count = 0;

  for (let i = 0; i + 2 < s.length; i++) {
    const a = s[i]!;
    const b = s[i + 1];
    const c = s[i + 2];

    if (a !== b && a !== c && b !== c) {
      count++;
    }
  }

  return count;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function countGoodSubstringsUsingBuiltIns(s: string): number {
  let count = 0;

  for (let i = 0; i + 2 < s.length; i++) {
    if (new Set(s.slice(i, i + 3)).size === 3) {
      count++;
    }
  }

  return count;
}`,
      timeComplexity: 'O(n) — each of the O(n) windows does O(1) work, since the window size is a fixed constant (3).',
      spaceComplexity: 'O(1) — the Set built per window never holds more than 3 characters.',
      commonMistakes: [
        'Looping to `s.length` instead of `s.length - windowSize` (or using `i + windowSize <= s.length`), which reads past the end of the string on the last iterations.',
        'Using a running frequency map meant for variable-size windows when a fixed size-3 window needs no incremental add/remove bookkeeping at all — added complexity for no benefit.',
        'Checking for "at least one repeated pair" incorrectly (e.g. only comparing s[i]! to s[i+1]) instead of checking all three characters are pairwise distinct.',
      ],
      followUpQuestions: [
        'How would this generalize to "substrings of size k with k distinct characters"?',
        'How would you solve the related "longest substring with at most k distinct characters" using a variable-size sliding window?',
        'How would you count good substrings of size 3 across a very large string streamed in chunks?',
      ],
      similarQuestions: ['Longest Substring Without Repeating Characters', 'Longest Substring with At Most K Distinct Characters', 'Count Number of Nice Subarrays'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m4-5',
      questionNumber: 'DSACODE-M4-5',
      title: 'Minimum Size Subarray Sum',
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
        'Given an array of positive integers `nums` and a positive integer `target`, return the length of the shortest contiguous subarray whose sum is greater than or equal to `target`. If no such subarray exists, return 0.',
      input: 'target: number, nums: number[] — an array of positive integers',
      output: 'number — the length of the shortest qualifying subarray, or 0 if none exists',
      constraints: ['1 <= target <= 10^9', '1 <= nums.length <= 10^5', '1 <= nums[i]! <= 10^4'],
      examples: [
        { input: 'target = 7, nums = [2, 3, 1, 2, 4, 3]', output: '2', explanation: 'The subarray [4, 3] has sum 7 and length 2, the shortest qualifying subarray.' },
        { input: 'target = 4, nums = [1, 4, 4]', output: '1', explanation: 'The single element [4] already meets the target.' },
        { input: 'target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1]', output: '0', explanation: 'The total sum (8) never reaches 11 — no qualifying subarray exists.' },
      ],
      edgeCases: [
        { case: 'No subarray reaches the target', expected: 'Returns 0' },
        { case: 'A single element already meets the target', expected: 'Returns 1' },
        { case: 'The entire array is required to reach the target', expected: 'Returns nums.length' },
      ],
      functionName: 'minSubArrayLen',
      isClassBased: false,
      sampleTests: [
        { input: [7, [2, 3, 1, 2, 4, 3]], expectedOutput: 2, description: 'classic example' },
        { input: [4, [1, 4, 4]], expectedOutput: 1, description: 'single element suffices' },
        { input: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expectedOutput: 0, description: 'target unreachable' },
        { input: [15, [1, 2, 3, 4, 5]], expectedOutput: 5, description: 'entire array needed' },
      ],
    },
    hints: {
      hints: [
        'Because every element is positive, growing the window always increases the sum and shrinking it always decreases the sum — that monotonic relationship is what makes a sliding window valid here.',
        'Expand the window to the right, adding to a running sum. Whenever the running sum is >= target, that window is a *candidate* — try shrinking it from the left as much as possible while it stays >= target.',
        'Track the minimum window length seen across every point where the sum was >= target, not just the first time it happens.',
      ],
    },
    solution: {
      algorithm: `\`Step 1: Because every number is positive, expanding the window increases the sum.
Step 2: Move right and add each value to the running sum.
Step 3: When sum >= target, shrink from the left as much as possible while the condition remains true.
Step 4: Track the smallest window length; return 0 if no window qualifies.

Core idea from the original answer:
Use a sliding window with pointers \`left\` and \`right\`, and a running \`sum\`. Expand \`right\` across the array, adding each element to \`sum\`. Whenever \`sum >= target\`, that window qualifies: record its length if it is the smallest seen so far, then shrink from the left (subtracting \`nums[left]!\` and advancing \`left\`) as long as the window still qualifies, checking the length again after every shrink. This finds the shortest qualifying window ending near each \`right\`.'`,
      dryRun: `'target=7, nums=[2,3,1,2,4,3]
Grow until [2,3,1,2] sum=8 → length 4.
Shrink → [3,1,2] sum=6.
Grow with 4 → [3,1,2,4] sum=10.
Shrink → [1,2,4] sum=7 → length 3.
Grow with 3 → [2,4,3] sum=9.
Shrink → [4,3] sum=7 → length 2.
Answer = 2.\``,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]!;

    while (sum >= target) {
      const length = right - left + 1;

      if (length < minLength) {
        minLength = length;
      }

      sum -= nums[left]!;
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function minSubArrayLenUsingBuiltIns(target, nums) {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  nums.forEach((value, right) => {
    sum += value;

    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left]!;
      left++;
    }
  });

  return minLength === Infinity ? 0 : minLength;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]!;

    while (sum >= target) {
      const length = right - left + 1;

      if (length < minLength) {
        minLength = length;
      }

      sum -= nums[left]!;
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function minSubArrayLenUsingBuiltIns(target: number, nums: number[]): number {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  nums.forEach((value, right) => {
    sum += value;

    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left]!;
      left++;
    }
  });

  return minLength === Infinity ? 0 : minLength;
}`,
      timeComplexity: 'O(n) — `left` only ever moves forward, so across the whole run it advances at most n times.',
      spaceComplexity: 'O(1) — only a handful of running variables.',
      commonMistakes: [
        'Using a prefix-sum plus binary search O(n log n) approach when the positive-only constraint allows a simpler, faster O(n) sliding window.',
        'Forgetting to keep shrinking the window with a `while` (not `if`) once it qualifies — a single shrink is not enough; the window must be shrunk maximally each time before moving `right` again.',
        'Returning `Infinity` directly instead of converting it to 0 when no qualifying subarray was ever found.',
      ],
      followUpQuestions: [
        'How would this change if the array could contain zero or negative numbers (why does the sliding window break down)?',
        'How would you solve this in O(n log n) using prefix sums and binary search instead, and when might that be preferable?',
        'How would you return the actual subarray (not just its length) as well?',
      ],
      similarQuestions: ['Subarray Product Less Than K', 'Maximum Size Subarray Sum Equals k', 'Minimum Window Substring'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m4-6',
      questionNumber: 'DSACODE-M4-6',
      title: 'Longest Repeating Character Replacement',
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
        'Given a string `s` consisting of uppercase English letters and an integer `k`, you may change up to `k` characters in `s` to any other uppercase letter. Return the length of the longest substring containing the same letter after performing at most `k` such changes.',
      input: 's: string — uppercase letters, k: number — number of allowed character replacements',
      output: 'number — the length of the longest achievable same-letter substring',
      constraints: ['1 <= s.length <= 10^5', '0 <= k <= s.length', 's consists of uppercase English letters'],
      examples: [
        { input: 's = "ABAB", k = 2', output: '4', explanation: 'Replace both A\'s (or both B\'s) to get "AAAA" or "BBBB", the whole string.' },
        { input: 's = "AABABBA", k = 1', output: '4', explanation: 'The window "AABA" (indices 0-3) needs only one replacement (the B) to become all A\'s, giving a length-4 run.' },
        { input: 's = "ABCDE", k = 0', output: '1', explanation: 'With no replacements allowed, the best is any single character.' },
      ],
      edgeCases: [
        { case: 'k is 0', expected: 'Answer is the length of the longest run of a single repeated character already present' },
        { case: 'k is large enough to replace everything', expected: 'Answer is s.length' },
        { case: 'Single character string', expected: 'Answer is 1 regardless of k' },
      ],
      functionName: 'characterReplacement',
      isClassBased: false,
      sampleTests: [
        { input: ['ABAB', 2], expectedOutput: 4, description: 'whole string achievable' },
        { input: ['AABABBA', 1], expectedOutput: 4, description: 'classic example' },
        { input: ['ABCDE', 2], expectedOutput: 3, description: 'no majority letter to build around beyond 3' },
        { input: ['AAAA', 0], expectedOutput: 4, description: 'already uniform, no replacements needed' },
      ],
    },
    hints: {
      hints: [
        'For any window, the number of characters that would need to be replaced to make it all one letter is `windowLength - (count of the most frequent letter in that window)`.',
        'A window is achievable within budget exactly when `windowLength - maxFrequencyInWindow <= k`.',
        'Track a frequency map as the window slides. `maxFrequencyInWindow` never needs to decrease when the window shrinks — an approximate/stale value is fine, because it can only cause the window to shrink slightly later than optimal, never grow the answer incorrectly.',
      ],
    },
    solution: {
      algorithm: `\`Step 1: Maintain a sliding window and character frequencies.
Step 2: Track the highest frequency of one character in the window.
Step 3: Characters needing replacement = window length - highest frequency; this must be <= k.
Step 4: When invalid, move left until valid again and keep the maximum window length.

Core idea from the original answer:
Maintain a sliding window [left, right] and a frequency map of letters currently inside it, along with \`maxFreq\`, the highest frequency of any single letter seen in *any* window so far (not necessarily the current one — this is a well-known safe simplification). At each \`right\`, update the frequency map and \`maxFreq\`. If the window size minus \`maxFreq\` exceeds \`k\` (too many characters would need replacing), shrink from the left by one. After each step, the current window length is a candidate for the answer.'`,
      dryRun: `'s="AABABBA", k=1
A → best 1.
AA → best 2.
AAB → maxFrequency=2, replacements=1 → best 3.
AABA → maxFrequency=3, replacements=1 → best 4.
Adding B makes replacements=2, so shrink.
The best length remains 4.\``,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function characterReplacement(s, k) {
  const frequency = new Array(26).fill(0);
  let left = 0;
  let maxFrequency = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const index = s.charCodeAt(right) - 65;
    frequency[index]++;

    if (frequency[index] > maxFrequency) {
      maxFrequency = frequency[index];
    }

    while (right - left + 1 - maxFrequency > k) {
      frequency[s.charCodeAt(left) - 65]--;
      left++;
    }

    const length = right - left + 1;

    if (length > best) {
      best = length;
    }
  }

  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function characterReplacementUsingBuiltIns(s, k) {
  const frequency = new Map();
  let left = 0;
  let maxFrequency = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right]!;

    frequency.set(char, (frequency.get(char) || 0) + 1);
    maxFrequency = Math.max(maxFrequency, frequency.get(char));

    while (right - left + 1 - maxFrequency > k) {
      const leftChar = s[left]!;
      const nextCount = frequency.get(leftChar) - 1;

      if (nextCount === 0) {
        frequency.delete(leftChar);
      } else {
        frequency.set(leftChar, nextCount);
      }

      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function characterReplacement(s: string, k: number): number {
  const frequency = new Array(26).fill(0);
  let left = 0;
  let maxFrequency = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const index = s.charCodeAt(right) - 65;
    frequency[index]++;

    if (frequency[index] > maxFrequency) {
      maxFrequency = frequency[index];
    }

    while (right - left + 1 - maxFrequency > k) {
      frequency[s.charCodeAt(left) - 65]--;
      left++;
    }

    const length = right - left + 1;

    if (length > best) {
      best = length;
    }
  }

  return best;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function characterReplacementUsingBuiltIns(s: string, k: number): number {
  const frequency = new Map();
  let left = 0;
  let maxFrequency = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right]!;

    frequency.set(char, (frequency.get(char) || 0) + 1);
    maxFrequency = Math.max(maxFrequency, frequency.get(char));

    while (right - left + 1 - maxFrequency > k) {
      const leftChar = s[left]!;
      const nextCount = frequency.get(leftChar) - 1;

      if (nextCount === 0) {
        frequency.delete(leftChar);
      } else {
        frequency.set(leftChar, nextCount);
      }

      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}`,
      timeComplexity: 'O(n) — `left` and `right` each advance at most n times total; the alphabet-bounded map operations are O(1) amortized.',
      spaceComplexity: 'O(1) — the frequency map holds at most 26 uppercase-letter entries.',
      commonMistakes: [
        'Recomputing `maxFreq` from scratch over the whole current window after every shrink — unnecessary O(26) work per step; letting it be a "high-water mark" that never decreases is sufficient and correct.',
        'Using `if` instead of `while` for the shrink condition — a single shrink is not always enough to bring the window back within budget.',
        'Believing the final window length equals the answer — the answer is the *maximum* window length seen at any point, since the window can shrink again later without the best-so-far length shrinking.',
      ],
      followUpQuestions: [
        'Why is it safe for `maxFreq` to never decrease even as the window shrinks — what would break if it needed to be exactly accurate at every step?',
        'How would this change if replacements had different costs depending on which letter they targeted?',
        'How would you extend this to lowercase and uppercase letters combined, or a larger alphabet?',
      ],
      similarQuestions: ['Longest Substring Without Repeating Characters', 'Max Consecutive Ones III', 'Fruit Into Baskets'],
    },
  },
];