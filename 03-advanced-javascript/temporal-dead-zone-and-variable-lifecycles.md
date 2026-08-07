# T301 · Temporal Dead Zone (TDZ) & Variable Creation Lifecycles

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** Advanced JavaScript  
**Concepts:** tdz, temporal-dead-zone, hoisting, execution-context, variable-lifecycle  

## Question

What is the Temporal Dead Zone (TDZ) in JavaScript, why do `let` and `const` variables experience a TDZ while `var` does not, and what are the exact compilation/execution phase mechanics that cause accessing a TDZ variable to throw a `ReferenceError`?

## Expected Answer

1. **Temporal Dead Zone (TDZ)**: The period of time between entering a scope (where a variable is declared) and the actual line of code where the variable initialization is executed.
2. **Variable Lifecycle Phases**:
   - **Declaration**: Allocates a binding in the lexical environment scope memory.
   - **Initialization**: Assigns a memory slot and initial value (`undefined` for `var` / uninitialized for `let`/`const`).
   - **Assignment**: Assigns the actual user-specified value at runtime.
3. **`var` vs `let`/`const` Lifecycle**:
   - `var`: **Declaration + Initialization (`undefined`)** occur together during scope creation phase. `var` has NO TDZ.
   - `let`/`const`: **Declaration** occurs during scope creation phase, but **Initialization** is deferred until the runtime execution line is reached. Accessing `let`/`const` while in an uninitialized state throws `ReferenceError: Cannot access 'x' before initialization`.

## Deep Explanation

### 1. Scope Creation vs Execution Timeline

```
Entering Scope {
  |----------------------------------------------------|  <-- Scope Created (var = undefined, let = UNINITIALIZED)
  |  TEMPORAL DEAD ZONE (TDZ)                          |  <-- Attempting to read/write `let x` HERE throws ReferenceError!
  |----------------------------------------------------|
  |  let x = 10;                                       |  <-- Initialization Executed (TDZ ends for `x`)
  |  console.log(x); // 10                             |  <-- Safe Access
}
```

### 2. TDZ is Temporal (Time-Based), Not Spatial (Location-Based)
TDZ depends on the **order of execution in time**, not the physical placement of lines in code text:

```javascript
// Spatial example proving TDZ is time-based:
function example() {
  // Line 1 physically above `let greeting`, but called AFTER initialization
  const fn = () => console.log(greeting); 
  
  let greeting = "Hello World"; // Initialization line
  
  fn(); // Safe! Runs at t_1 (after initialization)
}
example(); // Output: "Hello World"
```

## Production Example

```javascript
// TDZ Pitfall in Default Parameters
function calculateTotal(price, tax = price * 0.1) {
  return price + tax;
}
console.log(calculateTotal(100)); // 110 (Works)

// TDZ Bug: Parameter `a` references parameter `b` before `b` is initialized
function invalidDefaults(a = b, b = 5) {
  return a + b;
}
// invalidDefaults(); // Uncaught ReferenceError: Cannot access 'b' before initialization

// TDZ Pitfall in Class Declarations
// new MyClass(); // Uncaught ReferenceError: Cannot access 'MyClass' before initialization
class MyClass {
  constructor() {
    this.name = 'Component';
  }
}
```

## Best Practices

- Always declare variables at the top of their enclosing block scope to minimize the temporal window of the TDZ.
- Use `const` by default, `let` when reassignment is explicitly necessary, and avoid `var` entirely.

## Common Mistakes

- Believing `let` and `const` are not hoisted — they ARE hoisted into the lexical environment, which is why they shadow outer variables even while in TDZ.
- Using `typeof` on uninitialized `let` variables expecting `"undefined"` — `typeof uninitializedLet` throws a `ReferenceError` inside TDZ! (`typeof uninitializedVar` returns `"undefined"`).

## Follow-up Questions

1. Why does `typeof` throw a ReferenceError for `let`/`const` in TDZ but return `"undefined"` for undeclared variables?
2. How does the V8 engine track uninitialized bindings in the LexicalEnvironment object?

## Related Topics

- Scope, Scope Chain & Lexical Environment
- Execution Context & Call Stack
