import React from 'react';
import { IPokemon, IPokemons } from '../interfaces/pokemons.ts';

interface ResultsComponentProps {
  searchValue?: string;
}

interface ResultsComponentState {
  results: IPokemon[];
  isLoaded: boolean;
  searchValue: string;
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

    this.setState({ isLoaded: true });
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
      .catch(this.catchErrors);
  };

  getPokemons(data: IPokemons) {
    const query = data.results.map(item => item.url);
    Promise.all(
      query.map(item => {
        return fetch(item).then(res => res.json());
      })
    )
      .then(data => {
        this.setState({ results: data, isLoaded: false });
      })
      .catch(this.catchErrors);
  }

  getPokemon(data: IPokemon) {
    this.setState({ isLoaded: false, results: [data] });
  }

  catchErrors = () => {
    this.setState({ results: [], isLoaded: false });
  };

  render() {
    const { results } = this.state;
    if (this.state.isLoaded) {
      return <div>Loaded...</div>;
    }
    if (!results.length) {
      return (
        <div>
          <h2>Pokemon with such name did not find</h2>
        </div>
      );
    }
    return (
      <div className="results-container">
        {(results as IPokemon[]).map((pokemon, i) => (
          <div className="result-card" key={i}>
            <h4>{pokemon.name}</h4>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>weight: {pokemon.weight}</p>
            <p>height: {pokemon.height}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsComponent;
