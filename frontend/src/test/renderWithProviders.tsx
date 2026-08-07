import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { createTestStore, type TestPreloadedState, type TestStore } from './testStore';

interface RenderOptions {
  preloadedState?: TestPreloadedState;
  store?: TestStore;
  /** Initial URL, e.g. '/practice/q101'. Defaults to '/'. */
  route?: string;
  /** Route pattern to render `ui` at, e.g. '/practice/:questionId'. Defaults to matching any path. */
  routePath?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, store = createTestStore(preloadedState), route = '/', routePath = '*' }: RenderOptions = {}
) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={routePath} element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
}
