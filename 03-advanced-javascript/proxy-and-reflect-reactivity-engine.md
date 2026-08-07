# T328 · Building a Reactive State Engine via `Proxy` & `Reflect` (Vue 3 Reactivity)

**Difficulty:** Hard  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Vue  
**Category:** Advanced JavaScript  
**Concepts:** proxy, reflect, reactivity, vue-3, metaprogramming  

## Question

How do **ES6 `Proxy`** traps (`get`, `set`, `deleteProperty`) and **`Reflect`** APIs enable reactive state observation engines (like Vue 3 Reactivity and MobX) by intercepting object operations?

```javascript
function reactive(target, callback) {
  return new Proxy(target, {
    get(obj, prop, receiver) {
      return Reflect.get(obj, prop, receiver);
    },
    set(obj, prop, value, receiver) {
      const oldValue = obj[prop];
      const result = Reflect.set(obj, prop, value, receiver);
      if (oldValue !== value) {
        callback(prop, value); // Trigger reactive subscriber!
      }
      return result;
    }
  });
}
```
