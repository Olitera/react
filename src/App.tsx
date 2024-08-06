import React from 'react';
import './App.css';
import SearchComponent from './components/search-component.tsx';
import useLocalStorageHook from './hooks/local-storage-hook.tsx';
import { useTheme } from './contexts/theme-context.tsx';
import ThemeSelector from './components/theme-component.tsx';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useLocalStorageHook('');
  const handleSearch = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const { theme } = useTheme();

  return (
    <div className={`container ${theme}`}>
      <section className={`top ${theme}`}>
        <SearchComponent onSearch={handleSearch} inputValue={inputValue} />
        <ThemeSelector />
      </section>
    </div>
  );
};

export default App;
