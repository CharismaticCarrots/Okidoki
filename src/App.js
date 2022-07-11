import React from 'react';
import { HealthKitProvider } from './Healthkit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import AppLoading from './components/AppLoading';
import { LoginNavigator } from './navigation';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Singularity: require('../assets/fonts/singularity.ttf'),
    Antipasto: require('../assets/fonts/Antipasto.ttf'),
    AntipastoBold: require('../assets/fonts/Antipasto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HealthKitProvider>
        <LoginNavigator />
      </HealthKitProvider>
    </QueryClientProvider>
  );
}
