export interface IPokemons {
  count: number;
  next: string;
  previous: null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface IPokemon {
  sprites: { front_default: string };
  weight: number;
  height: number;
  name: string;
  order: number;
  id: number;
}

export interface IPokemonState {
  data: IPokemon[];
  loading: boolean;
  error: string | null;
}
