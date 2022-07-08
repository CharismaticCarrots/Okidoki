import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../../secrets.js';
import { TextInput, Button } from 'react-native-paper';
import { StyledContainer, StyledHeading1 } from '../styles';

const SignUp = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const mutation = useMutation(
    async (user) => {
      const { data } = await axios.post(`http://${API_URL}/auth/signup`, user);
      return data;
    },
    {
      onSuccess: () => {
        navigation.navigate('SetGoal');
        console.log('data,', data);
      },
    }
  );

  const handleSubmit = () => {
    mutation.mutate(userData);
  };

  return (
    <StyledContainer>
      <StyledHeading1>Create Account</StyledHeading1>
      <TextInput
        label="First Name"
        mode="outlined"
        onChangeText={(e) =>
          setUserData((prevState) => ({ ...prevState, firstName: e }))
        }
      />
      <TextInput
        label="Last Name"
        mode="outlined"
        onChangeText={(e) =>
          setUserData((prevState) => ({ ...prevState, lastName: e }))
        }
      />
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
        Sign Up
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      >
        Already have an account? Sign in
      </Button>
    </StyledContainer>
  );
};

export default SignUp;
