# T310 · ES6 Symbols, Well-Known Symbols & Metaprogramming

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe  
**Interview Frequency:** ★★★★☆  
**Category:** Advanced JavaScript  
**Concepts:** symbol, well-known-symbols, metaprogramming, iterator, toprimitive, hasinstance  

## Question

What makes ES6 `Symbol` primitive values unique, how do non-enumerable Symbol object keys prevent property collision, and how do **Well-Known Symbols** (`Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.hasInstance`, `Symbol.toStringTag`) enable object metaprogramming in JavaScript?

## Expected Answer

1. **Symbol Uniqueness & Encapsulation**:
   - `Symbol([description])` creates a guaranteed **unique primitive value**. `Symbol('id') !== Symbol('id')`.
   - Symbol keys are **ignored by standard iteration** (`Object.keys()`, `for...in`, `JSON.stringify()`). They can only be accessed via `Object.getOwnPropertySymbols(obj)` or `Reflect.ownKeys(obj)`.
2. **Well-Known Symbols for Metaprogramming**:
   - `Symbol.iterator`: Defines how an object is iterated over in `for...of` loops or spread `[...obj]`.
   - `Symbol.toPrimitive`: Overrides default object coercion when converted to a string or number (`obj + 10`).
   - `Symbol.hasInstance`: Customizes the behavior of the `instanceof` operator.
   - `Symbol.toStringTag`: Customizes string returned by `Object.prototype.toString.call(obj)`.

## Deep Explanation

### Metaprogramming via Well-Known Symbols

```javascript
// Production Example: Custom Matrix Class with Metaprogramming
class Matrix {
  constructor(data) {
    this.data = data;
  }

  // 1. Symbol.iterator: Makes Matrix iterable in for...of loops!
  *[Symbol.iterator]() {
    for (const row of this.data) {
      for (const val of row) {
        yield val;
      }
    }
  }

  // 2. Symbol.toPrimitive: Custom Coercion
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return this.data.flat().reduce((sum, val) => sum + val, 0);
    }
    return `Matrix(${this.data.length}x${this.data[0].length})`;
  }

  // 3. Symbol.toStringTag: Custom Object Tag
  get [Symbol.toStringTag]() {
    return 'MatrixGrid';
  }
}

const m = new Matrix([[1, 2], [3, 4]]);

console.log([...m]); // [1, 2, 3, 4] (Symbol.iterator in action!)
console.log(+m);     // 10 (Symbol.toPrimitive hint === 'number')
console.log(`${m}`); // "Matrix(2x2)" (Symbol.toPrimitive hint === 'string')
console.log(Object.prototype.toString.call(m)); // "[object MatrixGrid]"
```

## Best Practices

- Use global `Symbol.for('key')` registry when you want symbols shared across different execution realms (iframes, web workers).
- Use Symbols for private library instance keys to prevent name collision with consumer object properties.

## Common Mistakes

- Attempting to instantiate Symbol with `new Symbol()`, which throws a `TypeError: Symbol is not a constructor`.

## Follow-up Questions

1. Why does `JSON.stringify({ [Symbol('a')]: 'value' })` omit Symbol keys entirely from output JSON strings?

## Related Topics

- Iterators, Generators (`function*`) & Async Iterables
- Deep Cloning Objects: `structuredClone` & Recursion
