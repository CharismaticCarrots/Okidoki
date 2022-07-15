import axios from 'axios';
import { API_URL } from '../../secrets.js';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from 'react-query';

// const userItemUpdate = { quantity: -1 };

const updateUserItem = async (itemId) => {
  // const { itemId, quantity } = userItemUpdateObj;
  const token = await SecureStore.getItemAsync('TOKEN');
  if (token) {
    const { data: updatedUserItem } = await axios.put(
      `http://${API_URL}/api/user/items/${itemId}`,
      { quantity: -1 },
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
