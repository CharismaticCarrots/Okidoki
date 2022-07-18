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
          {/* <StyledLogoHeading>Okidoki</StyledLogoHeading> */}
          {/* <StyledLoginOptionsDescription>
            some cool slogan
          </StyledLoginOptionsDescription> */}
          {/* <Image
            source={require('../../assets/Untitled_Artwork.png')}
            style={styles.logo}
          /> */}
          <Image
            source={require('../../assets/logoWegg3.png')}
            style={styles.title}
          />
        </View>
        <View>
          <StyledFormButton
            style={{ width: 220, marginBottom: 10 }}
            onPress={() => navigation.navigate('SignUp')}
          >
            <StyledFormButtonText>Create Account</StyledFormButtonText>
          </StyledFormButton>
          <StyledFormButton onPress={() => navigation.navigate('SignIn')}>
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
