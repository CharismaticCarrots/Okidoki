import { HealthKitProvider } from './Healthkit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import useFonts from '../fonts';
import AppLoading from 'expo-app-loading';

import { LoginNavigator } from './navigation';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const [doki, setUserDoki] = useState(null);

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
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HealthKitProvider>
        <LoginNavigator />
      </HealthKitProvider>
    </QueryClientProvider>
  );
}
