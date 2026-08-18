// Hand-authored coding questions covering the "Basic Array Operations"
// section of the JS Coding Interview Master Question Bank (find
// length/first/last/middle/min/max/2nd-3rd largest-smallest, sum/average,
// positive/negative/even/odd filtering and counting). Every sampleTests
// entry has been checked against the reference solution below.

import type { MockCodingQuestion } from '@/mocks/questions';

const COMPANIES = ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Flipkart', 'Zoho', 'Freshworks'];
const CATEGORY = 'Array Basics';

export const MOCK_JAVASCRIPT_ARRAY_BASICS_CODING_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'js-arr-basic-1',
      questionNumber: 'JSARR-1',
      title: 'Find the Length of an Array',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Properties'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the number of elements in an array.',
      input: 'arr: unknown[]',
      output: 'number — the length of arr',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3]', output: '3', explanation: 'Three elements.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns 0' }],
      functionName: 'getArrayLength',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3]], expectedOutput: 3, description: 'three elements' },
        { input: [[]], expectedOutput: 0, description: 'empty array' },
        { input: [[7]], expectedOutput: 1, description: 'single element' },
      ],
    },
    hints: {
      hints: ['Arrays expose their size via the `.length` property.', 'No loop is needed — `.length` is O(1).', 'Works identically for empty arrays, returning 0.'],
    },
    solution: {
      algorithm: 'Return arr.length directly.',
      dryRun: '[1,2,3].length -> 3',
      javascriptSolution: `function getArrayLength(arr) {
  return arr.length;
}`,
      typescriptSolution: `function getArrayLength(arr: unknown[]): number {
  return arr.length;
}`,
      timeComplexity: 'O(1).',
      spaceComplexity: 'O(1).',
      commonMistakes: ['Looping to count elements manually instead of using `.length`.', 'Confusing `.length` (property) with `.length()` (calling it as a function, which throws).'],
      followUpQuestions: ['How does `.length` stay in sync when you push/pop elements?', 'How would you get the length of an array-like object (e.g. `arguments`)?'],
      similarQuestions: ['Print All Elements of an Array', 'Find the First Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-2',
      questionNumber: 'JSARR-2',
      title: 'Print (List) All Elements of an Array',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 2,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Iteration'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return every element of an array, in order, as a new array (standing in for "printing" each one).',
      input: 'arr: unknown[]',
      output: 'unknown[] — a copy of arr, iterated element by element',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3]', output: '[1, 2, 3]', explanation: 'Every element visited in order.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns []' }],
      functionName: 'listAllElements',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3]], expectedOutput: [1, 2, 3], description: 'lists three elements in order' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
      ],
    },
    hints: {
      hints: ['A `for...of` loop visits every element in order.', 'Push each visited element into a result array to make the traversal observable/testable.', 'This is the traversal building block every later array problem reuses.'],
    },
    solution: {
      algorithm: 'Loop over arr with for...of, collecting each element into a result array in order.',
      dryRun: '[1,2,3] -> visit 1, 2, 3 -> result=[1,2,3]',
      javascriptSolution: `function listAllElements(arr) {
  const result = [];
  for (const item of arr) {
    result.push(item);
  }
  return result;
}`,
      typescriptSolution: `function listAllElements<T>(arr: T[]): T[] {
  const result: T[] = [];
  for (const item of arr) {
    result.push(item);
  }
  return result;
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n) for the output copy.',
      commonMistakes: ['Using a `for...in` loop, which iterates indices (as strings) rather than values.', 'Mutating and returning the original array reference instead of a fresh traversal.'],
      followUpQuestions: ['How does `for...of` differ from `.forEach()` in terms of `break`/`continue` support?', 'How would you print index alongside value using `.entries()`?'],
      similarQuestions: ['Find the Length of an Array', 'Sum All Array Elements'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-3',
      questionNumber: 'JSARR-3',
      title: 'Find the First Element',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 2,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Indexing'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the first element of an array, or undefined if the array is empty.',
      input: 'arr: unknown[]',
      output: 'unknown — arr[0], or undefined when empty',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[10, 20, 30]', output: '10', explanation: 'First element.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns undefined' }],
      functionName: 'getFirstElement',
      isClassBased: false,
      sampleTests: [
        { input: [[10, 20, 30]], expectedOutput: 10, description: 'first of three' },
        { input: [[]], expectedOutput: undefined, description: 'empty array returns undefined' },
        { input: [[5]], expectedOutput: 5, description: 'single-element array' },
      ],
    },
    hints: {
      hints: ['Index 0 is the first element for any non-empty array.', 'Indexing an empty array at 0 naturally yields `undefined` — no special-casing needed.', 'No loop required.'],
    },
    solution: {
      algorithm: 'Return arr[0].',
      dryRun: '[10,20,30][0] -> 10',
      javascriptSolution: `function getFirstElement(arr) {
  return arr[0];
}`,
      typescriptSolution: `function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}`,
      timeComplexity: 'O(1).',
      spaceComplexity: 'O(1).',
      commonMistakes: ['Using `.shift()`, which mutates the original array by removing the first element as a side effect.', 'Adding an unnecessary length check before indexing, when `arr[0]` already handles the empty case gracefully.'],
      followUpQuestions: ['How would `arr.at(0)` compare to `arr[0]`?', 'How do you get the first element of an array-like `NodeList`?'],
      similarQuestions: ['Find the Last Element', 'Find the Middle Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-4',
      questionNumber: 'JSARR-4',
      title: 'Find the Last Element',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 2,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Indexing'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the last element of an array, or undefined if the array is empty.',
      input: 'arr: unknown[]',
      output: 'unknown — the last element, or undefined when empty',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[10, 20, 30]', output: '30', explanation: 'Last element.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns undefined' }],
      functionName: 'getLastElement',
      isClassBased: false,
      sampleTests: [
        { input: [[10, 20, 30]], expectedOutput: 30, description: 'last of three' },
        { input: [[]], expectedOutput: undefined, description: 'empty array returns undefined' },
        { input: [[5]], expectedOutput: 5, description: 'single-element array' },
      ],
    },
    hints: {
      hints: ['The last index of any array is `arr.length - 1`.', 'For an empty array, `arr.length - 1` is `-1`, and indexing at `-1` still yields `undefined` in plain JS.', 'No loop required.'],
    },
    solution: {
      algorithm: 'Return arr[arr.length - 1].',
      dryRun: '[10,20,30], length=3 -> arr[2] -> 30',
      javascriptSolution: `function getLastElement(arr) {
  return arr[arr.length - 1];
}`,
      typescriptSolution: `function getLastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}`,
      timeComplexity: 'O(1).',
      spaceComplexity: 'O(1).',
      commonMistakes: ['Using `.pop()`, which mutates the array by removing the last element.', 'Off-by-one: indexing `arr[arr.length]`, which is always out of bounds.'],
      followUpQuestions: ['How does `arr.at(-1)` avoid the `arr.length - 1` arithmetic?', 'How would this work for a linked list instead of an array?'],
      similarQuestions: ['Find the First Element', 'Find the Middle Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-5',
      questionNumber: 'JSARR-5',
      title: 'Find the Middle Element',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Indexing'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Return the middle element of an array. For an even-length array, return the lower-middle element (index (length - 1) / 2, floored).',
      input: 'arr: unknown[]',
      output: 'unknown — the middle element',
      constraints: ['1 <= arr.length <= 10^5'],
      examples: [
        { input: '[1, 2, 3, 4, 5]', output: '3', explanation: 'Odd length, single middle element.' },
        { input: '[1, 2, 3, 4]', output: '2', explanation: 'Even length, lower-middle element (index 1).' },
      ],
      edgeCases: [{ case: 'Single-element array', expected: 'That element is the middle' }],
      functionName: 'getMiddleElement',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5]], expectedOutput: 3, description: 'odd length' },
        { input: [[1, 2, 3, 4]], expectedOutput: 2, description: 'even length, lower-middle' },
        { input: [[9]], expectedOutput: 9, description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'The middle index for an odd-length array is `(length - 1) / 2`.',
        'For even-length arrays there are two middles; this problem picks the lower one, which `Math.floor((length - 1) / 2)` gives for both parities.',
        'Verify: length 5 -> floor(4/2)=2 (arr[2]); length 4 -> floor(3/2)=1 (arr[1]).',
      ],
    },
    solution: {
      algorithm: 'Compute the index Math.floor((arr.length - 1) / 2) and return arr at that index.',
      dryRun: '[1,2,3,4], length=4 -> floor(3/2)=1 -> arr[1]=2',
      javascriptSolution: `function getMiddleElement(arr) {
  return arr[Math.floor((arr.length - 1) / 2)];
}`,
      typescriptSolution: `function getMiddleElement<T>(arr: T[]): T {
  return arr[Math.floor((arr.length - 1) / 2)] as T;
}`,
      timeComplexity: 'O(1).',
      spaceComplexity: 'O(1).',
      commonMistakes: [
        'Using `Math.floor(length / 2)` instead of `Math.floor((length - 1) / 2)`, which picks the upper-middle for even lengths instead of the lower-middle.',
        'Not deciding up front which of the two middles to return for even-length arrays, leading to inconsistent behavior.',
      ],
      followUpQuestions: ['How would you return both middle elements for an even-length array?', 'How would you find the middle of a singly linked list in one pass (fast/slow pointers)?'],
      similarQuestions: ['Find the First Element', 'Find the Last Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-6',
      questionNumber: 'JSARR-6',
      title: 'Sum All Array Elements',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'reduce'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the sum of all numbers in an array.',
      input: 'arr: number[]',
      output: 'number — the sum of all elements',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3, 4]', output: '10', explanation: '1+2+3+4=10.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns 0' }],
      functionName: 'sumArrayElements',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4]], expectedOutput: 10, description: 'positive integers' },
        { input: [[]], expectedOutput: 0, description: 'empty array' },
        { input: [[-1, 1, -2, 2]], expectedOutput: 0, description: 'positives and negatives cancel out' },
      ],
    },
    hints: {
      hints: ['`Array.prototype.reduce` accumulates a running total in one pass.', 'Seed the accumulator at 0 so an empty array correctly returns 0.', 'No need for a separate loop variable — reduce handles the accumulation.'],
    },
    solution: {
      algorithm: 'Reduce the array with an addition accumulator starting at 0.',
      dryRun: '[1,2,3,4] -> 0+1=1 -> 1+2=3 -> 3+3=6 -> 6+4=10',
      javascriptSolution: `function sumArrayElements(arr) {
  return arr.reduce((total, num) => total + num, 0);
}`,
      typescriptSolution: `function sumArrayElements(arr: number[]): number {
  return arr.reduce((total, num) => total + num, 0);
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(1).',
      commonMistakes: ['Omitting the initial value `0` in `reduce`, which throws on an empty array instead of returning 0.', 'Using `+` to concatenate instead of add when array elements are numeric strings.'],
      followUpQuestions: ['How would you sum only even-indexed elements?', 'How would you compute a running (prefix) sum array instead of a single total?'],
      similarQuestions: ['Find Average of Array Elements', 'Find Maximum Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-7',
      questionNumber: 'JSARR-7',
      title: 'Find Average of Array Elements',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'reduce'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the average (arithmetic mean) of all numbers in an array. Return 0 for an empty array.',
      input: 'arr: number[]',
      output: 'number — the average of all elements',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3, 4]', output: '2.5', explanation: '(1+2+3+4)/4=2.5.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns 0, not NaN' }],
      functionName: 'averageArrayElements',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4]], expectedOutput: 2.5, description: 'average of four numbers' },
        { input: [[]], expectedOutput: 0, description: 'empty array returns 0, avoiding division by zero' },
        { input: [[10]], expectedOutput: 10, description: 'single element' },
      ],
    },
    hints: {
      hints: ['Sum the array first, then divide by its length.', 'Guard the empty-array case explicitly — `0 / 0` is `NaN`, not `0`.', 'Reuse the same reduce-based sum as the "Sum All Array Elements" problem.'],
    },
    solution: {
      algorithm: 'If the array is empty, return 0. Otherwise sum all elements and divide by arr.length.',
      dryRun: '[1,2,3,4] -> sum=10, length=4 -> 10/4=2.5',
      javascriptSolution: `function averageArrayElements(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((total, num) => total + num, 0);
  return sum / arr.length;
}`,
      typescriptSolution: `function averageArrayElements(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((total, num) => total + num, 0);
  return sum / arr.length;
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(1).',
      commonMistakes: ['Not guarding the empty-array case, producing `NaN` from a `0 / 0` division.', 'Dividing by a hardcoded count instead of `arr.length`, breaking for any input other than the example.'],
      followUpQuestions: ['How would you compute a running average as elements stream in?', 'How would you compute the weighted average given a parallel weights array?'],
      similarQuestions: ['Sum All Array Elements', 'Find Minimum Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-8',
      questionNumber: 'JSARR-8',
      title: 'Find Minimum Element',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Math.min'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the smallest number in a non-empty array.',
      input: 'arr: number[]',
      output: 'number — the minimum value',
      constraints: ['1 <= arr.length <= 10^5'],
      examples: [{ input: '[5, 2, 8, 1, 9]', output: '1', explanation: '1 is the smallest.' }],
      edgeCases: [{ case: 'All elements equal', expected: 'That value is the minimum' }],
      functionName: 'findMinElement',
      isClassBased: false,
      sampleTests: [
        { input: [[5, 2, 8, 1, 9]], expectedOutput: 1, description: 'mixed values' },
        { input: [[-3, -1, -7]], expectedOutput: -7, description: 'all negative' },
        { input: [[4, 4, 4]], expectedOutput: 4, description: 'all equal' },
      ],
    },
    hints: {
      hints: ['`Math.min(...arr)` spreads the array as arguments to find the minimum in one call.', 'For very large arrays, a manual loop avoids the call-stack limits of spreading into `Math.min`.', 'Track a running minimum, initialized to the first element.'],
    },
    solution: {
      algorithm: 'Initialize min to the first element, then walk the rest of the array, updating min whenever a smaller value is found.',
      dryRun: '[5,2,8,1,9] -> min=5 -> 2<5 -> min=2 -> 8 not< -> 1<2 -> min=1 -> 9 not<',
      javascriptSolution: `function findMinElement(arr) {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}`,
      typescriptSolution: `function findMinElement(arr: number[]): number {
  let min = arr[0]!;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i]! < min) min = arr[i]!;
  }
  return min;
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(1).',
      commonMistakes: ['Using `Math.min(...arr)` on very large arrays, risking "Maximum call stack size exceeded" from argument spreading.', 'Initializing `min` to `0` instead of `arr[0]`, which breaks when every element is positive or every element is negative.'],
      followUpQuestions: ['How would you find the minimum in a single pass while also tracking its index?', 'How does this compare to sorting the array and taking the first element?'],
      similarQuestions: ['Find Maximum Element', 'Find Second Smallest Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-9',
      questionNumber: 'JSARR-9',
      title: 'Find Maximum Element',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Math.max'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the largest number in a non-empty array.',
      input: 'arr: number[]',
      output: 'number — the maximum value',
      constraints: ['1 <= arr.length <= 10^5'],
      examples: [{ input: '[5, 2, 8, 1, 9]', output: '9', explanation: '9 is the largest.' }],
      edgeCases: [{ case: 'All elements equal', expected: 'That value is the maximum' }],
      functionName: 'findMaxElement',
      isClassBased: false,
      sampleTests: [
        { input: [[5, 2, 8, 1, 9]], expectedOutput: 9, description: 'mixed values' },
        { input: [[-3, -1, -7]], expectedOutput: -1, description: 'all negative' },
        { input: [[4, 4, 4]], expectedOutput: 4, description: 'all equal' },
      ],
    },
    hints: {
      hints: ['Same running-comparison technique as finding the minimum, flipped to `>`.', 'Initialize the running max to the first element, not 0.', 'One pass is sufficient — no sorting required.'],
    },
    solution: {
      algorithm: 'Initialize max to the first element, then walk the rest of the array, updating max whenever a larger value is found.',
      dryRun: '[5,2,8,1,9] -> max=5 -> 2 not> -> 8>5 -> max=8 -> 1 not> -> 9>8 -> max=9',
      javascriptSolution: `function findMaxElement(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`,
      typescriptSolution: `function findMaxElement(arr: number[]): number {
  let max = arr[0]!;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i]! > max) max = arr[i]!;
  }
  return max;
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(1).',
      commonMistakes: ['Initializing `max` to `0`, which fails when every element is negative.', 'Using `Math.max(...arr)`, which is fine for small arrays but risks a stack overflow on very large ones.'],
      followUpQuestions: ['How would you track both the maximum and its index in one pass?', 'How would you find the max of an array of objects by a specific property?'],
      similarQuestions: ['Find Minimum Element', 'Find Second Largest Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-10',
      questionNumber: 'JSARR-10',
      title: 'Find Second Largest Element',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Set', 'Sorting'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Return the second-largest distinct value in an array. Duplicate values count once (e.g. [5, 5, 3] has no second-largest distinct value below 5 other than 3).',
      input: 'arr: number[]',
      output: 'number | undefined — the second-largest distinct value, or undefined if fewer than 2 distinct values exist',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[3, 1, 4, 1, 5, 9, 2, 6]', output: '6', explanation: 'Distinct values sorted descending: 9,6,5,4,3,2,1 — second is 6.' }],
      edgeCases: [{ case: 'All elements identical', expected: 'Returns undefined (no second distinct value)' }],
      functionName: 'findSecondLargest',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expectedOutput: 6, description: 'distinct values, unsorted input' },
        { input: [[5, 5, 5]], expectedOutput: undefined, description: 'only one distinct value' },
        { input: [[1, 2]], expectedOutput: 1, description: 'exactly two distinct values' },
      ],
    },
    hints: {
      hints: ['Deduplicate first with a `Set`, since "second largest" is defined over distinct values.', 'Sort the distinct values descending.', 'The element at index 1 of the sorted distinct list is the answer, or undefined if the list is shorter than 2.'],
    },
    solution: {
      algorithm: 'Built-in approach: [...new Set(arr)].sort((a, b) => b - a)[1]. Manual single-pass approach: track top two distinct values (first and second) in a single loop without sorting.',
      dryRun: '[3,1,4,1,5,9,2,6] -> distinct {3,1,4,5,9,2,6} -> sorted desc [9,6,5,4,3,2,1] -> index1=6',
      javascriptSolution: `function findSecondLargest(arr) {
  // Built-in approach:
  // const unique = [...new Set(arr)].sort((a, b) => b - a);
  // return unique.length > 1 ? unique[1] : undefined;

  // Manual single-pass approach (without built-in sorting/Set):
  let first = -Infinity;
  let second = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (val > first) {
      second = first;
      first = val;
    } else if (val < first && val > second) {
      second = val;
    }
  }
  return second === -Infinity ? undefined : second;
}`,
      typescriptSolution: `function findSecondLargest(arr: number[]): number | undefined {
  // Built-in approach:
  // const unique = [...new Set(arr)].sort((a, b) => b - a);
  // return unique.length > 1 ? unique[1] : undefined;

  // Manual single-pass approach (without built-in sorting/Set):
  let first = -Infinity;
  let second = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i]!;
    if (val > first) {
      second = first;
      first = val;
    } else if (val < first && val > second) {
      second = val;
    }
  }
  return second === -Infinity ? undefined : second;
}`,
      timeComplexity: 'O(n log n) dominated by the sort.',
      spaceComplexity: 'O(n) for the deduplicated array.',
      commonMistakes: [
        'Sorting without deduplicating first, so `[9, 9, 6]` incorrectly returns 9 (the duplicate) instead of 6.',
        'Using `.sort()` without a comparator on numbers, which sorts lexicographically (e.g. 10 before 2).',
        'Assuming the array always has at least 2 distinct values and not handling the undefined case.',
      ],
      followUpQuestions: ['How would you find the second-largest in a single O(n) pass without sorting?', 'How would this change if duplicates should count toward "second largest" instead of being deduplicated?'],
      similarQuestions: ['Find Maximum Element', 'Find Third Largest Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-11',
      questionNumber: 'JSARR-11',
      title: 'Find Second Smallest Element',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Set', 'Sorting'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the second-smallest distinct value in an array.',
      input: 'arr: number[]',
      output: 'number | undefined — the second-smallest distinct value, or undefined if fewer than 2 distinct values exist',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[3, 1, 4, 1, 5, 9, 2, 6]', output: '2', explanation: 'Distinct values sorted ascending: 1,2,3,4,5,6,9 — second is 2.' }],
      edgeCases: [{ case: 'All elements identical', expected: 'Returns undefined' }],
      functionName: 'findSecondSmallest',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expectedOutput: 2, description: 'distinct values, unsorted input' },
        { input: [[5, 5, 5]], expectedOutput: undefined, description: 'only one distinct value' },
        { input: [[2, 1]], expectedOutput: 2, description: 'exactly two distinct values' },
      ],
    },
    hints: {
      hints: ['Mirror the second-largest solution, sorting ascending instead of descending.', 'Deduplicate with a `Set` before sorting.', 'Index 1 of the sorted distinct list is the answer.'],
    },
    solution: {
      algorithm: 'Build a Set of distinct values, sort ascending, and return the element at index 1 (or undefined if fewer than 2 distinct values exist).',
      dryRun: '[3,1,4,1,5,9,2,6] -> distinct sorted asc [1,2,3,4,5,6,9] -> index1=2',
      javascriptSolution: `function findSecondSmallest(arr) {
  const unique = [...new Set(arr)].sort((a, b) => a - b);
  return unique.length > 1 ? unique[1] : undefined;
}`,
      typescriptSolution: `function findSecondSmallest(arr: number[]): number | undefined {
  const unique = [...new Set(arr)].sort((a, b) => a - b);
  return unique.length > 1 ? unique[1] : undefined;
}`,
      timeComplexity: 'O(n log n) dominated by the sort.',
      spaceComplexity: 'O(n) for the deduplicated array.',
      commonMistakes: ['Forgetting the numeric sort comparator, causing lexicographic ordering bugs.', 'Not deduplicating, so a repeated minimum is mistaken for the second-smallest.'],
      followUpQuestions: ['How would you find this in a single O(n) pass with two tracking variables?', 'How would negative numbers or floats affect this solution (they do not, since numeric sort handles them)?'],
      similarQuestions: ['Find Minimum Element', 'Find Third Smallest Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-12',
      questionNumber: 'JSARR-12',
      title: 'Find Third Largest Element',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Set', 'Sorting'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the third-largest distinct value in an array.',
      input: 'arr: number[]',
      output: 'number | undefined — the third-largest distinct value, or undefined if fewer than 3 distinct values exist',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[3, 1, 4, 1, 5, 9, 2, 6]', output: '5', explanation: 'Distinct values sorted descending: 9,6,5,4,3,2,1 — third is 5.' }],
      edgeCases: [{ case: 'Fewer than 3 distinct values', expected: 'Returns undefined' }],
      functionName: 'findThirdLargest',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expectedOutput: 5, description: 'distinct values, unsorted input' },
        { input: [[1, 2]], expectedOutput: undefined, description: 'fewer than 3 distinct values' },
        { input: [[3, 3, 2, 1]], expectedOutput: 1, description: 'exactly three distinct values with a duplicate' },
      ],
    },
    hints: {
      hints: ['Same pattern as second-largest, but read index 2 of the sorted distinct list.', 'Deduplicate before sorting — a repeated max should not occupy two positions.', 'Guard against fewer than 3 distinct values by returning undefined.'],
    },
    solution: {
      algorithm: 'Build a Set of distinct values, sort descending, and return the element at index 2 (or undefined if fewer than 3 distinct values exist).',
      dryRun: '[3,1,4,1,5,9,2,6] -> distinct sorted desc [9,6,5,4,3,2,1] -> index2=5',
      javascriptSolution: `function findThirdLargest(arr) {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique.length > 2 ? unique[2] : undefined;
}`,
      typescriptSolution: `function findThirdLargest(arr: number[]): number | undefined {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique.length > 2 ? unique[2] : undefined;
}`,
      timeComplexity: 'O(n log n) dominated by the sort.',
      spaceComplexity: 'O(n).',
      commonMistakes: ['Off-by-one indexing (reading index 3 instead of index 2 for "third").', 'Not deduplicating, so a triple-repeated max is miscounted as three distinct ranks.'],
      followUpQuestions: ['How would you generalize this to the Kth largest distinct element?', 'How would a min-heap of size K solve this more efficiently for large arrays?'],
      similarQuestions: ['Find Second Largest Element', 'Find Third Smallest Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-13',
      questionNumber: 'JSARR-13',
      title: 'Find Third Smallest Element',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Set', 'Sorting'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the third-smallest distinct value in an array.',
      input: 'arr: number[]',
      output: 'number | undefined — the third-smallest distinct value, or undefined if fewer than 3 distinct values exist',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[3, 1, 4, 1, 5, 9, 2, 6]', output: '3', explanation: 'Distinct values sorted ascending: 1,2,3,4,5,6,9 — third is 3.' }],
      edgeCases: [{ case: 'Fewer than 3 distinct values', expected: 'Returns undefined' }],
      functionName: 'findThirdSmallest',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expectedOutput: 3, description: 'distinct values, unsorted input' },
        { input: [[1, 2]], expectedOutput: undefined, description: 'fewer than 3 distinct values' },
        { input: [[1, 1, 2, 3]], expectedOutput: 3, description: 'exactly three distinct values with a duplicate' },
      ],
    },
    hints: {
      hints: ['Mirror the third-largest solution, sorting ascending instead.', 'Deduplicate with a `Set` first.', 'Index 2 of the sorted distinct list is the answer.'],
    },
    solution: {
      algorithm: 'Build a Set of distinct values, sort ascending, and return the element at index 2 (or undefined if fewer than 3 distinct values exist).',
      dryRun: '[3,1,4,1,5,9,2,6] -> distinct sorted asc [1,2,3,4,5,6,9] -> index2=3',
      javascriptSolution: `function findThirdSmallest(arr) {
  const unique = [...new Set(arr)].sort((a, b) => a - b);
  return unique.length > 2 ? unique[2] : undefined;
}`,
      typescriptSolution: `function findThirdSmallest(arr: number[]): number | undefined {
  const unique = [...new Set(arr)].sort((a, b) => a - b);
  return unique.length > 2 ? unique[2] : undefined;
}`,
      timeComplexity: 'O(n log n).',
      spaceComplexity: 'O(n).',
      commonMistakes: ['Reusing the descending comparator by mistake, returning the third-largest instead.', 'Not handling the undefined case when fewer than 3 distinct values exist.'],
      followUpQuestions: ['How would you generalize to the Kth smallest distinct element?', 'How would a max-heap of size K help for very large arrays?'],
      similarQuestions: ['Find Second Smallest Element', 'Find Third Largest Element'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-14',
      questionNumber: 'JSARR-14',
      title: 'Find Positive Numbers',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'filter'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return all strictly positive numbers from an array, in their original order. Zero is neither positive nor negative and is excluded.',
      input: 'arr: number[]',
      output: 'number[] — the positive elements, in original order',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, -2, 0, 3, -4]', output: '[1, 3]', explanation: '0 and negatives are excluded.' }],
      edgeCases: [{ case: 'No positive numbers', expected: 'Returns []' }],
      functionName: 'findPositiveNumbers',
      isClassBased: false,
      sampleTests: [
        { input: [[1, -2, 0, 3, -4]], expectedOutput: [1, 3], description: 'mixed values, 0 excluded' },
        { input: [[-1, -2, -3]], expectedOutput: [], description: 'no positives' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
      ],
    },
    hints: {
      hints: ['`.filter()` with a `num > 0` predicate keeps only strictly positive values.', '0 must be excluded — use strict `>`, not `>=`.', 'Order is preserved automatically by `.filter()`.'],
    },
    solution: {
      algorithm: 'Filter the array, keeping only elements strictly greater than 0.',
      dryRun: '[1,-2,0,3,-4] -> keep 1, drop -2, drop 0, keep 3, drop -4 -> [1,3]',
      javascriptSolution: `function findPositiveNumbers(arr) {
  return arr.filter((num) => num > 0);
}`,
      typescriptSolution: `function findPositiveNumbers(arr: number[]): number[] {
  return arr.filter((num) => num > 0);
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n) for the filtered result.',
      commonMistakes: ['Using `>= 0`, which incorrectly includes 0 as positive.', 'Mutating the source array with `splice` inside a loop instead of using the non-mutating `filter`.'],
      followUpQuestions: ['How would you separate positives and negatives in a single pass instead of two filters?', 'How would this treat `-0`?'],
      similarQuestions: ['Find Negative Numbers', 'Separate Even and Odd Numbers'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-15',
      questionNumber: 'JSARR-15',
      title: 'Find Negative Numbers',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'filter'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return all strictly negative numbers from an array, in their original order.',
      input: 'arr: number[]',
      output: 'number[] — the negative elements, in original order',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, -2, 0, 3, -4]', output: '[-2, -4]', explanation: '0 and positives are excluded.' }],
      edgeCases: [{ case: 'No negative numbers', expected: 'Returns []' }],
      functionName: 'findNegativeNumbers',
      isClassBased: false,
      sampleTests: [
        { input: [[1, -2, 0, 3, -4]], expectedOutput: [-2, -4], description: 'mixed values, 0 excluded' },
        { input: [[1, 2, 3]], expectedOutput: [], description: 'no negatives' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
      ],
    },
    hints: {
      hints: ['`.filter()` with `num < 0` keeps only strictly negative values.', '0 is excluded by the strict comparison.', 'Order is preserved automatically.'],
    },
    solution: {
      algorithm: 'Filter the array, keeping only elements strictly less than 0.',
      dryRun: '[1,-2,0,3,-4] -> drop 1, keep -2, drop 0, drop 3, keep -4 -> [-2,-4]',
      javascriptSolution: `function findNegativeNumbers(arr) {
  return arr.filter((num) => num < 0);
}`,
      typescriptSolution: `function findNegativeNumbers(arr: number[]): number[] {
  return arr.filter((num) => num < 0);
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n).',
      commonMistakes: ['Using `<= 0`, which incorrectly includes 0 as negative.', 'Forgetting the result order must match the original array order — `.filter()` already guarantees this.'],
      followUpQuestions: ['How would you count negatives without allocating a new array?', 'How would you find the largest-magnitude negative number?'],
      similarQuestions: ['Find Positive Numbers', 'Move Negative Numbers to Beginning'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-16',
      questionNumber: 'JSARR-16',
      title: 'Find Even Numbers',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'filter', 'Modulo'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return all even numbers from an array, in their original order.',
      input: 'arr: number[]',
      output: 'number[] — the even elements, in original order',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3, 4, 5, 6]', output: '[2, 4, 6]', explanation: 'Numbers divisible by 2.' }],
      edgeCases: [{ case: 'Negative even numbers', expected: 'Included, e.g. -4 is even' }],
      functionName: 'findEvenNumbers',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: [2, 4, 6], description: 'mixed values' },
        { input: [[-4, -3, -2]], expectedOutput: [-4, -2], description: 'negative evens included' },
        { input: [[1, 3, 5]], expectedOutput: [], description: 'no evens' },
      ],
    },
    hints: {
      hints: ['A number is even when `num % 2 === 0`.', 'This works correctly for negative numbers too in JavaScript (`-4 % 2 === 0`).', '`.filter()` keeps the original order.'],
    },
    solution: {
      algorithm: 'Filter the array, keeping elements where num % 2 === 0.',
      dryRun: '[1,2,3,4,5,6] -> keep 2,4,6 -> [2,4,6]',
      javascriptSolution: `function findEvenNumbers(arr) {
  return arr.filter((num) => num % 2 === 0);
}`,
      typescriptSolution: `function findEvenNumbers(arr: number[]): number[] {
  return arr.filter((num) => num % 2 === 0);
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n).',
      commonMistakes: ['Using `num % 2 == 1` to detect "not odd" as a proxy for even, which mishandles negative numbers (`-3 % 2 === -1`, not `1`).', 'Using bitwise `& 1` without realizing it behaves the same as `% 2` for even/odd checks but can confuse readers unfamiliar with bit tricks.'],
      followUpQuestions: ['How would you check evenness using the bitwise AND operator instead of modulo?', 'How would you find evens using a `for` loop instead of `filter`?'],
      similarQuestions: ['Find Odd Numbers', 'Count Even Numbers'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-17',
      questionNumber: 'JSARR-17',
      title: 'Find Odd Numbers',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'filter', 'Modulo'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return all odd numbers from an array, in their original order.',
      input: 'arr: number[]',
      output: 'number[] — the odd elements, in original order',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3, 4, 5, 6]', output: '[1, 3, 5]', explanation: 'Numbers not divisible by 2.' }],
      edgeCases: [{ case: 'Negative odd numbers', expected: 'Included, e.g. -3 is odd' }],
      functionName: 'findOddNumbers',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: [1, 3, 5], description: 'mixed values' },
        { input: [[-4, -3, -2]], expectedOutput: [-3], description: 'negative odd included' },
        { input: [[2, 4, 6]], expectedOutput: [], description: 'no odds' },
      ],
    },
    hints: {
      hints: ['`num % 2 !== 0` correctly detects odd numbers, including negatives.', 'Avoid `num % 2 === 1`, which fails for negative odds (`-3 % 2 === -1` in JS, not `1`).', '`.filter()` preserves original order.'],
    },
    solution: {
      algorithm: 'Filter the array, keeping elements where num % 2 !== 0.',
      dryRun: '[1,2,3,4,5,6] -> keep 1,3,5 -> [1,3,5]',
      javascriptSolution: `function findOddNumbers(arr) {
  return arr.filter((num) => num % 2 !== 0);
}`,
      typescriptSolution: `function findOddNumbers(arr: number[]): number[] {
  return arr.filter((num) => num % 2 !== 0);
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n).',
      commonMistakes: ['Checking `num % 2 === 1`, which is wrong for negative odd numbers in JavaScript since the result of `%` takes the sign of the dividend.', 'Forgetting fractional numbers are neither cleanly even nor odd — assume integer input per constraints.'],
      followUpQuestions: ['How would `num % 2 === 1` need to change to work for negative numbers (e.g. using `Math.abs`)?', 'How would you find odd numbers with a `for` loop instead of `filter`?'],
      similarQuestions: ['Find Even Numbers', 'Count Odd Numbers'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-18',
      questionNumber: 'JSARR-18',
      title: 'Count Even Numbers',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'filter', 'Counting'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the count of even numbers in an array.',
      input: 'arr: number[]',
      output: 'number — the count of even elements',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3, 4, 5, 6]', output: '3', explanation: '2, 4, and 6 are even.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns 0' }],
      functionName: 'countEvenNumbers',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: 3, description: 'three evens' },
        { input: [[1, 3, 5]], expectedOutput: 0, description: 'no evens' },
        { input: [[]], expectedOutput: 0, description: 'empty array' },
      ],
    },
    hints: {
      hints: ['Filter for evens first, then read `.length` of the result.', 'Alternatively, use `reduce` to accumulate a count directly without allocating an intermediate array.', 'Either approach is O(n); the reduce version saves the O(n) space of the filtered array.'],
    },
    solution: {
      algorithm: 'Filter the array for elements where num % 2 === 0, then return the length of the filtered result.',
      dryRun: '[1,2,3,4,5,6] -> filter -> [2,4,6] -> length 3',
      javascriptSolution: `function countEvenNumbers(arr) {
  return arr.filter((num) => num % 2 === 0).length;
}`,
      typescriptSolution: `function countEvenNumbers(arr: number[]): number {
  return arr.filter((num) => num % 2 === 0).length;
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n) for the intermediate filtered array (O(1) if counted via reduce instead).',
      commonMistakes: ['Allocating and discarding a full filtered array when only the count is needed, which is fine for readability but wasteful at scale versus a reduce-based count.', 'Reusing the odd-check condition by mistake.'],
      followUpQuestions: ['How would you count evens with `reduce` to avoid the intermediate array?', 'How would you count evens and odds in a single pass?'],
      similarQuestions: ['Find Even Numbers', 'Count Odd Numbers'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-19',
      questionNumber: 'JSARR-19',
      title: 'Count Odd Numbers',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'filter', 'Counting'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Return the count of odd numbers in an array.',
      input: 'arr: number[]',
      output: 'number — the count of odd elements',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3, 4, 5, 6]', output: '3', explanation: '1, 3, and 5 are odd.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns 0' }],
      functionName: 'countOddNumbers',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: 3, description: 'three odds' },
        { input: [[2, 4, 6]], expectedOutput: 0, description: 'no odds' },
        { input: [[]], expectedOutput: 0, description: 'empty array' },
      ],
    },
    hints: {
      hints: ['Filter for odds (`num % 2 !== 0`), then read `.length`.', 'This mirrors "Count Even Numbers" with the opposite predicate.', 'For a very large array, prefer a single reduce-based counting pass over allocating a filtered array.'],
    },
    solution: {
      algorithm: 'Filter the array for elements where num % 2 !== 0, then return the length of the filtered result.',
      dryRun: '[1,2,3,4,5,6] -> filter -> [1,3,5] -> length 3',
      javascriptSolution: `function countOddNumbers(arr) {
  return arr.filter((num) => num % 2 !== 0).length;
}`,
      typescriptSolution: `function countOddNumbers(arr: number[]): number {
  return arr.filter((num) => num % 2 !== 0).length;
}`,
      timeComplexity: 'O(n).',
      spaceComplexity: 'O(n) for the intermediate filtered array.',
      commonMistakes: ['Using `=== 1` for the odd check, which breaks on negative odd numbers as with "Find Odd Numbers".', 'Duplicating the array count logic instead of reusing the same filter predicate style as the even counter for consistency.'],
      followUpQuestions: ['How would you compute both even and odd counts in a single reduce pass?', 'How would this differ for a `Set` versus an array input?'],
      similarQuestions: ['Find Odd Numbers', 'Count Even Numbers'],
    },
  },
  {
    detail: {
      id: 'js-arr-basic-20',
      questionNumber: 'JSARR-20',
      title: 'Separate Even and Odd Numbers',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: CATEGORY,
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'reduce', 'Partitioning'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Split an array into two groups: even numbers and odd numbers, each preserving original relative order.',
      input: 'arr: number[]',
      output: 'object — { even: number[], odd: number[] }',
      constraints: ['0 <= arr.length <= 10^5'],
      examples: [{ input: '[1, 2, 3, 4, 5, 6]', output: '{ even: [2, 4, 6], odd: [1, 3, 5] }', explanation: 'Each number goes into exactly one bucket.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns { even: [], odd: [] }' }],
      functionName: 'separateEvenOdd',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5, 6]], expectedOutput: { even: [2, 4, 6], odd: [1, 3, 5] }, description: 'mixed values' },
        { input: [[]], expectedOutput: { even: [], odd: [] }, description: 'empty array' },
        { input: [[2, 4]], expectedOutput: { even: [2, 4], odd: [] }, description: 'all even' },
      ],
    },
    hints: {
      hints: ['A single pass with `reduce` can build both buckets at once, avoiding two separate filter passes.', 'Seed the accumulator as `{ even: [], odd: [] }`.', 'Push each number into the matching bucket based on `num % 2 === 0`.'],
    },
    solution: {
      algorithm: 'Reduce over the array with an { even: [], odd: [] } accumulator, pushing each number into the bucket matching its parity.',
      dryRun: '[1,2,3,4,5,6] -> 1->odd -> 2->even -> 3->odd -> 4->even -> 5->odd -> 6->even\nresult={even:[2,4,6],odd:[1,3,5]}',
      javascriptSolution: `function separateEvenOdd(arr) {
  return arr.reduce(
    (acc, num) => {
      if (num % 2 === 0) acc.even.push(num);
      else acc.odd.push(num);
      return acc;
    },
    { even: [], odd: [] }
  );
}`,
      typescriptSolution: `function separateEvenOdd(arr: number[]): { even: number[]; odd: number[] } {
  return arr.reduce(
    (acc, num) => {
      if (num % 2 === 0) acc.even.push(num);
      else acc.odd.push(num);
      return acc;
    },
    { even: [] as number[], odd: [] as number[] }
  );
}`,
      timeComplexity: 'O(n) — a single pass.',
      spaceComplexity: 'O(n) for the two output buckets.',
      commonMistakes: [
        'Running two separate `.filter()` passes instead of one `reduce`, which is correct but does twice the traversal work.',
        'Sharing the same array reference between calls by defining the initial accumulator outside the function (a stateful bug), instead of creating a fresh `{ even: [], odd: [] }` each call.',
      ],
      followUpQuestions: ['How would you extend this to partition into more than two buckets based on an arbitrary predicate?', 'How would you implement a generic `partition(arr, predicate)` utility?'],
      similarQuestions: ['Find Even Numbers', 'Find Odd Numbers'],
    },
  },
];
