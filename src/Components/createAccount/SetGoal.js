import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const SetGoal = () => {
  return (
    <View>
      <Text>Select Your Daily Step Goal</Text>
      <TextInput placeholder="Step Goal" />
    </View>
  );
};

export default SetGoal;
