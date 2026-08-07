# QBI005 · V8 Engine JIT Compilation and Inline Caches

**Difficulty:** Hard  
**Experience Level:** Senior (5-7 YOE)  
**Companies:** Google, Cloudflare, Meta  
**Interview Frequency:** ★★★★☆  
**Category:** Browser Internals  
**Concepts:** V8 Engine, Ignition Interpreter, TurboFan Compiler, Hidden Classes (Shapes), Inline Caches  

## Expected Answer

V8 uses a two-tier compiler architecture: Ignition interprets JavaScript AST into bytecode, while TurboFan compiles hot functions into optimized machine code based on type feedback collected via Inline Caches (ICs).

## Deep Explanation

JavaScript objects are dynamic dictionaries. V8 assigns internal "Hidden Classes" (Shapes) to track property offsets. When a function repeatedly receives objects with identical hidden classes, TurboFan generates fast-path machine code using Inline Caches. Passing objects with fluctuating properties causes "deoptimization" back to interpreted bytecode.

## Production Example

Constructing objects by adding properties in varying orders ({ a: 1, b: 2 } vs { b: 2, a: 1 }) creates distinct Hidden Classes, degrading hot function performance due to polymorphic/megamorphic IC call sites.

## Best Practices

- Initialize object properties in a consistent order inside constructor functions
- Avoid deleting object properties using delete; set properties to null or undefined instead

## Trade-offs

- JIT compilation provides massive execution speedups for monomorphic code paths
- Deoptimizations incur memory and CPU penalty during runtime bailout

## Common Mistakes

- Dynamically adding arbitrary properties to objects inside hot performance loops
- Expecting deleted object keys to retain optimal memory offsets

## Follow-up Questions

1. What is the difference between monomorphic, polymorphic, and megamorphic inline cache states?
2. How does V8 deal with object property access vs element index access?

## Related Topics

- Memory Layout in Execution Engines
- Performance
