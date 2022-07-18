import { View, Image, StyleSheet } from 'react-native';
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
          <Image
            source={require('../../assets/logoWegg3.png')}
            style={styles.title}
          />
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

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 66,
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    width: 300,
    height: 75,
  },
});

export default LoginOptions;
