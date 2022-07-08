import React, { useState } from "react";
import { Button } from 'react-native-paper';
import { StyledDokiHomeBackground, StyledDokiEggContainer, StyledOuterProgressBarContainer, StyledOuterCountersContainer } from '../styles';
import DokiProgressBar from "./DokiProgressBar";
import Doki from "./Doki";
import CountDisplay from "./CountDisplay";
import { useStepCount } from '../../Healthkit';

const DokiView = () => {
  const [doki, setDoki] = useState({type: "bunny"});
  const [carrotCount, setCarrotCount] = useState(20);
  const [stepGoal, setStepGoal] = useState(5000);

  const randomDoki = ["fox", "cat", "bunny"][Math.floor(Math.random() * 3)];
  const stepCount = useStepCount();

  return (
    <StyledDokiHomeBackground source={require("../../../assets/dokihome_background.png")} resizeMode="cover">
    <StyledOuterProgressBarContainer>
      <DokiProgressBar name="Mood" progress={0.75}/>
      <DokiProgressBar name="Hunger" progress={0.75}/>
    </StyledOuterProgressBarContainer>
    <StyledOuterCountersContainer>
      <CountDisplay counterType={"step"} count={stepCount} goalCount={stepGoal}/>
      <CountDisplay counterType={"carrot"} count={carrotCount}/>
    </StyledOuterCountersContainer>
    <StyledDokiEggContainer>
      <Doki doki={doki}/>
    </StyledDokiEggContainer>
      <Button onPress={() => setDoki({type: randomDoki}) } mode='contained'>
        Change Doki
      </Button>
  </StyledDokiHomeBackground>
  );
};

export default DokiView;
