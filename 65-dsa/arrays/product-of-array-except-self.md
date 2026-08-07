# Q6646 · Product of Array Except Self (Prefix & Suffix Products)

**Difficulty:** Medium
**Companies Asked:** Amazon, Meta, Google, Microsoft, Apple
**Interview Frequency:** ★★★★★
**Category:** Arrays
**Concepts:** arrays, prefix-product, suffix-product

## Problem Statement

Write a function `productExceptSelf(nums)` that returns an array where
each element at index `i` is the product of every value in `nums`
*except* `nums[i]`, without using division and in O(n) time.

## Input

`nums`: an array of integers, length at least 2.

## Output

An array of the same length, where each index holds the product of all
other elements.

## Constraints

`2 <= nums.length <= 10^5`, `-30 <= nums[i] <= 30` (guaranteed to fit
within a 32-bit integer)

## Examples

| Input | Output | Why |
|---|---|---|
| `[1,2,3,4]` | `[24,12,8,6]` | Index 0: `2*3*4=24`; index 1: `1*3*4=12`; etc. |
| `[-1,1,0,-3,3]` | `[0,0,9,0,0]` | The single `0` makes every product except its own position `0` |
| `[2,3]` | `[3,2]` | Each index's product is simply the *other* element |

## Edge Cases

- Array contains exactly one `0` → every output value is `0` except the
  position of the `0` itself, which becomes the product of all the
  other (non-zero) values
- Array contains more than one `0` → every output value is `0`,
  including at the zero positions themselves
- All values equal `1` → every output value is `1`
- Negative values → sign is handled naturally by ordinary multiplication,
  no special casing needed

## Hints

1. The obvious approach — compute the total product, then divide by
   `nums[i]` for each index — breaks the moment `nums` contains a `0`
   (division by zero), and the problem explicitly disallows division
   anyway. What else could you use instead of division to "remove" one
   element's contribution?
2. The product of everything except `nums[i]` is exactly `(product of
   everything to i's left) × (product of everything to i's right)` —
   two separate running products, one built left-to-right, one
   right-to-left.
3. You can build both passes into the *same* output array: fill it with
   left-side products first, then multiply in the right-side products on
   a second pass, using only two scalar running-product variables (no
   separate prefix/suffix arrays needed) to keep space at O(1) excluding
   the output.

## Algorithm

**Pattern:** prefix products and suffix products, combined in place.
**Core insight:** the product of every element except `nums[i]` splits
cleanly into two independent pieces — the product of everything before
index `i`, and the product of everything after it — and each piece can
be computed incrementally in a single pass without ever looking at
`nums[i]` itself. Doing the left-to-right pass first (writing each
prefix product directly into the result array) and then the
right-to-left pass (multiplying the corresponding suffix product into
what's already there) combines both pieces without needing separate
prefix/suffix arrays.
**Invariant:** after the first loop completes, `result[i]` holds the
product of `nums[0..i-1]`. After the second loop completes, `result[i]`
additionally incorporates the product of `nums[i+1..n-1]`, giving the
full "everything except index i" product.

## Dry Run

**Input:** `nums = [1,2,3,4]`

**Left pass** (`leftProduct` starts at 1):

| i | result[i] = leftProduct | leftProduct *= nums[i] |
|---|---|---|
| 0 | 1 | 1 * 1 = 1 |
| 1 | 1 | 1 * 2 = 2 |
| 2 | 2 | 2 * 3 = 6 |
| 3 | 6 | 6 * 4 = 24 |

After left pass: `result = [1, 1, 2, 6]`

**Right pass** (`rightProduct` starts at 1, `i` from 3 down to 0):

| i | result[i] *= rightProduct | rightProduct *= nums[i] |
|---|---|---|
| 3 | 6 * 1 = 6 | 1 * 4 = 4 |
| 2 | 2 * 4 = 8 | 4 * 3 = 12 |
| 1 | 1 * 12 = 12 | 12 * 2 = 24 |
| 0 | 1 * 24 = 24 | 24 * 1 = 24 |

**Result:** `[24, 12, 8, 6]` — matches expected output.

## JavaScript Solution

```js
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Left prefix products
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Right suffix products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}
```

## TypeScript Solution

```ts
function productExceptSelf(nums: number[]): number[] {
  const n: number = nums.length;
  const result: number[] = new Array(n).fill(1);

  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}
```

## Time Complexity

O(n) — two linear passes over the array.

## Space Complexity

O(1) auxiliary space (excluding the required output array) — only two
running scalar products, no separate prefix/suffix arrays.

## Common Mistakes

- Computing the total product and dividing by `nums[i]` for each index —
  breaks entirely when any element is `0`, and the problem statement
  explicitly disallows division regardless.
- Using two separate full-size prefix and suffix arrays — correct, but
  uses O(n) *extra* space beyond the required output, when the two
  passes can be combined into the output array directly with only O(1)
  auxiliary space.
- Mishandling multiple zeros — if more than one element is `0`, *every*
  output position must be `0` (since every product except at most one
  zero-position still includes at least one other zero); an
  implementation that only special-cases a single zero can get this
  wrong.

## Interview Follow-up Questions

1. How would this problem be solved if division *were* allowed, and
   what edge case would that introduce that this approach avoids
   entirely?
2. How would you extend this to work correctly if the array could
   contain very large numbers, risking overflow in other languages?
3. How would you adapt this technique to a 2D grid — computing, for each
   cell, the product of the entire grid except that cell?

## Similar Questions

- Maximum Subarray (Kadane's Algorithm) (see [maximum-subarray-kadane.md](maximum-subarray-kadane.md))
- Trapping Rain Water (see [trapping-rain-water-two-pointers.md](trapping-rain-water-two-pointers.md))
