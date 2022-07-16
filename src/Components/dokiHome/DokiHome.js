import { useState, useCallback } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';
import { useUserData } from '../../hooks/useUserData';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import { useTotalStepCount } from '../../Healthkit';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DokiHome = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const hatchProgressData = getHatchProgress(now);

  // const hatchProgressData = getHatchProgress(now);
  const isEgg = hatchProgressData.hatchProgress < 1;
  // const isEgg = false; // FOR TESTING: Uncomment this to see Doki instead of DokiEgg
  const now = currentDate.toISOString();

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
            now={now}
            hatchProgressData={hatchProgressData}
          />
        ) : (
          <DokiView now={now} />
        )}
      </View>
    </ScrollView>
  );

  function getHatchProgress(now) {
    const userDoki = useUserDokiData();
    const { user } = useUserData();

    let dokiCreatedDate = null;

    if (userDoki) {
      dokiCreatedDate = userDoki.user_doki.createdAt;
      // console.log('DOKI CREATED DATE:', new Date(dokiCreatedDate).toLocaleString('en-US'));
    }

    const totalSteps = useTotalStepCount(dokiCreatedDate, now);

    if (userDoki && user) {
      const { dailyStepGoal } = user;
      const hatchProgress = totalSteps / dailyStepGoal;

      return {
        hatchProgress,
        totalSteps,
        dailyStepGoal,
      };
    } else {
      return {};
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#134845',
  },
});

export default DokiHome;
