import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import { ThemeProvider } from '../contexts/theme-context';
import '../index.css';

function MyApp({ Component, ...rest }: AppProps) {
  const newStore = wrapper.useWrappedStore(rest);

  return (
    <Provider store={newStore.store}>
      <ThemeProvider>
        <Component {...newStore.props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
