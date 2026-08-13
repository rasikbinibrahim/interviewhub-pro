# QADVJS048 · Structured Cloning API vs JSON stringify Deep Copy

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Meta, Amazon  
**Interview Frequency:** ★★★★☆  
**Category:** Advanced JavaScript  
**Concepts:** structuredClone(), Deep copy, Circular references, Transferables

## Expected Answer

`structuredClone()` is a native, built-in deep-clone function that correctly handles data types the `JSON.stringify`/`parse` trick cannot: it preserves `Date` objects as actual `Date` instances (not ISO strings), correctly clones `Map`, `Set`, `RegExp`, and typed arrays, and — critically — handles circular references without throwing. The `JSON.stringify`/`JSON.parse` deep-copy trick is older and more limited: it silently drops functions, `undefined` values, and `Symbol` keys/values, converts `Date` objects into plain strings (losing the `Date` type on the way back), and throws a `TypeError` on any circular reference.

## Deep Explanation

`structuredClone` implements the "structured clone algorithm" — the same algorithm browsers already used internally for `postMessage`, IndexedDB storage, and Worker communication, now exposed directly as a callable function since it's broadly useful outside those contexts too. It can clone primitives, plain objects/arrays, `Date`, `RegExp`, `Map`, `Set`, `Blob`, `File`, and `ArrayBuffer`/typed arrays, and it correctly handles cycles — an object referencing itself, or a longer reference cycle — by tracking already-cloned references during the walk. It cannot clone functions, DOM nodes, or property accessors (getters/setters); these throw a `DataCloneError`, because they carry live behavior or engine-internal state rather than pure data — exactly the boundary the structured clone algorithm was defined around. `JSON.stringify`/`parse`, by contrast, isn't a clone algorithm at all — it's a serialization round-trip, so its behavior is entirely defined by JSON's own data model (objects, arrays, strings, numbers, booleans, `null`), which never included `Date`, `Map`, `Set`, or cycles as first-class concepts to begin with.

## Production Example

A real, recurring production bug is deep-cloning application state containing a `Date` field using the JSON trick: after `JSON.parse(JSON.stringify(state))`, `state.createdAt` is no longer a `Date` instance but a plain string, and any downstream code calling `.getMonth()` or doing date arithmetic on it throws or silently misbehaves. A second common failure is cloning a tree-like structure that has a `parent` back-reference alongside `children` — common in DOM-like or org-chart-like data models — where `JSON.stringify` throws immediately on the cycle, while `structuredClone` handles it correctly, since cycle detection is built into the algorithm. Teams migrating a `JSON.parse(JSON.stringify(x))` deep-clone utility to `structuredClone()` are typically doing it specifically to fix one of these two bug classes.

## Best Practices

- Default to `structuredClone()` for genuine deep-cloning of in-memory data in modern environments (broadly supported in browsers and Node 17+), since it's both more correct and typically faster than a serialization round-trip.
- Use `JSON.stringify` specifically when the actual goal is preparing data for JSON transport (an API request body) and stripping functions/`undefined`/`Symbol`s is desired behavior — that's a different goal from deep-cloning an in-memory object, even though it's often reused for that purpose.
- Remember `structuredClone` still throws on functions and DOM nodes, so neither approach is a universal "clone anything" solution — a manual or library-based clone is still needed for those cases.

## Trade-offs

`structuredClone` is more correct and more broadly capable — more types, cycle support — but is a comparatively newer API, so older-environment support needs checking (though it's now widely available), and like the JSON trick it still cannot clone functions or DOM nodes. The JSON trick runs in essentially every JS environment including very old ones, at the cost of silently losing data types (`Date`, `undefined`, functions) rather than throwing — arguably worse than an explicit failure, since it fails silently in production instead of loudly in development.

## Common Mistakes

- Assuming `JSON.parse(JSON.stringify(x))` is a safe, general-purpose deep clone — it silently corrupts `Date`s into strings, drops functions/`undefined`, and throws on any circular reference.
- Assuming `structuredClone` can clone anything, including functions or class instances with prototype methods — it clones the plain-data shape only; cloning a class instance returns a plain object, not an instance of the original class.
- Not realizing `JSON.stringify` throwing on a circular reference is a real crash risk if the shape of the data being cloned isn't tightly controlled (for example, cloning loosely-typed or user-provided data that might contain a back-reference).

## Follow-up Questions

1. What happens to a `Date` field when you clone an object with `JSON.parse(JSON.stringify(obj))`?
2. Why does `JSON.stringify` throw on a circular reference, and how does `structuredClone` avoid that?
3. Can `structuredClone` clone a class instance and preserve its prototype methods? Why or why not?
4. When would you still prefer `JSON.stringify` over `structuredClone` despite its limitations?
5. What error does `structuredClone` throw when given a function or DOM node, and why is that the correct behavior?

## Related Topics

- BigInt serialization pitfalls (03-advanced-javascript — another `JSON.stringify` limitation)
- Immutability mechanics and `Object.freeze` (02-javascript-fundamentals)
- `postMessage` and Web Workers
