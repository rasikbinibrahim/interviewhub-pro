# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 7 — Prototypes

**Questions 131–155**

**Audience:** Freshers → Junior → Mid-Level → Senior → Staff → Principal Frontend Engineers

---

# Module Objective

This module provides a complete interview-focused treatment of JavaScript's prototype system.

Topics covered:

- Prototype fundamentals
- `Object.getPrototypeOf()`
- `Object.setPrototypeOf()`
- `__proto__`
- `prototype` property
- Constructor property
- Prototype chain
- Property lookup
- Prototype inheritance
- Shadowing
- `Object.create()`
- Built-in prototypes
- Array prototype
- Function prototype
- Object prototype
- Custom prototypes
- ES5 inheritance
- ES6 classes
- Prototype pollution
- Performance
- Debugging
- Polyfills
- Production patterns
- Output questions
- Coding exercises
- Senior / Staff / Principal interview questions

---

# Question 131 — What Is a Prototype?

**Difficulty:** ⭐ Easy  
**Experience Level:** 0–2 Years

A prototype is an object that another object can use for inherited property and method lookup.

Example:

```js
const user = {
  name: "Rasik"
};

console.log(Object.getPrototypeOf(user) === Object.prototype);
```

Typical output:

```text
true
```

Conceptually:

```text
user
 │
 └── [[Prototype]]
          ↓
   Object.prototype
          ↓
        null
```

The prototype is not the same thing as the object's own properties.

---

# Question 132 — What Is the Prototype Chain?

**Difficulty:** ⭐⭐ Medium  
**Experience Level:** 0–2 Years

The prototype chain is the sequence of objects JavaScript searches when a property is not found directly on an object.

Example:

```js
const person = {
  greet() {
    return "Hello";
  }
};

const user = Object.create(person);

user.name = "Rasik";

console.log(user.greet());
```

Output:

```text
Hello
```

Lookup:

```text
user.greet
   ↓
Does user have greet?
   ↓ No
person.greet
   ↓
Function found
   ↓
execute
```

If the property is not found, lookup continues until the chain reaches `null`.

---

# Question 133 — What Is `__proto__`?

**Difficulty:** ⭐⭐ Medium  
**Experience Level:** 2–5 Years

`__proto__` is a legacy accessor for an object's internal `[[Prototype]]`.

Example:

```js
const user = {};

console.log(user.__proto__ === Object.prototype);
```

Output:

```text
true
```

Prefer the standardized APIs:

```js
Object.getPrototypeOf(user);
Object.setPrototypeOf(user, prototype);
```

rather than relying on `__proto__`.

### Important distinction

```text
obj.__proto__
       ↓
internal [[Prototype]]

obj.prototype
       ↓
usually undefined unless obj itself has a property named prototype
```

---

# Question 134 — What Is the `prototype` Property?

**Difficulty:** ⭐⭐ Medium

Functions used as constructors commonly have a `prototype` property.

```js
function User(name) {
  this.name = name;
}

console.log(typeof User.prototype);
```

Output:

```text
object
```

Methods can be placed on the constructor's prototype:

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hello ${this.name}`;
};

const user = new User("Rasik");

console.log(user.greet());
```

Output:

```text
Hello Rasik
```

Diagram:

```text
user
 │
 └── [[Prototype]]
          ↓
     User.prototype
          ↓
     Object.prototype
          ↓
         null
```

---

# Question 135 — What Is the Constructor Property?

**Difficulty:** ⭐⭐ Medium

Constructor functions normally have a `prototype` object whose `constructor` property points back to the function.

```js
function User() {}

console.log(User.prototype.constructor === User);
```

Output:

```text
true
```

Example:

```js
function User(name) {
  this.name = name;
}

const user = new User("Rasik");

console.log(user.constructor === User);
```

Output:

```text
true
```

### Important interview trap

`constructor` is inherited and can be shadowed.

Do not use `obj.constructor` as an unquestionable security or type-validation mechanism.

---

# Question 136 — How Does `Object.create()` Work With Prototypes?

**Difficulty:** ⭐⭐ Medium

`Object.create(proto)` creates an object whose internal prototype is `proto`.

```js
const employeeMethods = {
  describe() {
    return `${this.name} is an employee`;
  }
};

const employee = Object.create(employeeMethods);

employee.name = "Rasik";

console.log(employee.describe());
```

Output:

```text
Rasik is an employee
```

Prototype check:

```js
console.log(
  Object.getPrototypeOf(employee) === employeeMethods
);
```

Output:

```text
true
```

---

# Question 137 — How Does Prototype Inheritance Work?

**Difficulty:** ⭐⭐ Medium

A child object can inherit methods from a prototype object.

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  return `${this.name} barks`;
};

const dog = new Dog("Bruno");

console.log(dog.speak());
console.log(dog.bark());
```

Output:

```text
Bruno makes a sound
Bruno barks
```

Diagram:

```text
dog
 ↓
Dog.prototype
 ↓
Animal.prototype
 ↓
Object.prototype
 ↓
null
```

---

# Question 138 — What Is Property Shadowing?

**Difficulty:** ⭐⭐ Medium

Shadowing happens when an object has its own property with the same name as an inherited property.

```js
const parent = {
  role: "Engineer"
};

const child = Object.create(parent);

console.log(child.role);

child.role = "Senior Engineer";

console.log(child.role);
console.log(parent.role);
```

Output:

```text
Engineer
Senior Engineer
Engineer
```

Before assignment:

```text
child.role
   ↓
not own
   ↓
parent.role
```

After assignment:

```text
child.role
   ↓
own property found
   ↓
Senior Engineer
```

---

# Question 139 — How Does Property Lookup Work?

**Difficulty:** ⭐⭐⭐ Hard

For a normal property read:

```js
obj.value
```

the engine conceptually searches:

```text
obj
 ↓
own property?
 ├── yes → return value
 └── no
      ↓
[[Prototype]]
      ↓
prototype own property?
 ├── yes → return value
 └── no
      ↓
next prototype
      ↓
...
      ↓
null
      ↓
undefined
```

Example:

```js
const grandParent = {
  level: 1
};

const parent = Object.create(grandParent);

const child = Object.create(parent);

console.log(child.level);
```

Output:

```text
1
```

---

# Question 140 — What Are Built-in Prototypes?

**Difficulty:** ⭐ Easy

JavaScript built-in objects have prototype objects containing commonly shared methods.

Examples:

```text
Object.prototype
Array.prototype
Function.prototype
String.prototype
Number.prototype
Boolean.prototype
Date.prototype
RegExp.prototype
Map.prototype
Set.prototype
Promise.prototype
```

Example:

```js
const numbers = [1, 2, 3];

console.log(
  Object.getPrototypeOf(numbers) === Array.prototype
);
```

Output:

```text
true
```

---

# Question 141 — What Is `Array.prototype`?

**Difficulty:** ⭐⭐ Medium

`Array.prototype` contains methods shared by array instances.

Examples:

```js
const numbers = [1, 2, 3];

console.log(numbers.map);
console.log(numbers.filter);
console.log(numbers.reduce);
```

These methods are generally not copied into every array as independent function values.

Conceptually:

```text
numbers
   ↓
Array.prototype
   ├── map
   ├── filter
   ├── reduce
   ├── slice
   └── ...
        ↓
Object.prototype
        ↓
null
```

This shared-method design reduces duplication.

---

# Question 142 — What Is `Function.prototype`?

**Difficulty:** ⭐⭐ Medium

Functions are objects, and function objects inherit from `Function.prototype`.

```js
function greet() {
  return "Hello";
}

console.log(
  Object.getPrototypeOf(greet) === Function.prototype
);
```

Output:

```text
true
```

Methods such as:

```js
call()
apply()
bind()
```

are associated with function behavior through `Function.prototype`.

---

# Question 143 — What Is `Object.prototype`?

**Difficulty:** ⭐ Easy

`Object.prototype` is near the top of the ordinary object prototype chain.

Common inherited methods include:

```js
toString()
valueOf()
hasOwnProperty()
isPrototypeOf()
propertyIsEnumerable()
```

Example:

```js
const user = {
  name: "Rasik"
};

console.log(
  user.toString()
);
```

Output is a string representation such as:

```text
[object Object]
```

The exact behavior depends on whether the object overrides `toString()`.

---

# Question 144 — How Do You Create a Custom Prototype?

**Difficulty:** ⭐⭐ Medium

Use an object as a shared prototype.

```js
const vehicleMethods = {
  start() {
    return `${this.brand} started`;
  }
};

const car = Object.create(vehicleMethods);

car.brand = "Toyota";

console.log(car.start());
```

Output:

```text
Toyota started
```

This is useful when several objects share behavior without duplicating methods.

---

# Question 145 — What Is Prototype Pollution?

**Difficulty:** ⭐⭐⭐ Hard  
**Experience Level:** 5–8 Years+

Prototype pollution is a security vulnerability where attacker-controlled input causes unexpected modifications to an object's prototype or inherited properties.

Conceptually:

```text
Untrusted Input
      ↓
Unsafe Merge / Assignment
      ↓
Prototype Mutation
      ↓
Unexpected inherited properties
      ↓
Security / Logic Impact
```

Risky application code often involves unsafe recursive merging of untrusted keys.

### Defensive principles

- validate untrusted keys
- avoid unsafe deep merge implementations
- keep dependencies updated
- understand `__proto__`, `constructor`, and `prototype`
- use `Object.create(null)` for appropriate dictionary use cases
- do not rely on inherited properties for authorization
- use `Object.hasOwn()` for own-property checks when appropriate

Example:

```js
const user = Object.create(null);

user.name = "Rasik";

console.log(Object.hasOwn(user, "name"));
```

Output:

```text
true
```

---

# Question 146 — Does Modifying a Prototype Affect Existing Objects?

**Difficulty:** ⭐⭐ Medium

Yes, objects that inherit from that prototype can observe the change.

```js
const user = {
  name: "Rasik"
};

const prototype = Object.getPrototypeOf(user);

prototype.greet = function () {
  return `Hello ${this.name}`;
};

console.log(user.greet());
```

Output:

```text
Hello Rasik
```

However, modifying built-in prototypes globally is generally discouraged.

---

# Question 147 — Why Is Modifying Built-in Prototypes Usually Discouraged?

**Difficulty:** ⭐⭐⭐ Hard

Avoid patterns such as:

```js
Array.prototype.myCustomMethod = function () {
  // ...
};
```

Problems include:

- namespace collisions
- unexpected behavior
- compatibility issues
- library conflicts
- debugging complexity
- surprising behavior across the application

Modern applications should generally prefer standalone utilities, modules, or explicit abstractions.

### Interview exception

Polyfill questions may intentionally ask you to modify a prototype to demonstrate how a feature could be implemented.

---

# Question 148 — ES5 Prototype Inheritance vs ES6 Classes

**Difficulty:** ⭐⭐⭐ Hard

### ES5

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} speaks`;
};

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
```

### ES6+

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} speaks`;
  }
}

class Dog extends Animal {
  bark() {
    return `${this.name} barks`;
  }
}
```

Classes provide cleaner syntax, but JavaScript class inheritance is still based on prototypes.

```text
class syntax
     ↓
prototype-based object model
```

---

# Question 149 — What Are the Performance Considerations of Prototypes?

**Difficulty:** ⭐⭐⭐ Hard

JavaScript engines optimize property access aggressively.

Consistent object structures can help engines optimize access.

Avoid unnecessary runtime prototype mutation:

```js
Object.setPrototypeOf(obj, anotherPrototype);
```

in hot paths.

Why?

Changing prototype relationships can invalidate assumptions made by the engine and can reduce optimization opportunities.

### Senior principle

Do not claim that every prototype operation is slow. Measure with profiling.

Useful tools include:

- Chrome DevTools Performance
- Chrome DevTools Memory
- Node.js profiling
- production telemetry

---

# Question 150 — How Do You Debug the Prototype Chain?

**Difficulty:** ⭐⭐ Medium

Use:

```js
Object.getPrototypeOf()
```

Example:

```js
const user = {
  name: "Rasik"
};

let current = user;

while (current !== null) {
  console.log(current);
  current = Object.getPrototypeOf(current);
}
```

You can also use browser developer tools to inspect an object's prototype.

Useful checks:

```js
Object.getPrototypeOf(user);

Object.hasOwn(user, "name");

"name" in user;
```

Difference:

```text
Object.hasOwn(user, key)
        ↓
own property only

key in user
        ↓
own + inherited properties
```

---

# Question 151 — What Is the Difference Between `prototype` and `__proto__`?

**Difficulty:** ⭐⭐⭐ Hard

This is one of the most common interview questions.

| Concept | Meaning |
|---|---|
| `obj.[[Prototype]]` | Internal prototype relationship |
| `Object.getPrototypeOf(obj)` | Standard way to read it |
| `Object.setPrototypeOf(obj, proto)` | Standard way to change it |
| `obj.__proto__` | Legacy accessor for prototype |
| `Constructor.prototype` | Object used as prototype for instances created with `new Constructor()` |

Example:

```js
function User() {}

const user = new User();

console.log(
  Object.getPrototypeOf(user) === User.prototype
);
```

Output:

```text
true
```

But:

```js
console.log(User.prototype);
```

is different from:

```js
Object.getPrototypeOf(User);
```

because `User` itself is a function object.

---

# Question 152 — How Does `instanceof` Use Prototypes?

**Difficulty:** ⭐⭐⭐ Hard

`instanceof` checks whether a constructor's `prototype` occurs in the object's prototype chain.

```js
function User() {}

const user = new User();

console.log(user instanceof User);
```

Output:

```text
true
```

Conceptually:

```text
user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

The operation checks whether `User.prototype` is reachable through the object's prototype chain.

### Important

`instanceof` is not a universal way to validate arbitrary data received from APIs.

For untrusted external data, validate structure and values explicitly.

---

# Question 153 — How Does `Object.isPrototypeOf()` Work?

**Difficulty:** ⭐⭐ Medium

It checks whether an object exists in another object's prototype chain.

```js
const parent = {
  greet() {
    return "Hello";
  }
};

const child = Object.create(parent);

console.log(parent.isPrototypeOf(child));
```

Output:

```text
true
```

This can be useful when explicitly working with prototype relationships.

---

# Question 154 — How Do You Implement a Simple `instanceof`-like Function?

**Difficulty:** ⭐⭐⭐ Hard

Educational implementation:

```js
function myInstanceOf(value, Constructor) {
  if (
    value === null ||
    (typeof value !== "object" &&
      typeof value !== "function")
  ) {
    return false;
  }

  const targetPrototype = Constructor.prototype;
  let current = Object.getPrototypeOf(value);

  while (current !== null) {
    if (current === targetPrototype) {
      return true;
    }

    current = Object.getPrototypeOf(current);
  }

  return false;
}

function User() {}

const user = new User();

console.log(myInstanceOf(user, User));
```

Output:

```text
true
```

### Complexity

If the prototype chain has height `h`:

```text
Time:  O(h)
Space: O(1)
```

This is an educational approximation and does not reproduce every ECMAScript edge case.

---

# Question 155 — What Are the Best Practices for Prototypes?

**Difficulty:** ⭐⭐ Medium

### Recommended

1. Understand the prototype chain.
2. Prefer classes or object composition when they improve readability.
3. Use `Object.getPrototypeOf()` instead of `__proto__`.
4. Avoid unnecessary `Object.setPrototypeOf()` in hot paths.
5. Avoid modifying built-in prototypes.
6. Keep shared methods on prototypes when appropriate.
7. Use `Object.hasOwn()` for own-property checks.
8. Treat `instanceof` carefully across realms.
9. Protect dynamic object merging from prototype pollution.
10. Profile before making performance claims.
11. Prefer composition when inheritance becomes deep or rigid.
12. Document unusual prototype manipulation.

---

# Prototype Chain Diagram

```text
                 null
                  ↑
           Object.prototype
                  ↑
           Animal.prototype
                  ↑
             Dog.prototype
                  ↑
                 dog
```

For:

```js
class Animal {}

class Dog extends Animal {}

const dog = new Dog();
```

Conceptually:

```text
dog
 ↓
Dog.prototype
 ↓
Animal.prototype
 ↓
Object.prototype
 ↓
null
```

---

# Property Lookup Diagram

```text
dog.name
   │
   ↓
Own property?
   │
 ┌─┴─┐
Yes  No
 │    │
 ↓    ↓
value Dog.prototype
          │
          ↓
       found?
          │
       No ↓
          ↓
 Animal.prototype
          │
          ↓
       found?
          │
       No ↓
          ↓
 Object.prototype
          │
          ↓
         null
```

---

# `prototype` vs `[[Prototype]]`

```text
function User() {}

User
 │
 ├── prototype ──────────────┐
 │                           ↓
 │                     User.prototype
 │
 └── [[Prototype]]
             ↓
       Function.prototype
             ↓
       Object.prototype
             ↓
            null
```

Instance:

```text
const user = new User();

user
 │
 └── [[Prototype]]
             ↓
       User.prototype
             ↓
       Object.prototype
             ↓
            null
```

---

# Bad Example — Using `__proto__`

```js
const user = {};

user.__proto__ = somePrototype;
```

### Better

```js
Object.setPrototypeOf(user, somePrototype);
```

However, even `Object.setPrototypeOf()` should not be used casually in performance-sensitive code.

Prefer creating the object with the intended prototype:

```js
const user = Object.create(somePrototype);
```

---

# Bad Example — Modifying Native Prototypes

```js
Array.prototype.lastItem = function () {
  return this[this.length - 1];
};
```

### Better

```js
function lastItem(items) {
  return items[items.length - 1];
}
```

This avoids globally modifying behavior.

---

# Production Example — Shared Domain Behavior

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  canAccessAdmin() {
    return this.role === "admin";
  }
}

const user = new User(
  "Rasik",
  "admin"
);

console.log(user.canAccessAdmin());
```

Output:

```text
true
```

The method is defined on `User.prototype`, rather than recreated as a separate function for every instance.

---

# Production Example — Prototype-less Dictionary

```js
const permissions = Object.create(null);

permissions.read = true;
permissions.write = false;

console.log(Object.hasOwn(permissions, "read"));
```

Output:

```text
true
```

This can be useful when the object is strictly intended as a dictionary and inherited properties are undesirable.

---

# Coding Exercise 1 — Prototype Chain Printer

Implement:

```js
printPrototypeChain(value)
```

Output:

```text
Instance
↓
Prototype
↓
Object.prototype
↓
null
```

---

# Coding Exercise 2 — Custom `hasOwn`

Implement:

```js
function hasOwn(object, key) {
  // no Object.hasOwn()
}
```

Handle objects that may shadow `hasOwnProperty`.

Hint:

```js
Object.prototype.hasOwnProperty.call(...)
```

---

# Coding Exercise 3 — Custom `instanceof`

Implement:

```js
myInstanceOf(value, Constructor)
```

Requirements:

- traverse prototype chain
- return boolean
- handle primitives
- avoid infinite loops

---

# Coding Exercise 4 — Constructor + Prototype

Create:

```js
function Employee(name, role)
```

Add:

```js
Employee.prototype.describe()
```

Requirements:

- method shared between instances
- correct constructor reference
- no duplicate method functions

---

# Coding Exercise 5 — ES5 Inheritance

Implement:

```text
Animal
  ↓
Dog
```

without `class`.

Requirements:

- constructor chaining
- prototype inheritance
- correct `constructor`
- shared methods

---

# Coding Exercise 6 — Class Inheritance

Implement the same system using:

```js
class Animal {}
class Dog extends Animal {}
```

Then compare it with the ES5 version.

---

# Coding Exercise 7 — Prototype Pollution Defense

Create a safe merge utility that rejects:

```text
__proto__
constructor
prototype
```

where they could lead to unsafe prototype mutation.

Explain why validation must occur at every relevant nested merge boundary.

---

# Coding Exercise 8 — Shared Method Benchmark

Create 100,000 instances using:

1. per-instance methods
2. prototype methods

Measure:

- memory
- construction time
- method call time

Then profile before drawing conclusions.

---

# Coding Exercise 9 — Custom `Object.create`

Create an educational version:

```js
function createObject(proto) {
  // demonstrate prototype linkage
}
```

Document why a production implementation should use the native API.

---

# Coding Exercise 10 — Prototype Inspector

Build:

```js
inspectPrototype(value)
```

Return:

```js
{
  ownKeys: [],
  prototypeName: "...",
  chainDepth: 0,
  hasObjectPrototype: true
}
```

---

# Output-Based Interview Questions

## Output 1

```js
const parent = {
  role: "Engineer"
};

const child = Object.create(parent);

console.log(child.role);
```

Output:

```text
Engineer
```

---

## Output 2

```js
const parent = {
  role: "Engineer"
};

const child = Object.create(parent);

child.role = "Senior Engineer";

console.log(parent.role);
console.log(child.role);
```

Output:

```text
Engineer
Senior Engineer
```

---

## Output 3

```js
function User() {}

const user = new User();

console.log(
  Object.getPrototypeOf(user) === User.prototype
);
```

Output:

```text
true
```

---

## Output 4

```js
function User() {}

console.log(
  User.prototype.constructor === User
);
```

Output:

```text
true
```

---

## Output 5

```js
const array = [];

console.log(
  Object.getPrototypeOf(array) === Array.prototype
);
```

Output:

```text
true
```

---

## Output 6

```js
const obj = Object.create(null);

console.log(Object.getPrototypeOf(obj));
```

Output:

```text
null
```

---

## Output 7

```js
const parent = {
  value: 10
};

const child = Object.create(parent);

child.value = 20;

console.log(parent.value);
console.log(child.value);
```

Output:

```text
10
20
```

---

## Output 8

```js
function User() {}

const user = new User();

console.log(user instanceof User);
console.log(user instanceof Object);
```

Output:

```text
true
true
```

---

## Output 9

```js
const parent = {
  value: 10
};

const child = Object.create(parent);

console.log("value" in child);
console.log(Object.hasOwn(child, "value"));
```

Output:

```text
true
false
```

---

## Output 10

```js
const parent = {
  greet() {
    return "parent";
  }
};

const child = Object.create(parent);

child.greet = function () {
  return "child";
};

console.log(child.greet());
console.log(parent.greet());
```

Output:

```text
child
parent
```

---

# MCQs

## MCQ 1

What does `Object.getPrototypeOf(obj)` return?

A. Constructor  
B. Internal prototype object  
C. Object class name  
D. Own properties

**Answer: B**

---

## MCQ 2

For `const user = new User()`, what is normally true?

A. `user.prototype === User`
B. `Object.getPrototypeOf(user) === User.prototype`
C. `User.__proto__ === user`
D. `user === User.prototype`

**Answer: B**

---

## MCQ 3

Where are methods defined by a JavaScript class normally found?

A. Each instance as an independent function  
B. `Class.prototype`  
C. `Object.prototype`  
D. Global scope

**Answer: B**

---

## MCQ 4

Which is the preferred modern API for reading an object's prototype?

A. `obj.__proto__`
B. `obj.prototype`
C. `Object.getPrototypeOf(obj)`
D. `Object.prototype(obj)`

**Answer: C**

---

## MCQ 5

What does the `in` operator check?

A. Only own properties  
B. Own and inherited properties  
C. Only enumerable properties  
D. Only prototype properties

**Answer: B**

---

# Scenario-Based Interview Question

## Scenario

A team creates:

```js
function User(name) {
  this.name = name;

  this.greet = function () {
    return `Hello ${this.name}`;
  };
}
```

They create one million users.

### Interview question

What could be improved?

### Answer

The method is created separately for every instance.

A shared prototype method is usually more appropriate:

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hello ${this.name}`;
};
```

Now instances share the method through the prototype chain.

### Important

Do not automatically assume this produces a measurable problem. Profile the real workload.

---

# Senior Follow-Up Questions

1. Explain `prototype` vs `[[Prototype]]`.
2. Why is `__proto__` discouraged?
3. How does `new` establish the prototype relationship?
4. How does property lookup traverse prototypes?
5. What is shadowing?
6. How does `instanceof` work?
7. What happens when a prototype is changed?
8. Why can prototype mutation affect performance?
9. Why are class methods shared?
10. What is prototype pollution?
11. How do you defend against prototype pollution?
12. What happens across different browser realms?
13. Why can `instanceof` fail across realms?
14. When would `Object.create(null)` be useful?
15. When would composition be preferable to inheritance?

---

# Staff Engineer Questions

1. Design a prototype-based domain model for a large application.
2. When should inheritance be rejected in favor of composition?
3. How would you audit a shared deep-merge utility for prototype pollution?
4. How would you prevent global prototype modifications in a monorepo?
5. How would you investigate a regression caused by prototype mutation?
6. How would you measure the memory impact of per-instance methods?
7. How would you design a plugin system using prototypes or composition?
8. How would you handle objects crossing iframe boundaries?
9. How would you document prototype-dependent APIs?
10. How would you migrate legacy ES5 inheritance to modern classes?

---

# Principal Engineer Questions

1. What prototype patterns should be standardized across an enterprise frontend platform?
2. How would you define safe rules for object merging?
3. How would you detect prototype pollution across hundreds of repositories?
4. How would you balance inheritance and composition across teams?
5. How would you design a shared JavaScript runtime library without modifying native prototypes?
6. How would you evaluate a proposal to use dynamic prototype mutation?
7. How would you establish security controls for prototype-related vulnerabilities?
8. How would you measure whether prototype-based optimizations actually improve production performance?

---

# 30-Second Interview Answer

> JavaScript uses prototype-based inheritance. Every ordinary object has an internal `[[Prototype]]` relationship that is followed when a property is not found on the object itself. Constructor functions expose a `prototype` object, and objects created with `new` normally inherit from that prototype. Classes provide cleaner syntax over this prototype-based model. Understanding prototypes is essential for inheritance, property lookup, `instanceof`, shared methods, performance, and security issues such as prototype pollution.

---

# 2-Minute Interview Answer

> A prototype is an object used for inherited property lookup. When `obj.property` is evaluated, JavaScript first checks the object's own properties. If the property is missing, it follows the object's `[[Prototype]]` link until it finds the property or reaches `null`. Constructor functions have a `prototype` property, and instances created with `new` normally use that object as their prototype. ES6 classes do not replace the prototype model; they provide cleaner syntax for it. In production, I avoid unnecessary prototype mutation, avoid modifying built-in prototypes, use safe own-property checks, and protect dynamic object operations against prototype pollution.

---

# 5-Minute Deep Explanation

Start with two different concepts:

```text
Constructor Function
       │
       └── prototype property
                    │
                    ↓
              Prototype Object
```

Then an instance:

```text
const user = new User();

user
 │
 └── [[Prototype]]
          ↓
     User.prototype
          ↓
     Object.prototype
          ↓
         null
```

Property lookup:

```text
user.name
    ↓
own property?
    ↓
yes → return
    ↓ no
User.prototype
    ↓
found?
    ↓ no
Object.prototype
    ↓
found?
    ↓ no
null
    ↓
undefined
```

Classes:

```text
class User {}
       ↓
User.prototype
       ↓
instance inherits from it
```

Performance:

```text
Object Shape
    ↓
Engine optimization
    ↓
Property access
```

Unexpected prototype mutation can invalidate engine assumptions.

Security:

```text
Untrusted Input
      ↓
Unsafe Merge
      ↓
Prototype Mutation
      ↓
Unexpected Inheritance
      ↓
Security / Logic Risk
```

Production rules:

```text
Use prototypes intentionally
        ↓
Avoid unnecessary mutation
        ↓
Validate external data
        ↓
Protect merge utilities
        ↓
Profile performance
```

---

# Assignments

## Assignment 1 — Prototype Explorer

Build a browser tool that lets a user enter an object and displays:

- own properties
- inherited properties
- prototype chain
- constructor
- whether object is extensible
- whether object is sealed
- whether object is frozen

---

## Assignment 2 — ES5 to ES6 Migration

Convert a legacy constructor/prototype inheritance hierarchy into ES6 classes.

Document:

- behavior
- prototype relationships
- tests
- trade-offs

---

## Assignment 3 — Secure Object Utility

Build a safe object utility library containing:

```text
hasOwn
safeAssign
safeMerge
clone
deepClone
inspectPrototype
```

Add security tests for dangerous keys.

---

# Mini Project — Prototype Inspector

Build a React/browser application:

```text
┌──────────────────────────────┐
│ Prototype Inspector          │
├──────────────────────────────┤
│ Object Input                 │
├──────────────────────────────┤
│ Own Properties               │
│ Inherited Properties         │
│ Prototype Chain              │
│ Constructor                  │
│ Extensible / Sealed / Frozen │
└──────────────────────────────┘
```

Add:

- search
- property filtering
- prototype depth
- copy-to-clipboard
- accessibility
- error handling
- unit tests

---

# Revision Notes

```text
prototype
   ↓
shared behavior

[[Prototype]]
   ↓
actual internal inheritance relationship

Constructor.prototype
   ↓
prototype used by instances created with new

property lookup
   ↓
own object → prototype → ... → null
```

Remember:

```text
prototype !== __proto__
```

and:

```text
Object.getPrototypeOf(obj)
```

is preferred over:

```text
obj.__proto__
```

---

# Prototype Cheat Sheet

| Topic | Key Point |
|---|---|
| Prototype | Object used for inherited lookup |
| `[[Prototype]]` | Internal prototype relationship |
| `__proto__` | Legacy accessor |
| `prototype` | Property commonly present on constructor functions |
| `Object.create()` | Creates object with selected prototype |
| `Object.getPrototypeOf()` | Reads prototype |
| `Object.setPrototypeOf()` | Changes prototype |
| Shadowing | Own property hides inherited property |
| `instanceof` | Checks constructor prototype in chain |
| `in` | Checks own + inherited properties |
| `Object.hasOwn()` | Checks own property |
| `Array.prototype` | Shared array methods |
| `Function.prototype` | Shared function behavior |
| `Object.prototype` | Common top-level object prototype |
| Prototype pollution | Security vulnerability involving prototype mutation |
| ES6 classes | Syntax over prototype-based inheritance |

---

# Final Module Checklist

- [x] Prototype fundamentals
- [x] Prototype chain
- [x] `__proto__`
- [x] `prototype`
- [x] Constructor property
- [x] `Object.create()`
- [x] Prototype inheritance
- [x] Shadowing
- [x] Property lookup
- [x] Built-in prototypes
- [x] Array prototype
- [x] Function prototype
- [x] Object prototype
- [x] Custom prototypes
- [x] Prototype pollution
- [x] ES5 inheritance
- [x] ES6 classes
- [x] Performance
- [x] Debugging
- [x] `instanceof`
- [x] `in`
- [x] Own-property checks
- [x] Coding exercises
- [x] Output questions
- [x] MCQs
- [x] Assignments
- [x] Mini project
- [x] Senior questions
- [x] Staff questions
- [x] Principal questions
- [x] Production examples
- [x] Security notes
- [x] Revision notes
- [x] Cheat sheet

---

# Module 7 Complete

**Part 4 → Module 7: Prototypes**

**Questions:** 131–155

**Next:** Module 8 — Classes & OOP (Questions 156–175)
