import { HealthKitProvider } from './Healthkit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home';
import SetGoal from './components/createAccount/SetGoal';
import Links from './components/Links';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HealthKitProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Links">
            <Stack.Screen
              name="Links"
              component={Links}
              options={{ title: 'Links Page' }}
            />
            <Stack.Screen name="SetGoal" component={SetGoal} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </HealthKitProvider>
    </QueryClientProvider>
  );
}
