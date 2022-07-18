import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import {
  StyledFormBackground,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
  StyledHealthStatHeading,
  StyledChangeGoalContainer,
  StyledSettingsError,
} from '../styles';
import { useUserData } from '../../hooks/useUserData';
import { API_URL } from '../../../secrets';
import { Formik } from 'formik';

const ChangePassword = ({ navigation }) => {
  const { user } = useUserData();
  let token;
  if (user) {
    token = user.token;
  }

  const mutation = useMutation(async ({ password, setErrors }) => {
    try {
      await axios.put(
        `http://${API_URL}/api/user`,
        { password },
        {
          headers: { authorization: token },
        }
      );
      return navigation.navigate('User Settings');
    } catch (error) {
      console.log({ error });
    }
  });

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/dokihome_background4.png')}
      resizeMode="cover"
    >
      <StyledHealthStatHeading style={{ marginTop: 80 }}>
        Change Your Password
      </StyledHealthStatHeading>
      <Formik
        initialValues={{ password: '' }}
        onSubmit={(values, { setErrors }) =>
          mutation.mutate({ password: values.password, setErrors })
        }
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = 'Please enter a password';
          }
          return errors;
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <StyledChangeGoalContainer>
            <StyledFormTextInput
              placeholder="New Password"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              onChangeText={handleChange('password')}
              value={values.password}
              error={!!errors.password}
              style={{
                fontFamily: values.password ? 'FredokaOne' : 'Singularity',
                fontSize: values.password ? 18 : 24,
                width: 280,
                marginBottom: 20,
              }}
            />
            {errors.password ? (
              <StyledSettingsError>{errors.password}</StyledSettingsError>
            ) : null}
            <StyledFormButton
              onPress={handleSubmit}
              style={{
                marginTop: 5,
                width: 150,
                backgroundColor: '#5FB8FD',
              }}
            >
              <StyledFormButtonText>Submit</StyledFormButtonText>
            </StyledFormButton>
            <StyledFormButton
              style={{ marginTop: 10, width: 150 }}
              onPress={() => {
                navigation.navigate('User Settings');
              }}
            >
              <StyledFormButtonText>Cancel</StyledFormButtonText>
            </StyledFormButton>
          </StyledChangeGoalContainer>
        )}
      </Formik>
    </StyledFormBackground>
  );
};

export default ChangePassword;
