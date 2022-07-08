import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StyledContainer, StyledHeading1 } from '../styles';

const SetGoal = ({ navigation }) => {
  const handleSubmit = async () => {
    navigation.navigate('SelectEgg');
  };

  return (
    <StyledContainer style={styles.background}>
      <StyledHeading1>Set Your Daily Step Goal</StyledHeading1>
      <TextInput
        left={<TextInput.Icon name={'shoe-print'} />}
        style={styles.input}
        placeholder="Example: 10,000"
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
