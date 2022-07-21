import { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
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
