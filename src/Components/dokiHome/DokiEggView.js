import React, { useState, useCallback } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import { Button } from 'react-native-paper';

import {
  StyledDokiHomeBackground,
  StyledDokiEggContainer,
  StyledOuterProgressBarContainer,
  StyledOuterCountersContainer,
  StyledDokiName,
} from '../styles';

import DokiProgressBar from './DokiProgressBar';
import DokiEgg from './DokiEgg';
import CountDisplay from './CountDisplay';
import { useUserDokiData } from '../../hooks/useUserDokiData';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DokiEggView = ({ navigation, hatchProgressData }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { hatchProgress, totalSteps, dailyStepGoal } = hatchProgressData;

  const userDokiData = useUserDokiData();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StyledDokiHomeBackground
          source={require('../../../assets/backgrounds/dokihome_background.png')}
          resizeMode="cover"
        >
          <StyledOuterProgressBarContainer>
            <DokiProgressBar
              name="Hatch"
              level={totalSteps}
              total={dailyStepGoal}
            />
          </StyledOuterProgressBarContainer>
          <StyledOuterCountersContainer>
            <CountDisplay
              counterType={'step'}
              count={totalSteps}
              goalCount={dailyStepGoal}
            />
          </StyledOuterCountersContainer>
          <StyledDokiEggContainer>
            <DokiEgg />
            <StyledDokiName>
              {userDokiData && userDokiData.user_doki.dokiName}
            </StyledDokiName>
          </StyledDokiEggContainer>
          <Button
            onPress={() => navigation.navigate('DokiView')}
            mode="contained"
          >
            Hatch
          </Button>
        </StyledDokiHomeBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DokiEggView;
