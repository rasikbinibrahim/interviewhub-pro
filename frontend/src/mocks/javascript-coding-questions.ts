// Hand-authored coding questions for JS Fundamentals / Advanced JS. Unlike
// the auto-generated MockTechnicalQuestion files, these are real
// CodingQuestionDetail problems: every sampleTests entry has been checked
// against the reference solution below, and both the JavaScript and
// TypeScript solutions are genuine, working code (no placeholder stubs).

import type { MockCodingQuestion } from '@/mocks/questions';

const COMPANIES = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Netflix', 'Uber', 'Airbnb', 'Flipkart'];

export const MOCK_JAVASCRIPT_CODING_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'js-coding-1',
      questionNumber: 'JSCODE-1',
      title: 'Flatten Array to a Given Depth',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Arrays',
      part: 'JS Fundamentals',
      concepts: ['Recursion', 'Arrays', 'Array.prototype.flat'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Implement a function that flattens a nested array up to a given depth, without using the built-in Array.prototype.flat.',
      input: 'arr: unknown[], depth: number',
      output: 'unknown[] — the flattened array',
      constraints: ['0 <= arr.length <= 1000', '0 <= depth <= 10'],
      examples: [
        { input: '[1, [2, [3, [4]], 5]], 1', output: '[1, 2, [3, [4]], 5]', explanation: 'Only one level of nesting is flattened.' },
        { input: '[1, [2, [3, [4]], 5]], Infinity', output: '[1, 2, 3, 4, 5]', explanation: 'Every level of nesting is flattened.' },
      ],
      edgeCases: [
        { case: 'depth is 0', expected: 'Returns a shallow copy of the array, unchanged' },
        { case: 'Empty array', expected: 'Returns []' },
      ],
      functionName: 'flattenArray',
      isClassBased: false,
      sampleTests: [
        { input: [[1, [2, [3, [4]], 5]], 1], expectedOutput: [1, 2, [3, [4]], 5], description: 'flatten one level' },
        { input: [[1, [2, [3, [4]], 5]], Infinity], expectedOutput: [1, 2, 3, 4, 5], description: 'flatten fully' },
        { input: [[], 2], expectedOutput: [], description: 'empty array' },
        { input: [[1, 2, 3], 0], expectedOutput: [1, 2, 3], description: 'depth 0 returns array unchanged' },
      ],
    },
    hints: {
      hints: [
        'Use `Array.prototype.reduce` to build the result, checking `Array.isArray` on each element.',
        'When you hit a nested array and depth is still > 0, recurse with `depth - 1`; otherwise keep the element as-is.',
        'Stopping condition: once depth reaches 0, nested arrays are pushed in as-is rather than spread.',
      ],
    },
    solution: {
      algorithm:
        'Built-in approach: arr.flat(depth). Manual approach: reduce over the array, recursively flattening nested arrays when depth > 0.',
      dryRun: 'arr=[1,[2,[3]]], depth=1\n1 -> concat 1\n[2,[3]] is array, depth>0 -> flatten([2,[3]], 0) = [2,[3]] -> concat\nresult=[1,2,[3]]',
      javascriptSolution: `function flattenArray(arr, depth) {
  // Built-in ES2019 approach:
  // return arr.flat(depth);

  // Manual recursive approach (without built-in Array.prototype.flat):
  if (depth <= 0) return arr.slice();
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val, depth - 1) : val),
    []
  );
}`,
      typescriptSolution: `function flattenArray(arr: unknown[], depth: number): unknown[] {
  // Built-in ES2019 approach:
  // return arr.flat(depth);

  // Manual recursive approach (without built-in Array.prototype.flat):
  if (depth <= 0) return arr.slice();
  return arr.reduce<unknown[]>(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val, depth - 1) : val),
    []
  );
}`,
      timeComplexity: 'O(n) where n is the total number of elements across all nesting levels visited.',
      spaceComplexity: 'O(n) for the output array plus O(depth) recursion stack.',
      commonMistakes: [
        'Forgetting to decrement depth on recursive calls, causing infinite flattening regardless of the requested depth.',
        'Using `push` with spread inside a loop instead of `concat`, which still works but is easy to get wrong with nested spreads.',
        'Not handling `depth = 0` as a base case and recursing forever.',
      ],
      followUpQuestions: [
        'How would you flatten iteratively using an explicit stack instead of recursion?',
        'How does this compare to the native `Array.prototype.flat(depth)`?',
        'How would you flatten an object of arbitrarily nested arrays and objects?',
      ],
      similarQuestions: ['Flatten Nested List Iterator', 'Flatten a Multilevel Doubly Linked List'],
    },
  },
  {
    detail: {
      id: 'js-coding-2',
      questionNumber: 'JSCODE-2',
      title: 'Deep Clone an Object',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 5,
      category: 'Objects',
      part: 'Advanced JS',
      concepts: ['Recursion', 'Objects', 'References vs Values'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Write a function that deep-clones a plain JavaScript value (objects, arrays, and primitives nested arbitrarily deep) without using structuredClone or JSON.parse/stringify.',
      input: 'value: unknown',
      output: 'unknown — a deep copy of value with no shared references at any nesting level',
      constraints: ['Input contains only plain objects, arrays, and primitives (no functions, Dates, or Maps)'],
      examples: [
        { input: '{ a: 1, b: { c: 2 } }', output: '{ a: 1, b: { c: 2 } }', explanation: 'A structurally identical but independent copy.' },
      ],
      edgeCases: [
        { case: 'value is a primitive', expected: 'Returned as-is' },
        { case: 'value is an array of objects', expected: 'Every nested object is independently cloned' },
      ],
      functionName: 'deepClone',
      isClassBased: false,
      sampleTests: [
        { input: [{ a: 1, b: { c: 2 } }], expectedOutput: { a: 1, b: { c: 2 } }, description: 'nested object' },
        { input: [[1, [2, 3], { x: 1 }]], expectedOutput: [1, [2, 3], { x: 1 }], description: 'array with nested array and object' },
        { input: [5], expectedOutput: 5, description: 'primitive passes through unchanged' },
        { input: [null], expectedOutput: null, description: 'null passes through unchanged' },
      ],
    },
    hints: {
      hints: [
        'If the value is not an object (or is null), return it directly — primitives are already immutable copies.',
        'Handle arrays and plain objects as two separate cases, since `for...in` iterates array indices too but you want a real array back.',
        'Recurse into every property value with the same clone function.',
      ],
    },
    solution: {
      algorithm:
        'If value is not an object or is null, return it directly. If it is an array, map every element through deepClone. Otherwise build a new object and recursively clone every own enumerable property.',
      dryRun: '{a:1,b:{c:2}} -> not array -> new object -> a: deepClone(1)=1, b: deepClone({c:2}) -> {c: deepClone(2)=2} -> {c:2}\nresult = {a:1,b:{c:2}}',
      javascriptSolution: `function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(deepClone);
  const result = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
}`,
      typescriptSolution: `function deepClone<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map((item) => deepClone(item)) as unknown as T;
  const result = {} as T;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
}`,
      timeComplexity: 'O(n) where n is the total number of properties/elements across all nesting levels.',
      spaceComplexity: 'O(n) for the cloned structure plus O(depth) recursion stack.',
      commonMistakes: [
        'Using `JSON.parse(JSON.stringify(value))`, which silently drops functions, undefined, and Dates — fine for interviews only when explicitly allowed.',
        'Forgetting `Object.prototype.hasOwnProperty` and copying inherited enumerable properties too.',
        'Not special-casing arrays, so `Array.isArray` becomes false after cloning into a plain object.',
      ],
      followUpQuestions: [
        'How would you handle circular references?',
        'How would you extend this to clone Dates, Maps, and Sets correctly?',
        'How does this compare to the native `structuredClone`?',
      ],
      similarQuestions: ['Clone Graph', 'Copy List with Random Pointer'],
    },
  },
  {
    detail: {
      id: 'js-coding-3',
      questionNumber: 'JSCODE-3',
      title: 'Deep Equal',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: 'Objects',
      part: 'Advanced JS',
      concepts: ['Recursion', 'Objects', 'Equality'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Implement a function that deeply compares two values for structural equality, returning true only if they have the same shape and values at every nesting level.',
      input: 'a: unknown, b: unknown',
      output: 'boolean — true if a and b are deeply equal',
      constraints: ['Inputs contain only plain objects, arrays, and primitives'],
      examples: [
        { input: '{ a: 1, b: [1, 2] }, { a: 1, b: [1, 2] }', output: 'true', explanation: 'Same keys and values at every level.' },
        { input: '{ a: 1 }, { a: 2 }', output: 'false', explanation: 'Value at key "a" differs.' },
      ],
      edgeCases: [
        { case: 'Different number of keys', expected: 'Returns false' },
        { case: 'One value is null, the other an object', expected: 'Returns false' },
      ],
      functionName: 'deepEqual',
      isClassBased: false,
      sampleTests: [
        { input: [{ a: 1, b: [1, 2, 3] }, { a: 1, b: [1, 2, 3] }], expectedOutput: true, description: 'equal nested structures' },
        { input: [{ a: 1 }, { a: 2 }], expectedOutput: false, description: 'differing primitive value' },
        { input: [[1, 2, { x: 1 }], [1, 2, { x: 1 }]], expectedOutput: true, description: 'equal arrays of mixed content' },
        { input: [null, {}], expectedOutput: false, description: 'null is not deeply equal to an object' },
      ],
    },
    hints: {
      hints: [
        'Start with `a === b` — this handles identical primitives and identical references in one line.',
        'If either value is not an object, or is null, they can only be equal via `===`, which already failed.',
        'Compare `Object.keys` lengths first as a cheap rejection, then recurse on each shared key.',
      ],
    },
    solution: {
      algorithm:
        'Return true immediately on reference/primitive equality. If either side is not a non-null object, return false. Otherwise compare key counts, then recursively deep-compare every key.',
      dryRun: '{a:1,b:[1,2]} vs {a:1,b:[1,2]}\na!==b (different refs) -> both objects -> same key count (2)\nkey a: 1 deepEqual 1 -> true\nkey b: [1,2] deepEqual [1,2] -> recurse -> true\nresult: true',
      javascriptSolution: `function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(
    (key) => Object.prototype.hasOwnProperty.call(b, key) && deepEqual(a[key], b[key])
  );
}`,
      typescriptSolution: `function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(
    (key) => Object.prototype.hasOwnProperty.call(objB, key) && deepEqual(objA[key], objB[key])
  );
}`,
      timeComplexity: 'O(n) where n is the total number of properties/elements compared.',
      spaceComplexity: 'O(depth) recursion stack.',
      commonMistakes: [
        'Only comparing `keysA` against `b` without checking key count, missing extra keys in `b`.',
        'Not special-casing `null`, since `typeof null === "object"` and would otherwise pass the object check.',
        'Using `for...in` without `hasOwnProperty`, picking up inherited properties.',
      ],
      followUpQuestions: [
        'How would you handle circular references without infinite recursion?',
        'How would NaN and -0 vs 0 need special handling for a stricter equality?',
        'How does this differ from a shallow equality check used in React memoization?',
      ],
      similarQuestions: ['Same Tree', 'Symmetric Tree'],
    },
  },
  {
    detail: {
      id: 'js-coding-4',
      questionNumber: 'JSCODE-4',
      title: 'Group Array Elements By Key',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 5,
      category: 'Arrays',
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Higher-Order Functions', 'reduce'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Implement a groupBy function that groups the elements of an array into an object keyed by the result of calling keyFn on each element.',
      input: 'arr: T[], keyFn: (item: T) => string | number',
      output: 'Record<string, T[]> — object mapping each computed key to the array of items that produced it',
      constraints: ['0 <= arr.length <= 1000'],
      examples: [
        { input: "['one', 'two', 'three'], s => s.length", output: "{ '3': ['one', 'two'], '5': ['three'] }", explanation: 'Grouped by string length.' },
      ],
      edgeCases: [{ case: 'Empty array', expected: 'Returns {}' }],
      functionName: 'groupBy',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            [6.1, 4.2, 6.3],
            (n: number) => Math.floor(n),
          ],
          expectedOutput: { 6: [6.1, 6.3], 4: [4.2] },
          description: 'group floats by their floor',
        },
        {
          input: [
            ['one', 'two', 'three'],
            (s: string) => s.length,
          ],
          expectedOutput: { 3: ['one', 'two'], 5: ['three'] },
          description: 'group strings by length',
        },
        { input: [[], (x: unknown) => x], expectedOutput: {}, description: 'empty array returns empty object' },
      ],
    },
    hints: {
      hints: [
        'Use `reduce` with an accumulator object starting at `{}`.',
        'For each item, compute `keyFn(item)` and push the item into `acc[key]`, creating the array on first use.',
        'Object keys are always strings, so numeric keys like `6` and `4` still work as lookups.',
      ],
    },
    solution: {
      algorithm:
        'Reduce over the array with an object accumulator. For each item, compute its key via keyFn, initialize acc[key] to [] if missing, and push the item.',
      dryRun: "arr=[6.1,4.2,6.3], keyFn=Math.floor\n6.1 -> key 6 -> acc={6:[6.1]}\n4.2 -> key 4 -> acc={6:[6.1],4:[4.2]}\n6.3 -> key 6 -> acc={6:[6.1,6.3],4:[4.2]}",
      javascriptSolution: `function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}`,
      typescriptSolution: `function groupBy<T>(arr: T[], keyFn: (item: T) => string | number): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const key = String(keyFn(item));
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}`,
      timeComplexity: 'O(n) — one pass over the array.',
      spaceComplexity: 'O(n) for the output object and its arrays.',
      commonMistakes: [
        'Overwriting `acc[key]` with the item instead of pushing into an array.',
        'Forgetting to initialize `acc[key]` before pushing, causing a TypeError on the first item of each group.',
        'Assuming keys stay numeric — object keys coerce to strings, which usually does not matter but can surprise when key order matters.',
      ],
      followUpQuestions: [
        'How would you implement this using `Map` instead of a plain object, and why might that be preferable?',
        'How would you extend this to support grouping by multiple keys at once?',
        'How is this similar to SQL `GROUP BY`?',
      ],
      similarQuestions: ['Group Anagrams', 'Categorize Box According to Criteria'],
    },
  },
  {
    detail: {
      id: 'js-coding-5',
      questionNumber: 'JSCODE-5',
      title: 'Chunk an Array',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Arrays',
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Loops'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Split an array into chunks of a given size. The last chunk may be smaller if the array does not divide evenly.',
      input: 'arr: unknown[], size: number',
      output: 'unknown[][] — array of chunks',
      constraints: ['0 <= arr.length <= 10^4', 'size can be any integer; non-positive sizes yield an empty result'],
      examples: [{ input: '[1, 2, 3, 4, 5], 2', output: '[[1, 2], [3, 4], [5]]', explanation: 'Groups of 2, with a final partial chunk.' }],
      edgeCases: [
        { case: 'size >= arr.length', expected: 'A single chunk containing the whole array' },
        { case: 'size <= 0', expected: 'Returns []' },
      ],
      functionName: 'chunkArray',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [[1, 2], [3, 4], [5]], description: 'uneven split' },
        { input: [[1, 2, 3], 5], expectedOutput: [[1, 2, 3]], description: 'size larger than array' },
        { input: [[], 3], expectedOutput: [], description: 'empty array' },
        { input: [[1, 2, 3], 0], expectedOutput: [], description: 'non-positive size returns empty array' },
      ],
    },
    hints: {
      hints: [
        'Loop over the array with a step of `size`, slicing out each chunk.',
        '`arr.slice(i, i + size)` naturally returns a shorter final chunk when the array does not divide evenly.',
        'Guard against `size <= 0` up front to avoid an infinite loop.',
      ],
    },
    solution: {
      algorithm: 'If size is non-positive, return []. Otherwise iterate i from 0 to arr.length in steps of size, pushing arr.slice(i, i + size) each time.',
      dryRun: 'arr=[1,2,3,4,5], size=2\ni=0: slice(0,2)=[1,2]\ni=2: slice(2,4)=[3,4]\ni=4: slice(4,6)=[5]\nresult=[[1,2],[3,4],[5]]',
      javascriptSolution: `function chunkArray(arr, size) {
  if (size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}`,
      typescriptSolution: `function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}`,
      timeComplexity: 'O(n) — every element is visited exactly once across all slices.',
      spaceComplexity: 'O(n) for the output chunks.',
      commonMistakes: [
        'Off-by-one errors in the loop bound, dropping the last partial chunk.',
        'Not guarding against `size <= 0`, causing an infinite loop since `i` never advances.',
        'Mutating the input array with `splice` instead of using the non-mutating `slice`.',
      ],
      followUpQuestions: [
        'How would you chunk a `Set` or other iterable that lacks `slice`?',
        'How would you implement this as a generator to avoid building the whole result eagerly?',
        'How is this used in pagination or batching API requests?',
      ],
      similarQuestions: ['Split Array into Consecutive Subsequences', 'Divide Array Into Arrays With Max Difference'],
    },
  },
  {
    detail: {
      id: 'js-coding-6',
      questionNumber: 'JSCODE-6',
      title: 'Flatten a Nested Object',
      difficulty: 'Medium',
      companies: COMPANIES,
      frequency: 4,
      category: 'Objects',
      part: 'Advanced JS',
      concepts: ['Recursion', 'Objects', 'Dot Notation'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Flatten a nested object into a single-level object whose keys are dot-separated paths to each leaf value. Arrays are treated as leaf values, not recursed into.',
      input: 'obj: Record<string, unknown>',
      output: 'Record<string, unknown> — flattened object',
      constraints: ['Values are plain objects, arrays, or primitives'],
      examples: [{ input: "{ a: 1, b: { c: 2, d: { e: 3 } } }", output: "{ a: 1, 'b.c': 2, 'b.d.e': 3 }", explanation: 'Nested keys are joined with dots.' }],
      edgeCases: [
        { case: 'Empty object', expected: 'Returns {}' },
        { case: 'Value is an array', expected: 'Kept as-is under its key, not recursed into' },
      ],
      functionName: 'flattenObject',
      isClassBased: false,
      sampleTests: [
        { input: [{ a: 1, b: { c: 2, d: { e: 3 } } }], expectedOutput: { a: 1, 'b.c': 2, 'b.d.e': 3 }, description: 'nested three levels deep' },
        { input: [{}], expectedOutput: {}, description: 'empty object' },
        { input: [{ x: { y: 1 } }], expectedOutput: { 'x.y': 1 }, description: 'single nested key' },
        { input: [{ list: [1, 2, 3] }], expectedOutput: { list: [1, 2, 3] }, description: 'arrays are treated as leaves' },
      ],
    },
    hints: {
      hints: [
        'Recurse with an accumulated `prefix` string, defaulting to empty for the top-level call.',
        'For each key, the new key is `prefix ? prefix + "." + key : key`.',
        'Only recurse when the value is a plain object — explicitly exclude arrays so they stay intact.',
      ],
    },
    solution: {
      algorithm:
        'Walk each own key of obj. If the value is a non-null, non-array object, recursively flatten it with the accumulated dotted prefix and merge the results in; otherwise assign the value directly under the prefixed key.',
      dryRun: '{a:1,b:{c:2}}\nkey a: not object -> result.a=1\nkey b: object -> flattenObject({c:2}, "b") -> {"b.c":2} -> merge\nresult={a:1,"b.c":2}',
      javascriptSolution: `function flattenObject(obj, prefix = '') {
  const result = {};
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}`,
      typescriptSolution: `function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}`,
      timeComplexity: 'O(n) where n is the total number of leaf and intermediate keys visited.',
      spaceComplexity: 'O(n) for the flattened output plus O(depth) recursion stack.',
      commonMistakes: [
        'Recursing into arrays, which turns index positions into dotted keys unexpectedly (e.g. `list.0`).',
        'Not handling `null` specially — `typeof null === "object"` would otherwise trigger a recursive call on null.',
        'Forgetting the prefix separator logic for the top-level call, producing a leading dot like `.a`.',
      ],
      followUpQuestions: [
        'How would you write the inverse `unflattenObject` function?',
        'How would you support a custom separator instead of a hardcoded dot?',
        'Where is this pattern used in real systems (e.g. flattening config or form state)?',
      ],
      similarQuestions: ['Nested List Weight Sum', 'Design a JSON Path Query'],
    },
  },
  {
    detail: {
      id: 'js-coding-7',
      questionNumber: 'JSCODE-7',
      title: 'Array Intersection',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 4,
      category: 'Arrays',
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Set', 'Hashing'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement: 'Given two arrays, return an array of their distinct common elements, preserving the order they first appear in the first array.',
      input: 'arr1: unknown[], arr2: unknown[]',
      output: 'unknown[] — distinct values present in both arrays',
      constraints: ['0 <= arr1.length, arr2.length <= 10^4'],
      examples: [{ input: '[1, 2, 2, 3], [2, 3, 4]', output: '[2, 3]', explanation: '2 and 3 appear in both; duplicates are collapsed.' }],
      edgeCases: [
        { case: 'No overlap', expected: 'Returns []' },
        { case: 'One array is empty', expected: 'Returns []' },
      ],
      functionName: 'arrayIntersection',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 2, 3], [2, 3, 4]], expectedOutput: [2, 3], description: 'overlap with a duplicate in arr1' },
        { input: [[1, 2], [3, 4]], expectedOutput: [], description: 'no overlap' },
        { input: [[], [1, 2]], expectedOutput: [], description: 'first array empty' },
        { input: [[1, 1, 1], [1]], expectedOutput: [1], description: 'result contains no duplicates' },
      ],
    },
    hints: {
      hints: [
        'Build a `Set` from arr2 for O(1) membership checks.',
        'Walk arr1 once, keeping a second `Set` of values already added to the result to dedupe.',
        'Only push a value from arr1 if it is in the arr2 set and has not already been pushed.',
      ],
    },
    solution: {
      algorithm: 'Build a Set from arr2. Iterate arr1; for each value present in that set and not yet seen, push it to the result and mark it seen.',
      dryRun: 'arr1=[1,2,2,3], arr2=[2,3,4] -> set2={2,3,4}\n1: not in set2, skip\n2: in set2, not seen -> push, seen={2}\n2: in set2, already seen -> skip\n3: in set2, not seen -> push, seen={2,3}\nresult=[2,3]',
      javascriptSolution: `function arrayIntersection(arr1, arr2) {
  const set2 = new Set(arr2);
  const seen = new Set();
  const result = [];
  for (const item of arr1) {
    if (set2.has(item) && !seen.has(item)) {
      result.push(item);
      seen.add(item);
    }
  }
  return result;
}`,
      typescriptSolution: `function arrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  const seen = new Set<T>();
  const result: T[] = [];
  for (const item of arr1) {
    if (set2.has(item) && !seen.has(item)) {
      result.push(item);
      seen.add(item);
    }
  }
  return result;
}`,
      timeComplexity: 'O(n + m) where n and m are the lengths of arr1 and arr2.',
      spaceComplexity: 'O(n + m) for the two sets and the result array.',
      commonMistakes: [
        'Using `arr1.filter(x => arr2.includes(x))`, which is correct but O(n*m) and also does not dedupe.',
        'Forgetting to dedupe the result when arr1 has repeated values.',
        'Using object keys instead of a `Set`, which coerces all values to strings and breaks for non-string primitives.',
      ],
      followUpQuestions: [
        'How would this change if the arrays were sorted?',
        'How would you compute the intersection of more than two arrays?',
        'What if the arrays were too large to fit in memory at once?',
      ],
      similarQuestions: ['Intersection of Two Arrays', 'Intersection of Two Arrays II'],
    },
  },
  {
    detail: {
      id: 'js-coding-8',
      questionNumber: 'JSCODE-8',
      title: 'Unique By Computed Key',
      difficulty: 'Easy',
      companies: COMPANIES,
      frequency: 3,
      category: 'Arrays',
      part: 'JS Fundamentals',
      concepts: ['Arrays', 'Set', 'Deduplication'],
      solved: false,
      attempted: false,
      bookmarked: false,
      questionType: 'coding',
      problemStatement:
        'Given an array and a keyFn, return a new array containing only the first item seen for each distinct key produced by keyFn.',
      input: 'arr: T[], keyFn: (item: T) => unknown',
      output: 'T[] — items with distinct computed keys, in original order, first occurrence kept',
      constraints: ['0 <= arr.length <= 10^4'],
      examples: [{ input: "[{id:1},{id:2},{id:1}], x => x.id", output: '[{id:1},{id:2}]', explanation: 'The second {id:1} is dropped as a duplicate key.' }],
      edgeCases: [{ case: 'Empty array', expected: 'Returns []' }],
      functionName: 'uniqueBy',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            [{ id: 1 }, { id: 2 }, { id: 1 }],
            (x: { id: number }) => x.id,
          ],
          expectedOutput: [{ id: 1 }, { id: 2 }],
          description: 'dedupe objects by id, keep first occurrence',
        },
        {
          input: [
            [1.2, 1.9, 2.5],
            (n: number) => Math.floor(n),
          ],
          expectedOutput: [1.2, 2.5],
          description: 'dedupe numbers by their floor',
        },
        { input: [[], (x: unknown) => x], expectedOutput: [], description: 'empty array' },
      ],
    },
    hints: {
      hints: [
        'Keep a `Set` of keys already seen while iterating in order.',
        'Compute `keyFn(item)` for the current item; if its key is new, keep the item and record the key.',
        'Order of the result must match the first-occurrence order in the input, so a single left-to-right pass with a `Set` is enough.',
      ],
    },
    solution: {
      algorithm: 'Iterate the array once, tracking seen keys in a Set. Push each item whose computed key has not been seen yet, then mark that key seen.',
      dryRun: '[{id:1},{id:2},{id:1}], keyFn=x=>x.id\n{id:1}: key 1 not seen -> keep, seen={1}\n{id:2}: key 2 not seen -> keep, seen={1,2}\n{id:1}: key 1 seen -> skip\nresult=[{id:1},{id:2}]',
      javascriptSolution: `function uniqueBy(arr, keyFn) {
  const seen = new Set();
  const result = [];
  for (const item of arr) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}`,
      typescriptSolution: `function uniqueBy<T>(arr: T[], keyFn: (item: T) => unknown): T[] {
  const seen = new Set<unknown>();
  const result: T[] = [];
  for (const item of arr) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}`,
      timeComplexity: 'O(n) — one pass, O(1) average Set operations.',
      spaceComplexity: 'O(n) for the seen set and result array.',
      commonMistakes: [
        'Deduping on the item itself (by reference) instead of the computed key, which never collapses structurally-equal-but-distinct objects.',
        'Keeping the last occurrence instead of the first by overwriting instead of skipping.',
        'Recomputing `keyFn(item)` multiple times per item instead of storing it once.',
      ],
      followUpQuestions: [
        'How would you keep the last occurrence instead of the first?',
        'How does this compare to `Array.from(new Map(arr.map(x => [keyFn(x), x])).values())`?',
        'How would you make this stable for objects when keyFn returns another object (not directly Set-comparable)?',
      ],
      similarQuestions: ['Remove Duplicates from Sorted Array', 'Unique Email Addresses'],
    },
  },
];
