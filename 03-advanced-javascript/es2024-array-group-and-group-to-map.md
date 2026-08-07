# T322 · ES2024 Object & Map Grouping: `Object.groupBy()` and `Map.groupBy()`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** Advanced JavaScript  
**Concepts:** es2024, group-by, array-grouping, map-grouping  

## Question

How do ES2024 `Object.groupBy()` and `Map.groupBy()` simplify array element grouping by key functions without external libraries like Lodash?

## Expected Answer

- **`Object.groupBy(iterable, callback)`**: Groups elements into a plain object keyed by string/symbol property names.
- **`Map.groupBy(iterable, callback)`**: Groups elements into a JavaScript `Map` object, allowing complex object references as grouping keys.

```javascript
const inventory = [
  { name: 'Apple', type: 'fruit', quantity: 5 },
  { name: 'Carrot', type: 'vegetable', quantity: 10 },
  { name: 'Banana', type: 'fruit', quantity: 2 }
];

// Plain Object grouping by string key
const groupedByType = Object.groupBy(inventory, (item) => item.type);
console.log(groupedByType.fruit); // [ { name: 'Apple'... }, { name: 'Banana'... } ]

// Map grouping by boolean condition
const stockThreshold = { low: true };
const groupedByStock = Map.groupBy(inventory, (item) => item.quantity < 6 ? stockThreshold : null);
```
