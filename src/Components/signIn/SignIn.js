import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../../secrets.js';
import * as SecureStore from 'expo-secure-store';

import {
  StyledHeading1,
  StyledFormBackground,
  StyledFormContainer,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
  StyledFormSuggest,
} from '../styles';
import { useUserData } from '../../hooks/useUserData';

const SignIn = ({ navigation }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const { user, isLoading, isError } = useUserData();
  console.log('User on SignIn: ', user);

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

  if (isLoading) {
    console.log('loading');
  }
  if (isError) {
    console.log('error');
  }

  const handleSubmit = () => {
    mutation.mutate(userData);
  };

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <StyledFormContainer>
        <StyledHeading1>Welcome Back</StyledHeading1>
        <StyledFormTextInput
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(e) =>
            setUserData((prevState) => ({ ...prevState, email: e }))
          }
        />
        <StyledFormTextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(e) =>
            setUserData((prevState) => ({ ...prevState, password: e }))
          }
        />

        <StyledFormButton
          style={{ marginTop: 20, marginBottom: 10, width: 160 }}
          onPress={() => {
            handleSubmit();
          }}
        >
          <StyledFormButtonText>Sign In</StyledFormButtonText>
        </StyledFormButton>

        <StyledFormSuggest
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          Don't have an account? Sign up
        </StyledFormSuggest>
      </StyledFormContainer>
    </StyledFormBackground>
  );
};

export default SignIn;
