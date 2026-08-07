# T1027 · React Error Boundaries: `componentDidCatch` & Fallback Recovery UIs

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Netflix  
**Category:** React  
**Concepts:** react, error-boundaries, componentdidcatch, fallback-ui  

## Question

How do Class-based **Error Boundaries** (`getDerivedStateFromError` and `componentDidCatch`) catch JavaScript errors in child component trees, render fallback UIs, and log unhandled crash stack traces?

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try refreshing.</h1>;
    }
    return this.props.children;
  }
}
```
