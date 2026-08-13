import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'dark' | 'light';

interface UiState {
  theme: Theme;
  sidebarCollapsed: boolean;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('interviewhub_theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

const initialState: UiState = {
  theme: getInitialTheme(),
  sidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('interviewhub_theme', state.theme);
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const { toggleTheme, setSidebarCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
