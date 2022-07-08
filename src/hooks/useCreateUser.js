import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../secrets.js';

export const useCreateUser = () => {
  return useMutation(async (user) => {
    const { data } = await axios.post(`http://${API_URL}/auth/signup`, user);
    return data;
  });
};
