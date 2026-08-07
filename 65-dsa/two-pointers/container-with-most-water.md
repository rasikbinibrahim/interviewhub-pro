# Q6644 · Container With Most Water (Two Pointers Shrinking Window)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Two Pointers
**Concepts:** two-pointers, arrays, greedy

## Problem Statement

Write a function `maxArea(height)` that, given an array `height` where
each value is the height of a vertical line at that index, returns the
maximum area of water that can be contained between any two of those
lines (the container's floor is flat; only the two chosen lines and the
horizontal distance between them matter).

## Input

`height`: an array of non-negative integers, at least two elements.

## Output

A single number: the maximum area achievable between any two lines.

## Constraints

`2 <= height.length <= 10^5`, `0 <= height[i] <= 10^4`

## Examples

| Input | Output | Why |
|---|---|---|
| `[1,8,6,2,5,4,8,3,7]` | `49` | Lines at index 1 (height 8) and index 8 (height 7): width 7 × height 7 = 49 |
| `[1,1]` | `1` | Only one possible pair, width 1 × height 1 |
| `[4,3,2,1,4]` | `16` | The two tallest lines (both height 4) are also the widest apart: width 4 × height 4 |

## Edge Cases

- Exactly two elements → the only possible pair, trivially the answer
- All elements equal → the widest possible pair (the two ends) is always
  optimal, since height is constant
- Strictly increasing or strictly decreasing heights → the two end
  lines still need to be evaluated correctly relative to every inner
  pair
- A single very tall line surrounded by short ones → the area is capped
  by the *shorter* of any two chosen lines, not the tallest one alone

## Hints

1. Checking every pair of lines works but is O(n²) — starting with the
   *widest* possible pair (the two ends of the array) and narrowing
   inward, is there a way to guarantee you never need to reconsider a
   pair you've already ruled out?
2. For any current pair, the water level is capped by the *shorter* of
   the two lines — so moving the *taller* line's pointer inward can
   never help (the width only shrinks, and the cap stays capped by the
   same shorter line, or an even shorter new one). Moving the *shorter*
   line's pointer inward is the only choice that could possibly find a
   taller line and improve the result.
3. Always compute and compare the current pair's area *before* deciding
   which pointer to move, and always move the pointer at the shorter of
   the two current lines.

## Algorithm

**Pattern:** two pointers narrowing inward from both ends.
**Core insight:** starting from the widest possible container (the two
array ends) and always moving the pointer at the *shorter* line is
provably safe: keeping the taller line in place while moving the shorter
one is the only move that could possibly increase the area, since moving
the taller line's pointer instead would only shrink the width while
still being capped by the same (or a shorter) height — guaranteed to
never produce a better result. This lets the search discard one
candidate line per step without ever needing to check the pairs it
implicitly ruled out.
**Invariant:** at every step, the maximum area achievable using the
current or any wider pair of lines has already been correctly considered
— narrowing past the shorter line never discards a pair that could have
beaten the current best.

## Dry Run

**Input:** `height = [1,8,6,2,5,4,8,3,7]`

| left, right | width | min height | area | maxWater | move |
|---|---|---|---|---|---|
| 0, 8 (1, 7) | 8 | 1 | 8 | 8 | height[0]=1 < height[8]=7 → left++ |
| 1, 8 (8, 7) | 7 | 7 | **49** | 49 | height[1]=8 ≥ height[8]=7 → right-- |
| 1, 7 (8, 3) | 6 | 3 | 18 | 49 | right-- |
| 1, 6 (8, 8) | 5 | 8 | 40 | 49 | right-- |
| 1, 5 (8, 4) | 4 | 4 | 16 | 49 | right-- |
| 1, 4 (8, 5) | 3 | 5 | 15 | 49 | right-- |
| 1, 3 (8, 2) | 2 | 2 | 4 | 49 | right-- |
| 1, 2 (8, 6) | 1 | 6 | 6 | 49 | right-- → left meets right |

**Result:** `49` — matches expected output.

## JavaScript Solution

```js
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * currentHeight);

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
  let right: number = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width: number = right - left;
    const currentHeight: number = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * currentHeight);

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

O(n) — each pointer moves inward at most `n` times total, and the loop
does O(1) work per step.

## Space Complexity

O(1) — three scalar variables, regardless of input size.

## Common Mistakes

- Checking every pair of lines with nested loops — correct, but O(n²),
  far slower than the two-pointer approach for large inputs.
- Moving the *taller* line's pointer instead of the shorter one — this
  breaks the algorithm's core guarantee; it can skip past the true
  optimal pair, since narrowing away from the taller line can only ever
  shrink the achievable area.
- Forgetting that the area is capped by the *shorter* of the two lines,
  not their average or the taller one — using the wrong height in the
  area calculation silently produces incorrect (too-large) areas.

## Interview Follow-up Questions

1. How would you prove that moving the shorter line's pointer is always
   safe — that it can never cause the algorithm to miss the true
   optimal pair?
2. How does this problem relate to `Trapping Rain Water`, and why does a
   similar two-pointer idea work for both, despite the problems asking
   for different things?
3. How would you adapt this to find the maximum area using *three* or
   more lines instead of exactly two, if that were even well-defined?

## Similar Questions

- Trapping Rain Water (see [../arrays/trapping-rain-water-two-pointers.md](../arrays/trapping-rain-water-two-pointers.md))
- 3Sum (Sorted Array Two Pointers) (see [../arrays/3sum-zero-triplets.md](../arrays/3sum-zero-triplets.md))
