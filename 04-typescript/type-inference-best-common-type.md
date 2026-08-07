# T423 · TypeScript Type Inference & Contextual Typing

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Microsoft  
**Category:** TypeScript  
**Concepts:** typescript, type-inference, contextual-typing  

## Question

How does TypeScript infer **Best Common Types** from arrays (`[1, 'hello']` -> `(number | string)[]`) and perform **Contextual Typing** in function callback parameters?

```javascript
// Contextual typing infers event parameter as MouseEvent automatically!
window.onmousedown = function (e) {
  console.log(e.button); // Auto-completed!
};
```
