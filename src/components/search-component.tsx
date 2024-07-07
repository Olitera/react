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

  componentDidMount() {
    const inputValue = localStorage.getItem('search');
    if (inputValue) {
      this.setState({ inputValue });
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.inputValue);
    localStorage.setItem('search', this.state.inputValue);
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.inputValue}
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default SearchComponent;
