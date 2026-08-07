import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Required because vitest.config's `test.globals` is intentionally
// false (this codebase imports describe/it/expect/etc. explicitly) —
// @testing-library/react's automatic cleanup only self-registers when
// it detects a global `afterEach`, so it's wired up explicitly here
// instead. Without this, renders from one test leak into the next.
afterEach(() => {
  cleanup();
});
