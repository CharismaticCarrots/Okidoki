import { View, Image, StyleSheet } from 'react-native';
import {
  StyledFormBackground,
  StyledLoginOptionsContainer,
  StyledFormButton,
  StyledFormButtonText,
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
        <View>
          <StyledFormButton
            style={{ width: 220, marginBottom: 10, backgroundColor: '#59b2ff' }}
            onPress={() => navigation.navigate('SignUp')}
          >
            <StyledFormButtonText>Create Account</StyledFormButtonText>
          </StyledFormButton>
          <StyledFormButton
            style={{ width: 220, marginBottom: 10 }}
            onPress={() => navigation.navigate('SignIn')}
          >
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
