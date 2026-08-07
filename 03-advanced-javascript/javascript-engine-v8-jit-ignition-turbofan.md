# T316 · V8 Engine Architecture: Ignition Interpreter & TurboFan JIT Compiler

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Cloudflare  
**Category:** Advanced JavaScript  
**Concepts:** v8-engine, jit-compiler, ignition, turbofan, hidden-classes  

## Question

How does Chrome's V8 JavaScript engine compile JS code using the **Ignition Bytecode Interpreter** and **TurboFan Optimizing JIT Compiler**, and how do **Hidden Classes (Shape/Map)** and Inline Caches (IC) optimize property lookups?

## Expected Answer

- **AST Parsing**: JS source code is parsed into an Abstract Syntax Tree (AST).
- **Ignition Interpreter**: Converts AST into bytecode and starts executing immediately (fast startup time). Collects type profiling feedback.
- **TurboFan JIT Compiler**: Hot functions are re-compiled into highly-optimized machine code based on type feedback.
- **De-optimization**: If type assumptions change (e.g. object shape mutation), TurboFan bails out back to Ignition bytecode execution.
- **Hidden Classes (Shapes)**: Objects created with identical key structures share hidden class pointers for fast offset property access.

```javascript
// Good: Constant hidden class shape! V8 creates 1 hidden class C0.
function Point(x, y) {
  this.x = x;
  this.y = y;
}
const p1 = new Point(1, 2);
const p2 = new Point(3, 4);

// Bad: Shape mutation triggers hidden class transition and de-optimization!
p2.z = 5;
```
