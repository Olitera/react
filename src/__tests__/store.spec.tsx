import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../services/pokemon-api';
import pokemonReducer from '../slices/pokemon-slice';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

const createTestStore = () => {
  return configureStore({
    reducer: {
      pokemon: pokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(pokemonApi.middleware),
  });
};

describe('Redux store', () => {
  it('should be configured correctly', () => {
    const store = createTestStore();

    expect(store.getState()).toEqual({
      pokemon: pokemonReducer(undefined, { type: '@@INIT' }),
      [pokemonApi.reducerPath]: pokemonApi.reducer(undefined, {
        type: '@@INIT',
      }),
    });
  });

  it('should render a component with the correct store', () => {
    const store = createTestStore();

    const TestComponent = () => (
      <Provider store={store}>
        <div>Test</div>
      </Provider>
    );

    const { getByText } = render(<TestComponent />);

    expect(getByText('Test')).toBeInTheDocument();
  });
});
