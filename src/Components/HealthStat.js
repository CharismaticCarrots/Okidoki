import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Steps from './Steps';
import { useDailyStepCount } from '../Healthkit';

const HealthStat = () => {
  const dailySteps = useDailyStepCount();

  return (
    <View style={styles.container}>
      <Text>Health Stats</Text>
      <Steps />
      <View>
        {/* {weekSteps.map((day) => {
          return (
            <View>
              <Text>{day.value}</Text>
            </View>
          );
        })} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default HealthStat;
