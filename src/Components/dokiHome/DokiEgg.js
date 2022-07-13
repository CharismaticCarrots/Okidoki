import React, { useRef } from 'react';
import { Image, Animated, Easing } from 'react-native';
import { useUserDokiData } from '../../hooks/useUserDokiData';

const eggImages = {
  "red": require('../../../assets/eggs/egg1.png'),
  "blue": require('../../../assets/eggs/egg3.png'),
  "green": require('../../../assets/eggs/egg2.png'),
};

const DokiEgg = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const UserDoki = useUserDokiData()
  console.log('DOKI', UserDoki.user_doki.eggColor)


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
        source={eggImages[UserDoki.user_doki.eggColor]}
      />
    </Animated.View>
  );
};

export default DokiEgg;
