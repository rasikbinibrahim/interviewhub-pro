# T203 · Closures, Lexical Environments & Encapsulation Patterns

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix, Stripe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** closures, lexical-environment, encapsulation, module-pattern, memory-leaks  

## Question

What is a Closure in JavaScript, how does a function retain access to variables from its outer Lexical Environment even after the outer function has returned, and how are closures used to implement data privacy (encapsulation) and function currying?

## Expected Answer

1. **Definition of Closure**: A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the **Lexical Environment**). In JavaScript, closures are created every time a function is created, at function creation time.
2. **Lexical Environment Persistence**: When an outer function executes, it creates an execution context with an Environment Record. Returning an inner function maintains a live reference `[[Environment]]` pointing to the outer Environment Record. This prevents the garbage collector from reclaiming the outer variables.
3. **Encapsulation Pattern**: Closures enable private state that cannot be accessed or mutated directly from outside the enclosing function scope, exposing only controlled accessor methods (`getter`/`setter`).

## Deep Explanation

### Memory Representation Diagram

```
+-------------------------------------------------------------+
| Outer Function Execution Context (e.g. createCounter())     |
| +---------------------------------------------------------+ |
| | LexicalEnvironment: { count: 0 }                        | |
| +---------------------------------------------------------+ |
+------------------------------+------------------------------+
                               ^
                               | [[Environment]] pointer
+------------------------------+------------------------------+
| Inner Function (increment / getCount)                       |
| Reassigned to external caller variable `counter`            |
+-------------------------------------------------------------+
```

## Production Example

```javascript
// Encapsulation via Closure (Private Module Pattern)
function createBankStore(initialBalance) {
  let balance = initialBalance; // Private state variable
  const transactionHistory = []; // Private audit log

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("Deposit amount must be positive");
      balance += amount;
      transactionHistory.push({ type: "DEPOSIT", amount, timestamp: Date.now() });
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      transactionHistory.push({ type: "WITHDRAWAL", amount, timestamp: Date.now() });
      return balance;
    },
    getBalance() {
      return balance; // Read-only access
    },
    getHistory() {
      return [...transactionHistory]; // Returns shallow copy to prevent external mutation
    }
  };
}

const account = createBankStore(500);
account.deposit(200);
console.log(account.getBalance()); // 700
console.log(account.balance); // undefined (Direct access blocked!)
```

## Best Practices

- Return shallow copies of private arrays or objects from getter functions to prevent external callers from mutating private closure state.
- Be conscious of memory leaks: clear references (`callback = null`) when long-lived closures retain large data structures (DOM nodes, buffers) that are no longer needed.

## Common Mistakes

- The classic `for` loop `var` bug: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 100)` prints `3, 3, 3` because all callbacks share the single `var i` binding. Fix using `let i` (creates a fresh binding per loop iteration) or IIFE closure.

## Follow-up Questions

1. How does V8 optimize closures to avoid retaining unused variables declared in the outer scope?
2. What are the key memory leak risks associated with retaining DOM element references inside closures attached to global event listeners?

## Related Topics

- Scope, Scope Chain & Lexical Environment
- Garbage Collection & Memory Management
