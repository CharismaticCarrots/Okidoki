import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useCreateUser } from '../../hooks/useCreateUser';
import { StyledContainer, StyledHeading1 } from '../styles';

const SignUp = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { mutate } = useCreateUser();

  const handleSubmit = () => {
    mutate(userData);
    navigation.navigate('SetGoal');
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
        onChangeText={(e) =>
          setUserData((prevState) => ({ ...prevState, email: e }))
        }
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        mode="outlined"
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
