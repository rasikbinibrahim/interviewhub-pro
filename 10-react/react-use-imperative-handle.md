# T1033 · Exposing Imperative Child Handles via `useImperativeHandle()`

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft  
**Category:** React  
**Concepts:** react, useimperativehandle, forwardref, imperative-api  

## Question

How does **`useImperativeHandle(ref, createHandle)`** customize the instance value exposed to parent components via `ref` (e.g. exposing `.focus()` or `.scrollToBottom()` instead of the raw DOM node)?

```jsx
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current.focus(),
    clearInput: () => { inputRef.current.value = ''; }
  }));

  return <input ref={inputRef} />;
});
```
