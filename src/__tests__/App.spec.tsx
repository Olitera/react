import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { ThemeProvider } from '../contexts/theme-context';

jest.mock('../hooks/local-storage-hook.tsx', () => ({
  __esModule: true,
  default: () => ['', jest.fn()],
}));

jest.mock('../contexts/theme-context.tsx', () => ({
  __esModule: true,
  useTheme: () => ({ theme: 'light' }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('../components/search-component.tsx', () => ({
  __esModule: true,
  default: ({
    onSearch,
    inputValue,
  }: {
    onSearch: (input: string) => void;
    inputValue: string;
  }) => (
    <div data-testid="search-component">
      <input
        data-testid="search-input"
        value={inputValue}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  ),
}));

jest.mock('../components/theme-component.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid="theme-selector" />,
}));

describe('App', () => {
  it('renders the App component with initial setup', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    expect(screen.getByTestId('search-component')).toBeInTheDocument();
    expect(screen.getByTestId('theme-selector')).toBeInTheDocument();
  });

  it('uses the correct theme', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('container light');
  });
});
