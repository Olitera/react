import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer, { fetchPokemonsStart } from '../slices/pokemon-slice.ts';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchPokemonsStart());
