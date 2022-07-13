import axios from 'axios';
import { API_URL } from '../../secrets.js';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from 'react-query';

const updateUser = async (userUpdate) => {
  const token = await SecureStore.getItemAsync('TOKEN');
  if (token) {
    const { data: updatedUserDoki } = await axios.put(
      `http://${API_URL}/api/user/`,
      userUpdate,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return updatedUserDoki;
  }
};

export const useUpdateUser = () => {
  return useMutation(updateUser);
};
