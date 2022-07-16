import axios from 'axios';
import { API_URL } from '../../secrets.js';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from 'react-query';

// updatedItem = [itemId, {quantity: -1}]
const updateUserItem = async (updatedItem) => {
  const token = await SecureStore.getItemAsync('TOKEN');
  if (token) {
    const { data: updatedUserItem } = await axios.put(
      `http://${API_URL}/api/user/items/${updatedItem[0]}`,
      updatedItem[1],
      {
        headers: {
          authorization: token,
        },
      }
    );
    return updatedUserItem;
  }
};

export const useUpdateUserItem = () => {
  return useMutation(updateUserItem);
};
