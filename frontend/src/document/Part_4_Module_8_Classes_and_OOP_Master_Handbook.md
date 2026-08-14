# PART 4 – ADVANCED JAVASCRIPT MASTER HANDBOOK

# Module 8 — Classes & OOP

**Questions 156–175**

**Audience:** Freshers → Junior → Mid-Level → Senior → Staff → Principal Frontend Engineers

---

# Module Objective

This module covers JavaScript classes and object-oriented programming from fundamentals through senior-level interview depth.

Topics covered:

- ES6 classes
- Constructor functions
- Constructors
- `new`
- `super`
- Inheritance
- Method overriding
- Static methods
- Static fields
- Private fields
- Getters
- Setters
- Encapsulation
- Abstraction
- Polymorphism
- Composition
- Mixins
- Object vs Class
- OOP principles
- Prototype relationship
- Performance
- Common mistakes
- Production patterns
- Coding exercises
- Output questions
- Senior / Staff / Principal interview questions

---

# Question 156 — What Are ES6 Classes?

**Difficulty:** ⭐ Easy  
**Experience Level:** 0–2 Years

A JavaScript class is syntax for defining objects and their behavior using a constructor and methods.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

const user = new User("Rasik");

console.log(user.greet());
```

**Expected Output**

```text
Hello Rasik
```

### Important

Classes do not introduce a completely separate inheritance model. JavaScript remains prototype-based.

```text
class syntax
     ↓
prototype-based object model
```

---

# Question 157 — What Is a Constructor?

**Difficulty:** ⭐ Easy

A constructor initializes a newly created class instance.

```js
class Employee {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

const employee = new Employee(
  "Rasik",
  "Senior Frontend Engineer"
);

console.log(employee.name);
console.log(employee.role);
```

Output:

```text
Rasik
Senior Frontend Engineer
```

The constructor runs automatically when the class is instantiated with `new`.

---

# Question 158 — What Happens When You Use `new` With a Class?

**Difficulty:** ⭐⭐⭐ Hard

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("Rasik");
```

Conceptually, object creation involves:

```text
new User("Rasik")
       ↓
Create new object
       ↓
Connect object to User.prototype
       ↓
Call constructor with new instance as this
       ↓
Initialize properties
       ↓
Return instance
```

Conceptual relationship:

```text
user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

Classes also enforce important semantics, including that class constructors cannot normally be called without `new`.

---

# Question 159 — What Is Inheritance in JavaScript Classes?

**Difficulty:** ⭐⭐ Medium

Inheritance allows a derived class to reuse behavior from a base class.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  bark() {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Bruno");

console.log(dog.speak());
console.log(dog.bark());
```

Output:

```text
Bruno makes a sound
Bruno barks
```

Prototype chain:

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

# Question 160 — What Is `super`?

**Difficulty:** ⭐⭐ Medium

`super` is used inside derived classes to access base-class behavior.

### Calling the parent constructor

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

const dog = new Dog("Bruno", "Labrador");

console.log(dog.name);
console.log(dog.breed);
```

Output:

```text
Bruno
Labrador
```

### Calling a parent method

```js
class Animal {
  speak() {
    return "Animal sound";
  }
}

class Dog extends Animal {
  speak() {
    return `${super.speak()} + Bark`;
  }
}

console.log(new Dog().speak());
```

Output:

```text
Animal sound + Bark
```

### Important interview rule

In a derived constructor, `super()` must be called before accessing `this`.

---

# Question 161 — What Is Method Overriding?

**Difficulty:** ⭐⭐ Medium

A child class can provide its own implementation of an inherited method.

```js
class Payment {
  process() {
    return "Processing generic payment";
  }
}

class CardPayment extends Payment {
  process() {
    return "Processing card payment";
  }
}

const payment = new CardPayment();

console.log(payment.process());
```

Output:

```text
Processing card payment
```

This is one mechanism used to achieve polymorphic behavior.

---

# Question 162 — What Are Static Methods?

**Difficulty:** ⭐⭐ Medium

A static method belongs to the class itself rather than its instances.

```js
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtil.add(10, 20));
```

Output:

```text
30
```

This does not work:

```js
const util = new MathUtil();

util.add(10, 20); // TypeError
```

because `add` is static.

Conceptually:

```text
MathUtil.add()
     ↑
class itself

util.add()
     ↑
instance
```

---

# Question 163 — What Are Static Fields and Static Initialization Blocks?

**Difficulty:** ⭐⭐⭐ Hard

Modern JavaScript supports static fields and static initialization blocks.

```js
class Config {
  static environment = "production";

  static {
    Config.environment =
      process.env.NODE_ENV ?? Config.environment;
  }
}

console.log(Config.environment);
```

For browser code, do not assume `process.env` exists unless your build system provides it.

A safer browser example:

```js
class Config {
  static environment = "production";

  static {
    Config.environment =
      globalThis.APP_ENV ?? Config.environment;
  }
}

console.log(Config.environment);
```

Static initialization runs when the class is evaluated.

---

# Question 164 — What Are Private Fields?

**Difficulty:** ⭐⭐ Medium

JavaScript supports private class fields using `#`.

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();

account.deposit(1000);

console.log(account.getBalance());
```

Output:

```text
1000
```

This is invalid:

```js
account.#balance;
```

The `#balance` field is language-level private.

### Why this matters

Private fields provide stronger encapsulation than a convention such as:

```js
this._balance
```

An underscore does not create true language-level privacy.

---

# Question 165 — What Are Getters and Setters?

**Difficulty:** ⭐⭐ Medium

Getters expose computed/read-only-like access, while setters control assignment.

```js
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value) {
    const [firstName, lastName = ""] =
      value.trim().split(/\s+/);

    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const user = new User("Rasik", "Nizam");

console.log(user.fullName);

user.fullName = "John Doe";

console.log(user.fullName);
```

Output:

```text
Rasik Nizam
John Doe
```

### Interview trap

A getter is accessed like a property:

```js
user.fullName
```

not:

```js
user.fullName()
```

---

# Question 166 — What Is Encapsulation?

**Difficulty:** ⭐⭐ Medium

Encapsulation means keeping internal state and implementation details controlled behind a clear public interface.

Example:

```js
class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  get value() {
    return this.#count;
  }
}

const counter = new Counter();

counter.increment();
counter.increment();

console.log(counter.value);
```

Output:

```text
2
```

Consumers do not directly manipulate the internal field.

```text
Public API
   ↓
increment()
   ↓
Private state
   ↓
#count
```

---

# Question 167 — What Is Abstraction?

**Difficulty:** ⭐⭐ Medium

Abstraction exposes what an object does while hiding how it performs the operation.

Example:

```js
class PaymentService {
  pay(amount) {
    this.#validate(amount);
    this.#charge(amount);
    return "Payment successful";
  }

  #validate(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }
  }

  #charge(amount) {
    // Payment provider integration.
    console.log(`Charging ${amount}`);
  }
}

const service = new PaymentService();

console.log(service.pay(500));
```

Output:

```text
Charging 500
Payment successful
```

The consumer uses:

```js
service.pay(500);
```

without needing to know the internal validation and provider integration.

---

# Question 168 — What Is Polymorphism?

**Difficulty:** ⭐⭐⭐ Hard

Polymorphism means a common interface can produce different behavior depending on the concrete object.

```js
class Notification {
  send() {
    throw new Error("send() must be implemented");
  }
}

class EmailNotification extends Notification {
  send() {
    return "Sending email";
  }
}

class SmsNotification extends Notification {
  send() {
    return "Sending SMS";
  }
}

function notify(notification) {
  return notification.send();
}

console.log(
  notify(new EmailNotification())
);

console.log(
  notify(new SmsNotification())
);
```

Output:

```text
Sending email
Sending SMS
```

The caller depends on the common `send()` contract rather than a specific implementation.

---

# Question 169 — What Is Composition?

**Difficulty:** ⭐⭐ Medium

Composition combines independent behaviors instead of building a deep inheritance hierarchy.

```js
const canLog = {
  log(message) {
    console.log(`[LOG] ${message}`);
  }
};

const canTrack = {
  track(event) {
    console.log(`[TRACK] ${event}`);
  }
};

class UserService {
  constructor() {
    Object.assign(this, canLog, canTrack);
  }
}

const service = new UserService();

service.log("User loaded");
service.track("user_viewed");
```

Output:

```text
[LOG] User loaded
[TRACK] user_viewed
```

### Senior principle

Prefer composition when behaviors are independent and inheritance does not represent a genuine "is-a" relationship.

---

# Question 170 — What Are Mixins?

**Difficulty:** ⭐⭐⭐ Hard

A mixin adds reusable behavior to a class.

```js
const Timestamped = (Base) =>
  class extends Base {
    createdAt = new Date();
  };

const Identifiable = (Base) =>
  class extends Base {
    id = crypto.randomUUID();
  };

class Entity {}

class User extends Timestamped(
  Identifiable(Entity)
) {}

const user = new User();

console.log(typeof user.id);
console.log(user.createdAt instanceof Date);
```

Typical output:

```text
string
true
```

Mixins can be powerful, but excessive mixin composition can make class relationships difficult to understand.

---

# Question 171 — What Is the Difference Between Objects and Classes?

**Difficulty:** ⭐⭐ Medium

| Object | Class |
|---|---|
| Concrete value | Blueprint-like syntax |
| Can directly hold data | Defines construction and behavior |
| Can use `Object.create()` | Commonly instantiated with `new` |
| No required constructor | Can define `constructor()` |
| Prototype-based | Still prototype-based |
| Excellent for composition | Useful for structured domain models |

Example object:

```js
const user = {
  name: "Rasik",

  greet() {
    return `Hello ${this.name}`;
  }
};
```

Class:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}
```

Neither is universally better.

Choose based on the domain and complexity.

---

# Question 172 — What Are the Four Common OOP Principles?

**Difficulty:** ⭐⭐ Medium

The commonly taught principles are:

```text
Encapsulation
Abstraction
Inheritance
Polymorphism
```

### Encapsulation

Control internal state.

### Abstraction

Expose a simple interface.

### Inheritance

Reuse behavior through an "is-a" relationship.

### Polymorphism

Use a common interface with different implementations.

Modern JavaScript also heavily benefits from composition and functional techniques.

---

# Question 173 — How Does JavaScript Class Inheritance Relate to Prototypes?

**Difficulty:** ⭐⭐⭐ Hard

Classes are built on JavaScript's prototype model.

Example:

```js
class Animal {
  speak() {
    return "sound";
  }
}

class Dog extends Animal {}

const dog = new Dog();

console.log(
  Object.getPrototypeOf(dog) === Dog.prototype
);

console.log(
  Object.getPrototypeOf(Dog.prototype) ===
  Animal.prototype
);
```

Output:

```text
true
true
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

This connects Module 7 directly to Module 8.

---

# Question 174 — What Are Common OOP Mistakes in JavaScript?

**Difficulty:** ⭐⭐⭐ Hard

Common mistakes:

1. Creating unnecessary deep inheritance.
2. Using classes when a simple object is enough.
3. Mutating shared prototype state unexpectedly.
4. Exposing internal state without validation.
5. Using inheritance when composition is more appropriate.
6. Creating methods per instance unnecessarily in large collections.
7. Overusing getters/setters.
8. Ignoring error handling.
9. Assuming JavaScript classes behave exactly like Java/C++ classes.
10. Using `instanceof` as universal runtime validation.
11. Overusing mixins.
12. Creating large "god classes."

### Better approach

```text
Simple requirement
      ↓
Object/function
      ↓
Composition
      ↓
Class
      ↓
Inheritance
```

Choose the simplest design that satisfies the requirement.

---

# Question 175 — What Are JavaScript OOP Best Practices?

**Difficulty:** ⭐⭐⭐ Hard  
**Experience Level:** 5–8 Years+

### Production guidelines

- Prefer composition when inheritance is not necessary.
- Keep classes small and focused.
- Follow single-responsibility principles.
- Keep public APIs minimal.
- Use private fields for genuinely private state.
- Validate constructor inputs.
- Avoid mutable global state.
- Avoid unnecessary prototype mutation.
- Prefer dependency injection for external services.
- Keep domain logic testable.
- Use clear naming.
- Document non-obvious invariants.
- Avoid deep inheritance trees.
- Profile before optimizing object creation.
- Treat class syntax as a tool, not a requirement.

---

# Class Execution Diagram

```text
new User("Rasik")
        ↓
Create instance
        ↓
Link instance to User.prototype
        ↓
Call User constructor
        ↓
Initialize instance fields
        ↓
Return object
```

---

# Class / Prototype Diagram

```text
                 Object.prototype
                       ↑
                 Animal.prototype
                       ↑
                    Dog.prototype
                       ↑
                       dog

class Animal {}          class Dog extends Animal {}
```

---

# Static vs Instance Diagram

```text
User
 │
 ├── static create()
 │       ↑
 │    User.create()
 │
 └── prototype
       │
       └── greet()
              ↑
           user.greet()
```

---

# Private Field Diagram

```text
User instance
 ├── public name
 └── private #password
             │
             └── accessible only
                 inside class
```

---

# Bad Example — Exposing Internal State

```js
class BankAccount {
  constructor() {
    this.balance = 0;
  }
}

const account = new BankAccount();

account.balance = -100000;
```

The object has no protection against invalid state.

### Better

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error("Invalid deposit");
    }

    this.#balance += amount;
  }

  get balance() {
    return this.#balance;
  }
}
```

---

# Bad Example — Deep Inheritance

```text
BaseEntity
   ↓
UserEntity
   ↓
EmployeeEntity
   ↓
ManagerEntity
   ↓
RegionalManagerEntity
   ↓
GlobalManagerEntity
```

This can become difficult to maintain.

### Better

Use smaller composable capabilities:

```text
User
 ├── identity
 ├── permissions
 ├── audit
 ├── notification
 └── reporting
```

---

# Production Example — Service With Dependency Injection

```js
class UserService {
  constructor(userRepository, logger) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  async getUser(id) {
    if (!id) {
      throw new Error("User ID is required");
    }

    const user =
      await this.userRepository.findById(id);

    this.logger.info("User fetched", { id });

    return user;
  }
}

// Production dependencies can be supplied here.
const service = new UserService(
  userRepository,
  logger
);
```

Benefits:

- testability
- replaceable dependencies
- separation of concerns
- easier mocking
- clearer architecture

---

# Coding Exercise 1 — Bank Account

Create:

```js
class BankAccount
```

Requirements:

- private balance
- `deposit()`
- `withdraw()`
- `balance` getter
- validation
- insufficient-balance error

Also implement the same problem without classes using closures.

---

# Coding Exercise 2 — Employee Hierarchy

Create:

```text
Employee
  ↓
Developer
  ↓
FrontendDeveloper
```

Implement:

- constructor
- inherited methods
- method overriding
- `super`
- private field

Then explain why composition might be better in a real application.

---

# Coding Exercise 3 — Shape Polymorphism

Implement:

```js
Shape
Rectangle
Circle
```

Each must expose:

```js
area()
```

Create:

```js
totalArea(shapes)
```

which works without checking concrete types.

---

# Coding Exercise 4 — Static Factory

Create:

```js
User.createFromJSON(json)
```

as a static factory method.

Requirements:

- validate input
- normalize fields
- return a `User`
- throw a meaningful error for invalid data

---

# Coding Exercise 5 — Getter / Setter Validation

Create a `Product` class with:

```js
price
```

Rules:

- must be finite
- must be >= 0
- getter returns price
- setter validates price

---

# Coding Exercise 6 — Private State

Implement:

```js
class Counter
```

with:

- `#count`
- `increment()`
- `decrement()`
- `reset()`
- `value` getter

---

# Coding Exercise 7 — Composition

Create independent behaviors:

```text
Logger
Cache
Metrics
Retry
```

Compose them into a service without inheritance.

---

# Coding Exercise 8 — Mixin

Implement:

```js
Timestamped
Serializable
Identifiable
```

and combine them with a base class.

---

# Coding Exercise 9 — OOP Without Classes

Implement a user service using:

- closures
- factory functions
- composition

Compare it with a class-based implementation.

---

# Coding Exercise 10 — Dependency Injection

Build:

```js
OrderService
```

with injected:

```text
OrderRepository
PaymentService
Logger
```

Write tests using fake implementations.

---

# Output-Based Questions

## Output 1

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("Rasik");

console.log(user.name);
```

Output:

```text
Rasik
```

---

## Output 2

```js
class Parent {
  greet() {
    return "parent";
  }
}

class Child extends Parent {
  greet() {
    return `${super.greet()} child`;
  }
}

console.log(new Child().greet());
```

Output:

```text
parent child
```

---

## Output 3

```js
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtil.add(2, 3));
```

Output:

```text
5
```

---

## Output 4

```js
class User {
  #role = "admin";

  getRole() {
    return this.#role;
  }
}

const user = new User();

console.log(user.getRole());
```

Output:

```text
admin
```

---

## Output 5

```js
class Animal {
  speak() {
    return "sound";
  }
}

class Dog extends Animal {}

const dog = new Dog();

console.log(
  Object.getPrototypeOf(dog) === Dog.prototype
);

console.log(
  Object.getPrototypeOf(Dog.prototype) ===
  Animal.prototype
);
```

Output:

```text
true
true
```

---

## Output 6

```js
class Counter {
  count = 0;

  increment() {
    this.count++;
  }
}

const a = new Counter();
const b = new Counter();

a.increment();

console.log(a.count);
console.log(b.count);
```

Output:

```text
1
0
```

Each instance has its own instance field.

---

## Output 7

```js
class Parent {
  static value = 10;
}

class Child extends Parent {}

console.log(Child.value);
```

Output:

```text
10
```

Static inheritance is separate from ordinary instance method lookup.

---

## Output 8

```js
class User {
  get name() {
    return "Rasik";
  }
}

const user = new User();

console.log(user.name);
```

Output:

```text
Rasik
```

The getter is accessed as a property.

---

## Output 9

```js
class User {
  constructor() {
    this.name = "Rasik";
  }

  greet = () => {
    return this.name;
  };
}

const user = new User();

const greet = user.greet;

console.log(greet());
```

Output:

```text
Rasik
```

The arrow function field captures the instance's `this`.

### Interview follow-up

Compare this with a prototype method:

```js
class User {
  constructor() {
    this.name = "Rasik";
  }

  greet() {
    return this.name;
  }
}
```

Prototype methods are shared; instance arrow-function fields create an own function per instance.

---

## Output 10

```js
class Parent {
  constructor() {
    this.value = 10;
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.value += 5;
  }
}

console.log(new Child().value);
```

Output:

```text
15
```

---

# MCQs

## MCQ 1

Where are normal class methods stored?

A. Every instance  
B. Class prototype  
C. Global object  
D. Heap only

**Answer: B**

---

## MCQ 2

What does `static` mean?

A. Method belongs to instances  
B. Method belongs to the class itself  
C. Method becomes private  
D. Method becomes asynchronous

**Answer: B**

---

## MCQ 3

Which syntax creates a private class field?

A. `_field`  
B. `private field`  
C. `#field`  
D. `private.#field`

**Answer: C**

---

## MCQ 4

What must a derived constructor normally do before using `this`?

A. Call `new`  
B. Call `super()`  
C. Call `bind()`  
D. Call `Object.create()`

**Answer: B**

---

## MCQ 5

What is generally preferred when behavior does not represent a genuine "is-a" relationship?

A. Deep inheritance  
B. Global state  
C. Composition  
D. Prototype mutation

**Answer: C**

---

# Scenario-Based Interview Question

## Scenario

Your frontend application has:

```text
User
Admin
Manager
RegionalManager
SuperAdmin
```

Each class extends another class.

After several years, changes to permissions require modifications across multiple classes.

### Question

Would you continue the inheritance hierarchy?

### Strong answer

Not automatically.

I would first identify whether the hierarchy represents stable domain relationships. If the classes mainly combine independent capabilities such as:

```text
authentication
authorization
audit
notifications
reporting
```

I would consider composition.

For example:

```text
User
 ├── PermissionService
 ├── AuditService
 ├── NotificationService
 └── ReportingService
```

This reduces coupling and makes capabilities easier to test and evolve independently.

---

# Senior Follow-Up Questions

1. Are JavaScript classes truly class-based internally?
2. Explain classes using prototypes.
3. What happens during `new`?
4. What is the difference between static and instance methods?
5. How do private fields differ from underscore conventions?
6. What happens if `super()` is omitted?
7. How does method overriding work?
8. How does `super.method()` resolve?
9. When should inheritance be avoided?
10. Composition vs inheritance?
11. What are mixins?
12. What are the risks of mixins?
13. How do class fields affect memory?
14. Prototype method vs arrow-function class field?
15. How would you test a class with injected dependencies?

---

# Staff Engineer Questions

1. Design a class architecture for a large payment domain.
2. Where would you use composition instead of inheritance?
3. How would you enforce dependency inversion in JavaScript?
4. How would you prevent a domain model from becoming a god object?
5. How would you migrate a legacy prototype hierarchy?
6. How would you design reusable domain services across a monorepo?
7. How would you measure the memory impact of class fields?
8. How would you design class APIs for backward compatibility?
9. How would you handle serialization of class instances?
10. How would you design testable classes around browser APIs?

---

# Principal Engineer Questions

1. Define enterprise standards for class usage across hundreds of frontend packages.
2. When should teams prohibit inheritance?
3. How would you review a proposed five-level inheritance hierarchy?
4. How would you standardize composition patterns across teams?
5. How would you design a dependency injection strategy for frontend applications?
6. How would you prevent domain classes from coupling to infrastructure?
7. How would you migrate class-heavy code toward functional composition safely?
8. How would you establish architectural governance around reusable domain models?

---

# 30-Second Interview Answer

> JavaScript classes provide a cleaner syntax for constructing objects and expressing inheritance, but underneath they use the language's prototype-based object model. Instance methods are normally stored on the class prototype, while static methods belong to the class itself. JavaScript also supports private fields, getters, setters, inheritance, and method overriding. In production, I prefer small, focused classes and composition when independent behaviors need to be combined rather than creating deep inheritance hierarchies.

---

# 2-Minute Interview Answer

> A JavaScript class defines a constructor and behavior for objects. When we use `new`, JavaScript creates an object, links it to the class's prototype, invokes the constructor, and returns the instance. `extends` establishes prototype inheritance, and `super()` allows a derived class to invoke base-class behavior. Instance methods are generally shared through the prototype, while static methods belong to the class. Private fields using `#` provide language-level encapsulation. Although classes look similar to class-based languages, JavaScript remains prototype-based. For enterprise applications, I keep classes focused, inject dependencies, favor composition when possible, and avoid unnecessarily deep inheritance.

---

# 5-Minute Deep Explanation

```text
class User
    │
    ├── constructor()
    │
    ├── prototype
    │      └── greet()
    │
    └── static methods
           └── create()
```

When instantiated:

```text
new User()
    ↓
Create instance
    ↓
[[Prototype]] = User.prototype
    ↓
Run constructor
    ↓
Initialize fields
    ↓
Return instance
```

Inheritance:

```text
user
 ↓
User.prototype
 ↓
Person.prototype
 ↓
Object.prototype
 ↓
null
```

Encapsulation:

```text
Public API
    ↓
Methods / getters
    ↓
Private state
    ↓
#field
```

Composition:

```text
Service
 ├── Logger
 ├── Cache
 ├── Metrics
 └── Repository
```

The key architecture decision is not "classes or no classes." It is choosing an abstraction that keeps coupling manageable, behavior testable, and ownership clear.

---

# Assignment 1 — OOP Design Review

Take a large class hierarchy and identify:

- responsibilities
- inheritance relationships
- coupling
- shared behavior
- possible composition boundaries
- testability issues

Produce a before/after architecture diagram.

---

# Assignment 2 — Class vs Composition

Implement the same domain twice:

1. inheritance-based
2. composition-based

Compare:

- maintainability
- testability
- extensibility
- coupling
- runtime behavior

---

# Assignment 3 — Production Service

Build:

```text
UserService
 ├── Repository
 ├── Logger
 ├── Cache
 └── Metrics
```

All dependencies must be injectable.

---

# Mini Project — OOP Order Management System

Build:

```text
Order
 ├── OrderItem
 ├── PricingService
 ├── DiscountStrategy
 ├── PaymentService
 └── NotificationService
```

Features:

- create order
- add item
- remove item
- calculate total
- apply discount
- process payment
- send notification
- validation
- error handling
- tests

### Senior extension

Use dependency injection and composition instead of a deep inheritance hierarchy.

---

# Revision Notes

```text
class
 ↓
constructor + methods

new
 ↓
instance creation

extends
 ↓
prototype inheritance

super
 ↓
base-class behavior

static
 ↓
class-level behavior

#
 ↓
private fields

get/set
 ↓
controlled property access

composition
 ↓
combine behaviors

polymorphism
 ↓
common interface + different behavior
```

---

# Cheat Sheet

| Concept | Key Point |
|---|---|
| `class` | Syntax for defining constructors and methods |
| `constructor()` | Initializes instances |
| `new` | Creates and initializes an instance |
| `extends` | Establishes inheritance |
| `super()` | Calls base constructor |
| `super.method()` | Calls inherited method |
| `static` | Class-level member |
| `#field` | Private field |
| Getter | Property-like computed access |
| Setter | Controlled assignment |
| Encapsulation | Protect internal state |
| Abstraction | Hide implementation details |
| Polymorphism | Common interface, different implementations |
| Composition | Combine independent behaviors |
| Mixin | Reusable behavior composition |
| Prototype | Shared inheritance mechanism |
| Class method | Normally stored on prototype |
| Instance field | Own property of instance |

---

# Final Module Checklist

- [x] ES6 classes
- [x] Constructors
- [x] `new`
- [x] Inheritance
- [x] `super`
- [x] Method overriding
- [x] Static methods
- [x] Static fields
- [x] Static initialization blocks
- [x] Private fields
- [x] Getters
- [x] Setters
- [x] Encapsulation
- [x] Abstraction
- [x] Polymorphism
- [x] Composition
- [x] Mixins
- [x] Object vs class
- [x] OOP principles
- [x] Prototype relationship
- [x] Performance
- [x] Production best practices
- [x] Coding exercises
- [x] Output questions
- [x] MCQs
- [x] Assignments
- [x] Mini project
- [x] Senior questions
- [x] Staff questions
- [x] Principal questions
- [x] Revision notes
- [x] Cheat sheet

---

# Module 8 Complete

**Part 4 → Module 8: Classes & OOP**

**Questions:** 156–175

**Next:** Module 9 — Functions (Questions 176–200)
