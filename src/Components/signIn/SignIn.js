import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyledContainer, StyledHeading1 } from '../styles';

const SignIn = ({ navigation }) => {
  const handleSubmit = () => {
    console.log('lets get you signed in');
  };

  return (
    <StyledContainer>
      <StyledHeading1>Welcome Back</StyledHeading1>
      <TextInput label="Email" mode="outlined" autoCapitalize="none" />
      <TextInput
        label="Password"
        secureTextEntry={true}
        mode="outlined"
        autoCapitalize="none"
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
