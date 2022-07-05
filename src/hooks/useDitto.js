import { useQuery } from "react-query";
import axios from "axios";

const fetchDitto = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
  return data;
};

export const useDitto = () => {
  return useQuery('ditto', fetchDitto);
};
