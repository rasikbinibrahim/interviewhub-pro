# Q6543 · Trapping Rain Water (Two Pointers Max Left & Right)

**Difficulty:** Hard  
**Companies Asked:** Amazon, Meta, Google, Microsoft, Bloomberg  
**Interview Frequency:** ★★★★★  
**Category:** Arrays  
**Concepts:** arrays, two-pointers, stack, dynamic-programming  

## Problem Statement

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

## Input

- `height`: `number[]` — elevation map bar heights

## Output

- `number` — total units of trapped rain water

## Constraints

- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `height = [0,1,0,2,1,0,1,3,2,1,2,1]` | `6` | 6 units of water trapped between elevation peaks |
| `height = [4,2,0,3,2,5]` | `9` | 9 units of water trapped |

## Edge Cases

- `n < 3` (cannot trap water with fewer than 3 bars) -> returns `0`
- Monotonically increasing or decreasing heights `[1, 2, 3, 4]` -> returns `0`

## Hints

1. **Water at Index `i` Formula**: Water trapped at bar `i` = `Math.max(0, Math.min(maxLeft, maxRight) - height[i])`.
2. **Two Pointers Approach O(1) Space**: Place `left = 0` and `right = n - 1`. Maintain `maxLeft = 0` and `maxRight = 0`.
3. If `height[left] <= height[right]`:
   - If `height[left] >= maxLeft`, update `maxLeft = height[left]`.
   - Else, add `maxLeft - height[left]` to `totalWater`.
   - Advance `left++`.
4. Else (`height[left] > height[right]`):
   - If `height[right] >= maxRight`, update `maxRight = height[right]`.
   - Else, add `maxRight - height[right]` to `totalWater`.
   - Shrink `right--`.

## Algorithm

**Pattern:** Two Pointers Shrinking Boundary Extremes  
**Core Insight:** Since trapped water at any bar is bottlenecked by the smaller of `maxLeft` and `maxRight`, moving the pointer with the smaller boundary inward guarantees exact water calculations without precomputing full prefix/suffix arrays.

## Dry Run

`height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`:
- `left = 0`, `right = 11`. `maxLeft = 0`, `maxRight = 0`, `water = 0`.
- `h[0] (0) <= h[11] (1)` -> `maxLeft = max(0, 0) = 0`. `left = 1`.
- `h[1] (1) <= h[11] (1)` -> `maxLeft = max(0, 1) = 1`. `left = 2`.
- `h[2] (0) <= h[11] (1)` -> `water += 1 - 0 = 1`. `left = 3`.
- ... Continues until `left === right`. Final `water = 6`.

## JavaScript Solution

```js
function trap(height) {
  if (height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  let maxLeft = 0;
  let maxRight = 0;
  let totalWater = 0;

  while (left < right) {
    if (height[left] <= height[right]) {
      if (height[left] >= maxLeft) {
        maxLeft = height[left];
      } else {
        totalWater += maxLeft - height[left];
      }
      left++;
    } else {
      if (height[right] >= maxRight) {
        maxRight = height[right];
      } else {
        totalWater += maxRight - height[right];
      }
      right--;
    }
  }

  return totalWater;
}
```

## TypeScript Solution

```ts
function trap(height: number[]): number {
  if (height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  let maxLeft = 0;
  let maxRight = 0;
  let totalWater = 0;

  while (left < right) {
    if (height[left] <= height[right]) {
      if (height[left] >= maxLeft) {
        maxLeft = height[left];
      } else {
        totalWater += maxLeft - height[left];
      }
      left++;
    } else {
      if (height[right] >= maxRight) {
        maxRight = height[right];
      } else {
        totalWater += maxRight - height[right];
      }
      right--;
    }
  }

  return totalWater;
}
```

## Time Complexity

`O(N)` — single pass through `height` array with two pointers.

## Space Complexity

`O(1)` — constant space.

## Common Mistakes

- Using nested loops to find max left and right boundaries for every index ($O(N^2)$), causing TLE.

## Follow-Up Questions

1. How would you solve Trapping Rain Water II in a 3D matrix elevation grid? (Use a Min-Heap / Priority Queue).

## Similar Questions

- Container With Most Water
- Product of Array Except Self
