import React from 'react';
import { View } from 'react-native';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';
import { useHatchProgress } from '../../hooks/useHatchProgress';
import { useUserDokiData } from '../../hooks/useUserDokiData';

const DokiHome = ({ navigation }) => {
  const hatchProgressData = useHatchProgress();
  const isEgg = hatchProgressData.hatchProgress < 1;

  const userDoki = useUserDokiData();

  console.log("USER DOKI", userDoki)

  return (
    <View>
      {isEgg ?
      <DokiEggView
        navigation={navigation}
        hatchProgressData={hatchProgressData}
      /> :
      <DokiView />}
    </View>
  );
};

export default DokiHome;
