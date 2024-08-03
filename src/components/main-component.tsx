import React from 'react';
import ResultsComponent from './results-component.tsx';
import SelectedComponent from './selected-component.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { unselectAll } from '../slices/pokemon-slice.ts';
import FileSaver from 'file-saver';
import { useTheme } from '../contexts/theme-context.tsx';

interface MainComponentProps {
  searchValue?: string;
}

const MainComponent: React.FC<MainComponentProps> = ({ searchValue = '' }) => {
  // const navigate = useNavigate();
  // const { search } = useParams<{ search: string }>();
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state: RootState) => state.pokemon.selectedItems
  );

  // const closeDetails = () => {
  //   navigate(`/search/${search}`);
  // };

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
        <div className="results-section">
          <ResultsComponent searchValue={searchValue} />
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
