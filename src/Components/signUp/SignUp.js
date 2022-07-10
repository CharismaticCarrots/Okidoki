import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../../secrets.js';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import {
  StyledHeading1,
  StyledFormBackground,
  StyledFormContainer,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
} from '../styles';

const SignUp = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const mutation = useMutation(
    async (userInfo) => {
      const { data: user } = await axios.post(
        `http://${API_URL}/auth/signup`,
        userInfo
      );
      await SecureStore.setItemAsync('TOKEN', user.token);
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
          style={{ marginBottom: 10, width: '100%' }}
          onPress={() => {
            handleSubmit();
          }}
        >
          <StyledFormButtonText>Sign Up</StyledFormButtonText>
        </StyledFormButton>

        {/* <Button
          mode="contained"
          onPress={() => {
            handleSubmit();
          }}
        >
          Sign Up
        </Button> */}
        <Button
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          Already have an account? Sign in
        </Button>
      </StyledFormContainer>
    </StyledFormBackground>
  );
};

export default SignUp;
