import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../secrets.js';
import * as SecureStore from 'expo-secure-store';

const fetchUserItemData = async () => {
  const token = await SecureStore.getItemAsync('TOKEN');

  if (token) {
    const { data } = await axios.get(`http://${API_URL}/api/user/items`, {
      headers: {
        authorization: token,
      },
    });
    return data;
  }
};

export const useUserItemData = () => {
  const {isLoading, isError, error, data : userItems } = useQuery(['userItem'], fetchUserItemData)

  if (isLoading) {
    console.log("ITEMS LOADING")
  } else if (isError) {
    console.log("ITEM ERROR:", error);
  } else {
    return userItems;
  }
}