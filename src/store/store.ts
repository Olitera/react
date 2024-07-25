import { configureStore, Middleware } from '@reduxjs/toolkit';
import pokemonReducer from '../slices/pokemonSlice.ts';
import { pokemonApi } from '../services/pokemonApi.ts';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware as Middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
