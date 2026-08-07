# T207 · JavaScript Strict Mode (`'use strict'`) & ES6 Modules (`import` / `export`)

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe  
**Interview Frequency:** ★★★★☆  
**Category:** JavaScript  
**Concepts:** strict-mode, es6-modules, import-export, module-scope, bundling  

## Question

What safety mechanisms does JavaScript Strict Mode (`'use strict'`) enforce, how do ES6 Modules (`import` / `export`) differ structurally from CommonJS (`require` / `module.exports`), and why are ES6 modules strict by default?

## Expected Answer

1. **Strict Mode Safety Enforcements**:
   - Throws errors for silent failures (assigning to read-only properties, modifying non-writable globals).
   - Prevents implicit global variable creation (`x = 10` without `var`/`let`/`const` throws `ReferenceError`).
   - Sets default `this` to `undefined` inside plain functions instead of binding to `window` / `globalThis`.
   - Prohibits duplicate parameter names (`function foo(a, a) {}` throws `SyntaxError`).
   - Disables legacy `with` statements and `octal` literals (`0123`).
2. **ES6 Modules vs CommonJS**:
   - **ES6 Modules (ESM)**: Static module structure evaluated at compile-time. Supports tree-shaking, top-level `await`, and asynchronous loading. Strictly scoped by default (`'use strict'` is implicitly enabled).
   - **CommonJS (CJS)**: Dynamic module structure evaluated at runtime (`require()` calls execute synchronously). Cannot be tree-shaken statically.

## Deep Explanation

### Module Comparison Matrix

| Property | ES6 Modules (ESM) | CommonJS (CJS) |
|---|---|---|
| **Syntax** | `import { foo } from './foo.js'` | `const { foo } = require('./foo')` |
| **Parsing Phase** | Static (Compile-time) | Dynamic (Runtime) |
| **Tree Shaking** | Supported | Not Supported |
| **Strict Mode** | Always enabled implicitly | Optional (`'use strict'`) |
| **Top-Level `this`** | `undefined` | `exports` object |
| **Top-Level `await`** | Supported natively | Not Supported |

## Production Example

```javascript
// mathUtils.js (ESM Module)
// Implicitly running in 'use strict' mode!

export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export default function multiply(a, b) {
  return a * b;
}

// Strict Mode Safety Behavior:
function testStrictThis() {
  console.log(this); // In ESM, `this` is ALWAYS undefined (not `window`)
}
testStrictThis();
```

```javascript
// main.js (Consuming ESM)
import multiply, { add, PI } from './mathUtils.js';

console.log(add(5, 10)); // 15
console.log(multiply(3, 4)); // 12
```

## Best Practices

- Always use ES6 `import`/`export` syntax in modern web apps to enable bundler tree-shaking (removing unused exports from production JS bundles).
- Add `"type": "module"` to `package.json` when writing modern Node.js applications.

## Common Mistakes

- Attempting to conditionally wrap `import` statements inside `if` blocks (`if (condition) import x from 'x'`). Use dynamic `import('./x.js')` function calls for conditional runtime loading.

## Follow-up Questions

1. How does dynamic `import()` returning a Promise enable route-based code splitting in React (`React.lazy`)?

## Related Topics

- Scope, Scope Chain & Lexical Environment
- Vite ESM Dev Server HMR vs Webpack
