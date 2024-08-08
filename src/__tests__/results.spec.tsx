import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ResultsComponent from '../components/results-component';
import { pokemonApi, useGetPokemonsQuery } from '../services/pokemon-api';
import pokemonReducer from '../slices/pokemon-slice';
import { useTheme } from '../contexts/theme-context';
import { useRouter } from 'next/router';

jest.mock('../services/pokemon-api', () => ({
  __esModule: true,
  useGetPokemonsQuery: jest.fn(),
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: jest.fn(() => ({})),
    middleware: [],
  },
}));

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock('../contexts/theme-context', () => ({
  __esModule: true,
  useTheme: jest.fn().mockReturnValue({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

const mockStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  preloadedState: {
    pokemon: {
      data: [],
      loading: false,
      error: null,
      selectedItems: [],
    },
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonApi.middleware),
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe('ResultsComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
      error: null,
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      error: new Error('Failed to fetch'),
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    expect(screen.getByText('Error: something went wrong')).toBeInTheDocument();
  });

  it('renders no results state correctly', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: { results: [] },
      isFetching: false,
      error: null,
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    expect(
      screen.getByText('Pokemon with such name did not find')
    ).toBeInTheDocument();
  });

  it('renders pokemon list correctly', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Pikachu',
          weight: 60,
          height: 4,
          sprites: {
            front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
          },
        },
      ],
      next: null,
    };

    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: mockResponse,
      isFetching: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('Pikachu')).toHaveAttribute(
        'src',
        'https://pokeapi.co/api/v2/sprites/pokemon/1.png'
      );
      expect(screen.getByText('weight: 60')).toBeInTheDocument();
      expect(screen.getByText('height: 4')).toBeInTheDocument();
    });
  });

  it('handles checkbox change correctly', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Pikachu',
          weight: 60,
          height: 4,
          sprites: {
            front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
          },
        },
      ],
      next: null,
    };

    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: mockResponse,
      isFetching: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockStore.getState().pokemon.selectedItems).toEqual([
      {
        id: 1,
        name: 'Pikachu',
        weight: 60,
        height: 4,
      },
    ]);
  });

  it('handles page change correctly with Next button', async () => {
    const mockPush = jest.fn();
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Pikachu',
          weight: 60,
          height: 4,
          sprites: {
            front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
          },
        },
      ],
      next: true,
    };

    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: mockResponse,
      isFetching: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: mockPush,
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Next'));

    expect(mockPush).toHaveBeenCalledWith('/search/2');
  });

  it('handles page change correctly with Previous button', async () => {
    const mockPush = jest.fn();
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Pikachu',
          weight: 60,
          height: 4,
          sprites: {
            front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
          },
        },
      ],
      next: true,
    };

    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: mockResponse,
      isFetching: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '2' },
      push: mockPush,
    });

    render(<ResultsComponent page={2} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Previous'));

    expect(mockPush).toHaveBeenCalledWith('/search/1');
  });

  it('disables Previous button on first page', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            name: 'Pikachu',
            weight: 60,
            height: 4,
            sprites: {
              front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
            },
          },
        ],
        next: true,
      },
      isFetching: false,
      error: null,
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables Next button if there are no more pages', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            name: 'Pikachu',
            weight: 60,
            height: 4,
            sprites: {
              front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
            },
          },
        ],
        next: null,
      },
      isFetching: false,
      error: null,
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    expect(screen.getByText('Next')).toBeDisabled();
  });
});
