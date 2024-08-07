import React from 'react';
import { useGetPokemonsQuery } from '../services/pokemon-api.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { selectItem, unselectItem } from '../slices/pokemon-slice.ts';
import { IPokemon, ISelectedItem } from '../interfaces/pokemons.ts';
import { useTheme } from '../contexts/theme-context.tsx';
import { useRouter } from 'next/router';

interface ResultsComponentProps {
  searchValue?: string;
  page: number;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({
  searchValue = '',
  page = 1,
}) => {
  const router = useRouter();
  const { isFetching, data, error } = useGetPokemonsQuery({
    page,
    searchValue,
  });
  const dispatch = useDispatch();
  const selectedItems: IPokemon[] = useSelector(
    (state: RootState) => state.pokemon.selectedItems
  );

  const handleClick = (id: number) => {
    router.push(`${page}/details/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/search/${newPage}`);
  };

  const handleCheckboxChange = (data: ISelectedItem) => {
    if (selectedItems.some(item => item.id === data.id)) {
      dispatch(unselectItem(data));
    } else {
      dispatch(selectItem(data));
    }
  };

  const { theme } = useTheme();

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
    <div className={`bottom ${theme}`}>
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
            <form>
              <input
                type="checkbox"
                checked={selectedItems.some(item => item.id === pokemon.id)}
                onChange={() =>
                  handleCheckboxChange({
                    id: pokemon.id,
                    name: pokemon.name,
                    weight: pokemon.weight,
                    height: pokemon.height,
                  })
                }
                onClick={e => {
                  e.stopPropagation();
                }}
              />
            </form>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={e => {
            e.stopPropagation();
            handlePageChange(+page - 1);
          }}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={e => {
            e.stopPropagation();
            handlePageChange(+page + 1);
          }}
          disabled={!data.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResultsComponent;
