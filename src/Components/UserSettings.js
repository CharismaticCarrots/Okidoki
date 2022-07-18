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

const UserSettings = ({navigation}) => {
  const { user, logout } = useUserData();
  const { signOut } = React.useContext(AuthContext);
  let token;
  if (user) {
    token = user.token;
  }

  

  return (
    <StyledFormBackground
      source={require('../../assets/backgrounds/dokihome_background4.png')}
      resizeMode="cover"
    >
      <  StyledHealthStatHeading style={{marginVertical: 100}}>User Settings</  StyledHealthStatHeading>
 
    
        
        
        <StyledFormButton
           style={{ marginTop: 20, width: 150 }}
           onPress={() => {
           navigation.navigate('Change Goal')
          }}
        >
        <StyledFormButtonText>Change Goal</StyledFormButtonText>
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