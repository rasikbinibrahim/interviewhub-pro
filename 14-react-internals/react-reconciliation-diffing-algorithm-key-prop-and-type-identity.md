# QINT003 · React Reconciliation: Diffing Algorithm, Key Prop, and Type Identity

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Meta, Google, Amazon  
**Interview Frequency:** ★★★★★  
**Category:** React Internals  
**Concepts:** Reconciliation, Heuristic diffing, Key prop, Element type, Tree subtree unmounting  

## Expected Answer

React's O(N) reconciliation algorithm uses two key heuristics: elements of different types produce different trees, and keys identify stable child elements across renders.

## Deep Explanation

Generic tree diffing algorithms run in O(N^3) time. React reduces this to O(N) using heuristics: 1. If element type changes (e.g. <div> to <section>), React destroys the old subtree, unmounting components and discarding state. 2. When comparing children, React uses the key prop to match nodes across renders, enabling efficient element insertion, deletion, and reordering without destroying DOM nodes.

## Production Example

Using array index as key (key={index}) when items can be reordered or filtered causes state contamination bugs where component state remains attached to the wrong item index.

## Best Practices

- Use stable, unique IDs (e.g. database item ID) as keys for array elements
- Never use random numbers or array indices as keys for dynamic lists

## Trade-offs

- Heuristic diffing sacrifices theoretical optimal tree transformation for O(N) speed
- Changing component container element type forces complete subtree re-mounting

## Common Mistakes

- Using key={Math.random()} causing components to destroy and re-mount on every render
- Defining component functions inside other component render bodies, changing element type identity

## Follow-up Questions

1. Why does defining a component inside another component cause state loss on every render?
2. How does Fiber compare child lists during single-child vs multi-child reconciliation?

## Related Topics

- React Keys Rationale
- Fiber Node Structure
