import React, { useEffect } from 'react';
import { IPokemon, IPokemons } from '../interfaces/pokemons.ts';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface ResultsComponentProps {
  searchValue?: string;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({
  searchValue = '',
}) => {
  const [results, setResults] = React.useState<IPokemon[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const [page, setPage] = React.useState<number>(1);
  const location = useLocation();
  const { search } = useParams<{ search: string }>();

  useEffect(() => {
    const pageParam = parseInt(search || '1', 10);
    setPage(pageParam);
    searchPokemon(pageParam);
  }, [location.search, searchValue, search]);

  const searchPokemon = (page: number) => {
    const offset = (page - 1) * 20;
    const query = !searchValue
      ? `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${20}`
      : `https://pokeapi.co/api/v2/pokemon/${searchValue}`;

    setIsLoaded(true);
    fetch(query)
      .then((res: Response) => {
        return res.json();
      })
      .then((data: IPokemons | IPokemon) => {
        if ('results' in data) {
          setIsNextDisabled(!data.next);
          getPokemons(data as IPokemons);
        } else {
          setIsNextDisabled(!isNextDisabled);
          getPokemon(data as IPokemon);
        }
      })
      .catch(catchErrors);
  };

  const getPokemons = (data: IPokemons) => {
    const query = data.results.map(item => item.url);
    Promise.all(
      query.map(item => {
        return fetch(item).then(res => res.json());
      })
    )
      .then(data => {
        setResults(data);
        setIsLoaded(false);
      })
      .catch(catchErrors);
  };

  const getPokemon = (data: IPokemon) => {
    setResults([data]);
    setIsLoaded(false);
  };

  const catchErrors = () => {
    setResults([]);
    setIsLoaded(false);
  };

  const handleClick = (id: number) => {
    navigate(`details/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/search/${newPage}`);
  };

  if (isLoaded) {
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
    <div className="bottom">
      <div className="results-container">
        {(results as IPokemon[]).map((pokemon, i) => (
          <div
            className="result-card"
            key={i}
            onClick={e => {
              e.stopPropagation();
              handleClick(pokemon.id);
            }}
          >
            <h4>{pokemon.name}</h4>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>weight: {pokemon.weight}</p>
            <p>height: {pokemon.height}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={e => {
            e.stopPropagation();
            handlePageChange(page - 1);
          }}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={e => {
            e.stopPropagation();
            handlePageChange(page + 1);
          }}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResultsComponent;
