import React from 'react';
import { View } from 'react-native';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';
import { useHatchProgress } from '../../hooks/useHatchProgress';

const DokiHome = ({ navigation }) => {
  const { hatchProgress } = useHatchProgress();

  return (
    <View>
      {(hatchProgress < 1) ? <DokiEggView navigation={navigation} /> : <DokiView />}
    </View>
  );
};

export default DokiHome;
