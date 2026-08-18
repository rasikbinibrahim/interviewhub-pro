// Hand-authored coding questions covering the "Array Reverse /
// Rearrangement" section of the JS Coding Interview Master Question Bank.
// The source list's "without reverse()", "using a loop", and "using two
// pointers" bullets are all the same technique in practice, so they are
// consolidated into a single manual-reverse question alongside the
// built-in .reverse() version. Every sampleTests entry has been checked
// against the reference solution below.

import type { MockCodingQuestion } from '@/mocks/questions';

const COMPANIES = ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Flipkart', 'Zoho', 'Freshworks'];
const CATEGORY = 'Array Rearrangement';

export const MOCK_JAVASCRIPT_ARRAY_REVERSE_ROTATE_CODING_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'js-arr-rev-1',
      questionNumber: 'JSARR-21',
      title: 'Reverse an Array (Using Array.prototype.reverse)',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Built-in Methods'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return a new array containing the elements of the input array in reverse order, using the built-in Array.prototype.reverse().',
      input: 'arr: unknown[]',
      output: 'unknown[] — a new array with elements in reverse order',
      constraints: ['0 <= arr.length <= 10^5', 'The input array must not be mutated'],
      examples: [{ input: '[1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'Elements in reverse order.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns []' }],
      functionName: 'reverseArrayBuiltIn',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5]], expectedOutput: [5, 4, 3, 2, 1], description: 'five elements' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
        { input: [[1]], expectedOutput: [1], description: 'single element' },
      ],
    },
    hints: {
      hints: [
        '`Array.prototype.reverse()` reverses an array in place and returns the same reference.',
        'Since the input must not be mutated, call `.reverse()` on a copy (e.g. via `.slice()`), not on `arr` directly.',
        'This is the one-liner version — see "Reverse an Array Manually" for the loop-based approach interviewers usually want you to also demonstrate.',
      ],
    },
    solution: {
      algorithm: 'Copy the array with .slice() to avoid mutating the input, then call .reverse() on the copy.',
      dryRun: '[1,2,3,4,5] -> slice -> [1,2,3,4,5] -> reverse() -> [5,4,3,2,1]',
      javascriptSolution: `function reverseArrayBuiltIn(arr) {
  return arr.slice().reverse();
}`,
      typescriptSolution: `function reverseArrayBuiltIn<T>(arr: T[]): T[] {
  return arr.slice().reverse();
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n) for the copy.',
      commonMistakes: [
        'Calling `arr.reverse()` directly, mutating the caller\'s array — a common source of subtle bugs when the caller did not expect it.',
        'Assuming `.reverse()` returns a new array; it returns the same, now-reversed, array reference.',
      ],
      followUpQuestions: ['How would you reverse without the built-in method, in-place, using O(1) extra space?', 'Why might an interviewer ask you to implement reverse manually even though `.reverse()` exists?'],
      similarQuestions: ['Reverse an Array Manually (Two Pointers)', 'Reverse Only Part of an Array'],
    },
  },
  {
    detail: {
      id: 'js-arr-rev-2',
      questionNumber: 'JSARR-22',
      title: 'Reverse an Array Manually (Two-Pointer, No Built-in)',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Two Pointers', 'In-place Algorithms'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Reverse an array without using Array.prototype.reverse(), by swapping elements from both ends toward the middle (the two-pointer technique). Return a new array; do not mutate the input.',
      input: 'arr: unknown[]',
      output: 'unknown[] — a new array with elements in reverse order',
      constraints: ['0 <= arr.length <= 10^5', 'Must not call .reverse()', 'The input array must not be mutated'],
      examples: [{ input: '[1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'Elements swapped from outside in.' }],
      edgeCases: [{ case: 'Empty or single-element array', expected: 'Returned unchanged' }],
      functionName: 'reverseArrayManual',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5]], expectedOutput: [5, 4, 3, 2, 1], description: 'odd length' },
        { input: [[1, 2, 3, 4]], expectedOutput: [4, 3, 2, 1], description: 'even length' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
        { input: [[1]], expectedOutput: [1], description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'Copy the input first so the original array is untouched.',
        'Maintain a `left` pointer starting at 0 and a `right` pointer starting at the last index; swap the two elements and move both pointers toward the center.',
        'Stop when `left >= right` — for even-length arrays the pointers cross without landing on the same index; for odd-length arrays the middle element never needs swapping.',
      ],
    },
    solution: {
      algorithm: 'Copy the array. With left=0 and right=length-1, repeatedly swap arr[left] and arr[right], incrementing left and decrementing right, until left >= right.',
      dryRun: '[1,2,3,4,5] copy\nleft=0,right=4: swap -> [5,2,3,4,1]\nleft=1,right=3: swap -> [5,4,3,2,1]\nleft=2,right=2: stop',
      javascriptSolution: `function reverseArrayManual(arr) {
  const result = arr.slice();
  let left = 0;
  let right = result.length - 1;
  while (left < right) {
    [result[left], result[right]] = [result[right], result[left]];
    left++;
    right--;
  }
  return result;
}`,
      typescriptSolution: `function reverseArrayManual<T>(arr: T[]): T[] {
  const result = arr.slice();
  let left = 0;
  let right = result.length - 1;
  while (left < right) {
    [result[left], result[right]] = [result[right], result[left]];
    left++;
    right--;
  }
  return result;
}`,
      timeComplexity: 'O(n) — each element is visited once via the two pointers.',
      spaceComplexity: 'O(n) for the copy (O(1) extra beyond the required output).',
      commonMistakes: [
        'Using `left <= right` as the loop condition, which re-swaps the middle element with itself on odd-length arrays — harmless here, but signals imprecise reasoning about the invariant.',
        'Forgetting to copy the array first, silently mutating the caller\'s data despite the "no built-in" constraint being about `.reverse()`, not about mutation.',
        'Swapping via a temporary variable incorrectly (assigning before reading the original value), losing data.',
      ],
      followUpQuestions: ['How would you reverse a linked list using the same left/right pointer intuition?', 'How would you reverse the array truly in-place (mutating the input) if that were allowed?'],
      similarQuestions: ['Reverse an Array (Using Array.prototype.reverse)', 'Reverse Every K Elements'],
    },
  },
  {
    detail: {
      id: 'js-arr-rev-3',
      questionNumber: 'JSARR-23',
      title: 'Reverse Only Part of an Array',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Two Pointers', 'Sub-ranges'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given an array and a start/end index range (inclusive), reverse only the elements within that range, leaving the rest of the array untouched.',
      input: 'arr: unknown[], start: number, end: number',
      output: 'unknown[] — a new array with arr[start..end] reversed in place, other elements unchanged',
      constraints: ['0 <= start <= end < arr.length'],
      examples: [{ input: '[1, 2, 3, 4, 5], 1, 3', output: '[1, 4, 3, 2, 5]', explanation: 'Indices 1 through 3 (values 2,3,4) are reversed to 4,3,2.' }],
      edgeCases: [{ case: 'start === end', expected: 'No change, a single element "reversed" is itself' }],
      functionName: 'reversePart',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5], 1, 3], expectedOutput: [1, 4, 3, 2, 5], description: 'reverse a middle sub-range' },
        { input: [[1, 2, 3, 4, 5], 0, 4], expectedOutput: [5, 4, 3, 2, 1], description: 'range covers the whole array' },
        { input: [[1, 2, 3], 1, 1], expectedOutput: [1, 2, 3], description: 'single-index range is a no-op' },
      ],
    },
    hints: {
      hints: [
        'This is the same two-pointer swap as a full reverse, just bounded by `start` and `end` instead of `0` and `length - 1`.',
        'Copy the array first, then swap inward within [start, end].',
        'The rest of the array outside the range is left completely untouched by construction, since the loop never indexes outside [start, end].',
      ],
    },
    solution: {
      algorithm: 'Copy the array. With left=start and right=end, swap and move pointers inward until left >= right, leaving indices outside [start, end] untouched.',
      dryRun: '[1,2,3,4,5], start=1,end=3\nleft=1,right=3: swap arr[1],arr[3] -> [1,4,3,2,5]\nleft=2,right=2: stop',
      javascriptSolution: `function reversePart(arr, start, end) {
  const result = arr.slice();
  let left = start;
  let right = end;
  while (left < right) {
    [result[left], result[right]] = [result[right], result[left]];
    left++;
    right--;
  }
  return result;
}`,
      typescriptSolution: `function reversePart<T>(arr: T[], start: number, end: number): T[] {
  const result = arr.slice();
  let left = start;
  let right = end;
  while (left < right) {
    [result[left], result[right]] = [result[right], result[left]];
    left++;
    right--;
  }
  return result;
}`,
      timeComplexity: 'O(end - start).',
      spaceComplexity: 'O(n) for the copy.',
      commonMistakes: [
        'Reversing the whole array and then trying to splice the sub-range back in, which is more work and error-prone versus bounding the pointers directly.',
        'Off-by-one errors when the range is meant to be exclusive of `end` versus inclusive — this problem treats `end` as inclusive.',
      ],
      followUpQuestions: ['How is this technique used inside the "rotate array" family of problems (reverse three times)?', 'How would you validate start/end are in bounds before reversing?'],
      similarQuestions: ['Reverse an Array Manually (Two Pointers)', 'Reverse Every K Elements'],
    },
  },
  {
    detail: {
      id: 'js-arr-rev-4',
      questionNumber: 'JSARR-24',
      title: 'Reverse Every K Elements',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Two Pointers', 'Chunking'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an array and a block size K, reverse the elements within each consecutive block of K elements independently (the final block may be shorter than K and is still reversed).',
      input: 'arr: unknown[], k: number',
      output: 'unknown[] — a new array with every K-sized block internally reversed',
      constraints: ['1 <= k <= arr.length'],
      examples: [{ input: '[1, 2, 3, 4, 5, 6, 7, 8], 3', output: '[3, 2, 1, 6, 5, 4, 8, 7]', explanation: 'Blocks [1,2,3], [4,5,6], [7,8] are each reversed independently.' }],
      edgeCases: [{ case: 'k === arr.length', expected: 'The whole array is reversed as one block' }],
      functionName: 'reverseEveryK',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5, 6, 7, 8], 3], expectedOutput: [3, 2, 1, 6, 5, 4, 8, 7], description: 'blocks of 3 with a partial final block' },
        { input: [[1, 2, 3, 4], 4], expectedOutput: [4, 3, 2, 1], description: 'k equals array length' },
        { input: [[1, 2, 3, 4], 1], expectedOutput: [1, 2, 3, 4], description: 'k of 1 reverses nothing' },
      ],
    },
    hints: {
      hints: [
        'Walk the array in steps of K (`for (let i = 0; i < arr.length; i += k)`), treating each step as the start of a block.',
        'For each block, reverse just that sub-range using the same two-pointer swap as "Reverse Only Part of an Array", bounded by `Math.min(i + k - 1, arr.length - 1)`.',
        'The `Math.min` bound handles the final, possibly-shorter block automatically.',
      ],
    },
    solution: {
      algorithm: 'Copy the array. For each block start i (stepping by k), reverse the sub-range [i, min(i + k - 1, length - 1)] using the two-pointer swap.',
      dryRun: "[1..8], k=3\ni=0: reverse [0,2] -> [3,2,1,4,5,6,7,8]\ni=3: reverse [3,5] -> [3,2,1,6,5,4,7,8]\ni=6: reverse [6,7] (partial block) -> [3,2,1,6,5,4,8,7]",
      javascriptSolution: `function reverseEveryK(arr, k) {
  const result = arr.slice();
  for (let i = 0; i < result.length; i += k) {
    let left = i;
    let right = Math.min(i + k - 1, result.length - 1);
    while (left < right) {
      [result[left], result[right]] = [result[right], result[left]];
      left++;
      right--;
    }
  }
  return result;
}`,
      typescriptSolution: `function reverseEveryK<T>(arr: T[], k: number): T[] {
  const result = arr.slice();
  for (let i = 0; i < result.length; i += k) {
    let left = i;
    let right = Math.min(i + k - 1, result.length - 1);
    while (left < right) {
      [result[left], result[right]] = [result[right], result[left]];
      left++;
      right--;
    }
  }
  return result;
}`,
      timeComplexity: 'O(n) — every element participates in exactly one swap pair within its block.',
      spaceComplexity: 'O(n) for the copy.',
      commonMistakes: [
        'Forgetting the `Math.min` bound, causing an out-of-bounds `right` pointer on the final partial block.',
        'Reversing the entire array once instead of block-by-block, which produces a completely different (and wrong) result.',
        'Stepping the outer loop by 1 instead of by `k`, reversing far more blocks than intended.',
      ],
      followUpQuestions: ['How would this change if only every other block should be reversed (like LeetCode\'s "Reverse String II")?', 'How would you reverse blocks from the end of the array instead of the start?'],
      similarQuestions: ['Reverse Only Part of an Array', 'Rotate Array Left by K Positions'],
    },
  },
  {
    detail: {
      id: 'js-arr-rev-5',
      questionNumber: 'JSARR-25',
      title: 'Rotate Array Left by One',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Rotation'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Move the first element of an array to the end, shifting every other element one position to the left.',
      input: 'arr: unknown[]',
      output: 'unknown[] — a new array rotated left by one position',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3, 4, 5]', output: '[2, 3, 4, 5, 1]', explanation: '1 moves to the end.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns []' }],
      functionName: 'rotateLeftOne',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5]], expectedOutput: [2, 3, 4, 5, 1], description: 'rotate five elements left by one' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
        { input: [[7]], expectedOutput: [7], description: 'single element, unchanged' },
      ],
    },
    hints: {
      hints: ['An empty array has nothing to rotate — guard it explicitly.', 'The rest of the array (index 1 onward) followed by the first element gives the rotated result.', '`arr.slice(1).concat(arr.slice(0, 1))` expresses this directly.'],
    },
    solution: {
      algorithm: 'If the array is empty, return []. Otherwise concatenate everything after index 0 with the element at index 0.',
      dryRun: '[1,2,3,4,5] -> slice(1)=[2,3,4,5], slice(0,1)=[1] -> concat -> [2,3,4,5,1]',
      javascriptSolution: `function rotateLeftOne(arr) {
  if (arr.length === 0) return [];
  return arr.slice(1).concat(arr.slice(0, 1));
}`,
      typescriptSolution: `function rotateLeftOne<T>(arr: T[]): T[] {
  if (arr.length === 0) return [];
  return arr.slice(1).concat(arr.slice(0, 1));
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n) for the result.',
      commonMistakes: ['Not handling the empty-array case, though `slice`/`concat` on an empty array happen to still work here — worth confirming explicitly rather than by accident.', 'Using `.shift()` + `.push()`, which mutates the input array in place.'],
      followUpQuestions: ['How would you rotate left by one in true O(1) extra space, in place?', 'How does this generalize to "Rotate Array Left by K Positions"?'],
      similarQuestions: ['Rotate Array Right by One', 'Rotate Array Left by K Positions'],
    },
  },
  {
    detail: {
      id: 'js-arr-rev-6',
      questionNumber: 'JSARR-26',
      title: 'Rotate Array Right by One',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Rotation'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Move the last element of an array to the front, shifting every other element one position to the right.',
      input: 'arr: unknown[]',
      output: 'unknown[] — a new array rotated right by one position',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3, 4, 5]', output: '[5, 1, 2, 3, 4]', explanation: '5 moves to the front.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns []' }],
      functionName: 'rotateRightOne',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5]], expectedOutput: [5, 1, 2, 3, 4], description: 'rotate five elements right by one' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
        { input: [[7]], expectedOutput: [7], description: 'single element, unchanged' },
      ],
    },
    hints: {
      hints: ['Guard the empty-array case explicitly.', 'The last element, followed by everything before it, gives the rotated result.', '`arr.slice(-1).concat(arr.slice(0, -1))` expresses this directly.'],
    },
    solution: {
      algorithm: 'If the array is empty, return []. Otherwise concatenate the last element with everything before it.',
      dryRun: '[1,2,3,4,5] -> slice(-1)=[5], slice(0,-1)=[1,2,3,4] -> concat -> [5,1,2,3,4]',
      javascriptSolution: `function rotateRightOne(arr) {
  if (arr.length === 0) return [];
  return arr.slice(-1).concat(arr.slice(0, -1));
}`,
      typescriptSolution: `function rotateRightOne<T>(arr: T[]): T[] {
  if (arr.length === 0) return [];
  return arr.slice(-1).concat(arr.slice(0, -1));
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n) for the result.',
      commonMistakes: ['Using `.pop()` + `.unshift()`, which mutates the input and is O(n) per `.unshift()` call anyway.', 'Mixing up left and right rotation direction under time pressure.'],
      followUpQuestions: ['How would you rotate right by one in true O(1) extra space, in place?', 'How does this generalize to "Rotate Array Right by K Positions"?'],
      similarQuestions: ['Rotate Array Left by One', 'Rotate Array Right by K Positions'],
    },
  },
  {
    detail: {
      id: 'js-arr-rev-7',
      questionNumber: 'JSARR-27',
      title: 'Rotate Array Left by K Positions',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Rotation', 'Modulo'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Rotate an array left by K positions, wrapping elements that fall off the front around to the back. K may be larger than the array length or negative.',
      input: 'arr: unknown[], k: number',
      output: 'unknown[] — a new array rotated left by k positions',
      constraints: ['0 <= arr.length <= 10^5', 'k can be any integer, including negative or larger than arr.length'],
      examples: [{ input: '[1, 2, 3, 4, 5], 2', output: '[3, 4, 5, 1, 2]', explanation: 'The first two elements wrap to the end.' }],
      edgeCases: [
        { case: 'k larger than arr.length', expected: 'Effective rotation is k % length' },
        { case: 'Empty array', expected: 'Returns []' },
      ],
      functionName: 'rotateLeftK',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5], 1], expectedOutput: [2, 3, 4, 5, 1], description: 'k=1 matches rotate-left-by-one' },
        { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [3, 4, 5, 1, 2], description: 'k=2' },
        { input: [[1, 2, 3, 4, 5], 7], expectedOutput: [3, 4, 5, 1, 2], description: 'k larger than length wraps via modulo (7 % 5 = 2)' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
      ],
    },
    hints: {
      hints: [
        'Normalize k first with `((k % length) + length) % length` so it always lands in [0, length) even for negative or oversized k.',
        'A left rotation by the normalized k is just `arr.slice(k).concat(arr.slice(0, k))`.',
        'Guard the empty-array case before computing the modulo, since dividing by a length of 0 is undefined.',
      ],
    },
    solution: {
      algorithm: 'Built-in approach: arr.slice(normalizedK).concat(arr.slice(0, normalizedK)). Manual approach: single pass creating new array with result[i] = arr[(i + normalizedK) % n] or 3-step reverse technique.',
      dryRun: '[1,2,3,4,5], k=7, length=5 -> normalized k=((7%5)+5)%5=2 -> slice(2)=[3,4,5], slice(0,2)=[1,2] -> [3,4,5,1,2]',
      javascriptSolution: `function rotateLeftK(arr, k) {
  if (arr.length === 0) return [];
  const n = arr.length;
  const normalizedK = ((k % n) + n) % n;

  // Built-in approach (slice + concat):
  return arr.slice(normalizedK).concat(arr.slice(0, normalizedK));

  // Manual low-level approach (without built-in functions):
  // const result = new Array(n);
  // for (let i = 0; i < n; i++) {
  //   result[i] = arr[(i + normalizedK) % n];
  // }
  // return result;
}`,
      typescriptSolution: `function rotateLeftK<T>(arr: T[], k: number): T[] {
  if (arr.length === 0) return [];
  const n = arr.length;
  const normalizedK = ((k % n) + n) % n;

  // Built-in approach (slice + concat):
  return arr.slice(normalizedK).concat(arr.slice(0, normalizedK));

  // Manual low-level approach (without built-in functions):
  // const result: T[] = new Array(n);
  // for (let i = 0; i < n; i++) {
  //   result[i] = arr[(i + normalizedK) % n]!;
  // }
  // return result;
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n) for the result.',
      commonMistakes: [
        'Not normalizing k with the double-modulo trick, causing incorrect or negative slice indices when k is negative or larger than the array length.',
        'Rotating one step at a time in a loop k times, which is O(n*k) instead of O(n) and is disastrous for large k.',
        'Dividing by array length before checking for the empty-array case, causing a modulo-by-zero (NaN) bug.',
      ],
      followUpQuestions: ['How would you rotate in-place using the "reverse three times" trick (reverse whole array, then reverse each half)?', 'How does a negative k relate to rotating right instead?'],
      similarQuestions: ['Rotate Array Right by K Positions', 'Rotate Array Left by One'],
    },
  },
  {
    detail: {
      id: 'js-arr-rev-8',
      questionNumber: 'JSARR-28',
      title: 'Rotate Array Right by K Positions',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Rotation', 'Modulo'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Rotate an array right by K positions, wrapping elements that fall off the back around to the front. K may be larger than the array length or negative.',
      input: 'arr: unknown[], k: number',
      output: 'unknown[] — a new array rotated right by k positions',
      constraints: ['0 <= arr.length <= 10^5', 'k can be any integer, including negative or larger than arr.length'],
      examples: [{ input: '[1, 2, 3, 4, 5], 2', output: '[4, 5, 1, 2, 3]', explanation: 'The last two elements wrap to the front.' }],
      edgeCases: [
        { case: 'k larger than arr.length', expected: 'Effective rotation is k % length' },
        { case: 'Empty array', expected: 'Returns []' },
      ],
      functionName: 'rotateRightK',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5], 1], expectedOutput: [5, 1, 2, 3, 4], description: 'k=1 matches rotate-right-by-one' },
        { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [4, 5, 1, 2, 3], description: 'k=2' },
        { input: [[1, 2, 3, 4, 5], 7], expectedOutput: [4, 5, 1, 2, 3], description: 'k larger than length wraps via modulo (7 % 5 = 2)' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
      ],
    },
    hints: {
      hints: [
        'Normalize k the same way as left rotation: `((k % length) + length) % length`.',
        'A right rotation by the normalized k moves the last k elements to the front: `arr.slice(length - k).concat(arr.slice(0, length - k))`.',
        'Right-rotating by k is equivalent to left-rotating by (length - k), if you would rather reuse that logic.',
      ],
    },
    solution: {
      algorithm: 'Built-in approach: arr.slice(n - normalizedK).concat(arr.slice(0, n - normalizedK)). Manual approach: single pass creating new array with result[(i + normalizedK) % n] = arr[i] or 3-step reverse technique.',
      dryRun: '[1,2,3,4,5], k=7, length=5 -> normalized k=2 -> slice(5-2)=slice(3)=[4,5], slice(0,3)=[1,2,3] -> [4,5,1,2,3]',
      javascriptSolution: `function rotateRightK(arr, k) {
  if (arr.length === 0) return [];
  const n = arr.length;
  const normalizedK = ((k % n) + n) % n;

  // Built-in approach (slice + concat):
  return arr.slice(n - normalizedK).concat(arr.slice(0, n - normalizedK));

  // Manual low-level approach (without built-in functions):
  // const result = new Array(n);
  // for (let i = 0; i < n; i++) {
  //   result[(i + normalizedK) % n] = arr[i];
  // }
  // return result;
}`,
      typescriptSolution: `function rotateRightK<T>(arr: T[], k: number): T[] {
  if (arr.length === 0) return [];
  const n = arr.length;
  const normalizedK = ((k % n) + n) % n;

  // Built-in approach (slice + concat):
  return arr.slice(n - normalizedK).concat(arr.slice(0, n - normalizedK));

  // Manual low-level approach (without built-in functions):
  // const result: T[] = new Array(n);
  // for (let i = 0; i < n; i++) {
  //   result[(i + normalizedK) % n] = arr[i]!;
  // }
  // return result;
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n) for the result.',
      commonMistakes: [
        'Forgetting that `arr.slice(n - 0)` when normalizedK is 0 must return the full slice starting at n, not an empty rotation — this works correctly since `slice(n)` on a length-n array is `[]`, concatenated with the full `slice(0, n)`.',
        'Reimplementing this as "rotate left by (n - k)" without re-deriving the normalization, risking an off-by-one when k is already 0.',
        'Not normalizing k, breaking on negative or oversized k just like the left-rotation version.',
      ],
      followUpQuestions: ['How would you implement right rotation in-place using the "reverse three times" trick?', 'How would you rotate a `Deque`/linked list right by k more efficiently than an array?'],
      similarQuestions: ['Rotate Array Left by K Positions', 'Rotate Array Right by One'],
    },
  },
];
