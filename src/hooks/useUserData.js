import { useQuery, useQueryClient } from 'react-query';
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
  const {
    isLoading,
    isError,
    error,
    data: user,
  } = useQuery('user', fetchUserData);
  const queryClient = useQueryClient();

  const logout = () => {
    queryClient.removeQueries('user');
  };

  //probably return an object, with functions like logout
  return { user, logout, isError, isLoading, error };
};
