import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Steps from './Steps';
import Sprite from './Sprite';
import { useDitto } from '../hooks/useDitto';

const Home = ({ navigation }) => {
  const { isLoading, isError, data: ditto, error } = useDitto();

  return (
    <View style={styles.container}>
      <Sprite
        src={require('../../assets/catSprites/cat-eat.png')}
        totalSprites={6}
        tile={{ width: 127, height: 90 }}
        scale={3}
        framesPerSprite={15}
      />
      <Text>
        {isLoading ? 'Loading..' : `Name: ${ditto.abilities[0].ability.name}`}
      </Text>
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
