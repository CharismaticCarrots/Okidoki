import { useQuery } from "react-query";
import axios from "axios";
import { API_URL, TOKEN } from '../../secrets.js';

const fetchUserDoki = async () => {
  const { data } = await axios.get(`http://${API_URL}/api/user/doki`, {
    headers: {
      authorization: TOKEN
    }
  });
  return data;
};

export const useUserDokiData = () => {
  return useQuery('userDoki', fetchUserDoki);
};
