import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonByIdQuery } from '../services/pokemon-api.ts';

const DetailsComponent: React.FC = () => {
  const { id, search } = useParams<{ id: string; search: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetPokemonByIdQuery(id);

  const handleClose = () => {
    navigate(`/search/${search}`);
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
