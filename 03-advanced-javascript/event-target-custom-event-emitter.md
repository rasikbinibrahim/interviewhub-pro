# T331 · Custom EventEmitter Implementation & Native `EventTarget` Subclassing

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Netflix  
**Category:** Advanced JavaScript  
**Concepts:** event-emitter, pub-sub, eventtarget, observer-pattern  

## Question

How do you build a custom **`EventEmitter`** class (`on`, `off`, `emit`, `once`) from scratch, and how do native classes extend `EventTarget` directly?

```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach((fn) => fn(...args));
    }
  }

  off(event, listener) {
    if (!this.events.has(event)) return;
    this.events.set(event, this.events.get(event).filter((fn) => fn !== listener));
  }
}
```
