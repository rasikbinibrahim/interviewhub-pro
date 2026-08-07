# T212 · Type Coercion: Abstract Equality (`==`) vs Strict Equality (`===`) & `Object.is()`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** coercion, equality, abstract-equality, strict-equality, object-is  

## Question

How does JavaScript perform Implicit Type Coercion during Abstract Equality (`==`) comparisons, how does it differ from Strict Equality (`===`) and `Object.is()`, and what are the edge-case behaviors surrounding `NaN`, `-0`, `+0`, `null`, and `undefined`?

## Expected Answer

1. **Comparison Operator Differences**:
   - **Abstract Equality (`a == b`)**: Performs implicit type conversion if types differ before comparing values (e.g. `'5' == 5` converts string to number -> `true`).
   - **Strict Equality (`a === b`)**: Checks both **Type and Value**. If types differ, returns `false` immediately without conversion (`'5' === 5` -> `false`).
   - **`Object.is(a, b)`**: Performs SameValue algorithm. Differs from `===` in two key edge cases:
     1. `Object.is(NaN, NaN)` -> `true` (`NaN === NaN` -> `false`).
     2. `Object.is(+0, -0)` -> `false` (`+0 === -0` -> `true`).
2. **Abstract Coercion Rules (`==`)**:
   - `null == undefined` -> `true` (`null` and `undefined` only equal each other and nothing else under `==`).
   - `Boolean` with `Number`: Booleans are coerced to numbers (`true` -> `1`, `false` -> `0`).
   - `String` with `Number`: Strings are coerced to numbers via `ToNumber()`.
   - `Object` with `Primitive`: Objects are converted to primitives via `[Symbol.toPrimitive]('default')` or `valueOf()` / `toString()`.

## Deep Explanation

### Equality Comparison Matrix

| Comparison Pair | `==` (Abstract) | `===` (Strict) | `Object.is()` |
|---|---|---|---|
| `'5' == 5` | `true` | `false` | `false` |
| `0 == false` | `true` | `false` | `false` |
| `null == undefined` | `true` | `false` | `false` |
| `NaN == NaN` | `false` | `false` | `true` |
| `+0 == -0` | `true` | `true` | `false` |
| `[] == ![]` | `true` | `false` | `false` |

## Production Example

```javascript
// Polyfill for Object.is(x, y)
if (!Object.isPolyfill) {
  Object.isPolyfill = function (x, y) {
    // Edge Case 1: NaN comparison
    if (x !== x) {
      return y !== y; // True only if both x and y are NaN!
    }
    // Edge Case 2: +0 vs -0 comparison
    if (x === 0 && y === 0) {
      return 1 / x === 1 / y; // 1 / +0 === Infinity, 1 / -0 === -Infinity
    }
    // Standard Strict Equality
    return x === y;
  };
}

console.log(Object.isPolyfill(NaN, NaN)); // true
console.log(Object.isPolyfill(+0, -0));   // false
```

## Best Practices

- Always use Strict Equality `===` and `!==` in production codebases to prevent accidental implicit type conversion bugs.
- Use `Number.isNaN(val)` or `Object.is(val, NaN)` instead of `val === NaN` to test for `NaN`.

## Common Mistakes

- Writing `if (val === NaN)` — in JavaScript, `NaN` is the only value that is NOT strictly equal to itself (`NaN === NaN` evaluates to `false`).

## Follow-up Questions

1. Why does `[] == ![]` evaluate to `true` under Abstract Equality? (`![]` coerces to `false`, then `[] == false` coerces `[]` to `""` -> `0 == 0` -> `true`).

## Related Topics

- ES6 Symbols, Well-Known Symbols & Metaprogramming
- Primitive vs Reference Types & Type System Mechanics
