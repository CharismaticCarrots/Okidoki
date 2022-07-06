import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

import Steps from './Steps';
import { useDailyStepCount } from '../Healthkit';

const HealthStat = () => {
  const dailySteps = useDailyStepCount();

  console.log('what is logging:', dailySteps);

  if (!dailySteps) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <View style={styles.container}>
      <Text>Health Stats</Text>
      <View>
        {dailySteps.map((day) => {
          return (
            <View>
              <Text>Day: {format(parseISO(day.startDate), 'eeeeee')}</Text>
              <Text>Steps: {day.value}</Text>
            </View>
          );
        })}
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
