import React, { useState } from 'react';
import { View } from 'react-native';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';
import { useUserData } from '../../hooks/useUserData';

const DokiHome = ({ navigation }) => {
  const { isLoading, isError, data, error } = useUserData();
  console.log('who is logged in', data);

  const [isEgg, setEggStatus] = useState(true);
  return (
    <View>
      {isEgg ? <DokiEggView navigation={navigation} /> : <DokiView />}
    </View>
  );
};

export default DokiHome;
