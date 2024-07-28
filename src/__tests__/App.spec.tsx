import { IPokemonState, ISelectedItem } from '../interfaces/pokemons.ts';
import pokemonSlice, {
  initialState,
  selectItem,
  unselectAll,
  unselectItem,
} from '../slices/pokemon-slice.ts';

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
