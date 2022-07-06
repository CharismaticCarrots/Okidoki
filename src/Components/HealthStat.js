import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Steps from './Steps';

const HealthStat = () => {
  return (
    <View style={styles.container}>
      <Text>Health Stats</Text>
      <Steps />
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
