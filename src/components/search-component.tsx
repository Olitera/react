import React, { useEffect } from 'react';

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
  // const [searchValue, setSearchValue] = React.useState<string>(inputValue);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.value = inputValue;
    }
  }, []);
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };
  //
  // const handleSearchClick = () => {
  //   onSearch(inputValue);
  // };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input) {
      // setSearchValue('eeeee');
      // console.log(searchValue, 'searchValue', input.value);
      // setTimeout(() => {console.log(searchValue, 'searchValue', input.value);});
      onSearch(input.value);
    }
  };

  return (
    // <form onSubmit={handleSearch} className="search-container">
    //   <input type="text" onChange={handleInputChange} value={inputValue} />
    //   <button onClick={handleSearchClick}>Search</button>
    // </form>
    // <form onSubmit={handleSearch} className="search-container">

    <form onSubmit={handleSearch} className="search-container">
      <input type="text" ref={inputRef} />
      <button>Search</button>
    </form>

    // <div className="search-container">
    //   <input type="text" ref={inputRef} value={searchValue} />
    //   <button onClick={handleSearch}>Search</button>
    // </div>
  );
};

export default SearchComponent;
