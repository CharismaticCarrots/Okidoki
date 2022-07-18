import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Sprite from "../Sprite";
import images from "../../images";
import { StyledInnerDokiContainer } from "../styles";


import {    
  StyledFormBackground,
  StyledFormButton,
  StyledFormButtonText,
  StyledHealthStatHeading,
} from '../styles';
import * as SecureStore from 'expo-secure-store';
import { useUserData } from '../../hooks/useUserData';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import { AuthContext } from '../../AuthLoading';
import Doki from '../dokiHome/Doki';

const UserSettings = ({navigation}) => {
  const [userDoki, setUserDoki] = useState();
  const [dokiMood, setDokiMood] = useState('');
  const { user, logout } = useUserData();
  const { signOut } = React.useContext(AuthContext);
  const userDokiData = useUserDokiData();
  useEffect(() => {
    if (userDokiData) {
      setUserDoki(userDokiData)
      const user_doki = userDokiData.user_doki
      if (user_doki.lastFedFullnessLevel === 0 || user_doki.lastPlayedMoodLevel === 0) {
        setDokiMood('sleep');
      } else if (user_doki.lastFedFullnessLevel === 100 || user_doki.lastPlayedMoodLevel === 100) {
        setDokiMood('happy');
      }
      else {
        setDokiMood('idle');
      }
    }
  }, [userDokiData]);

  let token;
  if (user) {
    token = user.token;
  }


  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/dokihome_background4.png')}
      resizeMode="cover"
    >
      <  StyledHealthStatHeading style={{marginTop: 80, marginBottom:130}}>User Settings</  StyledHealthStatHeading>
        <StyledFormButton
           style={{ marginTop: 20, width: 250 }}
           onPress={() => {
           navigation.navigate('Change Goal')
          }}
        >
        <StyledFormButtonText style={{fontFamily: 'AntipastoBold'}}>Change Step Goal</StyledFormButtonText>
        </StyledFormButton>     
        <StyledFormButton
           style={{ marginTop: 20, width: 250 }}
           onPress={() => {
           navigation.navigate('Change Password')
          }}
        >
        <StyledFormButtonText style={{fontFamily: 'AntipastoBold'}}>Change Password</StyledFormButtonText>
        </StyledFormButton>
        <StyledFormButton
           style={{ marginTop: 20, width: 250 }}
           onPress={() => {
            logout();
            SecureStore.deleteItemAsync('TOKEN');
            signOut()
          }}
        >
        <StyledFormButtonText style={{fontFamily: 'AntipastoBold'}}>Log out</StyledFormButtonText>
        </StyledFormButton>

        {userDoki && <Doki userDoki={userDoki} dokiMood={dokiMood}/>}
    </StyledFormBackground>
  );
};

export default UserSettings
