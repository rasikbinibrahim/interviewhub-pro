# Q904 · Koko Eating Bananas

**Difficulty:** Medium
**Companies Asked:** Google, Amazon, Microsoft
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Binary Search
**Concepts:** binary search on the answer space, feasibility check

## Problem Statement

There are `piles` of bananas, `piles[i]` bananas in the `i`-th pile.
Koko can eat at most one pile per hour, at a chosen constant speed `k`
bananas per hour: if a pile has fewer than `k` bananas left, she finishes
that pile in that hour and doesn't start another; if it has `k` or more,
she eats exactly `k` and the rest remain for a later hour. Given `h`
hours until the piles must all be finished, return the minimum integer
eating speed `k` that lets Koko finish all piles within `h` hours.

## Input

- `piles`: an array of positive integers
- `h`: the number of hours available, `piles.length <= h`

## Output

A single integer: the minimum eating speed `k` that finishes all piles
within `h` hours.

## Constraints

- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Examples

| Input | Output | Why |
|---|---|---|
| `piles = [3,6,7,11], h = 8` | `4` | At speed 4: hours = ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8, exactly fits |
| `piles = [30,11,23,4,20], h = 5` | `30` | Only 5 hours for 5 piles — must finish each pile in exactly one hour, so speed must cover the largest pile |
| `piles = [30,11,23,4,20], h = 6` | `23` | One extra hour allows a slightly lower speed |

## Edge Cases

- `h === piles.length` (minimum possible hours) → speed must be at
  least the size of the largest pile, since each pile gets exactly one
  hour
- A single pile → the answer is `ceil(pile / h)`... more precisely, the
  minimum speed to finish that one pile within `h` hours
- `h` far larger than `piles.length` → a very low speed (as low as `1`)
  might already suffice

## Hints

1. Trying every possible speed from `1` upward and checking feasibility
   is correct but potentially slow — what property does "can Koko finish
   in time at speed k" have as `k` increases?
2. If speed `k` is fast enough to finish within `h` hours, any speed
   *faster* than `k` is also fast enough — feasibility is monotonic in
   `k`. That monotonic structure is exactly what binary search exploits,
   even though the "array" being searched here is really the range of
   possible speeds, not an actual array.
3. Binary search over the range `[1, max(piles)]`: for a candidate speed
   `mid`, compute the total hours needed (`sum of ceil(pile / mid)` for
   each pile) — if that's `<= h`, `mid` is feasible and you should try
   an even smaller speed; otherwise `mid` is too slow and you need a
   larger one.

## Algorithm

**Pattern:** binary search on the answer space (not on an array).
**Core insight:** the question "can Koko finish within `h` hours at
speed `k`?" is a boolean feasibility check with a monotonic property —
every speed faster than a working speed also works, and every speed
slower than a failing speed also fails. That monotonicity is exactly
what binary search requires, even though there's no sorted array being
searched — the search space is the range of possible integer speeds,
from `1` up to the largest pile size (a speed larger than the biggest
pile is never useful, since finishing a pile always takes at least one
hour regardless of how much faster you go beyond its size).
**Invariant:** at every step, the true minimum feasible speed is
guaranteed to lie within `[left, right]` — a speed proven feasible moves
`right` down to it (since a strictly smaller feasible speed might still
exist), and a speed proven infeasible moves `left` above it.

## Dry Run

**Input:** `piles = [3,6,7,11]`, `h = 8`

| left | right | mid | hours needed at speed mid | Feasible (`<= 8`)? | Action |
|---|---|---|---|---|---|
| 1 | 11 | 6 | ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 | yes | `right = 6` |
| 1 | 6 | 3 | ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 | no | `left = 4` |
| 4 | 6 | 5 | ceil(3/5)+ceil(6/5)+ceil(7/5)+ceil(11/5) = 1+2+2+3 = 8 | yes | `right = 5` |
| 4 | 5 | 4 | ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 | yes | `right = 4` |
| 4 | 4 | — | — | — | `left === right`, loop ends |

**Result:** `4` — matches expected output.

## JavaScript Solution

```js
function hoursNeeded(piles, speed) {
  let hours = 0;
  for (const pile of piles) {
    hours += Math.ceil(pile / speed);
  }
  return hours;
}

function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (hoursNeeded(piles, mid) <= h) {
      // mid works — a smaller speed might also work, keep mid as a
      // candidate rather than excluding it.
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
```

## TypeScript Solution

```ts
function hoursNeeded(piles: readonly number[], speed: number): number {
  let hours = 0;
  for (const pile of piles) {
    hours += Math.ceil(pile / speed);
  }
  return hours;
}

function minEatingSpeed(piles: readonly number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (hoursNeeded(piles, mid) <= h) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
```

## Time Complexity

O(n log m) — where `n` is the number of piles and `m` is the largest
pile size; each of the O(log m) binary search steps does an O(n)
feasibility check.

## Space Complexity

O(1) — a fixed number of scalar variables (excluding the input array).

## Common Mistakes

- Linearly trying every speed starting from `1` until one works — correct
  but O(m * n) in the worst case, far slower than binary search.
- Using `Math.floor(pile / speed)` instead of `Math.ceil` — a partial
  pile still consumes a full hour, since Koko can't start a new pile in
  the same hour.
- Setting `right = mid - 1` when `mid` is feasible — this incorrectly
  excludes `mid`, which could itself be the true minimum feasible speed.
- Setting the upper bound of the search range too low (e.g. to the sum
  of all piles instead of the maximum single pile) — any speed at or
  above the largest pile size already finishes every pile in one hour
  each, so speeds beyond `max(piles)` are never needed.

## Interview Follow-up Questions

1. How would this change if Koko could eat from *two* piles in the same
   hour, splitting her speed between them?
2. What's the general pattern for recognizing when a problem is
   "binary search on the answer" rather than binary search on a literal
   array?
3. How would you extend this to minimize the *total number of hours* for
   a *given* speed, then binary search speed against that?

## Similar Questions

- Binary Search (see [binary-search.md](binary-search.md))
- Capacity To Ship Packages Within D Days
- Split Array Largest Sum

---
[← Back to Binary Search](README.md) · [← Back to 65-dsa](../README.md)
