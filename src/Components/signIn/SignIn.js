import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../../secrets.js';
import * as SecureStore from 'expo-secure-store';
import { TextInput, Button } from 'react-native-paper';
import { StyledContainer, StyledHeading1 } from '../styles';
import { useUserData } from '../../hooks/useUserData';

const SignIn = ({ navigation }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const { isLoading, isError, data, error } = useUserData();
  console.log('who is logged in', data);

  const mutation = useMutation(
    async (userInfo) => {
      const { data: user } = await axios.post(
        `http://${API_URL}/auth/signin`,
        userInfo
      );
      await SecureStore.setItemAsync('TOKEN', user.token);
    },
    {
      onSuccess: () => {
        navigation.navigate('DokiHome');
      },
    }
  );

  const handleSubmit = () => {
    console.log('userdata', userData);
    mutation.mutate(userData);
  };

  return (
    <StyledContainer>
      <StyledHeading1>Welcome Back</StyledHeading1>
      <TextInput
        label="Email"
        mode="outlined"
        autoCapitalize="none"
        onChangeText={(e) =>
          setUserData((prevState) => ({ ...prevState, email: e }))
        }
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        mode="outlined"
        autoCapitalize="none"
        onChangeText={(e) =>
          setUserData((prevState) => ({ ...prevState, password: e }))
        }
      />

      <Button
        mode="contained"
        onPress={() => {
          handleSubmit();
        }}
      >
        Sign In
      </Button>

      <Button
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        Don't have an account? Sign up
      </Button>
    </StyledContainer>
  );
};

export default SignIn;
