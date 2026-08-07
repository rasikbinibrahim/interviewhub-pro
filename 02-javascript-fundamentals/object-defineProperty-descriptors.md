# T229 · Object Property Descriptors & `Object.defineProperty()`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** object-defineproperty, property-descriptors, getters-setters  

## Question

What are property descriptors (`value`, `writable`, `enumerable`, `configurable`, `get`, `set`), and how does `Object.defineProperty()` configure non-enumerable or read-only object properties?

```javascript
const user = {};

Object.defineProperty(user, 'id', {
  value: 101,
  writable: false,     // Cannot be re-assigned!
  enumerable: false,   // Omitted during Object.keys() / for...in loops!
  configurable: false // Cannot be deleted or reconfigured!
});
```
