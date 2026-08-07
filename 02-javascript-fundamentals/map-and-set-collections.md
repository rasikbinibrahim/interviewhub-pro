# T233 · Keyed Collections: `Map` and `Set` Data Structures

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** JavaScript  
**Concepts:** map, set, collections, es6  

## Question

How do **`Map`** (keyed collection supporting object keys) and **`Set`** (collection of unique values) outperform plain objects and arrays in insertion speed ($O(1)$) and iteration insertion order?

```javascript
const map = new Map();
const objKey = { id: 1 };
map.set(objKey, 'Metadata');
console.log(map.get(objKey)); // 'Metadata'

const set = new Set([1, 2, 2, 3]);
console.log([...set]); // [1, 2, 3] (Duplicates deduplicated!)
```
