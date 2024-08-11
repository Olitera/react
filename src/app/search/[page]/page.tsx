'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchComponent from '../../../components/search-component.tsx';
import ThemeSelector from '../../../components/theme-component.tsx';
import MainComponent from '../../../components/main-component.tsx';
import { useTheme } from '../../../contexts/theme-context.tsx';
import useLocalStorageHook from '../../../hooks/local-storage-hook.tsx';

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

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
      <MainComponent searchValue={inputValue as string} page={+page} />
    </div>
  );
};

export default SearchPage;
