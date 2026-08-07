# T201 · Function Declaration vs Function Expression vs Arrow Functions

**Difficulty:** Easy  
**Companies Asked:** Google, Amazon, Meta, Microsoft, Adobe  
**Interview Frequency:** ★★★★★  
**Category:** JavaScript  
**Concepts:** functions, hoisting, execution-context, arrow-functions, this-binding  

## Question

What are the fundamental differences between Function Declarations, Function Expressions, and Arrow Functions in JavaScript regarding hoisting, `this` binding, `arguments` object, and constructability (`new` operator)?

## Expected Answer

1. **Hoisting**:
   - **Function Declaration**: Fully hoisted with definition before execution starts; can be invoked before it appears in code text.
   - **Function Expression**: Variable declaration is hoisted (as `undefined` for `var` or TDZ for `let`/`const`), but function assignment occurs at runtime.
   - **Arrow Function**: Same variable hoisting rules as Function Expressions.
2. **`this` Binding**:
   - **Function Declaration / Expression**: Has its own dynamic `this` bound at call-time depending on how it is called (`obj.fn()`, `fn.call()`, etc.).
   - **Arrow Function**: Has **lexical `this`** inherited directly from its enclosing scope at definition time. Cannot be rebound via `call()`, `apply()`, or `bind()`.
3. **Constructability**:
   - Function Declarations and Expressions have prototype properties and can be instantiated with `new`.
   - Arrow Functions lack prototype properties and throw a `TypeError` if called with `new`.

## Deep Explanation

### Comparison Matrix

| Property | Function Declaration | Function Expression | Arrow Function |
|---|---|---|---|
| **Syntax** | `function foo() {}` | `const foo = function() {}` | `const foo = () => {}` |
| **Hoisting** | Fully Hoisted | Variable Hoisted (TDZ/undefined) | Variable Hoisted (TDZ/undefined) |
| **`this` Binding** | Dynamic (Call-time) | Dynamic (Call-time) | Lexical (Definition-time) |
| **`arguments` Object** | Available | Available | Unavailable (Use Rest `...args`) |
| **Constructable (`new`)** | Yes | Yes | No (`TypeError`) |
| **Generator (`yield`)** | Yes (`function*`) | Yes (`function*`) | No |

## Production Example

```javascript
const obj = {
  name: 'Dashboard Component',
  items: ['Item 1', 'Item 2'],

  // Regular Method: dynamic this
  renderRegular() {
    console.log('Regular Method this:', this.name);

    // Bug in legacy JS: setTimeout callback loses `this`
    setTimeout(function () {
      console.log('Inner regular this:', this.name); // undefined
    }, 100);

    // Fix with Arrow Function: lexically captures `this`
    setTimeout(() => {
      console.log('Inner arrow this:', this.name); // 'Dashboard Component'
    }, 100);
  },

  // Antipattern: Arrow Function as object method
  renderArrow: () => {
    console.log('Object method arrow this:', this.name); // undefined (captures global/module scope!)
  },
};

obj.renderRegular();
obj.renderArrow();
```

## Best Practices

- Use Function Declarations for top-level utility functions or helper modules for clean hoisting.
- Use Arrow Functions for callbacks (e.g. `map`, `filter`, `setTimeout`, event handlers) to maintain outer lexical `this`.
- Never use Arrow Functions for object method definitions or class prototype methods where dynamic `this` binding is expected.

## Common Mistakes

- Attempting to invoke a Function Expression before its line of assignment, resulting in `TypeError: foo is not a function`.
- Expecting `arguments` object to exist inside an Arrow Function instead of using rest parameters `(...args) => {}`.

## Follow-up Questions

1. How does the V8 engine optimize inline function calls for monomorphic vs polymorphic functions?
2. What happens when an Arrow Function is used as a React event handler inside a JSX render loop?

## Related Topics

- Scope, Scope Chain & Lexical Environment
- `this` Keyword, call(), apply(), and bind()
