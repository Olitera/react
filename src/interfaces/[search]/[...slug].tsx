import React from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../../contexts/theme-context.tsx';
import ThemeSelector from '../../components/theme-component.tsx';
import MainComponent from '../../components/main-component.tsx';
import DetailsComponent from '../../components/details-component.tsx';

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { search, slug } = router.query;

  // const [inputValue, setInputValue] = useLocalStorageHook('');
  // const handleSearch = (inputValue: string) => {
  //   setInputValue(inputValue);
  // };

  const { theme } = useTheme();

  console.log(router.query);
  // const handlePageChange = (newPage: number) => {
  //   router.push(`/search/${newPage}`);
  // };

  const page = slug?.length ? slug[0] : 1;
  const id = slug?.length ? slug[2] : null;
  const details = id ? <DetailsComponent /> : null;

  return (
    <div className={`container ${theme}`}>
      <section className={`top ${theme}`}>
        {/*<SearchComponent*/}
        {/*  // onSearch={ handleSearch } inputValue={ inputValue }*/}
        {/*/>*/}
        <ThemeSelector />
      </section>
      <MainComponent searchValue={search as string} page={page as number} />
      {details}
    </div>
  );
};

export default SearchPage;
