import React from 'react';
import { IPokemon } from '../interfaces/pokemons';
import { useParams } from 'react-router-dom';

const DetailsComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = React.useState<IPokemon | null>(null);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoaded(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res: Response) => {
        return res.json();
      })
      .then((data: IPokemon) => {
        setPokemon(data);
        setIsLoaded(false);
      })
      .catch(() => setIsLoaded(false));
  }, [id]);

  if (isLoaded) {
    return <div>Loading...</div>;
  }
  if (!pokemon) {
    return <div>Failed to load Pokemon details.</div>;
  }
  return (
    <div>
      <h4>{pokemon.name}</h4>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>weight: {pokemon.weight}</p>
      <p>height: {pokemon.height}</p>
    </div>
  );
};

export default DetailsComponent;
