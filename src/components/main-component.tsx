import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ResultsComponent from './results-component.tsx';
import SelectedComponent from './selected-component.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { unselectAll } from '../slices/pokemon-slice.ts';

interface MainComponentProps {
  searchValue?: string;
}

const MainComponent: React.FC<MainComponentProps> = ({ searchValue = '' }) => {
  const navigate = useNavigate();
  const { search } = useParams<{ search: string }>();
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state: RootState) => state.pokemon.selectedItems
  );

  const closeDetails = () => {
    navigate(`/search/${search}`);
  };

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  return (
    <div className="main-container">
      <div className="pokemons-container">
        <div className="results-section" onClick={closeDetails}>
          <ResultsComponent searchValue={searchValue} />
        </div>
        <div className="detailed-section">
          <Outlet />
        </div>
      </div>
      <div>
        {selectedItems.length > 0 && (
          <SelectedComponent
            selectedCount={selectedItems.length}
            onUnselectAll={handleUnselectAll}
          />
        )}
      </div>
    </div>
  );
};
export default MainComponent;
