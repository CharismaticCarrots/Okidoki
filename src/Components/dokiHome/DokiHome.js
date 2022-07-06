import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import { Button } from 'react-native-paper';
import styled from "styled-components";
import DokiEgg from "./DokiEgg";
import Doki from "./Doki";

const StyledImageBackground = styled(ImageBackground)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledDokiEggContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
  width: 300px;
  height: 300px;
`;

const DokiHome = () => {
  const [isEgg, setEggStatus] = useState(true); // Dummy data
  return (
    <View>
      <StyledImageBackground source={require("../../../assets/dokihome_background.png")} resizeMode="cover">
        <StyledDokiEggContainer>
          {isEgg ? <DokiEgg /> : <Doki />}
        </StyledDokiEggContainer>
        <Button onPress={() => setEggStatus(false) } mode='contained'>
          Hatch
        </Button>
      </StyledImageBackground>
    </View>
  );
};

export default DokiHome;
