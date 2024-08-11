'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ThemeSelector from '../../../../../components/theme-component.tsx';
import SearchComponent from '../../../../../components/search-component.tsx';
import MainComponent from '../../../../../components/main-component.tsx';
import DetailsComponent from '../../../../../components/details-component.tsx';
import useLocalStorageHook from '../../../../../hooks/local-storage-hook.tsx';
import { useTheme } from '../../../../../contexts/theme-context.tsx';

const DetailsPage: React.FC = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const { theme } = useTheme();

  const [inputValue, setInputValue] = useLocalStorageHook('');
  const handleSearch = (inputValue: string) => {
    setInputValue(inputValue);
  };

  if (!id || !page) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`container ${theme}`}>
      <section className={`top ${theme}`}>
        <SearchComponent onSearch={handleSearch} inputValue={inputValue} />
        <ThemeSelector />
      </section>
      <div className="pokemons-container">
        <MainComponent searchValue={inputValue as string} page={+page} />
        <div className="detailed-section">
          <DetailsComponent />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
