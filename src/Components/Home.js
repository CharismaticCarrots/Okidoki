import { StyleSheet, View } from 'react-native';
import Steps from './Steps';
import Sprite from './Sprite';

const Home = () => {
  return (
    <View style={styles.container}>
      <Sprite
        src={require('../../assets/catSprites/cat.png')}
        totalSprites={6}
        tile={{ width: 128, height: 90 }}
        scale={3}
        framesPerSprite={15}
      />
      <Steps />
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
