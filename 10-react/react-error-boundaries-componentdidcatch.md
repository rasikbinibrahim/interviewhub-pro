# T1010 · React Error Boundaries: `componentDidCatch`, `getDerivedStateFromError` & Fallback UIs

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Interview Frequency:** ★★★★★  
**Category:** React  
**Concepts:** react, error-boundaries, componentdidcatch, getderivedstatefromerror, fallback-ui  

## Question

How do React Error Boundaries catch JavaScript errors in child component trees to prevent full application unmounting, why are Class Components required for Error Boundaries (`getDerivedStateFromError`, `componentDidCatch`), and what types of runtime errors do Error Boundaries **NOT** catch?

## Expected Answer

1. **Error Boundaries Purpose**: Class components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire React Virtual DOM application.
2. **Lifecycle Methods**:
   - `static getDerivedStateFromError(error)`: Invoked synchronously during the render phase. Returns a state update to render fallback UI (`hasError: true`).
   - `componentDidCatch(error, errorInfo)`: Invoked during the commit phase. Used to send error stack traces and component stacks to logging services (Sentry, Datadog).
3. **Errors NOT Caught by Error Boundaries**:
   - Event handlers (`onClick` — use standard `try/catch` inside handlers instead).
   - Asynchronous code (`setTimeout`, `requestAnimationFrame`, `Promise` rejections).
   - Server-Side Rendering (SSR) errors.
   - Errors thrown inside the Error Boundary component itself.

## Deep Explanation

### Error Boundary Lifecycle Flow

```
Child Component Throws Error in Render Phase
                     │
                     ▼
[ static getDerivedStateFromError(error) ] ───► Updates State ({ hasError: true })
                     │
                     ▼
[ componentDidCatch(error, info) ] ──────────► Logs Stack to Sentry / Datadog
                     │
                     ▼
       Renders <FallbackUI /> Component
```

## Production Example

```jsx
import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('[ErrorBoundary Caught Error]:', error, errorInfo.componentStack);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          reset: this.resetErrorBoundary,
        });
      }
      return (
        <div className="error-fallback-card" role="alert">
          <h2>Something went wrong.</h2>
          <pre>{this.state.error?.message}</pre>
          <button onClick={this.resetErrorBoundary}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Best Practices

- Wrap granular UI feature blocks (widget dashboards, user profile cards) inside separate Error Boundaries so one widget error does not crash adjacent navigation bars or feeds.
- Use `react-error-boundary` library in functional component codebases for declarative `ErrorBoundary` wrappers with reset keys.

## Common Mistakes

- Expecting an Error Boundary to catch errors inside an async `onClick` fetch handler. Use `try...catch` inside event handlers and update component state explicitly.

## Follow-up Questions

1. How do you trigger an Error Boundary from an asynchronous event handler using a `useState` throwing trick?

## Related Topics

- React 19 Innovations: Auto-Memoization Compiler, `use()` Hook & Server Actions
- Integration Testing with RTL & MSW
