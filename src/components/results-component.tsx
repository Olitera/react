import React from 'react';
import {
  IPokemon,
  IPokemons,
  IPokemonsResponse,
} from '../interfaces/pokemons.ts';
import ResultsCard from './results-card.tsx';
import Pagination from './pagination.tsx';

interface ResultsComponentProps {
  searchValue?: string;
  page: number;
}

const ResultsComponent: React.FC<ResultsComponentProps> = async ({
  searchValue = '',
  page = 1,
}) => {
  async function fetchPokemons(
    page: number,
    searchValue: string
  ): Promise<IPokemonsResponse> {
    const url = searchValue
      ? `https://pokeapi.co/api/v2/pokemon/${searchValue}`
      : `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`;

    return fetch(url)
      .then(async (res: Response) => {
        const response: IPokemons | IPokemon = await res.json();
        if ('id' in response) {
          return {
            count: 1,
            next: '',
            previous: null,
            results: [response],
          };
        }
        return response;
      })
      .then(async data => {
        const pokemonData = await Promise.all(
          (data as IPokemons).results.map(async item => {
            const result = await fetch(item.url);
            return await result.json();
          })
        );
        return { ...data, results: pokemonData };
      });
  }
  const data = await fetchPokemons(page, searchValue);

  // if (isFetching) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error: something went wrong</div>;
  // }

  if (!data?.results || data?.results.length === 0) {
    return (
      <div>
        <h2>Pokemon with such name did not find</h2>
      </div>
    );
  }
  return (
    <div className="bottom">
      <ResultsCard page={page} data={data} />
      <Pagination page={page} next={data.next} />
    </div>
  );
};

export default ResultsComponent;
