import React, { useState, useEffect, useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangeGoal from './userSettings/ChangeGoal';
import UserSettings from './userSettings/UserSettings';
import ChangePassword from './userSettings/ChangePassword';

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="User Settings" component={UserSettings} options={{ headerShown: false }}/>
      <Stack.Screen name="Change Goal" component={ChangeGoal} options={{ headerShown: false }} />
      <Stack.Screen name="Change Password" component={ChangePassword} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default SettingsNavigator