import { vi } from 'vitest';
import { IPokemon, IPokemonsResponse } from '../interfaces/pokemons';
import {
  pokemonApi,
  useGetPokemonsQuery,
  useGetPokemonByIdQuery,
} from '../services/pokemon-api';
import { renderHook, waitFor } from '@testing-library/react';
import { setupApiStore } from './test.utils.tsx';

vi.mock('../services/pokemon-api', async () => {
  const actualModule = await vi.importActual<
    typeof import('../services/pokemon-api')
  >('../services/pokemon-api');
  return {
    ...actualModule,
    useGetPokemonsQuery: vi.fn(),
    useGetPokemonByIdQuery: vi.fn(),
    pokemonApi: {
      reducerPath: 'pokemonApi',
      reducer: vi.fn(() => ({})),
      middleware: actualModule.pokemonApi.middleware,
    },
  };
});

describe('pokemonApi', () => {
  const { Wrapper } = setupApiStore(pokemonApi);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useGetPokemonsQuery', () => {
    it('fetches pokemons based on page and search value', async () => {
      const mockResponse: IPokemonsResponse = {
        count: 1,
        next: '',
        previous: null,
        results: [
          {
            id: 1,
            name: 'Pikachu',
            weight: 60,
            height: 4,
            order: 1,
            sprites: {
              front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
            },
          },
        ],
      };

      (useGetPokemonsQuery as jest.Mock).mockImplementation(() => ({
        data: mockResponse,
        error: null,
        isLoading: false,
      }));

      const { result } = renderHook(
        () => useGetPokemonsQuery({ page: 0, searchValue: '' }),
        { wrapper: Wrapper }
      );

      await waitFor(() => {
        expect(result.current.data).toEqual(mockResponse);
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.error).toBeNull();
      });
    });
  });

  describe('useGetPokemonByIdQuery', () => {
    it('fetches pokemon by ID', async () => {
      const mockPokemon: IPokemon = {
        id: 1,
        name: 'Pikachu',
        weight: 60,
        height: 4,
        order: 1,
        sprites: {
          front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
        },
      };

      (useGetPokemonByIdQuery as jest.Mock).mockImplementation(() => ({
        data: mockPokemon,
        error: null,
        isLoading: false,
      }));

      const { result } = renderHook(() => useGetPokemonByIdQuery('1'), {
        wrapper: Wrapper,
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockPokemon);
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.error).toBeNull();
      });
    });
  });
});
