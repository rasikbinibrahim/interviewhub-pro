# T314 · ES2021 `WeakRef` & `FinalizationRegistry`: Garbage Collection Cleanup Triggers

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Microsoft, Stripe, Cloudflare  
**Interview Frequency:** ★★★★☆  
**Category:** Advanced JavaScript  
**Concepts:** weakref, finalizationregistry, garbage-collection, v8, memory-management  

## Question

What capabilities were introduced in ES2021 via **`WeakRef`** and **`FinalizationRegistry`**, how do `WeakRef` instances hold weak references to objects without preventing Garbage Collection, and how does `FinalizationRegistry` register cleanup callbacks when target objects are garbage-collected?

## Expected Answer

1. **`WeakRef(target)`**:
   - Creates a weak reference to a target object. Unlike standard strong references, holding a `WeakRef` to an object does **NOT prevent the V8 garbage collector from reclaiming that object**.
   - `ref.deref()`: Returns the target object if it is still alive in memory, or `undefined` if GC has reclaimed it.
2. **`FinalizationRegistry(cleanupCallback)`**:
   - Registers objects to be monitored by the garbage collector.
   - When a registered object is collected by GC, the `cleanupCallback` is automatically executed with a un-retained held value payload.

## Deep Explanation

### WeakRef Lifecycle

```
Strong Reference:  [ Variable ] ═══════════════► [ Target Object ] (Kept alive forever!)
Weak Reference:    [ WeakRef ] ─ ─ ─ ─ ─ ─ ─ ─ ─► [ Target Object ] ──(GC Reclaims!)──► Deref returns undefined!
```

## Production Example

```javascript
// Production Pattern: Memory-Safe Weak Image Cache using WeakRef & FinalizationRegistry
export class WeakImageCache {
  private cache = new Map();
  private registry;

  constructor() {
    // 1. Register Finalization Registry cleanup callback
    this.registry = new FinalizationRegistry((key) => {
      console.log(`[GC Eviction] Object associated with key '${key}' was garbage collected.`);
      this.cache.delete(key); // Evict stale map entry!
    });
  }

  set(key, imageBuffer) {
    // Store WeakRef in cache map!
    this.cache.set(key, new WeakRef(imageBuffer));
    // Register target object for GC monitoring
    this.registry.register(imageBuffer, key);
  }

  get(key) {
    const ref = this.cache.get(key);
    if (!ref) return undefined;

    const cachedImage = ref.deref();
    if (cachedImage) {
      return cachedImage; // Cache hit!
    } else {
      // Object was garbage collected by V8 engine
      this.cache.delete(key);
      return undefined;
    }
  }
}
```

## Best Practices

- Use `WeakRef` sparingly for non-critical secondary caches (e.g. image buffers, web socket message caches) where data can be re-fetched if garbage collection occurs.
- Avoid relying on `FinalizationRegistry` for timing-critical business logic — JS engines do NOT guarantee exact timing for when GC cleanup callbacks fire.

## Common Mistakes

- Holding strong references to objects in the same scope where `WeakRef` is tested, preventing GC from reclaiming the target object.

## Follow-up Questions

1. How do `WeakMap` and `WeakSet` differ from `WeakRef` in terms of key iteration and garbage collection mechanics?

## Related Topics

- V8 Garbage Collector Architecture: Generational GC
- ES6 collections: Map, Set, WeakMap, WeakSet
