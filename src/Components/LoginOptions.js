import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  StyledFormContainer,
  StyledFormBackground,
  StyledFormContentContainer,
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
          <StyledLogoHeading style={{ marginBottom: 20 }}>
            Okidoki
          </StyledLogoHeading>
          <Text>
            put some cute description here welcoming people to the app
          </Text>
          <StyledFormButtoni
            style={{ marginBottom: 10 }}
            onPress={() => navigation.navigate('SignIn')}
          >
            <StyledFormButtonText>Sign In</StyledFormButtonText>
          </StyledFormButton>

          <StyledFormButton onPress={() => navigation.navigate('SignUp')}>
            <StyledFormButtonText>Create Account</StyledFormButtonText>
          </StyledFormButton>
        </StyledFormContentContainer>
      </StyledFormBackground>
    </StyledFormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default LoginOptions;
