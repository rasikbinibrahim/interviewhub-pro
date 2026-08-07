# T226 · Destructuring Assignment: Nested Extraction, Renaming & Default Values

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** destructuring, objects, arrays, es6  

## Question

How does **Destructuring Assignment** unpack values from arrays or properties from objects into distinct variables, and how do nested destructuring, alias renaming (`prop: alias`), and default values operate?

## Expected Answer

- **Object Destructuring**: `const { name: userName = 'Guest' } = user;`
- **Array Destructuring**: `const [first, , third = 0] = numbers;`
- **Nested Destructuring**: `const { user: { profile: { id } } } = data;`

```javascript
const response = {
  data: {
    user: { id: 101, username: 'dev_guy' }
  },
  status: 200
};

// Nested destructuring with alias renaming and defaults
const {
  data: {
    user: { id: userId, email = 'no-email@site.com' }
  },
  status
} = response;

console.log(userId, email, status); // 101 "no-email@site.com" 200
```
