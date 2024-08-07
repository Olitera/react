import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from '../contexts/theme-context.tsx';
import ThemeSelector from '../components/theme-component.tsx';

jest.mock('../contexts/theme-context.tsx', () => ({
  __esModule: true,
  useTheme: jest.fn(),
}));

describe('ThemeSelector Component', () => {
  const setTheme = jest.fn();
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme,
    });
  });

  it('renders with the correct theme', () => {
    render(<ThemeSelector />);

    const selectElement = screen.getByLabelText('Select Theme:');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('light');
  });

  it('calls setTheme with the correct value when a new theme is selected', () => {
    render(<ThemeSelector />);

    const selectElement = screen.getByLabelText('Select Theme:');
    fireEvent.change(selectElement, { target: { value: 'dark' } });

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('renders options with correct values', () => {
    render(<ThemeSelector />);

    const lightOption = screen.getByRole('option', { name: 'Light' });
    const darkOption = screen.getByRole('option', { name: 'Dark' });

    expect(lightOption).toHaveValue('light');
    expect(darkOption).toHaveValue('dark');
  });
});
