import { StyleSheet, View, Text } from 'react-native';
import Steps from './Steps';
import Sprite from './Sprite';
import { useUserData } from '../hooks/useUserData';

const Home = () => {
  const { isLoading, isError, data: user, error } = useUserData();

  return (
    <View style={styles.container}>
      <Sprite
        src={require('../../assets/catSprites/cat.png')}
        totalSprites={6}
        tile={{ width: 127, height: 90 }}
        scale={3}
        framesPerSprite={15}
      />
      <Steps />
      <Text>
        {isLoading ? 'Loading..' : `Name: ${user.firstName}`}
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
