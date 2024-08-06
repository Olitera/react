import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { ThemeProvider } from '../contexts/theme-context.tsx';
import App from '../App.tsx';

describe('App Component', () => {
  test('renders search input and theme selector', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    const themeSelectorLabel = screen.getByLabelText(/select theme:/i);
    expect(themeSelectorLabel).toBeInTheDocument();
  });
});
