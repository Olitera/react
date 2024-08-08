import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import FileSaver from 'file-saver';
import MainComponent from '../components/main-component';
import { unselectAll } from '../slices/pokemon-slice';
import { useTheme } from '../contexts/theme-context';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));
jest.mock('../contexts/theme-context', () => ({
  useTheme: jest.fn(),
}));

jest.mock('../components/results-component', () =>
  jest.fn(() => <div data-testid="results-component" />)
);
jest.mock('../components/selected-component', () =>
  jest.fn(({ onUnselectAll, onDownload }) => (
    <div>
      <button data-testid="unselect-all-button" onClick={onUnselectAll}>
        Unselect All
      </button>
      <button data-testid="download-button" onClick={onDownload}>
        Download
      </button>
    </div>
  ))
);

describe('MainComponent', () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ResultsComponent with correct props', () => {
    render(<MainComponent searchValue="test" page={1} />);

    const resultsComponent = screen.getByTestId('results-component');
    expect(resultsComponent).toBeInTheDocument();
  });

  it('handles unselect all button click', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([
      { name: 'Pikachu', weight: 60, height: 4, id: 25 },
    ]);
    render(<MainComponent searchValue="test" page={1} />);

    const unselectAllButton = screen.getByTestId('unselect-all-button');
    fireEvent.click(unselectAllButton);

    expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
  });

  it('handles download button click', () => {
    const selectedItems = [{ name: 'Pikachu', weight: 60, height: 4, id: 25 }];
    (useSelector as unknown as jest.Mock).mockReturnValue(selectedItems);
    render(<MainComponent searchValue="test" page={1} />);

    const downloadButton = screen.getByTestId('download-button');
    fireEvent.click(downloadButton);

    const expectedCsvContent = `data:text/csv;charset=utf-8,Pikachu,60,4,https://pokeapi.co/api/v2/pokemon/25`;
    expect(FileSaver.saveAs).toHaveBeenCalledWith(
      expect.any(Blob),
      '1_pokemons.csv'
    );

    const blob = (FileSaver.saveAs as unknown as jest.Mock).mock.calls[0][0];
    const reader = new FileReader();
    reader.readAsText(blob);
    reader.onload = () => {
      expect(reader.result).toBe(expectedCsvContent);
    };
  });

  it('redirects to search page on closeDetails', () => {
    render(<MainComponent searchValue="test" page={1} />);

    const resultsSection =
      screen.getByTestId('results-component').parentElement;
    if (resultsSection) {
      fireEvent.click(resultsSection);
    }

    expect(mockPush).toHaveBeenCalledWith('/search/1');
  });
});
