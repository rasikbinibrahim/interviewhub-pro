# QJSC016 · Implement Custom String prototype repeat Polyfill

**Difficulty:** Easy
**Companies Asked:** Google, Amazon, Microsoft, Infosys, TCS, Wipro
**Interview Frequency:** ★★★★☆
**Category:** JavaScript → Strings / Polyfills
**Concepts:** manual string concatenation, `RangeError` on invalid input, zero-count edge case

## Problem Statement

Implement `myRepeat(str, count)`, a polyfill for `String.prototype.repeat`.
It should return a new string consisting of `str` concatenated to itself
`count` times. If `count` is negative (or `Infinity`), it must throw a
`RangeError`, matching the real spec's behavior — `repeat` is explicitly
defined to reject counts that can't produce a finite, valid result. You
may not call the real `.repeat()` internally.

## Input

- `str`: the string to repeat
- `count`: a non-negative integer, how many times to repeat `str`

## Output

A new string: `str` concatenated to itself `count` times. Throws
`RangeError` if `count` is negative or `Infinity`.

## Constraints

- `count` must be `>= 0`; negative values throw `RangeError`.
- `count = 0` returns `""` (the empty string), not an error.
- `count = Infinity` throws `RangeError` (can't build an infinite
  string).
- `str = ""` with any valid `count` returns `""`.

## Examples

| Input | Output | Why |
|---|---|---|
| `myRepeat("ab", 3)` | `"ababab"` | `"ab"` concatenated to itself 3 times |
| `myRepeat("x", 0)` | `""` | Zero repetitions means nothing is ever concatenated — the empty string, not an error |
| `myRepeat("ab", -1)` | throws `RangeError` | Negative counts are meaningless for repetition and are explicitly rejected by the spec, not silently treated as `0` |

## Edge Cases

- `count = 0` → `""`, a valid, non-error result (this is the case most
  candidates instinctively (and incorrectly) want to reject).
- `count` negative (e.g. `-1`) → `RangeError`, never `""` and never a
  silently-negative-length result.
- `count = Infinity` → `RangeError` (can't allocate an infinite string).
- `str = ""` → always `""` regardless of `count` (as long as `count` is
  valid), since there's nothing to repeat.
- Large `count` (e.g. `count = 1_000_000`) → still valid, just produces
  a long string; worth discussing performance (see Optimization below),
  not an error condition.

## Hints

1. Check the error condition *before* doing any concatenation work:
   `count < 0` or `count === Infinity` should throw a `RangeError`
   immediately, not after building a partial result.
2. `count = 0` is a valid, ordinary input — it should fall through to
   normal logic and naturally produce `""` (an empty accumulator that
   the loop never adds to), not be treated as a special error case.
3. The naive approach — a loop that appends `str` to an accumulator
   `count` times — is correct and the expected baseline; if asked to
   optimize for very large `count`, think about how doubling the
   accumulator (rather than appending one copy at a time) can cut the
   number of concatenation operations from O(count) down to
   O(log count).

## Algorithm

**Pattern:** input validation guard, then linear accumulation.
**Core insight:** `repeat` is fundamentally "concatenate `str` onto an
accumulator, `count` times" — the only subtlety is correctly
distinguishing the *valid* zero case (returns `""`) from the *invalid*
negative/infinite case (throws). Validating `count`'s range up front,
before the loop even starts, keeps that distinction unambiguous.
**Invariant:** after `i` iterations of the accumulation loop, the
accumulator holds exactly `i` concatenated copies of `str` — so after
all `count` iterations, it holds exactly `count` copies, which is the
definition of the result.

## Dry Run

**Input:** `myRepeat("ab", 3)`

| Step | i | Accumulator before | Action | Accumulator after |
|---|---|---|---|---|
| 1 | 0 | `""` | append `"ab"` | `"ab"` |
| 2 | 1 | `"ab"` | append `"ab"` | `"abab"` |
| 3 | 2 | `"abab"` | append `"ab"` | `"ababab"` |

Loop ends (`i` reached `count = 3`). **Result:** `"ababab"` — matches
the expected output.

## JavaScript Solution

```js
function myRepeat(str, count) {
  // Spec-mandated validation: negative or infinite counts are invalid,
  // not silently clamped to 0 or treated as "repeat forever".
  if (count < 0 || count === Infinity) {
    throw new RangeError('Invalid count value: ' + count);
  }

  let result = '';
  for (let i = 0; i < count; i += 1) {
    result += str; // manual concatenation, one copy per iteration
  }

  return result;
}
```

## TypeScript Solution

```ts
function myRepeat(str: string, count: number): string {
  if (count < 0 || count === Infinity) {
    throw new RangeError(`Invalid count value: ${count}`);
  }

  let result = '';
  for (let i = 0; i < count; i += 1) {
    result += str;
  }

  return result;
}
```

## Time Complexity

O(n * count), where n is `str.length` — each of the `count` iterations
copies `n` characters into the accumulator, so total work scales with
both the string length and the repeat count.

## Space Complexity

O(n * count) — the final result string's length is exactly `n * count`
characters.

## Common Mistakes

- Treating `count = 0` as an error case alongside negative counts — it's
  explicitly valid per spec and must return `""`, not throw.
- Checking only `count < 0` and forgetting `count === Infinity` — a
  `while` loop that never terminates (or a `for` loop bound by
  `Infinity`) will hang the program instead of throwing.
- Throwing `Error` or `TypeError` instead of specifically `RangeError` —
  interviewers checking spec fidelity will call this out; `RangeError`
  is the semantically correct type for "value is outside the allowed
  range."
- Using `str.repeat(count)` inside the implementation — calls the exact
  native method being polyfilled, defeating the exercise.
- Not considering non-integer `count` (e.g. `2.5`) — the real spec
  floors it via `ToIntegerOrInfinity`; an interview-ready answer should
  at least mention this even if the core loop (via `i < count`) happens
  to behave reasonably for it already.

## Interview Follow-up Questions

1. How would you optimize this for very large `count` using
   exponential/doubling concatenation (build up `result = result +
   result` while doubling `str`, similar to fast exponentiation) instead
   of one append per iteration?
2. Why does the spec require `RangeError` specifically, rather than
   letting `count < 0` just silently produce `""`?
3. How does V8's real implementation likely avoid O(n * count) memory
   copies for large repeats (hint: rope/cons-string representations)?
4. How would you adapt this to repeat an *array* instead of a string —
   what changes, and what stays conceptually the same?

## Similar Questions

- [Implement String.prototype.padStart Polyfill](implement-custom-string-prototype-padstart-polyfill.md)
- [Implement String.prototype.padEnd Polyfill](implement-custom-string-prototype-padend-polyfill.md)
- [Implement Math.max and Math.min Polyfills](implement-custom-math-max-and-math-min-polyfills.md)

---
[← Back to 61-javascript-coding](README.md)
