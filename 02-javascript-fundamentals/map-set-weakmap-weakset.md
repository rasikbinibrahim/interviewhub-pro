# T208 · ES6 Collections: `Map`, `Set`, `WeakMap`, `WeakSet` & Garbage Collection

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** map, set, weakmap, weakset, garbage-collection, memory-management  

## Question

What are the fundamental differences between `Map` vs plain `Object`, `Set` vs `Array`, and how do `WeakMap` and `WeakSet` prevent memory leaks by holding weak references to key objects?

## Expected Answer

1. **`Map` vs Plain `Object`**:
   - `Map` allows keys of **ANY data type** (objects, functions, primitives); Objects only allow string or Symbol keys.
   - `Map` maintains insertion order during iteration (`for...of`, `.forEach()`).
   - `Map` has an $O(1)$ size property `.size`.
2. **`Set` vs `Array`**:
   - `Set` is a collection of **unique values**; duplicates are automatically ignored. Provides $O(1)$ membership checks via `.has(value)` (vs $O(N)$ for `Array.prototype.includes()`).
3. **`WeakMap` and `WeakSet`**:
   - Keys MUST be objects (`typeof key === 'object'`).
   - Holds **weak references** to key objects. If a key object has no other strong references remaining in memory, it is eligible for Garbage Collection (GC), automatically removing the corresponding entry from the `WeakMap`/`WeakSet`.
   - Non-enumerable: Cannot be iterated over (`for...of`), has no `.size` property, and no `.clear()` method.

## Deep Explanation

### Memory & Garbage Collection Comparison

```
Strong Reference (Map / Object / Array):
Root Scope ---> Key Object <--- Map Entry (Prevents GC even if Root Scope drops reference!)

Weak Reference (WeakMap / WeakSet):
Root Scope ---> Key Object < - - WeakMap Entry (If Root Scope drops reference, Key Object is GC'd!)
```

## Production Example

```javascript
// Production Use Case: Metadata Cache via WeakMap (Prevents Memory Leaks)
const userDomNodeCache = new WeakMap();

function attachComponentMetadata(domElement, metadata) {
  // Key MUST be an object (the DOM element node)
  userDomNodeCache.set(domElement, metadata);
}

function getComponentMetadata(domElement) {
  return userDomNodeCache.get(domElement);
}

// Usage in Dynamic UI Component
let button = document.createElement('button');
attachComponentMetadata(button, { clickCount: 0, componentId: 'btn-123' });

console.log(getComponentMetadata(button)); // { clickCount: 0, componentId: 'btn-123' }

// When the DOM element is removed from document and `button` variable is nulled out:
button = null; 
// The metadata entry in `userDomNodeCache` is automatically garbage collected! Zero memory leaks!
```

## Best Practices

- Use `Set` instead of `Array` when maintaining lists of unique IDs where frequent membership existence checks (`.has()`) occur.
- Use `WeakMap` for caching computed metadata or private instance fields associated with object instances.

## Common Mistakes

- Attempting to pass primitive numbers or strings as keys to `WeakMap.prototype.set(123, val)`, which throws a `TypeError: Invalid value used as weak map key`.

## Follow-up Questions

1. How do JavaScript Garbage Collectors (V8 Scavenger vs Mark-Sweep) detect unreachable objects?

## Related Topics

- Garbage Collection & Memory Management
- Closures, Lexical Environments & Encapsulation Patterns
