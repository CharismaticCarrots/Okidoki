import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useFlightsClimbed } from '../Healthkit';

const Flights = () => {

  const flights = useFlightsClimbed()


  return (
    <View style={styles.container}>
      <Text>Flights Climbed: {flights} floors</Text>
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

export default Flights;
