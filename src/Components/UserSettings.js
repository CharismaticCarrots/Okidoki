import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { StyledHeading1,   
  StyledFormBackground,
  StyledFormContainer,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText, 
} from './styles';
import { useUserData } from '../hooks/useUserData';
import { API_URL } from '../../secrets';

const UserSettings = ({navigation}) => {
  const [dailyStepGoal, setDailyStepGoal] = useState('0');

  const { user } = useUserData();
  let token;
  if (user) {
    token = user.token;
  }
  console.log('User on SetGoal: ', user);

  const mutation = useMutation(
    async (dailyStepGoal) => {
      try {
         await axios.put(
          `http://${API_URL}/api/user`,
          { dailyStepGoal },
          {
            headers: { authorization: token },
          }
        );
        return navigation.navigate('DokiHome');
      } catch (error) {
        console.log({error})
      }
    },
  );

  const handleSubmit = async () => {
    mutation.mutate(dailyStepGoal);
  };

  return (
    <StyledFormBackground
      source={require('../../assets/backgrounds/dokihome_background4.png')}
      resizeMode="cover"
    >
      <StyledFormContainer>
        <StyledHeading1>Change Your Daily Step Goal</StyledHeading1>

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
          style={{ marginTop: 20, width: 150 }}
        >
          <StyledFormButtonText>Submit</StyledFormButtonText>
        </StyledFormButton>
        <StyledFormButton
           style={{ marginTop: 20, width: 150 }}
        >
        <StyledFormButtonText>Log out</StyledFormButtonText>
        </StyledFormButton>
      </StyledFormContainer>
    </StyledFormBackground>
  );
};

export default UserSettings

const styles = StyleSheet.create({})