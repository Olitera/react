import React from 'react';
import './App.css';
import SearchComponent from './components/search-component.tsx';
import ResultsComponent from './components/results-component.tsx';
import useLocalStorageHook from './hooks/local-storage-hook.tsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NotFoundComponent from './components/not-found-component.tsx';
import DetailsComponent from './components/details-component.tsx';

const App: React.FC = () => {
  // const [inputValue, setInputValue] = React.useState('')
  const [inputValue, setInputValue] = useLocalStorageHook('');

  const handleSearch = (inputValue: string) => {
    setInputValue(inputValue);
  };

  return (
    <div className="container">
      <BrowserRouter>
        <section className="top">
          <SearchComponent onSearch={handleSearch} inputValue={inputValue} />
        </section>
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route
            path="/search"
            element={<ResultsComponent searchValue={inputValue} />}
          />
          <Route path="/details/:id" element={<DetailsComponent />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
