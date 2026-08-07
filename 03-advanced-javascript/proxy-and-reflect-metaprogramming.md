# T311 · ES6 Proxy & Reflect API: Traps, Data Binding & Vue 3 Reactivity Engine

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** proxy, reflect, metaprogramming, reactivity, traps, data-binding  

## Question

How does the ES6 `Proxy` object wrap target objects to intercept low-level operations (getting, setting, deleting properties, function invocation), why should `Reflect` methods always be used inside Proxy traps, and how does Vue 3's Reactivity Engine (`reactive()`) leverage Proxies over `Object.defineProperty`?

## Expected Answer

1. **Proxy & Reflect Concepts**:
   - **`Proxy(target, handler)`**: Wraps a `target` object and intercepts fundamental operations using handler **traps** (`get`, `set`, `deleteProperty`, `has`, `apply`).
   - **`Reflect` API**: A built-in object providing default implementation methods for all interceptable JavaScript operations (`Reflect.get`, `Reflect.set`).
2. **Why use `Reflect` inside Proxy Traps?**:
   - Preserves proper `this` binding when handling inherited properties or getter methods.
   - Returns boolean status results (`true`/`false`) instead of throwing unhandled type errors.
3. **Vue 3 Reactivity Engine vs `Object.defineProperty`**:
   - `Object.defineProperty`: Can only intercept existing properties; cannot detect new property additions or array index mutations automatically without hacky workarounds.
   - `Proxy`: Intercepts dynamic property additions (`obj.newProp = 123`), array index mutations (`arr[0] = val`), and `delete` operators natively.

## Deep Explanation

### Reactive State Engine with Proxy & Reflect

```javascript
// Minimal Reactive State Engine (Vue 3 Signal Prototype)
export function createReactiveObject(target, onChange) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      // If property value is a nested object, recursively wrap in Proxy!
      if (typeof value === 'object' && value !== null) {
        return createReactiveObject(value, onChange);
      }
      return value;
    },

    set(target, prop, value, receiver) {
      const oldValue = target[prop];
      // Execute native setting via Reflect
      const success = Reflect.set(target, prop, value, receiver);
      
      if (success && oldValue !== value) {
        onChange(prop, value, oldValue);
      }
      return success;
    },

    deleteProperty(target, prop) {
      const success = Reflect.deleteProperty(target, prop);
      if (success) {
        onChange(prop, undefined, null);
      }
      return success;
    },
  });
}
```

## Production Example

```javascript
import { createReactiveObject } from './reactiveStore';

const userState = createReactiveObject(
  {
    name: 'Alice',
    settings: { theme: 'dark' },
    tags: ['admin'],
  },
  (prop, newVal, oldVal) => {
    console.log(`[Reactivity Event] Property '${String(prop)}' updated to:`, newVal);
  }
);

// 1. Intercept Property Mutation
userState.name = 'Bob'; 
// Output: [Reactivity Event] Property 'name' updated to: Bob

// 2. Intercept Nested Property Mutation automatically!
userState.settings.theme = 'light';
// Output: [Reactivity Event] Property 'theme' updated to: light

// 3. Array Mutations
userState.tags.push('super-user');
// Output: [Reactivity Event] Property '1' updated to: super-user
```

## Best Practices

- Always forward operations to `Reflect[trapName](target, prop, ...args)` inside Proxy traps to maintain spec-compliant behavior.
- Recursively wrap returned nested objects inside `get()` traps to support deep reactivity on demand (lazy proxying).

## Common Mistakes

- Direct mutation `target[prop] = value` inside a `set()` trap without using `Reflect.set()`, breaking prototype inheritance and receiver `this` context binding.

## Follow-up Questions

1. Why does `Proxy` wrapping break private class field `#privateField` access unless `this` binding is explicitly handled?

## Related Topics

- ES6 Symbols & Metaprogramming
- State Management: Context API vs Zustand vs Redux
