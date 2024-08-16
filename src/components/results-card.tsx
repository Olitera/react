'use client';

import React from 'react';
import {
  IPokemon,
  IPokemonsResponse,
  ISelectedItem,
} from '../interfaces/pokemons.ts';
import { RootState } from '../store/store.ts';
import { selectItem, unselectItem } from '../slices/pokemon-slice.ts';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

interface ResultsCardProps {
  page: number;
  data: IPokemonsResponse;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ page = 1, data }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedItems: IPokemon[] = useSelector(
    (state: RootState) => state.pokemon.selectedItems
  );

  const handleCheckboxChange = (data: ISelectedItem) => {
    if (selectedItems.some(item => item.id === data.id)) {
      dispatch(unselectItem(data));
    } else {
      dispatch(selectItem(data));
    }
  };

  const handleClick = (id: number) => {
    router.push(`${page}/details/${id}`);
  };

  return (
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
  );
};

export default ResultsCard;
