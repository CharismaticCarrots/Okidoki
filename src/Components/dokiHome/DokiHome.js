import { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useQueryClient } from 'react-query';
import { useHatchProgress } from '../../hooks/useHatchProgress';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DokiHome = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const hatchProgressData = useHatchProgress(now);
  const userDoki = useUserDokiData();
  const userDokiMutation = useUpdateUserDoki();
  const queryClient = useQueryClient();
  const now = currentDate.toISOString();

  // const isEgg = hatchProgressData.hatchProgress < 1;
  // const isEgg = false; // FOR TESTING: Uncomment this to see Doki instead of DokiEgg

  console.log(hatchProgressData)

  useEffect(() => {
    console.log("USE EFFECT RAN")
    if (hatchProgressData.hatchProgress && userDoki) {
      const isEggNow = hatchProgressData.hatchProgress < 1;
      if (userDoki.user_doki.isEgg && !isEggNow) {
        console.log("IS IT AN EGG IN THE DATABASE", userDoki.user_doki.isEgg)
        console.log("IS IT AN EGG NOW", isEggNow)

        userDokiMutation.mutate({
          isEgg: false
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries(['userDoki']);
          }
        });
      }
    }
  }, [hatchProgressData, userDoki])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentDate(new Date());
    queryClient.invalidateQueries();
    wait(2000).then(() => setRefreshing(false));
  }, [queryClient]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#134845' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        { userDoki && userDoki.user_doki.isEgg ? (
          <DokiEggView now={now} hatchProgressData={hatchProgressData} />
        ) : (
          <DokiView now={now} />
        )}
      </View>
    </ScrollView>
  );
};

export default DokiHome;
