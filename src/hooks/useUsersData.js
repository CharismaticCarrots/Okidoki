import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const createUser = async (user) => {
  console.log('user!', user);
  return await axios.post('/auth/signup', user);
};

export const useCreateUser = () => {
  return useMutation(createUser);
};
