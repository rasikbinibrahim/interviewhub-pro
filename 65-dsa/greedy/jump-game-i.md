# Q6507 · Jump Game I (Greedy Reachability)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Greedy  
**Concepts:** greedy, array, reachability, linear-scan  

## Problem Statement

You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return `true` if you can reach the last index, or `false` otherwise.

## Input

- `nums`: `number[]` — array of non-negative integers

## Output

- `boolean` — `true` if last index is reachable, `false` otherwise.

## Constraints

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [2,3,1,1,4]` | `true` | Jump 1 step from index 0 to 1, then 3 steps to last index |
| `nums = [3,2,1,0,4]` | `false` | You will always arrive at index 3. Its max jump is 0, blocking progress |

## Edge Cases

- Single element array `[0]` -> returns `true` (already at last index)
- First element `nums[0] = 0` (and `length > 1`) -> returns `false`

## Hints

1. Track the `maxReach` index achievable at any point in time.
2. Iterate `i` from `0` to `nums.length - 1`.
3. If current index `i > maxReach`, you are stuck; return `false`.
4. Update `maxReach = Math.max(maxReach, i + nums[i])`. If `maxReach >= nums.length - 1`, return `true`.

## Algorithm

**Pattern:** Greedy Max Reach Tracking  
**Core Insight:** At index `i`, the maximum index we can reach is `i + nums[i]`. By continuously updating `maxReach = max(maxReach, i + nums[i])` as we iterate, if we ever encounter `i > maxReach`, a zero-jump barrier has blocked us.

## Dry Run

`nums = [2, 3, 1, 1, 4]`:
- `i = 0`: `maxReach = max(0, 0 + 2) = 2`.
- `i = 1`: `1 <= 2`. `maxReach = max(2, 1 + 3) = 4`.
- `maxReach (4) >= last index (4)` -> return `true`.

## JavaScript Solution

```js
function canJump(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) {
      return false;
    }
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }

  return true;
}
```

## TypeScript Solution

```ts
function canJump(nums: number[]): boolean {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) {
      return false;
    }
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }

  return true;
}
```

## Time Complexity

`O(N)` — single pass through the array.

## Space Complexity

`O(1)` — constant extra space.

## Common Mistakes

- Using recursive backtracking / DP (`O(2^N)` or `O(N^2)`), causing memory/time timeouts.
- Forgetting to check if `i > maxReach` before updating `maxReach`.

## Follow-Up Questions

1. Jump Game II: How do you calculate the minimum number of jumps required to reach the last index?

## Similar Questions

- Jump Game II
- Gas Station
