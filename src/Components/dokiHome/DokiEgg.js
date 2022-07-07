import React, { useRef } from 'react';
import { StyleSheet, Image, Animated, Easing} from 'react-native';

const DokiEgg = () => {
  // spinValue = new Animated.Value(0);
  const spinAnim = useRef(new Animated.Value(0)).current;

  Animated.loop(
  Animated.timing(
      spinAnim,
    {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    }
  )).start()

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-5deg', '5deg']
  });

  return (
    <Animated.View style={ {transform: [{rotate: spin}] } } >
      <Image style={styles.image} source={require('../../../assets/egg.png')} />
    </Animated.View>
  )
};

export default DokiEgg;

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 100
  }
});
