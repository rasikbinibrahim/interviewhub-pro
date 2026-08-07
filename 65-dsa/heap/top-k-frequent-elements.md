# Q6525 · Top K Frequent Elements (Bucket Sort / Min Heap)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Uber  
**Interview Frequency:** ★★★★★  
**Category:** Heap  
**Concepts:** heap, bucket-sort, hash-map, frequency-counter  

## Problem Statement

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

## Input

- `nums`: `number[]` — array of integers
- `k`: `number` — target count of top frequent elements

## Output

- `number[]` — array of `k` most frequent elements

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is in the range `[1, the number of unique elements in the array]`.
- It is guaranteed that the answer is **unique**.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,1,1,2,2,3], k = 2` | `[1, 2]` | 1 appears 3 times, 2 appears 2 times, 3 appears 1 time |
| `nums = [1], k = 1` | `[1]` | Single element |

## Edge Cases

- `k === nums.length` (all elements unique) -> return original elements

## Hints

1. **Step 1**: Build a frequency Map (`num -> count`).
2. **Step 2 (Bucket Sort O(N))**: Create an array of buckets `buckets` where index `i` stores elements appearing `i` times. Array size is `nums.length + 1`.
3. Iterate frequency Map entries, pushing `num` into `buckets[count]`.
4. Traverse `buckets` backwards from `nums.length` down to 0, collecting elements into `result` until `result.length === k`.

## Algorithm

**Pattern:** Bucket Sort Frequency Binning  
**Core Insight:** Since frequency counts are bounded by $1 \dots N$, using bucket indices to represent frequencies guarantees linear $O(N)$ execution, outperforming $O(N \log K)$ Min-Heap solutions.

## Dry Run

`nums = [1,1,1,2,2,3], k = 2`:
- Frequency Map: `{ 1 => 3, 2 => 2, 3 => 1 }`.
- Buckets array size 7:
  - `buckets[3] = [1]`
  - `buckets[2] = [2]`
  - `buckets[1] = [3]`
- Traverse backwards from index 6:
  - `i = 3`: push 1 -> `res = [1]`
  - `i = 2`: push 2 -> `res = [1, 2]` (length == 2 === k) -> return `[1, 2]`.

## JavaScript Solution

```js
function topKFrequent(nums, k) {
  const freqMap = new Map();

  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Bucket sort: index represents frequency count
  const buckets = Array.from({ length: nums.length + 1 }, () => []);

  for (const [num, count] of freqMap.entries()) {
    buckets[count].push(num);
  }

  const result = [];

  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length > 0) {
      for (const num of buckets[i]) {
        result.push(num);
        if (result.length === k) break;
      }
    }
  }

  return result;
}
```

## TypeScript Solution

```ts
function topKFrequent(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();

  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);

  for (const [num, count] of freqMap.entries()) {
    buckets[count].push(num);
  }

  const result: number[] = [];

  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length > 0) {
      for (const num of buckets[i]) {
        result.push(num);
        if (result.length === k) break;
      }
    }
  }

  return result;
}
```

## Time Complexity

`O(N)` — single frequency count pass + single bucket assembly pass.

## Space Complexity

`O(N)` — space for frequency Map and buckets array.

## Common Mistakes

- Sorting entries by frequency (`freqMap.sort(...)`), taking $O(N \log N)$ time complexity.

## Follow-Up Questions

1. Your algorithm's time complexity must be better than $O(N \log N)$. How does Bucket Sort achieve $O(N)$?

## Similar Questions

- Kth Largest Element in an Array
- Sort Characters By Frequency
