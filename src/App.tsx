import React from 'react';
import './App.css';
import SearchComponent from './components/search-component.tsx';
import useLocalStorageHook from './hooks/local-storage-hook.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFoundComponent from './components/not-found-component.tsx';
import DetailsComponent from './components/details-component.tsx';
import MainComponent from './components/main-component.tsx';

const App: React.FC = () => {
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
            element={<MainComponent searchValue={inputValue} />}
          >
            <Route path="details/:id" element={<DetailsComponent />} />
          </Route>
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
