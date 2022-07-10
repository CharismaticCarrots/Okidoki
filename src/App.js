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

import TabNavigator from './components/NavBar';
import { LoginNavigator } from './navigation';
import { useUserDokiData } from './hooks/useUserDokiData';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const [doki, setUserDoki] = useState(null)
  
  // const userDoki = useUserDokiData()
  // useEffect(() => {
 
  //   if (userDoki){
  //     setUserDoki(userDoki)
  //   }
  // }, [])

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
    
          <LoginNavigator  />
        
      </HealthKitProvider>
    </QueryClientProvider>
  );
}
