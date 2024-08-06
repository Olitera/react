import React from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../../../contexts/theme-context.tsx';
import ThemeSelector from '../../../components/theme-component.tsx';
import MainComponent from '../../../components/main-component.tsx';
import SearchComponent from '../../../components/search-component.tsx';
import useLocalStorageHook from '../../../hooks/local-storage-hook.tsx';

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { search, page } = router.query;

  const [inputValue, setInputValue] = useLocalStorageHook('');
  const handleSearch = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const { theme } = useTheme();

  console.log(router.query);
  // const handlePageChange = (newPage: number) => {
  //   router.push(`/search/${newPage}`);
  // };

  const p = page ? +page : 1;

  return (
    <div className={`container ${theme}`}>
      <section className={`top ${theme}`}>
        <SearchComponent onSearch={handleSearch} inputValue={inputValue} />
        <ThemeSelector />
      </section>
      <MainComponent searchValue={search as string} page={p} />
    </div>
  );
};

export default SearchPage;
