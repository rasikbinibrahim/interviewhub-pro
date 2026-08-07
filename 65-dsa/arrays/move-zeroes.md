# Q106 · Move Zeroes

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Microsoft, Google
**Interview Frequency:** ★★★★☆
**Category:** Data Structures & Algorithms → Arrays
**Concepts:** two pointers, in-place partition, stable relative ordering

## Problem Statement

Given an array of integers `nums`, move all `0`s to the end of the array
while keeping the relative order of the non-zero elements the same. This
must be done in-place, without allocating a second array.

## Input

- `nums`: an array of integers

## Output

Nothing is returned — `nums` is mutated in-place so that all non-zero
elements keep their original relative order, followed by all zeros.

## Constraints

- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- Must be done in-place — O(1) extra space, no second array.

## Examples

| Input | Output | Why |
|---|---|---|
| `nums = [0, 1, 0, 3, 12]` | `[1, 3, 12, 0, 0]` | Non-zero elements `1, 3, 12` keep their relative order; both zeros move to the end |
| `nums = [0]` | `[0]` | A single zero has nowhere to move |
| `nums = [1, 2, 3]` | `[1, 2, 3]` | No zeros — array is already correct |

## Edge Cases

- No zeros present → array is unchanged
- All zeros → array is unchanged
- A single element → trivially already correct either way
- Zeros already at the end → algorithm should do no unnecessary swaps

## Hints

1. A brute-force approach builds a new array of non-zero elements, then
   pads it with zeros — that satisfies the *order* requirement but not
   the *in-place* one. What single index could track "where the next
   non-zero element belongs" while you still scan the original array?
2. If you keep a pointer at the next available "non-zero slot," every
   time you find a non-zero value further ahead you can place it there.
3. Instead of just overwriting (which loses the value that used to be
   there), swap the found non-zero value with whatever currently sits at
   the slot pointer — that swap is what turns this into a true one-pass,
   in-place solution instead of needing a second cleanup pass to fill in
   trailing zeros.

## Algorithm

**Pattern:** two pointers — in-place stable partition.
**Core insight:** walk the array once with a read pointer `i`. A second
pointer, `insertPos`, always marks the next position that should hold a
non-zero value. Whenever `nums[i]` is non-zero, swap it into
`nums[insertPos]` and advance `insertPos`. Because `insertPos` never
moves ahead of `i`, every swap either places a non-zero value in its
correct compacted spot or swaps two zeros (a no-op) — order among
non-zero elements is preserved because they're processed left to right.
**Invariant:** at the start of processing index `i`, `nums[0..insertPos
- 1]` contains exactly the non-zero elements seen so far, in their
original relative order, and `nums[insertPos..i - 1]` contains only
zeros.

## Dry Run

**Input:** `nums = [0, 1, 0, 3, 12]`

| i | nums[i] | Action | nums after step | insertPos after |
|---|---|---|---|---|
| 0 | 0 | zero, skip | `[0, 1, 0, 3, 12]` | 0 |
| 1 | 1 | non-zero, swap(0,1) | `[1, 0, 0, 3, 12]` | 1 |
| 2 | 0 | zero, skip | `[1, 0, 0, 3, 12]` | 1 |
| 3 | 3 | non-zero, swap(1,3) | `[1, 3, 0, 0, 12]` | 2 |
| 4 | 12 | non-zero, swap(2,4) | `[1, 3, 12, 0, 12]`→ after swap: `[1, 3, 12, 0, 0]`* | 3 |

*Step 4 detail: swapping index 2 (value `0`) with index 4 (value `12`)
produces `[1, 3, 12, 0, 0]` — the `12` moves in, and the `0` that was at
index 2 moves out to index 4, which is exactly where it belongs.

**Result:** `[1, 3, 12, 0, 0]` — matches expected output.

## JavaScript Solution

```js
function moveZeroes(nums) {
  let insertPos = 0; // next index that should hold a non-zero value

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      // Swap (not overwrite) so the zero currently at insertPos moves
      // out to where the non-zero element used to be, instead of being
      // lost — this is what makes the pass complete in one traversal.
      const temp = nums[insertPos];
      nums[insertPos] = nums[i];
      nums[i] = temp;
      insertPos++;
    }
  }

  return nums;
}
```

## TypeScript Solution

```ts
function moveZeroes(nums: number[]): number[] {
  let insertPos = 0;

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (current === undefined) continue; // noUncheckedIndexedAccess guard

    if (current !== 0) {
      const temp = nums[insertPos]!;
      nums[insertPos] = current;
      nums[i] = temp;
      insertPos++;
    }
  }

  return nums;
}
```

## Time Complexity

O(n) — a single pass over `nums`; every index is visited exactly once.

## Space Complexity

O(1) — only the `insertPos` pointer and a scratch swap variable,
regardless of array size.

## Common Mistakes

- Allocating a new array to hold the non-zero values, then filling the
  rest with zeros — correct, but violates the in-place/O(1)-space
  requirement.
- Overwriting `nums[insertPos] = nums[i]` without saving what used to be
  at `insertPos` first — this silently loses a value instead of moving
  the displaced zero further right, corrupting the array.
- Doing two separate passes (one to compact non-zero values forward,
  another to fill the remaining tail with zeros) when a single
  swap-based pass accomplishes the same result — not wrong, just not the
  tightest version of the pattern.

## Interview Follow-up Questions

1. How would this change if you needed to move all zeros to the *front*
   instead of the end, still preserving relative order of non-zero
   values?
2. Can you do this with the minimum possible number of write operations
   (relevant if `nums` were backed by flash memory with limited write
   cycles)?
3. How would you adapt this two-pointer partition to separate three
   categories of values instead of two (see Sort Colors)?

## Similar Questions

- Sort Colors (Dutch National Flag — three-way partition)
- Remove Element
- Remove Duplicates from Sorted Array

---
[← Back to Arrays](README.md) · [← Back to 65-dsa](../README.md)
