import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IPokemon,
  IPokemons,
  IPokemonsResponse,
} from '../interfaces/pokemons.ts';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: builder => ({
    getPokemons: builder.query<
      IPokemonsResponse,
      { page: number; searchValue: string }
    >({
      query: ({ page, searchValue }) => {
        return searchValue
          ? `https://pokeapi.co/api/v2/pokemon/${searchValue}`
          : `pokemon?offset=${page * 20}&limit=20`;
      },
      transformResponse: async (response: IPokemons | IPokemon) => {
        if ('id' in response) {
          return new Promise(resolve =>
            resolve({
              count: 1,
              next: '',
              previous: null,
              results: [response],
            })
          );
        }

        const fetchPokemonData = async () => {
          const pokemonData = await Promise.all(
            (response as IPokemons).results.map(async item => {
              const result = await fetch(item.url);
              return await result.json();
            })
          );
          return { ...response, results: pokemonData };
        };
        return await fetchPokemonData();
      },
    }),
    getPokemonById: builder.query<IPokemon, string | undefined>({
      query: id => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByIdQuery } = pokemonApi;