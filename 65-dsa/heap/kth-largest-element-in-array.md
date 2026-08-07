# Q6503 · Kth Largest Element in an Array

**Difficulty:** Medium  
**Companies Asked:** Meta, Amazon, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Heap  
**Concepts:** heap, min-heap, priority-queue, quick-select, divide-and-conquer  

## Problem Statement

Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.

Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.

Can you solve it without sorting the array in `O(n log k)` or `O(n)` average time complexity?

## Input

- `nums`: `number[]` — unsorted array of integers
- `k`: `number` — 1-indexed target position from largest

## Output

- `number` — the `k`th largest value.

## Constraints

- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [3,2,1,5,6,4], k = 2` | `5` | Sorted order: `[1,2,3,4,5,6]`. 2nd largest is `5`. |
| `nums = [3,2,3,1,2,4,5,5,6], k = 4` | `4` | Sorted order: `[1,2,2,3,3,4,5,5,6]`. 4th largest is `4`. |

## Edge Cases

- `k = 1` (largest element in array)
- `k = nums.length` (smallest element in array)
- All elements identical in array `[2, 2, 2, 2]`

## Hints

1. **Min-Heap Approach**: Maintain a Min-Heap of size `k`. Iterate through `nums`. Push each number to heap. If heap size exceeds `k`, pop the top (smallest element). After iteration, the root of the Min-Heap is the `k`th largest element. Time: `O(N log k)`, Space: `O(k)`.
2. **QuickSelect Approach**: Partition array around a pivot like QuickSort, but recurse only into the side containing index `N - k`. Average Time: `O(N)`, Worst: `O(N^2)`.

## Algorithm

**Pattern:** Min-Heap Priority Queue / QuickSelect  
**Core Insight:** By maintaining a Min-Heap capped at size `k`, the heap continuously discards smaller elements, retaining only the `k` largest values seen so far. The minimum of these top `k` values (located at the root) is exactly the `k`th largest element.

## Dry Run

`nums = [3,2,1,5,6,4]`, `k = 2`:
- Min-Heap `heap = []`
- `x = 3`: push -> `heap = [3]`
- `x = 2`: push -> `heap = [2, 3]`
- `x = 1`: push -> `heap = [1, 3, 2]` -> size > 2 -> pop top `1` -> `heap = [2, 3]`
- `x = 5`: push -> `heap = [2, 3, 5]` -> size > 2 -> pop top `2` -> `heap = [3, 5]`
- `x = 6`: push -> `heap = [3, 5, 6]` -> size > 2 -> pop top `3` -> `heap = [5, 6]`
- `x = 4`: push -> `heap = [4, 6, 5]` -> size > 2 -> pop top `4` -> `heap = [5, 6]`
- Return `heap.peek()` -> `5`.

## JavaScript Solution

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp();
  }

  pop() {
    if (this.size() === 0) return undefined;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = bottom;
      this._bubbleDown();
    }
    return top;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  _bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] >= this.heap[parentIdx]) break;
      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }

  _bubbleDown() {
    let idx = 0;
    const len = this.heap.length;
    while (idx * 2 + 1 < len) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = left;

      if (right < len && this.heap[right] < this.heap[left]) {
        smallest = right;
      }

      if (this.heap[idx] <= this.heap[smallest]) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}

function findKthLargest(nums, k) {
  const minHeap = new MinHeap();

  for (const num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }

  return minHeap.peek();
}
```

## TypeScript Solution

```ts
class MinHeap {
  private heap: number[] = [];

  push(val: number): void {
    this.heap.push(val);
    this._bubbleUp();
  }

  pop(): number | undefined {
    if (this.size() === 0) return undefined;
    const top = this.heap[0];
    const bottom = this.heap.pop()!;
    if (this.size() > 0) {
      this.heap[0] = bottom;
      this._bubbleDown();
    }
    return top;
  }

  peek(): number {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  private _bubbleUp(): void {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] >= this.heap[parentIdx]) break;
      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }

  private _bubbleDown(): void {
    let idx = 0;
    const len = this.heap.length;
    while (idx * 2 + 1 < len) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = left;

      if (right < len && this.heap[right] < this.heap[left]) {
        smallest = right;
      }

      if (this.heap[idx] <= this.heap[smallest]) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}

function findKthLargest(nums: number[], k: number): number {
  const minHeap = new MinHeap();

  for (const num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }

  return minHeap.peek();
}
```

## Time Complexity

`O(N log k)` — inserting `N` elements into a Min-Heap of maximum size `k`.

## Space Complexity

`O(k)` — space stored inside the Min-Heap.

## Common Mistakes

- Using a Max-Heap of size `N`, requiring `O(N + k log N)` time and `O(N)` space instead of `O(k)` space.
- Sorting the array directly `nums.sort()`, which takes `O(N log N)` time.

## Follow-Up Questions

1. How does QuickSelect achieve `O(N)` average time complexity, and how do you avoid `O(N^2)` worst-case performance on sorted arrays? (Randomized pivot choice).

## Similar Questions

- Kth Smallest Element in a Sorted Matrix
- Top K Frequent Elements
