import React from 'react';
import './App.css';
import SearchComponent from './components/search-component.tsx';
import ResultsComponent from './components/results-component.tsx';
import useLocalStorageHook from './hooks/local-storage-hook.tsx';

const App: React.FC = () => {
  // const [inputValue, setInputValue] = React.useState('')
  const [inputValue, setInputValue] = useLocalStorageHook('');

  const handleSearch = (inputValue: string) => {
    setInputValue(inputValue);
  };

  return (
    <>
      <div className="container">
        <section className="top">
          <SearchComponent onSearch={handleSearch} inputValue={inputValue} />
        </section>
        <section className="bottom">
          <ResultsComponent searchValue={inputValue} />
        </section>
      </div>
    </>
  );
};

export default App;
