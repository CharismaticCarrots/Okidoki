import React from 'react';
import { View } from 'react-native';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';
import { useHatchProgress } from '../../hooks/useHatchProgress';
import { useUserDokiData } from '../../hooks/useUserDokiData';

const DokiHome = ({ navigation }) => {
  const hatchProgressData = useHatchProgress();
  const isEgg = hatchProgressData.hatchProgress < 1;
  // const isEgg = false;

  const userDokiData = useUserDokiData();

  console.log("DOKI HOME", userDokiData);

  return (
    <View>
      {isEgg ?
      <DokiEggView
        navigation={navigation}
        hatchProgressData={hatchProgressData}
        userDokiData={userDokiData}
      /> :
      <DokiView
      userDokiData={userDokiData}
      />}
    </View>
  );
};

export default DokiHome;
