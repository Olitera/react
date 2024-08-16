import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MyApp from '../pages/_app';
import { ThemeProvider } from '../contexts/theme-context';
import pokemonReducer from '../slices/pokemon-slice';
import { pokemonApi } from '../services/pokemon-api';
import { Router } from 'next/router';

const createMockRouter = (overrides: Partial<Router> = {}): Router =>
  ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    isLocaleDomain: false,
    push: jest.fn().mockResolvedValue(true) as unknown as Router['push'],
    replace: jest.fn().mockResolvedValue(true) as unknown as Router['replace'],
    reload: jest.fn() as Router['reload'],
    back: jest.fn() as Router['back'],
    prefetch: jest.fn().mockResolvedValue(undefined) as Router['prefetch'],
    beforePopState: jest.fn() as Router['beforePopState'],
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    forward: jest.fn() as Router['forward'],
    isFallback: false,
    isReady: true,
    isPreview: false,
    components: {},
    sdc: {},
    sbc: {},
    sub: jest.fn(),
    clc: jest.fn(),
    ...overrides,
  }) as Router;

const MockComponent = () => <div>Test Component</div>;

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

describe('MyApp Component', () => {
  it('should render child components with Redux store and ThemeProvider', () => {
    const mockProps = {
      Component: MockComponent,
      pageProps: {},
      router: createMockRouter(),
    };

    const store = createTestStore();

    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider>
          <MyApp {...mockProps} />
        </ThemeProvider>
      </Provider>
    );

    expect(getByText('Test Component')).toBeInTheDocument();
  });
});
