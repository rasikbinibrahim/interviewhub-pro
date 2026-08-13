# QADVJS054 · Virtual DOM Diffing and Patch Algorithm Fundamentals

**Difficulty:** Hard  
**Experience Level:** Staff / Principal  
**Companies:** Meta, Google, Microsoft  
**Interview Frequency:** ★★★★☆  
**Category:** Advanced JavaScript  
**Concepts:** Virtual DOM nodes, Reconciliation, Minimal DOM mutation

## Expected Answer

React's diffing algorithm compares the previous and new virtual DOM trees to compute the minimal set of real DOM mutations needed, without touching the real DOM during comparison itself. A fully general tree-diff algorithm — finding the true minimal edit distance between two arbitrary trees — is O(n³) and far too slow to run on every render, so React uses a heuristic-based algorithm that trades some diffing accuracy for speed: it compares trees level-by-level rather than doing arbitrary cross-level node matching, assumes two elements of different types at the same position produce entirely different subtrees, and relies on the `key` prop to correctly match list items that were reordered, inserted, or removed, instead of assuming position alone indicates identity.

## Deep Explanation

The heuristic rules break down concretely: different element types at the same tree position — a `<div>` replaced by a `<span>`, or one class component replaced by a different one — are assumed to produce fundamentally different trees, so React unmounts the old subtree entirely (destroying its state, running cleanup effects) and mounts a fresh one, rather than attempting to diff their children. Same element type at the same position is assumed comparable, so React keeps the underlying DOM node and updates only the changed attributes and children. For lists of children without a `key`, React defaults to comparing by index position, which is wrong whenever items are reordered, inserted, or removed from the middle — it produces extra unnecessary DOM mutations, or worse, incorrectly reuses a DOM node's (and its uncontrolled state's) identity for what is conceptually a different list item. `key` gives React a stable identity per item independent of position, letting the algorithm correctly distinguish "this is the same conceptual item, just moved" from "this is a new item," producing a minimal and correct patch even under reordering. This comparison happens during React's render phase — interruptible, produces a list of pending effects/patches without touching the DOM — and the actual DOM mutations are applied afterward during the synchronous commit phase.

## Production Example

A very common real bug class is rendering a reorderable or filterable list with `key={index}` — or no key at all. Consider a to-do list where items can be deleted from anywhere: after a deletion, React's index-based diffing reuses each remaining `<input>` DOM node for a "new" index position, meaning any uncontrolled input state — text mid-edit, a checkbox's focus — ends up attached to the wrong to-do item after the list shifts. This is a frequently-reported real bug, fixed simply by using a stable, unique `key` (an actual item ID) instead of the array index.

## Best Practices

- Always use a stable, unique identifier as `key` for list items — a database ID, not the array index — whenever the list can be reordered, filtered, or have items inserted or removed anywhere but the very end.
- Reserve index-as-key for lists that are genuinely static — never reordered, items never added or removed except possibly at the end, and items carry no internal state or uncontrolled inputs — since only in that narrow case do index and stable identity actually coincide.
- Understand that changing an element's type at a given position — conditionally rendering `<div>` versus `<span>`, or swapping which component renders in that spot — resets all state and effects for that subtree; this is sometimes exploited deliberately, changing `key` on an otherwise-same-type element to force a full remount and reset a component's internal state.

## Trade-offs

React's O(n) heuristic diffing — linear in element count, achieved by never doing arbitrary cross-position tree matching — trades true diff-minimality for practical performance. A fully general tree-diff would find the objectively smallest possible patch in pathological cases, but at O(n³) cost that would make every render of any nontrivial UI far too slow. The heuristic is "wrong" (non-minimal, or in the worst case incorrect about identity) specifically in the cases its assumptions don't hold — elements reordered without keys, or a same-position element that actually represents conceptually different content — which is exactly why `key` exists: an escape hatch for developers to supply information the heuristic can't infer on its own.

## Common Mistakes

- Describing the algorithm as finding a globally optimal minimal edit distance between trees — it explicitly does not, since that's the O(n³) algorithm React deliberately avoids.
- Using array index as `key` on a reorderable or filterable list without understanding why it causes subtle state bugs on reorder.
- Treating `key` as only about "silencing a console warning" rather than understanding it's the actual identity signal the diffing algorithm depends on for correctness.
- Believing the virtual DOM's purpose is primarily raw speed in the abstract, rather than more precisely: batching and minimizing actual DOM mutations — the genuinely expensive operation — by computing the full diff in memory first.

## Follow-up Questions

1. Why would a fully general tree-diffing algorithm be too slow for React to use on every render?
2. What specifically goes wrong if you use array index as `key` on a list where items can be removed from the middle?
3. What happens to a component's state and effects when React sees a different element type at the same tree position?
4. How does the `key` prop change list diffing from an index-based comparison to an identity-based one?
5. How does the render phase's diffing relate to the commit phase's actual DOM mutation — why are they kept separate?

## Related Topics

- React Fiber architecture (see TECHNICAL_QUESTION_TEMPLATE.md's worked example — the execution model wrapped around this diffing)
- Imperative vs. declarative programming paradigms in JS (02-javascript-fundamentals)
- React reconciliation and list keys (63-react-coding)
