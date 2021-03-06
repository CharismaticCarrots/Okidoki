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

export const useUserData = () => {
  const {
    isLoading,
    isError,
    error,
    data: user,
  } = useQuery(['user'], fetchUserData);
  const queryClient = useQueryClient();

  const logout = () => {
    queryClient.removeQueries(['user']);
    queryClient.removeQueries(['userDoki']);
  };

  if (isLoading) {
    console.log("LOADING");
  }

  if (isError) {
    console.log ("ERROR:", error);
  }

  return { user, logout };
};
