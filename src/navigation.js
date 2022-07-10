import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home'
import SetGoal from './components/signUp/SetGoal'
import SelectEgg from './components/signUp/SelectEgg';
import SignUp from './components/signUp/SignUp';
import SignIn from './components/signIn/SignIn';
import LoginOptions from './components/LoginOptions';

const Stack = createNativeStackNavigator()

export const LoginNavigator = ({navigation}) => {

  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen 
        name="LoginOptions" 
        component={LoginOptions} 
        options={({ navigation }) => ({
          headerShown: false
        })}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen 
        name="SetGoal" 
        component={SetGoal} 
      />
      <Stack.Screen 
        name="SelectEgg" 
        component={SelectEgg} 
      />
    </Stack.Navigator>
  )
}