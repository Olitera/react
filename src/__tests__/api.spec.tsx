import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi, useGetPokemonByIdQuery } from '../services/pokemon-api';
import pokemonReducer from '../slices/pokemon-slice';

jest.mock('../services/pokemon-api', () => ({
  __esModule: true,
  useGetPokemonByIdQuery: jest.fn(),
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: jest.fn(() => ({})),
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
  <Provider store={mockStore}>{children}</Provider>
);

describe('pokemonApi', () => {
  it('fetches and displays a pokemon by ID', async () => {
    const mockPokemon = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
    };

    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      isError: false,
    });

    const TestComponent = () => {
      const { data, isLoading, isError } = useGetPokemonByIdQuery('1');

      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>Error occurred</div>;

      return (
        <div>
          <p>Name: {data?.name}</p>
          <p>Height: {data?.height}</p>
          <p>Weight: {data?.weight}</p>
        </div>
      );
    };

    render(<TestComponent />, { wrapper: Wrapper });

    expect(screen.getByText('Name: bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Height: 7')).toBeInTheDocument();
    expect(screen.getByText('Weight: 69')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const TestComponent = () => {
      const { data, isLoading, isError } = useGetPokemonByIdQuery('1');

      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>Error occurred</div>;

      return <div>{data?.name}</div>;
    };

    render(<TestComponent />, { wrapper: Wrapper });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles error state', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const TestComponent = () => {
      const { data, isLoading, isError } = useGetPokemonByIdQuery('1');

      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>Error occurred</div>;

      return <div>{data?.name}</div>;
    };

    render(<TestComponent />, { wrapper: Wrapper });

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
