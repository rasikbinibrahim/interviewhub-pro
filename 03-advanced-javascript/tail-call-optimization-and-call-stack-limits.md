# T312 · Call Stack Overflow Limits & Tail Call Optimization (TCO)

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Apple  
**Interview Frequency:** ★★★☆☆  
**Category:** Advanced JavaScript  
**Concepts:** call-stack, tco, tail-call-optimization, recursion, stack-overflow  

## Question

What causes a JavaScript `RangeError: Maximum call stack size exceeded` error, how does Proper Tail Call Optimization (PTC / TCO) reuse stack frames in ES6, and how do you rewrite deep recursive algorithms using **Trampolining** to prevent stack overflow in non-TCO JavaScript engines?

## Expected Answer

1. **Call Stack Limits & Stack Overflow**:
   - Every function call pushes a new **Stack Frame** onto the V8 Call Stack (storing parameters, local variables, return address).
   - Un-bounded deep recursion fills the finite call stack limit (~10,000 frames in Chrome/V8), throwing `RangeError: Maximum call stack size exceeded`.
2. **Proper Tail Call Optimization (PTC / TCO)**:
   - In ES6 strict mode, if the **VERY LAST statement** executed by a function is a direct return of another function call `return g(x)` without requiring further computation in the caller, the engine reuses the current stack frame instead of pushing a new frame ($O(1)$ stack space!).
3. **Trampolining Technique**:
   - A strategy for non-TCO engines where a recursive function returns a thunk (`() => fn(...)`) instead of invoking itself. A while loop repeatedly executes thunks until a final value is produced, converting deep recursion into a flat $O(1)$ stack while loop!

## Deep Explanation

### Standard Recursion vs Trampolined Execution

```
Standard Deep Recursion (Stack Overflow Risk):
Stack: [ factorial(10000) ] -> [ factorial(9999) ] -> ... (10,000 stack frames!)

Trampolined Execution (Flat O(1) Stack):
Loop:  Execute Thunk() -> Execute Thunk() -> Execute Thunk() (Always 1 stack frame!)
```

## Production Example

```javascript
// 1. Stack-Overflowing Deep Recursion
function sumRecursive(n, acc = 0) {
  if (n <= 0) return acc;
  return sumRecursive(n - 1, acc + n); // Deep recursion!
}
// sumRecursive(100000); // Uncaught RangeError: Maximum call stack size exceeded!

// 2. Trampolined Recursion (Zero Stack Overflow!)
export function trampoline(fn) {
  return function (...args) {
    let result = fn.apply(this, args);
    // While result is a thunk function, continue unwinding in loop!
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
}

// Trampoline-Safe Recursive Target (Returns Thunk Function)
function sumTrampolinedHelper(n, acc = 0) {
  if (n <= 0) return acc;
  // Return THUNK function instead of calling directly!
  return () => sumTrampolinedHelper(n - 1, acc + n);
}

export const safeSum = trampoline(sumTrampolinedHelper);

console.log(safeSum(1000000)); // Output: 500000500000 (Safe O(1) stack execution!)
```

## Best Practices

- Use trampolining or convert deep recursive tree/graph traversals into iterative while loops using an explicit array stack when processing deep data structures ($>10,000$ levels).
- Avoid relying on ES6 TCO in browser applications because Safari is currently the only major browser engine implementing TCO.

## Common Mistakes

- Performing operations after a tail call (`return 1 + sum(n - 1)`), which invalidates tail position because the caller stack frame must remain alive to add `1`.

## Follow-up Questions

1. Why did V8 and SpiderMonkey browser engine teams opt against enabling TCO by default despite its inclusion in the ES6 specification?

## Related Topics

- Event Loop Execution Order: Macrotasks vs Microtasks
- Iterators, Generators & Async Iterables
