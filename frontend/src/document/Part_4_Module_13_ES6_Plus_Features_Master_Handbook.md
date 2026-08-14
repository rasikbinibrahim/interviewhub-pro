# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 13 — ES6+ Features

**Questions 266–290**

**Audience:** 0–2 Years → 8+ Years  
**Focus:** Modern JavaScript, ECMAScript, browser runtime, Node.js, performance, security, coding rounds and senior interviews.

---

# Module Objective

This module covers the modern JavaScript features introduced from ES6 onward and the language capabilities most frequently tested in frontend interviews.

Topics:

- `let` / `const`
- Template literals
- Destructuring
- Spread / Rest
- Optional chaining
- Nullish coalescing
- Symbols
- BigInt
- ES modules
- Dynamic import
- Set / Map
- WeakMap / WeakSet
- Iterators
- Generators
- `for...of`
- Proxy
- Reflect
- `Object.entries`
- `Object.values`
- `Object.fromEntries`
- Browser compatibility
- Performance
- Production usage
- Coding exercises
- Output questions
- Senior / Staff / Principal follow-ups

---

# Question 266 — What Are `let` and `const`?

**Difficulty:** ⭐ Easy  
**Experience:** 0–2 Years

`let` and `const` are block-scoped variable declarations introduced with ES6.

```js
let count = 1;
count = 2;

const name = "Rasik";

console.log(count);
console.log(name);
```

Output:

```text
2
Rasik
```

### Scope

```js
{
  let blockValue = 10;
  const fixedValue = 20;
}

console.log(blockValue); // ReferenceError
```

### `const` does not mean immutable object

```js
const user = {
  name: "Alex"
};

user.name = "Sam";

console.log(user.name);
```

Output:

```text
Sam
```

The binding cannot be reassigned:

```js
user = {}; // TypeError
```

### Best practice

Use:

```text
const by default
let when reassignment is required
avoid var in modern application code
```

---

# Question 267 — What Are Template Literals?

**Difficulty:** ⭐ Easy

Template literals use backticks.

```js
const name = "Alex";
const age = 30;

const message = `Hello ${name}, age ${age}`;

console.log(message);
```

Output:

```text
Hello Alex, age 30
```

They support:

- interpolation
- multiline strings
- tagged templates

### Bad

```js
const message =
  "Hello " + name + ", age " + age;
```

### Better

```js
const message = `Hello ${name}, age ${age}`;
```

### Production use

Useful for:

- messages
- URLs
- HTML fragments when safely constructed
- logging
- SQL/query generation only through safe parameterization

Never assume template literals automatically sanitize untrusted HTML.

---

# Question 268 — What Is Destructuring?

**Difficulty:** ⭐ Easy

Destructuring extracts values from arrays or properties from objects.

### Object

```js
const user = {
  name: "Alex",
  age: 30
};

const { name, age } = user;

console.log(name, age);
```

Output:

```text
Alex 30
```

### Array

```js
const colors = ["red", "green", "blue"];

const [first, second] = colors;

console.log(first, second);
```

Output:

```text
red green
```

### Rename

```js
const { name: userName } = user;

console.log(userName);
```

### Default value

```js
const { role = "user" } = user;
```

### Production benefit

Destructuring makes data extraction explicit and readable.

---

# Question 269 — What Are Spread and Rest Operators?

**Difficulty:** ⭐⭐ Medium

Both use `...`, but their roles differ.

## Spread

Expands values.

```js
const first = [1, 2];
const second = [3, 4];

const combined = [...first, ...second];

console.log(combined);
```

Output:

```text
[1, 2, 3, 4]
```

## Rest

Collects remaining values.

```js
function sum(...numbers) {
  return numbers.reduce(
    (total, value) => total + value,
    0
  );
}

console.log(sum(1, 2, 3));
```

Output:

```text
6
```

### Important

Spread cloning is shallow:

```js
const original = {
  nested: {
    value: 1
  }
};

const copy = { ...original };

copy.nested.value = 2;

console.log(original.nested.value);
```

Output:

```text
2
```

The nested object is shared.

---

# Question 270 — What Is Optional Chaining?

**Difficulty:** ⭐ Easy

Optional chaining prevents errors when accessing a missing/nullish property.

```js
const user = {};

console.log(user.profile?.address?.city);
```

Output:

```text
undefined
```

Without optional chaining:

```js
user.profile.address.city;
```

could throw:

```text
TypeError
```

### Function call

```js
user.logout?.();
```

### Array access

```js
users?.[0]?.name;
```

### Important

Optional chaining only protects the part of the expression where it is applied.

It does not make every operation in an expression automatically safe.

---

# Question 271 — What Is Nullish Coalescing?

**Difficulty:** ⭐ Easy

The `??` operator provides a fallback only for:

```text
null
undefined
```

Example:

```js
const username = null;

console.log(username ?? "Guest");
```

Output:

```text
Guest
```

Compare with `||`:

```js
console.log(0 || 10);
console.log(0 ?? 10);
```

Output:

```text
10
0
```

### Interview rule

```text
|| → falsy fallback
?? → null/undefined fallback
```

Use `??` when valid values such as `0`, `false`, and `""` must be preserved.

---

# Question 272 — What Are Symbols?

**Difficulty:** ⭐⭐ Medium

A Symbol is a unique primitive value.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2);
```

Output:

```text
false
```

Symbols are often used for:

- unique object keys
- protocols
- metaprogramming
- well-known language hooks

Example:

```js
const id = Symbol("id");

const user = {
  name: "Alex",
  [id]: 123
};

console.log(user[id]);
```

Output:

```text
123
```

### Well-known symbols

Examples:

```js
Symbol.iterator
Symbol.asyncIterator
Symbol.toPrimitive
Symbol.toStringTag
```

These allow JavaScript objects to participate in built-in language protocols.

---

# Question 273 — What Is BigInt?

**Difficulty:** ⭐⭐ Medium

`BigInt` represents integers larger than the safe integer range of `Number`.

```js
const large = 9007199254740993n;

console.log(large);
```

Output:

```text
9007199254740993n
```

Check the Number limitation:

```js
console.log(Number.MAX_SAFE_INTEGER);
```

Output:

```text
9007199254740991
```

### Important

Do not mix BigInt and Number directly:

```js
10n + 10; // TypeError
```

Use:

```js
10n + 10n;
```

### Production examples

- financial integer units where appropriate
- large identifiers
- cryptographic-related integer calculations where supported
- counters exceeding Number's safe integer range

JSON does not natively serialize BigInt:

```js
JSON.stringify({ value: 10n });
```

This throws unless you explicitly convert/serialize it.

---

# Question 274 — What Are JavaScript Modules?

**Difficulty:** ⭐ Easy

ES modules use:

```js
export
import
```

### `math.js`

```js
export function add(a, b) {
  return a + b;
}
```

### `app.js`

```js
import { add } from "./math.js";

console.log(add(2, 3));
```

Output:

```text
5
```

### Module properties

ES modules have:

- module scope
- static imports/exports
- live bindings
- strict mode semantics
- tooling support for tree shaking

Browser:

```html
<script type="module" src="/app.js"></script>
```

---

# Question 275 — What Is Dynamic Import?

**Difficulty:** ⭐⭐ Medium

Dynamic import loads a module asynchronously.

```js
async function loadFeature() {
  const module = await import("./feature.js");

  module.runFeature();
}
```

It returns a Promise.

```text
Application
    ↓
import("./feature.js")
    ↓
network / module loader
    ↓
Promise
    ↓
module available
```

### Production use cases

- route-level code splitting
- feature-based lazy loading
- optional libraries
- heavy editor/chart modules
- admin-only functionality

### React example

```js
const AdminPanel = lazy(
  () => import("./AdminPanel.jsx")
);
```

---

# Question 276 — What Is a Set?

**Difficulty:** ⭐ Easy

A `Set` stores unique values.

```js
const numbers = new Set([
  1,
  2,
  2,
  3
]);

console.log([...numbers]);
```

Output:

```text
[1, 2, 3]
```

Methods:

```js
numbers.add(4);
numbers.has(2);
numbers.delete(1);
numbers.size;
```

### Remove duplicates

```js
const unique = [...new Set([1, 1, 2, 3, 3])];

console.log(unique);
```

Output:

```text
[1, 2, 3]
```

### Interview point

Set membership is designed for efficient lookup, but exact performance depends on the engine and workload. Do not promise strict O(1) in every implementation without qualification.

---

# Question 277 — What Is a Map?

**Difficulty:** ⭐ Easy

`Map` stores key-value pairs.

```js
const users = new Map();

users.set(1, "Alex");
users.set(2, "Sam");

console.log(users.get(1));
```

Output:

```text
Alex
```

Unlike ordinary object property keys, Map keys can be objects, functions, and other values.

```js
const objectKey = {};

const map = new Map();

map.set(objectKey, "data");

console.log(map.get(objectKey));
```

Output:

```text
data
```

Useful for:

- caches
- lookup tables
- object-keyed metadata
- frequency maps
- graph algorithms

---

# Question 278 — What Are WeakMap and WeakSet?

**Difficulty:** ⭐⭐⭐ Hard

Weak collections hold weak references to object keys/values according to their respective semantics.

Example:

```js
const metadata = new WeakMap();

let element = {};

metadata.set(element, {
  createdAt: Date.now()
});

console.log(metadata.has(element));

element = null;
```

WeakMap is useful when metadata should not unnecessarily keep an object alive.

### Important differences

| Feature | Map | WeakMap |
|---|---|---|
| Keys | Any values | Objects / non-registered symbols depending on current spec support |
| Iterable | Yes | No |
| `.size` | Yes | No |
| GC-friendly object association | No | Yes |
| Enumeration | Yes | No |

Do not use WeakMap when you need to enumerate all entries.

---

# Question 279 — What Are Iterators and Generators?

**Difficulty:** ⭐⭐ Medium

An iterator exposes:

```js
next()
```

which returns:

```js
{
  value,
  done
}
```

Example:

```js
const iterator = [10, 20][Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{ value: 10, done: false }
{ value: 20, done: false }
{ value: undefined, done: true }
```

### Generator

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = numbers();

console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{ value: 1, done: false }
{ value: 2, done: false }
```

Generators provide lazy sequence production.

---

# Question 280 — What Is `for...of`?

**Difficulty:** ⭐ Easy

`for...of` iterates over iterable values.

```js
const numbers = [10, 20, 30];

for (const number of numbers) {
  console.log(number);
}
```

Output:

```text
10
20
30
```

Works with:

- arrays
- strings
- sets
- maps
- generators
- custom iterables

### `for...in` vs `for...of`

```text
for...in → enumerable property keys
for...of → iterable values
```

Example:

```js
const values = ["a", "b"];

for (const key in values) {
  console.log(key);
}

for (const value of values) {
  console.log(value);
}
```

Output:

```text
0
1
a
b
```

---

# Question 281 — What Is Proxy?

**Difficulty:** ⭐⭐⭐ Hard

`Proxy` intercepts operations performed on an object.

```js
const user = {
  name: "Alex"
};

const proxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`Reading: ${String(property)}`);

    return Reflect.get(
      target,
      property,
      receiver
    );
  }
});

console.log(proxy.name);
```

Output:

```text
Reading: name
Alex
```

Proxy traps can intercept operations such as:

```text
get
set
has
deleteProperty
ownKeys
apply
construct
```

Production use cases:

- reactive systems
- validation
- access control
- logging
- metaprogramming

### Performance warning

Proxy can introduce overhead and complicate debugging. Do not use it simply because it is powerful.

---

# Question 282 — What Is Reflect?

**Difficulty:** ⭐⭐ Medium

`Reflect` provides standardized methods for performing object operations.

```js
const user = {
  name: "Alex"
};

console.log(
  Reflect.get(user, "name")
);
```

Output:

```text
Alex
```

Common methods:

```js
Reflect.get()
Reflect.set()
Reflect.has()
Reflect.deleteProperty()
Reflect.ownKeys()
Reflect.construct()
Reflect.apply()
```

Proxy handlers commonly delegate to Reflect:

```js
const proxy = new Proxy(user, {
  get(target, property, receiver) {
    return Reflect.get(
      target,
      property,
      receiver
    );
  }
});
```

This preserves correct receiver semantics and makes traps easier to reason about.

---

# Question 283 — What Are `Object.entries()` and `Object.values()`?

**Difficulty:** ⭐ Easy

```js
const user = {
  name: "Alex",
  age: 30
};

console.log(Object.values(user));
console.log(Object.entries(user));
```

Output:

```text
["Alex", 30]

[
  ["name", "Alex"],
  ["age", 30]
]
```

### Common usage

```js
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
```

Output:

```text
name: Alex
age: 30
```

These operate on an object's own enumerable string-keyed properties.

---

# Question 284 — What Is `Object.fromEntries()`?

**Difficulty:** ⭐⭐ Medium

`Object.fromEntries()` converts key-value pairs into an object.

```js
const entries = [
  ["name", "Alex"],
  ["age", 30]
];

const user = Object.fromEntries(entries);

console.log(user);
```

Output:

```text
{
  name: "Alex",
  age: 30
}
```

### Useful transformation

```js
const user = {
  name: "Alex",
  age: 30
};

const upper = Object.fromEntries(
  Object.entries(user).map(
    ([key, value]) => [
      key.toUpperCase(),
      value
    ]
  )
);

console.log(upper);
```

Output:

```text
{
  NAME: "Alex",
  AGE: 30
}
```

---

# Question 285 — What Is the Relationship Between Entries, Values and FromEntries?

**Difficulty:** ⭐⭐ Medium

These APIs combine naturally:

```text
Object
  ↓
Object.entries()
  ↓
Array of [key, value]
  ↓
map/filter
  ↓
Object.fromEntries()
  ↓
Object
```

Example:

```js
const user = {
  name: "Alex",
  age: 30,
  active: true
};

const filtered = Object.fromEntries(
  Object.entries(user).filter(
    ([key]) => key !== "age"
  )
);

console.log(filtered);
```

Output:

```text
{
  name: "Alex",
  active: true
}
```

This pattern is common in immutable data transformation.

---

# Question 286 — How Does ES6+ Improve JavaScript Code Quality?

**Difficulty:** ⭐⭐ Medium

Modern JavaScript provides language features that improve:

- readability
- modularity
- safer scoping
- data transformation
- asynchronous loading
- iteration
- metaprogramming

Examples:

```text
const/let
→ predictable scope

destructuring
→ concise data extraction

modules
→ dependency boundaries

optional chaining
→ safer property access

nullish coalescing
→ correct defaults

Map/Set
→ specialized collections

async/await
→ readable asynchronous workflows

dynamic import
→ code splitting
```

The goal is not to use every feature. Use the feature that makes the design clearer.

---

# Question 287 — How Does Modern JavaScript Affect Performance?

**Difficulty:** ⭐⭐ Medium

Language features do not automatically determine performance.

Consider:

- algorithm complexity
- allocation rate
- object shape stability
- garbage collection
- DOM work
- network work
- bundle size
- code splitting
- serialization
- iteration strategy

### Example

Avoid unnecessary intermediate arrays in hot paths:

```js
const result = data
  .filter(isValid)
  .map(transform)
  .filter(isVisible);
```

This is often perfectly readable and fast enough.

For genuinely hot paths, measure before replacing it with complex manual loops.

### Senior rule

```text
Readability first
↓
Measure
↓
Identify bottleneck
↓
Optimize
↓
Measure again
```

---

# Question 288 — What Are Modern JavaScript Security Considerations?

**Difficulty:** ⭐⭐ Medium

Modern syntax does not automatically make code secure.

### Dangerous

```js
element.innerHTML = userInput;
```

### Safer for text

```js
element.textContent = userInput;
```

Avoid:

```js
eval(userInput);
```

Avoid treating:

```js
Object.assign(target, untrustedObject);
```

as automatically safe. Prototype pollution and unsafe property handling can still be issues depending on the data flow.

### Security principles

```text
Validate input
↓
Use safe DOM APIs
↓
Avoid eval
↓
Sanitize where HTML is genuinely required
↓
Use CSP
↓
Keep dependencies updated
```

---

# Question 289 — What Browser Compatibility Should You Consider?

**Difficulty:** ⭐⭐ Medium

Before using a modern feature in a production application, consider:

- target browsers
- mobile browser versions
- WebViews
- embedded browsers
- enterprise environments
- Node.js versions
- transpilation
- polyfills
- bundler support

Typical toolchain:

```text
Modern source
     ↓
TypeScript / Babel / SWC
     ↓
Bundler
     ↓
Transpilation / optimization
     ↓
Target browsers
```

### Important

Transpilation does not solve every runtime API compatibility issue.

For example, transforming syntax does not necessarily provide a missing browser API.

You may need a polyfill or alternative implementation.

---

# Question 290 — Final ES6+ Senior Interview Question

**Difficulty:** ⭐⭐⭐ Hard  
**Experience:** 5–8 Years+

You are reviewing a large frontend application.

The codebase uses:

```text
var
CommonJS everywhere
deep object mutation
manual property checks
large synchronous imports
arrays for key/value lookup
eval
for...in over arrays
```

How would you modernize it?

### Strong answer

1. Replace `var` with `const`/`let`.
2. Introduce ES modules gradually.
3. Establish module boundaries.
4. Replace unsafe dynamic code such as `eval`.
5. Use `Map` for appropriate key/value workloads.
6. Use `Set` for uniqueness/membership.
7. Replace unsafe nested access with optional chaining where appropriate.
8. Use `??` where falsy values must be preserved.
9. Introduce dynamic imports for large optional features.
10. Use `for...of` for iterable values.
11. Use `Object.entries()` for object transformations.
12. Use immutable transformations where architecture benefits.
13. Audit Proxy usage rather than introducing it indiscriminately.
14. Add browser compatibility targets.
15. Measure bundle and runtime performance.
16. Add linting and code-quality rules.
17. Migrate incrementally rather than rewriting the entire application.

Architecture:

```text
Legacy Application
       ↓
Compatibility / Tests
       ↓
Incremental Migration
       ↓
Modern Modules
       ↓
Modern Syntax
       ↓
Code Splitting
       ↓
Performance Validation
       ↓
Production Rollout
```

---

# Built-in Coding Exercises

## Exercise 1 — Remove Duplicates

### Problem

Remove duplicate values from an array.

### Built-in solution

```js
function unique(values) {
  return [...new Set(values)];
}

console.log(
  unique([1, 2, 2, 3, 3, 4])
);
```

Output:

```text
[1, 2, 3, 4]
```

### Without Set

```js
function uniqueWithoutSet(values) {
  const result = [];

  for (const value of values) {
    let exists = false;

    for (const item of result) {
      if (item === value) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      result.push(value);
    }
  }

  return result;
}
```

Typical complexity:

```text
Set approach: approximately O(n)
Nested-loop approach: O(n²)
```

---

# Exercise 2 — Frequency Counter

### Built-in Map

```js
function frequency(values) {
  const counts = new Map();

  for (const value of values) {
    counts.set(
      value,
      (counts.get(value) ?? 0) + 1
    );
  }

  return counts;
}

console.log(
  [...frequency(["a", "b", "a"])]
);
```

Output:

```text
[
  ["a", 2],
  ["b", 1]
]
```

### Without Map

```js
function frequencyWithoutMap(values) {
  const counts = {};

  for (const value of values) {
    const key = String(value);

    if (Object.prototype.hasOwnProperty.call(counts, key)) {
      counts[key] += 1;
    } else {
      counts[key] = 1;
    }
  }

  return counts;
}
```

### Interview discussion

Map is preferable when arbitrary key types and explicit map semantics are required.

---

# Exercise 3 — Object Transformation

Convert:

```js
const user = {
  firstName: "Alex",
  lastName: "Smith"
};
```

to:

```js
{
  FIRSTNAME: "Alex",
  LASTNAME: "Smith"
}
```

### Built-in

```js
function upperKeys(object) {
  return Object.fromEntries(
    Object.entries(object).map(
      ([key, value]) => [
        key.toUpperCase(),
        value
      ]
    )
  );
}
```

### Without Object.entries/fromEntries

```js
function upperKeysManual(object) {
  const result = {};

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result[key.toUpperCase()] = object[key];
    }
  }

  return result;
}
```

---

# Exercise 4 — Safe Nested Access

Implement:

```js
getCity(user)
```

for:

```js
const user = {
  profile: {
    address: {
      city: "Coimbatore"
    }
  }
};
```

### Modern solution

```js
function getCity(user) {
  return user?.profile?.address?.city ?? "Unknown";
}
```

Output:

```text
Coimbatore
```

### Without optional chaining

```js
function getCityManual(user) {
  if (
    user &&
    user.profile &&
    user.profile.address &&
    user.profile.address.city != null
  ) {
    return user.profile.address.city;
  }

  return "Unknown";
}
```

---

# Exercise 5 — Custom Iterable

Create an object that works with:

```js
for...of
```

Reference:

```js
const range = {
  start: 1,
  end: 3,

  *[Symbol.iterator]() {
    for (let value = this.start; value <= this.end; value++) {
      yield value;
    }
  }
};

for (const value of range) {
  console.log(value);
}
```

Output:

```text
1
2
3
```

---

# Exercise 6 — Proxy Validation

Create a Proxy that prevents negative balances.

```js
const account = {
  balance: 100
};

const safeAccount = new Proxy(account, {
  set(target, property, value, receiver) {
    if (
      property === "balance" &&
      value < 0
    ) {
      throw new RangeError(
        "Balance cannot be negative"
      );
    }

    return Reflect.set(
      target,
      property,
      value,
      receiver
    );
  }
});

safeAccount.balance = 50;

console.log(safeAccount.balance);
```

Output:

```text
50
```

---

# Exercise 7 — Dynamic Import

Create a lazy-loaded feature.

```js
async function openEditor() {
  const { Editor } = await import("./editor.js");

  const editor = new Editor();

  editor.open();
}
```

Discuss:

- code splitting
- network waterfall
- caching
- error handling
- loading state
- prefetching

---

# Output-Based Interview Questions

## Output 1

```js
const value = 0;

console.log(value || 10);
console.log(value ?? 10);
```

Output:

```text
10
0
```

---

## Output 2

```js
const user = {};

console.log(user.profile?.name);
```

Output:

```text
undefined
```

---

## Output 3

```js
const a = Symbol("id");
const b = Symbol("id");

console.log(a === b);
```

Output:

```text
false
```

---

## Output 4

```js
const values = new Set([1, 1, 2, 3]);

console.log(values.size);
```

Output:

```text
3
```

---

## Output 5

```js
const map = new Map();

const key = {};

map.set(key, "value");

console.log(map.get(key));
```

Output:

```text
value
```

---

## Output 6

```js
const numbers = [10, 20];

for (const index in numbers) {
  console.log(index);
}

for (const value of numbers) {
  console.log(value);
}
```

Output:

```text
0
1
10
20
```

---

## Output 7

```js
const original = {
  nested: {
    value: 1
  }
};

const copy = { ...original };

copy.nested.value = 2;

console.log(original.nested.value);
```

Output:

```text
2
```

Reason: spread creates a shallow copy.

---

## Output 8

```js
console.log(
  Object.fromEntries([
    ["a", 1],
    ["b", 2]
  ])
);
```

Output:

```text
{
  a: 1,
  b: 2
}
```

---

# MCQs

## MCQ 1

Which operator provides a fallback only for `null` and `undefined`?

A. `||`  
B. `&&`  
C. `??`  
D. `?.`

**Answer: C**

## MCQ 2

Which collection stores unique values?

A. Map  
B. Set  
C. WeakMap  
D. Object

**Answer: B**

## MCQ 3

Which syntax dynamically loads a module?

A. `require.async()`  
B. `import()`  
C. `load()`  
D. `module()`

**Answer: B**

## MCQ 4

Which protocol powers `for...of`?

A. `Symbol.iterator`  
B. `Symbol.async`  
C. `Symbol.loop`  
D. `Symbol.forOf`

**Answer: A**

## MCQ 5

Which API converts entries into an object?

A. `Object.toEntries()`  
B. `Object.fromEntries()`  
C. `Object.entriesToObject()`  
D. `Object.createEntries()`

**Answer: B**

---

# Scenario-Based Interview Questions

## Scenario 1 — Large Application Migration

A legacy application uses `var` and CommonJS.

Explain how you would migrate it incrementally to:

```text
const / let
ES modules
dynamic imports
modern collections
modern iteration
```

without stopping feature development.

---

## Scenario 2 — Performance

A dashboard loads a large chart library even though only 10% of users open the chart.

Design a solution using:

```js
import("./chart.js")
```

Discuss:

- bundle size
- initial load
- caching
- loading UI
- error handling
- prefetching

---

## Scenario 3 — Collection Choice

Choose between:

```text
Object
Map
Set
WeakMap
WeakSet
Array
```

for:

1. user lookup by ID
2. unique selected IDs
3. DOM element metadata
4. ordered list of products
5. arbitrary object keys

Explain your reasoning.

---

# Senior Follow-Up Questions

1. Why is `const` not deep immutability?
2. Why is spread only shallow?
3. What is the difference between `??` and `||`?
4. What does optional chaining actually protect?
5. Why can BigInt not be mixed directly with Number?
6. Why does WeakMap not expose enumeration?
7. What is the iterator protocol?
8. How does `for...of` differ from `for...in`?
9. Why are ES module imports statically analyzable?
10. How does dynamic import affect code splitting?
11. What are live bindings in ES modules?
12. How can Proxy affect performance?
13. Why use Reflect inside Proxy handlers?
14. What are well-known Symbols?
15. How would you select Map vs Object?
16. How would you design a custom iterable?
17. What happens when an iterator throws?
18. How would you polyfill a modern feature?
19. How do transpilation and polyfills differ?
20. How would you audit browser compatibility?

---

# Staff Engineer Questions

1. Design an ES module migration for a 1-million-line frontend.
2. Define browser support policy for modern JavaScript.
3. Design a code-splitting strategy using dynamic imports.
4. Define when Map should replace Object in a shared codebase.
5. Establish safe Proxy usage guidelines.
6. Design a collection-selection coding standard.
7. Define polyfill ownership in a monorepo.
8. Design a modern JavaScript compatibility pipeline.
9. Establish performance budgets for JavaScript bundles.
10. Design an incremental CommonJS → ESM migration.

---

# Principal Engineer Questions

1. How would you migrate a global frontend platform from legacy JavaScript to modern ECMAScript without a rewrite?
2. How would you define a browser capability strategy across web, WebView and embedded environments?
3. How would you prevent dynamic imports from creating network waterfalls?
4. How would you govern Proxy and metaprogramming usage at enterprise scale?
5. How would you balance language modernization against compatibility?
6. How would you measure the ROI of JavaScript modernization?
7. How would you design a polyfill strategy for millions of clients?
8. How would you prevent bundle fragmentation caused by excessive code splitting?
9. How would you establish a JavaScript performance budget?
10. How would you migrate legacy collection patterns without introducing behavioral regressions?

---

# 30-Second Interview Answer

> ES6 and later JavaScript introduced safer scoping, modern collections, modules, destructuring, iteration, asynchronous loading and metaprogramming capabilities. In production I use `const` by default, `let` when reassignment is required, `Map` and `Set` for appropriate collection semantics, optional chaining and nullish coalescing for safe data access, ES modules for boundaries, and dynamic imports for code splitting. I choose features based on readability, compatibility, security and measured performance rather than using modern syntax simply because it is newer.

---

# 2-Minute Interview Answer

> Modern JavaScript is more than syntax improvements. ES6 introduced block scoping, classes, modules, iterators, generators, Map, Set and Symbols, while later editions added features such as optional chaining, nullish coalescing, dynamic import and BigInt.
>
> For production systems, I focus on semantics and trade-offs. Spread is shallow, `const` does not freeze objects, `??` differs from `||`, Map differs from Object, WeakMap has garbage-collection-friendly semantics, and dynamic imports can reduce initial JavaScript but may create additional network requests. I also consider target browsers, transpilation, polyfills, bundle size, security and runtime performance.

---

# 5-Minute Deep Explanation

Modern JavaScript should be viewed as a language plus runtime ecosystem:

```text
ECMAScript Language
       ↓
JavaScript Engine
       ↓
Browser / Node.js Runtime
       ↓
Web APIs / Node APIs
       ↓
Application
```

Modern language features:

```text
Scope
 ↓
const / let

Data transformation
 ↓
destructuring / spread / rest

Safe access
 ↓
?. / ??

Collections
 ↓
Map / Set / WeakMap / WeakSet

Iteration
 ↓
iterators / generators / for...of

Modules
 ↓
import / export / dynamic import

Metaprogramming
 ↓
Proxy / Reflect

Large integers
 ↓
BigInt

Unique keys / protocols
 ↓
Symbol
```

The best engineering approach is:

```text
Use modern feature
       ↓
Check semantics
       ↓
Check browser/runtime support
       ↓
Measure performance
       ↓
Review security
       ↓
Ship incrementally
```

---

# Production Best Practices

```text
□ Prefer const
□ Use let only when reassignment is required
□ Avoid var in new code
□ Use ES modules
□ Keep module boundaries clear
□ Use dynamic imports for appropriate large/optional features
□ Use Map for map semantics
□ Use Set for uniqueness
□ Understand WeakMap limitations
□ Prefer for...of for iterable values
□ Use optional chaining carefully
□ Use ?? when null/undefined are the fallback cases
□ Remember spread is shallow
□ Avoid unnecessary Proxy usage
□ Use Reflect in Proxy traps where appropriate
□ Avoid eval
□ Validate and sanitize untrusted data
□ Define browser support targets
□ Measure bundle size
□ Measure runtime performance
□ Avoid premature micro-optimization
```

---

# Assignment 1 — Modernize Legacy Code

Convert:

```js
var users = [];
var cache = {};

for (var i = 0; i < data.length; i++) {
  if (data[i] && data[i].id) {
    cache[data[i].id] = data[i];
    users.push(data[i]);
  }
}
```

Requirements:

- modern syntax
- correct collection choice
- safe access
- readable production code
- explain trade-offs

---

# Assignment 2 — Lazy Feature Loader

Build:

```js
loadFeature("analytics")
```

Requirements:

- dynamic import
- caching
- loading state
- error handling
- retry
- telemetry

---

# Assignment 3 — Collection Benchmark

Compare:

```text
Object
Map
Set
Array
```

for:

- lookup
- insertion
- deletion
- iteration

Do not claim benchmark results without actually measuring the target runtime.

---

# Mini Project — Modern JavaScript Data Explorer

Build a frontend application that:

- loads data dynamically
- uses ES modules
- uses Map for indexing
- uses Set for filtering
- uses destructuring
- uses optional chaining
- uses nullish coalescing
- exposes an async iterator
- lazy-loads a visualization module
- includes error handling
- includes browser compatibility documentation

---

# Revision Notes

```text
const
→ block-scoped binding

let
→ block-scoped, reassignable

template literals
→ interpolation and multiline strings

destructuring
→ extract object/array values

spread
→ expand values

rest
→ collect values

?.
→ optional chaining

??
→ null/undefined fallback

Symbol
→ unique primitive/protocol key

BigInt
→ arbitrary-size integers

Map
→ key/value collection

Set
→ unique values

WeakMap
→ weakly held object-key metadata

WeakSet
→ weakly held object membership

Iterator
→ next() protocol

Generator
→ function* + yield

for...of
→ iterable values

Proxy
→ intercept object operations

Reflect
→ standardized object operations

Object.entries()
→ [key, value] pairs

Object.values()
→ values

Object.fromEntries()
→ entries → object

dynamic import()
→ asynchronous module loading
```

---

# Cheat Sheet

| Feature | Main Purpose | Interview Trap |
|---|---|---|
| `const` | Stable binding | Not deep immutable |
| `let` | Reassignable block scope | TDZ |
| Template literal | String interpolation | Not HTML sanitization |
| Destructuring | Extract values | Defaults only apply to `undefined` |
| Spread | Expand/copy | Shallow copy |
| Rest | Collect arguments/values | Creates a new collection |
| `?.` | Safe nullish access | Does not protect unrelated expressions |
| `??` | Nullish fallback | Different from `||` |
| Symbol | Unique primitive | Symbols with same description are not equal |
| BigInt | Large integers | Cannot mix directly with Number |
| Set | Unique values | Not an array |
| Map | Key/value pairs | Different semantics from Object |
| WeakMap | Weak object association | Not iterable |
| Iterator | `next()` protocol | `done` matters |
| Generator | Lazy iteration | Execution pauses at `yield` |
| `for...of` | Values | Not property keys |
| Proxy | Interception | Can affect performance/debugging |
| Reflect | Object operations | Common with Proxy |
| `entries()` | Key/value pairs | Own enumerable string keys |
| `values()` | Values | Own enumerable string keys |
| `fromEntries()` | Pairs → object | Requires iterable pairs |
| `import()` | Lazy module loading | Adds async boundary |

---

# Related Topics

- Module 2 — Scope & Lexical Environment
- Module 3 — Hoisting
- Module 7 — Prototypes
- Module 9 — Functions
- Module 10 — Event Loop
- Module 11 — Promises
- Module 12 — Async/Await
- Module 14 — Modules
- Module 21 — Advanced Async Patterns
- Module 22 — JavaScript Engine
- Module 23 — Polyfills
- Module 24 — JavaScript Coding Questions
- Module 25 — Output Questions
- Module 26 — Senior JavaScript

---

# Module 13 Complete

**Part 4 → Module 13: ES6+ Features**

**Questions:** 266–290

**Previous:** Module 12 — Async/Await

**Next:** Module 14 — Modules
