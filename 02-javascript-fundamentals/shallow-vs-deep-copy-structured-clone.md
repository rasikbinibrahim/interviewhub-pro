# T218 · Object Cloning: Shallow Copy vs Deep Copy & `structuredClone()`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** JavaScript  
**Concepts:** shallow-copy, deep-copy, structuredClone, json-stringify  

## Question

What are the differences between **Shallow Copy** (`Object.assign()`, `{...obj}`) and **Deep Copy**, why does `JSON.parse(JSON.stringify(obj))` fail on functions, Symbols, and circular references, and how does native `structuredClone()` solve deep cloning safely?

## Expected Answer

- **Shallow Copy**: Copies top-level properties. Nested objects share memory references.
- **`JSON.parse(JSON.stringify())` limitations**: Drops `undefined`, functions, Symbols, converts `Date` to strings, and throws error on circular references.
- **`structuredClone(obj)`**: Browser-native API supporting deep copies of nested objects, Arrays, Dates, Maps, Sets, TypedArrays, and circular references without external libraries.

```javascript
const original = {
  name: 'App',
  details: { version: 1 },
  date: new Date(),
};

const shallow = { ...original };
shallow.details.version = 2; // Mutates original.details.version!

const deep = structuredClone(original);
deep.details.version = 3; // Original remains untouched!
```
