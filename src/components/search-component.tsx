import React from 'react';
import { useRouter } from 'next/navigation';

interface SearchComponentProps {
  onSearch: (inputValue: string) => void;
}

interface SearchComponentProps {
  inputValue?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  inputValue = '',
}) => {
  const [searchValue, setSearchValue] = React.useState<string>(inputValue);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
    router.push(`/search/1`);
  };

  return (
    <div className="search-container">
      <input type="text" value={searchValue} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
