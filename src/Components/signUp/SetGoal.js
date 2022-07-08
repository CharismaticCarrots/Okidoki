import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StyledContainer, StyledHeading1 } from '../styles';

const SetGoal = ({ navigation }) => {
  const handleSubmit = async () => {
    navigation.navigate('SelectEgg');
  };

  return (
    <StyledContainer>
      <StyledHeading1>Select Your Daily Step Goal</StyledHeading1>
      <TextInput placeholder="Step Goal" />
      <Button
        mode="contained"
        onPress={() => {
          handleSubmit();
        }}
      >
        SUBMIT
      </Button>
    </StyledContainer>
  );
};

export default SetGoal;
