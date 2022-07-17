import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useMutation } from 'react-query';
import { Formik } from 'formik';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API_URL, GOOGLECLIENTID } from '../../../secrets.js';
import { useUserData } from '../../hooks/useUserData';

import {
  StyledHeading1,
  StyledFormBackground,
  StyledFormContainer,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
  StyledFormSuggest,
  StyledFormInputError,
} from '../styles';

const SignIn = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLECLIENTID,
  });

  const { user, isLoading, isError } = useUserData();
  // console.log('User on SignIn: ', user);

  useEffect(() => {
    if (response?.type === 'success') {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.authentication.accessToken}`
          );

          googleMutation.mutate({
            idToken: response.authentication.idToken,
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetchUserData();
    }
  }, [googleMutation, response]);

  const googleMutation = useMutation(async (userInfo) => {
    try {
      const { data: user } = await axios.post(
        `http://${API_URL}/auth/googleauthroute`,
        userInfo
      );
      await SecureStore.setItemAsync('TOKEN', user.token);
      navigation.navigate('DokiHome');
    } catch (err) {
      console.log(err);
    }
  });

  const mutation = useMutation(async ({ userInfo, setErrors }) => {
    try {
      const { data: user } = await axios.post(
        `http://${API_URL}/auth/signin`,
        userInfo
      );
      await SecureStore.setItemAsync('TOKEN', user.token);
      return navigation.navigate('DokiHome');
    } catch (err) {
      setErrors({ form: err.response.data.message });
    }
  });

  if (isLoading) {
    console.log('loading');
  }
  if (isError) {
    console.log('error');
  }

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setErrors }) =>
          mutation.mutate({
            userInfo: { ...values, externalType: 'postgres' },
            setErrors,
          })
        }
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <StyledFormContainer>
            <StyledHeading1>Welcome Back</StyledHeading1>

            <StyledFormTextInput
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              error={!!errors.email}
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {errors.email ? (
              <StyledFormInputError>{errors.email}</StyledFormInputError>
            ) : null}
            <StyledFormTextInput
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              error={!!errors.password}
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {errors.password ? (
              <StyledFormInputError>{errors.password}</StyledFormInputError>
            ) : null}
            {errors.form ? (
              <StyledFormInputError>{errors.form}</StyledFormInputError>
            ) : null}
            <StyledFormButton
              style={{ marginTop: 20, marginBottom: 10, width: 150 }}
              onPress={handleSubmit}
            >
              <StyledFormButtonText>Sign In</StyledFormButtonText>
            </StyledFormButton>

            <StyledFormSuggest
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              Don't have an account? Sign up
            </StyledFormSuggest>
            <StyledFormButton
              style={{
                marginTop: 20,
                marginBottom: 10,
                width: '95%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
              onPress={() => {
                promptAsync();
              }}
            >
              <FontAwesome5 name={'google'} style={styles.icons} />
              <StyledFormButtonText style={{ textAlign: 'center' }}>
                Sign in with Google
              </StyledFormButtonText>
            </StyledFormButton>
          </StyledFormContainer>
        )}
      </Formik>
    </StyledFormBackground>
  );
};

const styles = StyleSheet.create({
  icons: {
    fontSize: 27,
    overflow: 'hidden',
    color: '#59b2ff',
  },
});

export default SignIn;
