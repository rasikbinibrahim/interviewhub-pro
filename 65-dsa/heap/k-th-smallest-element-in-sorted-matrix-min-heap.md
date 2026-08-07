# Q6604 · Kth Smallest Element in a Sorted Matrix (Min-Heap / Binary Search)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Heap  
**Concepts:** heap, min-heap, binary-search, matrix  

## Problem Statement

Given an `n x n` `matrix` where each of the rows and columns is sorted in ascending order, return the `k`th smallest element in the matrix.

Note that it is the `k`th smallest element **in the sorted order**, not the `k`th distinct element.

You must find a solution with a memory complexity better than `O(n^2)`.

## Input

- `matrix`: `number[][]` — 2D matrix sorted in rows and columns
- `k`: `number` — 1-based target rank

## Output

- `number` — value of the $k$-th smallest element

## Examples

| Input | Output | Why |
|---|---|---|
| `matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8` | `13` | Sorted elements: [1,5,9,10,11,12,13,13,15], 8th element is 13 |

## Algorithm

**Pattern:** Binary Search Range Search on Value Range  
**Core Insight:** Binary search between `matrix[0][0]` (low) and `matrix[n-1][n-1]` (high). Count elements $\le mid$ in $O(N)$ time per step using staircase matrix search.

```javascript
function kthSmallest(matrix, k) {
  const n = matrix.length;
  let low = matrix[0][0];
  let high = matrix[n - 1][n - 1];

  function countLessEqual(mid) {
    let count = 0;
    let r = n - 1;
    let c = 0;

    while (r >= 0 && c < n) {
      if (matrix[r][c] <= mid) {
        count += (r + 1);
        c++;
      } else {
        r--;
      }
    }
    return count;
  }

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (countLessEqual(mid) < k) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N \log(\text{max} - \text{min}))` — binary search iterations with $O(N)$ count steps.
- **Space Complexity:** `O(1)` — constant extra space.
