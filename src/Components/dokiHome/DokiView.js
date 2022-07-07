import React, { useState } from "react";
import { Button } from 'react-native-paper';
import { StyledDokiHomeBackground, StyledDokiEggContainer, StyledOuterProgressBarContainer, StyledOuterCountersContainer } from '../styles';
import DokiProgressBar from "./DokiProgressBar";
import Doki from "./Doki";
import CarrotCount from "./CarrotCount";

const DokiView = () => {
  const [doki, setDoki] = useState({type: "bunny"});
  const randomDoki = ["fox", "cat", "bunny"][Math.floor(Math.random() * 3)];
  const [carrotCount, setCarrotCount] = useState(20);

  return (
    <StyledDokiHomeBackground source={require("../../../assets/dokihome_background.png")} resizeMode="cover">
    <StyledOuterProgressBarContainer>
      <DokiProgressBar name="Mood" progress={0.75}/>
      <DokiProgressBar name="Hunger" progress={0.75}/>
    </StyledOuterProgressBarContainer>
    <StyledOuterCountersContainer>
      <CarrotCount />
      <CarrotCount carrotCount={carrotCount}/>
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
