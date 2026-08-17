// Hand-authored coding questions derived from
// frontend/src/document/DSA_Master_Handbook_Senior_Frontend_Engineers.md
// (Binary Search patterns). Unlike the auto-generated MockTechnicalQuestion
// files, these are real CodingQuestionDetail problems: every sampleTests
// entry has been checked against the reference solution below by running
// it in Node, and both the JavaScript and TypeScript solutions are
// genuine, working code (no placeholder "solve(input)" stubs).

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

const CATEGORY = 'Binary Search';
const CONCEPTS = ['Binary Search', 'Divide and Conquer', 'Time Complexity', 'Pattern Recognition'];

export const MOCK_DSA_CODING_MODULE8_QUESTIONS: MockCodingQuestion[] = [
  {
    detail: {
      id: 'dsa-coding-m8-1',
      questionNumber: 'DSACODE-M8-1',
      title: 'Single Element in a Sorted Array',
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
        'You are given a sorted array `nums` where every element appears exactly twice, except for one element which appears exactly once. Find and return the single element. Your solution must run in O(log n) time and O(1) space.',
      input: 'nums: number[] — sorted array where every value appears twice except one',
      output: 'number — the value that appears exactly once',
      constraints: ['1 <= nums.length <= 10^5', 'nums is sorted in non-decreasing order', 'nums.length is odd'],
      examples: [
        { input: '[1,1,2,3,3,4,4,8,8]', output: '2', explanation: 'Every value appears twice except 2.' },
        { input: '[3,3,7,7,10,11,11]', output: '10', explanation: 'Every value appears twice except 10.' },
        { input: '[1]', output: '1', explanation: 'A single-element array is trivially the answer.' },
      ],
      edgeCases: [
        { case: 'The single element is at index 0', expected: 'Detected via the first-pair check before binary search' },
        { case: 'The single element is at the last index', expected: 'Detected via the last-pair check before binary search' },
        { case: 'Array of length 1', expected: 'Returns that single element immediately' },
      ],
      functionName: 'singleNonDuplicate',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 1, 2, 3, 3, 4, 4, 8, 8]], expectedOutput: 2, description: 'single element in the middle' },
        { input: [[3, 3, 7, 7, 10, 11, 11]], expectedOutput: 10, description: 'single element near the end' },
        { input: [[1]], expectedOutput: 1, description: 'single-element array' },
        { input: [[1, 1, 2]], expectedOutput: 2, description: 'single element is the last element' },
      ],
    },
    hints: {
      hints: [
        'Before every properly-paired index, pairs sit at (even, even+1); after the single element, that pattern shifts by one.',
        'At any mid index, if nums[mid] differs from both neighbors, mid is the answer. Otherwise, check whether mid is on the "even-start" side of its pair to know which half to keep.',
        'Handle the boundary elements (index 0 and the last index) as special cases first, since mid±1 could go out of bounds for them.',
      ],
    },
    solution: {
      algorithm:
        'Binary search on the pairing pattern. Before the single element, a pair starts at an even index; after it, pairs start at an odd index. Check boundary elements first. Then at each mid, if nums[mid] differs from both neighbors it is the answer. Otherwise, determine whether the "broken" pairing pattern is to the left or right of mid using its parity, and search that half.',
      dryRun:
        'nums=[1,1,2,3,3,4,4,8,8], start=0,end=8\nmid=4: nums[4]=3, equals nums[3]=3 (mid even, matches next) → pattern intact on left → start=5\nmid=6: nums[6]=4, equals nums[5]=4 (mid even, matches previous, mismatched expectation) → search left → end=5\nmid=5: nums[5]=4, differs from nums[4]=3 and nums[6]=4? nums[6]=4 so equals next → continue\n... converges to index 2 → nums[2]=2',
      javascriptSolution: `function singleNonDuplicate(nums) {
  let start = 0;
  let end = nums.length - 1;

  if (end === 0) return nums[0];
  if (nums[start] !== nums[start + 1]) return nums[start];
  if (nums[end] !== nums[end - 1]) return nums[end];

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (nums[mid] !== nums[mid + 1] && nums[mid] !== nums[mid - 1]) {
      return nums[mid];
    }

    if ((mid % 2 === 0 && nums[mid] === nums[mid + 1]) || (mid % 2 === 1 && nums[mid] === nums[mid - 1])) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}`,
      typescriptSolution: `function singleNonDuplicate(nums: number[]): number {
  let start = 0;
  let end = nums.length - 1;

  if (end === 0) return nums[0]!;
  if (nums[start] !== nums[start + 1]) return nums[start]!;
  if (nums[end] !== nums[end - 1]) return nums[end]!;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (nums[mid] !== nums[mid + 1] && nums[mid] !== nums[mid - 1]) {
      return nums[mid]!;
    }

    if ((mid % 2 === 0 && nums[mid] === nums[mid + 1]) || (mid % 2 === 1 && nums[mid] === nums[mid - 1])) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}`,
      timeComplexity: 'O(log n) — binary search halves the search space each iteration.',
      spaceComplexity: 'O(1) — only a few pointer variables.',
      commonMistakes: [
        'Using a linear scan or a hash-map frequency count, which is O(n) instead of the required O(log n).',
        'Not special-casing the first and last elements before binary search, causing out-of-bounds reads at nums[mid - 1] or nums[mid + 1].',
        'Getting the even/odd parity check backwards, which searches the wrong half and never converges correctly.',
      ],
      followUpQuestions: [
        'How would this change if more than one element could appear only once?',
        'How would you solve this with XOR if the array were NOT sorted (classic "single number" variant)?',
        'What is the invariant that guarantees this binary search always converges to the correct index?',
      ],
      similarQuestions: ['Single Number', 'Find First and Last Position of Element in Sorted Array', 'Search in Rotated Sorted Array'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m8-2',
      questionNumber: 'DSACODE-M8-2',
      title: 'Search in Rotated Sorted Array',
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
        'You are given a sorted array `nums` (with distinct values) that has been rotated at an unknown pivot, and an integer `target`. Return the index of `target` if it exists in `nums`, or -1 if it does not. Must run in O(log n) time.',
      input: 'nums: number[] — a rotated sorted array of distinct integers, target: number',
      output: 'number — the index of target, or -1 if not found',
      constraints: ['1 <= nums.length <= 5000', 'All values in nums are unique', 'nums is sorted and then rotated at some pivot'],
      examples: [
        { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4', explanation: 'target 0 sits at index 4.' },
        { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1', explanation: '3 is not present in the array.' },
        { input: 'nums = [1], target = 0', output: '-1', explanation: 'Not present in a single-element array.' },
      ],
      edgeCases: [
        { case: 'Array is not rotated at all', expected: 'Behaves like plain binary search' },
        { case: 'Target is the pivot element itself', expected: 'Found correctly regardless of which half it lands in' },
        { case: 'Single-element array', expected: 'Returns 0 if it matches, else -1' },
      ],
      functionName: 'searchRotated',
      isClassBased: false,
      sampleTests: [
        { input: [[4, 5, 6, 7, 0, 1, 2], 0], expectedOutput: 4, description: 'target in the unsorted (rotated) half' },
        { input: [[4, 5, 6, 7, 0, 1, 2], 3], expectedOutput: -1, description: 'target not present' },
        { input: [[1], 0], expectedOutput: -1, description: 'single-element array, no match' },
        { input: [[5, 1, 3], 5], expectedOutput: 0, description: 'target is the pivot / first element' },
      ],
    },
    hints: {
      hints: [
        'At every mid, at least one of the two halves (low..mid or mid..high) is guaranteed to be normally sorted — identify which one.',
        'If the left half is sorted, check whether target falls within its range to decide whether to search left or right; otherwise apply the same logic to the sorted right half.',
        'This is still a single binary search — you never need to actually "find the pivot" first.',
      ],
    },
    solution: {
      algorithm:
        'Standard binary search, but at each step first determine which half (low..mid or mid..high) is contiguously sorted by comparing nums[low] to nums[mid]. If the left half is sorted and target lies within [nums[low], nums[mid]], search left; otherwise search right. If the right half is sorted instead, apply the mirrored check.',
      dryRun:
        'nums=[4,5,6,7,0,1,2], target=0, low=0,high=6\nmid=3: nums[mid]=7, nums[low]=4<=7 so left sorted; is 0 in [4,7]? no → low=4\nmid=5: nums[mid]=1, nums[low]=0<=1 so left sorted; is 0 in [0,1]? yes → high=4\nmid=4: nums[mid]=0 === target → return 4',
      javascriptSolution: `function searchRotated(nums, target) {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid] === target) return mid;

    if (nums[low] <= nums[mid]) {
      if (target >= nums[low] && target <= nums[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (target >= nums[mid] && target <= nums[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return -1;
}`,
      typescriptSolution: `function searchRotated(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid] === target) return mid;

    if (nums[low]! <= nums[mid]!) {
      if (target >= nums[low]! && target <= nums[mid]!) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (target >= nums[mid]! && target <= nums[high]!) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return -1;
}`,
      timeComplexity: 'O(log n) — one binary search pass, no separate pivot-finding step.',
      spaceComplexity: 'O(1) — only pointer variables.',
      commonMistakes: [
        'Finding the rotation pivot first with a separate O(log n) search, then doing a second O(log n) search — unnecessary; both can be done in a single pass.',
        'Using `<` instead of `<=` when comparing nums[low] to nums[mid], which mishandles two-element sorted halves.',
        'Forgetting this only works because all elements are distinct — with duplicates, nums[low] === nums[mid] === nums[high] makes it ambiguous which half is sorted (see the follow-up variant).',
      ],
      followUpQuestions: [
        'How does the solution change if the array can contain duplicate values (LeetCode "Search in Rotated Sorted Array II")?',
        'How would you find the rotation pivot index directly instead of a target value?',
        'What happens to the time complexity in the duplicates case, and why?',
      ],
      similarQuestions: ['Search in Rotated Sorted Array II', 'Find Minimum in Rotated Sorted Array', 'Find Peak Element'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m8-3',
      questionNumber: 'DSACODE-M8-3',
      title: 'Median of Two Sorted Arrays',
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
        'Given two sorted arrays `nums1` and `nums2` of sizes m and n, return the median of the two arrays combined. The overall run time complexity must be O(log(min(m, n))).',
      input: 'nums1: number[], nums2: number[] — two sorted arrays',
      output: 'number — the median of the combined sorted sequence',
      constraints: ['0 <= m, n', '1 <= m + n', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
      examples: [
        { input: 'nums1 = [1,3], nums2 = [2]', output: '2', explanation: 'Merged: [1,2,3], median is 2.' },
        { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5', explanation: 'Merged: [1,2,3,4], median is (2+3)/2 = 2.5.' },
        { input: 'nums1 = [], nums2 = [1]', output: '1', explanation: 'One array is empty; median of [1] is 1.' },
      ],
      edgeCases: [
        { case: 'One array is empty', expected: 'Median comes entirely from the other array' },
        { case: 'Combined length is even', expected: 'Median is the average of the two middle elements' },
        { case: 'Combined length is odd', expected: 'Median is the single middle element' },
      ],
      functionName: 'findMedianSortedArrays',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 3], [2]], expectedOutput: 2, description: 'odd combined length' },
        { input: [[1, 2], [3, 4]], expectedOutput: 2.5, description: 'even combined length' },
        { input: [[], [1]], expectedOutput: 1, description: 'first array empty' },
        { input: [[0, 0], [0, 0]], expectedOutput: 0, description: 'all-zero arrays' },
      ],
    },
    hints: {
      hints: [
        'Always binary search on the smaller array — this bounds the complexity to O(log(min(m, n))) and keeps the partition math simple.',
        'A "correct" partition splits the combined array into a left half and right half of (near-)equal size such that every element in the left half is <= every element in the right half.',
        'Binary search the cut point in the smaller array; the cut point in the larger array is fully determined by it (cut2 = half - cut1).',
      ],
    },
    solution: {
      algorithm:
        'Ensure nums1 is the smaller array (swap if needed). Binary search a partition index cut1 in nums1; the matching partition cut2 in nums2 is (m+n+1)/2 - cut1. Compare the boundary elements l1/r1 (around cut1 in nums1) and l2/r2 (around cut2 in nums2). If l1 <= r2 and l2 <= r1, the partition is correct: return max(l1,l2) for odd total length, or the average of max(l1,l2) and min(r1,r2) for even. Otherwise shrink the binary search range based on which side is too large.',
      dryRun:
        'nums1=[1,3], nums2=[2], m=2,n=1, total=3 (odd)\nlow=0,high=2\ncut1=1: cut2=(2+1+1)/2-1=1\nl1=nums1[0]=1, r1=nums1[1]=3\nl2=nums2[0]=2, r2=Infinity (cut2==n)\nl1<=r2(1<=Inf) and l2<=r1(2<=3) → correct partition\ntotal odd → return max(l1,l2)=max(1,2)=2',
      javascriptSolution: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  let low = 0;
  let high = m;

  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = Math.floor((m + n + 1) / 2) - cut1;

    const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const r1 = cut1 === m ? Infinity : nums1[cut1];
    const r2 = cut2 === n ? Infinity : nums2[cut2];

    if (l1 <= r2 && l2 <= r1) {
      if ((m + n) % 2 === 1) return Math.max(l1, l2);
      return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
    } else if (l1 > r2) {
      high = cut1 - 1;
    } else {
      low = cut1 + 1;
    }
  }

  return 0;
}`,
      typescriptSolution: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let a = nums1;
  let b = nums2;
  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  const m = a.length;
  const n = b.length;
  let low = 0;
  let high = m;

  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = Math.floor((m + n + 1) / 2) - cut1;

    const l1 = cut1 === 0 ? -Infinity : a[cut1 - 1]!;
    const l2 = cut2 === 0 ? -Infinity : b[cut2 - 1]!;
    const r1 = cut1 === m ? Infinity : a[cut1]!;
    const r2 = cut2 === n ? Infinity : b[cut2]!;

    if (l1 <= r2 && l2 <= r1) {
      if ((m + n) % 2 === 1) return Math.max(l1, l2);
      return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
    } else if (l1 > r2) {
      high = cut1 - 1;
    } else {
      low = cut1 + 1;
    }
  }

  return 0;
}`,
      timeComplexity: 'O(log(min(m, n))) — binary search over the smaller array only.',
      spaceComplexity: 'O(1) — no auxiliary arrays are built.',
      commonMistakes: [
        'Merging both arrays and sorting (O((m+n) log(m+n))) instead of the O(log(min(m,n))) partition approach.',
        'Binary searching on the larger array, which is still correct but misses the intended complexity bound.',
        'Forgetting the -Infinity / Infinity sentinels for partitions at the very start or end of an array, causing incorrect comparisons at the boundaries.',
      ],
      followUpQuestions: [
        'How would you find the kth smallest element of two sorted arrays using the same partition idea?',
        'How would this generalize to finding the median of k sorted arrays?',
        'Why must the binary search happen on the smaller array to guarantee correctness of the partition bounds?',
      ],
      similarQuestions: ['K-th Element of Two Sorted Arrays', 'Kth Smallest Element in a Sorted Matrix', 'Find K Pairs with Smallest Sums'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m8-4',
      questionNumber: 'DSACODE-M8-4',
      title: 'Kth Element of Two Sorted Arrays',
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
        'Given two sorted arrays `a` and `b`, and an integer `k` (1-indexed), find the kth smallest element in the combined sorted sequence of both arrays, in O(log(min(|a|, |b|))) time.',
      input: 'a: number[], b: number[], k: number — 1-indexed position in the merged sorted sequence',
      output: 'number — the kth smallest element across both arrays combined',
      constraints: ['1 <= a.length + b.length', '1 <= k <= a.length + b.length'],
      examples: [
        { input: 'a = [2,3,6,7,9], b = [1,4,8,10], k = 5', output: '6', explanation: 'Merged: [1,2,3,4,6,7,8,9,10]; the 5th element is 6.' },
        { input: 'a = [1,3,5], b = [2,4,6], k = 1', output: '1', explanation: 'The smallest element overall is 1.' },
        { input: 'a = [1,3,5], b = [2,4,6], k = 6', output: '6', explanation: 'The largest element overall is 6.' },
      ],
      edgeCases: [
        { case: 'k = 1', expected: 'Returns the overall minimum of the two arrays' },
        { case: 'k = a.length + b.length', expected: 'Returns the overall maximum' },
        { case: 'One array much longer than the other', expected: 'Still O(log(min(m,n))) by binary searching the smaller one' },
      ],
      functionName: 'kthElement',
      isClassBased: false,
      sampleTests: [
        { input: [[2, 3, 6, 7, 9], [1, 4, 8, 10], 5], expectedOutput: 6, description: 'classic textbook example' },
        { input: [[100, 112, 256, 349, 770], [72, 86, 113, 119, 265, 445, 892], 7], expectedOutput: 256, description: 'larger, uneven-length arrays' },
        { input: [[1, 3, 5], [2, 4, 6], 1], expectedOutput: 1, description: 'k = 1 returns the minimum' },
        { input: [[1, 3, 5], [2, 4, 6], 6], expectedOutput: 6, description: 'k = length returns the maximum' },
      ],
    },
    hints: {
      hints: [
        'This is the same partition idea as "Median of Two Sorted Arrays", generalized: split the combined array so exactly k elements land on the left side.',
        'Binary search on the smaller array for the cut point; the cut point in the larger array is k minus that.',
        'The valid range for the cut in the smaller array is bounded by max(0, k - other.length) to min(k, this.length) — this keeps both cuts within their array bounds.',
      ],
    },
    solution: {
      algorithm:
        'Ensure A is the smaller array. Binary search cut1 in A within [max(0, k - B.length), min(k, A.length)]. cut2 = k - cut1. Compute boundary values l1, r1 (around cut1 in A) and l2, r2 (around cut2 in B) using -Infinity/Infinity sentinels at the edges. If l1 <= r2 and l2 <= r1, the partition places exactly k elements on the left, and the answer is max(l1, l2) (the largest element in that left partition, i.e. the kth smallest overall). Otherwise adjust the binary search range based on which boundary violated the order.',
      dryRun:
        'A=[2,3,6,7,9], B=[1,4,8,10], k=5\nlow=max(0,5-4)=1, high=min(5,5)=5\ncut1=3: cut2=5-3=2\nl1=A[2]=6, r1=A[3]=7\nl2=B[1]=4, r2=B[2]=8\nl1<=r2(6<=8) but l2<=r1(4<=7) both hold → answer = max(l1,l2)=max(6,4)=6',
      javascriptSolution: `function kthElement(a, b, k) {
  let A = a;
  let B = b;
  if (A.length > B.length) {
    [A, B] = [B, A];
  }

  const n = A.length;
  const m = B.length;
  let low = Math.max(0, k - m);
  let high = Math.min(k, n);

  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = k - cut1;

    const l1 = cut1 === 0 ? -Infinity : A[cut1 - 1];
    const l2 = cut2 === 0 ? -Infinity : B[cut2 - 1];
    const r1 = cut1 === n ? Infinity : A[cut1];
    const r2 = cut2 === m ? Infinity : B[cut2];

    if (l1 <= r2 && l2 <= r1) {
      return Math.max(l1, l2);
    } else if (l1 > r2) {
      high = cut1 - 1;
    } else {
      low = cut1 + 1;
    }
  }

  return -1;
}`,
      typescriptSolution: `function kthElement(a: number[], b: number[], k: number): number {
  let A = a;
  let B = b;
  if (A.length > B.length) {
    [A, B] = [B, A];
  }

  const n = A.length;
  const m = B.length;
  let low = Math.max(0, k - m);
  let high = Math.min(k, n);

  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = k - cut1;

    const l1 = cut1 === 0 ? -Infinity : A[cut1 - 1]!;
    const l2 = cut2 === 0 ? -Infinity : B[cut2 - 1]!;
    const r1 = cut1 === n ? Infinity : A[cut1]!;
    const r2 = cut2 === m ? Infinity : B[cut2]!;

    if (l1 <= r2 && l2 <= r1) {
      return Math.max(l1, l2);
    } else if (l1 > r2) {
      high = cut1 - 1;
    } else {
      low = cut1 + 1;
    }
  }

  return -1;
}`,
      timeComplexity: 'O(log(min(m, n))) — binary search over the smaller array.',
      spaceComplexity: 'O(1) — no auxiliary structures.',
      commonMistakes: [
        'Merging and sorting both arrays then indexing k-1, which works but is O((m+n) log(m+n)) instead of logarithmic.',
        'Getting the binary search bounds wrong (not accounting for max(0, k - B.length) and min(k, A.length)), which can push cut2 out of bounds.',
        'Confusing 1-indexed k with a 0-indexed array access — the answer is the value at the boundary, not `A[k-1]` directly.',
      ],
      followUpQuestions: [
        'How does this generalize to find the median (a special case where k = (m+n+1)/2, possibly averaged with k+1)?',
        'How would you solve this with a min-heap merge instead, and what would the complexity be?',
        'How would you handle k out of the valid [1, m+n] range?',
      ],
      similarQuestions: ['Median of Two Sorted Arrays', 'Kth Smallest Element in a Sorted Matrix', 'Find K-th Smallest Pair Distance'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m8-5',
      questionNumber: 'DSACODE-M8-5',
      title: 'Sum of Two Squares Exists',
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
        'Given a non-negative integer `c`, determine whether there exist two non-negative integers `a` and `b` such that a² + b² = c.',
      input: 'c: number — a non-negative integer',
      output: 'boolean — true if such a and b exist',
      constraints: ['0 <= c <= 2^31 - 1'],
      examples: [
        { input: '5', output: 'true', explanation: '1² + 2² = 5.' },
        { input: '3', output: 'false', explanation: 'No pair of non-negative integers squares to 3.' },
        { input: '4', output: 'true', explanation: '0² + 2² = 4.' },
      ],
      edgeCases: [
        { case: 'c = 0', expected: 'true, via 0² + 0² = 0' },
        { case: 'c is a perfect square', expected: 'true, via 0² + sqrt(c)²' },
        { case: 'c has no valid decomposition', expected: 'false' },
      ],
      functionName: 'sumOfTwoSquaresExists',
      isClassBased: false,
      sampleTests: [
        { input: [5], expectedOutput: true, description: '1² + 2² = 5' },
        { input: [4], expectedOutput: true, description: '0² + 2² = 4' },
        { input: [7], expectedOutput: false, description: 'no valid decomposition' },
        { input: [25], expectedOutput: true, description: '3² + 4² = 25' },
      ],
    },
    hints: {
      hints: [
        'Use two pointers: start at 0 and end at floor(sqrt(c)), since neither a nor b can exceed sqrt(c).',
        'At each step compare start² + end² to c: if too small, increase start; if too large, decrease end; if equal, a solution exists.',
        'This is exactly the two-pointer pattern for "does a pair with a target sum exist" applied to squares instead of raw values.',
      ],
    },
    solution: {
      algorithm:
        'Two pointers start=0 and end=floor(sqrt(c)). While start <= end, compute sum = start² + end². If sum === c, return true. If sum < c, increment start (need a bigger contribution). If sum > c, decrement end (need a smaller contribution). If the pointers cross without finding a match, return false.',
      dryRun:
        'c=5, start=0, end=2 (floor(sqrt(5)))\nsum=0+4=4 < 5 → start=1\nsum=1+4=5 === 5 → return true',
      javascriptSolution: `function sumOfTwoSquaresExists(c) {
  if (c < 0) return false;

  let start = 0;
  let end = Math.floor(Math.sqrt(c));

  while (start <= end) {
    const sum = start * start + end * end;

    if (sum === c) return true;
    if (sum < c) start++;
    else end--;
  }

  return false;
}`,
      typescriptSolution: `function sumOfTwoSquaresExists(c: number): boolean {
  if (c < 0) return false;

  let start = 0;
  let end = Math.floor(Math.sqrt(c));

  while (start <= end) {
    const sum = start * start + end * end;

    if (sum === c) return true;
    if (sum < c) start++;
    else end--;
  }

  return false;
}`,
      timeComplexity: 'O(sqrt(c)) — the two pointers together traverse at most sqrt(c) steps.',
      spaceComplexity: 'O(1) — only two pointer variables.',
      commonMistakes: [
        'Brute-forcing all pairs (a, b) up to sqrt(c) with nested loops (O(c)) instead of the O(sqrt(c)) two-pointer approach.',
        'Forgetting that 0 is a valid non-negative value for a or b (e.g. 4 = 0² + 2²).',
        'Off-by-one errors in the initial `end` bound — using ceil instead of floor of sqrt(c) can push end one past a valid value and access out-of-range products (harmless numerically here, but conceptually wrong).',
      ],
      followUpQuestions: [
        "How would you determine this using Fermat's theorem on sums of two squares (checking prime factorization) instead of two pointers?",
        'How would you return the actual (a, b) pair instead of just a boolean?',
        'How would you find all such pairs, not just whether one exists?',
      ],
      similarQuestions: ['Two Sum', 'Valid Perfect Square', 'Two Sum II — Input Array Is Sorted'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m8-6',
      questionNumber: 'DSACODE-M8-6',
      title: 'Find Smallest Letter Greater Than Target',
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
        'Given a sorted array of characters `letters` (may contain duplicates) and a target character `target`, return the smallest character in `letters` that is strictly greater than `target`. If no such character exists (target is >= the largest letter), the search wraps around and returns the first letter of `letters`.',
      input: 'letters: string[] — sorted single-character strings, target: string — a single character',
      output: 'string — the smallest letter strictly greater than target, wrapping to letters[0] if none exists',
      constraints: ['2 <= letters.length <= 10^4', 'letters[i] is a lowercase English letter', 'letters is sorted in non-decreasing order'],
      examples: [
        { input: 'letters = ["c","f","j"], target = "a"', output: '"c"', explanation: 'c is the smallest letter greater than a.' },
        { input: 'letters = ["c","f","j"], target = "j"', output: '"c"', explanation: 'No letter is greater than j, so it wraps around to c.' },
        { input: 'letters = ["x","x","y","y"], target = "z"', output: '"x"', explanation: 'z is beyond every letter, so it wraps to the first element.' },
      ],
      edgeCases: [
        { case: 'target is smaller than every letter', expected: 'Returns letters[0]' },
        { case: 'target equals an existing letter', expected: 'Returns the next distinct greater letter, not target itself' },
        { case: 'letters has duplicates', expected: 'Duplicates are skipped correctly since strict-greater-than is required' },
      ],
      functionName: 'nextGreatestLetter',
      isClassBased: false,
      sampleTests: [
        { input: [['c', 'f', 'j'], 'a'], expectedOutput: 'c', description: 'target smaller than everything' },
        { input: [['c', 'f', 'j'], 'c'], expectedOutput: 'f', description: 'target equals an existing letter' },
        { input: [['c', 'f', 'j'], 'j'], expectedOutput: 'c', description: 'target is the largest letter, wraps around' },
        { input: [['x', 'x', 'y', 'y'], 'z'], expectedOutput: 'x', description: 'target beyond all letters, wraps around' },
      ],
    },
    hints: {
      hints: [
        'This is "find the leftmost element strictly greater than target" — a standard lower-bound binary search variant.',
        'Track the best candidate seen so far as you binary search: whenever letters[mid] > target, it is a candidate, but keep searching left for a smaller one.',
        'If no candidate was ever found by the end of the search, that means target was >= every letter, so wrap around to letters[0].',
      ],
    },
    solution: {
      algorithm:
        'Binary search for the leftmost index where letters[index] > target. Maintain `ans` as the best candidate found so far. At each mid: if letters[mid] > target, record it as a candidate and move high left (there might be a smaller qualifying letter); otherwise move low right. If no candidate is ever found, wrap around and return letters[0].',
      dryRun:
        'letters=["c","f","j"], target="c", low=0,high=2\nmid=1: letters[1]="f">"c" → ans="f", high=0\nmid=0: letters[0]="c">"c"? no → low=1\nloop ends (low>high) → return ans="f"',
      javascriptSolution: `function nextGreatestLetter(letters, target) {
  let low = 0;
  let high = letters.length - 1;
  let ans = null;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (letters[mid] > target) {
      ans = letters[mid];
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return ans === null ? letters[0] : ans;
}`,
      typescriptSolution: `function nextGreatestLetter(letters: string[], target: string): string {
  let low = 0;
  let high = letters.length - 1;
  let ans: string | null = null;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (letters[mid]! > target) {
      ans = letters[mid]!;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return ans === null ? letters[0]! : ans;
}`,
      timeComplexity: 'O(log n) — binary search over the sorted letters array.',
      spaceComplexity: 'O(1) — only a few scalar variables.',
      commonMistakes: [
        'Using `>=` instead of `>`, which would return target itself when it is present in the array instead of the next distinct greater letter.',
        'Forgetting the wraparound case when target is greater than or equal to every element in letters.',
        'Linear scanning instead of binary search, missing the O(log n) requirement.',
      ],
      followUpQuestions: [
        'How would you find the largest letter strictly smaller than target instead (the mirrored problem)?',
        'How would you extend this to find the closest letter to target, greater or smaller?',
        "How does JavaScript's string comparison (`>`) guarantee correct lexicographic ordering for single characters here?",
      ],
      similarQuestions: ['Search Insert Position', "Find K Closest Elements", 'Find First and Last Position of Element in Sorted Array'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m8-7',
      questionNumber: 'DSACODE-M8-7',
      title: 'Find Peak Element',
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
        'A peak element is an element strictly greater than its neighbors. Given an array `nums`, return the index of any one peak element. You may assume nums[-1] and nums[n] are -infinity. Must run in O(log n) time.',
      input: 'nums: number[] — an array where adjacent elements are never equal',
      output: 'number — the index of any valid peak element',
      constraints: ['1 <= nums.length <= 1000', 'nums[i] !== nums[i+1] for all valid i'],
      examples: [
        { input: '[1,2,3,1]', output: '2', explanation: 'Index 2 (value 3) is greater than both neighbors.' },
        { input: '[1,2,1,3,5,6,4]', output: '5', explanation: 'Index 5 (value 6) is a peak; index 1 would also be a valid answer for a different array.' },
        { input: '[1]', output: '0', explanation: 'A single element is trivially a peak (both virtual neighbors are -infinity).' },
      ],
      edgeCases: [
        { case: 'Single-element array', expected: 'Returns index 0' },
        { case: 'Strictly increasing array', expected: 'Returns the last index' },
        { case: 'Strictly decreasing array', expected: 'Returns index 0' },
      ],
      functionName: 'findPeakElement',
      isClassBased: false,
      sampleTests: [
        { input: [[1, 2, 3, 1]], expectedOutput: 2, description: 'single interior peak' },
        { input: [[1, 2, 1, 3, 5, 6, 4]], expectedOutput: 5, description: 'multiple peaks, binary search converges to one' },
        { input: [[1]], expectedOutput: 0, description: 'single element' },
        { input: [[1, 2]], expectedOutput: 1, description: 'strictly increasing, peak is the last index' },
      ],
    },
    hints: {
      hints: [
        'If nums[mid] < nums[mid + 1], the array is still climbing at mid, so a peak must exist somewhere to the right.',
        'Conversely, if nums[mid] > nums[mid + 1], a peak exists at mid or to its left (the array is descending, so a peak was already passed or is right here).',
        'Because the virtual boundaries are -infinity, this binary search always converges to a valid peak — you never need to check for "no peak exists".',
      ],
    },
    solution: {
      algorithm:
        'Binary search using nums[mid] vs nums[mid + 1]. If nums[mid] < nums[mid + 1], the function is still increasing, so move low = mid + 1 (a peak is to the right). Otherwise, move high = mid (a peak is at mid or to the left). Stop when low === high — that index is a valid peak by the -infinity boundary guarantee.',
      dryRun:
        'nums=[1,2,1,3,5,6,4], low=0,high=6\nmid=3: nums[3]=3<nums[4]=5 → low=4\nmid=5: nums[5]=6>nums[6]=4 → high=5\nmid=4: nums[4]=5<nums[5]=6 → low=5\nlow===high===5 → return 5',
      javascriptSolution: `function findPeakElement(nums) {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid] < nums[mid + 1]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}`,
      typescriptSolution: `function findPeakElement(nums: number[]): number {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid]! < nums[mid + 1]!) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}`,
      timeComplexity: 'O(log n) — binary search halves the range each step.',
      spaceComplexity: 'O(1) — only two pointers.',
      commonMistakes: [
        'Using `low <= high` with `mid ± 1` bounds instead of `low < high` with `high = mid`, which is easy to get wrong here since we are converging to a single index, not searching for an exact value.',
        'Assuming there is exactly one peak — arrays can have multiple valid peaks, and any one of them is an acceptable answer.',
        'Linear scanning for a peak, which is correct but misses the O(log n) requirement.',
      ],
      followUpQuestions: [
        'How would you find ALL peak elements in the array, not just one?',
        'How does this binary search generalize to a 2D grid ("Find a Peak Element II")?',
        'Why is the -infinity boundary assumption essential for this binary search to always succeed?',
      ],
      similarQuestions: ['Peak Index in a Mountain Array', 'Find Peak Element II', 'Find in Mountain Array'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m8-8',
      questionNumber: 'DSACODE-M8-8',
      title: 'Peak Index in a Mountain Array',
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
        'You are given a "mountain array" `arr`: strictly increasing then strictly decreasing, with at least one element on each side of the peak. Return the index of the peak element.',
      input: 'arr: number[] — a mountain array (strictly increasing, then strictly decreasing)',
      output: 'number — the index of the peak (maximum) element',
      constraints: ['3 <= arr.length <= 10^5', 'arr is guaranteed to be a valid mountain array'],
      examples: [
        { input: '[0,2,1]', output: '1', explanation: 'The peak (2) is at index 1.' },
        { input: '[0,10,5,2]', output: '1', explanation: 'The peak (10) is at index 1.' },
        { input: '[3,4,5,1]', output: '2', explanation: 'The peak (5) is at index 2.' },
      ],
      edgeCases: [
        { case: 'Peak is near the start', expected: 'Binary search still converges correctly' },
        { case: 'Peak is near the end', expected: 'Binary search still converges correctly' },
        { case: 'Minimal valid mountain (length 3)', expected: 'Peak is at index 1' },
      ],
      functionName: 'peakIndexInMountainArray',
      isClassBased: false,
      sampleTests: [
        { input: [[0, 2, 1]], expectedOutput: 1, description: 'minimal mountain array' },
        { input: [[0, 10, 5, 2]], expectedOutput: 1, description: 'peak near the start' },
        { input: [[3, 4, 5, 1]], expectedOutput: 2, description: 'peak near the end' },
        { input: [[0, 1, 2, 3, 4, 2, 0]], expectedOutput: 4, description: 'longer mountain array' },
      ],
    },
    hints: {
      hints: [
        'This is a specialization of "Find Peak Element" for arrays guaranteed to have exactly one peak.',
        'If arr[mid] < arr[mid + 1], you are still on the ascending slope, so the peak is to the right.',
        'Otherwise you are on (or past) the descending slope, so the peak is at mid or to the left.',
      ],
      },
    solution: {
      algorithm:
        'Binary search comparing arr[mid] to arr[mid + 1]. If arr[mid] < arr[mid + 1], the array is still ascending, so move low = mid + 1. Otherwise move high = mid. The loop ends when low === high, which is guaranteed (by the mountain-array property) to be the peak index.',
      dryRun:
        'arr=[0,10,5,2], low=0,high=3\nmid=1: arr[1]=10>arr[2]=5 → high=1\nmid=0: arr[0]=0<arr[1]=10 → low=1\nlow===high===1 → return 1',
      javascriptSolution: `function peakIndexInMountainArray(arr) {
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] < arr[mid + 1]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}`,
      typescriptSolution: `function peakIndexInMountainArray(arr: number[]): number {
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid]! < arr[mid + 1]!) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}`,
      timeComplexity: 'O(log n) — binary search over the array.',
      spaceComplexity: 'O(1) — only two pointers.',
      commonMistakes: [
        'Linear-scanning for the maximum value, which works but is O(n) instead of the intended O(log n).',
        'Confusing this with "Find Peak Element" and adding unnecessary handling for multiple peaks — a mountain array is guaranteed to have exactly one.',
        'Off-by-one errors comparing arr[mid] to arr[mid - 1] instead of arr[mid + 1] (both work if done consistently, but mixing them causes bugs).',
      ],
      followUpQuestions: [
        'How would you search for a specific target value within a mountain array (find the peak first, then binary search each slope)?',
        'How would you verify that a given array actually IS a valid mountain array?',
        'How does this relate to ternary search for finding a maximum in a unimodal function?',
      ],
      similarQuestions: ['Find Peak Element', 'Find in Mountain Array', 'Valid Mountain Array'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m8-9',
      questionNumber: 'DSACODE-M8-9',
      title: 'Find Minimum in Rotated Sorted Array',
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
        'A sorted array of distinct integers has been rotated at an unknown pivot. Return the minimum element of the array in O(log n) time.',
      input: 'nums: number[] — a rotated sorted array of distinct integers',
      output: 'number — the minimum value in nums',
      constraints: ['1 <= nums.length <= 5000', 'All values in nums are unique', '-5000 <= nums[i] <= 5000'],
      examples: [
        { input: '[3,4,5,1,2]', output: '1', explanation: 'The array was rotated so the minimum (1) sits mid-array.' },
        { input: '[4,5,6,7,0,1,2]', output: '0', explanation: 'The minimum is 0.' },
        { input: '[11,13,15,17]', output: '11', explanation: 'The array is not actually rotated (rotation count is a multiple of length).' },
      ],
      edgeCases: [
        { case: 'Array is not rotated at all', expected: 'Returns nums[0], the natural minimum' },
        { case: 'Single-element array', expected: 'Returns that element' },
        { case: 'Minimum is at index 0 after rotation wraps fully', expected: 'Still found correctly' },
      ],
      functionName: 'findMinRotated',
      isClassBased: false,
      sampleTests: [
        { input: [[3, 4, 5, 1, 2]], expectedOutput: 1, description: 'minimum in the middle' },
        { input: [[4, 5, 6, 7, 0, 1, 2]], expectedOutput: 0, description: 'longer rotated array' },
        { input: [[11, 13, 15, 17]], expectedOutput: 11, description: 'effectively not rotated' },
        { input: [[1]], expectedOutput: 1, description: 'single element' },
      ],
    },
    hints: {
      hints: [
        'At every mid, compare nums[low] to nums[mid] to determine which half is contiguously sorted (the sorted half\'s own first element is a minimum candidate).',
        'If nums[low] <= nums[mid], the left half [low..mid] is sorted, so its minimum candidate is nums[low] — the true minimum must be in the other half (or is nums[low] itself).',
        'Otherwise the right half is the one containing the rotation point, so search there, using nums[mid] as a candidate.',
      ],
    },
    solution: {
      algorithm:
        'Binary search while tracking the smallest candidate seen. At each step, if nums[low] <= nums[mid], the left half is sorted, so nums[low] is a valid candidate for the minimum, and the rotation point (if any) must be to the right — move low = mid + 1. Otherwise, the rotation point is within [low..mid], so nums[mid] is a candidate and high = mid - 1. Return the smallest candidate seen.',
      dryRun:
        'nums=[4,5,6,7,0,1,2], low=0,high=6, res=Infinity\nmid=3: nums[0]=4<=nums[3]=7 → res=min(Inf,4)=4, low=4\nmid=5: nums[4]=0<=nums[5]=1 → res=min(4,0)=0, low=6\nmid=6: nums[6]=2<=nums[6]=2 → res=min(0,2)=0, low=7\nloop ends → return 0',
      javascriptSolution: `function findMinRotated(nums) {
  let low = 0;
  let high = nums.length - 1;
  let res = Infinity;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[low] <= nums[mid]) {
      res = Math.min(res, nums[low]);
      low = mid + 1;
    } else {
      res = Math.min(res, nums[mid]);
      high = mid - 1;
    }
  }

  return res;
}`,
      typescriptSolution: `function findMinRotated(nums: number[]): number {
  let low = 0;
  let high = nums.length - 1;
  let res = Infinity;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[low]! <= nums[mid]!) {
      res = Math.min(res, nums[low]!);
      low = mid + 1;
    } else {
      res = Math.min(res, nums[mid]!);
      high = mid - 1;
    }
  }

  return res;
}`,
      timeComplexity: 'O(log n) — binary search over the array.',
      spaceComplexity: 'O(1) — only a running minimum and two pointers.',
      commonMistakes: [
        'Comparing nums[mid] to nums[high] instead of nums[low] to nums[mid] — both approaches work but must be applied consistently; mixing conventions introduces bugs.',
        'Assuming the minimum is always at the "discontinuity" and trying to detect it directly with adjacent-pair comparisons in O(n) instead of binary search.',
        'Not handling the fully-sorted (zero rotation) case, which this approach handles naturally but is easy to break with special-casing.',
      ],
      followUpQuestions: [
        'How does this change if the array can contain duplicate values (LeetCode "Find Minimum in Rotated Sorted Array II")?',
        'How would you find the index of the minimum (the rotation count) instead of its value?',
        'How would you combine this with "Search in Rotated Sorted Array" to solve target search in one pass?',
      ],
      similarQuestions: ['Find Minimum in Rotated Sorted Array II', 'Search in Rotated Sorted Array', 'Find Peak Element'],
    },
  },
  {
    detail: {
      id: 'dsa-coding-m8-10',
      questionNumber: 'DSACODE-M8-10',
      title: 'Search a 2D Matrix',
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
        'Given an m x n matrix where each row is sorted left-to-right and each column is sorted top-to-bottom, determine whether a target value exists in the matrix.',
      input: 'matrix: number[][] — rows sorted ascending, columns sorted ascending; target: number',
      output: 'boolean — true if target exists anywhere in matrix',
      constraints: ['1 <= m, n <= 300', '-10^9 <= matrix[i][j], target <= 10^9'],
      examples: [
        { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true', explanation: '3 is present at (0,1).' },
        { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'false', explanation: '13 does not appear in the matrix.' },
        { input: 'matrix = [[5]], target = 5', output: 'true', explanation: 'Single-cell match.' },
      ],
      edgeCases: [
        { case: 'Target smaller than every element', expected: 'Returns false without scanning the whole matrix' },
        { case: 'Target larger than every element', expected: 'Returns false' },
        { case: 'Single-cell matrix', expected: 'Handled the same as any other case' },
      ],
      functionName: 'searchMatrix2D',
      isClassBased: false,
      sampleTests: [
        { input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3], expectedOutput: true, description: 'target present in the first row' },
        { input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13], expectedOutput: false, description: 'target not present' },
        { input: [[[5]], 5], expectedOutput: true, description: 'single-cell match' },
        { input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 0], expectedOutput: false, description: 'target smaller than every element' },
      ],
    },
    hints: {
      hints: [
        'Start at the top-right corner: from there, moving left decreases the value and moving down increases it — a natural "staircase" search direction.',
        'If the current cell is smaller than the target, that whole row (everything to its left) is too small, so move down. If larger, that whole column (everything below) is too large, so move left.',
        'This eliminates one row or one column per step, giving O(m + n) — no need to binary search each row independently.',
      ],
    },
    solution: {
      algorithm:
        'Start at row=0, col=lastColumn (top-right corner). While within bounds: if matrix[row][col] === target, return true. If it is less than target, the entire row to the left is also too small, so move down (row++). If it is greater than target, the entire column below is also too large, so move left (col--). Return false if the pointers walk off the matrix.',
      dryRun:
        'matrix=[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target=3, row=0,col=3\nmatrix[0][3]=7>3 → col=2\nmatrix[0][2]=5>3 → col=1\nmatrix[0][1]=3===3 → return true',
      javascriptSolution: `function searchMatrix2D(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  let row = 0;
  let col = matrix[0].length - 1;

  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] < target) {
      row++;
    } else {
      col--;
    }
  }

  return false;
}`,
      typescriptSolution: `function searchMatrix2D(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0]!.length === 0) return false;

  let row = 0;
  let col = matrix[0]!.length - 1;

  while (row < matrix.length && col >= 0) {
    const cell = matrix[row]![col]!;
    if (cell === target) return true;
    if (cell < target) {
      row++;
    } else {
      col--;
    }
  }

  return false;
}`,
      timeComplexity: 'O(m + n) — each step eliminates exactly one row or one column.',
      spaceComplexity: 'O(1) — two pointer variables.',
      commonMistakes: [
        'Starting from the top-left corner, where both directions (right and down) increase the value, giving no way to eliminate a row/column deterministically.',
        'Treating this the same as the fully-sorted-as-one-sequence variant (LeetCode 74, where the last element of each row is less than the first of the next) and using flat-index binary search — that only works when rows/columns are globally ordered, which is not guaranteed here.',
        'Not guarding against an empty matrix or empty first row before reading matrix[0].length.',
      ],
      followUpQuestions: [
        'How does the solution differ for LeetCode 74, where the entire matrix is globally sorted as if flattened into one array?',
        'How would you count the number of elements less than or equal to target instead of just checking existence?',
        'How would you find the kth smallest element in such a matrix?',
      ],
      similarQuestions: ['Search a 2D Matrix II', 'Kth Smallest Element in a Sorted Matrix', 'Search Insert Position'],
    },
  },
];
