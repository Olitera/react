import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import App from '../App.tsx';
import { store } from '../store/store.ts';
import { ThemeProvider } from '../contexts/theme-context.tsx';

describe('Root Application Rendering', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );
    expect(getByText(/Search/i)).toBeInTheDocument();
  });
});
