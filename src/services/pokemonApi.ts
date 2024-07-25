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
    getPokemons: builder.query<IPokemonsResponse, number>({
      query: page => `pokemon?offset=${page * 20}&limit=20`,
      transformResponse: (response: IPokemons) => {
        const fetchPokemonData = async () => {
          const pokemonData = await Promise.all(
            response.results.map(async item => {
              const result = await fetch(item.url);
              return await result.json();
            })
          );
          return { ...response, results: pokemonData };
        };
        return fetchPokemonData();
      },
    }),
    getPokemonByName: builder.query<IPokemon, string>({
      query: name => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByNameQuery } = pokemonApi;
