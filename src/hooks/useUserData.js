import { useQuery } from "react-query";
import axios from "axios";
import { API_URL, TOKEN } from '../../secrets.js';

const fetchUserData = async () => {
  debugger
  const { data } = await axios.get(`http://${API_URL}/api/user`, {
    headers: {
      authorization: TOKEN
    }
  });
  return data;
};

export const useUserData = () => {
  debugger
  const { isLoading, isError, data: user, error } = useQuery('user', fetchUserData);
  debugger

  if (isError) console.log(error);

  if (!isLoading && !isError) {
    debugger
    return user;
  }
};
