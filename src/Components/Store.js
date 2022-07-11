import { StyleSheet, Text, View } from 'react-native';
import { StyledDokiHomeBackground, StyledHeading1 } from './styles';

const Store = () => {
  return (
    <StyledDokiHomeBackground
      source={require('../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <StyledHeading1>Store</StyledHeading1>
      <Text>Testing</Text>
    </StyledDokiHomeBackground>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
