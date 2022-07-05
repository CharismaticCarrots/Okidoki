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
        src={require('../../assets/sprite.png')}
        totalSprites={4}
        tile={{ width: 20, height: 24 }}
        scale={2}
        framesPerSprite={8}
      />
      <Text>
        {isLoading ? 'Loading..' : `Name: ${ditto.abilities[0].ability.name}`}
      </Text>
      <Steps />
      <Button
        title="set goal"
        onPress={() => {
          navigation.navigate('SetGoal');
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
