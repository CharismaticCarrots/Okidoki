import {
  StyledDokiHomeBackground,
  StyledDokiEggContainer,
  StyledOuterProgressBarContainer,
  StyledOuterCountersContainer,
  StyledDokiName,
} from '../styles';
import React, { useState, useCallback } from 'react';

import { Button } from 'react-native-paper';
import DokiProgressBar from './DokiProgressBar';
import DokiEgg from './DokiEgg';
import CountDisplay from './CountDisplay';
import { useUserDokiData } from '../../hooks/useUserDokiData';

const DokiEggView = ({ navigation, hatchProgressData }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { hatchProgress, totalSteps, dailyStepGoal } = hatchProgressData;
  const userDokiData = useUserDokiData();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/dokihome_background.png')}
      resizeMode="cover"
    >
      <StyledOuterProgressBarContainer>
        <DokiProgressBar name="Hatch" progress={hatchProgress} />
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
      <Button onPress={() => navigation.navigate('DokiView')} mode="contained">
        Hatch
      </Button>
    </StyledDokiHomeBackground>
  );
};

export default DokiEggView;
