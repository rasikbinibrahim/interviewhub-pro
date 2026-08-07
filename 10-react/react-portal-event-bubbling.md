# T1023 · React Portals (`createPortal`) & Synthetic Event Bubbling

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft  
**Category:** React  
**Concepts:** react-portals, createportal, synthetic-events, event-bubbling  

## Question

Why do events triggered inside a React Portal (`ReactDOM.createPortal(child, container)`) bubble up through the **React Component Tree** instead of the DOM Tree?

## Expected Answer

- **DOM Location**: Renders child element into a different DOM container (`document.body`).
- **React Synthetic Event Tree**: React maintains synthetic event bubbling based on **Virtual DOM component hierarchy**, regardless of where the portal node lives in physical DOM tree.
