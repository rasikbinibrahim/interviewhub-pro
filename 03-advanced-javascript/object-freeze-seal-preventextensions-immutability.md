# T313 · Immutability Methods: `Object.freeze()`, `Object.seal()`, and `Object.preventExtensions()`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe  
**Interview Frequency:** ★★★★☆  
**Category:** Advanced JavaScript  
**Concepts:** immutability, object-freeze, object-seal, prevent-extensions, strict-mode  

## Question

What are the behavioral differences between `Object.freeze()`, `Object.seal()`, and `Object.preventExtensions()` in JavaScript, why is `Object.freeze()` shallow by default, and how do you implement a **Deep Freeze** utility to enforce complete object immutability?

## Expected Answer

1. **Comparison of Object Protection Methods**:
   - **`Object.preventExtensions(obj)`**: Prevents **adding new properties**. Existing properties can still be modified or deleted.
   - **`Object.seal(obj)`**: Prevents **adding OR deleting** properties. Existing property values can still be modified (sets `configurable: false`).
   - **`Object.freeze(obj)`**: Prevents **adding, deleting, OR modifying** properties (sets `configurable: false, writable: false`). Complete shallow immutability!
2. **Shallow Immutability Caveat**:
   - `Object.freeze()` only freezes top-level primitive property properties. Nested objects (`obj.nested.key = val`) remain mutable!
3. **Deep Freeze Implementation**:
   - Recursively traverses object properties, freezing child object references before freezing the parent container.

## Deep Explanation

### Protection Level Matrix

| Operation | Standard Object | `preventExtensions()` | `seal()` | `freeze()` |
|---|---|---|---|---|
| **Add New Property** | Allowed | ❌ TypeError (Strict) | ❌ TypeError (Strict) | ❌ TypeError (Strict) |
| **Delete Property** | Allowed | Allowed | ❌ TypeError (Strict) | ❌ TypeError (Strict) |
| **Modify Value** | Allowed | Allowed | Allowed | ❌ TypeError (Strict) |
| **Change Descriptors** | Allowed | Allowed | ❌ TypeError (Strict) | ❌ TypeError (Strict) |

## Production Example

```javascript
// Production Recursive Deep Freeze Utility
export function deepFreeze(obj) {
  // Retrieve property names
  const propNames = Object.getOwnPropertyNames(obj);

  // Freeze nested child objects recursively before freezing parent
  for (const name of propNames) {
    const value = obj[name];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
}

// Example Usage
const userConfig = deepFreeze({
  api: { endpoint: 'https://api.com', timeout: 5000 },
  roles: ['admin', 'editor'],
});

// Attempts to mutate nested properties fail in strict mode!
// userConfig.api.timeout = 10000; // Uncaught TypeError: Cannot assign to read only property 'timeout' of object
```

## Best Practices

- Always write `'use strict';` or use ES6 modules so attempted mutations on frozen objects throw explicit `TypeError` errors rather than failing silently.
- Use `deepFreeze` when defining static configuration constants or Redux state initial state objects in development environments.

## Common Mistakes

- Assuming `Object.freeze()` prevents array mutations — arrays are objects in JS; freezing an array prevents `.push()` or index assignment (`arr[0] = x`), but shallow freeze does NOT freeze objects inside array elements.

## Follow-up Questions

1. How do `Object.isFrozen()`, `Object.isSealed()`, and `Object.isExtensible()` verify protection states at runtime?

## Related Topics

- Deep Cloning Objects: `structuredClone` & Recursion
- Property Descriptors: `getOwnPropertyDescriptor` & `defineProperty`
