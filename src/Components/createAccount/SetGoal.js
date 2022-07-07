import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SetGoal = ({navigation}) => {

  const handleSubmit = async () => {
    navigation.navigate('SelectEgg');
  };

  return (
    <View>
      <Text>Select Your Daily Step Goal</Text>
      <TextInput placeholder="Step Goal" />
      <Button
        mode="contained"
        onPress={() => {
          handleSubmit();
        }}
      >
        SUBMIT
      </Button>
    </View>
  );
};

export default SetGoal;
