# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 4 – Closures

**Questions 61–85**

**Audience:** Freshers → Junior → Mid-Level → Senior → Staff → Principal Frontend Engineers

---

## Module Objective

Closures are one of the most important JavaScript concepts for senior frontend interviews.

This module covers:

- What a closure is
- Lexical scope
- Lexical environments
- Function creation
- Environment retention
- Private state
- Data hiding
- Module patterns
- Counter factories
- Factory functions
- Currying
- Memoization
- Event listeners
- Closures inside loops
- `setTimeout`
- Async closures
- React stale closures
- Memory retention
- Garbage collection
- Memory leaks
- Performance
- Debugging
- Browser and Node.js behavior
- Production patterns
- Security considerations
- Coding exercises
- Output questions
- Senior / Staff / Principal interview questions

> **Senior-level definition:** A closure is the behavior that allows a function to retain access to bindings from its lexical environment after the outer execution context has finished executing.

---

# Question 61 — What is a Closure?

**Difficulty:** ⭐ Easy  
**Experience Level:** 0–2 Years

## Definition

A closure occurs when a function retains access to variables from its surrounding lexical scope even after that surrounding function has finished executing.

Example:

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();

console.log(counter());
console.log(counter());
```

Expected output:

```text
1
2
```

The returned `increment` function still has access to `count`.

## Execution Flow

```text
createCounter()
      ↓
count = 0
      ↓
increment function created
      ↓
function returned
      ↓
createCounter() context finishes
      ↓
counter retains access to count
      ↓
counter()
      ↓
count = 1
```

---

# Question 62 — Why Does a Closure Retain Variables?

**Difficulty:** ⭐⭐ Medium

JavaScript functions are created with lexical information that allows identifier resolution through their surrounding environment.

Example:

```js
function outer() {
  const message = "Hello";

  return function inner() {
    return message;
  };
}

const getMessage = outer();

console.log(getMessage());
```

Output:

```text
Hello
```

Although `outer()` has returned, `inner()` still needs `message`.

Conceptually:

```text
getMessage
    │
    ▼
Function
    │
    └── [[Environment]]
             │
             ▼
      outer lexical environment
             │
             └── message = "Hello"
```

The exact internal implementation is engine-specific; `[[Environment]]` is a useful ECMAScript-level model.

---

# Question 63 — What is Lexical Scope?

**Difficulty:** ⭐ Easy

Lexical scope means variable visibility is determined by where code is written.

Example:

```js
const globalValue = "global";

function outer() {
  const outerValue = "outer";

  function inner() {
    const innerValue = "inner";

    console.log(globalValue);
    console.log(outerValue);
    console.log(innerValue);
  }

  inner();
}

outer();
```

Output:

```text
global
outer
inner
```

The scope relationship is established by source-code structure, not by where a function happens to be called.

---

# Question 64 — What is the Scope Chain in a Closure?

**Difficulty:** ⭐⭐ Medium

A closure can resolve identifiers through its lexical environment chain.

```text
inner function
      ↓
inner lexical environment
      ↓
outer lexical environment
      ↓
global environment
```

Example:

```js
const appName = "Interview Platform";

function createService() {
  const serviceName = "User Service";

  return function log() {
    console.log(appName, serviceName);
  };
}

const logService = createService();

logService();
```

Output:

```text
Interview Platform User Service
```

---

# Question 65 — Does a Closure Keep the Entire Outer Function Alive?

**Difficulty:** ⭐⭐⭐ Hard

Not necessarily in the simplistic sense.

A closure allows access to bindings required by the function. JavaScript engines can optimize environment representation and garbage collection.

Example:

```js
function createReader() {
  const required = "keep me";
  const unused = new Array(100_000).fill("temporary");

  return function read() {
    return required;
  };
}
```

Do not claim:

> The entire outer function is permanently kept in memory.

A better answer:

> The reachable lexical state needed by the closure can remain reachable. Actual memory retention and optimization are engine-dependent.

---

# Question 66 — Closures for Private Variables

**Difficulty:** ⭐ Easy

Closures can provide encapsulation without exposing internal variables directly.

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      if (amount <= 0) {
        throw new Error("Amount must be positive");
      }

      balance += amount;
    },

    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);

account.deposit(500);

console.log(account.getBalance());
```

Output:

```text
1500
```

External code cannot directly access:

```js
account.balance
```

because `balance` is not a property.

---

# Question 67 — Closure-Based Data Hiding

**Difficulty:** ⭐⭐ Medium

### Public state

```js
const user = {
  name: "Rasik",
  role: "admin"
};
```

The properties are directly accessible.

### Closure-based state

```js
function createUser(name, role) {
  return {
    getName() {
      return name;
    },

    getRole() {
      return role;
    }
  };
}
```

The variables are accessible through controlled operations.

## Production Use

Useful for:

- service factories
- configuration
- stateful utilities
- private implementation details
- test doubles
- adapters

---

# Question 68 — Module Pattern Using Closures

**Difficulty:** ⭐⭐ Medium

```js
const cartModule = (() => {
  const items = [];

  return {
    add(item) {
      items.push(item);
    },

    getItems() {
      return [...items];
    }
  };
})();

cartModule.add("Laptop");

console.log(cartModule.getItems());
```

Output:

```text
["Laptop"]
```

The module exposes an API while keeping `items` private.

> Modern ES modules are generally preferred for module organization, but the closure-based module pattern remains useful for understanding encapsulation.

---

# Question 69 — Counter Example

**Difficulty:** ⭐ Easy

```js
function createCounter() {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },

    decrement() {
      count -= 1;
      return count;
    },

    getValue() {
      return count;
    }
  };
}

const counter = createCounter();

console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.getValue());
```

Output:

```text
1
2
1
1
```

---

# Question 70 — Multiple Closures and Shared State

**Difficulty:** ⭐⭐⭐ Hard

```js
function createCounter() {
  let count = 0;

  return {
    increment() {
      count += 1;
    },

    decrement() {
      count -= 1;
    },

    getValue() {
      return count;
    }
  };
}

const counterA = createCounter();
const counterB = createCounter();

counterA.increment();
counterA.increment();

counterB.increment();

console.log(counterA.getValue());
console.log(counterB.getValue());
```

Output:

```text
2
1
```

Each invocation creates a separate lexical environment.

Diagram:

```text
counterA
   ↓
Environment A
count = 2

counterB
   ↓
Environment B
count = 1
```

---

# Question 71 — Closures in Loops

**Difficulty:** ⭐⭐ Medium

A classic problem occurs with `var`.

### Problem

```js
for (var i = 0; i < 3; i += 1) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```

Output:

```text
3
3
3
```

There is one function-scoped `i`.

By the time callbacks execute:

```text
i = 3
```

---

# Question 72 — Fix Loop Closure with `let`

**Difficulty:** ⭐⭐ Medium

```js
for (let i = 0; i < 3; i += 1) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```

Output:

```text
0
1
2
```

`let` provides per-iteration lexical bindings for this loop form.

---

# Question 73 — Fix Loop Closure Without Built-in Functions

**Difficulty:** ⭐⭐ Medium

A classic closure factory can explicitly capture the value.

```js
function createLogger(value) {
  return function logValue() {
    console.log(value);
  };
}

for (var i = 0; i < 3; i += 1) {
  setTimeout(createLogger(i), 0);
}
```

Expected:

```text
0
1
2
```

No array helper is required.

---

# Question 74 — Closures with `setTimeout`

**Difficulty:** ⭐⭐ Medium

```js
function delayedGreeting(name) {
  setTimeout(() => {
    console.log(`Hello, ${name}`);
  }, 1000);
}

delayedGreeting("Developer");
```

The callback closes over `name`.

Conceptually:

```text
delayedGreeting()
       ↓
name = "Developer"
       ↓
timer callback created
       ↓
function returns
       ↓
timer fires later
       ↓
callback reads name
```

---

# Question 75 — Closures with Asynchronous Code

**Difficulty:** ⭐⭐⭐ Hard

```js
function createRequestHandler(requestId) {
  return async function handle() {
    const response = await fetch(`/api/requests/${requestId}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  };
}
```

The returned function retains access to `requestId`.

Closures are common in:

- event callbacks
- promise callbacks
- timers
- API handlers
- React hooks
- subscriptions

---

# Question 76 — Currying with Closures

**Difficulty:** ⭐⭐ Medium

Currying transforms a multi-argument function into a sequence of single-argument functions.

```js
function multiply(a) {
  return function withB(b) {
    return a * b;
  };
}

const multiplyByFive = multiply(5);

console.log(multiplyByFive(4));
```

Output:

```text
20
```

The inner function closes over `a`.

---

# Question 77 — Currying with Arrow Functions

**Difficulty:** ⭐ Easy

```js
const multiply = (a) => (b) => a * b;

const multiplyByFive = multiply(5);

console.log(multiplyByFive(4));
```

Output:

```text
20
```

Equivalent conceptual structure:

```text
multiply(5)
    ↓
closure
    ↓
a = 5
    ↓
multiplyByFive(4)
    ↓
5 × 4
```

---

# Question 78 — Memoization Using Closures

**Difficulty:** ⭐⭐⭐ Hard

A closure can store cached results.

### Without built-in `Map`

```js
function memoizeSquare() {
  const keys = [];
  const values = [];

  return function square(value) {
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] === value) {
        return values[i];
      }
    }

    const result = value * value;

    keys.push(value);
    values.push(result);

    return result;
  };
}

const square = memoizeSquare();

console.log(square(10));
console.log(square(10));
```

Output:

```text
100
100
```

### With built-in `Map`

```js
function memoizeSquare() {
  const cache = new Map();

  return function square(value) {
    if (cache.has(value)) {
      return cache.get(value);
    }

    const result = value * value;

    cache.set(value, result);

    return result;
  };
}
```

`Map` gives cleaner lookup semantics and expected average O(1) lookup.

---

# Question 79 — Event Listeners and Closures

**Difficulty:** ⭐⭐⭐ Hard

Closures are commonly used by event listeners.

```js
function attachUserButton(button, userId) {
  function handleClick() {
    console.log(`Selected user: ${userId}`);
  }

  button.addEventListener("click", handleClick);

  return () => {
    button.removeEventListener("click", handleClick);
  };
}
```

The callback closes over `userId`.

Returning cleanup is important.

```text
attachUserButton
      ↓
userId retained by callback
      ↓
DOM event listener
      ↓
cleanup()
      ↓
listener removed
      ↓
references can become collectible
```

---

# Question 80 — How Can Closures Cause Memory Leaks?

**Difficulty:** ⭐⭐⭐ Hard

A closure is not inherently a memory leak.

A leak can occur when a long-lived object retains a callback that retains a large object graph unnecessarily.

Example:

```js
function setup(element, largeData) {
  function handleClick() {
    console.log(largeData.length);
  }

  element.addEventListener("click", handleClick);
}
```

If `element` remains alive indefinitely, the listener may keep `handleClick` reachable, which can keep `largeData` reachable.

## Better

```js
function setup(element, largeData) {
  function handleClick() {
    console.log(largeData.length);
  }

  element.addEventListener("click", handleClick);

  return () => {
    element.removeEventListener("click", handleClick);
  };
}
```

Always clean up long-lived subscriptions.

---

# Question 81 — Closures and Garbage Collection

**Difficulty:** ⭐⭐⭐ Hard

Garbage collection is based on reachability, not simply whether a function has returned.

Simplified:

```text
GC Roots
  ↓
Window / global
  ↓
DOM
  ↓
Event Listener
  ↓
Closure
  ↓
Lexical Environment
  ↓
Captured Object
```

If the chain remains reachable, the captured object cannot be collected.

If no reachable reference remains:

```text
Object
  ↓
unreachable
  ↓
eligible for garbage collection
```

The exact GC algorithm is engine-specific.

---

# Question 82 — Stale Closures in React

**Difficulty:** ⭐⭐⭐ Hard

A closure can capture a value from a particular render.

Example:

```jsx
import { useEffect, useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      {count}
    </button>
  );
}
```

The interval callback captures the `count` from the render in which the effect was created.

Depending on the desired behavior, use appropriate dependencies or a ref-based/latest-value strategy.

### Dependency-based approach

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);
}, [count]);
```

Now the effect is recreated when `count` changes.

---

# Question 83 — Closures and React Event Handlers

**Difficulty:** ⭐⭐ Medium

React handlers commonly close over props and state.

```jsx
function UserCard({ user }) {
  function handleSelect() {
    console.log(user.id);
  }

  return (
    <button type="button" onClick={handleSelect}>
      {user.name}
    </button>
  );
}
```

The handler accesses `user` from its lexical scope.

In modern React applications, this is normal and expected.

The optimization question is not:

> “How do I eliminate all closures?”

Instead ask:

> “Is this closure causing unnecessary allocations, stale state, or unnecessary rendering?”

---

# Question 84 — Closure Performance

**Difficulty:** ⭐⭐⭐ Hard

Closures have a runtime cost, but usually not one worth avoiding indiscriminately.

Potential costs include:

- retained memory
- additional function objects
- captured environment state
- unnecessary callback recreation
- retained DOM references
- large captured objects

But closures are fundamental to JavaScript and React.

## Production Principle

Prefer:

```text
Correctness
    ↓
Readability
    ↓
Measured Performance
    ↓
Targeted Optimization
```

Do not avoid closures based on assumptions.

---

# Question 85 — How Do You Debug Closure Problems?

**Difficulty:** ⭐⭐⭐ Hard

Use browser DevTools.

### Debugging workflow

1. Open Chrome DevTools.
2. Add a breakpoint inside the closure.
3. Inspect the Scope panel.
4. Check Local / Closure / Global scopes.
5. Inspect the Call Stack.
6. Use the Memory panel for retention problems.
7. Take heap snapshots.
8. Compare snapshots before and after repeated operations.
9. Look for detached DOM nodes.
10. Check event listeners and subscriptions.

Example:

```text
Call Stack
└── handleClick()

Scope
├── Local
├── Closure
│   ├── userId → "U100"
│   └── largeData → Array(...)
└── Global
```

---

# Closure Memory Diagram

```text
GC Root
  │
  ▼
callback
  │
  ▼
[[Environment]]
  │
  ▼
Outer Lexical Environment
  │
  ├── userId
  ├── config
  └── largeObject
```

If the callback remains reachable, captured state can remain reachable.

---

# Closure Execution Diagram

```text
outer()
  │
  ├── create binding: value
  │
  ├── create inner()
  │       │
  │       └── closes over value
  │
  └── return inner
          │
          ▼
      outer returns
          │
          ▼
      inner()
          │
          ▼
      lexical lookup
          │
          ▼
      value
```

---

# Scope Chain Diagram

```text
inner()
  │
  ▼
Inner Environment
  │
  ▼
Outer Environment
  │
  ▼
Global Environment
```

Identifier lookup walks the lexical environment chain.

---

# Browser Internals

A simplified model:

```text
JavaScript Source
       ↓
Parser
       ↓
AST
       ↓
Function Object
       ↓
Lexical Environment Association
       ↓
Execution
       ↓
Callback
       ↓
Closure Lookup
```

The exact representation of closures is implementation-dependent.

---

# JavaScript Engine Considerations

Engines can optimize closures.

Do not assume:

```text
Every closure = heap allocation of every outer variable
```

Modern engines can use optimization strategies based on escape analysis, environment representation, bytecode/JIT behavior, and actual reachability.

The safe interview statement is:

> Closures can retain reachable lexical state, but the exact memory representation is engine-specific.

---

# Browser vs Node.js

Closures work in both environments because they are language semantics.

### Browser

Common examples:

- DOM events
- timers
- fetch callbacks
- React components
- observers

### Node.js

Common examples:

- request handlers
- event emitters
- timers
- stream callbacks
- factory functions
- middleware

---

# Bad Example — Unnecessary Large Capture

```js
function createHandler(data) {
  const hugeData = data;

  return () => {
    console.log("clicked");
  };
}
```

The callback does not need `hugeData`.

Avoid unnecessarily capturing large values.

### Better

```js
function createHandler() {
  return () => {
    console.log("clicked");
  };
}
```

---

# Bad Example — Listener Without Cleanup

```js
function mount(element, data) {
  element.addEventListener("click", () => {
    console.log(data);
  });
}
```

Repeated mounting can create multiple listeners.

### Better

```js
function mount(element, data) {
  const handleClick = () => {
    console.log(data);
  };

  element.addEventListener("click", handleClick);

  return () => {
    element.removeEventListener("click", handleClick);
  };
}
```

---

# Bad Example — Stale Async Value

```js
let currentUser = "A";

setTimeout(() => {
  console.log(currentUser);
}, 1000);

currentUser = "B";
```

This logs:

```text
B
```

because the closure reads the binding when the callback executes.

A closure captures access to a binding, not necessarily a frozen snapshot of a primitive value.

This distinction is an important interview concept.

---

# Closure vs Snapshot

Consider:

```js
let value = 1;

const read = () => value;

value = 2;

console.log(read());
```

Output:

```text
2
```

The closure retains access to the binding.

It does not automatically capture an immutable snapshot.

---

# Closure-Based Snapshot

If you explicitly pass the value into a factory:

```js
function createReader(value) {
  return () => value;
}

let value = 1;

const read = createReader(value);

value = 2;

console.log(read());
```

Output:

```text
1
```

Now the returned function closes over the parameter binding created by `createReader`.

---

# Coding Exercise 1 — Counter

### With closure

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();

console.log(counter());
console.log(counter());
console.log(counter());
```

Output:

```text
1
2
3
```

### Without closure

A state object can be passed explicitly:

```js
function incrementCounter(state) {
  state.count += 1;
  return state.count;
}

const state = { count: 0 };

console.log(incrementCounter(state));
console.log(incrementCounter(state));
```

Output:

```text
1
2
```

---

# Coding Exercise 2 — Private Counter Without Built-ins

```js
function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    increment() {
      count += 1;
      return count;
    },

    decrement() {
      count -= 1;
      return count;
    }
  };
}
```

No array helper or external library is required.

---

# Coding Exercise 3 — Memoization Without Built-in `Map`

```js
function memoizeSquare() {
  const keys = [];
  const values = [];

  return function square(number) {
    for (let index = 0; index < keys.length; index += 1) {
      if (keys[index] === number) {
        return values[index];
      }
    }

    const result = number * number;

    keys.push(number);
    values.push(result);

    return result;
  };
}
```

Complexity:

```text
Cache lookup: O(n)
Memory: O(n)
```

---

# Coding Exercise 4 — Memoization With `Map`

```js
function memoizeSquare() {
  const cache = new Map();

  return function square(number) {
    if (cache.has(number)) {
      return cache.get(number);
    }

    const result = number * number;

    cache.set(number, result);

    return result;
  };
}
```

Expected average lookup:

```text
O(1)
```

---

# Coding Exercise 5 — Once Function Without Built-ins

```js
function once(fn) {
  let called = false;
  let result;

  return function executeOnce(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }

    return result;
  };
}

const initialize = once(() => {
  console.log("Initialized");
  return 42;
});

console.log(initialize());
console.log(initialize());
```

Output:

```text
Initialized
42
42
```

---

# Coding Exercise 6 — Once Function With Modern Syntax

```js
const once = (fn) => {
  let called = false;
  let result;

  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }

    return result;
  };
};
```

The closure stores:

```text
called
result
```

---

# Coding Exercise 7 — Curry Without External Libraries

```js
function add(a) {
  return function addB(b) {
    return function addC(c) {
      return a + b + c;
    };
  };
}

console.log(add(1)(2)(3));
```

Output:

```text
6
```

---

# Coding Exercise 8 — Curry with Arrow Functions

```js
const add = (a) => (b) => (c) => a + b + c;

console.log(add(1)(2)(3));
```

Output:

```text
6
```

---

# Coding Exercise 9 — Event Listener Cleanup

```js
function attachLogger(element, message) {
  const handleClick = () => {
    console.log(message);
  };

  element.addEventListener("click", handleClick);

  return () => {
    element.removeEventListener("click", handleClick);
  };
}
```

Expected behavior:

```text
attach → listener active
cleanup → listener removed
```

---

# Coding Exercise 10 — Loop Closure

### Problem

```js
for (var i = 0; i < 3; i += 1) {
  setTimeout(() => console.log(i), 0);
}
```

Output:

```text
3
3
3
```

### Modern solution

```js
for (let i = 0; i < 3; i += 1) {
  setTimeout(() => console.log(i), 0);
}
```

Output:

```text
0
1
2
```

---

# Coding Exercise 11 — Factory

```js
function createLogger(prefix) {
  return {
    info(message) {
      console.log(`[${prefix}] ${message}`);
    }
  };
}

const apiLogger = createLogger("API");

apiLogger.info("Request completed");
```

Output:

```text
[API] Request completed
```

---

# Coding Exercise 12 — Without Closure

The same behavior can be modeled by explicit state:

```js
function logMessage(prefix, message) {
  console.log(`[${prefix}] ${message}`);
}

logMessage("API", "Request completed");
```

This is simpler when persistent private state is not required.

---

# Coding Exercise 13 — Closure-Based Rate Limiter

```js
function createRateLimiter(limit, windowMs) {
  let count = 0;
  let startedAt = Date.now();

  return function allow() {
    const now = Date.now();

    if (now - startedAt >= windowMs) {
      startedAt = now;
      count = 0;
    }

    if (count >= limit) {
      return false;
    }

    count += 1;
    return true;
  };
}
```

Production note:

Client-side rate limiting is not a security boundary. Server-side enforcement is required.

---

# Coding Exercise 14 — Closure-Based ID Generator

```js
function createIdGenerator(prefix = "item") {
  let counter = 0;

  return function nextId() {
    counter += 1;
    return `${prefix}-${counter}`;
  };
}

const nextId = createIdGenerator("user");

console.log(nextId());
console.log(nextId());
```

Output:

```text
user-1
user-2
```

---

# Coding Exercise 15 — Closure-Based Configuration

```js
function createApiClient(baseUrl) {
  return {
    getUrl(path) {
      return `${baseUrl}${path}`;
    }
  };
}

const client = createApiClient("https://api.example.com");

console.log(client.getUrl("/users"));
```

Output:

```text
https://api.example.com/users
```

Do not store secrets in frontend closures. Closures do not provide security against users inspecting application code.

---

# Output-Based Interview Questions

## Output 1

```js
function outer() {
  let value = 10;

  return () => value;
}

const read = outer();

console.log(read());
```

Output:

```text
10
```

---

## Output 2

```js
let value = 10;

function read() {
  return value;
}

value = 20;

console.log(read());
```

Output:

```text
20
```

---

## Output 3

```js
function create() {
  let value = 1;

  return () => {
    value += 1;
    return value;
  };
}

const fn = create();

console.log(fn());
console.log(fn());
```

Output:

```text
2
3
```

---

## Output 4

```js
function create() {
  let value = 1;

  return () => value;
}

const a = create();
const b = create();

console.log(a());
console.log(b());
```

Output:

```text
1
1
```

---

## Output 5

```js
function create() {
  let value = 1;

  return () => ++value;
}

const fn = create();

console.log(fn());
console.log(fn());
```

Output:

```text
2
3
```

---

## Output 6

```js
for (var i = 0; i < 3; i += 1) {
  setTimeout(() => console.log(i), 0);
}
```

Output:

```text
3
3
3
```

---

## Output 7

```js
for (let i = 0; i < 3; i += 1) {
  setTimeout(() => console.log(i), 0);
}
```

Output:

```text
0
1
2
```

---

## Output 8

```js
function create(value) {
  return () => value;
}

let value = 10;

const read = create(value);

value = 20;

console.log(read());
```

Output:

```text
10
```

---

## Output 9

```js
function create() {
  let value = 10;

  return {
    get() {
      return value;
    },

    set(next) {
      value = next;
    }
  };
}

const state = create();

console.log(state.get());

state.set(50);

console.log(state.get());
```

Output:

```text
10
50
```

---

## Output 10

```js
function outer() {
  const value = "A";

  return function inner() {
    return value;
  };
}

console.log(outer()());
```

Output:

```text
A
```

---

# MCQs

## MCQ 1

What makes a closure possible?

A. Dynamic scope  
B. Lexical environment relationship  
C. CSS  
D. DOM only

**Answer: B**

---

## MCQ 2

Which is a common closure use case?

A. Private state  
B. CSS layout  
C. HTML parsing  
D. DNS lookup

**Answer: A**

---

## MCQ 3

Does a closure automatically copy a primitive value as a snapshot?

A. Always  
B. No  
C. Only in Chrome  
D. Only in Node.js

**Answer: B**

---

## MCQ 4

What commonly causes closure-related memory retention?

A. Unreachable objects  
B. Long-lived references to callbacks and captured objects  
C. CSS selectors  
D. HTML comments

**Answer: B**

---

## MCQ 5

Which loop declaration usually gives per-iteration bindings?

A. `var`  
B. `let`  
C. `function`  
D. `eval`

**Answer: B**

---

# Assignment 1 — Closure Counter

Build a counter with:

- increment
- decrement
- reset
- getValue
- minimum value
- maximum value

Do not expose the internal counter variable.

---

# Assignment 2 — Memoization Utility

Implement:

```js
const memoized = memoize(expensiveFunction);
```

Requirements:

- cache results
- support multiple arguments
- explain cache key strategy
- provide clear cache capability
- discuss memory growth

---

# Assignment 3 — Event Subscription Manager

Build:

```js
const unsubscribe = subscribe(element, event, handler);
```

Requirements:

- register listener
- remove listener
- avoid duplicate registration
- support cleanup

---

# Assignment 4 — Private Store

Create:

```js
const store = createStore(initialState);
```

Support:

```js
store.getState();
store.setState();
store.subscribe();
store.destroy();
```

Use closures for private state.

---

# Assignment 5 — Stale Closure Demonstrator

Build a React component demonstrating:

```text
render value
     ↓
closure
     ↓
delayed callback
     ↓
stale value
```

Then fix it using:

- dependency arrays
- functional state updates
- `useRef` where appropriate

---

# Mini Project — Private State Manager

Build a lightweight state manager using closures.

Requirements:

```text
createStore
├── getState
├── setState
├── subscribe
└── destroy
```

Architecture:

```text
Application
     │
     ▼
Store API
     │
     ▼
Closure
 ┌─────────────┐
 │ state       │
 │ listeners   │
 └─────────────┘
```

---

# Mini Project — Debounced Search

Build a reusable debounced search function using closure state.

Without external debounce libraries:

```js
function debounce(fn, delay) {
  let timerId;

  return function debounced(...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
```

Usage:

```js
const search = debounce((query) => {
  console.log("Searching:", query);
}, 300);
```

Explain:

```text
debounce()
   ↓
timerId retained
   ↓
search()
   ↓
previous timer cleared
   ↓
new timer created
```

---

# Production Architecture Example

A frontend API client can use a closure to retain stable configuration:

```js
function createApiClient({ baseUrl, fetchImpl = fetch }) {
  async function request(path, options = {}) {
    const response = await fetchImpl(`${baseUrl}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  return {
    request
  };
}
```

Usage:

```js
const api = createApiClient({
  baseUrl: "/api"
});

api.request("/users");
```

The `request` function closes over `baseUrl` and `fetchImpl`.

---

# Security Considerations

Closures provide encapsulation, not security.

Do not assume this is secure:

```js
function createAuth() {
  const token = "secret";

  return {
    getToken() {
      return token;
    }
  };
}
```

A frontend secret is not truly secret from the user who controls the browser.

Use proper server-side controls.

Closures can help prevent accidental mutation, but they do not replace:

- authentication
- authorization
- HTTPS
- CSP
- secure cookies
- server-side validation
- access control

---

# Performance Checklist

When reviewing a closure:

```text
Does it capture large objects?
        ↓
Does it live for a long time?
        ↓
Does it attach to DOM/event systems?
        ↓
Does it create many callbacks?
        ↓
Does it retain unnecessary state?
        ↓
Can cleanup release references?
```

Do not optimize closures without measurement.

---

# Senior Scenario

## Problem

A React dashboard becomes slower after navigating between pages repeatedly.

Heap snapshots show many detached DOM nodes.

A component contains:

```js
useEffect(() => {
  const handler = () => {
    console.log(data);
  };

  window.addEventListener("resize", handler);
}, [data]);
```

### Problem

The listener is never removed.

### Correct

```js
useEffect(() => {
  const handler = () => {
    console.log(data);
  };

  window.addEventListener("resize", handler);

  return () => {
    window.removeEventListener("resize", handler);
  };
}, [data]);
```

### Interview Explanation

> The closure itself is not the leak. The long-lived `window` listener keeps the callback reachable, and the callback can keep its captured environment reachable. Cleanup breaks that retention path.

---

# Senior Follow-Up Questions

1. What exactly does a closure capture?
2. Does a closure copy values or retain bindings?
3. Can closures cause memory leaks?
4. How does garbage collection treat closures?
5. What is a lexical environment?
6. What is the relationship between a function and its surrounding environment?
7. How does closure behavior differ from a snapshot?
8. Why does `var` behave differently from `let` in loops?
9. How do closures interact with async callbacks?
10. How do closures interact with React rendering?
11. What is a stale closure?
12. How do you debug retained closures?
13. How do you identify closure-related memory leaks?
14. How would you implement memoization?
15. How would you implement debounce?
16. How would you build private state without classes?
17. When is closure-based encapsulation preferable?
18. When is explicit state preferable?

---

# Staff Engineer Questions

1. Design a closure-based state store.
2. How would you prevent listener leaks?
3. How would you make a memoization utility bounded?
4. How would you design cache eviction?
5. How would you diagnose closure retention in production?
6. How would you balance callback creation against readability?
7. How would you design a subscription API with guaranteed cleanup?
8. How would you handle stale closures in a large React application?
9. How would you teach closure memory behavior to a team?
10. How would you establish patterns for long-lived callbacks?

---

# Principal Engineer Questions

1. How would you model closure retention across a large application?
2. How would you design a framework-level subscription lifecycle?
3. How would you prevent memory retention in a plugin architecture?
4. How would you instrument closure-heavy applications?
5. How would you distinguish real closure leaks from normal retained state?
6. How would you design a large-scale event architecture with predictable cleanup?
7. How would you balance abstraction, memory usage, and maintainability?
8. How would you establish organization-wide rules for lifecycle cleanup?

---

# FAANG-Style Questions

1. Explain closure without saying “inner function remembers outer variable.”
2. Explain closure using lexical environments.
3. Why does a returned function still access an outer variable?
4. Does closure retain an entire execution context?
5. Can garbage collection collect a closed-over variable?
6. Why do `var` loop closures print the same value?
7. Why does `let` solve the classic loop problem?
8. Explain closure memory retention.
9. Implement `once`.
10. Implement `memoize`.
11. Implement `debounce`.
12. Implement `throttle`.
13. Implement a private counter.
14. Implement a curry utility.
15. Diagnose a React stale closure.
16. Diagnose an event-listener memory leak.
17. Explain closure vs snapshot.
18. Explain closure vs object state.
19. Explain closure behavior in asynchronous callbacks.
20. Design a production subscription API.

---

# Comparison Table

| Concept | Closure | Object State | Class Private Field |
|---|---|---|---|
| Encapsulation | Yes | Usually public unless controlled | Yes |
| Private variables | Yes | Not by default | Yes with `#` |
| Functional style | Strong | Neutral | OOP-oriented |
| Shared state | Through environment | Through object | Through instance |
| Common use | Factories, callbacks | Data models | Domain objects |
| Cleanup concern | Captured references | Object references | Instance references |
| Security boundary | No | No | No |

---

# 30-Second Interview Answer

> A closure occurs when a function retains access to bindings from its lexical environment after the outer function has finished executing. Closures enable private state, factories, callbacks, memoization, currying, event handlers, and many React patterns. They retain access to bindings rather than simply copying a snapshot. Closures can contribute to memory retention when long-lived callbacks capture unnecessary objects, so event listeners and subscriptions must be cleaned up.

---

# 2-Minute Interview Answer

> JavaScript uses lexical scoping, so when a function is created it has access to the environment where it was defined. If that function is returned or used asynchronously after the outer function finishes, it can still resolve variables from that surrounding environment. That behavior is called a closure. A counter factory is a classic example: the returned function can continue reading and updating a private `count`. Closures are heavily used in event callbacks, timers, promises, React handlers, memoization, currying, and factories. They are not automatically memory leaks. Memory problems occur when a long-lived reference keeps a callback reachable and the callback unnecessarily retains large objects or DOM structures. Production code should therefore use cleanup for listeners, subscriptions, timers, and other long-lived resources.

---

# 5-Minute Deep Explanation

A strong senior explanation should connect four concepts:

### 1. Lexical Scope

Variable resolution is determined by where code is defined.

### 2. Function Creation

A function has access to its surrounding lexical environment.

### 3. Lifetime

The outer function can return, but captured state can remain reachable if the returned callback still needs it.

### 4. Garbage Collection

The captured state becomes collectible when it is no longer reachable.

```text
outer()
  ↓
creates environment
  ↓
creates inner function
  ↓
inner references outer binding
  ↓
inner returned
  ↓
outer finishes
  ↓
inner remains reachable
  ↓
captured binding remains reachable
```

This explains:

- private variables
- factories
- callbacks
- timers
- event listeners
- memoization
- stale closures
- memory retention

A senior candidate should also distinguish language semantics from engine implementation. ECMAScript defines the semantic behavior; V8, SpiderMonkey, and JavaScriptCore decide how environments are represented and optimized.

---

# Revision Notes

```text
Closure
=
Function
+
Lexical Environment Access
```

Key rules:

```text
Lexical scope
    ↓
Function creation
    ↓
Environment retained as needed
    ↓
Callback can access outer bindings
```

Remember:

```text
Closure ≠ memory leak
Closure ≠ snapshot
Closure ≠ security boundary
```

---

# Closure Cheat Sheet

| Topic | Key Point |
|---|---|
| Closure | Function retains lexical access |
| Scope | Determined lexically |
| Private state | Common closure use |
| Loop + `var` | Shared function-scoped binding |
| Loop + `let` | Per-iteration binding |
| Memoization | Closure can retain cache |
| Debounce | Closure can retain timer |
| Event listener | Closure can retain state |
| Memory leak | Caused by unwanted reachability |
| React stale closure | Callback sees captured render state |
| GC | Based on reachability |
| Security | Closure is not a security boundary |

---

# Related Topics

- Execution Context
- Scope
- Lexical Environment
- Hoisting
- `this`
- Functions
- Event Loop
- Promises
- Async/Await
- React Hooks
- Garbage Collection
- Memory Profiling
- Memoization
- Currying
- Debounce
- Throttle
- Event Handling

---

# Final Module Checklist

Before moving forward, you should be able to:

- [x] Define closure
- [x] Explain lexical scope
- [x] Explain lexical environments
- [x] Explain scope chains
- [x] Explain private variables
- [x] Implement a counter
- [x] Implement `once`
- [x] Implement memoization
- [x] Implement debounce
- [x] Explain loop closures
- [x] Explain `var` vs `let`
- [x] Explain async closures
- [x] Explain React stale closures
- [x] Explain closure memory retention
- [x] Explain garbage collection
- [x] Diagnose listener leaks
- [x] Explain closure vs snapshot
- [x] Explain closure performance
- [x] Explain browser behavior
- [x] Explain Node.js behavior
- [x] Answer senior follow-ups
- [x] Answer Staff-level architecture questions
- [x] Answer Principal-level questions

---

# Module 4 Complete

**Part 4 → Module 4: Closures**

**Questions:** 61–85

**Core areas:** Closures, lexical scope, lexical environments, private variables, data hiding, module pattern, counters, factories, currying, memoization, event listeners, loops, timers, asynchronous closures, React stale closures, memory leaks, garbage collection, performance, debugging, browser/Node.js behavior, production patterns, and senior-level interview preparation.

**Next Module:** Module 5 — `this` Keyword (Questions 86–110)
