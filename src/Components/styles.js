// Index of Styled Components
import styled from 'styled-components';
import { View, Image } from "react-native";

// Sprite Component
const StyledSpriteContainer = styled(View)`
  height: 50px;
`;

// Tile Component
const StyledTileContainer = styled(View)`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: hidden;
  transform: scale(${({ scale }) => `${scale}, ${scale}`});
  transform-origin: top left;
`;

const StyledSpriteImage = styled(Image)`
  left: -${({ left }) => left}px;
`;

export {
// Sprite Component
  StyledSpriteContainer,
// Tile Component
  StyledTileContainer,
  StyledSpriteImage,
};
