import React, { useCallback, useEffect, useState } from 'react';
import { HealthKitProvider } from './Healthkit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Fonts
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
// Components
import Home from './components/Home';
import SetGoal from './components/signUp/SetGoal';
import DokiHome from './components/dokiHome/DokiHome';
import DokiEggView from './components/dokiHome/DokiEggView';
import DokiView from './components/dokiHome/DokiView';
import Links from './components/Links';
import SelectEgg from './components/signUp/SelectEgg';
import HealthStat from './components/HealthStat';
import LoginOptions from './components/LoginOptions';
import SignUp from './components/signUp/SignUp';
import SignIn from './components/signIn/SignIn';
import Logout from './components/signIn/Logout';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Singularity: require('../assets/fonts/Singularity.ttf'),
          Antipasto: require('../assets/fonts/Antipasto.ttf'),
          AntipastoBold: require('../assets/fonts/Antipasto-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HealthKitProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Links">
            <Stack.Screen
              onLayout={onLayoutRootView}
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
            <Stack.Screen name="Logout" component={Logout} />
          </Stack.Navigator>
        </NavigationContainer>
      </HealthKitProvider>
    </QueryClientProvider>
  );
}
