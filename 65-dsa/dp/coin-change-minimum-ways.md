# Q6627 · House Robber (1D Dynamic Programming)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft
**Interview Frequency:** ★★★★★
**Category:** Dynamic Programming
**Concepts:** dp, house-robber

## Problem Statement

Write a function `rob(nums)` that, given the amount of money stashed in
each house along a street (`nums`), returns the maximum total that can
be robbed without ever robbing two directly adjacent houses (doing so
triggers an alarm).

## Input

`nums`: an array of non-negative integers, the money in each house in
order along the street.

## Output

A single number: the maximum total obtainable without robbing two
adjacent houses.

## Constraints

`0 <= nums.length <= 100`, `0 <= nums[i] <= 400`

## Examples

| Input | Output | Why |
|---|---|---|
| `[2,7,9,3,1]` | `12` | Rob houses at indices 0, 2, 4: `2+9+1=12` |
| `[1,2,3,1]` | `4` | Rob houses at indices 0, 2: `1+3=4` |
| `[]` | `0` | No houses, nothing to rob |

## Edge Cases

- Empty array → `0`
- Single house → that house's value, taken outright
- Two houses → the larger of the two (can't take both, since they're
  adjacent)
- All zeros → `0`, regardless of how many houses

## Hints

1. At each house, you face a choice: rob it (and skip whatever you
   decided for the previous house) or skip it (keeping whatever the best
   total was through the previous house). What's the best total up
   through house `i`, in terms of the best totals through houses `i-1`
   and `i-2`?
2. The best total through house `i` is `max(best total through i-1
   (skip this house), best total through i-2 + nums[i] (rob this house))`.
3. You only ever need the previous two "best total" values to compute
   the next one — no need to keep a full array of results.

## Algorithm

**Pattern:** bottom-up 1D dynamic programming with O(1) space.
**Core insight:** the best achievable total *up through* house `i` only
depends on two possibilities: either house `i` isn't robbed (in which
case the best total is whatever it was through house `i-1`), or it is
robbed (in which case its value adds to the best total through house
`i-2`, since house `i-1` must be skipped). Taking the larger of those two
options at each step, carrying forward only the two most recent results,
solves the whole street in one linear pass without needing to store the
full history.
**Invariant:** after processing house `i`, `prev1` holds the maximum
achievable total using only houses `0..i`, and `prev2` holds the maximum
achievable total using only houses `0..i-1`.

## Dry Run

**Input:** `nums = [2,7,9,3,1]`

| num | temp = max(prev1, prev2+num) | prev2 (after) | prev1 (after) |
|---|---|---|---|
| start | – | 0 | 0 |
| 2 | max(0, 0+2)=2 | 0 | 2 |
| 7 | max(2, 0+7)=7 | 2 | 7 |
| 9 | max(7, 2+9)=11 | 7 | 11 |
| 3 | max(11, 7+3)=11 | 11 | 11 |
| 1 | max(11, 11+1)=12 | 11 | 12 |

**Result:** `prev1 = 12` — matches expected output.

## JavaScript Solution

```js
function rob(nums) {
  let prev1 = 0, prev2 = 0;
  for (const num of nums) {
    const temp = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = temp;
  }
  return prev1;
}
```

## TypeScript Solution

```ts
function rob(nums: number[]): number {
  let prev1 = 0;
  let prev2 = 0;
  for (const num of nums) {
    const temp: number = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = temp;
  }
  return prev1;
}
```

## Time Complexity

O(n) — a single pass over the houses.

## Space Complexity

O(1) — only two running variables, instead of a full O(n) DP array.

## Common Mistakes

- Greedily robbing every other house starting from index 0 — fails
  whenever a better total comes from a different pattern (e.g.
  `[2,1,1,9]`: alternating from index 0 gives houses 0 and 2,
  `2+1=3`, but the true optimum is houses 0 and 3, `2+9=11` — still no
  two adjacent houses, but not the naive alternating pattern).
- Using a full `dp` array when only the last two values are ever needed
  — correct, but O(n) space when O(1) is achievable.
- Forgetting the empty-array and single-element base cases — the loop
  as written actually handles both correctly by initializing `prev1 =
  prev2 = 0`, but it's worth being able to state explicitly why no
  special-casing is needed.

## Interview Follow-up Questions

1. How would this change if the houses were arranged in a *circle*
   (first and last house are now also adjacent)?
2. How would you also return *which* houses were robbed, not just the
   total?
3. How would you adapt this if you could rob at most `k` houses total,
   in addition to the no-adjacent-houses constraint?

## Similar Questions

- Maximum Subarray (Kadane's Algorithm) (see [../arrays/maximum-subarray-kadane.md](../arrays/maximum-subarray-kadane.md))
- Coin Change I (Minimum Coins) (see [coin-change-1-minimum-coins.md](coin-change-1-minimum-coins.md))
