import axios from 'axios';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import * as SecureStore from 'expo-secure-store';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API_URL, GOOGLECLIENTID } from '../../../secrets.js';

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

const SignUp = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLECLIENTID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.authentication.accessToken}`
          );
          const { email, family_name, given_name } = data;

          googleMutation.mutate({
            email: email,
            firstName: given_name,
            lastName: family_name,
            externalType: 'google',
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
        `http://${API_URL}/auth/signup`,
        userInfo
      );
      await SecureStore.setItemAsync('TOKEN', user.token);
      navigation.navigate('SetGoal');
    } catch (err) {
      console.log(err);
    }
  });

  const mutation = useMutation(async ({ userInfo, setErrors }) => {
    try {
      const { data: user } = await axios.post(
        `http://${API_URL}/auth/signup`,
        userInfo
      );
      await SecureStore.setItemAsync('TOKEN', user.token);
      navigation.navigate('SetGoal');
      return user;
    } catch (err) {
      setErrors({ form: err.response.data.message });
    }
  });

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
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
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          return errors;
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <StyledFormContainer>
            <StyledHeading1>Create Account</StyledHeading1>
            <StyledFormButton
              style={{
                marginTop: 20,
                marginBottom: 30,
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: '#59b2ff',
              }}
              onPress={() => {
                promptAsync();
              }}
            >
              <FontAwesome5
                name={'google'}
                style={{ fontSize: 27, overflow: 'hidden', color: '#333' }}
              />
              <StyledFormButtonText style={{ textAlign: 'center' }}>
                Sign up with Google
              </StyledFormButtonText>
            </StyledFormButton>
            <StyledFormTextInput
              placeholder="First Name"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              error={!!errors.firstName}
              onChangeText={handleChange('firstName')}
              value={values.firstName}
              style={{
                fontFamily: values.firstName ? 'FredokaOne' : 'Singularity',
                fontSize: values.firstName ? 18 : 24,
              }}
            />
            {errors.firstName ? (
              <StyledFormInputError>{errors.firstName}</StyledFormInputError>
            ) : null}
            <StyledFormTextInput
              placeholder="Last Name"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              error={!!errors.lastName}
              onChangeText={handleChange('lastName')}
              value={values.lastName}
              style={{
                fontFamily: values.lastName ? 'FredokaOne' : 'Singularity',
                fontSize: values.lastName ? 18 : 24,
              }}
            />
            {errors.lastName ? (
              <StyledFormInputError>{errors.lastName}</StyledFormInputError>
            ) : null}
            <StyledFormTextInput
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              error={!!errors.email}
              onChangeText={handleChange('email')}
              value={values.email}
              style={{
                fontFamily: values.email ? 'FredokaOne' : 'Singularity',
                fontSize: values.email ? 18 : 24,
              }}
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
              onChangeText={handleChange('password')}
              value={values.password}
              style={{
                fontFamily: values.password ? 'FredokaOne' : 'Singularity',
                fontSize: values.password ? 18 : 24,
              }}
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
              <StyledFormButtonText>Sign Up</StyledFormButtonText>
            </StyledFormButton>
            <StyledFormSuggest
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              Already have an account? Sign in
            </StyledFormSuggest>
          </StyledFormContainer>
        )}
      </Formik>
    </StyledFormBackground>
  );
};

export default SignUp;
