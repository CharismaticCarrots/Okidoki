import { useQuery } from 'react-query';
import axios from 'axios';

/* const fetchDitto = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
  return data;
};

export const useDitto = () => {
  return useQuery('ditto', fetchDitto);
}; */

//dependent on what data is returned back with /api/user
const updateUserStepGoal = async (stepGoal, token) => {
  const { data } = await axios.put('/api/user', stepGoal, {
    headers: { Authorization: token },
  });
  return data;
};

export const useUser = () => {
  return useQuery('stepGoal', updateUserStepGoal);
};
