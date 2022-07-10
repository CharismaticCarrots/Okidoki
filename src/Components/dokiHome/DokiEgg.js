import React, { useRef } from 'react';
import { Image, Animated, Easing } from 'react-native';

const DokiEgg = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  // Animated.loop(
  //   Animated.timing(
  //     rotateAnim,
  //     {
  //       toValue: 1,
  //       duration: 3000,
  //       easing: Easing.linear,
  //       useNativeDriver: true
  //     }
  //   )
  // ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 1300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-2deg', '2deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }], marginTop: 100 }}>
      <Image
        style={{ height: 200, width: 200 }}
        source={require('../../../assets/egg.png')}
      />
    </Animated.View>
  );
};

export default DokiEgg;
