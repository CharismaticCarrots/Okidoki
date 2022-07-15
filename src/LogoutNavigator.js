import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOptions from './components/LoginOptions';
import SignUp from './components/signUp/SignUp';
import SignIn from './components/signIn/SignIn';
import SelectEgg from './components/signUp/SelectEgg';
import SetGoal from './components/signUp/SetGoal';

const Stack = createNativeStackNavigator()

export const LogOutNavigator = ({navigation}) => {
  return (
    <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="LoginOptions"
      component={LoginOptions}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SetGoal"
      options={{ headerShown: false }}
      component={SetGoal}
    />
    <Stack.Screen
      name="SelectEgg"
      options={{ headerShown: false }}
      component={SelectEgg}
    />
    <Stack.Screen
      name="DokiHome"
      options={{ headerShown: false }}
      component={DokiHome}
    />
    <Stack.Screen
      name="Store"
      options={{ headerShown: false }}
      component={Store}
    />
  </Stack.Navigator>
  )
}