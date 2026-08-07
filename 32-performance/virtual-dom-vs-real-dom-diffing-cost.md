# T3218 · Virtual DOM Reconciliation Overhead vs Compiler Signals (Svelte / SolidJS)

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Vercel, Svelte  
**Category:** Performance  
**Concepts:** virtual-dom, signals, svelte, solidjs, performance  

## Question

Why is the Virtual DOM memory diffing pass ($O(N)$ allocation overhead) being challenged by fine-grained **Compiler Signals** (SolidJS / Svelte 5 Runes) that update physical DOM nodes directly with zero Virtual DOM overhead?

## Expected Answer

- **Virtual DOM (React)**: Allocates VNode trees on every render pass, diffs old vs new tree in memory, then batches DOM mutations.
- **Compiler Signals (SolidJS / Svelte 5)**: Compiles reactive dependencies into direct DOM setters (`node.textContent = value`) at build time. No VDOM allocation or tree diffing!
