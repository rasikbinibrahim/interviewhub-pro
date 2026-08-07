# Q6611 · Rotate Array (In-Place 3-Step Reversal)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, in-place, two-pointers  

## Problem Statement

Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

Solve it **in-place** with $O(1)$ extra space.

## Input

- `nums`: `number[]` — integer array
- `k`: `number` — rotation step count

## Output

- Modifies `nums` in-place (void return)

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,2,3,4,5,6,7], k = 3` | `[5,6,7,1,2,3,4]` | Rotated right by 3 steps |

## Algorithm

**Pattern:** 3-Step In-Place Array Reversal  
1. Normalize `k = k % n`.
2. Reverse entire array (`0` to `n - 1`).
3. Reverse first `k` elements (`0` to `k - 1`).
4. Reverse remaining `n - k` elements (`k` to `n - 1`).

```javascript
function rotate(nums, k) {
  const n = nums.length;
  k = k % n;

  function reverse(start, end) {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  }

  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);
}
```

## Time & Space Complexity

- **Time Complexity:** `O(N)` — 3 linear sub-reversals.
- **Space Complexity:** `O(1)` — in-place pointers.
