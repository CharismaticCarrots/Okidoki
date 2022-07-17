import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Formik } from 'formik';

import { useUserData } from '../../hooks/useUserData';
import { API_URL } from '../../../secrets.js';

import {
  StyledHeading1,
  StyledFormBackground,
  StyledFormContainer,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
  StyledFormInputError,
} from '../styles';

const SetGoal = ({ navigation }) => {
  const [dailyStepGoal, setDailyStepGoal] = useState('0');

  const { user } = useUserData();
  let token;
  if (user) {
    token = user.token;
  }
  console.log('User on SetGoal: ', user);

  const mutation = useMutation(async ({ dailyStepGoal, setErrors }) => {
    try {
      await axios.put(
        `http://${API_URL}/api/user`,
        { dailyStepGoal },
        {
          headers: { authorization: token },
        }
      );
      return navigation.navigate('SelectEgg');
    } catch (error) {
      setErrors({ form: 'Please set a goal' });
      //need to add this to the put route. For now this is just front end.
    }
  });

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <Formik
        initialValues={{ dailyStepGoal: '' }}
        onSubmit={(values, { setErrors }) =>
          mutation.mutate({ values, setErrors })
        }
        validate={(values) => {
          const errors = {};
          if (!values.dailyStepGoal || parseInt(values.dailyStepGoal) <= 1000) {
            errors.dailyStepGoal = 'Please submit a step goal above 1000';
          }
          return errors;
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <StyledFormContainer>
            <StyledHeading1>Set Your Daily Step Goal</StyledHeading1>

            <StyledFormTextInput
              placeholder="Example: 10,000"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              onChangeText={handleChange('dailyStepGoal')}
              value={values.dailyStepGoal}
              error={!!errors.dailyStepGoal}
              style={{ width: 240 }}
            />
            {errors.dailyStepGoal ? (
              <StyledFormInputError>
                {errors.dailyStepGoal}
              </StyledFormInputError>
            ) : null}
            <StyledFormButton
              onPress={handleSubmit}
              style={{ marginTop: 5, width: 150 }}
            >
              <StyledFormButtonText>Submit</StyledFormButtonText>
            </StyledFormButton>
            {errors.form ? (
              <StyledFormInputError>{errors.form}</StyledFormInputError>
            ) : null}
          </StyledFormContainer>
        )}
      </Formik>
    </StyledFormBackground>
  );
};

export default SetGoal;
