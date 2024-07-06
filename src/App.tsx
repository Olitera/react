import React from 'react';
import './App.css';
import SearchComponent from './components/search-component.tsx';

class App extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <section className="top">
            <SearchComponent />
          </section>
          <section className="bottom"></section>
        </div>
      </>
    );
  }
}

export default App;
