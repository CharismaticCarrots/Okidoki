import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import {
  StyledHeading1,
  StyledFormBackground,
  StyledFormContainer,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
} from '../styles';
import { useUserData } from '../../hooks/useUserData';
import { API_URL } from '../../../secrets.js';

const SetGoal = ({ navigation }) => {
  const [dailyStepGoal, setDailyStepGoal] = useState('10000');

  const user = useUserData();
  let token;
  if (user) {
    token = user.token;
  }
  console.log('User on SetGoal: ', user);

  const mutation = useMutation(
    (dailyStepGoal) => {
      return axios.put(
        `http://${API_URL}/api/user`,
        { dailyStepGoal },
        {
          headers: { authorization: token },
        }
      );
    },
    {
      onSuccess: () => {
        navigation.navigate('SelectEgg');
      },
    }
  );

  const handleSubmit = async () => {
    mutation.mutate(dailyStepGoal);
  };

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <StyledFormContainer>
        <StyledHeading1>Set Your Daily Step Goal</StyledHeading1>

        {/*
        <TextInput
          left={<TextInput.Icon name={'shoe-print'} />}
          placeholder="Example: 10,000"
          onChangeText={setDailyStepGoal}
        /> */}

        <StyledFormTextInput
          placeholder="Example: 10,000"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={setDailyStepGoal}
          style={{ width: 240 }}
        />

        <StyledFormButton
          onPress={() => {
            handleSubmit();
          }}
          style={{ marginTop: 5, width: 150 }}
        >
          <StyledFormButtonText>Submit</StyledFormButtonText>
        </StyledFormButton>
      </StyledFormContainer>
    </StyledFormBackground>
  );
};

export default SetGoal;
