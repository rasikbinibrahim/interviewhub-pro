# T5002 · Unit Testing with Vitest vs Jest: Spies, `vi.fn()`, Factory Mocks & Timer Control

**Difficulty:** Medium  
**Companies Asked:** Google, Meta, Amazon, Stripe, Vercel, Microsoft  
**Interview Frequency:** ★★★★★  
**Category:** Testing  
**Concepts:** testing, vitest, jest, mocking, spies, fake-timers  

## Question

How does **Vitest** compare to **Jest** in Vite-based applications, how do `vi.fn()` / `jest.fn()` function spies isolate side effects, how do module factory mocks (`vi.mock()`) stub external HTTP services, and how do Fake Timers (`vi.useFakeTimers()`) control asynchronous time execution without real-world delays?

## Expected Answer

1. **Vitest vs Jest**:
   - **Jest**: Runs on its own custom transformer pipeline (Babel / ts-jest). Requires separate config duplication for module aliases, CSS, and asset transformations in Vite apps.
   - **Vitest**: Shares Vite's exact dev and build pipeline (`vite.config.js`). Native ESM support, instant HMR test re-runs, and 100% compatible Jest API (`vi` namespace replaces `jest`).
2. **Spies & Mocks**:
   - `vi.fn()`: Creates a spy function to track calls, arguments, and return values without executing original implementations.
   - `vi.spyOn(object, 'method')`: Wraps existing object methods to audit invocations or override implementations.
   - `vi.mock('modulePath', factoryFn)`: Hoists module replacements before tests execute.

## Deep Explanation

### Spies, Module Mocks & Fake Timers Pattern

```javascript
// Production Example: Testing Async Debounced Search Component with Vitest
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchWidget } from './SearchWidget';
import * as apiService from './apiService';

// 1. Module Level Factory Mock
vi.mock('./apiService', () => ({
  fetchSearchResults: vi.fn(),
}));

describe('SearchWidget Component', () => {
  beforeEach(() => {
    // 2. Enable Fake Timers to control setTimeout debouncing!
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debounces API requests by 300ms on user typing', async () => {
    const mockFetch = vi.mocked(apiService.fetchSearchResults);
    mockFetch.mockResolvedValue([{ id: '1', title: 'React Guide' }]);

    render(<SearchWidget />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'React' } });

    // API should NOT be called immediately due to 300ms debounce!
    expect(mockFetch).not.toHaveBeenCalled();

    // 3. Fast-forward fake timers by 300ms instantly!
    vi.advanceTimersByTime(300);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('React');
  });
});
```

## Best Practices

- Always clean up mocks in `beforeEach(() => vi.clearAllMocks())` to prevent state leakage between individual unit test assertions.
- Use `vi.useFakeTimers()` when testing debounced inputs, throttled scroll listeners, or periodic polling intervals.

## Common Mistakes

- Forgetting to call `vi.useRealTimers()` in `afterEach()`, causing subsequent test suites using standard Promises or timers to hang indefinitely.

## Follow-up Questions

1. How does Mock Service Worker (MSW) intercept network requests at the network layer compared to unit-level `vi.mock()` stubs?

## Related Topics

- Testing Custom React Hooks with RTL & MSW
- Vite ESM Dev Server Architecture vs Webpack
