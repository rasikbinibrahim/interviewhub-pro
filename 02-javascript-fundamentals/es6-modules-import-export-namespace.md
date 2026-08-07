# T232 · ES6 Modules (ESM) vs CommonJS (CJS) Architecture

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Vite  
**Category:** JavaScript  
**Concepts:** es6-modules, commonjs, esm, bundling  

## Question

How do **ES6 Modules (ESM)** (`import`/`export`) differ from **CommonJS (CJS)** (`require`/`module.exports`) regarding static loading vs dynamic execution, live bindings, and tree shaking?

## Expected Answer

- **ESM**: Static compilation, asynchronous loading, live read-only bindings, tree-shaking friendly.
- **CommonJS**: Dynamic runtime loading (`require()` inside `if` statements), synchronous file system reads, exports value copies.
