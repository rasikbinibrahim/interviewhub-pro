import type { MockCodingQuestion, MockTechnicalQuestion } from '@/mocks/questions';

const COMPANIES = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Netflix', 'Uber', 'Airbnb', 'Flipkart'];

type MockCodingQuestionWithBuiltInSolution = Omit<MockCodingQuestion, 'solution'> & {
  solution: Omit<NonNullable<MockCodingQuestion['solution']>, 'builtInSolution'> & {
    builtInSolution: string;
  };
};

export const MOCK_GUIDE_EXTRA_CODING_QUESTIONS: MockCodingQuestionWithBuiltInSolution[] = [
  {
    detail: {
      id: 'guide-code-bubble-sort',
      questionNumber: 'GUIDE-CODE-01',
      title: 'Bubble Sort (Ascending)',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Sorting (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Sorting', 'Bubble Sort', 'Arrays', 'Two Pointers'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Implement the Bubble Sort algorithm to sort an array of numbers in ascending order in-place using nested loops.',
      input: 'arr: number[]',
      output: 'number[] — the sorted array in ascending order',
      constraints: ['1 <= arr.length <= 100', '-1000 <= arr[i] <= 1000'],
      examples: [
        { input: '[5, 3, 1, 4, 2]', output: '[1, 2, 3, 4, 5]', explanation: 'Elements are repeatedly swapped until fully sorted in ascending order.' },
      ],
      edgeCases: [
        { case: 'Already sorted array', expected: 'Returns array unchanged' },
        { case: 'Single element array', expected: 'Returns array as-is' },
      ],
      functionName: 'sortArrayAsc',
      isClassBased: false,
      sampleTests: [
        { input: [[5, 3, 1, 4, 2]], expectedOutput: [1, 2, 3, 4, 5], description: 'sort unsorted array' },
        { input: [[1, 2, 3]], expectedOutput: [1, 2, 3], description: 'already sorted array' },
        { input: [[10]], expectedOutput: [10], description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'Use outer loop `i` from 0 to `arr.length - 1`.',
        'Inner loop `j` runs from 0 to `arr.length - 1 - i`.',
        'Swap adjacent elements `arr[j]` and `arr[j + 1]` if `arr[j] > arr[j + 1]`.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Repeatedly swap adjacent out-of-order values; after each pass the largest remaining value reaches the end.',
      javascriptSolution: `function sortArrayAsc(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
      typescriptSolution: `function sortArrayAsc(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
      builtInSolution: `function sortArrayAsc(arr: number[]): number[] {
  return [...arr].sort((a, b) => a - b);
}`,
      timeComplexity: 'O(n²) for the manual nested-loop approach; the native sort path is typically O(n log n) average but engine-dependent.',
      spaceComplexity: 'O(n) for copied output/intermediate storage.',
      commonMistakes: [
        'Iterating inner loop past `arr.length - 1 - i`, causing out-of-bounds comparisons.',
        'Not returning the sorted array at the end of the function.',
      ],
      followUpQuestions: [
        'How can you optimize Bubble Sort to exit early if the array is already sorted?',
        'How does Bubble Sort compare to Quick Sort and Merge Sort in time complexity?',
      ],
      similarQuestions: ['Selection Sort', 'Insertion Sort'],
    },
  },
  {
    detail: {
      id: 'guide-code-sort-string-asc',
      questionNumber: 'GUIDE-CODE-02',
      title: 'Sort String in Ascending Order',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: 'Strings (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Strings', 'Sorting', 'Character Array'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Implement a function that takes a string and returns a new string with its characters sorted in ascending alphabetical order using basic loop constructs.',
      input: 'str: string',
      output: 'string — the character-sorted string',
      constraints: ['0 <= str.length <= 500'],
      examples: [
        { input: '"hello"', output: '"ehllo"', explanation: 'Characters e, h, l, l, o are sorted in ASCII order.' },
      ],
      edgeCases: [
        { case: 'Empty string', expected: 'Returns ""' },
        { case: 'Single character string', expected: 'Returns string as-is' },
      ],
      functionName: 'sortStringAsc',
      isClassBased: false,
      sampleTests: [
        { input: ['hello'], expectedOutput: 'ehllo', description: 'sort "hello"' },
        { input: ['banana'], expectedOutput: 'aaabnn', description: 'sort "banana"' },
        { input: [''], expectedOutput: '', description: 'empty string' },
      ],
    },
    hints: {
      hints: [
        'Convert string characters into an array of characters.',
        'Use nested loops (like bubble sort) to sort the character array.',
        'Reconstruct the string by concatenating the sorted character array.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Convert the string to character storage, sort the characters, then join them back.',
      javascriptSolution: `function sortStringAsc(str: string): string {
  const chars: string[] = [];

  for (let i = 0; i < str.length; i += 1) {
    chars.push(str[i]);
  }

  for (let i = 0; i < chars.length - 1; i += 1) {
    for (let j = 0; j < chars.length - 1 - i; j += 1) {
      if (chars[j] > chars[j + 1]) {
        const temp = chars[j];
        chars[j] = chars[j + 1];
        chars[j + 1] = temp;
      }
    }
  }

  return chars.join("");
}`,
      typescriptSolution: `function sortStringAsc(str: string): string {
  const chars: string[] = [];

  for (let i = 0; i < str.length; i += 1) {
    chars.push(str[i]);
  }

  for (let i = 0; i < chars.length - 1; i += 1) {
    for (let j = 0; j < chars.length - 1 - i; j += 1) {
      if (chars[j] > chars[j + 1]) {
        const temp = chars[j];
        chars[j] = chars[j + 1];
        chars[j + 1] = temp;
      }
    }
  }

  return chars.join("");
}`,
      builtInSolution: `function sortStringAsc(str: string): string {
  return str.split("").sort().join("");
}`,
      timeComplexity: 'O(n²) for the manual nested-loop approach; the native sort path is typically O(n log n) average but engine-dependent.',
      spaceComplexity: 'O(n) for copied output/intermediate storage.',
      commonMistakes: [
        'Strings are immutable in JavaScript, so characters must be copied to an array before sorting.',
      ],
      followUpQuestions: [
        'How would you achieve this in O(n log n) using built-in methods?',
        'How would you sort uppercase and lowercase letters predictably?',
      ],
      similarQuestions: ['Valid Anagram', 'Group Anagrams'],
    },
  },
  {
    detail: {
      id: 'guide-code-nth-highest',
      questionNumber: 'GUIDE-CODE-03',
      title: 'Find N-th Highest Number',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: 'Arrays (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Deduplication', 'Sorting', 'Top K'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function that accepts an array of numbers and an integer N, and returns the N-th highest UNIQUE number from the array.',
      input: 'arr: number[], n: number',
      output: 'number — the N-th highest unique value',
      constraints: ['1 <= arr.length <= 1000', '1 <= n <= number of unique elements'],
      examples: [
        { input: '[10, 5, 20, 8, 30], 2', output: '20', explanation: 'Unique values descending are [30, 20, 10, 8, 5]. 2nd highest is 20.' },
      ],
      edgeCases: [
        { case: 'Array with duplicate values', expected: 'Deduplicates before picking N-th highest' },
      ],
      functionName: 'nthHighest',
      isClassBased: false,
      sampleTests: [
        { input: [[10, 5, 20, 8, 30], 2], expectedOutput: 20, description: '2nd highest in [10, 5, 20, 8, 30]' },
        { input: [[1, 2, 2, 3, 4], 1], expectedOutput: 4, description: '1st highest' },
        { input: [[10, 10, 10], 1], expectedOutput: 10, description: 'all duplicates' },
      ],
    },
    hints: {
      hints: [
        'First remove duplicate numbers from the array.',
        'Sort the unique numbers in descending order.',
        'Return the element at index `n - 1`.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Sort in descending order and return the element at zero-based index n-1; define how duplicates count according to the question.',
      javascriptSolution: `function findNthHighest(
  arr: readonly number[],
  n: number,
): number | undefined {
  const copy: number[] = [];

  for (let i = 0; i < arr.length; i += 1) {
    copy.push(arr[i]);
  }

  for (let i = 0; i < copy.length - 1; i += 1) {
    for (let j = 0; j < copy.length - 1 - i; j += 1) {
      if (copy[j] < copy[j + 1]) {
        const temp = copy[j];
        copy[j] = copy[j + 1];
        copy[j + 1] = temp;
      }
    }
  }

  return copy[n - 1];
}`,
      typescriptSolution: `function findNthHighest(
  arr: readonly number[],
  n: number,
): number | undefined {
  const copy: number[] = [];

  for (let i = 0; i < arr.length; i += 1) {
    copy.push(arr[i]);
  }

  for (let i = 0; i < copy.length - 1; i += 1) {
    for (let j = 0; j < copy.length - 1 - i; j += 1) {
      if (copy[j] < copy[j + 1]) {
        const temp = copy[j];
        copy[j] = copy[j + 1];
        copy[j + 1] = temp;
      }
    }
  }

  return copy[n - 1];
}`,
      builtInSolution: `function findNthHighest(
  arr: readonly number[],
  n: number,
): number | undefined {
  return [...arr].sort((a, b) => b - a)[n - 1];
}`,
      timeComplexity: 'O(n) for the manual scan/traversal; native helpers preserve the same asymptotic order unless sorting is involved.',
      spaceComplexity: 'O(n) for output or intermediate storage when a new collection is created.',
      commonMistakes: [
        'Not deduplicating numbers, causing duplicates to count towards N-th highest rank.',
        '1-based indexing for N vs 0-based indexing for JavaScript arrays.',
      ],
      followUpQuestions: [
        'How can you solve this in O(N log K) using a Min-Heap?',
        'How does QuickSelect find the k-th largest element in O(N) average time?',
      ],
      similarQuestions: ['Kth Largest Element in an Array', 'Third Maximum Number'],
    },
  },
  {
    detail: {
      id: 'guide-code-flatten-infinity',
      questionNumber: 'GUIDE-CODE-04',
      title: 'Flatten Nested Array (Infinity Depth)',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'Arrays (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Recursion', 'Arrays', 'Flattening'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a recursive function `flattenInfinety(arr)` that flattens a deeply nested array of arbitrary depth into a single flat array.',
      input: 'arr: unknown[]',
      output: 'unknown[] — completely flattened 1D array',
      constraints: ['0 <= depth <= 50', '0 <= total elements <= 1000'],
      examples: [
        { input: '[1, [2, [3, [4, [5]]]]]', output: '[1, 2, 3, 4, 5]', explanation: 'All nested levels are flattened completely.' },
      ],
      edgeCases: [
        { case: 'Empty nested arrays [1, [], [2, [[]]]]', expected: '[1, 2]' },
        { case: 'Flat array [1, 2, 3]', expected: '[1, 2, 3]' },
      ],
      functionName: 'flattenInfinety',
      isClassBased: false,
      sampleTests: [
        { input: [[1, [2, [3, [4, [5]]]]]], expectedOutput: [1, 2, 3, 4, 5], description: 'deeply nested array' },
        { input: [[1, 2, 3]], expectedOutput: [1, 2, 3], description: 'already flat array' },
        { input: [[1, [], [2, [[]]]]], expectedOutput: [1, 2], description: 'empty nested arrays' },
      ],
    },
    hints: {
      hints: [
        'Loop over each item in the array.',
        'If an item `Array.isArray(item)` is true, recursively call `flattenInfinety(item)` and concatenate the result.',
        'Otherwise, push the item directly into the result array.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Traverse recursively; arrays expand into their elements and non-arrays are emitted directly.',
      javascriptSolution: `function flattenDeep(value: unknown[]): unknown[] {
  const result: unknown[] = [];

  for (let i = 0; i < value.length; i += 1) {
    if (Array.isArray(value[i])) {
      const nested = flattenDeep(value[i] as unknown[]);

      for (let j = 0; j < nested.length; j += 1) {
        result.push(nested[j]);
      }
    } else {
      result.push(value[i]);
    }
  }

  return result;
}`,
      typescriptSolution: `function flattenDeep(value: unknown[]): unknown[] {
  const result: unknown[] = [];

  for (let i = 0; i < value.length; i += 1) {
    if (Array.isArray(value[i])) {
      const nested = flattenDeep(value[i] as unknown[]);

      for (let j = 0; j < nested.length; j += 1) {
        result.push(nested[j]);
      }
    } else {
      result.push(value[i]);
    }
  }

  return result;
}`,
      builtInSolution: `function flattenDeep(value: unknown[]): unknown[] {
  return value.flat(Infinity);
}`,
      timeComplexity: 'O(n) — each node is visited once.',
      spaceComplexity: 'O(h) auxiliary recursion space plus O(n) output when materialized.',
      commonMistakes: [
        'Using `.push()` instead of `.concat()` when handling recursive array returns.',
        'Not checking `Array.isArray()` correctly.',
      ],
      followUpQuestions: [
        'How would you write an iterative version of flatten without recursion?',
        'How can generator functions (`yield*`) be used to flatten arrays lazily?',
      ],
      similarQuestions: ['Flatten Deeply Nested Array', 'Array Prototype Flat'],
    },
  },
  {
    detail: {
      id: 'guide-code-find-missing-number',
      questionNumber: 'GUIDE-CODE-05',
      title: 'Find Missing Number in Array (1 to N)',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Arrays (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Math', 'Arrays', 'Gauss Sum Formula'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an array `arr` containing `n - 1` distinct numbers from 1 to `n`, find the single missing number using mathematical formula.',
      input: 'arr: number[], n: number',
      output: 'number — the missing number',
      constraints: ['1 <= n <= 10^5', 'arr.length === n - 1'],
      examples: [
        { input: '[1, 2, 3, 5], 5', output: '4', explanation: 'Expected sum of 1..5 is 15. Actual sum is 11. Missing = 15 - 11 = 4.' },
      ],
      edgeCases: [
        { case: 'Missing number is 1', expected: 'Returns 1' },
        { case: 'Missing number is n', expected: 'Returns n' },
      ],
      functionName: 'findMissing',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 5], 5], expectedOutput: 4, description: 'missing 4 from 1..5' },
        { input: [[2, 3, 4], 4], expectedOutput: 1, description: 'missing 1 from 1..4' },
        { input: [[1, 2, 3, 4], 5], expectedOutput: 5, description: 'missing 5 from 1..5' },
      ],
    },
    hints: {
      hints: [
        'The sum of the first N natural numbers is given by `(n * (n + 1)) / 2`.',
        'Calculate the actual sum of elements in the given array.',
        'Subtract actual sum from expected sum to get the missing value.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Compare the expected 1..N sum with the actual array sum; the difference is the missing value.',
      javascriptSolution: `function findMissingNumber(arr: readonly number[], n: number): number {
  let expected = 0;
  let actual = 0;

  for (let i = 1; i <= n; i += 1) {
    expected += i;
  }

  for (let i = 0; i < arr.length; i += 1) {
    actual += arr[i];
  }

  return expected - actual;
}`,
      typescriptSolution: `function findMissingNumber(arr: readonly number[], n: number): number {
  let expected = 0;
  let actual = 0;

  for (let i = 1; i <= n; i += 1) {
    expected += i;
  }

  for (let i = 0; i < arr.length; i += 1) {
    actual += arr[i];
  }

  return expected - actual;
}`,
      builtInSolution: `function findMissingNumber(arr: readonly number[], n: number): number {
  const expected = (n * (n + 1)) / 2;
  const actual = arr.reduce((sum, value) => sum + value, 0);
  return expected - actual;
}`,
      timeComplexity: 'O(n) for the manual scan/traversal; native helpers preserve the same asymptotic order unless sorting is involved.',
      spaceComplexity: 'O(n) for output or intermediate storage when a new collection is created.',
      commonMistakes: [
        'Integer overflow in languages without BigInt (in JS numbers are double precision IEEE 754 up to Number.MAX_SAFE_INTEGER).',
      ],
      followUpQuestions: [
        'How can you solve this using XOR bitwise operators to avoid arithmetic overflow?',
        'What if two numbers were missing instead of one?',
      ],
      similarQuestions: ['Missing Number', 'Find All Numbers Disappeared in an Array'],
    },
  },
  {
    detail: {
      id: 'guide-code-reverse-array',
      questionNumber: 'GUIDE-CODE-06',
      title: 'Reverse an Array',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'Arrays (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Two Pointers', 'Reversal'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function `reverseArray(arr)` that returns a new array with elements in reversed order using a backwards loop.',
      input: 'arr: unknown[]',
      output: 'unknown[] — the reversed array',
      constraints: ['0 <= arr.length <= 1000'],
      examples: [
        { input: '[1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'Elements are pushed in reverse order.' },
      ],
      edgeCases: [
        { case: 'Empty array', expected: 'Returns []' },
      ],
      functionName: 'reverseArray',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5]], expectedOutput: [5, 4, 3, 2, 1], description: 'reverse [1,2,3,4,5]' },
        { input: [['a', 'b', 'c']], expectedOutput: ['c', 'b', 'a'], description: 'reverse string array' },
        { input: [[]], expectedOutput: [], description: 'empty array' },
      ],
    },
    hints: {
      hints: [
        'Initialize an empty result array `reversed = []`.',
        'Loop backwards starting from `arr.length - 1` down to 0.',
        'Push each element `arr[i]` into the result array.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Swap symmetric elements from both ends until the pointers meet.',
      javascriptSolution: `function reverseArray<T>(arr: T[]): T[] {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    left += 1;
    right -= 1;
  }

  return arr;
}`,
      typescriptSolution: `function reverseArray<T>(arr: T[]): T[] {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    left += 1;
    right -= 1;
  }

  return arr;
}`,
      builtInSolution: `function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse();
}`,
      timeComplexity: 'O(n) for the manual scan/traversal; native helpers preserve the same asymptotic order unless sorting is involved.',
      spaceComplexity: 'O(n) for output or intermediate storage when a new collection is created.',
      commonMistakes: ['Off-by-one errors starting loop at `arr.length` instead of `arr.length - 1`.'],
      followUpQuestions: ['How do you reverse an array in-place with O(1) extra space?'],
      similarQuestions: ['Reverse String', 'Rotate Array'],
    },
  },
  {
    detail: {
      id: 'guide-code-reverse-string',
      questionNumber: 'GUIDE-CODE-07',
      title: 'Reverse a String',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'Strings (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Strings', 'Reversal'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function `reverseString(str)` that takes a string and returns a new string with its characters in reverse order using a loop.',
      input: 'str: string',
      output: 'string — the reversed string',
      constraints: ['0 <= str.length <= 1000'],
      examples: [
        { input: '"hello"', output: '"olleh"', explanation: 'Characters are concatenated backwards.' },
      ],
      edgeCases: [
        { case: 'Empty string', expected: 'Returns ""' },
      ],
      functionName: 'reverseString',
      isClassBased: false,
      sampleTests: [
        { input: ['hello'], expectedOutput: 'olleh', description: 'reverse "hello"' },
        { input: ['world'], expectedOutput: 'dlrow', description: 'reverse "world"' },
        { input: [''], expectedOutput: '', description: 'empty string' },
      ],
    },
    hints: {
      hints: [
        'Initialize an empty string `reversed = ""`.',
        'Loop backwards from `str.length - 1` down to 0.',
        'Append each character `str[i]` to `reversed`.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Read characters from the end to the start and append them to a new result.',
      javascriptSolution: `function reverseString(str: string): string {
  let result = "";

  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }

  return result;
}`,
      typescriptSolution: `function reverseString(str: string): string {
  let result = "";

  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }

  return result;
}`,
      builtInSolution: `function reverseString(str: string): string {
  return str.split("").reverse().join("");
}`,
      timeComplexity: 'O(n) for the manual scan/traversal; native helpers preserve the same asymptotic order unless sorting is involved.',
      spaceComplexity: 'O(n) for output or intermediate storage when a new collection is created.',
      commonMistakes: ['String concatenation in loops can be quadratic in languages with immutable string buffers, but modern JS engines optimize short strings.'],
      followUpQuestions: ['How would you solve this using `split("").reverse().join("")`?'],
      similarQuestions: ['Palindrome Check', 'Reverse Words in a String'],
    },
  },
  {
    detail: {
      id: 'guide-code-remove-duplicates',
      questionNumber: 'GUIDE-CODE-08',
      title: 'Remove Duplicates from Array',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'Arrays (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Deduplication', 'Set'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function `removeDuplicates(arr)` that takes an array and returns a new array with all duplicate elements removed, preserving first occurrence order.',
      input: 'arr: unknown[]',
      output: 'unknown[] — array of unique elements',
      constraints: ['0 <= arr.length <= 1000'],
      examples: [
        { input: '[1, 2, 2, 3, 4, 4, 5]', output: '[1, 2, 3, 4, 5]', explanation: 'Duplicate 2 and 4 are removed.' },
      ],
      edgeCases: [
        { case: 'All identical elements [2, 2, 2]', expected: '[2]' },
      ],
      functionName: 'removeDuplicates',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 2, 3, 4, 4, 5]], expectedOutput: [1, 2, 3, 4, 5], description: 'deduplicate numbers' },
        { input: [['a', 'b', 'a']], expectedOutput: ['a', 'b'], description: 'deduplicate strings' },
        { input: [[2, 2, 2]], expectedOutput: [2], description: 'all identical' },
      ],
    },
    hints: {
      hints: [
        'Initialize an empty unique array.',
        'Iterate over input array elements.',
        'Push element if `!unique.includes(element)`.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Keep the first occurrence of each value while preserving input order.',
      javascriptSolution: `function removeDuplicates<T>(arr: readonly T[]): T[] {
  const result: T[] = [];

  for (let i = 0; i < arr.length; i += 1) {
    let exists = false;

    for (let j = 0; j < result.length; j += 1) {
      if (Object.is(result[j], arr[i])) {
        exists = true;
        break;
      }
    }

    if (!exists) result.push(arr[i]);
  }

  return result;
}`,
      typescriptSolution: `function removeDuplicates<T>(arr: readonly T[]): T[] {
  const result: T[] = [];

  for (let i = 0; i < arr.length; i += 1) {
    let exists = false;

    for (let j = 0; j < result.length; j += 1) {
      if (Object.is(result[j], arr[i])) {
        exists = true;
        break;
      }
    }

    if (!exists) result.push(arr[i]);
  }

  return result;
}`,
      builtInSolution: `function removeDuplicates<T>(arr: readonly T[]): T[] {
  return [...new Set(arr)];
}`,
      timeComplexity: 'O(n) for the manual scan/traversal; native helpers preserve the same asymptotic order unless sorting is involved.',
      spaceComplexity: 'O(n) for output or intermediate storage when a new collection is created.',
      commonMistakes: ['`includes()` takes O(n) per element, making the manual loop quadratic. `new Set()` is O(n).'],
      followUpQuestions: ['How can you remove duplicates in O(n) time using a Set or HashMap?'],
      similarQuestions: ['Remove Duplicates from Sorted Array', 'Single Number'],
    },
  },
  {
    detail: {
      id: 'guide-code-palindrome-check',
      questionNumber: 'GUIDE-CODE-09',
      title: 'Palindrome Check',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'Strings (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Strings', 'Two Pointers', 'Palindrome'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function `isPalindrome(str)` that checks whether a string reads the same forwards and backwards.',
      input: 'str: string',
      output: 'boolean — true if palindrome, false otherwise',
      constraints: ['0 <= str.length <= 1000'],
      examples: [
        { input: '"madam"', output: 'true', explanation: 'madam reversed is madam.' },
      ],
      edgeCases: [
        { case: 'Single character string', expected: 'true' },
        { case: 'Non-palindrome string', expected: 'false' },
      ],
      functionName: 'isPalindrome',
      isClassBased: false,
      sampleTests: [
        { input: ['madam'], expectedOutput: true, description: 'madam is palindrome' },
        { input: ['racecar'], expectedOutput: true, description: 'racecar is palindrome' },
        { input: ['hello'], expectedOutput: false, description: 'hello is not palindrome' },
      ],
    },
    hints: {
      hints: [
        'Loop up to `str.length / 2`.',
        'Compare character at `i` with character at `str.length - 1 - i`.',
        'Return false immediately on mismatch; return true if loop finishes.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Compare symmetric characters from both ends; one mismatch is enough to return false.',
      javascriptSolution: `function isPalindrome(str: string): boolean {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left += 1;
    right -= 1;
  }

  return true;
}`,
      typescriptSolution: `function isPalindrome(str: string): boolean {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left += 1;
    right -= 1;
  }

  return true;
}`,
      builtInSolution: `function isPalindrome(str: string): boolean {
  return str === [...str].reverse().join("");
}`,
      timeComplexity: 'O(n) for the manual scan/traversal; native helpers preserve the same asymptotic order unless sorting is involved.',
      spaceComplexity: 'O(n) for output or intermediate storage when a new collection is created.',
      commonMistakes: ['Not returning early on mismatch.'],
      followUpQuestions: ['How would you handle alphanumeric palindrome checks ignoring case and non-alphanumeric characters?'],
      similarQuestions: ['Valid Palindrome', 'Palindrome Number'],
    },
  },
  {
    detail: {
      id: 'guide-code-find-max',
      questionNumber: 'GUIDE-CODE-10',
      title: 'Find Max Element in Array',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Arrays (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Iterative Search'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function `findMax(arr)` that returns the largest number in a non-empty array of numbers using a loop.',
      input: 'arr: number[]',
      output: 'number — the maximum element',
      constraints: ['1 <= arr.length <= 1000'],
      examples: [
        { input: '[3, 7, 2, 9, 5]', output: '9', explanation: '9 is the largest element.' },
      ],
      edgeCases: [
        { case: 'All negative numbers [-5, -2, -10]', expected: '-2' },
      ],
      functionName: 'findMax',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 7, 2, 9, 5]], expectedOutput: 9, description: 'find max in [3,7,2,9,5]' },
        { input: [[-5, -2, -10]], expectedOutput: -2, description: 'all negative numbers' },
        { input: [[42]], expectedOutput: 42, description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'Initialize `max = arr[0]`.',
        'Loop through array starting from index 1.',
        'If `arr[i] > max`, update `max = arr[i]`.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Scan once and keep the largest value seen so far.',
      javascriptSolution: `function findMax(arr: readonly number[]): number {
  if (arr.length === 0) throw new Error("Empty array");

  let max = arr[0];

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > max) max = arr[i];
  }

  return max;
}`,
      typescriptSolution: `function findMax(arr: readonly number[]): number {
  if (arr.length === 0) throw new Error("Empty array");

  let max = arr[0];

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > max) max = arr[i];
  }

  return max;
}`,
      builtInSolution: `function findMax(arr: readonly number[]): number {
  if (arr.length === 0) throw new Error("Empty array");
  return Math.max(...arr);
}`,
      timeComplexity: 'O(n) for the manual scan/traversal; native helpers preserve the same asymptotic order unless sorting is involved.',
      spaceComplexity: 'O(n) for output or intermediate storage when a new collection is created.',
      commonMistakes: ['Initializing `max = 0` which fails when array contains negative numbers.'],
      followUpQuestions: ['How does `Math.max(...arr)` work, and why can it fail for very large arrays?'],
      similarQuestions: ['Find Min Element', 'Second Largest Element'],
    },
  },
  {
    detail: {
      id: 'guide-code-find-min',
      questionNumber: 'GUIDE-CODE-11',
      title: 'Find Min Element in Array',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Arrays (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Iterative Search'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function `findMin(arr)` that returns the smallest number in a non-empty array of numbers using a loop.',
      input: 'arr: number[]',
      output: 'number — the minimum element',
      constraints: ['1 <= arr.length <= 1000'],
      examples: [
        { input: '[3, 7, 2, 9, 5]', output: '2', explanation: '2 is the smallest element.' },
      ],
      edgeCases: [
        { case: 'All negative numbers [-5, -2, -10]', expected: '-10' },
      ],
      functionName: 'findMin',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 7, 2, 9, 5]], expectedOutput: 2, description: 'find min in [3,7,2,9,5]' },
        { input: [[-5, -2, -10]], expectedOutput: -10, description: 'all negative numbers' },
        { input: [[42]], expectedOutput: 42, description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'Initialize `min = arr[0]`.',
        'Loop through array starting from index 1.',
        'If `arr[i] < min`, update `min = arr[i]`.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Scan once and keep the smallest value seen so far.',
      javascriptSolution: `function findMin(arr: readonly number[]): number {
  if (arr.length === 0) throw new Error("Empty array");

  let min = arr[0];

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < min) min = arr[i];
  }

  return min;
}`,
      typescriptSolution: `function findMin(arr: readonly number[]): number {
  if (arr.length === 0) throw new Error("Empty array");

  let min = arr[0];

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < min) min = arr[i];
  }

  return min;
}`,
      builtInSolution: `function findMin(arr: readonly number[]): number {
  if (arr.length === 0) throw new Error("Empty array");
  return Math.min(...arr);
}`,
      timeComplexity: 'O(n) for the manual scan/traversal; native helpers preserve the same asymptotic order unless sorting is involved.',
      spaceComplexity: 'O(n) for output or intermediate storage when a new collection is created.',
      commonMistakes: ['Initializing `min = 0` which fails when array contains all positive numbers.'],
      followUpQuestions: ['How can you find both min and max in 1.5n comparisons?'],
      similarQuestions: ['Find Max Element', 'Find Minimum in Rotated Sorted Array'],
    },
  },
  {
    detail: {
      id: 'guide-code-char-frequency',
      questionNumber: 'GUIDE-CODE-12',
      title: 'Count Character Frequency',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Strings (DSA)',
      part: 'JS Fundamentals',
      concepts: ['Strings', 'HashMap', 'Frequency Counter'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function `charFrequency(str)` that counts the occurrences of each character in a string and returns an object mapping characters to their frequencies.',
      input: 'str: string',
      output: 'Record<string, number> — object with character counts',
      constraints: ['0 <= str.length <= 1000'],
      examples: [
        { input: '"banana"', output: '{"b":1, "a":3, "n":2}', explanation: 'b occurs 1 time, a 3 times, n 2 times.' },
      ],
      edgeCases: [
        { case: 'Empty string', expected: '{}' },
      ],
      functionName: 'charFrequency',
      isClassBased: false,
      sampleTests: [
        { input: ['banana'], expectedOutput: { b: 1, a: 3, n: 2 }, description: 'frequency of "banana"' },
        { input: ['hello'], expectedOutput: { h: 1, e: 1, l: 2, o: 1 }, description: 'frequency of "hello"' },
        { input: [''], expectedOutput: {}, description: 'empty string' },
      ],
    },
    hints: {
      hints: [
        'Initialize an empty object `freq = {}`.',
        'Iterate over characters of the string.',
        'Set `freq[char] = (freq[char] || 0) + 1`.',
      ],
    }, solution: {
      algorithm: 'Step 1: Understand the input and edge cases. Step 2: Write the core algorithm explicitly with loops, recursion, a stack, or the required data structure. Step 3: Verify the same behavior with the practical built-in alternative. Step 4: Check empty, boundary, duplicate, malformed, and maximum-size cases.',
      dryRun: 'Scan once and increment a counter per character.',
      javascriptSolution: `function charFrequency(str: string): Record<string, number> {
  const count: Record<string, number> = Object.create(null);

  for (let i = 0; i < str.length; i += 1) {
    const ch = str[i];
    count[ch] = (count[ch] ?? 0) + 1;
  }

  return count;
}`,
      typescriptSolution: `function charFrequency(str: string): Record<string, number> {
  const count: Record<string, number> = Object.create(null);

  for (let i = 0; i < str.length; i += 1) {
    const ch = str[i];
    count[ch] = (count[ch] ?? 0) + 1;
  }

  return count;
}`,
      builtInSolution: `function charFrequency(str: string): Map<string, number> {
  const count = new Map<string, number>();

  for (const ch of str) {
    count.set(ch, (count.get(ch) ?? 0) + 1);
  }

  return count;
}`,
      timeComplexity: 'O(n) for the manual scan/traversal; native helpers preserve the same asymptotic order unless sorting is involved.',
      spaceComplexity: 'O(n) for output or intermediate storage when a new collection is created.',
      commonMistakes: ['Not initializing undefined keys to 0 before incrementing.'],
      followUpQuestions: ['How would you find the most frequent character in a string?'],
      similarQuestions: ['Valid Anagram', 'First Unique Character in a String'],
    },
  },
];


export const MOCK_GUIDE_EXTRA_TECHNICAL_QUESTIONS: MockTechnicalQuestion[] = [
  {
    detail: {
      id: 'guide-tech-data-types',
      questionNumber: 'GUIDE-TECH-01',
      title: 'JavaScript Data Types & Value vs Reference Storage',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'JavaScript Basics',
      part: 'JS Fundamentals',
      concepts: ['Data Types', 'Primitives', 'Objects', 'Value vs Reference'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What are JavaScript data types and how are primitives vs objects stored?',
    },
    answer: {
      expectedAnswer:
        'JavaScript has 8 data types: 7 primitives (string, number, boolean, null, undefined, symbol, bigint) and 1 reference type (object, which includes arrays, functions, dates). Primitives are immutable and stored directly by value in memory, whereas objects are mutable and stored/passed by reference.',
      deepExplanation:
        'Primitive values are stored on the call stack or inline memory addresses. When assigned to another variable or passed to a function, a complete copy of the value is created. Operations on primitives create new values rather than mutating the original.\n\nObjects (including Arrays and Functions) are allocated on the memory heap. Variables storing objects hold a reference pointer to that heap memory address. Copying an object variable copies only the pointer reference, meaning mutations via one reference affect all reference variables pointing to the same underlying heap location.',
      example: {
        code: `// Primitive by value
let a = 10;
let b = a;
b = 20;
console.log(a, b); // 10, 20

// Object by reference
let obj1 = { name: "Alice" };
let obj2 = obj1;
obj2.name = "Bob";
console.log(obj1.name); // "Bob"`,
        output: '10 20\n"Bob"',
        explanation: 'a remains 10 because primitives copy values. obj1.name updates to "Bob" because obj1 and obj2 share the same memory reference pointer.',
      },
      productionExample:
        'State management in React (e.g. useState) relies on immutability. Mutating an object property directly (`user.name = "Bob"`) preserves object identity reference, so React fails to trigger re-renders. Spreading (`setUser({ ...user, name: "Bob" })`) creates a new object reference.',
      bestPractices: [
        'Always treat state objects as immutable in React.',
        'Use `typeof` for checking primitives (except `typeof null === "object"` quirk).',
        'Use `Array.isArray()` to check arrays.',
      ],
      tradeOffs:
        'Primitive copies are lightweight; shallow object copies (`{...obj}`) duplicate pointers; deep copies (`structuredClone`) duplicate full object graphs at higher CPU/memory cost.',
      commonMistakes: [
        'Believing `typeof null` returns "null" (it returns "object" due to legacy 32-bit tag representation).',
        'Expecting shallow copies like `Object.assign()` to clone deeply nested objects.',
      ],
      followUpQuestions: [
        'How does `structuredClone()` differ from `JSON.parse(JSON.stringify())`?',
        'Why are Symbols and BigInts used in modern JavaScript?',
      ],
      relatedTopics: ['JavaScript Data Types', 'Primitives', 'Memory Allocation', 'Immutability'],
    },
  },
  {
    detail: {
      id: 'guide-tech-call-apply-bind',
      questionNumber: 'GUIDE-TECH-02',
      title: 'Difference between call, apply, and bind',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: 'Functions & Scope',
      part: 'JS Fundamentals',
      concepts: ['this keyword', 'call', 'apply', 'bind', 'Function.prototype'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is the difference between call, apply, and bind in JavaScript?',
    },
    answer: {
      expectedAnswer:
        '`call`, `apply`, and `bind` are methods on `Function.prototype` used to explicitly set the `this` context of a function. `call()` invokes the function immediately with comma-separated arguments. `apply()` invokes the function immediately with arguments passed as an array. `bind()` does not execute the function immediately; it returns a new function with `this` permanently bound.',
      deepExplanation:
        'All three methods override default dynamic `this` resolution rules.\n- `fn.call(thisArg, arg1, arg2, ...)` passes arguments individually.\n- `fn.apply(thisArg, [arg1, arg2, ...])` passes arguments as an array or array-like object.\n- `fn.bind(thisArg, arg1, ...)` returns a bound wrapper function. It also supports partial application (currying) by pre-filling initial parameters.',
      example: {
        code: `const person = { name: 'Alice' };

function greet(greeting, punctuation) {
  return \`\${greeting}, \${this.name}\${punctuation}\`;
}

console.log(greet.call(person, 'Hello', '!')); // "Hello, Alice!"
console.log(greet.apply(person, ['Hi', '.'])); // "Hi, Alice."

const boundGreet = greet.bind(person, 'Hey');
console.log(boundGreet('?')); // "Hey, Alice?"`,
        output: '"Hello, Alice!"\n"Hi, Alice."\n"Hey, Alice?"',
        explanation: 'call passes parameters comma-separated, apply takes an array, bind returns a reusable bound function with pre-set arguments.',
      },
      productionExample:
        'In legacy React class components, event handlers in `render()` required `.bind(this)` in the constructor so method calls retained the component instance context when invoked asynchronously by DOM event listeners.',
      bestPractices: [
        'Prefer arrow functions in modern code for automatic lexical `this` binding.',
        'Use rest parameters `...args` and `.call()` instead of `.apply()` in modern ES6+ codebases.',
      ],
      tradeOffs:
        '`.bind()` creates a new function closure in memory on every call, whereas arrow functions lexically capture outer scope during compilation.',
      commonMistakes: [
        'Attempting to re-bind a function already bound via `.bind()` (subsequent `.bind()` calls cannot override the first bound `this`).',
        'Using `.bind()` inside render methods of React components, causing extra re-renders due to new function identity.',
      ],
      followUpQuestions: [
        'What happens when you call `.bind()` on an arrow function?',
        'How would you implement a custom polyfill for `Function.prototype.bind`?',
      ],
      relatedTopics: ['this Keyword', 'Functions', 'Execution Context', 'Function.prototype'],
    },
  },
  {
    detail: {
      id: 'guide-tech-props-vs-state',
      questionNumber: 'GUIDE-TECH-03',
      title: 'Props vs State in React',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'React Core',
      part: 'React Fundamentals',
      concepts: ['React Component Model', 'Props', 'State', 'Unidirectional Data Flow'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '0–2 Years',
      question: 'What is the difference between Props and State in React?',
    },
    answer: {
      expectedAnswer:
        'Props (short for properties) are read-only inputs passed into a component from its parent to configure it, following unidirectional data flow. State is internal, mutable data owned and managed directly within a component that can trigger UI re-renders when updated via setter functions.',
      deepExplanation:
        'Props act like function parameters in pure components: a component should never mutate its own props (`props.title = "New"` throws in strict mode/is anti-pattern). State acts like local variables managed inside a component lifecycle (via `useState` or `useReducer`). When state changes, React schedules a component re-render along with all child components in its subtree.',
      example: {
        code: `// Parent passes prop
function Parent() {
  return <Counter initialCount={5} />;
}

// Child manages local state
function Counter({ initialCount }) {
  const [count, setCount] = React.useState(initialCount);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
        output: 'Interactive counter starting at 5',
        explanation: 'initialCount is a read-only prop passed down. count is internal state modified via setCount.',
      },
      productionExample:
        'In design systems, reusable components like `<Button variant="primary" disabled={isLoading} />` consume props for configuration, while higher-level container components manage state (e.g. form submission status) and pass state down as props.',
      bestPractices: [
        'Keep state local to where it is needed; lift state up only when siblings must share it.',
        'Derive data during render instead of putting easily calculated values in state.',
      ],
      tradeOffs:
        'Passing props deeply creates prop-drilling; overuse of global state bypasses component modularity.',
      commonMistakes: [
        'Attempting to mutate props directly inside child components.',
        'Duplicating props into state unnecessarily without syncing changes when props update.',
      ],
      followUpQuestions: [
        'What is prop drilling and how do Context API or state libraries solve it?',
        'How do controlled vs uncontrolled component patterns differ regarding state vs props?',
      ],
      relatedTopics: ['React Props', 'React State', 'Component Architecture', 'Re-rendering'],
    },
  },
  {
    detail: {
      id: 'guide-tech-type-react-components',
      questionNumber: 'GUIDE-TECH-04',
      title: 'How to Type React Components in TypeScript',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: 'TypeScript',
      part: 'TypeScript',
      concepts: ['TypeScript', 'React.FC', 'Props Interfaces', 'JSX.Element'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'How do you type React components and props in TypeScript?',
    },
    answer: {
      expectedAnswer:
        'React components are typed by defining TypeScript `interface` or `type` contracts for their props and typing the function signature. Modern TypeScript React best practice defines props via an explicit interface passed to regular function components (`function MyComponent(props: Props): JSX.Element`). `React.FC<Props>` is also valid but often discouraged in modern codebases because it implicitly handled `children` in older types and complicates generics.',
      deepExplanation:
        'Typing components provides compile-time safety, auto-completion in IDEs, and self-documenting APIs.\n1. **Props Interface**: Define expected prop names, types, optional flags (`?`), and callback signatures (`(id: string) => void`).\n2. **Component Signature**: Pass the interface as parameter type: `export function Card({ title, onClick }: CardProps)`.',
      example: {
        code: `import React from 'react';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export function CustomButton({ label, variant = 'primary', onClick, children }: ButtonProps): React.JSX.Element {
  return (
    <button className={\`btn \${variant}\`} onClick={onClick}>
      {label}
      {children}
    </button>
  );
}`,
        output: 'Fully type-safe React button component',
        explanation: 'ButtonProps strictly enforces label string, optional variant enum, and mouse event handler.',
      },
      productionExample:
        'Enterprise component libraries export prop interfaces (`export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>`) allowing consumers to extend native HTML button/input attributes cleanly.',
      bestPractices: [
        'Export prop interfaces alongside components for reusability.',
        'Use `React.ReactNode` for children props.',
        'Use `React.ComponentPropsWithRef<"button">` when extending native DOM elements.',
      ],
      tradeOffs:
        'Writing explicit interfaces adds boilerplate up front but saves hours of runtime prop-type debugging.',
      commonMistakes: [
        'Using `any` for event parameters instead of standard React event types like `React.ChangeEvent<HTMLInputElement>`.',
        'Overusing `React.FC` when defining generic components.',
      ],
      followUpQuestions: [
        'How do you create generic React components in TypeScript (`<List<T> items={...} />`)?',
        'How do `React.ReactNode` vs `React.ReactElement` vs `JSX.Element` differ?',
      ],
      relatedTopics: ['TypeScript React', 'Component Typing', 'React.FC', 'Props Interfaces'],
    },
  },
  {
    detail: {
      id: 'guide-tech-any-unknown-never',
      questionNumber: 'GUIDE-TECH-05',
      title: 'any vs unknown vs never in TypeScript',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: 'TypeScript',
      part: 'TypeScript',
      concepts: ['TypeScript', 'Type System', 'Top Types', 'Bottom Type', 'Type Guard'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is the difference between any, unknown, and never in TypeScript?',
    },
    answer: {
      expectedAnswer:
        '`any` is an escape hatch that disables all type checking on a value. `unknown` is the type-safe counterpart of `any` (a top type) — you can assign anything to `unknown`, but TypeScript forces you to perform type narrowing/guards before performing operations on it. `never` is the bottom type representing values that can never exist (e.g. functions that always throw or infinite loops, or exhaustive switch checks).',
      deepExplanation:
        '- **`any`**: Opts out of type checking entirely. Properties can be accessed without checks, bypassing compiler safety.\n- **`unknown`**: Represents values of unknown structure (e.g. API responses or user input). Must be narrowed via `typeof`, `instanceof`, or custom type predicates before calling methods.\n- **`never`**: No value can be assigned to `never`. Used in control flow analysis to ensure exhaustive handling of union types.',
      example: {
        code: `// any: unsafe
let dataAny: any = "hello";
dataAny.nonExistentMethod(); // Compiles fine, crashes at runtime!

// unknown: safe top type
let dataUnknown: unknown = "hello";
// dataUnknown.toUpperCase(); // Error: Object is of type 'unknown'
if (typeof dataUnknown === "string") {
  console.log(dataUnknown.toUpperCase()); // Safe! "HELLO"
}

// never: exhaustive check
type Shape = 'circle' | 'square';
function getArea(s: Shape): number {
  switch (s) {
    case 'circle': return 1;
    case 'square': return 2;
    default:
      const _exhaustiveCheck: never = s;
      return _exhaustiveCheck;
  }
}`,
        output: '"HELLO"',
        explanation: 'unknown requires type guards before usage. never causes compile errors if new Shape union members are unhandled.',
      },
      productionExample:
        'In API error handling (`try { ... } catch (err: unknown)`), typing `err` as `unknown` (TypeScript default in recent versions) prevents unsafe access like `err.message` without checking `err instanceof Error`.',
      bestPractices: [
        'Never use `any` in new code; use `unknown` for dynamic data and narrow with type guards.',
        'Use `never` for exhaustive checks in discriminated union switches.',
      ],
      tradeOffs:
        '`unknown` requires extra type-checking code up front but prevents runtime NullPointer / TypeError exceptions.',
      commonMistakes: [
        'Confusing `unknown` with `any` and assuming properties can be accessed directly.',
        'Using `void` instead of `never` for functions that throw errors unconditionally.',
      ],
      followUpQuestions: [
        'How do custom Type Predicates (`fn(x: any): x is MyType`) work with `unknown`?',
        'Why does `unknown & string` evaluate to `string`, while `never & string` evaluates to `never`?',
      ],
      relatedTopics: ['TypeScript Types', 'any vs unknown vs never', 'Type Safety', 'Type Narrowing'],
    },
  },
  {
    detail: {
      id: 'guide-tech-redux-vs-context',
      questionNumber: 'GUIDE-TECH-06',
      title: 'Redux vs Context API in React',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: 'State Management',
      part: 'Redux/State',
      concepts: ['Redux', 'Context API', 'State Management', 'Performance'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '2–5 Years',
      question: 'What is the difference between Redux and React Context API, and when should you use each?',
    },
    answer: {
      expectedAnswer:
        'React Context API is a built-in dependency-injection mechanism for avoiding prop-drilling by sharing data across a component tree. Redux (and Redux Toolkit) is a full application state management architecture featuring centralized stores, predictable action dispatches, middleware ecosystems, state selector memoization, and time-travel devtools. Context is best for low-frequency global values (theme, locale, auth user), while Redux is designed for complex, frequently-updated, shared business state.',
      deepExplanation:
        'Context API triggers re-renders for **all consuming components** whenever its context value changes, regardless of whether a component uses the changed part of the context value. Redux uses fine-grained state selectors (`useSelector`) with equality checks, re-rendering components only when the specific selected slice of state changes.\n\nRedux also standardizes async operations (RTK Query / Thunks), middleware logging/persistence, and strict unidirectional state updates through pure reducers.',
      example: {
        code: `// Context: Good for static/infrequent global settings
const ThemeContext = React.createContext('dark');

// Redux: Good for active shared data domain
// const user = useAppSelector(selectCurrentUser);
// const dispatch = useAppDispatch();
// dispatch(updateCartItem({ id: 1, qty: 2 }));`,
        output: 'ThemeContext vs Redux Toolkit slice usage',
        explanation: 'Context injects values into trees; Redux manages complex state transitions with selector memoization.',
      },
      productionExample:
        'Large e-commerce apps use Context API for `<ThemeProvider>` and `<AuthProvider>`, but use Redux Toolkit / RTK Query for shopping cart items, product filters, real-time inventory counts, and cached API responses.',
      bestPractices: [
        'Use Context for low-frequency global values (theme, language).',
        'Use Redux / RTK Query for dynamic business state and cached server responses.',
        'Split Context into smaller individual providers to minimize unintended re-renders.',
      ],
      tradeOffs:
        'Context requires zero extra dependencies; Redux adds package bundle size and architecture setup but scales far better for complex state.',
      commonMistakes: [
        'Putting high-frequency changing state (e.g. text inputs or mouse movement) into a single React Context.',
        'Using Redux for simple form input state that is local to one component.',
      ],
      followUpQuestions: [
        'How can `useMemo` or splitting context providers optimize Context API performance?',
        'How does RTK Query eliminate the need for manual data-fetching Redux thunks?',
      ],
      relatedTopics: ['Redux', 'Context API', 'State Management', 'React Architecture'],
    },
  },
  {
    detail: {
      id: 'guide-tech-react-vs-frameworks',
      questionNumber: 'GUIDE-TECH-07',
      title: 'React vs Vue, Angular, and Svelte',
      difficulty: 'Hard',
      companies: COMPANIES,
      frequency: 4,
      category: 'Frontend Frameworks',
      part: 'Architecture',
      concepts: ['React', 'Vue', 'Angular', 'Svelte', 'Virtual DOM', 'Compiler'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'technical',
      experienceLevel: '5–8 Years / 8+ Years',
      question: 'How does React compare to Vue, Angular, and Svelte in architecture and rendering philosophy?',
    },
    answer: {
      expectedAnswer:
        'React is a UI library focused on JavaScript-centric component rendering via a Virtual DOM and unidirectional data flow. Vue is a progressive framework offering template/script single-file components with fine-grained reactivity. Angular is a full-fledged, opinionated TypeScript framework built with dependency injection and RxJS. Svelte is a compiler that shifts work from runtime to build time, eliminating the Virtual DOM altogether by compiling components into surgical DOM update instructions.',
      deepExplanation:
        '- **React**: Unidirectional flow, JSX (JS expressions in layout), Virtual DOM diffing, component-level hooks (`useState`/`useEffect`). Massive ecosystem.\n- **Vue 3**: Reactive proxy system (`ref`/`reactive`), template compiler optimizations, Composition API. Easy learning curve.\n- **Angular**: Complete MVC architecture out of the box (HTTP client, Router, Forms, RxJS observables, Dependency Injection). Heavy enterprise structure.\n- **Svelte**: No Virtual DOM. Compiles templates into imperative DOM operations during build (`count += 1` automatically updates matching DOM nodes). Minimal runtime overhead.',
      example: {
        code: `// React: Virtual DOM re-renders component function
const [count, setCount] = useState(0);
// <button onClick={() => setCount(count + 1)}>{count}</button>

// Svelte: Compiled reactive variable assignment
// let count = 0;
// <button on:click={() => count += 1}>{count}</button>`,
        output: 'React runtime Virtual DOM vs Svelte compile-time reactivity',
        explanation: 'React recalculates Virtual DOM trees; Svelte compiles updates into direct DOM node mutations.',
      },
      productionExample:
        'Companies choose React for huge talent pools and multi-platform reach (React Native), Angular for large enterprise teams desiring enforced architectural patterns, Vue for fast migration of legacy web apps, and Svelte for embedded UI widgets or performance-critical low-memory environments.',
      bestPractices: [
        'Choose based on team familiarity, project longevity, and ecosystem requirements.',
        'Understand that React is a UI library requiring external choices (routing, state), whereas Angular provides all solutions natively.',
      ],
      tradeOffs:
        'React offers unmatched flexibility and ecosystem size; Svelte delivers smaller bundle sizes and faster raw updates; Angular ensures strict enterprise consistency.',
      commonMistakes: [
        'Calling React a "full framework" when it is specifically a component rendering library.',
        'Assuming Virtual DOM is always faster than direct DOM updates (Svelte proves compiled direct updates can outperform VDOM reconciliation).',
      ],
      followUpQuestions: [
        'What are React Server Components (RSC) and how do they change the client/server boundary?',
        'How does Vue 3 composition API compare to React Hooks regarding closure pitfalls?',
      ],
      relatedTopics: ['Frontend Frameworks', 'React vs Vue vs Angular vs Svelte', 'Virtual DOM', 'Reactivity'],
    },
  },
];