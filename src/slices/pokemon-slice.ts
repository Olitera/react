import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemonState } from '../interfaces/pokemons.ts';

const initialState: IPokemonState = {
  data: [],
  loading: false,
  error: null,
  selectedPokemon: null,
  selectedItems: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<number>) {
      if (!state.selectedItems.includes(action.payload)) {
        state.selectedItems.push(action.payload);
      }
    },
    unselectItem(state, action: PayloadAction<number>) {
      state.selectedItems = state.selectedItems.filter(
        id => id !== action.payload
      );
    },
  },
});

export const { selectItem, unselectItem } = pokemonSlice.actions;
export default pokemonSlice.reducer;
