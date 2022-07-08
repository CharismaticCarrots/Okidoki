import { useQuery } from "react-query";
import axios from "axios";
import { API_URL, TOKEN } from '../../secrets.js';

const fetchUserData = async () => {
  const { data } = await axios.get(`http://${API_URL}/api/user`, {
    headers: {
      authorization: TOKEN
    }
  });
  return data;
};

export const useUserData = () => {
  return useQuery('user', fetchUserData);
};
