import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';
import { useHatchProgress } from '../../hooks/useHatchProgress';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DokiHome = ({ navigation }) => {
  const hatchProgressData = useHatchProgress();
  const isEgg = hatchProgressData.hatchProgress < 1;

  return (
    <View>
      {isEgg ? (
        <DokiEggView
          navigation={navigation}
          hatchProgressData={hatchProgressData}
        />
      ) : (
        <DokiView />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    heigth: Dimensions.get('screen').height,
    backgroundColor: '#4fa4b8',
  },
});

export default DokiHome;
