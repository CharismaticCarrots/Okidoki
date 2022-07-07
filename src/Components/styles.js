// Index of Styled Components
import styled from 'styled-components';
import { View, Image, ImageBackground, Text } from "react-native";
import { ProgressBar } from 'react-native-paper';

// Sprite Component
const StyledSpriteContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
`;

const StyledTileContainer = styled(View)`
  display: flex;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: hidden;
  transform: scale(${({ scale }) => `${scale}, ${scale}`});
  transform-origin: top left;
`;

const StyledSpriteImage = styled(Image)`
  left: -${({ left }) => left}px;
`;

// DokiHome Component
const StyledDokiHomeBackground = styled(ImageBackground)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledDokiEggContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 50px;
  margin-top: 150px;
  margin-bottom: 50px;
  width: 300px;
  height: 300px;
`;

const StyledOuterProgressBarContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
`;

// DokiProgressBar Component
const StyledProgressBarContainer = styled(View)`
`;

const StyledProgressBar = styled(ProgressBar)`
  align-self: center;
  width: 300px;
  height: 10px;
  border: solid gray 2.5px;
  border-radius: 30px;
  background-color: gray;
`;

const StyledProgressText = styled(Text)`
  align-self: flex-end;
  font-size: 22px;
  font-weight: bold;
  padding: 5px 0px;
`;

export {
  // Sprite Component
  StyledSpriteContainer,
  StyledTileContainer,
  StyledSpriteImage,
  // DokiHome Component
  StyledDokiHomeBackground,
  StyledDokiEggContainer,
  StyledOuterProgressBarContainer,
  // DokiProgressBar Component
  StyledProgressBarContainer,
  StyledProgressBar,
  StyledProgressText,
};
