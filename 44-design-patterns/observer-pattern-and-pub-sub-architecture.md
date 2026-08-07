# T4403 · Observer Pattern vs Publisher-Subscriber (Pub/Sub) Event Architecture

**Difficulty:** Medium  
**Companies Asked:** Amazon, Google, Meta, Microsoft, Adobe, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** Design Patterns  
**Concepts:** design-patterns, observer-pattern, pub-sub, event-emitter, decoupling  

## Question

What are the architectural differences between the **Observer Pattern** and the **Publisher-Subscriber (Pub/Sub) Pattern**, how do you implement a production-grade `EventEmitter` bus in TypeScript, and how do you prevent memory leaks when registering event listeners in single-page applications?

## Expected Answer

1. **Observer Pattern vs Pub/Sub Pattern**:
   - **Observer Pattern**: The Subject maintains a direct internal collection of Observers (`subject.observers.add(observer)`). Subject and Observers are **aware of each other** and communicate synchronously.
   - **Pub/Sub Pattern**: Publishers and Subscribers are **completely decoupled** via a central Event Bus or Message Broker (e.g. `EventEmitter`, Redis Pub/Sub, Kafka). Publishers send events to topics without knowing who (if anyone) is subscribing.
2. **Memory Leak Prevention**:
   - When registering event listeners inside React components (`useEffect`), you MUST return a cleanup function (`emitter.off(event, handler)`) to unbind listeners when components unmount.

## Deep Explanation

### Observer vs Pub/Sub Architecture

```
Observer Pattern (Direct Coupling):
Subject ─────────────► Observer A
        ─────────────► Observer B

Pub/Sub Pattern (Decoupled Channel):
Publisher A ──┐                      ┌──► Subscriber 1
              ├─► [ Event Bus ] ────┤
Publisher B ──┘   (Channel/Topic)    └──► Subscriber 2
```

## Production Example

```typescript
// Production Type-Safe EventEmitter Class
type EventCallback<T = any> = (data: T) => void;

export class EventEmitter<Events extends Record<string, any>> {
  private events: { [K in keyof Events]?: Array<EventCallback<Events[K]>> } = {};

  on<K extends keyof Events & string>(event: K, callback: EventCallback<Events[K]>): () => void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]!.push(callback);

    // Return unsubscribe cleanup function!
    return () => this.off(event, callback);
  }

  off<K extends keyof Events & string>(event: K, callback: EventCallback<Events[K]>): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event]!.filter((fn) => fn !== callback);
  }

  emit<K extends keyof Events & string>(event: K, data: Events[K]): void {
    if (!this.events[event]) return;
    this.events[event]!.forEach((fn) => fn(data));
  }

  once<K extends keyof Events & string>(event: K, callback: EventCallback<Events[K]>): void {
    const unbind = this.on(event, (data) => {
      unbind();
      callback(data);
    });
  }
}
```

```typescript
// React Component Integration Example
interface AppEvents {
  'user:login': { username: string; timestamp: number };
  'theme:change': { theme: 'light' | 'dark' };
}

export const globalBus = new EventEmitter<AppEvents>();

// Inside React Component:
function UserProfileWidget() {
  useEffect(() => {
    // Subscribe and automatically unsubscribe on unmount!
    const unsubscribe = globalBus.on('user:login', (data) => {
      console.log(`User logged in: ${data.username}`);
    });

    return () => unsubscribe(); // Prevents memory leaks!
  }, []);
}
```

## Best Practices

- Always return an `unsubscribe()` function from `on()` handlers to simplify event cleanup.
- Pass explicit generic event maps (`EventEmitter<AppEvents>`) in TypeScript to ensure autocomplete and type safety on payload parameters.

## Common Mistakes

- Binding anonymous arrow functions directly `emitter.on('event', () => {})` without holding a function reference or returning an unsubscribe token, making it impossible to remove the listener later.

## Follow-up Questions

1. How does Node.js `events.EventEmitter` handle max listener warnings (`setMaxListeners(n)`) to catch memory leaks?

## Related Topics

- High-Level System Design: Real-Time Notification System
- State Management: Context API vs Zustand vs Redux
