import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StyledContainer, StyledHeading1 } from '../styles';
import { useUserData } from '../../hooks/useUserData';

import { API_URL } from '../../../secrets.js';

const SetGoal = ({ navigation }) => {
  const [dailyStepGoal, setDailyStepGoal] = useState('10000');

  const { user } = useUserData();
  let token;
  if (user) {
    token = user.token;
  }
  console.log('User on SetGoal: ', user);

  const mutation = useMutation(
    (dailyStepGoal) => {
      return axios.put(
        `http://${API_URL}/api/user`,
        { dailyStepGoal },
        {
          headers: { authorization: token },
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
    mutation.mutate(dailyStepGoal);
  };

  return (
    <StyledContainer style={styles.background}>
      <StyledHeading1>Set Your Daily Step Goal</StyledHeading1>
      <TextInput
        left={<TextInput.Icon name={'shoe-print'} />}
        style={styles.input}
        placeholder="Example: 10,000"
        value={dailyStepGoal}
        onChangeText={setDailyStepGoal}
      />
      <View>
        <Button
          style={styles.button}
          mode="contained"
          color="#DDBB67"
          onPress={() => {
            handleSubmit();
          }}
        >
          SUBMIT
        </Button>
      </View>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#4FA4B8',
    height: '100%',
  },
  button: {
    margin: 10,
  },
  input: {
    margin: 10,
  },
});

export default SetGoal;
