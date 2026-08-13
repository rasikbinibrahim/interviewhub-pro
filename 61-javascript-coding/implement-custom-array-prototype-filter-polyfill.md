# QJS333 · Implement a Custom Array.prototype.filter Polyfill

**Difficulty:** Easy
**Companies Asked:** Meta, Google, Amazon
**Interview Frequency:** ★★★★★
**Category:** JavaScript → Array Method Polyfills
**Concepts:** predicate callback, sparse-array hole skipping, `thisArg` binding, new-array construction

## Problem Statement

Implement `myFilter`, a polyfill for `Array.prototype.filter`, attached
as `Array.prototype.myFilter`. Given a predicate `callbackFn(element,
index, array)`, it should return a **new** array containing only the
elements for which `callbackFn` returned a truthy value, in original
order. It must not call the native `filter` internally, must skip holes
in sparse arrays (never invoking the callback for them), and must accept
an optional `thisArg` that becomes `this` inside `callbackFn`.

## Input

- The array `myFilter` is called on (possibly sparse).
- `callbackFn(element, index, array)`: a predicate returning a value
  coerced to boolean.
- `thisArg` (optional): the value to use as `this` inside `callbackFn`.

## Output

A new, dense array (no holes, regardless of the input) holding only the
elements that passed `callbackFn`, in original relative order.

## Constraints

- `0 <= array.length <= 10^5`
- Must return a new array — never mutate or return the original.
- Must skip holes in sparse arrays; a hole can never contribute to the
  output because the callback is never invoked for it.
- Must not call the native `Array.prototype.filter` internally.

## Examples

| Input | Output | Why |
|---|---|---|
| `[1, 2, 3, 4].myFilter(x => x % 2 === 0)` | `[2, 4]` | only the even elements pass the predicate |
| `[1, , 3].myFilter(x => true)` | `[1, 3]` | the hole at index 1 is skipped entirely — it's never passed to the callback and can never appear in the output, even though the predicate here would accept anything |
| `[5, 10, 15].myFilter(function (x) { return x > this.threshold; }, { threshold: 9 })` | `[10, 15]` | `thisArg` makes `this.threshold` (`9`) resolve inside the callback, filtering out `5` |

## Edge Cases

- Empty array → `[]`.
- No elements pass → `[]` (a genuinely new, empty array — not the
  original reference).
- Every element passes → a new array with equivalent content to the
  input, but a different reference (`result !== array`).
- Sparse array → holes are skipped entirely, and the output is always
  dense (index-contiguous from `0`), never carrying holes forward even
  if some passing elements originally had gaps between them.
- `thisArg` supplied → the callback's `this` must resolve to it.

## Hints

1. Loop by index, but skip any index that doesn't actually exist on the
   array (`index in this`) before ever calling the predicate — the same
   hole-guard used in `every`/`some`.
2. Only elements whose predicate call returns truthy get pushed into a
   separate result array — everything else is simply left out, there's
   no "undefined placeholder" the way there is with `map`.
3. Call `callbackFn.call(thisArg, element, index, array)` so an optional
   `thisArg` is honored, exactly like `every`/`some`.

## Algorithm

**Pattern:** linear scan with a hole-existence guard and a conditional
push into a fresh output array.
**Core insight:** `filter` never needs to preserve positional
alignment with the input (unlike `map`, which must keep `result[i]`
corresponding to `array[i]`) — it just needs to preserve *relative
order* among the elements that pass. That's exactly what pushing
matching elements onto a growing array, in scan order, produces.
**Invariant:** at any point during the scan, `result` holds every
present element visited so far (in original order) whose callback call
returned truthy — nothing more, nothing less.

## Dry Run

**Input:** `[1, 2, 3, 4].myFilter(x => x % 2 === 0)`

| Step | index | `index in this`? | element | predicate result | Action | `result` so far |
|---|---|---|---|---|---|---|
| 1 | 0 | yes | `1` | `false` | skip | `[]` |
| 2 | 1 | yes | `2` | `true` | push `2` | `[2]` |
| 3 | 2 | yes | `3` | `false` | skip | `[2]` |
| 4 | 3 | yes | `4` | `true` | push `4` | `[2, 4]` |

**Result:** `[2, 4]` — matches Example 1.

## JavaScript Solution

```js
Array.prototype.myFilter = function (callbackFn, thisArg) {
  const result = [];
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    // Skip holes entirely — the callback is never invoked for them,
    // so they can never contribute to the output.
    if (!(index in this)) {
      continue;
    }

    const element = this[index];
    if (callbackFn.call(thisArg, element, index, this)) {
      result.push(element);
    }
  }

  return result;
};
```

## TypeScript Solution

```ts
interface Array<T> {
  myFilter(
    callbackFn: (element: T, index: number, array: T[]) => unknown,
    thisArg?: unknown,
  ): T[];
}

Array.prototype.myFilter = function <T>(
  this: T[],
  callbackFn: (element: T, index: number, array: T[]) => unknown,
  thisArg?: unknown,
): T[] {
  const result: T[] = [];
  const length = this.length;

  for (let index = 0; index < length; index += 1) {
    if (!(index in this)) {
      continue;
    }

    const element = this[index];
    if (callbackFn.call(thisArg, element, index, this)) {
      result.push(element);
    }
  }

  return result;
};
```

## Time Complexity

O(n) — every present element is visited exactly once; `filter` cannot
short-circuit, since a match could occur anywhere, including the last
index.

## Space Complexity

O(k), where k is the number of elements that pass — worst case O(n) if
every element passes.

## Common Mistakes

- Not skipping holes — this invokes the callback with `undefined` for a
  hole, which is both wrong (the native method never does this) and
  observable if the callback has side effects or would otherwise reject
  `undefined`.
- Mutating the original array (e.g. using `splice` to remove
  non-matching elements in place) instead of building a separate new
  array — `filter` must never modify its input.
- Forgetting `callbackFn.call(thisArg, ...)`, silently breaking any
  usage relying on `thisArg`.
- Assuming `filter` can short-circuit like `some`/`find` — it can't; a
  passing element could be anywhere, so every present index must be
  checked.

## Interview Follow-up Questions

1. Why must `filter` always return a brand-new array rather than mutate
   in place — what would break for code that chains `.filter().map()`
   if it didn't?
2. How would you implement `filter` purely in terms of `reduce`?
3. Why can't `filter` short-circuit the way `some`/`find` do, even
   though both also take a predicate?
4. How would you implement an in-place "compacting filter" that removes
   non-matching elements from the original array without allocating a
   new one — what would that trade off against this version?
5. How does `filter`'s hole-skipping compare to `find`'s hole-handling —
   why do these two predicate-based methods behave differently?

## Similar Questions

- [Implement a Custom Array.prototype.map Polyfill](implement-custom-array-prototype-map-polyfill.md)
- [Implement a Custom Array.prototype.every Polyfill](implement-custom-array-prototype-every-polyfill.md)
- [Implement a Custom Array.prototype.some Polyfill](implement-custom-array-prototype-some-polyfill.md)
- [Implement a Custom Array.prototype.reduce Polyfill](implement-custom-array-prototype-reduce-polyfill.md)

---
[← Back to 61-javascript-coding](README.md)
