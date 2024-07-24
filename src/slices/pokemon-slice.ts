import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemon, IPokemonState } from '../interfaces/pokemons.ts';

const initialState: IPokemonState = {
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
