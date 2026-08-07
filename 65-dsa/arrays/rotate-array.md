# Q108 · Rotate Array

**Difficulty:** Medium
**Companies Asked:** Amazon, Microsoft, Google, Apple
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Arrays
**Concepts:** in-place rotation, three-reversal trick, modulo normalization

## Problem Statement

Given an array `nums` and a non-negative integer `k`, rotate the array
to the right by `k` steps — in-place, using O(1) extra space (not
counting the input array itself).

## Input

- `nums`: an array of integers
- `k`: a non-negative integer, the number of steps to rotate right (may
  be larger than `nums.length`)

## Output

Nothing is returned — `nums` is mutated in-place to reflect the
right-rotated order.

## Constraints

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `0 <= k <= 10^5`
- Must run in O(1) extra space.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1, 2, 3, 4, 5, 6, 7], k = 3` | `[5, 6, 7, 1, 2, 3, 4]` | The last 3 elements wrap around to the front |
| `nums = [-1, -100, 3, 99], k = 2` | `[3, 99, -1, -100]` | The last 2 elements wrap around to the front |
| `nums = [1, 2], k = 3` | `[2, 1]` | `k` exceeds `nums.length`; effectively `k % 2 = 1` |

## Edge Cases

- `k = 0` → array unchanged
- `k` is an exact multiple of `nums.length` (e.g. `k = 7` for a
  length-7 array) → array unchanged, since a full rotation returns to
  the original order
- `k > nums.length` → must normalize `k` via `k % nums.length` first, or
  the naive rotation logic does far more work than necessary (or reads
  out of bounds if implemented incorrectly)
- Single-element array → any `k` leaves it unchanged

## Hints

1. Rotating by shifting one element at a time, `k` times, is correct but
   O(n·k) — for large `k` (even after normalizing) that's wasted work.
   What single transformation of the *whole* array, applied a constant
   number of times, could produce the same result?
2. If you reverse the entire array, the last `k` elements (which need to
   end up at the front) are now at the front — but each of those
   segments is now internally backwards.
3. Reversing the array as a whole, then separately reversing each of the
   two resulting segments (`[0, k)` and `[k, n)`), restores the correct
   internal order within each segment while keeping the global
   rotation — three reversals, each O(n), for O(n) total instead of
   O(n·k).

## Algorithm

**Pattern:** the three-reversal rotation trick.
**Core insight:** normalize `k = k % n` first (rotating by a full array
length is a no-op). Reversing the *entire* array moves the last `k`
elements to the front, but leaves both the front segment and the back
segment internally reversed. Reversing each segment independently
(`[0, k)` and `[k, n)`) undoes that local reversal while preserving the
global rotation achieved by the first reversal — three O(n) reversals
combine into an O(n) in-place rotation with no extra array.
**Invariant:** after the first (whole-array) reversal, the elements that
belong in the final output's front `k` positions are already in that
region, just in reverse order; the second and third reversals only fix
internal ordering, never move elements between regions again.

## Dry Run

**Input:** `nums = [1, 2, 3, 4, 5, 6, 7]`, `k = 3`

| Step | Action | Result |
|---|---|---|
| 0 | Normalize `k` | `k = 3 % 7 = 3` |
| 1 | Reverse entire array `[0, 7)` | `[7, 6, 5, 4, 3, 2, 1]` |
| 2 | Reverse first `k` elements `[0, 3)` | `[5, 6, 7, 4, 3, 2, 1]` |
| 3 | Reverse remaining elements `[3, 7)` | `[5, 6, 7, 1, 2, 3, 4]` |

**Result:** `[5, 6, 7, 1, 2, 3, 4]` — matches expected output.

## JavaScript Solution

```js
function reverseRange(arr, start, end) {
  // Manual two-pointer reversal of arr[start..end] inclusive, in-place.
  while (start < end) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

function rotate(nums, k) {
  const n = nums.length;
  const steps = k % n; // rotating by a full array length is a no-op

  if (steps === 0) return nums;

  reverseRange(nums, 0, n - 1);
  reverseRange(nums, 0, steps - 1);
  reverseRange(nums, steps, n - 1);

  return nums;
}
```

## TypeScript Solution

```ts
function reverseRange(arr: number[], start: number, end: number): void {
  let left = start;
  let right = end;

  while (left < right) {
    const leftVal = arr[left]!;
    const rightVal = arr[right]!;
    arr[left] = rightVal;
    arr[right] = leftVal;
    left++;
    right--;
  }
}

function rotate(nums: number[], k: number): number[] {
  const n = nums.length;
  const steps = k % n;

  if (steps === 0) return nums;

  reverseRange(nums, 0, n - 1);
  reverseRange(nums, 0, steps - 1);
  reverseRange(nums, steps, n - 1);

  return nums;
}
```

## Time Complexity

O(n) — each of the three reversals is O(n), and each element is touched
a constant number of times total (at most twice: once in the full
reversal, once in exactly one of the two segment reversals).

## Space Complexity

O(1) — rotation happens entirely in-place via swaps; no second array.

## Common Mistakes

- Forgetting to normalize `k` with `k % n` first — when `k > n`, this
  either does unnecessary repeated work (in a shift-by-one approach) or
  produces incorrect segment boundaries in the reversal approach.
- Allocating a new array and copying elements into rotated positions —
  correct, but O(n) space, which violates the stated constraint.
- Off-by-one errors in the segment boundaries — reversing `[0, k)` and
  `[k, n)` (correct) versus accidentally reversing `[0, k]` and
  `[k, n)`, which double-processes the element at index `k`.
- Reversing the two segments *before* reversing the whole array —
  order matters; the whole-array reversal must happen first to place
  elements in their correct regions before the segment reversals fix
  internal order.

## Interview Follow-up Questions

1. How would you rotate *left* by `k` instead of right — what changes
   in the three-reversal approach?
2. How does this technique generalize to rotating a 2D matrix (image
   rotation)?
3. There's also an O(n) cyclic-replacement approach that moves each
   element directly to its final position using a greatest-common-divisor
   argument — what's the tradeoff between that and the three-reversal
   approach in terms of clarity versus elegance?
4. How would you handle this if `nums` were a fixed-size circular buffer
   instead of a plain array — would you even need to move any elements?

## Similar Questions

- Reverse Words in a String (uses the same "reverse the whole, then
  reverse the parts" trick)
- Rotate Image (matrix rotation)
- Rotate List (the linked-list equivalent of this problem)

---
[← Back to Arrays](README.md) · [← Back to 65-dsa](../README.md)
