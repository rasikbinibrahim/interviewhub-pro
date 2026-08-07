# T429 · Namespaces vs ES Modules in TypeScript

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Microsoft  
**Category:** TypeScript  
**Concepts:** namespaces, es-modules, internal-modules  

## Question

Why are legacy TypeScript **Namespaces** (`namespace Utility {}`) discouraged in favor of standard ES Modules (`import`/`export`) in modern applications?

```typescript
// Legacy Namespace (IIFE scoping object)
namespace MathUtils {
  export function add(a: number, b: number) { return a + b; }
}

// Preferred ES Module
export function add(a: number, b: number) { return a + b; }
```
