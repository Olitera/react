import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ResultsComponent from './results-component.tsx';

interface MainComponentProps {
  searchValue?: string;
}

const MainComponent: React.FC<MainComponentProps> = ({ searchValue = '' }) => {
  const navigate = useNavigate();
  const { search } = useParams<{ search: string }>();

  const closeDetails = () => {
    navigate(`/search/${search}`);
  };

  return (
    <div className="main-container">
      <div className="results-section" onClick={closeDetails}>
        <ResultsComponent searchValue={searchValue} />
      </div>
      <div className="detailed-section">
        <Outlet />
      </div>
    </div>
  );
};
export default MainComponent;
