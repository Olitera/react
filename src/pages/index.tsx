import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useLocalStorageHook from '../hooks/local-storage-hook';
import SearchComponent from '../components/search-component';
import ThemeSelector from '../components/theme-component';
import { useTheme } from '../contexts/theme-context';

const Home: React.FC = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useLocalStorageHook('');

  useEffect(() => {
    router.push('/search/1');
  }, [router]);

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

export default Home;
