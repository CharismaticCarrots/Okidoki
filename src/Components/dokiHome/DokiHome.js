import React, { useState } from "react";
import { View } from "react-native";
import { Button } from 'react-native-paper';
import { StyledDokiHomeBackground, StyledDokiEggContainer, StyledOuterProgressBarContainer } from '../styles';
import DokiProgressBar from "./DokiProgressBar";
import DokiEgg from "./DokiEgg";
import Doki from "./Doki";

const DokiHome = () => {
  const [isEgg, setEggStatus] = useState(true);
  const [doki, setDoki] = useState({type: "bunny"});
  const randomDoki = ["fox", "cat", "bunny"][Math.floor(Math.random() * 3)];

  return (
    <View>
      <StyledDokiHomeBackground source={require("../../../assets/dokihome_background.png")} resizeMode="cover">
        { isEgg ?
          <StyledOuterProgressBarContainer>
            <DokiProgressBar name="Hatch" progress={0.75}/>
          </StyledOuterProgressBarContainer>
          :
          <StyledOuterProgressBarContainer>
            <DokiProgressBar name="Mood" progress={0.75}/>
            <DokiProgressBar name="Hunger" progress={0.75}/>
          </StyledOuterProgressBarContainer>
        }
        <StyledDokiEggContainer>
          {isEgg ? <DokiEgg /> : <Doki doki={doki}/>}
        </StyledDokiEggContainer>
        {
          isEgg ?
          <Button onPress={() => setEggStatus(false) } mode='contained'>
            Hatch
          </Button>
          :
          <Button onPress={() => setDoki({type: randomDoki}) } mode='contained'>
            Change Doki
          </Button>
        }
      </StyledDokiHomeBackground>
    </View>
  );
};

export default DokiHome;
