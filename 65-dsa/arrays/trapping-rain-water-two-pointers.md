# Q6650 · Trapping Rain Water (Two Pointers O(1) Space)

**Difficulty:** Hard
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★☆
**Category:** Arrays
**Concepts:** arrays, two-pointers, trapping-water

## Problem Statement

Write a function `trap(height)` that, given an array `height` describing
an elevation map (each value the height of a bar of width 1), returns
the total amount of rainwater it can trap between the bars after
raining.

## Input

`height`: an array of non-negative integers, each an elevation.

## Output

A single number: the total volume of water trapped.

## Constraints

`1 <= height.length <= 2*10^4`, `0 <= height[i] <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `[4,2,0,3,2,5]` | `9` | Water pools above the dip between the two tall bars (4 and 5) |
| `[0,1,0,2,1,0,1,3,2,1,2,1]` | `6` | Multiple pockets of trapped water sum to 6 total units |
| `[1,1,1]` | `0` | No dip anywhere — water has nowhere to collect |

## Edge Cases

- Fewer than 3 bars → `0`, since at least three bars are needed to form
  a pocket (a wall on each side and a dip in between)
- Strictly increasing or strictly decreasing heights → `0`, no water can
  be trapped without a wall on both sides
- All bars the same height → `0`
- A single very tall bar surrounded by short ones → water trapped is
  bounded by the *shorter* of the two surrounding maximums, not the
  tallest bar overall

## Hints

1. The water trapped above any single position is bounded by the
   shorter of the tallest bar to its left and the tallest bar to its
   right — computing both of those for every position with nested loops
   works but is O(n²). What if you tracked those two maximums as you go,
   from both ends inward?
2. Whichever side currently has the *smaller* running maximum is the
   side whose water level is already fully determined — its water level
   can never be limited by something taller that hasn't been seen yet on
   the other side.
3. Move the pointer on the side with the smaller running maximum inward,
   accumulating water above it as `runningMax - height[pointer]` (or `0`
   if the current bar is itself a new maximum); repeat until the two
   pointers meet.

## Algorithm

**Pattern:** two pointers converging inward, tracking running maximums
from each side.
**Core insight:** the water level above any position is
`min(tallest bar to the left, tallest bar to the right) - height[here]`
— and the key realization is that whichever side has the *smaller*
running maximum so far already has enough information to be resolved
correctly, regardless of what heights appear later on the *other* side,
because the final water level there can only ever be capped by
`min(leftMax, rightMax)`, and the smaller of the two running maximums is
already known to be the true minimum. This lets the two pointers move
inward independently, each only needing its own side's running maximum,
without ever needing the true global left/right maximum arrays.
**Invariant:** whenever the algorithm processes the side with the
smaller running maximum, that running maximum is guaranteed to already
equal the true bounding height for the water level at the current
pointer position.

## Dry Run

**Input:** `height = [4,2,0,3,2,5]`

| left, right | height[left] vs height[right] | leftMax / rightMax | water added | water total |
|---|---|---|---|---|
| 0, 5 (4, 5) | 4 < 5 → process left | leftMax: 0→4 (new max, no water) | 0 | 0 |
| 1, 5 (2, 5) | 2 < 5 → process left | 2 < leftMax(4) | 4-2=2 | 2 |
| 2, 5 (0, 5) | 0 < 5 → process left | 0 < leftMax(4) | 4-0=4 | 6 |
| 3, 5 (3, 5) | 3 < 5 → process left | 3 < leftMax(4) | 4-3=1 | 7 |
| 4, 5 (2, 5) | 2 < 5 → process left | 2 < leftMax(4) | 4-2=2 | 9 |
| 5, 5 | `left < right` false | — | — | — |

**Result:** `9` — matches expected output.

## JavaScript Solution

```js
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }

  return water;
}
```

## TypeScript Solution

```ts
function trap(height: number[]): number {
  let left = 0;
  let right: number = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }

  return water;
}
```

## Time Complexity

O(n) — each pointer moves inward exactly once, so the total work is
linear in the number of bars.

## Space Complexity

O(1) — four scalar variables, regardless of input size.

## Common Mistakes

- Precomputing full left-max and right-max arrays with two separate
  passes — correct and still O(n) time, but uses O(n) extra space, when
  the two-pointer approach achieves the same result in O(1) space.
- Comparing `height[left]` and `height[right]` but then updating the
  wrong side's running maximum — the running maximum updated must always
  correspond to the pointer being advanced, or the "already resolved"
  invariant breaks.
- Using `>` instead of `>=` when checking whether the current bar is a
  new maximum — with `>`, a bar exactly equal to the running maximum
  incorrectly gets treated as trapping (a false) `0` amount of water
  instead of correctly updating the maximum; in practice both give the
  same trapped total since the difference is exactly `0` either way, but
  `>=` more directly expresses "this bar defines the new wall."

## Interview Follow-up Questions

1. How would you solve this using precomputed left-max/right-max arrays
   instead, and what's the space trade-off versus the two-pointer
   version?
2. How would you adapt this to a 2D elevation map ("Trapping Rain Water
   II"), and why does the two-pointer technique no longer directly
   apply?
3. How would you compute the trapped water incrementally as bars are
   added one at a time, rather than given the whole array upfront?

## Similar Questions

- Container With Most Water (see [../two-pointers/container-with-most-water.md](../two-pointers/container-with-most-water.md))
- Product of Array Except Self (see [product-of-array-except-self.md](product-of-array-except-self.md))
