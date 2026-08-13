# QJS322 · Immutability Mechanics and Object Freeze vs Structural Sharing

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Meta, Airbnb, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** Object.freeze, Shallow vs Deep freeze, Structural sharing, Immutability

## Expected Answer

`Object.freeze()` makes an object's own properties non-writable and non-configurable, but the freeze is shallow — if a property's value is itself an object, that nested object is not frozen and remains fully mutable. Structural sharing is a different, more scalable approach used by immutable-data libraries (Immer, Immutable.js) to avoid deep-cloning an entire object graph on every update: only the path from the root to the changed node is actually copied, while every unchanged subtree is shared by reference between the old and new versions — keeping updates cheap (roughly O(depth), not O(size of the whole tree)) while still guaranteeing the previous reference is untouched.

## Deep Explanation

`Object.freeze(obj)` prevents adding, removing, or reassigning `obj`'s own properties; in strict mode, an assignment to a frozen property throws a `TypeError`, while in sloppy mode it silently fails. The classic gotcha: `const state = Object.freeze({ user: { name: 'a' } }); state.user.name = 'b';` succeeds, because `state.user` itself was never frozen — freezing is shallow by definition, it only touches the object passed to it, not values reachable through it. A true deep freeze requires recursively walking every nested object and freezing each one, which is an O(n) operation over the whole graph and has to be re-applied any time a legitimately-updated copy is produced.

Structural sharing takes a fundamentally different approach: rather than freezing to prevent mutation, it builds new state by copying only the nodes on the path to the change and reusing every other node by reference. Immer implements this with a Proxy-based "draft": calling `produce(state, draft => { draft.items.push(x) })` gives you a Proxy standing in for the real state, records what the draft mutation touched, and then constructs a new, structurally-shared state object under the hood — the code reads like direct mutation, but the actual result is a new object with only the changed path copied. Immutable.js instead uses true persistent data structures (trie/HAMT-based internally) so structural sharing is the native representation, not a Proxy trick layered on top of plain objects.

## Production Example

Redux reducers must return new state without mutating the existing tree, because both time-travel debugging and `useSelector`/`connect`'s re-render-skipping logic depend on reference equality (`===`) between the previous and next state. A common real bug is writing `state.items.push(newItem)` inside a reducer: the array is mutated in place, so its reference is unchanged, `useSelector`'s shallow-equality check sees "no change," and the component silently fails to re-render even though the underlying data did change. Teams adopt Immer specifically so developers can write `draft.items.push(newItem)` — code that looks like direct mutation — while Immer's Proxy-based drafting produces a genuinely new, correctly structurally-shared state object underneath, avoiding this class of bug entirely.

## Best Practices

- Don't rely on `Object.freeze()` alone for deep-immutability guarantees on nested state — either write/use a recursive `deepFreeze()` utility and account for its O(n) cost, or use a library.
- Prefer Immer or the spread/rest pattern for nested application state rather than hand-rolled deep freezing in hot, frequently-updated paths.
- Reserve `Object.freeze()` for genuinely constant, rarely-changing data (config objects, enum-like maps) where the one-time freeze cost is negligible and there's no need to re-apply it.

## Trade-offs

Shallow `Object.freeze()` is essentially free at the top level but creates a false sense of safety on nested data. Deep freeze gives real protection but costs O(n) per freeze and must be repeated after every legitimate update, since the new object isn't automatically frozen. Structural sharing gives both safety and cheap updates, but requires adopting a library or pattern — Immer's Proxy drafting has its own small per-update overhead, and Immutable.js requires learning a non-native API with boxing/unboxing at the boundary where your app talks to plain JS objects.

## Common Mistakes

- Assuming `Object.freeze()` is recursive/deep by default — it is the single most common wrong answer to this question.
- Assuming frozen-object mutation always throws — it only throws in strict mode; in sloppy mode it silently no-ops, which is itself a common follow-up trap.
- Conflating "immutable" with "frozen" — a codebase can enforce immutable conventions (never mutate, always return new objects, enforced by lint rules and code review) without ever calling `Object.freeze()`.
- Not realizing structural sharing's cheap updates depend on reference-equality checks (`===`) on the way back up the tree, not deep value comparison — a naive deep-equality check would defeat the whole performance benefit.

## Follow-up Questions

1. Why does `state.user.name = 'x'` succeed on a frozen top-level object?
2. How would you implement a `deepFreeze()` utility, and what's its time complexity?
3. How does Immer's Proxy-based draft avoid actually mutating the original state object?
4. Why does Redux/`useSelector` rely on reference equality rather than deep equality, and what breaks if you mutate state directly?
5. How does a persistent data structure like Immutable.js's HAMT achieve near-O(1) reads while still using structural sharing?

## Related Topics

- Redux state management (63-react-coding)
- Proxy and Reflect API for metaprogramming (03-advanced-javascript)
- React re-render optimization
- WeakMap and WeakSet garbage collection (03-advanced-javascript)
