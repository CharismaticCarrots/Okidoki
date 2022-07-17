import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
        try {
          const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.authentication.accessToken}`
          );
          const { email, family_name, given_name } = data;

          mutation.mutate({
            email: email,
            firstName: given_name,
            lastName: family_name,
            externalType: 'google',
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetchUserData();
    }
  }, [mutation, response]);

  const mutation = useMutation(async (userInfo) => {
    try {
      const { data: user } = await axios.post(
        `http://${API_URL}/auth/signup`,
        userInfo
      );
      await SecureStore.setItemAsync('TOKEN', user.token);
      navigation.navigate('SetGoal');
      return user;
    } catch (err) {
      console.log({ err });
    }
  });

  const handleSubmit = () => {
    mutation.mutate({ ...userData, externalType: 'postgres' });
  };

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <StyledFormContainer>
        <StyledHeading1>Create Account</StyledHeading1>
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
            Sign up with Google
          </StyledFormButtonText>
        </StyledFormButton>
        <StyledFormTextInput
          style={{
            fontFamily: userData.firstName ? 'FredokaOne' : 'Singularity',
            fontSize: userData.firstName ? 18 : 24 }}
          placeholder="First Name"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(e) =>
            setUserData((prevState) => ({ ...prevState, firstName: e }))
          }
        />

        <StyledFormTextInput
          style={{
              fontFamily: userData.lastName ? 'FredokaOne' : 'Singularity', fontSize: userData.lastName ? 18 : 24 }}
          placeholder="Last Name"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(e) =>
            setUserData((prevState) => ({ ...prevState, lastName: e }))
          }
        />
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
          style={{ marginTop: 10, marginBottom: 10, width: 150 }}
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
      </StyledFormContainer>
    </StyledFormBackground>
  );
};

export default SignUp;
