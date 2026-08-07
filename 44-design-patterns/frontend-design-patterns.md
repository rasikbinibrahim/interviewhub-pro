# T4401 · Essential Design Patterns in Frontend (Observer, Factory, Singleton, Strategy)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Microsoft, Uber  
**Interview Frequency:** ★★★★☆  
**Category:** Design Patterns  
**Concepts:** design-patterns, observer, pubsub, factory, strategy, singleton  

## Question

How are classic Gang of Four (GoF) design patterns applied in modern JavaScript and React architectures, what is the exact architectural difference between the Observer pattern and the Publish-Subscribe (PubSub) pattern, and why is the Singleton pattern often considered an anti-pattern in large-scale modular codebases?

## Expected Answer

1. **GoF Patterns in Frontend**:
   - **Observer**: Direct one-to-many dependency where subjects notify registered observers upon state change (e.g. DOM event listeners, RxJS Observables).
   - **Factory**: Interface or function creating objects without specifying exact concrete class types (e.g. `React.createElement`, API client generators).
   - **Strategy**: Defines a family of algorithms, encapsulating each one and making them interchangeable at runtime (e.g. form validation rule engines, payment gateways).
   - **Singleton**: Restricts instantiation to a single global instance (e.g. global telemetry logger, audio context manager).
2. **Observer vs PubSub**:
   - **Observer**: Subject maintains direct reference to its observers in memory (`subject.subscribe(observer)`).
   - **PubSub**: Publisher and subscriber do not know each other; they communicate exclusively through an intermediary Event Broker / Topic Channel (`eventEmitter.emit('topic')`).
3. **Singleton Drawbacks**: Hard to unit test (global mutable state leaks between test runs), creates hidden coupling, and impedes tree-shaking and concurrent server rendering (RSC).

## Deep Explanation

### 1. Strategy Pattern for Dynamic Form Validation

```typescript
// 1. Strategy Interface
export interface ValidationStrategy {
  validate(value: string): { isValid: boolean; error?: string };
}

// 2. Concrete Strategies
export class EmailValidationStrategy implements ValidationStrategy {
  validate(value: string) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return { isValid, error: isValid ? undefined : 'Invalid email format' };
  }
}

export class MinLengthStrategy implements ValidationStrategy {
  constructor(private minLen: number) {}
  validate(value: string) {
    const isValid = value.length >= this.minLen;
    return { isValid, error: isValid ? undefined : `Minimum length is ${this.minLen}` };
  }
}

// 3. Context Executor
export class FormValidator {
  private strategies: ValidationStrategy[] = [];

  addStrategy(strategy: ValidationStrategy) {
    this.strategies.push(strategy);
    return this;
  }

  validate(value: string) {
    for (const strategy of this.strategies) {
      const result = strategy.validate(value);
      if (!result.isValid) return result;
    }
    return { isValid: true };
  }
}
```

### 2. Type-Safe PubSub Implementation

```typescript
type EventCallback<T = any> = (data: T) => void;

export class TypedEventHub<Events extends Record<string, any>> {
  private listeners: { [K in keyof Events]?: Array<EventCallback<Events[K]>> } = {};

  on<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);

    // Return unsubscriber function
    return () => {
      this.listeners[event] = this.listeners[event]!.filter((cb) => cb !== callback);
    };
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    const callbacks = this.listeners[event] || [];
    callbacks.forEach((cb) => cb(payload));
  }
}
```

## Best Practices

- Prefer Dependency Injection (DI) and React Context over Singleton modules to ensure testability and isolation.
- Use Factory functions to normalize API responses across varying backend schema versions.
- Return explicit cleanup/unsubscribe functions from event registration methods to prevent memory leaks.

## Common Mistakes

- Forgetting to unsubscribe Observers / Event listeners in React `useEffect` cleanups, leading to memory leaks and zombie component re-renders.
- Over-engineering simple functions into rigid class-based GoF patterns when standard higher-order functions work cleanly.

## Follow-up Questions

1. How does the Decorator pattern relate to Higher-Order Components (HOCs) and ES Decorators?
2. How is the Command pattern utilized in undo/redo stack engines?

## Related Topics

- Custom EventEmitter Implementation
- State Management & React Context Patterns
