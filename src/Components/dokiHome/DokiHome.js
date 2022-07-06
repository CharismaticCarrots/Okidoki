import React, { useState } from "react";
import { View } from "react-native";
import { Button } from 'react-native-paper';
import { StyledDokiHomeBackground, StyledDokiEggContainer } from '../styles';
import DokiEgg from "./DokiEgg";
import Doki from "./Doki";

const DokiHome = () => {
  const [isEgg, setEggStatus] = useState(true); // Dummy data
  return (
    <View>
      <StyledDokiHomeBackground source={require("../../../assets/dokihome_background.png")} resizeMode="cover">
        <StyledDokiEggContainer>
          {isEgg ? <DokiEgg /> : <Doki />}
        </StyledDokiEggContainer>
        <Button onPress={() => setEggStatus(false) } mode='contained'>
          Hatch
        </Button>
      </StyledDokiHomeBackground>
    </View>
  );
};

export default DokiHome;
