import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useDailyStepCount } from '../Healthkit';

const Steps = () => {
  const steps = useDailyStepCount();
  return (
    <View style={styles.container}>
      <Text>Steps: {steps}</Text>
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
