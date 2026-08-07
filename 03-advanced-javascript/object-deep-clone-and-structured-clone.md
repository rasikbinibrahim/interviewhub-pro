# T306 · Deep Cloning Objects: `structuredClone`, JSON Limitation & Custom Recursive Clone

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** deep-clone, structured-clone, serialization, recursion, circular-references  

## Question

How does object cloning differ between Shallow Copying (`Object.assign`, spread `{...obj}`) and Deep Copying, what are the fatal limitations of `JSON.parse(JSON.stringify(obj))`, how does the native `structuredClone()` API work, and how do you implement a production-grade recursive `deepClone` function that handles circular references, `Set`, `Map`, and `Date` objects?

## Expected Answer

1. **Shallow Copy vs Deep Copy**:
   - **Shallow Copy**: Copies top-level primitive values by value, but copies nested object references by reference. Modifying nested properties mutates the original object.
   - **Deep Copy**: Recursively duplicates all nested objects, arrays, maps, and sets, creating entirely independent memory structures.
2. **Limitations of `JSON.parse(JSON.stringify(obj))`**:
   - Converts `Date` objects into ISO strings.
   - Drops `undefined`, `Symbol` keys, and `Function` properties completely.
   - Converts `NaN`, `Infinity`, and `-Infinity` to `null`.
   - Throws `TypeError: Converting circular structure to JSON` on circular references.
3. **`structuredClone()` Native API**: Native browser/Node.js API that deep clones complex data structures including `Date`, `Set`, `Map`, `RegExp`, `ArrayBuffer`, and circular references natively on the C++ layer. Does not clone functions or DOM nodes.

## Deep Explanation

### Custom Recursive Deep Clone with WeakMap

```javascript
export function deepClone(target, hash = new WeakMap()) {
  // 1. Primitive types and functions
  if (target === null || typeof target !== 'object') {
    return target;
  }

  // 2. Handle Date and RegExp objects
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);

  // 3. Handle Circular References
  if (hash.has(target)) {
    return hash.get(target);
  }

  // 4. Handle Set
  if (target instanceof Set) {
    const copySet = new Set();
    hash.set(target, copySet);
    target.forEach(val => copySet.add(deepClone(val, hash)));
    return copySet;
  }

  // 5. Handle Map
  if (target instanceof Map) {
    const copyMap = new Map();
    hash.set(target, copyMap);
    target.forEach((val, key) => copyMap.set(deepClone(key, hash), deepClone(val, hash)));
    return copyMap;
  }

  // 6. Handle Objects and Arrays
  const cloneObj = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  hash.set(target, cloneObj);

  Reflect.ownKeys(target).forEach(key => {
    cloneObj[key] = deepClone(target[key], hash);
  });

  return cloneObj;
}
```

## Production Example

```javascript
const original = {
  name: 'Dashboard Config',
  created: new Date('2026-01-01'),
  symbols: Symbol('id'),
  meta: new Map([['version', 1.0]]),
  items: [1, 2, { active: true }],
};
original.self = original; // Circular Reference!

// 1. JSON.stringify fails!
// JSON.stringify(original); // Uncaught TypeError: Converting circular structure to JSON

// 2. Native structuredClone (Native ES2022 / Node 17+)
const nativeCopy = structuredClone(original);
console.log(nativeCopy.created instanceof Date); // true
console.log(nativeCopy.self === nativeCopy); // true (Preserves circular structure!)

// 3. Custom deepClone implementation
const customCopy = deepClone(original);
console.log(customCopy.meta.get('version')); // 1.0
console.log(customCopy !== original); // true
```

## Best Practices

- Use `structuredClone()` for native deep cloning in modern environments.
- Use `WeakMap` in custom recursive deep clone implementations to prevent memory leaks while tracking circular references.

## Common Mistakes

- Using `JSON.parse(JSON.stringify(obj))` in state management or payload serialization code where `Date` objects or `undefined` values exist, silently breaking date instances into plain strings.

## Follow-up Questions

1. Why does `structuredClone()` throw a `DataCloneError` when encountering functions or DOM nodes?

## Related Topics

- Prototype Inheritance, `__proto__`, `prototype` & Class Transpilation
- Memory Leaks & Garbage Collection
