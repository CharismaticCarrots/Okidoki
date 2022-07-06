import React from "react";
import { View, Text, ImageBackground } from "react-native";
import styled from "styled-components";

const StyledImageBackground = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DokiHome = () => {
  return (
    <View>
      <StyledImageBackground source={require("../../assets/dokihome_background.png")} resizeMode="cover">
      <Text>THIS IS THE DOKIHOME</Text>
      </StyledImageBackground>
    </View>
  );
};

export default DokiHome;
