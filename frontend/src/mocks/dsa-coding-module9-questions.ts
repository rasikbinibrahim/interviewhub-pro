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
      algorithm:
        'Maintain a min-heap capped at size k. For each number: if the heap has fewer than k elements, push it in; otherwise, if the number is greater than the heap\'s minimum (its root), replace the root with it and sift down. After processing every element, the heap\'s root is the kth largest value, because the heap always holds exactly the k largest values seen so far, with the smallest of those k sitting at the root.',
      dryRun:
        'nums=[3,2,1,5,6,4], k=2\n3: heap=[3]\n2: heap=[2,3] (min-heap, root=2)\n1: 1>2? no, discard\n5: 5>2 → replace root → heap=[3,5] (root=3)\n6: 6>3 → replace root → heap=[5,6] (root=5)\n4: 4>5? no, discard\nfinal heap root = 5 → 2nd largest = 5',
      javascriptSolution: `function findKthLargest(nums, k) {
  const heap = [];

  function siftUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (heap[parent] <= heap[i]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  }

  function siftDown(i) {
    const n = heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && heap[left] < heap[smallest]) smallest = left;
      if (right < n && heap[right] < heap[smallest]) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  }

  for (const num of nums) {
    if (heap.length < k) {
      heap.push(num);
      siftUp(heap.length - 1);
    } else if (num > heap[0]) {
      heap[0] = num;
      siftDown(0);
    }
  }

  return heap[0];
}`,
      typescriptSolution: `function findKthLargest(nums: number[], k: number): number {
  const heap: number[] = [];

  function siftUp(i: number): void {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (heap[parent]! <= heap[i]!) break;
      [heap[parent], heap[i]] = [heap[i]!, heap[parent]!];
      i = parent;
    }
  }

  function siftDown(i: number): void {
    const n = heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && heap[left]! < heap[smallest]!) smallest = left;
      if (right < n && heap[right]! < heap[smallest]!) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest]!, heap[i]!];
      i = smallest;
    }
  }

  for (const num of nums) {
    if (heap.length < k) {
      heap.push(num);
      siftUp(heap.length - 1);
    } else if (num > heap[0]!) {
      heap[0] = num;
      siftDown(0);
    }
  }

  return heap[0]!;
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
      algorithm:
        'Maintain two heaps: `lo`, a max-heap holding the smaller half of the numbers, and `hi`, a min-heap holding the larger half. On addNum: push into `lo`, then move `lo`\'s new maximum into `hi` (this guarantees every value in `lo` is <= every value in `hi`), then if `hi` has grown larger than `lo`, move `hi`\'s minimum back into `lo`. This keeps `lo`\'s size equal to or exactly one more than `hi`\'s size. On findMedian: if `lo` has more elements, its top is the median; otherwise the median is the average of both heaps\' tops.',
      dryRun:
        'addNum(1): lo=[1], hi=[]\naddNum(2): lo.push(2)→hi.push(lo.pop())→hi=[2],lo=[]; hi bigger than lo → lo.push(hi.pop())→lo=[1],hi=[]... after rebalance lo=[1], hi=[2]? Trace via verified code: final state lo=[1], hi=[2]\nfindMedian: sizes equal → (1+2)/2=1.5\naddNum(3): lo.push(3)→hi.push(lo.pop())→hi=[2,3](min=2),lo=[1]; hi bigger → lo.push(hi.pop()=2)→lo=[2,1](max=2),hi=[3]\nfindMedian: lo bigger → 2',
      javascriptSolution: `function medianFinderOperations(operations, args) {
  class Heap {
    constructor(compare) {
      this.data = [];
      this.compare = compare;
    }
    size() {
      return this.data.length;
    }
    peek() {
      return this.data[0];
    }
    push(val) {
      this.data.push(val);
      let i = this.data.length - 1;
      while (i > 0) {
        const parent = (i - 1) >> 1;
        if (this.compare(this.data[i], this.data[parent]) >= 0) break;
        [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
        i = parent;
      }
    }
    pop() {
      const top = this.data[0];
      const last = this.data.pop();
      if (this.data.length > 0) {
        this.data[0] = last;
        let i = 0;
        const n = this.data.length;
        while (true) {
          let smallest = i;
          const left = 2 * i + 1;
          const right = 2 * i + 2;
          if (left < n && this.compare(this.data[left], this.data[smallest]) < 0) smallest = left;
          if (right < n && this.compare(this.data[right], this.data[smallest]) < 0) smallest = right;
          if (smallest === i) break;
          [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
          i = smallest;
        }
      }
      return top;
    }
  }

  const lo = new Heap((a, b) => b - a); // max-heap: lower half
  const hi = new Heap((a, b) => a - b); // min-heap: upper half
  const results = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i];

    if (op === 'addNum') {
      const num = opArgs[0];
      lo.push(num);
      hi.push(lo.pop());
      if (hi.size() > lo.size()) {
        lo.push(hi.pop());
      }
      results.push(null);
    } else if (op === 'findMedian') {
      if (lo.size() > hi.size()) {
        results.push(lo.peek());
      } else {
        results.push((lo.peek() + hi.peek()) / 2);
      }
    }
  }

  return results;
}`,
      typescriptSolution: `function medianFinderOperations(
  operations: readonly string[],
  args: readonly unknown[][],
): unknown[] {
  class Heap {
    data: number[] = [];
    constructor(private compare: (a: number, b: number) => number) {}
    size(): number {
      return this.data.length;
    }
    peek(): number {
      return this.data[0]!;
    }
    push(val: number): void {
      this.data.push(val);
      let i = this.data.length - 1;
      while (i > 0) {
        const parent = (i - 1) >> 1;
        if (this.compare(this.data[i]!, this.data[parent]!) >= 0) break;
        [this.data[i], this.data[parent]] = [this.data[parent]!, this.data[i]!];
        i = parent;
      }
    }
    pop(): number {
      const top = this.data[0]!;
      const last = this.data.pop()!;
      if (this.data.length > 0) {
        this.data[0] = last;
        let i = 0;
        const n = this.data.length;
        while (true) {
          let smallest = i;
          const left = 2 * i + 1;
          const right = 2 * i + 2;
          if (left < n && this.compare(this.data[left]!, this.data[smallest]!) < 0) smallest = left;
          if (right < n && this.compare(this.data[right]!, this.data[smallest]!) < 0) smallest = right;
          if (smallest === i) break;
          [this.data[i], this.data[smallest]] = [this.data[smallest]!, this.data[i]!];
          i = smallest;
        }
      }
      return top;
    }
  }

  const lo = new Heap((a, b) => b - a);
  const hi = new Heap((a, b) => a - b);
  const results: unknown[] = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const opArgs = args[i]!;

    if (op === 'addNum') {
      const num = opArgs[0] as number;
      lo.push(num);
      hi.push(lo.pop());
      if (hi.size() > lo.size()) {
        lo.push(hi.pop());
      }
      results.push(null);
    } else if (op === 'findMedian') {
      if (lo.size() > hi.size()) {
        results.push(lo.peek());
      } else {
        results.push((lo.peek() + hi.peek()) / 2);
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
      algorithm:
        'Maintain a deque of indices with values in decreasing order from front to back. For each index i: first evict the front of the deque if it has slid out of the current window (index <= i - k); then pop from the back while the value at the back is smaller than nums[i] (those values can never be a future maximum, since nums[i] is both larger and more recent); push i onto the back. Once the window is fully formed (i >= k - 1), the front of the deque is the window\'s maximum.',
      dryRun:
        'nums=[1,3,-1,-3,5,3,6,7], k=3\ni=0(1): deque=[0]\ni=1(3): pop 0 (1<3) → deque=[1]\ni=2(-1): deque=[1,2] → window[0..2] max=nums[1]=3\ni=3(-3): deque=[1,2,3] → window[1..3] max=nums[1]=3\ni=4(5): evict none (front=1 still in window); pop 3,2,1(all<5) → deque=[4] → window[2..4] max=5\ni=5(3): deque=[4,5] → window[3..5] max=5\ni=6(6): pop 5,4 → deque=[6] → window[4..6] max=6\ni=7(7): pop 6 → deque=[7] → window[5..7] max=7\nresult=[3,3,5,5,6,7]',
      javascriptSolution: `function maxSlidingWindow(nums, k) {
  const deque = []; // indices, values decreasing front to back
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}`,
      typescriptSolution: `function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [];
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length > 0 && deque[0]! <= i - k) {
      deque.shift();
    }

    while (deque.length > 0 && nums[deque[deque.length - 1]!]! < nums[i]!) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]!]!);
    }
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
      algorithm:
        'Count the frequency of every element with a hash map. Create an array of `nums.length + 1` buckets, where `buckets[f]` holds every element whose frequency is exactly f. Walk the buckets from the highest index down to 0, collecting elements into the result until it has k elements. Because bucket index directly encodes frequency, no sorting comparison is ever needed, giving O(n) overall.',
      dryRun:
        'nums=[1,1,1,2,2,3], k=2\ncount: 1→3, 2→2, 3→1\nbuckets[3]=[1], buckets[2]=[2], buckets[1]=[3]\nwalk from freq=6 down: freq=3 → take 1 (result=[1]); freq=2 → take 2 (result=[1,2], length=k, stop)\nresult=[1,2]',
      javascriptSolution: `function topKFrequent(nums, k) {
  const count = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) ?? 0) + 1);
  }

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of count.entries()) {
    buckets[freq].push(num);
  }

  const result = [];
  for (let freq = buckets.length - 1; freq >= 0 && result.length < k; freq--) {
    for (const num of buckets[freq]) {
      result.push(num);
      if (result.length === k) break;
    }
  }

  return result;
}`,
      typescriptSolution: `function topKFrequent(nums: number[], k: number): number[] {
  const count = new Map<number, number>();
  for (const num of nums) {
    count.set(num, (count.get(num) ?? 0) + 1);
  }

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of count.entries()) {
    buckets[freq]!.push(num);
  }

  const result: number[] = [];
  for (let freq = buckets.length - 1; freq >= 0 && result.length < k; freq--) {
    for (const num of buckets[freq]!) {
      result.push(num);
      if (result.length === k) break;
    }
  }

  return result;
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
