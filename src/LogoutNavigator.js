import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOptions from './components/LoginOptions';
import Logout from './components/signIn/Logout';
import SignIn from './components/signIn/SignIn';
import DokiPack from './components/dokiPack/DokiPack';
import Links from './components/Links';

const Stack = createNativeStackNavigator()

export const LogOutNavigator = ({navigation}) => {
  return (
    <Stack.Navigator 
    headerMode="screen"   
    >
      <Stack.Screen
        name="Links"
        component={Links}
      />
         <Stack.Screen
        name="DokiPack"
        component={DokiPack}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ tabBarLabel: 'Logout Screen' }}
      />
      <Stack.Screen
        name="LoginOptions"
        headerShown = 'false'
        component={LoginOptions}
      />
      <Stack.Screen
        name="SignIn"
        headerShown = 'false'
        component={SignIn}
      />
    </Stack.Navigator>
  )
}