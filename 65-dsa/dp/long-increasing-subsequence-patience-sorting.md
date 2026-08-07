# Q6625 · Longest Increasing Subsequence (Patience Sorting & Binary Search O(N log N))

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★☆
**Category:** Dynamic Programming
**Concepts:** dp, binary-search, patience-sorting

## Problem Statement

Write a function `lengthOfLIS(nums)` that returns the length of the
longest strictly increasing subsequence of `nums` (values don't need to
be contiguous, but must keep their original relative order), in
O(n log n) time.

## Input

`nums`: an array of integers.

## Output

A single number: the length of the longest strictly increasing
subsequence.

## Constraints

`1 <= nums.length <= 2500`, `-10^4 <= nums[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `[10,9,2,5,3,7,101,18]` | `4` | e.g. `2,3,7,18` or `2,3,7,101` — both length 4 |
| `[0,1,0,3,2,3]` | `4` | e.g. `0,1,2,3` |
| `[7,7,7,7]` | `1` | Strictly increasing means equal values can't both be included |

## Edge Cases

- Single-element array → `1`
- Strictly decreasing array → `1` (no two elements can extend a
  subsequence)
- All elements equal → `1` (equal values don't count as "increasing")
- Already strictly increasing array → the full array length

## Hints

1. A classic O(n²) DP tracks, for each index `i`, the length of the
   longest increasing subsequence *ending* at `i` — correct, but can you
   do better than checking every pair of indices?
2. Maintain an auxiliary array `tails`, where `tails[k]` holds the
   *smallest possible tail value* of any increasing subsequence of
   length `k + 1` found so far. Smaller tail values are always at least
   as good, since they leave more room for future elements to extend the
   subsequence.
3. For each new number, use binary search to find where it belongs in
   `tails`: if it's larger than every current tail, it extends the
   longest subsequence found so far (append it); otherwise, it can
   improve (lower) the tail value of some existing subsequence length —
   find that position and overwrite it.

## Algorithm

**Pattern:** patience sorting with binary search (`tails` array of
smallest-possible subsequence endings).
**Core insight:** the *length* of the longest increasing subsequence
doesn't depend on which exact values were used to build it — only on
how small its ending value can be kept, since a smaller ending value
gives future numbers more room to extend it. `tails` maintains, for
every achievable subsequence length, the smallest tail value seen so
far; because `tails` is always sorted, binary search finds in O(log n)
either "this number extends the longest subsequence" (it's bigger than
every tail) or "this number can improve an existing subsequence's tail"
(replace the first tail value that's `>=` it). The final length of
`tails` is the answer — note that `tails` itself doesn't necessarily
hold a *real* subsequence, only correct length information.
**Invariant:** at all times, `tails[k]` holds the smallest possible tail
value among all increasing subsequences of length `k + 1` discovered in
the prefix of `nums` processed so far, and `tails` is always sorted in
ascending order.

## Dry Run

**Input:** `nums = [10,9,2,5,3,7,101,18]`

| x | binary search finds position | tails after |
|---|---|---|
| 10 | 0 (empty) | `[10]` |
| 9 | 0 (9 < 10) | `[9]` |
| 2 | 0 (2 < 9) | `[2]` |
| 5 | 1 (append, 5 > 2) | `[2,5]` |
| 3 | 1 (3 < 5) | `[2,3]` |
| 7 | 2 (append, 7 > 3) | `[2,3,7]` |
| 101 | 3 (append, 101 > 7) | `[2,3,7,101]` |
| 18 | 3 (18 < 101) | `[2,3,7,18]` |

**Result:** `tails.length = 4` — matches expected output.

## JavaScript Solution

```js
function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < x) left = mid + 1;
      else right = mid;
    }
    tails[left] = x;
  }
  return tails.length;
}
```

## TypeScript Solution

```ts
function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];
  for (const x of nums) {
    let left = 0;
    let right: number = tails.length;
    while (left < right) {
      const mid: number = Math.floor((left + right) / 2);
      if (tails[mid] < x) left = mid + 1;
      else right = mid;
    }
    tails[left] = x;
  }
  return tails.length;
}
```

## Time Complexity

O(n log n) — for each of the `n` elements, a binary search over `tails`
(which never exceeds length `n`) costs O(log n).

## Space Complexity

O(n) — the `tails` array, in the worst case (a fully increasing input)
grows to the same length as `nums`.

## Common Mistakes

- Using the classic O(n²) DP (`dp[i]` = LIS ending at `i`, checking
  every earlier index) — correct, but far slower than the O(n log n)
  patience-sorting approach for large inputs.
- Assuming `tails` itself is a valid increasing subsequence of `nums` —
  it isn't; it only tracks the *smallest achievable tail value* per
  length, and its contents can mix values from different, unrelated
  subsequences.
- Using a plain `<=` instead of `<` in the binary search comparison (or
  vice versa) — this specific search must find the leftmost position
  where `tails[mid] >= x`, since the goal is strictly increasing
  subsequences; an off-by-one here silently allows non-strict
  ("non-decreasing") sequences instead.

## Interview Follow-up Questions

1. How would you reconstruct the actual longest increasing subsequence,
   not just its length?
2. How would this change if the subsequence needed to be
   *non-decreasing* (equal values allowed) instead of strictly
   increasing?
3. Why doesn't `tails` represent a real subsequence, and why does that
   not matter for correctly computing the *length*?

## Similar Questions

- Coin Change I (Minimum Coins) (see [coin-change-1-minimum-coins.md](coin-change-1-minimum-coins.md))
- Standard Iterative Binary Search (see [../../01-programming-fundamentals/pf032-binary-search-iterative.md](../../01-programming-fundamentals/pf032-binary-search-iterative.md))
