import { HealthKitProvider } from './Healthkit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useFonts } from 'expo-font';
import { LoginNavigator } from './navigation';
import notifee from '@notifee/react-native';

const queryClient = new QueryClient();

export default function App() {
  notifee.requestPermission();

  let [fontsLoaded] = useFonts({
    Singularity: require('../assets/fonts/singularity.ttf'),
    Antipasto: require('../assets/fonts/Antipasto.ttf'),
    AntipastoBold: require('../assets/fonts/Antipasto-Bold.ttf'),
    FredokaOne: require('../assets/fonts/FredokaOne.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HealthKitProvider>
        <LoginNavigator />
      </HealthKitProvider>
    </QueryClientProvider>
  );
}
