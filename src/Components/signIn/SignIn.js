import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyledContainer, StyledHeading1 } from '../styles';

const SignIn = ({ navigation }) => {
  const handleSubmit = () => {
    console.log('lets get you signed in');
  };

  return (
    <StyledContainer>
      <StyledHeading1>Sign In</StyledHeading1>
      <TextInput
        label="Email"
        value={userData.email}
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
        Sign In
      </Button>
    </StyledContainer>
  );
};

export default SignIn;
