import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import { useEffect } from 'react';

import { API_URL, GOOGLECLIENTID } from '../../../secrets.js';

import { useState } from 'react';
import { useMutation } from 'react-query';

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

const SignUp = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLECLIENTID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const fetchUserData = async () => {
        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.authentication.accessToken}`
        );

        console.log(data);
      };
      fetchUserData();
    }
  }, [response]);

  const { user } = useUserData();
  console.log('User on SignUp: ', user);

  const mutation = useMutation(
    async (userInfo) => {
      try {
        console.log(API_URL);
        const { data: user } = await axios.post(
          `http://${API_URL}/auth/signup`,
          userInfo
        );
        console.log('user returned from sign up', user);
        await SecureStore.setItemAsync('TOKEN', user.token);
        console.log('secure store key');
        console.log(await SecureStore.getItemAsync('TOKEN'));
        return user;
      } catch (err) {
        console.log({ err });
      }
    },
    {
      onSuccess: () => {
        navigation.navigate('SetGoal');
      },
    }
  );

  const handleSubmit = () => {
    mutation.mutate(userData);
  };

  console.log(response);

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <StyledFormContainer>
        <StyledHeading1>Create Account</StyledHeading1>
        <StyledFormTextInput
          placeholder="First Name"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(e) =>
            setUserData((prevState) => ({ ...prevState, firstName: e }))
          }
        />

        <StyledFormTextInput
          placeholder="Last Name"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(e) =>
            setUserData((prevState) => ({ ...prevState, lastName: e }))
          }
        />
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
          style={{ marginTop: 20, marginBottom: 10, width: 150 }}
          onPress={() => {
            handleSubmit();
          }}
        >
          <StyledFormButtonText>Sign Up</StyledFormButtonText>
        </StyledFormButton>

        <StyledFormSuggest
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          Already have an account? Sign in
        </StyledFormSuggest>
        <Button
          title="Login with Google"
          onPress={() => {
            promptAsync();
          }}
        />
      </StyledFormContainer>
    </StyledFormBackground>
  );
};

export default SignUp;
