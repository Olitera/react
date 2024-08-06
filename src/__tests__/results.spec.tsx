import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ResultsComponent from '../components/results-component';
import { pokemonApi, useGetPokemonsQuery } from '../services/pokemon-api';
import pokemonReducer from '../slices/pokemon-slice'; // unselectItem, // selectItem,
import { useTheme } from '../contexts/theme-context';
import { useRouter } from 'next/router';

jest.mock('../services/pokemon-api', () => ({
  __esModule: true,
  useGetPokemonsQuery: jest.fn(),
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: jest.fn(() => ({})),
    middleware: [],
  },
}));

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock('../contexts/theme-context', () => ({
  __esModule: true,
  useTheme: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  preloadedState: {
    pokemon: {
      data: [],
      loading: false,
      error: null,
      selectedItems: [],
    },
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonApi.middleware),
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe('ResultsComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
      error: null,
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      error: new Error('Failed to fetch'),
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    expect(screen.getByText('Error: something went wrong')).toBeInTheDocument();
  });

  it('renders no results state correctly', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: { results: [] },
      isFetching: false,
      error: null,
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    expect(
      screen.getByText('Pokemon with such name did not find')
    ).toBeInTheDocument();
  });

  it('renders pokemon list correctly', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Pikachu',
          weight: 60,
          height: 4,
          sprites: {
            front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
          },
        },
      ],
      next: null,
    };

    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: mockResponse,
      isFetching: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('Pikachu')).toHaveAttribute(
        'src',
        'https://pokeapi.co/api/v2/sprites/pokemon/1.png'
      );
      expect(screen.getByText('weight: 60')).toBeInTheDocument();
      expect(screen.getByText('height: 4')).toBeInTheDocument();
    });
  });

  it('handles page change correctly', () => {
    const pushMock = jest.fn();

    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: { results: [], next: true },
      isFetching: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: pushMock,
    });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Next'));
    expect(pushMock).toHaveBeenCalledWith('/search/2');
  });

  it('handles checkbox change correctly', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Pikachu',
          weight: 60,
          height: 4,
          sprites: {
            front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
          },
        },
      ],
      next: null,
    };

    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: mockResponse,
      isFetching: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    render(<ResultsComponent page={1} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockStore.getState().pokemon.selectedItems).toEqual([
      {
        id: 1,
        name: 'Pikachu',
        weight: 60,
        height: 4,
      },
    ]);
  });
});

// import React from 'react';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import { vi } from 'vitest';
// import ResultsComponent from '../components/results-component.tsx';
// import { useGetPokemonsQuery } from '../services/pokemon-api.ts';
// import { configureStore } from '@reduxjs/toolkit';
// import pokemonReducer from '../slices/pokemon-slice.ts';
// import { pokemonApi } from '../services/pokemon-api.ts';
// import { IPokemon, IPokemonState } from '../interfaces/pokemons.ts';
//
// interface PokemonQueryResult {
//   data: IPokemon | null;
//   isLoading: boolean;
//   error: Error | null;
// }
//
// vi.mock('../services/pokemon-api.ts', () => ({
//   useGetPokemonsQuery: vi.fn(),
//   useGetPokemonByIdQuery: vi.fn(),
//   pokemonApi: {
//     reducerPath: 'pokemonApi',
//     reducer: vi.fn(() => ({})),
//     middleware: [],
//   },
// }));
//
// vi.mock('../contexts/theme-context.tsx', () => ({
//   useTheme: vi.fn().mockReturnValue({ theme: 'light' }), // Adjust as needed
// }));
//
// const initialPokemonState: IPokemonState = {
//   data: [],
//   loading: false,
//   error: null,
//   selectedItems: [],
// };
//
// const mockStore = configureStore({
//   reducer: {
//     pokemon: pokemonReducer,
//     [pokemonApi.reducerPath]: pokemonApi.reducer,
//   },
//   preloadedState: {
//     pokemon: initialPokemonState,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(pokemonApi.middleware),
// });
//
// const Wrapper = ({ children }: { children: React.ReactNode }) => (
//   <Provider store={mockStore}>
//     <MemoryRouter initialEntries={['/search/1']}>
//       <Routes>
//         <Route path="search/:search" element={children} />
//       </Routes>
//     </MemoryRouter>
//   </Provider>
// );
//
// describe('ResultsComponent', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });
//
//   it('renders the correct number of results', async () => {
//     const mockResponse = {
//       count: 1,
//       next: '',
//       previous: null,
//       results: [
//         {
//           id: 1,
//           name: 'Pikachu',
//           weight: 60,
//           height: 4,
//           order: 1,
//           sprites: {
//             front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
//           },
//         },
//       ],
//     };
//     (useGetPokemonsQuery as jest.Mock).mockReturnValue({
//       data: mockResponse,
//       isFetching: false,
//       error: null,
//     });
//
//     render(<ResultsComponent />, { wrapper: Wrapper });
//
//     await waitFor(() => {
//       expect(screen.getByText('Pikachu')).toBeInTheDocument();
//       expect(screen.getByAltText('Pikachu')).toHaveAttribute(
//         'src',
//         'https://pokeapi.co/api/v2/sprites/pokemon/1.png'
//       );
//     });
//   });
//
//   it('displays an error message if the query fails', () => {
//     (useGetPokemonsQuery as jest.Mock<PokemonQueryResult>).mockReturnValue({
//       data: null,
//       isLoading: false,
//       error: new Error('Failed to fetch'),
//     });
//
//     render(<ResultsComponent />, { wrapper: Wrapper });
//
//     expect(screen.getByText('Error: something went wrong')).toBeInTheDocument();
//   });
//
//   it('shows a message when no results are found', async () => {
//     const mockResponse = {
//       data: {
//         count: 0,
//         next: '',
//         previous: null,
//         results: [],
//       },
//       isLoading: false,
//       error: null,
//     };
//
//     (useGetPokemonsQuery as jest.Mock).mockReturnValue({
//       data: mockResponse,
//       isLoading: false,
//       error: null,
//     });
//
//     render(<ResultsComponent />, { wrapper: Wrapper });
//
//     await waitFor(() => {
//       expect(
//         screen.getByText('Pokemon with such name did not find')
//       ).toBeInTheDocument();
//     });
//   });
//
//   it('handles checkbox selection and unselection', async () => {
//     const mockResponse = {
//       count: 1,
//       next: '',
//       previous: null,
//       results: [
//         {
//           id: 1,
//           name: 'Pikachu',
//           weight: 60,
//           height: 4,
//           order: 1,
//           sprites: {
//             front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
//           },
//         },
//       ],
//     };
//
//     (useGetPokemonsQuery as jest.Mock).mockReturnValue({
//       data: mockResponse,
//       isLoading: false,
//     });
//
//     render(<ResultsComponent />, { wrapper: Wrapper });
//
//     const checkbox = screen.getByRole('checkbox');
//     fireEvent.click(checkbox);
//
//     await waitFor(() => {
//       expect(checkbox).toBeChecked();
//     });
//
//     fireEvent.click(checkbox);
//
//     await waitFor(() => {
//       expect(checkbox).not.toBeChecked();
//     });
//   });
// });
