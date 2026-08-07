# T1017 · React 18 Concurrent Features: `useTransition()` vs `useDeferredValue()`

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Category:** React  
**Concepts:** react-18, usetransition, usedeferredvalue, concurrent-mode, INP  

## Question

How do **`useTransition()`** and **`useDeferredValue()`** mark non-urgent state updates as interruptible transitions to prevent UI freeze and maintain 60 FPS typing responsiveness?

## Expected Answer

- **`useTransition()`**: Wraps state setter updates inside `startTransition(() => setQuery(text))` to render background updates non-blocking. Provides `isPending` state indicator.
- **`useDeferredValue(val)`**: Defers updating a derived value until urgent rendering completes. Ideal for third-party props.

```jsx
const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);

const handleChange = (e) => {
  setQuery(e.target.value); // Urgent input update!
};

return <HeavyList query={deferredQuery} />;
```
