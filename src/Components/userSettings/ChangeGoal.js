import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { StyledHeading1,
  StyledFormBackground,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText, 
  StyledHealthStatHeading,
  StyledChangeGoalContainer,
  StyledSettingsError
} from '../styles';
import { useUserData } from '../../hooks/useUserData';
import { API_URL } from '../../../secrets';
import { Formik } from 'formik';


const ChangeGoal = ({navigation}) => {
  const queryClient = useQueryClient();
  const [dailyStepGoal, setDailyStepGoal] = useState('0');
  const { user } = useUserData();

  let token;
  if (user) {
    token = user.token;
  }

  const mutation = useMutation(async ({ dailyStepGoal, setErrors }) => {
      try {
        await axios.put(
          `http://${API_URL}/api/user`,
          { dailyStepGoal },
          {
            headers: { authorization: token },
          }
        );
        return navigation.navigate('User Settings')
      } catch (error) {
        console.log({error})
        setErrors({ form: error.response.data.message });
      }
    },
  );

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/dokihome_background4.png')}
      resizeMode="cover"
    >
      <StyledHealthStatHeading style={{marginTop: 80}}>Change Your Daily Step Goal</  StyledHealthStatHeading>

      <Formik
        initialValues={{ dailyStepGoal: '' }}
        onSubmit={(values, { setErrors }) =>
          mutation.mutate({ dailyStepGoal: values.dailyStepGoal, setErrors }, {
            onSuccess: () => {
              queryClient.invalidateQueries(['user'])
            },
          })
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
          <StyledChangeGoalContainer>
            <StyledFormTextInput
              placeholder="New Step Goal"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              onChangeText={handleChange('dailyStepGoal')}
              value={values.dailyStepGoal}
              error={!!errors.dailyStepGoal}
              style={{
                fontFamily: values.dailyStepGoal ? 'FredokaOne' : 'Singularity',
                fontSize: values.dailyStepGoal ? 18 : 24,
                width: 280,
                marginBottom: 20,
              }}
            />
            {errors.dailyStepGoal ? (
              <StyledSettingsError>
                {errors.dailyStepGoal}
              </StyledSettingsError>
            ) : null}

            {errors.form ? (
              <StyledSettingsError>{errors.form}</StyledSettingsError>
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
           navigation.navigate('User Settings')
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

export default ChangeGoal

