# Q6548 · Container With Most Water (Two Pointers Maximize Area)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, two-pointers, greedy, area-optimization  

## Problem Statement

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the **maximum amount of water** a container can store.

Notice that you may not slant the container.

## Input

- `height`: `number[]` — vertical line heights

## Output

- `number` — maximum water volume integer

## Constraints

- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `height = [1,8,6,2,5,4,8,3,7]` | `49` | Max area between line at index 1 (height 8) and index 8 (height 7): min(8,7) * (8-1) = 7 * 7 = 49 |
| `height = [1,1]` | `1` | Area min(1,1) * (1-0) = 1 |

## Edge Cases

- Array length 2 `[1, 1]` -> `1`
- Uniform heights `[5, 5, 5, 5]` -> max area between first and last

## Hints

1. **Two Pointer Greedy Strategy**: Initialize `left = 0`, `right = n - 1`, and `maxArea = 0`.
2. Area equation: `currentArea = Math.min(height[left], height[right]) * (right - left)`.
3. To find a larger area, we MUST increase the height bottleneck! Shrinking the width (`right - left`) without increasing height will always yield a smaller area.
4. If `height[left] < height[right]`, increment `left++`. Otherwise, decrement `right--`.

## Algorithm

**Pattern:** Two Pointers Shrinking Width Greedy Optimization  
**Core Insight:** Moving the pointer pointing to the shorter vertical bar gives us the only chance of finding a taller boundary to offset the reduced container width.

## Dry Run

`height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`:
- `left = 0` (val 1), `right = 8` (val 7): `area = min(1, 7) * 8 = 8`. `maxArea = 8`. `h[0] < h[8]` -> `left = 1`.
- `left = 1` (val 8), `right = 8` (val 7): `area = min(8, 7) * 7 = 49`. `maxArea = 49`. `h[8] < h[1]` -> `right = 7`.
- ... Eventually `left` and `right` meet. Max area remains `49`.

## JavaScript Solution

```js
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxAreaValue = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const currentArea = width * currentHeight;

    maxAreaValue = Math.max(maxAreaValue, currentArea);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxAreaValue;
}
```

## TypeScript Solution

```ts
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxAreaValue = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const currentArea = width * currentHeight;

    maxAreaValue = Math.max(maxAreaValue, currentArea);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxAreaValue;
}
```

## Time Complexity

`O(N)` — single pass through array with two pointers.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Using nested loops checking every pair ($O(N^2)$), causing TLE on $N = 10^5$.

## Follow-Up Questions

1. How does Trapping Rain Water differ from Container With Most Water? (Trapping Rain Water counts individual bar units trapped inside terrain elevation).

## Similar Questions

- Trapping Rain Water
- 3Sum
