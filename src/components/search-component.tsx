import React, { useEffect } from 'react';

interface SearchComponentProps {
  onSearch: (inputValue: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    const searchValue = localStorage.getItem('search');
    if (searchValue) {
      setInputValue(searchValue);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
    localStorage.setItem('search', inputValue);
  };

  return (
    <div className="search-container">
      <input type="text" onChange={handleInputChange} value={inputValue} />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchComponent;
