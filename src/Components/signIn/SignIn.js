import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
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
  console.log('User on SignIn: ', user);

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

  const googleMutation = useMutation(
    async (userInfo) => {
      try {
        const { data: user } = await axios.post(
          `http://${API_URL}/auth/googleauthroute`,
          userInfo
        );
        console.log(user);
        await SecureStore.setItemAsync('TOKEN', user.token);
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        navigation.navigate('DokiHome');
      },
    }
  );

  const mutation = useMutation(
    async (userInfo) => {
      try {
        const { data: user } = await axios.post(
          `http://${API_URL}/auth/signin`,
          userInfo
        );
        await SecureStore.setItemAsync('TOKEN', user.token);
      } catch (err) {
        console.log(err);
      }
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
    mutation.mutate({ ...userData, externalType: 'postgres' });
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
        <StyledFormButton
          style={{
            marginTop: 20,
            marginBottom: 10,
            width: '95%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
          onPress={() => {
            promptAsync();
          }}
        >
          <FontAwesome5 name={'google'} style={styles.icons} />
          <StyledFormButtonText style={{ textAlign: 'center' }}>
            Sign in with Google
          </StyledFormButtonText>
        </StyledFormButton>
      </StyledFormContainer>
    </StyledFormBackground>
  );
};

const styles = StyleSheet.create({
  icons: {
    fontSize: 27,
    overflow: 'hidden',
    color: '#59b2ff',
  },
});

export default SignIn;
