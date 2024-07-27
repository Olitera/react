// import React, { PropsWithChildren } from 'react';
// import { render, RenderResult } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { Action, configureStore } from '@reduxjs/toolkit';
// import pokemonReducer from '../slices/pokemon-slice.ts';
// import { RootState } from '../store/store.ts';
// import { pokemonApi } from '../services/pokemon-api.ts';
// import { IPokemonState } from '../interfaces/pokemons.ts';
//
// interface RenderOptions {
//   preloadedState?: Partial<RootState>;
//   store?: ReturnType<typeof configureStore>;
// }
//
// export function renderWithProviders(
//   ui: React.ReactElement,
//   {
//     preloadedState = {},
//     store = configureStore({
//       reducer: {
//         pokemon: (
//           state: IPokemonState | undefined = {
//             data: [],
//             selectedItems: [],
//             loading: false,
//             error: null,
//           },
//           action: Action
//         ) => {
//           return pokemonReducer(state, action);
//         },
//         [pokemonApi.reducerPath]: (...args) => pokemonApi.reducer(...args),
//       },
//       preloadedState,
//     }),
//   }: RenderOptions = {}
// ): RenderResult {
//   function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
//     return <Provider store={store}>{children}</Provider>;
//   }
//
//   return render(ui, { wrapper: Wrapper });
// }
