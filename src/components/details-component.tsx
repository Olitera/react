import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetPokemonByIdQuery } from '../services/pokemon-api.ts';

const DetailsComponent: React.FC = () => {
  const router = useRouter();
  const { id, page } = useParams();
  const { data, isLoading, error } = useGetPokemonByIdQuery(id as string);

  const handleClose = () => {
    router.push(`/search/${page}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: something went wrong</div>;
  }
  if (!data) {
    return <div>Failed to load Pokemon details.</div>;
  }
  return (
    <div className="detailed-page">
      <button onClick={handleClose}>Close</button>
      <h4>{data.name}</h4>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>weight: {data.weight}</p>
      <p>height: {data.height}</p>
    </div>
  );
};

export default DetailsComponent;
