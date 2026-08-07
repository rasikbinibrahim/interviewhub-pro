# T224 · ES6 Template Literals & Tagged Template Functions

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** JavaScript  
**Concepts:** template-literals, tagged-templates, string-formatting, es6  

## Question

What are **Tagged Template Literals**, how do tag functions parse raw strings and interpolated expression arguments (`tagFn(strings, ...values)`), and how are they used in libraries like `styled-components` and SQL sanitization?

## Expected Answer

- **Tagged Templates**: Allow parsing template literals with a custom tag function.
- **Function Signature**: `function tag(strings, ...expressions)` where `strings` is an array of literal string segments, and `expressions` are evaluated interpolation values.

```javascript
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const val = values[i] ? `<mark>${values[i]}</mark>` : '';
    return acc + str + val;
  }, '');
}

const name = 'Alice';
const role = 'Admin';
console.log(highlight`User ${name} has role ${role}`);
// Output: User <mark>Alice</mark> has role <mark>Admin</mark>
```
