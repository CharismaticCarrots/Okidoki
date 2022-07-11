import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';
import { getHatchProgress } from '../../helpers/getHatchProgress';

const DokiHome = ({ navigation }) => {
  const hatchProgressData = getHatchProgress();
  const isEgg = hatchProgressData.hatchProgress < 1;
  // const isEgg = false;

  return (
    <View>
      {isEgg ?
      <DokiEggView
        navigation={navigation}
        hatchProgressData={hatchProgressData}
      /> :
      <DokiView
      />}
    </View>
  );
};

export default DokiHome;
