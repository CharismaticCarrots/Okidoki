import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  StyledFormContainer,
  StyledFormBackground,
  StyledFormContentContainer,
  StyledFormDescription,
  StyledFormButton,
  StyledFormButtonText,
  StyledLogoHeading,
} from './styles';

const LoginOptions = ({ navigation }) => {
  return (
    <StyledFormContainer>
      <StyledFormBackground
        source={require('../../assets/backgrounds/loginOptions.png')}
        resizeMode="cover"
      >
        <StyledFormContentContainer>
          <View>
            <StyledLogoHeading>Okidoki</StyledLogoHeading>
            <StyledFormDescription>some cool slogan</StyledFormDescription>
          </View>
          <View>
            <StyledFormButton
              style={{ marginBottom: 10 }}
              onPress={() => navigation.navigate('SignUp')}
            >
              <StyledFormButtonText>Create Account</StyledFormButtonText>
            </StyledFormButton>
            <StyledFormButton onPress={() => navigation.navigate('SignIn')}>
              <StyledFormButtonText>Sign In</StyledFormButtonText>
            </StyledFormButton>
          </View>
        </StyledFormContentContainer>
      </StyledFormBackground>
    </StyledFormContainer>
  );
};

export default LoginOptions;
