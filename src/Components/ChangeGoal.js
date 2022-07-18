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
  StyledSettingsHeading2, 
  StyledHealthStatHeading,
} from './styles';
import * as SecureStore from 'expo-secure-store';
import { useUserData } from '../hooks/useUserData';
import { API_URL } from '../../secrets';
import { AuthContext } from '../AuthLoading';

const ChangeGoal = ({navigation}) => {
  const [dailyStepGoal, setDailyStepGoal] = useState('0');
  const { user, logout } = useUserData();
  const { signOut } = React.useContext(AuthContext);
  let token;
  if (user) {
    token = user.token;
  }

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
    this.textInput.clear()
    setDailyStepGoal('0')
  };
  

  return (
    <StyledFormBackground
      source={require('../../assets/backgrounds/dokihome_background4.png')}
      resizeMode="cover"
    >
      <  StyledHealthStatHeading style={{marginVertical: 100}}>Change Daily Step Goal</  StyledHealthStatHeading>
 

        
        <StyledFormTextInput
          placeholder="Example: 10,000"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={setDailyStepGoal}
          style={{ width: 240 }}
          ref={input => { this.textInput = input }}
          clearButtonMode="always"
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
           onPress={() => {
           navigation.navigate('User Settings')
          }}
        >
        <StyledFormButtonText>Cancel</StyledFormButtonText>
        </StyledFormButton>
    
    </StyledFormBackground>
  );
};

export default ChangeGoal

const styles = StyleSheet.create({})