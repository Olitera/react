import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPokemons {
  count: number;
  next: string;
  previous: null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface IPokemon {
  sprites: { front_default: string };
  weight: number;
  height: number;
  name: string;
  order: number;
  id: number;
}

interface PokemonState {
  data: IPokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  data: [],
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    fetchPokemonsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPokemonsSuccess(state, action: PayloadAction<IPokemon[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchPokemonsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPokemonsStart,
  fetchPokemonsSuccess,
  fetchPokemonsFailure,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
