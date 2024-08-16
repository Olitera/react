import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from '../contexts/theme-context';

describe('ThemeContext', () => {
  it('provides the default theme as light', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div>{theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
  });
});
