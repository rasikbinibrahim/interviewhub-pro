# QJSC038 · Implement Custom Array prototype join Polyfill

> **Note:** this file's original title said "String prototype join" —
> there is no such method. The `Concepts` line in the source placeholder
> ("Array join with separator") confirms this question is actually
> about `Array.prototype.join`, so the content below covers that. The
> filename is left unchanged to avoid breaking existing links; the title
> below reflects the real topic.

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Arrays / Polyfills
**Concepts:** manual array-to-string joining, default separator, `null`/`undefined` element handling

## Problem Statement

Implement `myJoin(array, separator)`, a polyfill for
`Array.prototype.join`. It should build a single string by concatenating
every element of `array`, in order, with `separator` inserted between
each pair of adjacent elements. If `separator` is omitted, it defaults to
a comma (`","`). Any element that is `null` or `undefined` must be
converted to an empty string rather than the literal text `"null"` or
`"undefined"`. You may not call the real `.join()` internally.

## Input

- `array`: an array of arbitrary values (numbers, strings, `null`,
  `undefined`, objects, etc.)
- `separator` (optional): a string to insert between elements. Defaults
  to `","`.

## Output

A single string: every element's string form, separated by `separator`.

## Constraints

- `null` and `undefined` elements become `""` (empty string), not the
  string `"null"`/`"undefined"`.
- Non-string, non-nullish elements are converted using normal string
  coercion (e.g. `42` → `"42"`, `true` → `"true"`).
- An empty array produces `""`.
- A single-element array produces just that element's string form, with
  no separator inserted.

## Examples

| Input | Output | Why |
|---|---|---|
| `myJoin([1, 2, 3])` | `"1,2,3"` | No separator given, so the default `","` is used between each pair |
| `myJoin(["a", "b", "c"], " - ")` | `"a - b - c"` | Custom separator inserted between each adjacent pair, none before the first or after the last |
| `myJoin([1, null, undefined, 2])` | `"1,,,2"` | `null` and `undefined` both become `""`, so their positions show up as empty segments between separators, not the literal words `"null"`/`"undefined"` |

## Edge Cases

- `array = []` → `""` (no elements, nothing to join).
- `array` with exactly one element → that element's string form alone,
  with zero separators.
- `array` where every element is `null`/`undefined` → a string of pure
  separators (e.g. `[null, undefined]` with default separator → `","`).
- `separator = ""` (explicit empty string) → elements are concatenated
  with nothing between them, which is different from omitting
  `separator` entirely (which defaults to `","`).
- Nested arrays as elements → each nested array is itself stringified
  (its own elements joined with `,`, per normal `String()` coercion of
  arrays), which is worth calling out even though it's not the focus of
  this question.

## Hints

1. Handle the separator default first — `separator === undefined ?
   "," : separator` — before touching any element.
2. For each element, before converting it to a string, check whether it
   is `null` or `undefined` specifically (`== null` catches both in one
   check) and substitute `""` in that case instead of letting normal
   coercion turn it into the words `"null"`/`"undefined"`.
3. Build the result by tracking whether you're about to append the
   *first* piece or not — the separator only goes *between* pieces, so
   the first element should never be preceded by one; a simple way to
   express that is prepending the separator to every element except when
   the accumulator is still empty (index `0`).

## Algorithm

**Pattern:** manual accumulation loop with a per-element nullish
substitution and a "separator only between elements" rule.
**Core insight:** join is a fold over the array where each element
contributes `stringOf(element) + separator` except the very last
element, which contributes just `stringOf(element)` with no trailing
separator — the cleanest way to express that without special-casing the
last index is to prepend the separator before every element *except the
first* (index `0`), which naturally produces exactly `n - 1` separators
for `n` elements.
**Invariant:** after processing index `i`, the accumulator holds the
correctly-separated join of `array[0..i]` — so the final accumulator
after the loop is exactly the join of the whole array.

## Dry Run

**Input:** `myJoin([1, null, undefined, 2], ",")`

| i | array[i] | Nullish? | Piece appended | Accumulator after |
|---|---|---|---|---|
| 0 | `1` | No | `"1"` (no leading separator — first element) | `"1"` |
| 1 | `null` | Yes | `"," + ""` | `"1,"` |
| 2 | `undefined` | Yes | `"," + ""` | `"1,,"` |
| 3 | `2` | No | `"," + "2"` | `"1,,,2"` |

**Result:** `"1,,,2"` — matches the expected output; the two nullish
elements contributed empty segments, not the words `"null"`/`"undefined"`.

## JavaScript Solution

```js
function myJoin(array, separator) {
  const sep = separator === undefined ? ',' : separator;
  let result = '';

  for (let i = 0; i < array.length; i += 1) {
    const element = array[i];

    // Nullish elements become "", not the literal words "null"/"undefined".
    const piece = element === null || element === undefined
      ? ''
      : String(element);

    // Only prepend the separator between elements, never before the first.
    result += i === 0 ? piece : sep + piece;
  }

  return result;
}
```

## TypeScript Solution

```ts
function myJoin(array: unknown[], separator?: string): string {
  const sep: string = separator === undefined ? ',' : separator;
  let result = '';

  for (let i = 0; i < array.length; i += 1) {
    const element: unknown = array[i];

    const piece: string = element === null || element === undefined
      ? ''
      : String(element);

    result += i === 0 ? piece : sep + piece;
  }

  return result;
}
```

## Time Complexity

O(n * k), where n is `array.length` and k is the average length of each
element's string representation — each element is visited once and
concatenated; string concatenation of the accumulator dominates the
constant factor per element (in practice, modern engines optimize
repeated `+=` on strings well, but the theoretical bound accounts for
copying).

## Space Complexity

O(n * k) — the output string's length is proportional to the total
length of all stringified elements plus `(n - 1)` copies of `separator`.

## Common Mistakes

- Using `String(element)` directly on every element without a nullish
  check first — this produces the literal strings `"null"` and
  `"undefined"` in the output, which is wrong per the spec (join is
  explicitly defined to treat them as empty).
- Using `element == null` inconsistently or checking only `=== null`
  (missing `undefined`) or only `=== undefined` (missing `null`) — both
  nullish values must be handled, and `== null` (loose equality) is the
  idiomatic one-check way to catch both without also catching falsy-but-
  meaningful values like `0` or `""`.
- Adding the separator *after* every element (including the last) and
  then trimming the trailing separator off afterward — works, but is
  more error-prone (has to handle the empty-array case specially to
  avoid trimming into a negative-length string) than simply skipping the
  separator on the first element.
- Forgetting the default separator entirely and always requiring a
  second argument — the real `join()` defaults to `","` when called with
  zero or one arguments.

## Interview Follow-up Questions

1. How would you handle a deeply nested array as an element (e.g.
   `myJoin([1, [2, 3], 4])`) to match native `join`'s recursive
   stringification behavior?
2. What's the difference in behavior between `array.join()` and
   `array.toString()` — why do they usually produce the same result?
3. How would you rewrite this using `Array.prototype.reduce` — and would
   an interviewer consider that a valid "manual" implementation, or does
   it lean on a built-in that hides the logic being tested?
4. How does `join` handle sparse arrays (e.g. `[1, , 3]` with a hole at
   index 1) — and does your implementation match that behavior?

## Similar Questions

- [Implement Array.prototype.slice Polyfill](implement-custom-array-prototype-slice-polyfill.md)
- [Implement Custom String prototype split Polyfill](implement-custom-string-prototype-split-polyfill.md)
- [Implement Array.prototype.flat Polyfill (Iterative)](implement-custom-array-prototype-flat-polyfill-iterative.md)

---
[← Back to 61-javascript-coding](README.md)
