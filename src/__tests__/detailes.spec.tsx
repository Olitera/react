import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DetailsComponent from '../components/details-component';
import { pokemonApi, useGetPokemonByIdQuery } from '../services/pokemon-api';
import pokemonReducer from '../slices/pokemon-slice';
import { useRouter } from 'next/router';

jest.mock('../services/pokemon-api', () => ({
  __esModule: true,
  useGetPokemonByIdQuery: jest.fn(),
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

describe('DetailsComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Pokémon details correctly', async () => {
    const mockResponse = {
      id: 1,
      name: 'Pikachu',
      weight: 60,
      height: 4,
      sprites: {
        front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
      },
    };

    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '1', page: '1' },
      push: jest.fn(),
    });

    render(<DetailsComponent />, { wrapper: Wrapper });

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

  it('displays a loading message when data is being fetched', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '1', page: '1' },
      push: jest.fn(),
    });

    render(<DetailsComponent />, { wrapper: Wrapper });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays an error message if the query fails', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '1', page: '1' },
      push: jest.fn(),
    });

    render(<DetailsComponent />, { wrapper: Wrapper });

    expect(screen.getByText('Error: something went wrong')).toBeInTheDocument();
  });

  it('shows a failure message if Pokémon details are not found', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '1', page: '1' },
      push: jest.fn(),
    });

    render(<DetailsComponent />, { wrapper: Wrapper });

    expect(
      screen.getByText('Failed to load Pokemon details.')
    ).toBeInTheDocument();
  });

  it('navigates to the search page when "Close" button is clicked', () => {
    const pushMock = jest.fn();

    const mockResponse = {
      id: 1,
      name: 'Pikachu',
      weight: 60,
      height: 4,
      sprites: {
        front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
      },
    };

    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '1', page: '1' },
      push: pushMock,
    });

    render(<DetailsComponent />, { wrapper: Wrapper });

    screen.getByText('Close').click();
    expect(pushMock).toHaveBeenCalledWith('/search/1');
  });
});
