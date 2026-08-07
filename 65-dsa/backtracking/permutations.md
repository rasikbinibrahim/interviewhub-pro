# Q6516 · Permutations (Backtracking Pattern)

**Difficulty:** Medium  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Apple  
**Interview Frequency:** ★★★★★  
**Category:** Backtracking  
**Concepts:** backtracking, recursion, permutations, combinations  

## Problem Statement

Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.

## Input

- `nums`: `number[]` — array of distinct integers

## Output

- `number[][]` — 2D array containing all unique permutations

## Constraints

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- All integers of `nums` are unique.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [1,2,3]` | `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]` | Total 3! = 6 permutations |
| `nums = [0,1]` | `[[0,1],[1,0]]` | Total 2! = 2 permutations |
| `nums = [1]` | `[[1]]` | Total 1! = 1 permutation |

## Edge Cases

- Single element array `[1]`

## Hints

1. **Backtracking Decision Tree**: Build a path array `current` step by step.
2. Maintain a boolean `used` array or Set to track elements already included in `current`.
3. If `current.length === nums.length`, push a copy of `current` into `results`.
4. Loop through `nums`: if `nums[i]` is not used, mark `used[i] = true`, push `nums[i]` into `current`, recurse `backtrack()`, then backtrack by popping `nums[i]` and resetting `used[i] = false`.

## Algorithm

**Pattern:** Standard Backtracking State Tree  
**Core Insight:** At each step, choose an unused element from `nums`, branch recursively into child states, and then un-choose (backtrack) to explore alternative choices.

## Dry Run

`nums = [1, 2]`:
- Initial: `current = []`, `used = [false, false]`.
- Loop `i = 0` (val 1): `used[0]=true`, `current=[1]`, recurse.
  - Sub-loop `i = 0` (used) -> skip.
  - Sub-loop `i = 1` (val 2): `used[1]=true`, `current=[1, 2]`, length=2 -> push `[1, 2]` to result. Backtrack -> `current=[1]`, `used[1]=false`.
- Backtrack -> `current=[]`, `used[0]=false`.
- Loop `i = 1` (val 2): `used[1]=true`, `current=[2]`, recurse.
  - Sub-loop `i = 0` (val 1): `used[0]=true`, `current=[2, 1]`, length=2 -> push `[2, 1]` to result. Backtrack.
- Result: `[[1, 2], [2, 1]]`.

## JavaScript Solution

```js
function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]); // Push copy of array
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      current.push(nums[i]);

      backtrack(current);

      current.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
```

## TypeScript Solution

```ts
function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const used: boolean[] = new Array(nums.length).fill(false);

  function backtrack(current: number[]): void {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      current.push(nums[i]);

      backtrack(current);

      current.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
```

## Time Complexity

`O(N * N!)` — total `N!` permutations, taking `O(N)` time to copy each permutation.

## Space Complexity

`O(N)` — call stack depth and auxiliary `used` array space (excluding output array).

## Common Mistakes

- Pushing `result.push(current)` directly instead of a shallow copy `result.push([...current])`, storing references that get mutated upon pop.

## Follow-Up Questions

1. How would you handle input arrays containing duplicate elements to generate unique permutations only? (Permutations II / Sort + Skip duplicates).

## Similar Questions

- Subsets
- Permutations II
- Combination Sum
