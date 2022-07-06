import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const SetGoal = () => {
  return (
    <View style={styles.container}>
      <Text>Select Your Daily Step Goal</Text>
      <TextInput placeholder="Step Goal" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {},
});

export default SetGoal;
