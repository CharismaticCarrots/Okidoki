import { useState, useCallback } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useQueryClient } from 'react-query';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import DokiEggView from './DokiEggView';
import DokiView from './DokiView';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DokiHome = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const userDoki = useUserDokiData();
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
          <DokiEggView now={now} />
        ) : (
          <DokiView now={now} />
        )}
      </View>
    </ScrollView>
  );
};

export default DokiHome;
