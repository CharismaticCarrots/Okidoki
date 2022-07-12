import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../secrets.js';
import * as SecureStore from 'expo-secure-store';

const fetchUserData = async () => {
  const token = await SecureStore.getItemAsync('TOKEN');
  console.log()
  if (token) {
    const { data } = await axios.get(`http://${API_URL}/api/user`, {
      headers: {
        authorization: token,
      },
    });

    return data;
  }
};

export const useUserData = async () => {
  const {
    isLoading,
    isError,
    error,
    isStale,
    isFetching,
    refetch,
    data: user,
  } = useQuery('user', fetchUserData, { staleTime: Infinity });

  const logout = () => {
    queryClient.removeQueries('user');
  };

  console.log("IS STALE", isStale)
  console.log("useUserData GOT HIT", user)


  return { user, logout, isError, isLoading, error };
};
