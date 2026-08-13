# QADVJS049 · Event Delegation Pattern and Event Propagation Phases

**Difficulty:** Easy  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Google, Meta, Amazon  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** Event delegation, Capturing phase, Bubbling phase, event.target vs event.currentTarget

## Expected Answer

When an event fires, it travels through three phases: capture (from `window` down to the target element, observed only by listeners registered with `{capture: true}`), target (the event reaching the element it actually happened on), and bubble (traveling back up from the target to `window`, the default phase most listeners use). Event delegation exploits bubbling: instead of attaching a listener to every individual child element, you attach a single listener to a common ancestor and use `event.target` inside the handler — typically via `event.target.closest(selector)` — to determine which specific child was actually interacted with.

## Deep Explanation

`addEventListener`'s third argument (or its `capture` option in the options object) controls which phase a given listener is attached to; by default listeners run during the bubble phase. `event.target` is the actual element the event originated on, while `event.currentTarget` is the element the currently-running listener is attached to — these differ specifically in delegation, where `currentTarget` is the parent container and `target` is whichever deeper child the user actually interacted with. `stopPropagation()` halts the event's further travel through any remaining phases, including to other listeners further up the tree. Not every event bubbles — `focus` and `blur` don't by default, which is why the bubbling equivalents `focusin`/`focusout` exist specifically to make focus-related delegation possible.

## Production Example

A large dynamically-rendered list — a data table with thousands of rows, or a chat app's message list that appends new messages continuously — is the canonical case. Attaching an individual click listener to every row is expensive to set up at scale (thousands of listener registrations) and breaks for rows added later unless a new listener is deliberately wired up every time a row is added, which is easy to forget or to leak by not cleaning up removed rows' listeners. Delegating a single click listener to the list's container, then checking `event.target.closest('.row')` inside the handler, requires exactly one listener regardless of row count, works automatically for rows added later with zero additional wiring, and has no per-row listener to clean up.

## Best Practices

- Delegate at the narrowest reasonable ancestor rather than defaulting to `document`, to avoid the handler doing unnecessary work checking `event.target` on every event bubbling through unrelated parts of the page.
- Use `event.target.closest(selector)` rather than a strict `event.target === expectedElement` check, since the actual click target is often a nested child (an icon or text node inside the intended clickable row), not the row element itself.
- Remember that non-bubbling events (`focus`/`blur`, and custom events dispatched without `{bubbles: true}`) need either capture-phase delegation or the bubbling-equivalent event name.

## Trade-offs

Delegation reduces memory usage (one listener instead of N) and automatically handles dynamically added or removed elements, at the cost of a small amount of per-event work in the handler — walking up with `.closest()` to identify the real target — and slightly less code locality, since the handler for "clicking a row" now lives on the parent container rather than being attached directly to the row. For a small, static, fixed set of elements, direct listeners are simpler and the delegation overhead isn't worth paying.

## Common Mistakes

- Comparing `event.target` directly to the intended element instead of using `.closest()`, which breaks whenever the click actually lands on a nested child (an `<svg>` icon inside a button, for example).
- Forgetting that some events (focus, blur, and custom events not dispatched with `{bubbles: true}`) don't bubble and so can't be delegated the normal way.
- Calling `stopPropagation()` inside a delegated handler without realizing it can break other delegated listeners further up the tree that were relying on the same bubble.
- Assuming capture-phase listeners fire "instead of" bubble-phase ones, rather than understanding both phases occur on every dispatch and each listener only reacts to the phase it registered for.

## Follow-up Questions

1. What's the difference between `event.target` and `event.currentTarget` inside a delegated handler?
2. Which events don't bubble, and how would you delegate handling for one anyway?
3. What does the third argument to `addEventListener` actually control, and when would you set `capture: true`?
4. How does event delegation interact with `stopPropagation()` called by a nested handler?
5. Would you delegate a listener for a form's individual input `change` events, or attach them directly — and why?

## Related Topics

- 05-browser-internals (DOM event model)
- React's synthetic event system
- Memory leaks from unremoved event listeners
