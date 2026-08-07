# T1007 · Testing Custom Hooks with React Testing Library & MSW

**Difficulty:** Medium  
**Companies Asked:** Meta, Google, Amazon, Microsoft, Stripe  
**Interview Frequency:** ★★★★☆  
**Category:** React  
**Concepts:** react, testing, react-testing-library, msw, custom-hooks, integration-testing  

## Question

How do you unit test React Custom Hooks using `renderHook` and `act` from React Testing Library, and how does Mock Service Worker (MSW) intercept network requests at the network layer to test async API hooks isolated from live backend servers?

## Expected Answer

1. **`renderHook` API**: Renders custom hooks inside a lightweight wrapper component without needing to construct dummy test UI components. Returns `result.current` which reflects the hook's latest return value.
2. **`act()` Utility**: Ensures all React state updates, `useEffect` callbacks, and microtasks triggered during test interactions are processed and committed to the Virtual DOM before assertions execute.
3. **Mock Service Worker (MSW)**: Intercepts network requests at the Node.js `http` / `fetch` level using Service Worker / Service Interceptor logic. Provides mock REST or GraphQL handlers without mutating native `window.fetch` or `axios` instances.

## Deep Explanation

### MSW Network Interception Architecture

```
React Hook (fetch('/api/user'))
         │
         ▼ Native Fetch Call
[ Node.js / Browser Network Socket ]
         │
         ▼ MSW Interceptor (rest.get('/api/user'))
[ MSW Mock Handler Response ] ────► Injects Mock Payload into Hook State
```

## Production Example

```javascript
// 1. Custom Hook to Test (useUserProfile.js)
import { useState, useEffect } from 'react';

export function useUserProfile(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [userId]);

  return { user, loading, error };
}
```

```javascript
// 2. Integration Test (useUserProfile.test.js)
import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { useUserProfile } from './useUserProfile';

// Define MSW Network Handlers
const server = setupServer(
  http.get('/api/users/123', () => {
    return HttpResponse.json({ id: '123', name: 'Alice' });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and returns user profile data successfully', async () => {
  const { result } = renderHook(() => useUserProfile('123'));

  // Initial assertion
  expect(result.current.loading).toBe(true);

  // Wait for async state resolution
  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.user).toEqual({ id: '123', name: 'Alice' });
  expect(result.current.error).toBeNull();
});
```

## Best Practices

- Test hook behavior from the user's perspective (inputs vs outputs), avoiding testing internal hook implementation details.
- Use MSW for network mocking instead of `jest.spyOn(global, 'fetch')`, ensuring network contract testing remains authentic.

## Common Mistakes

- Forgetting `await waitFor(() => ...)` when asserting state changes triggered by asynchronous promises inside custom hooks.

## Follow-up Questions

1. How do you test custom hooks that depend on React Context Providers using the `wrapper` option in `renderHook`?

## Related Topics

- Integration Testing with RTL & MSW
- `useEffect` Lifecycle Rules & Custom Hook Abstractions
