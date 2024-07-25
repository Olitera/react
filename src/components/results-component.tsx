import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonsQuery } from '../services/pokemonApi.ts';

interface ResultsComponentProps {
  searchValue?: string;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({
  searchValue = '',
}) => {
  const [isNextDisabled] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const [page, setPage] = React.useState<number>(1);
  const location = useLocation();
  const { search } = useParams<{ search: string }>();
  const { isFetching, data, error } = useGetPokemonsQuery(page);

  useEffect(() => {
    const pageParam = parseInt(search || '1', 10);
    setPage(pageParam);
  }, [location.search, searchValue, search]);

  const handleClick = (id: number) => {
    navigate(`details/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/search/${newPage}`);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: something went wrong</div>;
  }

  if (!data?.results || data?.results.length === 0) {
    return (
      <div>
        <h2>Pokemon with such name did not find</h2>
      </div>
    );
  }
  return (
    <div className="bottom">
      <div className="results-container">
        {data.results.map((pokemon, i) => (
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
