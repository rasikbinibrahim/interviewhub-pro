# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 9 — Functions

**Questions 176–200**

**Audience:** Freshers → Junior → Mid-Level → Senior → Staff → Principal Frontend Engineers

---

# Module Objective

This module covers JavaScript functions from fundamentals to senior-level interview depth.

Topics covered:

- First-class functions
- Higher-order functions
- Callbacks
- Anonymous and named functions
- IIFE
- Arrow functions
- Rest and spread
- Default parameters
- Function declarations
- Function expressions
- Generator functions
- Async functions
- Pure functions
- Side effects
- Composition
- Currying
- Partial application
- Memoization
- Debounce
- Throttle
- Function chaining
- Hoisting
- Function best practices
- Closures and lexical scope
- `this`
- `call`, `apply`, `bind`
- Performance
- Production patterns
- Coding exercises
- Output questions
- Senior / Staff / Principal interview questions

---

# Question 176 — What Are First-Class Functions?

**Difficulty:** ⭐ Easy  
**Experience Level:** 0–2 Years

In JavaScript, functions are first-class values. They can be:

- assigned to variables
- passed as arguments
- returned from other functions
- stored in objects
- stored in arrays

```js
function greet(name) {
  return `Hello ${name}`;
}

const fn = greet;

console.log(fn("Rasik"));
```

**Expected Output**

```text
Hello Rasik
```

### Execution

```text
greet function
     ↓
assigned to fn
     ↓
fn("Rasik")
     ↓
"Hello Rasik"
```

### Why it matters

First-class functions enable:

- callbacks
- higher-order functions
- functional programming
- event handlers
- middleware
- composition
- dependency injection

---

# Question 177 — What Is a Higher-Order Function?

**Difficulty:** ⭐⭐ Medium

A higher-order function either:

1. accepts a function as an argument, or
2. returns a function.

### Example 1 — Accepting a function

```js
function calculate(a, b, operation) {
  return operation(a, b);
}

const add = (a, b) => a + b;

console.log(calculate(10, 20, add));
```

Output:

```text
30
```

### Example 2 — Returning a function

```js
function multiplier(factor) {
  return (value) => value * factor;
}

const double = multiplier(2);

console.log(double(10));
```

Output:

```text
20
```

Diagram:

```text
multiplier(2)
     ↓
returns function
     ↓
double(10)
     ↓
20
```

---

# Question 178 — What Is a Callback Function?

**Difficulty:** ⭐ Easy

A callback is a function supplied to another function so it can be invoked later or during an operation.

```js
function processUser(name, callback) {
  const message = `Hello ${name}`;
  return callback(message);
}

const result = processUser(
  "Rasik",
  (message) => message.toUpperCase()
);

console.log(result);
```

Output:

```text
HELLO RASIK
```

Callbacks are common in:

- array methods
- browser events
- timers
- asynchronous APIs
- Node.js APIs

### Important

A callback does not necessarily mean asynchronous execution.

```js
[1, 2, 3].map((value) => value * 2);
```

The callback here executes synchronously.

---

# Question 179 — What Is the Difference Between Anonymous and Named Functions?

**Difficulty:** ⭐ Easy

### Anonymous function

```js
const greet = function (name) {
  return `Hello ${name}`;
};
```

### Named function expression

```js
const greet = function greetUser(name) {
  return `Hello ${name}`;
};
```

A name can improve:

- stack traces
- debugging
- recursive function expressions
- code readability

Example:

```js
const factorial = function calculateFactorial(n) {
  if (n <= 1) {
    return 1;
  }

  return n * calculateFactorial(n - 1);
};

console.log(factorial(5));
```

Output:

```text
120
```

---

# Question 180 — What Is an IIFE?

**Difficulty:** ⭐⭐ Medium

IIFE means **Immediately Invoked Function Expression**.

```js
(function () {
  const secret = "private";

  console.log(secret);
})();
```

Output:

```text
private
```

The function is created and immediately executed.

### Arrow IIFE

```js
(() => {
  console.log("Executed immediately");
})();
```

### Historical use

IIFEs were widely used before ES modules to create private scopes.

Today, prefer:

```js
{
  const privateValue = 42;
}
```

or ES modules for module-level encapsulation.

---

# Question 181 — What Are Arrow Functions?

**Difficulty:** ⭐ Easy

Arrow functions provide concise function syntax and lexical `this`.

```js
const add = (a, b) => a + b;

console.log(add(10, 20));
```

Output:

```text
30
```

Multi-line:

```js
const calculateTotal = (items) => {
  return items.reduce(
    (total, item) => total + item.price,
    0
  );
};
```

### Important differences

Arrow functions:

- do not have their own `this`
- do not have their own `arguments`
- cannot be used as constructors
- do not have a `prototype` property
- capture lexical `this`

---

# Question 182 — What Is the Difference Between Arrow Functions and Regular Functions?

**Difficulty:** ⭐⭐⭐ Hard

| Feature | Regular Function | Arrow Function |
|---|---|---|
| Own `this` | Yes | No |
| Own `arguments` | Yes | No |
| Constructor with `new` | Yes | No |
| `prototype` | Yes | No |
| Lexical `this` | No | Yes |
| Concise syntax | Less | More |
| Suitable as object method | Usually | Usually not when dynamic `this` is needed |

Example:

```js
const user = {
  name: "Rasik",

  regular() {
    return this.name;
  },

  arrow: () => {
    return this.name;
  }
};

console.log(user.regular());
console.log(user.arrow());
```

The regular method uses the object as `this`.

The arrow function does not receive `this` from the object.

### Interview trap

Do not choose arrow functions for object methods merely because they are shorter.

---

# Question 183 — What Are Rest Parameters?

**Difficulty:** ⭐ Easy

Rest parameters collect remaining arguments into an array.

```js
function sum(...numbers) {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
}

console.log(sum(10, 20, 30));
```

Output:

```text
60
```

### Without built-in `reduce()`

```js
function sumWithoutReduce(...numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

console.log(sumWithoutReduce(10, 20, 30));
```

Output:

```text
60
```

Rest is useful when the number of arguments is dynamic.

---

# Question 184 — What Are Spread Parameters?

**Difficulty:** ⭐ Easy

Spread syntax expands an iterable or object into individual values/properties.

```js
const numbers = [10, 20, 30];

console.log(Math.max(...numbers));
```

Output:

```text
30
```

### Function call

```js
function add(a, b, c) {
  return a + b + c;
}

const values = [10, 20, 30];

console.log(add(...values));
```

Output:

```text
60
```

### Rest vs spread

```text
Rest
arguments
   ↓
[10, 20, 30]

Spread
[10, 20, 30]
   ↓
10, 20, 30
```

---

# Question 185 — What Are Default Parameters?

**Difficulty:** ⭐ Easy

Default parameters provide fallback values when an argument is `undefined`.

```js
function greet(
  name = "Guest"
) {
  return `Hello ${name}`;
}

console.log(greet());
console.log(greet("Rasik"));
```

Output:

```text
Hello Guest
Hello Rasik
```

### Important interview trap

```js
greet(undefined);
```

uses the default.

But:

```js
greet(null);
```

does not use the default.

---

# Question 186 — Function Declaration vs Function Expression

**Difficulty:** ⭐⭐ Medium

### Declaration

```js
function add(a, b) {
  return a + b;
}
```

### Expression

```js
const add = function (a, b) {
  return a + b;
};
```

A major interview difference is hoisting behavior.

```js
console.log(add(2, 3));

function add(a, b) {
  return a + b;
}
```

This works because the function declaration is initialized during the relevant execution-context setup.

But:

```js
console.log(add(2, 3));

const add = function (a, b) {
  return a + b;
};
```

throws because `add` is in the TDZ before initialization.

---

# Question 187 — What Are Generator Functions?

**Difficulty:** ⭐⭐⭐ Hard

Generators use `function*` and `yield`.

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = numbers();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }
```

Execution can be paused and resumed.

```text
generator()
    ↓
yield 1
    ↓
paused
    ↓
next()
    ↓
yield 2
    ↓
paused
```

Generators are useful for:

- custom iterators
- lazy sequences
- controlled execution
- state machines
- advanced async abstractions

---

# Question 188 — What Are Async Functions?

**Difficulty:** ⭐⭐ Medium

An `async` function always returns a Promise.

```js
async function getUser() {
  return {
    id: 1,
    name: "Rasik"
  };
}

getUser().then(console.log);
```

Output:

```text
{ id: 1, name: 'Rasik' }
```

Even though the function returns a plain object, JavaScript wraps it in a resolved Promise.

Equivalent conceptually:

```js
async function getUser() {
  return value;
}
```

behaves like:

```js
function getUser() {
  return Promise.resolve(value);
}
```

---

# Question 189 — What Is a Pure Function?

**Difficulty:** ⭐⭐ Medium

A pure function:

1. produces the same output for the same input
2. has no observable side effects

```js
function add(a, b) {
  return a + b;
}

console.log(add(2, 3));
```

Output:

```text
5
```

Impure example:

```js
let total = 0;

function addToTotal(value) {
  total += value;
  return total;
}
```

The result depends on external mutable state.

### Production benefit

Pure functions are easier to:

- test
- reason about
- cache
- reuse
- parallelize conceptually
- debug

---

# Question 190 — What Are Side Effects?

**Difficulty:** ⭐⭐ Medium

A side effect is an observable interaction outside the function's local computation.

Examples:

- modifying global state
- changing the DOM
- network requests
- writing storage
- logging
- changing external objects
- timers

```js
function saveUser(user) {
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
}
```

The function performs a storage side effect.

### Important

Side effects are not automatically bad.

Production applications need side effects. The goal is to isolate and control them.

```text
Pure domain logic
       ↓
Side-effect boundary
       ↓
API / DOM / Storage
```

---

# Question 191 — What Is Function Composition?

**Difficulty:** ⭐⭐ Medium

Composition combines smaller functions to create a larger operation.

```js
const double = (value) => value * 2;
const increment = (value) => value + 1;

const compose =
  (f, g) =>
  (value) =>
    f(g(value));

const transform =
  compose(double, increment);

console.log(transform(5));
```

Output:

```text
12
```

Execution:

```text
5
 ↓
increment
 ↓
6
 ↓
double
 ↓
12
```

---

# Question 192 — What Is Currying?

**Difficulty:** ⭐⭐⭐ Hard

Currying transforms a multi-argument function into a sequence of one-argument functions.

Normal:

```js
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3));
```

Curried:

```js
const add =
  (a) =>
  (b) =>
  (c) =>
    a + b + c;

console.log(add(1)(2)(3));
```

Output:

```text
6
```

### Why useful?

Currying can create specialized functions:

```js
const addTax =
  (taxRate) =>
  (amount) =>
    amount + amount * taxRate;

const addGST = addTax(0.18);

console.log(addGST(100));
```

Output:

```text
118
```

---

# Question 193 — What Is Partial Application?

**Difficulty:** ⭐⭐⭐ Hard

Partial application fixes some arguments of a function and returns a new function.

```js
function multiply(a, b, c) {
  return a * b * c;
}

function partialMultiply(a, b) {
  return (c) => multiply(a, b, c);
}

const multiplyBySix = partialMultiply(2, 3);

console.log(multiplyBySix(4));
```

Output:

```text
24
```

### Currying vs partial application

| Currying | Partial Application |
|---|---|
| One argument at a time | Fixes some arguments |
| Produces nested functions | Produces specialized function |
| `f(a)(b)(c)` | `partial(f, a, b)(c)` |

---

# Question 194 — What Is Memoization?

**Difficulty:** ⭐⭐⭐ Hard

Memoization caches function results.

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);

    cache.set(key, result);

    return result;
  };
}

const square = memoize(
  (number) => number * number
);

console.log(square(10));
console.log(square(10));
```

Output:

```text
100
100
```

### Production caution

The simple implementation has limitations:

- `JSON.stringify()` can be expensive.
- object argument identity may be inappropriate.
- cache growth can become unbounded.
- stale values can remain indefinitely.

A production implementation may need:

- bounded cache
- TTL
- `WeakMap` for object keys
- stable key generation
- explicit invalidation

---

# Question 195 — What Is Debouncing?

**Difficulty:** ⭐⭐⭐ Hard

Debouncing delays execution until activity stops for a specified period.

```js
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const search = debounce(
  (query) => {
    console.log("Searching:", query);
  },
  300
);

search("r");
search("re");
search("rea");
search("react");
```

Conceptually:

```text
r
 ↓ reset timer

re
 ↓ reset timer

rea
 ↓ reset timer

react
 ↓
300ms
 ↓
API/search operation
```

### Production use cases

- autocomplete
- search
- resize handling
- expensive validation
- filtering

### Important

Debouncing does not cancel a request already sent to the server. For network operations, combine debouncing with `AbortController` or request identity handling when appropriate.

---

# Question 196 — What Is Throttling?

**Difficulty:** ⭐⭐⭐ Hard

Throttling limits how often a function can execute during a period.

```js
function throttle(fn, delay) {
  let lastExecution = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastExecution >= delay) {
      lastExecution = now;
      fn.apply(this, args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll handled");
}, 200);
```

### Debounce vs throttle

| Debounce | Throttle |
|---|---|
| Waits for activity to stop | Limits execution frequency |
| Best for search | Best for continuous events |
| Executes after quiet period | Executes at controlled intervals |
| Common for input | Common for scroll/resize |

---

# Question 197 — What Is the Difference Between `call`, `apply`, and `bind`?

**Difficulty:** ⭐⭐⭐ Hard

All three can control `this` for regular functions.

### `call`

Invokes immediately with individual arguments.

```js
function greet(city, country) {
  return `${this.name} lives in ${city}, ${country}`;
}

const user = { name: "Rasik" };

console.log(
  greet.call(user, "Coimbatore", "India")
);
```

### `apply`

Invokes immediately with an array-like argument list.

```js
console.log(
  greet.apply(user, [
    "Coimbatore",
    "India"
  ])
);
```

### `bind`

Returns a new function.

```js
const boundGreet =
  greet.bind(
    user,
    "Coimbatore",
    "India"
  );

console.log(boundGreet());
```

### Summary

```text
call  → invoke now + comma-separated args
apply → invoke now + array-like args
bind  → return new bound function
```

### Important

Arrow functions do not have their own `this`, so `call`, `apply`, and `bind` cannot replace their lexical `this`.

---

# Question 198 — What Is Recursion?

**Difficulty:** ⭐⭐ Medium

Recursion occurs when a function calls itself.

```js
function factorial(n) {
  if (n <= 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

console.log(factorial(5));
```

Output:

```text
120
```

Call stack:

```text
factorial(5)
    ↓
factorial(4)
    ↓
factorial(3)
    ↓
factorial(2)
    ↓
factorial(1)
```

Then calls return in reverse order.

### Common mistake

Missing a base case can cause stack overflow.

---

# Question 199 — What Is Function Chaining?

**Difficulty:** ⭐⭐⭐ Hard

Function chaining lets successive operations be performed through returned values.

```js
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(value) {
    this.value += value;
    return this;
  }

  multiply(value) {
    this.value *= value;
    return this;
  }

  subtract(value) {
    this.value -= value;
    return this;
  }
}

const result = new Calculator(10)
  .add(5)
  .multiply(2)
  .subtract(4);

console.log(result.value);
```

Output:

```text
26
```

Execution:

```text
10
 ↓ add 5
15
 ↓ multiply 2
30
 ↓ subtract 4
26
```

### Alternative functional chaining

Modern code can also use pipelines or explicit composition patterns depending on project tooling and language support.

---

# Question 200 — What Are Function Best Practices?

**Difficulty:** ⭐⭐⭐ Hard  
**Experience Level:** 5–8 Years+

Production function guidelines:

1. Keep functions focused.
2. Prefer descriptive names.
3. Minimize hidden side effects.
4. Validate external input.
5. Keep parameter counts manageable.
6. Prefer composition over duplicated logic.
7. Avoid unnecessary mutation.
8. Use pure functions for domain transformations where practical.
9. Keep async error handling explicit.
10. Avoid accidental closure retention.
11. Avoid creating functions repeatedly inside hot paths unless necessary.
12. Do not overuse memoization.
13. Use debounce/throttle intentionally.
14. Document non-obvious contracts.
15. Keep functions easy to test.

### Bad

```js
function process(data, a, b, c, d, e, f) {
  // Everything happens here.
}
```

### Better

```js
function validateOrder(order) {
  // Validation only.
}

function calculateOrderTotal(order) {
  // Calculation only.
}

function saveOrder(order) {
  // Persistence boundary.
}

async function createOrder(order) {
  validateOrder(order);

  const total =
    calculateOrderTotal(order);

  return saveOrder({
    ...order,
    total
  });
}
```

---

# Function Execution Diagram

```text
Function Call
     ↓
Create execution context
     ↓
Create local bindings
     ↓
Resolve scope chain
     ↓
Bind `this` when applicable
     ↓
Execute statements
     ↓
Return value
     ↓
Context becomes eligible for cleanup
```

---

# Higher-Order Function Diagram

```text
Input Function
      ↓
Higher-Order Function
      ↓
New Function / Result
```

---

# Closure Relationship

Functions capture lexical environments.

```text
outer()
 ├── local variable
 │
 └── returned inner()
          ↓
     retains access
     to outer bindings
```

This connects directly to **Module 4 — Closures**.

---

# Call / Apply / Bind Diagram

```text
regular function
      ↓
 ┌────┼─────────┐
 ↓    ↓         ↓
call apply     bind
 ↓    ↓         ↓
now   now    new function
```

---

# Debounce Diagram

```text
Event
 ↓
clear previous timer
 ↓
start new timer
 ↓
event?
 ├── yes → reset
 └── no  → execute
```

---

# Throttle Diagram

```text
Events:  ↑ ↑ ↑ ↑ ↑ ↑ ↑
         ↓
       throttle
         ↓
Calls:   ↑     ↑     ↑
```

---

# Memory / Closure Diagram

```text
Returned function
       │
       └────→ lexical environment
                    │
                    ├── captured value
                    └── other bindings
```

A closure can keep reachable objects alive. Avoid retaining unnecessary large structures.

---

# Bad Example — Unnecessary Function Recreation

```js
function render(items) {
  return items.map((item) => {
    return {
      ...item,
      label: () => item.name
    };
  });
}
```

If the generated functions are not needed as functions, store the computed value instead:

```js
function render(items) {
  return items.map((item) => ({
    ...item,
    label: item.name
  }));
}
```

Do not optimize blindly. Measure first.

---

# Production Example — Debounced Search With Cancellation

```js
function createSearchHandler(searchApi, delay = 300) {
  let timerId;
  let controller;

  return function search(query) {
    clearTimeout(timerId);

    timerId = setTimeout(async () => {
      controller?.abort();
      controller = new AbortController();

      try {
        const result = await searchApi(
          query,
          { signal: controller.signal }
        );

        console.log(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }, delay);
  };
}
```

### Production benefits

- avoids excessive calls
- cancels stale requests
- prevents older responses from unnecessarily updating UI
- isolates side effects

---

# Coding Exercise 1 — Sum Without `reduce()`

Implement:

```js
sum([1, 2, 3, 4])
```

Expected:

```text
10
```

### Built-in version

```js
function sum(numbers) {
  return numbers.reduce(
    (total, value) => total + value,
    0
  );
}
```

### Without built-in array aggregation

```js
function sumWithoutReduce(numbers) {
  let total = 0;

  for (let index = 0; index < numbers.length; index++) {
    total += numbers[index];
  }

  return total;
}
```

Complexity:

```text
Time: O(n)
Space: O(1)
```

---

# Coding Exercise 2 — Custom Map

### Built-in

```js
const result = [1, 2, 3].map(
  (value) => value * 2
);
```

### Without built-in `map()`

```js
function customMap(array, callback) {
  const result = new Array(array.length);

  for (let index = 0; index < array.length; index++) {
    result[index] = callback(
      array[index],
      index,
      array
    );
  }

  return result;
}

console.log(
  customMap([1, 2, 3], (value) => value * 2)
);
```

Output:

```text
[2, 4, 6]
```

---

# Coding Exercise 3 — Custom Filter

### Built-in

```js
const result =
  [1, 2, 3, 4].filter(
    (value) => value % 2 === 0
  );
```

### Without `filter()`

```js
function customFilter(array, predicate) {
  const result = [];

  for (const value of array) {
    if (predicate(value)) {
      result.push(value);
    }
  }

  return result;
}

console.log(
  customFilter(
    [1, 2, 3, 4],
    (value) => value % 2 === 0
  )
);
```

Output:

```text
[2, 4]
```

---

# Coding Exercise 4 — Custom Reduce

### Built-in

```js
const result =
  [1, 2, 3].reduce(
    (sum, value) => sum + value,
    0
  );
```

### Without `reduce()`

```js
function customReduce(
  array,
  callback,
  initialValue
) {
  let accumulator = initialValue;
  let start = 0;

  if (accumulator === undefined) {
    if (array.length === 0) {
      throw new TypeError(
        "Reduce of empty array with no initial value"
      );
    }

    accumulator = array[0];
    start = 1;
  }

  for (let index = start; index < array.length; index++) {
    accumulator = callback(
      accumulator,
      array[index],
      index,
      array
    );
  }

  return accumulator;
}

console.log(
  customReduce(
    [1, 2, 3],
    (sum, value) => sum + value,
    0
  )
);
```

Output:

```text
6
```

---

# Coding Exercise 5 — Custom Bind

```js
function customBind(fn, thisArg, ...boundArgs) {
  return function (...laterArgs) {
    return fn.apply(
      thisArg,
      [...boundArgs, ...laterArgs]
    );
  };
}

function greet(city) {
  return `${this.name} lives in ${city}`;
}

const user = {
  name: "Rasik"
};

const bound =
  customBind(greet, user);

console.log(
  bound("Coimbatore")
);
```

Output:

```text
Rasik lives in Coimbatore
```

### Interview follow-up

A production-quality `bind` polyfill must also consider constructor behavior, prototype semantics, and function length/name properties.

---

# Coding Exercise 6 — Memoize

Implement memoization with:

- `Map`
- cache hit
- cache miss
- multiple arguments

Then implement a bounded-cache version.

---

# Coding Exercise 7 — Debounce

Implement:

```js
debounce(fn, delay)
```

Requirements:

- cancel previous timer
- preserve `this`
- preserve arguments
- expose `.cancel()`

Expected API:

```js
const search = debounce(fn, 300);

search("react");
search.cancel();
```

---

# Coding Exercise 8 — Throttle

Implement:

```js
throttle(fn, 200)
```

Requirements:

- preserve `this`
- preserve arguments
- limit execution rate
- optionally support trailing execution

---

# Coding Exercise 9 — Curry

Implement a generic:

```js
curry(fn)
```

that supports:

```js
sum(1)(2)(3)
```

and optionally:

```js
sum(1, 2)(3)
```

---

# Coding Exercise 10 — Compose and Pipe

Implement:

```js
compose(f, g, h)
pipe(f, g, h)
```

For:

```js
const double = x => x * 2;
const increment = x => x + 1;
const square = x => x * x;
```

Verify execution order.

---

# Coding Exercise 11 — Function Once

Implement:

```js
once(fn)
```

Requirements:

- execute only once
- cache first result
- return cached result on later calls

---

# Coding Exercise 12 — Retry Function

Implement:

```js
retry(fn, retries)
```

Requirements:

- support Promise-returning functions
- retry only configured number of times
- throw final error
- optional delay

---

# Coding Exercise 13 — Promise Pool

Implement a concurrency-limited function runner:

```js
runWithConcurrency(tasks, limit)
```

Requirements:

- never exceed `limit`
- collect results
- handle failures
- preserve result order

---

# Coding Exercise 14 — Function Chaining

Implement:

```js
calculator(10)
  .add(5)
  .multiply(2)
  .subtract(4)
  .value();
```

Expected:

```text
26
```

---

# Coding Exercise 15 — Function Overloading Pattern

JavaScript has no traditional compile-time function overloading.

Implement runtime dispatch based on:

- argument count
- argument types

Explain the trade-offs.

---

# Output-Based Interview Questions

## Output 1

```js
function greet() {
  return "hello";
}

const fn = greet;

console.log(fn());
```

Output:

```text
hello
```

---

## Output 2

```js
function outer() {
  const value = 10;

  return function inner() {
    return value;
  };
}

const fn = outer();

console.log(fn());
```

Output:

```text
10
```

The returned function retains lexical access to `value`.

---

## Output 3

```js
const add = (a = 10, b = 20) =>
  a + b;

console.log(add(undefined, 5));
```

Output:

```text
15
```

---

## Output 4

```js
function test() {
  console.log(arguments.length);
}

test(1, 2, 3);
```

Output:

```text
3
```

---

## Output 5

```js
const test = (...args) => {
  console.log(args.length);
};

test(1, 2, 3, 4);
```

Output:

```text
4
```

---

## Output 6

```js
function greet() {
  return this.name;
}

const user = {
  name: "Rasik"
};

console.log(
  greet.call(user)
);
```

Output:

```text
Rasik
```

---

## Output 7

```js
function greet() {
  return this.name;
}

const user = {
  name: "Rasik"
};

const bound = greet.bind(user);

console.log(bound());
```

Output:

```text
Rasik
```

---

## Output 8

```js
function* generator() {
  yield 10;
  yield 20;
}

const iterator = generator();

console.log(iterator.next().value);
console.log(iterator.next().value);
```

Output:

```text
10
20
```

---

## Output 9

```js
function outer() {
  let value = 1;

  return () => {
    value++;
    return value;
  };
}

const counter = outer();

console.log(counter());
console.log(counter());
```

Output:

```text
2
3
```

---

## Output 10

```js
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);

console.log(double(5));
```

Output:

```text
10
```

---

# MCQs

## MCQ 1

Which is a first-class value in JavaScript?

A. Only numbers  
B. Only strings  
C. Functions  
D. Only objects

**Answer: C**

---

## MCQ 2

Which function returns another function?

A. Higher-order function  
B. Constructor only  
C. Getter  
D. Setter

**Answer: A**

---

## MCQ 3

Which feature gives arrow functions their `this`?

A. Dynamic binding  
B. Lexical `this`  
C. Prototype binding  
D. Global binding

**Answer: B**

---

## MCQ 4

Which operation returns a new function?

A. `call()`  
B. `apply()`  
C. `bind()`  
D. `invoke()`

**Answer: C**

---

## MCQ 5

What does debouncing primarily do?

A. Executes every event  
B. Delays execution until activity settles  
C. Runs functions in parallel  
D. Prevents garbage collection

**Answer: B**

---

# Scenario-Based Interview Question

## Scenario

An autocomplete field sends an API request on every keystroke.

A user types:

```text
r
re
rea
reac
react
```

The application sends five requests.

### Question

How would you improve it?

### Strong answer

I would combine:

1. debouncing
2. request cancellation
3. response identity/race protection
4. loading/error states
5. caching where appropriate

Architecture:

```text
User input
   ↓
Debounce
   ↓
Abort previous request
   ↓
Send current request
   ↓
Receive response
   ↓
Update UI only if still relevant
```

For example:

```js
let controller;

async function search(query) {
  controller?.abort();

  controller = new AbortController();

  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`,
    {
      signal: controller.signal
    }
  );

  return response.json();
}
```

---

# Senior Follow-Up Questions

1. Why are functions first-class objects?
2. How does lexical scope affect closures?
3. How does an arrow function differ from a regular function internally?
4. Why can arrow functions not be constructors?
5. What is the relationship between functions and prototypes?
6. What does `Function.prototype.bind()` return?
7. How does `this` behave in callbacks?
8. How would you implement debounce?
9. How would you implement throttle with leading and trailing behavior?
10. How would you build a generic curry function?
11. What are memoization cache invalidation problems?
12. How can closures create memory retention?
13. When is function allocation a performance concern?
14. How would you design a concurrency-limited task runner?
15. How would you test higher-order functions?

---

# Staff Engineer Questions

1. Design a reusable function utility library for a large monorepo.
2. How would you prevent utility functions from becoming an unstructured "utils" dump?
3. How would you design cancellation across asynchronous function APIs?
4. How would you define standards for debounce/throttle utilities?
5. How would you avoid memory leaks in long-lived closures?
6. How would you design memoization for large object graphs?
7. How would you expose functional APIs while preserving observability?
8. How would you measure function-level performance in production?
9. How would you migrate callback-heavy code to Promise-based APIs?
10. How would you design a safe retry abstraction?

---

# Principal Engineer Questions

1. Establish an enterprise standard for pure vs impure functions.
2. Decide when functional composition is better than class-based design.
3. Design a shared async-control library for multiple frontend applications.
4. Define governance for memoization and caching utilities.
5. Design cancellation semantics across browser and Node.js runtimes.
6. Review a platform containing thousands of utility functions.
7. Identify architectural risks from excessive abstraction.
8. Design a migration from callback-based APIs to modern async APIs.
9. Define performance budgets for hot-path function execution.
10. Design function APIs that remain backward-compatible across multiple teams.

---

# 30-Second Interview Answer

> JavaScript treats functions as first-class values, so they can be stored, passed, and returned. This enables callbacks, higher-order functions, closures, composition, currying, and functional programming. Regular functions have their own `this` and can be constructors, while arrow functions use lexical `this` and cannot be constructors. In production, I keep functions focused, isolate side effects, use composition where useful, and apply debounce, throttle, memoization, and concurrency controls only when the workload justifies them.

---

# 2-Minute Interview Answer

> Functions are central to JavaScript because they are first-class values. A function can be assigned to a variable, passed to another function, or returned from one. A higher-order function uses this capability to create abstractions such as map, filter, middleware, memoization, and event handling. JavaScript supports regular functions, arrow functions, generator functions, and async functions. Regular functions have dynamic `this` depending on invocation, while arrow functions capture lexical `this`. Advanced function techniques include closures, currying, partial application, composition, debounce, throttle, and memoization. In enterprise code, I prefer small, testable functions with explicit side effects and clear contracts.

---

# 5-Minute Deep Explanation

```text
Function Definition
       ↓
Lexical Environment
       ↓
Function Object
       ↓
Call
       ↓
Execution Context
       ↓
Local Bindings
       ↓
Scope Resolution
       ↓
Execution
       ↓
Return
```

For a closure:

```text
outer()
 ├── variable
 │
 └── inner()
       ↓
 returned
       ↓
 retains lexical environment
```

For a higher-order function:

```text
Function A
   ↓
Higher-order Function
   ↓
Function B / Result
```

For asynchronous function work:

```text
Function
   ↓
Promise
   ↓
Event Loop
   ↓
Microtask / Task
   ↓
Continuation
```

The senior-level concern is not simply knowing syntax. It is understanding how function design affects:

- memory
- testability
- concurrency
- error propagation
- performance
- cancellation
- architecture
- observability
- maintainability

---

# Assignment 1 — Function Utility Library

Build:

```text
compose
pipe
curry
once
memoize
debounce
throttle
```

Requirements:

- TypeScript-friendly API design
- unit tests
- edge cases
- cancellation where applicable
- documentation

---

# Assignment 2 — Async Function Runner

Build:

```js
runTasks(tasks, {
  concurrency: 3,
  retries: 2
});
```

Support:

- concurrency limits
- retries
- cancellation
- ordered results
- error collection

---

# Assignment 3 — Production Search Utility

Build a search abstraction with:

```text
debounce
AbortController
cache
retry
timeout
error handling
```

Measure:

- request count
- latency
- cache hit rate

---

# Mini Project — Enterprise Function Utilities Playground

Build a small application demonstrating:

```text
Debounce
Throttle
Memoization
Currying
Composition
Promise Pool
Retry
Cancellation
```

Include a dashboard showing:

- number of executions
- number of skipped executions
- cache hits
- cache misses
- active tasks
- failed tasks

---

# Performance Notes

### Function calls

Function calls have overhead, but in most applications readability should come before micro-optimization.

### Hot paths

Performance can matter when functions execute:

- thousands/millions of times
- during rendering
- inside animation loops
- inside large data transformations

### Memoization

Can trade:

```text
CPU
 ↓
Memory
```

### Debounce

Can reduce:

```text
events → expensive operations
```

### Throttle

Can reduce:

```text
continuous events → controlled execution
```

### Closures

Can retain objects longer than expected if references remain reachable.

---

# Security Notes

Function design intersects with security.

Avoid:

```js
eval(userInput);
```

Avoid dynamically executing untrusted strings.

Prefer explicit dispatch:

```js
const actions = {
  create: createUser,
  update: updateUser,
  delete: deleteUser
};

const action = actions[userAction];

if (!action) {
  throw new Error("Unsupported action");
}

await action(payload);
```

Validate external input before invoking sensitive operations.

---

# Debugging Checklist

When a function behaves incorrectly, inspect:

```text
1. Arguments
2. Return value
3. `this`
4. Closure variables
5. Scope chain
6. Async timing
7. Promise rejection
8. Mutation
9. Shared state
10. Error propagation
```

For performance:

```text
1. Call frequency
2. Allocation
3. Large closures
4. Expensive computation
5. Repeated serialization
6. Cache size
7. DOM work
8. Network work
```

---

# Revision Notes

```text
First-class function
        ↓
Can store / pass / return

Higher-order function
        ↓
Accepts or returns function

Callback
        ↓
Function supplied to another operation

Arrow function
        ↓
Lexical this

Generator
        ↓
Pause / resume with yield

Async function
        ↓
Returns Promise

Pure function
        ↓
Same input → same output + no observable side effect

Composition
        ↓
Combine functions

Currying
        ↓
f(a)(b)(c)

Partial application
        ↓
Fix some arguments

Memoization
        ↓
Cache results

Debounce
        ↓
Wait for quiet period

Throttle
        ↓
Limit execution frequency
```

---

# Cheat Sheet

| Concept | Key Point |
|---|---|
| First-class function | Functions are values |
| Higher-order function | Accepts/returns functions |
| Callback | Function passed to another function |
| IIFE | Immediately executed function expression |
| Arrow | Lexical `this` |
| Rest | Collects arguments |
| Spread | Expands values |
| Default parameter | Fallback for `undefined` |
| Generator | Pausable iterator-producing function |
| Async function | Always returns Promise |
| Pure function | Deterministic + no observable side effect |
| Composition | Combine functions |
| Curry | Transform `f(a,b)` into `f(a)(b)` |
| Partial application | Fix selected arguments |
| Memoization | Cache computed results |
| Debounce | Execute after quiet period |
| Throttle | Limit execution frequency |
| `call` | Invoke with explicit `this` |
| `apply` | Invoke with array-like arguments |
| `bind` | Return bound function |
| Recursion | Function calls itself |
| Chaining | Return object/function for next operation |

---

# Related Topics

- Module 2 — Scope & Lexical Environment
- Module 4 — Closures
- Module 5 — `this`
- Module 10 — Event Loop
- Module 11 — Promises
- Module 12 — Async/Await
- Module 19 — Advanced JavaScript Patterns
- Module 21 — Advanced Async Patterns
- Module 23 — Polyfills
- Module 24 — JavaScript Coding Questions

---

# Module 9 Complete

**Part 4 → Module 9: Functions**

**Questions:** 176–200

**Next:** Module 10 — Event Loop (Questions 201–225)
