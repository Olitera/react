'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '../../contexts/theme-context.tsx';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}
