import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../contexts/theme-context';
import '../index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
