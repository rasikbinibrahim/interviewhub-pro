# T315 · Polyfilling Array Prototype Higher-Order Methods (`map`, `filter`, `reduce`, `flat`, `flatMap`)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** polyfills, array-prototype, higher-order-functions, map, filter, reduce, flat  

## Question

How do you implement production-spec polyfills for `Array.prototype.map`, `Array.prototype.filter`, `Array.prototype.reduce`, `Array.prototype.flat`, and `Array.prototype.flatMap` on the global Array prototype, while handling sparse arrays, `thisArg` bindings, and recursive array flattening?

## Expected Answer

1. **Polyfill Rules**:
   - Must handle `thisArg` context binding in `map` and `filter`.
   - Must skip **sparse array indices** (`in` operator check: `if (i in this)`).
   - `reduce` must throw a `TypeError` if invoked on an empty array without an initial value.
2. **Recursive Array Flattening (`flat(depth)`)**:
   - Recursively flattens array elements up to specified `depth` level.

## Deep Explanation

### Custom Array Polyfill Implementations

```javascript
// 1. Array.prototype.myMap
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }

  const len = this.length >>> 0;
  const result = new Array(len);

  for (let i = 0; i < len; i++) {
    if (i in this) { // Skip sparse array gaps!
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }

  return result;
};

// 2. Array.prototype.myFilter
Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }

  const len = this.length >>> 0;
  const result = [];

  for (let i = 0; i < len; i++) {
    if (i in this) {
      if (callback.call(thisArg, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }

  return result;
};

// 3. Array.prototype.myReduce
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }

  const len = this.length >>> 0;
  let i = 0;
  let accumulator;

  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    // Find first non-empty element for accumulator
    while (i < len && !(i in this)) {
      i++;
    }
    if (i >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = this[i++];
  }

  for (; i < len; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};

// 4. Array.prototype.myFlat
Array.prototype.myFlat = function (depth = 1) {
  const result = [];

  (function flatten(arr, d) {
    for (let i = 0; i < arr.length; i++) {
      if (i in arr) {
        const val = arr[i];
        if (Array.isArray(val) && d > 0) {
          flatten(val, d - 1);
        } else {
          result.push(val);
        }
      }
    }
  })(this, depth);

  return result;
};
```

## Production Example

```javascript
import './arrayPolyfills';

const nums = [1, 2, 3, 4];

// Test custom polyfills!
const doubled = nums.myMap((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8]

const evens = nums.myFilter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

const sum = nums.myReduce((acc, n) => acc + n, 0);
console.log(sum); // 10

const nested = [1, [2, [3, [4]]]];
console.log(nested.myFlat(2)); // [1, 2, 3, [4]]
```

## Best Practices

- Always use `i in this` checks inside array iteration loops to correctly handle sparse arrays (`new Array(3)` or `[1, , 3]`).
- Use bitwise unsigned right shift `this.length >>> 0` to convert array length to a valid 32-bit integer.

## Common Mistakes

- Forgetting to support `thisArg` parameter binding in `map` and `filter` polyfills.

## Follow-up Questions

1. How does `Array.prototype.flatMap` combine `map` and `flat(1)` in a single pass?

## Related Topics

- Polyfilling `Promise.allSettled`, `Promise.race` & `Promise.any`
- Polyfilling `Function.prototype.bind`, `call` & `apply`
