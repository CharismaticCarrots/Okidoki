import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useStepCount } from '../Healthkit';

const Steps = () => {
  const steps = useStepCount();
  return (
    <View style={styles.container}>
      <Text>Steps: {steps}</Text>
      <Text>Test</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Steps;
