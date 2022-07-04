import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { HealthKitProvider } from './Healthkit';
import Steps from './Components/Steps';

export default function App() {
  return (
    <HealthKitProvider>
      <Steps />
    </HealthKitProvider>
  );
}
