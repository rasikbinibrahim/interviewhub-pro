# T5001 · Integration Testing with React Testing Library (RTL) & Mock Service Worker (MSW)

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Stripe, DoorDash  
**Interview Frequency:** ★★★★★  
**Category:** Testing  
**Concepts:** testing, rtl, msw, integration-testing, jest, vitest, mock-service-worker  

## Question

Why does React Testing Library (RTL) emphasize testing user-facing behavior rather than internal component implementation details, how does Mock Service Worker (MSW) intercept network calls at the network level, and how do you write robust integration tests for dynamic data fetching components?

## Expected Answer

1. **RTL Guiding Principle**: "The more your tests resemble the way your software is used, the more confidence they can give you." Tests query elements by accessible roles (`getByRole`), label text (`getByLabelText`), or visible text (`getByText`), ignoring internal state or component implementation details (`state`, `props`, internal class names).
2. **Mock Service Worker (MSW)**: Intercepts network calls by registering a Service Worker (or overriding Node `http/https` in tests) at the network layer using `msw/node`. Unlike `jest.mock(axios)`, MSW leaves application fetch/axios code 100% intact, guaranteeing tests exercise real request/response serialization pipelines.

## Deep Explanation

### 1. Priority of RTL Queries
When selecting DOM elements in RTL tests, follow the accessibility-first query hierarchy:
1. `getByRole('button', { name: /submit/i })` (accessible role & name)
2. `getByLabelText('Username')` (form controls)
3. `getByPlaceholderText('Search...')`
4. `getByText('Save Changes')`
5. `getByTestId('custom-id')` (last resort fallback)

### 2. RTL Query Types (`getBy` vs `queryBy` vs `findBy`)
- **`getBy*`**: Throws an error immediately if element is not found synchronously. Use for elements expected on initial render.
- **`queryBy*`**: Returns `null` if element is not found synchronously. Use when asserting an element is **NOT** present (`expect(queryByText('Error')).toBeNull()`).
- **`findBy*`**: Returns a Promise that resolves when element appears asynchronously (retries up to 1000ms). Equates to `await waitFor(() => getBy*)`.

## Production Example

```typescript
// __tests__/UserList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { UserList } from '@/components/UserList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Setup MSW Server Handlers
const server = setupServer(
  http.get('/api/v1/users', () => {
    return HttpResponse.json([
      { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
      { id: '2', name: 'Bob Jones', email: 'bob@example.com' },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

test('renders user list and filters results dynamically', async () => {
  const user = userEvent.setup();
  renderWithProviders(<UserList />);

  // Assert initial loading state
  expect(screen.getByText(/loading users/i)).toBeInTheDocument();

  // Async wait for users to appear via MSW mock endpoint
  const userItem = await screen.findByText('Alice Smith');
  expect(userItem).toBeInTheDocument();
  expect(screen.getByText('Bob Jones')).toBeInTheDocument();

  // User types in search filter
  const searchInput = screen.getByRole('textbox', { name: /search/i });
  await user.type(searchInput, 'Alice');

  // Assert filtered results
  expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  expect(screen.queryByText('Bob Jones')).not.toBeInTheDocument();
});

test('handles server error gracefully', async () => {
  // Override handler for 500 server error test case
  server.use(
    http.get('/api/v1/users', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  renderWithProviders(<UserList />);

  const errorMessage = await screen.findByText(/failed to load users/i);
  expect(errorMessage).toBeInTheDocument();
});
```

## Best Practices

- Always use `@testing-library/user-event` over `fireEvent` because `user-event` simulates full realistic browser event sequences (focus, keydown, keypress, input, keyup, change).
- Turn off automatic query retries (`retry: false`) in test QueryClient instances to prevent 500 error tests from timing out.

## Common Mistakes

- Wrapping synchronous assertions in `act()` or `waitFor()` unnecessarily, causing cryptic warning logs.
- Using `container.querySelector('.class')` instead of accessibility queries (`getByRole`).

## Follow-up Questions

1. How do you test custom React Hooks using `@testing-library/react` `renderHook`?
2. What are the key differences between integration testing with RTL vs E2E testing with Playwright?

## Related Topics

- TanStack Query / React Query Server State Management
- Web Accessibility & ARIA Role Semantics
