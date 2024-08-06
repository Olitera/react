import React from 'react';
import ResultsComponent from './results-component.tsx';
import SelectedComponent from './selected-component.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { unselectAll } from '../slices/pokemon-slice.ts';
import FileSaver from 'file-saver';
import { useTheme } from '../contexts/theme-context.tsx';
import { useRouter } from 'next/router';

interface MainComponentProps {
  searchValue?: string;
  page: number;
}

const MainComponent: React.FC<MainComponentProps> = ({
  searchValue = '',
  page = 1,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state: RootState) => state.pokemon.selectedItems
  );

  const closeDetails = () => {
    router.push(`/search/${page}`);
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

  const { theme } = useTheme();

  return (
    <div className={`main-container ${theme}`}>
      <div className="pokemons-container">
        <div className="results-section" onClick={closeDetails}>
          <ResultsComponent searchValue={searchValue} page={page} />
        </div>
        <div className="detailed-section"></div>
      </div>
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
};
export default MainComponent;
