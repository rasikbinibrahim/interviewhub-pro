# T424 · Enums vs `const enum` vs Union String Types

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** TypeScript  
**Concepts:** typescript, enums, const-enum, string-unions  

## Question

Why are **Union String Types** (`type Direction = 'North' | 'South'`) and `as const` objects preferred over TypeScript `enum` and `const enum` declarations in modern codebases?

## Expected Answer

- **Numeric Enums**: Emit reverse mapping JS IIFE boilerplate code (`Direction[Direction.North = 0] = "North"`).
- **`const enum`**: Inlined at compile time, but breaks under `isolatedModules` (Babel / Vite transpilers).
- **String Union Types**: Zero JS code output. Fully type-safe and JSON compatible.
