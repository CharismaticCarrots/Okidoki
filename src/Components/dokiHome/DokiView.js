import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import {
  StyledDokiHomeBackground,
  StyledDokiContainer,
  StyledOuterProgressBarContainer,
  StyledOuterCountersContainer,
  StyledDokiName,
} from '../styles';
import DokiProgressBar from './DokiProgressBar';
import Doki from './Doki';
import CountDisplay from './CountDisplay';
import { useDailyStepCount } from '../../Healthkit';
import { useUserData } from '../../hooks/useUserData';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import intervalToDuration from 'date-fns/intervalToDuration';

const DokiView = () => {
  const [userDoki, setUserDoki] = useState();
  const [curFullnessLvl, setCurFullnessLvl] = useState(0);
  const stepCount = useDailyStepCount();
  const user = useUserData();
  const userDokiData = useUserDokiData();

  useEffect(()=> {
    if (userDokiData) {
      userDokiData.type = "fox" // Dummy data to view different sprites
      setUserDoki(userDokiData)

      const { user_doki } = userDokiData;
      const hrsSinceLastFed = Math.floor((new Date().getTime() - new Date(user_doki.lastFedAt).getTime())/(3600000))
      setCurFullnessLvl(user_doki.lastFedFullnessLevel - hrsSinceLastFed);
    }
  }, [userDokiData]);

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/dokihome_background.png')}
      resizeMode="cover"
    >
      <StyledOuterProgressBarContainer>
        <DokiProgressBar
          name="Mood"
          level={userDoki && userDoki.user_doki.lastPlayedMoodLevel}
          total={100}
        />
        <DokiProgressBar
          name="Fullness"
          level={curFullnessLvl}
          total={100}
        />
      </StyledOuterProgressBarContainer>
      <StyledOuterCountersContainer>
        <CountDisplay
          counterType={'step'}
          count={stepCount}
          goalCount={user && user.dailyStepGoal}
        />
        <CountDisplay counterType={'carrot'} count={user && user.carrotCount} />
      </StyledOuterCountersContainer>
      <StyledDokiContainer>
        {userDoki && <Doki userDoki={userDoki} />}
        <StyledDokiName>{userDokiData && userDokiData.user_doki.dokiName}</StyledDokiName>
      </StyledDokiContainer>
      <Button onPress={() => console.log("om nom nom")} mode="contained">
        Feed Doki
      </Button>
    </StyledDokiHomeBackground>
  );
};

export default DokiView;
