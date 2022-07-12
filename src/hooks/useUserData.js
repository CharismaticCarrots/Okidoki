import { useState, useEffect } from 'react';
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

export const useUserData = (now) => {
  const [ userData, setUserData ] = useState({});
  const queryClient = useQueryClient();
  const logout = () => {
    queryClient.removeQueries('user');
  };
  const {
    isLoading,
    isError,
    error,
    data: user,
  } = useQuery('user', fetchUserData);

  if (isLoading) {
    console.log("LOADING");
  }

  if (isError) {
    console.log ("ERROR:", error);
  }

  useEffect(() => {
    setUserData({user, logout});
  }, [user, now]);

  // return { user, logout };
  return userData;
};
