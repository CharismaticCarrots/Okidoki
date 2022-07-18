import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  StyledFormBackground,
  StyledLoginOptionsContainer,
  StyledLoginOptionsDescription,
  StyledFormButton,
  StyledFormButtonText,
  StyledLogoHeading,
} from './styles';

const LoginOptions = ({ navigation }) => {
  return (
    <StyledFormBackground
      source={require('../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <StyledLoginOptionsContainer>
        <View>
          <StyledLogoHeading>Okidoki</StyledLogoHeading>
        </View>
        <View style={{ marginBottom: 120}}>
          <StyledFormButton
            style={{
              width: 220,
              marginBottom: 10,
              backgroundColor: '#ffefb4'}}
            onPress={() => navigation.navigate('SignUp')}
          >
            <StyledFormButtonText>Create Account</StyledFormButtonText>
          </StyledFormButton>
          <StyledFormButton
            style={{
              width: 220,
              marginBottom: 10,
              backgroundColor: '#ffefb4',
            }}
            onPress={() => navigation.navigate('SignIn')}>
            <StyledFormButtonText>Sign In</StyledFormButtonText>
          </StyledFormButton>
        </View>
      </StyledLoginOptionsContainer>
    </StyledFormBackground>
  );
};

export default LoginOptions;
