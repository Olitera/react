import { vi } from 'vitest';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const pokemonApiMock = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: () => ({}), // No endpoints needed for the mock
});

vi.mock('../services/pokemon-api.ts', () => ({
  pokemonApi: pokemonApiMock,
  useGetPokemonsQuery: vi.fn(),
  useGetPokemonByIdQuery: vi.fn(),
}));
