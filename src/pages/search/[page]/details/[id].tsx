import React from 'react';
import { useRouter } from 'next/router';
import DetailsComponent from '../../../../components/details-component.tsx';
import ThemeSelector from '../../../../components/theme-component.tsx';
import MainComponent from '../../../../components/main-component.tsx';
import { useTheme } from '../../../../contexts/theme-context.tsx';
import SearchComponent from '../../../../components/search-component.tsx';
import useLocalStorageHook from '../../../../hooks/local-storage-hook.tsx';

const DetailsPage: React.FC = () => {
  const router = useRouter();
  const { id, page } = router.query;

  const { theme } = useTheme();

  const p = page ? +page : 1;

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
        <MainComponent searchValue={inputValue as string} page={p} />
        <div className="detailed-section">
          <DetailsComponent />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
