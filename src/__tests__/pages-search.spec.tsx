import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { useTheme } from '../contexts/theme-context.tsx';
import SearchPage from '../pages/search/[page]';
import useLocalStorageHook from '../hooks/local-storage-hook.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../slices/pokemon-slice.ts';
import { pokemonApi } from '../services/pokemon-api.ts';
import { AppStore } from '../store/store.ts';
import { getServerSideProps } from '../pages/search/[page]';
import { GetServerSidePropsContext } from 'next';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../contexts/theme-context.tsx', () => ({
  useTheme: jest.fn(),
}));

jest.mock('../hooks/local-storage-hook.tsx', () => jest.fn());

jest.mock('../components/theme-component.tsx', () => {
  return function ThemeComponent() {
    return <div>Theme Selector</div>;
  };
});

jest.mock('../components/main-component.tsx', () => {
  return function MainComponent() {
    return <div>Main Component</div>;
  };
});

jest.mock('../components/search-component', () => {
  return function SearchComponent({
    onSearch,
    inputValue,
  }: {
    onSearch: (value: string) => void;
    inputValue?: string;
  }) {
    return (
      <div>
        <input
          value={inputValue || ''}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
    );
  };
});

const createMockStore = () => {
  return configureStore({
    reducer: {
      pokemon: pokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

describe('SearchPage', () => {
  let store: AppStore;
  let mockSetInputValue: jest.Mock;
  let mockInputValue: string;

  beforeEach(() => {
    store = createMockStore();
    mockInputValue = '';
    mockSetInputValue = jest.fn(newValue => {
      mockInputValue = newValue;
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
    });

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
    });

    (useLocalStorageHook as jest.Mock).mockImplementation(() => [
      mockInputValue,
      mockSetInputValue,
    ]);
  });

  it('should render the page with correct components and props', () => {
    const { rerender } = render(
      <Provider store={store}>
        <SearchPage />
      </Provider>
    );

    expect(screen.getByText('Theme Selector')).toBeInTheDocument();
    expect(screen.getByText('Main Component')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockSetInputValue).toHaveBeenCalledWith('test');

    rerender(
      <Provider store={store}>
        <SearchPage />
      </Provider>
    );

    expect(searchInput).toHaveValue('test');
  });

  it('should call getServerSideProps and dispatch actions to the store', async () => {
    const context = {
      params: { page: '1' },
      query: {},
      req: {},
      res: {},
      resolvedUrl: '',
      locale: undefined,
      locales: undefined,
      defaultLocale: undefined,
    } as unknown as GetServerSidePropsContext;

    const getServerSidePropsResult = await getServerSideProps(context);

    const expectedInitialState = {
      pokemon: {
        data: [],
        loading: false,
        error: null,
        selectedItems: [],
      },
      pokemonApi: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {
          online: true,
          focused: true,
          middlewareRegistered: false,
          refetchOnFocus: false,
          refetchOnReconnect: false,
          refetchOnMountOrArgChange: false,
          keepUnusedDataFor: 60,
          reducerPath: 'pokemonApi',
          invalidationBehavior: 'delayed',
        },
      },
    };

    expect(getServerSidePropsResult).toEqual({
      props: {
        initialState: expectedInitialState,
      },
    });
  });
});
