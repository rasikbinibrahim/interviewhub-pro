# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 3 – Hoisting

**Questions 41–60**

**Audience:** Freshers → Junior → Mid-Level → Senior → Staff → Principal Frontend Engineers

---

## Module Objective

This module provides an interview-ready and production-oriented understanding of JavaScript hoisting.

It covers:

- Variable hoisting
- Function declaration hoisting
- Class declaration behavior
- Temporal Dead Zone
- `var` vs `let`
- `const`
- Function expressions
- Arrow functions
- Declaration order
- Initialization
- Creation/instantiation phase
- Execution phase
- Interview traps
- Debugging
- Strict mode
- Production best practices
- Browser and Node.js behavior
- ECMAScript terminology
- Execution contexts
- Lexical environments
- Memory behavior
- Coding exercises
- Output questions
- Senior/Staff/Principal interview questions

> **Important:** “Hoisting” is a commonly used teaching term. ECMAScript describes declaration instantiation, environment records, bindings, and initialization more precisely. A senior candidate should explain both the practical interview model and the specification-oriented model.

---

# Question 41 — What is Hoisting?

**Difficulty:** ⭐ Easy  
**Experience Level:** 0–2 Years

## Definition

Hoisting is the common term used to describe JavaScript's behavior where declarations are processed before normal statement execution within an execution context.

Example:

```js
console.log(value);

var value = 100;
```

Output:

```text
undefined
```

A useful mental model is:

```text
Source Code
    ↓
Declaration processing
    ↓
Execution
```

But avoid imagining that JavaScript literally moves source-code lines upward.

## Correct Mental Model

```js
var value = 100;
```

Conceptually:

```text
Binding created
    ↓
Binding initialized to undefined
    ↓
Execution reaches assignment
    ↓
value = 100
```

## Interview Answer

> Hoisting is a developer-friendly term for declaration processing before executable code runs. JavaScript does not physically move declarations to the top. Different declaration types have different initialization rules.

---

# Question 42 — What is Variable Hoisting with `var`?

**Difficulty:** ⭐ Easy

Example:

```js
console.log(count);

var count = 10;

console.log(count);
```

Output:

```text
undefined
10
```

Conceptually:

```text
var count;
console.log(count); // undefined
count = 10;
console.log(count); // 10
```

## Step-by-Step

1. The `var` binding is created.
2. It is initialized to `undefined`.
3. Execution begins.
4. First `console.log()` reads `undefined`.
5. Assignment executes.
6. `count` becomes `10`.

---

# Question 43 — Is `let` Hoisted?

**Difficulty:** ⭐⭐ Medium

Yes, but do not describe it simply as “not hoisted.”

Consider:

```js
console.log(value);

let value = 10;
```

Result:

```text
ReferenceError
```

The lexical binding is established before execution reaches the declaration, but it is not initialized for access during the Temporal Dead Zone.

## Correct Interview Explanation

> `let` declarations participate in declaration instantiation, but the binding remains uninitialized until execution reaches the declaration. Access before initialization throws a `ReferenceError`.

---

# Question 44 — What is the Temporal Dead Zone?

**Difficulty:** ⭐⭐⭐ Hard

The Temporal Dead Zone is the period from entering the relevant lexical scope until a `let`, `const`, or class binding is initialized.

Example:

```js
{
  // TDZ starts for value
  console.log(value); // ReferenceError

  let value = 10;
}
```

Diagram:

```text
Enter Block
     ↓
Create lexical binding
     ↓
┌─────────────────────┐
│ Temporal Dead Zone  │
│ value unavailable   │
└─────────────────────┘
     ↓
let value = 10
     ↓
Binding initialized
     ↓
value can be accessed
```

---

# Question 45 — Why Does `var` Return `undefined` but `let` Throw?

**Difficulty:** ⭐⭐ Medium

Compare:

```js
console.log(a);
var a = 10;
```

with:

```js
console.log(b);
let b = 10;
```

### `var`

```text
Binding created
↓
Binding initialized to undefined
↓
Read allowed
```

### `let`

```text
Binding created
↓
Binding uninitialized
↓
Read attempted
↓
ReferenceError
```

## Comparison

| Feature | `var` | `let` |
|---|---|---|
| Scope | Function | Block |
| Early read | `undefined` | `ReferenceError` |
| TDZ | No | Yes |
| Reassignment | Yes | Yes |
| Redeclaration | Allowed in applicable scope | Not allowed in same lexical scope |

---

# Question 46 — What Happens with `const`?

**Difficulty:** ⭐ Easy

`const` is also lexical and has TDZ behavior.

```js
console.log(config);

const config = {
  api: "/api"
};
```

Result:

```text
ReferenceError
```

`const` also requires an initializer:

```js
const value = 10;
```

This is invalid:

```js
// const value;
```

---

# Question 47 — What is Function Declaration Hoisting?

**Difficulty:** ⭐ Easy

Function declarations can be called before their declaration appears textually.

```js
greet();

function greet() {
  console.log("Hello");
}
```

Output:

```text
Hello
```

## Mental Model

```text
Function declaration instantiated
        ↓
Function binding available
        ↓
Execution begins
        ↓
greet() works
```

---

# Question 48 — Function Declaration vs Function Expression

**Difficulty:** ⭐⭐ Medium

### Function Declaration

```js
sayHello();

function sayHello() {
  console.log("Hello");
}
```

Works.

### Function Expression

```js
sayHello();

const sayHello = function () {
  console.log("Hello");
};
```

Throws:

```text
ReferenceError
```

because the `const` binding is in the TDZ before initialization.

---

# Question 49 — Are Arrow Functions Hoisted?

**Difficulty:** ⭐⭐ Medium

Arrow functions are expressions.

Example:

```js
run();

const run = () => {
  console.log("running");
};
```

Result:

```text
ReferenceError
```

The problem is not that JavaScript cannot create an arrow function.

The `const` binding has not been initialized when `run()` is evaluated.

---

# Question 50 — What Happens with `var` Function Expressions?

**Difficulty:** ⭐⭐ Medium

Consider:

```js
run();

var run = function () {
  console.log("running");
};
```

Result:

```text
TypeError: run is not a function
```

Why?

```text
var run
    ↓
run = undefined
    ↓
run()
    ↓
undefined is not callable
```

Later:

```js
run = function () {};
```

assigns the function.

## Important Interview Trap

This is different from a `ReferenceError`.

---

# Question 51 — What Happens with a `var` Arrow Function?

**Difficulty:** ⭐⭐ Medium

```js
run();

var run = () => {
  console.log("running");
};
```

Result:

```text
TypeError
```

At the time of the call:

```text
run === undefined
```

The arrow function is assigned only when execution reaches the assignment.

---

# Question 52 — Are Classes Hoisted?

**Difficulty:** ⭐⭐⭐ Hard

Class declarations are processed as lexical declarations, but their binding cannot be accessed before initialization.

```js
const user = new User();

class User {}
```

Result:

```text
ReferenceError
```

The class binding is in the TDZ before initialization.

## Important

Do not say:

> Classes are not hoisted.

A better answer:

> Class declarations are instantiated before execution as lexical bindings, but they remain uninitialized until class evaluation reaches the declaration, so early access triggers the TDZ.

---

# Question 53 — Class Declaration vs Function Declaration

**Difficulty:** ⭐⭐⭐ Hard

```js
new User();

class User {}
```

Throws:

```text
ReferenceError
```

But:

```js
createUser();

function createUser() {
  return {};
}
```

works.

### Comparison

| Declaration | Early access |
|---|---|
| Function declaration | Generally works |
| `var` | `undefined` |
| `let` | `ReferenceError` |
| `const` | `ReferenceError` |
| Class | `ReferenceError` |

---

# Question 54 — What is Declaration Order?

**Difficulty:** ⭐⭐ Medium

Consider:

```js
console.log(a);

var a = 10;

console.log(b);

let b = 20;
```

Execution stops at:

```text
ReferenceError
```

The first output is:

```text
undefined
```

The second read fails because `b` is in its TDZ.

## Production Rule

Declare values before use.

Prefer:

```js
const apiUrl = "/api";

startApplication(apiUrl);
```

rather than depending on declaration processing.

---

# Question 55 — What is the Creation Phase?

**Difficulty:** ⭐⭐⭐ Hard

A common interview model describes execution contexts in two broad phases:

```text
Creation / setup
        ↓
Execution
```

During setup, the runtime establishes bindings and other execution-context state according to ECMAScript semantics.

Conceptually:

```text
Global Execution Context
├── Environment
├── Function declarations
├── var bindings
├── lexical bindings
└── other execution state
```

Do not overstate this as a literal ECMAScript “creation phase” algorithm. It is a useful explanatory model.

---

# Question 56 — What is the Execution Phase?

**Difficulty:** ⭐⭐ Medium

During execution, JavaScript evaluates statements and expressions in program order.

Example:

```js
console.log("A");

const value = 10;

console.log("B", value);
```

Output:

```text
A
B 10
```

Hoisting/declaration instantiation does not mean executable statements are randomly reordered.

---

# Question 57 — How Does Hoisting Work Inside Functions?

**Difficulty:** ⭐⭐ Medium

Each function invocation has its own execution context.

```js
const value = "global";

function demo() {
  console.log(value);

  var value = "local";

  console.log(value);
}

demo();
```

Output:

```text
undefined
local
```

Why?

Inside `demo`, the local `var value` binding shadows the outer `value`.

Conceptually:

```text
demo Environment
└── value = undefined

Global Environment
└── value = "global"
```

The lookup finds the local binding first.

---

# Question 58 — Explain Hoisting with Shadowing

**Difficulty:** ⭐⭐⭐ Hard

Example:

```js
const value = "outer";

function test() {
  console.log(value);

  var value = "inner";
}

test();
```

Output:

```text
undefined
```

Not:

```text
outer
```

Because the local `var value` binding exists for the function and shadows the outer binding.

Equivalent interview mental model:

```js
function test() {
  var value;

  console.log(value);

  value = "inner";
}
```

---

# Question 59 — What is the Difference Between Hoisting and Initialization?

**Difficulty:** ⭐⭐⭐ Hard

These are different concepts.

```text
Declaration processing
        ↓
Binding exists
        ↓
Initialization state
        ↓
Execution reaches assignment/declaration
        ↓
Value becomes available
```

Examples:

### `var`

```text
created → initialized as undefined → assigned
```

### `let`

```text
created → uninitialized/TDZ → initialized
```

### `const`

```text
created → uninitialized/TDZ → initialized once
```

### Function Declaration

```text
function binding established → callable
```

---

# Question 60 — Does Hoisting Move Code?

**Difficulty:** ⭐ Easy

No.

This is a useful but imperfect teaching analogy:

```js
console.log(value);

var value = 10;
```

is often explained as:

```js
var value;

console.log(value);

value = 10;
```

But JavaScript does not literally rewrite the source file and move the line.

A senior engineer should describe declaration instantiation and initialization semantics.

---

# Advanced Hoisting Scenarios

## Scenario 1 — `var` and Function Declaration

```js
console.log(typeof value);

var value = function () {};
```

Output:

```text
undefined
```

At the first statement, `value` is still `undefined`.

---

## Scenario 2 — Function Declaration

```js
console.log(typeof value);

function value() {}
```

Output:

```text
function
```

The function declaration has been instantiated before execution reaches the `console.log`.

---

## Scenario 3 — Function Declaration and `var`

```js
console.log(value);

var value = 10;

function value() {
  return 20;
}
```

The exact result is an important interview topic because function and `var` declarations are processed according to declaration-instantiation rules rather than simple textual order.

A strong candidate should explain that a function declaration may establish the binding before the `var` initializer runs.

---

# Hoisting and Strict Mode

Strict mode does not remove hoisting.

Example:

```js
"use strict";

console.log(value);

var value = 10;
```

Output:

```text
undefined
```

Strict mode changes many other JavaScript behaviors, but it does not turn off declaration processing.

---

# Hoisting and Modules

ES modules use lexical bindings.

```js
console.log(value);

const value = 10;
```

Result:

```text
ReferenceError
```

Modules also execute in strict mode semantics.

---

# Hoisting and Browser Scripts

Classic browser scripts can have global environment behavior that differs from modules.

Example:

```html
<script>
  var value = 10;
  console.log(value);
</script>
```

A top-level `var` in a classic script has a relationship with the global object that top-level lexical declarations do not have in the same way.

Prefer ES modules for modern applications:

```html
<script type="module" src="/app.js"></script>
```

---

# Hoisting and Node.js

Node.js supports both CommonJS and ES modules.

### CommonJS

```js
console.log(value);

var value = 10;
```

The local module scope still follows JavaScript's declaration semantics.

### ES Modules

```js
console.log(value);

const value = 10;
```

The lexical binding is in the TDZ.

---

# Execution Context Diagram

```text
JavaScript Source
       ↓
Parsing
       ↓
Declaration / Environment Setup
       ↓
Execution Context
       ↓
┌──────────────────────┐
│ Lexical Environment  │
│ Variable Environment  │
│ Function bindings    │
└──────────────────────┘
       ↓
Statement Execution
```

---

# Hoisting + Scope Diagram

```text
Global Scope
│
├── var globalVar → undefined → value
│
├── let globalLet → TDZ → value
│
└── function declaration → function object
       │
       ↓
Function Scope
│
├── local var → undefined → value
├── local let → TDZ → value
└── nested block
       │
       ├── block let
       └── block const
```

---

# Hoisting + TDZ Diagram

```text
Scope Entry
    │
    ├───────────────┐
    │               │
 var binding     let/const binding
    │               │
 undefined        uninitialized
    │               │
 accessible       TDZ
    │               │
    ↓               ↓
 assignment      declaration
    │               │
    ↓               ↓
 value            initialized
```

---

# Hoisting Interview Trap #1

```js
console.log(foo);

var foo = 100;
```

Answer:

```text
undefined
```

Not `100`.

---

# Hoisting Interview Trap #2

```js
console.log(foo);

let foo = 100;
```

Answer:

```text
ReferenceError
```

Not `undefined`.

---

# Hoisting Interview Trap #3

```js
foo();

var foo = function () {
  console.log("hello");
};
```

Answer:

```text
TypeError
```

Because:

```text
foo === undefined
```

at the call.

---

# Hoisting Interview Trap #4

```js
foo();

function foo() {
  console.log("hello");
}
```

Answer:

```text
hello
```

---

# Hoisting Interview Trap #5

```js
new Person();

class Person {}
```

Answer:

```text
ReferenceError
```

---

# Hoisting Interview Trap #6

```js
{
  console.log(value);

  var value = 10;
}
```

Output:

```text
undefined
```

The `var` is function/global scoped rather than block scoped.

---

# Hoisting Interview Trap #7

```js
{
  console.log(value);

  let value = 10;
}
```

Answer:

```text
ReferenceError
```

The `let` binding is in the TDZ.

---

# Hoisting Interview Trap #8

```js
function demo() {
  console.log(value);

  var value = 10;
}

demo();
```

Output:

```text
undefined
```

The local `var` shadows outer bindings.

---

# Hoisting Interview Trap #9

```js
const value = 10;

function demo() {
  console.log(value);

  var value = 20;
}

demo();
```

Output:

```text
undefined
```

The local `var value` is the binding resolved inside `demo`.

---

# Hoisting Interview Trap #10

```js
console.log(typeof missing);
```

Output:

```text
undefined
```

This is special `typeof` behavior for an unresolvable identifier.

But:

```js
console.log(missing);
```

throws:

```text
ReferenceError
```

---

# Coding Exercise 1 — Predict the Output

```js
console.log(a);
var a = 10;
console.log(a);
```

Expected:

```text
undefined
10
```

---

# Coding Exercise 2 — Convert to Explicit Initialization

Rewrite:

```js
console.log(value);

var value = 20;
```

as code that does not rely on hoisting.

### Correct

```js
const value = 20;

console.log(value);
```

---

# Coding Exercise 3 — Fix Function Expression Hoisting

### Bad

```js
start();

const start = function () {
  console.log("started");
};
```

### Correct

```js
const start = function () {
  console.log("started");
};

start();
```

---

# Coding Exercise 4 — Fix Arrow Function Order

### Bad

```js
run();

const run = () => console.log("run");
```

### Correct

```js
const run = () => console.log("run");

run();
```

---

# Coding Exercise 5 — Fix Class Initialization Order

### Bad

```js
const user = new User();

class User {}
```

### Correct

```js
class User {}

const user = new User();
```

---

# Coding Exercise 6 — Explain Function Scope

Predict:

```js
var value = "global";

function demo() {
  console.log(value);

  var value = "local";
}

demo();
```

Expected:

```text
undefined
```

---

# Coding Exercise 7 — Avoid `var`

### Before

```js
function calculateTotal(items) {
  var total = 0;

  for (var i = 0; i < items.length; i += 1) {
    total += items[i];
  }

  return total;
}
```

### After

```js
function calculateTotal(items) {
  let total = 0;

  for (let i = 0; i < items.length; i += 1) {
    total += items[i];
  }

  return total;
}
```

Modern code gets clearer block boundaries.

---

# Coding Exercise 8 — Without Built-in Array Helpers

Implement a total manually.

```js
function sum(values) {
  let total = 0;

  for (let index = 0; index < values.length; index += 1) {
    total += values[index];
  }

  return total;
}
```

Input:

```js
sum([10, 20, 30]);
```

Output:

```text
60
```

Complexity:

```text
Time: O(n)
Space: O(1)
```

---

# Coding Exercise 9 — With Built-in Function

```js
function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}
```

Input:

```js
sum([10, 20, 30]);
```

Output:

```text
60
```

Comparison:

| Approach | Time | Extra Space | Readability |
|---|---:|---:|---|
| `for` loop | O(n) | O(1) | Explicit |
| `reduce` | O(n) | O(1) conceptual accumulator | Declarative |

---

# Coding Exercise 10 — Function Declaration

Implement:

```js
function multiply(a, b) {
  return a * b;
}

console.log(multiply(5, 4));
```

Output:

```text
20
```

---

# Coding Exercise 11 — Function Expression

```js
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(5, 4));
```

Output:

```text
20
```

The function expression must be evaluated before invocation.

---

# Coding Exercise 12 — Arrow Function

```js
const multiply = (a, b) => a * b;

console.log(multiply(5, 4));
```

Output:

```text
20
```

---

# Coding Exercise 13 — Hoisting-Safe Enterprise Initialization

### Bad

```js
startApplication();

const config = loadConfig();

function startApplication() {
  console.log(config);
}
```

The function declaration is available, but `config` may still be uninitialized when `startApplication()` executes.

### Correct

```js
const config = loadConfig();

function startApplication() {
  console.log(config);
}

startApplication();
```

---

# Coding Exercise 14 — Without `eval`

### Bad

```js
const expression = "2 + 2";
const result = eval(expression);
```

### Correct

Use explicit logic or a safe parser appropriate to the domain.

```js
function add(a, b) {
  return a + b;
}

console.log(add(2, 2));
```

Output:

```text
4
```

Never use `eval()` merely to solve a declaration-order problem.

---

# Coding Exercise 15 — Hoisting-Safe Factory

```js
function createUserService(apiClient) {
  const endpoint = "/users";

  return {
    getEndpoint() {
      return endpoint;
    },

    async getUser(id) {
      return apiClient.get(`${endpoint}/${id}`);
    }
  };
}
```

The factory initializes its private configuration before the service is used.

---

# Output-Based Interview Questions

## Output 1

```js
console.log(a);
var a = 1;
```

**Answer**

```text
undefined
```

---

## Output 2

```js
console.log(a);
let a = 1;
```

**Answer**

```text
ReferenceError
```

---

## Output 3

```js
foo();

function foo() {
  console.log("A");
}
```

**Answer**

```text
A
```

---

## Output 4

```js
foo();

var foo = function () {
  console.log("A");
};
```

**Answer**

```text
TypeError
```

---

## Output 5

```js
foo();

const foo = () => console.log("A");
```

**Answer**

```text
ReferenceError
```

---

## Output 6

```js
new Foo();

class Foo {}
```

**Answer**

```text
ReferenceError
```

---

## Output 7

```js
var value = 10;

function test() {
  console.log(value);
  var value = 20;
}

test();
```

**Answer**

```text
undefined
```

---

## Output 8

```js
console.log(typeof value);

function value() {}
```

**Answer**

```text
function
```

---

## Output 9

```js
console.log(typeof value);

var value = 10;
```

**Answer**

```text
undefined
```

---

## Output 10

```js
console.log(typeof missingValue);
```

**Answer**

```text
undefined
```

---

# MCQs

## MCQ 1

Which declaration is function-scoped?

A. `let`  
B. `const`  
C. `var`  
D. `class`

**Answer: C**

---

## MCQ 2

What happens when a `let` variable is accessed inside its TDZ?

A. `undefined`  
B. `null`  
C. `ReferenceError`  
D. `false`

**Answer: C**

---

## MCQ 3

Which can generally be called before its textual declaration?

A. `const` function expression  
B. Arrow function assigned to `let`  
C. Function declaration  
D. Class instance

**Answer: C**

---

## MCQ 4

What is the main problem with this?

```js
foo();

var foo = function () {};
```

A. SyntaxError  
B. TypeError  
C. ReferenceError  
D. No problem

**Answer: B**

---

## MCQ 5

Which statement is most accurate?

A. Hoisting literally moves declarations to the top.
B. JavaScript does not process declarations before execution.
C. Hoisting is a useful term for declaration processing and initialization behavior.
D. Only `var` is hoisted.

**Answer: C**

---

# Bad vs Correct Patterns

## Pattern 1

### Bad

```js
initialize();

const config = loadConfig();
```

### Correct

```js
const config = loadConfig();

initialize();
```

---

## Pattern 2

### Bad

```js
doWork();

const doWork = () => {};
```

### Correct

```js
const doWork = () => {};

doWork();
```

---

## Pattern 3

### Bad

```js
console.log(user);

const user = getUser();
```

### Correct

```js
const user = getUser();

console.log(user);
```

---

# Production Best Practices

1. Declare variables before use.
2. Prefer `const`.
3. Use `let` only when reassignment is required.
4. Avoid `var` in new application code.
5. Do not depend on hoisting for application initialization.
6. Keep declarations close to their usage.
7. Avoid confusing shadowing.
8. Understand TDZ errors rather than suppressing them.
9. Prefer explicit module initialization.
10. Keep application startup deterministic.
11. Avoid `eval()`.
12. Use linting.
13. Write tests for initialization order.
14. Be careful with circular module dependencies.
15. Use static imports when possible.
16. Use dynamic imports deliberately for lazy loading.
17. Keep side effects explicit.
18. Do not confuse hoisting with asynchronous execution.
19. Do not confuse hoisting with scope.
20. Do not confuse hoisting with `this`.

---

# Debugging Hoisting Problems

## Browser DevTools

When a `ReferenceError` or `TypeError` appears:

1. Open DevTools.
2. Set a breakpoint before the failing line.
3. Inspect the Scope panel.
4. Check Local / Closure / Script / Global bindings.
5. Inspect the Call Stack.
6. Step through initialization.
7. Verify whether a binding is in the TDZ.
8. Verify whether a `var` binding is currently `undefined`.

Example:

```text
Call Stack
└── initializeApp()

Scope
├── Local
│   └── config → uninitialized
├── Closure
└── Global
```

---

# Performance Considerations

Hoisting itself is usually not a meaningful production performance bottleneck.

Focus instead on:

- unnecessary allocations
- repeated function creation
- closure retention
- large object graphs
- synchronous blocking work
- excessive DOM operations
- inefficient loops
- unnecessary parsing and compilation
- bundle size

Do not optimize declaration order for runtime performance without evidence.

---

# Security Considerations

Hoisting is not a security feature.

Do not rely on declaration order to protect:

- authentication tokens
- permissions
- secrets
- API credentials

Security should use proper mechanisms:

- server-side authorization
- secure transport
- CSP
- input validation
- safe DOM APIs
- appropriate cookie attributes
- secure authentication architecture

Avoid:

```js
eval(userInput);
```

---

# Browser Internals

A simplified browser execution pipeline:

```text
JavaScript Source
        ↓
Lexer
        ↓
Parser
        ↓
AST
        ↓
Bytecode / Intermediate Representation
        ↓
Interpreter
        ↓
JIT Optimization
        ↓
Machine Code
        ↓
Execution
```

Declaration processing occurs as part of the language runtime's execution semantics; it is not equivalent to a text preprocessor moving lines.

---

# V8 Perspective

A simplified V8 model can be represented as:

```text
JavaScript
    ↓
Parser
    ↓
AST / Internal Representation
    ↓
Ignition Bytecode
    ↓
Execution
    ↓
TurboFan Optimization
    ↓
Optimized Machine Code
```

The exact implementation evolves over time.

Interviewers generally care more about the semantic distinction between:

```text
binding creation
binding initialization
statement execution
```

than memorizing engine internals.

---

# Memory Diagram

```text
Execution Context
┌──────────────────────────────┐
│ Lexical Environment           │
│                              │
│ let value → uninitialized     │
│ const config → uninitialized  │
│                              │
│ Variable Environment          │
│                              │
│ var count → undefined         │
└──────────────────────────────┘
```

After initialization:

```text
Lexical Environment
├── value → 10
└── config → Object

Variable Environment
└── count → 20
```

---

# Scope Chain + Hoisting

```text
inner()
  ↓
Inner Lexical Environment
  ↓
Outer Lexical Environment
  ↓
Global Environment
```

A local binding established by declaration instantiation can shadow an outer binding even before the assignment statement executes.

---

# Senior Scenario

## Problem

A production application crashes during startup:

```js
start();

const config = loadRemoteConfig();

function start() {
  renderApplication(config);
}
```

### Diagnosis

`start()` executes before `config` has been initialized.

### Correct

```js
const config = loadRemoteConfig();

function start() {
  renderApplication(config);
}

start();
```

If `loadRemoteConfig()` is asynchronous:

```js
async function start() {
  const config = await loadRemoteConfig();

  renderApplication(config);
}

start().catch(console.error);
```

This introduces explicit initialization order rather than relying on declaration behavior.

---

# Senior Follow-Up Questions

1. Is `let` hoisted?
2. Why does `let` produce `ReferenceError`?
3. Why does `var` produce `undefined`?
4. Are classes hoisted?
5. Why can function declarations be called early?
6. Why does a `var` function expression produce `TypeError`?
7. What is declaration instantiation?
8. What is the difference between binding creation and initialization?
9. How does function scope affect hoisting?
10. How does shadowing affect hoisting?
11. How does hoisting work in modules?
12. How does hoisting differ from asynchronous scheduling?
13. How does hoisting interact with closures?
14. Can hoisting cause production bugs?
15. How would you enforce declaration-order standards across a large codebase?

---

# Staff Engineer Questions

1. How would you design a lint policy for initialization order?
2. How would you detect startup dependency cycles?
3. How would you diagnose a circular module initialization failure?
4. How would you structure a frontend bootstrap sequence?
5. How would you make configuration loading deterministic?
6. How would you separate synchronous and asynchronous initialization?
7. How would you review code that relies heavily on function declaration hoisting?
8. How would you prevent initialization-order bugs across a monorepo?

---

# Principal Engineer Questions

1. How should initialization dependencies be represented architecturally?
2. How would you design a deterministic frontend bootstrap system?
3. How would you model dependency graphs between application modules?
4. How would you detect cycles before production?
5. How would you establish organization-wide JavaScript initialization standards?
6. How would you balance declaration flexibility with maintainability?
7. How would you design startup observability for initialization failures?

---

# FAANG-Style Interview Questions

1. Explain hoisting without using the word “move.”
2. Explain `var` initialization semantics.
3. Explain the TDZ.
4. Why does `typeof` behave differently for undeclared identifiers?
5. Why does a function declaration work before its declaration?
6. Why does a `const` function expression fail before initialization?
7. Why does `var fn = function(){}` produce `TypeError` when called too early?
8. Are class declarations hoisted?
9. Explain hoisting with shadowing.
10. Explain declaration instantiation.
11. Explain hoisting inside nested functions.
12. Explain hoisting in modules.
13. Explain how hoisting differs from runtime scheduling.
14. Explain how hoisting interacts with closures.
15. Design a production initialization strategy that does not depend on hoisting.

---

# Comparison Cheat Sheet

| Concept | `var` | `let` | `const` | Function Declaration | Class |
|---|---|---|---|---|---|
| Scope | Function | Block | Block | Function/block according to declaration context | Block |
| Binding created before execution | Yes | Yes | Yes | Yes | Yes |
| Initial state | `undefined` | Uninitialized | Uninitialized | Callable function binding | Uninitialized |
| TDZ | No | Yes | Yes | No in the same sense | Yes |
| Early call/read | `undefined` | ReferenceError | ReferenceError | Generally callable | ReferenceError |
| Reassignment | Yes | Yes | No | Binding rules differ | Binding cannot be reassigned |

---

# 30-Second Interview Answer

> Hoisting is a simplified term for JavaScript's declaration-processing behavior. `var` bindings are initialized to `undefined`, while `let`, `const`, and class bindings are lexical and remain uninitialized during the Temporal Dead Zone. Function declarations can generally be used before their textual declaration. JavaScript does not literally move source code to the top.

---

# 2-Minute Interview Answer

> JavaScript processes declarations as part of creating the relevant execution environment before normal statement execution. The exact behavior depends on the declaration type. `var` is function-scoped and its binding is initialized to `undefined`, so reading it before the assignment produces `undefined`. `let`, `const`, and class declarations create lexical bindings that are unavailable during the Temporal Dead Zone until initialization occurs, so early access produces a `ReferenceError`. Function declarations receive special declaration-instantiation behavior that generally makes them callable before their textual position. Function expressions and arrow functions depend on the binding containing them, so a `const` or `let` binding produces a TDZ error and a `var` binding can produce a `TypeError` when called while still `undefined`.

---

# 5-Minute Deep Explanation

A strong senior answer should separate three concepts:

### 1. Binding Creation

The runtime establishes the environment needed for identifiers.

### 2. Binding Initialization

Different declarations have different initialization rules.

```text
var   → initialized as undefined
let   → uninitialized → TDZ
const → uninitialized → TDZ
class → uninitialized → TDZ
function declaration → function binding established
```

### 3. Execution

Statements then execute in source order.

Therefore:

```js
console.log(value);

var value = 10;
```

does not mean the assignment happened early.

It means:

```text
binding exists
        ↓
value is undefined
        ↓
console.log(value)
        ↓
assignment executes
        ↓
value becomes 10
```

This model explains most interview questions without relying on the misleading idea that JavaScript physically moves declarations.

---

# Module Assignment 1 — Hoisting Visualizer

Build a UI that displays:

```text
Declaration
    ↓
Binding
    ↓
Initialization State
    ↓
Execution
```

Support:

- `var`
- `let`
- `const`
- function declarations
- class declarations

---

# Module Assignment 2 — Output Quiz

Create 30 output-based questions involving:

- `var`
- `let`
- `const`
- functions
- classes
- shadowing
- TDZ
- nested functions

---

# Module Assignment 3 — Startup Dependency Graph

Build:

```text
Config
  ↓
API
  ↓
Auth
  ↓
Application
```

Then deliberately create a cycle and detect it.

---

# Mini Project — JavaScript Initialization Analyzer

Create a developer tool that accepts JavaScript and reports:

```text
Declaration Type
Scope
Initialization State
Potential TDZ
Potential Early Access
Potential Shadowing
Potential Early Function Call
```

Example:

```js
console.log(config);

const config = {};
```

Report:

```text
Potential TDZ access:
config is accessed before initialization.
```

**Security:** Do not execute arbitrary source code in the production browser context.

---

# Module 3 Revision Notes

```text
Hoisting ≠ source-code movement

var
↓
function scoped
↓
initialized to undefined

let
↓
block scoped
↓
TDZ
↓
initialized at declaration

const
↓
block scoped
↓
TDZ
↓
initialized once

class
↓
lexical binding
↓
TDZ
↓
initialized during class evaluation

function declaration
↓
special declaration instantiation
↓
generally callable before textual declaration
```

---

# 20-Second Cheat Sheet

```text
var       → undefined before assignment
let       → TDZ
const     → TDZ
class     → TDZ
function  → callable before declaration
function expression → depends on binding
arrow function       → depends on binding
```

---

# Common Mistakes

### Mistake 1

> `let` is not hoisted.

**Better:**

> `let` participates in lexical declaration instantiation but is uninitialized during the TDZ.

### Mistake 2

> Hoisting moves code.

**Better:**

> Hoisting is a simplified model for declaration-processing behavior.

### Mistake 3

> Function expressions are hoisted like function declarations.

**Wrong.**

The binding may be created, but the function value is not available until the assignment executes.

### Mistake 4

> `const` means immutable object.

**Wrong.**

`const` prevents reassignment of the binding.

### Mistake 5

> TDZ means variable doesn't exist.

**Oversimplified.**

The lexical binding exists but is uninitialized.

---

# Final Module Checklist

Before moving to the next module, you should be able to explain:

- [x] What hoisting means
- [x] Why “move to the top” is an incomplete model
- [x] `var` hoisting
- [x] `let` hoisting
- [x] `const` hoisting
- [x] Class declaration behavior
- [x] Function declaration behavior
- [x] Function expression behavior
- [x] Arrow function behavior
- [x] TDZ
- [x] Declaration instantiation
- [x] Initialization
- [x] Execution order
- [x] Hoisting with shadowing
- [x] Hoisting inside functions
- [x] Browser behavior
- [x] Module behavior
- [x] Node.js behavior
- [x] Debugging
- [x] Production best practices
- [x] Senior interview questions
- [x] Staff interview questions
- [x] Principal interview questions
- [x] Coding exercises
- [x] Output-based questions

---

# Module 3 Complete

**Part 4 → Module 3: Hoisting**

**Questions covered:** 41–60  
**Core areas:** Hoisting, declaration instantiation, TDZ, initialization, function declarations, function expressions, arrow functions, classes, scope, shadowing, browser/runtime behavior, debugging, production practices, and senior-level interview preparation.

**Next:** Module 4 — Closures.
