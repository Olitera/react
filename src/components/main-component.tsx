import React from 'react';
import ResultsComponent from './results-component.tsx';
import { store } from '../store/store.ts';

interface MainComponentProps {
  searchValue?: string;
  page: number;
}

const MainComponent: React.FC<MainComponentProps> = () =>
  //   {
  //   searchValue = '',
  //   page = 1,
  // }
  {
    const page = store.getState().pokemon.page || 1;
    const searchValue = store.getState().pokemon.searchValue || '';

    return (
      <div className="main-container">
        <div className="pokemons-container">
          <div className="results-section">
            <ResultsComponent searchValue={searchValue} page={page} />
          </div>
          <div className="detailed-section"></div>
        </div>
      </div>
    );
  };
export default MainComponent;
