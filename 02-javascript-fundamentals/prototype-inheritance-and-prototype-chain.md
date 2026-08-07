# T204 · Prototype Inheritance, `__proto__`, `prototype` & Class Transpilation

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Adobe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** prototypes, inheritance, prototype-chain, ES6-classes, Object.create  

## Question

How does Prototype Inheritance work in JavaScript, what is the exact relationship between an instance's `__proto__` and a constructor's `prototype` property, how does the prototype lookup chain resolve property access, and how do ES6 `class` definitions compile down to ES5 prototypal delegation?

## Expected Answer

1. **Prototypes**: Objects in JavaScript have an internal link to another object called its prototype (`[[Prototype]]`, exposed via `Object.getPrototypeOf(obj)` or `obj.__proto__`).
2. **Prototype Lookup Chain**: When accessing `obj.prop`, JS first checks if `prop` exists directly on `obj`. If not, it traverses up `obj.__proto__`, then `obj.__proto__.__proto__`, until it finds `prop` or reaches `Object.prototype.__proto__ === null`.
3. **Instance vs Constructor**:
   - `ConstructorFunction.prototype`: The object that will become the `__proto__` of all instances created via `new ConstructorFunction()`.
   - `instance.__proto__ === ConstructorFunction.prototype`.
4. **ES6 Class Syntax**: Syntactic sugar over prototypal inheritance. Methods inside `class User { getName() {} }` are attached to `User.prototype`, while `static` methods are attached to `User` directly.

## Deep Explanation

### Prototype Inheritance Lookup Flow

```
+--------------------------+       __proto__       +----------------------------+
| instance (const user)    | --------------------> | User.prototype             |
| - name: "Alice"          |                       | - getName: function()      |
+--------------------------+                       +--------------+-------------+
                                                                  | __proto__
                                                                  v
+--------------------------+                       +----------------------------+
| null                     | <-------------------- | Object.prototype           |
+--------------------------+       __proto__       | - toString: function()     |
                                                   +----------------------------+
```

## Production Example

```javascript
// Prototypal Class Definition in ES5
function User(name, role) {
  this.name = name;
  this.role = role;
}

// Attach shared methods to User.prototype to save memory across instances
User.prototype.getDisplayName = function () {
  return `${this.name} (${this.role})`;
};

// Subclass Inheritance (SubUser extends User)
function AdminUser(name, permissions) {
  User.call(this, name, 'admin'); // Call super constructor
  this.permissions = permissions;
}

// Inherit prototype chain
AdminUser.prototype = Object.create(User.prototype);
AdminUser.prototype.constructor = AdminUser; // Restore constructor reference

AdminUser.prototype.hasPermission = function (perm) {
  return this.permissions.includes(perm);
};

const admin = new AdminUser('Bob', ['READ', 'WRITE']);
console.log(admin.getDisplayName()); // "Bob (admin)" -> Resolved via prototype chain!
console.log(admin instanceof AdminUser); // true
console.log(admin instanceof User); // true
```

## Best Practices

- Use ES6 `class` syntax for modern TypeScript/JavaScript codebases; use `Object.create(null)` when creating clean dictionary objects free of default `Object.prototype` keys.
- Never pollute global prototypes (`Object.prototype.myCustomMethod = ...`), which breaks third-party library assumptions and `for...in` loops.

## Common Mistakes

- Setting `instance.__proto__ = newParent` directly in hot execution paths, causing V8 to invalidate hidden classes (shapes) and downgrade code performance to slow-path dictionary lookup mode.

## Follow-up Questions

1. How do V8 Hidden Classes (Shapes) and Inline Caches (IC) optimize property lookups on JavaScript objects?
2. What is the difference between `Object.create(proto)` and `Object.assign({}, proto)`?

## Related Topics

- Scope, Scope Chain & Lexical Environment
- Closures, Lexical Environments & Encapsulation Patterns
