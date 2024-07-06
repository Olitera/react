import React from 'react';

interface SearchComponentProps {
  onSearch: (inputValue: string) => void;
}

interface SearchComponentState {
  inputValue: string;
}

class SearchComponent extends React.Component<
  SearchComponentProps,
  SearchComponentState
> {
  constructor(props: SearchComponentProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.inputValue);
  };

  render() {
    return (
      <div className="search-container">
        <input type="text" onChange={this.handleInputChange} />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default SearchComponent;
