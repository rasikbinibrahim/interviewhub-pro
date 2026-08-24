// Hand-authored coding questions derived from
// frontend/src/document/DSA_Master_Handbook_Senior_Frontend_Engineers.md
// (Module 9 — Heap). Unlike the auto-generated MockTechnicalQuestion
// files, these are real CodingQuestionDetail problems: every sampleTests
// entry has been checked against the reference solution below (run
// against a real Node process, not just read), and both the JavaScript
// and TypeScript solutions are genuine, working code.
//
// The source notes for this module were written in Python (using
// heapq). All four problems here are ported to JavaScript/TypeScript,
// including hand-rolled binary heap implementations, since JS has no
// built-in heap.
//
// Find Median from Data Stream is a stateful "design" problem: the
// runner (codeRunner.ts) only supports calling a single plain function
// by name with positional args, so classes with multiple methods can't
// be tested directly. It's wrapped as `medianFinderOperations(operations,
// args)`, the same convention used by Min Stack in
// dsa-coding-module6-questions.ts — one function that replays a sequence
// of operations against an internal instance and returns the array of
// results (null for void operations like addNum).

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

const CATEGORY = 'Heap';
const CONCEPTS = ['Heap', 'Priority Queue', 'Time Complexity', 'Space Complexity', 'Pattern Recognition'];

export const MOCK_DSA_CODING_MODULE9_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m9-1',
      questionNumber: 'DSACODE-M9-1',
      title: 'Kth Largest Element in an Array',
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
        'Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array (the kth largest in sorted order, not the kth distinct element).',
      input: 'nums: number[], k: number',
      output: 'number — the kth largest element of nums',
      constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
      examples: [
        { input: 'nums = [3, 2, 1, 5, 6, 4], k = 2', output: '5', explanation: 'Sorted descending: [6, 5, 4, 3, 2, 1] — the 2nd largest is 5.' },
        { input: 'nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4', output: '4', explanation: 'Sorted descending: [6, 5, 5, 4, 3, 3, 2, 2, 1] — the 4th largest is 4 (duplicates count individually).' },
        { input: 'nums = [1], k = 1', output: '1', explanation: 'A single-element array\'s only element is trivially the 1st largest.' },
      ],
      edgeCases: [
        { case: 'k === nums.length', expected: 'Returns the minimum element' },
        { case: 'Array contains duplicate values', expected: 'Duplicates are counted individually, not deduplicated' },
        { case: 'k === 1', expected: 'Returns the maximum element' },
      ],
      functionName: 'findKthLargest',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 2, 1, 5, 6, 4], 2], expectedOutput: 5, description: 'classic mixed case' },
        { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expectedOutput: 4, description: 'array with duplicates' },
        { input: [[1], 1], expectedOutput: 1, description: 'single element' },
        { input: [[7, 6, 5, 4, 3, 2, 1], 1], expectedOutput: 7, description: 'k=1 returns the maximum' },
      ],
    },
    hints: {
      hints: [
        'Sorting the whole array works (O(n log n)) but a min-heap of size k gets you O(n log k), which is faster when k is much smaller than n.',
        'Keep a min-heap holding only the k largest values seen so far — whenever a new value beats the heap\'s smallest member, swap it in.',
        'Once every element has been processed, the smallest value remaining in the size-k heap is exactly the kth largest overall.',
      ],
    },
    solution: {
      algorithm: `
Step 1: We only need the k largest values, not the whole sorted array.
Step 2: Keep those k values in a min-heap, so the smallest of the k is always at the root.
Step 3: Add values until the heap has k items; afterwards replace the root only when a larger value arrives.
Step 4: The root at the end is the kth largest value.

Core idea from source:
Maintain a min-heap capped at size k. For each number: if the heap has fewer than k elements, push it in; otherwise, if the number is greater than the heap\\\'s minimum (its root), replace the root with it and sift down. After processing every element, the heap\\\'s root is the kth largest value, because the heap always holds exactly the k largest values seen so far, with the smallest of those k sitting at the root.`,
      dryRun: `
nums=[3,2,1,5,6,4], k=2
heap=[].
3 → [3]
2 → [2,3]
1 → discard because 1 <= 2
5 → replace root 2 → [3,5]
6 → replace root 3 → [5,6]
4 → discard because 4 <= 5
Root = 5 → 2nd largest.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findKthLargest(nums, k) {
    const heap = [];
    function siftUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (heap[parent] <= heap[index]) {
                break;
            }
            const temp = heap[parent];
            heap[parent] = heap[index];
            heap[index] = temp;
            index = parent;
        }
    }
    function siftDown(index) {
        while (true) {
            let smallest = index;
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            if (left < heap.length &&
                heap[left] < heap[smallest]) {
                smallest = left;
            }
            if (right < heap.length &&
                heap[right] < heap[smallest]) {
                smallest = right;
            }
            if (smallest === index) {
                break;
            }
            const temp = heap[index];
            heap[index] = heap[smallest];
            heap[smallest] = temp;
            index = smallest;
        }
    }
    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        if (heap.length < k) {
            heap.push(value);
            siftUp(heap.length - 1);
        }
        else if (value > heap[0]) {
            heap[0] = value;
            siftDown(0);
        }
    }
    return heap[0];
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function findKthLargestUsingBuiltIns(nums, k) {
    return [...nums].sort((a, b) => b - a)[k - 1];
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function findKthLargest(nums: number[], k: number): number {
  const heap: number[] = [];

  function siftUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (heap[parent]! <= heap[index]!) {
        break;
      }

      const temp = heap[parent]!;
      heap[parent] = heap[index]!;
      heap[index] = temp;
      index = parent;
    }
  }

  function siftDown(index: number): void {
    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (
        left < heap.length &&
        heap[left]! < heap[smallest]!
      ) {
        smallest = left;
      }

      if (
        right < heap.length &&
        heap[right]! < heap[smallest]!
      ) {
        smallest = right;
      }

      if (smallest === index) {
        break;
      }

      const temp = heap[index]!;
      heap[index] = heap[smallest]!;
      heap[smallest] = temp;
      index = smallest;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]!;

    if (heap.length < k) {
      heap.push(value);
      siftUp(heap.length - 1);
    } else if (value > heap[0]!) {
      heap[0] = value;
      siftDown(0);
    }
  }

  return heap[0]!;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function findKthLargestUsingBuiltIns(
  nums: number[],
  k: number,
): number {
  return [...nums].sort((a, b) => b - a)[k - 1]!;
}`,
      timeComplexity: 'O(n log k) — each of the n elements does at most one O(log k) heap operation.',
      spaceComplexity: 'O(k) — the heap never grows beyond size k.',
      commonMistakes: [
        'Building a max-heap of the full array and popping k times — correct, but O(n + k log n), strictly worse than a size-k min-heap when k is small.',
        'Sorting descending and indexing k-1 — correct and simple (O(n log n)), but misses the point of the heap-based technique this problem is meant to teach.',
        'Confusing "kth largest" with "kth distinct largest" — duplicates must be counted individually (e.g. [1,1,1,2], k=2 → 1, not 2).',
      ],
      followUpQuestions: [
        'How would this change if `findKthLargest` needed to support a continuous stream of incoming numbers (kth largest at any point in time)?',
        'How would you solve this in O(n) average time using quickselect instead of a heap?',
        'How would you find the kth largest in a union of multiple already-sorted arrays without merging them first?',
      ],
      similarQuestions: ['Kth Smallest Element in a Sorted Matrix', 'Top K Frequent Elements', 'Find Median from Data Stream'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m9-2',
      questionNumber: 'DSACODE-M9-2',
      title: 'Find Median from Data Stream',
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
        'Design a data structure that supports adding integers from a stream one at a time and finding the median of all elements added so far. Because this app\'s test runner calls a single function by name, implement it as `medianFinderOperations(operations, args)`: `operations` is an array of operation names ("addNum" | "findMedian"), `args` is a parallel array of argument arrays for each operation, and the function returns an array of results (null for addNum).',
      input: 'operations: string[] — operation names, args: unknown[][] — one argument array per operation',
      output: 'unknown[] — one result per operation, in order (null for addNum)',
      constraints: ['1 <= operations.length <= 5 * 10^4', '-10^5 <= value <= 10^5', 'findMedian is never called before at least one addNum'],
      examples: [
        {
          input: 'operations = ["addNum","addNum","findMedian","addNum","findMedian"], args = [[1],[2],[],[3],[]]',
          output: '[null, null, 1.5, null, 2]',
          explanation: 'After [1,2] the median is (1+2)/2=1.5; after [1,2,3] the median is 2.',
        },
      ],
      edgeCases: [
        { case: 'Only one number added so far', expected: 'The median is that single number' },
        { case: 'Even count of numbers', expected: 'Median is the average of the two middle values' },
        { case: 'Numbers added out of sorted order', expected: 'The median is still computed correctly regardless of insertion order' },
      ],
      functionName: 'medianFinderOperations',
      isClassBased: false,
      sampleTests: [
        {
          input: [
            ['addNum', 'addNum', 'findMedian', 'addNum', 'findMedian'],
            [[1], [2], [], [3], []],
          ],
          expectedOutput: [null, null, 1.5, null, 2],
          description: 'the canonical LeetCode Find Median from Data Stream example',
        },
        {
          input: [
            ['addNum', 'findMedian'],
            [[5], []],
          ],
          expectedOutput: [null, 5],
          description: 'single element',
        },
        {
          input: [
            ['addNum', 'addNum', 'addNum', 'addNum', 'findMedian'],
            [[6], [10], [2], [4], []],
          ],
          expectedOutput: [null, null, null, null, 5],
          description: 'numbers added out of sorted order',
        },
      ],
    },
    hints: {
      hints: [
        'Keep the stream split into two halves: a "lower half" containing the smaller numbers and an "upper half" containing the larger ones.',
        'If the lower half is a max-heap and the upper half is a min-heap, the median is always accessible from the tops of the two heaps in O(1) — no full sort needed.',
        'After every insertion, rebalance so the two heaps differ in size by at most one — that invariant is what makes reading the median O(1).',
      ],
    },
    solution: {
      algorithm: `
Step 1: Split all numbers into a lower half and an upper half.
Step 2: Keep the lower half in a max-heap and the upper half in a min-heap.
Step 3: Rebalance after every insertion so their sizes differ by at most one and every lower value <= every upper value.
Step 4: Read the median directly from one heap root or the average of both roots.

Core idea from source:
Maintain two heaps: \`lo\`, a max-heap holding the smaller half of the numbers, and \`hi\`, a min-heap holding the larger half. On addNum: push into \`lo\`, then move \`lo\`\\\'s new maximum into \`hi\` (this guarantees every value in \`lo\` is <= every value in \`hi\`), then if \`hi\` has grown larger than \`lo\`, move \`hi\`\\\'s minimum back into \`lo\`. This keeps \`lo\`\\\'s size equal to or exactly one more than \`hi\`\\\'s size. On findMedian: if \`lo\` has more elements, its top is the median; otherwise the median is the average of both heaps\\\' tops.`,
      dryRun: `
addNum(1)
lower=[1], upper=[]

addNum(2)
push 2 into lower → [2,1]
move 2 to upper → lower=[1], upper=[2]
sizes equal → median=(1+2)/2=1.5

addNum(3)
lower gets 3 → largest lower=3
move 3 to upper → upper=[2,3]
upper is bigger → move 2 back to lower
lower=[2,1], upper=[3]
lower is bigger → median=2.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function medianFinderOperations(operations, args) {
    class Heap {
        constructor(isMinHeap) {
            this.data = [];
            this.isMinHeap = isMinHeap;
        }
        size() {
            return this.data.length;
        }
        peek() {
            return this.data[0];
        }
        before(a, b) {
            return this.isMinHeap ? a < b : a > b;
        }
        push(value) {
            this.data.push(value);
            let index = this.data.length - 1;
            while (index > 0) {
                const parent = Math.floor((index - 1) / 2);
                if (!this.before(this.data[index], this.data[parent])) {
                    break;
                }
                const temp = this.data[index];
                this.data[index] = this.data[parent];
                this.data[parent] = temp;
                index = parent;
            }
        }
        pop() {
            const root = this.data[0];
            const last = this.data.pop();
            if (this.data.length === 0) {
                return root;
            }
            this.data[0] = last;
            let index = 0;
            while (true) {
                let best = index;
                const left = index * 2 + 1;
                const right = index * 2 + 2;
                if (left < this.data.length &&
                    this.before(this.data[left], this.data[best])) {
                    best = left;
                }
                if (right < this.data.length &&
                    this.before(this.data[right], this.data[best])) {
                    best = right;
                }
                if (best === index) {
                    break;
                }
                const temp = this.data[index];
                this.data[index] = this.data[best];
                this.data[best] = temp;
                index = best;
            }
            return root;
        }
    }
    const lower = new Heap(false); // max-heap
    const upper = new Heap(true); // min-heap
    const results = [];
    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const operationArgs = args[i];
        if (operation === "addNum") {
            const value = operationArgs[0];
            lower.push(value);
            // Move the largest lower-half value to the upper half.
            upper.push(lower.pop());
            // Keep lower the same size as upper or one larger.
            if (upper.size() > lower.size()) {
                lower.push(upper.pop());
            }
            results.push(null);
            continue;
        }
        if (operation === "findMedian") {
            if (lower.size() > upper.size()) {
                results.push(lower.peek());
            }
            else {
                results.push((lower.peek() + upper.peek()) / 2);
            }
        }
    }
    return results;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function medianFinderOperationsUsingBuiltIns(operations, args) {
    const values = [];
    const results = [];
    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const operationArgs = args[i];
        if (operation === "addNum") {
            values.push(operationArgs[0]);
            values.sort((a, b) => a - b);
            results.push(null);
        }
        else if (operation === "findMedian") {
            const middle = Math.floor(values.length / 2);
            if (values.length % 2 === 1) {
                results.push(values[middle]);
            }
            else {
                results.push((values[middle - 1] + values[middle]) / 2);
            }
        }
    }
    return results;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function medianFinderOperations(
  operations: readonly string[],
  args: readonly unknown[][],
): unknown[] {
  class Heap {
    private data: number[] = [];
    private readonly isMinHeap: boolean;

    constructor(isMinHeap: boolean) {
      this.isMinHeap = isMinHeap;
    }

    size(): number {
      return this.data.length;
    }

    peek(): number {
      return this.data[0]!;
    }

    private before(a: number, b: number): boolean {
      return this.isMinHeap ? a < b : a > b;
    }

    push(value: number): void {
      this.data.push(value);

      let index = this.data.length - 1;

      while (index > 0) {
        const parent = Math.floor((index - 1) / 2);

        if (!this.before(this.data[index]!, this.data[parent]!)) {
          break;
        }

        const temp = this.data[index]!;
        this.data[index] = this.data[parent]!;
        this.data[parent] = temp;
        index = parent;
      }
    }

    pop(): number {
      const root = this.data[0]!;
      const last = this.data.pop()!;

      if (this.data.length === 0) {
        return root;
      }

      this.data[0] = last;

      let index = 0;

      while (true) {
        let best = index;
        const left = index * 2 + 1;
        const right = index * 2 + 2;

        if (
          left < this.data.length &&
          this.before(this.data[left]!, this.data[best]!)
        ) {
          best = left;
        }

        if (
          right < this.data.length &&
          this.before(this.data[right]!, this.data[best]!)
        ) {
          best = right;
        }

        if (best === index) {
          break;
        }

        const temp = this.data[index]!;
        this.data[index] = this.data[best]!;
        this.data[best] = temp;
        index = best;
      }

      return root;
    }
  }

  const lower = new Heap(false); // max-heap
  const upper = new Heap(true);  // min-heap
  const results: unknown[] = [];

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    const operationArgs = args[i]!;

    if (operation === "addNum") {
      const value = operationArgs[0] as number;

      lower.push(value);

      // Move the largest lower-half value to the upper half.
      upper.push(lower.pop());

      // Keep lower the same size as upper or one larger.
      if (upper.size() > lower.size()) {
        lower.push(upper.pop());
      }

      results.push(null);
      continue;
    }

    if (operation === "findMedian") {
      if (lower.size() > upper.size()) {
        results.push(lower.peek());
      } else {
        results.push((lower.peek() + upper.peek()) / 2);
      }
    }
  }

  return results;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function medianFinderOperationsUsingBuiltIns(
  operations: readonly string[],
  args: readonly unknown[][],
): unknown[] {
  const values: number[] = [];
  const results: unknown[] = [];

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    const operationArgs = args[i]!;

    if (operation === "addNum") {
      values.push(operationArgs[0] as number);
      values.sort((a, b) => a - b);
      results.push(null);
    } else if (operation === "findMedian") {
      const middle = Math.floor(values.length / 2);

      if (values.length % 2 === 1) {
        results.push(values[middle]!);
      } else {
        results.push((values[middle - 1]! + values[middle]!) / 2);
      }
    }
  }

  return results;
}`,
      timeComplexity: 'O(log n) per addNum (heap push/pop), O(1) per findMedian.',
      spaceComplexity: 'O(n) — every added number lives in exactly one of the two heaps.',
      commonMistakes: [
        'Re-sorting the entire collection on every findMedian call — correct but O(n log n) per query instead of O(1).',
        'Letting the two heaps drift more than one element apart in size, which breaks the O(1) median read (the median is only guaranteed correct when the size invariant is maintained after every insertion).',
        'Forgetting that `lo` must always be able to hold the "extra" element when the total count is odd — the rebalancing direction matters (push into `lo` first, then balance into `hi`, then back if needed).',
      ],
      followUpQuestions: [
        'How would this change if all incoming numbers were known to be in the range [0, 100]? (bucket/counting approach)',
        'How would you support removing a number from the stream, not just adding?',
        'How would you find not just the median but any arbitrary percentile efficiently?',
      ],
      similarQuestions: ['Sliding Window Median', 'Kth Largest Element in an Array', 'Find Median from Two Sorted Arrays'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m9-3',
      questionNumber: 'DSACODE-M9-3',
      title: 'Sliding Window Maximum',
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
        'Given an array `nums` and a sliding window of size `k` moving from the very left to the very right, one position at a time, return an array of the maximum value in the window at each position.',
      input: 'nums: number[], k: number',
      output: 'number[] — the maximum of each k-sized window, in order',
      constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
      examples: [
        { input: 'nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3', output: '[3, 3, 5, 5, 6, 7]', explanation: 'Each window of 3 consecutive elements, its maximum tracked as the window slides right.' },
        { input: 'nums = [9, 11], k = 2', output: '[11]', explanation: 'A single window covering the whole 2-element array.' },
        { input: 'nums = [4, -2], k = 2', output: '[4]', explanation: '4 is larger than -2, so it is the window maximum.' },
      ],
      edgeCases: [
        { case: 'k === nums.length', expected: 'A single output equal to the maximum of the whole array' },
        { case: 'k === 1', expected: 'The output equals the input array unchanged' },
        { case: 'Strictly decreasing values within a window', expected: 'The window maximum is always the leftmost (oldest) value until it slides out' },
      ],
      functionName: 'maxSlidingWindow',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expectedOutput: [3, 3, 5, 5, 6, 7], description: 'classic mixed-sign case' },
        { input: [[1], 1], expectedOutput: [1], description: 'single element, k=1' },
        { input: [[9, 11], 2], expectedOutput: [11], description: 'k equals array length' },
        { input: [[4, -2], 2], expectedOutput: [4], description: 'small two-element window' },
      ],
    },
    hints: {
      hints: [
        "A brute-force scan of every window is O(n*k) — think about what information can be reused between consecutive windows instead of rescanning.",
        'Maintain a deque of indices where the corresponding values are in strictly decreasing order from front to back — the front is always the current window\'s maximum.',
        'Before adding a new index, pop any indices from the back whose values are smaller (they can never be the max again with a bigger, more-recent value beside them); also drop the front index once it slides outside the window.',
      ],
    },
    solution: {
      algorithm: `
Step 1: Store indices in a deque whose values decrease from front to back.
Step 2: Remove indices that have left the current window.
Step 3: Remove smaller values from the back because a newer larger value makes them useless.
Step 4: The front index is always the maximum for the current window.

Core idea from source:
Maintain a deque of indices with values in decreasing order from front to back. For each index i: first evict the front of the deque if it has slid out of the current window (index <= i - k); then pop from the back while the value at the back is smaller than nums[i] (those values can never be a future maximum, since nums[i] is both larger and more recent); push i onto the back. Once the window is fully formed (i >= k - 1), the front of the deque is the window\\\'s maximum.`,
      dryRun: `
nums=[1,3,-1,-3,5,3,6,7], k=3
Window [1,3,-1] → 3
Window [3,-1,-3] → 3
Window [-1,-3,5] → 5
Window [-3,5,3] → 5
Window [5,3,6] → 6
Window [3,6,7] → 7
Result=[3,3,5,5,6,7].

The deque always keeps candidate indices from largest value to smallest.`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function maxSlidingWindow(nums, k) {
    const deque = [];
    let front = 0;
    const result = [];
    for (let right = 0; right < nums.length; right++) {
        // Remove indices outside the current window.
        while (front < deque.length &&
            deque[front] <= right - k) {
            front++;
        }
        // Remove smaller values from the back.
        while (deque.length > front &&
            nums[deque[deque.length - 1]] <= nums[right]) {
            deque.pop();
        }
        deque.push(right);
        if (right >= k - 1) {
            result.push(nums[deque[front]]);
        }
        // Compact occasionally so the array does not grow forever.
        if (front > 64 && front * 2 > deque.length) {
            const compact = [];
            for (let i = front; i < deque.length; i++) {
                compact.push(deque[i]);
            }
            deque.length = 0;
            for (let i = 0; i < compact.length; i++) {
                deque.push(compact[i]);
            }
            front = 0;
        }
    }
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function maxSlidingWindowUsingBuiltIns(nums, k) {
    const result = [];
    for (let left = 0; left <= nums.length - k; left++) {
        const window = nums.slice(left, left + k);
        result.push(Math.max(...window));
    }
    return result;
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [];
  let front = 0;
  const result: number[] = [];

  for (let right = 0; right < nums.length; right++) {
    // Remove indices outside the current window.
    while (
      front < deque.length &&
      deque[front]! <= right - k
    ) {
      front++;
    }

    // Remove smaller values from the back.
    while (
      deque.length > front &&
      nums[deque[deque.length - 1]!]! <= nums[right]!
    ) {
      deque.pop();
    }

    deque.push(right);

    if (right >= k - 1) {
      result.push(nums[deque[front]!]!);
    }

    // Compact occasionally so the array does not grow forever.
    if (front > 64 && front * 2 > deque.length) {
      const compact: number[] = [];

      for (let i = front; i < deque.length; i++) {
        compact.push(deque[i]!);
      }

      deque.length = 0;
      for (let i = 0; i < compact.length; i++) {
        deque.push(compact[i]!);
      }

      front = 0;
    }
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function maxSlidingWindowUsingBuiltIns(
  nums: number[],
  k: number,
): number[] {
  const result: number[] = [];

  for (let left = 0; left <= nums.length - k; left++) {
    const window = nums.slice(left, left + k);
    result.push(Math.max(...window));
  }

  return result;
}`,
      timeComplexity: 'O(n) — each index is pushed and popped from the deque at most once, despite the nested-looking loops.',
      spaceComplexity: 'O(k) — the deque never holds more than k indices at once.',
      commonMistakes: [
        'Using a heap with lazy deletion instead of a monotonic deque — it works (O(n log k)) but is strictly more complex and slower than the O(n) deque approach for this specific problem.',
        'Forgetting to evict the front of the deque once its index falls outside the current window, which can return a stale maximum that is no longer actually in range.',
        'Storing values instead of indices in the deque, losing the ability to detect when the window has slid past the maximum.',
      ],
      followUpQuestions: [
        'How would you also track the *minimum* of each window at the same time?',
        'How would you solve "Sliding Window Median" using a similar windowing idea?',
        'How would this change for a window that can grow and shrink dynamically, rather than always being a fixed size k?',
      ],
      similarQuestions: ['Sliding Window Median', 'Shortest Subarray with Sum at Least K', 'Constrained Subsequence Sum'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m9-4',
      questionNumber: 'DSACODE-M9-4',
      title: 'Top K Frequent Elements',
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
        'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements, ordered from most frequent to least frequent. Elements with equal frequency are ordered by the position of their first occurrence in `nums`.',
      input: 'nums: number[], k: number',
      output: 'number[] — the k most frequent elements, most frequent first',
      constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is always valid: 1 <= k <= number of distinct elements'],
      examples: [
        { input: 'nums = [1, 1, 1, 2, 2, 3], k = 2', output: '[1, 2]', explanation: '1 appears 3 times, 2 appears twice, 3 appears once — the top 2 are 1 and 2.' },
        { input: 'nums = [1], k = 1', output: '[1]', explanation: 'Only one distinct element, trivially the most frequent.' },
        { input: 'nums = [5, 5, 6, 6, 7, 7], k = 3', output: '[5, 6, 7]', explanation: 'All three elements tie at frequency 2, ordered by first occurrence.' },
      ],
      edgeCases: [
        { case: 'k equals the number of distinct elements', expected: 'Returns every distinct element, ordered by frequency' },
        { case: 'All elements have equal frequency', expected: 'Ordered by first occurrence in nums' },
        { case: 'Single distinct element repeated many times', expected: 'Returns that one element' },
      ],
      functionName: 'topKFrequent',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 1, 1, 2, 2, 3], 2], expectedOutput: [1, 2], description: 'classic frequency ranking' },
        { input: [[1], 1], expectedOutput: [1], description: 'single distinct element' },
        { input: [[4, 4, 4, 6, 6, 7], 1], expectedOutput: [4], description: 'clear single winner' },
        { input: [[5, 5, 6, 6, 7, 7], 3], expectedOutput: [5, 6, 7], description: 'tied frequencies broken by first-occurrence order' },
      ],
    },
    hints: {
      hints: [
        'Count each element\'s frequency first with a hash map — that reduces the problem to "top k by a bounded integer key".',
        'Since frequency can never exceed nums.length, bucket sort works: an array of buckets indexed by frequency, each holding the elements with that exact frequency.',
        'Read the buckets from the highest possible frequency down to 1, collecting elements until you have k of them — no comparison-based sort is needed at all.',
      ],
    },
    solution: {
      algorithm: `
Step 1: Count each value and remember its first occurrence.
Step 2: Put values into buckets indexed by frequency.
Step 3: Scan buckets from highest frequency to lowest.
Step 4: For tied frequencies, keep first-occurrence order and stop after k values.

Core idea from source:
Count the frequency of every element with a hash map. Create an array of \`nums.length + 1\` buckets, where \`buckets[f]\` holds every element whose frequency is exactly f. Walk the buckets from the highest index down to 0, collecting elements into the result until it has k elements. Because bucket index directly encodes frequency, no sorting comparison is ever needed, giving O(n) overall.`,
      dryRun: `
nums=[1,1,1,2,2,3], k=2
Frequency: 1→3, 2→2, 3→1.
Bucket 3: [1]
Bucket 2: [2]
Bucket 1: [3]
Read from high frequency to low → 1, then 2.
Result=[1,2].

For [5,5,6,6,7,7], all frequencies tie at 2, so first occurrence gives [5,6,7].`,
      javascriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function topKFrequent(nums, k) {
    const frequency = Object.create(null);
    const firstIndex = Object.create(null);
    for (let i = 0; i < nums.length; i++) {
        const key = String(nums[i]);
        if (frequency[key] === undefined) {
            frequency[key] = 0;
            firstIndex[key] = i;
        }
        frequency[key]++;
    }
    const buckets = new Array(nums.length + 1);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }
    const seenValues = [];
    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        let alreadySeen = false;
        for (let j = 0; j < seenValues.length; j++) {
            if (seenValues[j] === value) {
                alreadySeen = true;
                break;
            }
        }
        if (!alreadySeen) {
            seenValues.push(value);
        }
    }
    for (let i = 0; i < seenValues.length; i++) {
        const value = seenValues[i];
        buckets[frequency[String(value)]].push(value);
    }
    const result = [];
    for (let freq = buckets.length - 1; freq >= 1 && result.length < k; freq--) {
        const bucket = buckets[freq];
        // Bucket order follows first occurrence because seenValues does.
        for (let i = 0; i < bucket.length; i++) {
            result.push(bucket[i]);
            if (result.length === k) {
                break;
            }
        }
    }
    return result;
}
/* ==================== WITH BUILT-IN HELPERS ==================== */
function topKFrequentUsingBuiltIns(nums, k) {
    const count = new Map();
    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        const current = count.get(value);
        if (current) {
            current.frequency++;
        }
        else {
            count.set(value, { frequency: 1, first: i });
        }
    }
    return [...count.entries()]
        .sort((a, b) => b[1].frequency - a[1].frequency ||
        a[1].first - b[1].first)
        .slice(0, k)
        .map(([value]) => value);
}`,
      typescriptSolution: `/* ==================== WITHOUT BUILT-IN / CORE ==================== */
function topKFrequent(nums: number[], k: number): number[] {
  const frequency: Record<string, number> = Object.create(null);
  const firstIndex: Record<string, number> = Object.create(null);

  for (let i = 0; i < nums.length; i++) {
    const key = String(nums[i]!);

    if (frequency[key] === undefined) {
      frequency[key] = 0;
      firstIndex[key] = i;
    }

    frequency[key]++;
  }

  const buckets: number[][] = new Array(nums.length + 1);

  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  const seenValues: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]!;
    let alreadySeen = false;

    for (let j = 0; j < seenValues.length; j++) {
      if (seenValues[j] === value) {
        alreadySeen = true;
        break;
      }
    }

    if (!alreadySeen) {
      seenValues.push(value);
    }
  }

  for (let i = 0; i < seenValues.length; i++) {
    const value = seenValues[i]!;
    buckets[frequency[String(value)]!]!.push(value);
  }

  const result: number[] = [];

  for (
    let freq = buckets.length - 1;
    freq >= 1 && result.length < k;
    freq--
  ) {
    const bucket = buckets[freq]!;

    // Bucket order follows first occurrence because seenValues does.
    for (let i = 0; i < bucket.length; i++) {
      result.push(bucket[i]!);

      if (result.length === k) {
        break;
      }
    }
  }

  return result;
}

/* ==================== WITH BUILT-IN HELPERS ==================== */
function topKFrequentUsingBuiltIns(
  nums: number[],
  k: number,
): number[] {
  const count = new Map<number, { frequency: number; first: number }>();

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i]!;
    const current = count.get(value);

    if (current) {
      current.frequency++;
    } else {
      count.set(value, { frequency: 1, first: i });
    }
  }

  return [...count.entries()]
    .sort(
      (a, b) =>
        b[1].frequency - a[1].frequency ||
        a[1].first - b[1].first,
    )
    .slice(0, k)
    .map(([value]) => value);
}`,
      timeComplexity: 'O(n) — counting is O(n), bucketing is O(n distinct values), and the bucket walk visits at most n + 1 buckets and n elements total.',
      spaceComplexity: 'O(n) — the frequency map and the buckets together hold every distinct element once.',
      commonMistakes: [
        'Sorting all distinct elements by frequency (O(n log n)) instead of bucket sort (O(n)) — correct, but misses the point of the bucket technique this problem is meant to teach.',
        'Using a heap of size k for a slight O(n log k) win — also valid, but bucket sort is strictly simpler and faster here because frequency is a bounded integer, not an arbitrary comparable value.',
        'Forgetting the `Array.from({ length }, () => [])` pattern and instead using `.fill([])`, which would make every bucket reference the *same* array.',
      ],
      followUpQuestions: [
        'How would you solve this if `nums` were a continuous stream and you needed the top k at any point in time?',
        'How would this change for "top k frequent words" (strings), where equal frequency ties break alphabetically instead of by first occurrence?',
        'How would a heap-of-size-k solution\'s time complexity compare to this bucket-sort approach as k approaches n?',
      ],
      similarQuestions: ['Top K Frequent Words', 'Sort Characters By Frequency', 'Kth Largest Element in an Array'],
    },
  },
];