import React from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../../../contexts/theme-context.tsx';
import ThemeSelector from '../../../components/theme-component.tsx';
import MainComponent from '../../../components/main-component.tsx';
import SearchComponent from '../../../components/search-component.tsx';
import useLocalStorageHook from '../../../hooks/local-storage-hook.tsx';
import { wrapper } from '../../../store/store.ts';
import { NextPage } from 'next';

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const [inputValue, setInputValue] = useLocalStorageHook('');
  const handleSearch = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const { theme } = useTheme();

  const p = page ? +page : 1;

  return (
    <div className={`container ${theme}`}>
      <section className={`top ${theme}`}>
        <SearchComponent onSearch={handleSearch} inputValue={inputValue} />
        <ThemeSelector />
      </section>
      <MainComponent searchValue={inputValue as string} page={p} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  console.log('2. Page.getServerSideProps uses the store to dispatch things');
  return { props: {} };
});

export default SearchPage;
