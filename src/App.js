import { HealthKitProvider } from './Healthkit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect, useCallback } from 'react';
import useFonts from '../fonts'
import AppLoading from 'expo-app-loading';

import Home from './components/Home';
import SetGoal from './components/signUp/SetGoal';
import DokiHome from './components/dokiHome/DokiHome';
import DokiEggView from './components/dokiHome/DokiEggView';
import DokiView from './components/dokiHome/DokiView';
import Links from './components/Links';
import SelectEgg from './components/signUp/SelectEgg';
import HealthStat from './components/HealthStat';
import TabNavigator from './components/NavBar';
import LoginOptions from './components/LoginOptions';
import SignUp from './components/signUp/SignUp';
import SignIn from './components/signIn/SignIn';
import { LoginNavigator } from './navigation';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };
  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    )}
    
  return (
    <QueryClientProvider client={queryClient}>
      <HealthKitProvider>
        <NavigationContainer>
        {/* <Stack.Navigator headerMode="screen" >
      <Stack.Screen 
        name="LoginOptions" 
        component={LoginOptions} 
      />
      <Stack.Screen
        name="Login"
        component={SignIn}
      />
      <Stack.Screen
        name="Registration"
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
    </Stack.Navigator> */}
          <LoginNavigator   />
          {/* <Stack.Navigator initialRouteName="Links">
            <Stack.Screen
              name="Links"
              component={Links}
              options={{ title: 'Links Page' }}
            />
            <Stack.Screen name="SetGoal" component={SetGoal} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DokiHome" component={DokiHome} />
            <Stack.Screen name="DokiEggView" component={DokiEggView} />
            <Stack.Screen name="DokiView" component={DokiView} />
            <Stack.Screen name="SelectEgg" component={SelectEgg} />
            <Stack.Screen name="HealthStat" component={HealthStat} />
            <Stack.Screen name="LoginOptions" component={LoginOptions} />
            <Stack.Screen name="SignUp" component={SignUp} />
           <Stack.Screen name="SignIn" component={SignIn} />
          </Stack.Navigator> */}
          {/* <TabNavigator/> */}
        </NavigationContainer>
      </HealthKitProvider>
    </QueryClientProvider>
  );
}
