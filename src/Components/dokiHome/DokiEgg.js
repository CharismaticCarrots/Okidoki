import React, { useRef } from 'react';
import { Image, Animated, Easing} from 'react-native';

const DokiEgg = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(
      rotateAnim,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )
  ).start();

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-3deg', '0deg']
  });

  return (
    <Animated.View style={ { transform: [{rotate: rotate}], marginTop: 100 } } >
      <Image style={{height: 200, width: 200}} source={require('../../../assets/egg.png')} />
    </Animated.View>
  )
};

export default DokiEgg;
