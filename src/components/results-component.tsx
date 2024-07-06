import React from 'react';

class ResultsComponent extends React.Component {
  state: { results: unknown[] } = {
    results: [],
  };

  componentDidMount() {
    this.searchPokemon();
  }

  searchPokemon = () => {
    const query = 'https://pokeapi.co/api/v2/pokemon?offset=${2}&limit=${10}';

    fetch(query)
      .then((res: Response) => {
        console.log(res);
        return res.json();
      })
      .then(
        (data: {
          count: number;
          next: string;
          previous: null;
          results: { name: string; url: string }[];
        }) => {
          this.setState({ results: data.results });
        }
      );
  };

  render() {
    const { results } = this.state;
    return (
      <div className="results-container">
        {(results as { name: string }[]).map((result, i) => (
          <div key={i} className="result-card">
            <h4>{result.name}</h4>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsComponent;
