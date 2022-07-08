import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../../../secrets.js';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SetGoal = ({ navigation }) => {
  const [stepGoal, setStepGoal] = useState('0');
  const mutation = useMutation(
    (stepGoal) => {
      return axios.put(
        `http://${API_URL}/api/user`,
        { stepGoal },
        {
          headers: { Authorization: '1234' },
        }
      );
    },
    {
      onSuccess: () => {
        navigation.navigate('SelectEgg');
      },
    }
  );

  const handleSubmit = async () => {
    mutation.mutate(stepGoal);
  };

  return (
    <View>
      <Text>Select Your Daily Step Goal</Text>
      <TextInput
        placeholder="Step Goal"
        value={stepGoal}
        onChangeText={setStepGoal}
      />
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
