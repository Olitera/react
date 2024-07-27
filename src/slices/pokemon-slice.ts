import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemonState, ISelectedItem } from '../interfaces/pokemons.ts';

export const initialState: IPokemonState = {
  data: [],
  loading: false,
  error: null,
  selectedItems: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<ISelectedItem>) {
      if (!state.selectedItems.find(item => item.id === action.payload.id)) {
        state.selectedItems.push(action.payload);
      }
    },
    unselectItem(state, action: PayloadAction<ISelectedItem>) {
      state.selectedItems = state.selectedItems.filter(
        item => item.id !== action.payload.id
      );
    },
    unselectAll(state) {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } = pokemonSlice.actions;
export default pokemonSlice.reducer;