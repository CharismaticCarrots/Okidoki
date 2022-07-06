// Index of Styled Components
import styled from 'styled-components';
import { View, Image, ImageBackground } from "react-native";

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

export {
  // Sprite Component
  StyledSpriteContainer,
  StyledTileContainer,
  StyledSpriteImage,
  // DokiHome component
  StyledDokiHomeBackground,
  StyledDokiEggContainer,
};
