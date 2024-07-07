import React from 'react';
import './App.css';
import SearchComponent from './components/search-component.tsx';
import ResultsComponent from './components/results-component.tsx';

class App extends React.Component {
  state = {
    inputValue: '',
  };

  handleSearch = (inputValue: string) => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <>
        <div className="container">
          <section className="top">
            <SearchComponent onSearch={this.handleSearch} />
          </section>
          <section className="bottom">
            <ResultsComponent searchValue={this.state.inputValue} />
          </section>
        </div>
      </>
    );
  }
}

export default App;
