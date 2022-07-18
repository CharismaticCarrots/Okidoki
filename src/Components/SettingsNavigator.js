import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ChangeGoal from './ChangeGoal';
import UserSettings from './UserSettings';

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User Settings" component={UserSettings} options={{ headerShown: false }}/>
      <Stack.Screen name="Change Goal" component={ChangeGoal} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Change Password" component={ChangePassword} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
  )
}

export default SettingsNavigator

const styles = StyleSheet.create({})