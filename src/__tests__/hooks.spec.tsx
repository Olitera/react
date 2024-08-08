import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import useLocalStorageHook from '../hooks/local-storage-hook';

const TestComponent: React.FC<{ initialValue: string }> = ({
  initialValue,
}) => {
  const [value, setValue] = useLocalStorageHook(initialValue);

  return (
    <div>
      <p data-testid="value">{value}</p>
      <button onClick={() => setValue('newValue')} data-testid="update-button">
        Update Value
      </button>
    </div>
  );
};

describe('useLocalStorageHook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with the provided initial value', () => {
    render(<TestComponent initialValue="initialValue" />);
    expect(screen.getByTestId('value')).toHaveTextContent('initialValue');
  });

  it('should initialize with the value from localStorage if available', () => {
    localStorage.setItem('search', 'storedValue');
    render(<TestComponent initialValue="initialValue" />);
    expect(screen.getByTestId('value')).toHaveTextContent('storedValue');
  });

  it('should update localStorage when value changes', () => {
    render(<TestComponent initialValue="initialValue" />);
    fireEvent.click(screen.getByTestId('update-button'));
    expect(localStorage.getItem('search')).toBe('newValue');
    expect(screen.getByTestId('value')).toHaveTextContent('newValue');
  });
});
