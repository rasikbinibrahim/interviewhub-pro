import { configureStore } from '@reduxjs/toolkit';
import { questionsApi } from './api/questionsApi';
import uiReducer from './slices/uiSlice';
import progressReducer from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    progress: progressReducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(questionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
