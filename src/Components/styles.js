// Index of Styled Components
import styled from 'styled-components';
import { View, Image, ImageBackground, Text } from 'react-native';

// General Styles
const StyledHeading1 = styled(Text)`
  font-size: 30px;
  color: #333;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledContainer = styled(View)`
  alignitems: 'center';
  padding: 20px 30px;
`;

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

// SignUp & SignIn Components

export {
  // General Styles
  StyledHeading1,
  StyledContainer,
  // Sprite Component
  StyledSpriteContainer,
  StyledTileContainer,
  StyledSpriteImage,
  // DokiHome Component
  StyledDokiHomeBackground,
  StyledDokiEggContainer,
  // SignUp & SignIn Components
};
