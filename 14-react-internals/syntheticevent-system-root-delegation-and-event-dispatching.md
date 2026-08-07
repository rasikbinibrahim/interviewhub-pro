# QINT004 · SyntheticEvent System: Root Delegation and Event Dispatching

**Difficulty:** Medium  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Meta, Google, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** React Internals  
**Concepts:** SyntheticEvent, Event delegation, Root container, Event pooling, Native event mapping  

## Expected Answer

React wraps native browser events in cross-browser SyntheticEvent objects. In React 17+, all event listeners are delegated to the root DOM container element (rootNode) rather than document.

## Deep Explanation

Instead of attaching event listeners to individual DOM nodes, React attaches a single listener per event type to the root DOM container (e.g. #root). When a browser event fires, it bubbles to the root container where React's event system intercepts it, constructs a SyntheticEvent wrapper, dispatches it through the React component tree hierarchy, and executes component event handlers.

## Production Example

In React 17+, stopping propagation (e.stopPropagation()) inside a React event handler prevents bubbling up the React component tree while allowing non-React legacy micro-frontends outside root to behave predictably.

## Best Practices

- Rely on React event handlers (onClick) rather than attaching manual addEventListener to DOM nodes
- Use e.nativeEvent when native browser event properties are required

## Trade-offs

- SyntheticEvent provides cross-browser normalization and memory efficiency via root delegation
- Event pooling was removed in React 17, allowing async event parameter access

## Common Mistakes

- Assuming onClick event listeners are attached directly to the Target DOM element
- Calling e.persist() in React 17+ where event pooling is deprecated

## Follow-up Questions

1. Why did React move event delegation from document to root container in React 17?
2. How does native event capture phase interact with React SyntheticEvent dispatching?

## Related Topics

- Browser Event Loop
- DOM Event Delegation
