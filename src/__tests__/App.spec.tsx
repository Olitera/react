import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundComponent from '../components/not-found-component.tsx';
import { IPokemonState, ISelectedItem } from '../interfaces/pokemons.ts';
import pokemonSlice, {
  initialState,
  selectItem,
  unselectAll,
  unselectItem,
} from '../slices/pokemon-slice.ts';

jest.mock('../services/pokemon-api.ts', () => ({
  useGetPokemonsQuery: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({ search: '' }),
  useParams: () => ({ search: '' }),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

describe('tests for pokemonSlice', () => {
  test('initialize slice with initial state', () => {
    const state = pokemonSlice(initialState, { type: 'unknown' });
    expect(state).toEqual({
      data: [],
      error: null,
      loading: false,
      selectedItems: [],
    });
  });

  test('should handle selectItem', () => {
    const selectedItem: ISelectedItem = {
      id: 1,
      name: 'Bulbasaur',
      weight: 68,
      height: 7,
    };
    const state = pokemonSlice(initialState, selectItem(selectedItem));
    expect(state.selectedItems).toContainEqual(selectedItem);
  });

  test('should handle unselectItem', () => {
    const initialStateWithSelected: IPokemonState = {
      ...initialState,
      selectedItems: [{ id: 1, name: 'Bulbasaur', weight: 69, height: 7 }],
    };
    const selectedItem: ISelectedItem = {
      id: 1,
      name: 'Bulbasaur',
      weight: 69,
      height: 7,
    };
    const state = pokemonSlice(
      initialStateWithSelected,
      unselectItem(selectedItem)
    );
    expect(state.selectedItems).not.toContainEqual(selectedItem);
  });

  test('should handle unselectAll', () => {
    const initialStateWithSelected: IPokemonState = {
      ...initialState,
      selectedItems: [
        { id: 1, name: 'Bulbasaur', weight: 69, height: 7 },
        { id: 2, name: 'Ivysaur', weight: 130, height: 10 },
      ],
    };
    const state = pokemonSlice(initialStateWithSelected, unselectAll());
    expect(state.selectedItems).toEqual([]);
  });
});

describe('NotFoundComponent', () => {
  it('renders the 404 page', () => {
    render(<NotFoundComponent />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
