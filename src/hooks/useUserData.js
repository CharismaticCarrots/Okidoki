import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../secrets.js';
import * as SecureStore from 'expo-secure-store';

const fetchUserData = async () => {
  const token = await SecureStore.getItemAsync('TOKEN');

  if (token) {
    const { data } = await axios.get(`http://${API_URL}/api/user`, {
      headers: {
        authorization: token,
      },
    });
    return data;
  }
};

export const useUserData = () => {
  return useQuery('user', fetchUserData);
};
