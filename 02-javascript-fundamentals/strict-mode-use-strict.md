# T235 · JavaScript Strict Mode (`'use strict'`) Safety Guardrails

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** strict-mode, use-strict, clean-code  

## Question

What silent errors does `'use strict'` convert into thrown `TypeError` or `ReferenceError` exceptions (e.g., accidental globals, mutating read-only properties, duplicate parameter names)?

## Expected Answer

- Converts silent fails on read-only assignments into explicit `TypeError`.
- Forbids undeclared accidental global variables (`x = 10` throws `ReferenceError`).
- Sets global function `this` to `undefined` instead of `window`.
