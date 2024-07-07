import React from 'react';
import { IPokemon, IPokemons } from '../interfaces/pokemons.ts';

interface ResultsComponentProps {
  searchValue?: string;
}

interface ResultsComponentState {
  results: unknown[];
  isLoaded: boolean;
  searchValue: string;
  pokemon: IPokemon | null;
}

class ResultsComponent extends React.Component<
  ResultsComponentProps,
  ResultsComponentState
> {
  constructor(props: ResultsComponentProps) {
    super(props);
    this.state = {
      results: [],
      isLoaded: true,
      searchValue: this.props.searchValue ?? '',
      pokemon: null,
    };
  }

  componentDidMount() {
    this.searchPokemon();
  }

  componentDidUpdate(prevProps: Readonly<ResultsComponentProps>) {
    if (this.props.searchValue !== prevProps.searchValue) {
      this.searchPokemon();
    }
  }

  searchPokemon = () => {
    const query = !this.props.searchValue
      ? 'https://pokeapi.co/api/v2/pokemon?offset=${2}&limit=${10}'
      : `https://pokeapi.co/api/v2/pokemon/${this.props.searchValue}`;

    fetch(query)
      .then((res: Response) => {
        return res.json();
      })
      .then((data: IPokemons | IPokemon) => {
        if ('results' in data) {
          this.getPokemons(data as IPokemons);
        } else {
          this.getPokemon(data as IPokemon);
        }
      })
      .catch(() => {
        this.catchErrors();
      });
  };

  getPokemons(data: IPokemons) {
    this.setState({ results: data.results, isLoaded: false, pokemon: null });
  }

  getPokemon(data: IPokemon) {
    this.setState({ pokemon: data, isLoaded: false, results: [] });
  }

  catchErrors() {
    this.setState({ pokemon: null, results: [], isLoaded: false });
  }

  render() {
    const { results, pokemon } = this.state;
    if (this.state.isLoaded) {
      return <div>Loaded...</div>;
    }
    if (pokemon) {
      return <div className="results-container">{<h4>{pokemon.name}</h4>}</div>;
    }
    if (!pokemon && !results.length) {
      return (
        <div>
          <h2>Pokemon with such name did not find</h2>
        </div>
      );
    }
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
