import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import pokemonReducer from '../slices/pokemon-slice.ts';
import { pokemonApi } from '../services/pokemon-api.ts';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonApi.middleware),
}) as EnhancedStore;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(() => store, { debug: true });
