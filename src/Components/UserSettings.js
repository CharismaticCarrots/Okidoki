import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
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

const UserSettings = ({navigation}) => {
  const queryClient = useQueryClient();
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
    mutation.mutate(dailyStepGoal, {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
      },
    });
    this.textInput.clear()
    setDailyStepGoal('0')
  };
  

  return (
    <StyledFormBackground
      source={require('../../assets/backgrounds/dokihome_background4.png')}
      resizeMode="cover"
    >
      <  StyledHealthStatHeading style={{marginVertical: 100}}>User Settings</  StyledHealthStatHeading>
 
        <StyledSettingsHeading2>Change Your Daily Step Goal</StyledSettingsHeading2>
        
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
            logout();
            SecureStore.deleteItemAsync('TOKEN');
            signOut()
          }}
        >
        <StyledFormButtonText>Log out</StyledFormButtonText>
        </StyledFormButton>
    
    </StyledFormBackground>
  );
};

export default UserSettings

const styles = StyleSheet.create({})