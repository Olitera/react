'use client';

import React from 'react';
import '../index.css';
import { ThemeProvider } from '../contexts/theme-context.tsx';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
