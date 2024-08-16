import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import SearchComponent from '../components/search-component';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchComponent', () => {
  const mockPush = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default input value', () => {
    render(<SearchComponent onSearch={mockOnSearch} inputValue="test" />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('test');
  });

  it('updates state when typing in the input field', () => {
    render(<SearchComponent onSearch={mockOnSearch} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new search' } });

    expect(inputElement).toHaveValue('new search');
  });

  it('calls onSearch and navigates on search button click', () => {
    render(<SearchComponent onSearch={mockOnSearch} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /search/i });

    fireEvent.change(inputElement, { target: { value: 'search term' } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('search term');
    expect(mockPush).toHaveBeenCalledWith('/search/1');
  });
});
