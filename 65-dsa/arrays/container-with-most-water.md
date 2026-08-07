# Q6518 · Container With Most Water (Two Pointers)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Adobe  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, two-pointers, greedy  

## Problem Statement

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

## Input

- `height`: `number[]` — array of vertical line heights

## Output

- `number` — maximum area of water stored

## Constraints

- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `height = [1,8,6,2,5,4,8,3,7]` | `49` | Lines at index 1 (height 8) and index 8 (height 7) give width 7, height min(8, 7) = 7, area = 49 |
| `height = [1,1]` | `1` | Width 1, height min(1, 1) = 1, area = 1 |

## Edge Cases

- `n = 2` (minimum allowed array length)
- Heights containing zeros `[0, 2]` -> area `0`

## Hints

1. **Two Pointers Approach**: Place `left` pointer at index `0` and `right` pointer at index `n - 1`.
2. The width between pointers is `right - left`. The height is constrained by the shorter line `Math.min(height[left], height[right])`.
3. Compute `area = width * minHeight` and update `maxArea`.
4. Greedy Choice: Move the pointer pointing to the shorter height inward (`left++` if `height[left] < height[right]` else `right--`). Moving the taller line inward could never yield a larger area because width decreases while height remains limited by the shorter line.

## Algorithm

**Pattern:** Two Pointers Shrinking Window  
**Core Insight:** At any state, moving the pointer with the larger height inward cannot increase the area because width shrinks and height is capped by the shorter line. Thus, moving the shorter line inward is the only choice that can potentially find a larger area.

## Dry Run

`height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`:
- `left = 0` (h=1), `right = 8` (h=7). Width = 8. Area = 8 * min(1, 7) = 8. `maxArea = 8`.
- `height[0] < height[8]` -> `left = 1`.
- `left = 1` (h=8), `right = 8` (h=7). Width = 7. Area = 7 * min(8, 7) = 49. `maxArea = 49`.
- `height[8] < height[1]` -> `right = 7`.
- ... Continues until `left === right`. Final `maxArea = 49`.

## JavaScript Solution

```js
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const area = width * currentHeight;

    if (area > maxWater) {
      maxWater = area;
    }

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}
```

## TypeScript Solution

```ts
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const area = width * currentHeight;

    if (area > maxWater) {
      maxWater = area;
    }

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}
```

## Time Complexity

`O(N)` — single pass with two pointers moving towards each other.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Using nested loops checking every pair ($O(N^2)$), causing Time Limit Exceeded (TLE) for $N = 10^5$.

## Follow-Up Questions

1. How would you solve Trapping Rain Water, where water can accumulate across multiple adjacent bars?

## Similar Questions

- Trapping Rain Water
- Two Sum II - Input Array Is Sorted
