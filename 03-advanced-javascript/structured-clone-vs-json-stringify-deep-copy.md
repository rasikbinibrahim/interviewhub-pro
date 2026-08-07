# T323 · Deep Cloning Mechanics: `structuredClone()` vs `JSON.parse(JSON.stringify())`

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** Advanced JavaScript  
**Concepts:** structured-clone, deep-copy, json-stringify, memory  

## Question

What are the supported and unsupported data types when comparing native `structuredClone()` against `JSON.parse(JSON.stringify())`?

## Expected Answer

| Feature / Type | `JSON.parse(JSON.stringify())` | `structuredClone()` |
|---|---|---|
| **Circular References** | ❌ Throws TypeError | ✅ Supported |
| **Dates** | ❌ Converted to ISO String | ✅ Preserved Date Objects |
| **RegExp** | ❌ Converted to `{}` | ✅ Preserved RegExp |
| **Map & Set** | ❌ Converted to `{}` | ✅ Preserved Maps & Sets |
| **Functions & Symbols** | ❌ Dropped / Ignored | ❌ Throws DataCloneError |
| **DOM Nodes** | ❌ Dropped | ❌ Throws DataCloneError |

```javascript
const circular = { a: 1 };
circular.self = circular;

// structuredClone handles circular references natively!
const copy = structuredClone(circular);
console.log(copy.self === copy); // true
```
