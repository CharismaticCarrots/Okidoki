import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API_URL, GOOGLECLIENTID } from '../../../secrets.js';
import { useUserData } from '../../hooks/useUserData';

import {
  StyledHeading1,
  StyledFormBackground,
  StyledFormContainer,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
  StyledFormSuggest,
} from '../styles';

const SignIn = ({ navigation }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLECLIENTID,
  });

  const { user, isLoading, isError } = useUserData();

  useEffect(() => {
    if (response?.type === 'success') {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.authentication.accessToken}`
          );

          googleMutation.mutate({
            idToken: response.authentication.idToken,
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetchUserData();
    }
  }, [googleMutation, response]);

  const googleMutation = useMutation(async (userInfo) => {
    try {
      const { data: user } = await axios.post(
        `http://${API_URL}/auth/googleauthroute`,
        userInfo
      );
      await SecureStore.setItemAsync('TOKEN', user.token);
      navigation.navigate('DokiHome');
    } catch (err) {
      console.log(err);
    }
  });

  const mutation = useMutation(async (userInfo) => {
    try {
      const { data: user } = await axios.post(
        `http://${API_URL}/auth/signin`,
        userInfo
      );
      await SecureStore.setItemAsync('TOKEN', user.token);
      return navigation.navigate('DokiHome');
    } catch (err) {
      console.log(err);
    }
  });

  if (isLoading) {
    console.log('loading');
  }
  if (isError) {
    console.log('error');
  }

  const handleSubmit = () => {
    mutation.mutate({ ...userData, externalType: 'postgres' });
  };

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <StyledFormContainer>
        <StyledHeading1>Welcome Back</StyledHeading1>
        <StyledFormButton
          style={{
            marginTop: 20,
            marginBottom: 30,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#59b2ff'
          }}
          onPress={() => {
            promptAsync();
          }}
        >
          <FontAwesome5 name={'google'} style={{fontSize: 27, overflow: "hidden", color: "black"}} />
          <StyledFormButtonText style={{ textAlign: 'center' }}>
            Sign in with Google
          </StyledFormButtonText>
        </StyledFormButton>
        <StyledFormTextInput
          style={{
            fontFamily: userData.email ? 'FredokaOne' : 'Singularity',
            fontSize: userData.email ? 18 : 24 }}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(e) =>
            setUserData((prevState) => ({ ...prevState, email: e }))
          }
        />
        <StyledFormTextInput
          style={{
            fontFamily: userData.password ? 'FredokaOne' : 'Singularity',
            fontSize: userData.password ? 18 : 24 }}
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
