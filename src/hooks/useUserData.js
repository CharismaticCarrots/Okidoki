import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL, TOKEN } from '../../secrets.js';
import * as SecureStore from 'expo-secure-store';

const fetchUserData = async () => {
  const token = await SecureStore.getItemAsync('TOKEN');

  if (token) {
    const { data } = await axios.get(`http://${API_URL}/api/user`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  }
};

export const useUserData = () => {
  const {isLoading, isError, error, isSuccess, data : user } = useQuery(['user'], fetchUserData);

  if (!isLoading && isSuccess) {
    return user;
  } else {
    console.log(error);
  }
};
