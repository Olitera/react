import React from 'react';
import './App.css';
import SearchComponent from './components/search-component.tsx';
import ResultsComponent from './components/results-component.tsx';

class App extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <section className="top">
            <SearchComponent />
          </section>
          <section className="bottom">
            <ResultsComponent />
          </section>
        </div>
      </>
    );
  }
}

export default App;
