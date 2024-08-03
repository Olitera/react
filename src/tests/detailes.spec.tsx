import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import DetailsComponent from '../components/details-component.tsx';
import { useGetPokemonByIdQuery } from '../services/pokemon-api.ts';
import { pokemonApi } from '../services/pokemon-api.ts';
import pokemonReducer from '../slices/pokemon-slice.ts';
import { IPokemon } from '../interfaces/pokemons.ts';

interface PokemonQueryResult {
  data: IPokemon | null;
  isLoading: boolean;
  error: Error | null;
}

vi.mock('../services/pokemon-api', () => ({
  useGetPokemonByIdQuery: vi.fn(),
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: vi.fn(() => ({})),
    middleware: [],
  },
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
  <Provider store={mockStore}>
    <MemoryRouter initialEntries={['/details/1/search/1']}>
      <Routes>
        <Route path="details/:id/search/:search" element={children} />
        <Route path="search/:search" element={<div>Search Page</div>} />
      </Routes>
    </MemoryRouter>
  </Provider>
);

describe('DetailsComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Pokémon details correctly', async () => {
    const mockResponse = {
      id: 1,
      name: 'Pikachu',
      weight: 60,
      height: 4,
      order: 1,
      sprites: {
        front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
      },
    };

    (useGetPokemonByIdQuery as jest.Mock<PokemonQueryResult>).mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
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
    (useGetPokemonByIdQuery as jest.Mock<PokemonQueryResult>).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<DetailsComponent />, { wrapper: Wrapper });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays an error message if the query fails', () => {
    (useGetPokemonByIdQuery as jest.Mock<PokemonQueryResult>).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    render(<DetailsComponent />, { wrapper: Wrapper });

    expect(screen.getByText('Error: something went wrong')).toBeInTheDocument();
  });

  it('shows a failure message if Pokémon details are not found', () => {
    (useGetPokemonByIdQuery as jest.Mock<PokemonQueryResult>).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<DetailsComponent />, { wrapper: Wrapper });

    expect(
      screen.getByText('Failed to load Pokemon details.')
    ).toBeInTheDocument();
  });
});
