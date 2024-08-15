'use client';

import React from 'react';
import { useTheme } from '../../../contexts/theme-context.tsx';
import SearchComponent from '../../../components/search-component.tsx';
import ThemeSelector from '../../../components/theme-component.tsx';
import useLocalStorageHook from '../../../hooks/local-storage-hook.tsx';
import SelectedComponent from '../../../components/selected-component.tsx';
import { RootState } from '../../../store/store.ts';
import { unselectAll } from '../../../slices/pokemon-slice.ts';
import { IPokemon } from '../../../interfaces/pokemons.ts';
import { useDispatch, useSelector } from 'react-redux';
import FileSaver from 'file-saver';

function ThProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const [inputValue, setInputVal] = useLocalStorageHook('');

  const dispatch = useDispatch();

  const selectedItems: IPokemon[] = useSelector(
    (state: RootState) => state.pokemon.selectedItems
  );

  // console.log(useStore().getState().pokemon.page, 'store.getState()')

  const handleSearch = (inputValue: string) => {
    setInputVal(inputValue);
  };

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const csvContent = `data:text/csv;charset=utf-8,${selectedItems
      .map(
        item =>
          `${item.name},${item.weight},${item.height},https://pokeapi.co/api/v2/pokemon/${item.id}`
      )
      .join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, `${selectedItems.length}_pokemons.csv`);
  };

  return (
    <div className={`container ${theme}`}>
      <section className={`top ${theme}`}>
        <SearchComponent onSearch={handleSearch} inputValue={inputValue} />
        <ThemeSelector />
      </section>
      {children}
      <div className="selected-section">
        {selectedItems.length > 0 && (
          <SelectedComponent
            selectedCount={selectedItems.length}
            onUnselectAll={handleUnselectAll}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
}

export default ThProvider;
