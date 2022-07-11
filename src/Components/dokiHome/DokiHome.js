import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import DokiEggView from './DokiEggView';
import DokiView from './DokiView';
import { useHatchProgress } from '../../helpers/useHatchProgress';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DokiHome = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const now = currentDate.toISOString();
  const hatchProgressData = useHatchProgress(now);
  const isEgg = hatchProgressData.hatchProgress < 1;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentDate(new Date());
    console.log(new Date());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        {isEgg ? (
          <DokiEggView
            navigation={navigation}
            hatchProgressData={hatchProgressData}
          />
        ) : (
          <DokiView now={now} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#4fa4b8',
  },
});

export default DokiHome;
