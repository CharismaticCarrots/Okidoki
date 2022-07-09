import React, { useState } from 'react';
import { View } from 'react-native';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';

const DokiHome = ({ navigation }) => {
  const [isEgg, setEggStatus] = useState(true);
  return (
    <View>
      {isEgg ? <DokiEggView navigation={navigation} /> : <DokiView />}
    </View>
  );
};

export default DokiHome;
