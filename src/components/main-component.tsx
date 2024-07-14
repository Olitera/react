import React from 'react';
import { Outlet } from 'react-router-dom';
import ResultsComponent from './results-component.tsx';

interface MainComponentProps {
  searchValue?: string;
}

const MainComponent: React.FC<MainComponentProps> = ({ searchValue = '' }) => {
  return (
    <div className="main-container">
      <div className="results-section">
        <ResultsComponent searchValue={searchValue} />
      </div>
      <div className="detailed-section">
        <Outlet />
      </div>
    </div>
  );
};
export default MainComponent;
