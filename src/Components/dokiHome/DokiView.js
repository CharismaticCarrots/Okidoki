import React, { useState } from 'react';
import { Button } from 'react-native-paper';
<<<<<<< HEAD
import {
  StyledDokiHomeBackground,
  StyledDokiEggContainer,
  StyledOuterProgressBarContainer,
  StyledOuterCountersContainer,
} from '../styles';
import DokiProgressBar from './DokiProgressBar';
import Doki from './Doki';
import CountDisplay from './CountDisplay';
import { useStepCount } from '../../Healthkit';
=======
import { StyledDokiHomeBackground, StyledDokiEggContainer, StyledOuterProgressBarContainer, StyledOuterCountersContainer } from '../styles';
import DokiProgressBar from "./DokiProgressBar";
import Doki from "./Doki";
import CountDisplay from "./CountDisplay";
import { useDailyStepCount } from '../../Healthkit';
>>>>>>> main
import { useUserData } from '../../hooks/useUserData';

const DokiView = () => {
  const [doki, setDoki] = useState({ type: 'bunny' });

<<<<<<< HEAD
  const randomDoki = ['fox', 'cat', 'bunny'][Math.floor(Math.random() * 3)];
  const stepCount = useStepCount();
=======
  const randomDoki = ["fox", "cat", "bunny"][Math.floor(Math.random() * 3)];
>>>>>>> main

  const stepCount = useDailyStepCount();
  const user = useUserData();

  return (
<<<<<<< HEAD
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
          goalCount={isLoading || isError ? 0 : user.dailyStepGoal}
        />
        <CountDisplay
          counterType={'carrot'}
          count={isLoading || isError ? 0 : user.carrotCount}
        />
      </StyledOuterCountersContainer>
      <StyledDokiEggContainer>
        <Doki doki={doki} />
      </StyledDokiEggContainer>
      <Button onPress={() => setDoki({ type: randomDoki })} mode="contained">
=======
    <StyledDokiHomeBackground source={require("../../../assets/dokihome_background.png")} resizeMode="cover">
    <StyledOuterProgressBarContainer>
      <DokiProgressBar name="Mood" progress={0.75}/>
      <DokiProgressBar name="Hunger" progress={0.75}/>
    </StyledOuterProgressBarContainer>
    <StyledOuterCountersContainer>
      <CountDisplay counterType={"step"} count={stepCount} goalCount={user && user.dailyStepGoal}/>
      <CountDisplay counterType={"carrot"} count={user && user.carrotCount}/>
    </StyledOuterCountersContainer>
    <StyledDokiEggContainer>
      <Doki doki={doki}/>
    </StyledDokiEggContainer>
      <Button onPress={() => setDoki({type: randomDoki}) } mode='contained'>
>>>>>>> main
        Change Doki
      </Button>
    </StyledDokiHomeBackground>
  );
};

export default DokiView;
