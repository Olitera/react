import React from 'react';
import {
  configureStore,
  EnhancedStore,
  Middleware,
  Reducer,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';

export function setupApiStore<
  T extends { reducerPath: string; reducer: Reducer; middleware: Middleware[] },
>(api: T) {
  const store: EnhancedStore = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware),
  });

  setupListeners(store.dispatch);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, Wrapper };
}
