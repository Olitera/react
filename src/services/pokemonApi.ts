import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { IPokemon, IPokemons } from '../interfaces/pokemons.ts';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: builder => ({
    getPokemons: builder.query<IPokemons, number>({
      query: page => `pokemon?offset=${(page - 1) * 20}&limit=20`,
    }),
    getPokemonByName: builder.query<IPokemon, string>({
      query: name => `pokemon/${name}`,
    }),
  }),
});
// export const { useGetPokemonsQuery, useGetPokemonByNameQuery } = pokemonApi;
