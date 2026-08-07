# T1025 · Controlled vs Uncontrolled Form Components in React

**Difficulty:** Easy  
**Companies Asked:** Meta, Google, Amazon, Microsoft  
**Category:** React  
**Concepts:** react, controlled-components, uncontrolled-components, useref  

## Question

What are the architectural trade-offs between **Controlled Components** (state-driven via `value` + `onChange`) and **Uncontrolled Components** (DOM-driven via `useRef` + `defaultValue`)?

## Expected Answer

- **Controlled**: React state `useState` is single source of truth. Instant validation and dynamic formatting on every keystroke.
- **Uncontrolled**: DOM stores form data. Accessed via `useRef()`. Better performance for large forms or file inputs (`<input type="file" />`).
