import React, { useState } from 'react';
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

const DokiView = ({userDoki}) => {
  const [doki, setDoki] = useState({ type: 'bunny' });

  const randomDoki = ['fox', 'cat', 'bunny'][Math.floor(Math.random() * 3)];

  const stepCount = useDailyStepCount();
  const user = useUserData();

  console.log("USER DOKI", userDoki)

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/dokihome_background.png')}
      resizeMode="cover"
    >
      <StyledOuterProgressBarContainer>
        <DokiProgressBar name="Mood" progress={0.75} />
        <DokiProgressBar name="Hunger" progress={0.75} />
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
        <Doki doki={doki} />
        <StyledDokiName>{userDoki && userDoki.dokiName}</StyledDokiName>
      </StyledDokiContainer>
      <Button onPress={() => setDoki({ type: randomDoki })} mode="contained">
        Change Doki
      </Button>
    </StyledDokiHomeBackground>
  );
};

export default DokiView;
