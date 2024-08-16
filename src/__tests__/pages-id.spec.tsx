import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { useTheme } from '../contexts/theme-context';
import useLocalStorageHook from '../hooks/local-storage-hook';
import DetailsPage from '../pages/search/[page]/details/[id].tsx';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../contexts/theme-context', () => ({
  useTheme: jest.fn(),
}));

jest.mock('../hooks/local-storage-hook', () => jest.fn());

jest.mock('../components/search-component', () => {
  return function SearchComponent({
    onSearch,
    inputValue,
  }: {
    onSearch: (value: string) => void;
    inputValue?: string;
  }) {
    return (
      <div>
        <input
          value={inputValue || ''}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
    );
  };
});

describe('DetailsPage', () => {
  let mockSetInputValue: jest.Mock;
  let mockInputValue: string;

  beforeEach(() => {
    mockInputValue = '';
    mockSetInputValue = jest.fn(newValue => {
      mockInputValue = newValue;
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '1', page: '1' },
    });

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
    });

    (useLocalStorageHook as jest.Mock).mockImplementation(() => [
      mockInputValue,
      mockSetInputValue,
    ]);
  });

  it('should display loading text when id or page is missing', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    render(<DetailsPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
