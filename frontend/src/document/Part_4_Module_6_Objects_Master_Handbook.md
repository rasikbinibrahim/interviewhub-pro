# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 6 — Objects

**Questions 111–130**

**Audience:** Freshers → Junior → Mid-Level → Senior → Staff → Principal Frontend Engineers

---

# Module Objective

JavaScript objects are fundamental to:

- data modeling
- application state
- configuration
- prototypes
- classes
- APIs
- serialization
- caching
- React props/state
- browser APIs
- enterprise application architecture

This module covers:

- Object creation
- Object literals
- Constructor functions
- `Object.create()`
- Property descriptors
- `writable`
- `enumerable`
- `configurable`
- `Object.freeze()`
- `Object.seal()`
- `Object.preventExtensions()`
- `Object.assign()`
- spread syntax
- shallow copy
- deep clone
- nested objects
- object methods
- object performance
- production patterns
- interview traps
- coding exercises
- polyfills / manual implementations
- senior and staff-level questions

---

# Question 111 — How Can You Create an Object?

**Difficulty:** ⭐ Easy  
**Experience Level:** 0–2 Years

Common approaches include:

### 1. Object literal

```js
const user = {
  name: "Rasik",
  role: "Frontend Engineer"
};

console.log(user);
```

### 2. `new Object()`

```js
const user = new Object();

user.name = "Rasik";
```

Generally prefer object literals for ordinary objects.

### 3. `Object.create()`

```js
const user = Object.create(null);

user.name = "Rasik";
```

This creates an object with no `Object.prototype` in its prototype chain.

### 4. Constructor function

```js
function User(name) {
  this.name = name;
}

const user = new User("Rasik");
```

### 5. Class

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("Rasik");
```

---

# Question 112 — What Is an Object Literal?

**Difficulty:** ⭐ Easy

An object literal is the concise syntax for creating an object.

```js
const employee = {
  name: "Rasik",
  experience: 7,
  skills: ["JavaScript", "React"]
};

console.log(employee.name);
```

Output:

```text
Rasik
```

Modern object literals support:

- shorthand properties
- shorthand methods
- computed properties
- getters/setters
- spread properties

Example:

```js
const name = "Rasik";
const role = "Frontend Engineer";

const employee = {
  name,
  role,

  greet() {
    return `Hello ${this.name}`;
  }
};

console.log(employee.greet());
```

Output:

```text
Hello Rasik
```

---

# Question 113 — What Is a Constructor Function?

**Difficulty:** ⭐⭐ Medium

Before ES6 classes, constructor functions were commonly used for creating object instances.

```js
function User(name, role) {
  this.name = name;
  this.role = role;
}

const user1 = new User("Rasik", "Frontend Engineer");
const user2 = new User("Alex", "Backend Engineer");

console.log(user1.name);
console.log(user2.role);
```

Output:

```text
Rasik
Backend Engineer
```

With `new`, JavaScript creates an object and uses it as `this`.

Conceptually:

```text
new User("Rasik")
       ↓
new object
       ↓
User.prototype
       ↓
this = new object
       ↓
constructor executes
       ↓
object returned
```

---

# Question 114 — What Is `Object.create()`?

**Difficulty:** ⭐⭐ Medium

`Object.create(proto)` creates a new object whose internal prototype is the supplied object.

```js
const person = {
  greet() {
    return "Hello";
  }
};

const user = Object.create(person);

user.name = "Rasik";

console.log(user.name);
console.log(user.greet());
```

Output:

```text
Rasik
Hello
```

Prototype chain:

```text
user
 ↓
person
 ↓
Object.prototype
 ↓
null
```

unless the supplied prototype chain differs.

---

# Question 115 — What Are Property Descriptors?

**Difficulty:** ⭐⭐⭐ Hard

Every ordinary object property can have descriptor attributes.

For a data property:

- `value`
- `writable`
- `enumerable`
- `configurable`

Example:

```js
const user = {
  name: "Rasik"
};

console.log(
  Object.getOwnPropertyDescriptor(user, "name")
);
```

Typical output:

```text
{
  value: "Rasik",
  writable: true,
  enumerable: true,
  configurable: true
}
```

Descriptors allow low-level control over object properties.

---

# Question 116 — What Is `writable`?

**Difficulty:** ⭐⭐ Medium

`writable` determines whether the value of a data property can be changed.

```js
const user = {};

Object.defineProperty(user, "name", {
  value: "Rasik",
  writable: false,
  enumerable: true,
  configurable: true
});

user.name = "Alex";

console.log(user.name);
```

In strict mode, assigning to a non-writable property throws.

In non-strict mode, the assignment can fail silently.

Output:

```text
Rasik
```

---

# Question 117 — What Is `enumerable`?

**Difficulty:** ⭐⭐ Medium

`enumerable` controls whether a property appears in common enumeration operations.

```js
const user = {};

Object.defineProperty(user, "name", {
  value: "Rasik",
  enumerable: false
});

user.role = "Frontend Engineer";

console.log(Object.keys(user));
```

Output:

```text
["role"]
```

The non-enumerable `name` property is not returned by `Object.keys()`.

---

# Question 118 — What Is `configurable`?

**Difficulty:** ⭐⭐ Medium

`configurable` determines whether the property's descriptor can generally be changed and whether the property can be deleted.

```js
const user = {};

Object.defineProperty(user, "name", {
  value: "Rasik",
  configurable: false
});

console.log(delete user.name);
console.log(user.name);
```

Output in non-strict code:

```text
false
Rasik
```

In strict mode, deleting a non-configurable property throws.

### Important

Once a property becomes non-configurable, descriptor changes become heavily restricted.

---

# Question 119 — What Does `Object.freeze()` Do?

**Difficulty:** ⭐⭐ Medium

`Object.freeze()` prevents direct structural changes to an object.

It effectively makes existing own data properties non-writable and non-configurable and prevents extensions.

```js
const config = {
  apiUrl: "/api",
  timeout: 5000
};

Object.freeze(config);

config.timeout = 10000;

console.log(config.timeout);
```

Output:

```text
5000
```

### Important Trap

`Object.freeze()` is shallow.

```js
const config = {
  api: {
    timeout: 5000
  }
};

Object.freeze(config);

config.api.timeout = 10000;

console.log(config.api.timeout);
```

Output:

```text
10000
```

The nested object is still mutable.

---

# Question 120 — What Does `Object.seal()` Do?

**Difficulty:** ⭐⭐ Medium

`Object.seal()`:

- prevents adding properties
- prevents deleting properties
- makes existing properties non-configurable

But existing writable properties can still be changed.

```js
const user = {
  name: "Rasik"
};

Object.seal(user);

user.name = "Alex";

console.log(user.name);
```

Output:

```text
Alex
```

Comparison:

| Feature | `freeze` | `seal` |
|---|---:|---:|
| Add properties | No | No |
| Delete properties | No | No |
| Change writable values | No | Yes |
| Change descriptors | Very restricted | Very restricted |

---

# Question 121 — What Does `Object.preventExtensions()` Do?

**Difficulty:** ⭐⭐ Medium

It prevents new own properties from being added.

Existing properties can still generally be changed or deleted according to their descriptors.

```js
const user = {
  name: "Rasik"
};

Object.preventExtensions(user);

user.role = "Engineer";
user.name = "Alex";

console.log(user.role);
console.log(user.name);
```

Output:

```text
undefined
Alex
```

---

# Question 122 — What Is `Object.assign()`?

**Difficulty:** ⭐ Easy

`Object.assign(target, ...sources)` copies enumerable own properties from source objects into the target.

```js
const defaults = {
  theme: "light",
  language: "en"
};

const userSettings = {
  theme: "dark"
};

const settings = Object.assign(
  {},
  defaults,
  userSettings
);

console.log(settings);
```

Output:

```text
{
  theme: "dark",
  language: "en"
}
```

### Important

`Object.assign()` performs a shallow copy.

---

# Question 123 — Object Spread vs `Object.assign()`

**Difficulty:** ⭐⭐ Medium

Both can create shallow copies.

```js
const source = {
  name: "Rasik",
  role: "Frontend Engineer"
};

const copy1 = Object.assign({}, source);
const copy2 = { ...source };

console.log(copy1);
console.log(copy2);
```

Both contain the same top-level values.

### Comparison

| Feature | `Object.assign()` | Spread |
|---|---|---|
| Syntax | More verbose | Concise |
| Mutates target | Yes | Creates new object |
| Shallow | Yes | Yes |
| Multiple sources | Yes | Yes |
| Common React usage | Less common | Very common |

### React example

```js
const updatedUser = {
  ...user,
  role: "Senior Frontend Engineer"
};
```

---

# Question 124 — What Is a Shallow Copy?

**Difficulty:** ⭐⭐ Medium

A shallow copy creates a new outer object but preserves references to nested objects.

```js
const original = {
  name: "Rasik",
  address: {
    city: "Coimbatore"
  }
};

const copy = {
  ...original
};

copy.address.city = "Chennai";

console.log(original.address.city);
```

Output:

```text
Chennai
```

Why?

```text
original
   │
   └── address ─────┐
                    │
copy                │
   │                │
   └── address ─────┘
```

Both point to the same nested object.

---

# Question 125 — What Is a Deep Clone?

**Difficulty:** ⭐⭐⭐ Hard

A deep clone creates independent nested structures.

Modern JavaScript provides `structuredClone()` for many cloneable data types.

```js
const original = {
  name: "Rasik",
  address: {
    city: "Coimbatore"
  }
};

const copy = structuredClone(original);

copy.address.city = "Chennai";

console.log(original.address.city);
console.log(copy.address.city);
```

Output:

```text
Coimbatore
Chennai
```

### Why not always use JSON?

```js
JSON.parse(JSON.stringify(value))
```

has limitations involving values such as:

- `undefined`
- functions
- symbols
- special numeric values
- `Date`
- `Map`
- `Set`
- circular references

`structuredClone()` is generally preferable when its supported clone semantics match your data.

---

# Question 126 — How Do You Deep Clone Without a Built-in?

**Difficulty:** ⭐⭐⭐ Hard

For interview purposes, a recursive clone can be demonstrated.

```js
function deepClone(value, seen = new WeakMap()) {
  if (
    value === null ||
    typeof value !== "object"
  ) {
    return value;
  }

  if (seen.has(value)) {
    return seen.get(value);
  }

  if (Array.isArray(value)) {
    const clone = [];

    seen.set(value, clone);

    for (const item of value) {
      clone.push(deepClone(item, seen));
    }

    return clone;
  }

  const clone = {};

  seen.set(value, clone);

  for (const key of Object.keys(value)) {
    clone[key] = deepClone(value[key], seen);
  }

  return clone;
}

const original = {
  name: "Rasik",
  skills: {
    primary: "JavaScript"
  }
};

const copy = deepClone(original);

copy.skills.primary = "TypeScript";

console.log(original.skills.primary);
console.log(copy.skills.primary);
```

Output:

```text
JavaScript
TypeScript
```

### Important

This is an educational implementation, not a complete replacement for the structured clone algorithm. Production cloning may need support for:

- `Date`
- `Map`
- `Set`
- typed arrays
- `ArrayBuffer`
- special objects
- custom prototypes
- property descriptors

---

# Question 127 — How Do You Clone an Object Without Built-in Copy Helpers?

**Difficulty:** ⭐⭐ Medium

Basic enumerable object clone:

```js
function cloneObject(source) {
  const result = {};

  for (const key of Object.keys(source)) {
    result[key] = source[key];
  }

  return result;
}

const user = {
  name: "Rasik",
  role: "Frontend Engineer"
};

const copy = cloneObject(user);

console.log(copy);
```

Output:

```text
{
  name: "Rasik",
  role: "Frontend Engineer"
}
```

### Important

This is still a shallow clone.

---

# Question 128 — What Are Object Methods?

**Difficulty:** ⭐ Easy

JavaScript provides many important object utilities.

### `Object.keys()`

```js
const user = {
  name: "Rasik",
  role: "Engineer"
};

console.log(Object.keys(user));
```

### `Object.values()`

```js
console.log(Object.values(user));
```

### `Object.entries()`

```js
console.log(Object.entries(user));
```

### `Object.fromEntries()`

```js
const entries = [
  ["name", "Rasik"],
  ["role", "Engineer"]
];

console.log(Object.fromEntries(entries));
```

Output:

```text
{
  name: "Rasik",
  role: "Engineer"
}
```

---

# Question 129 — How Do Objects Affect Performance?

**Difficulty:** ⭐⭐⭐ Hard

Objects are optimized heavily by JavaScript engines, but object shape consistency can matter.

Consider:

```js
const user = {
  name: "Rasik",
  role: "Engineer",
  experience: 7
};
```

Repeatedly creating objects with consistent property structures can help engines optimize property access.

Avoid unnecessary shape changes in hot code:

```js
const user = {};

user.name = "Rasik";
user.role = "Engineer";
user.experience = 7;
```

This does not mean property assignment is always bad. Modern engines optimize many patterns.

### Senior-level principle

Do not optimize object creation based on folklore. Measure actual workloads with profiling tools.

---

# Question 130 — Object Best Practices

**Difficulty:** ⭐⭐ Medium

Recommended practices:

1. Prefer clear object literals.
2. Use `const` for object bindings unless reassignment is required.
3. Avoid unnecessary mutation.
4. Use object spread for readable immutable updates.
5. Use `structuredClone()` when deep cloning is actually required and supported.
6. Avoid JSON cloning for arbitrary data.
7. Use `Object.freeze()` deliberately, not blindly.
8. Avoid prototype pollution vulnerabilities.
9. Validate untrusted input.
10. Keep object shapes predictable in performance-sensitive paths.
11. Avoid using objects as maps when arbitrary keys can introduce prototype-related issues.
12. Consider `Map` for dynamic key/value collections.
13. Avoid unnecessary deep cloning.
14. Document ownership and mutation expectations.
15. Prefer domain-specific types and validation at application boundaries.

---

# Object Internal Model

A useful conceptual model:

```text
JavaScript Object
       │
       ├── Own Properties
       │      ├── data properties
       │      └── accessor properties
       │
       ├── Internal Prototype
       │
       └── Internal Methods
              ├── [[Get]]
              ├── [[Set]]
              ├── [[HasProperty]]
              └── ...
```

Property lookup:

```text
user.name
   ↓
Check own property
   │
   ├── found → return value
   │
   └── not found
          ↓
      prototype
          ↓
      continue lookup
          ↓
      null
```

---

# Property Descriptor Diagram

```text
Property
   │
   ├── value
   ├── writable
   ├── enumerable
   └── configurable
```

Accessor descriptor:

```text
Property
   │
   ├── get
   ├── set
   ├── enumerable
   └── configurable
```

A descriptor cannot freely mix data-property and accessor-property descriptor fields.

---

# `freeze` / `seal` / `preventExtensions`

```text
preventExtensions
       ↓
No new properties

seal
       ↓
No new properties
No deletion
Existing values may remain writable

freeze
       ↓
No new properties
No deletion
Existing data properties not writable
```

---

# Bad Example — JSON Deep Clone

```js
const clone = JSON.parse(JSON.stringify(data));
```

Why it can be dangerous:

- loses unsupported values
- transforms some values
- fails on circular references
- may not preserve intended object semantics

### Better

```js
const clone = structuredClone(data);
```

when the data is supported by structured clone semantics.

---

# Bad Example — Accidental Shared Nested State

```js
const state = {
  user: {
    name: "Rasik"
  }
};

const nextState = {
  ...state
};

nextState.user.name = "Alex";
```

This mutates the nested object shared with `state`.

### Correct immutable update

```js
const nextState = {
  ...state,
  user: {
    ...state.user,
    name: "Alex"
  }
};
```

---

# Bad Example — Untrusted Dynamic Keys

Avoid blindly merging untrusted keys into application objects.

```js
const target = {};

for (const [key, value] of Object.entries(input)) {
  target[key] = value;
}
```

At application boundaries, validate keys and data types.

Use safe data structures and validation where appropriate.

---

# Prototype Pollution

Prototype pollution occurs when attacker-controlled input can modify object prototypes or inherited properties.

Risky patterns include unsafe recursive merges and treating arbitrary user-controlled keys as trusted object paths.

### Defensive principles

- validate input keys
- avoid unsafe deep merge utilities
- use modern maintained libraries
- understand `__proto__`, `constructor`, and `prototype` attack paths
- use `Object.create(null)` where a prototype-less dictionary is appropriate
- never treat client-side objects as an authorization boundary

---

# Object vs Map

| Requirement | Object | Map |
|---|---|---|
| Fixed domain model | Excellent | Usually unnecessary |
| Arbitrary keys | Possible | Excellent |
| Key types | Strings/Symbols | Any value |
| Size | `Object.keys().length` | `map.size` |
| Prototype concerns | Possible | No object prototype lookup |
| Frequent add/delete | Depends | Often a better semantic fit |
| JSON serialization | Natural | Requires conversion |
| Domain records | Excellent | Usually less expressive |

---

# Production Example — Immutable State Update

```js
function updateUserRole(state, role) {
  return {
    ...state,
    user: {
      ...state.user,
      role
    }
  };
}

const state = {
  user: {
    name: "Rasik",
    role: "Engineer"
  }
};

const nextState = updateUserRole(
  state,
  "Senior Engineer"
);

console.log(state.user.role);
console.log(nextState.user.role);
```

Output:

```text
Engineer
Senior Engineer
```

This pattern is common in state-management systems where predictable immutable updates are valuable.

---

# Production Example — Safe Configuration

```js
const CONFIG = Object.freeze({
  api: Object.freeze({
    baseUrl: "/api",
    timeout: 5000
  }),
  features: Object.freeze({
    dashboard: true
  })
});

console.log(CONFIG.api.timeout);
```

For deeply nested configuration, recursively freezing every layer may have runtime costs and may not be necessary. Freeze only where immutability is valuable.

---

# Coding Exercise 1 — Object Keys Without `Object.keys()`

Implement:

```js
getKeys(object)
```

without using:

```js
Object.keys()
```

Expected:

```js
getKeys({
  name: "Rasik",
  role: "Engineer"
});
```

Output:

```text
["name", "role"]
```

### Expected approach

Use:

```js
for...in
```

with an own-property check.

---

# Coding Exercise 2 — Object Values Without `Object.values()`

Implement:

```js
getValues(object)
```

without `Object.values()`.

---

# Coding Exercise 3 — Object Entries Without `Object.entries()`

Implement:

```js
getEntries(object)
```

without `Object.entries()`.

Expected:

```js
[
  ["name", "Rasik"],
  ["role", "Engineer"]
]
```

---

# Coding Exercise 4 — Object From Entries Without Built-in

Implement:

```js
fromEntries(entries)
```

without `Object.fromEntries()`.

---

# Coding Exercise 5 — Shallow Clone Without Built-ins

Implement:

```js
shallowClone(source)
```

without:

- spread
- `Object.assign()`
- JSON
- `structuredClone()`

---

# Coding Exercise 6 — Deep Clone

Implement:

```js
deepClone(value)
```

Requirements:

- primitives
- arrays
- nested objects
- circular references

Use `WeakMap` to avoid infinite recursion.

---

# Coding Exercise 7 — Deep Freeze

Implement:

```js
deepFreeze(object)
```

without using a built-in deep-freeze utility.

Requirements:

- nested objects
- arrays
- circular references
- avoid infinite recursion

---

# Coding Exercise 8 — Property Descriptor

Create a property that:

- cannot be overwritten
- appears in `Object.keys()`
- can be deleted

Explain the descriptor configuration.

---

# Coding Exercise 9 — Immutable Nested Update

Given:

```js
const state = {
  user: {
    profile: {
      name: "Rasik"
    }
  }
};
```

Create a new state where only `name` changes.

Requirements:

- original state unchanged
- no deep clone of unrelated branches
- preserve structural sharing

---

# Coding Exercise 10 — Object Comparison

Implement:

```js
shallowEqual(a, b)
```

without external libraries.

Then explain why shallow equality is useful in UI rendering and state management.

---

# Output-Based Interview Questions

## Output 1

```js
const user = {
  name: "A"
};

const copy = {
  ...user
};

copy.name = "B";

console.log(user.name);
console.log(copy.name);
```

Output:

```text
A
B
```

---

## Output 2

```js
const user = {
  address: {
    city: "Coimbatore"
  }
};

const copy = {
  ...user
};

copy.address.city = "Chennai";

console.log(user.address.city);
```

Output:

```text
Chennai
```

Reason: shallow copy.

---

## Output 3

```js
const user = {
  name: "A"
};

Object.freeze(user);

user.name = "B";

console.log(user.name);
```

Output:

```text
A
```

In strict mode, the assignment throws instead.

---

## Output 4

```js
const user = {
  name: "A"
};

Object.seal(user);

user.name = "B";

console.log(user.name);
```

Output:

```text
B
```

---

## Output 5

```js
const user = {
  name: "A"
};

Object.preventExtensions(user);

user.role = "Engineer";

console.log(user.role);
```

Output:

```text
undefined
```

in ordinary non-strict assignment behavior.

---

## Output 6

```js
const user = {
  name: "A"
};

Object.defineProperty(user, "id", {
  value: 1,
  enumerable: false
});

console.log(Object.keys(user));
```

Output:

```text
["name"]
```

---

## Output 7

```js
const source = {
  a: 1
};

const target = {
  a: 2,
  b: 3
};

Object.assign(target, source);

console.log(target);
```

Output:

```text
{
  a: 1,
  b: 3
}
```

---

## Output 8

```js
const source = {
  nested: {
    value: 1
  }
};

const copy = Object.assign({}, source);

copy.nested.value = 2;

console.log(source.nested.value);
```

Output:

```text
2
```

---

## Output 9

```js
const proto = {
  role: "Engineer"
};

const user = Object.create(proto);

user.name = "Rasik";

console.log(user.role);
```

Output:

```text
Engineer
```

---

## Output 10

```js
const user = Object.create(null);

user.name = "Rasik";

console.log(user.toString);
```

Output:

```text
undefined
```

There is no `Object.prototype` in the prototype chain.

---

# MCQs

## MCQ 1

Which descriptor controls whether a property can be changed?

A. enumerable  
B. configurable  
C. writable  
D. extensible

**Answer: C**

---

## MCQ 2

Which operation creates a shallow copy?

A. `structuredClone()`  
B. `{ ...obj }`  
C. recursive clone  
D. deep clone

**Answer: B**

---

## MCQ 3

Which method prevents adding new properties but does not necessarily prevent changing existing writable properties?

A. `Object.freeze()`  
B. `Object.seal()`  
C. `Object.preventExtensions()`  
D. `Object.create()`

**Answer: C**

---

## MCQ 4

What is a major limitation of JSON cloning?

A. It cannot clone ordinary strings  
B. It cannot represent many JavaScript values faithfully  
C. It always preserves prototypes  
D. It supports circular references

**Answer: B**

---

## MCQ 5

Which structure is usually better for arbitrary dynamic keys?

A. `Map`  
B. `Boolean`  
C. `Promise`  
D. `WeakSet`

**Answer: A**

---

# Scenario-Based Interview Question

## Scenario

A React application updates this state:

```js
const nextState = {
  ...state
};

nextState.user.profile.name = "Alex";
```

The UI unexpectedly shows changes in both the old and new state references.

### Root cause

The spread copied only the top-level object.

```text
state
 │
 └── user ───────┐
                 │
nextState        │
 │               │
 └── user ───────┘
```

### Correct

```js
const nextState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: "Alex"
    }
  }
};
```

This preserves structural sharing for unchanged branches while replacing the changed path.

---

# Senior Follow-Up Questions

1. What is the difference between an own property and inherited property?
2. How does property lookup work?
3. What are data descriptors and accessor descriptors?
4. Why is `Object.freeze()` shallow?
5. How would you implement `deepFreeze()`?
6. Why is `structuredClone()` preferable to JSON cloning in many cases?
7. When would you choose `Map` over `Object`?
8. What is prototype pollution?
9. How can `Object.create(null)` help?
10. What are hidden classes?
11. How can inconsistent object shapes affect engine optimization?
12. How does structural sharing help React/state management?
13. Why can unnecessary deep cloning hurt performance?
14. How would you profile object-heavy code?

---

# Staff Engineer Questions

1. Design a safe configuration object for a large frontend platform.
2. How would you enforce immutability across a large application?
3. When is deep cloning an architectural smell?
4. How would you prevent prototype pollution in a shared utility library?
5. How would you design a generic deep-merge API safely?
6. How would you migrate an object-heavy cache to `Map`?
7. How would you measure object allocation pressure?
8. How would you preserve structural sharing during large state updates?
9. How would you review a utility that recursively clones arbitrary values?
10. How would you define object ownership boundaries between frontend modules?

---

# Principal Engineer Questions

1. How would you define object/data ownership across a large monorepo?
2. What object patterns can create long-term performance problems?
3. How would you design a serialization boundary between frontend and backend?
4. How would you establish safe object-merging standards organization-wide?
5. How would you detect prototype-pollution vulnerabilities at scale?
6. When should a team use immutable data versus controlled mutation?
7. How would you balance runtime performance, memory usage, and developer ergonomics?
8. How would you design a state architecture that minimizes unnecessary cloning?

---

# 30-Second Interview Answer

> JavaScript objects are dynamic collections of properties with an internal prototype link. Objects can be created with literals, constructors, classes, or `Object.create()`. Properties have descriptors such as writable, enumerable, and configurable. Spread and `Object.assign()` perform shallow copying, while deep cloning requires recursively copying nested structures or using `structuredClone()` when appropriate. For production systems, object ownership, mutation, structural sharing, prototype safety, and performance should all be considered.

---

# 2-Minute Interview Answer

> A JavaScript object contains own properties and has an internal prototype used for inherited property lookup. Object literals are the most common creation mechanism, while constructors and classes are useful for instances. Property descriptors control how properties behave. `Object.freeze()`, `seal()`, and `preventExtensions()` provide different levels of structural restriction. Spread and `Object.assign()` are shallow-copy mechanisms, so nested references remain shared. For deep cloning, `structuredClone()` is often preferable to JSON serialization when its supported types match the data. In large applications, I also consider structural sharing, object shape consistency, prototype-pollution risks, and whether a `Map` is more appropriate than an object.

---

# 5-Minute Deep Explanation

A senior explanation should connect objects to the runtime.

```text
Object
  │
  ├── own properties
  │
  ├── internal prototype
  │
  └── internal object operations
          │
          ├── get
          ├── set
          ├── has
          └── delete
```

Property lookup:

```text
obj.key
  ↓
own property?
  │
 yes → return
  │
 no
  ↓
prototype?
  │
 yes → continue
  │
 no
  ↓
undefined
```

Copying:

```text
shallow copy
     ↓
new outer object
     ↓
nested references shared
```

Deep copy:

```text
deep clone
     ↓
new outer object
     ↓
new nested structures
     ↓
independent state
```

Performance:

```text
Object creation
      ↓
engine observes shapes
      ↓
optimized property access
      ↓
shape changes may cause additional transitions
```

Production design:

```text
External Input
      ↓
Validation
      ↓
Normalization
      ↓
Domain Object
      ↓
Application State
      ↓
UI
```

Never treat client-side object properties as a security boundary.

---

# Assignments

## Assignment 1 — Object Utility Library

Implement without the corresponding built-ins:

```text
keys
values
entries
fromEntries
assign
clone
deepClone
freeze
deepFreeze
```

---

## Assignment 2 — Immutable State Manager

Build a small state manager that:

- stores nested state
- updates immutable paths
- preserves references for unchanged branches
- supports subscriptions
- exposes previous/current state

---

## Assignment 3 — Prototype Pollution Defense

Create a safe object merge function that:

- rejects dangerous keys
- handles nested objects
- avoids prototype mutation
- includes tests

---

# Mini Project — Object Inspector

Build a browser tool that accepts a JavaScript object and displays:

```text
Own Properties
Property Descriptors
Enumerable Properties
Prototype
Prototype Chain
Frozen?
Sealed?
Extensible?
```

Example:

```text
User
 ├── name
 ├── role
 └── experience

Prototype
 ↓
Object.prototype
 ↓
null
```

---

# Revision Notes

Remember:

```text
Object
 ↓
Own Properties + Prototype
```

Descriptors:

```text
value
writable
enumerable
configurable
```

Copying:

```text
{ ...obj }
Object.assign()
      ↓
shallow
```

Deep clone:

```text
structuredClone()
```

Restrictions:

```text
preventExtensions
      ↓
no additions

seal
      ↓
no additions/deletion

freeze
      ↓
no additions/deletion/value writes
```

---

# Object Cheat Sheet

| Topic | Key Point |
|---|---|
| Object literal | Common object creation |
| `Object.create()` | Explicit prototype |
| Constructor | Instance creation with `new` |
| Descriptor | Controls property behavior |
| `writable` | Value can change |
| `enumerable` | Appears in common enumeration |
| `configurable` | Descriptor/deletion control |
| `freeze()` | Shallow immutability restriction |
| `seal()` | No add/delete |
| `preventExtensions()` | No new properties |
| Spread | Shallow copy |
| `Object.assign()` | Shallow copy into target |
| `structuredClone()` | Deep clone for supported cloneable values |
| `Map` | Dynamic key/value collection |
| `Object.create(null)` | Prototype-less dictionary |

---

# Final Module Checklist

- [x] Object creation
- [x] Object literals
- [x] Constructor functions
- [x] `Object.create()`
- [x] Property descriptors
- [x] `writable`
- [x] `enumerable`
- [x] `configurable`
- [x] `Object.freeze()`
- [x] `Object.seal()`
- [x] `Object.preventExtensions()`
- [x] `Object.assign()`
- [x] Spread
- [x] Shallow copy
- [x] Deep clone
- [x] Manual deep clone
- [x] Object methods
- [x] Nested objects
- [x] Object performance
- [x] Prototype pollution
- [x] Object vs Map
- [x] Coding exercises
- [x] Output questions
- [x] MCQs
- [x] Assignments
- [x] Mini project
- [x] Senior questions
- [x] Staff questions
- [x] Principal questions
- [x] Production examples
- [x] Revision notes
- [x] Cheat sheet

---

# Module 6 Complete

**Part 4 → Module 6: Objects**

**Questions:** 111–130

**Next:** Module 7 — Prototypes (Questions 131–155)
