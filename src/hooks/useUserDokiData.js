import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../secrets.js';
import * as SecureStore from 'expo-secure-store';

const fetchUserDokiData = async () => {
  const token = await SecureStore.getItemAsync('TOKEN');

  if (token) {
    const { data } = await axios.get(`http://${API_URL}/api/user/doki`, {
      headers: {
        authorization: token,
      },
    });
    return data;
  }
};

export const useUserDokiData = () => {
  const {isLoading, isError, error, data : userDoki } = useQuery(['userDoki'], fetchUserDokiData);

  if (isLoading) {
    console.log("LOADING")
  } else if (isError) {
    console.log("ERROR:", error);
  } else {
    return userDoki;
  }
};
